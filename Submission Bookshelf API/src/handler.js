const {
  addBook,
  getAllBooks,
  getBookById,
  editBook,
  deleteBook,
} = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  // Validasi: nama wajib diisi
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  // Validasi: readPage tidak boleh lebih besar dari pageCount
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const newBook = addBook({
    name, year, author, summary, publisher, pageCount, readPage, reading,
  });

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: newBook.id,
    },
  }).code(201);
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = getAllBooks();

  if (name) {
    const nameLower = name.toLowerCase();
    filteredBooks = filteredBooks.filter(
      (book) => book.name.toLowerCase().includes(nameLower),
    );
  }

  if (reading === '0' || reading === '1') {
    filteredBooks = filteredBooks.filter(
      (book) => book.reading === (reading === '1'),
    );
  }

  if (finished === '0' || finished === '1') {
    filteredBooks = filteredBooks.filter(
      (book) => book.finished === (finished === '1'),
    );
  }

  const responseBooks = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return h.response({
    status: 'success',
    data: {
      books: responseBooks,
    },
  });
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = getBookById(bookId);

  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {
      book,
    },
  });
};

const editBookHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const success = editBook(bookId, {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  });

  if (!success) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
};

const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;

  const success = deleteBook(bookId);

  if (!success) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookHandler,
  deleteBookHandler,
};
