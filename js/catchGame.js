Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

  let promos2 = ["ПЛЕСК01", "ОТДЫХ77Й", "ТРУБЫ99", "МОЗГЧИСТ", "20ЧИСТО", "ВЕСНА24", "МОЛОДЕЦ001"];

let canvas_c = document.getElementById("canvas_c");
var context_c = canvas_c.getContext("2d");

let cover = document.getElementById("cover-catch");

canvas_c.width = window.innerWidth;
canvas_c.height = window.innerHeight;

var canvasBack = document.getElementById("canvas_back");
var contextBack = canvasBack.getContext("2d");



canvasBack.width = window.innerWidth;
canvasBack.height = window.innerHeight;

var player;
var shapes = [];
var numberOfShapes = 10;
var smashCounter = 0;
var timer;

function addScoreCatch(score) {
    let scoreCatch = document.getElementById("score-catch");

    let scoreSplitted = scoreCatch.innerHTML.split(" ");

    let newScore = parseInt(scoreSplitted[1]) + score;

    scoreCatch.innerHTML = scoreSplitted[0] + " " + newScore;
}

function Player() {
    this.gameOver = false;
    this.score = 0;
    this.shapesCollected = 0;
    this.shapesMissed = 0;
    this.playerWidth = 257;
    this.playerHeight = 130;
    this.playerSpeed = 20;
    this.x = canvas_c.width / 3;
    this.y = canvas_c.height - this.playerHeight;
    this.playerImage = new Image();
    this.playerImage.src = './assets/player.svg';

    this.render = function() {
        context_c.drawImage(this.playerImage, this.x, this.y, this.playerImage.width/1.5, this.playerImage.height/1.5);
    }

    //Moves the player left
    this.moveLeft = function() {
        if (this.x > 0) {
            this.x -= this.playerSpeed;
        }
    }

    //Moves the player right
    this.moveRight = function() {
        if (this.x < canvas_c.width - this.playerWidth) {
            this.x += this.playerSpeed;
        }
    }
}

function Shape()
{
    this.shapeNumber = Math.floor(Math.random() * 3);
    this.shapeType = "";
    this.shapeScore = 0;
    this.shapeWidth = 60;
    this.shapeHeight = 60;
    this.shapeImage = new Image();
    this.shapeSpeed = Math.floor(Math.random() * 3 + 1);
    this.x = Math.random() * (canvas_c.width - this.shapeWidth);
    this.y = Math.random() * -canvas_c.height - this.shapeHeight;
    
    //Creates a different kind of shape depending on the shape number
    //which is generated randomly
    this.chooseShape = function()
    {
        if(this.shapeNumber == 0)
        {
            this.shapeType = "circle";
            this.shapeScore = 5 * this.shapeSpeed;
            this.shapeImage.src = './assets/shapes/circle.svg';
        }
        else if(this.shapeNumber == 1)
        {
            this.shapeType = "square";
            this.shapeScore = 10 * this.shapeSpeed;
            this.shapeImage.src = './assets/shapes/square.svg';
        }
        else if(this.shapeNumber == 2)
        {
            this.shapeType = "triangle";
            this.shapeScore = 15 * this.shapeSpeed;
            this.shapeImage.src = './assets/shapes/triangle.svg';
        }
    }
    
    this.fall = function()
    {
        if(this.y < canvas_c.height - this.shapeHeight)
        {
            this.y += this.shapeSpeed;
        }
        else
        {
            this.changeState();
            this.chooseShape();
        }
        this.checkIfCaught();
    }
    
    this.checkIfCaught = function()
    {
        if(this.y >= player.y)
        {
            if((this.x > player.x && this.x < (player.x + player.playerWidth)) ||
              (this.x + this.shapeWidth > player.x && this.x + this.shapeWidth < (player.x + player.playerWidth)))
            {
                if(document.querySelector("#catch-window").style.dispay == "none") return;
                
                player.score += 1;
                player.shapesCollected += 1;
                addScoreCatch(1);
                console.log(player.score);

                if(player.score % 5 == 0) {
                    
                    document.querySelectorAll(".promo_show")[1].textContent = "Вы выиграли промокод: " + promos2.random();
                    document.querySelector("#popup2").classList.add("show");
                }

                contextBack.font = "50px TTCommons-Regular";
                contextBack.fillText("+1", player.x, player.y);

                this.changeState();
                this.chooseShape();
                setTimeout(() => {
                    contextBack.clearRect(0, 0, canvasBack.width, canvasBack.height);
                }, 1000);
            }
        }
    }
    
    this.changeState = function()
    {
        this.shapeNumber = Math.floor(Math.random() * 5);
        this.shapeSpeed = Math.floor(Math.random() * 3 + 1);
        this.x = Math.random() * (canvas_c.width - this.shapeWidth);
        this.y = Math.random() * -canvas_c.height - this.shapeHeight;
    }
    
    //Draws the shape.
    this.render = function()
    {
        context_c.drawImage(this.shapeImage, this.x, this.y);
    }
}

window.addEventListener("keydown", function(e)
{
     e.preventDefault();
    if(e.keyCode == 37)
    {
        player.moveLeft();
    }
    else if(e.keyCode == 39)
    {
        player.moveRight();
    }
 });

 document.addEventListener('touchmove', handleMouseEvent);

function handleMouseEvent(e) {
    var touch = e.touches[0];
    if(touch.clientX > canvas_c.width/2) {
        player.moveRight();
    } else {
        player.moveLeft();
    }
}

function main() {
    player = new Player();

    shapes = [];

    for(var i = 0; i < numberOfShapes; i++)
    {
        var shape = new Shape();
        shape.chooseShape();
        shapes.push(shape);
    }

    startGame();
}

function startGame() {
    updateGame();
    window.requestAnimationFrame(drawGame);
}

function updateGame()
{
    for(var j = 0; j < shapes.length; j++)
    {
        shapes[j].fall();
    }
    timer = window.setTimeout(updateGame, 30);
}

function drawGame() {
    if (player.gameOver == false) {
        context_c.clearRect(0, 0, canvas_c.width, canvas_c.height);

        player.render();

        for(var j = 0; j < shapes.length; j++)
        {
            shapes[j].render();
        }
    } else {
        context_c.clearRect(0, 0, canvas_c.width, canvas_c.height);

    }
    window.requestAnimationFrame(drawGame);
}

main();