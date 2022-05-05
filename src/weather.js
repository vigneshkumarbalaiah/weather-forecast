const request = require('postman-request')

const getWeather = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=7a26a5dd43431e15e4c880795ba6f226&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
    request({url, json : true},(error,{body} = response) => {
        if(error){
            callback('Unable to connect to weather API ', undefined)
        }else if(body.error){
            callback('Error occured : '+ body.error.info, undefined)
        }else{
            console.log(body)
            console.log(body.current.humidity)
            callback(undefined,data = {
                temperature : body.current.temperature,
                feelsLike : body.current.feelslike,
                location : body.location.name + ', ' + body.location.region + ', ' +
                           body.location.country,
                humidity : body.current.humidity,
                desc : body.current.weather_descriptions[0]
                
            })
        }
    })
}

module.exports = getWeather