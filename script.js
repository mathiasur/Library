const $btnAdd = document.querySelector("#add");
const $newBook = document.querySelector("#new-book");
const $frmNewBook = document.querySelector("#frm-book");
const $btnCancel = document.querySelector("#nb-cancel");
const $btnSave = document.querySelector("#nb-save");
const $section = document.querySelector("section");
const $emptyMessage = document.querySelector("#empty-message");

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

const noBookMessage = () => {
  if (myLibrary.length === 0) {
    $emptyMessage.style = "display:block";
  } else {
    $emptyMessage.style = "display:none";
  }
};

noBookMessage();

const createBookCard = (book, index) => {
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
  card.dataset.index = index;
  card.innerHTML = cardContent;
  $section.appendChild(card);
};

const clear = () => {
  $section.innerHTML = "";
};

const showBooks = () => {
  clear();
  let index = 0;
  myLibrary.forEach((book) => {
    createBookCard(book, index);
    index += 1;
  });
};

showBooks();

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  toggle() {
    if (this.status === "read") {
      this.status = "not-read";
    } else {
      this.status = "read";
    }
  }
}

const newBook = () => {
  const $txtTitle = document.querySelector("#title").value;
  const $txtAuthor = document.querySelector("#author").value;
  const $txtPages = document.querySelector("#pages").value;
  const $slctStatus = document.querySelector("#status").value;

  return new Book($txtTitle, $txtAuthor, $txtPages, $slctStatus);
};

const saveBook = () => myLibrary.push(newBook());

$btnSave.addEventListener("click", (event) => {
  saveBook();
  showBooks();
  noBookMessage();
  closeForm();
  event.preventDefault();
});

const removeBook = (index) => {
  myLibrary.splice(index, 1);
};

const removeCard = (index) => {
  const $card = document.querySelector(`[data-index="${index}"]`);
  $card.remove();
};

const getCardIndex = (element) => {
  const card = element.parentNode.parentNode;
  const { index } = card.dataset;
  return parseInt(index, 10);
};

const changeBookStatus = (index) => {
  myLibrary[index].toggle();
};

const changeCardStatus = (element) => {
  if (element.classList.contains("read")) {
    element.classList.replace("read", "not-read");
    element.textContent = "Not read";
  } else {
    element.classList.replace("not-read", "read");
    element.textContent = "Read";
  }
};

document.addEventListener("click", (e) => {
  const element = e.target;
  if (element.className === "remove") {
    const index = getCardIndex(element);
    removeBook(index);
    removeCard(index);
    showBooks();
    noBookMessage();
  }
  if (element.className.includes("status")) {
    const index = getCardIndex(element);
    changeBookStatus(index);
    changeCardStatus(element);
  }
});
