"use strick";

let elTemplate = document.querySelector("#book-tem").content;
let elBookList = document.querySelector(".book-list");
let elModalSelect = document.querySelector("#modal-select");
let elForm = document.querySelector(".moda-form");
let elTitleInput = document.querySelector(".modal-title");
let elAuthorInput = document.querySelector(".modal-auther");
let elPagesInput = document.querySelector(".modal-pages");
let eldateInput = document.querySelector(".modal-date");


const storedBooks = localStorage.getItem("books");
const Books = storedBooks ? JSON.parse(storedBooks) : [];

elForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newBook = {
    title: elTitleInput.value,
    author: elAuthorInput.value,
    pages: elPagesInput.value,
    date: eldateInput.value,
    id: Books[Books.length - 1]?.id + 1 || 0,
    status: elModalSelect.value,
  };

  Books.push(newBook);
  localStorage.setItem("books", JSON.stringify(Books));
  render(Books, elBookList);

  elModal.classList.replace("show", "hide");
  elAddBtn.style.display = "block";

  elTitleInput.value = " ";
  elAuthorInput.value = " ";
  elPagesInput.value = " ";
  eldateInput.value = " ";
});


function render(arr, list) {
  list.innerHTML = null;
  const fragment = document.createDocumentFragment();

  arr.forEach((book) => {
    const elTemplateCopy = elTemplate.cloneNode(true);
    const elBookItemTitle = elTemplateCopy.querySelector(".book-item__title");
    const elBookItemAuther = elTemplateCopy.querySelector(".book-item__author");
    const elBookItemPage = elTemplateCopy.querySelector(".book-item__page");
    const elBookItemDate = elTemplateCopy.querySelector(".book-item__date");
    const elBookItemDalete = elTemplateCopy.querySelector(".book-item__dalete");
    const elBookItemCheck = elTemplateCopy.querySelector(".book-item__check");

    elBookItemTitle.textContent = book.title;
    elBookItemAuther.textContent = book.author;
    elBookItemPage.textContent = book.pages;
    elBookItemDate.textContent = book.date;
    elBookItemDalete.dataset.bookId = book.id;
    elBookItemCheck.textContent = book.status;

    fragment.appendChild(elTemplateCopy);
  });
  list.appendChild(fragment);
}

elBookList.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (evt.target.matches(".book-item__dalete")) {
    const index = Books.findIndex(
      (book) => book.id == evt.target.dataset.bookId
    );
    Books.splice(index, 1);
    for (let i = index; i < Books.length; i++) {
      Books[i].id--;
    }
    localStorage.setItem("books", JSON.stringify(Books));
    render(Books, elBookList);
  }
});

render(Books, elBookList);
