;(function () {
    var playField = document.getElementById('play_field'),
    cleanBtn = document.getElementById('clean'),
    xSize= document.getElementById('x_size'),
    ySize= document.getElementById('y_size'),
    arr = document.getElementsByClassName('col'), 
    smallField = 3,
    winerSymb,
    statusArr = [];

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
                cols &= (elemsMatrix[col][row].classList.contains(symb));
                rows &= (elemsMatrix[row][col].classList.contains(symb));
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
            rightD &= (elemsMatrix[el][el].classList.contains(symb));
            leftD &= (elemsMatrix[smallField - el - 1][el].classList.contains(symb));
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
        if (isLine('cross') || isLine('null') || isDiagonal('cross') || isDiagonal('null')) {
            alert('winer: ' + winerSymb);
            return true;
        } else if (isADraw()) {
            alert('draw');
            return true;
        }
    
        return false;
    }

    function finishTheGame() {
        status = true;
        if (checkWin()) {
            for (i = 0; i < arr.length; i++) {
                arr[i].innerHTML = "";
                arr[i].classList.remove('null');
                arr[i].classList.remove('cross');
            }
            
            statusArr = [];
        }
    }

    function insertSymbols() {
        var status;
        return function (e) {
            if (e.target.className == 'col' && !e.target.classList.contains('cross') && !e.target.classList.contains('null')) {
                if (status) {
                    e.target.classList.add('cross');
                    e.target.innerHTML = 'x';
                    status = false;
                } else {
                    e.target.classList.add('null');
                    e.target.innerHTML = '0';
                    status = true;
                }
                statusArr.push(e.target);
                localStorage.foo = JSON.stringify(statusArr);
                finishTheGame();
            }
        }
    };
    
    function clen() {
        var lastItem = statusArr[statusArr.length - 1];
        lastItem.innerHTML = "";
        lastItem.classList.remove('null');
        lastItem.classList.remove('cross');
        statusArr.pop();
    }
    
    function saveStatus() {
        
    }
    
    playField.addEventListener('click', insertSymbols());
    cleanBtn.addEventListener('click', clen);
    
})();