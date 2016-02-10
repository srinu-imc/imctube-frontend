angular.module('imctubeApp')
	.directive("youtubePlayer", function() {
    return {
      restrict: 'E',
      templateUrl: "view/youtube-player.html",
      controller: function($scope) {
        $scope.playVideo = function(player) {
          player.playVideo();
        };

        $scope.pauseVideo = function(player) {
          player.pauseVideo();
        };

        $scope.playFromMovieStart = function(player) {
          player.seekTo(0, true);
        };

        $scope.backward = function(player) {
          player.seekTo(player.getCurrentTime() - 10, true);
        }

        $scope.forward = function(player) {
          player.seekTo(player.getCurrentTime() + 10, true);
        }

        $scope.playFromClipStart = function(player, clip) {
          player.seekTo(clip.startTime, true);
        };
      },
      controllerAs: 'ytPlayer'
    };  
  });
