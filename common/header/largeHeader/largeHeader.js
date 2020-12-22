"use strict";

window.addEventListener("scroll", () => {
    onScroll();
}, false);

$(document).ready(function() {
    onScroll();
});

function toVH(px) {
    return px * 100 / window.innerHeight;
}

function toVW(px) {
    return px * 100 / window.innerWidth;
}

function onScroll() {
    let header = document.querySelector("header");
    let container = document.querySelector("#container");

    let title = document.querySelector("#title")
    let scrollTop = toVH(Math.max(document.body.scrollTop, document.documentElement.scrollTop));
    let header_height = 40; // vh
    let header_padding = getComputedStyle(document.documentElement).getPropertyValue("--header-height") / 2; // vh
    let title_height = toVH(title?.offsetHeight ?? 0); // vh

    // resizing header as scrolling
    if (scrollTop > header_height - header_padding * 2) {
        header.style.padding = (header_padding - title_height / 2) + "vh 0";
        header.style.position = "fixed";
        container.style.marginTop = header_height + "vh";
    } else {
        let paddingBot = (header_height - scrollTop) / 2 - title_height / 2;
        let paddingTop = scrollTop + paddingBot;
        header.style.padding = paddingTop.toString() + "vh 0 " + paddingBot.toString() +"vh";
        header.style.position = "relative";
        container.style.marginTop = "0";
    }
}