/* ++++++++++++++++++ SPELER ++++++++++++++++++ */

class Player {
    currentRow;
    currentColumn;
    position;
    stats;
    lives;
    currentLives;
    target = false;
    difficultyLevel = 1; // Voeg een moeilijkheidsniveau toe

    constructor(lives) {
        this.lives = lives;
    }

    get lives() {
        return this.lives;
    }

    get currentLives() {
        return this.lives;
    }

    get stats() {
        return this.stats;
    }

    get target() {
        return this.target;
    }

    set lives(currentLives) {
        this.lives = currentLives;
    }

    set stats(stats) {
        this.stats = stats;
    }

    start() {
        let startCheck = false;
        this.stats = 0;
        this.currentLives = this.lives;

        while (!startCheck) {
            let randomRow = Math.floor(Math.random() * (amountOfRows));
            let randomColumn = Math.floor(Math.random() * (amountOfColumns));
            let cel = map.rows[randomRow].cells[randomColumn];

            if (!cel.classList.contains("wall") && !cel.classList.contains("treasure")) {
                cel.setAttribute("class", "player");
                this.currentRow = randomRow;
                this.currentColumn = randomColumn;
                this.position = cel;
                startCheck = true;
            }
        }
    }

    move(direction, currentLives) {
        let newPos;
        switch (direction) {
            case 1:
                //Arrow Up
                if (this.currentRow > 0) {
                    this.currentRow--;
                    newPos = map.rows[(this.currentRow)].cells[this.currentColumn];
                } else {
                    newPos = this.position;
                }

                if (newPos.classList.contains("wall")) {
                    this.currentRow++;
                    newPos = this.position;
                }

                break;

            case 2:
                //Arrow Right
                if (this.currentColumn < amountOfColumns - 1) {
                    this.currentColumn++;
                    newPos = map.rows[(this.currentRow)].cells[this.currentColumn];
                } else {
                    newPos = this.position;
                }

                if (newPos.classList.contains("wall")) {
                    this.currentColumn--;
                    newPos = this.position;
                }

                break;

            case 3:
                //Arrow down
                if (this.currentRow < amountOfRows - 1) {
                    this.currentRow++;
                    newPos = map.rows[(this.currentRow)].cells[this.currentColumn];
                } else {
                    newPos = this.position;
                }
                if (newPos.classList.contains("wall")) {
                    this.currentRow--;
                    newPos = this.position;
                }

                break;

            case 4:
                //Arrow Left
                if (this.currentColumn > 0) {
                    this.currentColumn--;
                    newPos = map.rows[(this.currentRow)].cells[this.currentColumn];
                } else {
                    newPos = this.position;
                }

                if (newPos.classList.contains("wall")) {
                    this.currentColumn++;
                    newPos = this.position;
                }

                break;

            default:
                break;
        }

        /* ++++++++++++++++++ CHECK OF SPELER GEVANGEN IS ++++++++++++++++++ */

        if (newPos.classList.contains("enemy")) {
            currentLives--;
            this.currentLives = currentLives;
            this.target = true;
        }

        /* ++++++++++++++++++ CHECK OF SPELER EEN SCHAT HEEFT GEVONDEN ++++++++++++++++++ */

        if (newPos.classList.contains("treasure")) {
            this.stats++;
            this.difficultyLevel++; // Verhoog het moeilijkheidsniveau
            points.innerHTML = this.stats;
        }

        /* ++++++++++++++++++ NIEUWE POSITIE TOEWIJZEN ++++++++++++++++++ */

        this.position.removeAttribute("class", "player");
        this.position = newPos;
        newPos.setAttribute("class", "player");
    }
}

/* ++++++++++++++++++ VIJAND ++++++++++++++++++ */

class Enemy {
    currentRow;
    currentColumn;
    position;
    difficultyLevel = 1; // Voeg een moeilijkheidsniveau toe

    spawn(difficultyLevel) {
        this.difficultyLevel = difficultyLevel; // Stel het moeilijkheidsniveau in
        // Logica voor het spawnen van de vijand
    }

    moveTowardsPlayer(playerRow, playerColumn) {
        // Pas het vijand gedrag aan op basis van het moeilijkheidsniveau
        // Bijvoorbeeld, beweeg sneller of beter richting de speler
    }
}

// Voorbeeld van het spawnen van een vijand met een toenemend moeilijkheidsniveau
let player = new Player(3); // Voorbeeld speler met 3 levens
let enemyArray = [];

