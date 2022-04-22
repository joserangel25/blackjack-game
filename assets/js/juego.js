// 2C es 2 de tréboles
// 2H es 2 de corazones
// 2D es 2 de diamantes
// 2S es 2 de espadas

const nombreHTML = document.querySelector('#nombre');
const nombreJugador = prompt('Indícanos tu nombre');
nombreHTML.innerText = `${(nombreJugador === null ) ? 'Toreto ' : nombreJugador + ' - '}`;

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevoJuego = document.querySelector('#btnNuevoJuego');

const smalls = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A','J','Q','K'];

let puntosJugador = 0, 
    puntosComputadora = 0;




// Esta funcion crea una nueva barajo
const mostrarDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for(let tipo of tipos){
            deck.push(i + tipo)
        }
    }
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo)
        }
    }
    // console.log(deck)
    // console.log('-----')
    deck = _.shuffle(deck)
    // console.log(deck)
    return deck
}
mostrarDeck();

const pedirCarta2 = () => {

    if( !deck.length ) {
        throw 'No hay más cartas en el deck (baraja)';
    } else {
        const carta = deck.pop()
        return carta;
    }
}

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length -1);
    return ( isNaN(valor) ) ?
            ( valor === 'A' ) ? 11 : 10
            : parseInt(valor)
}

// Turno de la computadora

const turnoComputadora = ( puntosMinimos ) => {

    do{
        const carta = pedirCarta2();
        puntosComputadora+= valorCarta( carta );
        smalls[1].innerText = puntosComputadora;

        //<img class="carta" src="./assets/cartas/cartas/10S.png" alt="">
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if( puntosMinimos > 21) {
            break;
        }
    }
    while( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 ) )

    setTimeout(() => {
        
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie ganó :(');
        } else if (puntosMinimos > 21 ) {
            alert('La computadora ganó :(');
        } else if ( puntosComputadora > 21) {
            alert('El jugador1 ganó')
        } else {
            alert('Ganó la computadora')
        }
    }, 500);
}

//fin de hacer el pedir carta incluso más aleatorio

//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta2();
    puntosJugador+= valorCarta( carta );
    smalls[0].innerText = puntosJugador;

    //<img class="carta" src="./assets/cartas/cartas/10S.png" alt="">
    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if ( puntosJugador > 21 ) {
        console.warn('Perdiste')
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    } else if ( puntosJugador === 21 ) {
        console.warn('21, genial');
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador )
});

btnNuevoJuego.addEventListener('click', () => {
    console.clear()
    deck = [];
    mostrarDeck();
    puntosJugador = 0;
    smalls[0].innerText = 0;
    puntosComputadora = 0;
    smalls[1].innerText = 0;
    btnPedir.disabled = false;
    btnDetener.disabled = false;

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';

});