document.getElementById('theatre').addEventListener('change', loadTheatre);
document.getElementById('sButton').addEventListener('click', searchMovie);

function loadTheatre() {
    var theatreId = document.getElementById('theatre').value;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.finnkino.fi/xml/Schedule/', true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200) {
            xmlDoc = xhr.responseXML;
            show = xmlDoc.getElementsByTagName('Show');
            var tID = null;
            delete1();
            for (var i = 0; i < show.length; i++) {
                for (var a = 0; a < show[i].children.length; a++) {
                    var str = show[i].children[a].nodeName;
                    if (str.includes('TheatreID')) {
                        tID = show[i].children[a].innerHTML;
                        if (theatreId == tID) {
                            document.getElementById("shows").innerHTML += 
                                "<div id='frame'>"
                                + "<div id='movie'>" 
                                + moviename(i)
                                + "</div>"
                                + "<div id='img'>" 
                                + "<img src='" + image(i) +"' width='100'> </img>"
                                + "</div>"
                                + "<div id='img2'>" 
                                + "<img src='" + rating(i) +"' width='50' id='img3'> </img>"
                                + "</div>"
                                + "<div id='frameTime'>"
                                + "<div id='time'>" 
                                + "Show starts at " + startingTime(i) 
                                + "</div>"
                                + "<div id='auditorium'>" 
                                + "Auditorium: "+ auditorium(i) 
                                + "</div>"
                                + "</div>"
                                + "<div id='info'>" 
                                + "<a href='" + linkInfo(i) + "'> More info</a>" 
                                + "</div>"
                                + "</div>";
                        }
                    }
                }
            }
        }
    }
}

function searchMovie() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.finnkino.fi/xml/Schedule/', true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200) {
            xmlDoc = xhr.responseXML;
            show = xmlDoc.getElementsByTagName('Show');
            delete1();
            var userInput = document.getElementById('inputf').value.trim().toUpperCase();
            for (var a = 0; a < show.length; a++) {
                var movieName = moviename(a).toUpperCase();
                if (movieName.includes(userInput)) {
                    document.getElementById("shows").innerHTML += 
                        "<div id='frame'>"
                        + "<div id='movie'>" 
                        + moviename(a) 
                        + "</div>"
                        + "<div id='img'>" 
                        + "<img src='" + image(a) +"' width='100'> </img>"
                        + "</div>"
                        + "<div id='img2'>" 
                        + "<img src='" + rating(a) +"' width='50' id='img3'> </img>"
                        + "</div>"
                        + "<div id='frameTime'>"
                        + "<div id='time'>" 
                        + "Show starts at " + startingTime(a) 
                        + "</div>"
                        + "<div id='auditorium'>" 
                        + auditorium(a) 
                        + "</div>"
                        + "</div>"
                        + "<div id='info'>" 
                        + "<a href='" + linkInfo(a) + "'> More info</a>" 
                        + "</div>"
                        + "</div>";
                }
            }
        }
    }
}

// Rest of your code...

function delete1() {
    document.getElementById("shows").innerHTML = " ";
}
