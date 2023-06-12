let darkMode = null;
console.log("darkMode has just been set to:", darkMode)

function detectSystemTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    darkMode = true;
    console.log("darkMode has just been set to:", darkMode)
    console.log("dark mode detected");
    setDarkMode();
  } else {
    darkMode = false;
    console.log("darkMode has just been set to:", darkMode)
    console.log("light mode detected");
    setLightMode();
  }
}

function toggleTheme() {
  if (darkMode == true) {
    console.log("I think darkmode is true");
    setLightMode();
    return;
  }
  if (darkMode == false) {
    console.log("I think darkmode is false");
    setDarkMode();
    return;
  }
}

function setDarkMode() {
  document.body.classList.add("darkMode");
  document.body.classList.remove("lightMode");
  console.log("changed to dark mode");
  darkMode = true
  document.getElementById('sunMoon').innerText = "✹"
}

function setLightMode() {
  document.body.classList.add("lightMode");
  document.body.classList.remove("darkMode");
  console.log("changed to light mode");
  darkMode = false
  document.getElementById('sunMoon').innerText = "☾"
}

