// the "main"
//------------------------------------------------------------------------

function initGrid(){
    // grid container
    var gridContainer = document.getElementById("gridContainer");
    var can = document.getElementById('c');
    can.width = gridContainer.getBoundingClientRect().width;
    console.log(gridContainer.getBoundingClientRect().height);
    can.height = 658.4;
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

   
    getNodes();
    getAlgo();
    getStart();
    getReStart();
    
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
function getReStart(){
    var startBtn = document.getElementById('startEraseNodes');
    startBtn.addEventListener("click", erase);
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
        cities.push({x: getI(curE.id), y: getJ(curE.id), id: curE.id});
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
function drawLine(node1ID,node2ID,canVasID){
    var c = document.getElementById(canVasID);
    var ctx = c.getContext("2d");
    c.style.zIndex = 1;
    console.log(c.height);

    // get node1 and node2 coordinates
    var n1 = document.getElementById(node1ID);
    var n2 = document.getElementById(node2ID);

    let n1x = n1.getBoundingClientRect().left + n1.offsetWidth/2;
    let n1y = n1.getBoundingClientRect().top + n1.offsetHeight/2 - 195;
    let n2x = n2.getBoundingClientRect().left + n2.offsetWidth/2;
    let n2y = n2.getBoundingClientRect().top + n2.offsetHeight/2 - 195;
    console.log(n1y);
    console.log(n2x);
    console.log(n2y);
    ctx.beginPath();
    ctx.moveTo(n1x, n1y);
    ctx.lineTo(n2x, n2y);
    ctx.stroke();
    ctx.closePath();
}


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
function erase(){
var can = document.getElementById('c');
    can.style.zIndex = -1;
}

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
    }

    console.log(prims.length);
    // for testing purposes only
    for(let i = 1; i < prims.length; i++){
        let idA = cities[i].id;
        let idB = cities[prims[i].pV].id;
        drawLine(idA, idB, "c");
        // if(i < prims[i].pV){
        //     console.log(i, " ", prims[i].pV);
        // }
        // else if(i > prims[i].pV){
        //     console.log(prims[i].pV, " ", i);
        // }
        // else{
        //     console.log("smthg is wrong");
        // }
    }


}

