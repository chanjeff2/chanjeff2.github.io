"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
$(document.body).ready(() => {
    importAboutMeTemplate(loadAllSkills);
});
function importAboutMeTemplate(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch("/common/template/template_about_me.html");
        let text = yield response.text();
        $(document.body).append(text);
        callback();
    });
}
class ProgrammingLanguage {
    constructor(name) {
        this.mRating = 1; // 1(beginner) - 5(expert)
        this.mName = name;
    }
    get name() {
        return this.mName;
    }
    get rating() {
        return this.mRating;
    }
    set rating(rating) {
        switch (true) {
            case rating < 1:
                this.rating = 1;
                break;
            case rating > 5:
                this.rating = 5;
                break;
            default:
                this.mRating = rating;
        }
    }
}
class ProgrammingLanguageViewHolder {
    constructor() {
        // TODO: create HTML component from template, and bind view
        let template = document.querySelector("#template-skill");
        this.rootView = template.content.cloneNode(true);
        Object.assign(this, this.rootView);
        this.nameView = this.rootView.querySelector(".skill_name");
        this.rating_container = this.rootView.querySelector(".rating_container");
    }
    setItemDetails(programmingLanguage) {
        // TODO: bind data to view
        this.nameView.innerHTML = programmingLanguage.name;
        let rating_counter = programmingLanguage.rating;
        let ratings = this.rating_container.querySelectorAll("svg");
        while (rating_counter > 0) {
            ratings[rating_counter - 1].style.fill = "currentColor";
            --rating_counter;
        }
    }
}
class ProgrammingLanguageAdapter {
    constructor(programmingLanguageList) {
        this.programmingLanguageList = programmingLanguageList;
    }
    createViewHolder(parent) {
        let viewHolder = new ProgrammingLanguageViewHolder();
        parent.appendChild(viewHolder.rootView);
        return viewHolder;
    }
    bindViewHolder(viewHolder, position) {
        viewHolder.setItemDetails(this.programmingLanguageList[position]);
    }
    getItemCount() {
        return this.programmingLanguageList.length;
    }
    renderContent(parent) {
        for (let i = 0; i < this.getItemCount(); i++) {
            let viewHolder = this.createViewHolder(parent);
            this.bindViewHolder(viewHolder, i);
        }
    }
}
function loadAllSkills() {
    let db = firebase.firestore();
    let parent = document.querySelector("#skill_container");
    db.collection("skills").get().then(querySnapshot => {
        let adapter = new ProgrammingLanguageAdapter(querySnapshot.docs.map(doc => doc.data()));
        adapter.renderContent(parent);
    });
}
