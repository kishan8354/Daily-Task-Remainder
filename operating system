/***** CONFIG — OS Daily (100 Qs) MOBILE READY *****/
var APP_CFG = {
  DOC_ID: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  TO_EMAIL: 'XXXXXXXXXXXXXXXXXXXXXXX',
  YOUR_NAME: 'kishan kushavaha',
  SUBJECT_PREFIX: "OS Daily Revision",
  TIMEZONE: 'Asia/Kolkata',

  // Normal mode (use runOSDaily)
  DUE_PICK: 5,
  NEW_PICK: 5,
  GEMINI_MODEL: 'gemini-1.5-flash-latest',
  GEMINI_TEMPERATURE: 0.25,
  GEMINI_MAX_TOKENS: 900,

  // FAST mode (use runOSDailyFast)
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

  // === TOP 100 OS QUESTIONS ===
  OS_QUESTIONS: [
    "Process vs thread with examples and OS data structures",
    "User mode vs kernel mode; how transitions happen (syscall/interrupt)",
    "Context switch: what gets saved/restored and why it’s expensive",
    "CPU scheduling goals: throughput, latency, fairness, deadlines",
    "FCFS vs SJF vs SRTF vs RR: pros/cons & starvation scenarios",
    "Priority scheduling and priority inversion; solutions",
    "Multilevel feedback queue (MLFQ) design and tuning",
    "Real-time scheduling: rate-monotonic vs earliest-deadline-first",
    "Affinity scheduling and NUMA considerations",
    "Load average: what it measures and how to read it",
    "Process states lifecycle and state transition diagram",
    "fork() vs exec(): copy-on-write, PID, file descriptors",
    "Zombie vs orphan processes; how to handle them",
    "Signals (POSIX): default actions, handlers, masking",
    "IPC: pipes, FIFOs, message queues, shared memory, sockets",
    "Mutex vs semaphore vs spinlock vs RW-lock; when to use which",
    "Condition variables and spurious wakeups",
    "Monitors vs semaphores: conceptual difference",
    "Deadlock: necessary conditions (Coffman) and prevention",
    "Banker’s algorithm: safety, need, allocation, example",
    "Starvation vs deadlock vs livelock; differences & fixes",
    "Critical section problem and solutions (Peterson, TAS)",
    "Memory hierarchy: caches → RAM → disk → network",
    "Virtual memory goals and address translation overview",
    "Paging vs segmentation; pros/cons",
    "Page table organization: single, multi-level, inverted",
    "TLB: purpose, hits/misses, shootdown",
    "Page replacement: FIFO, LRU, Clock, NRU, Working Set",
    "Thrashing: why it happens and remedies",
    "Demand paging and page-fault handling steps",
    "Copy-on-write (COW): where it helps (fork/mmap)",
    "Swapping vs paging; swap space management",
    "Huge pages: benefits and trade-offs",
    "ASLR: purpose and interaction with memory layout",
    "Kernel vs user stacks; guard pages",
    "Memory-mapped files (mmap) vs read/write I/O",
    "Anonymous mapping vs file-backed mapping",
    "Page cache and write-back policies",
    "Dirty pages, flushers, and journaling interactions",
    "DMA and zero-copy I/O concepts",
    "I/O scheduling (noop, deadline, CFQ, BFQ), NVMe specifics",
    "Block vs character devices; major/minor numbers",
    "Interrupts vs polling; interrupt coalescing",
    "System call path; VFS and filesystem dispatch",
    "Inode structure, hard vs soft links, directory entries",
    "Journaling filesystems: ext4/jbd2 vs xfs concepts",
    "Fsync vs fdatasync vs O_DIRECT trade-offs",
    "Fsck: what it repairs, when it runs",
    "RAID levels (0/1/5/6/10) and write hole",
    "Boot process: BIOS/UEFI → bootloader → kernel → init",
    "Init systems: SysV vs systemd overview",
    "Monolithic vs microkernel vs hybrid; pros/cons",
    "Modules vs built-in kernel features; dependency handling",
    "Device drivers: blocking vs non-blocking I/O paths",
    "Scheduler classes (Linux CFS, RT); vruntime idea",
    "Cgroups & namespaces: containers foundation",
    "Containers vs VMs; isolation limits",
    "Hypervisors: type 1 vs type 2; para vs full virtualization",
    "Page sharing/KSM in virtualization; ballooning",
    "NUMA: locality, policies (bind, interleave, preferred)",
    "False sharing in caches; padding/alignment",
    "Memory barriers and reordering; acquire/release",
    "RCU (Read-Copy-Update): when and why",
    "Spinlocks in IRQ context; preemption rules",
    "Priority inversion & priority inheritance",
    "Readers–writers problem: variants & solutions",
    "Dining philosophers: solutions (chandy/misra, resource hierarchy)",
    "Producer–consumer with bounded buffer; lock-free queues",
    "OOM killer criteria and avoidance",
    "SELinux/AppArmor basics; labels & policies",
    "Capability model vs root; least privilege",
    "Timekeeping: jiffies, HZ, timers, high-res timers",
    "Clock drift, NTP/chrony basics",
    "Files vs streams vs descriptors; dup/dup2",
    "Buffered vs unbuffered I/O; stdio vs syscalls",
    "Memory leaks vs fragmentation; slab/slub allocators",
    "Buddy allocator and order; external fragmentation",
    "Page coloring and cache aliasing",
    "Write amplification on SSDs; TRIM/discard",
    "NVMe queues and submission/completion rings",
    "Scheduler tuning: latency_nice, min_granularity",
    "Perf, ftrace, eBPF basics for observability",
    "ptrace: debugging path and security",
    "Core dumps: limits, patterns, analysis",
    "File locking: flock vs fcntl; advisory vs mandatory",
    "Atomicity across filesystems and rename semantics",
    "VFS dentry/inode caches; dentries negative/positive",
    "Extents vs blocks; fragmentation handling",
    "Swapiness, vm.overcommit; heuristics",
    "KASLR vs ASLR; kernel address space",
    "Syscall filtering (seccomp-bpf)",
    "Signals vs eventfd vs epoll for readiness",
    "Epoll edge vs level triggered; pitfalls",
    "AIO/IO_uring high-level idea",
    "Device passthrough in VMs (VFIO/IOMMU)",
    "TLB shootdown in SMP; IPIs",
    "RT-preempt kernel; bounded latencies",
    "Power management: C-states/P-states",
    "Checkpoint/restore (CRIU) basics",
    "Filesystem consistency models and ordering",
    "Crash consistency: WAL/journaling, barriers",
    "Page cache vs buffer cache historical note",
    "Kernel preemption models; voluntary vs full preempt",
    "Hotplug CPU/memory; onlining policy",
    "Security: ASLR, NX bit, stack canaries"
  ]
};

