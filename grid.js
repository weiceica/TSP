// the "main"
//------------------------------------------------------------------------

function initGrid(){
    // grid container
    var gridContainer = document.getElementById("gridContainer");
    var can = document.getElementById('c');
    can.width = gridContainer.getBoundingClientRect().width;

    can.height = 1200;
    for(var i = 0; i < 14; ++i){
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
    getClear();
    getRand();
}

// we define global vars
let cities = [];

// define nav bars
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
function getClear(){
    var clearBtn = document.getElementById('startClearNodes');
    clearBtn.addEventListener("click", clear);
}
function getRand(){
    var ran20 = document.getElementById('startRandom20');
    var ran15 = document.getElementById('startRandom1');
    var ran5 = document.getElementById('startSquare4');
    var ran3 = document.getElementById('startTriangle3');

    ran20.addEventListener("click", ranGen);
    ran15.addEventListener("click", ranGen);
    ran5.addEventListener("click", ranGen);
    ran3.addEventListener("click", ranGen);
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
function getActiveNodes(){
    let subN = document.getElementsByClassName("sub");
    let count = 0;
    for(let i = 0; i < subN.length; ++i){
        if(subN[i]["active"] == true){
            count ++;
        }
    }
    return count;
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

// helper ranNum generator
function randomNum(min, max, s) { 
    var n = []; 
    for(var i=0;i<s;i++){ 
        n.push(Math.floor(Math.random() * max) + min); 
    } 
    return n; 
} 

// function for ran gen
function ranGen(event){
    var subN = document.getElementsByClassName("sub");
    var curE = document.getElementById(event.target.id);
    clear();
    erase();
    if(curE.id == "startRandom20"){
        let l = randomNum(0, 279, 40);
        for(let i = 0; i < 40; i++){
            subN[l[i]]["active"] = true;
            subN[l[i]].style.backgroundColor = "red";
            cities.push({x: getI(subN[l[i]].id), y: getJ(subN[l[i]].id), id: subN[l[i]].id});
        }
    }
    if(curE.id == "startRandom1"){
        let l = randomNum(0, 279, 15);
        for(let i = 0; i < 15; i++){
            subN[l[i]]["active"] = true;
            subN[l[i]].style.backgroundColor = "red";
            cities.push({x: getI(subN[l[i]].id), y: getJ(subN[l[i]].id), id: subN[l[i]].id});
        }
    }
    else if(curE.id == "startSquare4"){
        subN[266]["active"] = true;
        subN[266].style.backgroundColor = "red";
        cities.push({x: getI(subN[266].id), y: getJ(subN[266].id), id: subN[266].id});

        subN[273]["active"] = true;
        subN[273].style.backgroundColor = "red";
        cities.push({x: getI(subN[273].id), y: getJ(subN[273].id), id: subN[273].id});

        subN[6]["active"] = true;
        subN[6].style.backgroundColor = "red";
        cities.push({x: getI(subN[6].id), y: getJ(subN[6].id), id: subN[6].id});

        subN[13]["active"] = true;
        subN[13].style.backgroundColor = "red";
        cities.push({x: getI(subN[13].id), y: getJ(subN[13].id), id: subN[13].id});
    }
    else{
        subN[9]["active"] = true;
        subN[9].style.backgroundColor = "red";
        cities.push({x: getI(subN[9].id), y: getJ(subN[9].id), id: subN[9].id});

        subN[265]["active"] = true;
        subN[265].style.backgroundColor = "red";
        cities.push({x: getI(subN[265].id), y: getJ(subN[265].id), id: subN[265].id});

        subN[273]["active"] = true;
        subN[273].style.backgroundColor = "red";
        cities.push({x: getI(subN[273].id), y: getJ(subN[273].id), id: subN[273].id});
    }
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

    // get node1 and node2 coordinates
    var n1 = document.getElementById(node1ID);
    var n2 = document.getElementById(node2ID);

    let n1x = n1.getBoundingClientRect().left + n1.offsetWidth/2;
    let n1y = n1.getBoundingClientRect().top + n1.offsetHeight/2 - 195;
    let n2x = n2.getBoundingClientRect().left + n2.offsetWidth/2;
    let n2y = n2.getBoundingClientRect().top + n2.offsetHeight/2 - 195;
    ctx.beginPath();
    ctx.moveTo(n1x, n1y);
    ctx.lineTo(n2x, n2y);
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
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
    var ctx = can.getContext("2d");
    can.style.zIndex = -1;
    ctx.clearRect(0, 0, can.width, can.height);
}
function clear(){
    erase();
    let subN = document.getElementsByClassName('sub');
    for(let i = 0; i < subN.length; ++i){
        subN[i]["active"] = false;
        subN[i].style.backgroundColor = "rgb(250, 235, 215)";
        const ind = cities.findIndex(city => city.x == getI(subN[i].id) && city.y == getJ(subN[i].id));
        cities.splice(ind, 1);
    }   
}

function visualize(event){
    erase();
    if(getActiveNodes() < 2){
        return;
    }
    // tobedeleted
    if(mode == "startMST"){
        mstM(); 
    }
    else if(mode == "startNearestInsertion"){
        nIM();
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
let ni = [];

function initPrimsMST(){
    prims = [];
    prims.push({kV: false, dV: 0, pV: -1});
    for(let i = 1; i < cities.length; i++){
        prims.push({kV: false, dV: Infinity, pV: -1});
    }
}
function initNi(){
    ni = [];
    for(let i = 0; i < cities.length; i++){
        ni.push({elim: false, next:-1});
    }
    ni[0].elim = true;
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
    }
}

let lvv = 0;
function nIM(){
    initNi();
    let current = 0;
    let curDist = 100000;
    let totalDist = 0;
    let curNextNode = 0;

    for(let i = 1; i < ni.length; i++){
        curDist = 100000;
        for(let j = 0; j < ni.length; j++){
            if(j == current || ni[j].elim == true){
                continue;
            }
            let d = distance(cities[j], cities[current]);
            if(d < curDist){
                curDist = d;
                curNextNode = j;
            }
        }
        ni[current].next = curNextNode;
        ni[current].elim = true;
        current = curNextNode;
        totalDist += Math.sqrt(curDist);
    }

    let d = distance(cities[0], cities[current]);
    totalDist += Math.sqrt(d);
    ni[current].next = 0;

    let yin = 0;
    let yinB = ni[yin].next;
    let yA = cities[0].id;
    let yB = cities[yinB].id;
    drawLine(yA, yB, "c");
    console.log(ni);
    console.log(ni.length);
    for(let i = 1; i < ni.length; i++){
        let idA = cities[ni[yin].next].id;
        let idB = cities[yin].id;
        yin = ni[yin].next;
        drawLine(idA, idB, "c");
    }
    drawLine(cities[yin].id, cities[0].id, "c");
    lvv = totalDist
}

// doing two opt on nearest insertion algorithm
let path = []
function TwoOpt(){
    nIM();
    path.push(0);
    let cur = 0;
    for(let i = 1; i < ni.length; ++i){
        path.push(ni[cur].next);
        cur = ni[cur].next;
    }
    ni.clear();

    // twoOpt
    for(let i = 0; i < cities.length * 2; ++i){
        for(let j = 1; j < cities.length; ++j){
            for(let k = j + 1; k < cities.length - 1; ++k){
                let curDistance = distance(cities[path[j-1]], cities[path[k]]);
                curDistance += distance(cities[path[j]], cities[path[k + 1]]);
                let newDistance = distance(cities[path[k]], cities[path[k + 1]]);
                newDistance += distance(points[path[k]], points[path[k+1]]);
                if(curDistance < newDistance){
                    let temp = path[j];
                    path[j] = path[k];
                    path[k] = temp;
                }
            }
        }
    }

    let totalDist = 0;
    for(let i = 0; i < cities.length - 1; ++i){
        totalDist += sqrt(distance(cities[path[i]], cities[path[i+1]]));
    }
    totalDist += sqrt(distance(cities[path[cities.length-1]], cities[path[0]]));
    lvv = totalDist
}

let curLength = 0;
let bestLength = 0;
let bestPath = [];
function promising(permLength){

}

function genPerms(){
    let permLength = 1;
    if(permLength == path.size()){
        curLength += sqrt(distance(cities[0], cities[path[permLength-1]]));
        if(curLength < bestLength){
            bestPath = path;
            bestLength = curLength;
        }
        curLength -= sqrt(distance(cities[0], cities[path[permLength-1]]));
        return;
    }
}
