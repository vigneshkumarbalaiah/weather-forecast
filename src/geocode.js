const request = require('postman-request')

const getGeocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2hpYmlzYW5nZWV0aCIsImEiOiJjbDJpcDljMTAwNDV5M2pxdmkxdjJydHl2In0.kWWhumldNPcSLSekq64a9Q&limit=1'
    request({url, json : true},(error,{body} = response) => {
        if(error){
            callback('Unable to connect', undefined)
        } else if(body.features.length === 0){
            callback('location not found', undefined)
        }else{
            callback(undefined,data = {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            })
        }
    })
}

module.exports = getGeocode