function regCliente(variable) {
    // peticion ajax q envia los datos a clientes.php //
    console.log(variable);
    var subir = new XMLHttpRequest();
    var datosUser = new FormData();
    datosUser.append("datos", JSON.stringify(variable));
    subir.open("POST", "./control/clientes.php", true);
    subir.send(datosUser);
}

function enviarDatos() {
    // datos //
    let nombre = document.getElementById("idnombre").value;
    let apellidos = document.getElementById("idapellidos").value;
    let dni = document.getElementById("iddni").value;
    let fecha = document.getElementById("idfecha").value;
    let email = document.getElementById("idmail").value;
    let pass1 = document.getElementById("idpass1").value;
    let pass2 = document.getElementById("idpass2").value;

    // zonas //
    let zonaNombre = document.getElementById("idnombre");
    let zonaApellidos = document.getElementById("idapellidos");
    let zdni = document.getElementById("iddni");
    let zfecha = document.getElementById("idfecha");
    let zemail = document.getElementById("idmail");
    let zpass1 = document.getElementById("idpass1");
    let zpass2 = document.getElementById("idpass2");

    let nUser = 0;

    if (validarDni(dni) || validarEmail(email) || nombre != "" || apellidos != "" || fecha != "" || pass1 == pass2) {
        if (usuarios == null) {
            let cliente = {
                "id": nUser,
                "nombre": nombre,
                "apellidos": apellidos,
                "dni": dni,
                "fecha": fecha,
                "email": email,
                "password": pass1
            };
            usuarios.push(cliente);
            regCliente(usuarios);
            location.reload();
        } else {
            for (let i = 0; i < usuarios.length; i++) {
                nUser++;
            }
            let cliente = {
                "id": nUser,
                "nombre": nombre,
                "apellidos": apellidos,
                "dni": dni,
                "fecha": fecha,
                "email": email,
                "password": pass1
            };
            usuarios.push(cliente);
            regCliente(usuarios);
            location.reload();
        }
    } else {
        alert("Revisa los campos");
        if (nombre == "") {
            zonaNombre.style.borderColor = "Red";
        }
        if (apellidos == "") {
            zonaApellidos.style.borderColor = "red";
        }
        if (validarDni(dni) == false) {
            zdni.style.borderColor = "red";
        }
        if (fecha == "") {
            zfecha.style.borderColor = "red";
        }
        if (validarEmail(email) == false) {
            zemail.style.borderColor = "red";
        }
        if (pass1 != pass2) {
            zpass1.style.borderColor = "red";
            zpass2.style.borderColor = "red";
        }
    }
}

var usuarios = [];
var arrayID = [];

function recibeClientes() {

    // peticion ajax que recibe los datos parseados y los inserta en un array al cargar la pagina //
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            usuarios = JSON.parse(this.responseText);
            let select = document.getElementById("idmodificaClientes");
            for (let i = 0; i < usuarios.length; i++) {
                if(usuarios[i] == "" || usuarios[i] == null) {
                    
                }
                else {
                    let option = document.createElement("option");
                    option.text = usuarios[i].id + " - " + usuarios[i].nombre + " " + usuarios[i].apellidos;
                    option.value = usuarios[i].id;
                    select.appendChild(option);
                }
            }
        }
    };
    xmlhttp.open("GET", "./json/clientes.json", true);
    xmlhttp.send();
}

var id = 0;
function muestraD() {
    inputModificar();
    let valor = document.getElementById("idmodificaClientes").value;
    for (let i = 0; i < usuarios.length; i++) {
        if(usuarios[i] == null) {
            i++;
        }
        else if (valor == i) {
            pintarDatos(usuarios[i].nombre, usuarios[i].apellidos, usuarios[i].dni, usuarios[i].fecha, usuarios[i].email, usuarios[i].password, usuarios[i].password);
            id = usuarios[i].id;
            console.log(id);
        }
    }
}

function validarDni(texto) {

    // funcion para validar dni //
    var patron = /^(\d{8})([a-zA-Z])$/;
    var numeroDni = texto.replace(patron, "$1");
    var letraDni = texto.replace(patron, "$2");
    var resul = numeroDni % 23;
    var letras = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E", "T"];
    if (letraDni.toUpperCase() == letras[resul] && patron.test(texto)) {
        return true;
    } else {
        return false;
    }
}

function validarEmail(texto) {

    //funcion para validar email //
    var patron = /^\w{1,20}[@]\w{1,20}[.]\D{2,3}$/;
    if (patron.test(texto)) {
        return true;
    } else {
        return false;
    }
}

function validarFecha(texto) {
    var patron = /^([0-3][1-9])[/]([0-1][1-9])[/]([0-2][0-9][0-9][0-9])$/;
    var mes = texto.replace(patron, "$2");
    if (patron.test(texto) && mes <= 12) {
        alert("Fecha " + texto + " introducida correctamente");
    } else {
        alert("Fecha no encontrada. Porfavor ingrese una fecha XX/XX/XXXX");
    }
}

function pintarDatos(v1, v2, v3, v4, v5, v6, v7) {
    document.getElementById("idoption").value = "MODIFICAR CLIENTES";
    document.getElementById("idnombre").value = v1;
    document.getElementById("idapellidos").value = v2;
    document.getElementById("iddni").value = v3;
    document.getElementById("idfecha").value = v4;
    document.getElementById("idmail").value = v5;
    document.getElementById("idpass1").value = v6;
    document.getElementById("idpass2").value = v7;
}

function inputModificar() {
    let zona = document.getElementById("mod");
    let input = document.createElement("button");
    input.setAttribute("class", "tr");
    while (zona.childElementCount > 0) {
        zona.removeChild(zona.childNodes[1]);
    }
    input.innerHTML = "Modificar";
    input.addEventListener("click", modUser);
    zona.appendChild(input);
    let zona1 = document.getElementById("deletUser");
    let input1 = document.createElement("button");
    input1.setAttribute("class", "tr");
    while (zona1.childElementCount > 0) {
        zona1.removeChild(zona1.childNodes[1]);
    }
    input1.innerHTML = "Borrar";
    input1.addEventListener("click", delUser);
    zona1.appendChild(input1);
}

function modUser() {
    
    delete usuarios[id];
    usuarios[id] = usuarios[id];
    enviarDatos(usuarios);
    alert("Cliente Modificado");
    location.reload();
    
}

function delUser() {
    delete usuarios[id];
    enviarDatos(usuarios);
    alert("Cliente Borrado");
    location.reload();
}

function listener() {
    document.getElementById("idenviar").addEventListener("click", enviarDatos);
    document.getElementById("idmodificaClientes").addEventListener("change", muestraD);

}

window.onload = function () {
    this.listener();
    this.recibeClientes();
};