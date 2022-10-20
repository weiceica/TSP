// the "main"
//------------------------------------------------------------------------
function initGrid(){
    // grid container
    var gridContainer = document.getElementById("gridContainer");

    for(var i = 0; i < 8; ++i){
        var row = document.createElement('div');
        row.className = "rowClass";
        row.id = "rowId" + (i + 1);

        for(var j = 0; j < 20; ++j){
            // create node
            var node = document.createElement('button');
            node.className = "nodeClass";
            node.id = "nodeId" + (i + 1) + (j + 1);
            row.appendChild(node);

            // create subnode
            var subNode = document.createElement('div');
            subNode.setAttribute("active", false);
            subNode.className = "sub";
            subNode.id = "i" + (i + 1) + "j" + (j + 1);
            node.appendChild(subNode);
        } // for

        gridContainer.appendChild(row);

    } // for init gridsss

    // // making the lines
    // var subn = document.getElementsByClassName('sub');
    // console.log(subn.length);
    // for(let j = i + 1; j < subn.length; j++){
    //     var line = document.createElement('div');
    //     line.className = "line";
    //     line.id = "l" + "i" + (i + 1) + "j" + (j + 1);
    //     console.log(line.id);
    //     gridContainer.appendChild(line);
    //     let x1 = subn[i].offsetLeft + subn[i].offsetWidth / 2;
    //     let y1 = subn[i].offsetTop + subn[i].offsetHeight / 2;
    //     let x2 = subn[j].offsetLeft + subn[j].offsetWidth / 2;
    //     let y2 = subn[j].offsetTop + subn[j].offsetHeight / 2;
    //     createLine(x1, y1, x2, y2, line.id);
    // }


    getNodes();
    getAlgo();
    getStart();
}

// we define global vars
let cities = [];

function getNodes(){
    var nodes = document.getElementsByClassName('sub');
    for(let i = 0; i < nodes.length; i++){
        nodes[i].addEventListener("click", initFunction);
    }
}
function getAlgo(){
    var algos = document.getElementsByClassName('algo');
    for(let i = 0; i < algos.length; i++){
        algos[i].addEventListener("click", chooseMode);
    }
}
function getStart(){
    var startBtn = document.getElementById('startVisualizer');
    startBtn.addEventListener("click", visualize);
}

// helper functions
function getI(str){
    let retVal = 0;
    if(str[2] == 'j'){
        retVal = parseInt(str[1]);
        return retVal;
    }
    retVal = parseInt(str.slice(1,3));
    return retVal;
}
function getJ(str){
    let retVal = 0;
    if(str[2] == 'j'){
        retVal = parseInt(str.slice(3));
        return retVal;
    }
    retVal = parseInt(str.slice(4));
    return retVal;
}
    

// add the god damn event listeners (get all the nodes for city calculation)
function initFunction(event){
    var curE = document.getElementById(event.target.id);

    if(curE.style.backgroundColor != "red"){
        curE["active"] = true;
        curE.style.backgroundColor = "red";
        cities.push({x: getI(curE.id), y: getJ(curE.id)});
    }
    else{
        curE["active"] = false;
        curE.style.backgroundColor = "rgb(250, 235, 215)";
        const ind = cities.findIndex(city => city.x == getI(curE.id) && city.y == getJ(curE.id));
        cities.splice(ind, 1);
    }

    // test: 
    console.log(cities);
}

// create the function that controls everything of global vars
function chooseMode(event){
    var curE = document.getElementById(event.target.id);
    mode = curE.id;
    // test:
    console.log(mode);
    return;
}


/////////////
/////////////
/////////////
/////////////
/**
 * 
 * draw line functions.........
 * draw line functions.........
 * 
 */
/////////////
/////////////
/////////////
/////////////
/////////////
// function createLine(x1, y1, x2, y2, lineID) {
//     let distance = Math.sqrt((x1-x2)*(x1-x2)+(x1-x2)*(x1-x2));
//     let xMid = (x1+x2)/2;
//     let yMid = (y1+y2)/2;
//     let slopeRad = Math.atan2(y1-y2, x1-x2);
//     let slopeDeg = slopeRad*180 / Math.PI;
//     console.log(lineID);
//     // change the fking CSS of the line
//     let line = document.getElementById(lineID);
//     console.log(line);
//     line.style.width = distance;
//     line.style.height = "2px";
//     line.style.top = yMid;
//     line.style.left = xMid - (distance/2);
//     line.style.color = "black";
//     line.style.transform = "rotate("+slopeDeg+"deg)";
// }
 



/*
*
*
*
*
*
*
The Calculations (AKA visuzliers themselves) this is the part where I calculate all the visuazliers (this code is shit I know)
********************************
***********
***********
***********
***********
********************************
*/

function visualize(event){
    
    // tobedeleted
    if(mode == "startMST"){
        mstM(); 
    }
}

// distance function between two nodes
function distance(pointA, pointB){
    let xDist = pointB.x - pointA.x;
    let yDist = pointB.y - pointA.y;
    let dist = Math.sqrt(xDist * xDist + yDist * yDist);
    return dist;
}

//global object for prims
let prims = [];

function initPrimsMST(){
    prims = [];
    prims.push({kV: false, dV: 0, pV: -1});
    for(let i = 1; i < cities.length; i++){
        prims.push({kV: false, dV: Infinity, pV: -1});
    }
}

// MST mode
function mstM(){
    initPrimsMST();
    let current = 0;

    // perform prims calculation
    for(let loop = 0; loop < prims.length; loop++){
        let pass = false;
        for(let i = 0; i < prims.length; i++){
            if(prims[i].kV == true) continue;
            if(!pass){
                current = i;
                pass = true;
            }
            if(prims[i].dV < prims[current].dV){
                current = i;
            }
        }
        prims[current].kV = true;
        for(let i = 0; i < prims.length; i++){
            if(prims[i].kV == false){
                let d = distance(cities[current], cities[i]);
                if(prims[i].dV > d){
                    prims[i].pV = current;
                    prims[i].dV = d;
                }
            }
        }
        
        // // for testing purposes only
        // for(let i = 1; i < prims.length; i++){
        //     if(i < prims[i].pV){
        //         console.log(i, " ", prims[i].pV);
        //     }
        //     else if(i > prims[i].pV){
        //         console.log(prims[i].pV, " ", i);
        //     }
        //     else{
        //         console.log("smthg is wrong");
        //     }
        // }
    }
}

