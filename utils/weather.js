const request = require('request')

const weather = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/fb17c5bd06b2630410489fc969652259/'+latitude+','+longitude+'?units=si'
    request({'url':url,'json':true},(error,response)=>{
        if(error){
            callback('Could not connect to Weather Service',undefined)
        }else if(response.body.error){
            callback('Could not find weather for this location. Please try with another location',undefined)
        }else{
            callback(undefined,{
                'temp' : response.body.currently.temperature,
                'prob' : response.body.currently.precipProbability,
                'summary' : response.body.daily.data[0].summary,
            })
        }
    })
}


module.exports = weather