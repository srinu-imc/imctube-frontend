function ReviewClipPlayerCtrl($http, $scope, $routeParams) {
  $scope.clipToPlay = {};

  $http.post('/imctube/webapi/review/clips/' + $routeParams.clipId).success(function(clip) {
    $scope.clipToPlay = clip;
  });

  $scope.$watch('player.playVideo', function() {
    if(angular.isDefined($scope.player) && angular.isDefined($scope.player.playVideo)) {
      $scope.player.loadVideoById({
        'videoId': $scope.clipToPlay.videoId,
        'startSeconds' : $scope.clipToPlay.startTime,
        'endSeconds' : $scope.clipToPlay.endTime
      });
      $scope.player.playVideo();
    }
  });

  $scope.playVideo = function(player) {
    player.playVideo();
  };

  $scope.pauseVideo = function(player) {
    player.pauseVideo();
  };

  $scope.backward = function(player) {
    if((player.getCurrentTime() - 5) > $scope.clipToPlay.startTime) {
      player.seekTo(player.getCurrentTime() - 5, true);
    }
  }

  $scope.forward = function(player) {
    if((player.getCurrentTime() + 5) < $scope.clipToPlay.endTime) {
      player.seekTo(player.getCurrentTime() + 5, true);
    }
  }

  $scope.playFromClipStart = function(player, clip) {
    player.seekTo(clip.startTime, true);
  };
};

ReviewClipPlayerCtrl.$inject = ['$http', '$scope', '$routeParams'];
angular.module('imctubeApp').controller('ReviewClipPlayerCtrl', ReviewClipPlayerCtrl);