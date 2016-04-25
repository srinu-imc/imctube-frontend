function ReviewClipCtrl($http, $routeParams, $scope, $window, $interval) {
  $scope.movie = {};
  $scope.currentClip = {};
  $scope.prevClip = {};
  $scope.option = {};
  $scope.option.selectedOption = 'newClip';
  $scope.isClipCut = false;
  $scope.isClipEnd = false;

     $http.get('/imctube/webapi/clips/' + $routeParams.clipId).success(function(currentClip) {
      $scope.currentClip = currentClip;

      $http.get('/imctube/webapi/review/' + currentClip.clipId + '/prev')
        .then(function(prevClip) {
          $scope.prevClip = prevClip;
          if(angular.isDefined($scope.prevClip.thumbnails)) {
            $scope.prevClip = prevClip;
          } else {
            $scope.prevClip = {};
            $scope.prevClip.thumbnails = [];
          }
        }, function() {
          $scope.prevClip = {};
          $scope.prevClip.thumbnails = [];
        });

      $http.get('/imctube/webapi/clips/' + currentClip.clipId + '/artists')
          .success(function(artists) {
            $scope.currentClip.artists = artists;
          });

      $http.get('/imctube/webapi/movies/' + currentClip.movieId)
        .success(function(data) {
          $scope.movie = data;

        $http.get('/imctube/webapi/movies/' + currentClip.movieId + '/artists')
            .success(function(artists) {
              $scope.movie.artists = artists;
              $scope.movie.artistIds = [];

              for(var i=0; i<artists.length; i++) {
                $scope.movie.artistIds.push(artists[i].id);
              }
            });
      });
    });

    $interval(function() {
      if(angular.isDefined($scope.currentClip)) {
        $scope.duration =
          ($scope.currentClip.endTime - $scope.currentClip.startTime) * 1000;
      }
    }, 1000);

     $scope.breakClip = function(player) {
       $scope.newClip = angular.copy($scope.currentClip);
       $scope.newClip.description = "";
       $scope.newClip.thumbnails = [];
       player.pauseVideo();
       $scope.newClip.endTime = player.getCurrentTime();
       $scope.currentClip.startTime = player.getCurrentTime();
       $scope.isClipCut = true;
     }

     $scope.submitChange = function(player) {
       $scope.request = {};
       if($scope.isClipCut) {
        $scope.newClip.artistIds = angular.copy($scope.currentClip.artistIds);
         $scope.request.newClip = $scope.newClip;
       }
       $scope.request.originalClip = $scope.currentClip;
       $scope.request.option = $scope.option.selectedOption;
      $http.put('/imctube/webapi/review/clips/' + $scope.currentClip.clipId, $scope.request)
          .then(function(data) {
            console.log("success");
          }, function(data) {
            console.log("Failed" + data);
          });

      if ($scope.isClipCut) {
         $scope.isClipCut = false;
         player.playVideo();
       } else {
         $window.open('#review/' + $scope.movie.id, "_self");
       }
     }

     $scope.isPlayEnded = function(player) {
       if(angular.isDefined(player)) {
         if(player.currentState == "ended" && $scope.isClipEnd == false) {
           $scope.isClipEnd = true;
           $scope.option.selectedOption = "markAsReviewed";
         }
         return player.currentState == "ended";
       } else {
         return false;
       }
    }
};

ReviewClipCtrl.$inject = ['$http', '$routeParams', '$scope', '$window', '$interval'];
angular.module('imctubeApp').controller('ReviewClipCtrl', ReviewClipCtrl);
