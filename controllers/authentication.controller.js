const jwt               = require('jsonwebtoken');
const bcrypt            = require('bcrypt');
const User              = require('../models/user.model');
const moment            = require('moment-timezone');
const _                 = require('underscore');

function oauth(req, res ,next){
    let body = req.body;

    if(typeof(body.email) === 'undefined' || typeof(body.password) === 'undefined'){
        return res.status(409).json({message:"Faltan datos por ingresar"});
    }

    User.findOne({email: body.email}, (err, data) => {
        if(data === null) return res.status(409).send({message:"Usuario no encontrado, verifique su información.", reason:"access"});

        new Promise((resolve) => {
            if(bcrypt.compareSync(body.password, data.password)) {
                let token = jwt.sign({                   
                    email       : body.email,
                    username    : data.nombreCompleto,
                }, process.env.TOKEN_SECRET, { expiresIn: process.env.TIME_EXPIRATION_SET_PASSWORD });

                resolve({token: token, user: data});                
            } else {
                return res.status(409).send({message:"Password incorrecta, verifique su información.", reason:"access"});
            }           
        }).then((response) => {
            response.user.password = '';
            return res.status(200).send(response);
        });                  
    });   
}

module.exports = {
    oauth    
}