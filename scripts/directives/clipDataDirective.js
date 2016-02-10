angular.module('imctubeApp')
  .directive("clipData", function() {
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