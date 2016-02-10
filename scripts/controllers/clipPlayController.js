function ClipPlayerCtrl($http, $scope, $routeParams) {
  $scope.clipToPlay = {};

  $http.get('/imctube/webapi/clips/' + $routeParams.clipId).success(function(clips) {
    $scope.clipToPlay = clips;
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
};

ClipPlayerCtrl.$inject = ['$http', '$scope', '$routeParams'];
angular.module('imctubeApp').controller('ClipPlayerCtrl', ClipPlayerCtrl);