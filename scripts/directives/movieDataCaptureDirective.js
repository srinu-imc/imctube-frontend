angular.module('imctubeApp')
  .directive("movieDataCapture", function($http) {
    return {
      restrict: 'E',
      templateUrl: 'view/movie-data-capture.html'
    };
  });