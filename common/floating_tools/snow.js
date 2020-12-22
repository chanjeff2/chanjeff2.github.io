"use strict";


let snow = document.createElement("div");
snow.id = "snow";
snow.style.display = "block";
document.body.append(snow);

var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
script.onload = function(){
    particlesJS("snow", {
        "particles": {
            "number": {
                "value": 200,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "opacity": {
                "value": 0.7,
                "random": false,
                "anim": {
                    "enable": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false
                }
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "enable": true,
                "speed": 5,
                "direction": "bottom",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 300,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "events": {
                "onhover": {
                    "enable": false
                },
                "onclick": {
                    "enable": false
                },
                "resize": false
            }
        },
        "retina_detect": true
    });
}
document.head.append(script);

function toggleSnowEffect() {
    let snow = document.querySelector("#snow");
    if (snow.style.display == "block") {
        snow.style.display = "none";
    } else {
        snow.style.display = "block"
    }
}