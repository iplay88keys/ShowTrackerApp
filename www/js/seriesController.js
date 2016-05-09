showTracker.controller('seriesCtrl', function($scope, $http, $rootScope, $stateParams, $location) {
    var auth = "Token token " + $rootScope.key;
    var apiUrl = $rootScope.base + 'series/' + $stateParams.seriesId;
    $scope.$location = $location;

    $http({
        method: 'GET',
        url: apiUrl,
        headers: {
            'Authorization': auth
        }
    }).then(function success(response) {
        $scope.seasons = response.data.seasons;
        $scope.info = response.data.info;
    }, function error(response) {
        $scope.seasons = response.statusText;
        $scope.info = response.satusText;
    });
}); 
