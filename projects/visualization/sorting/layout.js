"use strict";

function mapToDomain(indicator) {
    switch (indicator) {
        case -1:
            // negative
            return value => -(value + 1);
        case 0:
            // both positive + negative
            return value => value - parseInt(sampleSizeDropDown.value) / 2;
        case 1:
            // positive
            return value => ++value;
    }
}

let dataSet = [...Array(100).keys()].map(x => mapToDomain(1)(x));
shuffleArray(dataSet);

let ctx = document.querySelector("#main-canvas").getContext("2d");
let color = getComputedStyle(document.documentElement).getPropertyValue('--PRIMARY-COLOR');
let hoverColor = getComputedStyle(document.documentElement).getPropertyValue('--LIGHT-PRIMARY-COLOR');

let chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: dataSet,
        datasets: [{
            backgroundColor: Array(dataSet.length).fill(color),
            hoverBackgroundColor: hoverColor,
            data: dataSet
        }]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },
        layout: {
            padding: {
                left: 50,
                right: 50,
                top: 20,
                bottom: 20
            }
        },
        responsive: true,
        maintainAspectRatio: false
    }
})

let sortingManager = new SelectionSort(dataSet);;
let inversionManger = new MergeSort([...dataSet]);
let inversionNumberPlaceholder = document.querySelector("#inversion-number");
inversionManger.getInversionNumber().then( inversionNumber => {
    inversionNumberPlaceholder.innerHTML = "inversion number: " + inversionNumber;
})
let resumeEventHandler = null;
let cancelEventHandler = null;

function toggleStart(start) {
    if (start) {
        pauseBtn.style.display = "block";
        startBtn.style.display = "none";
    } else {
        pauseBtn.style.display = "none";
        startBtn.style.display = "block";
    }
}

function refresh() {
    sortingManager.cancel = true;
    sortingManager.pause = false;
    toggleStart(false);

    shuffleArray(dataSet);

    sortingManager.updateDataset(dataSet);

    let inversionManger = new MergeSort([...dataSet]);
    inversionManger.getInversionNumber().then( inversionNumber => {
        inversionNumberPlaceholder.innerHTML = "inversion number: " + inversionNumber;
    })

    chart.data.datasets[0].data = dataSet;
    chart.data.datasets[0].backgroundColor = Array(chart.data.datasets[0].data.length).fill(color);
    chart.update();
}

document.querySelector("#refresh").addEventListener("click", () => {
    refresh();
})

let pauseBtn = document.querySelector("#pause");

pauseBtn.addEventListener("click", () => {
    sortingManager.pause = true;
    toggleStart(false);
});

function updateDataset() {
    dataSet = [...Array(parseInt(sampleSizeDropDown.value)).keys()].map(x => mapToDomain(parseInt(sampleDomainDropDown.value))(x));

    chart.data.labels = dataSet;
    chart.data.datasets[0].backgroundColor = Array(parseInt(sampleSizeDropDown.value)).fill(color);
}

let sampleSizeDropDown = document.querySelector("#sample-size");

sampleSizeDropDown.addEventListener("change", () => {
    updateDataset();
    refresh();
})

let sampleDomainDropDown = document.querySelector("#sample-domain");

sampleDomainDropDown.addEventListener("change", () => {
    updateDataset();
    refresh();
})

let sortMethodDropDown = document.querySelector("#sort-method");

sortMethodDropDown.addEventListener("change", () => {
    // cancel old sorting method
    sortingManager.cancel = true;

    sortingManager = new window[sortMethodDropDown.value](dataSet);
    refresh();
})

let startBtn = document.querySelector("#start")
let intervalDropDown = document.querySelector("#interval");

startBtn.addEventListener("click", () => {
    sortingManager.cancel = false;
    toggleStart(true);

    if (sortingManager.pause) {
        sortingManager.pause = false;
        return;
    }

    console.log("attempt to sort " + sampleSizeDropDown.value + " data by " + sortMethodDropDown.value);

    sortingManager.sort(async (dataset, current, target) => {
        chart.data.datasets[0].data = dataset;

        chart.data.datasets[0].backgroundColor = Array(chart.data.datasets[0].data.length).fill(color);
        if (target != -1) {
            chart.data.datasets[0].backgroundColor[target] = "#FFCDD2"; // pale pink
        }
        if (current != -1) {
            chart.data.datasets[0].backgroundColor[current] = "#FF4081"; // red
        }

        chart.update({
            duration: 0
        })

        await new Promise(resolve => setTimeout(resolve, intervalDropDown.value));
    });
})

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}