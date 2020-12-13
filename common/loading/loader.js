"use strict";

// $(window).load(function() {
//     hideLoadingScreen();
// });

window.onload = hideLoadingScreen();

function hideLoadingScreen() {
    let loadingScreen = document.querySelector("#loading");
    loadingScreen.classList.toggle("slide-out-to-top");
    setTimeout(() => {loadingScreen.style.display = "none";}, 5000);

    document.querySelector("body").style.overflow = "auto";
}
