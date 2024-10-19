const weather = (() => {
    const apiKey = "853CD7D6N7NPZHQML7FU2XQAL";
    async function getLocationData(location) {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
        try {
            const response = await fetch(url, {
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            //
            const json = await response.json();
            console.log(json);
            function processData(json) {
                const data = {
                    temp: json.currentConditions.temp,
                    max: json.days[0].tempmax,
                    min: json.days[0].tempmin,
                    address: json.resolvedAddress,
                    desc: json.description,
                    icon: json.currentConditions.icon,
                    conditions: json.currentConditions.conditions,
                    days: json.days,
                    date: json.days[0].datetime,
                };
                return data;
            }
            return processData(json);
        } catch (error) {
            console.log(error.message);
        }
    }
    return { getLocationData };
})();

export { weather };
