"use strict";


const loadMatrix = document.querySelector('#ldmatrix');

function createGraph() {
    document.querySelector("#graph-container").innerHTML="";

    

    let i,
    s,
    g = {
    nodes: [],
    edges: []
    };

    
    for(let i=0;i<names.length;i++){
        g.nodes.push({
            id:'n'+i,
            label:getCityName(i),
            x:Math.random()*300,
            y:Math.random()*300,
            size:getCityPopulation(i)*10000
        });
    }
   
    let edgenumber=0;
    for(let i = 0; i < inputCities.value; i++){
        for(let j = 0; j < inputCities.value; j++){
            if(i === j){
                continue;
            }
            if(matrixView.rows.item(i).cells.item(j).children[0].value != ""){
                g.edges.push({
                    id:'e' + edgenumber,
                    label: '' + getMatrixValue(i,j) + 'km',
                    source:'n'+i,
                    target:'n'+j,
                    size:1,
                    type:'curvedArrow',
                    color: '#FF0000'
                })
                edgenumber++;
            }
        }
    }


    s = new sigma({
        graph: g,
        container: 'graph-container',
        settings: {
            minEdgeSize: 0.5,
            maxEdgeSize: 1,
            edgeLabelSize: 'proportional',
            drawEdges: true
        },
        renderer: {
            container: document.querySelector("#graph-container"),
            type: sigma.renderers.canvas
        }
    });

    // Start the ForceAtlas2 algorithm:
    s.startForceAtlas2({worker: true, barnesHutOptimize: false});

}


let csv = document.querySelector("#show-graph").addEventListener("click",(event)=> {
      createGraph();
  });