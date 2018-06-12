function fibonachi(n) {
    var a = 0,
        b = 1;

    do {
        if (rez == n || n == 0) {
            return 'fib';
        }

        var rez = a + b;
        a = b;
        b = rez;
    } while(rez <= n);

    return "isn't_fib";
}


alert(fibonachi(0));
alert(fibonachi(1));
alert(fibonachi(2));
alert(fibonachi(8));
alert(fibonachi(9));
alert(fibonachi(55));
alert(fibonachi(59));


