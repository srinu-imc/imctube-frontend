function ClipifyListCtrl($http, $routeParams, $scope, $window) {
  $scope.movies = [];
  $scope.limit = 30;

  $http.get('/imctube/webapi/clipify').success(function(movies) {
    $scope.movies = movies;
  });

  $scope.chooseAnother = function() {
    $http.post('/imctube/webapi/clipify/chooseAnother')
      .then(function() {
        $window.open('#clipify', "_self");
        // Success, nothing to do here.
      }, function(error) {
        console.log("Failed with error " + error);
      });
  };

  $scope.expand = function() {
    $scope.limit = $scope.limit + 30;
  }
};

ClipifyListCtrl.$inject = ['$http', '$routeParams', '$scope', '$window'];
angular.module('imctubeApp').controller('ClipifyListCtrl', ClipifyListCtrl);
