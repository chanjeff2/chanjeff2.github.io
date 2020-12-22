"use strict";

// load header

let headerType = document.currentScript.getAttribute("header-type");
switch (headerType) {
    case "large":
        $.get("/common/header/largeHeader/largeHeader.html", (data) => {
            $(data).insertAfter("#loader-wrapper");
        });
        break;
    case "normal":
    default:
        $.get("/common/header/normalHeader/normalHeader.html", (data) => {
            $(data).insertAfter("#loader-wrapper");
        });
        break;
}

// load floating tools
$.get("/common/floating_tools/floating_tools.html", (data) => {
    $(document.body).append(data);
});
