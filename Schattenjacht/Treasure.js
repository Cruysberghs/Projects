/* ++++++++++++++++++ SCHATTEN ++++++++++++++++++ */

class Treasure {
    constructor(amount) {
        this.amount = amount;
    }

    randomizeTreasure() {
        let amount = this.amount;
        let counter = 0;

        while (counter != amount) {
            let randomRow = Math.floor(Math.random() * (amountOfRows));
            let randomColumn = Math.floor(Math.random() * (amountOfColumns));
            let cel = map.rows[randomRow].cells[randomColumn];

            if (!cel.classList.contains("wall") && !cel.classList.contains("treasure")) {
                cel.setAttribute("class", "treasure");
                counter++;
            }
        }
    }
}

