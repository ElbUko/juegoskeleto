//CONSTANTES:
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
                src: ['img/pacmanN1.png', 'img/pacmanN2.png'],
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
                src: ['img/fantasmaA.png','img/fantasma1.png','img/fantasma2.png','img/fantasma3.png','img/100.gif'],
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
                src: ['img/bola.png', 'img/bolon.png'],
                img: [],
                comida: [],
                pill: []
            };
            var p='pacman',c='ciego',l='listillo',a='asesino',o='bola',O = 'bolon';
            var mapa = {
                src: ['','img/par20V.png','img/par20H.png','img/esq20NE.png','img/esq20SE.png','img/esq20SO.png','img/esq20NO.png',
                        'img/esqCC.png','img/esqNC.png','img/esqEC.png','img/esqSC.png','img/esqOC.png'],
                img: [],
                elem: pantalla[nivel],
                w: relacionAspecto,
                h: relacionAspecto
            };


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