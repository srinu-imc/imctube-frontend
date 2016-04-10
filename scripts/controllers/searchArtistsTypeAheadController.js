angular.module('imctubeApp')
  .controller('SearchArtistsTypeAHeadController', function($scope, $http) {
    $http.get('/imctube/webapi/artists').success(function(data) {
      $scope.items = data;
    });
    $scope.artist = {};
  });
