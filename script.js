// Fixed NAvigation Bar
window.addEventListener("scroll", function(){
    let navbar = document.getElementById("navbar");
    navbar.classList.toggle("fixed", this.window.scrollY > 0);
});

let faq = document.getElementsByClassName("faq-page");
let i;
for (i = 0; i < faq.length; i++) {
    faq[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");
        /* Toggle between hiding and showing the active panel */
        let body = this.nextElementSibling;
        if (body.style.display === "block") {
            body.style.display = "none";
        } else {
            body.style.display = "block";
        }
    });
}

// Complain Form functunality
const form = document.querySelector(".complain-form");

function sendMail(e) {
    e.preventDefault();
    const name = document.querySelector("#name");
    const number =document.querySelector("#number");
    const email = document.querySelector("#email");
    const location = document.querySelector("#location");
    const locationDetails = document.querySelector("#ldetails");

    let params = {
        from_name: name.value,
        number: number.value,
        email_id: email.value,
        locationOfWaste: location.value,
        locationDetail: locationDetails.value,
    }

    emailjs.send("service_7oytop3","template_dhqi2sw", params).then(function (res){
        alert("Thank you for your complaint!");
    });

    name.value = '';
    number.value = '';
    email.value = '';
    location.value = '';
    locationDetails.value = '';
}

form.addEventListener("submit", sendMail);

// Contact form Functionality
