const express = require('express');
const ArtistaModel = require('../models/artistaModel');
const router = express.Router();
const service = require('../services/artistaService');


//listado de artistas
router.get('/', (req,res,next) => {
    service
        .list()
        .then(listado => {
            res.send(listado);
        }).catch(err => {
            next(new Error('No se pudieron obtener los artistas'));
        });
});

//obtener UN artista
router.get('/:id', (req,res,next) => {
    const {id} = req.params;
    service
        .get(id)
        .then(artista => {
            res.send(artista)
        }).catch(err => {
            next(new Error('no se encontro el artista'));
        })
})

//Agregar Artista
router.post('/', (req,res,next) => {
    const {nombre} = req.body;
    const instancia = new ArtistaModel({
        nombre: nombre
    })
    service
    .save(instancia, true)
    .then(artista => {
        res.status(201).send(artista);
    }).catch(err => {
        next(new Error('No se pudo guardar el artista'));
    })
})

//Actualizar Artista
router.put('/:id', (req,res,next) => {
    const {id} = req.params;
    const {nombre} = req.body;

    const instancia = new ArtistaModel({ _id: idArtista, nombre: nombre});
    service
        .save(instancia, false)
        .then(artista => {
            res.status(200).send(artista); 
        })
        .catch(err => {
            next(new Error('No se pudo actualizar el artista'));
        })
})

router.delete('/:id', (req,res,next) => {
    const {id} = req.params;
    service.delete(id).then(obj => {
        res.status(204).send();
    }).catch(err => {
        next(new Error('No se pudo borrar el artista'));
    })
})

module.exports = router;