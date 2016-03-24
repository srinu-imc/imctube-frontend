function ImctubeCtrl($http, $scope, toastr) {
  $scope.search = {};
  $scope.search.text = '';
}

ImctubeCtrl.$inject = ['$http', '$scope', 'toastr'];
angular.module('imctubeApp').controller('ImctubeCtrl', ImctubeCtrl);