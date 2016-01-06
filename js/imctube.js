(function() {
  var app = angular.module('imctubeApp', ['movie-directives']);

  app.controller('MovieController', ['$http', function($http) {
    var imctube = this;
    imctube.movie = {};
    imctube.currentClip = {
      actors : [],
      singers : [],
      thumbnails: []
    };

    $http.get('resources/data/movies.json').success(function(data) {
      imctube.movie = data;
    });
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
})();

