function ClipListCtrl($http, $scope, $routeParams, $q) {
  $scope.clips = [];
  $scope.page = 0;
  $scope.isLast = false;
  $scope.searchArtist = {};

  $http.get('/imctube/webapi/clips?page=' + $scope.page).success(function(data) {
    $scope.isLast = !data.hasMoreClips;
    filterClips(data.clips, $scope.clips);
  });

  isImage = function(index, src) {
      var deffered = $q.defer();
      var image = new Image();
      image.onerror = function() {
        deffered.resolve({"available" : false, "index" : index});
      };
      image.onload = function() {
        deffered.resolve({"available" : true, "index" : index});
      };
      image.src = src;
      return deffered.promise;
    }

  filterClips = function(clips, output) {
    for(var i =0; i< clips.length; i++) {
      isImage(i, clips[i].thumbnails[0]).then(function(result) {
        if(result.available == true) {
          output.push(clips[result.index]);
        }
      });
    }
  }

  $scope.getDuration = function(clip) {
    return (clip.endTime - clip.startTime) * 1000;
  }

  $scope.getTrimmedDescription = function(desc) {
    console.log(desc);
    if(!angular.isDefined(desc)) {
      return " ".repeat(80);
    } else if(desc.length < 80) {
      return desc.concat(" ".repeat(80 - desc.length));
    } else {
      return desc.substring(0, 80);
    }
  }

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
      filterClips(data.clips, $scope.clips);
    });
  }

  $scope.loadClips = function(artist) {
    $scope.page = 0;
    $scope.searchArtist = angular.copy(artist);
    $http.get('/imctube/webapi/artists/' + artist.id + '/clips?page=' + $scope.page).success(function(data) {
      $scope.isLast = !data.hasMoreClips;
      $scope.clips = [];
      filterClips(data.clips, $scope.clips);
    });
  }

  $scope.refresh = function() {
    $scope.page = 0;
    $scope.isLast = false;
    $scope.searchArtist = {};
    $http.get('/imctube/webapi/clips?page=' + $scope.page).success(function(data) {
      $scope.isLast = !data.hasMoreClips;
      $scope.clips = [];
      filterClips(data.clips, $scope.clips);
    });
  }
};

ClipListCtrl.$inject = ['$http', '$scope', '$routeParams', '$q'];
angular.module('imctubeApp').controller('ClipListCtrl', ClipListCtrl);
