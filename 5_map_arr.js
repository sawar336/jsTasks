function square(x) {
    return x * x;
}

function sum(x) {
    return x + x;
}

var arr1 = [1, 2, 5, 8],
    arr2 = [10, 17, 3, -9];

function map(arr, fn) {
    var rezArr = [];

    arr.forEach(function(item) {
        rezArr.push( fn(item) );
    });

    return rezArr;
}

alert( 'arr = ' + arr1 + ' / arrToSquare = ' + map(arr1, square) );
alert( 'arr = ' + arr2 + ' / arrToSum = ' + map(arr2, sum) );