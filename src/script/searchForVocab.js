"use strict";

document.body.onload = function() { main() };
let vocabList = [];
let rawVocabList = [];

function loadVocabList() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
             rawVocabList = xhttp.responseText.split("\r");
            addVocabListToAutoComplete();
        }
    };
    xhttp.open("GET", "/res/vocab/vocab.txt", true);
    xhttp.send();
}

function addVocabListToAutoComplete() {
    // vocabList = rawVocabList.filter(checkIfEmpty);
    vocabList = rawVocabList.filter(function(value) { return value });
    vocabList.forEach(createNewAutoCompleteListObject)
}

// function checkIfEmpty(value) {
//     return value;
// }

function createNewAutoCompleteListObject(values) {
    let newVocab = document.createElement("option");
    newVocab.value = values;
    let dataList = document.getElementById("vocabs");
    dataList.appendChild(newVocab)
}

function main() {
    loadVocabList();
}
