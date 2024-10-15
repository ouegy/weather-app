console.log("it works");

fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=853CD7D6N7NPZHQML7FU2XQAL"
)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (err) {});
