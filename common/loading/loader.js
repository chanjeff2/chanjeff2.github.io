"use strict";

$("#loader-wrapper").load("/common/loading/loading.html");

window.onload = hideLoadingScreen();

function hideLoadingScreen() {
    let loadingScreen = document.querySelector("#loader-wrapper");

    setTimeout(() => {
        loadingScreen.classList.toggle("slide-out-to-top");
    }, 100); // donno why the animation is gone if direct call
    
    setTimeout(() => {loadingScreen.style.display = "none";}, 2000);

    document.querySelector("body").style.overflow = "auto";
}
