// Firebase Authentication for ScienceStudyHub.
// This config is the public web-app config from Firebase; never put service-account keys here.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
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

function showMessage(message, isError = true) {
  const target = document.getElementById("authMessage");
  if (!target) return;
  target.textContent = message;
  target.style.color = isError ? "#b02a37" : "#2b8a3e";
}

function setBusy(busy) {
  ["enterDashboardBtn", "toggleAuthModeBtn", "googleSignInBtn"].forEach(id => {
    const button = document.getElementById(id);
    if (button) button.disabled = busy;
  });
}

function validateInputs() {
  const username = normalizeUsername(document.getElementById("usernameInput").value);
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value;
  if (username.length < 2 || username.length > 32) throw new Error("Choose a username between 2 and 32 characters.");
  if (!/^[a-z0-9._-]+$/.test(username)) throw new Error("Username can use lowercase letters, numbers, dots, underscores, and hyphens.");
  if (!email) throw new Error("Enter your email address.");
  if (!password) throw new Error("Enter your password.");
  if (isSignUpMode && password.length < 6) throw new Error("Password must be at least 6 characters.");
  return { username, email, password };
}

async function verifyUsername(user, enteredUsername) {
  const profileRef = doc(db, "userProfiles", user.uid);
  const profile = await getDoc(profileRef);
  if (profile.exists()) {
    const savedUsername = normalizeUsername(profile.data().username || "");
    if (savedUsername !== enteredUsername) {
      await signOut(auth);
      throw new Error("That username does not match this account. Check it and try again.");
    }
  } else {
    // First successful authentication binds this username to the authenticated UID.
    await setDoc(profileRef, { username: enteredUsername, createdAt: new Date().toISOString() });
  }

  window.activeUser = enteredUsername;
  localStorage.setItem("current_active_user", enteredUsername);
  document.getElementById("welcomeUserBadge").innerText = "👤 Active Student: " + enteredUsername;
  document.querySelectorAll(".view-section").forEach(view => view.classList.remove("active"));
  window.showDashboard();
}

async function handleEmailAuth() {
  showMessage("");
  setBusy(true);
  try {
    const { username, email, password } = validateInputs();
    const credential = isSignUpMode
      ? await createUserWithEmailAndPassword(auth, email, password)
      : await signInWithEmailAndPassword(auth, email, password);
    await verifyUsername(credential.user, username);
  } catch (error) {
    showMessage(error.message || "Could not sign in. Check your details and try again.");
  } finally {
    setBusy(false);
  }
}

async function handleGoogleAuth() {
  showMessage("");
  setBusy(true);
  try {
    const username = normalizeUsername(document.getElementById("usernameInput").value);
    if (username.length < 2 || username.length > 32 || !/^[a-z0-9._-]+$/.test(username)) {
      throw new Error("Enter a username (2–32 letters, numbers, dots, underscores, or hyphens) before continuing with Google.");
    }
    const credential = await signInWithPopup(auth, new GoogleAuthProvider());
    await verifyUsername(credential.user, username);
  } catch (error) {
    showMessage(error.message || "Google sign-in failed. Please try again.");
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

  document.getElementById("enterDashboardBtn").addEventListener("click", handleEmailAuth);
  document.getElementById("googleSignInBtn").addEventListener("click", handleGoogleAuth);
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
};

window.onload = initializeLogin;
