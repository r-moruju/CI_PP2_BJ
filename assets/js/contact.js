let response = document.getElementById("response");
let responseMessage = document.getElementById("response-message");
let close = document.getElementsByClassName("close")[0];

close.addEventListener("click", closeModal);


(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init('f7Jb5kjzdhjwsKmjT');
})();

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // these IDs from the previous steps
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

function closeModal() {
    response.style.display = "none";
}