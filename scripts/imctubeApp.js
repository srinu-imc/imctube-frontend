var app = angular.module('imctubeApp', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'ngRoute', 'satellizer', 'youtube-embed']);

app.config(function($routeProvider, $authProvider, $stateProvider, $urlRouterProvider) {
  $routeProvider
    .when("/", {
      templateUrl: 'view/artists.html',
      controller: 'ArtistListCtrl',
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
      controller: 'ArtistListCtrl',
      controllerAs: 'artistsCtrl'
    })

    .when("/artists/:artistId/movies", {
      templateUrl: 'view/movies.html',
      controller: 'MovieListCtrl',
      controllerAs: 'moviesCtrl'
    })

    .when("/artists/:artistId/movies/:movieId/clips", {
      templateUrl: 'view/clips.html',
      controller: 'ClipListCtrl',
      controllerAs: 'clipsCtrl'
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