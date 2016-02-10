angular.module('imctubeApp')
  .controller('NavbarCtrl', function($scope, $auth) {
    $scope.currentTab = '';

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.init = function(currentTab) {
      $scope.currentTab = currentTab;
    };

    $scope.setTab = function(tab) {
      $scope.currentTab = tab;
    };

    $scope.isSet = function(tab) {
      return $scope.currentTab === tab;
    }
  });