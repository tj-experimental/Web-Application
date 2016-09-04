//Get the ul containing all students
var students = $(".student-list");
//Get the children of the ul
var studentListItems =  students[0].children;
//Get the length of the number of children (i.e Number of Students)
var studentListLength =  studentListItems.length;
//Create a div for the page number element
var $pageNumberDiv = $("<div></div>").addClass("pagination");
//Create a ul of pages
var $ul = $("<ul></ul>");
//Create an li element for each of the pages required
var li;

var link;


var $animsitionElement = $(".animsition");
// Include simple animations when transitioning between pages.
var animate = function(){
    $animsitionElement.animsition(
        {
            inClass: 'fade-in-up',
            inDuration: 200, //200 milliseconds
            outClass: "fade-in-right-sm",
            outDuration: 800, //800 milliseconds
            loading: true,
            loadingClass: 'animsition-loading',
            overlay : false,
            loadingParentElement: 'body', //animsition wrapper element
            overlayClass : 'animsition-overlay-slide',
            overlayParentElement : 'body',
            linkElement: 'li .animsition-link'
        });
};


var show = function(location, min, max){
    for (var i = min; i < max; i++){
        location[i].style.display = "block";
    }
};

var hide = function(location, min, max){
    for (var j = min; j < max; j++){
        location[j].style.display = "none";
    }
};


var changePage = function(){
    var $li = $(this);
    var $child = $li.children();
    $child.addClass("animsition-link");
    $animsitionElement.animsition('in');
    var $aTags = $li.siblings().children();
    var pageNumber = $child[0].innerText;
    var i = studentListLength - studentListLength;
    var maxStudents = parseInt(pageNumber+'0');
    var minStudents = maxStudents - 10;
    var k = studentListLength -1;

    if($aTags.hasClass("active")){
        $aTags.removeClass("active");
    }
    $child.toggleClass("active");
    if(pageNumber > 0){
        $(".animsition").animsition('in');
        //hide(studentListItems, i, minStudents);
        while(i < minStudents){
            studentListItems[i].style.display = "none";
            i++;
        }
        for(var j = minStudents; j < maxStudents; j++){
            studentListItems[j].style.display = "block";
            if(j == k+1){
                break;
            }
        }
        //hide(studentListItems,maxStudents, k);
        while(maxStudents <= k){
            studentListItems[k].style.display = "none";
            k--;
        }
    }else{
        //Report Error Page Not found
    }
};


var createLink = function(link){
    $.each(link, function(index){
        var lengthOfPages = this.parentNode.children.length;
        if (lengthOfPages > 1){
            //Bind event handler to all the list items
            $(this).bind("click",changePage);
            //Always append the active class to the 1st page on load
            if (index == 0){
                $(this).append($("<a>").addClass("active animsition-link").text(index+1)
                    .attr("href","#"));
            }
            //Append the a to each li in the unordered list
            else{
                $(this).append($("<a>").text(index+1).attr("href","#"));
            }

        }else{
            //Append the a link and make it disabled and the cursor to not-allowed
            $(this).append($("<a>").text(index+1).prop("data-role", "disabled"));
            $(this).children().css("cursor","not-allowed");
        }
    });
};


//Append the total number of li tags to the ul with the total number of pages
//Append the ul to the pagination div
var pages = function(numberOfPages) {
    var li = "<li></li>";
    for (var i=1; i<numberOfPages; i++){
        li += "<li></li>";
    }
    return li;
};

// dynamically filter the student listings.
// In other words, after each letter is typed into the search box,
// display any listings that match .
//when the user click on it
//Search the list of Students and be case insensitive
//Search should be done by name and email-address
//Add partial matches like 'a' should return all
// Students with names with a
//Search results should also be paginated if it exceeds 10 matches
//If no matches are found include include a message in the HTML
// to tell the user there are no matches.

