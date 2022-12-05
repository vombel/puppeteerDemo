const axios = require("axios");
const request = require("request");
const http = require("http");

http.get('www.google.com', function (res) {

})


http.request({
    method:'POST',
    hostname: 'www.google.com',
    port: 3000,
},(res) => {

})

async function getimages() {
   const imgArray= document.querySelectorAll('#image p>a')
   console.log(imgArray.length);
}