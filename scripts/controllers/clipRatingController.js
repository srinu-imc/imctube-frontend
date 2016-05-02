angular.module('imctubeApp')
  .controller('ClipRatingCtrl', function($scope, $http, $uibModalInstance, clip) {
    $scope.clip = clip;

    if (angular.isDefined(clip.rating)) {
      $scope.rating = clip.rating;
    } else {
      $scope.rating = 0;
    }

    $scope.ok = function () {
      $scope.clip.rating = $scope.rating;
      $http.post('/imctube/webapi/review/rating/' + clip.clipId, $scope.clip).then(function(data) {
        console.log("Successful");
      }, function(error) {
        console.log("Failed with error" + error);
      });
      $uibModalInstance.close($scope.clip);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });