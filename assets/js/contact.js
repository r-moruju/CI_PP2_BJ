let response = document.getElementById("response");
let responseMessage = document.getElementById("response-message");
let close = document.getElementsByClassName("close")[0];

close.addEventListener("click", closeModal);

//Emailjs code
(function() {
    emailjs.init('f7Jb5kjzdhjwsKmjT');
})();
window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm('service_9hcybw3', 'contact_form', this)
            .then(function() {
                console.log('SUCCESS!');
                response.style.display = "unset";
                responseMessage.innerText = "Your message has been sent";
            }, function(error) {
                console.log('FAILED...', error);
                response.style.display = "unset";
                responseMessage.innerText = "Message sent fail";
            });
    });
}

/**
 * Close Modal window
 */
function closeModal() {
    response.style.display = "none";
}