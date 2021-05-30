"use strict";

let callback = document.currentScript.getAttribute("callback-onload");
callback = Function("\"use strict\"; " + callback );

$(document.body).ready(() => {
    importProjectTemplate(callback);
})

async function importProjectTemplate(callback) {
    let response = await fetch("/common/template/template_project.html");
    let text = await response.text();

    $(document.body).append(text);

    callback();
}

function showAllProjects() {
    // Cloud Firestore
    let db = firebase.firestore();

    let project_container = document.querySelector("#project-container");

    db.collection("projects").get().then( querySnapshot => {
        querySnapshot.forEach( doc => {
            let projectPanel = generateProjectPanel(doc.data());
            project_container.append(projectPanel);
        }
    )})
}

function showAllProjectsWithEdit() {
    // Cloud Firestore
    let db = firebase.firestore();

    let project_container = document.querySelector("#project-edit-container");
    let template = document.querySelector("#template-project-editor-wrapper");

    db.collection("projects").get().then( querySnapshot => {
        querySnapshot.forEach( doc => {
            let projectPanel_wrapper = template.content.cloneNode(true).querySelector(".project-editor-wrapper");
            let projectPanel = generateProjectPanel(doc.data());
            projectPanel_wrapper.append(projectPanel);
            project_container.append(projectPanel_wrapper);
        }
    )})
}

function generateProjectPanel(project) {

    if (typeof(project) == "string") {
        project = JSON.parse(project);
    }

    let project_panel = document.createElement("div");
    project_panel.classList.toggle("project-panel");

    let template = document.querySelector("#template-media-container");
    let mediaContainerWrapper = template.content.cloneNode(true).querySelector(".media-container-wrapper");
    let project_media_container = mediaContainerWrapper.querySelector(".media-container");
    let project_media_navigator_container = mediaContainerWrapper.querySelector(".navigator-container");
    let templateNavigator = document.querySelector("#template-navigator");
    
    if (project.image.length > 0 || project.videoLink) {
        let counter = 0;

        // video
        if (project.videoLink) {
            let template = document.querySelector("#template-youtube-embedded-video");
            let video = template.content.cloneNode(true).querySelector("iframe");

            video.src = project.videoLink;
            video.classList.toggle("project-video");
            video.dataset.index = counter;

            project_media_container.append(video);

            let navigator = templateNavigator.content.cloneNode(true).querySelector(".navigator");
            navigator.dataset.index = counter;

            project_media_navigator_container.append(navigator);

            ++counter;
        }

        // image
        project.image.forEach(imageSrc => {
            let img = document.createElement("img");

            img.src = imageSrc;
            img.classList.toggle("project-image");
            img.alt = "project image";
            img.dataset.index = counter;

            project_media_container.append(img);

            let navigator = templateNavigator.content.cloneNode(true).querySelector(".navigator");
            navigator.dataset.index = counter;

            project_media_navigator_container.append(navigator);

            ++counter;
        })

        if (counter >= 2) {
            project_media_container.classList.toggle("multiple-media");

            let swiper = new Swipe(project_media_container);
            swiper.onLeft = () => {
                let btn = project_media_container.querySelector(".media-container-right");
                if (btn.disabled) {
                    return;
                }
                nextMedia(btn);
            }
            swiper.onRight = () => {
                let btn = project_media_container.querySelector(".media-container-left");
                if (btn.disabled) {
                    return;
                }
                previousMedia(btn);
            }
            swiper.run();
        }

        project_media_navigator_container.children[0].classList.toggle("display");
    } else {
        let img = document.createElement("img");

        img.src = "/res/drawable/code.svg";
        img.classList.toggle("adaptive-icon-no-hover");
        img.classList.toggle("project-image");

        img.alt = "project image";
        project_media_container.append(img);
    }
    project_media_container.onclick = () => {
        mediaContainerWrapper.classList.toggle("enlarge");
    }

    project_media_container.children[2].classList.toggle("display");

    project_panel.append(mediaContainerWrapper);

    let project_details = document.createElement("div");
    project_details.classList.toggle("project-details");

    let name = document.createElement("h2");
    name.classList.toggle("project-name");
    name.innerHTML = project.name ? project.name : "[name]";

    project_details.append(name);

    let description = document.createElement("p");
    description.classList.toggle("project-description");
    description.innerHTML = project.description ? project.description : "[description]";

    project_details.append(description);

    let language = document.createElement("p");
    language.classList.toggle("project-language");
    language.innerHTML = "<strong>Language</strong><br>" + (project.language.length > 0 ? project.language.join(", ") : "[language]");

    project_details.append(language);

    let platform = document.createElement("p");
    platform.classList.toggle("project-platform");
    platform.innerHTML = "<strong>Platform</strong><br>" + (project.platform.length > 0 ? project.platform.join(", ") : "Unspecified");

    project_details.append(platform);

    if (project.projectLink || project.githubLink || project.downloadLink) {
        let flexbox = document.createElement("div");
        flexbox.classList.toggle("icons-container");

        if (project.projectLink) {
            let template = document.querySelector("#template-project-anchor-icon");
            let projectBtn = template.content.cloneNode(true);
            projectBtn.querySelector("a").href = project.projectLink;
    
            flexbox.append(projectBtn);
        }

        if (project.githubLink) {
            let template = document.querySelector("#template-github-anchor-icon");
            let githubBtn = template.content.cloneNode(true);
            githubBtn.querySelector("a").href = project.githubLink;
    
            flexbox.append(githubBtn);
        }
    
        if (project.downloadLink) {
            let template = document.querySelector("#template-download-anchor-icon");
            let downloadBtn = template.content.cloneNode(true);
            downloadBtn.querySelector("a").href = project.downloadLink;
    
            flexbox.append(downloadBtn);
        }

        project_details.append(flexbox);
    }

    project_panel.append(project_details);

    return project_panel;
}

