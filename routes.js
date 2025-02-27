const { 
  addBookHandler, 
  getAllBooksHandler, 
  getBookByIdHandler, 
  editBookByIdHandler, 
  deleteBookByIdHandler, 
} = require('./handler');

const routes = [
  // Route untuk menambahkan buku
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  // Route untuk mendapatkan semua buku
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  // Route untuk mendapatkan buku berdasarkan ID
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  // Route untuk mengedit buku berdasarkan ID
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  },
  // Route untuk menghapus buku berdasarkan ID
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
