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
    private pathLenght:number;
    private initialVertex:number;
    private totalPopulation:number;
    private path:number[];
    
    //
    //  Methods 
    //

    constructor(initialVertex : number, pathLenght : number){
        this.initialVertex=initialVertex;
        this.pathLenght=pathLenght;
    }

    private findRoutePrivate(index:number, visited:Set<number>):boolean{
        
        return true;
    }

    private roulette(probs:[number,number][]):number{
        return 1;
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
        //problemas de clonar??
        return this.path
    }

    public foundPath():boolean{
        return this.path.length != 0;
    }

    public findRoute(){
        console.log("xD");
    }

    public depositPheromones(){

    }

    public printPath(){
        console.log(this.path);
    }

}
