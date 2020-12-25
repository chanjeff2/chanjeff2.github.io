"use strict";

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
    let floatTools = document.querySelector("#floating-tools");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        floatTools.style.bottom = "20px";
        backToTopButton.style.visibility = "visible";
        backToTopButton.style.opacity = 1;
    } else {
        floatTools.style.bottom = "-38px";
        backToTopButton.style.opacity = 0;
        backToTopButton.style.visibility = "hidden";
    }
}