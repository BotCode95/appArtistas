const express = require('express');
const service = require('../services/cancionService')
const CancionModel = require('../models/cancionModel');
const router = express.Router();

/**
 * Canciones
 * GET /api/artistas/:artista_id/canciones
 *  -> Listado de canciones del artista (artista_id)
 * GET /api/artistas/:artista_id/canciones/:id 
 * -> Obtener la cancion segun id
 * POST /api/artistas/:artista_id/canciones
 * -> Agregar una cancion al artista (artista_id)
 * PUT /api/artistas/:artista_id/canciones/:id 
 * -> Actualizar la cancion
 * DELETE /api/artistas/:artista_id/canciones/:id
 * -> Borrar la cancion
 */

 //listado de canciones del artista
 router.get('/', (req,res,next) => {
     const {id} = req.params;
     service
     .list(id)
     .then(listado => {
         res.send(listado)
     })
     .catch(err => {
         next(new Error('no se pudieron obtener las canciones'));
     })
 })

 //obtener una cancion
 router.get('/:id', (req,res,next) => {
     const {id} = req.params;
     service
     .get(id)
     .then(cancion => {
         res.send(cancion);
     })
     .catch(err => {
        next(new Error('no se pudo encontrar la cancion'));
     })
 });

 //agregar cancion
 router.post('/', (req,res,next) => {
     const {nombre, duracion} = req.body;
     const {id} = req.params;
     const instancia = new CancionModel({
         nombre,
         duracion,
         id
     });
     service 
     .save(instancia, true) // esNuevo : true
     .then(cancion => {
         res.status(201).send(cancion)
     })
     .catch(err => {
         next(new Error('no se pudo guardar la cancion'))
     })
 });


 router.put('/:id', (req,res,next) => {
     const {nombre, duracion} = req.body;
     const {id} = req.params;
     const instancia = new CancionModel({
         nombre,
         duracion,
         id
     })
     service
     .save(instancia, false)
     .then(cancion => {
         res.send(cancion)
     })
     .catch(err => {
         next(new Error('no se pudo actualizar la cancion'))
     })
 });

 router.delete('/:id', (req,res,next) => {
     const {id} = req.params;
     service
     .delete(id)
     .then(rta => {
         res.status(204).send();
     })
     .catch(err => {
         next(new Error('no se pudo borrar la cancion'))
     })
 });


 //retornar la letra de la cancion
 router.get('/:id/lyrics', (req,res,next) => {
     const artistaId = req.params.artista_id;
     const cancionId = req.params.id;
     service.lyrics(artistaId, cancionId).then(lyrics => {
         res.send(lyrics);

     })
     .catch(err => {
         next(new Error('no se pudo obtener la letra'))
     })
 })

 module.exports = router;