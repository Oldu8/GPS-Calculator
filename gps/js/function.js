const createForm = () => {
    const coordinatesForm = document.createElement('form');
    blockForDigits.appendChild(coordinatesForm);
    coordinatesForm.classList.add('form__digit')
    createInputs()
    createButton()
}

const createInputs =()=> {
    for (let i=0; i < 2; i++) {
    const digitName = document.createElement('h3');
    digitName.innerText = `Enter your ${i+1}st coordiante`;

    const coordinate = document.createElement('input');
    coordinate.setAttribute('name', `coordinate${i+1}`)
    coordinate.classList.add('input__digit')

    const coordinatesForm = document.querySelector('.form__digit')
    coordinatesForm.appendChild(digitName);
    coordinatesForm.appendChild(coordinate)
    }
}

const createButton =()=> {
    const button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'Calculate');
    button.classList.add('digit__button')
    blockForDigits.appendChild(button);
}

const getValues =() => {
    const coordinatesForm = document.querySelector('.form__digit');
    const coordinate1 = (coordinatesForm.coordinate1.value).split(', ');
    const coordinate2 = (coordinatesForm.coordinate2.value).split(', ');

    return {
        x1:coordinate1[0],
        y1:coordinate1[1],
        x2:coordinate2[0],
        y2:coordinate2[1] 
    }
}

function convertor (values) {
    const coordinates = {};
    for (const [key, value] of Object.entries(values)) {
        coordinates[key] = (value * Math.PI) / 180;
    }
    return coordinates;
}

function getDistance(values) {
    const gpsInRadians = convertor(values);
    console.log(JSON.stringify(values))
    const distance = 
    Math.acos(
    Math.sin(gpsInRadians.x1) *
    Math.sin(gpsInRadians.x2) + 
    Math.cos(gpsInRadians.x1) * 
    Math.cos(gpsInRadians.x2) * 
    Math.cos(gpsInRadians.y1 - gpsInRadians.y2));

    result = r * distance;
    pushResult(result)
}

function pushResult() {
    const resultHeadline = document.querySelector('.data__result')
    resultHeadline.innerText = ` ${Math.round(result)} Km`;
    showMap();
}

function showMap() {
    (document.getElementById('map').classList.remove('hidden'));
    createMap(getValues());
 } 

// Google Api block

function createMap(value){
    let options = {
        zoom: 10,
        center: {
            lat: parseInt(value.x1),
            lng: parseInt(value.y1)
        }
    }
    let map = new google.maps.Map(document.getElementById('map'), options);

    let marker1 = new google.maps.Marker ({
        position: {
            lat: parseInt(value.x1),
            lng: parseInt(value.y1)
        },
        map:map
    })
    
    let marker2 = new google.maps.Marker ({
        position: {
            lat: parseInt(value.x2),
            lng: parseInt(value.y2)
        },
        map:map
    })
}
