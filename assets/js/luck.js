const options = {
	method: 'POST',
	headers: {
		'X-RapidAPI-Key': '934924768dmshb3321c772dbb901p1afa28jsna764ae2d255d',
		'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
	}
};

fetch('https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=aquarius&day=today', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));