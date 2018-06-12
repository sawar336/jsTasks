function factorial(x) {
    if (x > 1) {
        return x * factorial(x - 1);
    } else {
        return 1;
    }
};

console.log(factorial(3));
console.log(factorial(5));
console.log(factorial(7));
console.log(factorial(9));