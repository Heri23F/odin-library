const premadeLibrary = [
  {
    title: "The Silent Ocean",
    author: "Maria Chen",
    numOfPages: 312,
    readStatus: "read",
  },
  {
    title: "Echoes of Tomorrow",
    author: "James Whitfield",
    numOfPages: 198,
    readStatus: "not yet read",
  },
  {
    title: "The Last Cartographer",
    author: "Amara Okafor",
    numOfPages: 421,
    readStatus: "not yet read",
  },
  {
    title: "Whispers in the Rain",
    author: "Lucas Bennett",
    numOfPages: 267,
    readStatus: "not yet read",
  },
  {
    title: "Fragments of Light",
    author: "Sofia Reyes",
    numOfPages: 154,
    readStatus: "read",
  },
  {
    title: "The Copper Lantern",
    author: "Noah Fitzgerald",
    numOfPages: 289,
    readStatus: "not yet read",
  },
  {
    title: "Salt and Stone",
    author: "Ingrid Larsson",
    numOfPages: 345,
    readStatus: "not yet read",
  },
  {
    title: "The Paper Kingdom",
    author: "Rajiv Malhotra",
    numOfPages: 176,
    readStatus: "read",
  },
  {
    title: "Under a Borrowed Sky",
    author: "Elena Kowalski",
    numOfPages: 233,
    readStatus: "not yet read",
  },
  {
    title: "The Clockmaker's Daughter",
    author: "Thomas Blackwood",
    numOfPages: 398,
    readStatus: "read",
  },
  {
    title: "Feathers of the North",
    author: "Anya Petrov",
    numOfPages: 210,
    readStatus: "not yet read",
  },
  {
    title: "The Glass Orchard",
    author: "Marcus Delaney",
    numOfPages: 264,
    readStatus: "not yet read",
  },
];

const myLibrary = [];

for (const book of premadeLibrary) {
  const newBook = new Book(
    book.title,
    book.author,
    book.numOfPages,
    book.readStatus,
  );

  myLibrary.push(newBook);
}

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

    const cardButton = document.createElement("div");
    cardButton.classList = "card-button";
    div.appendChild(cardButton);

    const changeStatusButton = document.createElement("button");
    changeStatusButton.textContent = "Change Status";
    changeStatusButton.classList = "change-status";
    changeStatusButton.dataset.id = book.id;
    cardButton.appendChild(changeStatusButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Delete";
    removeButton.classList = "delete-button";
    removeButton.dataset.id = book.id;
    cardButton.appendChild(removeButton);
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
  for (const book of library) {
    if (book.id === bookID) {
      library.splice(library.indexOf(book), 1);
    }
  }
}

const bookContainer = document.querySelector(".display-book");

bookContainer.addEventListener("click", (event) => {
  const targetDelete = event.target.closest(".delete-button");
  const targetChange = event.target.closest(".change-status");

  if (targetDelete) {
    const deleteId = targetDelete.dataset.id;
    deleteBook(deleteId, myLibrary);
  }

  if (targetChange) {
    const changeId = targetChange.dataset.id;
    changeStatusBook(changeId);
  }
  resetDisplayBook();
  return addBookDisplay(myLibrary);
});

function changeStatusBook(id) {
  for (const book of myLibrary) {
    if (book.id === id) {
      book.changeStatus();
    }
  }
}

Book.prototype.changeStatus = function () {
  if (this.readStatus === "read") {
    return (this.readStatus = "not yet read");
  }
  if (this.readStatus === "not yet read") {
    return (this.readStatus = "read");
  }
};
