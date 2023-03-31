"use strick";

const elLoginBtn = document.querySelector(".login-btn");
const elFormBox = document.querySelector(".form-box");
const elCloseBtn = document.querySelector(".close-btn");

// Login
elLoginBtn.addEventListener("click" , () => {
  elFormBox.classList.replace("hide" , "show")
})

elCloseBtn.addEventListener("click" , () => {
  elFormBox.classList.replace("show" , "hide")
})

