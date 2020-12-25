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
    console.log(input.files);
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
    console.log(match);
    let videoID = "";
    if (match) {
        videoID = match[1] ?? match[2];
    }
    console.log(videoID);
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

    

    if (project.image.length > 0) {
        let img = document.createElement("img");

        img.src = project.image[0];
        img.classList.toggle("project-image");

        img.alt = "project image";
        project_panel.append(img);
    } else if (project.videoLink) {
        let template = document.querySelector("#youtube-embedded-video");
        let video = template.content.cloneNode(true);

        video.querySelector("iframe").src = project.videoLink;
        video.querySelector("iframe").classList.toggle("project-video");

        project_panel.append(video);
    } else {
        let img = document.createElement("img");

        img.src = "/res/drawable/code.svg";
        img.classList.toggle("adaptive-icon-no-hover");
        img.classList.toggle("project-image");

        img.alt = "project image";
        project_panel.append(img);
    }

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
            let template = document.querySelector("#project-anchor-icon");
            let project = template.content.cloneNode(true);
            project.querySelector("a").href = project.projectLink;
    
            flexbox.append(project);
        }

        if (project.githubLink) {
            let template = document.querySelector("#github-anchor-icon");
            let github = template.content.cloneNode(true);
            github.querySelector("a").href = project.githubLink;
    
            flexbox.append(github);
        }
    
        if (project.downloadLink) {
            let template = document.querySelector("#download-anchor-icon");
            let download = template.content.cloneNode(true);
            download.querySelector("a").href = project.downloadLink;
    
            flexbox.append(download);
        }

        project_details.append(flexbox);
    }

    project_panel.append(project_details);

    return project_panel;
}