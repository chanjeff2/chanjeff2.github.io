"use strict";

let db = firebase.firestore();
let alreadyLogin = false;
let currentUser = "";

function autoLogin() {
    let decodedCookie = decodeURIComponent(document.cookie);
    if(decodedCookie !== "") {
        let userName = "";
        let cookieList = decodedCookie.split(";");
        cookieList.forEach(function(value) {
            value = value.trim();
            if(value.indexOf("username=") === 0) {
                userName = value.substring(9);
                login(userName);
            }
        });
    }
}

function signUp(userName = document.getElementById("userNameInput").value) {
    if(userName.trim() === "") {
        console.log("please enter user name");
        return;
    }
    let hint = document.getElementById("loginHint");
    let userRef = db.collection("users").doc(userName);
    userRef.get().then(function(user) {
        if(user.exists) {
            console.log("user already exists.");
            hint.innerHTML = "User already exists.";
            hint.style.visibility = "visible";
        } else {
            // console.log("user does not exists.");
            userRef.set({
                userName: userName
            });
            hint.innerHTML = "Signed Up successfully";
            hint.style.visibility = "visible";
            login(userName)
        }
    })
        .catch(function(error) {
            console.log("error occurs: ", error);
        })
}

function login(userName = document.getElementById("userNameInput").value) {
    if(userName.trim() === "") {
        console.log("please enter user name");
        return;
    }
    let hint = document.getElementById("loginHint");
    let rememberMe = document.getElementById("rememberMe").checked;
    // console.log(rememberMe);
    let userRef = db.collection("users").doc(userName);
    userRef.get().then(function(user) {
        if(user.exists) {
            // console.log(user.data());
            currentUser = userName;
            getVocab();
            setTimeout(function () {loadCustomVocabList();}, 1000);
            hint.innerHTML = "Logged in successfully";
            hint.style.visibility = "visible";
            if(rememberMe) {
                let d = new Date();
                d.setTime(d.getTime() + 3 * 30 * 24 * 60 * 60 * 1000);
                document.cookie = "username=" + userName + "; expires=" + d.toUTCString();
            }
            document.getElementById("loginBox").style.display = "none";
            document.getElementById("welcomeLabel").innerHTML = "Welcome " + userName;
            document.getElementById("welcomeMSG").style.display = "block";
            document.getElementById("storeUsedVocab").style.display = "flex";
            alreadyLogin = true;
        } else {
            console.log("user does not exists.");
            hint.innerHTML = "User does not exists. Please sign up first.";
            hint.style.visibility = "visible";
        }
    })
        .catch(function(error) {
            console.log("error occurs: ", error);
        })
}