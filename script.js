

document.getElementById('theatre').addEventListener('change', loadTheatre);

document.getElementById('sButton').addEventListener('click', searchMovie);

// This function searches for information in the selected theater and displays it in "shows" div.
function loadTheatre() {
    var theatreId = document.getElementById('theatre').value;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.finnkino.fi/xml/Schedule/', true);
    xhr.send();
    xhr.onload = function() {
        // checks if status is OK. If it is Ok then it continues..
        if (xhr.status == 200) {
            xmlDoc = xhr.responseXML;
            show = xmlDoc.getElementsByTagName('Show');
            var tID = null;
            // Delete function is used for clear "shows" div before displaying new data.
            delete1();
            for (var i = 0; i < show.length; i++) {
               for (var a = 0; a < show[i].children.length; a++) {
                   var str = show[i].children[a].nodeName;
                   if (str.includes('TheatreID')) {
                        tID = show[i].children[a].innerHTML;
                        //console.log(moviename(i));
                        // This displays matching theatres data in "shows" div.  
                        if (theatreId == tID) {
                            document.getElementById("shows").innerHTML += 
                            "<div id='frame'>"
                                +"<div id='movie'>" 
                                    + moviename(i)
                                +"</div>"
                                +"<div id='img'>" 
                                    + "<img src='" + image(i) +"' width='100'> </img>"
                                +"</div>"
                                +"<div id='img2'>" 
                                    + "<img src='" + rating(i) +"' width='50' id='img3'> </img>"
                                +"</div>"
                                +"<div id='frameTime'>"
                                    +"<div id='time'>" 
                                        + "Show stars at " + startingTime(i) 
                                    +"</div>"
                                    +"<div id='auditorium'>" 
                                        + "Auditorium: "+ auditorium(i) 
                                    +"</div>"
                                +"</div>"
                                +"<div id='info'>" 
                                        + "<a href='" + linkInfo(i) + "'> More info</a>" 
                                +"</div>"
                            +"</div>";
                       }
                   }
               }
            }
        }
         
    }
    //This function search movie name from XML data and returns it.
    function moviename(i) {
        return show[i].children[15].innerHTML;
    }
    //This function search movie image link from XML data and returns it.
    function image(i) {
        var b = null;
        var d = null;
        for (a = 0; a < show[i].children.length; a++) {
            if (show[i].children[a].nodeName.includes('Images')) {
                b = a;
                console.log(show[i].children[a].children.length);
                    for (c = 0; c < show[i].children[a].children.length; c++){
                        if (show[i].children[a].children[c].nodeName.includes('EventLargeImagePortrait')) {
                        d = c;
                        }
                    }
                }
            }
        return show[i].children[b].children[d].innerHTML;
    }
    //This function search rating image link from XML data and returns it.
    function rating(i) {
        var b = null;
            for (a = 0; a < show[i].children.length; a++) {
                if (show[i].children[a].nodeName.includes('RatingImageUrl')) {
                    b = a;
                }
             }
        return show[i].children[b].innerHTML;
    }
    //This function search movie starting time from XML data and returns it.
    function startingTime(i) {
        var b = null;
            for (a = 0; a < show[i].children.length; a++) {
                if (show[i].children[a].nodeName.includes('dttmShowStart') && !show[i].children[a].nodeName.includes('UTC')) {
                    b = a;
                }
             }
        var time = show[i].children[b].innerHTML;
        var timex = time.substr(11, 5);  
        return timex;      
    }
    //This function search movie auditorium from XML data and returns it.
    function auditorium(i) {
        var b = null;
            for (a = 0; a < show[i].children.length; a++) {
                if (show[i].children[a].nodeName.includes('TheatreAuditorium')) {
                    b = a;
                }
             }
        return show[i].children[b].innerHTML;        
    }
    //This function search link where you can get more info from movie from XML data and returns it.
    function linkInfo(i) {
        var b = null;
            for (a = 0; a < show[i].children.length; a++) {
                if (show[i].children[a].nodeName.includes('EventURL')) {
                    b = a;
                }
             }
        return show[i].children[b].innerHTML;      
    }

}


