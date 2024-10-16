///import { weather } from "./weather";

const view = (() => {
    function loadView() {
        console.log("load view");
        //console.log(weather);
    }
    return { loadView };
})();

export { view };
