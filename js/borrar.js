const campoNombre = document.querySelector(".form-control.nombre")
const campoCategoria = document.querySelector("select.form-select.categoria")
const campoUbicacion = document.querySelector("select.form-select.ubicacion")
const campoCosto = document.querySelector(".form-control.costo")
const campoIva = document.querySelector(".form-control.iva")
const campoGanancia = document.querySelector(".form-control.ganancia")
const campoCantidad = document.querySelector(".form-control.cantidad")
const campoPrecioPubico = document.querySelector(".form-control.precio-publico")
const formularioNewProduct = document.querySelector(".form-nuevoProducto")
const btnGuardar = document.querySelector("button.btn.btn-outline-personal")
const productosTabla = document.querySelector(".tablaProductos")
const mensajeToast = document.querySelector("div.toast-body.texto-alerta")
const btnNewCategoria = document.querySelector("button.btn.btn-primary.nuevaCategoria")
const opClat = document.querySelector("option.opcat")
const optionDeposito = document.querySelector("option.opUb")
const campoNuevaCategoria = document.querySelector("input.form-control.nombreCategoria")
const nuevaUbicacion = document.querySelector("input.nombreUbicacion")
const btnAgregarCat = document.querySelector("button.btn.btn-primary.btncat")
const tablaVacia = document.querySelector("div.notificacion-tabla.text-center")
const totalDeposito = document.querySelector("span.total_valor")
const btnUb = document.querySelector("button.btnubicaion")
const totalProCount = document.querySelector("li.list-group-item.totalProducto")
const alertUbicacion = document.querySelector("div#nuevaUbicacion")
const btnNuevoIngrso = document.querySelector("button.btn.nuevoIngreso")
const btneliminar = document.querySelector("btn.btn-danger.eliminar")

// toast
const toast = document.getElementById('liveToast')
// toast
btnGuardar.addEventListener("click", cargar)
btnAgregarCat.addEventListener("click", agregarCategoriaModal)
btnUb.addEventListener("click", agregarUbModal)



function cargar(e) {
    e.preventDefault()
    ingresoNewMercaderia()
    
}

function agregarCategoriaModal(e) {
    e.preventDefault()
    nuevaCategoria()
}

function agregarUbModal(e) {
    e.preventDefault()
    ubicacionN()
}


function ingresoNewMercaderia() {
   
    genId = Date.now()
    const mercaderia = new Mercaderia(id = genId, campoNombre.value, campoCategoria.value, campoUbicacion.value, parseFloat(campoCosto.value), parseFloat(campoGanancia.value), parseInt(campoCantidad.value))
    mensaje = campoNombre.value

    if(campoNombre.value.length > 0 && campoCategoria.value.length > 0 && campoUbicacion.value.length > 0 && campoCosto.value.length > 0 && campoGanancia.value.length > 0 && campoCantidad.value > 0){
        
        stock.push(mercaderia)
        localStorage.setItem("mercaderia", JSON.stringify(stock))
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)
        toastBootstrap.show()
        tipo="producto"
        notificacion(tipo,mensaje)
        cargadorTabla()
        limpiarForm()

    }else{
        const mensaje = "Todos los campos son obligatorios, no pueden estar vacios"
        const tipo = "Error"
        const simbolo = "error"
        alertaVacio(simbolo,mensaje, tipo)
    }
 
}







function limpiarForm() {
    cargadorCategoria()
    cargdorUbicaciones()
    campoNombre.value = ""
    campoCosto.value = ""
    campoGanancia.value = ""
    campoCantidad.value = ""
    id = ""
}


// funcion agregar categoria
function nuevaCategoria() {
    if(campoNuevaCategoria.value.length  > 3){
        genId = Date.now()
        const cat = new Categoria(id = genId, campoNuevaCategoria.value)
        mensaje=campoNuevaCategoria.value
        categoria.push(cat)
        localStorage.setItem("categoria", JSON.stringify(categoria))
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)
        toastBootstrap.show()
        tipo="categoria"
        notificacion(tipo,mensaje)
        campoNuevaCategoria.value = ""
        
        
    }else{
        const mensaje = "No es posible Agregar un campo vacio o menor de 3 caracteres"
        const tipo = "Advertencia"
        const simbolo = "warning"
        alertaVacio(simbolo,mensaje, tipo)
    }

}


// cargar categorias de localstorage en el array
const lsCat = () => {
    
    const cat = JSON.parse(localStorage.getItem("categoria"))
    cat && categoria.push(...cat)
    
    
}
lsCat()

// cargar categorias en el select
function cargadorCategoria() {
    
    if (categoria < 1) {
        
        opClat.remove()
        campoCategoria.innerHTML = `<option selected disabled>no hay categoria cargada</option>`
        btnNewCategoria.classList.remove('desactivado')

    } else {
        categoria.forEach(cat => (
        campoCategoria.innerHTML += `<option value="${cat.nombre}">${cat.nombre}</option>`))
        btnNewCategoria.classList.add('desactivado')
       
    }
}
cargadorCategoria()




// funcion para carga de selectores

function cargarSelect(selector, array) {
    array.forEach(elemento => (selector.innerHTML += ` <option value="${elemento.nombre}">${elemento.nombre}</option>`
    ))
}

cargarSelect(campoUbicacion, deposito)


