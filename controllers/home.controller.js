function home(req, res, next){
    return res.status(200).json({message: "Bienvenido!"});
}

module.exports = {
    home
}