/***** CONFIG: OOP Daily (70 Qs) — MOBILE READY *****/
var APP_CFG = {
  DOC_ID: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // your Doc tracker
  TO_EMAIL: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  YOUR_NAME: 'kishan kushavaha',
  SUBJECT_PREFIX: "OOP Daily Revision",
  TIMEZONE: 'Asia/Kolkata',

  // Daily counts
  DUE_PICK: 5,
  NEW_PICK: 5,

  // Gemini (standard)
  GEMINI_MODEL: 'gemini-1.5-flash-latest',
  GEMINI_TEMPERATURE: 0.25,
  GEMINI_MAX_TOKENS: 900,

  // FAST mode
  FAST: {
    DUE_PICK: 5,
    NEW_PICK: 5,
    GEMINI_MODEL: 'gemini-2.0-flash-lite',
    GEMINI_TEMPERATURE: 0.2,
    GEMINI_MAX_TOKENS: 500,
    CACHE_HOURS: 168 // 7 days
  },

  // Spaced-repetition intervals (days)
  INTERVALS: [3, 7, 15, 30, 45, 60, 80, 120],

  // =================== 70 OOP INTERVIEW QUESTIONS ===================
  OOPS_QUESTIONS: [
    "Define OOP and its core principles (encapsulation, abstraction, inheritance, polymorphism).",
    "Encapsulation: what it is, how access modifiers help, practical example.",
    "Abstraction vs Encapsulation: difference with real-world analogy.",
    "Inheritance: types (single, multilevel, hierarchical, multiple*), pros/cons.",
    "Polymorphism: compile-time vs run-time with examples (overload/override).",
    "Method overloading vs overriding: resolution time, rules, pitfalls.",
    "Dynamic dispatch / vtable: how a virtual call is resolved at runtime.",
    "IS-A vs HAS-A: when to use inheritance vs composition.",
    "Composition over inheritance: why it reduces coupling; example refactor.",
    "Aggregation vs Composition vs Association: UML relations & code examples.",
    "Access modifiers (public/private/protected/default): effect across packages.",
    "Constructors: chaining, overloading, copy/move (C++), pitfalls.",
    "Destructors & finalizers: deterministic destruction vs GC; best practices.",
    "Object lifecycle: creation, initialization, usage, cleanup (RAII/GC).",
    "Immutability: benefits, defensive copies, builders.",
    "equals()/hashCode() contract (Java) and why it matters for hash collections.",
    "Object equality vs identity; pitfalls with wrappers and strings.",
    "Shallow vs deep copy; clone() vs copy constructor; pitfalls.",
    "C++ Rule of 3/5/0; when to implement dtor/copy/move; smart pointers.",
    "Memory management in OOP: ownership, leaks, cycles; weak refs.",
    "Interfaces vs abstract classes: when to choose which; default methods.",
    "Multiple inheritance & the diamond problem; virtual inheritance (C++).",
    "Mixins / traits: composition of behavior without inheritance.",
    "Operator overloading (C++): guidelines, when it improves readability.",
    "Generics/templates: type erasure vs instantiation; constraints.",
    "Covariance / contravariance / invariance: arrays vs generics examples.",
    "SOLID: Single Responsibility Principle with example refactor.",
    "SOLID: Open/Closed Principle: extension points & plugins.",
    "SOLID: Liskov Substitution Principle: subtle violations.",
    "SOLID: Interface Segregation: fat interfaces → smaller ones.",
    "SOLID: Dependency Inversion: abstractions + DI containers.",
    "GRASP patterns: High Cohesion & Low Coupling in class design.",
    "Law of Demeter: talk to friends, not strangers (message chains).",
    "Cohesion vs Coupling: metrics and design trade-offs.",
    "UML basics: class, sequence, and state diagrams for OOP design.",
    "Design pattern categories: creational, structural, behavioral.",
    "Pattern: Singleton — pitfalls (testability), thread-safe forms.",
    "Pattern: Factory Method vs Abstract Factory — differences.",
    "Pattern: Builder vs telescoping constructor; immutability.",
    "Pattern: Prototype — cloning complex objects.",
    "Pattern: Adapter vs Facade — intent and examples.",
    "Pattern: Decorator vs Inheritance — adding responsibilities at runtime.",
    "Pattern: Proxy — lazy load, remote, protection proxies.",
    "Pattern: Composite — trees of objects; uniform treatment.",
    "Pattern: Flyweight — sharing intrinsic state; memory savings.",
    "Pattern: Bridge — decouple abstraction from implementation.",
    "Pattern: Strategy — pluggable algorithms; open/closed compliance.",
    "Pattern: Observer — events, push vs pull, leaks and weak refs.",
    "Pattern: Command — undo/redo, macro commands.",
    "Pattern: Template Method vs Strategy — inheritance vs composition.",
    "Pattern: State — transitions inside an object; contrast with Strategy.",
    "Pattern: Visitor — operations on object structures; double dispatch.",
    "Pattern: Iterator — traversal without exposing internals.",
    "Error handling: exceptions vs error codes; checked vs unchecked.",
    "Design by Contract: pre/postconditions, invariants in OOP.",
    "DDD basics: Entities vs Value Objects; Aggregates.",
    "Repository & Service layers: separating domain and persistence.",
    "DTO vs domain model: mapping and why.",
    "Reflection & metadata: pros/cons; performance and safety.",
    "Serialization: binary vs text (JSON/XML); versioning and security.",
    "Thread safety in OOP: confinement, immutability, synchronization.",
    "Reentrancy & thread confinement; actors vs shared-state OOP.",
    "Stateful vs stateless objects; when to prefer stateless services.",
    "Event-driven OOP: listeners, callbacks, reactive streams.",
    "Testing OOP code: unit tests, mocks, seams; DI for testability.",
    "TDD with OOP: designing APIs via tests; refactoring to patterns.",
    "Anti-patterns: God object, Anemic domain model, Lava flow.",
    "Code smells: long class, long parameter list, feature envy.",
    "Clean Architecture layers with OOP: entities, use cases, interfaces.",
    "Idempotency vs purity; side effects and design.",
    "Performance in OOP: allocation, escape analysis, hotspots.",
    "OOP in Python vs Java vs C++: dynamic typing & MRO vs static typing & vtables.",
    "Method resolution order (Python): C3 linearization basics.",
    "Multiple dispatch vs single dispatch; visitor as workaround.",
    "Module/package design: namespaces, visibility, boundaries."
  ]
};

