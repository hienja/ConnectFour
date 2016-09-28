var color = 'red';
var board = [];
var rows = 6;
var columns = 6;
var connectionsNeeded = 4;

for (var i = 0; i < rows; i++) {
  board.push([]);
  for (var j = 0; j < columns; j++) {
    board[i].push(false);
  }
} 

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('container').onclick = function(event){
    var column = event.target.classList.contains('first');
    var parent = event.target.parentElement;
    var columnNumber = Number(parent.getAttribute('id')) - 1;
    if (column) {
      var children = parent.children;
      var condition = true; 
      for (var rowNumber = children.length - 1; rowNumber >= 0 && condition ; rowNumber--) {
        if (board[rowNumber][columnNumber] !== 'red' && board[rowNumber][columnNumber] !== 'yellow') {
          children[rowNumber].className = color;
          board[rowNumber][columnNumber] = color;
          if (horizontalConnection(rowNumber, color)) {
            console.log('connection made horizontally');
          }
          if (verticalConnection(columnNumber, color)) {
            console.log('connection made vertically');
          }
          if (minorDiagonalConnection(rowNumber, columnNumber, color)) {
            console.log('connection made from minor diagonal');
          }
          if (majorDiagonalConnection(rowNumber, columnNumber, color)) {
            console.log('connection made from major diagonal');
          }
          condition = false;
        }
      }
      color = color === 'red' ? 'yellow' : 'red';
    }
  };
});

var horizontalConnection = function (rowNumber, color) {
  var maxConnection = 0;
  var runningConnection = 0;
  for (var columnNumber = 0; columnNumber < columns; columnNumber++ ) {
    if (board[rowNumber][columnNumber] === color) {
      runningConnection++;
    } else {
      maxConnection = runningConnection > maxConnection ? runningConnection : maxConnection; 
      runningConnection = 0;
    }
  }
  return maxConnection >= connectionsNeeded || runningConnection >= connectionsNeeded ? true : false;
};

var verticalConnection = function (columnNumber, color) {
  var maxConnection = 0;
  var runningConnection = 0;
  for (var rowNumber = 0; rowNumber < rows; rowNumber++ ) {
    if (board[rowNumber][columnNumber] === color) {
      runningConnection++;
    } else {
      maxConnection = runningConnection > maxConnection ? runningConnection : maxConnection; 
      runningConnection = 0;
    }
  }
  return maxConnection >= connectionsNeeded || runningConnection >= connectionsNeeded ? true : false;
};

//Runs from left to right and from bottom to top
var minorDiagonalConnection = function (rowNumber, columnNumber, color) {
  var minorIndex = rowNumber + columnNumber;
  var maxConnection = 0;
  var runningConnection = 0;
  var min = connectionsNeeded - 1;
  var max = (rows - 1) + (columns - 1) - connectionsNeeded + 1;

  //We can ignore some minor diagonals that doesn't meet the connections require to win.
  if(minorIndex >= min && minorIndex <= max) {
    for (var rowNumber = 0; rowNumber < rows; rowNumber++ ) {
      var row = rowNumber;
      var column = minorIndex - row;
      if (column < rows) {
        if (board[row][column] === color) {
          runningConnection++;
        } else {
          maxConnection = runningConnection > maxConnection ? runningConnection : maxConnection; 
          runningConnection = 0;
        }
      } 
    }
    return maxConnection >= connectionsNeeded || runningConnection >= connectionsNeeded ? true : false;
  }
  return false;
};

//Runs from left to right and from top to bottom
var majorDiagonalConnection = function (rowNumber, columnNumber, color) {
  var majorIndex = rowNumber - columnNumber;
  var maxConnection = 0;
  var runningConnection = 0;
  var min = 0 - rows + connectionsNeeded;
  var max = 0 + rows - connectionsNeeded;

  //We can ignore some major diagonals that doesn't meet the connections require to win.
  if(majorIndex >= min && majorIndex <= max) {
    for (var rowNumber = 0; rowNumber < rows; rowNumber++ ) {
      var row = rowNumber;
      var column = row - majorIndex;
      if (column < rows) {
        if (board[row][column] === color) {
          runningConnection++;
        } else {
          maxConnection = runningConnection > maxConnection ? runningConnection : maxConnection; 
          runningConnection = 0;
        }
      } 
    }
    return maxConnection >= connectionsNeeded || runningConnection >= connectionsNeeded ? true : false;
  }
  return false;
}