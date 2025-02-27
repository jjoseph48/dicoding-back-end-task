const { nanoid } = require('nanoid');
const notes = require('./notes');

// logika menyimpan catatan dari client ke array
const addNoteHandler = (request, h) => {
  // tarik body request client dengan perintah '.payload'
  const { title, tags, body } = request.payload;

  // siapkan properti dari objek notes
  // buat value variable id unik dengan library nanoid
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
 
  const newNote = {
   title, tags, body, id, createdAt, updatedAt,
  };

  // push objek ke array notes
  notes.push(newNote);

  // cek apakah note berhasil ditambahkan ke array atau tidak
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  // jika berhasil kirimkan pesan berhasil
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  // response ketika tidak berhasil
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// logika untuk menampilkan seluruh note
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// logika untuk menampilkan note secara spesifik
const getNoteByIdHandler = (request, h) => {
  // dapatkan id dari note
  const { id } = request.params;

  // cek apakah note dengan id ada di array
  const note = notes.filter((n) => n.id === id)[0];

  // ambil data note jika note ada di array
  if (note !== undefined) {
      return {
        status: 'success',
        data: {
          note,
        },
      };
    }

  // kirim pesan saat note tidak ada di arrat
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// logika untuk mengedit note
const editNoteByIdHandler = (request, h) => {
 const { id } = request.params;
 
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
 
  const index = notes.findIndex((note) => note.id === id);
 
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
 
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
 
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// logic for delete note
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
 
  const index = notes.findIndex((note) => note.id === id);
 
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// export objek literal
module.exports = { addNoteHandler, getAllNotesHandler, 
                  getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler, };
