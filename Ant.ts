class Ant {

    //
    //  Static Attributes 
    //

    private static graph:Graph;
    private static pheromones:Graph;
    private static population:number[];
    private static alpha:number;
    private static beta:number;

    //
    //  Instance Attributes 
    //

    private pathCost:number;
    private pathLength:number;
    private initialVertex:number;
    private totalPopulation:number;
    private path:number[];
    
    //
    //  Methods 
    //

    constructor(initialVertex : number, pathLength : number){
        this.initialVertex=initialVertex;
        this.pathLength=pathLength;
    }

    private findRoutePrivate(index:number, visited:Set<number>):boolean{
        
        if(index == this.pathLength){
            let res=Ant.graph.connected(this.path[index],this.initialVertex);
            if(!res){
                this.pathCost=0.0;
                this.totalPopulation=0;
                this.path = [];
            } else {
                this.pathCost += Ant.graph.getCost(this.path[index],this.initialVertex);
                this.totalPopulation += Ant.population[this.initialVertex];
            }
            return res;
        }

        let denominator = 0.0;
        let adjacent = Ant.graph.getAdjacent(this.path[index]);
        let probabilities:[number,number][] = [];

        for(let i=0; i<Ant.graph.getNumberOfVertex();i++){
            //if we already visited this neighbour or there's no path between them we skip this iteration
            if(typeof(adjacent[i])=='undefined' || (visited.has(i)) || this.path[index]==i )
                continue;
            
            let desirability = Math.pow(Ant.pheromones.getCost(this.path[index],i),Ant.alpha);
            let attractiveness = Math.pow((Ant.population[i]/adjacent[i]),Ant.beta);
            let prob = desirability * attractiveness;
            probabilities.push([i,prob]);
            denominator+=prob;
        }

        if(probabilities.length == 0) {
            this.pathCost=0.0;
            this.totalPopulation=0;
            this.path = [];
            return false;
        }

        for(let entry of probabilities)
            entry[1]/denominator;

        let next = this.roulette(probabilities);
        this.path[index+1]=next;
        visited.add(next);
        this.pathCost += Ant.graph.getCost(this.path[index],next);
        this.totalPopulation += Ant.population[next];
        return this.findRoutePrivate(index+1,visited);
    }

    private roulette(probs:[number,number][]):number{
        let cumulative:[number,number][];
        
        
        for(let i=0;i<probs.length;i++){
            let sum=0.0;
            for(let j=i+1;j<probs.length;j++){
                sum += probs[j][1];
            }
            cumulative.push(probs[i]);
        }

        let random=Math.random();

        let i=0;
        let j=1;
        while(j < cumulative.length){
            if((cumulative[i][1] >= random) && (cumulative[j][1] < random))
                return cumulative[i][0];
            i++;
            j++;
        }
        return cumulative[i][0];
    }

    public static setGraph(graph:Graph){
        this.graph=graph;
    }

    public static setPheromones(pheromones:Graph){
        this.pheromones=pheromones;
    }

    public static setPopulation(population:number[]){
        this.population=population;
    }

    public static setAlpha(alpha:number){
        this.alpha=alpha;
    }

    public static setBeta(beta:number){
        this.beta=beta;
    }

    public getPathCost():number{
        return this.totalPopulation / this.pathCost;
    }

    public getPath():number[]{
        return [...this.path]
    }

    public foundPath():boolean{
        return this.path.length != 0;
    }

    public findRoute(){
        console.log("xD");
    }

    public depositPheromones(){
        if(this.foundPath()){
            let pheromoneStrength = (100*this.totalPopulation)/(this.pathCost);
            for(let i=0;i<this.pathLength-1;i++)
                Ant.pheromones.addEdge(this.path[i],this.path[i+1],Ant.pheromones.getCost(this.path[i],this.path[i+1])+pheromoneStrength)
            // deposite pheromones on the edge from the last city to th first city
            Ant.pheromones.addEdge(this.path[this.pathLength-1],this.initialVertex,Ant.pheromones.getCost(this.path[this.pathLength-1],this.initialVertex)+pheromoneStrength)
        }
    }

    public printPath(){
        console.log(this.path);
    }

}
