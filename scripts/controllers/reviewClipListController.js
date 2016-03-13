function ReviewClipListCtrl($http, $routeParams, $scope, $window) {
  $scope.clips = [];
  $scope.limit = 30;

  $http.get('/imctube/webapi/review/' + $routeParams.movieId + '/clips/').success(function(clips) {
    $scope.clips = clips;
  });

  $scope.expand = function() {
    $scope.expand = $scope.expand + 30;
  }
};

ReviewClipListCtrl.$inject = ['$http', '$routeParams', '$scope', '$window'];
angular.module('imctubeApp').controller('ReviewClipListCtrl', ReviewClipListCtrl);
