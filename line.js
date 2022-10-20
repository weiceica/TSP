export function drawLine(node1ID,node2ID,canVasID){
    var c = document.getElementById(canVasID);
    // var ctx = c.getContext("2d");

    // get node1 and node2 coordinates
    var n1 = document.getElementById(node1ID);
    // var n2 = document.getElementById(node2ID);

    let n1x = n1.getBoundingClientRect().left + n1.offsetWidth/2;
    let n1y = n1.getBoundingClientRect().top + n1.offsetHeight/2;
    console.log(n1x);
    console.log(n1y);
    console.log(node2ID);
}