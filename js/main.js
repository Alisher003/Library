"use strick";

let elLoginBtn = document.querySelector(".login-btn");
let elFormBox = document.querySelector(".form-box");
let elCloseBtn = document.querySelector(".close-btn");
let elAddBtn = document.querySelector(".add-btn");
let elModal = document.querySelector(".modal");
// let elModalTitle = document.querySelector(".book-title");
// let elModalAuther = document.querySelector(".book-auther");
// let elModalPage = document.querySelector(".book-pages");
// let elModalDate = document.querySelector(".book-date");
let elTemplate = document.querySelector("#book-tem").content
let elBookList = document.querySelector(".book-list")
let elModalSelect = document.querySelector("#modal-select")
let elForm = document.querySelector(".moda-form");
let elTitleInput = document.querySelector(".modal-title");
let elAuthorInput = document.querySelector(".modal-auther");
let elPagesInput = document.querySelector(".modal-pages");
let eldateInput = document.querySelector(".modal-date");


// Login
elLoginBtn.addEventListener("click" , () => {
  elFormBox.classList.replace("hide" , "show")
})

elCloseBtn.addEventListener("click" , () => {
  elFormBox.classList.replace("show" , "hide")
})

// form
elAddBtn.addEventListener("click" , () => {
console.log("hi");
  elAddBtn.style.display = "none";
  elModal.classList.toggle( "show" )
})


const storedBooks = localStorage.getItem("books");
const Books = storedBooks ? JSON.parse(storedBooks) : [];

// let elForm = document.querySelector(".moda-form");
// let elTitleInput = document.querySelector(".modal-title");
// let elAuthorInput = document.querySelector(".modal-auther");
// let elPagesInput = document.querySelector(".modal-pages");
// let eldateInput = document.querySelector(".modal-date");

elForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newBook = {
    title: elTitleInput.value,
    author: elAuthorInput.value,
    pages: elPagesInput.value,
    date: eldateInput.value,
    id: Books[Books.length -1]?.id || 0,
    status: elModalSelect.value
  };


  Books.push(newBook);
  localStorage.setItem("books", JSON.stringify(Books));
  render(Books , elBookList)


  elModal.classList.replace("show", "hide");
  elAddBtn.style.display = "block";


});


function render(arr , list) {
  list.innerHTML = null
  const  fragment = document.createDocumentFragment();


  arr.forEach(book => {
    const elTemplateCopy = elTemplate.cloneNode(true)
      const elBookItemTitle = elTemplateCopy.querySelector(".book-item__title");
      const elBookItemAuther = elTemplateCopy.querySelector(".book-item__author");
      const elBookItemPage = elTemplateCopy.querySelector(".book-item__page");
      const elBookItemDate = elTemplateCopy.querySelector(".book-item__date");
      const elBookItemDalete = elTemplateCopy.querySelector(".book-item__dalete");
      const elBookItemCheck = elTemplateCopy.querySelector(".book-item__check");

      elBookItemTitle.textContent = book.title
      elBookItemAuther.textContent = book.author
      elBookItemPage.textContent = book.pages
      elBookItemDate.textContent = book.date
      elBookItemDalete.dataset.id = book.bookId
      elBookItemCheck.textContent = book.status

      fragment.appendChild(elTemplateCopy);

  });
  list.appendChild(fragment)

}

