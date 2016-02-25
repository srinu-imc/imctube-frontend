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

    $scope.onItemSelectedToList = function(currentClip, movie) {
      if(currentClip.artistIds.indexOf($scope.artist.id) == -1) {
        currentClip.artists.push($scope.artist);
        currentClip.artistIds.push($scope.artist.id);
      }

      if(movie.artistIds.indexOf($scope.artist.id) == -1) {
        movie.artists.push($scope.artist);
        movie.artistIds.push($scope.artist.id);
      }

      $scope.artist = {};
    }
  });
