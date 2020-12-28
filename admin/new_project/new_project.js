"use strict";

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
                        $(".project-edit-form").trigger("input");
                    })
                    $(".upload-preivew-box").append(img);
                    $(".project-edit-form").trigger("input");

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
    let project = generateProject();

    let project_panel = generateProjectPanel(project);

    let preview_section = document.querySelector("#new-project-preview-panel");
    preview_section.innerHTML = "";
    preview_section.append(project_panel);
}

function generateProject() {
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

    return newProject;
}

async function saveProject() {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    let storage = firebase.storage();
    let storageRef = storage.ref();
    // Cloud Firestore
    let db = firebase.firestore();

    console.log("save project");
    let project = generateProject();

    let projectID = project.name.replace(/\s+/g, '-').replace(/\//g, '-').replace(/\+/g, 'p');

    let project_dir_ref = storageRef.child("projects/" + projectID);

    let counter = 0;
    
    let img_downloadUrl = [];

    let base64_regex = /^data:/;

    project.image.forEach(src => {
        let fileName = projectID + '_' + counter;
        ++counter;

        if (src.match(base64_regex) == null) {
            img_downloadUrl.push(src);
            return;
        }

        let imageRef = project_dir_ref.child(fileName);

        let getUrl = async () => {
            let snapshot = await imageRef.putString(src, "data_url");
            let url = await snapshot.ref.getDownloadURL();
            return url;
        }

        img_downloadUrl.push(getUrl());
    })

    project.image = await Promise.all(img_downloadUrl);

    project = JSON.parse(JSON.stringify(project));

    db.collection("projects").doc(projectID).set(project)
    .then(function() {
        console.log("Document successfully written!");
        location.reload();
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

function newProject(toolbtn) {
    let editWrapper = toolbtn.parentNode
    let projectPanel = editWrapper.querySelector(".project-panel");
    let oldProjectEditor = document.querySelector("#project-editor");

    if (oldProjectEditor) {
        let oldProjectPanel = oldProjectEditor.parentNode.querySelector(".project-panel");
        oldProjectPanel.style.display = "";

        let oldtoolbar = oldProjectEditor.parentNode.querySelector(".edit-toolbar");
        oldtoolbar?.querySelector(".remove-button").classList.toggle("display");

        oldProjectEditor.remove();
    }

    let template_projectEditor = document.querySelector("#template-project-editor");
    let projectEditor = template_projectEditor.content.cloneNode(true).querySelector("#project-editor");

    editWrapper.append(projectEditor);
    projectPanel.style.display = "none";

    attachDragDropHandler();

    onInput();
}

async function startEditProject(toolbtn) {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    let storage = firebase.storage();
    let storageRef = storage.ref();
    // Cloud Firestore
    let db = firebase.firestore();

    let editWrapper = toolbtn.parentNode.parentNode
    let removeBtn = toolbtn.parentNode.querySelector(".remove-button");
    removeBtn.classList.toggle("display");
    let projectPanel = editWrapper.querySelector(".project-panel");
    let oldProjectEditor = document.querySelector("#project-editor");
    if (oldProjectEditor) {
        let oldProjectPanel = oldProjectEditor.parentNode.querySelector(".project-panel");

        oldProjectPanel.style.display = "";

        let oldtoolbar = oldProjectEditor.parentNode.querySelector(".edit-toolbar");
        oldtoolbar?.querySelector(".remove-button").classList.toggle("display");

        oldProjectEditor.remove();
    }


    let template_projectEditor = document.querySelector("#template-project-editor");
    let projectEditor = template_projectEditor.content.cloneNode(true).querySelector("#project-editor");

    editWrapper.append(projectEditor);
    projectPanel.style.display = "none";

    let projectName = projectPanel.querySelector(".project-name").innerHTML;
    let projectID = projectName.replace(/\s+/g, '-').replace(/\//g, '-').replace(/\+/g, 'p');

    let response = await db.collection("projects").doc(projectID).get();

    let project = response.data();

    projectEditor.querySelector("#project-name").value = project.name;
    let description = projectEditor.querySelector("#project-description")
    description.value = project.description;
    testAreaResize(description);

    let languageCheckbox = projectEditor.querySelector("#project-language");
    project.language.forEach(language => {
        let id = language.replace(/\s+/g, '-').replace(/\//g, '-').replace(/\+/g, 'p');
        languageCheckbox.querySelector("#" + id).checked = true;
    })

    let platformCheckbox = projectEditor.querySelector("#project-platform");
    project.platform.forEach(platform => {
        let id = platform.replace(/\s+/g, '-').replace(/\//g, '-').replace(/\+/g, 'p');
        platformCheckbox.querySelector("#" + id).checked = true;
    })

    project.image.forEach( src => {
        let img = document.createElement("img");
        img.src = src;
        img.addEventListener("click", () => {
            img.remove();
            $(".project-edit-form").trigger("input");
        })
        $(".upload-preivew-box").append(img);
        $(".project-edit-form").trigger("input");
    });

    projectEditor.querySelector("#project-video-link").value = project.videoLink;
    projectEditor.querySelector("#project-link").value = project.projectLink;
    projectEditor.querySelector("#project-github-link").value = project.githubLink;
    projectEditor.querySelector("#project-download-link").value = project.downloadLink;

    attachDragDropHandler();

    onInput();
}

async function removeProject(toolbtn) {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    let storage = firebase.storage();
    let storageRef = storage.ref();
    // Cloud Firestore
    let db = firebase.firestore();

    let editWrapper = toolbtn.parentNode.parentNode
    let projectPanel = editWrapper.querySelector(".project-panel");

    let projectName = projectPanel.querySelector(".project-name").innerHTML;
    let projectID = projectName.replace(/\s+/g, '-').replace(/\//g, '-').replace(/\+/g, 'p');

    let response = await db.collection("projects").doc(projectID).get();

    let project = response.data();

    project.image.forEach( src => {
        let ref = storage.refFromURL(src);
        ref.delete();
    })

    db.collection("projects").doc(projectID).delete();

    editWrapper.remove();
}