/***** ENTRYPOINTS *****/
function runOOPDailyFast(){
  var cfg = APP_CFG.FAST;
  _runOOPDailyCore({
    duePick: cfg.DUE_PICK,
    newPick: cfg.NEW_PICK,
    model: cfg.GEMINI_MODEL,
    temp: cfg.GEMINI_TEMPERATURE,
    maxTokens: cfg.GEMINI_MAX_TOKENS,
    cacheHours: cfg.CACHE_HOURS,
    fastPrompt: true
  });
}
function runOOPDaily(){
  _runOOPDailyCore({
    duePick: APP_CFG.DUE_PICK,
    newPick: APP_CFG.NEW_PICK,
    model: APP_CFG.GEMINI_MODEL,
    temp: APP_CFG.GEMINI_TEMPERATURE,
    maxTokens: APP_CFG.GEMINI_MAX_TOKENS,
    cacheHours: APP_CFG.FAST.CACHE_HOURS || 168,
    fastPrompt: false
  });
}

/***** CORE *****/
function _runOOPDailyCore(opts){
  var start = Date.now(), MAX_MS = 5.5*60*1000;
  function timeLeft(){ return MAX_MS - (Date.now() - start); }

  var Q = APP_CFG.OOPS_QUESTIONS.slice();
  if (!Q.length) throw new Error('OOPS_QUESTIONS is empty.');

  var state = loadOrInitOOPState_(Q.length);
  var picks = pickOOP_(state, opts.duePick, opts.newPick);
  if (!picks.selected.length){ resetOOPState_(state); picks = pickOOP_(state, opts.duePick, opts.newPick); }

  // Build answers via Gemini (cached)
  var qaBlocks = [];
  for (var i=0; i<picks.selected.length; i++){
    if (timeLeft() < 25000) break;
    var sel = picks.selected[i];
    var question = Q[sel.index];
    var html = getCachedGeminiHtmlForOOPQuestion_(question, sel.index, {
      model: opts.model, temp: opts.temp, maxTokens: opts.maxTokens,
      cacheHours: opts.cacheHours, fastPrompt: opts.fastPrompt
    });
    qaBlocks.push({ q: question, html: html });
  }

  // Email
  var emailHtml = buildEmailHtmlOOP_({
    yourName: APP_CFG.YOUR_NAME,
    due: picks.due.map(function(x){ return { idx:x.index, q: Q[x.index] }; }),
    fresh: picks.fresh.map(function(x){ return { idx:x.index, q: Q[x.index] }; }),
    qaBlocks: qaBlocks
  });
  var subject = APP_CFG.SUBJECT_PREFIX + ' • ' +
                Utilities.formatDate(new Date(), tz_(), 'EEE, dd MMM');

  GmailApp.sendEmail(APP_CFG.TO_EMAIL, subject, '(HTML email)', { htmlBody: emailHtml });

  // Append compact log into Doc
  appendDailyLogToDocOOP_(APP_CFG.DOC_ID, {
    dueTitles: picks.due.map(function(x){ return Q[x.index]; }),
    newTitles: picks.fresh.map(function(x){ return Q[x.index]; })
  });

  // Update SRS state
  updateOOPState_(state, picks.selected);
  saveOOPState_(state);
}

