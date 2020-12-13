"use strict";

let toggleThemeButton = document.querySelector("#toggleTheme");

toggleThemeButton.onclick = function() { toggleTheme() };

function toggleTheme() {
    if (theme.href.endsWith("lightTheme.css")) {
        theme.href = "/src/stylesheets/darkTheme.css";
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            localStorage.setItem("prefer-color-scheme", "dark")
        } else {
            // Sorry! No Web Storage support..
            document.cookie = "prefer-color-scheme=dark"
        }
    } else {
        theme.href = "/src/stylesheets/lightTheme.css";
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            localStorage.setItem("prefer-color-scheme", "light")
        } else {
            // Sorry! No Web Storage support..
            document.cookie = "prefer-color-scheme=light"
        }
    }
}