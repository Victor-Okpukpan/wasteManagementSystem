const contactForm = document.querySelector("#contact-form");

function sendPersonalMail(e){
    e.preventDefault();
    const firstName = document.getElementById("fname");
    const lastName = document.getElementById("lname");
    const userEmail = document.getElementById("contact_email");
    const userPhone = document.getElementById("phone_number");
    const message = document.getElementById("message");

    let params2 = {
        first_name: firstName.value,
        last_name: lastName.value,
        email_id: userEmail.value,
        number: userPhone.value,
        message: message.value
    }

    emailjs.send("service_7oytop3","template_zu0ei6t", params2).then(function (res){
        alert("Email sent successfully!")
    });

    firstName.value = '';
    lastName.value = '';
    userEmail.value = '';
    userPhone.value = '';
    message.value = '';
}

contactForm.addEventListener("submit", sendPersonalMail);