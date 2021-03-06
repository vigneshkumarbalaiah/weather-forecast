
console.log('Java script ')

const form = document.querySelector('form')
const address = document.querySelector('input')
var message1 = document.querySelector('#message-1')
var message2 = document.querySelector('#message-2')
var message3 = document.querySelector('#message-3')

form.addEventListener('submit',(e) => {
    e.preventDefault()
    message1.textContent = 'Loading weather details'
    fetch('/weather?address='+address.value).then((response) => {
    response.json().then((data) => {
        if(!data.error){
            //console.log(data)
            message1.textContent = data.location
            message2.textContent = data.temperature
            message3.textContent = data.humidity
        }else{
           
            message1.textContent = data.error
            message2.textContent = ''
            message3.textContent = ''
        }
    })
    
})

})