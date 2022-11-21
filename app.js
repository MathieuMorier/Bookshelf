const btnAdd = document.querySelector('#btn-add');
const btnReset = document.querySelector('#btn-reset');
const bookForm = document.querySelector('.book-form');
const inputTitle = document.querySelector('#input-title');
const inputAuthor = document.querySelector('#input-author');
const inputPages = document.querySelector('#input-pages');
const inputRead = document.querySelector('#input-read');
const btnSubmit = document.querySelector('#btn-submit');
const booksGrid = document.getElementsByClassName('books-grid');
const overlay = document.querySelector('.overlay');
const booksTotal = document.querySelector('#books-total');
const booksRead = document.querySelector('#books-read');
const booksUnread = document.querySelector('#books-unread');

let myLibrary = [];

class Book {
    constructor(title, author, pages, read,
        reading = false, toRead = false,
        recommended = true, favorites = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.reading = reading;
        this.toRead = toRead;
		if(this.read == true)
        this.recommended = false;
	    else
		this.recommended = recommended;
        this.favorites = favorites;
    }
    toggleRead() {
        this.read = this.read ? false : true;
    }
    toggleReading() {
        this.reading = this.reading ? false : true;
    }
    toggletoRead() {
        this.toRead = this.toRead ? false : true;
    }
    toggleRecommended() {
        this.recommended = this.recommended ? false : true;
    }	
	toggleFavorites() {
        this.favorites = this.favorites ? false : true;
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

function toggleReadHandler (book_ref){
    book_ref.book_obj.toggleRead();
    if(book_ref.book_obj.read == true) {
		book_ref.book_obj.toRead = false;
		book_ref.book_obj.reading = false;
	}
	if(book_ref.book_obj.read == false && book_ref.book_obj.toRead == false && book_ref.book_obj.reading == false)
	{
		book_ref.book_obj.recommended = true;
	}
	console.log("toggleReadHandle called on: " + book_ref.book_obj.title);
    updateBookshelf();
}

function toggletoReadHandler (book_ref){
    book_ref.book_obj.toggletoRead();
    if(book_ref.book_obj.toRead == true) {
		book_ref.book_obj.read = false;
		book_ref.book_obj.reading = false;
	}
	if(book_ref.book_obj.read == false && book_ref.book_obj.toRead == false && book_ref.book_obj.reading == false)
	{
		book_ref.book_obj.recommended = true;
	}
	console.log("Pressed button for " + book_ref.book_obj.title);
    updateBookshelf();
}

function toggleReadingHandler (book_ref){
    book_ref.book_obj.toggleReading();
    if(book_ref.book_obj.reading == true) {
		book_ref.book_obj.toRead = false;
		book_ref.book_obj.read = false;
	}
	if(book_ref.book_obj.read == false && book_ref.book_obj.toRead == false && book_ref.book_obj.reading == false)
	{
		book_ref.book_obj.recommended = true;
	}
    updateBookshelf();
}

function updateBookshelf() {
    booksGrid[0].replaceChildren();
    booksGrid[1].replaceChildren();
    booksGrid[2].replaceChildren();
    booksGrid[3].replaceChildren();
    booksGrid[4].replaceChildren();
    
    let readBook =[];
    let readingBook = [];
    let toreadBook = [];
    let recBook = [];
    let favBook = [];
    for( const book of myLibrary)
    {
        if(book.read == true){
		  console.log("Added book to Read shelf: " + book.title);
          readBook.push(book);
		}
        if(book.reading == true){
          readingBook.push(book);
		}
        if(book.toRead == true){
          toreadBook.push(book);
		}
        if(book.recommended == true){
          recBook.push(book);
		}
        if(book.favorites == true){
          favBook.push(book);
		}
    }
    console.log(readBook.length)
    console.log(readingBook.length)
    console.log(toreadBook.length)
    console.log(recBook.length)
    console.log(favBook.length)

    // add book cards to the books grid
    for (const book of readBook) {
        // current book's index in myLibrary
		// pointer to current book for button-linked listener functions
		var book_ref = {book_obj: book};
        const index = document.querySelectorAll('.book-card').length;
		console.log("Book on Read shelf: " + book.title);
        
        bookCard = document.createElement('article');
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
        btnRead.addEventListener('click', function(){ toggleReadHandler(book_ref); });
        bookButtons.appendChild(btnRead);
		
        const btntoRead = document.createElement('button');
        btntoRead.classList.add('btn', 'btn-toread');
        btntoRead.classList.add(book.toRead ? 'btn-green' : 'btn-red');
        btntoRead.textContent = (book.toRead ? "To read" : "Not to read");
        btntoRead.addEventListener('click', function(){ toggletoReadHandler(book_ref); });
        bookButtons.appendChild(btntoRead);
		
        const btnReading = document.createElement('button');
        btnReading.classList.add('btn', 'btn-reading');
        btnReading.classList.add(book.reading ? 'btn-green' : 'btn-red');
        btnReading.textContent = (book.reading ? "Reading" : "Not reading");
        btnReading.addEventListener('click', function(){ toggleReadingHandler(book_ref); });
        bookButtons.appendChild(btnReading);
/*
        const btnFavorite = document.createElement('button');
        btnFavorite.classList.add('btn', 'btn-favorite');
        btnFavorite.classList.add(book.favorites ? 'btn-green' : 'btn-red');
        btnFavorite.textContent = (book.favorites ? "Favorited" : "Not favorited");
        btnFavorite.addEventListener('click', toggleFavoritesHandler);
        bookButtons.appendChild(btnFavorite);
*/
        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-delete');
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', deleteBook);
        bookButtons.appendChild(btnDelete);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookButtons);
        
        booksGrid[0].appendChild(bookCard);      
    }

    
    // add book cards to the books grid
    for (const book of readingBook) {
        // current book's index in myLibrary
		// pointer to current book for button-linked listener functions
		var book_ref = {book_obj: book};
        const index = document.querySelectorAll('.book-card').length;
        
        bookCard = document.createElement('article');
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
        btnRead.addEventListener('click', function(){ toggleReadHandler(book_ref); });
        bookButtons.appendChild(btnRead);
		
        const btntoRead = document.createElement('button');
        btntoRead.classList.add('btn', 'btn-toread');
        btntoRead.classList.add(book.toRead ? 'btn-green' : 'btn-red');
        btntoRead.textContent = (book.toRead ? "To read" : "Not to read");
        btntoRead.addEventListener('click', function(){ toggletoReadHandler(book_ref); });
        bookButtons.appendChild(btntoRead);
		
        const btnReading = document.createElement('button');
        btnReading.classList.add('btn', 'btn-reading');
        btnReading.classList.add(book.reading ? 'btn-green' : 'btn-red');
        btnReading.textContent = (book.reading ? "Reading" : "Not reading");
        btnReading.addEventListener('click', function(){ toggleReadingHandler(book_ref); });
        bookButtons.appendChild(btnReading);

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-delete');
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', deleteBook);
        bookButtons.appendChild(btnDelete);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookButtons);
        
        booksGrid[1].appendChild(bookCard);      
    }

