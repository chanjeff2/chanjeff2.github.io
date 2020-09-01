"use strict";

let loginBox = document.getElementById("loginBox");
let loginBoxExpanded = true;

function resizeLoginBlock() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        if(!loginBoxExpanded) {
            loginBox.style.height = "330px";
            loginBox.style.width = "300px";
            loginBox.style.display = "flex";
            loginBox.style.cursor = "default";
            window.addEventListener("click", function (e) {
                if (loginBox.contains(e.target)) {

                } else {
                    loginBox.style.height = "30px";
                    loginBox.style.width = "70px";
                    loginBox.style.display = "unset";
                    loginBox.style.cursor = "pointer";
                }
            });
        }
        loginBoxExpanded = !loginBoxExpanded;
    }
}