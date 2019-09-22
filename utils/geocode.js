const request = require('request')

const geocode = ( (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHVsa2l0MjQ2NiIsImEiOiJjazBreDdrcm8wbzc4M2JsaWVoN2U2N3gwIn0.2Ax7ojO-GGTRHciK5wmJxA'
    request({'url':url,'json':true},(error,response)=>{
        if(error){
            callback('Could not connect to the location service',undefined)
        }else if(response.body.features.length == 0){
            callback('Could not find co-ordinates for given location. Please try again with some other location.',undefined)
        }else{
            callback(undefined,{
                'latitude' : response.body.features[0].center[1],
                'longitude' : response.body.features[0].center[0],
                'location' : response.body.features[0].place_name

            })
        }
    })
})

module.exports = geocode