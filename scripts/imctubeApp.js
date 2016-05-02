var app = angular.module('imctubeApp', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'ngRoute', 'satellizer', 'youtube-embed', 'ui.bootstrap']);

app.config(function($routeProvider, $authProvider, $stateProvider, $urlRouterProvider) {
  $routeProvider
    .when("/", {
      templateUrl: 'view/clips.html',
      controller: 'ClipListCtrl',
      controllerAs: 'clipsCtrl'
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

    .when("/artists", {
      templateUrl: 'view/artists.html',
      controller: 'ArtistListCtrl',
      controllerAs: 'artistsCtrl'
    })

    .when("/artists/:artistId/movies", {
      templateUrl: 'view/movies.html',
      controller: 'MovieListCtrl',
      controllerAs: 'moviesCtrl'
    })

    .when("/artists/:artistId/movies/:movieId/clips", {
      templateUrl: 'view/three-click-clips.html',
      controller: 'ThreeClickClipListCtrl',
      controllerAs: 'threeClickClipsCtrl'
    })

    .when("/clips/:clipId", {
      templateUrl: 'view/clip-player.html',
      controller: 'ClipPlayerCtrl',
      controllerAs: 'clipPlayerCtrl'
    })

    .when("/clipify/", {
      templateUrl: 'view/clipify-movie-list.html',
      controller: 'ClipifyListCtrl',
      controllerAs: 'moviesCtrl'
    })

    .when("/clipify/:movieId", {
      templateUrl: 'view/clipify.html',
      controller: 'ClipifyCtrl',
      controllerAs: 'movieCtrl'
    })

    .when("/review/", {
      templateUrl: 'view/review-movie-list.html',
      controller: 'ReviewListCtrl',
      controllerAs: 'reviewListCtrl'
    })

    .when("/review/:movieId", {
      templateUrl: 'view/review-clip-list.html',
      controller: 'ReviewClipListCtrl',
      controllerAs: 'reviewClipListCtrl'
    })

    .when("/review/clips/:clipId", {
      templateUrl: 'view/review-clip.html',
      controller: 'ReviewClipCtrl',
      controllerAs: 'reviewClipCtrl'
    })

    .when("/addartist/", {
      templateUrl: 'view/add-artist.html',
      controller: 'AddArtistCtrl',
      controllerAs: 'artistCtrl'
    })

    .when("/addmovie/", {
      templateUrl: 'view/add-movie.html',
      controller: "AddMovieCtrl"
    });

  $authProvider.loginUrl = "imctube/webapi/auth/login";
  $authProvider.signupUrl = "imctube/webapi/auth/signup";

  $authProvider.facebook({
    clientId: '1142674112432615',
    // (local) clientId: '1691017817849603',
    url: 'imctube/webapi/auth/facebook'
  });

  $authProvider.google({
    clientId: '193687136528-76hsdchcjaktsvt26kph7qp70p62etrk.apps.googleusercontent.com',
    url: 'imctube/webapi/auth/google'
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
