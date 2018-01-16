//###########################################################
//#####         Actualizacion de muñecos              #####
//###########################################################


function muevePacman(){
    pacman.exX = pacman.x;  pacman.exY = pacman.y;
    switch (direccion){
        case 0:
            pacman.face = 0;
            pacman.y -= pacman.v; 
            break;
        case 1:
            pacman.face = 1;
            pacman.x += pacman.v; 
            break;
        case 2:
            pacman.face = 2;
            pacman.y += pacman.v; 
            break;
        case 3:
            pacman.face = 3;
            pacman.x -= pacman.v; 
            break;
    }
    pacman.posId[0]=Math.floor((pacman.x)/mapa.w);
    pacman.posId[1]=Math.floor((pacman.y)/mapa.h);
    //Control de choque
    try {
        if ((mapa.elem[pacman.posId[1]][pacman.posId[0]]>0)         //0 y 15 no son posiciones
            &&(mapa.elem[pacman.posId[1]][pacman.posId[0]]<15)){    //son los valores de las paredes.
            pacman.x = pacman.exX; 
            pacman.y = pacman.exY;
        }
    }
    catch (e){
        //console.log('pacman.x: '+pacman.x+' pacman.y: '+pacman.y)
        //console.log('FUERA: pacman.posId: '+pacman.posId)
    }
    for (var i=0; i<fantasmas.quien.length; i++){
        if (((fantasmas.x[i] == pacman.x)&&(fantasmas.y[i] == pacman.y))    //Si fanta y pac estan en mismo lugar
            ||((fantasmas.x[i] == pacman.exX)&&(fantasmas.y[i] == pacman.exY)  // o se cruzan
            &&(fantasmas.exX[i] == pacman.x)&&(fantasmas.exY[i] == pacman.y))){
            if (fantasmas.miedo){                               //Si tiene miedo le mando al orgien
                fantasmas.x[i]=fantasmas.x0[i];
                fantasmas.y[i] = fantasmas.y0[i];
                fantasmas.exX[i] = fantasmas.x0[i];
                fantasmas.exY[i] = fantasmas.y0[i];
                fantasmas.posId[i] = [Math.floor((fantasmas.x0[i])/mapa.w),Math.floor((fantasmas.y0[i])/mapa.h)];
                pacman.comio = true;
                puntos += 100;
            }
            else                                                //Si no, perdiste.
                pacman.comido = true;
        }
    }
    compruebaBolas(); //Para poner el miedo en on si estas en un pill, o acabas si estas en la ultima
    return;
}


function compruebaBolas(){                
    for (var i=0; i<bolas.comida.length; i++){                  //recorre la comida y comprueba si pacman esta ahi
        if ((bolas.comida[i][0]==pacman.x)&&(bolas.comida[i][1]==pacman.y)){
            bolas.comida.splice(i,1);                           //para quitala
            puntos += 1;
            if(bolas.comida.length==0){
                pacman.ganaste = true;                          // o ganar
            }
            break;
        }
    }
    for (var i=0; i<bolas.pill.length; i++){
        if ((bolas.pill[i][0]==pacman.x)&&(bolas.pill[i][1]==pacman.y)){
            bolas.pill.splice(i,1);
            fantasmas.miedo=true;
            fantasmas.tmiedo=TMIEDO;
            break;
        }
    }
}

                
function mueveFantasmas(){   //fantasmas
    if (fantasmas.miedo){
        fantasmas.tmiedo -= 1;          //Actualizo el tiempo de susto
        if (fantasmas.tmiedo==0){       //Si se he acabado lo reinicio
            fantasmas.miedo=false;
            fantasmas.tmiedo=TMIEDO;
            for (var i=0; i<fantasmas.quien.length; i++){   //limpio las acciones de los listos
                if (fantasmas.quien[i]=="l"){
                    fantasmas.accion[i] = 0;
                    fantasmas.acciones[i] = [];    
                }
            }
        }
        else {                      //si no ha acabado los muevo a lo cutre
            for (var i=0; i<fantasmas.quien.length; i++){
                fantasmas.exX[i] = fantasmas.x[i];
                fantasmas.exY[i] = fantasmas.y[i];
                mueveHuyendo(i);
            }
        }
    }
    else {
        for (var i=0; i<fantasmas.quien.length; i++){
            fantasmas.exX[i] = fantasmas.x[i];
            fantasmas.exY[i] = fantasmas.y[i];
            if (fantasmas.quien[i] == "c")
                mueveCiego(i);
            else if (fantasmas.quien[i] == "a")
                mueveAsesino(i);
            else if (fantasmas.quien[i] == "l"){
                //console.log(fantasmas.acciones[i])
                if (fantasmas.acciones.length == 0)
                    mueveCiego(i);
                else if (fantasmas.acciones[i] == undefined)
                    mueveCiego(i);       
                else 
                    mueveListillo(i);
            }
        }
    }
}
                

