class TSPSolver {

    //
    //  Instance Attributes 
    //

    private pheromones:Graph;
    private graph:Graph;
    private numberOfAnts:number;
    private numberOfIterations:number;
    private initialVertex:number;
    private pathLength:number;
    private evaporationRate:number;
    private ants:Ant[];

    //
    //  Methods 
    //

    constructor(graph:Graph,pheromones:Graph,population:number[],alpha:number,beta:number,evaporationRate:number,numberOfAnts:number,numberOfIterations:number,initialVertex:number,pathLength){
        Ant.setGraph(graph);
        Ant.setPheromones(pheromones);
        Ant.setPopulation(population);
        Ant.setAlpha(alpha);
        Ant.setBeta(beta);

        this.graph = graph;
        this.pheromones = pheromones;
        this.evaporationRate = evaporationRate;
        this.numberOfAnts = numberOfAnts;
        this.numberOfIterations = numberOfIterations;
        this.ants = new Array<Ant>(numberOfAnts);
        this.initialVertex = initialVertex;
        this.pathLength = pathLength;

        for(let i=0; i<numberOfAnts; i++)
            this.ants[i] = new Ant(this.initialVertex,this.pathLength);
    }

    public solve():[number[],number]{
        let bestPath:number[] = undefined;
        let bestPathCost:number = undefined;
        for(let i=0;i<this.numberOfIterations;i++){
            console.log("Iteration number: " + i+1);
            for(let ant of this.ants){
                ant.findRoute();
                if(ant.foundPath() && ( typeof(bestPath) == 'undefined' || ant.getPathCost() > bestPathCost)){
                    bestPath=ant.getPath();
                    bestPathCost=ant.getPathCost();
                }
            }

            // decay each edge's pheromones that existed before this round
            for(let k=0;k<this.pheromones.getNumberOfVertex();k++)
                for(let j=0;j<this.pheromones.getNumberOfVertex();j++)
                    this.pheromones.addEdge(k,j,+this.pheromones.getCost(k,j) * +this.evaporationRate);
            
            // Now that the round is over (and all ants were blind to pheramones deposited this round),
            // and pheromones from prior rounds has decayed, we can add the fresh pheramone so that it
            // is visible next round all at once.
            for(let ant of this.ants)
                ant.depositPheromones();
        }
        return [bestPath,bestPathCost];
    }
}