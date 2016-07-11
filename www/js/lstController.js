showTracker.controller('lstCtrl', function($scope, $http, $rootScope, $location) {
    var auth = "Token token " + $rootScope.key;
    var apiUrl = $rootScope.base + 'watchlist';
    $scope.$location = $location;

    $http({
        method: 'GET',
        url: apiUrl,
        headers: {
            'Authorization': auth
        }
    }).then(function success(response) {
        $scope.data = response.data;
    }, function error(response) {
        $scope.data = response.statusText;
    });
}); 
