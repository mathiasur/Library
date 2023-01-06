const $btnAdd = document.querySelector("#add");
const $newBook = document.querySelector("#new-book");
const $frmNewBook = document.querySelector("#frm-book");
const $btnCancel = document.querySelector("#nb-cancel");
const $btnSave = document.querySelector("#nb-save");
const $section = document.querySelector("section");

const openForm = () => {
  $newBook.style = "display: flex";
};
$btnAdd.addEventListener("click", openForm);

const closeForm = () => {
  $frmNewBook.reset();
  $newBook.style = "display: none";
};
$btnCancel.addEventListener("click", closeForm);

const myLibrary = [];

const createBookCard = (book) => {
  let status;
  if (book.status === "read") {
    status = "Read";
  } else {
    status = "Not read";
  }
  const cardContent = `
    <div class="title-container">
      <div class="remove"></div>
      <div class="h4-container">
        <h4 class="title">${book.title}</h4>
      </div>
    </div>
    <div class="info">
      <div class="status ${book.status}">${status}</div>
      <h3>Author: <span class="h3-info">${book.author}</span></h3>
      <h3>Pages: <span class="h3-info">${book.pages}</span></h3>
    </div>`;
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = cardContent;
  $section.appendChild(card);
};

const clear = () => {
  $section.innerHTML = "";
};

const showBooks = () => {
  clear();
  myLibrary.map((book) => createBookCard(book));
};

showBooks();

const Book = (title, author, pages, status) => {
  const toggle = function changeStatusValue() {
    if (this.status === "read") {
      this.status = "not-read";
    } else {
      this.status = "read";
    }
  };

  return {
    title,
    author,
    pages,
    status,
    toggle,
  };
};

const newBook = () => {
  const $txtTitle = document.querySelector("#title").value;
  const $txtAuthor = document.querySelector("#author").value;
  const $txtPages = document.querySelector("#pages").value;
  const $slctStatus = document.querySelector("#status").value;

  const book = Book($txtTitle, $txtAuthor, $txtPages, $slctStatus);
  return book;
};

const saveBook = () => myLibrary.push(newBook());

$btnSave.addEventListener("click", (event) => {
  saveBook();
  const lastBook = myLibrary[myLibrary.length - 1];
  createBookCard(lastBook);
  closeForm();
  event.preventDefault();
});
