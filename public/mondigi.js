const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('btn-reiniciar')
const  btnMascotaJugador = document.getElementById("btn-mascotas")

const botonReiniciar = document.getElementById("btn-reiniciar")

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidaJugador = document.getElementById("vida-jugador")
const spanVidaEnemigo = document.getElementById("vida-enemigo")

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa= document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mondigi =[]
let mondigisEnemigos = []
let ataqueJugador =[]
let ataqueEnemigo =[]
let opcionDeMondigis
let inputDrochop 
let inputYamarin 
let inputPierda
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMondigi
let ataquesMondigiEnemigo
let botonTierra  
let botonFuego 
let botonAgua 
let botones =[]
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidaJugador = 3
let vidaEnemigo = 3
let lienzo = mapa.getContext('2d')
let intervalo 
let mapaBackground = new Image()
mapaBackground.src ='./img/mapa.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 500

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}


alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mondigi {
    constructor(nombre, foto, vida,fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 30
        this.alto = 30
        this.x = aleatorio (0, mapa.width - this.ancho)
        this.y = aleatorio (0, mapa.height - this.alto)
        this.mapaFoto = new Image ()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMondigi(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let drochop = new Mondigi('Drochop','img/2.png', 5, './img/head2.png')
let yamarin = new Mondigi('Yamarin','img/3.png', 5, './img/head3.png')
let piedra = new Mondigi('Piedra','img/1.png', 5, './img/head1.png')



const DROCHOP_ATAQUES = [
    {nombre : '💧', id : 'btn-agua'},
    {nombre : '💧', id : 'btn-agua'},
    {nombre : '💧', id : 'btn-agua'},
    {nombre : '🔥', id : 'btn-fuego'},
    {nombre : '🪨', id : 'btn-piedra'},
]

drochop.ataques.push(...DROCHOP_ATAQUES)



const YAMARIN_ATAQUES = [
    {nombre : '💧', id : 'btn-agua'},
    {nombre : '🔥', id : 'btn-fuego'},
    {nombre : '🔥', id : 'btn-fuego'},
    {nombre : '🔥', id : 'btn-fuego'},
    {nombre : '🪨', id : 'btn-piedra'},
]

yamarin.ataques.push(...YAMARIN_ATAQUES)


const PIEDRA_ATAQUES = [
    {nombre : '💧', id : 'btn-agua'},
    {nombre : '🪨', id : 'btn-piedra'},
    {nombre : '🪨', id : 'btn-piedra'},
    {nombre : '🔥', id : 'btn-fuego'},
    {nombre : '🪨', id : 'btn-piedra'},
]

piedra.ataques.push(...PIEDRA_ATAQUES)


mondigi.push(drochop, yamarin, piedra)

function iniciarJuego(){
    
    sectionSeleccionarAtaque.style.display = 'none' 
    sectionVerMapa.style.display = 'none'

    mondigi.forEach((mondigi)=> {
        opcionDeMondigis =  `
        <input type="radio" name="mascota" id=${mondigi.nombre} />
                <label for=${mondigi.nombre} class="tarjeta">
                    <p>${mondigi.nombre}</p>
                    <img src=${mondigi.foto} 
                    alt=${mondigi.nombre}>
                </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMondigis

    inputDrochop = document.getElementById("Drochop")
    inputYamarin = document.getElementById("Yamarin")
    inputPierda = document.getElementById("Piedra")

    })

    sectionReiniciar.style.display = 'none'  

    btnMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    
    
    botonReiniciar.addEventListener('click', reinicarJuego )


    unirseALJuego()

}

function unirseALJuego(){
    fetch("http://localhost:8080/unirse")
    .then(function(res){
        if(res.ok){
            res.text()
                .then(function(respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                })
        }
    })
}

function seleccionarMascotaJugador(){
    
    

    
    if (inputDrochop.checked){
        spanMascotaJugador.innerHTML= inputDrochop.id
        mascotaJugador = inputDrochop.id
    }else if (inputYamarin.checked){
        spanMascotaJugador.innerHTML= inputYamarin.id
        mascotaJugador = inputYamarin.id
    }else if(inputPierda.checked){
        spanMascotaJugador.innerHTML= inputPierda.id
        mascotaJugador = inputPierda.id
    }else {
        alert("Debes seleccionar")
        return
    }

    sectionSeleccionarMascota.style.display = 'none'

    seleccionarMondigi(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    

}

function seleccionarMondigi(mascota){
    fetch( `http://localhost:8080/mondigi/${jugadorId}`, {  
        method : "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mondigi : mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mondigi.length; i++) {
        if (mascotaJugador === mondigi[i].nombre){
            ataques = mondigi[i].ataques
        }
        
    }

    mostrarAtaques(ataques)
}

function mostrarAtaques (ataques){
    ataques.forEach((ataque) =>{
        ataquesMondigi = `
        <button id=${ataque.id} class="btnataque BAtaque">${ataque.nombre}</button>
        `

        contenedorAtaques.innerHTML += ataquesMondigi
    })


    botonTierra  = document.getElementById("btn-piedra")
    botonFuego = document.getElementById("btn-fuego")
    botonAgua = document.getElementById("btn-agua")
    botones = document.querySelectorAll('.BAtaque')


    /* botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra) */
}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click',(e)=>{
            if (e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if (e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques(){
    fetch(`http://localhost:8080/mondigi/${jugadorId}/ataques`,{
        method : "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques : ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques (){
    fetch(`http://localhost:8080/mondigi/${enemigoId}/ataques`)
        .then(function(res){
            if (res.ok){
                res.json()
                    .then(function({ataques }){
                        if (ataques.length === 5){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMondigiEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio (0,ataquesMondigiEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador , enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate (){

    clearInterval (intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje ("Empate")
            /* victoriasJugador++
            spanVidaJugador.innerHTML=victoriasJugador */
        }else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA'){
            indexAmbosOponentes(index, index)
            crearMensaje ("Win")
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
        }else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO'){
            indexAmbosOponentes(index, index)
            crearMensaje ('Win')
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
            
        }else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA'){
            indexAmbosOponentes(index, index)
            crearMensaje ('Win')
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador   
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje ('Lose')
            victoriasEnemigo++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()

}


function revisarVidas(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Empanadas ")
    } else if (victoriasJugador > victoriasEnemigo ){
        crearMensajeFinal("Ganaste, CAPO")
    } else {
        crearMensaje ('Perdiste, Brokolis')
    }
}

function crearMensaje (resultado){

    
    let nuevoAtaqueDelJugador = document.createElement('p') 
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo


    /* let parrafo = document.createElement('p')
    parrafo.innerHTML= 'Tu mascota ataco con ' + ataqueJugador + ' la mascota del enemigo con ' + ataqueEnemigo + ' ' + resultado */

    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal (resulatdoFinal){
    
    
    sectionMensajes.innerHTML= resulatdoFinal


    
    sectionReiniciar.style.display = 'block'
}

function reinicarJuego(){
    location.reload()
}

function aleatorio (min, max){
    return Math.floor(Math.random() * (max-min + 1) + min )

}

function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height )
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMondigi()

    enviarPosicion(mascotaJugadorObjeto.x  ,mascotaJugadorObjeto.y)

    mondigisEnemigos.forEach(function(mondigi){
        mondigi.pintarMondigi()
        revisarColision(mondigi)
    })
    // if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
    //     revisarColision(drochopEnemigo)
    //     revisarColision(yamarinEnemigo)
    //     revisarColision(piedraEnemigo)
    // }
}

function enviarPosicion (x, y) {
    fetch(`http://localhost:8080/mondigi/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res) {
        if (res.ok) {
            res.json()
                .then(function({ enemigos }) {
                    console.log(enemigos)
                    mondigisEnemigos = enemigos.map(function(enemigo) {
                        if (enemigo.mondigi !== undefined) {
                            const mondigiNombre = enemigo.mondigi.nombre || "";
                            let mondigiEnemigo = null;
                            if (mondigiNombre === "Drochop") {
                                mondigiEnemigo = new Mondigi('Drochop', 'img/2.png', 5, './img/head2.png', enemigo.id);
                            } else if (mondigiNombre === "Yamarin") {
                                mondigiEnemigo = new Mondigi('Yamarin', 'img/3.png', 5, './img/head3.png', enemigo.id);
                            } else if (mondigiNombre === "Piedra") {
                                mondigiEnemigo = new Mondigi('Piedra', 'img/1.png', 5, './img/head1.png', enemigo.id);
                            }
                            // esta parte fue la que se cambio con chatgpt
                            if (mondigiEnemigo !== null) {
                                mondigiEnemigo.x = enemigo.x;
                                mondigiEnemigo.y = enemigo.y;
                                return mondigiEnemigo;
                            }
                        }
                        return null;
                    }).filter(mondigi => mondigi !== null); // Filtra cualquier valor null
                });
        }
    });
}


function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo(){
    const miMondigi = obtenerObjetoMascota()
    mascotaJugadorObjeto.velocidadY = + 5
    
}
function moverArriba(){
    
    mascotaJugadorObjeto.velocidadY = - 5
    
}
function detenerMovimiento(){
    
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        default:
            break;
    }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup',detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mondigi.length; i++) {
        if (mascotaJugador === mondigi[i].nombre){
            return mondigi[i]
        }
        
    }
}

function revisarColision(enemigo){

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = 
    mascotaJugadorObjeto.y
    const abajoMascota = 
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
    mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
    
}

window.addEventListener("load", iniciarJuego)