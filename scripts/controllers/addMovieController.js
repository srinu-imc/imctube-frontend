function AddMovieCtrl($http, $scope) {
  $scope.movie = {videoId : ''};

  $scope.submit = function() {
    $http.post("/imctube/webapi/movies", $scope.movie)
        .then(function(data) {
          // Success  nothing to do here
        }, function(data) {
          console.log("Fail" + data);
        });
    $scope.movie = {videoId : ''};
  }
}

AddMovieCtrl.$inject = ['$http', '$scope'];
angular.module('imctubeApp').controller('AddMovieCtrl', AddMovieCtrl);