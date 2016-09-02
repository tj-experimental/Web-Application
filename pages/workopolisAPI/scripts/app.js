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
            type: "reset"
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
        setTimeout(function(){$('#loading').hide();},1000);
    };

    return exports;

}({exports:{}});


$(function(){
    $('body').append('<img src="images/Loading_icon.gif" id="loading">');
    searchModule.loadSearchBox();
    $('#search_box').focus();
    searchModule.checkInput();
    $('.close-icon').on("click", function () {
        $(".search__result").html('');
        $('#search-val').hide();
    });
    $("#search-form").on("submit", function(event){
        event.preventDefault();
        $('#loading').show();
        var $form, $searchBox;
        var company, image, location, postDate, title, jobUrl, job = "";
        $form = $(this);
        $searchBox = $('.form__input');
        $searchBox.prop("disabled", true);
        $('.form__submit').prop("disabled", true).val("Searching.....");
        $('#search-val').show().html('Search Result for "'+ $searchBox.val()+'"');

        $.ajax({
                url: $form.attr("action"),
                method: 'GET',
                data : $form.serialize(),
                success:function (data) {
                    $(data).find("jobs").find("job").each(function(){
                        image = $(this).find("companyImageUrl").text();
                        jobUrl =  $(this).find("companyImageUrl").text();
                        title =  $(this).find("title").text();
                        company = $(this).find("company").text();
                        location = $(this).find("locations").find("a").text();
                        postDate =  $(this).find("postDate").text();

                        job  += '<div class = "job__info">' +
                            '<img src=' + image + '  alt = "Company image" class="c__image">' +
                            '<a href=' + "https://www.workopolis.com" + jobUrl + ' target="_blank">' + title + '</a>' +
                            '<p class="c__info"> Company:  ' + company + '</p>' +
                            '<p class="job__loc">Location:  ' + location + '<p>' +
                            '<p class="post__date" id="date">Posted:  ' + postDate + '</p>' +
                            '<hr>'+
                            '</div>';
                    });
                    $(".search__result").html(job);
                },
                error: function (jXHR) {

                },
                complete: function () {
                    $searchBox.prop("disabled", false);
                    $('.form__submit').prop("disabled", false).val("Search");
                    $('#loading').hide();
                }
        });

    });

});
