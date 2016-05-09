showTracker.controller('seasonCtrl', function($scope, $http, $rootScope, $stateParams, $location) {
    var auth = "Token token " + $rootScope.key;
    var apiUrl = $rootScope.base + 'series/' + $stateParams.seriesId + '/season/' + $stateParams.seasonId;
    $scope.$location = $location;

    $http({
        method: 'GET',
        url: apiUrl,
        headers: {
            'Authorization': auth
        }
    }).then(function success(response) {
        $scope.episodes = response.data.episodes;
        $scope.info = response.data.info;
        $scope.extras = response.data.extras;
        $scope.watches = response.data.watches;

        $scope.checked = {};
        
        angular.forEach($scope.episodes, function(episode) {
            $scope.checked[episode.id] = false;
        });
        
        angular.forEach($scope.watches, function(watch) {
            $scope.checked[watch] = true;
        });

    }, function error(response) {
        $scope.seasons = response.statusText;
        $scope.info = response.statusText;
        $scope.extras = response.statusText;
        $scope.watches = response.statusText;
    });
}); 
