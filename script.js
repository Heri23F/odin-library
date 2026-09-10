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
  {
    title: "The Copper Lantern",
    author: "Noah Fitzgerald",
    numOfPages: 289,
    readStatus: "not yet read",
    id: "a1c3e5f7-2b4d-4a6c-8e0f-1b3d5f7a9c2e",
  },
  {
    title: "Salt and Stone",
    author: "Ingrid Larsson",
    numOfPages: 345,
    readStatus: "reading",
    id: "b2d4f6a8-3c5e-4b7d-9f1a-2c4e6a8b0d3f",
  },
  {
    title: "The Paper Kingdom",
    author: "Rajiv Malhotra",
    numOfPages: 176,
    readStatus: "read",
    id: "c3e5a7b9-4d6f-4c8e-a0b2-3d5f7a9c1e4b",
  },
  {
    title: "Under a Borrowed Sky",
    author: "Elena Kowalski",
    numOfPages: 233,
    readStatus: "not yet read",
    id: "d4f6b8c0-5e7a-4d9f-b1c3-4e6a8b0d2f5c",
  },
  {
    title: "The Clockmaker's Daughter",
    author: "Thomas Blackwood",
    numOfPages: 398,
    readStatus: "read",
    id: "e5a7c9d1-6f8b-4e0a-c2d4-5f7b9c1e3a6d",
  },
  {
    title: "Feathers of the North",
    author: "Anya Petrov",
    numOfPages: 210,
    readStatus: "not yet read",
    id: "f6b8d0e2-7a9c-4f1b-d3e5-6a8c0d2f4b7e",
  },
  {
    title: "The Glass Orchard",
    author: "Marcus Delaney",
    numOfPages: 264,
    readStatus: "reading",
    id: "a7c9e1f3-8b0d-4a2c-e4f6-7b9d1e3f5a8c",
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
    status.textContent = `Status: ${book.readStatus}`;
    div.appendChild(status);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Delete";
    removeButton.classList = "delete-button";
    removeButton.dataset.id = book.id;
    div.appendChild(removeButton);
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

function deleteBook(bookID, library) {
  for(const book of library) {
    if(book.id === bookID) {
      library.splice(library.indexOf(book), 1)
    }
  }
}

const bookContainer = document.querySelector(".display-book")

bookContainer.addEventListener("click", (event) => {
  const targetBook = event.target.closest(".delete-button")
  const targetBookId = targetBook.dataset.id

  if(targetBook) {
    deleteBook(targetBookId, myLibrary)
  }
  
  resetDisplayBook();
  return addBookDisplay(myLibrary);
})