"use strict";

checkTheme();

function checkTheme() {
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        checkThemeByLocalStorage()
    } else {
        // Sorry! No Web Storage support..
        checkThemeByCookie()
    }
}

function checkThemeByLocalStorage() {
    let themeValue = localStorage.getItem("prefer-color-scheme");
    updateTheme(themeValue)
}

function checkThemeByCookie() {
    let decodedCookie = decodeURIComponent(document.cookie);
    if(decodedCookie !== "") {
        let themeValue = "";
        let cookieList = decodedCookie.split(";");
        cookieList.forEach(function(value) {
            value = value.trim();
            if(value.indexOf("prefer-color-scheme=") === 0) {
                themeValue = value.substring(20);
            }
        });
        updateTheme(themeValue)
    } else {
        updateTheme("dark");
    }
}

function updateTheme(themeValue) {
    let theme = document.querySelector("#theme");
    if (theme == null) {
        theme = document.createElement("link");
        theme.type = "text/css";
        theme.rel = "stylesheet";
        theme.id = "theme";
    }
    switch (themeValue) {
        case "light":
            theme.href = "/src/stylesheets/lightTheme.css";
            console.log("light mode");
            break;
        case "dark":
            theme.href = "/src/stylesheets/darkTheme.css";
            console.log("dark mode");
            break;
        default:
            theme.href = "/src/stylesheets/darkTheme.css";
            console.log("dark mode by default");
            break
    }
    document.head.appendChild(theme);
}