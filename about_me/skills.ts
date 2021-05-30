"use strict";

$(document.body).ready(() => {
    importAboutMeTemplate(loadAllSkills);
})

async function importAboutMeTemplate(callback) {
    let response = await fetch("/common/template/template_about_me.html");
    let text = await response.text();

    $(document.body).append(text);

    callback();
}

class ProgrammingLanguage {
    mName: string;
    mRating: number = 1; // 1(beginner) - 5(expert)

    constructor(name: string) {
        this.mName = name;
    }

    get name() {
        return this.mName;
    }

    get rating() {
        return this.mRating;
    }

    set rating(rating: number) {
        switch(true) {
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
    nameView: HTMLElement;
    rating_container: HTMLElement;
    rootView: HTMLElement;

    constructor() {
        // TODO: create HTML component from template, and bind view
        let template = document.querySelector("#template-skill");
        this.rootView = template.content.cloneNode(true);
        Object.assign(this, this.rootView);
        this.nameView = this.rootView.querySelector(".skill_name");
        this.rating_container = this.rootView.querySelector(".rating_container");
    }

    setItemDetails(programmingLanguage: ProgrammingLanguage) {
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
    programmingLanguageList: Array<ProgrammingLanguage>;

    constructor(programmingLanguageList: Array<ProgrammingLanguage>) {
        this.programmingLanguageList = programmingLanguageList;
    }

    createViewHolder(parent: Element): ProgrammingLanguageViewHolder {
        let viewHolder = new ProgrammingLanguageViewHolder()
        parent.appendChild(viewHolder.rootView)
        return viewHolder;
    }

    bindViewHolder(viewHolder: ProgrammingLanguageViewHolder, position: number) {
        viewHolder.setItemDetails(this.programmingLanguageList[position]);
    }

    getItemCount(): number {
        return this.programmingLanguageList.length;
    }

    renderContent(parent: Element) {
        for (let i = 0; i < this.getItemCount(); i++) {
            let viewHolder = this.createViewHolder(parent);
            this.bindViewHolder(viewHolder, i);
        }
    }
}

function loadAllSkills() {
    let db = firebase.firestore();

    let parent = document.querySelector("#skill_container");

    db.collection("skills").get().then( querySnapshot => {
        let adapter = new ProgrammingLanguageAdapter(querySnapshot.docs.map(doc => doc.data()));
        adapter.renderContent(parent);
    })
}