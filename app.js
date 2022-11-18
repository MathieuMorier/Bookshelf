const btnAdd = document.querySelector('#btn-add');
const btnReset = document.querySelector('#btn-reset');
const bookForm = document.querySelector('.book-form');
const inputTitle = document.querySelector('#input-title');
const inputAuthor = document.querySelector('#input-author');
const inputPages = document.querySelector('#input-pages');
const inputRead = document.querySelector('#input-read');
const btnSubmit = document.querySelector('#btn-submit');
const booksGrid = document.querySelector('.books-grid');
const overlay = document.querySelector('.overlay');
const booksTotal = document.querySelector('#books-total');
const booksRead = document.querySelector('#books-read');
const booksUnread = document.querySelector('#books-unread');

let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    toggleRead() {
        this.read = this.read ? false : true;
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    updateBookshelf();
}

const deleteBook = (e) => {
    const index = e.target.parentNode.dataset.libraryIndex;
    myLibrary.splice(index, 1);
    updateBookshelf();
}

function updateBookshelf() {
    booksGrid.replaceChildren();

    // add book cards to the books grid
    for (const book of myLibrary) {
        // current book's index in myLibrary
        const index = document.querySelectorAll('.book-card').length;

        const bookCard = document.createElement('article');
        bookCard.classList.add('book-card');

        const bookTitle = document.createElement('p');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('book-author');
        bookAuthor.textContent = book.author;

        const bookPages = document.createElement('p');
        bookPages.classList.add('book-pages');
        bookPages.textContent = `${book.pages} pages`;

        const bookButtons = document.createElement('div');
        bookButtons.classList.add('book-buttons');
        bookButtons.dataset.libraryIndex = index;

        const btnRead = document.createElement('button');
        btnRead.classList.add('btn', 'btn-read');
        btnRead.classList.add(book.read ? 'btn-green' : 'btn-red');
        btnRead.textContent = (book.read ? "Read" : "Not read");
        btnRead.addEventListener('click', toggleReadHandler);
        bookButtons.appendChild(btnRead);

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-delete');
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', deleteBook);
        bookButtons.appendChild(btnDelete);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookButtons);

        booksGrid.appendChild(bookCard);
    }

    // display info message when no books are present
    if (!myLibrary.length) {
        booksGrid.textContent = 'Add your first book.';
    }

    updateStats();
}

const updateStats = () => {
    let totalCount = myLibrary.length;
    let readCount = myLibrary.filter(book => book.read).length;
    let unreadCount = totalCount - readCount;

    booksTotal.textContent = `Total books: ${totalCount}`;
    booksRead.textContent = `Books read: ${readCount}`;
    booksUnread.textContent = `Books unread: ${unreadCount}`;
}

const submitBook = () => {
    const title = inputTitle.value;
    const author = inputAuthor.value;
    const pages = inputPages.value;
    const read = inputRead.checked;

    // require all input fields to be filled
    if (!(title && author && pages)) {
        alert('Fill out the form.');
        return;
    }
    // require book length to be positive
    if (pages < 1) {
        alert('Book can not be shorter than 1 page.');
        return;
    }
    addBookToLibrary(title, author, pages, read);
    toggleForm();
}

// call toggleRead() method with the right Book object
const toggleReadHandler = (e) => {
    const index = e.target.parentNode.dataset.libraryIndex;
    myLibrary[index].toggleRead();
    updateBookshelf();
}

const toggleForm = () => {
    bookForm.classList.toggle('active');
    overlay.classList.toggle('active');
    resetForm();
}

const resetForm = () => {
    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputRead.checked = false;
}

const clearLibrary = () => {
    // ask user for confirmation
    if (confirm('Delete all books?')) {
        myLibrary = [];
        updateBookshelf();
    }
}

btnAdd.addEventListener('click', toggleForm);
btnReset.addEventListener('click', clearLibrary);
btnSubmit.addEventListener('click', submitBook)
overlay.addEventListener('click', toggleForm);

// add sample books
myLibrary.push(new Book('Rich Dad, Poor Dad', 'Robert T. Kiyosaki', 195, false));
myLibrary.push(new Book('Be Here Now', 'Ram Dass', 116, true));
myLibrary.push(new Book('PIHKAL', 'Alexander Shulgin', 978, false));

updateBookshelf();
