let citesData = [{
        "id": 707860,
        "name": "Hurzuf",
        "country": "UA",
        "coord": {
            "lon": 34.283333,
            "lat": 44.549999
        }
    },
    {
        "id": 519188,
        "name": "Novinki",
        "country": "RU",
        "coord": {
            "lon": 37.666668,
            "lat": 55.683334
        }
    },
    {
        "id": 1283378,
        "name": "Gorkhā",
        "country": "NP",
        "coord": {
            "lon": 84.633331,
            "lat": 28
        }
    },
    {
        "id": 1270260,
        "name": "State of Haryāna",
        "country": "IN",
        "coord": {
            "lon": 76,
            "lat": 29
        }
    },
    {
        "id": 708546,
        "name": "Holubynka",
        "country": "UA",
        "coord": {
            "lon": 33.900002,
            "lat": 44.599998
        }
    },
    {
        "id": 1283710,
        "name": "Bāgmatī Zone",
        "country": "NP",
        "coord": {
            "lon": 85.416664,
            "lat": 28
        }
    },
    {
        "id": 529334,
        "name": "Mar’ina Roshcha",
        "country": "RU",
        "coord": {
            "lon": 37.611111,
            "lat": 55.796391
        }
    },
    {
        "id": 1269750,
        "name": "Republic of India",
        "country": "IN",
        "coord": {
            "lon": 77,
            "lat": 20
        }
    },
    {
        "id": 1283240,
        "name": "Kathmandu",
        "country": "NP",
        "coord": {
            "lon": 85.316666,
            "lat": 27.716667
        }
    },
    {
        "id": 703363,
        "name": "Laspi",
        "country": "UA",
        "coord": {
            "lon": 33.733334,
            "lat": 44.416668
        }
    }
];


function createListElement(city){
    let listElement = document.createElement('li');
    listElement.setAttribute('class','city');
    listElement.appendChild(getButton(city));
    return listElement;
}

function getButton(city){
    let button = document.createElement('button');
    button.setAttribute('class','btn btn-primary');
    button.setAttribute('type','button');
    button.setAttribute('data-toggle','collapse');
    let cityName = formCityName(city);
    button.setAttribute('data-target','#'+cityName);
    button.innerHTML=city;
    return button;
}

function createTable(cityWeatherData){
    let table = document.createElement('table');
    table.appendChild(createTableHeader());
    table.appendChild(createRow('Sky Status',cityWeatherData.weather[0].main));
    table.appendChild(createRow('Sky Description',cityWeatherData.weather[0].description));
    table.appendChild(createRow('Current Temperature', cityWeatherData.main.temp));
    table.appendChild(createRow('MIN Temperature',cityWeatherData.main.temp_min));
    table.appendChild(createRow('MAX Temperature',cityWeatherData.main.temp_max));
    table.appendChild(createRow('Humidity', cityWeatherData.main.humidity));
    table.appendChild(createRow('Wind Speed',cityWeatherData.wind.spped));
    table.appendChild(createRow('Wind Direction', cityWeatherData.wind.deg));
    return table;
}

function createRow(label,value){
    let row = document.createElement('tr');
    row.appendChild(createColumn(label));
    row.appendChild(createColumn(value));
    return row;
}

function createColumn(data){
    let column = document.createElement('td');
    column.innerHTML = data;
    return column;
}

function createTableHeader(){
    let row = document.createElement('tr');
    let header = document.createElement('th');
    header.setAttribute('colspan',2);
    header.innerHTML='Detailed Information';
    row.appendChild(header);
    return row;
}

function dataTargetDivision(cityWeatherData){
    let div = document.createElement('div');
    div.setAttribute('class','collapse');
    let city = formCityName(cityWeatherData.name);
    div.setAttribute('id',city);
    div.appendChild(createTable(cityWeatherData));
    return div;
}

function formCityName(city){
    let words = city.split(' ');
    let cityName = words.join('_');
    return cityName;
}

function getData() {
    let http = new XMLHttpRequest();
    let ids = citesData.map(cityData => cityData.id).join(',');
    const APPID = 'ecaa3f6b3b8983488e2ecbb8480ce808';
    let weatherData;
    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            weatherData = JSON.parse(http.responseText);
            let unOrderdListElement = document.getElementById('citylist');
            weatherData.list.forEach(cityWeatherData => {
                let listElement = createListElement(cityWeatherData.name);
                unOrderdListElement.appendChild(listElement);
                console.log(cityWeatherData);
                let dataDivision  = (dataTargetDivision(cityWeatherData));
                listElement.appendChild(dataDivision);
            });
        }
    }

    http.open('GET', 'http://api.openweathermap.org/data/2.5/group?id='+ ids +'&units=metric&APPID='+ APPID, true);
    http.send();
}
