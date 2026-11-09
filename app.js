var chaptersData = [
  { id: 1, title: "The Ever-Evolving World of Science", desc: "Explore the Scientific Method: observation logic, questioning tracking, and running safe labs.", text:"Welcome to Chapter 1! Science is all around us, and observation helps us unlock the wonders of the natural world. In this chapter, you will learn how to ask thoughtful questions, make careful observations, and test ideas using experiments. This helps us separate facts from assumptions and build reliable understanding." },
  { id: 2, title: "Exploring Substances", desc: "Identify acids, bases, and neutral solutions safely using indicators and neutralisation paths.", text:"Welcome to Chapter 2! Chemical materials around us can be classified by their properties. You will explore acids, bases, and neutral solutions, and discover how indicators reveal hidden characteristics. Through simple investigations, you will understand how substances react and how neutralisation works." },
  { id: 3, title: "Electricity and Circuits", desc: "Master pathway loops, system component blueprints, symbols, and structural safety fuses.", text: "Welcome to Chapter 3! Electricity represents the flow of energy through a circuit. This chapter teaches you how electrical components join together, how current travels, and how symbols help us read circuit diagrams. You will also understand the importance of safety in handling electrical systems." },
  { id: 4, title: "The World of Metals & Non-metals and Structure of Atoms", desc: "Examine mechanical tensile strengths, glossy luster, malleable sheets, and wire properties.", text: "Welcome to Chapter 4! Materials can be grouped by their physical and chemical properties. Metals are often shiny, strong, and excellent conductors, while non-metals behave differently. At the atomic level, the arrangement of particles helps explain why materials have distinct properties." },
  { id: 5, title: "Changes Around Us", desc: "Differentiate between physical adjustments and permanent chemical molecular transformations.", text: "Welcome to Chapter 5! Matter undergoes two distinct kinds of change. Physical changes affect appearance without forming new substances, while chemical changes create new materials with different properties. Learning to identify these changes helps explain everyday phenomena such as rusting, melting, and burning." },
  { id: 6, title: "Adolescence: A Stage of Growth", desc: "Understand physiological growth milestones, endocrine gland frameworks, and cellular updates.", text: "Welcome to Chapter 6! Adolescence is a stage of rapid growth and development. During this time, the body changes physically, emotionally, and socially. This chapter explains puberty, hormones, and how healthy habits support development." },
  { id: 7, title: "Heat Transfer in Nature", desc: "Trace thermal kinetics moving along conduction networks, convection currents, and radiation waves.", text:"Welcome to Chapter 7! Thermal heat represents energy on the move. It travels by conduction, convection, and radiation. These processes are vital in nature and daily life, from warming a spoon in hot tea to the heat from the Sun reaching Earth." },
  { id: 8, title: "Measurement of Time and Motion", desc: "Calculate operational travel speed velocities, distance rates, and clock intervals.", text:  "Welcome to Chapter 8! Motion tracks spatial movement, and time helps us measure it. This chapter introduces speed, distance, and time relationships. By understanding motion, we can interpret journeys, calculate velocity, and explain why objects move in different ways." },
  { id: 9, title: "Life Processes in Animals", desc: "Explore internal digestive operations, gas exchange gates, and circulatory systems.", text:  "Welcome to Chapter 9! Animal life depends on essential processes such as digestion, respiration, and circulation. These systems work together to provide energy and maintain the body. Understanding them helps us appreciate how living organisms stay alive and active." },
  { id: 10, title: "Life Processes in Plants", desc: "Analyze root capillary hairs, leaf gas gates, sap transport, and photosynthesis loops.", text:  "Welcome to Chapter 10! Green plants carry out life processes that sustain themselves and support life on Earth. Roots absorb water, leaves capture sunlight, and photosynthesis creates food. This chapter focuses on how plants transport nutrients and energy throughout their bodies." },
  { id: 11, title: "Light: Shadows and Reflections", desc: "Map straight light trajectories, opaque blocking barriers, and reflective mirrors.", text: "Welcome to Chapter 11! Light travels in straight lines and interacts with objects in different ways. It can form shadows, reflect from smooth surfaces, and bend slightly in certain conditions. Learning about light helps explain vision, mirrors, and everyday optical phenomena." },
  { id: 12, title: "Earth, Moon, and the Sun", desc: "Track rotation paths, seasonal structural tilts, shadow phases, and celestial alignments.", text:  "Welcome to Chapter 12! Our home planet, the Moon, and the Sun are part of a dynamic system. This chapter explores the causes of day and night, seasons, eclipses, and the Moon's phases. These patterns affect life on Earth and help us understand our place in space." }
];

var currentChapterId = 1;
var activeUser = "";

// --- Account Gateway Functions ---
function handleUserLogin() {
  var name = document.getElementById("usernameInput").value.trim().toLowerCase();
  if (name.length < 2) {
    alert("Please enter a username that is at least 2 letters long.");
    return;
  }
  activeUser = name;
  localStorage.setItem("current_active_user", name);
  
  document.getElementById("welcomeUserBadge").innerText = "👤 Active Student: " + activeUser;
  document.getElementById("loginView").classList.remove("active");
  showDashboard();
}

