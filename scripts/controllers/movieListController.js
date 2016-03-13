function MovieListCtrl($http, $routeParams, $scope) {
  $scope.movies = [];
  $scope.limit = 30;

  if(angular.isDefined($routeParams.artistId)) {
    $http.get('/imctube/webapi/artists/' + $routeParams.artistId + '/movies').success(function(data) {
      $scope.movies = data;
    });
  } else {
    console.log("Required parameter artist is missing");
  }

  $scope.getUrl = function(movieId) {
    var url = '';
    if(angular.isDefined($routeParams.artistId)) {
      url =  "#artists/" + $routeParams.artistId + "/movies/" + movieId + "/clips";
    } else {
      console.log("Required parameter artist is missing");
    }
    return url;
  }

  $scope.expand = function() {
    $scope.limit = $scope.limit + 30;
  }
};

MovieListCtrl.$inject = ['$http', '$routeParams', '$scope'];
angular.module('imctubeApp').controller('MovieListCtrl', MovieListCtrl);