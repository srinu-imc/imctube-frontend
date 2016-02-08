(function() {
  var app = angular.module('imctubeApp', ['movie-directives', 'ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'ngRoute', 'satellizer']);

  app.config(function($routeProvider, $authProvider, $stateProvider, $urlRouterProvider) {
    $routeProvider
      .when("/", {
        templateUrl: 'view/artists.html',
        controller: 'ArtistListController',
        controllerAs: 'artistsCtrl'
      })

      .when("/login", {
        templateUrl: 'view/login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })

      .when('/signup', {
        templateUrl: 'view/signup.html',
        controller: 'SignupCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })

      .when('/logout', {
        template: null,
        controller: 'LogoutCtrl'
      })

      .when("/artists/", {
        templateUrl: 'view/artists.html',
        controller: 'ArtistListController',
        controllerAs: 'artistsCtrl'
      })

      .when("/artists/:artistId/movies", {
        templateUrl: 'view/movies.html',
        controller: 'MovieListController',
        controllerAs: 'moviesCtrl'
      })

      .when("/artists/:artistId/movies/:movieId/clips", {
        templateUrl: 'view/clips.html',
        controller: 'ClipListController',
        controllerAs: 'clipsCtrl'
      })

      .when("/clips/:clipId", {
        templateUrl: 'view/clip-player.html',
        controller: 'ClipPlayerController',
        controllerAs: 'clipPlayerCtrl'
      })

      .when("/clipify/", {
        templateUrl: 'view/clipify-movie-list.html',
        controller: 'ClipifyListController',
        controllerAs: 'moviesCtrl'
      })

      .when("/clipify/:movieId", {
        templateUrl: 'view/clipify.html',
        controller: 'ClipifyController',
        controllerAs: 'movieCtrl'
      })

      .when("/addartist/", {
        templateUrl: 'view/add-artist.html',
        controller: 'AddArtistController',
        controllerAs: 'artistCtrl'
      })

      .when("/addmovie/", {
        templateUrl: 'view/add-movie.html'
      });

    $authProvider.loginUrl = "imctube/webapi/auth/login";
    $authProvider.signupUrl = "imctube/webapi/auth/signup";

    $authProvider.facebook({
      clientId: '1691017817849603',
      url: 'imctube/webapi/auth/facebook'
    });

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }
  });

  app.controller('NavbarCtrl', function($scope, $auth) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

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
  });

  app.controller('LoginCtrl', function($scope, $location, $auth, toastr) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          toastr.success('You have successfully signed in!');
          $location.path('/');
        })
        .catch(function(error) {
          toastr.error(error.data.message, error.status);
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          toastr.success('You have successfully signed in with ' + provider + '!');
          $location.path('/');
        })
        .catch(function(error) {
          if (error.error) {
            // Popup error - invalid redirect_uri, pressed cancel button, etc.
            toastr.error(error.error);
          } else if (error.data) {
            // HTTP response error from server
            toastr.error(error.data.message, error.status);
          } else {
            toastr.error(error);
          }
        });
    };
  });

  app.controller('LogoutCtrl', function($location, $auth, toastr) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
      .then(function() {
        toastr.info('You have been logged out');
        $location.path('/');
      });
  });

  app.controller('SignupCtrl', function($scope, $location, $auth, toastr) {
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $location.path('/');
          toastr.info('You have successfully created a new account and have been signed-in');
        })
        .catch(function(response) {
          toastr.error(response.data.message);
        });
    };
  });

  app.controller('MovieListController', ['$http', '$routeParams', function($http, $routeParams) {
    var imctube = this;
    imctube.movies = [];

    if(angular.isDefined($routeParams.artistId)) {
      $http.get('/imctube/webapi/artists/' + $routeParams.artistId + '/movies').success(function(data) {
        imctube.movies = data;
      });
    } else {
      $http.get('/imctube/webapi/movies').success(function(data) {
        imctube.movies = data;
      });
    } 

    imctube.getUrl = function(movieId) {
      var url = '';
      if(angular.isDefined($routeParams.artistId)) {
        url =  "#artists/" + $routeParams.artistId + "/movies/" + movieId + "/clips";
      } else {
        url = "#movies/" + movieId + "/clips";
      }
      return url;
    }
  }]);

  app.controller('ClipifyListController', ['$http', '$routeParams', function($http, $routeParams) {
    var imctube = this;
    imctube.movies = [];

    $http.get('/imctube/webapi/clipify').success(function(data) {
      imctube.movies = data;
    });
  }]);

  app.controller('ClipListController', ['$http', '$routeParams', function($http, $routeParams) {
    var imctube = this;
     imctube.clips = [];
 
    $http.get('/imctube/webapi/artists/' + $routeParams.artistId + '/movies/' + $routeParams.movieId + '/clips').success(function(data) {
      imctube.clips = data;
    });
  }]);

  app.controller('ClipPlayerController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
    $scope.clipToPlay = {};

    $http.get('/imctube/webapi/clips/' + $routeParams.clipId).success(function(data) {
      $scope.clipToPlay = data;
    });

    $scope.$watch('player.playVideo', function() {
      if(angular.isDefined($scope.player) && angular.isDefined($scope.player.playVideo)) {
        $scope.player.loadVideoById({
          'videoId': $scope.clipToPlay.videoId,
          'startSeconds' : $scope.clipToPlay.startTime,
          'endSeconds' : $scope.clipToPlay.endTime
        });
        $scope.player.playVideo();
      }
    });
  }]);


  app.controller('ArtistListController', ['$http', function($http) {
    var imctube = this;
    imctube.artists = [];

    $http.get('/imctube/webapi/artists').success(function(data) {
      imctube.artists = data;
    });
  }]);

  app.controller('ClipifyController', ['$http', '$routeParams', '$route', '$scope', function($http, $routeParams, $route, $scope) {
    var imctube = this;
    imctube.movie = {};
    imctube.currentClip = {
      artists : [],
      artistIds: [],
      thumbnails: [],
      dialogues: [],
      startTime: 0.01,
    };

    $http.get('/imctube/webapi/movies/' + $routeParams.movieId).success(function(data) {
      imctube.movie = data;
    });

    $http.post('/imctube/webapi/clipify/'+ $routeParams.movieId).success(function(data) {
      imctube.prevClip = data;
      imctube.currentClip.startTime = imctube.prevClip.endTime;
    });

    $scope.$watch(function() {
      if(angular.isDefined(imctube.movie.player)) {
        return imctube.movie.player.seekTo;
      } else {
        return null;
      }
    }, function(newValue) {
      if(angular.isDefined(newValue) && angular.isDefined(imctube.movie.player)) {
        imctube.movie.player.seekTo(imctube.currentClip.startTime, true);
      }
    });    

    imctube.submitClip =  function() {
      delete imctube.currentClip.artists;
      imctube.currentClip.movieId = imctube.movie.id;
      imctube.currentClip.movieName = imctube.movie.name;
      imctube.currentClip.videoId = imctube.movie.videoId;
      $http.post('/imctube/webapi/clipify/' + imctube.movie.id + '/clips', imctube.currentClip)
        .then(function(data) {
        }, function(data) {
          console.log("Failed" + data);
        });

      imctube.prevClip = imctube.currentClip;  
      imctube.currentClip = {
        artists : [],
        artistIds: [],
        thumbnails: [],
        dialogues: [],
        startTime: imctube.prevClip.endTime
      };
      imctube.movie.player.seekTo(imctube.currentClip.startTime, true);
      imctube.movie.player.playVideo();

      $('#rootwizard').find("a[href*='dialogues']").trigger('click');
    };

  }]);

  app.controller('AddMovieController', ['$http', function($http) {
    this.movie = {videoId : ''};

    this.submit = function() {
      $http.post("/imctube/webapi/movies", this.movie)
        .then(function(data) {
        }, function(data) {
          console.log("Fail" + data);
        });
      this.movie = {videoId : ''};
    }
  }]);

  app.controller('TypeAheadController', function($scope, $http) {
    $http.get('/imctube/webapi/artists').success(function(data) {
      $scope.items = data;
    });
    $scope.artist = {};
    $scope.onItemSelectedToList = function(clip) {
      clip.artistIds.push($scope.artist.id);
      clip.artists.push($scope.artist);
      $scope.artist = {};
    }

    $scope.onItemSelected = function(dialogue) {
      dialogue.artist = $scope.artist;
      dialogue.artistId = $scope.artist.id;
    }
  });

  app.controller('AddArtistController', ['$http', function($http) {
   this.artist = {};

    this.submit = function() {
      $http.post("/imctube/webapi/artists", this.artist)
        .then(function(data) {
        }, function(data) {
          console.log("Failure" + data);
        });
      this.artist = {};
    }
  }]);

  app.filter('pagination', function() {
    return function(input, start) {
      if (!input || !input.length) {
       return;
      }
      start = +start;
      return input.slice(start);
    };
  });

  app.filter('range', function() {
    return function(input, total) {
      total = parseInt(total);

      for (var i=1; i<=total; i++) {
        input.push(i);
      }
      return input;
    };
  });

})();
