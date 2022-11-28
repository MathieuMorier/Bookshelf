const btnAdd = document.querySelector('#btn-add');
const btnReset = document.querySelector('#btn-reset');
const bookForm = document.querySelector('.book-form');
const inputTitle = document.querySelector('#input-title');
const inputGenre = document.querySelector('#input-genres');
const inputOtherGenre = document.querySelector('#input-other-genre');
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

    constructor(title, author, pages, genre, read,
        reading = false, toRead = false,
        recommended = true, favorites = false, del = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.genre = genre;
        this.read = read;
        this.reading = reading;
        this.toRead = toRead;
		if(this.read == true)
        this.recommended = false;
	    else
		this.recommended = recommended;
        this.favorites = favorites;
		this.genre = genre;
		this.del = del;
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
	
   toggleReadHandler (){
    this.toggleRead();
    if(this.read == true) {
		this.toRead = false;
		this.reading = false;
		this.recommended = false;
	}
	
	console.log("The book title toggled: " + this.title);

	if(this.read == false && this.toRead == false && this.reading == false)
	{
		this.recommended = true;
	}
    updateBookshelf();
}

    toggletoReadHandler (){
    this.toggletoRead();
    if(this.toRead == true) {
		this.read = false;
		this.reading = false;
		this.recommended = false;
	}
	if(this.read == false && this.toRead == false && this.reading == false)
	{
		this.recommended = true;
	}
    updateBookshelf();
}

    toggleReadingHandler (){
    this.toggleReading();
    if(this.reading == true) {
		this.toRead = false;
		this.read = false;
		this.recommended = false;
	}
	if(this.read == false && this.toRead == false && this.reading == false)
	{
		this.recommended = true;
	}
    updateBookshelf();
}
    toggleFavoritesHandler(){
	this.toggleFavorites();

	updateBookshelf();
}
}

function addBookToLibrary(title, author, pages, genres, read) {
    myLibrary.push(new Book(title, author, pages, genres, read));
    updateBookshelf();
}

const deleteBook = (e) => {
    const index = e.target.parentNode.dataset.libraryIndex;
    myLibrary.splice(index, 1);
    updateBookshelf();
}