    // add book cards to the books grid
    for (const book of toreadBook) {
        // current book's index in myLibrary
		// pointer to current book for button-linked listener functions
		var book_ref = {book_obj: book};
        const index = document.querySelectorAll('.book-card').length;
        
        bookCard = document.createElement('article');
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
        btnRead.addEventListener('click', function(){ toggleReadHandler(book_ref); });
        bookButtons.appendChild(btnRead);
		
        const btntoRead = document.createElement('button');
        btntoRead.classList.add('btn', 'btn-toread');
        btntoRead.classList.add(book.toRead ? 'btn-green' : 'btn-red');
        btntoRead.textContent = (book.toRead ? "To read" : "Not to read");
        btntoRead.addEventListener('click', function(){ toggletoReadHandler(book_ref); });
        bookButtons.appendChild(btntoRead);
		
        const btnReading = document.createElement('button');
        btnReading.classList.add('btn', 'btn-reading');
        btnReading.classList.add(book.reading ? 'btn-green' : 'btn-red');
        btnReading.textContent = (book.reading ? "Reading" : "Not reading");
        btnReading.addEventListener('click', function(){ toggleReadingHandler(book_ref); });
        bookButtons.appendChild(btnReading);

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-delete');
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', deleteBook);
        bookButtons.appendChild(btnDelete);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookButtons);
        
