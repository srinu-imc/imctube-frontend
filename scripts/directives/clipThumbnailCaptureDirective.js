angular.module('imctubeApp')
  .directive("clipThumbnails", function() {
    return {
      restrict: 'E',
      templateUrl: 'view/clip-thumbnail-capture.html',
      controller: function($scope) {
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.totalPages = -1;

        $scope.init = function(totalImages) {
          var pages = totalImages / $scope.pageSize;
          if (totalImages % $scope.pageSize === 0) {
            $scope.totalPages = totalImages / $scope.pageSize;
          }  else {
            $scope.totalPages = totalImages/ $scope.pageSize + 1;
          }
        }

        $scope.isFirstPage = function() {
          return $scope.currentPage === 0;
        }

        $scope.isLastPage = function() {
          return $scope.currentPage === $scope.totalPages - 1;
        }

        $scope.select = function(thumbnail, clip) {
           clip.thumbnails.push(thumbnail);
        }

        $scope.nextPage = function() {
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