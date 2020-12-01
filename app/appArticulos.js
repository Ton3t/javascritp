var productos = [];

function recibeProductos() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            productos = JSON.parse(this.responseText);
            console.log(productos);
            let select = document.getElementById("idarti");
            for (let i = 0; i < productos.length; i++) {
                if (productos[i] == null) {
                    
                } else {
                    let option = document.createElement("option");
                    option.text = productos[i].descripcion;
                    option.value = productos[i].descripcion;
                    select.appendChild(option);
                    
                }
            }
        }
    };
    xmlhttp.open("GET", "./json/productos.json", true);
    xmlhttp.send();
}

function regProductos(variable) {
    // peticion ajax q envia los datos a articulos.php //
    console.log(variable);
    var subir = new XMLHttpRequest();
    var datosUser = new FormData();
    datosUser.append("datos", JSON.stringify(variable));
    subir.open("POST", "./control/articulos.php", true);
    subir.send(datosUser);
}

function enviarDatos() {
    // datos //
    let ref = document.getElementById("idref").value;
    let desc = document.getElementById("iddescripcion").value;
    let familia = document.getElementById("idfamilia").value;
    let precio = document.getElementById("idprecio").value;

    // zonas //
    let zdesc = document.getElementById("iddescripcion");
    let zfamilia = document.getElementById("idfamilia");
    let zprecio = document.getElementById("idprecio");

    if (ref != "" || desc != "" || familia != "" || precio != "") {
        if(productos == null || productos == "") {
            let producto = {
                "ref": ref,
                "descripcion": desc,
                "familia": familia,
                "precio": precio
            };
            productos.push(producto);
            regProductos(productos);
            location.reload();
        }
        else {
            let producto = {
                "ref": ref,
                "descripcion": desc,
                "familia": familia,
                "precio": precio
            };
            productos.push(producto);
            regProductos(productos);
            location.reload();
        }
        

    } else {
        alert("Revisa los campos");
        if (ref == "") {
            zref.style.borderColor = "red";
        }
        if (desc == "") {
            zdesc.style.borderColor = "Red";
        }
        if (familia == "") {
            zfamilia.style.borderColor = "red";
        }
        if (precio == "") {
            zprecio.style.borderColor = "red";
        }
    }
}

var contaID = 0;

function muestraArticulos() {
    inputModificar();
    contaID = 0;
    let valor = document.getElementById("idarti").value;
    console.log(valor);
    for (let i = 0; i < productos.length; i++) {
        if (productos[i] == null) {
            i++;
        }
        else if (valor == productos[i].descripcion) {
            pintarDatos(productos[i].ref, productos[i].descripcion, productos[i].familia, productos[i].precio);
            contaID = i;
        }
    }
}

function inputModificar() {
    let zona = document.getElementById("btnMod");
    let input = document.createElement("button");
    input.setAttribute("class", "tr");
    while (zona.childElementCount > 0) {
        zona.removeChild(zona.childNodes[0]);
    }
    input.innerHTML = "Modificar";
    input.addEventListener("click", modArt);
    zona.appendChild(input);
    let zona1 = document.getElementById("btnEliminar");
    let input1 = document.createElement("button");
    input1.setAttribute("class", "tr");
    while (zona1.childElementCount > 0) {
        zona1.removeChild(zona1.childNodes[0]);
    }
    input1.innerHTML = "Borrar";
    input1.addEventListener("click", delArt);
    zona1.appendChild(input1);
}

function modArt() {
    delete productos[contaID];
    productos[contaID] = productos[contaID];
    enviarDatos(productos);
    location.reload();
    alert("Producto Modificado");
}

function delArt() {
    delete productos[contaID];
    enviarDatos(productos);
    location.reload();
    alert("Productos Borrado");
}

function pintarDatos(v1, v2, v3, v4) {
    document.getElementById("idref").value = v1;
    document.getElementById("iddescripcion").value = v2;
    document.getElementById("idfamilia").value = v3;
    document.getElementById("idprecio").value = v4;
}


function listener() {
    document.getElementById("idregistrar").addEventListener("click", enviarDatos);
    document.getElementById("idarti").addEventListener("change", muestraArticulos);

}

window.onload = function () {
    this.listener();
    this.recibeProductos();
}