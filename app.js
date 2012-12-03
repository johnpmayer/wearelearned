angular.module('app', ['parseauth'])
    .directive('optiontitle', function() {
        return {
            restrict: 'E',
            transclude: false,
            scope: true,
            controller: function($scope, $attrs) {
                $scope.title = $scope[$attrs.title];
                $scope.options = $scope[$attrs.options];;
            },
            templateUrl: 'templates/optiontitle.html'
        };
    });

var Concept = Parse.Object.extend("Concept");

function Main($scope) {

    $scope.search = function(){
        alert($scope.searchString);
        var searchQuery = new Parse.Query(Concept);
        searchQuery.contains("name", $scope.searchString);
        searchQuery.find({
            success: function(concepts) {
                console.log(_.map(concepts,function(concept){
                    return concept.get("name");
                }));
            }
        })
    }

    // Fake Data:

    $scope.conceptName = "Hydrogen bonds";

    var lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    $scope.dependencies = ["Electrostatic forces", "Electron geometry"];
    $scope.dependents = ["Freezing point of water", "DNA"];

    $scope.explanations = [

        {
            author: 'John',
            votes: 100,
            text: lorem
        },

        {
            author: 'Mary',
            votes: 150,
            text: lorem
        },

    ];

}

function todo() {
    alert('ToDo');
}

function Dependency($scope) {

    $scope.menuOptions = [{name:'Explore',callback:todo}];

}

function ConceptTitle($scope) {

    $scope.menuOptions = [{name:'Contribute',callback:todo}];

}

function Explanation($scope) {

    $scope.authorString = "Written by: " + $scope.explanation.author;
    $scope.menuOptions = [{name:'Comment', callback:todo}];

}
