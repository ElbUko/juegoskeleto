//###########################################################
//#####                 IA  cutre                       #####
//###########################################################


function mueveALoLoco(quien){
    var posibles = accionesPosibles(quien);
    var elegida = posibles[Math.floor(Math.random()*posibles.length)];
    return elegida;
}


function accionesPosibles(quien){
    /* Veo que aqui necesito la velocidad del fantasma y varias cosas del mapa*/
    posibles = [];
    for (var i=0; i<4; i++){
        if (esPosible(i,quien)){
            posibles.push(i);
        }
    }
    return posibles;
}


function esPosible(hacia,i){
    var puede = true;
    var futuraX=fantasmas.x[i], futuraY=fantasmas.y[i];
    switch (hacia){
        case 0: futuraY -= fantasmas.v; break;
        case 1: futuraX += fantasmas.v; break;
        case 2: futuraY += fantasmas.v; break;
        case 3: futuraX -= fantasmas.v; break;
    }
    fantasmas.posId[i][0]=Math.floor((futuraX)/mapa.w);
    fantasmas.posId[i][1]=Math.floor((futuraY)/mapa.h);
    //Control de choque
    try {
        if ((fantasmas.posId[i][0]<0)||(fantasmas.posId[i][1]<0)
            ||(fantasmas.posId[i][0]>=mapa.elem[0].length)
            ||(fantasmas.posId[i][1]>=mapa.elem.length))
            puede = false;
        else if ((mapa.elem[fantasmas.posId[i][1]][fantasmas.posId[i][0]]>0)
            &&(mapa.elem[fantasmas.posId[i][1]][fantasmas.posId[i][0]]<15)){
            puede = false;
        }
    }
    catch (e){
        console.log('futuraY: '+futuraY+' futuraX: '+futuraX);
        console.log('fantasmas.posId['+i+']: '+fantasmas.posId[i]);
    }
    return puede;    
}


function mueveAMatar(i){          //A CAMBIAR, ESTE NO MOLA
    var posibles = [];
    if ((pacman.x < fantasmas.x[i])&&(esPosible(3,i))){
        posibles.push(3);
        posibles.push(fantasmas.x[i]-pacman.x);
    }
    else if (esPosible(1,i)){
        posibles.push(1);
        posibles.push(pacman.x-fantasmas.x[i]);
    }
    if ((pacman.y < fantasmas.y[i])&&(esPosible(0,i))){
        posibles.push(0);
        posibles.push(fantasmas.y[i]-pacman.y);
    }
    else if (esPosible(2,i)){
        posibles.push(2);
        posibles.push(pacman.y-fantasmas.y[i]);
    }
    if (posibles.length == 4){
        if (posibles[1]>posibles[3])
            return posibles[0];
        else
            return posibles[2];
    }
    else
        return posibles[0];
}


function huye(i){
    var posibles = [];
    if ((pacman.x > fantasmas.x[i])&&(esPosible(3,i))){
        posibles.push(3);
        posibles.push(fantasmas.x[i]+pacman.x);
    }
    else if (esPosible(1,i)){
        posibles.push(1);
        posibles.push(pacman.x+fantasmas.x[i]);
    }
    if ((pacman.y > fantasmas.y[i])&&(esPosible(0,i))){
        posibles.push(0);
        posibles.push(fantasmas.y[i]+pacman.y);
    }
    else if (esPosible(2,i)){
        posibles.push(2);
        posibles.push(pacman.y+fantasmas.y[i]);
    }
    if (posibles.length == 4){
        if (posibles[1]>posibles[3])
            return posibles[0];
        else
            return posibles[2];
    }
    else
        return posibles[0];
}
