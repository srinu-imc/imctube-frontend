function ReviewListCtrl($http, $routeParams, $scope, $window) {
  $scope.movies = [];
  $scope.limit = 30;

  $http.get('/imctube/webapi/review').success(function(movies) {
    $scope.movies = movies;
  });

  $scope.expand = function() {
    $scope.limit = $scope.limit + 30;
  }
};

ReviewListCtrl.$inject = ['$http', '$routeParams', '$scope', '$window'];
angular.module('imctubeApp').controller('ReviewListCtrl', ReviewListCtrl);
