const deportesAgregar = document.querySelector('#deportesAgregar')
const nombreDeporte = document.querySelector('#nombreDeporte')
const precioDeporte = document.querySelector('#precioDeporte')
const tablaDeportes = document.querySelector('#tablaDeportes')
///tabla
const exampleModal = document.querySelector('#exampleModal')
const nombreModal = document.querySelector('#nombreModal')
const precioModal = document.querySelector('#precioModal')
let idUpdate =

deportesAgregar.addEventListener('submit',  async event => {
    event.preventDefault()
    console.log ('esta process')

    const nombreDeporte = nombreDeporte.value
    const precioDeporte = precioDeporte.value

    const res = await fetch(`/deportes/create?nombre=${nombre}`)
    const data = await res.json()

    
    console.log(data)
    getDeportes()
})



    data.forEach(item => {
        deportesAgregar.innerHTML += `
        <li>${ item.nombre}-  ${ item.precio}
        <button onclick="deleteTodo('${item.nombre}')">  Eliminar </button>
        </li> 
        <button onclick="exampleModal('${ item.nombre}', ' ${ item.precio}', )" >  Actualizar </button>
        
        `
    });
    


getDeportes()

const deleteTodo = async (nombre) => {
    const res = await fetch(`/deportes/delete/${nombre}`)
    const data = await res.json()   
     console.log(nombre)

     getDeportes()
}

const exampleModall = (nombre, precio) => {
 console.log (nombre, precio)
 nombreModal.value = nombre
 precioModal.value = precio
 idUpdate = id 
}


exampleModal.addEventListener('submit', async (event) => {
event.preventDefault()
const precio = precioModal.value
const res = await fetch (`/deportes/update/${idUpdate}?nombre=${nombre}&precio=${precio}`)
const data = await res.json() 

getDeportes()

})