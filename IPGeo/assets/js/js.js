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


        display(data);
    } catch (error) {
        console.error("Fout bij het ophalen van geolocatie:", error);
    }
}

function display(data) {
    const container = document.querySelector("#Hostnaam");
    container.innerHTML = data.hostname;
}