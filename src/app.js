const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./geocode')
const weather = require('./weather')

const express_app = express()
//set public path
const publicDirectoryPath = path.join(__dirname,'../public')
express_app.use(express.static(publicDirectoryPath))

//set views path
const viewsPath = path.join(__dirname,'../templates/views')
express_app.set('views',viewsPath)

//set partial path
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

express_app.set('view engine','hbs')

express_app.get('',(req, res) => {
    res.render('',{
        title: 'Weather Application - Node and Express js!'
    })
})

express_app.get('/about',(req, res) => {
    res.render('about',{
        title:'Hi, Im Vicky',
        desc: 'Software Engineer - Cognizant | Ex-TCS'
    })
})

express_app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({error: 'Please provide an address'})
    }
    geocode(req.query.address,(error, {latitude,longitude} = {}) => {
        if(error){
            return res.send({error: 'Error occured in geocode : ' + error})
        }
        //console.log('latitude : '+ latitude)
        //console.log('longitude : '+ longitude)
        
        weather(latitude,longitude,(error, {location,temperature,feelsLike} = {}) => {
            //console.log(chalk.green.bold('Weather Results'))
            if(error)
                return res.send({error: 'Error occured in weather : ' + error})
            res.send({
                address: req.query.address,
                location: location,
                temperature: 'It is currently '+temperature+' degrees. It feels like '+feelsLike+' degrees.'
            })
            
            //console.log('Location : '+location)
            //console.log('It is currently '+temperature+' degrees. It feels like '+feelsLike+' degrees.')
        })
    })
})

express_app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help contents',
        helpMsg : 'This is the help article'
    })
})

express_app.get('/help/*',(req, res) => {
    res.render('error',{
        errorMsg : 'help article not found'
    })
})

express_app.get('*',(req, res) => {
    res.render('error',{
        errorMsg : 'Error 404 page not found'
    })
})

express_app.listen(3000,() => {
    console.log('Application started')
})
