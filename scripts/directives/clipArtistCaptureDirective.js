angular.module('imctubeApp')
  .directive("clipArtists", function() {
    return {
      restrict: 'E',
      templateUrl: 'view/clip-artists-capture.html',
      controller: function($scope) {
        this.addArtist = function(clip) {
          clip.artists.push(this.newArtist);
          $scope.newArtist = '';
        }
      },
      controllerAs: 'clipArtists'
    };
  });