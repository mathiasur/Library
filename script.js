const $btnAdd = document.querySelector("#add");
const $newBook = document.querySelector("#new-book");
const $frmNewBook = document.querySelector("#frm-book");
const $btnCancel = document.querySelector("#nb-cancel");
const $btnSave = document.querySelector("#nb-save");

const openForm = function openNewBookForm() {
  $newBook.style = "display: flex";
};

const closeForm = function closeNewBookForm() {
  $newBook.style = "display: none";
};

$btnAdd.addEventListener("click", openForm);
$btnCancel.addEventListener("click", () => {
  $frmNewBook.reset();
  closeForm();
});
