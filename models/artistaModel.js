const mongoose = require('mongoose');

const ArtistaSchema = mongoose.Schema({
    nombre: {
        type : String
    }
});

module.exports = mongoose.model('Artista', ArtistaSchema);