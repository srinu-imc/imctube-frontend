function ThreeClickClipListCtrl($http, $scope, $routeParams) {
  $scope.clips = [];

$http.get('/imctube/webapi/artists/' + $routeParams.artistId + '/movies/' + $routeParams.movieId + '/clips').success(function(data) {
    $scope.clips = data.clips;
  });
};

ThreeClickClipListCtrl.$inject = ['$http', '$scope', '$routeParams'];
angular.module('imctubeApp').controller('ThreeClickClipListCtrl', ThreeClickClipListCtrl);