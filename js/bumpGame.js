let promos1 = ["ПЛЕСК01", "ОТДЫХ77Й", "ТРУБЫ99", "МОЗГЧИСТ", "20ЧИСТО", "ВЕСНА24", "МОЛОДЕЦ001"];

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }

for (let i = 0; i < 7; i++) {
    let circleCopy = document.querySelector(".circles-mg").cloneNode(true);
    document.querySelector(".circles-items").appendChild(circleCopy);
}

const circles = document.querySelectorAll('.circle-mg');

let popped = [];

function addScoreBump(score) {
    let scoreBump = document.getElementById("score-bump");
    let scoreSplitted = scoreBump.innerHTML.split(" ");
    let newScore = parseInt(scoreSplitted[1]) + score;

    scoreBump.innerHTML = scoreSplitted[0] + " " + newScore;
}

circles.forEach(element => {
    element.addEventListener("click", function(e) {
        addScoreBump(1);
        popped.push([element, element.parentElement]);
        element.remove();
        if(popped.length == 5) {
            popped.forEach(circ => circ[1].appendChild(circ[0]));
            popped = [];
            document.querySelector(".promo_show").textContent = "Вы выиграли промокод: " + promos1.random();
            document.querySelector("#popup1").classList.add("show");
        }
    })
});