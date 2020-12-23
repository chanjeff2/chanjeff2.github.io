"use strict";

class Project {
    constructor(name, description, language, platform) {
        this.name = name;
        this.description = description;
        this.language = language;
        this.platform = platform;
    };
};

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
    console.log(platform);

    let newProject = new Project(name, description, language, platform);
    let json_string = JSON.stringify(newProject);

    generateProjectPanel(json_string);
}

function generateProjectPanel(proj_json_string) {
    let project = JSON.parse(proj_json_string);

    let preview_section = document.querySelector("#new-project-preview-panel");

    let project_panel = document.createElement("div");
    project_panel.classList.toggle("project-panel");

    let img = document.createElement("img");
    img.src = "/res/drawable/code.svg";
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