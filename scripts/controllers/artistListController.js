angular.module('imctubeApp').controller('ArtistListCtrl', ArtistListCtrl);

function ArtistListCtrl($http, $scope) {
	$scope.artists = [];

  $http.get('/imctube/webapi/artists').success(function(data) {
    $scope.artists = data;
  });
};

ArtistListCtrl.$inject = ['$http', '$scope'];