function updateBookshelf() {
  for(let j = 0; j < 30; j++)
  {
    booksGrid[j].replaceChildren();
  }
    
    let readBook =[];
    let readingBook = [];
    let toreadBook = [];
    let recBook = [];
    let favBook = [];
    for(book of myLibrary)
    {
        if(book.read == true){
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
		
	let i = 0;

    // add book cards to the books grid
    for (book of readBook) {
        // current book's index in myLibrary
        const index = i;
		let btnRead = [];
		let btntoRead = [];
		let btnReading = [];
		let btnFavorite = [];
        
        bookCard = document.createElement('article');
        bookCard.classList.add('book-card');

        const bookTitle = document.createElement('p');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('book-author');
        bookAuthor.textContent = book.author;

        const bookGenres = document.createElement('p');
        bookGenres.classList.add('book-genres');
        bookGenres.textContent = book.genre;

        const bookPages = document.createElement('p');
        bookPages.classList.add('book-pages');
        bookPages.textContent = `${book.pages} pages`;

        const bookButtons = document.createElement('div');
        bookButtons.classList.add('book-buttons');
        bookButtons.dataset.libraryIndex = index;

        btnRead[index] = document.createElement('button');
        btnRead[index].classList.add('btn', 'btn-read');
        btnRead[index].classList.add(book.read ? 'btn-green' : 'btn-red');
        btnRead[index].textContent = (book.read ? "Read" : "Not read");
        btnRead[index].addEventListener('click', function () {readBook[index].toggleReadHandler();});
        bookButtons.appendChild(btnRead[index]);
		
        btntoRead[index] = document.createElement('button');
        btntoRead[index].classList.add('btn', 'btn-toread');
        btntoRead[index].classList.add(book.toRead ? 'btn-green' : 'btn-red');
        btntoRead[index].textContent = (book.toRead ? "To read" : "Not to read");
        btntoRead[index].addEventListener('click', function () {readBook[index].toggletoReadHandler();});
        bookButtons.appendChild(btntoRead[index]);
		
        btnReading[index] = document.createElement('button');
        btnReading[index].classList.add('btn', 'btn-reading');
        btnReading[index].classList.add(book.reading ? 'btn-green' : 'btn-red');
        btnReading[index].textContent = (book.reading ? "Reading" : "Not reading");
        btnReading[index].addEventListener('click', function () {readBook[index].toggleReadingHandler();});
        bookButtons.appendChild(btnReading[index]);
		
        btnFavorite[index] = document.createElement('button');
        btnFavorite[index].classList.add('btn', 'btn-favorite');
        btnFavorite[index].classList.add(book.favorites ? 'btn-green' : 'btn-red');
        btnFavorite[index].textContent = (book.favorites ? "Favorited" : "Not favorited");
        btnFavorite[index].addEventListener('click', function () {readBook[index].toggleFavoritesHandler();});
        bookButtons.appendChild(btnFavorite[index]);

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-delete');
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', deleteBook);
        bookButtons.appendChild(btnDelete);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookGenres);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookButtons);
		
		if(book.genre == 'Comedy')
			booksGrid[0].appendChild(bookCard);      
		else if(book.genre == 'Romance')
			booksGrid[1].appendChild(bookCard);      
		else if(book.genre == 'Horror')
			booksGrid[2].appendChild(bookCard);      
		else if(book.genre == 'Drama')
			booksGrid[3].appendChild(bookCard);      
		else if(book.genre == 'Science Fiction')
			booksGrid[4].appendChild(bookCard);    
        else  
			booksGrid[5].appendChild(bookCard);   			
	    ++i;
    }
	
	i = 0;

    
    // add book cards to the books grid
    for (book of readingBook) {
        // current book's index in myLibrary

        const index = i;
		let btnRead = [];
		let btntoRead = [];
		let btnReading = [];
		let btnFavorite = [];
		
        bookCard = document.createElement('article');
        bookCard.classList.add('book-card');

        const bookTitle = document.createElement('p');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('book-author');
        bookAuthor.textContent = book.author;

        const bookGenres = document.createElement('p');
        bookGenres.classList.add('book-genres');
        bookGenres.textContent = book.genre;

        const bookPages = document.createElement('p');
        bookPages.classList.add('book-pages');
        bookPages.textContent = `${book.pages} pages`;

        const bookButtons = document.createElement('div');
        bookButtons.classList.add('book-buttons');
        bookButtons.dataset.libraryIndex = index;

        btnRead[index] = document.createElement('button');
        btnRead[index].classList.add('btn', 'btn-read');
        btnRead[index].classList.add(book.read ? 'btn-green' : 'btn-red');
        btnRead[index].textContent = (book.read ? "Read" : "Not read");
        btnRead[index].addEventListener('click', function () {readingBook[index].toggleReadHandler();});
        bookButtons.appendChild(btnRead[index]);
		
        btntoRead[index] = document.createElement('button');
        btntoRead[index].classList.add('btn', 'btn-toread');
        btntoRead[index].classList.add(book.toRead ? 'btn-green' : 'btn-red');
        btntoRead[index].textContent = (book.toRead ? "To read" : "Not to read");
        btntoRead[index].addEventListener('click', function () {readingBook[index].toggletoReadHandler();});
        bookButtons.appendChild(btntoRead[index]);
		
        btnReading[index] = document.createElement('button');
        btnReading[index].classList.add('btn', 'btn-reading');
        btnReading[index].classList.add(book.reading ? 'btn-green' : 'btn-red');
        btnReading[index].textContent = (book.reading ? "Reading" : "Not reading");
        btnReading[index].addEventListener('click', function () {readingBook[index].toggleReadingHandler();});
        bookButtons.appendChild(btnReading[index]);

        btnFavorite[index] = document.createElement('button');
        btnFavorite[index].classList.add('btn', 'btn-favorite');
        btnFavorite[index].classList.add(book.favorites ? 'btn-green' : 'btn-red');
        btnFavorite[index].textContent = (book.favorites ? "Favorited" : "Not favorited");
        btnFavorite[index].addEventListener('click', function () {readingBook[index].toggleFavoritesHandler();});
        bookButtons.appendChild(btnFavorite[index]);

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-delete');
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', deleteBook);
        bookButtons.appendChild(btnDelete);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookGenres)
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookButtons);
        
		if(book.genre == 'Comedy')
			booksGrid[6].appendChild(bookCard);      
		else if(book.genre == 'Romance')
			booksGrid[7].appendChild(bookCard);      
		else if(book.genre == 'Horror')
			booksGrid[8].appendChild(bookCard);      
		else if(book.genre == 'Drama')
			booksGrid[9].appendChild(bookCard);      
		else if(book.genre == 'Science Fiction')
			booksGrid[10].appendChild(bookCard);    
        else  
			booksGrid[11].appendChild(bookCard);   	    

        ++i;		
    }
	
	i = 0;

    // add book cards to the books grid
    for (book of toreadBook) {
        // current book's index in myLibrary
        const index = i;
		let btnRead = [];
		let btntoRead = [];
		let btnReading = [];
		let btnFavorite = [];
        
        bookCard = document.createElement('article');
        bookCard.classList.add('book-card');

        const bookTitle = document.createElement('p');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('book-author');
        bookAuthor.textContent = book.author;

        const bookGenres = document.createElement('p');
        bookGenres.classList.add('book-genres');
        bookGenres.textContent = book.genre;

        const bookPages = document.createElement('p');
        bookPages.classList.add('book-pages');
        bookPages.textContent = `${book.pages} pages`;

        const bookButtons = document.createElement('div');
        bookButtons.classList.add('book-buttons');
        bookButtons.dataset.libraryIndex = index;

        btnRead[index] = document.createElement('button');
        btnRead[index].classList.add('btn', 'btn-read');
        btnRead[index].classList.add(book.read ? 'btn-green' : 'btn-red');
        btnRead[index].textContent = (book.read ? "Read" : "Not read");
        btnRead[index].addEventListener('click', function () {toreadBook[index].toggleReadHandler();});
        bookButtons.appendChild(btnRead[index]);
		
        btntoRead[index] = document.createElement('button');
        btntoRead[index].classList.add('btn', 'btn-toread');
        btntoRead[index].classList.add(book.toRead ? 'btn-green' : 'btn-red');
        btntoRead[index].textContent = (book.toRead ? "To read" : "Not to read");
        btntoRead[index].addEventListener('click', function () {toreadBook[index].toggletoReadHandler();});
        bookButtons.appendChild(btntoRead[index]);
		
        btnReading[index] = document.createElement('button');
        btnReading[index].classList.add('btn', 'btn-reading');
        btnReading[index].classList.add(book.reading ? 'btn-green' : 'btn-red');
        btnReading[index].textContent = (book.reading ? "Reading" : "Not reading");
        btnReading[index].addEventListener('click', function () {toreadBook[index].toggleReadingHandler();});
        bookButtons.appendChild(btnReading[index]);

        btnFavorite[index] = document.createElement('button');
        btnFavorite[index].classList.add('btn', 'btn-favorite');
        btnFavorite[index].classList.add(book.favorites ? 'btn-green' : 'btn-red');
        btnFavorite[index].textContent = (book.favorites ? "Favorited" : "Not favorited");
        btnFavorite[index].addEventListener('click', function () {toreadBook[index].toggleFavoritesHandler();});
        bookButtons.appendChild(btnFavorite[index]);

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-delete');
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', deleteBook);
        bookButtons.appendChild(btnDelete);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookGenres);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookButtons);
        
		if(book.genre == 'Comedy')
			booksGrid[12].appendChild(bookCard);      
		else if(book.genre == 'Romance')
			booksGrid[13].appendChild(bookCard);      
		else if(book.genre == 'Horror')
			booksGrid[14].appendChild(bookCard);      
		else if(book.genre == 'Drama')
			booksGrid[15].appendChild(bookCard);      
		else if(book.genre == 'Science Fiction')
			booksGrid[16].appendChild(bookCard);    
        else  
			booksGrid[17].appendChild(bookCard);   	  

        ++i;		
    }
	
	i = 0;

    // add book cards to the books grid
    for (book of recBook) {
        // current book's index in myLibrary

        const index = i;
		let btnRead = [];
		let btntoRead = [];
		let btnReading = [];
		let btnFavorite = [];
        
        bookCard = document.createElement('article');
        bookCard.classList.add('book-card');

        const bookTitle = document.createElement('p');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('book-author');
        bookAuthor.textContent = book.author;

        const bookGenres = document.createElement('p');
        bookGenres.classList.add('book-genres');
        bookGenres.textContent = book.genre;

        const bookPages = document.createElement('p');
        bookPages.classList.add('book-pages');
        bookPages.textContent = `${book.pages} pages`;

        const bookButtons = document.createElement('div');
        bookButtons.classList.add('book-buttons');
        bookButtons.dataset.libraryIndex = index;

        btnRead[index] = document.createElement('button');
        btnRead[index].classList.add('btn', 'btn-read');
        btnRead[index].classList.add(book.read ? 'btn-green' : 'btn-red');
        btnRead[index].textContent = (book.read ? "Read" : "Not read");
        btnRead[index].addEventListener('click', function () {recBook[index].toggleReadHandler();});
        bookButtons.appendChild(btnRead[index]);
		
        btntoRead[index] = document.createElement('button');
        btntoRead[index].classList.add('btn', 'btn-toread');
        btntoRead[index].classList.add(book.toRead ? 'btn-green' : 'btn-red');
        btntoRead[index].textContent = (book.toRead ? "To read" : "Not to read");
        btntoRead[index].addEventListener('click', function () {recBook[index].toggletoReadHandler();});
        bookButtons.appendChild(btntoRead[index]);
		
        btnReading[index] = document.createElement('button');
        btnReading[index].classList.add('btn', 'btn-reading');
        btnReading[index].classList.add(book.reading ? 'btn-green' : 'btn-red');
        btnReading[index].textContent = (book.reading ? "Reading" : "Not reading");
        btnReading[index].addEventListener('click', function () {recBook[index].toggleReadingHandler();});
        bookButtons.appendChild(btnReading[index]);

        btnFavorite[index] = document.createElement('button');
        btnFavorite[index].classList.add('btn', 'btn-favorite');
        btnFavorite[index].classList.add(book.favorites ? 'btn-green' : 'btn-red');
        btnFavorite[index].textContent = (book.favorites ? "Favorited" : "Not favorited");
        btnFavorite[index].addEventListener('click', function () {recBook[index].toggleFavoritesHandler();});
        bookButtons.appendChild(btnFavorite[index]);

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-delete');
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', deleteBook);
        bookButtons.appendChild(btnDelete);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookGenres);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookButtons);
        
		if(book.genre == 'Comedy')
			booksGrid[18].appendChild(bookCard);      
		else if(book.genre == 'Romance')
			booksGrid[19].appendChild(bookCard);      
		else if(book.genre == 'Horror')
			booksGrid[20].appendChild(bookCard);      
		else if(book.genre == 'Drama')
			booksGrid[21].appendChild(bookCard);      
		else if(book.genre == 'Science Fiction')
			booksGrid[22].appendChild(bookCard);    
        else  
			booksGrid[23].appendChild(bookCard);   	

        ++i;		
    }
	
	i = 0;

    // add book cards to the books grid
    for (book of favBook) {
        // current book's index in myLibrary

        const index = i;
		let btnRead = [];
		let btntoRead = [];
		let btnReading = [];
		let btnFavorite = [];
        
        bookCard = document.createElement('article');
        bookCard.classList.add('book-card');

        const bookTitle = document.createElement('p');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('book-author');
        bookAuthor.textContent = book.author;

        const bookGenres = document.createElement('p');
        bookGenres.classList.add('book-genres');
        bookGenres.textContent = book.genre;

        const bookPages = document.createElement('p');
        bookPages.classList.add('book-pages');
        bookPages.textContent = `${book.pages} pages`;

        const bookButtons = document.createElement('div');
        bookButtons.classList.add('book-buttons');
        bookButtons.dataset.libraryIndex = index;

        btnRead[index] = document.createElement('button');
        btnRead[index].classList.add('btn', 'btn-read');
        btnRead[index].classList.add(book.read ? 'btn-green' : 'btn-red');
        btnRead[index].textContent = (book.read ? "Read" : "Not read");
        btnRead[index].addEventListener('click', function () {favBook[index].toggleReadHandler();});
        bookButtons.appendChild(btnRead[index]);
		
        btntoRead[index] = document.createElement('button');
        btntoRead[index].classList.add('btn', 'btn-toread');
        btntoRead[index].classList.add(book.toRead ? 'btn-green' : 'btn-red');
        btntoRead[index].textContent = (book.toRead ? "To read" : "Not to read");
        btntoRead[index].addEventListener('click', function () {favBook[index].toggletoReadHandler();});
        bookButtons.appendChild(btntoRead[index]);
		
        btnReading[index] = document.createElement('button');
        btnReading[index].classList.add('btn', 'btn-reading');
        btnReading[index].classList.add(book.reading ? 'btn-green' : 'btn-red');
        btnReading[index].textContent = (book.reading ? "Reading" : "Not reading");
        btnReading[index].addEventListener('click', function () {favBook[index].toggleReadingHandler();});
        bookButtons.appendChild(btnReading[index]);

        btnFavorite[index] = document.createElement('button');
        btnFavorite[index].classList.add('btn', 'btn-favorite');
        btnFavorite[index].classList.add(book.favorites ? 'btn-green' : 'btn-red');
        btnFavorite[index].textContent = (book.favorites ? "Favorited" : "Not favorited");
        btnFavorite[index].addEventListener('click', function () {favBook[index].toggleFavoritesHandler();});
        bookButtons.appendChild(btnFavorite[index]);

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-delete');
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener('click', deleteBook);
        bookButtons.appendChild(btnDelete);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookGenres);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookButtons);
        
		if(book.genre == 'Comedy')
			booksGrid[24].appendChild(bookCard);      
		else if(book.genre == 'Romance')
			booksGrid[25].appendChild(bookCard);      
		else if(book.genre == 'Horror')
			booksGrid[26].appendChild(bookCard);      
		else if(book.genre == 'Drama')
			booksGrid[27].appendChild(bookCard);      
		else if(book.genre == 'Science Fiction')
			booksGrid[28].appendChild(bookCard);    
        else  
			booksGrid[29].appendChild(bookCard);   	

        ++i;		
    }


    // display info message when no books are present
    if (!myLibrary.length) {
        booksGrid[0].textContent = 'Add your first book.';
        booksGrid[1].textContent = 'Add your first book.';
        booksGrid[2].textContent = 'Add your first book.';
        booksGrid[3].textContent = 'Add your first book.';
        booksGrid[4].textContent = 'Add your first book.';
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
    let genres = inputGenre.value;
    const read = inputRead.checked;

    if(genres === "Other") {
        genres = inputOtherGenre.value;
    }

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
    addBookToLibrary(title, author, pages, genres, read);
    toggleForm();
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
    inputGenre.valu = '';
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

myLibrary.push(new Book('Rich Dad, Poor Dad', 'Robert T. Kiyosaki', 195, "Drama", true));
myLibrary.push(new Book('Be Here Now', 'Ram Dass', 116, "Romance", true));
myLibrary.push(new Book('PIHKAL', 'Alexander Shulgin', 978, "Horror",false));

inputGenre.addEventListener('change', function() {
    if (inputGenre.value === "Other") {
        inputOtherGenre.style.display = "flex";
    }
    else {
        inputOtherGenre.style.display = "none";
    }
})

updateBookshelf();
