/*After the page loads, the following function will be run.*/
window.addEventListener('load', () => {
    var long;
    var lat;
    var temperatureDescription = document.querySelector('.temperature-description');
    var temperatureDegree = document.querySelector('.temperature-degree');
    var locationTimezone = document.querySelector('.location-timezone');
    var temperatureSection = document.querySelector('.temperature')
    var temperatureSpan = document.querySelector('.temperature span')
/*If these exist. Will ask for permission*/
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            long = position.coords.longitude
            lat = position.coords.latitude
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            //api doesn't support local server, so proxy bypasses this restriction
            const api = `${proxy}https://api.darksky.net/forecast/d6427860fbe962a70fc66b4d784e0fe7/${lat},${long}`;
            
            fetch(api) /*get info from server then once getting it do smth */
            .then(data => { /*concert info to json*/
                return data.json()
            })
            .then(data => {
                console.log(data)
                const {temperature, summary, icon} = data.currently;
                /*pulls temperature out of currently*/
                temperatureDegree.textContent = temperature
                temperatureDescription.textContent = summary
                locationTimezone.textContent = data.timezone
                //formula for celcius
                let celcius = (temperature -32) * (5/9);
                //set icon 
                setIcons(icon, document.querySelector('.icon'))
                
                //Change temperature to Celcius/Faranheit
                temperatureSection.addEventListener("click", () => {
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celcius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature
                    }
                });
            });
        });
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        /*look for every line and replace with _ as in documentation , the api and 
        skycons differ in this only and in case */
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }
});