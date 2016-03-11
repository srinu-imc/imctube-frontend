function AddMovieCtrl($http, $scope, $window, toastr) {

  $scope.submit = function(movie) {

    if(angular.isDefined(movie.id)) {
      $http.put("/imctube/webapi/movies/" + movie.id, movie)
          .then(function(data) {
            toastr.success("Successfully updated movie info!!");
            $window.open('#addmovie', '_self');
          }, function(data) {

          });
    } else {
      $http.post("/imctube/webapi/movies", movie)
          .then(function(data) {
            toastr.success("Successfully added movie to database!!");
            $window.open('#addmovie', '_self')
        // Success  nothing to do here
          }, function(data) {
            console.log("Fail" + data);
          });
      }
  }
}

AddMovieCtrl.$inject = ['$http', '$scope', '$window', 'toastr'];
angular.module('imctubeApp').controller('AddMovieCtrl', AddMovieCtrl);