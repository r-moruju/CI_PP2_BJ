const axios = require("axios");

const options = {
  method: 'POST',
  url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
  params: {sign: 'aquarius', day: 'today'},
  headers: {
    'X-RapidAPI-Key': '934924768dmshb3321c772dbb901p1afa28jsna764ae2d255d',
    'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});