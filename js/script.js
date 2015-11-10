
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var street = $('#street').val();
    var city = $('#city').val();

    var size = window.innerHeight + 'x' + window.innerWidth;

    console.log("Getting image for " + street + " in " + city + "with size " + size);

    var url = 'https://maps.googleapis.com/maps/api/streetview' +
        '?location=' + street + ' ' + city +
        '&size=' + size;

    $('body').append('<img class="bgimg" src="' + url + '">');

    return false;
};

$('#form-container').submit(loadData);

// loadData();
