function ReviewClipListCtrl($http, $routeParams, $scope, $window) {
  $scope.clips = [];

  $http.get('/imctube/webapi/review/' + $routeParams.movieId + '/clips/').success(function(clips) {
    $scope.clips = clips;
  });
};

ReviewClipListCtrl.$inject = ['$http', '$routeParams', '$scope', '$window'];
angular.module('imctubeApp').controller('ReviewClipListCtrl', ReviewClipListCtrl);
