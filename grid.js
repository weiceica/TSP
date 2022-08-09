
function initGrid(){
    // grid container
    var gridContainer = document.getElementById("gridContainer");

    for(var i = 0; i < 8; ++i){
        var row = document.createElement('div');
        row.className = "rowClass"
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
            subNode.id = "subID" + (i + 1) + (j + 1);
            node.appendChild(subNode);
        } // for

        gridContainer.appendChild(row);
    } // for init gridsss

    // make the buttons
}

function clicked(elementID){
    var subNode = document.getElementById(elementID);
    if(subNode.style.backgroundColor == "rgb(250, 235, 215)"){
        subNode["active"] = true;
        subNode.style.backgroundColor = "rgb(255, 0, 0)";
    }
    else{
        subNode["active"] = false;
        subNode.style.backgroundColor = "rgb(250, 235, 215)";
    }
}

class NodeCalculator{
    constructor(){
        this.numNodes = 0;
        this.point = {
            xVal: 0,
            yVal: 0
        }
        this.points = [];
        this.city = {
            elim: false,
            next: -1
        }
        this.cities = [];

        // just ignore this piece of shit code
        {
            this.button11 = false; this.button12 = false; this.button13 = false; this.button14 = false; 
            this.button15 = false; this.button16 = false; this.button17 = false; this.button18 = false;
            this.button21 = false; this.button22 = false; this.button23 = false; this.button24 = false; 
            this.button25 = false; this.button26 = false; this.button27 = false; this.button28 = false;
            this.button31 = false; this.button32 = false; this.button33 = false; this.button34 = false; 
            this.button35 = false; this.button36 = false; this.button37 = false; this.button38 = false;
        }
    }


}