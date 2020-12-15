const express = require('express')
const service = require('../services/cancionService');
const CancionModel = require('../models/cancionModel');
const router = express.Router();

// /artistas/:artista_id/canciones
// Listado de canciones del artista
router.get("/", (req, res, next) => {
    const artistaId = req.params.artista_id;
    service
      .list(artistaId)
      .then(listado => {
        res.render("canciones_listado", {
          listado: listado,
          artista_id: artistaId
        });
      })
      .catch(err => {
        next(new Error("No se pudo acceder al listado de canciones"));
      });
  });
  
  router.get("/add", (req, res, next) =>  {
    const artistaId = req.params.artista_id;
    res.render("canciones_edicion", { obj: {}, artista_id: artistaId });
  });
  
  router.post("/add", (req, res, next) => {
    const artistaId = req.params.artista_id;
    const {nombre, duracion} = req.body;
    const instancia = new CancionModel({
      nombre: nombre,
      duracion: duracion,
      artista_id: artistaId
    });
    service
      .save(instancia, true)
      .then(obj => {
        res.redirect("/artistas/" + artistaId + "/canciones"); // Redireccion al listado de canciones del artista
      })
      .catch(err => {
        next(new Error("No se pudo guardar la cancion"));
      });
  });
  
  router.get("/:id/edit", (req, res, next) => {
    const artistaId = req.params.artista_id;
    const cancionId = req.params.id;
    service
      .get(cancionId)
      .then(cancion => {
        res.render("canciones_edicion", {
          obj: cancion,
          artista_id: artistaId
        });
      })
      .catch(err => {
        next(new Error("No se pudo obtener la cancion"));
      });
  });
  
  router.post("/:id/edit", (req, res, next) => {
    const artistaId = req.params.artista_id;
    const cancionId = req.params.id;
    const {nombre, duracion} = req.body;
    const instancia = new CancionModel({
      nombre: nombre,
      duracion: duracion,
      artista_id: artistaId
    });
    service
      .save(instancia, false)
      .then(cancion => {
        res.redirect("/artistas/" + artistaId + "/canciones");
      })
      .catch(err => {
        next(new Error("No se pudo obtener la cancion"));
      });  
  });
  
  router.get("/:id/delete", (req, res, next) =>  {
    const cancionId = req.params.id;
    const artistaId = req.params.artista_id;
    service.delete(cancionId).then( cancion => {
        res.redirect("/artistas/" + artistaId + "/canciones");
    }).catch(err => {
        next(new Error("No se pudo borrar la cancion"));
    })
  });
  
  // Retornar la letra de la cancion
  router.get("/:id/lyrics", (req, res, next) => {
    // Debemos obtener el artista y la cancion por sus Ids
    // Realizar peticion a servidor de letras (Necesitamos componente de conexion. Usamos axios)
    // retornar la respuesta
    const artistaId = req.params.artista_id;
    const cancionId = req.params.id;
    service.lyrics(artistaId, cancionId).then( lyrics => {
        res.render('canciones_letra', {letra: lyrics});
    }).catch(err => {
        console.log(err);
        next(new Error('No se pudo conectar con el servidor'));
    })
  });

module.exports = router;