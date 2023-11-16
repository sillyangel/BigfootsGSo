import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAJ-mx1xirCFa1U1f81tu1YAivR0q3s128",
  authDomain: "bigfootgameshack.firebaseapp.com",
  projectId: "bigfootgameshack",
  storageBucket: "bigfootgameshack.appspot.com",
  messagingSenderId: "536806259457",
  appId: "1:536806259457:web:254f23bed2643e9330f900",
  measurementId: "G-W25YQGQVTV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);

const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const signupForm = document.getElementById("signup-form");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");

function handleLogin(event) {
  event.preventDefault(); // Prevent form submission
  const email = loginEmail.value;
  const password = loginPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Logged in as: " + user.email);
      window.location.href = "./"
    })
    .catch((error) => {
      alert("Login error: " + error.message);
    });
}

function handleSignup(event) {
  event.preventDefault(); // Prevent form submission
  const email = signupEmail.value;
  const password = signupPassword.value;

  if (!email.endsWith("@students.kleinisd.net")) {
    alert("Signup error: Only emails with @students.kleinisd.net are allowed.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      let user = auth.currentUser;
      alert("Signed up:", user);
      window.location.reload();
      window.location.href = "./"
    })
    .catch((error) => {
      alert("Signup error:", error.message);
    });
}

if (window.location.href.includes("loginsignin.html")) {
  loginForm.addEventListener("submit", handleLogin);
  signupForm.addEventListener("submit", handleSignup);
}

onAuthStateChanged(auth, (currentUser) => {
  if (!currentUser && !window.location.href.includes("loginsignin.html")) {
    // No user is signed in, redirect to the login page
    window.location.href = "./loginsignin.html";
  }
});