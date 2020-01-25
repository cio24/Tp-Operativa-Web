var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Ant = /** @class */ (function () {
    function Ant(initialVertex, pathLength) {
        this.initialVertex = initialVertex;
        this.pathLength = pathLength;
    }
    Ant.prototype.findRoutePrivate = function (index, visited) {
        if (index == this.pathLength) {
            var res = Ant.graph.connected(this.path[index], this.initialVertex);
            if (!res) {
                this.pathCost = 0.0;
                this.totalPopulation = 0;
                this.path = [];
            }
            else {
                this.pathCost += +Ant.graph.getCost(this.path[index], this.initialVertex);
                this.totalPopulation += +Ant.population[this.initialVertex];
            }
            return res;
        }
        var denominator = 0.0;
        var adjacent = Ant.graph.getAdjacent(this.path[index]);
        var probabilities = [];
        for (var i = 0; i < Ant.graph.getNumberOfVertex(); i++) {
            //if we already visited this neighbour or there's no path between them we skip this iteration
            if (typeof (adjacent[i]) == 'undefined' || (visited.has(i)) || this.path[index] == i)
                continue;
            var desirability = Math.pow(Ant.pheromones.getCost(this.path[index], i), Ant.alpha);
            var attractiveness = Math.pow((Ant.population[i] / adjacent[i]), Ant.beta);
            var prob = desirability * attractiveness;
            probabilities.push([i, prob]);
            denominator += prob;
        }
        if (probabilities.length == 0) {
            this.pathCost = 0.0;
            this.totalPopulation = 0;
            this.path = [];
            return false;
        }
        for (var _i = 0, probabilities_1 = probabilities; _i < probabilities_1.length; _i++) {
            var entry = probabilities_1[_i];
            entry[1] / denominator;
        }
        var next = this.roulette(probabilities);
        this.path[index + 1] = next;
        visited.add(next);
        //console.log("Antes de sumar pathCost: " + this.pathCost)
        this.pathCost += +Ant.graph.getCost(this.path[index], next) * 1.0;
        //console.log("Despues de sumar pathCost: " + this.pathCost)
        this.totalPopulation += +Ant.population[next];
        return this.findRoutePrivate(index + 1, visited);
    };
    Ant.prototype.roulette = function (probs) {
        var cumulative = new Array();
        for (var i_1 = 0; i_1 < probs.length; i_1++) {
            var sum = 0.0;
            for (var j_1 = i_1 + 1; j_1 < probs.length; j_1++) {
                sum += +probs[j_1][1];
            }
            cumulative.push(probs[i_1]);
        }
        var random = Math.random();
        var i = 0;
        var j = 1;
        while (j < cumulative.length) {
            if ((cumulative[i][1] >= random) && (cumulative[j][1] < random))
                return cumulative[i][0];
            i++;
            j++;
        }
        return cumulative[i][0];
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
        return +this.totalPopulation / +this.pathCost;
    };
    Ant.prototype.getPath = function () {
        return __spreadArrays(this.path);
    };
    Ant.prototype.foundPath = function () {
        return this.path.length != 0;
    };
    Ant.prototype.findRoute = function () {
        var visited = new Set();
        this.path = [];
        this.pathCost = 0.0;
        this.totalPopulation = 0;
        this.path[0] = this.initialVertex;
        visited.add(this.initialVertex);
        this.findRoutePrivate(0, visited);
    };
    Ant.prototype.depositPheromones = function () {
        if (this.foundPath()) {
            var pheromoneStrength = (+100 * +this.totalPopulation) / (+this.pathCost);
            for (var i = 0; i < this.pathLength - 1; i++)
                Ant.pheromones.addEdge(this.path[i], this.path[i + 1], Ant.pheromones.getCost(this.path[i], this.path[i + 1]) + pheromoneStrength);
            // deposite pheromones on the edge from the last city to th first city
            Ant.pheromones.addEdge(this.path[this.pathLength - 1], this.initialVertex, Ant.pheromones.getCost(this.path[this.pathLength - 1], this.initialVertex) + pheromoneStrength);
        }
    };
    Ant.prototype.printPath = function () {
        console.log(this.path);
    };
    return Ant;
}());