// funcion para cargar la tabla
function cargadorTabla() {



    if (stock.length > 0) {
        tablaVacia.remove();

        while (productosTabla.firstChild) {
            productosTabla.removeChild(productosTabla.firstChild);
        }
        stock.forEach(producto => {
            const elementoTabla = document.createElement('tr');
            elementoTabla.innerHTML = `
                            <th scope="row">${producto.id}</th>
                            <td>${producto.cantidad}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.costo}</td>
                            <td>${producto.ppublico}</td>
                            <td>${producto.precioLote}</td>
                            <td class="opciones"> <button class="btn btn-info"><i class="fa-solid fa-eye"></i></button>   <button class="btn btn-warning"><i class="fa-solid fa-pen"></i></button>  <a class="btn btn-danger eliminar " id="eliminar${producto.id}"><i class="fa-solid fa-trash"></i></a> </td> `;
            productosTabla.appendChild(elementoTabla);

        
            
        });
        totalProCount.innerHTML = ` Total Productos <span> <strong>${stock.length}</strong> </span>`
        totalDeposito.textContent = costoLote()    
       

    }    
}

btnNuevoIngrso.addEventListener("click", ()=>{
    campoCategoria.innerHTML =""
    cargadorCategoria()
    campoUbicacion.innerHTML=""
    cargdorUbicaciones() 
})

// Toast de productos, categorias y ubicaciones

 notificacion=(tipo,mensaje)=>{
    if(tipo=="deposito"){
        mensajeToast.innerHTML = `<p>Ubicacion <strong>${mensaje} </strong> agregado correctamente</p>`
    }
    else if(tipo=="producto"){
        mensajeToast.innerHTML = `<p>Producto <strong>${mensaje} </strong> agregado correctamente</p>` 
    }
    else if(tipo=="categoria"){
        mensajeToast.innerHTML = `<p>Categoria <strong>${mensaje} </strong> agregado correctamente</p>` 
    }
    else{
        mensajeToast.innerHTML = `<p><strong>Error</strong> Revise los datos ingresados</p>` 
    }

 }





// cargar ubicciones de localstorage en el array
const listUbicaciones = () => {
    const ub = JSON.parse(localStorage.getItem("depositos"))
    ub && deposito.push(...ub)
}
listUbicaciones()


// cargar ubicaiones en el select
function cargdorUbicaciones() {
    if (deposito < 1) {
        optionDeposito.remove()
        campoUbicacion.innerHTML = `<option selected disabled>no hay ubicaciones cargadas</option>`
    } else {
        deposito.forEach(ubicacion => ( 
         campoUbicacion.innerHTML += `<option value="${ubicacion.nombre}">${ubicacion.nombre}</option>`))
    }
}
cargdorUbicaciones()


// guardar nueva Ubicacion
function ubicacionN() {
   if(nuevaUbicacion.value.length >3){
            
        genId = Date.now()
        const depositos = new Ubicaciones(id = genId, nuevaUbicacion.value)
        mensaje=nuevaUbicacion.value
        deposito.push(depositos)
        localStorage.setItem("depositos", JSON.stringify(deposito))
        nuevaUbicacion.value = ""
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)
        toastBootstrap.show()
        tipo="deposito"
        notificacion(tipo,mensaje)
       

   }else{
    const mensaje = "No es posible Agregar un campo vacio o menor de 3 caracteres"
    const tipo = "Advertencia"
    const simbolo = "warning"
    alertaVacio(simbolo,mensaje, tipo)
   }


    
}




// calculo del costo del lote de mercaderia
function costoLote() {
    let costoTotal = stock.reduce((acc, mercaderia) => acc + mercaderia.precioLote, 0)
    return costoTotal
}



const lsProductos = () => {
    const productosEnMemoria = JSON.parse(localStorage.getItem("mercaderia"))
    if (productosEnMemoria != null) {
        stock.push(...productosEnMemoria)
        cargadorTabla()
    } else {
        tablaVacia.innerHTML = ` <p class="notificacion-temporal">Sin Productos Cargados</p>`
        totalProCount.innerHTML = ` Total Productos <span> <strong>0</strong> </span>`
        totalDeposito.innerHTML = `  <span> <strong>0</strong> </span>`
    }


}
lsProductos()


// sweet alert
function alertaVacio(simbolo,mensaje,tipo){

    Swal.fire(
        `${tipo}`,
        `${mensaje}`,
        `${simbolo}`
      )
}




const categoria=[]
const stock=[]
const deposito=[]

IVA = 1.21
total = 0



class Mercaderia{
 
  constructor(id,nombre,categoria,ubicacion,costo,ganancia,campoCantidad){
    this.id=id
    this.nombre=nombre
    this.categoria=categoria
    this.ubicacion = ubicacion
    this.costo = parseFloat(costo)
    this.iva = this.precioConIVA()
    this.cantidad = parseInt(campoCantidad)
    this.ganancia = (parseFloat(ganancia)/100).toFixed(2)
    this.ppublico = this.precioPublico()
    this.precioLote = this.precioStock()
  }
  
  precioConIVA = function(){
    return this.costo * IVA
  }

  precioPublico=function(){
    return  ((this.iva * parseFloat(this.ganancia) ) + this.iva).toFixed(2)
  }

  precioStock=function(){
    return this.costo * this.cantidad
  }
  
}


class Categoria{
  constructor(id,nombre){
    this.id=id
    this.nombre=nombre
  }
}


class Ubicaciones{
  constructor(id,nombre){
    this.id=id
    this.nombre=nombre
  }
  
}




