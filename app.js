"uses strict";

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
    if(table.rows.length >= 10){
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
  
}

function writeMatrix(i,j,input){
    matrix[i][j] = input.value;
    console.log("(" + i +","+ j +") : " + input.value);
}

function writeArray(i,input){
    pop[i] = input.value;
}