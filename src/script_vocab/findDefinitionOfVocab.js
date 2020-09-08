"use strict";

let dictWebSite = document.querySelector("#cambridgeDict");
// let inputForm = document.querySelector("#searchForm");
let inputField = document.querySelector("#textField");
let submitButton = document.querySelector("#submitButton");

// inputForm.onsubmit = function () { searchDefinition() };
submitButton.onclick = function () { searchDefinition() };

function searchDefinition() {
    let vocab = inputField.value;
    dictWebSite.src = "https://dictionary.cambridge.org/us/dictionary/english/" + vocab;
}