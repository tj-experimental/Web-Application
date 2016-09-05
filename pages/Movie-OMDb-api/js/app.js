var $searchTitle = $('#search');
var $searchYear =  $('#year');
var $searchForm = $('form');


var showSearchResult = function () {
    $('#movie-description').remove();
    $('.main-content').show();
};

var getMovie;
getMovie = function (element) {
    var $liItem = element;
    var movieInfo = "";
    if (!$liItem.hasClass("no-movies")) {
        var query = {
            i: $liItem.children('.imdbID').text(),
            r: "json"
        };
        $.ajax({
            url: $searchForm.attr("action"),
            method: $searchForm.attr("method"),
            data: $.param(query),
            dataType:'json',
            success: function (movie) {
                console.log(movie);
                $('.main-content').hide();
                movieInfo += '<div id="movie-description">';
                movieInfo += '<div id="movie-header">';
                movieInfo += '<button onclick="showSearchResult()" id="back-search">Search results</button>';
                if(movie.Poster === 'N/A') {
                    movieInfo += '<i class="material-icons poster-placeholder">crop_original</i>';
                }else {
                    movieInfo += '<img src='+ movie.Poster +' class="movie-poster-large" alt="movie-image">';
                }
                movieInfo += '<h2>'+ movie.Title +' ('+ movie.Year +')</h2>';
                movieInfo += '<span>IMDB Rating: '+ movie.imdbRating +'</span><br>';
                movieInfo += '<span>Genre:'+ movie.Genre +'  ,Rated: '+ movie.Rated+' </span><br>';
                movieInfo += '<span>Actors: '+movie.Actors+'</span></div><br>';
                movieInfo += '<div id="plot"><h3> Plot Synopsis:</h3>';
                movieInfo += '<p id="plot-description">'+movie.Plot+'<p>';
                movieInfo += '<a id="view-movie" href="http://www.imdb.com/title/'+ query.i +'">View on IMDB</a>';
                movieInfo += '</div>';

                if ($('#movie-description').length != 0) {
                    $('#movie-description').remove();
                } else {
                    $('body').append(movieInfo);
                }
            },
            error: function (jXHR) {

            },
            complete: function () {

            }

        })
    }
};


$(function () {
    $searchTitle.attr("name","s");
    $searchYear.attr("name", "y");

    $searchForm.attr({
        action: "https://www.omdbapi.com/?callback=?",
        method: "get"
    });



    $searchForm.submit(function(event){
        var movieItem = "";
        var query = $(this).serialize();
        var $moviesUl = $('#movies');
        showSearchResult();
        event.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            method: $(this).attr('method'),
            data: query,
            dataType: 'json',
            success: function (movies) {
                console.log(movies);
                if (movies.Response === "False" ){
                    movieItem += "<li class='no-movies'>";
                    movieItem += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: "+ $searchTitle.val() +".";
                    movieItem  += '</li>';
                    $moviesUl.html(movieItem);
                }else {
                    $.each(movies.Search, function (index, movie) {
                        movieItem += '<li onclick="getMovie($(this))"><div class="poster-wrap">';
                        if(movie.Poster === 'N/A'){
                            movieItem += '<i class="material-icons poster-placeholder">crop_original</i></div>';
                        }else{
                            movieItem += '<img class="movie-poster" src='+movie.Poster +'></div>';
                        }
                        movieItem += '<span class="movie-title">'+ movie.Title+'</span>';
                        movieItem += '<span class="movie-year">'+ movie.Year+'</span>';
                        movieItem += '<span class="imdbID" style="display: none">'+ movie.imdbID +'</span></li>';

                    });
                    $moviesUl.html(movieItem);
                }
            },
            error: function(jXHR){

            },
            complete: function(){

            }
        });

    });

    // $(window)[0].onpopstate = function(event, data){
    //     event.preventDefault();
    //     console.log(event, data);
    // };

});
