function ReviewClipCtrl($http, $routeParams, $scope, $window) {
  console.log("clipId " + $routeParams.clipId);
  // load movie
  // load movie actors
  // load clip actors and show them
  // show them
  // end clip here and options to do with that
  // 
  $scope.movie = {};
  $scope.currentClip = {};
  $scope.option = {};
  $scope.option.selectedOption = 'newClip';
  $scope.isClipCut = false;
  $scope.isClipEnd = false;

   	$http.get('/imctube/webapi/clips/' + $routeParams.clipId).success(function(currentClip) {
    	$scope.currentClip = currentClip;

    	$http.get('/imctube/webapi/clips/' + currentClip.clipId + '/artists')
    			.success(function(artists) {
    				$scope.currentClip.artists = artists;
    			});
    	  $http.get('/imctube/webapi/movies/' + currentClip.movieId)
		      .success(function(data) {
        		$scope.movie = data;

	        $http.get('/imctube/webapi/movies/' + currentClip.movieId + '/artists')
	            .success(function(artists) {
	              $scope.movie.artists = artists;
	              $scope.movie.artistIds = [];

	              for(var i=0; i<artists.length; i++) {
	                $scope.movie.artistIds.push(artists[i].id);
	              }
	            });
	      });
  	});

   	$scope.breakClip = function(player) {
   		$scope.newClip = angular.copy($scope.currentClip);
   		$scope.newClip.description = "";
   		$scope.newClip.thumbnails = [];
   		player.pauseVideo();
   		$scope.newClip.endTime = player.getCurrentTime();
   		$scope.currentClip.startTime = player.getCurrentTime();
   		$scope.isClipCut = true;
   	}

   	$scope.submitChange = function(player) {
   		$scope.request = {};
   		if($scope.isClipCut) {
				$scope.newClip.artistIds = angular.copy($scope.currentClip.artistIds);
   			$scope.request.newClip = $scope.newClip;
   		}
   		$scope.request.originalClip = $scope.currentClip;
   		$scope.request.option = $scope.option.selectedOption;
   		console.log($scope.request);
  		$http.put('/imctube/webapi/review/clips/' + $scope.currentClip.clipId, $scope.request)
      		.then(function(data) {
        		console.log("success");
      		}, function(data) {
      			console.log("Failed" + data);
      		});

      if ($scope.isClipCut) {		
   			$scope.isClipCut = false;
   			player.playVideo();
   		} else {
   			$window.open('#review/' + $scope.movie.id, "_self");
   		}
   	}

   	$scope.isPlayEnded = function(player) {
   		if(angular.isDefined(player)) {
   			if(player.currentState == "ended" && $scope.isClipEnd == false) {
   				$scope.isClipEnd = true;
   				$scope.option.selectedOption = "markAsReviewed";
   			}
   			return player.currentState == "ended";
   		} else {
   			return false;
   		}
   	}
};

ReviewClipCtrl.$inject = ['$http', '$routeParams', '$scope', '$window'];
angular.module('imctubeApp').controller('ReviewClipCtrl', ReviewClipCtrl);