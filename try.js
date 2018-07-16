//var rows = prompt("rows", 3),
//    cols = prompt("cols", 3),
var rows = 3,
    cols = 3,
    matrixArr = [],
    counter = 2;
for(i = 0; i < rows; i++) {
    matrixArr[i] = [];
    for(j = 0; j < cols; j++) {
        matrixArr[i][j] = counter++;
    }
}

console.log(matrixArr);

(function f() {
    
    var sum = 0;
    
    for(i = 0; i <= (cols - 3); i++) { 
        var p = i;
        for(j = 0; j < rows; j++) {
            var n = j;
            if(!isNaN(matrixArr[j][j + i])) {
                sum += matrixArr[j][j + i];   
            }; 
               
            if(matrixArr[j][j + i]) {
                matrixArr[j][j + i] = "-";   
            };
        }
        console.log(sum);
        sum = 0;
    }
    for(i = 1; i <= rows - 3; i++) { 
        var p = i;
        for(j = 0; j < rows; j++) {
            var n = j;
            if(!isNaN(matrixArr[j][j - i])) {
                sum += matrixArr[j][j - i];   
            }; 
               
            if(matrixArr[j][j - i]) {
                matrixArr[j][j - i] += "+" + i;   
            };
        }
        console.log(sum);
        sum = 0;
    } 
//    for(i = 0; i <= (rows - 3); i++) { 
//        var p = i;
//        for(j = 0; j < rows; j++) {
//            var n = j;
//            if(!isNaN(matrixArr[j][cols - j - 1 + i])) {
//                sum += matrixArr[j][cols - j - 1 + i];   
//            }; 
//               
//            if(matrixArr[j][cols - j - 1 + i]) {
//                matrixArr[j][cols - j - 1 + i] += "-" + i;   
//            };
//        }
//        console.log(sum);
//        sum = 0;
//    }
//    for(i = 1; i <= (cols - 3); i++) { 
//        var p = i;
//        for(j = 0; j < cols; j++) {
//            var n = j;
//            if(!isNaN(matrixArr[j][cols - j -1 - i])) {
//                sum += matrixArr[j][cols - j -1 - i];   
//            }; 
//               
//            if(matrixArr[j][cols - j -1 - i]) {
//                matrixArr[j][cols - j -1 - i] += "+" + i;   
//            };
//        }
//        console.log(sum);
//        sum = 0;
//    }
})();


