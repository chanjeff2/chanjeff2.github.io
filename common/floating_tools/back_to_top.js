"use strict";

let backToTopButton = document.querySelector("#backToTop");
let toggleSnowEffectButton = document.querySelector("#snowBtn")

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
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        backToTopButton.style.visibility = "visible";
        toggleThemeButton.style.bottom = "90px";
        toggleSnowEffectButton.style.bottom = "160px";
    } else {
        backToTopButton.style.visibility = "hidden";
        toggleThemeButton.style.bottom = "20px";
        toggleSnowEffectButton.style.bottom = "90px";
    }
}