"use strict";

let backToTopButton = document.getElementById("backToTop");
let headerNav = document.getElementById("header");
let container = document.getElementById("container");
backToTopButton.onclick = function() { backToTop() };
window.onscroll = function () { whenScrollDown() };

function backToTop() {
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
    // backToTopButton.style.display = "none";
}

function whenScrollDown() {
    // show or hide display button
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }

    // resizing header as scrolling
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        // headerNav.style.transition = "0.2s";
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