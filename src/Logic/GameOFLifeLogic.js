//importing lodash for deepcloning
var _ = require('lodash');
//first input case
// let currentGeneration=[[1,1],[1,1]];
//second input case
// let currentGeneration=[[1,1,0],[1,0,1],[0,1,0]];
//third input case
// let currentGeneration=[[0,1,0],[0,1,0],[0,1,0]];
//fourth input case



// const rowMaxIndex=currentGeneration.length;
// const colMaxIndex=currentGeneration[0].length;


export const getNextGeneration = (currentGeneration, rowMaxIndex, colMaxIndex) => {
    console.log("*********************Input Pattern *****************");
    // console.log();
    printPattern(currentGeneration, rowMaxIndex, colMaxIndex);

    let nextGeneration = _.cloneDeep(currentGeneration);
    for (let row = 0; row < rowMaxIndex; row++) {
        for (let col = 0; col < colMaxIndex; col++) {
            const liveCount = getNeighbourLiveCount(currentGeneration, row, col, rowMaxIndex, colMaxIndex);
            let liveValue = getLifeValue(liveCount, currentGeneration[row][col])
            nextGeneration[row][col] = liveValue;
            // console.log("[Life value]",liveValue,"row",row,col);
        }
    }
    // console.log(nextGeneration);
    console.log("*********************Output Pattern *****************");
    printPattern(nextGeneration, rowMaxIndex, colMaxIndex);
    return nextGeneration;

}

const getNeighbourLiveCount = (generation, rowIndex, columnIndex, rowMaxIndex, colMaxIndex) => {
    // console.log(generation);
    let liveCount = 0;
    const rowNeighborStartingIndex = rowIndex - 1;
    const colNeighborStartingIndex = columnIndex - 1;
    for (let row = rowNeighborStartingIndex; row <= rowNeighborStartingIndex + 2; row++) {
        for (let col = colNeighborStartingIndex; col <= colNeighborStartingIndex + 2; col++) {
            if (row >= 0 && row < rowMaxIndex && col >= 0 && col < colMaxIndex) {
                if (!(row === rowIndex && col === columnIndex)) {
                    liveCount += generation[row][col];
                }
            }
        }
    }
    // console.log(liveCount," row",rowIndex,columnIndex);
    return liveCount;
}
const getLifeValue = (liveCount, liveValue) => {
    if (liveCount < 2 || liveCount > 3) {
        return false;
    } else if (liveCount === 3 && liveValue ===false) {
        return true;
    } else if (liveCount ===2 || liveCount === 3) {
        return liveValue
    }

}
const printPattern = (generationMatrix, rowMaxIndex, colMaxIndex) => {
    for (let row = 0; row < rowMaxIndex; row++) {
        let outputPattern = "";
        for (let col = 0; col < colMaxIndex; col++) {
            if (generationMatrix[row][col] === false) {
                outputPattern = outputPattern + " - "
            } if (generationMatrix[row][col] === true) {
                outputPattern = outputPattern + " X "
            }
        }
        console.log(outputPattern);
    }
}

// let nextGen=getNextGeneration(currentGeneration);
