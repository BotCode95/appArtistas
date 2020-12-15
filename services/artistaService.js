const ArtistaModel = require('../models/artistaModel');

module.exports.get = id => {
    return new Promise((resolve,reject) => {
        ArtistaModel.findById(id, (err,respuesta) => {
            if(err){
                reject(err);
            }
            resolve(respuesta);
        })
    })
}

module.exports.list = () => {
    return new Promise( (resolve, reject) => {
        ArtistaModel.find({}, (err,listado) => {
            if(err) {
                reject(err);
            }
            resolve(listado);
        })
    })
}

module.exports.save = (instancia, esNuevo) => {
    return new Promise((resolve,reject) => {
        if(!esNuevo){
            //si tiene id es update
            ArtistaModel.findByIdAndUpdate(instancia._id,
                 {nombre: instancia.nombre}, (err,data) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(data)
                 })
        } else {
            //es un alta
            instancia.save((err, data) => {
                if(err){
                    reject(err)
                }
                resolve(data);
            })
        }
    })
}

module.exports.delete = id => {
    return new Promise( (resolve, reject) => {
        ArtistaModel.findByIdAndRemove(id, (err,data) =< {
            if(err){
                reject(err);
            }
            resolve(data);
        })
    })
}