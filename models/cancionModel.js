const mongoose = require('mongoose');

const CancionSchema = mongoose.Schema({
    nombre: {
        type: String
    },
    duracion: {
        type: String
    },
    artista_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Artista'
    }
});

module.exports = mongoose.model('Cancion', CancionSchema);