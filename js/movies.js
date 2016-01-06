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
    controller: function() {

      angular.element(document).ready(function() {
        $('#rootwizard').bootstrapWizard({'tabClass': 'bwizard-steps',
          'onTabClick': function(tab, navigation, index) {
            return false;
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

        this.captureClipStartTime = function(player, clip) {
          clip.startTime = player.getCurrentTime();
        };

        this.captureClipEndTime = function(player, clip) {
          clip.endTime = player.getCurrentTime();
        };
      },
      controllerAs: 'clipInfo'
    };
  });
  
})();  
