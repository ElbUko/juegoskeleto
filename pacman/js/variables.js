//CONSTANTES:
			var rutaImg = '../img/pacman/';
            var INTELIGEN = 2,
                TMIEDO = 30;
            //canvas.width = 20*21;
            //canvas.height = 20*15;
            var frameRate = 200;
            var relacionAspecto = 20;
            //variables de control de teclado
            var calma = true;
            var n=3;
            var pressingL = false;
            var pressingR = false;
            var pressingU = false;
            var pressingD = false;
            //variables de logica de juego
            var direcciones = ['N','E','S','O'];
            var direccion = 1;
            var nivel;
            var cien = {
                active: false,
                x: null,
                y: null
            };
            var pacman = {
                src: [rutaImg+'pacmanN1.png', rutaImg+'pacmanN2.png'],
                img: [],
                frame: 0,
                face: 1,        //face es a donde mira: 0,1,2,3 (N,E,S,O)
                x:  0,
                y:  0,        //pos x y
                exX: 0,
                exY: 0,
                comido: false,
                comio: false,
                ganaste: false,
                posId: [0,0],       //Hago un pos id para revisar menos choques en el collider
                w:  relacionAspecto,
                h:  relacionAspecto,         //tamaño heig wei
                v:  relacionAspecto          //vel
            };
            var fantasmas ={
                src: [rutaImg+'fantasmaA.png',rutaImg+'fantasma1.png',rutaImg+'fantasma2.png',rutaImg+'fantasma3.png',rutaImg+'100.gif'],
                img: [],
                quien: [],
                x: [],      //pos actual. Array de int
                y: [],
                x0: [],
                y0: [],
                exX: [],        //pos pasada. array de...
                exY: [],
                posId: [],      //pos dea matriz mapa.elem. Array de arrays
                miedo: false,       
                tmiedo: TMIEDO,         //cte de Ticks de miedo
                w: relacionAspecto,         //anchura de la img
                h: relacionAspecto,         //altura             a pintar
                v: relacionAspecto,      // vel del bicho
                inteligen: INTELIGEN,
                acciones: [],
                accion: []
            };
            var bolas = {
                src: [rutaImg+'bola.png', rutaImg+'bolon.png'],
                img: [],
                comida: [],
                pill: []
            };
            var p='pacman',c='ciego',l='listillo',a='asesino',o='bola',O = 'bolon';
            var mapa = {
                src: ['',rutaImg+'par20V.png',rutaImg+'par20H.png',rutaImg+'esq20NE.png',rutaImg+'esq20SE.png',rutaImg+'esq20SO.png',
                rutaImg+'esq20NO.png',rutaImg+'esqCC.png',rutaImg+'esqNC.png',rutaImg+'esqEC.png',rutaImg+'esqSC.png',rutaImg+'esqOC.png'],
                img: [],
                w: relacionAspecto,
                h: relacionAspecto
            };


			
           	var pantallaId = -1;

            function inicializaVariables(rel){
                n=3;
                calma = true;
                pressingL = false;
                pressingR = false;
                pressingU = false;
                pressingD = false;
                puntos = -1;
                actualizaPuntuacion();
                puntos = 500;
                puntosElem.innerHTML = puntos;
                direccion = 1;
                cien.active= false;
                cien.x= null;
                cien.y= null;
                pacman.frame = 0;
                pacman.face = 1;    
                pacman.w =  rel;
                pacman.h =  rel;         //tamaño heig wei
                pacman.v =  rel  ;        //vel
                pacman.comido = false;
                pacman.ganaste = false;
                bolas.comida = [];
                bolas.pill = [];
                fantasmas.quien= [];
                fantasmas.x= [];      //pos actual. Array de int
                fantasmas.y= [];
                fantasmas.x0= [];
                fantasmas.y0= [];
                fantasmas.exX= [];        //pos pasada. array de...
                fantasmas.exY= [];
                fantasmas.posId= [];      //pos dea matriz mapa.elem. Array de arrays
                fantasmas.miedo= false;       
                fantasmas.tmiedo= TMIEDO;         //cte de Ticks de miedo
                fantasmas.w= relacionAspecto;         //anchura de la img
                fantasmas.h= relacionAspecto;         //altura             a pintar
                fantasmas.v= relacionAspecto;      // vel del bicho
                fantasmas.inteligen= INTELIGEN;
                fantasmas.acciones= [];
                fantasmas.accion= [];
                mapa.w=  rel;
                mapa.h=  rel;         //tamaño heig wei
            }