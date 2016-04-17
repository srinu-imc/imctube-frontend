function ClipListCtrl($http, $scope, $routeParams) {
  $scope.clips = [];
  $scope.page = 0;
  $scope.isLast = false;
  $scope.searchArtist = {};

  $http.get('/imctube/webapi/clips?page=' + $scope.page).success(function(data) {
    $scope.isLast = !data.hasMoreClips;
    $scope.clips.push.apply($scope.clips, data.clips);
  });

  $scope.loadNext = function() {
    $scope.page = $scope.page + 1;
    var query = '';
    if(angular.isDefined($scope.searchArtist.id)) {
      query = '/imctube/webapi/artists/' + $scope.searchArtist.id + '/clips?page=' + $scope.page;
    } else {
      query = '/imctube/webapi/clips?page=' + $scope.page;
    }

    $http.get(query).success(function(data) {
      $scope.isLast = !data.hasMoreClips;
      $scope.clips.push.apply($scope.clips, data.clips);
    });
  }

  $scope.loadClips = function(artist) {
    $scope.page = 0;
    $scope.searchArtist = angular.copy(artist);
    $http.get('/imctube/webapi/artists/' + artist.id + '/clips?page=' + $scope.page).success(function(data) {
      $scope.isLast = !data.hasMoreClips;
      $scope.clips = data.clips;
    });
  }

  $scope.refresh = function() {
    $scope.page = 0;
    $scope.isLast = false;
    $scope.searchArtist = {};
    $http.get('/imctube/webapi/clips?page=' + $scope.page).success(function(data) {
      $scope.isLast = !data.hasMoreClips;
      $scope.clips = data.clips;
    });
  }
};

ClipListCtrl.$inject = ['$http', '$scope', '$routeParams'];
angular.module('imctubeApp').controller('ClipListCtrl', ClipListCtrl);
