
let Personaje = [
    { nombre: "Invencible", archivo: "invencible.png" },
    { nombre: "Batman que ríe", archivo: "batman-que-rie.png" },
    { nombre: "Naruto", archivo: "naruto.png" },
    { nombre: "Darth Vader", archivo: "darth-vader.png" },
    { nombre: "Goku Black", archivo: "goku-black.png" },
    { nombre:  "Jon" , archivo: "Jon.png"},
    { nombre:  "Daemon", archivo: "Daemon.png"},
    { nombre:  "Arthur", archivo: "arthur.png"}
];


let Correcta = [0, 2, 0, 2, 2,2,0,1]; 
let opciones = [
    ["Invencible", "Superman", "Red Hood"],
    ["Robin", "Joker", "Batman que ríe"],
    ["Naruto", "Darth Vader", "Kaneki"],
    ["Samas", "Jiren", "Darth Vader"],
    ["Goku", "Vegeta", "Goku Black"],
    [" Rob Stark", "Robin Arryn", "Jon Snow"],
    [" Daemon Targaryen ", "Ned Stark", "Jaime Lannister"],
    [" Aegon Targaryen ", "Arthur Dayne", "Jaime Lannister"]
    
];
function precargarImagenes() {
    Personaje.forEach(personaje => {
        new Image().src = `img/${personaje.archivo}`;
    });
}
precargarImagenes(); 

let posActual = 0;
let cantidadAcertadas = 0;
let cantidadIncorrectas = 0;

function formatearNombreImagen(nombre) {
    return nombre.toLowerCase().replace(/\s+/g, '-');
}


function comenzarJuego() {
    posActual = 0;
    cantidadAcertadas = 0;
    cantidadIncorrectas = 0;
    
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    cargarPersonaje();
}
function cargarPersonaje() {
    if (posActual >= Personaje.length) {
        terminarJuego();
        return;
    }
    
    limpiarOpciones();
    const imagen = Personaje[posActual];
    const imgElement = document.getElementById("imgPersonaje");
    
    
    imgElement.onerror = function() {
        this.src = 'img/placeholder-error.png';
        console.error(`Imagen no encontrada: ${imagen.archivo}`);
    }
    
    imgElement.src = `img/${imagen.archivo}`;
    imgElement.alt = `Imagen de ${imagen.nombre}`; 
    
    document.getElementById("n0").textContent = opciones[posActual][0];
    document.getElementById("n1").textContent = opciones[posActual][1];
    document.getElementById("n2").textContent = opciones[posActual][2];
}


function limpiarOpciones() {
    
    document.querySelectorAll('.nombre, .letra').forEach(elemento => {
        elemento.className = elemento.classList[0]; 
    });
}

function comprobarRespuesta(opElegida) {
    if (opElegida === Correcta[posActual]) {
        cantidadAcertadas++;
        document.getElementById(`n${opElegida}`).classList.add('nombreAcertada');
        document.getElementById(`l${opElegida}`).classList.add('letraAcertada');
    } else {
        cantidadIncorrectas++;
        document.getElementById(`n${opElegida}`).classList.add('nombreNoAcertada');
        document.getElementById(`l${opElegida}`).classList.add('letraNoAcertada');
        
        document.getElementById(`n${Correcta[posActual]}`).classList.add('nombreAcertada');
        document.getElementById(`l${Correcta[posActual]}`).classList.add('letraAcertada');
    }
    
    posActual++;
    setTimeout(cargarPersonaje, 1500);
}

function terminarJuego() {
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "block";
    document.getElementById("numCorrectas").textContent = cantidadAcertadas;
    document.getElementById("numIncorrectas").textContent = cantidadIncorrectas;
}

function volverAlInicio() {
    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-inicial").style.display = "block";
}