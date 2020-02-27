"use strict";

let dictWebSite = document.getElementById("cambridgeDict");
let inputForm = document.getElementById("searchForm");
let inputField = document.getElementById("textField");
let submitButton = document.getElementById("submitButton");

// inputForm.onsubmit = function () { searchDefinition() };
submitButton.onclick = function () { searchDefinition() };

function searchDefinition() {
    let vocab = inputField.value;
    dictWebSite.src = "https://dictionary.cambridge.org/us/dictionary/english/" + vocab;
    dictWebSite.display = "block";
}