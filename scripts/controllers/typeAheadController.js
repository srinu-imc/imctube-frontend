angular.module('imctubeApp')
  .controller('TypeAheadCtrl', function($scope, $http) {
    $http.get('/imctube/webapi/artists').success(function(data) {
      $scope.items = data;
    });
    $scope.artist = {};

    $scope.updateArtist = function(dialogue) {
      dialogue.artist = $scope.artist;
      dialogue.artistId = $scope.artist.id;
    }

    $scope.updateArtistId = function(dialogue) {
      dialogue.artistId = dialogue.artist.id;
    }
  });
