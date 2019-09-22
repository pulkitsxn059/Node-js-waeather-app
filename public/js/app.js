

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = weatherForm.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = search.value
    p1.textContent = 'Loading....'
    p2.textContent = ''
    fetch('http://localhost:3000/weather?address='+address+'&rating=5').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            p1.textContent = data.error
        }else{
            p1.textContent = data.location 
            p2.textContent = data.summary+' It is currently '+ data.temp +'^ out there and it is '+ data.prob +'% chance to rain.'
        }
    })
})
})