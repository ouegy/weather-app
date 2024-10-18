import { weather } from "./weather";

const view = (() => {
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => {
            images[item.replace("./", "")] = r(item);
        });
        return images;
    }
    const images = importAll(
        require.context("./icons", false, /\.(png|jpe?g|svg)$/)
    );
    async function buildViews() {
        let location = getLocation();
        const data = await weather.getLocationData(location);
        createTodayView(data);
        createDaysView(data.days);
    }
    function getLocation() {
        let location = document.querySelector("input.location").value;
        return location;
    }
    function createTodayView(data) {
        const title = document.querySelector("h1#title");
        const temp = document.querySelector("h2#temp");
        const image = document.getElementById("icon");
        const icon = data.icon;
        const src = getImage(images, icon);

        //console.log(src);
        title.textContent = data.address;
        temp.textContent = data.temp + " °F";

        image.setAttribute("src", src);
    }
    function createDaysView(days) {
        console.log(days);
    }
    function getImage(images, icon) {
        console.log(images);
        console.log(icon);
        const index = icon + ".svg"; // this not correct
        const image = images[index];
        console.log(index);
        console.log(image);
        return image;
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

    return { buildViews, addGlobalEventListener };
})();

view.addGlobalEventListener("click", "#search", () => {
    let input = document.querySelector("input.location").value;
    console.log(input);
    view.buildViews();
});

export { view };
