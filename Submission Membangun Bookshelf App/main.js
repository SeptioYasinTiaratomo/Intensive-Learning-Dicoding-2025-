document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'BOOKSHELF_DATA';

  let books = [];
  let editingBookId = null;

  const bookForm = document.getElementById('bookForm');
  const incompleteList = document.getElementById('incompleteBookList');
  const completeList = document.getElementById('completeBookList');
  const searchForm = document.getElementById('searchBook');
  const searchInput = document.getElementById('searchBookTitle');

  // Load data dari localStorage
  const loadFromStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      books = JSON.parse(data);
    }
  };

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  };

  const resetForm = () => {
    bookForm.reset();
    editingBookId = null;
    bookForm.querySelector('button').innerHTML = 'Masukkan Buku ke rak <span>Belum selesai dibaca</span>';
  };

  const renderBooks = (filter = '') => {
    incompleteList.innerHTML = '';
    completeList.innerHTML = '';

    books
      .filter(book => book.title.toLowerCase().includes(filter.toLowerCase()))
      .forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.setAttribute('data-bookid', book.id);
        bookElement.setAttribute('data-testid', 'bookItem');

        bookElement.innerHTML = `
          <h3 data-testid="bookItemTitle">${book.title}</h3>
          <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
          <p data-testid="bookItemYear">Tahun: ${book.year}</p>
          <div>
            <button data-testid="bookItemIsCompleteButton">
              ${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}
            </button>
            <button data-testid="bookItemDeleteButton">Hapus Buku</button>
            <button data-testid="bookItemEditButton">Edit Buku</button>
          </div>
        `;

        // Tombol: Toggle status selesai
        bookElement.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', () => {
          book.isComplete = !book.isComplete;
          saveToStorage();
          renderBooks(searchInput.value);
        });

        // Tombol: Hapus buku
        bookElement.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', () => {
          books = books.filter(b => b.id !== book.id);
          saveToStorage();
          renderBooks(searchInput.value);
        });

        // Tombol: Edit buku
        bookElement.querySelector('[data-testid="bookItemEditButton"]').addEventListener('click', () => {
          document.getElementById('bookFormTitle').value = book.title;
          document.getElementById('bookFormAuthor').value = book.author;
          document.getElementById('bookFormYear').value = book.year;
          document.getElementById('bookFormIsComplete').checked = book.isComplete;

          editingBookId = book.id;
          bookForm.querySelector('button').innerHTML = 'Perbarui Buku';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        if (book.isComplete) {
          completeList.appendChild(bookElement);
        } else {
          incompleteList.appendChild(bookElement);
        }
      });
  };

  // Event: Submit Form Buku
  bookForm.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.getElementById('bookFormTitle').value.trim();
    const author = document.getElementById('bookFormAuthor').value.trim();
    const year = parseInt(document.getElementById('bookFormYear').value);
    if (isNaN(year)) {
    alert("Tahun harus berupa angka.");
    return;
}

    const isComplete = document.getElementById('bookFormIsComplete').checked;

    if (!title || !author || isNaN(year)) return;

    if (editingBookId !== null) {
      const book = books.find(b => b.id === editingBookId);
      if (book) {
        book.title = title;
        book.author = author;
        book.year = year;
        book.isComplete = isComplete;
      }
    } else {
      const newBook = {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
      };
      books.push(newBook);
    }

    saveToStorage();
    renderBooks(searchInput.value);
    resetForm();
  });

  // Event: Pencarian Buku
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    renderBooks(searchInput.value);
  });

  // Initial Load
  loadFromStorage();
  renderBooks();
});
