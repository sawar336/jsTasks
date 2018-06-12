var playField = document.getElementById('play_field'),
    arr = document.getElementsByClassName('col'), 
    smallField = 3,
    winerSymb;

function arrToMatrix(arr, sizeOfField) {
    var rezArr = [],
        v = 0;
    
    for(i = 0; i < sizeOfField; i++){
        rezArr[i] = [];
        for(var j = 0; j < sizeOfField; j++){
        rezArr[i][j] = arr[v++];
        }
    }
    return rezArr;
};

elemsMatrix = arrToMatrix(arr, smallField);

function isLine(symb) {
    var cols,
        rows;
    
    for(col = 0; col < smallField; col++) {
        cols = 1;
        rows = 1;
        for (row = 0; row < smallField; row++) {
            cols &= (elemsMatrix[col][row].innerHTML == symb);
			rows &= (elemsMatrix[row][col].innerHTML == symb);
        }
        if (cols || rows) {
            winerSymb = symb;
            return true;
        } 
    }
    
	return false;
};

function isDiagonal(symb) {
    var rightD = 1,
        leftD = 1;
    
    for (el = 0; el < smallField; el++) {
        rightD &= (elemsMatrix[el][el].innerHTML == symb);
        leftD &= (elemsMatrix[smallField - el - 1][el].innerHTML == symb);
    }

    if (rightD || leftD) {
        winerSymb = symb;
        return true;
    } 
    
    return false;
}

function isADraw() {
    var elem = 1;
    
    for(col = 0; col < smallField; col++) {
        for (row = 0; row < smallField; row++) {
            elem &= (elemsMatrix[col][row].innerHTML !== "");
        } 
    }
    if (elem) {
        return true;
    }
    
	return false;
}


function checkWin() {
    if (isLine('x') || isLine('0') || isDiagonal('x') || isDiagonal('0')) {
        alert('winer ' + winerSymb);
        return true;
    } else if (isADraw()) {
        alert('draw');
        return true;
    }
    
    return false;
}

function finishTheGame() {
    current = true;
    if (checkWin()) {
        for (i = 0; i < arr.length; i++) {
            arr[i].innerHTML = "";
            arr[i].classList.remove('null');
        }
    }
}

function insertSymbols() {
    var current = true;
    return function (e) {
        if (e.target.className == 'col' && e.target.innerHTML != 'x' && e.target.innerHTML != '0') {
            if (current) {
                e.target.innerHTML = 'x';
                current = false;
            } else {
                e.target.innerHTML = '0';
                e.target.classList.add('null');
                current = true;
            }
            finishTheGame();
        }
    }
};



playField.addEventListener('click', insertSymbols());