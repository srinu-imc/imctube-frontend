function ClipifyCtrl($http, $routeParams, $route, $scope) {
  $scope.movie = {};
  $scope.currentClip = {
    artists : [],
    artistIds: [],
    thumbnails: [],
    dialogues: [],
    startTime: 0.01,
  };

  $http.get('/imctube/webapi/movies/' + $routeParams.movieId)
      .success(function(data) {
        $scope.movie = data;
      });

  $http.post('/imctube/webapi/clipify/'+ $routeParams.movieId)
      .success(function(data) {
        $scope.prevClip = data;
        $scope.currentClip.startTime = $scope.prevClip.endTime;
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

  $scope.submitClip =  function() {
    delete $scope.currentClip.artists;
    $scope.currentClip.movieId = $scope.movie.id;
    $scope.currentClip.movieName = $scope.movie.name;
    $scope.currentClip.videoId = $scope.movie.videoId;
    $http.post('/imctube/webapi/clipify/' + $scope.movie.id + '/clips', $scope.currentClip)
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

    $('#rootwizard').find("a[href*='dialogues']").trigger('click');
  };
};

ClipifyCtrl.$inject = ['$http', '$routeParams', '$route', '$scope'];
angular.module('imctubeApp').controller('ClipifyCtrl', ClipifyCtrl);