"use strict";

// let db = firebase.firestore();
let customVocabList = [];

function updatePreview() {
    let input = document.getElementById("largeInputField").value;
    let tempVocabArray = input.split(/\s{2,}/);
    let vocabPreviewList = document.getElementById("vocabPreviewList");
    vocabPreviewList.innerHTML = "";
    let listFragment = document.createDocumentFragment();

    tempVocabArray.forEach(function(value) {
        let vocabBlock = document.createElement("li");
        let node = document.createTextNode(value);
        vocabBlock.appendChild(node);
        listFragment.appendChild(vocabBlock);
    });

    vocabPreviewList.appendChild(listFragment);
}

function storeVocab() {
    if(currentUser !== "") {
        let input = document.getElementById("largeInputField").value;
        let tempVocabArray = input.split(/\s{2,}/);
        console.log(tempVocabArray);
        console.log(currentUser);
        tempVocabArray.forEach(function(value) {
            let vocabQuery = db.collection("vocabs").where("userName", "==", currentUser).where("vocab", "==", value);
                vocabQuery.get()
                .then(function(querySnapshot) {
                    if(querySnapshot.empty) {
                        db.collection("vocabs").doc(currentUser+"-"+value).set({
                            userName: currentUser,
                            vocab: value
                        })
                    } else {
                        console.log("vocab repeated: " + value);
                        alert("vocab repeated: " + value);
                    }
                })
                .catch(function(error) {
                    console.log("error occurs: ", error);
                })
        });
        document.getElementById("largeInputField").value = "";
        updatePreview();
        alert("Uploaded successfully")
    }
}

function getVocab() {
    let vocabQuery = db.collection("vocabs").where("userName", "==", currentUser);
    vocabQuery.get()
        .then(function(querySnapshot) {
            if(querySnapshot.empty) {

            } else {
                querySnapshot.forEach(function (vocab) {
                    let vocabBlock = vocab.data();
                    // console.log(vocabBlock);
                    let vocabValue = vocabBlock.vocab;
                    // console.log(vocabBlock.vocab);
                    customVocabList.push(vocabValue);
                    // console.log(customVocabList);
                })
            }
        })
            .catch(function(error) {
                console.log("error occurs: ", error);
            });
    return customVocabList;
}