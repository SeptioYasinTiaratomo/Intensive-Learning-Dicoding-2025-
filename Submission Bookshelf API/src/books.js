const { nanoid } = require('nanoid');

const books = [];

const addBook = ({
  name, year, author, summary, publisher, pageCount, readPage, reading,
}) => {
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  return newBook;
};

const getAllBooks = () => books;

const getBookById = (id) => books.find((book) => book.id === id);

const editBook = (id, {
  name, year, author, summary, publisher, pageCount, readPage, reading,
}) => {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return false;

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    updatedAt,
  };

  return true;
};

const deleteBook = (id) => {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return false;
  books.splice(index, 1);
  return true;
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  editBook,
  deleteBook,
};
