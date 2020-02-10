'use strict';
const jwt               = require('jsonwebtoken');
const _                 = require('underscore');

function authorization(req, res, next) {
    if(typeof(req.headers.authorization) === 'undefined'){
        return res.status(401).json({message:"Token no encontrado, favor de verificar su información."});
    }

    let tokenBearer = req.headers.authorization;
    let splitToken  = tokenBearer.split(" ");

    if(splitToken[1] === ""){
        return res.status(401).json({message:"Token con mal formato, favor de verificar su información."});
    }

    jwt.verify(splitToken[1], process.env.TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(401).json({message:err.message});        
    });

    next();
}

module.exports = {
    authorization
};