class Swipe {
    constructor(element) {
        this.xDown = null;
        this.yDown = null;
        this.element = typeof(element) === 'string' ? document.querySelector(element) : element;

        this.element.addEventListener('touchstart', function(evt) {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
        }.bind(this), false);

    }

    onLeft(callback) {
        this.onLeft = callback;

        return this;
    }

    onRight(callback) {
        this.onRight = callback;

        return this;
    }

    onUp(callback) {
        this.onUp = callback;

        return this;
    }

    onDown(callback) {
        this.onDown = callback;

        return this;
    }

    handleTouchMove(evt) {
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;

        if ( Math.abs( this.xDiff ) > Math.abs( this.yDiff ) ) { // Most significant.
            if ( this.xDiff > 0 ) {
                this.onLeft();
            } else {
                this.onRight();
            }
        } else {
            if ( this.yDiff > 0 ) {
                this.onUp();
            } else {
                this.onDown();
            }
        }

        // Reset values.
        this.xDown = null;
        this.yDown = null;
    }

    run() {
        this.element.addEventListener('touchmove', function(evt) {
            this.handleTouchMove(evt);
        }.bind(this), false);
    }
}

function previousMedia(node) {
    event.stopPropagation();

    let container = node.parentNode;
    let noOfMedia = container.childElementCount - 2;

    node.parentNode.children[0].disabled = true;
    node.parentNode.children[1].disabled = true;

    let currentMedia = container.querySelector(".display");
    let index = currentMedia.dataset.index;

    let previousIndex = 2 + (((+index - 1) % noOfMedia) + noOfMedia) % noOfMedia;
    let previousMedia = container.children[previousIndex];

    let navigatorContainer = container.parentNode.querySelector(".navigator-container");
    let currentNavigator = navigatorContainer.querySelector(".display");
    let nextNavigator = navigatorContainer.querySelector("[data-index=\"" + (previousIndex - 2) + "\"]");
    currentNavigator.classList.toggle("display");
    nextNavigator.classList.toggle("display");

    setTimeout(() => {
        currentMedia.classList.toggle("slide-out-right");
    }, 0);

    setTimeout(() => {
        previousMedia.classList.toggle("display");
        previousMedia.classList.toggle("slide-in-left");
    }, 0);

    setTimeout(() => {
        currentMedia.classList.toggle("display");
        currentMedia.classList.toggle("slide-out-right");
        previousMedia.classList.toggle("slide-in-left");

        container.children[0].disabled = false;
        container.children[1].disabled = false;
    }, 300);
}

