window.addEventListener('load', () =>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/0d59ca958611ee0cbdfd165cd60e9336/${lat},${long}`;
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                const { temperature, summary, icon } = data.currently;
                // Set DOM Elements from the API
                var convertedT = Math.round((temperature - 32) / 1.8)
                temperatureDegree.textContent = convertedT;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone.replace('America', 'RD');
                // Set Icon
                setIcons(icon, document.querySelector(".icon"));
            }); 
        
        });
     
    

    }

   function setIcons(icon, iconID){
       const skycons = new Skycons({color: "white"});
       const currentIcon = icon.replace(/-/g, "_").toUpperCase();
       skycons.play();
       return skycons.set(iconID, Skycons[currentIcon]);

   }

});

