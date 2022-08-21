// Wait for page to load
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("luck-api").addEventListener("click", runLuck);
});

document.getElementById("close-luck").addEventListener("click", closeLuck);
document.getElementById("luck-run").addEventListener("click", runLuckPrompt);



const options = {
	method: 'POST',
	headers: {
		'X-RapidAPI-Key': '934924768dmshb3321c772dbb901p1afa28jsna764ae2d255d',
		'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
	}
};
/*
fetch('https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=aquarius&day=today', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
*/
function runLuck() {
    document.getElementById("luck").style.display = "unset";
}

function runLuckPrompt() {
    let sign = document.getElementById("sign").value;
    fetch(`https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sign}&day=today`, options)
	.then(response => response.json())
	.then(response => document.getElementById("astro-result").innerHTML = `<p>${response.description}</p><p>Lucky number today is ${response.lucky_number}<br>And lucky time is ${response.lucky_time}</p>`)
	.catch(err => console.error(err));
}

function closeLuck() {
    document.getElementById("luck").style.display = "none";
}