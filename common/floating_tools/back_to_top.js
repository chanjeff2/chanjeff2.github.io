"use strict";

let headerNav = document.querySelector("#header");
let container = document.querySelector("#container");
let theme = document.querySelector("#theme");

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
        toggleSnowEffectButton.style.bottom = "160px";
    } else {
        backToTopButton.style.visibility = "hidden";
        toggleThemeButton.style.bottom = "20px";
        toggleSnowEffectButton.style.bottom = "90px";
    }

    let title = document.querySelector("#title")
    let scrollTop = toVH(Math.max(document.body.scrollTop, document.documentElement.scrollTop));
    let header_height = 40; // vh
    let header_padding = 3; // vh
    let title_height = toVH(title?.offsetHeight ?? 0); // vh

    // resizing header as scrolling
    if (scrollTop > header_height - header_padding * 2) {
        headerNav.style.padding = (header_padding - title_height / 2) + "vh 0";
        headerNav.style.position = "fixed";
        container.style.marginTop = "40vh";
    } else {
        let paddingBot = (header_height - scrollTop) / 2 - title_height / 2;
        let paddingTop = scrollTop + paddingBot;
        headerNav.style.padding = paddingTop.toString() + "vh 0 " + paddingBot.toString() +"vh";
        headerNav.style.position = "relative";
        container.style.marginTop = "0";
    }
}