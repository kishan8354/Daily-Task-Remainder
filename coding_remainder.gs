// code 2------------------------------------------------
/***** CONFIG *****/
var APP_CFG = {
  SHEET_NAME: 'Sheet1',
  TO_EMAIL: 'XXXXXXXXXXXXXXXXX',
  YOUR_NAME: 'kishan kushavaha',
  SUBJECT_PREFIX: "Today's Prep",
  TIMEZONE: 'Asia/Kolkata',
  DUE_PICK: 2,
  NEW_PICK: 2,
  INTERVALS: [3, 7, 15, 30,45,60,80,120],
  ADV_TOPICS: [
    "Disjoint Set Union (Union-Find) with path compression & union by rank",
    "Segment Tree with lazy propagation",
    "Trie (prefix tree) with word insert/search and prefix queries",
    "Suffix Array & LCP (Kasai) + brief note on Suffix Tree",
    "Max Flow / Min Cut (Dinic)",
    "Strongly Connected Components (Kosaraju & Tarjan, compare briefly)",
    "Articulation Points & Bridges (Tarjan)",
    "Minimum Spanning Tree variants (Kruskal & Prim with advanced PQ/DSU)",
    "Dijkstra with adjacency list & priority queue (and pitfalls)"
  ],

  // Gemini settings
  GEMINI_MODEL: 'gemini-1.5-flash-latest',
  GEMINI_TEMPERATURE: 0.3,
  GEMINI_MAX_TOKENS: 1200
};

/***** ENTRYPOINT *****/
function runDaily() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(APP_CFG.SHEET_NAME);
  if (!sheet) throw new Error('Sheet tab "' + APP_CFG.SHEET_NAME + '" not found.');

  // 1) Read rows + hyperlinks (we keep link only for internal logic; email shows links in question cells)
  var data = readSheetWithLinks_(sheet);

  // 2) Select items
  var picks = pickQuestions_(data.rows, data.colMap, data.linkByRow, APP_CFG.DUE_PICK, APP_CFG.NEW_PICK);

  // 3) Ask Gemini for each selected question (concise, C++17, NO links in answer body)
  var aiBlocks = [];
  for (var i = 0; i < picks.selected.length; i++) {
    var item = picks.selected[i];
    var answerHtml = getGeminiHtmlForQuestion_(item);
    aiBlocks.push({
      title: ((item.topic || '(No topic)') + ' — ' + (item.company || '')).trim(),
      question: item.question || '(untitled)',
      html: answerHtml
    });
    Utilities.sleep(400); // gentle pause
  }

  // 4) Advanced topic of the day (rotates)
  var advTopic = getNextAdvancedTopic_();
  var advHtml = getGeminiHtmlForAdvancedTopic_(advTopic);

  // 5) Compose email (AI section shows plain question text; no external links in AI answer)
  var emailHtml = buildEmailHtml_({
    yourName: APP_CFG.YOUR_NAME,
    due: picks.due,
    fresh: picks.fresh,
    aiBlocks: aiBlocks,
    advTopic: advTopic,
    advHtml: advHtml
  });

  var subject = APP_CFG.SUBJECT_PREFIX + ' • ' +
                Utilities.formatDate(new Date(), tz_(), 'EEE, dd MMM');

  GmailApp.sendEmail(APP_CFG.TO_EMAIL, subject, '(HTML email)', { htmlBody: emailHtml });

  // 6) Update next revision dates/stages for the emailed rows only
  if (picks.selected.length) {
    updateNextDates_(sheet, data.colMap, picks.selected);
  }
}

