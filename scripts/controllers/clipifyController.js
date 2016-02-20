function ClipifyCtrl($http, $routeParams, $route, $scope, $interval, $window) {
  $scope.movie = {};
  $scope.lastClipOfMovie = false;
  $scope.currentClip = {
    artists : [],
    artistIds: [],
    thumbnails: [],
    dialogues: [],
    startTime: 0.01,
  };
  $scope.prevClip = {};

  $interval(function() {
    if(angular.isDefined($scope.movie.player.getCurrentTime)) {
      $scope.duration =
        ($scope.movie.player.getCurrentTime() - $scope.currentClip.startTime) * 1000;
    }
  }, 1000);

  $http.get('/imctube/webapi/movies/' + $routeParams.movieId)
      .success(function(data) {
        $scope.movie = data;
      });

  $http.post('/imctube/webapi/clipify/'+ $routeParams.movieId)
      .success(function(data) {
        $scope.prevClip = data;
        if(angular.isDefined($scope.prevClip.endTime)) {
          $scope.currentClip.startTime = $scope.prevClip.endTime;
        } else {
          $scope.currentClip.startTime = 0.01;
        }
      });

  $scope.$watch(function() {
    if(angular.isDefined($scope.movie.player)) {
      return $scope.movie.player.seekTo;
    } else {
      return null;
    }
  }, function(newValue) {
    if(angular.isDefined(newValue) && angular.isDefined($scope.movie.player)) {
      $scope.movie.player.seekTo($scope.currentClip.startTime, true);
    }
  });

  $scope.isLast5Min = function() {
    if(angular.isDefined($scope.movie.player.getDuration)) {
      return (($scope.movie.player.getDuration() - $scope.currentClip.startTime) < 300.0);
    } else {
      return false;
    }
  };

  $scope.submitClip =  function() {
    delete $scope.currentClip.artists;
    console.log("is last clip of movie " + $scope.lastClipOfMovie);
    $scope.currentClip.movieId = $scope.movie.id;
    $scope.currentClip.movieName = $scope.movie.name;
    $scope.currentClip.videoId = $scope.movie.videoId;
    $http.post('/imctube/webapi/clipify/' + $scope.movie.id + '/clips?isLastClip=' + $scope.lastClipOfMovie, $scope.currentClip)
        .then(function(data) {
        }, function(data) {
          console.log("Failed" + data);
        });

    $scope.prevClip = $scope.currentClip;
    $scope.currentClip = {
      artists : [],
      artistIds: [],
      thumbnails: [],
      dialogues: [],
      startTime: $scope.prevClip.endTime
    };

    $scope.movie.player.seekTo($scope.currentClip.startTime, true);
    $scope.movie.player.playVideo();

    if($scope.lastClipOfMovie) {
      $window.open('#clipify', "_self");
    } else {
      $('#rootwizard').find("a[href*='dialogues']").trigger('click');
    }
  };
};

ClipifyCtrl.$inject = ['$http', '$routeParams', '$route', '$scope', '$interval', '$window'];
angular.module('imctubeApp').controller('ClipifyCtrl', ClipifyCtrl);