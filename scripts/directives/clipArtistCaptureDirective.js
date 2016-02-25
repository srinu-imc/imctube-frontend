angular.module('imctubeApp')
  .directive("clipArtists", function() {
    return {
      restrict: 'E',
      templateUrl: 'view/clip-artists-capture.html',
      controller: function($scope) {
        $scope.addArtist = function(clip) {
          clip.artists.push(this.newArtist);
          $scope.newArtist = '';
        }

        $scope.delete = function(currentClip) {
          currentClip.artists.splice(this.$index, 1);
          currentClip.artistIds.splice(this.$index, 1);
        }

        $scope.selectArtist = function(currentClip, artists) {
          var artist = artists[this.$index];
          if(currentClip.artistIds.indexOf(artist.id) == -1) {
            currentClip.artists.push(artist);
            currentClip.artistIds.push(artist.id);
          }
        }

        $scope.getUrl= function(artist) {
          if(angular.isDefined(artist.thumbnail)) {
            return artist.thumbnail;
          } else {
            return "resources/artists/noprofile.jpg";
          }
        }
      },
      controllerAs: 'clipArtists'
    };
  });