/***** CORE: read sheet & pick rows *****/
function readSheetWithLinks_(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow < 2 || lastCol < 1) {
    return { header: [], colMap: {}, rows: [], linkByRow: {} };
  }

  var header = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var colMap = {};
  header.forEach(function(h, i) { colMap[String(h).trim().toLowerCase()] = i + 1; });

  var nRows = lastRow - 1;
  var dataRange = sheet.getRange(2, 1, nRows, lastCol);
  var values = dataRange.getValues();
  var rtv = dataRange.getRichTextValues();

  var rows = values.map(function(arr) {
    var obj = {};
    header.forEach(function(h, idx) { obj[h] = arr[idx]; });
    return obj;
  });

  // Extract a link from Question (rich text or HYPERLINK() or plain URL)
  var linkByRow = {};
  var qCol = colMap['question'];
  if (qCol) {
    var qFormulas = sheet.getRange(2, qCol, nRows, 1).getFormulas();
    for (var i = 0; i < nRows; i++) {
      var sheetRow = i + 2;
      var link = null;

      // 1) Rich-text link (whole-cell or per run)
      var rich = rtv[i][qCol - 1];
      if (rich) {
        link = rich.getLinkUrl();
        if (!link) {
          var runs = rich.getRuns();
          for (var k = 0; k < runs.length; k++) {
            var u = runs[k].getLinkUrl();
            if (u) { link = u; break; }
          }
        }
      }

      // 2) HYPERLINK() formula
      if (!link) {
        var f = qFormulas[i][0];
        if (f && /^=HYPERLINK\(/i.test(f)) {
          link = extractUrlFromHyperlinkFormula_(f);
        }
      }

      // 3) Plain URL in visible text
      if (!link) {
        var qText = getVal_(rows[i], 'Question');
        link = extractUrlFromPlainText_(qText);
      }

      if (link) linkByRow[sheetRow] = link;
    }
  }

  return { header: header, colMap: colMap, rows: rows, linkByRow: linkByRow };
}

function pickQuestions_(rows, colMap, linkByRow, duePick, newPick) {
  var today = stripTime_(new Date());
  var tagged = [];

  for (var i = 0; i < rows.length; i++) {
    var rowNum = i + 2;
    var r = rows[i];

    var topic = str_(getVal_(r, 'Topic'));
    var question = str_(getVal_(r, 'Question'));
    var company = str_(getVal_(r, 'Company'));
    var revRaw = getVal_(r, 'Revision Date');
    var stageRaw = getVal_(r, 'Stage');

    var rev = parseDateSafe_(revRaw);
    var stage = parseIntSafe_(stageRaw, 0);
    var isNew = (rev == null) || (String(stageRaw).trim() === '');
    var isDue = (rev != null && stripTime_(rev) <= today);

    tagged.push({
      rowNum: rowNum,
      topic: topic,
      question: question,
      company: company,
      revision_date: rev,
      stage: stage,
      is_new: isNew,
      is_due: isDue,
      link: linkByRow[rowNum] || null
    });
  }

  var dueRows = tagged
    .filter(function(x) { return x.is_due; })
    .sort(function(a, b) {
      return (a.revision_date - b.revision_date) || (a.stage - b.stage);
    })
    .slice(0, duePick);

  var pickedIds = {};
  dueRows.forEach(function(x) { pickedIds[x.rowNum] = true; });

  var newRows = shuffle_(tagged.filter(function(x) {
    return x.is_new && !pickedIds[x.rowNum];
  })).slice(0, newPick);

  return { due: dueRows, fresh: newRows, selected: dueRows.concat(newRows) };
}

function nextRevisionDate_(stage) {
  var intervals = APP_CFG.INTERVALS;
  var idx = stage < intervals.length ? stage : intervals.length - 1;
  var base = stripTime_(new Date());
  var d = new Date(base);
  d.setDate(d.getDate() + intervals[idx]);
  return d;
}

function updateNextDates_(sheet, colMap, selections) {
  var revCol = colMap['revision date'];
  var stageCol = colMap['stage'];
  if (!revCol || !stageCol) {
    throw new Error("Missing required columns: 'Revision Date' and/or 'Stage'");
  }
  selections.forEach(function(s) {
    var newStage = Math.max(0, Number(s.stage) || 0) + 1;
    var nextDate = nextRevisionDate_(s.stage); // keeps original behavior
    sheet.getRange(s.rowNum, stageCol).setValue(newStage);
    sheet.getRange(s.rowNum, revCol).setValue(formatISO_(nextDate));
  });
  SpreadsheetApp.flush();
}

/***** GEMINI (UrlFetchApp) *****/
// Store API key in Project Settings -> Script properties -> GEMINI_API_KEY
function getGeminiApiKey_() {
  var key = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!key) throw new Error('Set GEMINI_API_KEY in Apps Script Project Settings -> Script properties.');
  return key;
}

/**
 * Robust Gemini caller with multi-model + multi-version fallback and light retry.
 * Order:
 *   1) APP_CFG.GEMINI_MODEL (and its "-latest" alias)
 *   2) Preferred fallbacks: flash/pro/2.0-lite/2.0-flash
 * Versions tried: v1, then v1beta.
 */