        booksGrid[2].appendChild(bookCard);      
    }

    // add book cards to the books grid
    for (const book of recBook) {
        // current book's index in myLibrary
		// pointer to current book for button-linked listener functions
		var book_ref = {book_obj: book};
        const index = document.querySelectorAll('.book-card').length;
        
        bookCard = document.createElement('article');
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
        btnRead.addEventListener('click', function(){ toggleReadHandler(book_ref); });
        bookButtons.appendChild(btnRead);
		
        const btntoRead = document.createElement('button');
        btntoRead.classList.add('btn', 'btn-toread');
        btntoRead.classList.add(book.toRead ? 'btn-green' : 'btn-red');
        btntoRead.textContent = (book.toRead ? "To read" : "Not to read");
        btntoRead.addEventListener('click', function(){ toggletoReadHandler(book_ref); });
        bookButtons.appendChild(btntoRead);
		
        const btnReading = document.createElement('button');
        btnReading.classList.add('btn', 'btn-reading');
        btnReading.classList.add(book.reading ? 'btn-green' : 'btn-red');
        btnReading.textContent = (book.reading ? "Reading" : "Not reading");
        btnReading.addEventListener('click', function(){ toggleReadingHandler(book_ref); });
        bookButtons.appendChild(btnReading);

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-delete');
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', deleteBook);
        bookButtons.appendChild(btnDelete);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookButtons);
        
        booksGrid[3].appendChild(bookCard);      
    }

    // add book cards to the books grid
    for (const book of favBook) {
        // current book's index in myLibrary
		// pointer to current book for button-linked listener functions
		var book_ref = {book_obj: book};
        const index = document.querySelectorAll('.book-card').length;
        
        bookCard = document.createElement('article');
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
        btnRead.addEventListener('click', function(){ toggleReadHandler(book_ref); });
        bookButtons.appendChild(btnRead);
		
        const btntoRead = document.createElement('button');
        btntoRead.classList.add('btn', 'btn-toread');
        btntoRead.classList.add(book.toRead ? 'btn-green' : 'btn-red');
        btntoRead.textContent = (book.toRead ? "To read" : "Not to read");
        btntoRead.addEventListener('click', function(){ toggletoReadHandler(book_ref); });
        bookButtons.appendChild(btntoRead);
		
        const btnReading = document.createElement('button');
        btnReading.classList.add('btn', 'btn-reading');
        btnReading.classList.add(book.reading ? 'btn-green' : 'btn-red');
        btnReading.textContent = (book.reading ? "Reading" : "Not reading");
        btnReading.addEventListener('click', function(){ toggleReadingHandler(book_ref); });
        bookButtons.appendChild(btnReading);

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-delete');
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', deleteBook);
        bookButtons.appendChild(btnDelete);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookButtons);
        
        booksGrid[4].appendChild(bookCard);      
    }


    // display info message when no books are present
    if (!myLibrary.length) {
        booksGrid[0].textContent = 'Add your first book.';
        booksGrid[1].textContent = 'Add your first book.';
    }

    updateStats();
}

function addBookCards(shelfNum,...arrayBook)
{
    //Clear shelf
    booksGrid[shelfNum].replaceChildren();
    console.log(arrayBook.length)
    // add book cards to the books grid
    for (const book of arrayBook) {
        // current book's index in myLibrary
        const index = document.querySelectorAll('.book-card').length;
        //Create a book card css
        bookCard = document.createElement('article');
        bookCard.classList.add('book-card');
        //Create a book title css
        const bookTitle = document.createElement('p');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = book.title;
        //Create a book author css
        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('book-author');
        bookAuthor.textContent = book.author;
        //create book page css
        const bookPages = document.createElement('p');
        bookPages.classList.add('book-pages');
        bookPages.textContent = `${book.pages} pages`;
        //create 
        const bookButtons = document.createElement('div');
        bookButtons.classList.add('book-buttons');
        bookButtons.dataset.libraryIndex = index;

        const btnRead = document.createElement('button');
        btnRead.classList.add('btn', 'btn-read');
        btnRead.classList.add(book.read ? 'btn-green' : 'btn-red');
        btnRead.textContent = (book.read ? "Read" : "Not read");
        btnRead.addEventListener('click', function(){ toggleReadHandler(book_ref); });
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
        
        booksGrid[shelfNum].appendChild(bookCard);
           
    }
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
/*
const toggleReadHandler = (e) => {
    const index = e.target.parentNode.dataset.libraryIndex;
    this.toggleRead();
    if(this.read == true) {
		this.toRead = false;
		this.reading = false;
	}
	if(this.read == false && this.toRead == false && this.reading == false)
	{
		this.recommended = true;
	}
	console.log("toggleReadHandle called on:" + this.title);
    updateBookshelf();
}

const toggletoReadHandler = (e) => {
    const index = e.target.parentNode.dataset.libraryIndex;
    myLibrary[index].toggletoRead();
    if(myLibrary[index].toRead == true) {
		myLibrary[index].read = false;
		myLibrary[index].reading = false;
	}
	if(myLibrary[index].read == false && myLibrary[index].toRead == false && myLibrary[index].reading == false)
	{
		myLibrary[index].recommended = true;
	}
    updateBookshelf();
}

const toggleReadingHandler = (e) => {
    const index = e.target.parentNode.dataset.libraryIndex;
    myLibrary[index].toggleReading();
    if(myLibrary[index].reading == true) {
		myLibrary[index].toRead = false;
		myLibrary[index].read = false;
	}
	if(myLibrary[index].read == false && myLibrary[index].toRead == false && myLibrary[index].reading == false)
	{
		myLibrary[index].recommended = true;
	}
    updateBookshelf();
}*/

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
