const $btnAdd = document.querySelector("#add");
const $newBook = document.querySelector("#new-book");
const $frmNewBook = document.querySelector("#frm-book");
const $btnCancel = document.querySelector("#nb-cancel");
const $btnSave = document.querySelector("#nb-save");

const myLibrary = [];

const openForm = () => {
  $newBook.style = "display: flex";
};

$btnAdd.addEventListener("click", openForm);

const closeForm = () => {
  $frmNewBook.reset();
  $newBook.style = "display: none";
};

$btnCancel.addEventListener("click", closeForm);

const Book = (title, author, pages, isRead) => {
  const toggle = function changeStatusValue() {
    if (this.isRead === true) {
      this.isRead = false;
    } else {
      this.isRead = true;
    }
  };

  return {
    title,
    author,
    pages,
    isRead,
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
  closeForm();
  event.preventDefault();
});
