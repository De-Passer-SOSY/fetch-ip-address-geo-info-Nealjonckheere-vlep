"use strict"


document.addEventListener("DOMContentLoaded", init)

function init(){
    document.querySelector("#IPHaler").addEventListener('click', fetchIP, ExtraInfo)
    fetchIP()
    ExtraInfo()



}




async function fetchIP(){
    try{
        let response = await fetch('https://api.ipify.org/?format=json')
        let data = await response.json();
        changeIP(data);
    }
    catch(error){

        console.log("fout  bij het laden", error)
    }
}

function changeIP(data) {
    const container = document.querySelector("#IPContainer")

    container.innerHTML = data.ip;
}




async function ExtraInfo () {

    try {
        let ipResponse = await fetch("https://api.ipify.org/?format=json");
        let ipData = await ipResponse.json();
        let id = ipData.ip;

        let geoResponse = await fetch(`https://ipinfo.io/${id}/geo`);
        let data = await geoResponse.json();


        ipdisplay(data);
        Staddisplay(data);
        RegioDisplay(data);
        LandDisplay(data);
        LocationDisplay(data);
    } catch (error) {
        console.error("Fout bij het ophalen van geolocatie:", error);
    }
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