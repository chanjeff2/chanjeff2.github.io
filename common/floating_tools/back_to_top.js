"use strict";

let headerNav = document.querySelector("#header");
let container = document.querySelector("#container");
let theme = document.querySelector("#theme");

let backToTopButton = document.querySelector("#backToTop");

backToTopButton.onclick = function() { backToTop() };

window.addEventListener("scroll", () => {
    onScroll();
}, false);

$(document).ready(function() {
    onScroll();
});

function backToTop() {
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
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