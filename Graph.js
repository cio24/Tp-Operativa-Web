var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Graph = /** @class */ (function () {
    //
    //  Methods 
    //
    function Graph(numberOfVertex) {
        this.numberOfVertex = numberOfVertex;
        this.matrix = new Array(numberOfVertex);
        for (var i = 0; i < numberOfVertex; i++)
            this.matrix[i] = new Array(numberOfVertex);
    }
    Graph.prototype.getCost = function (source, destination) {
        return this.matrix[source][destination];
    };
    Graph.prototype.connected = function (source, destination) {
        return typeof (this.matrix[source][destination]) != 'undefined';
    };
    Graph.prototype.addEdge = function (source, destination, value) {
        this.matrix[source][destination] = value;
    };
    Graph.prototype.getAdjacent = function (vertex) {
        return __spreadArrays(this.matrix[vertex]);
    };
    Graph.prototype.getNumberOfVertex = function () {
        return this.numberOfVertex;
    };
    Graph.prototype.print = function () {
        console.log(this.matrix);
    };
    return Graph;
}());
