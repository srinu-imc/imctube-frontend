function ClipifyListCtrl($http, $routeParams, $scope) {
  $scope.movies = [];

  $http.get('/imctube/webapi/clipify').success(function(movies) {
    console.log(movies);	
    $scope.movies = movies;
  });
};

ClipifyListCtrl.$inject = ['$http', '$routeParams', '$scope'];
angular.module('imctubeApp').controller('ClipifyListCtrl', ClipifyListCtrl);