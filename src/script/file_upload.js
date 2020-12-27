"use strict";

function attachDragDropHandler() {
    let droppedFiles = false;

    $(".upload-box").on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
    })

    .on('dragover dragenter', function() {
        $(".upload-box").addClass('is-dragover');
        $(".upload-message").html("Drop Here!");
    })

    .on('dragleave dragend drop', function() {
        $(".upload-box").removeClass('is-dragover');
        $(".upload-message").html("Choose a file or drag it here");
    })

    .on('drop', function(e) {
        droppedFiles = e.originalEvent.dataTransfer.files;
        let input = document.querySelector(".upload-input");
        
        input.files = droppedFiles;
        $(".upload-input").trigger("change");
    });

}