function callGemini_(prompt) {
  var apiKey = getGeminiApiKey_();

  // Build model preference list (deduped, order matters)
  var preferredModels = [
    (APP_CFG.GEMINI_MODEL || '').trim(),
    (APP_CFG.GEMINI_MODEL && APP_CFG.GEMINI_MODEL.indexOf('-latest') === -1)
      ? (APP_CFG.GEMINI_MODEL + '-latest') : '',
    // strong defaults / fallbacks
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-2.0-flash-lite',
    'gemini-2.0-flash',
    'gemini-1.5-pro',
    'gemini-1.5-pro-latest'
  ].filter(function (m) { return m && m.trim(); });

  // de-duplicate while preserving order
  var seen = {};
  preferredModels = preferredModels.filter(function (m) {
    var key = m.toLowerCase();
    if (seen[key]) return false;
    seen[key] = true;
    return true;
  });

  var versions = ['v1', 'v1beta']; // prefer stable first

  var payload = {
    contents: [{ parts: [{ text: String(prompt || '') }]}],
    generationConfig: {
      temperature: (APP_CFG.GEMINI_TEMPERATURE != null ? APP_CFG.GEMINI_TEMPERATURE : 0.3),
      maxOutputTokens: (APP_CFG.GEMINI_MAX_TOKENS != null ? APP_CFG.GEMINI_MAX_TOKENS : 1200)
    }
  };

  function fetchWithRetry_(url, bodyJson) {
    var maxAttempts = 3;
    var baseSleepMs = 400;
    var lastErr = null;

    for (var attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        var res = UrlFetchApp.fetch(url, {
          method: 'post',
          contentType: 'application/json',
          payload: bodyJson,
          muteHttpExceptions: true
        });
        var code = res.getResponseCode();

        if (code >= 200 && code < 300) return res;         // success

        if (code === 404 || code === 400) return res;      // bad model/endpoint -> let caller switch

        if (code === 429 || (code >= 500 && code <= 599)) { // transient
          lastErr = new Error('Transient Gemini error ' + code + ': ' + res.getContentText());
          Utilities.sleep(baseSleepMs * Math.pow(2, attempt - 1));
          continue;
        }

        return res; // other hard error

      } catch (e) {
        lastErr = e;
        Utilities.sleep(baseSleepMs * Math.pow(2, attempt - 1));
      }
    }
    if (lastErr) throw lastErr;
    throw new Error('Unknown Gemini fetch failure.');
  }

  var lastHardErr = null;

  for (var vi = 0; vi < versions.length; vi++) {
    var ver = versions[vi];

    for (var mi = 0; mi < preferredModels.length; mi++) {
      var model = preferredModels[mi];
      var url = 'https://generativelanguage.googleapis.com/' + ver +
                '/models/' + encodeURIComponent(model) + ':generateContent?key=' +
                encodeURIComponent(apiKey);

      try {
        var res = fetchWithRetry_(url, JSON.stringify(payload));
        var code = res.getResponseCode();
        var body = res.getContentText();

        if (code >= 200 && code < 300) {
          var json = {};
          try { json = JSON.parse(body || '{}'); } catch (e) {}

          var text = '';
          if (json.candidates && json.candidates.length) {
            var c0 = json.candidates[0];
            if (c0 && c0.content && c0.content.parts && c0.content.parts.length) {
              for (var pi = 0; pi < c0.content.parts.length; pi++) {
                text += (c0.content.parts[pi].text || '');
              }
            }
          }
          if (!text && json.text) text = String(json.text); // rare fallback

          return text || '';
        }

        if (code === 404 || code === 400) {                 // try next model/version
          lastHardErr = new Error('Model "' + model + '" not available on ' + ver + ' (' + code + ').');
          continue;
        }

        lastHardErr = new Error('Gemini API error ' + code + ': ' + body);

      } catch (e) {
        lastHardErr = e;
      }
    }
  }

  if (lastHardErr) throw lastHardErr;
  throw new Error('Gemini API: no working model/version combination found.');
}

