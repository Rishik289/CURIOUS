var chaptersData = [
  { id: 1, title: "The Ever-Evolving World of Science", desc: "Explore the Scientific Method: observation logic, questioning tracking, and running safe labs.", text: "Science relies on continuous questioning, observing events carefully, and engineering lab controls to verify ideas." },
  { id: 2, title: "Exploring Substances", desc: "Identify acids, bases, and neutral solutions safely using indicators and neutralisation paths.", text: "Acids taste sour. Bases are bitter, slippery compounds. Litmus indicators track their chemical signatures safely." },
  { id: 3, title: "Electricity and Circuits", desc: "Master pathway loops, system component blueprints, symbols, and structural safety fuses.", text: "An electric current requires a complete, unbroken path called a closed circuit to flow. Current resistance yields the heating effect used inside safety fuses." },
  { id: 4, title: "The World of Metals and Non-metals", desc: "Examine mechanical tensile strengths, glossy luster, malleable sheets, and wire properties.", text: "Metals possess high luster, ductile structural wire paths, and malleability. Non-metals function as brittle insulators." },
  { id: 5, title: "Changes Around Us", desc: "Differentiate between physical adjustments and permanent chemical molecular transformations.", text: "Physical alterations modify trait geometries reversibly. Chemical changes alter molecules to create completely new substances." },
  { id: 6, title: "Adolescence: A Stage of Growth", desc: "Understand physiological growth milestones, endocrine gland frameworks, and cellular updates.", text: "Hormones released by internal Endocrine Glands coordinate physiological frame updates linking milestones to full growth securely." },
  { id: 7, title: "Heat Transfer in Nature", desc: "Trace thermal kinetics moving along conduction networks, convection currents, and radiation waves.", text: "Thermal heat vectors spread through physical items (Conduction), shifting fluids (Convection), or infrared waves (Radiation)." },
  { id: 8, title: "Measurement of Time and Motion", desc: "Calculate operational travel speed velocities, distance rates, and clock intervals.", text: "Speed fields represent total covered distance meters divided by elapsed clock times, tracked across clear linear motion charts." },
  { id: 9, title: "Life Processes in Animals", desc: "Explore internal digestive operations, gas exchange gates, and circulatory systems.", text: "Animal stability requires digestive breakdown channels, respiratory oxygen energy cells, and vascular pipelines to circulate items." },
  { id: 10, title: "Life Processes in Plants", desc: "Analyze root capillary hairs, leaf gas gates, sap transport, and photosynthesis loops.", text: "Flora use green leaf systems to run Photosynthesis loops, deploying Xylem and Phloem pipelines to carry sap resources safely." },
  { id: 11, title: "Light: Shadows and Reflections", desc: "Map straight light trajectories, opaque blocking barriers, and reflective mirrors.", text: "Light travels along direct straight paths. Blocking paths forms dark shadows, while highly polished mirror planes produce clean reflections." },
  { id: 12, title: "Earth, Moon, and the Sun", desc: "Track rotation paths, seasonal structural tilts, shadow phases, and celestial alignments.", text: "Planetary orbital alignments form day-night frames, shifting year cycles, lunar phases, and regular solar or lunar eclipses across space." }
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

window.onload = checkSavedLogin;
