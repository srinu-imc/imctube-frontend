angular.module('imctubeApp')
  .directive("clipThumbnails", function() {
    return {
      restrict: 'E',
      templateUrl: 'view/clip-thumbnail-capture.html',
      controller: function($scope) {
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.totalPages = -1;

        $scope.init = function(totalImages, prevClip) {
          var pages = totalImages / $scope.pageSize;
          if (totalImages % $scope.pageSize === 0) {
            $scope.totalPages = totalImages / $scope.pageSize;
          }  else {
            $scope.totalPages = totalImages/ $scope.pageSize + 1;
          }

          if(angular.isDefined(prevClip)) {
            $scope.currentPage = $scope.getLastSelectedIndex(prevClip) / $scope.pageSize;
          }
        }

        $scope.getLastSelectedIndex = function (lastClip) {
          var re = /.*thumbnails-(\d*).jpeg/i;
          var max = 0;
          if(angular.isDefined(lastClip.thumbnails)) {
            for( i=0; i< lastClip.thumbnails.length; i++) {
              max = Math.max(max,lastClip.thumbnails[i].match(re)[1]);
            }
          } else {
            return 0;
          }
          return max;  
        }

        $scope.isFirstPage = function() {
          return $scope.currentPage === 0;
        }

        $scope.isLastPage = function() {
          return $scope.currentPage === $scope.totalPages - 1;
        }

        $scope.select = function(thumbnail, clip) {
          if(clip.thumbnails.indexOf(thumbnail) == -1) {
            clip.thumbnails.push(thumbnail);
          }
        }

        $scope.nextPage = function(movie, prevClip) {
          $scope.totalPages = movie.thumbnailCount / $scope.pageSize;
          var lastPage = $scope.getLastSelectedIndex(prevClip) / $scope.pageSize;
          if(lastPage > $scope.currentPage) {
            $scope.currentPage = lastPage;
          }
          if($scope.currentPage < $scope.totalPages - 1) {
            $scope.currentPage += 1;
          }
        }

        $scope.prevPage = function() {
          if($scope.currentPage > 0) {
            $scope.currentPage -= 1;
          }
        }
      },
      controllerAs: 'clipThumbnails'
    };
  });