/***** AI HTML BUILDERS *****/
// AI answer for one question — concise, C++17, NO external links
function getGeminiHtmlForQuestion_(item) {
  var context = [
    'Topic: ' + (item.topic || ''),
    'Company: ' + (item.company || ''),
    'Question: ' + (item.question || '')
  ].filter(function(x){ return x && x.trim(); }).join('\n');

  var prompt =
'You are an algorithms tutor. Return PURE HTML only (no markdown), suitable to embed in an email.\n' +
'Keep it concise (~120-180 lines total). NO external links.\n\n' +
'Sections (use <h4>, <ol>, <pre><code>):\n' +
'<h4>Approach</h4>\n' +
'- Name the classic technique (e.g., Binary Search / Two Pointers / Sliding Window / Greedy / DP / Graph).\n' +
'- Numbered, actionable steps like "Make a vector...", "Use a for loop...", "Apply binary search...".\n' +
'- 5-10 bullets, plain and concise.\n\n' +
'<h4>C++17 Implementation</h4>\n' +
'- Self-contained function or minimal main.\n' +
'- Use std::vector, standard loops, clear comments.\n\n' +
'<h4>Complexity & Edge Cases</h4>\n' +
'- Time/space complexity.\n' +
'- 2-3 key edge cases.\n' +
'- Tiny example I/O.\n\n' +
'Context:\n' + context;

  try {
    var html = callGemini_(prompt).trim();
    return html || '<p style="color:#888;">(AI solution unavailable right now.)</p>';
  } catch (e) {
    return '<p style="color:#c00;">AI solution failed: ' + escapeHtml_(String(e)) + '</p>';
  }
}

// Daily advanced topic — concise, C++17, NO external links
function getGeminiHtmlForAdvancedTopic_(topic) {
  var prompt =
'Return PURE HTML only (no markdown) to teach: ' + topic + '.\n' +
'Be concise (~150 lines). NO external links.\n\n' +
'<h4>What & Why</h4>\n' +
'Short explanation and when to use.\n\n' +
'<h4>C++17 Implementation</h4>\n' +
'Clear, commented snippet.\n\n' +
'<h4>Worked Example</h4>\n' +
'Small input, step-by-step, output.\n\n' +
'<h4>Common Pitfalls</h4>\n' +
'Bulleted list.';

  try {
    var html = callGemini_(prompt).trim();
    return html || '<p style="color:#888;">(Advanced topic unavailable right now.)</p>';
  } catch (e) {
    return '<p style="color:#c00;">Advanced topic failed: ' + escapeHtml_(String(e)) + '</p>';
  }
}

/***** ROTATION *****/
function getNextAdvancedTopic_() {
  var props = PropertiesService.getScriptProperties();
  var key = 'ADV_TOPIC_INDEX';
  var idx = parseInt(props.getProperty(key) || '0', 10);
  if (isNaN(idx)) idx = 0;
  var topic = APP_CFG.ADV_TOPICS[idx % APP_CFG.ADV_TOPICS.length];
  props.setProperty(key, String((idx + 1) % APP_CFG.ADV_TOPICS.length));
  return topic;
}

