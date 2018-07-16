//;(function () {
    
    var rebuildButton = $('[data-button=rebuildButton]'),
        cleanButton = $('[data-button=clean]'),
        field = $('[data-name=field]'),
        matrixArrOfCells = [],
        stackOfElements = [],
        stackOfclass = [],
        statusOfGame = true,
        countOfRows,
        countOfCols,
        winerSymb,
        succsess;
        winnerCombination = [];
                            
    
    function createField() {
        var rowsTemplate = $('[data-name=tmplRow]'),
            colsTemplate = $('[data-name=tmpl]'),
            createdRows;
        
        countOfRows = $('[data-fieldSize=xSize')[0].value || 3;
        countOfCols = $('[data-fieldSize=ySize]')[0].value || 3;
        
        if(countOfRows < 3 || countOfRows < 3)  {
            alert('числа не можуть бути менші за 3');
        } else if( isNumeric(countOfRows) && isNumeric(countOfCols)) {
            field.empty();
            
            for(i = 0; i < countOfRows; i++) {
                rowsTemplate.tmpl().appendTo(field);
                createdRows = $('.row');
                
                matrixArrOfCells[i] = [];
                for(j = 0; j < countOfCols; j++) {
                    matrixArrOfCells[i][j] = colsTemplate.tmpl().appendTo(createdRows[i]);
                }
            }
         } else alert("Введіть числа");
    }
    
//    function resumeElement() {
//        stackOfElements = JSON.parse(localStorage.getItem('elementSet')) || [];
//        console.log(stackOfElements);
//    }
    
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    function insertSymbols(e) {
        var target = $(e.target);
        
        if (target.hasClass('value') && !target.hasClass('cross') && !target.hasClass('null')) {
            if (statusOfGame) {
                target.addClass('cross');
                stackOfclass.push('cross')
                target.text('x');
                statusOfGame = false;
            } else {
                target.addClass('null');
                target.text('0');
                statusOfGame = true;
            }
            stackOfElements.push(target);
            finishTheGame();
        }
    };
    
    function clean() {
        if (stackOfElements.length != 0) {
            var lastItem = stackOfElements[stackOfElements.length - 1];
            lastItem.removeClass('null cross winnerCombination')
            lastItem.text('');
            winnerCombination.pop();
            toHightlight();
            stackOfElements.pop();
            statusOfGame = !statusOfGame; 
        };
    };
    
    function isLine(elementClass) {
        
        for(col = 0; col < countOfCols; col++) {
            succsess = 0;
            for (row = 0; row < countOfRows; row++) {
                if(hasClass(matrixArrOfCells, row, col, elementClass)) return true;
            }
        }
        for(row = 0; row < countOfRows; row++) {
            succsess = 0;
            for (col = 0; col < countOfCols; col++) {
                if(hasClass(matrixArrOfCells, row, col, elementClass)) return true; 
            }
        };


        return false;
    };

    function isDiagonal(elementClass) {
        
//        all diagonals over main diagonal
        for(i = 0; i <= (countOfCols - 3); i++) { 
            succsess = 0;
            winnerCombination = [];
            for(j = 0; j < countOfRows; j++) {
                if( hasClass(matrixArrOfCells, j, (j + i), elementClass) ) return true;
            };
        };
//        all diagonals under main diagonal
        for(i = 1; i <= countOfRows - 3; i++) { 
            succsess = 0;
            winnerCombination = [];
            for(j = 0; j < countOfRows; j++) {
                if( hasClass(matrixArrOfCells, j, (j - i), elementClass) ) return true;
            };
        };
//        all diagonals over anti-diagonal
        for(i = 1; i <= (countOfCols - 3); i++) { 
            succsess = 0;
            winnerCombination = [];
            for(j = 0; j < countOfRows; j++) {
                if( hasClass(matrixArrOfCells, j, (countOfCols - j - 1 - i), elementClass) ) return true;
            };
        };  
//        all diagonals under anti-diagonal        
        for(i = 0; i <= (countOfRows - 3); i++) { 
            succsess = 0;
            winnerCombination = [];
            for(j = 0; j < countOfRows; j++) {
                if( hasClass(matrixArrOfCells, j, (countOfCols - j - 1 + i), elementClass) ) return true;
            };
        };
        
        return false;
    };

    function hasClass(arr, firstValue, secondValue, elementClass) {
        if( arr[firstValue][secondValue] && arr[firstValue][secondValue].children().hasClass(elementClass) ) {
            winnerCombination.push([firstValue, secondValue]);
            succsess++;
            if(succsess == 3) {
                toHightlight();
                winerSymb = elementClass;
                return true;
            };
        } else {
            succsess = 0;
            winnerCombination = [];      
        };
        
        return false;
    };

    
    function isADraw() {
        var elem = 1;

        for(row = 0; row < countOfRows; row++) {
            for (col = 0; col < countOfCols; col++) {
                elem &= (matrixArrOfCells[row][col].children().text() !== '');
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
        }
        else if (isADraw()) {
            alert('draw');
            return true;
        }
    
        return false;
    }
    
    function finishTheGame() {
        if (checkWin()) {
//            statusOfGame = true;
//            for (i = 0; i < stackOfElements.length; i++) {
//                stackOfElements[i].text('');
//                stackOfElements[i].removeClass('null cross');
//            }
            
            statusArr = [];
        }
    }
    
    function toHightlight() {
        
        if (winnerCombination.length < 3) {
           for(i = 0; i <= winnerCombination.length - 1; i++) {
                matrixArrOfCells[winnerCombination[i][0]][winnerCombination[i][1]].children().removeClass('winnerCombination');
            }; 
        } else {
            for(i = 0; i < winnerCombination.length; i++) {
                matrixArrOfCells[winnerCombination[i][0]][winnerCombination[i][1]].children().addClass('winnerCombination');
            };  
        };
    };
    
    field.on('click', insertSymbols);
    rebuildButton.on('click', createField);
    cleanButton.on('click', clean);
    createField();
//})();
