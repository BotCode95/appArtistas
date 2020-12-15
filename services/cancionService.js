const CancionModel = require('../models/cancionModel');
const ArtistaModel = require('../models/artistaModel');
const http = require('axios');

module.exports.get = id => {
    return new Promise((resolve,reject) => {
        CancionModel.findById(id, (err,respuesta) => {
            if(err){
                reject(err);
            }
            resolve(respuesta);
        })
    })
}

module.exports.list = artistaId => {
    return new Promise( (resolve, reject) => {
        CancionModel.find({artista_id: artistaId}, (err,data) => {
            if(err){
                reject(err);
            }
            resolve(listado);
        })
    })
}

module.exports.save = (instancia, esNuevo) => {
    return new Promise((resolve, reject) => {
        if(!esNuevo) {
            //si tiene id es update
            CancionModel.findByIdAndUpdate(
                instancia._id,
                {nombre: instancia.nombre,
                duracion: instancia.duracion},
                (err,data) => {
                    if(err){
                        reject(err);
                    }
                    resolve(data);
                }
            )
        } else {
            //es un alta
            instancia.save((err,data) => {
                if(err){
                    reject(err);
                }
                resolve(data);
            })
        }
    })
}

module.exports.delete = id => {
    return new Promise((resolve,reject) => {
        CancionModel.findByIdAndRemove(id, (err,data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        })
    })
}

module.exports.lyrics = (artistaId, cancionId) => {
    return new Promise((resolve,reject) => {
        ArtistaModel.findById(artistaId, (err,artista) => {
            if(err){
                next(new Error('No se encontro el artista'));
            }
            CancionModel.findById(cancionId, (err,cancion) => {
                if(err){
                    next(new Error("No se encontro la cancion"))
                }
                const nombreArtista = artista.nombre;
                const nombreCancion = cancion.nombre;
                http.get(
                    `https://api.lyrics.ovh/v1/${nombreArtista}/${nombreCancion}`
                    ).then(respuesta => {
                        resolve(respuesta.data.lyrics);
                    }).catch(error => {
                        reject(error);
                    })
            })
        })
    })
}