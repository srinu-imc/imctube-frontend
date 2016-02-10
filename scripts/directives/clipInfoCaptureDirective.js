angular.module('imctubeApp')
  .directive("clipInfo", function() {
    return {
      restrict: 'E',
      templateUrl: 'view/clip-info-capture.html',
      controller: function($scope) {
        $scope.edit = false;

        $scope.captureClipEndTime = function(player, clip) {
          clip.endTime = player.getCurrentTime();
          player.pauseVideo();
          $('#rootwizard').find("a[href*='thumbnails']").trigger('click');
        };

        $scope.toggleEditMode = function() {
          $scope.edit = !$scope.edit;
        }
      },
      controllerAs: 'clipInfo'
    };
  });