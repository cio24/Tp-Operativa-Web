var Ant = /** @class */ (function () {
    //
    //  Methods 
    //
    function Ant(initialVertex, pathLenght) {
        this.initialVertex = initialVertex;
        this.pathLenght = pathLenght;
    }
    Ant.prototype.findRoutePrivate = function (index, visited) {
        return true;
    };
    Ant.prototype.roulette = function (probs) {
        return 1;
    };
    Ant.setGraph = function (graph) {
        this.graph = graph;
    };
    Ant.setPheromones = function (pheromones) {
        this.pheromones = pheromones;
    };
    Ant.setPopulation = function (population) {
        this.population = population;
    };
    Ant.setAlpha = function (alpha) {
        this.alpha = alpha;
    };
    Ant.setBeta = function (beta) {
        this.beta = beta;
    };
    Ant.prototype.getPathCost = function () {
        return this.totalPopulation / this.pathCost;
    };
    Ant.prototype.getPath = function () {
        //problemas de clonar??
        return this.path;
    };
    Ant.prototype.foundPath = function () {
        return this.path.length != 0;
    };
    Ant.prototype.findRoute = function () {
        console.log("xD");
    };
    Ant.prototype.depositPheromones = function () {
    };
    Ant.prototype.printPath = function () {
        console.log(this.path);
    };
    return Ant;
}());
