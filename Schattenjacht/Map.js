class Map {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
    }

    createMap() {
        amountOfRows = this.rows;
        amountOfColumns = this.columns;
        
        console.log("Creating map with rows:", amountOfRows, "and columns:", amountOfColumns);

        for (let i = 0; i < amountOfRows; i++) {
            let tr = map.insertRow();
            console.log("Inserted row:", i);

            for (let j = 0; j < amountOfColumns; j++) {
                tr.insertCell();
                console.log("Inserted cell at row:", i, "column:", j);
            }
        }

        console.log("Map creation complete.");
    }
}
