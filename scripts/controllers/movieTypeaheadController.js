angular.module('imctubeApp')
  .controller('MovieTypeaheadCtrl', function($scope, $http) {
    $http.get('/imctube/webapi/movies/all').success(function(data) {
      $scope.items = data;
    });
  });