showTracker.controller('lstCtrl', function($scope, $http, $rootScope) {
    var auth = "Token token " + $rootScope.key;
    $http({
        method: 'GET',
        url: 'http://show-trac.herokuapp.com/api/watchlist',
        headers: {
            'Authorization': auth
        }
    }).then(function success(response) {
        $scope.data = response.data;
    }, function error(response) {
        $scope.data = response.statusText;
    });
}); 
