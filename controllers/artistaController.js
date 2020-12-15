const express = require('express');
const ArtistaModel = require('../models/artistaModel');
const service = require('../services/artistaService');
const router = express.Router();


router.get('/', (req,res,next) => {
    service
        .list()
        .then(listado => {
            res.render('artistas_listado', 
            {listado: listado})
        })
        .catch(err => {
            next(new Error('no se pudieron obtener los artistas'));
        })
})

router.get('/add', (req,res,next) => {
    //muestro el formulario de carga(una vista)
    res.render('artistas_edicion', 
    {obj: {}})
})

//Guarda un nuevo artista
router.post('/add', (req,res,next) => {
    const {nombre} = req.body;
    const instancia = new ArtistaModel({
        nombre: nombre
    })
    service
        .save(instancia, true)
        .then(artista => {
            res.redirect('/artistas');
    })
    .catch(err => {
        next(new Error('no se pudo guardar el artista'));
    })
})

//borrar un artista
router.get('/:id/delete', (req,res,next) => {
    // 1. obtener el id del artista a borrar
    //2. borrar el artista
    // 3. redireccionar el listado si esta todo ok
    const {id} = req.params;
    service
        .delete(id)
        .then(obj => {
            res.redirect('/artistas');
        })
        .catch(err => {
            next(new Error('no se pudo borrar el artista'));
        })
});

//formulario de edicion de artista
router.get('/:id/edit', (req,res,next) => {
    //1. busco el artista por id
    //2. muestro el formulario de edicion y le paso el artista
    const {id} = req.params;
    service
        .get(id).then(artista => {
            res.render('artistas_edicion', {obj: artista});
        })
        .catch(err => {
            next(new Error('no se encontro el artista'));
        })
});

// Actualizar un artista (recibe los datos enviados desde el formulario de edicion)
router.post("/:id/edit", (req, res, next) =>{
    // 1. Busco el artista y actualizo sus datos
    // 2. Si esta todo bien, vuelvo al listado de artistas
    const {id} = req.params;
    const {nombre} = req.body;
    var instancia = new ArtistaModel(
        { _id: id, nombre: nombre });
    service
      .save(instancia, false)
      .then(artista => {
        res.redirect("/artistas"); // Si todo esta bien vuelve al listado de artistas
      })
      .catch(err => {
        next(new Error("No se pudo guardar el artista"));
      });
  });

module.exports = router;