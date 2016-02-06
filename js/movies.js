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
          $('#rootwizard').find("a[href*='thumbnails']").trigger('click');
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

  app.directive('passwordMatch', function() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=passwordMatch'
      },
      link: function(scope, element, attributes, ngModel) {
        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue === scope.otherModelValue;
        };
        scope.$watch('otherModelValue', function() {
          ngModel.$validate();
        });
      }
    };
  });

  app.directive('passwordStrength', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        var indicator = element.children();
        var dots = Array.prototype.slice.call(indicator.children());
        var weakest = dots.slice(-1)[0];
        var weak = dots.slice(-2);
        var strong = dots.slice(-3);
        var strongest = dots.slice(-4);

        element.after(indicator);

        element.bind('keyup', function() {
          var matches = {
                positive: {},
                negative: {}
              },
              counts = {
                positive: {},
                negative: {}
              },
              tmp,
              strength = 0,
              letters = 'abcdefghijklmnopqrstuvwxyz',
              numbers = '01234567890',
              symbols = '\\!@#$%&/()=?¿',
              strValue;

          angular.forEach(dots, function(el) {
            el.style.backgroundColor = '#ebeef1';
          });

          if (ngModel.$viewValue) {
            // Increase strength level
            matches.positive.lower = ngModel.$viewValue.match(/[a-z]/g);
            matches.positive.upper = ngModel.$viewValue.match(/[A-Z]/g);
            matches.positive.numbers = ngModel.$viewValue.match(/\d/g);
            matches.positive.symbols = ngModel.$viewValue.match(/[$-/:-?{-~!^_`\[\]]/g);
            matches.positive.middleNumber = ngModel.$viewValue.slice(1, -1).match(/\d/g);
            matches.positive.middleSymbol = ngModel.$viewValue.slice(1, -1).match(/[$-/:-?{-~!^_`\[\]]/g);

            counts.positive.lower = matches.positive.lower ? matches.positive.lower.length : 0;
            counts.positive.upper = matches.positive.upper ? matches.positive.upper.length : 0;
            counts.positive.numbers = matches.positive.numbers ? matches.positive.numbers.length : 0;
            counts.positive.symbols = matches.positive.symbols ? matches.positive.symbols.length : 0;

            counts.positive.numChars = ngModel.$viewValue.length;
            tmp += (counts.positive.numChars >= 8) ? 1 : 0;

            counts.positive.requirements = (tmp >= 3) ? tmp : 0;
            counts.positive.middleNumber = matches.positive.middleNumber ? matches.positive.middleNumber.length : 0;
            counts.positive.middleSymbol = matches.positive.middleSymbol ? matches.positive.middleSymbol.length : 0;

            // Decrease strength level
            matches.negative.consecLower = ngModel.$viewValue.match(/(?=([a-z]{2}))/g);
            matches.negative.consecUpper = ngModel.$viewValue.match(/(?=([A-Z]{2}))/g);
            matches.negative.consecNumbers = ngModel.$viewValue.match(/(?=(\d{2}))/g);
            matches.negative.onlyNumbers = ngModel.$viewValue.match(/^[0-9]*$/g);
            matches.negative.onlyLetters = ngModel.$viewValue.match(/^([a-z]|[A-Z])*$/g);

            counts.negative.consecLower = matches.negative.consecLower ? matches.negative.consecLower.length : 0;
            counts.negative.consecUpper = matches.negative.consecUpper ? matches.negative.consecUpper.length : 0;
            counts.negative.consecNumbers = matches.negative.consecNumbers ? matches.negative.consecNumbers.length : 0;

            // Calculations
            strength += counts.positive.numChars * 4;
            if (counts.positive.upper) {
              strength += (counts.positive.numChars - counts.positive.upper) * 2;
            }
            if (counts.positive.lower) {
              strength += (counts.positive.numChars - counts.positive.lower) * 2;
            }
            if (counts.positive.upper || counts.positive.lower) {
              strength += counts.positive.numbers * 4;
            }
            strength += counts.positive.symbols * 6;
            strength += (counts.positive.middleSymbol + counts.positive.middleNumber) * 2;
            strength += counts.positive.requirements * 2;

            strength -= counts.negative.consecLower * 2;
            strength -= counts.negative.consecUpper * 2;
            strength -= counts.negative.consecNumbers * 2;

            if (matches.negative.onlyNumbers) {
              strength -= counts.positive.numChars;
            }
            if (matches.negative.onlyLetters) {
              strength -= counts.positive.numChars;
            }

            strength = Math.max(0, Math.min(100, Math.round(strength)));

            if (strength > 85) {
              angular.forEach(strongest, function(el) {
                el.style.backgroundColor = '#008cdd';
              });
            } else if (strength > 65) {
              angular.forEach(strong, function(el) {
                el.style.backgroundColor = '#6ead09';
              });
            } else if (strength > 30) {
              angular.forEach(weak, function(el) {
                el.style.backgroundColor = '#e09115';
              });
            } else {
              weakest.style.backgroundColor = '#e01414';
            }
          }
        });
      },
      template: '<span class="password-strength-indicator"><span></span><span></span><span></span><span></span></span>'
    };
  });

})();  
