function showIntro() {
    let intro = document.getElementById("intro");

    intro.style.animation = "disappear 4s ease-in-out forwards";
    setTimeout(() => {
        intro.style.display = "none";
    }, 4000);
}

function hide(id) {
    document.getElementById("main-frame").style.display = "none";

    windowActive = document.getElementById(id);
    windowActive.style.display = "block";
}

setTimeout(() => {
    showIntro();
}, 100);

var windowActive;
let bumpMg = document.getElementById("bump");

bumpMg.addEventListener("click", function(e) {
    hide("bump-window");
});

let catchMg = document.getElementById("catch");

catchMg.addEventListener("click", function(e) {
    hide("catch-window")
});

let clearMg = document.getElementById("clear");

clearMg.addEventListener("click", function(e) {
    hide("clear-window");
});

let close = document.querySelectorAll(".exit-btn");
let main_frame = document.getElementById("main-frame");

close.forEach(element => {
    element.addEventListener("click", function(e) {
        if(main_frame.style.display == "none") {
            main_frame.style.display = "block";
            windowActive.style.display = "none";
        }
    });
});

document.querySelectorAll(".closePopup").forEach(element => {
    element.addEventListener("click", function(e) {
        document.querySelector("#popup1").classList.remove("show");
        document.querySelector("#popup2").classList.remove("show");
    });
});