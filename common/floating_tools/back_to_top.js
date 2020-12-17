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

function toVH(px) {
    return px * 100 / window.innerHeight;
}

function toVW(px) {
    return px * 100 / window.innerWidth;
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

    let title = document.querySelector("#title")
    let scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

    // resizing header as scrolling
    if (toVH(scrollTop) > 36 - toVH(title.offsetHeight)) {
        headerNav.style.padding = "2vh 0";
        headerNav.style.position = "fixed";
        container.style.marginTop = 37 + toVH(title.offsetHeight) + "vh";
    } else {
        // headerNav.style.padding = "160px 0";
        let paddingTop = Math.min(38, 20 + toVH(scrollTop)) - toVH(title.offsetHeight);
        let paddingBot = Math.max(2, 20 - toVH(scrollTop));
        headerNav.style.padding = paddingTop.toString() + "vh 0 " + paddingBot.toString() +"vh";
        headerNav.style.position = "relative";
        container.style.marginTop = "0";
    }
}