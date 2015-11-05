            //###########################################################
            //#####                 IA  buena                       #####
            //###########################################################
            //
                     
var visitados = [];       //Ha de ser un conjunto cerrado
var frontera = [];      //Hay que implementarlo como una cola de prioridad
var n = null;           //nº de fantasma

function actualizaVarExploracion(nodo){                 //Funcion que actualiza visitados y frontera
    if ((visitados.length == 0) && (frontera.length == 0)){
        frontera.push([nodo,4,calculaHeuristica(nodo),[]]);     //primer estado, primer nodo
        visitados.push(nodo);
        return;
    }
    for (var i=visitados.length-1; i>=0; i--){         //Para cada uno de los visitados
        if ((visitados[i][0]==nodo[0][0])&&(visitados[i][1]==nodo[0][1])) //si este estado lo ha sido
            return;                                 //volvemos
    }
    visitados.push(nodo[0]);                    //si no, lo metemos
    if (frontera.length==0){
        frontera.push(nodo);
    }
    else if (frontera.length==1){
        if (frontera[0][2]>=nodo[2])
            frontera.push(nodo);
        else
            frontera.splice(0,0,nodo);
    }
    else {
        for (var i=frontera.length-1; i>=0; i--){        //y lo colocamos en el lugar de priorida adecuao
            if (frontera[i][2]>=nodo[2]){
                frontera.splice(i+1,0,nodo);
                return;
            }
        }
        frontera.splice(0,0,nodo);
    }
    return;
}

function sacaNodosHijo(nodo){
    var posibles = [];
    for (var i=0; i<4; i++){
        if (accionEsPosible(i,nodo[0])){
            posibles.push(i);
        }
    }
    var nuevoNodo = [], nuevoEstado = [], hc;
    for (var i=posibles.length-1; i>=0; i--){
        switch (posibles[i]){
            case 0: nuevoEstado = [nodo[0][0],             nodo[0][1]-fantasmas.v ]; break;
            case 1: nuevoEstado = [nodo[0][0]+fantasmas.v, nodo[0][1]              ]; break;
            case 2: nuevoEstado = [nodo[0][0],             nodo[0][1]+fantasmas.v ]; break;
            case 3: nuevoEstado = [nodo[0][0]-fantasmas.v, nodo[0][1]              ]; break;
        }
        hc = calculaHeuristica(nuevoEstado);
        actualizaVarExploracion([nuevoEstado,posibles[i],hc,nodo]);
    }
    return;
};

function accionEsPosible(hacia,estado){
    var puede = true;
    var futuraX=estado[0], futuraY=estado[1];
    switch (hacia){
        case 0: futuraY -= fantasmas.v; break;
        case 1: futuraX += fantasmas.v; break;
        case 2: futuraY += fantasmas.v; break;
        case 3: futuraX -= fantasmas.v; break;
    }
    fantasmas.posId[n][0]=Math.floor((futuraX)/mapa.w);
    fantasmas.posId[n][1]=Math.floor((futuraY)/mapa.h);
    //Control de choque
    try {
        if ((fantasmas.posId[n][0]<0)||(fantasmas.posId[n][1]<0)||(fantasmas.posId[n][0]>=mapa.elem[0].length)||(fantasmas.posId[n][1]>=mapa.elem.length))
            puede = false;
        if ((mapa.elem[fantasmas.posId[n][1]][fantasmas.posId[n][0]]>0)
        &&(mapa.elem[fantasmas.posId[n][1]][fantasmas.posId[n][0]]<15)){
            puede = false;
        }
    }
    catch (e){
        //console.log('futuraY: '+futuraY+' futuraX: '+futuraX)
        //console.log('fantasma.posId: '+fantasmas.posId[n])    
    }
    return puede;
}

function calculaHeuristica(estado){
    return (Math.abs(pacman.x-estado[0])+Math.abs(pacman.y-estado[1]));
};

function sacaAcciones(nodo,i){
    var acciones = [];
    while(nodo[1] != 4){
        acciones.splice(0,0,nodo[1]);
        nodo = nodo[3];
    }
    fantasmas.acciones[i] = acciones;
    return;
}
function comePacman(cual){
    visitados = [], frontera = [];
    n = cual;
    actualizaVarExploracion([fantasmas.x[n],fantasmas.y[n]]);
    var nodo = [1,1,1,1],a=0;
    while ((a<200)&&(nodo[2]!=0)){
        nodo = frontera.pop();
        if (nodo!=undefined){      //Si sale undefined es que no hay camino
            sacaNodosHijo(nodo);
            a += 1;
        }
        else{
            a =500;
        }
    }
    if (a<500)
        sacaAcciones(nodo,n);
    return;
}


