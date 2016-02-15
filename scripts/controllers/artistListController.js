function ArtistListCtrl($http, $scope) {
  $scope.artists = [];

  $http.get('/imctube/webapi/artists?onlyHaveMovies=true').success(function(data) {
    $scope.artists = data;
  });

  $scope.getUrl= function(artist) {
    if(angular.isDefined(artist.thumbnail)) {
      return artist.thumbnail;
    } else {
      return "resources/artists/noprofile.jpg";
    }
  }
};

ArtistListCtrl.$inject = ['$http', '$scope'];
angular.module('imctubeApp').controller('ArtistListCtrl', ArtistListCtrl);
