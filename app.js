/* Ôn thi 600 câu lý thuyết GPLX. Giao diện gốc.
   Câu hỏi theo bộ sát hạch Cục CSGT, Công văn 2262/CSGT-P5. */
(function () {
  const CHAPTERS = [
    { id: 1, name: "Quy định chung và quy tắc giao thông", from: 1, to: 180 },
    { id: 2, name: "Văn hóa, đạo đức, PCCC và cứu nạn", from: 181, to: 205 },
    { id: 3, name: "Kỹ thuật lái xe", from: 206, to: 263 },
    { id: 4, name: "Cấu tạo và sửa chữa", from: 264, to: 300 },
    { id: 5, name: "Báo hiệu đường bộ", from: 301, to: 485 },
    { id: 6, name: "Sa hình và xử lý tình huống", from: 486, to: 600 },
  ];

  // Phụ lục I Công văn 2262/CSGT-P5: 250 câu dùng cho hạng A1 và A.
  const A1_IDS = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 19, 20, 21, 22, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47, 48, 49, 51, 52, 53, 54, 56, 57, 59, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 80, 81, 87, 88, 90, 91, 92, 93, 94, 96, 97, 98, 99, 100, 102, 103, 107, 109, 110, 111, 119, 123, 124, 125, 126, 137, 138, 140, 141, 142, 145, 146, 151, 155, 163, 167, 178,
    182, 185, 187, 189, 191, 192, 193, 194, 195, 200,
    206, 215, 219, 232, 233, 240, 241, 242, 254, 255, 257, 258, 259, 260, 261,
    303, 304, 305, 306, 307, 313, 314, 315, 317, 318, 322, 323, 324, 325, 326, 329, 330, 335, 345, 346, 347, 348, 349, 350, 351, 354, 360, 362, 364, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 380, 381, 382, 386, 387, 389, 390, 391, 393, 394, 395, 397, 398, 400, 401, 411, 412, 413, 415, 419, 422, 427, 430, 431, 432, 433, 434, 435, 437, 438, 439, 440, 441, 442, 445, 450, 451, 452, 454, 455, 457, 458, 459, 460, 461, 474, 475, 476, 478,
    486, 487, 490, 492, 495, 499, 500, 503, 504, 505, 507, 508, 509, 517, 520, 525, 527, 528, 529, 538, 539, 540, 543, 548, 553, 556, 559, 560, 562, 565, 567, 568, 583, 592, 600,
  ];
  const A1_SET = new Set(A1_IDS);
  // Nhóm 20 câu điểm liệt của hạng A1/A trong Phụ lục I. Các câu liệt ô tô khác vẫn có thể nằm trong 250 câu, nhưng không làm trượt cả bài A1.
  const A1_CRITICAL_IDS = [19, 20, 21, 22, 24, 26, 27, 28, 30, 47, 48, 52, 53, 63, 64, 65, 68, 70, 71, 72];
  const A1_CRITICAL = new Set(A1_CRITICAL_IDS);

  // Cơ cấu đề theo Mục II Công văn 2262/CSGT-P5.
  // Câu điểm liệt được bốc riêng, không tính vào số câu của từng chương.
  const LICENSES = {
    A1: { id: "A1", name: "Hạng A1", count: 25, minutes: 19, pass: 21, pool: A1_SET, rules: 8, culture: 1, techMode: "either", signs: 8, situations: 6 },
    A: { id: "A", name: "Hạng A", count: 25, minutes: 19, pass: 23, pool: A1_SET, rules: 8, culture: 1, techMode: "either", signs: 8, situations: 6 },
    B: { id: "B", name: "Hạng B", count: 30, minutes: 20, pass: 27, rules: 8, culture: 1, tech: 1, repair: 1, signs: 9, situations: 9 },
    C1: { id: "C1", name: "Hạng C1", count: 35, minutes: 22, pass: 32, rules: 10, culture: 1, tech: 2, repair: 1, signs: 10, situations: 10 },
    C: { id: "C", name: "Hạng C", count: 40, minutes: 24, pass: 36, rules: 10, culture: 1, tech: 2, repair: 1, signs: 14, situations: 11 },
    D: { id: "D", name: "Hạng D1–DE", count: 45, minutes: 26, pass: 41, rules: 10, culture: 1, tech: 2, repair: 1, signs: 16, situations: 14, hint: "D1, D2, D, BE, C1E, CE, D1E, D2E, DE" },
  };

  const STORE_KEY = "gplx600-v1";
  const EXAM_KEY = "gplx600-exam";

  const QUESTIONS = (typeof globalThis.QUESTION_BANK !== "undefined" ? globalThis.QUESTION_BANK : []);
  // Phụ lục III Công văn 2262/CSGT-P5. Cờ trong file dữ liệu gốc không khớp phụ lục này.
  const CRITICAL_IDS = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 32, 34, 35, 47, 48, 52, 53, 55, 58, 63, 64, 65, 66, 67, 68, 70, 71, 72, 73, 74, 85, 86, 87, 88, 89, 90, 91, 92, 93, 97, 98, 102, 117, 163, 165, 167, 197, 198, 206, 215, 226, 234, 245, 246, 252, 253, 254, 255, 260];
  const CRITICAL = new Set(CRITICAL_IDS);
  QUESTIONS.forEach((q) => {
    q.is_critical = CRITICAL.has(q.id);
    if (typeof q.explanation === "string") {
      q.explanation = q.explanation.replace(/^🚨\s*\[CÂU ĐIỂM LIỆT\]\s*/, "");
    }
  });
  const byId = new Map(QUESTIONS.map((q) => [q.id, q]));

  const local = area("localStorage");
  const session = area("sessionStorage");
  const store = loadStore();
  applyTheme();
  const state = {
    view: "home",
    study: null,
    exam: null,
    result: null,
    answers: null,
    resume: readExam(),
    query: "",
  };
  let clockTimer = 0;

  function area(name) {
    try {
      const box = globalThis[name];
      const key = "__gplx_probe__";
      box.setItem(key, "1");
      box.removeItem(key);
      return box;
    } catch (err) {
      const mem = {};
      return {
        getItem(key) { return Object.prototype.hasOwnProperty.call(mem, key) ? mem[key] : null; },
        setItem(key, value) { mem[key] = String(value); },
        removeItem(key) { delete mem[key]; },
      };
    }
  }

  function loadStore() {
    try {
      const raw = JSON.parse(local.getItem(STORE_KEY) || "{}");
      return {
        wrong: raw.wrong && typeof raw.wrong === "object" ? raw.wrong : {},
        saved: new Set(Array.isArray(raw.saved) ? raw.saved : []),
        markMode: raw.markMode === "submit" ? "submit" : "instant",
        theme: raw.theme === "dark" ? "dark" : "light",
      };
    } catch (err) {
      return { wrong: {}, saved: new Set(), markMode: "instant", theme: "light" };
    }
  }

  function saveStore() {
    local.setItem(STORE_KEY, JSON.stringify({
      wrong: store.wrong,
      saved: [...store.saved],
      markMode: store.markMode === "submit" ? "submit" : "instant",
      theme: store.theme === "dark" ? "dark" : "light",
    }));
  }

  function applyTheme() {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = store.theme === "dark" ? "dark" : "light";
  }

  function submitMode() {
    return store.markMode === "submit";
  }

  function readExam() {
    try { return JSON.parse(session.getItem(EXAM_KEY) || "null"); }
    catch (err) { return null; }
  }

  function writeExam(exam) {
    if (!exam) session.removeItem(EXAM_KEY);
    else session.setItem(EXAM_KEY, JSON.stringify(exam));
    state.resume = exam;
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[ch]));
  }

  function shuffle(list, rnd) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rnd() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function sample(list, count, rnd) {
    if (list.length < count) {
      throw new Error("Không đủ câu để bốc đề (" + list.length + "/" + count + ")");
    }
    return shuffle(list, rnd).slice(0, count);
  }

  function poolOf(cfg) {
    return cfg.pool ? QUESTIONS.filter((q) => cfg.pool.has(q.id)) : QUESTIONS;
  }

  function lietSet(cfg) {
    return cfg.pool === A1_SET ? A1_CRITICAL : CRITICAL;
  }

  function buildExam(licenseId, rnd) {
    const random = rnd || Math.random;
    const cfg = LICENSES[licenseId];
    const pool = poolOf(cfg);
    const liet = lietSet(cfg);
    const take = (pred, count) => sample(pool.filter(pred), count, random);
    const normal = (q) => !liet.has(q.id);
    const parts = [
      ...take((q) => q.chapter === 1 && normal(q), cfg.rules),
      ...take((q) => liet.has(q.id), 1),
      ...take((q) => q.chapter === 2 && normal(q), cfg.culture),
    ];
    if (cfg.techMode === "either") {
      parts.push(...take((q) => (q.chapter === 3 || q.chapter === 4) && normal(q), 1));
    } else {
      parts.push(...take((q) => q.chapter === 3 && normal(q), cfg.tech));
      parts.push(...take((q) => q.chapter === 4 && normal(q), cfg.repair));
    }
    parts.push(...take((q) => q.chapter === 5 && normal(q), cfg.signs));
    parts.push(...take((q) => q.chapter === 6 && normal(q), cfg.situations));
    const picked = shuffle(parts, random);
    if (picked.length !== cfg.count || new Set(picked.map((q) => q.id)).size !== cfg.count) {
      throw new Error("Đề " + licenseId + " không đúng số câu");
    }
    return picked.map((q) => q.id);
  }

  function grade(licenseId, ids, picked) {
    const cfg = LICENSES[licenseId];
    const liet = lietSet(cfg);
    let correct = 0;
    let lietWrong = false;
    ids.forEach((id, index) => {
      const question = byId.get(id);
      const answer = picked[index];
      if (answer === question.correct_option) correct += 1;
      else if (liet.has(id)) lietWrong = true;
    });
    return {
      correct,
      lietWrong,
      passed: correct >= cfg.pass && !lietWrong,
      pass: cfg.pass,
      count: cfg.count,
    };
  }

  function selfTest() {
    if (QUESTIONS.length !== 600) throw new Error("Thiếu câu hỏi: " + QUESTIONS.length);
    if (CRITICAL_IDS.length !== 60 || CRITICAL.size !== 60) throw new Error("Danh sách điểm liệt không đủ 60 câu");
    if (A1_IDS.length !== 250 || A1_SET.size !== 250) throw new Error("Bộ A1 không đủ 250 câu");
    A1_IDS.forEach((id) => {
      if (!byId.has(id)) throw new Error("A1 thiếu câu " + id);
    });
    A1_CRITICAL_IDS.forEach((id) => {
      if (!A1_SET.has(id) || !CRITICAL.has(id)) throw new Error("Câu liệt A1 không thuộc bộ 250 hoặc bộ 60: " + id);
    });
    if (A1_CRITICAL.size !== 20) throw new Error("Bộ điểm liệt A1 không đủ 20 câu");
    Object.keys(LICENSES).forEach((id) => {
      for (let n = 0; n < 30; n += 1) {
        const ids = buildExam(id, Math.random);
        const questions = ids.map((qid) => byId.get(qid));
        const cfg = LICENSES[id];
        const liet = lietSet(cfg);
        const critical = questions.filter((q) => liet.has(q.id));
        if (critical.length !== 1) throw new Error(id + " không có đúng 1 câu liệt");
        const rest = questions.filter((q) => !liet.has(q.id));
        const countChapter = (chapter) => rest.filter((q) => q.chapter === chapter).length;
        if (countChapter(1) !== cfg.rules || countChapter(2) !== cfg.culture) {
          throw new Error(id + " sai cơ cấu chương 1-2");
        }
        if (countChapter(5) !== cfg.signs || countChapter(6) !== cfg.situations) {
          throw new Error(id + " sai cơ cấu biển báo hoặc sa hình");
        }
        if (cfg.techMode === "either") {
          const tech = countChapter(3) + countChapter(4);
          if (tech !== 1) throw new Error(id + " sai câu kỹ thuật");
        } else if (countChapter(3) !== cfg.tech || countChapter(4) !== cfg.repair) {
          throw new Error(id + " sai cơ cấu kỹ thuật hoặc cấu tạo");
        }
        if (cfg.pool && ids.some((qid) => !cfg.pool.has(qid))) throw new Error(id + " lọt câu ngoài bộ");
      }
    });
    return {
      questions: QUESTIONS.length,
      images: QUESTIONS.filter((q) => q.image).length,
      critical: QUESTIONS.filter((q) => q.is_critical).length,
      criticalA1: A1_CRITICAL.size,
    };
  }

  function studyIds(kind, extra) {
    if (kind === "all") return QUESTIONS.map((q) => q.id);
    if (kind === "chapter") return QUESTIONS.filter((q) => q.chapter === extra).map((q) => q.id);
    if (kind === "critical") return QUESTIONS.filter((q) => q.is_critical).map((q) => q.id);
    if (kind === "image") return QUESTIONS.filter((q) => q.image).map((q) => q.id);
    if (kind === "wrong") return Object.keys(store.wrong).map(Number).filter((id) => byId.has(id)).sort((a, b) => a - b);
    if (kind === "saved") return [...store.saved].filter((id) => byId.has(id)).sort((a, b) => a - b);
    if (kind === "a1") return A1_IDS.slice();
    if (kind === "a1-critical") return A1_CRITICAL_IDS.slice();
    return [];
  }

  function openStudy(kind, extra, title) {
    clearInterval(clockTimer);
    const ids = studyIds(kind, extra);
    state.view = "study";
    state.query = "";
    state.study = { kind, extra: extra || null, title, ids, index: 0, picks: {} };
    render({ scroll: "top" });
  }

  function visibleStudyIds() {
    const query = state.query.trim().toLowerCase();
    if (!query) return state.study.ids;
    return state.study.ids.filter((id) => {
      const question = byId.get(id);
      const hay = (question.question + " " + question.options.join(" ") + " " + id).toLowerCase();
      return hay.includes(query);
    });
  }

  function startExam(licenseId) {
    const cfg = LICENSES[licenseId];
    const ids = buildExam(licenseId);
    const exam = {
      licenseId,
      ids,
      picked: ids.map(() => null),
      revealed: ids.map(() => false),
      index: 0,
      endsAt: Date.now() + cfg.minutes * 60 * 1000,
    };
    state.exam = exam;
    state.result = null;
    state.view = "exam";
    writeExam(exam);
    render({ scroll: "top" });
    armClock();
  }

  function retryExam() {
    const result = state.result;
    if (!result || !LICENSES[result.licenseId] || !result.ids || !result.ids.length) return;
    const cfg = LICENSES[result.licenseId];
    const ids = result.ids.slice();
    const exam = {
      licenseId: result.licenseId,
      ids,
      picked: ids.map(() => null),
      revealed: ids.map(() => false),
      index: 0,
      endsAt: Date.now() + cfg.minutes * 60 * 1000,
    };
    state.exam = exam;
    state.result = null;
    state.view = "exam";
    writeExam(exam);
    render({ scroll: "top" });
    armClock();
  }

  function resumeExam() {
    const saved = readExam();
    if (!saved || !LICENSES[saved.licenseId]) return;
    if (!Array.isArray(saved.revealed)) saved.revealed = saved.ids.map(() => false);
    state.exam = saved;
    state.view = "exam";
    if (saved.endsAt <= Date.now()) submitExam(true);
    else {
      render({ scroll: "top" });
      armClock();
    }
  }

  function submitExam(auto) {
    if (!state.exam) return;
    if (!auto) {
      const blank = state.exam.picked.filter((value) => !value).length;
      const note = blank ? " Còn " + blank + " câu chưa chọn." : "";
      if (!window.confirm("Nộp bài?" + note)) return;
    }
    const result = grade(state.exam.licenseId, state.exam.ids, state.exam.picked);
    state.exam.ids.forEach((id, index) => {
      const question = byId.get(id);
      const answer = state.exam.picked[index];
      if (!answer || answer !== question.correct_option) store.wrong[id] = (store.wrong[id] || 0) + 1;
      else delete store.wrong[id];
    });
    saveStore();
    state.result = Object.assign({
      licenseId: state.exam.licenseId,
      ids: state.exam.ids.slice(),
      picked: state.exam.picked.slice(),
    }, result, { index: null });
    state.view = "result";
    state.exam = null;
    writeExam(null);
    clearInterval(clockTimer);
    render({ scroll: "top" });
  }

  function armClock() {
    clearInterval(clockTimer);
    clockTimer = setInterval(() => {
      const node = document.getElementById("clock");
      if (!node || !state.exam) return;
      const left = state.exam.endsAt - Date.now();
      node.textContent = formatTime(left);
      node.classList.toggle("urgent", left < 60000);
      if (left <= 0) submitExam(true);
    }, 250);
  }

  function formatTime(ms) {
    const total = Math.max(0, Math.ceil(ms / 1000));
    const minutes = String(Math.floor(total / 60)).padStart(2, "0");
    const seconds = String(total % 60).padStart(2, "0");
    return minutes + ":" + seconds;
  }

  function themeIcon(dark) {
    if (dark) {
      return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>' +
        '<path d="M12 2.4v3.2M12 18.4v3.2M2.4 12h3.2M18.4 12h3.2M5.2 5.2l2.3 2.3M16.5 16.5l2.3 2.3M18.8 5.2l-2.3 2.3M7.5 16.5l-2.3 2.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
        "</svg>";
    }
    return '<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1C274C"></path> </g></svg>';
  }

  

  function saveIcon(on) {
    const shape = "M8 3.5h8a1 1 0 0 1 1 1V20.5l-5-2.8-5 2.8V4.5a1 1 0 0 1 1-1z";
    if (on) return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="' + shape + '"/></svg>';
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="' + shape + '" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';
  }

  function header() {
    const dark = store.theme === "dark";
    const studyOn = state.view === "study" && state.study && state.study.kind === "all";
    const examId = state.view === "exam" && state.exam
      ? state.exam.licenseId
      : (state.view === "result" && state.result ? state.result.licenseId : "");
    return '<header class="top"><div class="wrap top-inner">' +
      '<button class="brand" data-act="home"><img class="logo" src="favicon.svg" alt="">' +
      '<span class="brand-text"><b>Ôn thi lý thuyết</b><span>Bộ câu Cục CSGT</span></span></button>' +
      '<nav class="nav-links">' +
      '<button class="btn ghost' + (studyOn ? " on" : "") + '" data-act="study" data-kind="all">Ôn 600 câu</button>' +
      '<button class="btn ghost' + (examId === "B" ? " on" : "") + '" data-act="start-exam" data-license="B">Thi thử hạng B</button>' +
      '<button class="btn ghost' + (state.view === "answers" ? " on" : "") + '" data-act="answers">Đáp án</button>' +
      '<button class="btn ghost icon-btn" data-act="theme" aria-pressed="' + dark + '" aria-label="' + (dark ? "Bật giao diện sáng" : "Bật giao diện tối") + '">' + themeIcon(dark) + '</button>' +
      '</nav></div></header>';
  }

  function homeHtml() {
    const wrongCount = Object.keys(store.wrong).length;
    const savedCount = store.saved.size;
    const imageCount = QUESTIONS.filter((q) => q.image).length;
    const licenses = Object.values(LICENSES).map((cfg) => {
      const lietNote = cfg.pool === A1_SET ? "1 câu liệt trong nhóm 20" : "1 câu liệt trong nhóm 60";
      return '<button class="pick" data-act="start-exam" data-license="' + cfg.id + '">' +
        '<strong>' + esc(cfg.name) + '</strong>' +
        '<em>' + cfg.count + ' câu · ' + cfg.minutes + ' phút · đạt ' + cfg.pass + '/' + cfg.count + '</em>' +
        '<em>' + lietNote + '</em>' +
        (cfg.hint ? '<em>' + esc(cfg.hint) + '</em>' : '') +
        '</button>';
    }).join("");
    const resume = state.resume && LICENSES[state.resume.licenseId]
      ? '<div class="banner"><div><strong>Bài thi đang làm dở</strong><div class="meta">' +
        esc(LICENSES[state.resume.licenseId].name) + ' · còn ' + formatTime(state.resume.endsAt - Date.now()) +
        '</div></div><div class="row"><button class="btn primary" data-act="resume">Làm tiếp</button>' +
        '<button class="btn" data-act="discard-exam">Bỏ bài</button></div></div>'
      : "";
    return header() + '<main class="wrap main"><div class="dash">' +
      '<div class="dash-head"><h1>Tổng quan</h1>' +
      '<p class="lead">Bộ 600 câu Cục CSGT. Hạng ô tô sai 1 trong 60 câu liệt là trượt. Hạng A1 và A chỉ tính 20 câu liệt.</p></div>' +
      '<div class="statgrid">' +
      statButton("all", String(QUESTIONS.length), "Câu hỏi", "") +
      statButton("image", String(imageCount), "Câu có hình", "") +
      statButton("critical", "60", "Điểm liệt", " liet") +
      statButton("a1-critical", "20", "Liệt A1, A", " liet") +
      statButton("wrong", String(wrongCount), "Câu đang sai", "") +
      statButton("saved", String(savedCount), "Câu đã lưu", "") +
      '</div>' +
      resume +
      '<section class="card panel"><h2>Thi thử</h2><div class="grid licenses">' + licenses + '</div></section>' +
      '<section class="card panel"><h2>Ôn tập</h2><div class="grid modes">' +
      modeButton("all", "Cả 600 câu", "Từ câu 1 đến câu 600") +
      '<button class="mode" data-act="answers"><strong>Hiện toàn bộ đáp án</strong><em>Đáp án đúng của 600 câu</em></button>' +
      modeButton("critical", "60 câu điểm liệt", "Sai một câu là trượt ô tô") +
      modeButton("image", "Câu có hình", imageCount + " biển báo và sa hình") +
      modeButton("a1", "250 câu A1 / A", "Đúng phụ lục mô tô") +
      modeButton("a1-critical", "20 câu liệt A1 / A", "Sai một câu là trượt mô tô") +
      modeButton("wrong", "Câu đang sai", wrongCount + " câu") +
      modeButton("saved", "Câu đã lưu", savedCount + " câu") +
      '</div></section>' +
      '<section class="card panel"><h2>Theo chương</h2><div class="grid modes">' +
      CHAPTERS.map((chapter) => {
        return '<button class="mode" data-act="study" data-kind="chapter" data-extra="' + chapter.id + '">' +
          '<strong>Chương ' + chapter.id + '</strong><em>' + esc(chapter.name) + '</em>' +
          '<em>Câu ' + chapter.from + '–' + chapter.to + '</em></button>';
      }).join("") +
      '</div></section>' +
      '<p class="footer-note">Made by LongDC. Trang web chỉ phục vụ mục đích ôn luyện và học tập, không thương mại.</p></div></main>';
  }

  function statButton(kind, value, label, extra) {
    return '<button class="stat' + extra + '" data-act="study" data-kind="' + kind + '"><b>' + esc(value) + '</b><span>' + esc(label) + '</span></button>';
  }

  function markModeSwitch() {
    const instant = !submitMode();
    return '<div class="seg" role="group" aria-label="Cách chấm">' +
      '<button data-act="mark-mode" data-mode="instant" class="' + (instant ? "on" : "") + '" aria-pressed="' + instant + '">Chấm ngay</button>' +
      '<button data-act="mark-mode" data-mode="submit" class="' + (instant ? "" : "on") + '" aria-pressed="' + !instant + '">Chấm khi nộp</button></div>';
  }

  function studyLiet(question) {
    if (state.study && (state.study.kind === "a1" || state.study.kind === "a1-critical")) return A1_CRITICAL.has(question.id);
    return question.is_critical;
  }

  function modeButton(kind, title, note) {
    return '<button class="mode" data-act="study" data-kind="' + kind + '"><strong>' + esc(title) + '</strong><em>' + esc(note) + '</em></button>';
  }

  function questionBody(question, picked, revealed, lietVisible) {
    const figure = question.image
      ? '<img class="figure" data-act="zoom" src="' + esc(question.image) + '" alt="Hình câu ' + question.id + '">'
      : "";
    const options = question.options.map((text, index) => {
      const number = index + 1;
      let cls = "opt";
      if (revealed && number === question.correct_option) cls += " correct";
      else if (revealed && picked === number) cls += " wrong";
      else if (!revealed && picked === number) cls += " chosen";
      return '<button class="' + cls + '" data-act="pick" data-n="' + number + '"><span class="n">' + number + '</span><span>' + esc(text) + '</span></button>';
    }).join("");
    const explain = revealed
      ? '<div class="explain"><b>Đáp án ' + question.correct_option + '</b>' + esc(question.explanation || "Không có giải thích thêm.") + '</div>'
      : "";
    const saved = store.saved.has(question.id);
    const badges = '<span class="pill">Câu ' + question.id + '</span>' +
      (lietVisible && question.is_critical ? '<span class="pill liet">Điểm liệt</span>' : '');
    return '<div class="qhead"><div class="row">' + badges + '</div>' +
      '<button class="btn icon-btn save-btn' + (saved ? " on" : "") + '" data-act="toggle-save" data-id="' + question.id + '" aria-label="' + (saved ? "Bỏ lưu" : "Lưu câu") + '" title="' + (saved ? "Bỏ lưu" : "Lưu câu") + '">' + saveIcon(saved) + '</button></div>' +
      '<p class="qtext">' + esc(question.question) + '</p>' + figure +
      '<div class="options">' + options + '</div>' + explain;
  }

  function studyDots(ids) {
    return ids.map((id, index) => {
      const question = byId.get(id);
      const memory = state.study.picks[id] || {};
      let cls = "dot";
      if (index === state.study.index) cls += " on";
      if (memory.revealed && memory.picked) cls += memory.picked === question.correct_option ? " correct" : " wrong";
      else if (memory.revealed && state.study.graded) cls += " wrong";
      else if (memory.revealed) cls += " seen";
      else if (memory.picked) cls += " done";
      if (studyLiet(question)) cls += " liet";
      return '<button class="' + cls + '" data-act="goto" data-i="' + index + '" title="Câu ' + id + '">' + id + '</button>';
    }).join("");
  }

  function studyHtml() {
    const ids = visibleStudyIds();
    if (state.study.index >= ids.length) state.study.index = Math.max(0, ids.length - 1);
    const empty = ids.length === 0;
    const id = ids[state.study.index];
    const question = id ? byId.get(id) : null;
    const memory = question ? (state.study.picks[question.id] || {}) : {};
    const liet = question ? studyLiet(question) : false;
    const graded = !!state.study.graded;
    const waiting = submitMode() && !graded;
    let mid = '<button class="btn" data-act="reveal">Xem đáp án</button>';
    if (graded) mid = '<button class="btn" data-act="retry-study">Làm lại</button>';
    else if (waiting) mid = '<button class="btn primary" data-act="grade-study"' + (empty ? " disabled" : "") + '>Chấm bài</button>';
    const card = empty
      ? '<div class="qcard"><p>Không có câu nào trong mục này.</p></div>'
      : '<article class="qcard' + (liet ? " liet" : "") + '">' + questionBody(question, memory.picked || null, !!memory.revealed, liet) +
        '<div class="nav"><button class="btn" data-act="prev" ' + (state.study.index === 0 ? "disabled" : "") + '>Câu trước</button>' +
        mid +
        '<button class="btn primary" data-act="next" ' + (state.study.index >= ids.length - 1 ? "disabled" : "") + '>Câu sau</button></div></article>';
    const pickedCount = state.study.ids.filter((qid) => (state.study.picks[qid] || {}).picked).length;
    const summary = state.study.summary
      ? '<div class="banner"><div><strong>Đúng ' + state.study.summary.correct + '/' + state.study.summary.total + '</strong>' +
        '<div class="meta">' + (state.study.summary.lietWrong ? "Có câu điểm liệt bị sai hoặc bỏ trống." : "Không sai câu điểm liệt.") + '</div></div>' +
        '<button class="btn" data-act="retry-study">Làm lại</button></div>'
      : "";
    const sideMeta = waiting
      ? pickedCount + "/" + state.study.ids.length + " đã chọn"
      : ids.length + " câu";
    const side = '<aside class="side"><div class="side-head"><strong>Số câu</strong><span class="meta">' + sideMeta + '</span>' +
      '<span class="meta">Dấu * là câu liệt</span></div>' +
      '<div class="dots">' + studyDots(ids) + '</div>' +
      (waiting && !empty ? '<button class="btn primary" data-act="grade-study">Chấm bài</button>' : "") +
      '</aside>';
    return header() + '<main class="wrap main"><div class="row toolbar">' +
      '<strong>' + esc(state.study.title) + '</strong>' +
      '<span class="meta">' + (empty ? "0 câu" : (state.study.index + 1) + " / " + ids.length) + '</span>' +
      markModeSwitch() +
      (state.study.kind === "all" ? '<button class="btn" data-act="answers">Hiện toàn bộ đáp án</button>' : '') +
      '<input class="grow" type="search" data-act="search" placeholder="Tìm nội dung hoặc số câu" value="' + esc(state.query) + '">' +
      '<button class="btn" data-act="shuffle"' + (graded ? " disabled" : "") + '>Xáo trộn</button></div>' +
      keyTip() +
      summary +
      '<div class="layout with-side">' + card + side + '</div></main>';
  }

  function examHtml() {
    const exam = state.exam;
    const cfg = LICENSES[exam.licenseId];
    const liet = lietSet(cfg);
    const question = byId.get(exam.ids[exam.index]);
    const revealedHere = !!(exam.revealed && exam.revealed[exam.index]);
    const lietHere = revealedHere && liet.has(question.id);
    const dots = exam.ids.map((id, index) => {
      const revealed = !!(exam.revealed && exam.revealed[index]);
      const item = byId.get(id);
      let cls = "dot";
      if (index === exam.index) cls += " on";
      if (revealed && exam.picked[index]) cls += exam.picked[index] === item.correct_option ? " correct" : " wrong";
      else if (exam.picked[index]) cls += " done";
      if (revealed && liet.has(id)) cls += " liet";
      return '<button class="' + cls + '" data-act="goto" data-i="' + index + '" title="Câu ' + (index + 1) + ' trong đề">' + (index + 1) + '</button>';
    }).join("");
    const blank = exam.picked.filter((value) => !value).length;
    return header() + '<main class="wrap main"><div class="row toolbar"><strong>' + esc(cfg.name) + '</strong>' +
      '<span class="meta">Câu ' + (exam.index + 1) + '/' + cfg.count + '</span>' + markModeSwitch() + '</div>' +
      keyTip() +
      '<div class="layout with-side"><article class="qcard' + (lietHere ? " liet" : "") + '">' +
      questionBody(question, exam.picked[exam.index], revealedHere, lietHere) +
      '<div class="nav"><button class="btn" data-act="prev" ' + (exam.index === 0 ? "disabled" : "") + '>Trước</button>' +
      '<button class="btn" data-act="next" ' + (exam.index === exam.ids.length - 1 ? "disabled" : "") + '>Sau</button></div></article>' +
      '<aside class="side"><div class="side-head"><p class="clock' + (exam.endsAt - Date.now() < 60000 ? " urgent" : "") + '" id="clock">' + formatTime(exam.endsAt - Date.now()) + '</p>' +
      '<div class="meta">Đạt ' + cfg.pass + '/' + cfg.count + ', không sai câu liệt</div>' +
      (submitMode() ? '<span class="meta">Dấu * hiện sau khi nộp</span>' : '<span class="meta">Dấu * hiện sau khi chấm câu đó</span>') +
      '</div><div class="dots">' + dots + '</div>' +
      '<button class="btn primary" data-act="submit">Nộp bài' + (blank ? " (" + blank + " trống)" : "") + '</button></aside></div></main>';
  }

  function resultHtml() {
    const result = state.result;
    const cfg = LICENSES[result.licenseId];
    const headline = result.passed ? "ĐẠT" : "KHÔNG ĐẠT";
    const reason = result.lietWrong ? " Sai câu điểm liệt." : "";
    const liet = lietSet(cfg);
    const selected = Number.isInteger(result.index) ? result.index : -1;
    let review = '<article class="qcard review-empty"><p>Chọn một số câu để xem lại.</p></article>';
    if (selected >= 0 && selected < result.ids.length) {
      const id = result.ids[selected];
      const question = byId.get(id);
      const answer = result.picked[selected];
      const good = answer === question.correct_option;
      const isLiet = liet.has(id);
      review = '<article class="qcard' + (isLiet ? " liet" : "") + '" id="review-' + selected + '"><div class="row"><span class="pill ' + (good ? "ok" : "bad") + '">' +
        (good ? "Đúng" : "Sai") + '</span><span class="meta">Câu ' + (selected + 1) + ' trong đề</span></div>' +
        questionBody(question, answer, true, isLiet) + '</article>';
    }
    const dots = result.ids.map((id, index) => {
      const question = byId.get(id);
      const good = result.picked[index] === question.correct_option;
      const isLiet = liet.has(id);
      let cls = "dot " + (good ? "correct" : "wrong");
      if (isLiet) cls += " liet";
      if (index === selected) cls += " on";
      return '<button class="' + cls + '" data-act="goto-review" data-i="' + index + '" title="Câu ' + (index + 1) + ' trong đề">' + (index + 1) + '</button>';
    }).join("");
    return header() + '<main class="wrap main"><section class="qcard score-card"><p class="score ' + (result.passed ? "pass" : "fail") + '">' + headline + '</p>' +
      '<p><strong>' + result.correct + '/' + result.count + '</strong> câu đúng. Mốc đạt là ' + result.pass + '/' + result.count + '.' + esc(reason) + '</p>' +
      '<div class="row"><button class="btn primary" data-act="retry-exam">Làm lại</button>' +
      '<button class="btn" data-act="start-exam" data-license="' + cfg.id + '">Làm đề mới</button>' +
      '<button class="btn" data-act="study" data-kind="wrong">Ôn câu đang sai</button></div></section>' +
      '<div class="layout with-side">' + review +
      '<aside class="side"><div class="side-head"><strong>Số câu</strong><span class="meta">Bấm số để xem câu</span><span class="meta">Dấu * là câu liệt</span></div><div class="dots">' + dots + '</div></aside></div></main>';
  }

  function openAnswers() {
    clearInterval(clockTimer);
    state.view = "answers";
    state.query = "";
    state.answers = { title: "Đáp án 600 câu", ids: QUESTIONS.map((q) => q.id) };
    render({ scroll: "top" });
  }

  function answerIds() {
    const ids = state.answers.ids;
    const query = state.query.trim().toLowerCase();
    if (!query) return ids;
    return ids.filter((id) => {
      const question = byId.get(id);
      const answer = question.options[question.correct_option - 1] || "";
      return (question.question + " " + answer + " " + id).toLowerCase().includes(query);
    });
  }

  function answersHtml() {
    const ids = answerIds();
    const cards = ids.map((id) => {
      const question = byId.get(id);
      const answer = question.options[question.correct_option - 1] || "";
      const liet = question.is_critical;
      const figure = question.image
        ? '<img class="figure" loading="lazy" data-act="zoom" src="' + esc(question.image) + '" alt="Hình câu ' + id + '">'
        : "";
      return '<article class="akey' + (liet ? " liet" : "") + '" id="answer-' + id + '">' +
        '<div class="row"><span class="pill">Câu ' + id + '</span>' +
        (liet ? '<span class="pill liet">Điểm liệt</span>' : '') + '</div>' +
        '<p class="qtext">' + esc(question.question) + '</p>' +
        '<p class="akey-ok">Đáp án ' + question.correct_option + '. ' + esc(answer) + '</p>' +
        '<details><summary>Giải thích</summary>' + figure +
        '<div class="explain">' + esc(question.explanation || "Không có giải thích thêm.") + '</div></details></article>';
    }).join("");
    const dots = ids.map((id) => {
      const liet = byId.get(id).is_critical ? " liet" : "";
      return '<button class="dot' + liet + '" data-act="goto-answer" data-id="' + id + '" title="Câu ' + id + '">' + id + '</button>';
    }).join("");
    const sheet = ids.length
      ? '<div class="sheet">' + cards + '</div>'
      : '<div class="qcard"><p>Không có câu nào khớp.</p></div>';
    return header() + '<main class="wrap main"><div class="row toolbar"><strong>' + esc(state.answers.title) + '</strong>' +
      '<span class="meta">' + ids.length + ' câu</span>' +
      '<input class="grow" type="search" data-act="search" placeholder="Tìm nội dung hoặc số câu" value="' + esc(state.query) + '"></div>' +
      '<div class="layout with-side"><div class="sheet-wrap">' + sheet + '</div>' +
      '<aside class="side"><div class="side-head"><strong>Số câu</strong><span class="meta">Dấu * là câu liệt</span></div>' +
      '<div class="dots">' + dots + '</div></aside></div></main>';
  }

  function render(options) {
    const app = document.getElementById("app");
    if (!app) return;
    const keep = options && options.scroll === "keep" ? window.scrollY : 0;
    let html = "";
    if (!QUESTIONS.length) html = '<main class="wrap main"><p>Không tải được bộ câu hỏi.</p></main>';
    else if (state.view === "study") html = studyHtml();
    else if (state.view === "exam") html = examHtml();
    else if (state.view === "result") html = resultHtml();
    else if (state.view === "answers") html = answersHtml();
    else html = homeHtml();
    document.body.classList.toggle("fit", state.view === "study" || state.view === "exam" || state.view === "result" || state.view === "answers");
    app.innerHTML = html;
    if (options && options.scroll === "top") window.scrollTo(0, 0);
    else if (options && options.scroll === "keep") window.scrollTo(0, keep);
    const search = app.querySelector('[data-act="search"]');
    if (search && document.activeElement !== search && state.query) search.focus();
    const box = app.querySelector(".dots");
    const current = box && box.querySelector(".dot.on");
    if (current) box.scrollTop = Math.max(0, current.offsetTop - (box.clientHeight - current.offsetHeight) / 2);
  }

  function currentQuestion() {
    if (state.view === "exam" && state.exam) return byId.get(state.exam.ids[state.exam.index]);
    if (state.view === "study" && state.study) {
      const ids = visibleStudyIds();
      return byId.get(ids[state.study.index]);
    }
    return null;
  }

  function rememberStudy(question, patch) {
    const prev = state.study.picks[question.id] || {};
    state.study.picks[question.id] = Object.assign({}, prev, patch);
  }

  function recordAnswer(question, answer) {
    if (answer === question.correct_option) delete store.wrong[question.id];
    else store.wrong[question.id] = (store.wrong[question.id] || 0) + 1;
  }

  function choose(number) {
    const question = currentQuestion();
    if (!question || number < 1 || number > question.options.length) return;
    if (state.view === "exam") {
      const index = state.exam.index;
      if (state.exam.revealed && state.exam.revealed[index]) return;
      state.exam.picked[index] = number;
      if (!submitMode()) {
        if (!Array.isArray(state.exam.revealed)) state.exam.revealed = state.exam.ids.map(() => false);
        state.exam.revealed[index] = true;
      }
      writeExam(state.exam);
      render({ scroll: "keep" });
      return;
    }
    const prev = state.study.picks[question.id] || {};
    if (prev.revealed || state.study.graded) return;
    if (submitMode()) {
      rememberStudy(question, { picked: number, revealed: false });
      render({ scroll: "keep" });
      return;
    }
    recordAnswer(question, number);
    saveStore();
    rememberStudy(question, { picked: number, revealed: true, counted: true });
    render({ scroll: "keep" });
  }

  function revealPending() {
    if (state.view === "exam" && state.exam) {
      if (!Array.isArray(state.exam.revealed)) state.exam.revealed = state.exam.ids.map(() => false);
      state.exam.picked.forEach((answer, index) => {
        if (answer) state.exam.revealed[index] = true;
      });
      writeExam(state.exam);
    }
    if (state.view === "study" && state.study && !state.study.graded) {
      let changed = false;
      state.study.ids.forEach((id) => {
        const memory = state.study.picks[id];
        if (!memory || !memory.picked || memory.revealed) return;
        if (!memory.counted) recordAnswer(byId.get(id), memory.picked);
        state.study.picks[id] = { picked: memory.picked, revealed: true, counted: true };
        changed = true;
      });
      if (changed) saveStore();
    }
  }

  function gradeStudy() {
    if (!state.study || state.study.graded) return;
    const ids = state.study.ids;
    if (!ids.length) return;
    const blank = ids.filter((id) => !(state.study.picks[id] || {}).picked).length;
    const note = blank ? " Còn " + blank + " câu chưa chọn." : "";
    if (!window.confirm("Chấm bài này?" + note)) return;
    let correct = 0;
    let lietWrong = false;
    ids.forEach((id) => {
      const question = byId.get(id);
      const memory = state.study.picks[id] || {};
      const answer = memory.picked || null;
      const good = answer === question.correct_option;
      if (good) correct += 1;
      else if (studyLiet(question)) lietWrong = true;
      if (!memory.counted) recordAnswer(question, answer);
      state.study.picks[id] = { picked: answer, revealed: true, counted: true };
    });
    state.study.graded = true;
    state.study.summary = { correct, total: ids.length, lietWrong };
    state.query = "";
    saveStore();
    render({ scroll: "top" });
  }

  function move(step) {
    if (state.view === "exam" && state.exam) {
      state.exam.index = Math.min(state.exam.ids.length - 1, Math.max(0, state.exam.index + step));
      writeExam(state.exam);
      render({ scroll: "top" });
    } else if (state.view === "study" && state.study) {
      const ids = visibleStudyIds();
      state.study.index = Math.min(ids.length - 1, Math.max(0, state.study.index + step));
      render({ scroll: "top" });
    }
  }

  function onClick(event) {
    const node = event.target.closest("[data-act]");
    if (!node) return;
    const act = node.dataset.act;
    if (act === "zoom") {
      const dialog = document.getElementById("zoom");
      dialog.querySelector("img").src = node.getAttribute("src");
      dialog.showModal();
      return;
    }
    if (act === "home") {
      clearInterval(clockTimer);
      state.view = "home";
      render({ scroll: "top" });
      return;
    }
    if (act === "theme") {
      const pane = document.querySelector(".sheet-wrap");
      const top = pane ? pane.scrollTop : 0;
      store.theme = store.theme === "dark" ? "light" : "dark";
      saveStore();
      applyTheme();
      render({ scroll: "keep" });
      const next = document.querySelector(".sheet-wrap");
      if (next) next.scrollTop = top;
      return;
    }
    if (act === "answers") { openAnswers(); return; }
    if (act === "study") {
      const kind = node.dataset.kind;
      const extra = node.dataset.extra ? Number(node.dataset.extra) : null;
      const titles = {
        all: "Cả 600 câu",
        critical: "60 câu điểm liệt",
        image: "Câu có hình",
        wrong: "Câu đang sai",
        saved: "Câu đã lưu",
        a1: "250 câu hạng A1 / A",
        "a1-critical": "20 câu điểm liệt hạng A1 / A",
      };
      const title = kind === "chapter" ? "Chương " + extra + ". " + CHAPTERS[extra - 1].name : titles[kind];
      openStudy(kind, extra, title);
      return;
    }
    if (act === "start-exam") {
      if (state.resume && !window.confirm("Bài thi dở sẽ bị thay bằng đề mới. Tiếp tục?")) return;
      startExam(node.dataset.license);
      return;
    }
    if (act === "resume") { resumeExam(); return; }
    if (act === "discard-exam") { writeExam(null); render({ scroll: "keep" }); return; }
    if (act === "pick") { choose(Number(node.dataset.n)); return; }
    if (act === "next") { move(1); return; }
    if (act === "prev") { move(-1); return; }
    if (act === "goto") {
      const index = Number(node.dataset.i);
      if (state.view === "exam" && state.exam) {
        state.exam.index = index;
        writeExam(state.exam);
      } else if (state.view === "study" && state.study) {
        state.study.index = index;
      }
      render({ scroll: "top" });
      return;
    }
    if (act === "goto-answer") {
      const card = document.getElementById("answer-" + node.dataset.id);
      document.querySelectorAll(".dot.on").forEach((el) => el.classList.remove("on"));
      node.classList.add("on");
      if (card) card.scrollIntoView({ block: "start" });
      return;
    }
    if (act === "goto-review" && state.result) {
      state.result.index = Number(node.dataset.i);
      render({ scroll: "keep" });
      return;
    }
    if (act === "retry-exam") { retryExam(); return; }
    if (act === "submit") { submitExam(false); return; }
    if (act === "mark-mode") {
      store.markMode = node.dataset.mode === "submit" ? "submit" : "instant";
      saveStore();
      if (store.markMode === "instant") revealPending();
      render({ scroll: "keep" });
      return;
    }
    if (act === "grade-study") { gradeStudy(); return; }
    if (act === "retry-study" && state.study) {
      state.study.picks = {};
      state.study.graded = false;
      state.study.summary = null;
      state.study.index = 0;
      state.query = "";
      render({ scroll: "top" });
      return;
    }
    if (act === "reveal") {
      const question = currentQuestion();
      if (!question) return;
      rememberStudy(question, { revealed: true, picked: (state.study.picks[question.id] || {}).picked || null });
      render({ scroll: "keep" });
      return;
    }
    if (act === "toggle-save") {
      const fromCard = Number(node.dataset.id);
      const question = byId.get(fromCard) || currentQuestion();
      if (!question) return;
      if (store.saved.has(question.id)) store.saved.delete(question.id);
      else store.saved.add(question.id);
      saveStore();
      render({ scroll: "keep" });
      return;
    }
    if (act === "shuffle" && state.study) {
      state.study.ids = shuffle(state.study.ids, Math.random);
      state.study.index = 0;
      render({ scroll: "top" });
    }
  }

  function onInput(event) {
    if (event.target.dataset.act !== "search") return;
    if (state.view === "study" && state.study) state.study.index = 0;
    else if (state.view !== "answers") return;
    state.query = event.target.value;
    const caret = event.target.selectionStart;
    render({ scroll: "keep" });
    const search = document.querySelector('[data-act="search"]');
    if (search) {
      search.focus();
      search.setSelectionRange(caret, caret);
    }
  }

  function keyTip() {
    return '<p class="key-tip">Mẹo: <kbd>←</kbd> <kbd>→</kbd> chuyển câu, <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd> chọn đáp án</p>';
  }

  function onKey(event) {
    if (event.target.matches("input, textarea")) return;
    if (state.view !== "study" && state.view !== "exam") return;
    if (event.key >= "1" && event.key <= "4") {
      event.preventDefault();
      choose(Number(event.key));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  }

  function boot() {
    const app = document.getElementById("app");
    try {
      globalThis.GPLX_SELFTEST = selfTest();
    } catch (err) {
      app.textContent = "Bộ câu hỏi lỗi: " + err.message;
      return;
    }
    app.addEventListener("click", onClick);
    app.addEventListener("input", onInput);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", () => {
      const box = document.querySelector(".dots");
      const current = box && box.querySelector(".dot.on");
      if (current) box.scrollTop = Math.max(0, current.offsetTop - (box.clientHeight - current.offsetHeight) / 2);
    });
    if (!document.getElementById("zoom")) {
      const dialog = document.createElement("dialog");
      dialog.id = "zoom";
      dialog.innerHTML = '<img alt="">';
      dialog.addEventListener("click", () => dialog.close());
      document.body.appendChild(dialog);
    }
    render();
  }

  globalThis.GPLX = { selfTest, buildExam, grade, LICENSES, byId };

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
  }
})();
