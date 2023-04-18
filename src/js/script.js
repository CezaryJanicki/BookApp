{
  'user strict';

  class BookApp {

    constructor() {
      const thisBookApp = this;

      let select = {
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
      thisBookApp.bookCase = Handlebars.compile(document.querySelector(select.templateOf.bookCase).innerHTML);
      thisBookApp.bookListContainer = document.querySelector(select.containerOf.bookList);
      thisBookApp.filters = [];

      thisBookApp.getElements();
      thisBookApp.renderBooks();
      thisBookApp.initActions();
    }

    getElements() {
      const thisBookApp = this;
      thisBookApp.dom = {};
      thisBookApp.dom.bookListContainer = document.querySelector('.books-list');
      thisBookApp.dom.filterDOM = document.querySelector('.filters');
    }

    renderBooks() {
      const thisBookApp = this;
      console.log(thisBookApp.bookListContainer);
      for (let book of dataSource.books) {
        const generatedHTML = thisBookApp.bookCase(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const ratingBar = generatedDOM.querySelector('.book__rating__fill');
        thisBookApp.rateBar(book, ratingBar);
        thisBookApp.bookListContainer.appendChild(generatedDOM);
      }
    }

    initActions() {
      const thisBookApp = this;
      const favoriteBooks = [];
      thisBookApp.bookListContainer.addEventListener('dblclick', function(event) {
        event.preventDefault();
        favoriteBooks.push(event.target.offsetParent.getAttribute('data-id'));
        event.target.offsetParent.classList.toggle('favorite');
      });

      const filtersWrapper = document.querySelector('.filters');
      filtersWrapper.addEventListener('click', function(event) {
        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
          if (event.target.checked == true && thisBookApp.filters.indexOf(event.target.value) == -1) {
            thisBookApp.filters.push(event.target.value);
          } else if (event.target.checked == false && thisBookApp.filters.indexOf(event.target.value) != -1) {
            thisBookApp.filters.splice(thisBookApp.filters.indexOf(event.target.value), 1);
          }
        }
        thisBookApp.renderFilteredBooks();
      });
    }

    renderFilteredBooks() {
      const thisBookApp = this;
      for (const book of dataSource.books) {
        const bookDOM = thisBookApp.bookListContainer.querySelector('[data-id="' + book.id + '"');
        let shouldBeHidden = false;
        for (let detail in book.details) {
          if (book.details[detail] == false && thisBookApp.filters.indexOf(detail) != -1) {
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

    rateBar(book, ratingBar) {
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
  }
  /* eslint-disable no-unused-vars */
  const app = new BookApp();
}
