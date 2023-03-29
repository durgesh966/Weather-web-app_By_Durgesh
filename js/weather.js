const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const discription = document.getElementById('discription');
// const datahide = document.getElementById('datahide');
const datahide = document.querySelector('.middle_layer');
const wind = document.getElementById('wind_speed');

function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

window.onload = function() {
    var now = new Date();
    var strDateTime = [[AddZero(now.getDate()), 
        AddZero(now.getMonth() + 1), 
        now.getFullYear()].join("/"), 
        [AddZero(now.getHours()), 
        AddZero(now.getMinutes())].join(":"), 
        now.getHours() >= 12 ? "PM" : "AM"].join(" ");
    document.getElementById("date").innerHTML =  strDateTime;
};

//-------- getting weather info fron api
const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add("data_hide");
    } else {
         try {
         let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=7e2b80de7a202ea503bd25ff5e78ad12`
            const response = await fetch(url);

            const data = await response.json();
            const arrData = [data];
            
            discription.innerText = arrData[0].weather[0].description;
            wind.innerText = arrData[0].wind.speed;

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood);

            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";
            }
            datahide.classList.remove('data_hide');
            cityVal = "";
         } catch {
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText = `please enter the proper city name`;
            console.log('please add the proper city name');
        }

    }
}

submitBtn.addEventListener('click', getInfo);