/***** ENTRYPOINTS *****/
function runOSDailyFast(){
  var cfg = APP_CFG.FAST;
  _runOSDailyCore({
    duePick: cfg.DUE_PICK,
    newPick: cfg.NEW_PICK,
    model: cfg.GEMINI_MODEL,
    temp: cfg.GEMINI_TEMPERATURE,
    maxTokens: cfg.GEMINI_MAX_TOKENS,
    cacheHours: cfg.CACHE_HOURS,
    fastPrompt: true
  });
}
function runOSDaily(){
  _runOSDailyCore({
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
function _runOSDailyCore(opts){
  var start = Date.now(), MAX_MS = 5.5*60*1000;
  function timeLeft(){ return MAX_MS - (Date.now() - start); }

  var Q = APP_CFG.OS_QUESTIONS.slice();
  if (!Q.length) throw new Error('OS_QUESTIONS is empty.');

  var state = loadOrInitOSState_(Q.length);
  var picks = pickOS_(state, opts.duePick, opts.newPick);
  if (!picks.selected.length){ resetOSState_(state); picks = pickOS_(state, opts.duePick, opts.newPick); }

  // Build answers via Gemini (cached)
  var qaBlocks = [];
  for (var i=0; i<picks.selected.length; i++){
    if (timeLeft() < 25000) break;
    var sel = picks.selected[i];
    var question = Q[sel.index];
    var html = getCachedGeminiHtmlForOSQuestion_(question, sel.index, {
      model: opts.model, temp: opts.temp, maxTokens: opts.maxTokens,
      cacheHours: opts.cacheHours, fastPrompt: opts.fastPrompt
    });
    qaBlocks.push({ q: question, html: html });
  }

  // Email
  var emailHtml = buildEmailHtmlOS_({
    yourName: APP_CFG.YOUR_NAME,
    due: picks.due.map(function(x){ return { idx:x.index, q: Q[x.index] }; }),
    fresh: picks.fresh.map(function(x){ return { idx:x.index, q: Q[x.index] }; }),
    qaBlocks: qaBlocks
  });
  var subject = APP_CFG.SUBJECT_PREFIX + ' • ' +
                Utilities.formatDate(new Date(), tz_(), 'EEE, dd MMM');
  GmailApp.sendEmail(APP_CFG.TO_EMAIL, subject, '(HTML email)', { htmlBody: emailHtml });

  // Append compact log into Doc
  appendDailyLogToDocOS_(APP_CFG.DOC_ID, {
    dueTitles: picks.due.map(function(x){ return Q[x.index]; }),
    newTitles: picks.fresh.map(function(x){ return Q[x.index]; })
  });

  // Update SRS state
  updateOSState_(state, picks.selected);
  saveOSState_(state);
}

/***** DAILY TRIGGER *****/
function setupDailyTriggerOSFast(){
  ScriptApp.getProjectTriggers().forEach(function(t){
    if (t.getHandlerFunction() === 'runOSDailyFast') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('runOSDailyFast')
    .timeBased().atHour(8).nearMinute(0)
    .inTimezone(APP_CFG.TIMEZONE || 'Asia/Kolkata')
    .everyDays(1).create();
}

/***** STATE (Script Properties) *****/
function loadOrInitOSState_(n){
  var props = PropertiesService.getScriptProperties();
  var raw = props.getProperty('OS_SRS_STATE');
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
function saveOSState_(state){
  state.updated = formatISO_(stripTime_(new Date()));
  PropertiesService.getScriptProperties().setProperty('OS_SRS_STATE', JSON.stringify(state));
}
function resetOSState_(state){
  for (var i=0;i<state.items.length;i++){ state.items[i].stage=0; state.items[i].nextISO=''; }
}

/***** PICKER (FIXED) *****/
function pickOS_(state, duePick, newPick){
  var today = stripTime_(new Date());
  var due=[], fresh=[];

  // collect due
  for (var i=0;i<state.items.length;i++){
    var it = state.items[i]; if(!it) continue;
    if (it.nextISO){
      var d = parseDateSafe_(it.nextISO);
      if (d && stripTime_(d) <= today) due.push({index:it.index, stage:it.stage, nextISO:it.nextISO});
    }
  }
  // sort due
  due.sort(function(a,b){
    var ad=a.nextISO||'9999-12-31', bd=b.nextISO||'9999-12-31';
    if (ad!==bd) return ad<bd?-1:1;
    return a.stage-b.stage;
  });
  due = due.slice(0, duePick);

  // pick fresh
  var chosen={}; due.forEach(function(x){ chosen[x.index]=true; });
  for (var j=0;j<state.items.length && fresh.length<newPick;j++){
    var it2 = state.items[j]; if(!it2) continue;
    if (!it2.nextISO && !chosen[it2.index]){ // <-- FIXED (object lookup, not function call)
      fresh.push({index:it2.index, stage:it2.stage, nextISO:it2.nextISO});
    }
  }
  return { due: due, fresh: fresh, selected: due.concat(fresh) };
}

/***** UPDATE *****/
function updateOSState_(state, selected){
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
function appendDailyLogToDocOS_(docId, payload){
  if (!docId) return;
  try{
    var doc = DocumentApp.openById(docId), body = doc.getBody();
    var dateStr = Utilities.formatDate(new Date(), tz_(), 'yyyy-MM-dd (EEE)');
    body.appendParagraph('────────────────────────────────').setForegroundColor('#999999');
    body.appendParagraph('OS Revision • ' + dateStr).setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph('Due (5):').setBold(true);
    body.appendParagraph('• ' + (payload.dueTitles.join('\n• ') || '(none)'));
    body.appendParagraph('New (5):').setBold(true);
    body.appendParagraph('• ' + (payload.newTitles.join('\n• ') || '(none)'));
    body.appendParagraph('Notes: ').setForegroundColor('#666666');
    body.appendParagraph(' ');
    doc.saveAndClose();
  } catch(e){ Logger.log('Doc log append failed: ' + e); }
}

/***** MOBILE EMAIL UTILS (sanitize + wrapper + table cards) *****/
// Strip ```html/``` fences, remove <html>/<body>, normalize blocks for mobile Gmail
function sanitizeModelHtml_(s) {
  if (!s) return '';
  s = String(s);
  s = s.replace(/^```[\w-]*\s*/i, '').replace(/```$/i, '').replace(/```/g, '');
  s = s.replace(/<\/?(html|body)[^>]*>/gi, '');
  s = s.replace(/<pre[^>]*>/gi, '<div style="white-space:normal;">').replace(/<\/pre>/gi,'</div>');
  s = s.replace(/<blockquote[^>]*>/gi,
        '<div style="margin:12px 0;padding:10px 12px;border-left:4px solid #0ea5e9;background:#e0f2fe;border-radius:6px;">')
       .replace(/<\/blockquote>/gi, '</div>');
  return s.trim();
}
// Fluid one-column wrapper for mobile Gmail
function wrapEmailMobile_(inner) {
  var outerBG = '#f1f5f9', maxW = 640;
  return ''
    + '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"'
    + ' style="margin:0;padding:0;background:'+outerBG+';-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">'
    + '<tr><td align="center" style="padding:12px;">'
    +   '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"'
    +   ' style="max-width:'+maxW+'px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;">'
    +     '<tr><td style="padding:12px;">' + inner + '</td></tr>'
    +   '</table>'
    + '</td></tr></table>';
}
function badgesRow_(items){
  return items.map(function(b){
    return '<span style="display:inline-block;background:'+b.bg+';color:#fff;border-radius:999px;padding:4px 10px;font-size:12px;margin-right:6px;">'+escapeHtml_(b.text)+'</span>';
  }).join('');
}
function sectionList_(title, items, color){
  var rows = items.map(function(x){ return '<li style="margin:6px 0;">'+ escapeHtml_(x.q) +'</li>'; }).join('');
  return ''
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;border:1px solid #e5e7eb;border-radius:12px;background:#ffffff;">'
    + '<tr><td style="padding:12px 14px;font-family:Inter,Segoe UI,Arial,sans-serif;">'
    +   '<div style="font-weight:700;margin-bottom:6px;">'+ escapeHtml_(title) +'</div>'
    +   '<div style="height:2px;background:'+color+';margin:6px 0 10px;"></div>'
    +   '<ol style="margin:0;padding-left:18px;">'+ rows +'</ol>'
    + '</td></tr></table>';
}
function cardTable_(title, bodyHtml){
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

/***** GEMINI (per-question answer) *****/
function getCachedGeminiHtmlForOSQuestion_(question, qIndex, opt){
  var key = 'os_q_' + qIndex + '_' + textHash_(question);
  var cache = CacheService.getScriptCache(), cached = cache.get(key);
  if (cached) return cached;

  var html = getGeminiHtmlForOSQuestion_(question, opt);
  var sec = Math.min((opt.cacheHours||168)*3600, 6*3600);
  cache.put(key, html, sec);
  return html;
}
function getGeminiHtmlForOSQuestion_(question, opt){
  var fast = opt && opt.fastPrompt;
  var maxTok = (opt && opt.maxTokens) || APP_CFG.GEMINI_MAX_TOKENS;

  var prompt =
'Return PURE HTML only (inline CSS ok; no external links). You are an OS tutor.\n' +
'Question: ' + question + '\n' +
(fast
 ? '<div><strong>Answer (concise):</strong> 4–6 bullet points.</div>'
   +'<div style="margin-top:6px;"><strong>Why it matters:</strong> 2 bullets.</div>'
   +'<div style="margin-top:6px;"><strong>Pitfalls:</strong> 2 bullets.</div>'
   +'<div style="margin-top:6px;"><strong>Quick check:</strong> 1 mini MCQ + answer.</div>'
 : '<div><strong>Answer:</strong> 6–9 bullet points; include definitions, key formulas/steps, and a tiny example.</div>'
   +'<div style="margin-top:6px;"><strong>Why it matters:</strong> 3 bullets connecting to performance/reliability.</div>'
   +'<div style="margin-top:6px;"><strong>Pitfalls:</strong> 3 bullets with precise contrasts (e.g., mutex vs semaphore).</div>'
   +'<div style="margin-top:6px;"><strong>Follow-up:</strong> 1 interview-style question with a 2-line solution.</div>' );

  var out = sanitizeModelHtml_( callGemini_(prompt, {
    model: (opt && opt.model) || APP_CFG.GEMINI_MODEL,
    temp: (opt && opt.temp)!=null ? opt.temp : APP_CFG.GEMINI_TEMPERATURE,
    maxTokens: maxTok
  }) );
  return out || '<p style="color:#888;">(Answer unavailable.)</p>';
}

/***** EMAIL — GMAIL-FRIENDLY (wrapped for mobile) *****/
function buildEmailHtmlOS_(payload){
  var esc = escapeHtml_;
  var yourName = payload.yourName;
  var due = payload.due, fresh = payload.fresh, qa = payload.qaBlocks;

  var stamp = Utilities.formatDate(new Date(), tz_(), 'yyyy-MM-dd HH:mm z');

  var header =
    '<div style="background:linear-gradient(135deg,#0ea5e9,#38bdf8);color:#fff;border-radius:14px;padding:16px 18px;">' +
      '<div style="font-size:18px;font-weight:800;">OS Daily • ' + esc(yourName) + '</div>' +
      '<div style="opacity:.95;font-size:12px;margin-top:2px;">' + esc(stamp) + '</div>' +
      '<div style="margin-top:10px;">' +
        badgesRow_([{text:'Revision: '+due.length,bg:'#22c55e'},{text:'New: '+fresh.length,bg:'#a78bfa'},{text:'Total bank: 100',bg:'#f59e0b'}]) +
      '</div>' +
    '</div>';

  var listDue  = sectionList_('Due for Revision (5)', due,  '#22c55e');
  var listNew  = sectionList_('New to Learn (5)',   fresh,'#a78bfa');
  var cards    = qa.map(function(b){ return cardTable_(b.q, b.html); }).join('');

  var quote = pickRandom_([
    "Understand the internals; performance follows.",
    "Good scheduling beats raw power.",
    "Abstractions are powerful—until you need to debug them."
  ]);

  var inner =
    header + listDue + listNew +
    '<div style="margin-top:18px;font-size:15px;font-weight:800;">Today’s Answers</div>' +
    '<div style="height:2px;background:#0ea5e966;margin:6px 0 10px;"></div>' +
    cards +
    '<div style="margin:18px 0;padding:10px 12px;border-left:4px solid #0ea5e9;background:#e0f2fe;border-radius:6px;"><em>'+esc(quote)+'</em></div>' +
    '<div style="color:#6b7280;font-size:12px;">Auto-generated. Keep hustling 🚀</div>';

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
function escapeHtml_(s){ if (s==null) return ''; return String(s).replace(/[&<>"']/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&quot;',"'":'&#39;'}[c]); }); }
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
function debugRunOSOnce(){ runOSDailyFast(); }
