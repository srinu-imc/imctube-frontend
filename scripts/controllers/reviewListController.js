function ReviewListCtrl($http, $routeParams, $scope, $window) {
  $scope.movies = [];

  $http.get('/imctube/webapi/review').success(function(movies) {
    $scope.movies = movies;
  });
};

ReviewListCtrl.$inject = ['$http', '$routeParams', '$scope', '$window'];
angular.module('imctubeApp').controller('ReviewListCtrl', ReviewListCtrl);