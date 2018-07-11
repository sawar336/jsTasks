;(function () {
    
    var rebuildButton = $('[data-button=rebuildButton]'),
        cleanButton = $('[data-button=clean]'),
        field = $('[data-name=field]'),
        matrixArrOfCells = [],
        stackOfElements = [],
        stackOfclass = [],
        statusOfGame = true,
        countOfRows = 3,
        countOfCols = 3,
        winerSymb,
        smallField = 3,
        succsess = 0;
                            
    
    function createField() {
        var rowsTemplate = $('[data-name=tmplRow]'),
            colsTemplate = $('[data-name=tmpl]'),
            createdRows;
        
        countOfRows = $('[data-fieldSize=xSize')[0].value;
        countOfCols = $('[data-fieldSize=ySize]')[0].value;
        
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
        var lastItem = stackOfElements[stackOfElements.length - 1];
        lastItem.removeClass('null cross')
        lastItem.text('');
        stackOfElements.pop();
        statusOfGame = !statusOfGame;
    }
    
    function isLine(elementClass) {
        var cols,
            rows;

        for(row = 0; row < smallField; row++) {
            cols = 1;
            rows = 1;
            for (col = 0; col < smallField; col++) {
                cols &= (matrixArrOfCells[col][row].children().hasClass(elementClass));
                rows &= (matrixArrOfCells[row][col].children().hasClass(elementClass));
            }
            if (cols || rows) {
                winerSymb = elementClass;
                return true;
            } 
        }

        return false;
    };
    
    function isDiagonal(elementClass) {
        
        function isRightDiagonals() {
            var firstResult,
                secondResult;
            

            for(i = 0; i <= (countOfCols - 3); i++) { 
                for(j = 0; j < countOfRows; j++) {
                    firstResult = hasClass(matrixArrOfCells, i, j);
                }
            };
            for(i = 1; i <= countOfRows - 3; i++) { 
                var p = i;
                for(j = 0; j < countOfRows; j++) {
                    secondResult = hasClass(matrixArrOfCells, i, j);
                }
            }; 

            if  (firstResult || secondResult) {
                return true;
            };

        };

        function hasClass(arr, counter1, counter2) {
            var p;
            if( arr[counter2][counter2 + counter1].children().hasClass(elementClass) ) {
                succsess++;
            } else {
                succsess = 0;
            };  

            return p = (succsess == 3);
        };
        
        return isRightDiagonals();
    };
//    function isDiagonal(elementClass) {
//        
//        function isRightDiagonals() {
//            var firstResult = 0,
//                secondResult = 0;
//
//            for(i = 0; i <= (countOfCols - 3); i++) { 
//                for(j = 0; j < countOfRows; j++) {
//                    if( !isNaN(arr[j][j + i]) && arr[j][j + i].children().hasClass(elementClass) ) {
//                        firstResult++;
//                        if (firstResult == 3) {
//                            return true;
//                        }
//                    } else {
//                        firstResult = 0;
//                    }
//                }
//            };
//            for(i = 1; i <= countOfRows - 3; i++) { 
//                var p = i;
//                for(j = 0; j < countOfRows; j++) {
//                    if( !isNaN(arr[j][j + i]) && arr[j][j + i].children().hasClass(elementClass) ) {
//                succsess += 1;
//            }
//                }
//            }; 
//            
//            if (firstResult == 3 || secondResult == 3) {
//                return true;
//            }
//        };
//        
//        return isRightDiagonals();
//    };
    
    function isADraw() {
        var elem = 1;

        for(col = 0; col < smallField; col++) {
            for (row = 0; row < smallField; row++) {
                elem &= (matrixArrOfCells[col][row].children().text() !== '');
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
            statusOfGame = true;
            
//            for (i = 0; i < stackOfElements.length; i++) {
//                stackOfElements[i].text('');
//                stackOfElements[i].removeClass('null cross');
//            }
            
            statusArr = [];
        }
    }

    
    field.on('click', insertSymbols);
    rebuildButton.on('click', createField);
    cleanButton.on('click', clean);
    createField();
})();
