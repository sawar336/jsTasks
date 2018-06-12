function sequence(start, step) {
    step = step || 1;
    start = start || 0;
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

generator = sequence(4);
console.log(generator());
console.log(generator());

generator2 = sequence(10, 5);
console.log(generator2());
console.log(generator2());

