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
var selectedRow = null;
function sendMail(e) {
    e.preventDefault();
    const name = document.querySelector("#name");
    const number =document.querySelector("#number");
    const email = document.querySelector("#email");
    const location = document.querySelector("#location");
    const locationDetails = document.querySelector("#ldetails");

    let data = [];


    if(selectedRow == null){
        const list = document.querySelector(".complain-list");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${name.value}</td>
            <td>${number.value}</td>
            <td>${email.value}</td>
            <td>${location.value}</td>
            <td>${locationDetails.value}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
        `;

        if(typeof(Storage) !== "undefined") {
            if (localStorage.getItem('data') && localStorage.getItem('data').length > 0)
                data = JSON.parse(localStorage.getItem('data'));
            obj = {
                name : `${name.value}`,
                Phone_number : `${number.value}`,
                email : `${email.value}`,
                location : `${location.value}`,
                location_Details : `${locationDetails.value}`
            };
            data.push(obj);
            localStorage.setItem('data', JSON.stringify(data));
        }

        list.appendChild(row);
        selectedRow = null;
        showAlert("Complain Added", "success");
    }
    else{
        selectedRow.children[0].textContent = name.value;
        selectedRow.children[1].textContent = number.value;
        selectedRow.children[2].textContent = email.value;
        selectedRow.children[3].textContent = location.value;
        selectedRow.children[4].textContent = locationDetails.value;
        selectedRow = null;
        showAlert("Complain Info Edited", "info")
    }
    
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
};

form.addEventListener("submit", sendMail);

// 
document.querySelector(".complain-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#name").value = selectedRow.children[0].textContent;
        document.querySelector("#number").value = selectedRow.children[1].textContent;
        document.querySelector("#email").value = selectedRow.children[2].textContent;
        document.querySelector("#location").value = selectedRow.children[3].textContent;
        document.querySelector("#ldetails").value = selectedRow.children[4].textContent;
    }
})


// Show Alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".complain-form");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000)
}

// Add Data
// document.querySelector(".complain-form").addEventListener("submit", (e) => {
//     e.preventDefault();


// })

// delete data
document.querySelector(".complain-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Complain Data Deleted", "danger")
    }
})