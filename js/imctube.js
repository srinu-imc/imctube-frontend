(function() {
  var app = angular.module('imctubeApp', ['movie-directives']);

  app.controller('MovieController', ['$http', function($http) {
    var imctube = this;
    imctube.movie = {};
    imctube.currentClip = {};

    $http.get('resources/data/movies.json').success(function(data) {
      imctube.movie = data;
    });
  }]);
})();

