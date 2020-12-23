"use strict";

class Project {
    constructor(name, description, language, platform, image) {
        this.name = name;
        this.description = description;
        this.language = language;
        this.platform = platform;
        this.image = image;
    };
};

function onUploadFile(input) {
    console.log(input.files);
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            let img = document.createElement("img");
            img.src = e.target.result;
            img.addEventListener("click", () => {
                img.remove();
                $(".new-project-form").trigger("input");
            })
            $(".upload-preivew-box").append(img);
            $(".new-project-form").trigger("input");
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function onInput() {
    let name = document.querySelector("#project-name").value;
    let description = document.querySelector("#project-description").value;
    let languageNodes = document.querySelector("#project-language").querySelectorAll("input[type=checkbox]:checked + .input-hint");
    let language = [];
    languageNodes.forEach( node => {
        language.push(node.innerHTML);
    });
    console.log(language);
    let platformNodes = document.querySelector("#project-platform").querySelectorAll("input[type=checkbox]:checked + .input-hint");
    let platform = [];
    platformNodes.forEach( node => {
        platform.push(node.innerHTML);
    });

    let imageNodes = document.querySelector(".upload-preivew-box").querySelectorAll("img");
    let image = [];
    imageNodes.forEach( node => {
        console.log(node);
        image.push(node.src);
    })

    let newProject = new Project(name, description, language, platform, image);
    let json_string = JSON.stringify(newProject);

    generateProjectPanel(json_string);
}

function generateProjectPanel(proj_json_string) {
    let project = JSON.parse(proj_json_string);

    let preview_section = document.querySelector("#new-project-preview-panel");

    let project_panel = document.createElement("div");
    project_panel.classList.toggle("project-panel");

    let img = document.createElement("img");
    console.log(project.image);
    img.src = project.image.length > 0 ? project.image[0] : "/res/drawable/code.svg";
    img.alt = "project image";

    project_panel.append(img);

    let project_details = document.createElement("div");
    project_details.classList.toggle("project-details");

    let name = document.createElement("h2");
    name.innerHTML = project.name ? project.name : "[name]";

    project_details.append(name);

    let description = document.createElement("p");
    description.innerHTML = project.description ? project.description : "[description]";

    project_details.append(description);

    let language = document.createElement("p");
    language.innerHTML = project.language.length > 0 ? project.language.join(", ") : "[language]";

    project_details.append(language);

    let platform = document.createElement("p");
    platform.innerHTML = project.platform.length > 0 ? project.platform.join(", ") : "Unspecified";

    project_details.append(platform);

    project_panel.append(project_details);

    preview_section.innerHTML = "";
    preview_section.append(project_panel);
}