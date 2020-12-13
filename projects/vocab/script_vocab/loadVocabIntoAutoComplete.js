"use strict";

window.addEventListener("load", () => {
    main();
    autoLogin();
});
let tempVocabList = [];
let rawVocabList = [];
let textField = document.querySelector("#textField");
let hint = document.querySelector("#hint_vocabList");
let hintBox = document.querySelector("#hintBox");
let vocabListFile = [
    "fall_vocab_list_1.txt",
    "fall_vocab_list_2.txt",
    "fall_vocab_list_3.txt",
    "spring_vocab_list_1.txt",
    "spring_vocab_list_2.txt",
    "spring_vocab_list_3.txt"
];

let vocabListName = [
    "Fall Vocab List 1",
    "Fall Vocab List 2",
    "Fall Vocab List 3",
    "Spring Vocab List 1",
    "Spring Vocab List 2",
    "Spring Vocab List 3",
    "Custom Vocab List"
];
let vocabList = {};
let i = 1;
textField.oninput = function() { checkVocabInList() };

function addVocabListToAutoComplete() {
    tempVocabList = rawVocabList.filter(function(value) { return value });
    let dataList = document.querySelector("#vocabs");
    let datalistFragment = document.createDocumentFragment();
    tempVocabList.forEach(function(value) {
        let newVocab = document.createElement("option");
        newVocab.value = value;
        datalistFragment.appendChild(newVocab)
    });
    dataList.appendChild(datalistFragment);
}

function storeVocabList() {
    vocabList[i] = tempVocabList;
    i++;
}

function loadVocabList(filename) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            rawVocabList = xhttp.responseText.split(/\n|\r\n/);
            addVocabListToAutoComplete();
            storeVocabList()
        }
    };
    xhttp.open("GET", "vocab/" + filename, true);
    xhttp.send();
}

function loadCustomVocabList() {
    // console.log(customVocabList);
    rawVocabList = customVocabList;
    addVocabListToAutoComplete();
    storeVocabList();
}

function main() {
    for (let i of vocabListFile) {
        loadVocabList(i);
    }
    textField.focus();
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
            hint.innerHTML = vocabListName[count];
            hintBox.style.display= "flex";
            return
        } else {
            hint.innerHTML = "";
            hintBox.style.display = "none";
        }
        count++;
    }
}