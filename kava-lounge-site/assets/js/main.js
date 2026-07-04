/* ==========================================================================
   [BRAND NAME] — site behavior
   Mobile nav, scroll reveal, drink art placeholders, Ask the Kava Guide
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Mobile navigation
  ------------------------------------------------------------------ */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ------------------------------------------------------------------
     Scroll reveal
  ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ------------------------------------------------------------------
     Drink photography placeholder art
     Elements: <div class="drink-art" data-art data-c1="#hex" data-c2="#hex"
               data-garnish="mint|citrus|berry|choco|straw" aria-label="...">
  ------------------------------------------------------------------ */
  function drinkArtSVG(c1, c2, garnish, id) {
    var garnishShape = {
      mint: '<g transform="translate(200,54)"><path d="M0 0 C-14 -18 -30 -16 -34 -2 C-20 6 -6 4 0 0Z" fill="#3fae6a"/><path d="M0 0 C14 -18 30 -16 34 -2 C20 6 6 4 0 0Z" fill="#4cc97d"/></g>',
      citrus: '<g transform="translate(206,52)"><circle r="24" fill="#f5d23f"/><circle r="18" fill="#faf0b0"/><g stroke="#f5d23f" stroke-width="3">' +
        '<line x1="0" y1="-16" x2="0" y2="16"/><line x1="-16" y1="0" x2="16" y2="0"/><line x1="-11" y1="-11" x2="11" y2="11"/><line x1="-11" y1="11" x2="11" y2="-11"/></g></g>',
      berry: '<g transform="translate(204,50)"><circle r="11" fill="#7c3aed"/><circle cx="-14" cy="8" r="9" fill="#a855f7"/><circle cx="12" cy="10" r="8" fill="#6d28d9"/></g>',
      choco: '<g transform="translate(202,52)"><rect x="-16" y="-12" width="32" height="24" rx="4" fill="#5b3a24"/><rect x="-16" y="-12" width="32" height="10" rx="4" fill="#7a4f30"/></g>',
      straw: '<g transform="translate(150,10) rotate(18)"><rect x="-5" y="0" width="10" height="120" rx="5" fill="' + c2 + '" opacity="0.9"/></g>'
    }[garnish] || "";

    return (
      '<svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">' +
      '<defs>' +
      '<linearGradient id="bg' + id + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#141a29"/><stop offset="1" stop-color="#0b0e16"/></linearGradient>' +
      '<linearGradient id="dk' + id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient>' +
      '<radialGradient id="gl' + id + '" cx="0.5" cy="0.45" r="0.65">' +
      '<stop offset="0" stop-color="' + c1 + '" stop-opacity="0.55"/><stop offset="1" stop-color="' + c1 + '" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<rect width="300" height="240" fill="url(#bg' + id + ')"/>' +
      '<ellipse cx="150" cy="120" rx="130" ry="105" fill="url(#gl' + id + ')"/>' +
      /* glass */
      '<g>' +
      '<path d="M100 55 L110 215 Q150 228 190 215 L200 55 Z" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>' +
      /* drink body */
      '<path d="M104 88 L112 210 Q150 222 188 210 L196 88 Q150 100 104 88Z" fill="url(#dk' + id + ')" opacity="0.92"/>' +
      /* cloud/cream layer */
      '<path d="M102 72 Q118 60 134 70 Q146 58 160 68 Q174 56 188 68 Q196 74 198 82 Q150 98 102 82 Z" fill="#f6f0e4" opacity="0.95"/>' +
      '<path d="M104 88 Q150 102 196 88 L195 104 Q150 116 105 104 Z" fill="#f6f0e4" opacity="0.4"/>' +
      /* condensation */
      '<g fill="rgba(255,255,255,0.5)">' +
      '<circle cx="116" cy="130" r="2.6"/><circle cx="122" cy="168" r="2"/><circle cx="112" cy="196" r="2.4"/>' +
      '<circle cx="184" cy="140" r="2.4"/><circle cx="180" cy="185" r="2"/><circle cx="188" cy="112" r="2"/>' +
      '</g>' +
      /* highlight */
      '<path d="M115 95 L120 200" stroke="rgba(255,255,255,0.35)" stroke-width="5" stroke-linecap="round"/>' +
      garnishShape +
      '</g>' +
      '</svg>'
    );
  }

  var artEls = document.querySelectorAll("[data-art]");
  artEls.forEach(function (el, i) {
    el.setAttribute("role", "img");
    el.innerHTML = drinkArtSVG(
      el.getAttribute("data-c1") || "#8b5cf6",
      el.getAttribute("data-c2") || "#3f8cff",
      el.getAttribute("data-garnish") || "",
      i
    );
  });

  /* ------------------------------------------------------------------
     VIP form (placeholder handler — wire to your email/SMS platform)
  ------------------------------------------------------------------ */
  var vipForm = document.querySelector(".vip-form");
  if (vipForm) {
    vipForm.addEventListener("submit", function (e) {
      e.preventDefault();
      /* TODO: connect to Mailchimp / Klaviyo / SMS platform endpoint */
      vipForm.innerHTML =
        '<p class="notice notice-blue"><strong>You’re on the list!</strong> ' +
        "We’ll text or email you about drops, events, and soft-opening specials.</p>";
    });
  }

  /* ==================================================================
     ASK THE KAVA GUIDE
     Scripted, compliance-reviewed answers. Replace answerFor() with a
     call to your AI backend when ready — keep the guardrail fallbacks.
  ================================================================== */

  var RESPONSIBLE_USE =
    "Quick reminders: Kratom products are for adults 21+ only. Valid ID required. " +
    "Do not mix kava or kratom with alcohol or other substances.";

  var MEDICAL_FALLBACK =
    "I can help explain the menu and general responsible-use information, but I can’t give " +
    "medical or dosing advice. For health, medication, pregnancy, nursing, or treatment-related " +
    "questions, please speak with a qualified professional.";

  var UNKNOWN_FALLBACK =
    "I don’t want to guess on that. Please check with our team at the bar or contact us directly. " +
    "And if it’s your first visit — just ask our staff in person, they love helping first-timers.";

  var ANSWERS = [
    {
      match: /(pregnan|nursing|breastfeed|medicat|prescri|doctor|dose|dosing|dosage|how much|anxiety|anxious|depress|pain|sleep|insomnia|stress|addict|withdraw|opioid|opiate|cure|treat|therap|medical|health condition|blood pressure|liver|interact)/i,
      reply: MEDICAL_FALLBACK
    },
    {
      match: /(drunk|intoxicat|buzz like|like alcohol|get you high)/i,
      reply:
        "Kava is not alcohol, so it does not get you drunk like beer, wine, or liquor. It is a " +
        "traditional botanical beverage made from kava root. Some people may feel different after " +
        "drinking kava, so we treat it as a responsible-use beverage. Do not mix it with alcohol or other substances."
    },
    {
      match: /(every ?day|daily|habit|all the time|how often)/i,
      reply:
        "We do not recommend using kratom as a daily habit or using it to self-treat any health " +
        "condition. Long-term use may not be right for everyone. For health or medication questions, " +
        "speak with a qualified professional."
    },
    {
      match: /(benefit).*(kava)|kava.*(benefit|good for)/i,
      reply:
        "We do not market kava as a medical product or treatment. Kava is a traditional plant-based " +
        "beverage made from kava root, and we serve it in creamy, dessert-style drinks to make it " +
        "more approachable for first-timers. People report different experiences, but effects can " +
        "vary, and we do not guarantee effects."
    },
    {
      match: /(benefit).*(kratom)|kratom.*(benefit|good for)/i,
      reply:
        "We do not market kratom as a medical product or treatment. We serve kratom as a " +
        "responsible-use botanical tea for adults 21+ in fruit-forward refresher flavors. People " +
        "report different experiences, but effects can vary, and we do not guarantee effects or " +
        "recommend it for any medical purpose."
    },
    {
      match: /(difference|vs\.?|versus|compare)/i,
      reply:
        "Great question — they’re two different plants with different traditions. Kava is a " +
        "traditional beverage made from the root of the kava plant, with roots in Pacific Island " +
        "culture; we serve it in creamy, dessert-style “Kava Clouds.” Kratom is a botanical tea " +
        "brewed from kratom leaves, traditionally used in Southeast Asia; we serve it in " +
        "fruit-forward refreshers for adults 21+ with valid ID. There’s a full breakdown on our " +
        "Kava vs. Kratom page. " + RESPONSIBLE_USE
    },
    {
      match: /(what('| i)?s|what is|explain).*(kava)/i,
      reply:
        "Kava is a traditional plant-based beverage made from the root of the kava plant, with a " +
        "long history in Pacific Island culture. Traditional kava has an earthy taste — our Kava " +
        "Clouds are built to make the first sip smoother and more familiar with creamy, " +
        "dessert-style flavors like Banana Pudding and Tres Leches. Do not mix kava with alcohol or other substances."
    },
    {
      match: /(what('| i)?s|what is|explain).*(kratom)/i,
      reply:
        "Kratom products are for adults 21+ only. In simple adult terms, kratom is a plant leaf " +
        "that can be brewed like tea. At our bar, we serve it in fruit-forward refresher-style " +
        "drinks like the Mango Chili Lime Kratomade. It is not alcohol, but it should still be used responsibly."
    },
    {
      match: /(21|age|old|id required|minor|underage)/i,
      reply:
        "Yes — kratom products are for adults 21+ only, and a valid ID is required. Our agua " +
        "fresca refreshers have no kava or kratom, so there’s something for everyone in your group."
    },
    {
      match: /(alcohol|liquor|bar\?|beer|wine)/i,
      reply:
        "No alcohol here — we’re a non-alcoholic botanical beverage lounge, not a liquor bar. " +
        "Our drinks are alcohol-free, but kava and kratom are still responsible-use beverages: " +
        "do not mix them with alcohol or other substances."
    },
    {
      match: /(without kava|without kratom|no kava|no kratom|agua fresca|non.?kava|regular drink|just soda|anything else)/i,
      reply:
        "Absolutely. Our Agua Fresca Refreshers — like Guava Lime, Watermelon Cucumber Lime, and " +
        "the Jamaica Passionfruit Refresher — have no kava and no kratom. Fresh, colorful, and " +
        "great for anyone in the group."
    },
    {
      match: /(order first|first drink|start with|recommend|beginner|first.?tim|new to|never (had|tried)|what should i (get|order|try)|pick)/i,
      reply:
        "Easy — what flavor style sounds like you?\n\n" +
        "• Sweet & creamy: Banana Pudding Kava Cloud or La Nube Tres Leches\n" +
        "• Fruity & refreshing: Passionfruit Mint Kratom Refresher (21+) or Guava Lime Agua Fresca\n" +
        "• Bold & photo-ready: Blue Razz Coconut Cloud or Dubai Chocolate Pistachio Kava\n" +
        "• Just here with friends: start with an agua fresca, or ask our team for a beginner-friendly option.\n\n" +
        RESPONSIBLE_USE
    },
    {
      match: /(friend|group|bring|together|party of)/i,
      reply:
        "Bring the whole crew — first-timers are our favorite guests. Friends who want to skip " +
        "kava and kratom entirely can order an Agua Fresca Refresher, and our team will happily " +
        "walk everyone through the menu. Kratom drinks are 21+ with valid ID."
    },
    {
      match: /(taste|flavor|earthy|bitter)/i,
      reply:
        "Traditional kava has an earthy taste on its own. That’s exactly why we built Kava Clouds " +
        "— creamy, dessert-style drinks like Banana Pudding and Strawberry Shortcake that make " +
        "the flavor smooth and familiar. Our kratom refreshers lean bright and fruit-forward."
    },
    {
      match: /(hour|open|close|when)/i,
      reply:
        "Our hours are [HOURS]. You can find live details on the Visit Us page — or call us at [PHONE]."
    },
    {
      match: /(where|address|located|location|direction|parking|find you)/i,
      reply:
        "We’re at [ADDRESS]. The Visit Us page has a map, parking info, and one-tap directions. See you soon!"
    },
    {
      match: /(event|open mic|dj|study night|pop.?up|birthday|private)/i,
      reply:
        "We host First-Timer Nights, Open Mic, Study & Sip, DJ lounge nights, vendor pop-ups, flavor " +
        "drop days, and private events. Check the Events page for dates — and join the VIP list to hear about drops first."
    },
    {
      match: /(menu|drinks list|what do you (serve|have))/i,
      reply:
        "Four families of drinks: creamy Kava Clouds, fruit-forward Kratom Refreshers (21+), " +
        "Agua Fresca Refreshers with no kava or kratom, and bold Viral Signatures. The full menu " +
        "page has every drink with beginner-friendly tags. " + RESPONSIBLE_USE
    },
    {
      match: /(expect|first visit|walk in|how does it work)/i,
      reply:
        "Walk in, choose a flavor style — creamy, fruity, tropical, or bold — ask questions, and " +
        "let our team guide you. No experience needed. If you’re ordering a kratom refresher, " +
        "bring a valid ID (21+)."
    }
  ];

  function answerFor(text) {
    for (var i = 0; i < ANSWERS.length; i++) {
      if (ANSWERS[i].match.test(text)) return ANSWERS[i].reply;
    }
    return UNKNOWN_FALLBACK;
  }

  var STARTERS_FLOATING = [
    "What is kava?",
    "What is kratom?",
    "What should I order first?",
    "Is kratom 21+?"
  ];

  var STARTERS_EMBED = [
    "What is kava?",
    "What is kratom?",
    "Does kava get you drunk?",
    "What should I order first?",
    "What is beginner friendly?",
    "Is kratom 21+?",
    "Do you have drinks without kava or kratom?",
    "What is the difference between kava and kratom?"
  ];

  var GREETING =
    "Hey! I’m the Kava Guide — your first-sip assistant. Ask me anything about kava, kratom, " +
    "the menu, or what to order first. No question is too basic.";

  function buildWidget(container, opts) {
    var panel = document.createElement("div");
    panel.className = "kg-panel" + (opts.embed ? " kg-embed open" : "");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Ask the Kava Guide chat");
    panel.innerHTML =
      '<div class="kg-head">' +
      '<div class="kg-avatar" aria-hidden="true">🌿</div>' +
      '<div><div class="kg-title">Ask the Kava Guide</div>' +
      '<div class="kg-sub">Your first-sip assistant.</div></div>' +
      '<button class="kg-close" type="button" aria-label="Close chat">✕</button>' +
      "</div>" +
      '<div class="kg-msgs" aria-live="polite"></div>' +
      '<div class="kg-starters"></div>' +
      '<div class="kg-input-row">' +
      '<input type="text" placeholder="Ask a question…" aria-label="Ask the Kava Guide a question">' +
      '<button type="button" aria-label="Send question">➤</button>' +
      "</div>" +
      '<div class="kg-disclaimer">General info only — not medical advice. Kratom products are 21+ only. Valid ID required.</div>';

    var msgs = panel.querySelector(".kg-msgs");
    var startersRow = panel.querySelector(".kg-starters");
    var input = panel.querySelector("input");
    var sendBtn = panel.querySelector(".kg-input-row button");

    function addMsg(text, who) {
      var m = document.createElement("div");
      m.className = "kg-msg " + who;
      m.textContent = text;
      msgs.appendChild(m);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function ask(q) {
      if (!q) return;
      addMsg(q, "user");
      window.setTimeout(function () { addMsg(answerFor(q), "bot"); }, 450);
    }

    (opts.starters || []).forEach(function (s) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "kg-starter";
      b.textContent = s;
      b.addEventListener("click", function () { ask(s); });
      startersRow.appendChild(b);
    });

    sendBtn.addEventListener("click", function () {
      var q = input.value.trim();
      input.value = "";
      ask(q);
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { sendBtn.click(); }
    });

    addMsg(GREETING, "bot");
    container.appendChild(panel);
    return panel;
  }

  /* Embedded chat — only on the New Here page */
  var embedTarget = document.getElementById("kava-guide-embed");
  if (embedTarget) {
    buildWidget(embedTarget, { embed: true, starters: STARTERS_EMBED });
  }

  /* Floating bubble — every page */
  var fabWrap = document.createElement("div");
  fabWrap.className = "kg-bubble";
  fabWrap.innerHTML =
    '<div class="kg-nudge" role="status">New to kava or kratom? I can help.' +
    '<button class="kg-nudge-close" type="button" aria-label="Dismiss">✕</button></div>' +
    '<button class="kg-fab" type="button" aria-label="Open Ask the Kava Guide chat" ' +
    'aria-expanded="false" title="Ask the Kava Guide — your first-sip assistant">🌿</button>';
  document.body.appendChild(fabWrap);

  var floatingPanel = buildWidget(document.body, { embed: false, starters: STARTERS_FLOATING });
  var fab = fabWrap.querySelector(".kg-fab");
  var nudge = fabWrap.querySelector(".kg-nudge");

  fab.addEventListener("click", function () {
    var open = floatingPanel.classList.toggle("open");
    fab.setAttribute("aria-expanded", open ? "true" : "false");
    nudge.classList.remove("show");
    if (open) floatingPanel.querySelector("input").focus();
  });
  floatingPanel.querySelector(".kg-close").addEventListener("click", function () {
    floatingPanel.classList.remove("open");
    fab.setAttribute("aria-expanded", "false");
  });

  /* One subtle nudge after a short delay; never re-shown once dismissed */
  var nudgeSeen = false;
  try { nudgeSeen = window.sessionStorage.getItem("kgNudge") === "1"; } catch (e) {}
  if (!nudgeSeen && !embedTarget) {
    window.setTimeout(function () {
      if (!floatingPanel.classList.contains("open")) nudge.classList.add("show");
    }, 9000);
    window.setTimeout(function () { nudge.classList.remove("show"); }, 24000);
  }
  nudge.querySelector(".kg-nudge-close").addEventListener("click", function () {
    nudge.classList.remove("show");
    try { window.sessionStorage.setItem("kgNudge", "1"); } catch (e) {}
  });
})();
