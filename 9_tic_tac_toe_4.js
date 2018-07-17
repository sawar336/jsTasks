//;(function () {
    function TTT() {
        this.rebuildButton = $('[data-button=rebuildButton]');
        this.cleanButton = $('[data-button=clean]');
        this.field = $('[data-name=field]');
        this.matrixArrOfCells = [];
        this.matrixOfSimbol = [];
        this.stackOfElements = [];
        this.stackOfclass = [];
        this.statusOfGame = true;
        this.countOfRows = localStorage.getItem('rows');
        this.countOfCols = localStorage.getItem('cols');
        this.winerSymb;
        this.succsess;
        this.winnerCombination = [];
        
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
                this.countOfRows = localStorage.getItem('rows');
                this.countOfCols = localStorage.getItem('cols');
            }


            if(this.countOfRows < 3 || this.countOfCols < 3)  {
                alert('числа не можуть бути менші за 3');
            } else if( this.isNumeric(this.countOfRows) && this.isNumeric(this.countOfCols)) {
                this.field.empty();

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
        
        this.createStack = function() {
            for(i = 0; i < this.countOfRows; i++) {
                for (j = 0; j < this.countOfCols; j++) {
                    if (this.matrixArrOfCells[i][j].el.children().hasClass('null') || this.matrixArrOfCells[i][j].el.children().hasClass('cross')) {
                        this.stackOfElements.push([this.matrixArrOfCells[i][j].row, this.matrixArrOfCells[i][j].col]);
                    } 
    //                localStorage.setItem('elemsValue', JSON.stringify(stackOfElements));
                }
            }
        };
        
        this.afterReload = function() {
            this.matrixOfSimbol = JSON.parse(localStorage.getItem('elemsValue'));
        
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

    //                localStorage.setItem('elemsValue', JSON.stringify(matrixOfSimbol));
                }
            }
        };
        
        this.isNumeric = function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        
        this.insertSymbols = function(e) {
        var target = $(e.target);
        
            if (target.hasClass('value') && !target.hasClass('cross') && !target.hasClass('null')) {
                if (this.statusOfGame) {
                    target.addClass('cross');
                    this.stackOfclass.push('cross')
                    target.text('x');
                    this.statusOfGame = false;
                } else {
                    target.addClass('null');
                    target.text('0');
                    this.statusOfGame = true;
                }
                this.checkSimbols;
                this.createStack;
                this.finishTheGame;
            }
        };
        
        this.clean = function() {
        if (this.stackOfElements.length != 0) {
            var lastItem = this.matrixArrOfCells[(this.stackOfElements.length - 1), 0][(this.stackOfElements.length - 1), 1];
            lastItem.removeClass('null cross winnerCombination')
            lastItem.text('');
            this.winnerCombination.pop();
            this.toHightlight();
            this.stackOfElements.pop();
            this.statusOfGame = !statusOfGame; 
            this.checkSimbols();
        };
    };
    
    this.isLine = function(elementClass) {
        
        for(col = 0; col < this.countOfCols; col++) {
            this.succsess = 0;
            for (row = 0; row < this.countOfRows; row++) {
                if(hasClass(this.matrixArrOfCells, row, col, elementClass)) return true;
            }
        }
        for(row = 0; row < this.countOfRows; row++) {
            this.succsess = 0;
            for (col = 0; col < this.countOfCols; col++) {
                if(hasClass(this.matrixArrOfCells, row, col, elementClass)) return true; 
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
                if( hasClass(this.matrixArrOfCells, j, (j + i), elementClass) ) return true;
            };
        };
//        all diagonals under main diagonal
        for(i = 1; i <= this.countOfRows - 3; i++) { 
            this.succsess = 0;
            this.winnerCombination = [];
            for(j = 0; j < this.countOfRows; j++) {
                if( hasClass(this.matrixArrOfCells, j, (j - i), elementClass) ) return true;
            };
        };
//        all diagonals over anti-diagonal
        for(i = 1; i <= (this.countOfCols - 3); i++) { 
            this.succsess = 0;
            this.winnerCombination = [];
            for(j = 0; j < this.countOfRows; j++) {
                if( hasClass(this.matrixArrOfCells, j, (this.countOfCols - j - 1 - i), this.elementClass) ) return true;
            };
        };  
//        all diagonals under anti-diagonal        
        for(i = 0; i <= (this.countOfRows - 3); i++) { 
            this.succsess = 0;
            this.winnerCombination = [];
            for(j = 0; j < this.countOfRows; j++) {
                if( hasClass(this.matrixArrOfCells, j, (this.countOfCols - j - 1 + i), elementClass) ) return true;
            };
        };
        
        return false;
    };

    this.hasClass = function(arr, firstValue, secondValue, elementClass) {
        if( typeof(arr[firstValue][secondValue]) === 'object' && arr[firstValue][secondValue].el.children().hasClass(elementClass) ) {
            this.winnerCombination.push([firstValue, secondValue]);
            this.succsess++;
            if(this.succsess == 3) {
                this.toHightlight();
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
    };
    
    this.checkWin = function() {
        if (this.isLine('cross') || this.isLine('null') || this.isDiagonal('cross') || this.isDiagonal('null')) {
            alert('winer: ' + winerSymb);
            return true;
        }
        else if (this.isADraw()) {
            alert('draw');
            return true;
        }
    
        return false;
    };
    
    this.finishTheGame = function() {
        if (this.checkWin()) {
//            statusOfGame = true;
//            for (i = 0; i < stackOfElements.length; i++) {
//                stackOfElements[i].text('');
//                stackOfElements[i].removeClass('null cross');
//            }
            
            this.statusArr = [];
        }
    };
    
    this.toHightlight = function() {
        
        if (this.winnerCombination.length < 3) {
           for(i = 0; i <= this.winnerCombination.length - 1; i++) {
                this.matrixArrOfCells[this.winnerCombination[i][0]][this.winnerCombination[i][1]].el.children().removeClass('winnerCombination');
            }; 
        } else {
            for(i = 0; i < this.winnerCombination.length; i++) {
                this.matrixArrOfCells[this.winnerCombination[i][0]][this.winnerCombination[i][1]].el.children().addClass('winnerCombination');
            };  
        };
    };
        
        
};

ttt = new TTT();

ttt.field.on('click', ttt.insertSymbols);
ttt.rebuildButton.on('click', ttt.createField);
ttt.cleanButton.on('click', ttt.clean);
ttt.createField();
//    checkSimbols();
//ttt.afterReload();
