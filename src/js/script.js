{
  'use strict';

  const select = {
    templateOf: {
      bookCase: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      bookImage: '.book__image',
    },

  };




  const bookCase = Handlebars.compile(document.querySelector(select.templateOf.bookCase).innerHTML);
  const bookListContainer = document.querySelector(select.containerOf.bookList);

  function renderBooks() {

    console.log(bookListContainer);
    for (let book of dataSource.books) {
      const generatedHTML = bookCase(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      bookListContainer.appendChild(generatedDOM);
    }
  }

  const favoriteBooks = [];

  function initActions() {
    const bookImageContainer = document.querySelectorAll(select.containerOf.bookImage);
    for (const iterator of bookImageContainer) {
      iterator.addEventListener('dblclick', function(event) {
        event.preventDefault();
        favoriteBooks.push(iterator.getAttribute('data-id'));
        iterator.classList.add('favorite');
      });
    }
  }

  renderBooks();
  initActions();
}