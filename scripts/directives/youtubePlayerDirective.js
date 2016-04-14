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

        $scope.backward = function(player, currentClip) {
          if((player.getCurrentTime() - 10) > currentClip.startTime) {
            player.seekTo(player.getCurrentTime() - 10, true);
          }
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
