import { weather } from "./weather";
import moment from "moment";

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
        createWeekView(data.days, "7");
        createHourlyView(data.days);
    }
    function getLocation() {
        let location = document.querySelector("input.location").value;
        return location;
    }
    function createTodayView(data) {
        const title = document.querySelector("#title");
        const date = document.querySelector("#date");
        const temp = document.querySelector("#temp");
        const max = document.querySelector("#max");
        const min = document.querySelector("#min");
        const image = document.getElementById("icon");
        const desc = document.getElementById("desc");
        const conditions = document.getElementById("conditions");

        const icon = data.icon;
        const src = getImage(images, icon);

        date.textContent = "Today";
        title.textContent = data.address;
        temp.textContent = data.days[0].temp + " °F";
        max.textContent = "Max: " + data.days[0].tempmax + " °F";
        min.textContent = "Min: " + data.days[0].tempmin + " °F";
        desc.textContent = data.desc;
        conditions.textContent = data.conditions;

        image.setAttribute("src", src);
    }
    function createWeekView(days, number) {
        const result = days.slice(1, number);
        const week = document.querySelector("#week");
        week.replaceChildren();

        result.forEach((element) => {
            const src = getImage(images, element.icon);
            const div = document.createElement("div");
            const day = document.createElement("span");
            const date = document.createElement("span");
            const image = document.createElement("img");
            const temp = document.createElement("span");
            image.setAttribute("src", src);
            image.setAttribute("class", "icon");
            div.setAttribute("class", "week");
            day.textContent = getDay(element.datetime);
            date.textContent = formatDate(element.datetime);
            temp.textContent = element.temp + " °F";
            div.appendChild(day);
            div.appendChild(date);
            div.appendChild(image);
            div.appendChild(temp);
            week.appendChild(div);
        });
        return week;
    }
    function createHourlyView(days) {
        let result = days[0]["hours"];
        result = result.slice(4, 24);
        const hourly = document.querySelector("#hourly");
        hourly.replaceChildren();

        result.forEach((element) => {
            const src = getImage(images, element.icon);
            const div = document.createElement("div");
            const hour = document.createElement("span");
            const image = document.createElement("img");
            const temp = document.createElement("span");
            image.setAttribute("src", src);
            image.setAttribute("class", "icon");
            div.setAttribute("class", "week");
            hour.textContent = element.datetime;
            temp.textContent = element.temp + " °F";
            div.appendChild(hour);
            div.appendChild(image);
            div.appendChild(temp);
            hourly.appendChild(div);
        });
        return hourly;
    }
    function formatDate(date) {
        const d = new Date(date);
        return moment(d).format("MMM Do");
    }
    function getDay(date) {
        const d = new Date(date);
        return moment(d).format("dddd");
    }
    function getTime(day) {}
    function getImage(images, icon) {
        const index = icon + ".svg"; // this not correct
        const image = images[index];
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

view.addGlobalEventListener("click", "#search-button", (e) => {
    e.preventDefault();
    view.buildViews();
});

view.addGlobalEventListener("keyup", "#search", (e) => {
    if (e.keyCode === 13) view.buildViews();
});

export { view };
