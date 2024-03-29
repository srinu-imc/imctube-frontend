angular.module('imctubeApp')
  .directive('typeahead', function($timeout) {
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
          if( scope.model.industryName === '') {
            scope.model = {};
            scope.selected = false;
          }
        }

        scope.getUrl= function(item) {
          if(angular.isDefined(item[scope.url])) {
            return item[scope.url];
          } else {
            return "https://s3.amazonaws.com/imctube/artists/noprofile.jpg";
          }
        }
      },
      templateUrl: 'view/typeahead.html',
    }
  });
