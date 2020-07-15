const express=require("express")
const path=require("path")
const app=express()
const routes=require("./routes/routes")
const configs=require("./config/index")
const db=require("./config/dataBase")
require("dotenv").config({path:'variables.env'})
app.set("view engine","pug")
app.set("views",path.join(__dirname,'./views'))
db.authenticate().then(()=>{
    console.log('ok')
}).catch(err=>{
    console.log(err)
})
app.use("/",express.static(path.join(__dirname,"./public")))

const config=configs[app.get('env')]
app.locals.titulo=config.nombresitio
app.use(express.urlencoded({extended:false}))
app.use((req,res,next)=>{
    const fecha= new Date()
    res.locals.fechaActual=fecha.getFullYear()
    res.locals.ruta=req.path
    return next()
})

app.use("/",routes)

const port=process.env.PORT || 3000
const host=process.env.HOST || '0.0.0.0'
app.listen(port,host,()=>{
    console.log('servidor funcionando')
})