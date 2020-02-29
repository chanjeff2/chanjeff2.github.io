"use strict";

document.body.onload = function() { main(); textField.focus(); };
let vocabList = [];
let rawVocabList = [];
let textField = document.getElementById("textField");
let vocabListFile = [
    "fall_vocab1.txt",
    "fall_vocab2.txt",
    "fall_vocab3.txt",
    "spring_vocab1.txt",
    "spring_vocab2.txt",
    "spring_vocab3.txt"
];

function loadVocabList(filename) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
             rawVocabList = xhttp.responseText.split("\n");
            addVocabListToAutoComplete();
        }
    };
    xhttp.open("GET", "/res/vocab/" + filename, true);
    xhttp.send();
}

function addVocabListToAutoComplete() {
    vocabList = rawVocabList.filter(function(value) { return value });
    vocabList.forEach(createNewAutoCompleteListObject)
}

function createNewAutoCompleteListObject(values) {
    let newVocab = document.createElement("option");
    newVocab.value = values;
    let dataList = document.getElementById("vocabs");
    dataList.appendChild(newVocab)
}

function main() {
    for (let i of vocabListFile) {
        loadVocabList(i);
    }
}