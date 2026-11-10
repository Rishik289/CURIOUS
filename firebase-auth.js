// Firebase Authentication for ScienceStudyHub.
// This config is the public web-app config from Firebase; never put service-account keys here.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQyU4Q5679Pr3HmM2ZJ_oy_Wp_im877Co",
  authDomain: "curious-e784a.firebaseapp.com",
  projectId: "curious-e784a",
  storageBucket: "curious-e784a.firebasestorage.app",
  messagingSenderId: "1066168674300",
  appId: "1:1066168674300:web:151fa34271aaae125f3479",
  measurementId: "G-9MRTJ0VMD2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let isSignUpMode = false;
const normalizeUsername = value => value.trim().toLowerCase();
const studentsByClass = {
  "VII-F": [
    "Aaravjit", "Aarohi", "Aaron", "Advit", "Adwitya", "Amyra", "Aryan", "Ayan",
    "Bhuvi", "Damyanti", "Devesh", "Hridhaan", "Iqsha", "Jhanvi", "Jivansh", "Kaira",
    "Kritnoor", "Myra", "Naitik", "Navya", "Nikunj", "Pranika", "Palak", "Riaan",
    "Rishab", "Rishik", "Ritisha", "Sanaya", "Shaan", "Suhani", "Srishti", "Urba",
    "Vibodh", "Vivaan", "Yuvaan", "Zoya"
  ]
};

function showMessage(message, isError = true) {
  const target = document.getElementById("authMessage");
  if (!target) return;
  target.textContent = message;
  target.style.color = isError ? "#b02a37" : "#2b8a3e";
}

function setBusy(busy) {
  ["enterDashboardBtn", "toggleAuthModeBtn"].forEach(id => {
    const button = document.getElementById(id);
    if (button) button.disabled = busy;
  });
}

function updateRoleOptions() {
  const className = document.getElementById("classSelect").value;
  const roleSelect = document.getElementById("roleNoSelect");
  roleSelect.replaceChildren(new Option("Select role no.", ""));

  const students = studentsByClass[className];
  roleSelect.disabled = !students;
  if (!students) {
    showMessage(className ? `Role numbers for ${className} are not available yet. Please select VII-F for now.` : "");
    return;
  }

  students.forEach((name, index) => {
    roleSelect.add(new Option(`${index + 1} — ${name}`, String(index + 1)));
  });
  showMessage("");
}

function validateInputs() {
  const username = normalizeUsername(document.getElementById("usernameInput").value);
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value;
  const className = document.getElementById("classSelect").value;
  const roleNo = document.getElementById("roleNoSelect").value;
  if (username.length < 2 || username.length > 32) throw new Error("Choose a username between 2 and 32 characters.");
  if (!/^[a-z0-9._-]+$/.test(username)) throw new Error("Username can use lowercase letters, numbers, dots, underscores, and hyphens.");
  if (!email) throw new Error("Enter your email address.");
  if (!password) throw new Error("Enter your password.");
  if (isSignUpMode && password.length < 6) throw new Error("Password must be at least 6 characters.");
  if (!className) throw new Error("Select your class.");
  const students = studentsByClass[className];
  if (!students) throw new Error(`Role numbers for ${className} are not available yet. Please select VII-F for now.`);
  if (!roleNo || !students[Number(roleNo) - 1]) throw new Error("Select your role number.");
  return { username, email, password, className, roleNo, studentName: students[Number(roleNo) - 1] };
}

async function verifyUsername(user, enteredUsername, student) {
  const profileRef = doc(db, "userProfiles", user.uid);
  const profile = await getDoc(profileRef);
  const studentProfile = {
    className: student.className,
    roleNo: student.roleNo,
    studentName: student.studentName
  };

  if (profile.exists()) {
    const savedProfile = profile.data();
    const savedUsername = normalizeUsername(savedProfile.username || "");
    if (savedUsername !== enteredUsername) {
      await signOut(auth);
      throw new Error("That username does not match this account. Check it and try again.");
    }
    if (savedProfile.className && (savedProfile.className !== student.className || String(savedProfile.roleNo) !== student.roleNo)) {
      await signOut(auth);
      throw new Error("The selected class and role number do not match this account.");
    }
    if (!savedProfile.className) {
      await setDoc(profileRef, studentProfile, { merge: true });
    }
  } else {
    // First successful authentication binds this username and class roster entry to the authenticated UID.
    await setDoc(profileRef, {
      username: enteredUsername,
      ...studentProfile,
      createdAt: new Date().toISOString()
    });
  }

  window.activeUser = enteredUsername;
  localStorage.setItem("current_active_user", enteredUsername);
  document.getElementById("welcomeUserBadge").innerText = `👤 ${student.className} · Role ${student.roleNo}: ${student.studentName}`;
  document.querySelectorAll(".view-section").forEach(view => view.classList.remove("active"));
  window.showDashboard();
}

async function handleEmailAuth() {
  showMessage("");
  setBusy(true);
  try {
    const student = validateInputs();
    const { username, email, password } = student;
    const credential = isSignUpMode
      ? await createUserWithEmailAndPassword(auth, email, password)
      : await signInWithEmailAndPassword(auth, email, password);
    await verifyUsername(credential.user, username, student);
  } catch (error) {
    showMessage(error.message || "Could not sign in. Check your details and try again.");
  } finally {
    setBusy(false);
  }
}

function handleLogout() {
  signOut(auth).catch(error => console.error("Firebase sign-out failed:", error));
  localStorage.removeItem("current_active_user");
  window.activeUser = "";
  document.querySelectorAll(".view-section").forEach(view => view.classList.remove("active"));
  document.getElementById("loginView").classList.add("active");
  document.getElementById("passwordInput").value = "";
  showMessage("You have signed out.", false);
}

function initializeLogin() {
  // Do not trust the old localStorage-only login from the original version.
  localStorage.removeItem("current_active_user");
  window.activeUser = "";
  document.querySelectorAll(".view-section").forEach(view => view.classList.remove("active"));
  document.getElementById("loginView").classList.add("active");

  document.getElementById("classSelect").addEventListener("change", updateRoleOptions);
  document.getElementById("enterDashboardBtn").addEventListener("click", handleEmailAuth);
  document.getElementById("toggleAuthModeBtn").addEventListener("click", () => {
    isSignUpMode = !isSignUpMode;
    document.getElementById("enterDashboardBtn").textContent = isSignUpMode ? "Create account with email" : "Sign in with email";
    document.getElementById("toggleAuthModeBtn").textContent = isSignUpMode ? "I already have an account" : "Create an account";
    document.getElementById("passwordInput").autocomplete = isSignUpMode ? "new-password" : "current-password";
    showMessage("");
  });
  document.getElementById("passwordInput").addEventListener("keydown", event => {
    if (event.key === "Enter") handleEmailAuth();
  });

  window.handleUserLogout = handleLogout;
}

window.onload = initializeLogin;
