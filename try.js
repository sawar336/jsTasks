var rows = prompt("rows", 3),
    cols = prompt("cols", 3),
    matrixArr = [],
    counter = 1;
for(i = 0; i < rows; i++) {
    matrixArr[i] = [];
    for(j = 0; j < cols; j++) {
        matrixArr[i][j] = counter++;
    }
}

(function f() {
    var sumArr = [],
        sum = 0;
    
    if(rows <= cols) {
        for(i = 0; i < (cols - 2); i++) { 
            var p = i;
            for(j = 0; j < rows; j++) {
                var n = j;
                sum += matrixArr[j][j + i]; 
                matrixArr[j][j + i] = 1;
            }
            console.log(sum);
            sum = 0;
        }
    } else {
        for(i = 0; i < (rows - 2); i++) { 
            var p = i;
            for(j = 0; j < cols; j++) {
                var n = j;
                sum += matrixArr[j + i][j]; 
                matrixArr[j + i][j] = 1;
            }
            console.log(sum);
            sum = 0;
        }
    }
//    var min = Math.min(rows, cols),
//        max = Math.max(rows, cols) - 2,
//        sumArr = [],
//        sum = 0;
//    console.log(min);
//    console.log(max);
//    for(i = 0; i < max; i++) { 
//        var p = i;
//        for(j = 0; j < min; j++) {
//            var n = j;
//            sum += matrixArr[j][j + i]; 
//            matrixArr[j][j + i] = 1;
//        }
//        console.log(sum);
//        sum = 0;
//    }
})();

console.log(matrixArr);
