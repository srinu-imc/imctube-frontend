angular.module('imctubeApp')
  .directive("clipThumbnails", function() {
    return {
      restrict: 'AEC',
      scope: {
        clip: '=',
        movie: '=',
        prevClip: '='
      },
      templateUrl: 'view/clip-thumbnail-capture.html',
      link: function(scope, elem, attrs) {
        scope.pageSize = 5;
        scope.totalPages = -1;

        scope.init = function() {
          // Initialize only once
          if(angular.isDefined(scope.currentPage)) {
            return;
          }
          if(!angular.isDefined(scope.movie.thumbnailCount) || !angular.isDefined(scope.prevClip.thumbnails)) {
            return;
          }
          var totalImages = scope.movie.thumbnailCount;
          var pages = totalImages / scope.pageSize;
          if (scope.movie.thumbnailCount % scope.pageSize === 0) {
            scope.totalPages = totalImages / scope.pageSize;
          }  else {
            scope.totalPages = totalImages/ scope.pageSize + 1;
          }

          if(angular.isDefined(scope.prevClip)) {
            scope.currentPage = scope.getLastSelectedIndex(scope.prevClip) / scope.pageSize;
          }
        }

        scope.getLastSelectedIndex = function (lastClip) {
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

        scope.isFirstPage = function() {
          scope.init();
          return scope.currentPage === 0;
        }

        scope.isLastPage = function() {
          scope.init();
          return scope.currentPage === scope.totalPages - 1;
        }

        scope.select = function(thumbnail) {
          scope.init();
          if(scope.clip.thumbnails.indexOf(thumbnail) == -1) {
            scope.clip.thumbnails.push(thumbnail);
          }
        }

        scope.nextPage = function() {
          scope.init();
          scope.totalPages = scope.movie.thumbnailCount / scope.pageSize;
          var lastPage = scope.getLastSelectedIndex(scope.prevClip) / scope.pageSize;
          if(lastPage > scope.currentPage) {
            scope.currentPage = lastPage;
          }
          if(scope.currentPage < scope.totalPages - 1) {
            scope.currentPage += 1;
          }
        }

        scope.prevPage = function() {
          scope.init();
          if(scope.currentPage > 0) {
            scope.currentPage -= 1;
          }
        }

        scope.deleteMe = function() {
          scope.clip.thumbnails.splice(this.$index,1);
        }
      }
    };
  });