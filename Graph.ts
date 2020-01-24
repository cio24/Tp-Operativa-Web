class Graph {
   
    //
    //  Instance Attributes 
    //

    private numberOfVertex:number;
    private matrix:number[][];
    
    //
    //  Methods 
    //

    constructor(numberOfVertex:number){
        this.numberOfVertex=numberOfVertex;
        this.matrix=new Array<number[]>(numberOfVertex);
        for(let i=0;i<numberOfVertex;i++)
            this.matrix[i]=new Array<number>(numberOfVertex);
    }

    public getCost(source:number, destination:number):number{
        return this.matrix[source][destination];
    }

    public connected(source:number, destination:number):boolean{
        return typeof(this.matrix[source][destination]) != 'undefined';
    }

    public addEdge(source:number, destination:number, value:number){
        this.matrix[source][destination] = value;
    }

    public getAdjacent(vertex:number):number[]{
        let copy = Object.assign([], this.matrix[vertex]);
        return copy;
    }

    public getNumberOfVertex():number{
        return this.numberOfVertex;
    }

    public print(){
        console.log(this.matrix);
    }
}
