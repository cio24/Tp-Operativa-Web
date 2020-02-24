"use strict";

//getting all inputs elements
const inputCities = document.querySelector("#input-cities");
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
//const distances = document.querySelector("#distances");
//const arrayPopulationView = document.querySelector("#populations");
//const population = document.querySelector("#population");



//let distancesGraph = new Graph(inputCities.value);
//let pheromoneGraph = new Graph(inputCities.value);


function loadGraphs(){
    for(let i = 0; i < distances.rows.length; i++)
        for(let j = 0; j < distances.rows.length; j++){
            distancesGraph.addEdge(i,j,distances.rows.item(i).cells.item(j).children[0].value);
            pheromoneGraph.addEdge(i,j,inputAlpha.value);
        }
}

let graphContainer = document.querySelector("graph-container");
    

function getMatrixValue(i,j){
    return distances.rows.item(i).cells.item(j).children[0].value;
}

function getCityName(i){
    return population.rows.item(0).cells.item(i).children[0].value;
}

function getCityPopulation(i){
    return population.rows.item(1).cells.item(i).children[0].value;
}
