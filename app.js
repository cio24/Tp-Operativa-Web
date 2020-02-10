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
    
    
    
    let cy = cytoscape({
        container: document.getElementById("graph-container"),
        style: [
            {
              selector: 'node',
              style: {
                'label': 'data(label)',
                'background-color': 'data(color)'
              }
            }]
    });
    
    
    cy.style().selector('edge').style({
                'label': 'data(weight)',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'control-point-distance':'100',
                'width':'data(width)'
                //'control-point-step-size':'0.001'
              })
    .update();
    
    
    addNodes();
    addEdges();
    circle();
    
    function addNodes(){
    
        //getting the porcentajes for color map the nodes
        let popPerc=getPercentage(popA)
    
        //adding the nodes to cytoscape
        for(let i=0;i<names.length;i++){
            cy.add({group:"nodes",
                    data:{id:"n"+i,label:names[i],classes: 'top-left',color:perc2color(popPerc[i])},
                    position:{x:Math.random()*1200,y:Math.random()*900}
                });
        }
    }
    
    function addEdges(){
    
        let maxWidth=10;
        let maxValue=getMax(matrixa);
        console.log({maxValue,maxWidth})
    
        for(let i=0;i<matrixa.length;i++){
            for(let j=0;j<matrixa.length;j++){
                console.log('e'+(i*matrixa.length+j));
                if(i == j || typeof(matrixa[i][j])=='undefined')
                    continue;
                let a = maxWidth*matrixa[i][j]/maxValue;
                console.log(a);
                cy.add({ group: 'edges', data: { id: 'e'+(i*matrixa.length+j), source: 'n'+i, target: 'n'+j,weight:matrixa[i][j],width:maxWidth*matrixa[i][j]/maxValue} });
            }
        }
    }
    
    function perc2color(perc) {
        let r, g, b = 0;
        //variando cada color segun el porcentaje
        if(perc>50){
            r=255;
            g = Math.round(5.10 * (100-perc));
        }
        else{
            g=255;
            r = Math.round(5.10 * (perc));
        }
        //poniendo cada valor en su posicion correspondiente
        let h = r * 0x10000 + g * 0x100 + b * 0x1;
        console.log('#' + ('000000' + h.toString(16)).slice(-6));
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }
    
    function getPercentage(array){
        let popPerc=[...array];
        let max=0;
        for(let pop of popPerc)
            if(max<pop)
                max=pop;
        for(let i=0;i<popPerc.length;i++)
            popPerc[i]=100*popPerc[i]/max;
        return popPerc;
    }
    
    function getMax(matrix){
        let maxValue=0;
        for(let i=0;i<matrix.length;i++){
            for(let j=0;j<matrix.length;j++){
                if(typeof(matrix[i][j]) != 'undefined' &&  maxValue<matrix[i][j])
                    maxValue=matrix[i][j];
            }
        }
        return maxValue;
    }
    
    function circle(){
        let options = {
            name: 'circle',
          
            fit: true, // whether to fit the viewport to the graph
            padding: 30, // the padding on fit
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
            nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
            spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
            radius: undefined, // the radius of the circle
            startAngle: 3 / 2 * Math.PI, // where nodes start in radians
            sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
            clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
            sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
            animate: false, // whether to transition the node positions
            animationDuration: 500, // duration of animation in ms if enabled
            animationEasing: undefined, // easing of animation if enabled
            animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
            ready: undefined, // callback on layoutready
            stop: undefined, // callback on layoutstop
            transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
          
          };
        cy.layout( options ).run();
    }
    
    function grid(){
        let options = {
            name: 'grid',
          
            fit: true, // whether to fit the viewport to the graph
            padding: 30, // padding used on fit
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
            nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
            spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
            condense: false, // uses all available space on false, uses minimal space on true
            rows: undefined, // force num of rows in the grid
            cols: undefined, // force num of columns in the grid
            position: function( node ){}, // returns { row, col } for element
            sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
            animate: false, // whether to transition the node positions
            animationDuration: 500, // duration of animation in ms if enabled
            animationEasing: undefined, // easing of animation if enabled
            animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
            ready: undefined, // callback on layoutready
            stop: undefined, // callback on layoutstop
            transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
          };
        cy.layout( options ).run();
    }
    
