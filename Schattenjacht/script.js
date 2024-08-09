'use strict';

// GLOBALE VARIABELEN
let mapElement = document.getElementById("map");
let amountOfRows;
let amountOfColumns;
let enemyArray = []; // Zorg ervoor dat dit slechts één keer is gedeclareerd
let end = false;
let points = document.getElementById("points");
points.innerHTML = 0;
let numOfEnemies = 4; // Aantal vijanden

// Geluidseffecten
const treasureSound = new Audio('assets/treasure.wav');
const attackSound = new Audio('assets/damage.wav');

// Verkrijg elementen uit de DOM
let outputMap = document.getElementById("mapSizeCurrent");
let outputWalls = document.getElementById("wallsCurrent");
let outputTreasure = document.getElementById("treasuresCurrent");
let hearts = document.getElementById("hearts");

// Functie om vijand toe te voegen
function addEnemy() {
    let enemy = new Enemy(); // Zorg ervoor dat je de juiste constructor aanroept
    enemy.spawn();
    enemyArray.push(enemy);
}

// Functie om het spel te resetten
function resetGame() {
    clearInterval(startEnemy);
    mapElement.innerHTML = "";
    amountOfRows = mapSlider.value;
    amountOfColumns = mapSlider.value;
    
    game = new Map(amountOfRows, amountOfColumns);
    game.createMap();
    
    walls = new Walls(wallSlider.value);
    walls.randomizeWalls();
    
    treasures = new Treasure(treasureSlider.value);
    treasures.randomizeTreasure();
    
    player = new Player(livesSlider.value);
    player.start();
    
    enemyArray = [];
    for (let i = 0; i < numOfEnemies; i++) {
        addEnemy();
    }
    
    startEnemy = window.setInterval(function () {
        enemyArray.forEach(enemy => {
            enemy.move();
            if (enemy.target) {
                player.currentLives--;
                attackSound.play(); // Speel aanval geluid
                livesController();
                enemy.target = false;
            }
        });
    }, 400);
}

// Event listeners voor sliders
let mapSlider = document.getElementById("mapSize");
mapSlider.oninput = function () {
    outputMap.innerHTML = this.value;
    resetGame();
}

let wallSlider = document.getElementById("wallSlider");
wallSlider.oninput = function () {
    outputWalls.innerHTML = this.value;
    resetGame();
}

let treasureSlider = document.getElementById("treasureSlider");
treasureSlider.oninput = function () {
    outputTreasure.innerHTML = this.value;
    resetGame();
}

let livesSlider = document.getElementById("livesSlider");
livesSlider.addEventListener('input', function () {
    let lives = livesSlider.value;
    while (hearts.firstChild) {
        hearts.firstChild.remove();
    }

    for (let i = 0; i < lives; i++) {
        const newHeart = document.createElement("img");
        newHeart.src = "img/life.png";
        hearts.appendChild(newHeart);
    }
    resetGame();
}, false);

// Initialiseer het spel
resetGame();

// Start de interval om vijanden te bewegen
var startEnemy = window.setInterval(function () {
    enemyArray.forEach(enemy => {
        enemy.move();
        if (enemy.target) {
            player.currentLives--;
            attackSound.play(); // Speel aanval geluid
            livesController();
            enemy.target = false;
        }
    });
}, 400);

// Behandel spelersbeweging
window.addEventListener("keydown", function (event) {
    switch (event.code) {
        case "ArrowUp":
            player.move(1);
            break;
        case "ArrowRight":
            player.move(2);
            break;
        case "ArrowDown":
            player.move(3);
            break;
        case "ArrowLeft":
            player.move(4);
            break;
        default:
            break;
    }

    if (player.target) {
        player.target = false;
        // Speel schat geluid als een schat is verzameld
        treasureSound.play();
        statsController();
    }
});

// Functie om levens te controleren
function livesController() {
    if (player.currentLives < player.lives) {
        alert("Je bent dood. Je hebt nog " + player.currentLives + " leven(s).");
        let newLives = player.currentLives;
        let currentStats = player.stats;
        player.start();
        player.lives = newLives;
        player.stats = currentStats;
    }

    if (player.lives === 0) {
        clearInterval(startEnemy);
        if (confirm("Je levens zijn op! Behaalde score: " + player.stats)) {
            window.location.reload();
        }
    }
}

// Functie om de statistieken te controleren
function statsController() {
    if (player.stats == treasureSlider.value) {
        clearInterval(startEnemy);
        if (confirm("Proficiat, ridder! Je hebt alle schatten gevonden! Opnieuw?")) {
            window.location.reload();
        }
    }
}
