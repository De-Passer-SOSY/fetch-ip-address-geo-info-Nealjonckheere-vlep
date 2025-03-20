"use strict"


document.addEventListener("DOMContentLoaded", init)

function init(){
    document.querySelector("#IPHaler").addEventListener('click', fetchIP)

}




async function fetchIP() {
    try {
        let response = await fetch('https://api.ipify.org/?format=json');
        let data = await response.json();
        let ip = data.ip;

        document.querySelector("#IPContainer").innerText = ip;

        let geoResponse = await fetch(`https://ipinfo.io/${ip}/geo`);
        let geoData = await geoResponse.json();

        displayGeoInfo(geoData);
        Coordinaten(geoData);

    } catch (error) {
        console.error("Fout bij het ophalen van gegevens:", error);
    }
}

async function Coordinaten (geoData){
    try {

        ZoekData(geoData.city, geoData.region);


    } catch (error) {
        console.error("Fout bij het ophalen van gegevens:", error);
    }
}

async function ZoekData(city, region) {
    try {
        let cordResponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${city},${region}&format=json`);
        let cordData = await cordResponse.json();


        WeerDisplay(cordData);

        if (cordData.length > 0) {
            let locatie = cordData[0];
            latitude(locatie);
            longitude(locatie);
        } else {
            console.error("Geen coördinaten gevonden.");
        }

    } catch (error) {
        console.error("Fout bij het ophalen van gegevens:", error);
    }
}


async function WeerDisplay (cordData) {
    let weerdisplay = await fetch(`https://api.open-meteo.com/v1/forecast?
    latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,rain&forecast_days=1`)
    let Weerdata = await weerdisplay.json();

    WeerDisplayInfo(Weerdata);
}


function WeerDisplayInfo (Weerdata) {
    DisplayTemperatuur(Weerdata);
    DisplayWindsnelheid(Weerdata);
    DisplayRegen(Weerdata);


}


function displayGeoInfo(data) {
    ipdisplay(data);
    Staddisplay(data);
    RegioDisplay(data);
    LandDisplay(data);
    LocationDisplay(data);
}




function ipdisplay(data) {
    const container = document.querySelector("#Ip");
    container.innerHTML = data.ip;

}

function Staddisplay(data){
    const container = document.querySelector("#Stad");

    container.innerHTML = data.city;

}

function RegioDisplay(data){
    const container = document.querySelector("#Regio");

    container.innerHTML = data.region;

}

function LandDisplay(data){
    const container = document.querySelector("#Land");

    container.innerHTML = data.country;

}

function LocationDisplay(data){
    const container = document.querySelector("#Loc");

    container.innerHTML = data.loc;

}


function latitude (cordData){
    const container = document.querySelector("#Latitude");
    container.innerHTML = cordData.lat;
}

function longitude (cordData){
    const container = document.querySelector("#Longitude");
    container.innerHTML = cordData.lon;
}

function DisplayTemperatuur(Weerdata) {
    const container = document.querySelector("#Temperature");

    container.innerHTML = Weerdata.temperature_2m;
}


function DisplayWindsnelheid(Weerdata){
    const container = document.querySelector("#Weather");

    container.innerHTML = Weerdata.wind_speed_10m;
}

function DisplayRegen(Weerdata){
    const container = document.querySelector("#Regen");

    container.innerHTML = Weerdata.rain
}