import { weather } from "./weather";

const view = (() => {
    function loadView() {
        console.log("load view");
        const location = getLocation();
        console.log(
            weather.getLocationData(location).then((data) => {
                console.log("display data method");
                const title = document.querySelector("h1#title");
                title.textContent = data.resolvedAddress;
            })
        );
    }
    function getLocation() {
        const location = document.querySelector("input.location").value;
        return location;
    }

    return { loadView };
})();

export { view };
