

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
        //console.log({maxValue,maxWidth})
    
        for(let i=0;i<matrixa.length;i++){
            for(let j=0;j<matrixa.length;j++){
                //console.log('e'+(i*matrixa.length+j));
                if(i == j || typeof(matrixa[i][j])=='undefined')
                    continue;
                let a = maxWidth*matrixa[i][j]/maxValue;
                //console.log(a);
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
        //console.log('#' + ('000000' + h.toString(16)).slice(-6));
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
    