const jwt               = require('jsonwebtoken');
const bcrypt            = require('bcrypt');
const Todo              = require('../models/todo.model');
const moment            = require('moment-timezone');
const _                 = require('underscore');

function getById(req, res ,next){
    let filters = req.params;

    if(typeof(filters.id) === 'undefined'){
        return res.status(409).json({message:"Faltan datos por ingresar"});
    }

    Todo.findOne({_id: filters.id}, (err, data) => {
        if(data === null) return res.status(409).send({message:"Usuario no encontrado, verifique su información.", reason:"access"});
        
        let item = {
            _id         : data._id,
            description : data.Description,
            file        : data.File,
            typeFile    : data.TypeFile,
            status      : data.Status
        };

        return res.status(200).send(item);                 
    });   
}

function getByFilters(req, res ,next){
    const limit = parseInt(process.env.LIMIT_FOR_PAGE);
    let filters = {};
    let page    = typeof(req.query.page) !== 'undefined' ? (parseInt(req.query.page) - 1) * limit  : 1;

    if(typeof(req.query.description) !== 'undefined'){
        filters.description = new RegExp(req.query.description, 'i');
    }

    if(typeof(req.query.status) !== 'undefined'){
        filters.status = new RegExp(req.query.status, 'i');
    }

    new Promise((resolve, reject) => {
        Todo.find(filters,{},{skip:page, limit:limit},(err, data) => {
            if(err) return res.status(409).json({message:err});
            
            let response = [];
            data.forEach(row => {
                let item = {
                    _id         : row._id,
                    description : row.Description,
                    file        : row.File,
                    typeFile    : row.TypeFile,
                    status      : row.Status,
                };

                response.push(item);
            });

            resolve(response);
        });  
    }).then((data) => {
        Todo.countDocuments(filters, (err, result) => {
            if(err) return res.status(409).json({message:err});

            return res.status(200).json({data:data, count: result, page : parseInt(req.query.page)});
        });
    });
   
}

function save(req, res ,next){
    let body    = req.body;
    let todo = new Todo({
        Description : body.description,
        File        : body.file,
        TypeFile    : body.typeFile,
        Status      : body.status
    });

    todo.save((err, data) => {
        if(err){ console.error("Guardar TODO", err); return res.status(409).json({message:'Problemas al guardar el todo.'})};

        return res.status(201).json(data);
    });
}

function update(req, res ,next){
    let filters = req.params;
    let body    = req.body;

    if(typeof(filters.id) === 'undefined'){
        return res.status(409).json({message:"Faltan datos por ingresar"});
    }

    Todo.findOneAndUpdate({_id:filters.id},{
        $set :{
            Description : body.description,
            File        : body.file,
            TypeFile    : body.typeFile,
            Status      : body.status
        }
    },{new: true}, function(err, data){
        if(err) return res.status(409).json({message:err});

        return res.status(200).json(data);
    });
}

function deleteF(req, res ,next){
    let filters = req.params;

    if(typeof(filters.id) === 'undefined'){
        return res.status(409).json({message:"Faltan datos por ingresar"});
    }

    Todo.findOneAndUpdate({_id:filters.id},{
        $set :{
            Status      : false
        }
    }, function(err, data){
        if(err) return res.status(409).json({message:err});

        return res.status(200).json(data);
    });
}

module.exports = {
    getById,
    getByFilters,
    save,
    update,
    deleteF
}