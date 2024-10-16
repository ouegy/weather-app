import { view } from "./view";

const weather = (() => {
    async function getData() {
        const url =
            "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=853CD7D6N7NPZHQML7FU2XQAL";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            //
            const json = await response.json();
            console.log(json);
            function processData(data) {
                let address = data.address;
                console.log(address);
                return { address };
            }
            processData(json);
            return json;
        } catch (error) {
            console.log(error.message);
        }
    }
    function displayData() {
        console.log(address);
    }
    return { getData, displayData };
})();

export { weather };
