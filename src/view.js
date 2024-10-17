import { weather } from "./weather";

const view = (() => {
    async function buildView() {
        let location = getLocation();
        const data = await weather.getLocationData(location);
        createMainView(data);
        createDaysView(data.days);
    }
    function getLocation() {
        let location = document.querySelector("input.location").value;
        return location;
    }
    function createMainView(data) {
        const title = document.querySelector("h1#title");
        const temp = document.querySelector("p#temp");
        //const desc = document.querySelector("p#desc");
        console.log(data);
        title.textContent = data.address;
        temp.textContent = data.temp;
        //desc.textContent = data.days;
    }
    function createDaysView(days) {
        console.log(days);
    }
    function addGlobalEventListener(type, selector, callback, options) {
        document.addEventListener(
            type,
            (e) => {
                if (e.target.matches(selector)) callback(e);
            },
            options
        );
    }

    return { buildView, addGlobalEventListener };
})();

view.addGlobalEventListener("click", "#search", () => {
    let input = document.querySelector("input.location").value;
    console.log(input);
    view.buildView();
});

export { view };
