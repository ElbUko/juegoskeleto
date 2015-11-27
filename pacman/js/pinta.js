//###########################################################
            //#####                 Pintado del juego               #####
            //###########################################################
            //
            function cargaMapa(){
                ctx.fillStyle = "#000";                                 //Pinto el fondo de negro
                ctx.fillRect(0,0,canvas.width,canvas.height);
                for (var i=0; i<mapa.elem[0].length; i++){
                    for (var j=0; j<mapa.elem.length; j++){
                        if (mapa.elem[j][i]=='pacman'){             //guardo las variables de posicion del pacman
                            pacman.x = i*mapa.w;
                            pacman.y = j*mapa.h;
                            pacman.exX = i*mapa.w;
                            pacman.exY = j*mapa.h;
                        }
                        else if ((mapa.elem[j][i]=='listillo')||(mapa.elem[j][i]=='asesino')||(mapa.elem[j][i]=='ciego')){
                            fantasmas.x.push(i*mapa.w);
                            fantasmas.y.push(j*mapa.h);
                            fantasmas.x0.push(i*mapa.w);
                            fantasmas.y0.push(j*mapa.h);
                            fantasmas.exX.push(i*mapa.w);
                            fantasmas.exY.push(j*mapa.h);
                            fantasmas.posId.push([i,j]);
                            fantasmas.accion.push(0);
                            switch(mapa.elem[j][i]){
                                case 'listillo': fantasmas.quien.push('l'); break;
                                case 'asesino': fantasmas.quien.push('a'); break;
                                default: fantasmas.quien.push('c'); break;
                            }
                        }
                        else if (mapa.elem[j][i]=='bola'){                                  //pinto y almaceno la comida
                            ctx.drawImage(bolas.img[0],i*mapa.w,j*mapa.h,mapa.w,mapa.h);        //En pixeles!!
                            bolas.comida.push([i*mapa.w,j*mapa.h]);
                        }
                        else if (mapa.elem[j][i]=='bolon'){                                 //de los bolones
                            ctx.drawImage(bolas.img[1],i*mapa.w,j*mapa.h,mapa.w,mapa.h);   
                            bolas.pill.push([i*mapa.w,j*mapa.h]);
                        }
                        else if ((mapa.elem[j][i]>=1)||(mapa.elem[j][i]<=15)) //En realidad solo llega a 11
                        //else                                                                //pinto las paredes.
                            ctx.drawImage(mapa.img[mapa.elem[j][i]],i*mapa.w,j*mapa.h,mapa.w,mapa.h);
                    }
                }
                return;
            }
            function pintaPacman(){
                //Pacman
                //if (cien.active){   //pa pintar la animacion de 100 si ha comido en la anterior
                    //ctx.drawImage(fantasmas.img[4],cien.x,cien.y,pacman.w,pacman.h);
                  //  console.log("PINTO! "+cien.x+' '+cien.y);
                 //   cien.active = false;
                //}
                if ((pacman.exX != pacman.x)||(pacman.exY != pacman.y)){  //Si se movio
                    //ctx.fillstyle = "rgb(0,0,0)";
                    ctx.fillRect(pacman.exX,pacman.exY,pacman.w,pacman.h);      //borro la pos anterior del pacman
                }
                else if (pacman.comio){                                                  //Si comió
                    ctx.fillRect(pacman.x,pacman.y,pacman.w,pacman.h);      //borro la pos actual
                    cien.active = true;         //Establezco los valores para la animacion de 100
                    cien.x = pacman.x;
                    cien.y = pacman.y;
                    console.log("COME! "+cien.x+' '+cien.y);
                    pacman.comio = false;
                }
                if (pacman.face == 0){
                    ctx.drawImage(pacman.img[pacman.frame],pacman.x,pacman.y,pacman.w,pacman.h);
                }
                else {
                    ctx.save();
                    if (pacman.face == 1){
                        ctx.save();                         // guardo las propiedades del contexto 
                        ctx.translate(pacman.x+pacman.w,pacman.y);          // traslado el origen   -> translate(posX+wX,posY)
                        ctx.rotate((Math.PI/180)*90);       // roto el contexto
                    }
                    else if (pacman.face == 2) {
                        ctx.save();
                        ctx.translate(pacman.x+pacman.w,pacman.y+pacman.h);
                        ctx.rotate((Math.PI/180)*180);
                    }
                    else if (pacman.face == 3){
                        ctx.save();
                        ctx.translate(pacman.x,pacman.y);
                        ctx.rotate((Math.PI/180)*-90);
                        ctx.scale(-1,1);
                    }
                    ctx.drawImage(pacman.img[pacman.frame],0,0,pacman.w,pacman.h);
                    ctx.restore();
                }
                pacman.frame = (pacman.frame + 1) % pacman.img.length;
                return;
            }
            function pintaFantasmas(){
                //Fantasmas
                var comida = [], pill = [];                 //recorro una vez la comida y almaceno que pos habre de     
                for (var i=0; i<fantasmas.quien.length; i++){       //reco
                    for (var j=0; j<bolas.comida.length; j++){              //repintar a la pasada del fantasma
                        if ((bolas.comida[j][0]==fantasmas.exX[i])&&(bolas.comida[j][1]==fantasmas.exY[i]))
                            comida[i] = true;
                    }
                    for (var j=0; j<bolas.pill.length; j++){              //repintar a la pasada del fantasma
                        if ((bolas.pill[j][0]==fantasmas.exX[i])&&(bolas.pill[j][1]==fantasmas.exY[i]))
                            pill[i] = true;
                    }
                }
                for (var i=0; i<fantasmas.quien.length; i++){
                    if ((fantasmas.exX[i] != fantasmas.x[i])||(fantasmas.exY[i] != fantasmas.y[i])){    //si el fantasma se mueve
                        ctx.fillRect(fantasmas.exX[i],fantasmas.exY[i],mapa.w,mapa.h);                   //borro su imagen anterior
                        if (comida[i])                                                          //si habia comida
                            ctx.drawImage(bolas.img[0],fantasmas.exX[i],fantasmas.exY[i],mapa.w,mapa.h);    //la repinto
                        else if (pill[i])                                                             //idem con bolon
                            ctx.drawImage(bolas.img[1],fantasmas.exX[i],fantasmas.exY[i],mapa.w,mapa.h);
                    }
                    if ((fantasmas.miedo)&&!((fantasmas.tmiedo<=10)&&(fantasmas.tmiedo%2==0)))
                        ctx.drawImage(fantasmas.img[0],fantasmas.x[i],fantasmas.y[i],fantasmas.w,fantasmas.h);
                    else{
                        switch (fantasmas.quien[i]){
                            case 'a':
                                ctx.drawImage(fantasmas.img[1],fantasmas.x[i],fantasmas.y[i],fantasmas.w,fantasmas.h);
                                break;
                            case 'c':
                                ctx.drawImage(fantasmas.img[2],fantasmas.x[i],fantasmas.y[i],fantasmas.w,fantasmas.h);
                                break;
                            default:
                                ctx.drawImage(fantasmas.img[3],fantasmas.x[i],fantasmas.y[i],fantasmas.w,fantasmas.h);
                                break;
                        }
                    }
                }
                return;
            };

            function mensajea(accion){
                if (accion=="gana"){
                    ctx.font = canvas.width/5+"px impact";
                    ctx.fillStyle = "#f00";
                    ctx.fillText("Ganaste!!", canvas.width/10, canvas.height*2/3);
                    ctx.font = canvas.width/5.1+"px impact";
                    ctx.fillStyle = "#fff";
                    ctx.fillText("Ganaste!!", canvas.width/9, canvas.height*2/3);
                }
                else if (accion=="pierde"){
                    ctx.font = canvas.width/5+"px impact";
                    ctx.fillStyle = "#f00";
                    ctx.fillText("Perdiste!!", canvas.width/10, canvas.height*2/3);
                    ctx.font = canvas.width/5.1+"px impact";
                    ctx.fillStyle = "#fff";
                    ctx.fillText("Perdiste!!", canvas.width/9.3, canvas.height*2/3);
                }
                return;
            }