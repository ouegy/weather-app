const weather = (() => {
    async function getLocationData(location) {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=853CD7D6N7NPZHQML7FU2XQAL`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            //
            const json = await response.json();
            return json;
        } catch (error) {
            console.log(error.message);
        }
    }

    return { getLocationData };
})();

export { weather };
