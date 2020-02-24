var TSPSolver = /** @class */ (function () {
    //
    //  Methods 
    //
    function TSPSolver(graph, pheromones, population, alpha, beta, evaporationRate, numberOfAnts, numberOfIterations, initialVertex, pathLength) {
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
        this.ants = new Array(numberOfAnts);
        this.initialVertex = initialVertex;
        this.pathLength = pathLength;
        for (var i = 0; i < numberOfAnts; i++)
            this.ants[i] = new Ant(this.initialVertex, this.pathLength);
    }
    TSPSolver.prototype.solve = function () {
        var bestPath = undefined;
        var bestPathCost = undefined;
        for (var i = 0; i < this.numberOfIterations; i++) {
            console.log("Iteration number: " + (i + 1).toString());
            for (var _i = 0, _a = this.ants; _i < _a.length; _i++) {
                var ant = _a[_i];
                ant.findRoute();
                if (ant.foundPath())
                    console.log(ant.getPath());
                if (ant.foundPath() && (typeof (bestPath) == 'undefined' || ant.getPathCost() > bestPathCost)) {
                    bestPath = ant.getPath();
                    bestPathCost = ant.getPathCost();
                }
            }
            // decay each edge's pheromones that existed before this round
            for (var k = 0; k < this.pheromones.getNumberOfVertex(); k++)
                for (var j = 0; j < this.pheromones.getNumberOfVertex(); j++)
                    this.pheromones.addEdge(k, j, +this.pheromones.getCost(k, j) * +this.evaporationRate);
            // Now that the round is over (and all ants were blind to pheramones deposited this round),
            // and pheromones from prior rounds has decayed, we can add the fresh pheramone so that it
            // is visible next round all at once.
            for (var _b = 0, _c = this.ants; _b < _c.length; _b++) {
                var ant = _c[_b];
                ant.depositPheromones();
            }
        }
        return [bestPath, bestPathCost];
    };
    return TSPSolver;
}());
