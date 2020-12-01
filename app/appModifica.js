var ventas = [];
var totales = 0;

function recibeVentas() {

    //peticion ajax q recibe las ventas o facturas genedas //
    var vajax1 = new XMLHttpRequest();
    vajax1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            ventas = JSON.parse(this.responseText);
            console.log(ventas);
            let select = document.getElementById("idnventa");
            for (let i = 0; i < ventas.length; i++) {
                let option = document.createElement("option");
                option.innerHTML = i;
                option.value = i;
                select.appendChild(option);
            }
        } else {
            console.log(`Ha ocurrido un error: ${vajax1.status}`);
        }
    };
    vajax1.open("GET", "./json/ventas.json", true);
    vajax1.send();
}


var dateFinale = 0;

document.getElementById("idnventa").addEventListener("change", muestraFac);

function muestraFac() {
    cont = 0;
    dateFinale = 0;
    borrarTabla();
    let totales2 = 0;
    let recibe1 = document.getElementById("idnventa").value;
    let recibe = parseInt(recibe1);
    dateFinale = recibe;
    for (let i = 0; i < ventas.length; i++) {
        for (let j = 0; j < ventas[i].length; j++) {
            if (recibe == ventas[i][j].id) {
                crearTabla(ventas[i][j].id, ventas[i][j].nombre, ventas[i][j].articulo, ventas[i][j].cantidad, ventas[i][j].precio, ventas[i][j].total);
                totales2 += ventas[i][j].precio * ventas[i][j].cantidad;
                totales = totales2;
                facturaTotal();
            }
        }
    }
}

function crearTabla(var1, var2, var3, var4, var5, var6) {

    let tabla = document.getElementById("idtabla");
    let tr = document.createElement("tr");
    let id = document.createElement("td");
    let nombre = document.createElement("td");
    let articulo = document.createElement("td");
    let cantidad = document.createElement("td");
    let total = document.createElement("td");
    let precio = document.createElement("td");
    let input = inputBorrar();
    tr.className = "fila";
    console.log(tabla);
    id.innerHTML = var1;
    id.className = "tr";
    id.setAttribute("id", "id");
    tr.appendChild(id);
    nombre.innerHTML = var2;
    nombre.className = "tr";
    nombre.setAttribute("id", "nombre");
    tr.appendChild(nombre);
    articulo.innerHTML = var3;
    articulo.className = "tr";
    articulo.setAttribute("id", "articulo");
    tr.appendChild(articulo);
    precio.innerHTML = var5;
    precio.className = "tr";
    precio.setAttribute("id", "precio");
    tr.appendChild(precio);
    cantidad.innerHTML = var4;
    cantidad.className = "tr";
    cantidad.setAttribute("id", "cantidad");
    tr.appendChild(cantidad);
    total.innerHTML = var6;
    total.className = "tr";
    total.setAttribute("id", "total");
    tr.appendChild(total);
    tr.appendChild(input);
    tabla.appendChild(tr);


}

function facturaTotal() {
    let td2 = document.getElementById("idtuto");
    td2.innerHTML = totales;
}

var cont = 0;
var comprobarFila = 0;

function inputBorrar() {
    var input = document.createElement("button");
    var td = document.createElement("td");
    input.innerHTML = "Borrar";
    input.setAttribute("class", "inborrar");
    input.setAttribute("id", cont);
    td.appendChild(input);
    input.addEventListener("click", borrarFila2);
    input.addEventListener("click" ,()=>{
        comprobarFila = input.id;
    });
    cont++;
    return td;
}


function borrarFila2(e) {
    e.target.parentNode.parentNode.remove();
    actualizaTotal();
    inputModificar();
}

function actualizaTotal() {
    let td2 = document.getElementById("idtuto");
    let contador = document.getElementsByClassName("fila").length;
    let tabla = document.getElementById("idtabla");
    let t = 0;
    for (let i = 0; i < contador; i++) {
        let datos = tabla.childNodes[i + 2].childNodes[5].textContent;
        let factura = parseInt(datos);
        t = t + factura;
    }
    totales = t;
    td2.innerHTML = t;
}

function borrarTabla() {
    let dataTabla = document.getElementById("idtabla");
    while (dataTabla.childElementCount > 1) {
        dataTabla.removeChild(dataTabla.childNodes[2]);
    }
}



function inputModificar() {
        
    let zona = document.getElementById("modificaVenta");
    let input = document.createElement("button");
    while (zona.childElementCount > 1) {
        zona.removeChild(zona.childNodes[2]);
    }
    input.innerHTML = "Modificar";
    input.addEventListener("click", facturarVenta);
    zona.appendChild(input);
}

var arrayVentas = [];
function facturarVenta() {
    setTimeout(() => {
        arrayVentas = ventas;
    for (let i = 0; i < ventas.length; i++) {
        if (i == dateFinale) {
            arrayVentas[i].splice(comprobarFila, 1);
            regFactura(arrayVentas);
            location.reload();
        }
    }
    }, 1000);
    
}

function carrito() {
    // datos //
    let id = document.getElementById("id").value;
    let nombre = document.getElementById("nombre").value;
    let articulo = document.getElementById("articulo").value;
    let precio = document.getElementById("precio").value;
    let cantidad = document.getElementById("cantidad").value;
    let total = document.getElementById("total").value;

    let factura = {
        "id": id,
        "nombre": nombre,
        "articulo": articulo,
        "cantidad": cantidad,
        "precio": precio,
        "total": total
    };

    regFactura(factura);
}

function regFactura(variable) {
    // peticion ajax q envia los datos a clientes.php //
    console.log(variable);
    var subir = new XMLHttpRequest();
    var datosUser = new FormData();
    datosUser.append("datos", JSON.stringify(variable));
    subir.open("POST", "./control/ventas.php", true);
    subir.send(datosUser);
}



window.onload = function () {
    this.recibeVentas();
}