const modal = document.getElementById("modal");
const modalWrapper = document.getElementById("modalWrapper");
const modalOpen = document.getElementById("modalOpen");
const AddBtn= document.getElementById("add");
const shelf = document.getElementById("shelf");


let myLibrary = [ 
  {
    title: 'A Game of Thrones ',
    author: 'George R. R. Martin',
    pages: '694',
    status: true,
  }
];



function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function getBook(){
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const status = document.getElementById("readSts");

myLibrary[n] = new Book(title.value, author.value, pages.value, status.checked) ;

showBook();
n++;
title.value = "", author.value="", pages.value="", status.checked=false;
modalCtrl();
}

function showBook(){

  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-index', n )
  
  const lineOne = document.createElement('div');
  lineOne.classList.add('l-one');
  lineOne.textContent = myLibrary[n].title;

  card.appendChild(lineOne);

  const lineTwo = document.createElement('div');
  lineTwo.classList.add('l-two');
  lineTwo.textContent = myLibrary[n].author;

  card.appendChild(lineTwo);

  const lineThree = document.createElement('div');
  lineThree.classList.add('l-three');
  lineThree.textContent = myLibrary[n].pages;

  card.appendChild(lineThree);

  const delBtn = document.createElement('button');
  delBtn.classList.add('delete');
  delBtn.setAttribute('data-index', n )
  card.appendChild(delBtn);

  const stateFor = document.createElement('label');
  stateFor.setAttribute('for', 'read');
  stateFor.classList.add('read');
  stateFor.setAttribute('id',`read${n}` )
  stateFor.setAttribute('data-index', n )

  const state = document.createElement('input');
  state.setAttribute('type', 'checkbox');
  state.setAttribute('id','read');
  
  stateFor.appendChild(state);

  card.appendChild(stateFor);

  shelf.appendChild(card);

  delBtn.addEventListener("click", function(e) {
    e.preventDefault()
    item = e.target.dataset.index;
    removeBook();
  });
  stateFor.addEventListener("click", function(e) {
    e.preventDefault()
    item = e.target.dataset.index; 
    readSts();
  });
  chkReadSts()
}

function removeBook(){
  myLibrary.splice(myLibrary.indexOf(item),1);
  let card = document.querySelector(`[data-index="${item}"]`)
  shelf.removeChild(card);
  n = myLibrary.length 
}

function readSts(){
  const readStuTarget = document.getElementById(`read${item}`)
  if(myLibrary[item].status == false){
    myLibrary[item].status  = true;
    readStuTarget.classList.add('readed');
  } else if (myLibrary[item].status == true){
    myLibrary[item].status  = false;
    readStuTarget.classList.remove('readed');
  }
}

function intilize() {
  for(let i = 0; i < myLibrary.length; i++ ){
    n = i;
    showBook();
    chkReadSts()
    n = myLibrary.length ;
  }
}

function chkReadSts(){
  const readStuTarget = document.getElementById(`read${n}`)
  if(myLibrary[n].status == true){
    readStuTarget.classList.add('readed');
  } else if (myLibrary[n].status == false){
    readStuTarget.classList.remove('readed');
  }
}

function modalCtrl (){
  modal.classList.toggle('active');             
}


modalOpen.addEventListener("click", modalCtrl )
window.addEventListener("click", function(event) {
if (event.target == modal || event.target == modalWrapper ) {
  modal.classList.toggle('active');     
}
});

AddBtn.addEventListener( "click", getBook );

intilize()

