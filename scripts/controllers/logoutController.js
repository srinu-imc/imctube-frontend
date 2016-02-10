function LogoutCtrl($location, $auth, toastr) {
  if (!$auth.isAuthenticated()) { 
    return; 
  }
  $auth.logout()
    .then(function() {
      toastr.info('You have been logged out');
      $location.path('/');
    });
};

LogoutCtrl.$inject = ['$location', '$auth', 'toastr'];
angular.module('imctubeApp').controller('LogoutCtrl', LogoutCtrl);