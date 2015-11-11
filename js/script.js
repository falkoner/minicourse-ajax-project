
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
    var address = street + ", " + city;
    var size = window.innerHeight + 'x' + window.innerWidth;

    console.log("Getting image for " + street + " in " + city + " with size " + size);

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview' +
        '?location=' + address +
        '&size=' + size;

    $('body').append('<img class="bgimg" src="' + streetviewUrl + '">');

    // get NY Times articles

    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';
    var nytimesParams = {'api-key': 'e5c35d5d0d22f92d8b4882018f059002:14:73426253',
                        'q': address,
                        'fl': 'web_url,headline,snippet',
                        'sort': 'newest'};
    $.getJSON(nytimesUrl, nytimesParams, function(data) {
        console.log(data.response);

        $nytHeaderElem.text('New York Times Articles About ' + address);

        var items = [];
        var link = "<li class='article'> <a href='%LINK%'>%TITLE%</a><p>%SNIPPET%</p></li>";
        $.each(data.response.docs, function(index, article) {

            items.push( link.replace('%TITLE%',article.headline.main)
                .replace('%LINK%',article.web_url)
                .replace('%SNIPPET%', article.snippet));
        });

        $nytElem.append(items.join(""));
    });

    return false;
}

$('#form-container').submit(loadData);

// loadData();
