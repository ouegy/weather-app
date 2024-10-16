import "./styles.css";
import { weather } from "./weather";
import { view } from "./view";

document.addEventListener("DOMContentLoaded", () => {
    view.loadView();
    weather.getData();
});
