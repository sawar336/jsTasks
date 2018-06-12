function sequence(start, step) {
    step = step || 1;
    var rez = start;

    return function () {
        if (rez != start) {
            return start += step;
        } else {
            rez = undefined;
            return start;
        }
    }
}

function take(x, fn) {
    fn = fn || sequence(0);
    x = x || 2;
    var rezArr = [];

    for(i = 1; i <= x; i++) {
        rezArr.push(fn());
    }

    return rezArr;
}

alert(take(5));
alert(take(5, sequence(3, -5)));