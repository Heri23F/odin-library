const myLibrary = [
  {
    title: "The Silent Ocean",
    author: "Maria Chen",
    numOfPages: 312,
    readStatus: "read",
    id: "7f3e9a2b-4c1d-4e8f-9a5b-1d2c3e4f5a6b",
  },
  {
    title: "Echoes of Tomorrow",
    author: "James Whitfield",
    numOfPages: 198,
    readStatus: "reading",
    id: "2b8c4d6e-9f1a-4b3c-8d5e-6f7a8b9c0d1e",
  },
  {
    title: "The Last Cartographer",
    author: "Amara Okafor",
    numOfPages: 421,
    readStatus: "not yet read",
    id: "e5f6a7b8-c9d0-4e1f-a2b3-c4d5e6f7a8b9",
  },
  {
    title: "Whispers in the Rain",
    author: "Lucas Bennett",
    numOfPages: 267,
    readStatus: "not yet read",
    id: "9a1b2c3d-4e5f-4a6b-9c7d-8e9f0a1b2c3d",
  },
  {
    title: "Fragments of Light",
    author: "Sofia Reyes",
    numOfPages: 154,
    readStatus: "read",
    id: "4d5e6f7a-8b9c-4d0e-af1b-2c3d4e5f6a7b",
  },
];

function Book(title, author, numOfPages, readStatus) {
  if (!new.target) {
    throw Error("You need use the 'new' operator");
  }
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
  return myLibrary.push(book);
}

const displayBook = document.querySelector(".display-book");

function addBookDisplay(library) {
  const fragment = new DocumentFragment();

  for (const book of library) {
    const div = document.createElement("div");
    div.classList = "book-card";
    fragment.appendChild(div);

    const title = document.createElement("span");
    title.textContent = `Title: ${book.title}`;
    div.appendChild(title);

    const author = document.createElement("span");
    author.textContent = `Author: ${book.author}`;
    div.appendChild(author);

    const pages = document.createElement("span");
    pages.textContent = `Pages: ${book.numOfPages}`;
    div.appendChild(pages);

    const status = document.createElement("span");
    status.textContent = `status: ${book.readStatus}`;
    div.appendChild(status);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Delete"
    div.appendChild(removeButton)

    div.dataset.id = book.id;
  }

  return displayBook.appendChild(fragment);
}

function resetDisplayBook() {
  const bookCard = document.querySelectorAll(".book-card");
  for (const item of bookCard) {
    item.remove();
  }
}

addBookDisplay(myLibrary);

const form = document.querySelector("#modal-form");
const modal = document.querySelector("#modal");
const openModal = document.querySelector("#open-modal");

openModal.addEventListener("click", () => {
  modal.showModal();
});

form.addEventListener("submit", (event) => {
  const formData = new FormData(form);
  const formObject = {};

  for (const [name, value] of formData.entries()) {
    formObject[name] = value;
  }

  const newBook = new Book(
    formObject.title,
    formObject.author,
    Number(formObject.pages),
    formObject.status,
  );

  addBookToLibrary(newBook);
  resetDisplayBook();
  addBookDisplay(myLibrary);

  modal.close();
  event.preventDefault();
  form.reset();
});
