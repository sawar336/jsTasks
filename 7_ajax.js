function ajFn(url) {
    return $.ajax({
        url: url
    });
}

$.when( 
    ajFn('a.json'),
    ajFn('b.json')
).then(
    function (aRez, bRez) {
      console.log(aRez[0].name + ' & ' + bRez[0].name);
      console.log('curent prise: ' + (+aRez[0].price + +bRez[0].price));
    }
);




