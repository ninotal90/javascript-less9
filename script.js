"use strict";

let mainDiv = document.querySelector(".post-Div");
let overlayElement = document.getElementById("overlayDiv");
let content = document.getElementById("contentDiv");
let deleteElement = document.querySelector(".delete");
let newPostAdd = document.querySelector(".add-new-post");
let overlayAdd = document.querySelector(".overlay-add");
let formAdd = document.querySelector(".form-add");
let inputElement = document.getElementById("title");

function ajax(url, callback) {
  fetch(url, {
    method: "get",
  })
    .then(function (mosuliinfo) {
      if (mosuliinfo.status !== 200) {
        throw "error";
      }
      return mosuliinfo.json();
    })
    .then(function (response) {
      callback(response);
    })
    .catch((error) => console.log(error));
}
ajax("https://jsonplaceholder.typicode.com/posts", function (object) {
  object.forEach((element) => {
    createpost(element);
  });
});
function createpost(item) {
  let mainPostDiv = document.createElement("div");
  mainPostDiv.classList.add("main-div");
  mainPostDiv.setAttribute("data-id", item.id);

  let h2Teg = document.createElement("h2");
  h2Teg.innerText = `${item.id}`;

  let h3Teg = document.createElement("h3");
  h3Teg.innerText = `${item.title}`;

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete This Post";
  deleteButton.classList.add("delete-button");
  deleteButton.setAttribute("data-id", item.id);

  mainPostDiv.appendChild(h2Teg);
  mainPostDiv.appendChild(h3Teg);
  mainPostDiv.appendChild(deleteButton);

  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    let deleteIdDiv = event.currentTarget.getAttribute("data-id");
    let deleteUrl = `https://jsonplaceholder.typicode.com/posts/${deleteIdDiv}`;
    fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => mainPostDiv.remove());
  });

  mainPostDiv.addEventListener("click", function (event) {
    let deleteId = event.currentTarget.getAttribute("data-id");
    overlayElement.classList.add("activeOverlay");

    let newUrl = `https://jsonplaceholder.typicode.com/posts/${deleteId}`;
    ajax(newUrl, function (newElement) {
      let pDescription = document.createElement("p");
      pDescription.innerText = `${newElement.body}`;
      content.appendChild(pDescription);
    });
  });

  mainDiv.appendChild(mainPostDiv);
}

deleteElement.addEventListener("click", function () {
  overlayElement.classList.remove("activeOverlay");
  content.innerText = " ";
});


newPostAdd.addEventListener("click", function () {
  overlayAdd.classList.toggle("activeOverlayAdd");
});

formAdd.addEventListener("submit", function (x) {
  x.preventDefault();
  let formData = {
    title: x.target[0].value,
  };
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((sendObject) => {
      createpost(sendObject);
      overlayAdd.classList.remove("activeOverlayAdd");
      inputElement.value = " ";
      console.log(sendObject);
    });
});
