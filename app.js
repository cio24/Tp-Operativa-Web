"uses strict";

var g;

let table = document.getElementById('adjacency-matrix'); // table reference
let population = document.getElementById('population-array');

let add = document.getElementById("add");
let del = document.getElementById("del");
let load = document.getElementById("load");

  
var matrix = [];
var pop = [];

let id= 0;
  
  
add.addEventListener("click", function(){
    addDimension();
  
  });

del.addEventListener("click", function(){
    delDimension();
  });
  
load.addEventListener("click", function(){
		loadMatrix();
});


appendRowArray();
appendColumnArray();
   

matrix.push(new Array());

appendRow();
  appendColumn();

for(let i=0; i<2; i++)
  addDimension();

del.disabled = true; 
  

// create DIV element and append to the table cell
function createCell(cell,i,j) {
    let input = document.createElement("input");
    input.addEventListener("change",function(){
        writeMatrix(i,j,input);
    });
    input.classList.add("input");
    input.setAttribute("type", "number");
    //console.log("Se creo la celda: " + "(" + i +","+ j +")");
    cell.appendChild(input);                 // append DIV to the table cell
}

function createCellArray(cell,i) {
    let input = document.createElement("input");
    input.addEventListener("change",function(){
        writeArray(i,input);
    });
    input.classList.add("input");
    input.setAttribute("type", "number");
    cell.appendChild(input);                 // append DIV to the table cell
}



// append row to the HTML table
function appendRow() {
        row = table.insertRow(table.rows.length);
    for (let j = 0; j < table.rows[0].cells.length; j++) {
        createCell(row.insertCell(j),table.rows.length-1,j);
    }
}

// append column to the HTML table
function appendColumn() {
    for (let i = 0; i < table.rows.length; i++) {
        createCell(table.rows[i].insertCell(table.rows[i].cells.length), i,table.rows.length-1);
    }
}

function appendRowArray() {
    row = population.insertRow(population.rows.length);
    for (let j = 0; j < population.rows[0].cells.length; j++) {
        createCellArray(row.insertCell(j),population.rows.length -1);
    }
}

function appendColumnArray() {
    for (let i = 0; i < population.rows.length; i++) {
        createCellArray(population.rows[i].insertCell(population.rows[i].cells.length), i);
    }
}


// delet77e table rows with index greater then 0
function deleteRow(table) {
    lastRow = table.rows.length - 1;
    table.deleteRow(lastRow);
}
 
// delete table columns with index greater then 0
function deleteColumn(table) {
    lastCol = table.rows[0].cells.length - 1,    // set the last column index
    lastRow = table.rows.length - 1;
    for(let i = lastRow; i >= 0; i--) {
        table.rows[i].deleteCell(lastCol);
    }
}

function addDimension(){
    if(table.rows.length <= 20){
        appendRow();
        appendColumn();
        appendRowArray();
        matrix.push(new Array());
        del.disabled = false;
    }
    if(table.rows.length >= 20){
        add.disabled = true;
    }

}

function delDimension(){
    if(table.rows.length > 3){
        deleteRow(table);
        deleteRow(population);
        deleteColumn(table);
        add.disabled = false;
        matrix.pop();
        pop.pop();
      	for(let i=0;i<matrix.lenght;i++)
          matrix[i].pop();
    }
    if(table.rows.length <= 3){
        del.disabled = true;
    }
}
  
function loadMatrix(){
    console.log(matrix);
    console.log(pop);
    g=new Graph(20);
    p=new Graph(20);
    let matrixa=[ [ undefined,49.0,185.0,undefined,undefined,95.7,undefined,undefined,undefined,undefined,undefined,88.6,53.8,undefined,66.7,undefined,167.0,66.5,undefined,undefined ],[ 49.0,undefined,undefined,undefined,undefined,49,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,37.0,undefined,undefined ],[ 185.0,undefined,undefined,47.5,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ undefined,undefined,47.5,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,56.1,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,75.4,undefined,undefined,62.1,undefined,undefined,undefined,40.4,undefined ],[ 95.7,49.0,undefined,undefined,undefined,undefined,undefined,undefined,undefined,42.1,undefined,undefined,undefined,undefined,undefined,65.9,undefined,72.9,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,29.7,46.9,undefined,72.7,83.9,84.1,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,88.6,38.3,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,51.1,85.3,undefined,undefined,undefined,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,42.1,undefined,88.6,undefined,undefined,undefined,undefined,undefined,undefined,undefined,79.2,undefined,undefined,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,undefined,undefined,38.3,undefined,undefined,undefined,62.1,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ 88.6,undefined,undefined,56.1,75.4,undefined,undefined,undefined,undefined,undefined,62.1,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ 53.8,undefined,undefined,undefined,undefined,undefined,29.7,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,72.7,undefined,84,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,undefined,46.9,undefined,51.1,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ 66.7,undefined,undefined,undefined,62.1,undefined,undefined,undefined,85.3,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,52.5 ],[ undefined,undefined,undefined,undefined,undefined,65.9,72.7,undefined,undefined,79.2,undefined,undefined,72.7,undefined,undefined,undefined,undefined,39.5,undefined,undefined ],[ 167.0,undefined,undefined,undefined,undefined,undefined,83.9,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ 66.5,37,undefined,undefined,undefined,72.9,84.1,undefined,undefined,undefined,undefined,undefined,84,undefined,undefined,39.5,undefined,undefined,undefined,undefined ],[ undefined,undefined,undefined,undefined,40.4,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,30.2 ],[ undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,52.5,undefined,undefined,undefined,30.2,undefined ]];
    let popA = [33442 ,4777 ,36494 ,15760 ,5178 ,4450 ,3995 ,12122 ,57669 ,2845 ,8645 ,31533 ,5115 ,3714 ,11685 ,7617 ,124101 ,8061 ,3201 ,21874];
    console.log(matrix);
    for(let i=0;i<g.getNumberOfVertex();i++){
        for(let j=0;j<g.getNumberOfVertex();j++){
            p.addEdge(i,j,0.1);
            if(typeof(matrixa[i][j]) != 'undefined')
                g.addEdge(i,j,matrixa[i][j]);
            else
                console.log("Se quiso agregar en ("+i+","+j+") un undefined");
        }
    }
    console.log(g);
    let solver = new TSPSolver(g,p,popA,1.0,1.0,0.6,10,5,0,6);
    let solution = solver.solve();
    console.log(solution);
}

function writeMatrix(i,j,input){
    matrix[i][j] = input.value;
    console.log("(" + i +","+ j +") : " + input.value);
}

function writeArray(i,input){
    pop[i] = input.value;
}