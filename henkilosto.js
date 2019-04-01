"use strict";
/* Select Dom elements variables */
const body = document.querySelector("body");
let messages = document.querySelector("#messages");
const form = document.querySelector("form");
let inputs = document.querySelectorAll('input[type="text"]');
let loading = document.querySelector(".loadingModal");
let datalist = document.querySelector(".datalist");
/* Create new message Class */
class Message {
    constructor(message) {
        this.type = "Huom";
        this.message = message;
    }
    combinedMessage() {
        return `${this.type}, ${this.message}!`;
    }
}
/* Define functions that will generate new validation error messages and append them to the dom */
function createMessage(message) {
    /* Create Elements */
    let div = document.createElement('div');
    let p = document.createElement("p");
    let errorText = document.createTextNode(message.combinedMessage());
    /* Elements attributes */
    div.setAttribute("class", "errorMsg message");
    p.setAttribute("class", "errorText");
    p.appendChild(errorText);
    /* set elements return finished div element and add it tot te dom. */
    div.appendChild(p);
    messages.appendChild(div);
}
/* ScrollTop function */
function scrollToTop(scrollDuration) {
    const scrollHeight = window.scrollY,
        scrollStep = Math.PI / (scrollDuration / 15),
        cosParameter = scrollHeight / 2;
    let scrollCount = 0,
        scrollMargin,
        scrollInterval = setInterval(function () {
            if (window.scrollY != 0) {
                scrollCount = scrollCount + 1;
                scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
                window.scrollTo(0, (scrollHeight - scrollMargin));
            }
            else clearInterval(scrollInterval);
        }, 15);
}
/* Loop over all selected inputs and add change event listener to them */
for(var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", function (event) {
        messages.innerHTML = "";
        validateFormInputs(this.value, this);
    });
}
/* Validate form inputs */
function validateFormInputs(text, self) {
    if (text = "" || !/^[a-zA-ZäöüÄÖÜß-åÅ]{2,30}$/.test(text)) {
        let message = new Message("Etu- ja sukunimen on oltava 2 - 30 merkkiä pitkä ja se voi sisältää vain kirjaimia a-ö ja A-Ö");
        self.value = "";
        scrollToTop(1000);
        messages.classList.remove("display-none");
        self.classList.remove("success");
        self.classList.add("error");
        createMessage(message);
    } else {
        self.classList.remove("error");
        self.classList.add("success");
        messages.classList.add("display-none");
    }
}
form.addEventListener("submit", function (event) {
    event.preventDefault();
    body.classList.add("loading");
    let formSubmission = setInterval(function() {
        loading.classList.remove("display-none");
        form.classList.add("display-none");
        datalist.classList.remove("display-none");
        clearInterval(formSubmission);
        body.classList.remove("loading");
        loading.classList.add("display-none");
        document.querySelector("#dataHeading").innerHTML = `Kiito ${document.querySelector("#name").value}`;
        datalist.classList.remove("display-none");
    }, 2000);
});