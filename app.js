function todo() {
  alert('ToDo');
}

angular.module('app',['$strap.directives'])

.service('Mode', function() {
  var that = this;
  this.mode = 'concept',
  this.setMode = function(mode) {
    that.mode = mode;
  }
})

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
})

.controller("Main", function($scope) {

  $scope.search = function(){
    alert($scope.searchString);
  }

  // Fake Data:

  $scope.conceptName = "Hydrogen bonds";

  $scope.dependencies = ["Electrostatic forces", "Electron geometry", "A topic with an extremely long name"];
  $scope.dependants = ["Freezing point of water", "DNA"];

  $scope.explanations = [

    {
      author: 'Mary',
      votes: 130,
      text: "fo sfjhbs khb zc afgfjhgs jydg ckjyzgx jhvb kajsfg kasjfbg kasjgsadfhbg iasdhf laiuhv liae7fy8 hk,jebf la89sf yqkjb ,kjfbsf 9asgf fb o dub dsal ju dsfads fyf jyd hjafkhjd fjhgf kasdgkdjh gasdk casd kj bar baz"
    },

    {
      author: 'John',
      votes: 70,
      text: "foo bar baz asduyf gakhfvkasdh gsdhgc ksahc sdhcsahg kashgsakdhkasg asdkhfgaksdjhg dsfh sdkfjhg sadfkjhg asdfkjh sadhjg askdfhg sdfh sdkjfh asdkflieufbas,jfg owiefb asdjkhg asdilug s,mncbs,djchb sjfbasdmfb ;lsaufdfg .asukdfsbf. sdf usdyvf"
    },

  ];

})

.controller("LeftSize", function($scope, Mode) {
  $scope.Mode = Mode;

  var updateLayout = function(mode) {
    $scope.status = (mode == 'dependencies')
      ? "open" : "closed";
    $scope.layout = ($scope.status == "open") 
      ? "span3" 
      : "span1";
  }

  $scope.close = function(){ 
    Mode.setMode('concept');
  }

  $scope.open = function(){ 
    Mode.setMode('dependencies');
  }

  $scope.$watch("Mode.mode", function(newVal, oldVal) {
    updateLayout(newVal);
  }, true);
})

.controller("RightSize", function($scope, Mode) {
  $scope.Mode = Mode;

  var updateLayout = function(mode) {
    $scope.status = (mode == 'dependants')
      ? "open" : "closed";
    $scope.layout = ($scope.status == "open") 
      ? "span3" 
      : "span1";
  }

  $scope.close = function(){ 
    Mode.setMode('concept');
  }

  $scope.open = function(){ 
    Mode.setMode('dependants');
  }

  $scope.$watch("Mode.mode", function(newVal, oldVal) {
    updateLayout(newVal);
  }, true);
})

.controller("MiddleSize", function($scope, Mode) {
  $scope.Mode = Mode;
  var updateLayout = function(mode) {
    $scope.status = (mode == 'concept')
      ? "full" : "sidebar";
    $scope.layout = ($scope.status == "full") 
      ? "span10" 
      : "span8";
  }
  $scope.$watch("Mode.mode", function(newVal, oldVal) {
    updateLayout(newVal);
  }, true);
})

.controller("Dependency", function($scope) {
  $scope.menuOptions = [{name:'Explore',callback:todo}];
})

.controller("Dependant", function($scope) {
  $scope.menuOptions = [{name:'Explore',callback:todo}];
})

.controller("ConceptTitle", function($scope) {

  $scope.menuOptions = [{name:'Contribute',callback:todo}];

})

.controller("Explanation", function($scope) {

  $scope.menuOptions = [{name:'Comment', callback:todo}];

})

.controller("DocumentMgr", function($scope) {
  
  $scope.modal = {
    "title":"Create a new Document",
    "import":"",
    "saved":true,
  }

  $scope.conceptSearch = function(query, callback) {
    callback(["a","b","c"]);
  }
  
  $scope.newDocument = {
    "text" : "",
    "dependencies" : [],
  }

})
