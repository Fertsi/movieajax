var shows;

document.getElementById('theatre').addEventListener('change', loadTheatre);
document.getElementById('sButton').addEventListener('click', searchMovie);

function loadTheatre() {
    var theatreId = document.getElementById('theatre').value;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.finnkino.fi/xml/Schedule/', true);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            xmlDoc = xhr.responseXML;
            shows = xmlDoc.getElementsByTagName('Show');
            delete1();
            for (var i = 0; i < shows.length; i++) {
                var theaterId = shows[i].getElementsByTagName('TheatreID')[0].textContent;
                if (theaterId === theatreId) {
                    displayMovieInfo(i);
                }
            }
        }
    }
}

function searchMovie() {
    var keyword = document.getElementById('inputf').value.trim().toUpperCase();
    var selectedTheater = document.getElementById('theatre').value;
    
    delete1();
    
    for (var i = 0; i < shows.length; i++) {
        var movieTitle = shows[i].getElementsByTagName('Title')[0].textContent.toUpperCase();
        var theaterId = shows[i].getElementsByTagName('TheatreID')[0].textContent;
        
        if (movieTitle.includes(keyword) && theaterId === selectedTheater) {
            displayMovieInfo(i);
        }
    }
}


function displayMovieInfo(i) {
    document.getElementById("shows").innerHTML +=
        "<div id='frame'>"
        + "<div id='movie'>"
        + shows[i].getElementsByTagName('Title')[0].textContent
        + "</div>"
        + "<div id='img'>"
        + "<img src='" + shows[i].getElementsByTagName('EventLargeImagePortrait')[0].textContent + "' width='100'> </img>"
        + "</div>"
        + "<div id='img2'>"
        + "<img src='" + shows[i].getElementsByTagName('RatingImageUrl')[0].textContent + "' width='50' id='img3'> </img>"
        + "</div>"
        + "<div id='frameTime'>"
        + "<div id='time'>"
        + "Show starts at " + shows[i].getElementsByTagName('dttmShowStart')[0].textContent.substr(11, 5)
        + "</div>"
        + "<div id='auditorium'>"
        + "Auditorium: " + shows[i].getElementsByTagName('TheatreAuditorium')[0].textContent
        + "</div>"
        + "</div>"
        + "<div id='info'>"
        + "<a href='" + shows[i].getElementsByTagName('EventURL')[0].textContent + "'> More info</a>"
        + "</div>"
        + "</div>";
}

function delete1() {
    document.getElementById("shows").innerHTML = " ";
}
