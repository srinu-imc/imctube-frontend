angular.module('imctubeApp')
	.filter('hasthumbnails', function() {
	  return function(input) {
	  	var output= [];

	  	for(var i=0; i< input.length; i++) {
	  		if(input[i].thumbnailCount > 0) {
	  			output.push(input[i]);
	  		}
	  	}
	  
	    return output;
	  };
	});