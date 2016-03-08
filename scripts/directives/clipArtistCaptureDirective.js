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

        $scope.delete = function(clip) {
          clip.artists.splice(this.$index, 1);
          clip.artistIds.splice(this.$index, 1);
        }

        $scope.selectArtist = function(clip, artists) {
          var artist = artists[this.$index];
          if(clip.artistIds.indexOf(artist.id) == -1) {
            clip.artists.push(artist);
            clip.artistIds.push(artist.id);
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