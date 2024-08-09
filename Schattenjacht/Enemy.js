class Enemy {
    constructor(id) {
        this.id = id; // Unieke id voor elke vijand
        this.currentRow = null;
        this.currentColumn = null;
        this.position = null;
        this.target = false;
    }

    spawn() {
        let startCheck = false;

        while (!startCheck) {
            let randomRow = Math.floor(Math.random() * (amountOfRows));
            let randomColumn = Math.floor(Math.random() * (amountOfColumns));
            let cel = mapElement.rows[randomRow].cells[randomColumn];

            if (!cel.classList.contains("wall") && !cel.classList.contains("treasure") && !cel.classList.contains("enemy")) {
                cel.setAttribute("class", "enemy");
                this.currentRow = randomRow;
                this.currentColumn = randomColumn;
                this.position = cel;
                startCheck = true;
            }
        }
    }

    move() {
        let newPos;
        let direction = Math.floor(Math.random() * 4) + 1;

        switch (direction) {
            case 1:
                if (this.currentRow > 0) {
                    this.currentRow--;
                    newPos = mapElement.rows[this.currentRow].cells[this.currentColumn];
                } else {
                    newPos = this.position;
                }
                break;
            case 2:
                if (this.currentColumn < amountOfColumns - 1) {
                    this.currentColumn++;
                    newPos = mapElement.rows[this.currentRow].cells[this.currentColumn];
                } else {
                    newPos = this.position;
                }
                break;
            case 3:
                if (this.currentRow < amountOfRows - 1) {
                    this.currentRow++;
                    newPos = mapElement.rows[this.currentRow].cells[this.currentColumn];
                } else {
                    newPos = this.position;
                }
                break;
            case 4:
                if (this.currentColumn > 0) {
                    this.currentColumn--;
                    newPos = mapElement.rows[this.currentRow].cells[this.currentColumn];
                } else {
                    newPos = this.position;
                }
                break;
            default:
                newPos = this.position;
                break;
        }

        if (newPos.classList.contains("wall") || newPos.classList.contains("treasure")) {
            // Verander de richting indien nodig
            this.currentRow = this.position.dataset.row;
            this.currentColumn = this.position.dataset.column;
        }

        if (newPos.classList.contains("player")) {
            this.target = true;
        }

        this.position.removeAttribute("class");
        this.position = newPos;
        newPos.setAttribute("class", "enemy");
    }
}
