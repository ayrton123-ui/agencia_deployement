const express=require("express")

const route=express.Router()
const Viajes=require("../models/Viajes")
const Testimonial=require("../models/Testimoniales")
route.get("/",(req,res)=>{
    const promises=[]

    promises.push(Viajes.findAll({limit:3}))
    promises.push(Testimonial.findAll({limit:3}))

    const resultado=Promise.all(promises)

    resultado.then(resultado=>{
        res.render("index",{
            pagina:'Proximos viajes ',
            clase:'home',
            viajes:resultado[0],
            testimoniales:resultado[1]
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

route.get("/nosotros",(req,res)=>{
    res.render("nosotros",{
        pagina:'Sobre nosotros'
    })
})
route.get("/viajes",(req,res)=>{
    Viajes.findAll()
    .then(viajes=>{
        res.render("viajes",{
            pagina:'Proximos viajes',
            viajes
        })
    })
    .catch(err=>{
        console.log(err)
    })
})
route.get("/viajes/:id",(req,res)=>{
    Viajes.findByPk(req.params.id)
    .then(viaje=>{
        res.render('viaje',{
            viaje
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})
route.get("/testimoniales",(req,res)=>{

    Testimonial.findAll().then((testimoniales)=>{
        res.render("testimoniales",{
            pagina:'testimoniales',
            testimoniales

        })
    })
    .catch(err=>{
        console.log(err)
    })
   
})
route.post("/testimoniales",(req,res)=>{
   
    let {nombre,mensaje,correo} =req.body
    let errores=[]
    if(!nombre){
        errores.push({"mensaje":"escribe nombre"})
    }
    if(!correo){
        errores.push({"mensaje":"escribe correo"})
    }
    if(!mensaje){
        errores.push({"mensaje":"escribe mensaje"})
    }
    if(errores.length>0){
        res.render('testimoniales',{
            nombre,
            correo,
            mensaje,
            errores
        })
    }else{
        Testimonial.create({
            nombre,
            correo,
            mensaje
        }).then(test=>res.redirect("/testimoniales"))
        .catch(error=>console.log(error))
    }
})

module.exports=route