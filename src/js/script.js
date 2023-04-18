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
    filters: '.filters',
    ratingFill: '.book__rating__fill',

  };

  const filters = [];

  const bookCase = Handlebars.compile(document.querySelector(select.templateOf.bookCase).innerHTML);
  const bookListContainer = document.querySelector(select.containerOf.bookList);

  function renderBooks() {

    console.log(bookListContainer);
    for (let book of dataSource.books) {
      const generatedHTML = bookCase(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const ratingBar = generatedDOM.querySelector(select.ratingFill);
      rateBar(book, ratingBar);
      bookListContainer.appendChild(generatedDOM);
    }
  }

  const favoriteBooks = [];

  function initActions() {
    const bookListContainer = document.querySelector(select.containerOf.bookList);
    bookListContainer.addEventListener('dblclick', function(event) {
      event.preventDefault();
      favoriteBooks.push(event.target.offsetParent.getAttribute('data-id'));
      event.target.offsetParent.classList.toggle('favorite');
    });

    const filtersWrapper = document.querySelector(select.filters);
    filtersWrapper.addEventListener('click', function(event) {
      if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
        if (event.target.checked == true && filters.indexOf(event.target.value) == -1) {
          filters.push(event.target.value);
        } else if (event.target.checked == false && filters.indexOf(event.target.value) != -1) {
          filters.splice(filters.indexOf(event.target.value), 1);
        }
      }
      renderFilteredBooks();
    });
  }

  function renderFilteredBooks() {
    for (const book of dataSource.books) {
      const bookDOM = bookListContainer.querySelector('[data-id="' + book.id + '"');
      let shouldBeHidden = false;
      for (let detail in book.details) {
        if (book.details[detail] == false && filters.indexOf(detail) != -1) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden == true && bookDOM.classList.contains('hidden') == false) {
        bookDOM.classList.add('hidden');

      } else if (shouldBeHidden == false && bookDOM.classList.contains('hidden') == true) {
        bookDOM.classList.remove('hidden');
      }
    }
  }

  function rateBar(book, ratingBar) {
    if (book.rating < 6) {
      ratingBar.style = `background: linear-gradient(to right, #fefcea ${book.rating * 10}%,transparent ${100 - book.rating * 10}%)`;
    } else if (book.rating > 6 && book.rating <= 8) {
      ratingBar.style = `background: linear-gradient(to right, #b4df5b ${book.rating * 10}%,transparent ${100 - book.rating * 10}%)`;
    } else if (book.rating > 8 && book.rating <= 9) {
      ratingBar.style = `background: linear-gradient(to right, #299a0b ${book.rating * 10}%,transparent ${100 - book.rating * 10}%)`;
    } else {
      ratingBar.style = `background: linear-gradient(to right, #ff0084 ${book.rating * 10}%,transparent ${100 - book.rating * 10}%)`;
    }
  }

  renderBooks();
  initActions();
}


