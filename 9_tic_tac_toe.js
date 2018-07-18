;(function () {
    
    function TTT() {
        this.rebuildButton = $('[data-button=rebuildButton]'),
        this.cleanButton = $('[data-button=clean]'),
        this.field = $('[data-name=field]'),
        this.matrixArrOfCells = [],
        this.matrixOfSimbol,
        this.stackOfElements = JSON.parse(localStorage.getItem('stack')) || [],
        this.statusOfGame = true,
        this.countOfRows = localStorage.getItem('rows'),
        this.countOfCols = localStorage.getItem('cols'),
        this.winerSymb,
        this.succsess,
        this.winnerCombination = [];

        this.forInitialize = function() {
            this.field.on('click', this.insertSymbols.bind(this));
            this.rebuildButton.on('click', this.createField.bind(this));
            this.cleanButton.on('click', this.clean.bind(this));
            this.createField();
            this.afterReload();
        };

        this.createField = function() {
            var rowsTemplate = $('[data-name=tmplRow]'),
                colsTemplate = $('[data-name=tmpl]'),
                createdRows;

            this.countOfRows = $('[data-fieldSize=xSize')[0].value;
            this.countOfCols = $('[data-fieldSize=ySize')[0].value;



            if(this.countOfRows != '' && this.countOfCols != '') {
                localStorage.setItem('rows', this.countOfRows);
                localStorage.setItem('cols', this.countOfCols);
            } else {
                this.countOfRows = localStorage.getItem('rows') || 3;
                this.countOfCols = localStorage.getItem('cols') || 3;
            }


            if(this.countOfRows < 3 || this.countOfCols < 3)  {
                alert('числа не можуть бути менші за 3');
                this.countOfRows = 3;
                this.countOfCols = 3;
                localStorage.setItem('rows', this.countOfRows);
                localStorage.setItem('cols', this.countOfCols);
            } else if( this.isNumeric(this.countOfRows) && this.isNumeric(this.countOfCols)) {
                this.field.empty();
                this.matrixOfSimbol = [];
                for(i = 0; i < this.countOfRows; i++) {
                    rowsTemplate.tmpl().appendTo(this.field);
                    createdRows = $('.row');

                    this.matrixArrOfCells[i] = [];
                    this.matrixOfSimbol[i] = []
                    for(j = 0; j < this.countOfCols; j++) {
                        this.matrixArrOfCells[i][j] = {
                            el: colsTemplate.tmpl().appendTo(createdRows[i]),
                            row: i,
                            col: j
                        };
                        this.matrixOfSimbol[i][j] = 'label';
                    }
                }
             } else alert("Введіть числа");
        };

        this.checkSimbols = function() {
            for(i = 0; i < this.countOfRows; i++) {
                for (j = 0; j < this.countOfCols; j++) {
                    if (this.matrixArrOfCells[i][j].el.children().hasClass('null')) {
                        this.matrixOfSimbol[i][j] = 0;
                    } else if(this.matrixArrOfCells[i][j].el.children().hasClass('cross')) {
                        this.matrixOfSimbol[i][j] = 1;
                    } else {
                         this.matrixOfSimbol[i][j] = 'label';
                    }

                    localStorage.setItem('elemsValue', JSON.stringify(this.matrixOfSimbol));
                }
            }
        };

        this.createStack = function(target) {
            for (i = 0; i < this.countOfRows; i++) {
                for (j = 0; j < this.countOfCols; j++) {
                    if (this.matrixArrOfCells[i][j].el.children()[0] == target[0]) {
                        this.stackOfElements.push([this.matrixArrOfCells[i][j].row, this.matrixArrOfCells[i][j].col]);
                    } 
                }
            }

            localStorage.setItem('stack', JSON.stringify(this.stackOfElements));
        };

        this.afterReload = function() {
            this.matrixOfSimbol = JSON.parse(localStorage.getItem('elemsValue')) || this.matrixOfSimbol;

            for(i = 0; i < this.countOfRows; i++) {
                for (j = 0; j < this.countOfCols; j++) {
                    if (this.matrixOfSimbol[i][j] == 0) {
                        this.matrixArrOfCells[i][j].el.children().addClass('null');
                        this.matrixArrOfCells[i][j].el.children().text('0');
                    } else if(this.matrixOfSimbol[i][j] == 1) {
                        this.matrixArrOfCells[i][j].el.children().addClass('cross');
                        this.matrixArrOfCells[i][j].el.children().text('x');
                    } else {
                         this.matrixArrOfCells[i][j].el.children().text('');
                    }
                }
            }
        };

        this.isNumeric = function(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        };

        this.insertSymbols = function(e) {
            var target = $(e.target);
            if (target.hasClass('value') && !target.hasClass('cross') && !target.hasClass('null') && !this.checkWin()) {
                if (this.statusOfGame) {
                    target.addClass('cross');
                    target.text('x');
                    this.statusOfGame = false;
                } else {
                    target.addClass('null');
                    target.text('0');
                    this.statusOfGame = true;
                }
                this.createStack(target);
                this.checkSimbols();
                this.finishTheGame();
            }
        };

        this.clean = function() {
            if (this.stackOfElements.length != 0) {
                this.toHightlight();
                var lastItem = this.matrixArrOfCells[this.stackOfElements[this.stackOfElements.length - 1][0]][this.stackOfElements[this.stackOfElements.length - 1][1]].el.children();
                lastItem.removeClass('null cross winnerCombination');
                lastItem.text('');
                this.winnerCombination.pop();
                this.stackOfElements.pop();
                localStorage.setItem('stack', JSON.stringify(this.stackOfElements));
                this.statusOfGame = !this.statusOfGame; 
                this.checkSimbols();
            };
        };

        this.isLine = function(elementClass) {

            for(col = 0; col < this.countOfCols; col++) {
                this.succsess = 0;
                for (row = 0; row < this.countOfRows; row++) {
                    if(this.hasClass(this.matrixArrOfCells, row, col, elementClass)) return true;
                }
            }
            for(row = 0; row < this.countOfRows; row++) {
                this.succsess = 0;
                for (col = 0; col < this.countOfCols; col++) {
                    if(this.hasClass(this.matrixArrOfCells, row, col, elementClass)) return true; 
                }
            };


            return false;
        };

        this.isDiagonal = function(elementClass) {

    //        all diagonals over main diagonal
            for(i = 0; i <= (this.countOfCols - 3); i++) { 
                this.succsess = 0;
                this.winnerCombination = [];
                for(j = 0; j < this.countOfRows; j++) {
                    if( this.hasClass(this.matrixArrOfCells, j, (j + i), elementClass) ) return true;
                };
            };
    //        all diagonals under main diagonal
            for(i = 1; i <= this.countOfRows - 3; i++) { 
                this.succsess = 0;
                this.winnerCombination = [];
                for(j = 0; j < this.countOfRows; j++) {
                    if( this.hasClass(this.matrixArrOfCells, j, (j - i), elementClass) ) return true;
                };
            };
    //        all diagonals over anti-diagonal
            for(i = 1; i <= (this.countOfCols - 3); i++) { 
                this.succsess = 0;
                this.winnerCombination = [];
                for(j = 0; j < this.countOfRows; j++) {
                    if( this.hasClass(this.matrixArrOfCells, j, (this.countOfCols - j - 1 - i), elementClass) ) return true;
                };
            };  
    //        all diagonals under anti-diagonal        
            for(i = 0; i <= (this.countOfRows - 3); i++) { 
                this.succsess = 0;
                this.winnerCombination = [];
                for(j = 0; j < this.countOfRows; j++) {
                    if( this.hasClass(this.matrixArrOfCells, j, (this.countOfCols - j - 1 + i), elementClass) ) return true;
                };
            };

            return false;
        };

        this.hasClass = function(arr, firstValue, secondValue, elementClass) {
            if( typeof(arr[firstValue][secondValue]) === 'object' && arr[firstValue][secondValue].el.children().hasClass(elementClass) ) {
                this.winnerCombination.push([firstValue, secondValue]);
                this.succsess++;
                if(this.succsess == 3) {
                    this.toHightlight(true);
                    this.winerSymb = elementClass;
                    return true;
                };
            } else {
                this.succsess = 0;
                this.winnerCombination = [];
            };

            return false;
        };


        this.isADraw = function() {
            var elem = 1;

            for(row = 0; row < this.countOfRows; row++) {
                for (col = 0; col < this.countOfCols; col++) {
                    elem &= (this.matrixArrOfCells[row][col].el.children().text() !== '');
                } 
            }
            if (elem) {
                return true;
            }

            return false;
        }

        this.checkWin = function() {
            if (this.isLine('cross') || this.isLine('null') || this.isDiagonal('cross') || this.isDiagonal('null')) {
                alert('winer: ' + this.winerSymb);
                return true;
            }
            else if (this.isADraw()) {
                alert('draw');
                return true;
            }

            return false;
        }

        this.finishTheGame = function() {
            if (this.checkWin()) {
                this.statusOfGame = true;
                for (i = this.stackOfElements.length - 1; i >= 0; i--) {
                    this.matrixArrOfCells[this.stackOfElements[i][0]][this.stackOfElements[i][1]].el.children().removeClass('null cross winnerCombination');
                    this.matrixArrOfCells[this.stackOfElements[i][0]][this.stackOfElements[i][1]].el.children().text('');
                    this.stackOfElements.pop();
                }
                this.stackOfElements = [];
                localStorage.setItem('stack', []);
            }
        }

        this.toHightlight = function(highlite) {

            if (highlite) {
                for(i = 0; i < this.winnerCombination.length; i++) {
                    this.matrixArrOfCells[this.winnerCombination[i][0]][this.winnerCombination[i][1]].el.children().addClass('winnerCombination');
                }; 
            } else {
                 for(i = 0; i < this.winnerCombination.length; i++) {
                    this.matrixArrOfCells[this.winnerCombination[i][0]][this.winnerCombination[i][1]].el.children().removeClass('winnerCombination');
                } 
            }
        };

        this.forInitialize();
    };
    
    var ttt = new TTT;
    
//    var rebuildButton = $('[data-button=rebuildButton]'),
//        cleanButton = $('[data-button=clean]'),
//        field = $('[data-name=field]'),
//        matrixArrOfCells = [],
//        matrixOfSimbol,
//        stackOfElements = JSON.parse(localStorage.getItem('stack')) || [],
//        statusOfGame = true,
//        countOfRows = localStorage.getItem('rows'),
//        countOfCols = localStorage.getItem('cols'),
//        winerSymb,
//        succsess,
//        winnerCombination = [];
//
//    function forInitialize() {
//        field.on('click', insertSymbols);
//        rebuildButton.on('click', createField);
//        cleanButton.on('click', clean);
//        createField();
//        afterReload();
//    };
//
//    function createField() {
//        var rowsTemplate = $('[data-name=tmplRow]'),
//            colsTemplate = $('[data-name=tmpl]'),
//            createdRows;
//            
//        countOfRows = $('[data-fieldSize=xSize')[0].value;
//        countOfCols = $('[data-fieldSize=ySize')[0].value;
//        
//        
//        
//        if(countOfRows != '' && countOfCols != '') {
//            localStorage.setItem('rows', countOfRows);
//            localStorage.setItem('cols', countOfCols);
//        } else {
//            countOfRows = localStorage.getItem('rows') || 3;
//            countOfCols = localStorage.getItem('cols') || 3;
//        }
//            
//        
//        if(countOfRows < 3 || countOfCols < 3)  {
//            alert('числа не можуть бути менші за 3');
//            countOfRows = 3;
//            countOfCols = 3;
//            localStorage.setItem('rows', countOfRows);
//            localStorage.setItem('cols', countOfCols);
//        } else if( isNumeric(countOfRows) && isNumeric(countOfCols)) {
//            field.empty();
//            matrixOfSimbol = [];
//            for(i = 0; i < countOfRows; i++) {
//                rowsTemplate.tmpl().appendTo(field);
//                createdRows = $('.row');
//                
//                matrixArrOfCells[i] = [];
//                matrixOfSimbol[i] = []
//                for(j = 0; j < countOfCols; j++) {
//                    matrixArrOfCells[i][j] = {
//                        el: colsTemplate.tmpl().appendTo(createdRows[i]),
//                        row: i,
//                        col: j
//                    };
//                    matrixOfSimbol[i][j] = 'label';
//                }
//            }
//         } else alert("Введіть числа");
//    };
//
//    function checkSimbols() {
//        for(i = 0; i < countOfRows; i++) {
//            for (j = 0; j < countOfCols; j++) {
//                if (matrixArrOfCells[i][j].el.children().hasClass('null')) {
//                    matrixOfSimbol[i][j] = 0;
//                } else if(matrixArrOfCells[i][j].el.children().hasClass('cross')) {
//                    matrixOfSimbol[i][j] = 1;
//                } else {
//                     matrixOfSimbol[i][j] = 'label';
//                }
//                
//                JSON.stringify(localStorage.setItem('elemsValue', JSON.stringify(matrixOfSimbol)));
//            }
//        }
//    };
//
//    function createStack(target) {
//        for (i = 0; i < countOfRows; i++) {
//            for (j = 0; j < countOfCols; j++) {
//                if (matrixArrOfCells[i][j].el.children()[0] == target[0]) {
//                    stackOfElements.push([matrixArrOfCells[i][j].row, matrixArrOfCells[i][j].col]);
//                } 
//            }
//        }
//        
//        localStorage.setItem('stack', JSON.stringify(stackOfElements));
//    };
//    
//    function afterReload() {
//        matrixOfSimbol = JSON.parse(localStorage.getItem('elemsValue')) || matrixOfSimbol;
//        
//        for(i = 0; i < countOfRows; i++) {
//            for (j = 0; j < countOfCols; j++) {
//                if (matrixOfSimbol[i][j] == 0) {
//                    matrixArrOfCells[i][j].el.children().addClass('null');
//                    matrixArrOfCells[i][j].el.children().text('0');
//                } else if(matrixOfSimbol[i][j] == 1) {
//                    matrixArrOfCells[i][j].el.children().addClass('cross');
//                    matrixArrOfCells[i][j].el.children().text('x');
//                } else {
//                     matrixArrOfCells[i][j].el.children().text('');
//                }
//            }
//        }
//    };
//    
//    function isNumeric(n) {
//      return !isNaN(parseFloat(n)) && isFinite(n);
//    };
//    
//    function insertSymbols(e) {
//        var target = $(e.target);
//        if (target.hasClass('value') && !target.hasClass('cross') && !target.hasClass('null') && !checkWin()) {
//            if (statusOfGame) {
//                target.addClass('cross');
//                target.text('x');
//                statusOfGame = false;
//            } else {
//                target.addClass('null');
//                target.text('0');
//                statusOfGame = true;
//            }
//            createStack(target);
//            checkSimbols();
//            finishTheGame();
//        }
//    };
//    
//    function clean() {
//        if (stackOfElements.length != 0) {
//            toHightlight();
//            var lastItem = matrixArrOfCells[stackOfElements[stackOfElements.length - 1][0]][stackOfElements[stackOfElements.length - 1][1]].el.children();
//            lastItem.removeClass('null cross winnerCombination');
//            lastItem.text('');
//            winnerCombination.pop();
//            stackOfElements.pop();
//            localStorage.setItem('stack', JSON.stringify(stackOfElements));
//            statusOfGame = !statusOfGame; 
//            checkSimbols();
//        };
//    };
//    
//    function isLine(elementClass) {
//        
//        for(col = 0; col < countOfCols; col++) {
//            succsess = 0;
//            for (row = 0; row < countOfRows; row++) {
//                if(hasClass(matrixArrOfCells, row, col, elementClass)) return true;
//            }
//        }
//        for(row = 0; row < countOfRows; row++) {
//            succsess = 0;
//            for (col = 0; col < countOfCols; col++) {
//                if(hasClass(matrixArrOfCells, row, col, elementClass)) return true; 
//            }
//        };
//
//
//        return false;
//    };
//
//    function isDiagonal(elementClass) {
//        
////        all diagonals over main diagonal
//        for(i = 0; i <= (countOfCols - 3); i++) { 
//            succsess = 0;
//            winnerCombination = [];
//            for(j = 0; j < countOfRows; j++) {
//                if( hasClass(matrixArrOfCells, j, (j + i), elementClass) ) return true;
//            };
//        };
////        all diagonals under main diagonal
//        for(i = 1; i <= countOfRows - 3; i++) { 
//            succsess = 0;
//            winnerCombination = [];
//            for(j = 0; j < countOfRows; j++) {
//                if( hasClass(matrixArrOfCells, j, (j - i), elementClass) ) return true;
//            };
//        };
////        all diagonals over anti-diagonal
//        for(i = 1; i <= (countOfCols - 3); i++) { 
//            succsess = 0;
//            winnerCombination = [];
//            for(j = 0; j < countOfRows; j++) {
//                if( hasClass(matrixArrOfCells, j, (countOfCols - j - 1 - i), elementClass) ) return true;
//            };
//        };  
////        all diagonals under anti-diagonal        
//        for(i = 0; i <= (countOfRows - 3); i++) { 
//            succsess = 0;
//            winnerCombination = [];
//            for(j = 0; j < countOfRows; j++) {
//                if( hasClass(matrixArrOfCells, j, (countOfCols - j - 1 + i), elementClass) ) return true;
//            };
//        };
//        
//        return false;
//    };
//
//    function hasClass(arr, firstValue, secondValue, elementClass) {
//        if( typeof(arr[firstValue][secondValue]) === 'object' && arr[firstValue][secondValue].el.children().hasClass(elementClass) ) {
//            winnerCombination.push([firstValue, secondValue]);
//            succsess++;
//            if(succsess == 3) {
//                toHightlight(true);
//                winerSymb = elementClass;
//                return true;
//            };
//        } else {
//            succsess = 0;
//            winnerCombination = [];
//        };
//        
//        return false;
//    };
//
//    
//    function isADraw() {
//        var elem = 1;
//
//        for(row = 0; row < countOfRows; row++) {
//            for (col = 0; col < countOfCols; col++) {
//                elem &= (matrixArrOfCells[row][col].el.children().text() !== '');
//            } 
//        }
//        if (elem) {
//            return true;
//        }
//
//        return false;
//    }
//    
//    function checkWin() {
//        if (isLine('cross') || isLine('null') || isDiagonal('cross') || isDiagonal('null')) {
//            alert('winer: ' + winerSymb);
//            return true;
//        }
//        else if (isADraw()) {
//            alert('draw');
//            return true;
//        }
//    
//        return false;
//    }
//    
//    function finishTheGame() {
//        if (checkWin()) {
//            statusOfGame = true;
//            for (i = stackOfElements.length - 1; i >= 0; i--) {
//                matrixArrOfCells[stackOfElements[i][0]][stackOfElements[i][1]].el.children().removeClass('null cross winnerCombination');
//                matrixArrOfCells[stackOfElements[i][0]][stackOfElements[i][1]].el.children().text('');
//                stackOfElements[i].pop;
//            }
//        }
//    }
//    
//    function toHightlight(highlite) {
//        
//        if (highlite) {
//            for(i = 0; i < winnerCombination.length; i++) {
//                matrixArrOfCells[winnerCombination[i][0]][winnerCombination[i][1]].el.children().addClass('winnerCombination');
//            }; 
//        } else {
//             for(i = 0; i < winnerCombination.length; i++) {
//                matrixArrOfCells[winnerCombination[i][0]][winnerCombination[i][1]].el.children().removeClass('winnerCombination');
//            } 
//        }
//    };
//    
//    forInitialize();
})();