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
        return this.matrix[vertex];
    };
    Graph.prototype.getNumberOfVertex = function () {
        return this.numberOfVertex;
    };
    Graph.prototype.print = function () {
        console.log(this.matrix);
    };
    return Graph;
}());
