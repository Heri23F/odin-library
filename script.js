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

  static changeStatusById(id) {
    let bookIndex = this.#bookList.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return console.log(`Book with this id: ${id} not found`);
    }

    this.#bookList[bookIndex].switchStatus();
    console.log(
      `Book status change to ${this.#bookList[bookIndex].readStatus}`,
    );
  }
}

premadeLibrary.forEach((book) => {
  Library.addBook(book.author, book.title, book.numOfPages, book.readStatus);
});

// create UI

const ui = (() => {
  const container = document.querySelector(".container");

  const createElement = (tag, elClass, elText) => {
    const el = document.createElement(tag);
    if (elClass) {
      el.className = elClass;
    }
    if (elText !== undefined) {
      el.textContent = elText;
    }

    return el;
  };

  const renderHeader = (() => {
    const header = createElement("div", "header");
    const logo = createElement("h1", "logo", "My Library");
    const addButton = createElement("button", "add-button", "New Book");

    header.append(logo, addButton);
    container.append(header);
  })();

  const renderMain = (() => {
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

    const createBookText = (book) => {
      const bookTextDiv = createElement("div", "booktext-div");
      Object.entries(book).forEach((item) => {
        const [keys, value] = item;
        bookTextDiv.append(
          createElement("span", `keys ${classMap[keys]}`, keysTextMap[keys]),
          createElement("span", `value ${classMap[keys]}`, value),
        );
      });

      return bookTextDiv;
    };

    const createBookCard = (book) => {
      const bookDiv = createElement("div", "book-div");
      bookDiv.dataset.id = book.id;
      bookDiv.append(createBookText(book), createButton(book));
      return bookDiv;
    };

    const renderBook = () => {
      Library.booklist.forEach((book) => {
        bookContainer.append(createBookCard(book));
      });
    };

    const updateBook = () => {
      bookContainer.textContent = "";
      renderBook();
    };

    renderBook();
    main.append(bookContainer);
    container.append(main);
    return { updateBook, bookContainer };
  })();

  const clickHandler = (event) => {
    const target = event.target;

    if (
      target.className !== "remove-button" &&
      target.className !== "change-status"
    ) {
      return;
    }

    const id = target.closest(".book-div").dataset.id;
    target.className === "remove-button"
      ? Library.removeBookById(id)
      : Library.changeStatusById(id);

    renderMain.updateBook();
    return;
  };

  const renderModal = (() => {
    const newBookDialog = createElement("dialog", "new-book");
    const dialogForm = createElement("form", "dialog-form");

    const createInput = (id) => {
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("id", id);

      return input;
    };

    const createLabel = (id, content) => {
      const label = document.createElement("label");
      label.setAttribute("for", id);
      label.textContent = content;

      return label;
    };

    const createSelect = (id, selectOption = []) => {
      const select = document.createElement("select");
      select.setAttribute("id", id);
      selectOption.forEach((optionValue) => {
        const option = document.createElement("option");
        option.setAttribute("value", optionValue);
        option.textContent =
          optionValue.charAt(0).toUpperCase() + optionValue.slice(1);

        select.append(option);
      });

      return select;
    };

    const createForminput = () => {
      const fragments = new DocumentFragment();
      const formInputMap = {
        bookAuthor: ["book-author", "Author:"],
        bookTitle: ["book-title", "Title:"],
        bookNumOfPages: ["book-pages", "Pages:"],
      };

      const selectOption = ["read", "no yet read"];

      for (const keys in formInputMap) {
        const [id, value] = formInputMap[keys];
        fragments.append(createLabel(id, value), createInput(id));
      }

      fragments.append(
        createLabel("book-status", "Status"),
        createSelect("book-status", selectOption),
      );

      return fragments;
    };

    const openDialog = () => {
      newBookDialog.showModal();
    };
    const closeDialog = () => {
      newBookDialog.close;
    };

    dialogForm.append(createForminput());
    newBookDialog.append(dialogForm);
    container.append(newBookDialog);

    return { openDialog, closeDialog };
  })();

  renderMain.bookContainer.addEventListener("click", clickHandler);

  return { updateBook: renderMain.updateBook };
})();


