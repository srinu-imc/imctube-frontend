angular.module('imctubeApp')
  .directive("clipDialogues", function() {
    return {
      restrict: 'E',
      templateUrl: 'view/clip-dialogue-capture.html',
      controller: function($scope) {
        $scope.dialogue = {};

        $scope.addDialogue = function(clip) {
          clip.dialogues.push($scope.dialogue);
          $scope.dialogue = {};
        }
      },
      controllerAs: 'clipDialogues'
    };
  });