function handleUserLogout() {
  activeUser = "";
  localStorage.removeItem("current_active_user");
  document.getElementById("usernameInput").value = "";
  
  document.querySelectorAll(".view-section").forEach(function(v) { v.classList.remove("active"); });
  document.getElementById("loginView").classList.add("active");
}

function checkSavedLogin() {
  var saved = localStorage.getItem("current_active_user");
  if (saved) {
    activeUser = saved;
    document.getElementById("welcomeUserBadge").innerText = "👤 Active Student: " + activeUser;
    document.getElementById("loginView").classList.remove("active");
    showDashboard();
  }
}

// --- Dynamic Storage Key Matcher ---
function getUserKey(chId, type) {
  return activeUser + "_ch_" + chId + "_" + type;
}

function renderDashboard() {
  var grid = document.getElementById("chaptersGrid");
  if (!grid) return;
  grid.innerHTML = "";
  
  for (var i = 0; i < chaptersData.length; i++) {
    var ch = chaptersData[i];
    var dateVal = localStorage.getItem(getUserKey(ch.id, "date")) || "No Quiz Set";
    var revVal = localStorage.getItem(getUserKey(ch.id, "rev")) || "Not yet revised";

    grid.innerHTML += '<div class="chapter-card">' +
      '<div>' +
        '<span class="badge">Chapter ' + ch.id + ' · Curiosity</span>' +
        '<h2 class="card-title">' + ch.title + '</h2>' +
        '<p class="card-desc">' + ch.desc + '</p>' +
        '<div class="status-box">' +
          '<div>📅 Target: <strong>' + dateVal + '</strong></div>' +
          '<div>🔄 Status: <strong>' + revVal + '</strong></div>' +
        '</div>' +
      '</div>' +
      '<button class="btn" style="margin-top:16px;" onclick="openChapter(' + ch.id + ')">Open Chapter →</button>' +
    '</div>';
  }
}

function showDashboard() {
  document.querySelectorAll(".view-section").forEach(function(v) { v.classList.remove("active"); });
  renderDashboard();
  document.getElementById("dashboardView").classList.add("active");
}

function openChapter(id) {
  currentChapterId = id;
  var ch = chaptersData.find(function(item) { return item.id === id; });
  if(ch) {
    document.getElementById("activeChapterTitle").innerText = ch.title;
    document.getElementById("activeChapterBadge").innerText = "Chapter " + id + " · Active Lab Space";
    document.getElementById("readingText").innerText = ch.text;

    document.getElementById("notesInput").value = localStorage.getItem(getUserKey(id, "notes")) || "";
    document.getElementById("dateInput").value = localStorage.getItem(getUserKey(id, "date")) || "";

    document.querySelectorAll(".view-section").forEach(function(v) { v.classList.remove("active"); });
    document.getElementById("chapterView").classList.add("active");
    switchTab("read");
  }
}

function switchTab(name) {
  document.querySelectorAll(".tab-btn").forEach(function(b) { b.classList.remove("active"); });
  document.querySelectorAll(".tab-content").forEach(function(c) { c.classList.remove("active"); });
  document.getElementById("btn-tab-" + name).classList.add("active");
  document.getElementById("tab-" + name).classList.add("active");
}

function saveNotesData() {
  localStorage.setItem(getUserKey(currentChapterId, "notes"), document.getElementById("notesInput").value);
  alert("Notes saved successfully under your account profile!");
}

function saveAssessmentDate() {
  localStorage.setItem(getUserKey(currentChapterId, "date"), document.getElementById("dateInput").value);
  alert("Assessment timeline mapped to your account settings!");
}

function logRevisionSession() {
  localStorage.setItem(getUserKey(currentChapterId, "rev"), "Revised Today");
  alert("Revision milestone logged under your active account profile!");
}

function openGlobalCalendar() {
  document.querySelectorAll(".view-section").forEach(function(v) { v.classList.remove("active"); });
  document.getElementById("calendarView").classList.add("active");

  var gridVis = document.getElementById("calendarGridVisual");
  if (!gridVis) return;
  gridVis.innerHTML = "";

  var labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  labels.forEach(function(l) { gridVis.innerHTML += '<div class="calendar-day-label">' + l + '</div>'; });

  for(var day = 1; day <= 30; day++) {
    var dayString = "2026-11-" + (day < 10 ? "0" + day : day);
    var tags = "";

    for(var c = 0; c < chaptersData.length; c++) {
      if(localStorage.getItem(getUserKey(chaptersData[c].id, "date")) === dayString) {
        tags += '<div class="calendar-event-tag">⚠️ Ch' + chaptersData[c].id + ' Quiz</div>';
      }
    }
    gridVis.innerHTML += '<div class="calendar-cell current-month"><span class="day-num">' + day + '</span><div>' + tags + '</div></div>';
  }
}

window.onload = function() {
  var usernameInput = document.getElementById("usernameInput");
  var enterButton = document.getElementById("enterDashboardBtn");

  if (enterButton) {
    enterButton.addEventListener("click", handleUserLogin);
  }

  if (usernameInput) {
    usernameInput.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleUserLogin();
      }
    });
  }

  checkSavedLogin();
};
