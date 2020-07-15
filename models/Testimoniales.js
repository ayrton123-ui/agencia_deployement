const Sequelize=require("sequelize")
const db=require("../config/dataBase")


const Testimoniales=db.define('testimoniales',{
    nombre:{
        type:Sequelize.STRING   
    },
    correo:{
        type:Sequelize.STRING
    },
    mensaje:{
        type:Sequelize.STRING
    }
})

module.exports=Testimoniales