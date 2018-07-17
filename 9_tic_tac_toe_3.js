//;(function () {
    
    var rebuildButton = $('[data-button=rebuildButton]'),
        cleanButton = $('[data-button=clean]'),
        field = $('[data-name=field]'),
        matrixArrOfCells = [],
        matrixOfSimbol = [],
        stackOfElements = [],
        stackOfclass = [],
        statusOfGame = true,
        countOfRows = localStorage.getItem('rows'),
        countOfCols = localStorage.getItem('cols'),
        winerSymb ,
        succsess,
        winnerCombination = [];

    function createField() {
        var rowsTemplate = $('[data-name=tmplRow]'),
            colsTemplate = $('[data-name=tmpl]'),
            createdRows;
            
        countOfRows = $('[data-fieldSize=xSize')[0].value;
        countOfCols = $('[data-fieldSize=ySize')[0].value;
        
        
        
        if(countOfRows != '' && countOfCols != '') {
            localStorage.setItem('rows', countOfRows);
            localStorage.setItem('cols', countOfCols);
        } else {
            countOfRows = localStorage.getItem('rows');
            countOfCols = localStorage.getItem('cols');
        }
            
        
        if(countOfRows < 3 || countOfCols < 3)  {
            alert('числа не можуть бути менші за 3');
        } else if( isNumeric(countOfRows) && isNumeric(countOfCols)) {
            field.empty();
            
            for(i = 0; i < countOfRows; i++) {
                rowsTemplate.tmpl().appendTo(field);
                createdRows = $('.row');
                
                matrixArrOfCells[i] = [];
                matrixOfSimbol[i] = []
                for(j = 0; j < countOfCols; j++) {
                    matrixArrOfCells[i][j] = {
                        el: colsTemplate.tmpl().appendTo(createdRows[i]),
                        row: i,
                        col: j
                    };
                    matrixOfSimbol[i][j] = 'label';
                }
            }
         } else alert("Введіть числа");
    };

    function checkSimbols() {
        for(i = 0; i < countOfRows; i++) {
            for (j = 0; j < countOfCols; j++) {
                if (matrixArrOfCells[i][j].el.children().hasClass('null')) {
                    matrixOfSimbol[i][j] = 0;
                } else if(matrixArrOfCells[i][j].el.children().hasClass('cross')) {
                    matrixOfSimbol[i][j] = 1;
                } else {
                     matrixOfSimbol[i][j] = 'label';
                }
                
                localStorage.setItem('elemsValue', JSON.stringify(matrixOfSimbol));
            }
        }
    };

    function createStack() {
        for(i = 0; i < countOfRows; i++) {
            for (j = 0; j < countOfCols; j++) {
                if (matrixArrOfCells[i][j].el.children().hasClass('null') || matrixArrOfCells[i][j].el.children().hasClass('cross')) {
                    stackOfElements.push([matrixArrOfCells[i][j].row, matrixArrOfCells[i][j].col]);
                } 
//                localStorage.setItem('elemsValue', JSON.stringify(stackOfElements));
            }
        }
    };
    
    function afterReload() {
        matrixOfSimbol = JSON.parse(localStorage.getItem('elemsValue'));
        
        for(i = 0; i < countOfRows; i++) {
            for (j = 0; j < countOfCols; j++) {
                if (matrixOfSimbol[i][j] == 0) {
                    matrixArrOfCells[i][j].el.children().addClass('null');
                    matrixArrOfCells[i][j].el.children().text('0');
                } else if(matrixOfSimbol[i][j] == 1) {
                    matrixArrOfCells[i][j].el.children().addClass('cross');
                    matrixArrOfCells[i][j].el.children().text('x');
                } else {
                     matrixArrOfCells[i][j].el.children().text('');
                }
                
//                localStorage.setItem('elemsValue', JSON.stringify(matrixOfSimbol));
            }
        }
    };
    
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };
    
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
            checkSimbols();
            createStack();
            finishTheGame();
        }
    };
    
    function clean() {
        if (stackOfElements.length != 0) {
            var lastItem = matrixArrOfCells[(stackOfElements.length - 1), 0][(stackOfElements.length - 1), 1];
            lastItem.removeClass('null cross winnerCombination')
            lastItem.text('');
            winnerCombination.pop();
            toHightlight();
            stackOfElements.pop();
            statusOfGame = !statusOfGame; 
            checkSimbols();
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
        if( typeof(arr[firstValue][secondValue]) === 'object' && arr[firstValue][secondValue].el.children().hasClass(elementClass) ) {
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
                elem &= (matrixArrOfCells[row][col].el.children().text() !== '');
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
                matrixArrOfCells[winnerCombination[i][0]][winnerCombination[i][1]].el.children().removeClass('winnerCombination');
            }; 
        } else {
            for(i = 0; i < winnerCombination.length; i++) {
                matrixArrOfCells[winnerCombination[i][0]][winnerCombination[i][1]].el.children().addClass('winnerCombination');
            };  
        };
    };
    
    field.on('click', insertSymbols);
    rebuildButton.on('click', createField);
    cleanButton.on('click', clean);
    createField();
//    checkSimbols();
    afterReload();
//})();