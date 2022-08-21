// Wait for page to load
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("luck-api").addEventListener("click", runLuck);
});

// Add listeners
document.getElementById("close-luck").addEventListener("click", closeLuck);
document.getElementById("luck-run").addEventListener("click", runLuckPrompt);


// Get Astro API
const options = {
	method: 'POST',
	headers: {
		'X-RapidAPI-Key': '934924768dmshb3321c772dbb901p1afa28jsna764ae2d255d',
		'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
	}
};

/**
 * Display Luck modal
 */
function runLuck() {
    document.getElementById("luck").style.display = "unset";
}

/**
 * Fetch Astro daily horoscope according to the user's selection.
 * Populate the content of the modal
 */
function runLuckPrompt() {
    let sign = document.getElementById("sign").value;
    fetch(`https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sign}&day=today`, options)
	.then(response => response.json())
	.then(response => document.getElementById("astro-result").innerHTML = `<p>${response.description}</p><p>Lucky number today is ${response.lucky_number}<br>And lucky time is ${response.lucky_time}</p>`)
	.catch(err => console.error(err));
}

/**
 * Hide Luck modal
 */
function closeLuck() {
    document.getElementById("luck").style.display = "none";
}