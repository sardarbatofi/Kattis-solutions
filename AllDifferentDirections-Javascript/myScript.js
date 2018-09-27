const results = [];

const directionsSets = [];

init();



function init() {
  let line = readline();
  let index = -1;
  while (line !== '0') {
    if (line.length > 2) {
      let initialX = Number(splitWithTail(line, ' ', 1)[0]);
      let initialY = Number(splitWithTail(line, ' ', 2)[1]);
      let directions = splitWithTail(line, ' ', 2)[2];
      
      if (!directionsSets[index]) {
        directionsSets[index] = [];
      }
      directionsSets[index].push(getNewPosition(initialX, initialY, directions));
    } else {
      index += 1;
    }
    
    line = readline();
  }
  
  computeResults();
}


 

function computeResults() {
  directionsSets.forEach((value, setIndex) => {
    let totalX = 0;
    let totalY = 0;
    
    directionsSets[setIndex].forEach((value, directionIndex) => {
      totalX += directionsSets[setIndex][directionIndex].x;
      totalY += directionsSets[setIndex][directionIndex].y;
    });
    
    let averageSetX = totalX / directionsSets[setIndex].length;
    let averageSetY = totalY / directionsSets[setIndex].length;
    let distanceFromAverageToWorstDirection = 0;
    
    directionsSets[setIndex].forEach((value, directionIndex) => {
      let directionX = directionsSets[setIndex][directionIndex].x;
      let directionY = directionsSets[setIndex][directionIndex].y;
      
      let distanceFromAverageToCrtDirection = Math.sqrt(
        Math.pow(directionX - averageSetX, 2) + Math.pow(directionY - averageSetY, 2)
      );
      
      if (distanceFromAverageToCrtDirection > distanceFromAverageToWorstDirection) {
        distanceFromAverageToWorstDirection = distanceFromAverageToCrtDirection;
      }
      
      totalX += directionsSets[setIndex][directionIndex].x;
      totalY += directionsSets[setIndex][directionIndex].y;
    });
    
    results.push([
      Number(averageSetX.toFixed(5)),
      Number(averageSetY.toFixed(5)),
      Number(distanceFromAverageToWorstDirection.toFixed(5))
    ]);
  });
}


function getNewPosition(initialX, initialY, directions) {
  let directionsArr = directions.split(' ');
  let finalX = initialX;
  let finalY = initialY;
  let crtDegrees = 0;
  
  directionsArr.forEach((value, directionIndex) => {
    if (parseInt(directionIndex, 10) % 2 === 0) {
      switch (value) {
        case 'start':
        case 'turn':
          let degrees = Number(directionsArr[directionIndex + 1]);
          crtDegrees += degrees;
          break;
        case 'walk':
          let units = Number(directionsArr[directionIndex + 1]);
          let newPosition = walk(units, crtDegrees);
          
          finalX += newPosition.xOffset;
          finalY += newPosition.yOffset;
          break;
      }
    }
  });
  
  return {
    x: finalX,
    y: finalY
  };
}


function walk(units, degrees) {
 
  let xOffset = Math.cos(degrees * (Math.PI / 180)) * units;
  let yOffset = Math.sin(degrees * (Math.PI / 180)) * units;
  
  return {
    xOffset: xOffset,
    yOffset: yOffset
  };
}


function splitWithTail(str, delim, count) {
  let parts = str.split(delim);
  let tail = parts.slice(count).join(delim);
  let result = parts.slice(0, count);
  result.push(tail);
  return result;
}

print(results.join('\n').replace(/\,/g, ' '));