function nextMedia(node) {
    event.stopPropagation();

    let container = node.parentNode;
    let noOfMedia = container.childElementCount - 2;

    container.children[0].disabled = true;
    container.children[1].disabled = true;

    let currentMedia = container.querySelector(".display");
    let index = currentMedia.dataset.index;

    let nextIndex = 2 + (((+index + 1) % noOfMedia) + noOfMedia) % noOfMedia;
    let nextMedia = container.children[nextIndex];

    let navigatorContainer = container.parentNode.querySelector(".navigator-container");
    let currentNavigator = navigatorContainer.querySelector(".display");
    let nextNavigator = navigatorContainer.querySelector("[data-index=\"" + (nextIndex - 2) + "\"]");
    
    currentNavigator.classList.toggle("display");
    nextNavigator.classList.toggle("display");

    setTimeout(() => {
        currentMedia.classList.toggle("slide-out-left");
    }, 0);

    setTimeout(() => {
        nextMedia.classList.toggle("display");
        nextMedia.classList.toggle("slide-in-right");
    }, 0);

    setTimeout(() => {
        currentMedia.classList.toggle("display");
        currentMedia.classList.toggle("slide-out-left");
        nextMedia.classList.toggle("slide-in-right");

        container.children[0].disabled = false;
        container.children[1].disabled = false;
    }, 300);
}

function gotoMedia(navigator) {
    event.stopPropagation();

    let navigatorContainer = navigator.parentNode;

    let currentNavigator = navigatorContainer.querySelector(".display");
    let index = currentNavigator.dataset.index;
    let nextIndex = navigator.dataset.index;

    if (index == nextIndex) {
        return;
    }

    currentNavigator.classList.toggle("display");
    navigator.classList.toggle("display");

    let container = navigatorContainer.parentNode.querySelector(".media-container");

    container.children[0].disabled = true;
    container.children[1].disabled = true;
    navigatorContainer.querySelectorAll(".navigator").forEach( btn => {
        btn.disabled = true;
    });

    let currentMedia = container.querySelector(".display");

    let nextMedia = container.querySelector("[data-index=\"" + nextIndex + "\"]");

    if (nextIndex > index) {
        // go to right, next
        setTimeout(() => {
            currentMedia.classList.toggle("slide-out-left");
        }, 0);
    
        setTimeout(() => {
            nextMedia.classList.toggle("display");
            nextMedia.classList.toggle("slide-in-right");
        }, 0);
    
        setTimeout(() => {
            currentMedia.classList.toggle("display");
            currentMedia.classList.toggle("slide-out-left");
            nextMedia.classList.toggle("slide-in-right");
    
            container.children[0].disabled = false;
            container.children[1].disabled = false;
            navigatorContainer.querySelectorAll(".navigator").forEach( btn => {
                btn.disabled = false;
            });
        }, 300);
    } else {
        setTimeout(() => {
            currentMedia.classList.toggle("slide-out-right");
        }, 0);
    
        setTimeout(() => {
            nextMedia.classList.toggle("display");
            nextMedia.classList.toggle("slide-in-left");
        }, 0);
    
        setTimeout(() => {
            currentMedia.classList.toggle("display");
            currentMedia.classList.toggle("slide-out-right");
            nextMedia.classList.toggle("slide-in-left");
    
            container.children[0].disabled = false;
            container.children[1].disabled = false;
            navigatorContainer.querySelectorAll(".navigator").forEach( btn => {
                btn.disabled = false;
            });
        }, 300);
    }
}

