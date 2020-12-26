"use strict";

$(document).ready(() => {
    onInput();
})

class Project {
    /*
     * name
     * description
     * language
     * platform
     * image
     * videoLink
     * projectLink
     * githubLink
     * downloadLink
     */
};

function onUploadFile(input) {
    let uploading = document.querySelector(".upload-message");

    if (input.files && input.files[0]) {

        uploading.innerHTML = "Uploading...";

        let imgFiles = Array.from(input.files);

        let counter = imgFiles.length;

        imgFiles.forEach( file => {
            setTimeout(() => {
                let reader = new FileReader();

                reader.onload = function (e) {
                    let img = document.createElement("img");
                    img.src = e.target.result;
                    img.addEventListener("click", () => {
                        img.remove();
                        $(".new-project-form").trigger("input");
                    })
                    $(".upload-preivew-box").append(img);
                    $(".new-project-form").trigger("input");

                    --counter;
                    if (counter == 0) {
                        uploading.innerHTML = "Done!";
                        setTimeout(() => {uploading.innerHTML = "Choose a file or drag it here";}, 1000);
                    }
                };
                reader.readAsDataURL(file);
            }, 0);
        });
    }
}

function onInput() {
    let json_string = generateProjectJSONString();

    let project_panel = generateProjectPanel(json_string);

    let preview_section = document.querySelector("#new-project-preview-panel");
    preview_section.innerHTML = "";
    preview_section.append(project_panel);
}

function generateProjectJSONString() {
    let newProject = new Project();

    // name
    let name = document.querySelector("#project-name").value;
    newProject.name = name;

    // description
    let description = document.querySelector("#project-description").value;
    newProject.description = description;
    
    // language
    let languageNodes = document.querySelector("#project-language").querySelectorAll("input[type=checkbox]:checked + .input-hint");
    let language = [];
    languageNodes.forEach( node => {
        language.push(node.innerHTML);
    });
    newProject.language = language;

    // platform
    let platformNodes = document.querySelector("#project-platform").querySelectorAll("input[type=checkbox]:checked + .input-hint");
    let platform = [];
    platformNodes.forEach( node => {
        platform.push(node.innerHTML);
    });
    newProject.platform = platform;

    // image
    let imageNodes = document.querySelector(".upload-preivew-box").querySelectorAll("img");
    let image = [];
    imageNodes.forEach( node => {
        image.push(node.src);
    })
    newProject.image = image;

    // video link
    let videoLink = document.querySelector("#project-video-link").value;
    let videoID_regex = /v=([\d\w]+)|\.be\/([\d\w]+)/;
    let match = videoID_regex.exec(videoLink);
    let videoID = "";
    if (match) {
        videoID = match[1] ?? match[2];
    }
    newProject.videoLink = videoID ? "https://www.youtube.com/embed/" + videoID : "";

    // project link
    let projectLink = document.querySelector("#project-link").value;
    newProject.projectLink = projectLink;

    // github link
    let githubLink = document.querySelector("#project-github-link").value;
    newProject.githubLink = githubLink;

    // download link
    let downloadLink = document.querySelector("#project-download-link").value;
    newProject.downloadLink = downloadLink;

    return JSON.stringify(newProject);
}

function generateProjectPanel(proj_json_string) {
    let project = JSON.parse(proj_json_string);

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

            project_media_container.onclick = () => {
                mediaContainerWrapper.classList.toggle("enlarge");
            }

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
    project_media_container.children[2].classList.toggle("display");

    project_panel.append(mediaContainerWrapper);

    let project_details = document.createElement("div");
    project_details.classList.toggle("project-details");

    let name = document.createElement("h2");
    name.innerHTML = project.name ? project.name : "[name]";

    project_details.append(name);

    let description = document.createElement("p");
    description.innerHTML = project.description ? project.description : "[description]";

    project_details.append(description);

    let language = document.createElement("p");
    language.innerHTML = "<strong>Language</strong><br>" + (project.language.length > 0 ? project.language.join(", ") : "[language]");

    project_details.append(language);

    let platform = document.createElement("p");
    platform.innerHTML = "<strong>Platform</strong><br>" + (project.platform.length > 0 ? project.platform.join(", ") : "Unspecified");

    project_details.append(platform);

    if (project.projectLink || project.githubLink || project.downloadLink) {
        let flexbox = document.createElement("div");
        flexbox.classList.toggle("icons-container");

        if (project.projectLink) {
            let template = document.querySelector("#template-project-anchor-icon");
            let project = template.content.cloneNode(true);
            project.querySelector("a").href = project.projectLink;
    
            flexbox.append(project);
        }

        if (project.githubLink) {
            let template = document.querySelector("#template-github-anchor-icon");
            let github = template.content.cloneNode(true);
            github.querySelector("a").href = project.githubLink;
    
            flexbox.append(github);
        }
    
        if (project.downloadLink) {
            let template = document.querySelector("#template-download-anchor-icon");
            let download = template.content.cloneNode(true);
            download.querySelector("a").href = project.downloadLink;
    
            flexbox.append(download);
        }

        project_details.append(flexbox);
    }

    project_panel.append(project_details);

    return project_panel;
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