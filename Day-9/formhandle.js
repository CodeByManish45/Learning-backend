const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("http://localhost:3000/api/registration", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        alert("Form submitted successfully");
        console.log(data);
    })
    .catch(err => console.log(err));
});