var searchModule;
searchModule = function (parameters) {
    var exports = parameters.exports;
    exports.checkInput = function () {
      $('.form__input').on("change keyup blur input",function(){
          var isIE = function () {
              var userAgent = navigator.userAgent;
              return userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge/") > -1;
          };
          if(isIE()){
              $('.close-icon').css("display", "none");
          }
          if ($(this).val() !== '' && $('#search_box').val().length > 0) {
              $('.form__submit').prop("disabled", false);
          } else {
              $('.form__submit').prop("disabled", true);
          }
      });
    };


    exports.loadSearchBox = function () {
        var $form;
        var $label;
        var $searchBox;
        var $submit;
        var $div;
        var $button;
        $form = $('<form>').attr({
            name: "searchForm",
            method: "get",
            id: "search-form",
            action: "https://www.workopolis.com/jobsearch/api/jobs/search",
            class: "form search--form",
            encoding: "text/plain"
        }).prop({"accept-charset":"utf-8" }).attr("enctype","text/plain");
        $label = $('<label>').attr({for:"search_box"}).prop("innerText","Keyword");
        $searchBox = $('<input>').attr({
            type: "text",
            name: "keyword",
            id: "search_box",
            maxlength: 50,
            class: "form__input",
            placeholder: "Search Jobs",
            spellcheck: false,
            required: true
        });
        $button = $('<button>').attr({
            class:"close-icon",
            type: "reset",
        }).css("display", "hidden");
        $submit = $('<input>').attr({
            type: "submit",
            class: "form__submit",
            value: "Search"
        }).prop({disabled: true});
        $form.append($label, $searchBox, $button, $submit);
        $div = $('<div>').attr({
            class: "search__result"
        });
        $("main").append($form,'<span id="search-val"></span><br><hr>',  $div);
    };

    return exports;

}({exports:{}});


$(function(){
    searchModule.loadSearchBox();
    $('#search_box').focus();
    searchModule.checkInput();
    $('.close-icon').on("click", function () {
        $('.search__result').children().remove();
        $('#search-val').hide();
    });
    $('#search-form').on("submit", function(event){
        event.preventDefault();
        var $form, url, method, xml, x, i, $input, $searchResult;
        var company, image, location, postDate, title, jobUrl, job = "";
        $searchResult = $('.search__result');
        $input = $('.form__input');
        $form = $(this);
        url = $form.attr("action") + '/'+ $form.serialize();
        method = $form.attr('method').toUpperCase();
        $('#search-val').show();
        $('#search-val').html('Search Result for "'+ $input.val()+'"');
        var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        xml = xhr.responseXML;
                        x = xml.getElementsByTagName("job");
                        for (i = 0; i < x.length; i++) {
                            company = x[i].childNodes[1].textContent;
                            image = x[i].childNodes[2].textContent;
                            location = x[i].childNodes[10].childNodes[0].textContent;
                            postDate = x[i].childNodes[11].textContent;
                            title = x[i].childNodes[13].textContent;
                            jobUrl = x[i].childNodes[9].textContent;
                            job  += '<div class = "job__info">' +
                                '<img src=' + image + '  alt = "Company image" class="c__image">' +
                                '<a href=' + "https://www.workopolis.com" + jobUrl + ' target="__blank">' + title + '</a>' +
                                '<p class="c__info"> Company:  ' + company + '</p>' +
                                '<p class="job__loc">Location:  ' + location + '<p>' +
                                '<p class="post__date" id="date">Posted:  ' + postDate + '</p>' +
                                '<hr>'+
                                '</div>';
                        }
                        $searchResult.html(job);
                    }
                    else{
                        alert(xhr.statusText);
                    }
                }
            };
            xhr.open(method, url , true);
            xhr.send();
    });

});
