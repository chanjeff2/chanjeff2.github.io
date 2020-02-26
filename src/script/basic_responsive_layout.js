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
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        backToTopButton.style.display = "block";
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            // headerNav.style.transition = "0.2s";
            headerNav.style.padding = "10px 0";
            headerNav.style.position = "fixed";
            container.style.marginTop = "400px";
        } else {
            headerNav.style.padding = "160px 0";
            headerNav.style.position = "relative";
            container.style.marginTop = "0";
        }
    } else {
        backToTopButton.style.display = "none";
    }
}