function mueveListillo(i){
    switch (fantasmas.acciones[i][fantasmas.accion[i]]){
        case 0: fantasmas.y[i] -= fantasmas.v; break;
        case 1: fantasmas.x[i] += fantasmas.v; break;
        case 2: fantasmas.y[i] += fantasmas.v; break;
        case 3: fantasmas.x[i] -= fantasmas.v; break;
    }
    fantasmas.posId[i][0]=Math.floor((fantasmas.x[i])/mapa.w);
    fantasmas.posId[i][1]=Math.floor((fantasmas.y[i])/mapa.h);
    fantasmas.accion[i] +=1 ;
    if ((fantasmas.inteligen == 0)||((fantasmas.exX[i]==fantasmas.x[i])&&(fantasmas.exY[i]==fantasmas.y[i]))){
        comePacman(i);                              
        fantasmas.accion[i] = 0;
        fantasmas.inteligen = INTELIGEN;
    }
    else 
        fantasmas.inteligen -= 1;
    if ((fantasmas.x[i] == pacman.x)&&(fantasmas.y[i] == pacman.y))
        pacman.comido = true;
    return;
}


function mueveCiego(i){
    var dirFantasma = mueveALoLoco(i);
    switch (dirFantasma){
        case 0:
            fantasmas.y[i] -= fantasmas.v; 
            break;
        case 1:
            fantasmas.x[i] += fantasmas.v; 
            break;
        case 2:
            fantasmas.y[i] += fantasmas.v; 
            break;
        case 3:
            fantasmas.x[i] -= fantasmas.v; 
            break;
    }
    fantasmas.posId[i][0]=Math.floor((fantasmas.x[i])/mapa.w);
    fantasmas.posId[i][1]=Math.floor((fantasmas.y[i])/mapa.h);
    if ((fantasmas.x[i] == pacman.x)&&(fantasmas.y[i] == pacman.y)){
        if (fantasmas.miedo){
            fantasmas.x[i] = fantasmas.x0[i];
            fantasmas.y[i] = fantasmas.y0[i]; 
        }
        else
            pacman.comido = true;
    }
}

function mueveAsesino(i){
    dirFantasma =  mueveAMatar(i);
    if (dirFantasma != null){
        switch (dirFantasma){
            case 0:
                fantasmas.y[i] -= fantasmas.v; 
                break;
            case 1:
                fantasmas.x[i] += fantasmas.v; 
                break;
            case 2:
                fantasmas.y[i] += fantasmas.v; 
                break;
            case 3:
                fantasmas.x[i] -= fantasmas.v; 
                break;
        }
        fantasmas.posId[i][0]=Math.floor((fantasmas.x[i])/mapa.w);
        fantasmas.posId[i][1]=Math.floor((fantasmas.y[i])/mapa.h);
        if ((fantasmas.x[i] == pacman.x)&&(fantasmas.y[i] == pacman.y))
            pacman.comido = true;
    }
}

function mueveHuyendo(i){
    var dirFantasma = huye(i);
    if (dirFantasma != null){
        switch (dirFantasma){
            case 0:
                fantasmas.y[i] -= fantasmas.v; 
                break;
            case 1:
                fantasmas.x[i] += fantasmas.v; 
                break;
            case 2:
                fantasmas.y[i] += fantasmas.v; 
                break;
            case 3:
                fantasmas.x[i] -= fantasmas.v; 
                break;
        }
        fantasmas.posId[i][0]=Math.floor((fantasmas.x[i])/mapa.w);
        fantasmas.posId[i][1]=Math.floor((fantasmas.y[i])/mapa.h);
    }
    else 
        //console.log(dirFantasma)
    return;
    //tes
}