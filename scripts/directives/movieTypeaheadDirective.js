angular.module('imctubeApp')
  .directive('movieTypeahead', function($timeout) {
    return {
      restrict: 'AEC',
      scope: {
        items: '=',
        prompt:'@',
        name: '@',
        model: '=',
        onSelect:'&'
      },
      link: function(scope,elem,attrs) {
        scope.handleSelection = function(selectedItem) {
          scope.model = angular.copy(selectedItem);
          console.log(scope.model);
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
          if( scope.model.name === '') {
            scope.model = {videoId : ''};
            scope.selected = false;
          }
        }
      },
      templateUrl: 'view/movie-typeahead.html',
    }
  });