/***** DAILY TRIGGER *****/
function setupDailyTriggerOOPFast(){
  ScriptApp.getProjectTriggers().forEach(function(t){
    if (t.getHandlerFunction() === 'runOOPDailyFast') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('runOOPDailyFast')
    .timeBased().atHour(8).nearMinute(0)
    .inTimezone(APP_CFG.TIMEZONE || 'Asia/Kolkata')
    .everyDays(1).create();
}

/***** STATE (Script Properties) *****/
function loadOrInitOOPState_(n){
  var props = PropertiesService.getScriptProperties();
  var raw = props.getProperty('OOP_SRS_STATE');
  var state = raw ? JSON.parse(raw) : null;
  var todayISO = formatISO_(stripTime_(new Date()));
  if (!state || !Array.isArray(state.items)) state = { created: todayISO, updated: todayISO, items: [] };
  if (state.items.length < n){
    for (var i=state.items.length; i<n; i++) state.items.push({ index:i, stage:0, nextISO:'' });
  } else if (state.items.length > n){
    state.items = state.items.slice(0, n);
  }
  return state;
}
function saveOOPState_(state){
  state.updated = formatISO_(stripTime_(new Date()));
  PropertiesService.getScriptProperties().setProperty('OOP_SRS_STATE', JSON.stringify(state));
}
function resetOOPState_(state){
  for (var i=0;i<state.items.length;i++){ state.items[i].stage=0; state.items[i].nextISO=''; }
}

/***** PICKER *****/
function pickOOP_(state, duePick, newPick){
  var today = stripTime_(new Date());
  var due=[], fresh=[];
  for (var i=0;i<state.items.length;i++){
    var it = state.items[i]; if(!it) continue;
    if (it.nextISO){
      var d = parseDateSafe_(it.nextISO);
      if (d && stripTime_(d) <= today) due.push({index:it.index, stage:it.stage, nextISO:it.nextISO});
    }
  }
  due.sort(function(a,b){
    var ad=a.nextISO||'9999-12-31', bd=b.nextISO||'9999-12-31';
    if (ad!==bd) return ad<bd?-1:1;
    return a.stage-b.stage;
  });
  due = due.slice(0, duePick);

  var chosen={}; due.forEach(function(x){ chosen[x.index]=true; });
  for (var j=0;j<state.items.length && fresh.length<newPick;j++){
    var it = state.items[j];
    if (!it.nextISO && !chosen[it.index]) fresh.push({index:it.index, stage:it.stage, nextISO:it.nextISO});
  }
  return { due: due, fresh: fresh, selected: due.concat(fresh) };
}

/***** UPDATE *****/
function updateOOPState_(state, selected){
  selected.forEach(function(sel){
    var it = state.items[sel.index]; if(!it) return;
    var newStage = Math.max(0, Number(it.stage)||0) + 1;
    var nextDate = nextRevisionDate_(it.stage);
    it.stage = newStage;
    it.nextISO = formatISO_(nextDate);
  });
}
function nextRevisionDate_(stage){
  var intervals = APP_CFG.INTERVALS;
  var idx = stage < intervals.length ? stage : intervals.length - 1;
  var base = stripTime_(new Date());
  var d = new Date(base); d.setDate(d.getDate() + intervals[idx]); return d;
}

/***** DOC LOG (compact) *****/
function appendDailyLogToDocOOP_(docId, payload){
  if (!docId) return;
  try{
    var doc = DocumentApp.openById(docId), body = doc.getBody();
    var dateStr = Utilities.formatDate(new Date(), tz_(), 'yyyy-MM-dd (EEE)');
    body.appendParagraph('────────────────────────────────').setForegroundColor('#94a3b8');
    body.appendParagraph('OOP Revision • ' + dateStr).setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph('Due (5):').setBold(true);
    body.appendParagraph('• ' + (payload.dueTitles.join('\n• ') || '(none)'));
    body.appendParagraph('New (5):').setBold(true);
    body.appendParagraph('• ' + (payload.newTitles.join('\n• ') || '(none)'));
    body.appendParagraph('Notes: ').setForegroundColor('#64748b');
    body.appendParagraph(' ');
    doc.saveAndClose();
  } catch(e){ Logger.log('Doc log append failed: ' + e); }
}

/***** MOBILE EMAIL UTILS (sanitize + wrapper + table cards) *****/
function sanitizeModelHtml_(s) {
  if (!s) return '';
  s = String(s);
  // remove ```html ... ``` and stray backticks
  s = s.replace(/^```[\w-]*\s*/i, '').replace(/```$/i, '').replace(/```/g, '');
  // kill <html>/<body> wrappers
  s = s.replace(/<\/?(html|body)[^>]*>/gi, '');
  // <pre> squeezes; convert
  s = s.replace(/<pre[^>]*>/gi, '<div style="white-space:normal;">').replace(/<\/pre>/gi,'</div>');
  // Gmail blockquote becomes narrow; replace
  s = s.replace(/<blockquote[^>]*>/gi,
        '<div style="margin:12px 0;padding:10px 12px;border-left:4px solid #0ea5e9;background:#e0f2fe;border-radius:6px;">')
       .replace(/<\/blockquote>/gi, '</div>');
  return s.trim();
}
function wrapEmailMobile_(inner) {
  var outerBG = '#f1f5f9', maxW = 640;
  return ''
    + '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"'
    + ' style="margin:0;padding:0;background:'+outerBG+';-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">'
    + '<tr><td align="center" style="padding:12px;">'
    +   '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"'
    +   ' style="max-width:'+maxW+'px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;">'
    +     '<tr><td style="padding:0;">' + inner + '</td></tr>'
    +   '</table>'
    + '</td></tr></table>';
}
function cardTable_(title, bodyHtml) {
  title = escapeHtml_(title || '');
  bodyHtml = sanitizeModelHtml_(bodyHtml || '');
  return ''
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"'
    + ' style="margin:14px 0;border:1px solid #e5e7eb;border-radius:14px;background:#f8fafc;">'
    + '<tr><td style="padding:14px 16px;font-family:Inter,Segoe UI,Arial,sans-serif;">'
    +   '<div style="font-weight:700;margin:0 0 8px;color:#0f172a;">'+ title +'</div>'
    +   '<div style="font-size:14px;line-height:1.6;color:#111827;">'+ bodyHtml +'</div>'
    + '</td></tr></table>';
}
function badgesRow_(items){
  return items.map(function(b){
    return '<span style="display:inline-block;background:'+b.bg+';color:#fff;border-radius:999px;padding:4px 10px;font-size:12px;margin-right:6px;">'+escapeHtml_(b.text)+'</span>';
  }).join('');
}
function sectionList_(title, arr, color){
  var rows = arr.map(function(x){ return '<li style="margin:6px 0;">'+ escapeHtml_(x.q) +'</li>'; }).join('');
  return ''
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;border:1px solid #e5e7eb;border-radius:12px;background:#ffffff;">'
    + '<tr><td style="padding:12px 14px;font-family:Inter,Segoe UI,Arial,sans-serif;">'
    + '<div style="font-weight:700;margin-bottom:6px;">'+ escapeHtml_(title) +'</div>'
    + '<div style="height:2px;background:'+color+';margin:6px 0 10px;"></div>'
    + '<ol style="margin:0;padding-left:18px;">'+ rows +'</ol>'
    + '</td></tr></table>';
}

/***** GEMINI (per-question answer) *****/
function getCachedGeminiHtmlForOOPQuestion_(question, qIndex, opt){
  var key = 'oop_q_' + qIndex + '_' + textHash_(question);
  var cache = CacheService.getScriptCache(), cached = cache.get(key);
  if (cached) return cached;

  var html = getGeminiHtmlForOOPQuestion_(question, opt);
  var sec = Math.min((opt.cacheHours||168)*3600, 6*3600);
  cache.put(key, html, sec);
  return html;
}
function getGeminiHtmlForOOPQuestion_(question, opt){
  var fast = opt && opt.fastPrompt;
  var maxTok = (opt && opt.maxTokens) || APP_CFG.GEMINI_MAX_TOKENS;

  var prompt =
'Return PURE HTML only (inline CSS ok; no external links). You are an OOP interview tutor.\n' +
'Question: ' + question + '\n' +
(fast
 ? '<div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:12px 14px;">'
   +'<div style="font-weight:700;margin-bottom:6px;">Answer (concise)</div><ul><li>4–6 bullets max</li></ul>'
   +'<div style="height:1px;background:linear-gradient(90deg,#0ea5e9,#a78bfa);margin:8px 0;"></div>'
   +'<div style="font-weight:700;margin-bottom:6px;">Pitfalls</div><ul><li>2 precise pitfalls</li></ul>'
   +'<div style="height:1px;background:#22c55e33;margin:8px 0;"></div>'
   +'<div style="font-weight:700;margin-bottom:6px;">Quick Check</div><ol><li>One MCQ with correct option</li></ol>'
   +'</div>'
 : '<div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:12px 14px;">'
   +'<div style="font-weight:700;margin-bottom:6px;">Answer</div><ul><li>6–9 bullets incl. succinct example</li></ul>'
   +'<div style="height:1px;background:linear-gradient(90deg,#0ea5e9,#a78bfa);margin:8px 0;"></div>'
   +'<div style="font-weight:700;margin-bottom:6px;">Compare/Contrast</div><ul><li>2–3 contrasts if relevant</li></ul>'
   +'<div style="height:1px;background:#f59e0b33;margin:8px 0;"></div>'
   +'<div style="font-weight:700;margin-bottom:6px;">Pitfalls</div><ul><li>3 precise pitfalls</li></ul>'
   +'<div style="height:1px;background:#22c55e33;margin:8px 0;"></div>'
   +'<div style="font-weight:700;margin-bottom:6px;">Quick Check</div><ol><li>1 MCQ + answer</li></ol>'
   +'</div>'
 );

  // SANITIZE to remove any ```html, <pre>, <blockquote>, etc.
  var out = sanitizeModelHtml_( callGemini_(prompt, {
    model: (opt && opt.model) || APP_CFG.GEMINI_MODEL,
    temp: (opt && opt.temp)!=null ? opt.temp : APP_CFG.GEMINI_TEMPERATURE,
    maxTokens: maxTok
  }) );
  return out || '<p style="color:#888;">(Answer unavailable.)</p>';
}

/***** EMAIL — BEAUTIFUL, GMAIL-FRIENDLY (wrapped for mobile) *****/
function buildEmailHtmlOOP_(payload){
  var esc = escapeHtml_;
  var yourName = payload.yourName;
  var due = payload.due, fresh = payload.fresh, qa = payload.qaBlocks;

  var stamp = Utilities.formatDate(new Date(), tz_(), 'yyyy-MM-dd HH:mm z');

  var header =
    '<div style="background:linear-gradient(135deg,#0ea5e9,#a78bfa);color:#fff;border-radius:14px;padding:16px 18px;">' +
      '<div style="font-size:18px;font-weight:800;">OOP Daily • ' + esc(yourName) + '</div>' +
      '<div style="opacity:.95;font-size:12px;margin-top:2px;">' + esc(stamp) + '</div>' +
      '<div style="margin-top:10px;">' +
        badgesRow_([{text:'Revision: '+due.length,bg:'#22c55e'},{text:'New: '+fresh.length,bg:'#f59e0b'},{text:'Bank: 70',bg:'#0ea5e9'}]) +
      '</div>' +
    '</div>';

  var listDue = sectionList_('Due for Revision (5)', due, '#22c55e');
  var listNew = sectionList_('New to Learn (5)', fresh,'#a78bfa');

  var cards = qa.map(function(b){ return cardTable_(b.q, b.html); }).join('');

  var quote = pickRandom_([
    "Good design is largely OOP done well.",
    "Prefer composition; verify with tests.",
    "Encapsulation today saves debugging tomorrow."
  ]);

  var inner =
    header + listDue + listNew +
    '<div style="margin-top:18px;font-size:15px;font-weight:800;">Today’s Answers</div>' +
    '<div style="height:2px;background:#0ea5e966;margin:6px 0 10px;"></div>' +
    cards +
    '<div style="margin:18px 0;padding:10px 12px;border-left:4px solid #0ea5e9;background:#e0f2fe;border-radius:6px;"><em>'+esc(quote)+'</em></div>' +
    '<div style="color:#475569;font-size:12px;">Auto-generated. Keep building 🧠</div>';

  return wrapEmailMobile_(inner);
}

/***** Gemini Caller (shared) *****/
function callGemini_(prompt, opts){
  var apiKey = getGeminiApiKey_();
  var model = (opts && opts.model) || APP_CFG.GEMINI_MODEL;
  var temp = (opts && opts.temp)!=null ? opts.temp : APP_CFG.GEMINI_TEMPERATURE;
  var maxTokens = (opts && opts.maxTokens) || APP_CFG.GEMINI_MAX_TOKENS;

  var versions = ['v1', 'v1beta'];
  var payload = { contents:[{ parts:[{ text:String(prompt||'') }]}],
                  generationConfig:{ temperature:temp, maxOutputTokens:maxTokens } };

  function fetchWithRetry_(url, bodyJson){
    var maxAttempts=2, baseSleepMs=250, lastErr=null;
    for (var a=1; a<=maxAttempts; a++){
      try{
        var res = UrlFetchApp.fetch(url, {
          method:'post', contentType:'application/json',
          payload: bodyJson, muteHttpExceptions:true
        });
        var code = res.getResponseCode();
        if (code>=200 && code<300) return res;
        if (code===400 || code===404) return res;
        if (code===429 || (code>=500 && code<=599)){ lastErr=new Error('Transient '+code); Utilities.sleep(baseSleepMs*a); continue; }
        return res;
      }catch(e){ lastErr=e; Utilities.sleep(baseSleepMs*a); }
    }
    if (lastErr) throw lastErr;
    throw new Error('Unknown Gemini fetch failure.');
  }

  var lastHardErr=null;
  for (var vi=0; vi<versions.length; vi++){
    var url = 'https://generativelanguage.googleapis.com/'+versions[vi]+'/models/' +
              encodeURIComponent(model)+':generateContent?key='+encodeURIComponent(apiKey);
    try{
      var res = fetchWithRetry_(url, JSON.stringify(payload));
      var code = res.getResponseCode(), body = res.getContentText();
      if (code>=200 && code<300){
        var json={}; try{ json=JSON.parse(body||'{}'); }catch(e){}
        var text='';
        if (json.candidates && json.candidates.length){
          var c0=json.candidates[0];
          if (c0 && c0.content && c0.content.parts){
            for (var pi=0; pi<c0.content.parts.length; pi++) text += (c0.content.parts[pi].text || '');
          }
        }
        if (!text && json.text) text=String(json.text);
        return text || '';
      }
      if (code===400 || code===404){ lastHardErr=new Error('Model not available '+code); continue; }
      lastHardErr = new Error('Gemini API error '+code+': '+body);
    }catch(e){ lastHardErr=e; }
  }
  if (lastHardErr) throw lastHardErr;
  throw new Error('Gemini API: no working model/version combination found.');
}

/***** HELPERS *****/
function tz_(){ return APP_CFG.TIMEZONE || Session.getScriptTimeZone() || 'Asia/Kolkata'; }
function pickRandom_(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function escapeHtml_(s){ if (s==null) return ''; return String(s).replace(/[&<>"']/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]); }); }
function stripTime_(d){ return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function formatISO_(d){ var y=d.getFullYear(), m=d.getMonth()+1, day=d.getDate(); if(m<10)m='0'+m; if(day<10)day='0'+day; return y+'-'+m+'-'+day; }
function parseDateSafe_(val){ if(!val) return null; try{ var d=new Date(String(val).trim()); return isNaN(d)?null:d; }catch(e){ return null; } }
function textHash_(s){
  var raw = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, s, Utilities.Charset.UTF_8);
  var out=''; for (var i=0;i<raw.length;i++){ var b=(raw[i]+256)%256; out += (b+256).toString(16).slice(-2); }
  return out;
}

/***** GEMINI KEY HELPERS *****/
function setGeminiApiKey(){
  var key = Browser.inputBox('Enter your Gemini API key');
  if (key && key !== 'cancel') {
    PropertiesService.getScriptProperties().setProperty('GEMINI_API_KEY', key.trim());
    SpreadsheetApp.getActive(); // harmless no-op
  }
}
function getGeminiApiKey_(){
  var key = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!key) throw new Error('Set Gemini API key first: run setGeminiApiKey()');
  return key;
}

/***** DEBUG *****/
function debugRunOOPOnce(){ runOOPDailyFast(); }
