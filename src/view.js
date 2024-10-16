import { weather } from "./weather";

const view = (() => {
    function loadView() {
        const location = getLocation();
        weather.getLocationData(location).then((data) => {
            displayData(data);
        });
    }
    function getLocation() {
        const location = document.querySelector("input.location").value;
        return location;
    }
    function displayData(data) {
        const title = document.querySelector("h1#title");
        title.textContent = data.currentConditions.temp;
    }

    return { loadView };
})();

export { view };
