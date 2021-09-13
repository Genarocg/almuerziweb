const todos =JSON.parse(localStorage.getItem('todos')) || [];//convierte en un objeto o sino entrega un arreglo vacio
const render= ()=>//funcion render
{
        const todoList = document.getElementById('todo-list');//selecciona los elementos por id
        const todosTemplate =todos.map(t =>  '<li>'+t+ '</li>');//define la estructura de t para serun elemento de la lista con li
        todoList.innerHTML = todosTemplate.join('');//Realiza un join para juntar los elementos de el input con los li en formato html
        const elementos = document.querySelectorAll('#todo-list li')//Selecciona los elementos que coincidan con la condicion 
                                                    //condicion
        elementos.forEach((elemento, i) =>{//recorre cada elemento de la lista
           elemento.addEventListener('click',() =>//mediante addevenlistener realiza un escuchador que al hacer click realiza la funcion siguiente
           {
        console.log(elemento, i);//imprime a pantalla cada elemento con su id
        elemento.parentNode.removeChild(elemento)//Elimina el elemento hijo la var elemento 
        todos.splice(i,1)//elimina el elemento de el objeto 
        actualizaTodos(todos)//funcion actualiza todos
        render()
        })
       })
}
const actualizaTodos= (todos =>{
    const todoStrings= JSON.stringify(todos)//convierte el objeto de todos en una cadena string
    localStorage.setItem('todos', todoStrings)//actializa el contenido de todos con el nuevo contenido de la cadena anterior
})
window.onload =() =>{//carga todo el contenido de html antes del de js
    render()//llama a la funcion render que carga a los elementos de todos.
    const form = document.getElementById('todo-form');//selecciona los elementos por id
    form.onsubmit= (e) =>{//funcion para ejecutar una funcion cuando se envia el formulario
        e.preventDefault();//Evita que se recargue la pagina
        const todo = document.getElementById('todo');//selecciona los elementos por id
        const todotext = todo.value;//obtiene el valor de el id anterior
        todo.value= '';//limpia el valor de el id todo
        todos.push(todotext);//ingresa el valor de todo en el objeto todos
        actualizaTodos(todos)//Actualiza el contenido nuevamente
        render()
        console.log(todotext);
        
    }
}
