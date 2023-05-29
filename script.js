"use strict";

let mainDiv = document.querySelector(".post-Div");
let overlayElement = document.getElementById("overlayDiv");
let content = document.getElementById("contentDiv");
let deleteElement = document.querySelector(".delete");

function ajax(url, callback) {
  fetch(url, {
    method: "get",
  })
    .then(function (mosuliinfo) {
      return mosuliinfo.json();
    })
    .then(function (response) {
      response.forEach(function (element) {
        console.log(response);
        createpost(element);
      });
    })
    .catch(function (errorResponse) {
      console.log(errorResponse);
    });
  function createpost(item) {
    let mainPostDiv = document.createElement("div");
    mainPostDiv.classList.add("main-div");
    let h2Teg = document.createElement("h2");
    h2Teg.innerText = `${item.id}`;
    let h3Teg = document.createElement("h3");
    h3Teg.innerText = `${item.title}`;
    mainPostDiv.setAttribute("data-id", item.id);

    mainPostDiv.appendChild(h2Teg);
    mainPostDiv.appendChild(h3Teg);

    mainPostDiv.addEventListener("click", function (event) {
      let id = event.currentTarget.getAttribute("data-id");
      console.log(id);
      overlayElement.classList.add("activeOverlay");

      let newUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
      ajax(newUrl, function (newElement) {
        let pDescription = document.createElement("p");
        pDescription.innerText = `${newElement.body}`;
        content.appendChild(pDescription);
      });
    });

    mainDiv.appendChild(mainPostDiv);
    // console.log(mainPostDiv);
  }
}
deleteElement.addEventListener("click", function () {
  overlayElement.classList.remove("activeOverlay");
});
ajax("https://jsonplaceholder.typicode.com/posts", function (object) {
  createPost();
});
