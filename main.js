const form = document.querySelector('.formulario');
const descripcion = document.querySelector('.descripcion_input');
const valor = document.querySelector('.valor_input');
const agregarBtn = document.querySelector('.btn_agregar');
const ingresosULl = document.querySelector('.ingresos_ul');
const gastosBtn = document.querySelector('.btn_agregar_gasto');
const gastosUL = document.querySelector('.gastos_ul');
const presupuestoTotal = document.querySelector('.mostrar_todo_presupuesto');
const ingresosTotales = document.querySelector('.ingresos_totales');
const gastosTotales = document.querySelector('.gastos_totales');
const ingresosListaCompleta = document.querySelector('.ingresos_lista_completa');
const ingresosContenedor = document.querySelector('.ingresos_div');
const gastosContenedor = document.querySelector('.gastos_div');
const borrarTodo = document.querySelector('.borrar_todo');


const ingresosHTML = ({ id, descripcion, valor }) => {
    return `<div class="ingresos_li" data-dataset="${id}"><div class="descripcion_ingresos">${descripcion}</div><div class="valor_ingresos">+$${valor} <img src="./assets/img/boton_de_eliminar.png" alt="" id="botonDeEliminar" class="botonDeEliminar" data-id="${id}"></div> </div>    `
}

const renderIngresos = (ingresos) => {
    const agregarIngresoHTML = ingresos.map((ingreso) => ingresosHTML(ingreso)).join('');
    ingresosULl.innerHTML = agregarIngresoHTML;

    let ingresosReduce = ingresos.reduce((prev, curr) => prev + Number(curr.valor), 0);
    ingresosTotales.textContent = '$' + ingresosReduce;
    renderPresupuesto(ingresosArray, gastosArray);
    saveLocalStorage(ingresosArray);
    //console.log('Valor ID: ', ID)

}
const saveLocalStorage = (ingresosList) => {
    //console.log(JSON.stringify(ingresosArray), 'RESULTADO DEL STRINGIFY');
    localStorage.setItem('Ingresos', JSON.stringify(ingresosList));

}

let ingresosArray = JSON.parse(localStorage.getItem('Ingresos')) || [];
//const find1 = ingresosArray.find(element => element.id === 4)
//console.log('find1', find1)
let ID = 1;

const agregarIngreso = (e) => {
    e.preventDefault();
   
    const descripcionValor = descripcion.value;
    const valorInput = valor.value;

    if (descripcionValor.trim().length === 0 || !valorInput) return;
    const nuevoIngreso = {
        id: ID,
        descripcion: descripcionValor,
        valor: valorInput
    }
    ID++;
    descripcionValor.value = '';
    //console.log('Descripcion:', descripcionValor + ' / ' + 'Valor:', valorInput);
    ingresosArray = [
        ...ingresosArray,
        nuevoIngreso
    ]

    renderIngresos(ingresosArray);
    saveLocalStorage(ingresosArray);
    renderPresupuesto(ingresosArray, gastosArray)
    form.reset();

}


let gastosArray = JSON.parse(localStorage.getItem('Gastos')) || [];


const gastosHTML = ({ id, descripcion, valor }) => {
    return `<div class="gastos_li" data-dataset="${id}"><div class="descripcion_gastos">${descripcion}</div><div class="valor_gastos">-$${valor} <img src="./assets/img/boton_de_eliminar.png" alt="" class="botonDeEliminar" id="botonDeEliminar" class="botonDeEliminar" data-id="${id}"></div> </div>    `
}

const renderGastos = (gastos) => {
    const agregarGastosHTML = gastos.map((gasto) => gastosHTML(gasto)).join('');
    gastosUL.innerHTML = agregarGastosHTML;

    let gastosReduce = gastos.reduce((prev, curr) => prev + Number(curr.valor), 0);
    gastosTotales.textContent = '-$' + gastosReduce;
    let totalIngresos = ingresosArray.reduce((prev, curr) => prev + Number(curr.valor), 0);
    // presupuestoTotal.innerHTML = totalIngresos - gastosReduce;
    renderPresupuesto(ingresosArray, gastosArray);
    saveLocalStorageGastos(gastosArray);
    //console.log('Valor ID: ', ID)

}


