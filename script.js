const premadeLibrary = [
  {
    title: "The Silent Ocean",
    author: "Maria Chen",
    numOfPages: 312,
    readStatus: "Read",
  },
  {
    title: "Echoes of Tomorrow",
    author: "James Whitfield",
    numOfPages: 198,
    readStatus: "Not yet read",
  },
  {
    title: "The Last Cartographer",
    author: "Amara Okafor",
    numOfPages: 421,
    readStatus: "Not yet read",
  },
  {
    title: "Whispers in the Rain",
    author: "Lucas Bennett",
    numOfPages: 267,
    readStatus: "Not yet read",
  },
  {
    title: "Fragments of Light",
    author: "Sofia Reyes",
    numOfPages: 154,
    readStatus: "Read",
  },
  {
    title: "The Copper Lantern",
    author: "Noah Fitzgerald",
    numOfPages: 289,
    readStatus: "Not yet read",
  },
  {
    title: "Salt and Stone",
    author: "Ingrid Larsson",
    numOfPages: 345,
    readStatus: "Not yet read",
  },
  {
    title: "The Paper Kingdom",
    author: "Rajiv Malhotra",
    numOfPages: 176,
    readStatus: "Read",
  },
  {
    title: "Under a Borrowed Sky",
    author: "Elena Kowalski",
    numOfPages: 233,
    readStatus: "Not yet read",
  },
  {
    title: "The Clockmaker's Daughter",
    author: "Thomas Blackwood",
    numOfPages: 398,
    readStatus: "Read",
  },
  {
    title: "Feathers of the North",
    author: "Anya Petrov",
    numOfPages: 210,
    readStatus: "Not yet read",
  },
  {
    title: "The Glass Orchard",
    author: "Marcus Delaney",
    numOfPages: 264,
    readStatus: "Not yet read",
  },
];

class Book {
  #id = crypto.randomUUID();
  constructor(author, title, numOfPages, readStatus) {
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
  }

  get id() {
    return this.#id;
  }

  switchStatus() {
    return this.readStatus === "Read"
      ? (this.readStatus = "Not yet read")
      : (this.readStatus = "Read");
  }
}

class Library {
  static #bookList = [];

  static get booklist() {
    return this.#bookList;
  }

  static addBook(author, title, numOfPages, readStatus) {
    this.#bookList.push(new Book(author, title, numOfPages, readStatus));
    return;
  }

  static removeBookById(id) {
    let bookIndex = this.#bookList.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return console.log(`Book with this id: ${id} not found`);
    }

    this.#bookList.splice(bookIndex, 1);
    console.log(`Book with this id: ${id} removed`);
    return;
  }
}

premadeLibrary.forEach((book) => {
  Library.addBook(book.author, book.title, book.numOfPages, book.readStatus);
});

// create UI

const ui = (() => {
  const container = document.querySelector(".container");

  const createElement = (tag, elClass, elText = undefined) => {
    const el = document.createElement(tag);
    if (elClass) {
      el.classList = elClass;
    }
    if (elText !== undefined) {
      el.textContent = elText;
    }

    return el;
  };

  const createHeader = (() => {
    const header = createElement("div", "header");
    const logo = createElement("h1", "logo", "My Library");
    const addButton = createElement("button", "add-button", "New Book");

    header.append(logo, addButton);
    container.append(header);
  })();

  const createMain = (() => {
    const main = createElement("div", "main");
    const bookContainer = createElement("div", "book-container");

    const classMap = {
      author: "author",
      title: "title",
      numOfPages: "num-of-pages",
      readStatus: "read-status",
    };

    const keysTextMap = {
      author: "Author",
      title: "Title",
      numOfPages: "Pages",
      readStatus: "Status",
    };

    const createButton = (book) => {
      const buttonDiv = createElement("div", "button-div");
      buttonDiv.append(
        createElement(
          "button",
          "change-status",
          book.readStatus === "Read" ? "Unread" : "Read",
        ),
        createElement("button", "remove-button", "Remove"),
      );

      return buttonDiv;
    };

    const createBook = () => {
      Library.booklist.forEach((book) => {
        const bookDiv = createElement("div", "book-div");
        bookDiv.dataset.id = book.id;
        const bookTextDiv = createElement("div", "booktext-div");

        Object.entries(book).forEach((item) => {
          const [keys, value] = item;
          bookTextDiv.append(
            createElement("span", `keys ${classMap[keys]}`, keysTextMap[keys]),
            createElement("span", `value ${classMap[keys]}`, value),
          );
        });

        bookDiv.append(bookTextDiv, createButton(book));
        bookContainer.append(bookDiv);
      });

      container.append(bookContainer);
    };

    createBook();

    return { createBook, bookContainer };
  })();

  const updateBook = () => {
    createMain.bookContainer.textContent = "";
    createMain.createBook();
    return;
  };

  return { updateBook };
})();
