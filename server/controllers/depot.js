const db = require('../db');

exports.getDepot = (req, res) => {
    const sql = "SELECT * FROM depot";
    db.query(sql, (err, results) => {
        if (err)
            console.log(err);
        if (results.length <= 0) {
            res.status(201).send({ message:"il n'ya pas encore de depot ajoute"})
        } else {
            console.log(results)
            res.status(200).send({ message:results})
        }
    })
    
}
exports.addDepot = (req, res) => {
    const {depotName}=req.body;
    const sql = "INSERT INTO depot SET ?";
    db.query(sql, { name_depot:depotName }, async (err, results) => {
        if (err)
            console.log(err);
        else {
            res.status(200).send({message:"depot ajoute"})
        }
    })

}
exports.delete = (req, res) => {
    const { depotName } = req.body
    const sql = "SELECT *  from depot WHERE name_depot=? ";
    db.query(sql, [depotName], (err, results) => {
        if (err) {
            console.log(err);
        }
        if (results.length <= 0) {
            res.status(401).send({message:`le depot  ${depotName}  n'existe pas`})
        } else {

            db.query("DELETE FROM depot WHERE name_depot=?",[depotName], (error, resu) => {
                if (error) {
                    console.log(error);
                } else if (resu.length <= 0) {
                    res.status(201).send({message:`le depot ${depotName}  n'existe pas`})
                }
                else {
                    res.status(200).send({ message:`le depot ${depotName} a ete supprime`})
                }
            })
        }
           

    })
        
}
