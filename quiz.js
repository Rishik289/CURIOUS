(function () {
  "use strict";

  // Quiz scores and learning progress are namespaced by the active username,
  // just like notes and revision status in app.js.
  var quizzes = {
    1: [
      { q: "What is the first step in a scientific investigation?", options: ["Make an observation or ask a question", "Write the conclusion", "Change the results"], answer: 0 },
      { q: "Why should an investigation change only one factor at a time?", options: ["To make it confusing", "To see what effect that factor has", "To avoid recording results"], answer: 1 },
      { q: "What should you do with measurements and observations?", options: ["Record them carefully", "Guess them later", "Leave them out"], answer: 0 },
      { q: "A conclusion should be based on…", options: ["Evidence collected", "A random guess", "Someone else's unrelated result"], answer: 0 },
      { q: "Which is a safe science practice?", options: ["Follow instructions and use equipment carefully", "Taste unknown materials", "Run in the lab"], answer: 0 }
    ],
    2: [
      { q: "An acid turns blue litmus…", options: ["Red", "Green", "Blue"], answer: 0 },
      { q: "A base turns red litmus…", options: ["Blue", "Yellow", "Red"], answer: 0 },
      { q: "A neutral solution is neither…", options: ["Acidic nor basic", "Liquid nor solid", "Hot nor cold"], answer: 0 },
      { q: "When an acid and a base react, the process is called…", options: ["Neutralisation", "Evaporation", "Freezing"], answer: 0 },
      { q: "Which should you never do with an unknown chemical?", options: ["Taste it", "Read its label", "Follow safety directions"], answer: 0 }
    ],
    3: [
      { q: "A circuit must form a _____ path for current to flow.", options: ["Closed", "Broken", "Open"], answer: 0 },
      { q: "Which component supplies electrical energy in a simple circuit?", options: ["Cell", "Switch", "Wire only"], answer: 0 },
      { q: "What does an open switch do?", options: ["Breaks the circuit", "Makes a new cell", "Stores light"], answer: 0 },
      { q: "A fuse helps protect a circuit by…", options: ["Breaking the circuit if current is too high", "Increasing current without limit", "Replacing the battery"], answer: 0 },
      { q: "Which material is usually a good electrical conductor?", options: ["Copper", "Rubber", "Dry wood"], answer: 0 }
    ],
    4: [
      { q: "Which property describes a material that can be drawn into wires?", options: ["Ductility", "Brittleness", "Transparency"], answer: 0 },
      { q: "The ability to be hammered into sheets is called…", options: ["Malleability", "Solubility", "Elasticity"], answer: 0 },
      { q: "Many metals are good conductors of…", options: ["Heat and electricity", "Sound only", "Water only"], answer: 0 },
      { q: "The centre of an atom is called the…", options: ["Nucleus", "Shell", "Molecule"], answer: 0 },
      { q: "Which particles have a negative electric charge?", options: ["Electrons", "Protons", "Neutrons"], answer: 0 }
    ],
    5: [
      { q: "Melting ice is usually a…", options: ["Physical change", "Chemical change", "Nuclear change"], answer: 0 },
      { q: "Rusting iron is an example of a…", options: ["Chemical change", "Change of state only", "Reversible physical change"], answer: 0 },
      { q: "A new substance is most likely formed during a…", options: ["Chemical change", "Change in shape only", "Change in position"], answer: 0 },
      { q: "Dissolving sugar in water is generally considered…", options: ["A physical change", "Combustion", "Rusting"], answer: 0 },
      { q: "Which change is commonly difficult to reverse?", options: ["Cooking an egg", "Freezing water", "Cutting paper"], answer: 0 }
    ],
    6: [
      { q: "Adolescence is the stage between…", options: ["Childhood and adulthood", "Infancy and childhood", "Adulthood and old age"], answer: 0 },
      { q: "Hormones are chemical messengers made by…", options: ["Endocrine glands", "Bones only", "Hair"], answer: 0 },
      { q: "Which gland is often called the master gland?", options: ["Pituitary gland", "Sweat gland", "Salivary gland"], answer: 0 },
      { q: "Good health during adolescence includes…", options: ["Balanced food, exercise, and hygiene", "Skipping sleep", "Avoiding all activity"], answer: 0 },
      { q: "Changes during adolescence happen…", options: ["At different times for different people", "At exactly the same time for everyone", "Only after adulthood"], answer: 0 }
    ],
    7: [
      { q: "Heat transfer through direct contact is…", options: ["Conduction", "Convection", "Reflection"], answer: 0 },
      { q: "Convection mainly occurs in…", options: ["Liquids and gases", "A vacuum only", "Solid metals only"], answer: 0 },
      { q: "Energy from the Sun reaches Earth mainly by…", options: ["Radiation", "Conduction", "Convection"], answer: 0 },
      { q: "Warm air usually…", options: ["Rises", "Always sinks", "Stops moving"], answer: 0 },
      { q: "Which surface absorbs radiant heat most effectively?", options: ["A dull dark surface", "A shiny silver surface", "A clear glass surface"], answer: 0 }
    ],
    8: [
      { q: "Speed is calculated as…", options: ["Distance ÷ time", "Time ÷ distance", "Distance × time"], answer: 0 },
      { q: "A standard unit of speed is…", options: ["Metres per second", "Metres only", "Seconds per metre squared"], answer: 0 },
      { q: "If an object covers more distance in the same time, its speed is…", options: ["Greater", "Smaller", "Unchanged"], answer: 0 },
      { q: "A distance-time graph can show…", options: ["How distance changes over time", "An object's colour", "Its temperature only"], answer: 0 },
      { q: "A pendulum's one complete to-and-fro movement is one…", options: ["Oscillation", "Kilometre", "Reflection"], answer: 0 }
    ],
    9: [
      { q: "Digestion breaks food into…", options: ["Simpler soluble substances", "Larger pieces only", "Water only"], answer: 0 },
      { q: "Most absorption of digested nutrients occurs in the…", options: ["Small intestine", "Windpipe", "Heart"], answer: 0 },
      { q: "The lungs take in oxygen and remove…", options: ["Carbon dioxide", "Nitrogen only", "Food"], answer: 0 },
      { q: "Blood carries materials around the body using the…", options: ["Circulatory system", "Skeletal system", "Digestive system only"], answer: 0 },
      { q: "The heart's main job is to…", options: ["Pump blood", "Digest food", "Filter air"], answer: 0 }
    ],
    10: [
      { q: "Plants make food by…", options: ["Photosynthesis", "Digestion", "Condensation"], answer: 0 },
      { q: "Which gas do green plants use in photosynthesis?", options: ["Carbon dioxide", "Oxygen only", "Helium"], answer: 0 },
      { q: "Which leaf substance captures light energy?", options: ["Chlorophyll", "Starch", "Water vapour"], answer: 0 },
      { q: "Root hairs help a plant absorb…", options: ["Water and minerals", "Sunlight", "Carbon dioxide from soil"], answer: 0 },
      { q: "Tiny pores on leaves used for gas exchange are…", options: ["Stomata", "Petals", "Roots"], answer: 0 }
    ],
    11: [
      { q: "Light usually travels in…", options: ["Straight lines", "Circles", "Zigzags in empty space"], answer: 0 },
      { q: "A shadow forms when light is blocked by…", options: ["An opaque object", "A clear window", "Air only"], answer: 0 },
      { q: "The bouncing back of light from a surface is…", options: ["Reflection", "Conduction", "Absorption only"], answer: 0 },
      { q: "A plane mirror usually forms an image that is…", options: ["Upright and the same size", "Always upside down", "Always smaller"], answer: 0 },
      { q: "A material that lets most light pass through is…", options: ["Transparent", "Opaque", "Magnetic"], answer: 0 }
    ],
    12: [
      { q: "Day and night are caused mainly by Earth's…", options: ["Rotation", "Revolution around the Sun", "Distance from the Moon"], answer: 0 },
      { q: "Earth takes about one year to…", options: ["Revolve around the Sun", "Rotate once", "Orbit the Moon"], answer: 0 },
      { q: "The Moon appears bright because it…", options: ["Reflects sunlight", "Makes its own sunlight", "Is a star"], answer: 0 },
      { q: "The apparent shape of the Moon changes in a pattern called…", options: ["Phases", "Seasons", "Eclipsing every day"], answer: 0 },
      { q: "Earth's axis is…", options: ["An imaginary line through the poles", "A ring around the Sun", "The Moon's orbit"], answer: 0 }
    ]
  };

  function scoreFor(chapterId) {
    var raw = localStorage.getItem(activeUser + "_ch_" + chapterId + "_quiz");
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (error) { return null; }
  }

  function clarityInfo(result) {
    if (!result) return { text: "Not assessed", color: "#6c757d", bg: "#f1f3f5" };
    if (result.percent >= 80) return { text: "Strong concept clarity · " + result.percent + "%", color: "#2b8a3e", bg: "#e6f4ea" };
    if (result.percent >= 50) return { text: "Developing · " + result.percent + "%", color: "#a66a00", bg: "#fff3cd" };
    return { text: "Needs practice · " + result.percent + "%", color: "#b02a37", bg: "#fce8e6" };
  }

  var originalRenderDashboard = window.renderDashboard;
  if (typeof originalRenderDashboard === "function") {
    window.renderDashboard = function () {
      originalRenderDashboard();
      document.querySelectorAll("#chaptersGrid .chapter-card").forEach(function (card, index) {
        var info = clarityInfo(scoreFor(index + 1));
        var indicator = document.createElement("div");
        indicator.className = "concept-clarity";
        indicator.style.color = info.color;
        indicator.style.backgroundColor = info.bg;
        var dot = document.createElement("span");
        dot.className = "clarity-dot";
        var label = document.createElement("span");
        label.textContent = info.text;
        indicator.append(dot, label);
        var title = card.querySelector(".card-title");
        if (title) title.before(indicator);
      });
    };
  }

  function ensureQuizTab() {
    var nav = document.querySelector("#chapterView .nav-tabs");
    if (!nav || document.getElementById("btn-tab-quiz")) return;
    var button = document.createElement("button");
    button.id = "btn-tab-quiz";
    button.className = "tab-btn";
    button.textContent = "04 · Chapter Quiz";
    button.addEventListener("click", function () { window.switchTab("quiz"); });
    nav.appendChild(button);

    var panel = document.createElement("div");
    panel.id = "tab-quiz";
    panel.className = "tab-content";
    panel.innerHTML = "<h3>Chapter Quiz</h3><p class=\"subtitle\">Answer all questions and submit to check your concept clarity. Your score is saved under your username in this browser.</p><form id=\"chapterQuizForm\"></form><div id=\"quizResult\" class=\"quiz-result\" role=\"status\" aria-live=\"polite\"></div>";
    document.getElementById("chapterView").appendChild(panel);
  }

  function renderQuiz(chapterId) {
    ensureQuizTab();
    var form = document.getElementById("chapterQuizForm");
    var resultBox = document.getElementById("quizResult");
    if (!form || !resultBox) return;
    form.replaceChildren();
    resultBox.textContent = "";
    var questions = quizzes[chapterId] || [];
    questions.forEach(function (question, questionIndex) {
      var fieldset = document.createElement("fieldset");
      fieldset.className = "quiz-question";
      var legend = document.createElement("legend");
      legend.textContent = (questionIndex + 1) + ". " + question.q;
      fieldset.appendChild(legend);
      question.options.forEach(function (option, optionIndex) {
        var label = document.createElement("label");
        label.className = "quiz-option";
        var input = document.createElement("input");
        input.type = "radio";
        input.name = "quiz-question-" + questionIndex;
        input.value = String(optionIndex);
        input.required = true;
        label.append(input, document.createTextNode(" " + option));
        fieldset.appendChild(label);
      });
      form.appendChild(fieldset);
    });
    var submit = document.createElement("button");
    submit.className = "btn";
    submit.type = "submit";
    submit.textContent = "Submit quiz";
    form.appendChild(submit);
    form.onsubmit = function (event) {
      event.preventDefault();
      var correct = 0;
      questions.forEach(function (question, questionIndex) {
        var selected = form.querySelector('input[name="quiz-question-' + questionIndex + '"]:checked');
        if (selected && Number(selected.value) === question.answer) correct += 1;
      });
      var percent = Math.round(correct * 100 / questions.length);
      var result = { correct: correct, total: questions.length, percent: percent, completedAt: new Date().toISOString() };
      localStorage.setItem(activeUser + "_ch_" + chapterId + "_quiz", JSON.stringify(result));
      var info = clarityInfo(result);
      resultBox.textContent = "Score: " + correct + " / " + questions.length + " (" + percent + "%) — " + info.text;
      resultBox.style.color = info.color;
      submit.disabled = true;
      var retake = document.createElement("button");
      retake.type = "button";
      retake.className = "btn btn-secondary";
      retake.style.marginLeft = "8px";
      retake.textContent = "Try again";
      retake.onclick = function () { renderQuiz(chapterId); };
      form.appendChild(retake);
    };
    var saved = scoreFor(chapterId);
    if (saved) {
      var info = clarityInfo(saved);
      resultBox.textContent = "Previous score: " + saved.correct + " / " + saved.total + " (" + saved.percent + "%) — " + info.text;
      resultBox.style.color = info.color;
    }
  }

  var originalOpenChapter = window.openChapter;
  if (typeof originalOpenChapter === "function") {
    window.openChapter = function (chapterId) {
      originalOpenChapter(chapterId);
      renderQuiz(chapterId);
    };
  }

  ensureQuizTab();
})();
