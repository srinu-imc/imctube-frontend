function AddArtistCtrl($http, $scope) {
  $scope.artist = {};

  $scope.submit = function() {
    $http.post("/imctube/webapi/artists", $scope.artist)
      .then(function(data) {
        // Success nothing to do here
      }, function(data) {
        console.log("Failure" + data);
      });
    this.artist = {};
  }
}

AddArtistCtrl.$inject = ['$http', '$scope'];
angular.module('imctubeApp').controller('AddArtistCtrl', AddArtistCtrl);