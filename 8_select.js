var d1 = $.Deferred(),
    d2 = $.Deferred(),
    s1 = document.getElementById('first'),
    rez = document.getElementById('result'),
    s2 = document.getElementById('second');

s1.onchange = function() {
    d1.resolve();
};

s2.onchange = function() {
    d2.resolve();
};

$.when(d1, d2).done(function() {
    rez.innerHTML = +s1.value + +s2.value;
})
