"use strict";

$(document).ready(function() {
    hideLoadingScreen();
});

function hideLoadingScreen() {
    let loadingScreen = document.querySelector("#loading");
    loadingScreen.classList.toggle("slide-out-to-top");
    setTimeout(() => {loadingScreen.style.display = "none";}, 1000);
}
