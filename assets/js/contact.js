let response = document.getElementById("response");
let responseMessage = document.getElementById("response-message");
let close = document.getElementsByClassName("close")[0];

close.addEventListener("click", closeModal);

//Emailjs code
(function() {
    // Connect with emailjs
    emailjs.init('f7Jb5kjzdhjwsKmjT');
})();
window.onload = function() {
    // Add event listener on window load
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // Connect with emailjs related service
        emailjs.sendForm('service_9hcybw3', 'contact_form', this)
            .then(function() {
                // Reset the form
                resetForm();
                console.log('SUCCESS!');
                // Display modal
                response.style.display = "unset";
                responseMessage.innerText = "Your message has been sent";
            }, function(error) {
                // Reset the form
                resetForm();
                console.log('FAILED...', error);
                // Display modal
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

/**
 * Reset the Form
 */
function resetForm () {
    document.getElementById("contact-form").reset();
}