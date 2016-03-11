function AddArtistCtrl($http, $scope, toastr) {
  $scope.submit = function(artist) {

    if(angular.isDefined(artist.id)) {
      $http.put("/imctube/webapi/artists/" + artist.id , artist)
      .then(function(data) {
        toastr.success("Successfully updated artist info!!");
        // Success nothing to do here
      }, function(data) {
        toastr.error("Failed to add artist to database. Please Re-enter!!");
        console.log("Failure" + data);
      });
    } else {
      $http.post("/imctube/webapi/artists", artist)
      .then(function(data) {
        toastr.success("Successfully added artist to database");
        // Success nothing to do here
      }, function(data) {
        toastr.error("Failed to update artist info, Please Re-enter!!");
        console.log("Failure" + data);
      });
    }
  }
}

AddArtistCtrl.$inject = ['$http', '$scope', 'toastr'];
angular.module('imctubeApp').controller('AddArtistCtrl', AddArtistCtrl);