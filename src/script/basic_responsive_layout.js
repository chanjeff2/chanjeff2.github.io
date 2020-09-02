"use strict";

let backToTopButton = document.getElementById("backToTop");
let toggleThemeButton = document.getElementById("toggleTheme");
let headerNav = document.getElementById("header");
let container = document.getElementById("container");
let theme = document.getElementById("theme");
backToTopButton.onclick = function() { backToTop() };
toggleThemeButton.onclick = function() { toggleTheme() };
window.onscroll = function () { onScroll() };
document.body.onload = function() { onScroll() };

function backToTop() {
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
}

function toggleTheme() {
    if (theme.href.endsWith("lightTheme.css")) {
        theme.href = "src/stylesheets/darkTheme.css";
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            localStorage.setItem("prefer-color-scheme", "dark")
        } else {
            // Sorry! No Web Storage support..
            document.cookie = "prefer-color-scheme=dark"
        }
    } else {
        theme.href = "src/stylesheets/lightTheme.css";
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            localStorage.setItem("prefer-color-scheme", "light")
        } else {
            // Sorry! No Web Storage support..
            document.cookie = "prefer-color-scheme=light"
        }
    }
}

function onScroll() {
    // show or hide display button
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        backToTopButton.style.visibility = "visible";
        toggleThemeButton.style.bottom = "90px";
    } else {
        backToTopButton.style.visibility = "hidden";
        toggleThemeButton.style.bottom = "20px";
    }

    // resizing header as scrolling
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        headerNav.style.padding = "10px 0";
        headerNav.style.position = "fixed";
        container.style.marginTop = "370px";
    } else {
        // headerNav.style.padding = "160px 0";
        let paddingTop = Math.min(310, 160 + Math.max(document.body.scrollTop, document.documentElement.scrollTop));
        let paddingBot = Math.max(10, 160 - Math.max(document.body.scrollTop, document.documentElement.scrollTop));
        headerNav.style.padding = paddingTop.toString() + "px 0 " + paddingBot.toString() +"px";
        headerNav.style.position = "relative";
        container.style.marginTop = "0";
    }
}