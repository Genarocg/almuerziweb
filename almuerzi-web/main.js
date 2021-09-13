
let mealsState =[]
let user= {}
let ruta = 'login' //login, register and orders
const stringToHTML= (s) =>{
    const parser = new DOMParser()
    const doc = parser.parseFromString(s, 'text/html')
    return doc.body.firstChild

}
//Funcion render con backticks que renderiza una cadena de string
const renderItem=(item) => {
    const element=stringToHTML(`<li data-id ="${item._id}">${item.name}</li>`)
    element.addEventListener('click', ()=>{
        const mealsList = document.getElementById('meals-list')
        Array.from(mealsList.children).forEach(x => x.classList.remove('selected'))
        element.classList.add('selected')
        const mealsIdInput= document.getElementById('meals-id')
        mealsIdInput.value =item._id
        
       // element.classList.remove('selected')
        console.log(item)
    })

    return element
}

const renderOrder= (order, meals)=>{
    const meal= meals.find(meal =>meal._id === order.meal_id)
    const element=stringToHTML(`<li data-id ="${order._id}">${meal.name} - ${order.user_id}</li>`)
    return element
}

const inicializaFormulario =() =>
{
    const orderForm = document.getElementById('order')
    const token = localStorage.getItem('token')

    orderForm.onsubmit= (e) =>
    {
        e.preventDefault()
        const enviar =document.getElementById('enviar')
        enviar.setAttribute('disabled', true)

        const mealId= document.getElementById('meals-id')
        const mealIdValue= mealId.value
        if( !mealIdValue){
            alert('Debe seleccionar un plato')
            enviar.removeAttribute('disabled')

            return
        }
        const order={
            meal_id:mealIdValue, 
            user_id: user._id,
        }
        fetch('https://serverless-genarocg.vercel.app/api/orders', {
            method: 'POST',
            headers:{
                'content-type': 'application/json',
                authorization: token,
            },
            body: JSON.stringify(order)
        }).then(x=>x.json())
        .then(respuesta =>{
            const renderedOrder = renderOrder(respuesta,mealsState)
            const ordersList = document.getElementById('orders-list')
            ordersList.appendChild(renderedOrder)
            enviar.removeAttribute('disabled')


        })
    }
}
const inicializaDatos = () =>
{
    fetch('https://serverless-genarocg.vercel.app/api/meals')
    .then(Response => Response.json())
    .then ( data =>{
        mealsState= data
        const mealsList = document.getElementById('meals-list')
        const listItems = data.map(renderItem)
        mealsList.removeChild(mealsList.firstElementChild)
        listItems.forEach(element => mealsList.appendChild(element))
        //const template = data.map(x => '<li>'+x.name+'</li>').join('')
        const submit = document.getElementById('enviar')
        //mealsList.innerHTML = template
        submit.removeAttribute('disabled')
    fetch('https://serverless-genarocg.vercel.app/api/orders')
        .then(response => response.json())
        .then(ordersData =>{
            const ordersList =document.getElementById('orders-list')
            const listOrders = ordersData.map(orderData => renderOrder(orderData, data))
            ordersList.removeChild(ordersList.firstElementChild)
            listOrders.forEach(element => ordersList.appendChild(element))
            //console.log(ordersData);
        })
    })
}
const renderApp =() => {
    const token = localStorage.getItem('token')
    if(token ){
        user = JSON.parse(localStorage.getItem('user'))
        return renderOrders()
    }     
    renderLogin()
}
const renderOrders = () =>{
    const ordersView = document.getElementById('orders-view')
    document.getElementById('app').innerHTML = ordersView.innerHTML
    inicializaFormulario()
    inicializaDatos()  
}
const renderLogin =() =>
{
    const token = localStorage.getItem('token')
    const loginTemplate = document.getElementById('login-template')
    document.getElementById('app').innerHTML = loginTemplate.innerHTML


    const loginForm = document.getElementById('login-form')
    loginForm.onsubmit=(e) =>{
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    fetch('https://serverless-genarocg.vercel.app/api/auth/login', {
        method: 'POST',
        headers:{
            'content-type': 'application/json', 
        },
        body: JSON.stringify({email, password})
        }).then(x => x.json())
        .then(respuesta => {
            localStorage.setItem('token', respuesta.token)
            ruta = 'orders'
            return respuesta.token
        })
        .then(token => {
            return fetch('https://serverless-genarocg.vercel.app/api/auth/me', {
                method: 'GET', 
                headers:{
                    'content-type': 'application/json',
                    authorization : token,
                },
            })
        })
        .then(x => x.json())
        .then(fetchedUser =>{
            localStorage.setItem('user', JSON.stringify(fetchedUser))
            user=fetchedUser
            renderOrders()  
        } )
    }
}
window.onload = () => {
    renderApp()
    
}