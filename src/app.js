const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const geocode = require('../utils/geocode')
const weather = require('../utils/weather')
const port = process.env.PORT || 3000
//Configure Directory Paths
const publicDirectorypath = path.join(__dirname,'\..')+"\\public"
const partialsPath = path.join(__dirname,'../templates/partials')
const viewspath = path.join(__dirname,'../templates/views')

const app = express()

app.use(express.static(publicDirectorypath))

//Setting Configurations
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
    res.render('index', {
        'title' : 'Weather',
        'name' : 'Pulkit'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        'title' : 'About!!!',
        'name' : 'Pulkit'
    })
})

app.get('/help',(req,res)=>{
    res.render('help' ,{
        'title' : 'Help!!!',
        'helpMessage' : 'This is some help text',
        'name' : 'Pulkit'
    })
})

app.get('/weather', (req,res) =>{
    if(!req.query.address)
    {
       return res.send({
           'error' : 'Please provide an Adress' 
       }) 
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            res.send({error})
        }
        else{
            const location = data.location
            weather(data.latitude,data.longitude,(error,data)=>{
                if(error){
                    res.send({error})
                }
                else{
                    res.send({
                        location,
                        'temp': data.temp,
                        'prob' : data.prob,
                        'summary' : data.summary,
                        'Address' : req.query.address
                    })
                }
            })
        }
    })
})

app.get('/help/*',(req,res) =>{
    res.render('error',{
        'title' : 'Error 404!!!',
        'error' : 'Help page not found',
        'name' : 'Pulkit'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        'title' : 'Error 404!!!',
        'error' : 'Error 404 page',
        'name' : 'Pulkit'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port '+port+'.')
})