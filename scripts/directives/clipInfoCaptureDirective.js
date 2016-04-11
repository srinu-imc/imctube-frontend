angular.module('imctubeApp')
  .directive("clipInfo", function() {
    return {
      restrict: 'E',
      templateUrl: 'view/clip-info-capture.html',
      controller: function($scope, toastr) {
        $scope.edit = false;
        $scope.clipEndTimeCaptured = false;

        $scope.captureClipEndTime = function(player, clip) {
          clip.endTime = player.getCurrentTime();
          $scope.clipEndTimeCaptured = true;
          player.pauseVideo();
          if($scope.isValid(clip)) {
            $('#rootwizard').find("a[href*='thumbnails']").trigger('click');
          } else {
            toastr.warning("Please select artists/Enter clip description");
          }
        };

        $scope.isValid = function(clip) {
          if((clip.artists.length != 0 || clip.ignoreArtists) && angular.isDefined(clip.description)) {
            return true;
          } else {
            return false;
          }
        }

        $scope.toggleEditMode = function() {
          $scope.edit = !$scope.edit;
        };

        $scope.moveToThumbnailCapture = function(clip) {
          $('#rootwizard').find("a[href*='thumbnails']").trigger('click');
        }
      },
      controllerAs: 'clipInfo'
    };
  });