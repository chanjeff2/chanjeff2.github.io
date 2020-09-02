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
    }
}

function updateTheme(themeValue) {
    // document.querySelectorAll(".toolButton").forEach(function(element) {
    //     element.style.transition = "none"
    // });
    // document.body.style.transition = "none";
    // document.querySelector("section").style.transition = "none";
    let theme = document.querySelector("#theme");
    switch (themeValue) {
        case "light":
            theme.href = "src/stylesheets/lightTheme.css";
            break;
        case "dark":
            theme.href = "src/stylesheets/darkTheme.css";
            break;
        default:
            break
    }
    // document.querySelectorAll(".toolButton").forEach(function(element) {
    //     element.style.transition = ""
    // });
    // document.body.style.transition = "";
    // document.querySelector("section").style.transition = "";
}