var searchPagination;
searchPagination = function () {
    //Gets the total number of visible li's after the search
    var pageNumber;
    var visibleStudents = $('.student-list').children('li:visible');
    //Get the total number of pages needed for the search
    var searchPages = parseInt(Math.ceil(visibleStudents.length / 10));
    //Add the student not found p tag
    var $studentNotFound = $('<p id="notFound" style="color:red">Student Not Found </p>');
    //Get the pagination li's with the pageNumbers
    pageNumber = $('.pagination').find("ul").children();
    //Hide the pageNumbers that aren't needed. from 0 index
    hide(pageNumber, searchPages, pageNumber.length);
    var $notFound = $('#notFound');
    //Check if the total number of visibleStudents is greater than 10
    if (visibleStudents.length > 10) {
        //If the p tag #notFound present on the page remove it
        if ($notFound != undefined || $notFound != null) {
            $notFound.remove();
        }
        //Show only the first 10 students of the search result
        show(visibleStudents, 0, 10);
        //Hide the next total students greater than 10
        hide(visibleStudents, 10, visibleStudents.length);
        //hide the previous 10 Students if available to show only 10
        hide(pageNumber, searchPages, pageNumber.length);
        //display the pages that are needed
        for (var i = 0; i < searchPages; i++) {
            pageNumber[i].style.display = "inline-block";
        }
        //unbind the click to that displayed element
        $.each(pageNumber, function () {
            $(this).unbind('click', changePage);
            //Add an on click function to the element
            $(this).on("click", function (e) {
                //Get the page value of the click li
                var pageValue;
                pageValue = this.innerText;
                if (pageValue > 0) {
                    //Check if the page value is greater than 0
                    //Store the max number of students to display
                    var max = parseInt(pageValue + '0');
                    //Store the min number of students to display
                    var min = max - 10;
                    //if the max is greater than the total number of visible students
                    if (max > visibleStudents.length) {
                        //set the max to the visibleStudents length
                        max = visibleStudents.length;
                    }
                    //Hide the visible students from beginning to the min
                    hide(visibleStudents, 0, min);
                    //show the students from the current min and to the max
                    show(visibleStudents, min, max);
                    //Hide the students that are greater than the max
                    hide(visibleStudents, max, visibleStudents.length);
                    //Remove the active class from all the pages
                    pageNumber.children().removeClass("active");
                    //Add the active class to the current page number
                    $(this).children().addClass('active');
                    //preventDefault behaviour
                    e.preventDefault();
                }
            })
        })
    } else if (visibleStudents.length == 0) {
        //Else if the there are no results found in the list of students
        if ($notFound.length == 0) {
            //Add the $studentNotFound object before the pagination div
            $(".pagination").before($studentNotFound);
        }
    } else {
        pageNumber.css('display', "none");
        //Remove the student notFound p element if it exist on the page
        if ($notFound != undefined || $notFound != null) {
            $notFound.remove();
        }
    }
};


//To implement
//Add Student Search
var studentDetails = $('.student-details');
var $searchBox = $('.student-search input');
//Add Event listener to the Search box
// As the user types in the search box,
$searchBox.on("change keyup", function () {
    //Get the pagination li's with the pageNumbers
    var pageNumber = $('.pagination').find("ul").children();
    //Select the first page number in the pagination ul li's
    var firstPage = $('.animsition-link')[0];
    //Remove the active class from all the pages
    pageNumber.children().removeClass("active");
    var box =   $(this)[0];
    var $notFound = $('#notFound');
    var filter = $(this).val();
    if(filter !== "") {
        box.style.border = "none";
        //Remove the active class of all children li's
        pageNumber.children().removeClass("active");
        $(studentDetails).find("span:not(:contains(" + filter + "))").parent().parent().css("display","none");
        $(studentDetails).find("h3:not(:contains(" + filter + "))").parent().parent().css("display","none");
        $(studentDetails).find("h3:contains(" + filter + ")").parent().parent().css("display","block");
        $(studentDetails).find("span:contains(" + filter + ")").parent().parent().css("display","block");
        firstPage.className += " active";
        searchPagination();
    } else {
        box.style.border = "2px solid red";
        //Remove the active class of all children li's
        pageNumber.children().removeClass("active");
        //If the p tag #notFound present on the page remove it
        if($notFound != undefined || $notFound != null ){
            $('#notFound').remove();
        }
        firstPage.className += " active";
        var page = firstPage.innerText;
        var currentPage = parseInt(page + '0');
        hide(studentListItems, 0, studentListLength);
        show(studentListItems, currentPage - 10, currentPage );
        for (var j = 0; j < pageNumber.length; j++){
            pageNumber[j].style.display = "inline-block";
            pageNumber.unbind("click");
            pageNumber.bind("click",changePage);
        }
    }
}).on("blur", function() {
    $(this)[0].style.border= "";
});


$('.student-search button').on("click", function(){
    searchBox.trigger( "change" );
});


$(function(){
    //Check if the number of students exceed 10
    //If total number of students greater than 10
    //Display only 10 students once the page loads
    //Hide other students on the page
    var li;
    if (studentListLength > 10){
        for (var i=10; i < studentListLength; i++){
            studentListItems[i].style.display = "none";
        }
        //Calculate the number of pages that will be needed and store the count of the number of pages rounding the number up
        //In multiples of 10
        var numberOfPages = Math.ceil(studentListLength/10);
        //Pass the Information to pages function which returns total number of li needed
        li = pages(numberOfPages);
        //Append the total number of Needed PAges to the ul
        $ul.append(li);
        //Append the ul to the pagination div
        $pageNumberDiv.append($ul);
        //Append the div to the students-list ul
        students.append($pageNumberDiv);
        //Create a link to navigate between the pages available
        link = $('.pagination')[0].children[0].children;
        createLink(link);
    }else {
        //else if the total number of students less than 10
        //Display just 1 page with pagination div, ul 1 li item
        li = "<li></li>";
        $ul.append(li);
        $pageNumberDiv.append($ul);
        $(".student-list").append($pageNumberDiv);
        link = $('.pagination')[0].children[0].children;
        createLink(link);
    }
    animate();
});
