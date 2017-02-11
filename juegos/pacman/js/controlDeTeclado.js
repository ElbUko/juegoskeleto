//###########################################################
            //#####                 Control de teclado              #####
            //###########################################################
            //
                        var ultimasTeclas = [];

            document.addEventListener("keydown",aprietaTecla,false);
            document.addEventListener("keyup",sueltaTecla,false);
            
            function aprietaTecla(evt) {
                if (evt.keyCode == 39) {    //Dcha
                    pressingR = true; pressingL = false; pressingU = false; pressingD = false;
                }
                if (evt.keyCode == 37) {    //Izq
                    pressingL = true; pressingR = false; pressingU = false; pressingD = false;
                }
                if (evt.keyCode == 38) {    //Arb
                    pressingU = true; pressingL = false; pressingR = false; pressingD = false;
                }
                if (evt.keyCode == 40) {    //Abj
                    pressingD = true; pressingL = false; pressingU = false; pressingR = false;
                }
                //if (calma &&(evt.keyCode != ultimasTeclas[length-1])){
                if ((calma)&&(pressingL || pressingR || pressingU || pressingD)){
                    calma = false;
                    
                    if (ultimasTeclas.length == 0){
                        ultimasTeclas.push(''+evt.keyCode);
                    }
                    else {
                        var esta = false;
                        for (var i=0; i<ultimasTeclas.length; i++){
                            if (evt.keyCode = ultimasTeclas[i]){
                                esta = true;
                            }
                            if (!esta){
                                ultimasTeclas.push(evt.keyCode);
                            }
                        }
                    }
                    //control();  

                }
                return;
            };
            function sueltaTecla(evt) {
                
                /*for (var i=0; i<ultimasTeclas.length; i++){
                    if (evt.keyCode = ultimasTeclas[i]){
                        ultimasTeclas.splice(i,1);
                    }
                }
                if (evt.keyCode == 40) {
                    pressingD = false;
                }
                if (evt.keyCode == 39) {
                    pressingR = false;
                }
                if (evt.keyCode == 38) {
                    pressingU = false;
                }
                if (evt.keyCode == 37) {
                    pressingL = false;
                }*/
                //  if (!pressingL && !pressingR && !pressingU && !pressingD)
                 //   calma = true;
                return;
            };