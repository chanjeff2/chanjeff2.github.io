"use strict";

document.body.onload = function() { main(); textField.focus(); };
let tempVocabList = [];
let rawVocabList = [];
let textField = document.getElementById("textField");
let hint = document.getElementById("hint_vocabList");
let hintBox = document.getElementById("hintBox");
let vocabListFile = [
    "fall_vocab_list_1.txt",
    "fall_vocab_list_2.txt",
    "fall_vocab_list_3.txt",
    "spring_vocab_list_1.txt",
    "spring_vocab_list_2.txt",
    "spring_vocab_list_3.txt"
];
let vocabList = {};
let i = 1;
textField.oninput = function() { checkVocabInList() };

function addVocabListToAutoComplete() {
    tempVocabList = rawVocabList.filter(function(value) { return value });
    tempVocabList.forEach(createNewAutoCompleteListObject)
}

function createNewAutoCompleteListObject(values) {
    let newVocab = document.createElement("option");
    newVocab.value = values;
    let dataList = document.getElementById("vocabs");
    dataList.appendChild(newVocab)
}

function storeVocabList() {
    vocabList[i] = tempVocabList;
    i++;
}

function loadVocabList(filename) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
             rawVocabList = xhttp.responseText.split("\n");
            addVocabListToAutoComplete();
            storeVocabList()
        }
    };
    xhttp.open("GET", "/res/vocab/" + filename, true);
    xhttp.send();
}


function main() {
    for (let i of vocabListFile) {
        loadVocabList(i);
    }
}

function isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function checkVocabInList() {
    let input = inputField.value;
    let count = 0;
    for (let key in vocabList) {
        tempVocabList = vocabList[key].filter(function(value) { return value === input;});
        if (!isEmpty(tempVocabList)) {
            hint.innerHTML = vocabListFile[count];
            hintBox.style.visibility = "visible";
            return
        } else {
            hint.innerHTML = "";
            hintBox.style.visibility = "hidden";
        }
        count++;
    }
}