var productos = [];

function recibeProductos() {

    //peticion ajax q recibe los productos //
    var ajax1 = new XMLHttpRequest();
    ajax1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            productos = JSON.parse(this.responseText);
            let select = document.getElementById("idarticulo");
            for (let i = 0; i < productos.length; i++) {
                let option = document.createElement("option");
                option.text = productos[i].descripcion;
                option.value = productos[i].descripcion;
                select.appendChild(option);
            }
        } else {
            console.log(`Ha ocurrido un error: ${ajax1.status}`);
        }
    };
    ajax1.open("GET", "./json/productos.json", true);
    ajax1.send();
}

var usuarios = [];

function recibeClientes() {

    // peticion ajax que recibe los datos parseados y los inserta en un array al cargar la pagina //
    var ajax3 = new XMLHttpRequest();
    ajax3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            usuarios = JSON.parse(this.responseText);
            let select = document.getElementById("idclientes");
            for (let i = 0; i < usuarios.length; i++) {
                let option = document.createElement("option");
                option.text = usuarios[i].nombre + " " + usuarios[i].apellidos;
                option.value = usuarios[i].nombre + " " + usuarios[i].apellidos;
                select.appendChild(option);
            }
        } else {
            console.log(`Ha ocurrido un error: ${ajax3.status}`);
        }
    };
    ajax3.open("GET", "./json/clientes.json", true);
    ajax3.send();
}

var ventas = [];

function recibeVentas() {

    //peticion ajax q recibe las ventas o facturas genedas //
    var vajax1 = new XMLHttpRequest();
    vajax1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            ventas = JSON.parse(this.responseText);
            console.log(ventas);
        } else {
            console.log(`Ha ocurrido un error: ${vajax1.status}`);
        }
    };
    vajax1.open("GET", "./json/ventas.json", true);
    vajax1.send();
}

var facturas = [];

function carrito() {
    // datos //
    let cliente = document.getElementById("idclientes").value;
    let articulo = document.getElementById("idarticulo").value;
    let cantidad = document.getElementById("idcantidad").value;
    let precio = 0;
    let id = 0;

    for (let i = 0; i < productos.length; i++) {
        if (articulo == productos[i].descripcion) {
            precio = productos[i].precio;
        }
    }
    console.log(precio);

    // zonas //
    let zcliente = document.getElementById("idclientes");
    let zarticulo = document.getElementById("idarticulo");
    let zcantidad = document.getElementById("idcantidad");
    let total = precio * cantidad;
    // 
    if (cliente != "" && articulo != "" && cantidad != 0) {
        if (ventas.length == 0) {

            let factura = {
                "id": id,
                "nombre": cliente,
                "articulo": articulo,
                "cantidad": cantidad,
                "precio": precio,
                "total": total
            };

            facturas.push(factura);
            crearTabla(id, cliente, articulo, cantidad, precio, total);
            //regFactura(facturas);
            document.getElementById("idarticulo").value = "";
            document.getElementById("idcantidad").value = "";
            precio = "";
            zcliente.style.borderColor = "black";
            zarticulo.style.borderColor = "black";
            zcantidad.style.borderColor = "black";
            inputComprar();
        } else {
            for (let i = 0; i < ventas.length; i++) {
                for (let j = 0; j < ventas[i].length; j++) {
                    id = ventas[i][j].id;
                    console.log(id);
                }
            }
            id++;
            console.log(id);
            let factura = {
                "id": id,
                "nombre": cliente,
                "articulo": articulo,
                "cantidad": cantidad,
                "precio": precio,
                "total": total
            };

            facturas.push(factura);
            crearTabla(id, cliente, articulo, cantidad, precio, total);
            //regFactura(facturas);
            document.getElementById("idarticulo").value = "";
            document.getElementById("idcantidad").value = "";
            precio = "";
            zcliente.style.borderColor = "black";
            zarticulo.style.borderColor = "black";
            zcantidad.style.borderColor = "black";
            inputComprar();
        }
    } else {
        alert("Porfavor rellene los campos en rojo");
        if (cliente == "") {
            zcliente.style.borderColor = "red";
        }
        if (articulo == "") {
            zarticulo.style.borderColor = "red";
        }
        if (cantidad == "") {
            zcantidad.style.borderColor = "red";
        }
    }
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

function crearTabla(var1, var2, var3, var4, var5, var6) {

    let tabla = document.getElementById("tabla");
    let tr = document.createElement("tr");
    let id = document.createElement("td");
    let nombre = document.createElement("td");
    let articulo = document.createElement("td");
    let cantidad = document.createElement("td");
    let total = document.createElement("td");
    let precio = document.createElement("td");

    id.innerHTML = var1;
    tr.appendChild(id);
    nombre.innerHTML = var2;
    tr.appendChild(nombre);
    articulo.innerHTML = var3;
    tr.appendChild(articulo);
    precio.innerHTML = var5;
    tr.appendChild(precio);
    cantidad.innerHTML = var4;
    tr.appendChild(cantidad);
    total.innerHTML = var6;
    tr.appendChild(total);
    tabla.appendChild(tr);
    facturaTotal();
}

function facturaTotal() {
    let td2 = document.getElementById("idtuto");
    let total = 0;
    for (let i = 0; i < facturas.length; i++) {
        total += facturas[i].total;
    }
    td2.innerHTML = total;
}

function inputComprar() {

    let div = document.getElementById("idcomprar");
    let input = document.createElement("button");
    let td = document.createElement("td");
    if (div.hasChildNodes()) {
        div.removeChild(div.childNodes[0]);
    }
    input.innerHTML = "COMPRAR";
    td.appendChild(input);
    div.appendChild(td);
    input.addEventListener("click", comprarCarrito);
    let disabled = document.getElementById("idclientes");
    disabled.disabled = true;
}

function comprarCarrito() {
    
    ventas.push(facturas);
    regFactura(ventas);
    limpiarBoton();
    limpiarTabla();
    alert("Venta realizada con exito");
}

function limpiarBoton() {
    location.reload();
}

function limpiarTabla() {
    let div = document.getElementById("tabla");
    if (div.hasChildNodes()) {
        for (let i = 0; i < div.length; i++) {
            div.removeChild(div.childNodes(i));
        }
    }
}

function listener() {
    document.getElementById("idcarro").addEventListener("click", carrito);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

window.onload = function () {
    this.recibeClientes();
    this.recibeProductos();
    this.recibeVentas();
    this.listener();
    this.setCookie("sesion", "activa", 30);
}