
(()=> {
    'use strict'

    const nombreHTML = document.querySelector('#nombre');
    const nombreJugador = prompt('Indícanos tu nombre');
    nombreHTML.innerText = `${(nombreJugador === null ) ? 'Toreto ' : nombreJugador + ' - '}`;

    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevoJuego = document.querySelector('#btnNuevoJuego');

    const smalls = document.querySelectorAll('small');
    const divCartasClass =  document.querySelectorAll('.divCartas');

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A','J','Q','K'];

    // let puntosJugador = 0, puntosComputadora = 0;
    let puntosJugadores = [];

    const inicializarJuego = ( numJugadores = 2) => {
        deck = mostrarDeck();
        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0)
        }

        smalls.forEach(elem => elem.innerText = 0);
        divCartasClass.forEach(carta => carta.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;


    }

    // Esta funcion crea una nueva barajo
    const mostrarDeck = () => {
        deck = []
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
        return _.shuffle(deck);
    }

    const pedirCarta2 = () => {

        if( !deck.length ) {
            throw 'No hay más cartas en el deck (baraja)';
        } else {
            return deck.pop();
        }
    }

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length -1);
        return ( isNaN(valor) ) ?
                ( valor === 'A' ) ? 11 : 10
                : parseInt(valor)
    }

    //El 0 = al primer jugaadaor y el último será la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno]+= valorCarta( carta );
        smalls[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const dibujarCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasClass[turno].append(imgCarta);
    }

    const determinaraGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie ganó :(');
            } else if (puntosMinimos > 21 ) {
                alert('La computadora ganó :(');
            } else if ( puntosComputadora > 21) {
                alert(`Excelente ${nombreJugador}, has ganado!!`)
            } else {
                alert('Ganó la computadora')
            }
        }, 500);
    }

    // Turno de la computadora

    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputadora = 0;
        do{
            const carta = pedirCarta2();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            dibujarCarta( carta, puntosJugadores.length - 1);

            if( puntosMinimos > 21) {
                break;
            }
        }
        while( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 ) )
        determinaraGanador();
    }

    //fin de hacer el pedir carta incluso más aleatorio

    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta2();
        const puntosJugador = acumularPuntos(carta, 0)

        dibujarCarta(carta, 0);

        if ( puntosJugador > 21 ) {
            console.warn('Perdiste')
            btnPedir.disabled = true;
            
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugadores[0] )
    });

    btnNuevoJuego.addEventListener('click', () => {
        inicializarJuego();
    });

})()