/***** EMAIL HTML COMPOSER *****/
function buildEmailHtml_(payload) {
  var yourName = payload.yourName;
  var due = payload.due;
  var fresh = payload.fresh;
  var aiBlocks = payload.aiBlocks;
  var advTopic = payload.advTopic;
  var advHtml = payload.advHtml;

  var quote = pickRandom_(APP_CFG.QUOTES || [
    "Small progress every day adds up to big results. - Satya Nani",
    "The secret of getting ahead is getting started. - Mark Twain",
    "It always seems impossible until it is done. - Nelson Mandela"
  ]);
  var stamp = Utilities.formatDate(new Date(), tz_(), 'yyyy-MM-dd HH:mm z');

  var esc = escapeHtml_;
  var row = function(r) {
    var qHtml = esc(r.question);
    if (r.link) {
      qHtml = '<a href="' + esc(r.link) + '" target="_blank" rel="noopener noreferrer">' + qHtml + '</a>';
    }
    return '' +
      '<tr>' +
      '<td style="padding:8px;border:1px solid #eee;">' + esc(r.topic) + '</td>' +
      '<td style="padding:8px;border:1px solid #eee;">' + qHtml + '</td>' +
      '<td style="padding:8px;border:1px solid #eee;">' + esc(r.company) + '</td>' +
      '</tr>';
  };

  var dueRows = due.length
    ? due.map(row).join('')
    : '<tr><td colspan="3" style="padding:8px;border:1px solid #eee;color:#666;">None due today</td></tr>';

  var newRows = fresh.length
    ? fresh.map(row).join('')
    : '<tr><td colspan="3" style="padding:8px;border:1px solid #eee;color:#666;">No new questions found</td></tr>';

  var aiSections = aiBlocks.length
    ? aiBlocks.map(function(b) {
        return '' +
          '<div style="margin:16px 0;padding:16px;border:1px solid #eee;border-radius:12px;">' +
          '<h3 style="margin:0 0 8px 0;">' + esc(b.title) + '</h3>' +
          '<p style="margin:0 0 12px 0;color:#555;"><strong>Question:</strong> ' + esc(b.question) + '</p>' +
          b.html +
          '</div>';
      }).join('')
    : '<p style="color:#666;">No items selected today.</p>';

  return '' +
  '<div style="font-family:Inter,Segoe UI,Arial,sans-serif;line-height:1.6;">' +
    '<h2 style="margin-bottom:4px;">Good morning, ' + esc(yourName) + '</h2>' +
    '<p style="margin-top:0;color:#555;">Here is your study plan for today.</p>' +

    '<h3 style="margin:16px 0 8px;">Due for Revision</h3>' +
    '<table style="border-collapse:collapse;width:100%;max-width:880px;">' +
      '<thead>' +
        '<tr>' +
          '<th style="text-align:left;padding:8px;border:1px solid #eee;background:#fafafa;">Topic</th>' +
          '<th style="text-align:left;padding:8px;border:1px solid #eee;background:#fafafa;">Question</th>' +
          '<th style="text-align:left;padding:8px;border:1px solid #eee;background:#fafafa;">Company</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' + dueRows + '</tbody>' +
    '</table>' +

    '<h3 style="margin:24px 0 8px;">New to Learn</h3>' +
    '<table style="border-collapse:collapse;width:100%;max-width:880px;">' +
      '<thead>' +
        '<tr>' +
          '<th style="text-align:left;padding:8px;border:1px solid #eee;background:#fafafa;">Topic</th>' +
          '<th style="text-align:left;padding:8px;border:1px solid #eee;background:#fafafa;">Question</th>' +
          '<th style="text-align:left;padding:8px;border:1px solid #eee;background:#fafafa;">Company</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' + newRows + '</tbody>' +
    '</table>' +

    '<h3 style="margin:28px 0 8px;">AI Solutions (C++)</h3>' +
    aiSections +

    '<h3 style="margin:28px 0 8px;">Advanced Topic of the Day</h3>' +
    '<div style="padding:16px;border:1px solid #eee;border-radius:12px;">' +
      '<h3 style="margin-top:0;">' + esc(advTopic) + '</h3>' +
      advHtml +
    '</div>' +

    '<blockquote style="margin:24px 0;padding:12px 16px;border-left:4px solid #4b9ce2;background:#f7fbff;color:#333;">' +
      '<em>' + esc(quote) + '</em>' +
    '</blockquote>' +

    '<p style="color:#777;font-size:12px;">Auto-generated • ' + stamp + '</p>' +
  '</div>';
}

/***** HELPERS *****/
function tz_() {
  return APP_CFG.TIMEZONE || Session.getScriptTimeZone() || 'Asia/Kolkata';
}
function pickRandom_(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function escapeHtml_(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, function(c) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]); });
}
function getVal_(rowObj, key) {
  return (rowObj[key] != null) ? rowObj[key]
       : (rowObj[key && key.toLowerCase ? key.toLowerCase() : key] != null) ? rowObj[key.toLowerCase()]
       : (rowObj[key && key.toUpperCase ? key.toUpperCase() : key] != null) ? rowObj[key.toUpperCase()]
       : null;
}
function str_(v) { return (typeof v === 'string') ? v : (v == null ? '' : String(v)); }
function parseIntSafe_(val, def) { var n = parseInt(val, 10); return isNaN(n) ? def : n; }
function stripTime_(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function formatISO_(d) {
  var y = d.getFullYear();
  var m = d.getMonth() + 1;
  var day = d.getDate();
  if (m < 10) m = '0' + m;
  if (day < 10) day = '0' + day;
  return y + '-' + m + '-' + day;
}
function extractUrlFromHyperlinkFormula_(formula) {
  var m = String(formula).match(/=HYPERLINK\(\s*["']([^"']+)["']\s*[,;]/i);
  return m ? m[1] : null;
}
function extractUrlFromPlainText_(text) {
  if (!text) return null;
  var m = String(text).match(/https?:\/\/\S+/);
  return m ? m[0] : null;
}
function shuffle_(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
function parseDateSafe_(val) {
  if (val == null || String(val).trim() === '') return null;
  if (Object.prototype.toString.call(val) === '[object Date]') return val;
  try {
    var d = new Date(String(val).trim());
    return isNaN(d) ? null : d;
  } catch (e) {
    return null;
  }
}
