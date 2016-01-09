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

      .when("/clips/:clipId", {
        templateUrl: 'view/clip-player.html',
        controller: 'ClipPlayerController',
        controllerAs: 'clipPlayerCtrl'
      })

      .when("/clips/", {
        templateUrl: 'view/clips.html',
        controller: 'ClipListController',
        controllerAs: 'clipsCtrl'
      })

      .when("/clipify/", {
        templateUrl: 'view/clipify.html',
        controller: 'ClipifyController',
        contrllerAs: 'movieCtrl'
      })

      .when("/addactor/", {
        templateUrl: 'view/add-actor.html'
      })

      .when("/addmovie/", {
        templateUrl: 'view/add-movie.html'
      })
  });

  app.controller('MovieListController', ['$http', function($http) {
    var imctube = this;
    imctube.movies = [];

    $http.get('resources/data/movie-list.json').success(function(data) {
      imctube.movies = data;
    });
  }]);

  app.controller('ClipListController', ['$http', function($http) {
    var imctube = this;
    imctube.clips = [];

    $http.get('resources/data/clip-list.json').success(function(data) {
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
        $scope.player.playVideo();
      }
    });
  }]);


  app.controller('ActorListController', ['$http', function($http) {
    var imctube = this;
    imctube.actors = [];

    $http.get('resources/data/actor-list.json').success(function(data) {
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

  app.controller('ClipifyController', ['$http', function($http) {
    var imctube = this;
    imctube.movie = {};
    imctube.currentClip = {
      actors : [],
      singers : [],
      thumbnails: [],
      dialogues: [],
    };

    $http.get('resources/data/movies.json').success(function(data) {
      imctube.movie = data;
    });
  }]);

  app.controller('AddMovieController', function() {
    var imctube = this;
    imctube.movie = {videoId : ''};
  });

  app.controller('AddActorController', function() {
   this.actor = {};

    this.submit = function() {
      //(TODO:vsr) Write data to backend
      console.log(this.actor);
    }
  });

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
