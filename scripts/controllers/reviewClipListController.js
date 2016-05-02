function ReviewClipListCtrl($http, $routeParams, $scope, $window, $uibModal) {
  $scope.clips = [];
  $scope.rating = 0;

  $http.get('/imctube/webapi/review/' + $routeParams.movieId + '/clips/').success(function(clips) {
    $scope.clips = clips;
  });

  $scope.open = function(clip) {
    var modalInstance = $uibModal.open({
      templateUrl: 'view/clip-rating-model.html',
      controller: 'ClipRatingCtrl',
      resolve: {
        clip: function () {
          return clip;
        }
      }
    });

    modalInstance.result.then(function(rClip) {
      clip.rating = rClip.rating;
    }, function() {
      //console.log("failed to set rating");
    });
  };
};

ReviewClipListCtrl.$inject = ['$http', '$routeParams', '$scope', '$window', '$uibModal'];
angular.module('imctubeApp').controller('ReviewClipListCtrl', ReviewClipListCtrl);
