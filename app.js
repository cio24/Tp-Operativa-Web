"use strict";


    //getting all inputs elements
    const inputCities = document.querySelector("#cities");
    const inputAnts = document.querySelector("#ants");
    const inputIterations = document.querySelector("#iterations");
    const inputAlpha = document.querySelector("#alpha");
    const inputBeta = document.querySelector("#beta");


    //################################################################################
    // mostrar y ocultar el espacio que ocupa el div del grafo cuando se usan los tabs
    const showGraphBtn = document.querySelector("#show-graph").addEventListener("click", () => {
        document.querySelector("#graph-container").classList.add("show-hide");
    });

    const loadGraphBtn = document.querySelector("#load-graph").addEventListener("click", () => {
        document.querySelector("#graph-container").classList.remove("show-hide");
    });
    // mostrar y ocultar el espacio que ocupa el div del grafo cuando se usan los tabs
    //################################################################################
    
    //tables to be displayed
    const matrixView = document.querySelector("#distances");
    //const arrayPopulationView = document.querySelector("#populations");
    const arrayCitiesNameView = document.querySelector("#citiesNames");

    //show the array and matrix using the default cities value (5)
    showArrayAndMatrix();

    //reload array and matrix whenever the input cities values changes
    inputCities.addEventListener("change", () =>{ showArrayAndMatrix(); });

    
    //let distancesGraph = new Graph(inputCities.value);
    //let pheromoneGraph = new Graph(inputCities.value);

    function loadGraphs(){
        for(let i = 0; i < matrixView.rows.length; i++)
            for(let j = 0; j < matrixView.rows.length; j++){
                distancesGraph.addEdge(i,j,matrixView.rows.item(i).cells.item(j).children[0].value);
                pheromoneGraph.addEdge(i,j,inputAlpha.value);
            }
    }

    let graphContainer = document.querySelector("graph-container");
    
    

    let matrixa=[ [ undefined,49.0,185.0,undefined,undefined,95.7,undefined,undefined,undefined,undefined,undefined,88.6,53.8,undefined,66.7,undefined,167.0,66.5,undefined,undefined ],[ 49.0,undefined,undefined,undefined,undefined,49,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,37.0,undefined,undefined ],[ 185.0,undefined,undefined,47.5,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ undefined,undefined,47.5,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,56.1,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,75.4,undefined,undefined,62.1,undefined,undefined,undefined,40.4,undefined ],[ 95.7,49.0,undefined,undefined,undefined,undefined,undefined,undefined,undefined,42.1,undefined,undefined,undefined,undefined,undefined,65.9,undefined,72.9,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,29.7,46.9,undefined,72.7,83.9,84.1,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,88.6,38.3,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,51.1,85.3,undefined,undefined,undefined,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,42.1,undefined,88.6,undefined,undefined,undefined,undefined,undefined,undefined,undefined,79.2,undefined,undefined,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,undefined,undefined,38.3,undefined,undefined,undefined,62.1,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ 88.6,undefined,undefined,56.1,75.4,undefined,undefined,undefined,undefined,undefined,62.1,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ 53.8,undefined,undefined,undefined,undefined,undefined,29.7,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,72.7,undefined,84,undefined,undefined ],[ undefined,undefined,undefined,undefined,undefined,undefined,46.9,undefined,51.1,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ 66.7,undefined,undefined,undefined,62.1,undefined,undefined,undefined,85.3,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,52.5 ],[ undefined,undefined,undefined,undefined,undefined,65.9,72.7,undefined,undefined,79.2,undefined,undefined,72.7,undefined,undefined,undefined,undefined,39.5,undefined,undefined ],[ 167.0,undefined,undefined,undefined,undefined,undefined,83.9,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined ],[ 66.5,37,undefined,undefined,undefined,72.9,84.1,undefined,undefined,undefined,undefined,undefined,84,undefined,undefined,39.5,undefined,undefined,undefined,undefined ],[ undefined,undefined,undefined,undefined,40.4,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,30.2 ],[ undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,52.5,undefined,undefined,undefined,30.2,undefined ]];
    let popA = [33442 ,4777 ,36494 ,15760 ,5178 ,4450 ,3995 ,12122 ,57669 ,2845 ,8645 ,31533 ,5115 ,3714 ,11685 ,7617 ,124101 ,8061 ,3201 ,21874];
    let names = ["Trenque Lauquen","30 de agosto","9 de Julio","Carlos Casares","Carlos Tejedor","Casbas","Catrilo","Daireaux","General pico","Guamini","Henderson","Pehuajo","Pellegrini","Quemu Quemu","Rivadavia","Saliquelo","Santa Rosa","Tres lomas","Tres algarrobo","Villegas"]

    
    loadExample();
    
    

    function showArrayAndMatrix(){

        //delete previous tables
        matrixView.innerHTML="";
        //arrayPopulationView.innerHTML="";
        arrayCitiesNameView.innerHTML="";
    

        //check wheter values are valid or not
        if(parseInt(inputCities.value) < parseInt(inputCities.min) || parseInt(inputCities.value) > parseInt(inputCities.max)){
            console.log("value " + inputCities.value);
            console.log("min " + inputCities.min);
            alert("value not between the min/max required");
            inputCities.value = inputCities.min;
        }

        //shows the array and the matrix
        appendRowCitiesName();
        //appendRowPopulation();
        for(let i = 0; i <inputCities.value; i++){
            appendRowDistances();
        }
    }

    

    function appendRowCitiesName() {
        let rowName = arrayCitiesNameView.insertRow(arrayCitiesNameView.rows.length);
        let rowPop = arrayCitiesNameView.insertRow(arrayCitiesNameView.rows.length);
        for (let j = 0; j < inputCities.value; j++){
            rowName.insertCell(j).appendChild(createInput("text","City #" + j));
            rowPop.insertCell(j).appendChild(createInput("number",1));
        }
    }

    /*
    function appendRowPopulation() {
        let row = arrayPopulationView.insertRow(arrayPopulationView.rows.length);
        for (let j = 0; j < inputCities.value; j++) 
            row.insertCell(j).appendChild(createInput("number",1));
    }
    */

    function appendRowDistances() {
        let row = matrixView.insertRow(matrixView.rows.length);
        for (let j = 0; j < inputCities.value; j++) 
            row.insertCell(j).appendChild(createInput("number"));
    }
    
    function createInput(typeValue,defaultValue){
        let input = document.createElement("input");
        input.setAttribute("class","matrixCell");
        input.setAttribute("type", typeValue);
        input.setAttribute("value",defaultValue);
        return input;
    }

    function loadExample(){
        for(let i = 0; i < inputCities.value; i++){
            for(let j = 0; j < inputCities.value; j++){
                matrixView.rows.item(i).cells.item(j).children[0].value = matrixa[i][j];
            }
            arrayCitiesNameView.rows.item(1).cells.item(i).children[0].value = popA[i];
            arrayCitiesNameView.rows.item(0).cells.item(i).children[0].value = names[i];
            //arrayCitiesNameView.rows.item(0).cells.item(i).children[0].value = names[i];
        }
    }
    

    function getMatrixValue(i,j){
        return matrixView.rows.item(i).cells.item(j).children[0].value;
    }

    function getCityName(i){
        return arrayCitiesNameView.rows.item(0).cells.item(i).children[0].value;
    }

    function getCityPopulation(i){
        return arrayCitiesNameView.rows.item(1).cells.item(i).children[0].value;
    }
    

    //##################################################################################################################################################################
    //##################################################################################################################################################################
    // CONFIGURACIONES DE SIGMA

    

