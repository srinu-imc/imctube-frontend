(function() {
  var app = angular.module('movie-directives', ['youtube-embed']);

  // Youtube player directive which controls the youtube functions
  app.directive("youtubePlayer", function() {
    return {
      restrict: 'E',
      templateUrl: "view/youtube-player.html",
      controller: function() {
        this.playVideo = function(player) {
          player.playVideo();
        };

        this.pauseVideo = function(player) {
          player.pauseVideo();
        };

        this.playFromMovieStart = function(player) {
          player.seekTo(0, true);
        };

        this.backward = function(player) {
          player.seekTo(player.getCurrentTime() - 10, true);
        }

        this.forward = function(player) {
          player.seekTo(player.getCurrentTime() + 10, true);
        }

        this.playFromClipStart = function(player, clip) {
          player.seekTo(clip.startTime, true);
        };
      },
      controllerAs: 'ytPlayer'
    };  
  });

  app.directive("clipData", function() {
    return {
      restrict: 'E',
    templateUrl: 'view/clip-data-main.html',
    controller: function($scope, $http, $route) {

      angular.element(document).ready(function() {
        $('#rootwizard').bootstrapWizard({'tabClass': 'bwizard-steps',
          'onTabClick': function(tab, navigation, index) {
          },
          'onNext': function(tab, navigation, index) {
          },
          'onPrevious': function(tab, navigation, index) {
          }
        });
      });
    },
    controllerAs: 'clipData'
    };
  });

  app.directive("clipInfo", function() {
    return {
      restrict: 'E',
      templateUrl: 'view/clip-info-capture.html',
      controller: function() {
        this.edit = false;

        this.captureClipEndTime = function(player, clip) {
          clip.endTime = player.getCurrentTime();
          player.pauseVideo();
        };

        this.toggleEditMode = function() {
          this.edit = !this.edit;
        }
      },
      controllerAs: 'clipInfo'
    };
  });

  app.directive("clipArtists", function() {
    return {
      restrict: 'E',
      templateUrl: 'view/clip-artists-capture.html',
      controller: function() {
        this.addArtist = function(clip) {
          clip.artists.push(this.newArtist);
          this.newArtist = '';
        }
      },
      controllerAs: 'clipArtists'
    };
  });

  app.directive("clipThumbnails", function() {
    return {
      restrict: 'E',
      templateUrl: 'view/clip-thumbnail-capture.html',
      controller: function() {
        this.currentPage = 0;
        this.pageSize = 5;
        this.totalPages = -1;

        this.init = function(totalImages) {
          var pages = totalImages / this.pageSize;
          if (totalImages % this.pageSize === 0) {
            this.totalPages = totalImages / this.pageSize;
          }  else {
            this.totalPages = totalImages/ this.pageSize + 1;
          }
        }

        this.isFirstPage = function() {
          return this.currentPage === 0;
        }

        this.isLastPage = function() {
          return this.currentPage === this.totalPages - 1;
        }

        this.select = function(thumbnail, clip) {
           clip.thumbnails.push(thumbnail);
        }

        this.nextPage = function() {
          if(this.currentPage < this.totalPages - 1) {
            this.currentPage += 1;
          }
        }

        this.prevPage = function() {
          if(this.currentPage > 0) {
            this.currentPage -= 1;
          }
        }
      },
      controllerAs: 'clipThumbnails'
    };
  });

  app.directive("clipDialogues", function() {
    return {
      restrict: 'E',
      templateUrl: 'view/clip-dialogue-capture.html',
      controller: function() {
        this.dialogue = {};

        this.addDialogue = function(clip) {
          clip.dialogues.push(this.dialogue);
          this.dialogue = {};
        }
      },
      controllerAs: 'clipDialogues'
    };
  });

  app.directive("sideBar", function() {
    return {
      restrict: 'E',
      templateUrl: 'view/side-bar.html',
      controller: function() {
        this.currentTab = '';

        this.init = function(currentTab) {
          this.currentTab = currentTab;
        };

        this.setTab = function(tab) {
          this.currentTab = tab;
        };

        this.isSet = function(tab) {
          return this.currentTab === tab;
        }
      },
      controllerAs: 'sideBar'
    };
  });

  app.directive("movieDataCapture", ['$http', function($http) {
    return {
      restrict: 'E',
      templateUrl: 'view/movie-data-capture.html'
    };
  }]);

  app.directive('typeahead', function($timeout) {
    return {
      restrict: 'AEC',
      scope: {
        items: '=',
        prompt:'@',
        artist: '@',
        url: '@',
        model: '=',
        onSelect:'&'
      },
      link: function(scope,elem,attrs) {
        scope.handleSelection = function(selectedItem) {
          scope.model = angular.copy(selectedItem);
          scope.current = 0;
          scope.selected = true;
          $timeout(function() {
           scope.onSelect();
          },200);
        };
        scope.current = 0;
        scope.selected = true;
        scope.isCurrent = function(index) {
         return scope.current == index;
        };
        scope.setCurrent = function(index) {
         scope.current = index;
        };
        scope.changed = function() {
          if( scope.model.firstName === '') {
            scope.model = {};
            scope.selected = false;
          }
        }
      },
      templateUrl: 'view/typeahead.html',
    }
  });

})();  