const saveLocalStorageGastos = (egresosList) => {
    //console.log(JSON.stringify(gastosArray), 'RESULTADO DEL STRINGIFY');
    localStorage.setItem('Gastos', JSON.stringify(egresosList));

}

const agregarGastos = (e) => {
    e.preventDefault();

    const descripcionValor = descripcion.value;
    const valorInput = valor.value;
    //let ID = 1;

    if (descripcionValor.trim().length === 0 || !valorInput) return;
    const nuevoGasto = {
        id: ID,
        descripcion: descripcionValor,
        valor: valorInput
    }
    ID++;
    descripcionValor.value = '';
    //console.log('Descripcion:', descripcionValor + ' / ' + 'Valor:', valorInput, 'id: ', ID);
    gastosArray = [
        ...gastosArray,
        nuevoGasto
    ]

    renderGastos(gastosArray);
    saveLocalStorageGastos(gastosArray);
    renderPresupuesto(ingresosArray, gastosArray)
    form.reset();


}

let totalIngresos = ingresosArray.reduce((prev, curr) => prev + Number(curr.valor), 0);
let totalGastos = gastosArray.reduce((prev, curr) => prev + Number(curr.valor), 0);


const renderPresupuesto = (ingresos, gastos) => {
    let ingresosReduce = ingresos.reduce((prev, curr) => prev + Number(curr.valor), 0);
    let gastosReduce = gastos.reduce((prev, curr) => prev + Number(curr.valor), 0);
    let presupuestoTotalDiv = Number(ingresosReduce) - Number(gastosReduce);
    //console.log('Presupuesto total:',presupuestoTotal)
    presupuestoTotal.innerHTML = '$' + Number(presupuestoTotalDiv);
    //console.log('TIPO:', typeof presupuestoTotalDiv)

}

const quitarProductoDelCarro = ({ id }) => {
    ingresosArray = ingresosArray.filter(ingreso => ingreso.id !== id)

}

const restarCantidad = (valor) => {
    const ingresoExistente = ingresosArray.find(element => element.id === valor)
    //console.log('ingreso existente:', ingresoExistente)
    //quitarUnidadAlProducto(ingresoExistente);


}
const quitarIngreso = (e) => {
    e.preventDefault();
    //    console.log('estas en el contenedor')
    if (e.target.classList.contains('botonDeEliminar')) {
        //console.log('dataset:', e.target.dataset.id)
        const targetNum = Number(e.target.dataset.id)
        //restarCantidad(targetNum)
        const ingresoExistente = ingresosArray.find(element => element.id === targetNum)
       
        if (Number(ingresoExistente.id) === targetNum) {
            //console.log('Hay coincidencia')
            ingresosArray = ingresosArray.filter(ingreso => ingreso.id !== targetNum);
            saveLocalStorage(ingresosArray);
        } else {
            console.log('no hay coincidencia')
        }
        init();

    }
      

}
const quitarGasto = (e)=>{
    e.preventDefault();
    if (e.target.classList.contains('botonDeEliminar')) {
        //console.log('dataset:', e.target.dataset.id)
        const targetNum = Number(e.target.dataset.id)
        const gastoExistente = gastosArray.find(element => element.id === targetNum)
        if (Number(gastoExistente.id) === targetNum) {
            //console.log('Hay coincidencia en gastos')
            gastosArray = gastosArray.filter(gasto => gasto.id !== targetNum);
            saveLocalStorage(gastosArray);
        } else {
            //console.log('no hay coincidencia')
        }
        init();

    }
}
const borrarTodasLasListas = ()=>{
    ingresosArray = [] ;
    renderIngresos(ingresosArray);
     saveLocalStorage(ingresosArray); 
    
    gastosArray = []; 
    renderGastos(gastosArray);
    saveLocalStorage(gastosArray)
    

}

const init = () => {
    renderIngresos(ingresosArray);
    renderGastos(gastosArray);
    saveLocalStorage(ingresosArray);
    saveLocalStorageGastos(gastosArray);
    renderPresupuesto(ingresosArray, gastosArray)
   



    agregarBtn.addEventListener('click', agregarIngreso);
    gastosBtn.addEventListener('click', agregarGastos);
    ingresosContenedor.addEventListener('click', quitarIngreso);
    gastosContenedor.addEventListener('click',quitarGasto);
    borrarTodo.addEventListener('click', borrarTodasLasListas)


}


init()