function searchMovie () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.finnkino.fi/xml/Schedule/', true);
    xhr.send();
    xhr.onload = function() {
        // checks if status is OK. If it is Ok then it continues.
        if (xhr.status == 200) {
            xmlDoc = xhr.responseXML;
            show = xmlDoc.getElementsByTagName('Show');
            // Delete function is used for clear "shows" div before displaying new data.
            delete1();
            for (var a = 0; a < show.length; a++) {
                for (var b = 0; b < show[a].children.length; b++) {
                    var movieN = show[a].children[15].innerHTML;
                    //There both movieN and data privided by user is changed to uppercase that it easier to compare.
                    var movieNa = movieN.toUpperCase();
                    if (movieNa.includes(document.getElementById('inputf').value.toUpperCase())) {
                        //This displays matching movies data in "shows" div.  
                        document.getElementById("shows").innerHTML += 
                            "<div id='frame'>"
                                +"<div id='movie'>" 
                                    + moviename(a) 
                                +"</div>"
                                +"<div id='img'>" 
                                    + "<img src='" + image(a) +"' width='100'> </img>"
                                +"</div>"
                                +"<div id='img2'>" 
                                    + "<img src='" + rating(a) +"' width='50' id='img3'> </img>"
                                +"</div>"
                                +"<div id='frameTime'>"
                                    +"<div id='time'>" 
                                        + "Show stars at " + startingTime(a) 
                                    +"</div>"
                                    +"<div id='auditorium'>" 
                                        + auditorium(a) 
                                    +"</div>"
                                +"</div>"
                                +"<div id='info'>" 
                                        + "<a href='" + linkInfo(a) + "'> More info</a>" 
                                +"</div>"
                            +"</div>";
                    }
                }
            }

        }
}
//This function search movie name from XML data and returns it.
function moviename(i) {
    return show[i].children[15].innerHTML;
}
//This function search movie image link from XML data and returns it.
function image(i) {
    var b = null;
    var d = null;
    for (a = 0; a < show[i].children.length; a++) {
        if (show[i].children[a].nodeName.includes('Images')) {
            b = a;
            console.log(show[i].children[a].children.length);
                for (c = 0; c < show[i].children[a].children.length; c++){
                    if (show[i].children[a].children[c].nodeName.includes('EventLargeImagePortrait')) {
                    d = c;
                    }
                }
            }
        }
    return show[i].children[b].children[d].innerHTML;
}
//This function search rating image link from XML data and returns it.
function rating(i) {
    var b = null;
        for (a = 0; a < show[i].children.length; a++) {
            if (show[i].children[a].nodeName.includes('RatingImageUrl')) {
                b = a;
            }
         }
    return show[i].children[b].innerHTML;
}
//This function search movie starting time from XML data and returns it.
function startingTime(i) {
    var b = null;
        for (a = 0; a < show[i].children.length; a++) {
            if (show[i].children[a].nodeName.includes('dttmShowStart') && !show[i].children[a].nodeName.includes('UTC')) {
                b = a;
            }
         }
    var time = show[i].children[b].innerHTML;
    var timex = time.substr(11, 5);  
    return timex;      
}
//This function search movie auditorium from XML data and returns it.
function auditorium(i) {
    var b = null;
        for (a = 0; a < show[i].children.length; a++) {
            if (show[i].children[a].nodeName.includes('TheatreAndAuditorium')) {
                b = a;
            }
         }
    return show[i].children[b].innerHTML;        
}
//This function search link where you can get more info from movie from XML data and returns it.
function linkInfo(i) {
    var b = null;
        for (a = 0; a < show[i].children.length; a++) {
            if (show[i].children[a].nodeName.includes('EventURL')) {
                b = a;
            }
         }
    return show[i].children[b].innerHTML;      
}


}

function delete1() {
    document.getElementById("shows").innerHTML = " ";
}