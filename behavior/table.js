"use strict"

let matrixa = [];
let popA = [];
let names = [];

let distances = document.querySelector("#distances");
let population = document.querySelector("#population");
let cities = document.querySelector("#input-cities");
let add = document.querySelector("#add");
let del = document.querySelector("#del");

/*
    guardo el valor viejo del input para que cuando pongan un valor que no este entre el min y el max
    lo pueda dejar en el valor donde estaba antes
*/
let oldValue = cities.value;


add.addEventListener("click", () => {
    if(++cities.value == cities.max){
        add.disabled = true;
    }
    del.disabled = false;
    addRowPop("City #?");
    addDimensionDis();
});

del.addEventListener("click", () => {
    if(--cities.value == cities.min){
        del.disabled = true;
    }
    add.disabled = false;
    delDimensionDis();
    delRowPop();
});

cities.addEventListener("change", () =>{

    if(cities.value >= cities.min && cities.value <= cities.max){

        newPopTable(cities.value);
        newDistancesTable(cities.value);
        onOffButtons();
    }
    else
        cities.value = oldValue;

});

function onOffButtons(){
    if(cities.value == cities.min){
        del.disabled = true;
        add.disabled = false;
    }
    else if(cities.value == cities.max){
        add.disabled = true;
        del.disabled = false;
    }
    else{
        if(oldValue == cities.min)
            del.disabled = false;
        if(oldValue == cities.max)
            add.disbled = false;
    }
    oldValue = cities.value;
}

function addRowPop(name,pop){

    let row = population.insertRow(population.rows.length);
    row.insertCell(0).appendChild(createInput("text",name));
    row.insertCell(1).appendChild(createInput("number",pop));
}

function delRowPop(){
    population.deleteRow(population.rows.length -1);
}

function newPopTable(cities){

    for(let i = population.rows.length -1; i > 0; i--)
        delRowPop();

    for(let i= 0; i< cities; i++){
        addRowPop("City #" + i);
    }
}

function newDistancesTable(cities){

    for(let i = distances.rows.length -1; i> 0; i--)
        delDimensionDis();

    for(let i = 0; i < cities; i++)
        addDimensionDis();
}

function addDimensionDis(){
    //agrego una fila a la matriz
    let row = distances.insertRow(distances.rows.length);


    //luego le agrego tantas celdas como celdas tenga la primer fila ( la fila 0 es la del titulo)
    let rows = distances.rows[1].cells.length;
    for (let j = 0; j < rows; j++) 
    row.insertCell(j).appendChild(createInput("number",10));
        //row.insertCell(j).appendChild(createInput("number"));

    //ahora a todas las filas le agrego una celda más xD
    for(let i = 1; i < distances.rows.length; i++)
        distances.rows[i].insertCell(rows).appendChild(createInput("number",10));
}

function delDimensionDis(){

    //elimino la última fila
    distances.deleteRow(distances.rows.length-1);

    //elimino la última celda de cada fila
    for(let i = 1; i < distances.rows.length; i++)
        distances.rows[i].deleteCell(distances.rows[i].cells.length -1);
}

function createInput(typeValue,defaultValue){
    let input = document.createElement("input");
    input.setAttribute("class","matrixCell");
    input.setAttribute("type", typeValue);
    input.setAttribute("value",defaultValue);
    return input;
}

function loadExample(){

    newPopTable(popA.length);
    newDistancesTable(popA.length);
    for(let i = 0; i < popA.length; i++){
        for(let j = 0; j < popA.length; j++){
            distances.rows[i+1].cells[j].children[0].value = matrixa[i][j];
        }
        population.rows.item(i+1).cells.item(0).children[0].value = names[i];
        population.rows[i+1].cells[1].children[0].value = popA[i];
    }
    population.rows[20].cells[1].children[0].value = 21874;
    inputCities.value = popA.length;
    onOffButtons();
    addNodes();
    addEdges();
    circle();
    
}

function mainTable(){
    add.disabled = true;
    readTextFile("dataExample.csv");
}

mainTable();



//######################################################################################################
//######################################## START APP MODAL CODE  #######################################

const divupload=document.querySelector("#div-upload");
var fileInput = document.getElementById("file_upload");

let inputHandler = function () {

  /*
    var reader = new FileReader();
    reader.onload = function () {
      document.getElementById('out').innerHTML = reader.result;
    };

    */

    loadCSV(fileInput.files[0]);
    
};

fileInput.addEventListener("change",inputHandler);

function dragOverHandler(ev) {
console.log('File(s) in drop zone'); 

// Prevent default behavior (Prevent file from being opened)
ev.preventDefault();
}

function removeDragData(ev) {
console.log('Removing drag data')

if (ev.dataTransfer.items) {
  // Use DataTransferItemList interface to remove the drag data
  ev.dataTransfer.items.clear();
} else {
  // Use DataTransfer interface to remove the drag data
  ev.dataTransfer.clearData();
}
}

function dropHandler(ev) {
      console.log('File(s) dropped');

// Prevent default behavior (Prevent file from being opened)
ev.preventDefault();

if (ev.dataTransfer.items) {
  // Use DataTransferItemList interface to access the file(s)
  for (var i = 0; i < ev.dataTransfer.items.length; i++) {
    // If dropped items aren't files, reject them
    if (ev.dataTransfer.items[i].kind === 'file') {
      var file = ev.dataTransfer.items[i].getAsFile();

      console.log('... file[' + i + '].name = ' + file.name);

      loadCSV(file);
    }
  }
} else {
  // Use DataTransfer interface to access the file(s)
  for (var i = 0; i < ev.dataTransfer.files.length; i++) {
    console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
  }
} 

// Pass event to removeDragData for cleanup
removeDragData(ev);
}

function dragOverHandler(ev) {

// Prevent default behavior (Prevent file from being opened)
ev.preventDefault();
}

function removeDragData(ev) {
if (ev.dataTransfer.items) {
  // Use DataTransferItemList interface to remove the drag data
  ev.dataTransfer.items.clear();
} else {
  // Use DataTransfer interface to remove the drag data
  ev.dataTransfer.clearData();
}

}

function loadCSV(file) {

    const reader = new FileReader();

    reader.onloadend = function () {
        loadData(reader.result);  
    };

    //start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(file);

    let filename = document.querySelector("#filename");
    if(filename == undefined){
        filename = document.createElement("h6");
        filename.setAttribute("id","filename");
        filename.style.marginTop="40px";
        filename.style.fontSize="32px";
        filename.style.fontWeight="bold";
        divupload.appendChild(filename);
    }
    filename.innerHTML=file.name;
}

function loadData(csv){
    let arrData = csv.split("\n");
    names = arrData[0].split(",");
    //console.log("names");
    //console.table(names);
    //console.log("population");
    popA = arrData[1].split(",");

    //console.table(popA);
    let rowsDistances = [];
    for(let i = 2; i < arrData.length; i++){
        rowsDistances.push(arrData[i]);
    }
    let row = [];
    for(let i = 0; i < rowsDistances.length; i++){
        console.log("LA ROW ANTES DE LA LIMPIEZA");
        row = rowsDistances[i].split(",");
        console.log(row);
        for(let it = 0; it < row.length; it++){
            if(row[it] == -1.0)
                row[it] = undefined;
        }
        console.log("LA ROW DESPUES DE LA LIMPIEZAAA")
        console.log(row);
        matrixa.push(row);
    }
    loadExample();
}

//######################################## END APP MODAL CODE  #########################################
//######################################################################################################


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                loadData(allText);
            }
        }
    }
    rawFile.send(null);
}