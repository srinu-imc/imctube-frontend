(function() {
  var app = angular.module('imctubeApp', ['movie-directives', "ngRoute"]);

  app.config(function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: 'view/actors.html',
        controller: 'ActorListController',
        controllerAs: 'actorsCtrl'
      })

      .when("/actors/", {
        templateUrl: 'view/actors.html',
        controller: 'ActorListController',
        controllerAs: 'actorsCtrl'
      })

      .when("/actors/:actorId/movies", {
        templateUrl: 'view/movies.html',
        controller: 'MovieListController',
        controllerAs: 'moviesCtrl'
      })

      .when("/actors/:actorId/movies/:movieId/clips", {
        templateUrl: 'view/clips.html',
        controller: 'ClipListController',
        controllerAs: 'clipsCtrl'
      })

      .when("/singers/", {
        templateUrl: 'view/singers.html',
        controller: 'SingerListController',
        controllerAs: 'singersCtrl'
      })

      .when("/movies/", {
        templateUrl: 'view/movies.html',
        controller: 'MovieListController',
        controllerAs: 'moviesCtrl'
      })

      .when("/movies/:movieId/clips", {
        templateUrl: 'view/clips.html',
        controller: 'ClipListController',
        controllerAs: 'clipsCtrl'
      })

      .when("/clips/", {
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

      .when("/addactor/", {
        templateUrl: 'view/add-actor.html',
        controller: 'AddActorController',
        controllerAs: 'actorCtrl'
      })

      .when("/addmovie/", {
        templateUrl: 'view/add-movie.html'
      })
  });

  app.controller('MovieListController', ['$http', '$routeParams', function($http, $routeParams) {
    var imctube = this;
    imctube.movies = [];

    $http.get('/imctube/webapi/movies').success(function(data) {
      imctube.movies = data;
    });

    imctube.getUrl = function(movieId) {
      var url = '';
      if(angular.isDefined($routeParams.actorId)) {
        url =  "#actors/" + $routeParams.actorId + "/movies/" + movieId + "/clips";
      } else {
        url = "#movies/" + movieId + "/clips";
      }
      return url;
    }
  }]);

  app.controller('ClipifyListController', ['$http', '$routeParams', function($http, $routeParams) {
    var imctube = this;
    imctube.movies = [];

    $http.get('/imctube/webapi/movies').success(function(data) {
      imctube.movies = data;
    });
  }]);

  app.controller('ClipListController', ['$http', '$routeParams', function($http, $routeParams) {
    var imctube = this;
    imctube.clips = [];

    $http.get('resources/data/clip-list.json').success(function(data) {
      // TODO(vsr): Query backend
      // console.log("movieId" + $routeParams.movieId);
      // console.log("actorId" + $routeParams.actorId);
      // Query backend based on the routeParams
      imctube.clips = data;
    });
  }]);

  app.controller('ClipPlayerController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
    $scope.clips = [];
    $scope.clipToPlay = {};

    $http.get('resources/data/clip-list.json').success(function(data) {
      $scope.clips = data;
      $scope.clipToPlay = $scope.clips[$routeParams.clipId];
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


  app.controller('ActorListController', ['$http', function($http) {
    var imctube = this;
    imctube.actors = [];

    $http.get('/imctube/webapi/artists').success(function(data) {
      imctube.actors = data;
    });
  }]);

  app.controller('SingerListController', ['$http', function($http) {
    var imctube = this;
    imctube.singers = [];

    $http.get('resources/data/singer-list.json').success(function(data) {
      imctube.singers = data;
    });
  }]);

  app.controller('ClipifyController', ['$http', '$routeParams', function($http, $routeParams) {
    var imctube = this;
    imctube.movie = {};
    imctube.currentClip = {
      actors : [],
      actorIds: [],
      thumbnails: [],
      dialogues: [],
    };

    $http.get('/imctube/webapi/movies/' + $routeParams.movieId).success(function(data) {
      imctube.movie = data;
      console.log(imctube.movie);
    });
  }]);

  app.controller('AddMovieController', ['$http', function($http) {
    this.movie = {videoId : ''};

    this.submit = function() {
      $http.post("/imctube/webapi/movies", this.movie)
        .then(function(data) {
          console.log("Success " + data);
        }, function(data) {
          console.log("Fail" + data);
        });
      console.log(this.movie);
      this.movie = {videoId : ''};
    }
  }]);

  app.controller('TypeAheadController', function($scope, $http) {
    $http.get('/imctube/webapi/artists').success(function(data) {
      $scope.items = data;
    });
    $scope.artist = {};
    $scope.onItemSelectedToList = function(clip) {
      clip.actorIds.push($scope.artist.id);
      clip.actors.push($scope.artist);
      $scope.artist = {};
    }

    $scope.onItemSelected = function(dialogue) {
      dialogue.artist = $scope.artist;
      dialogue.artistId = $scope.artist.id;
    }
  });

  app.controller('AddActorController', ['$http', function($http) {
   this.actor = {};

    this.submit = function() {
      $http.post("/imctube/webapi/artists", this.actor)
        .then(function(data) {
          console.log("Success " + data);
        }, function(data) {
          console.log("Failure" + data);
        });
      this.actor = {};
      console.log(this.actor);
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
