showTracker.controller('seasonCtrl', function($scope, $http, $rootScope, $stateParams, $location, $httpParamSerializerJQLike) {
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

    $scope.change = function(id, season) {
        var apiUrl = $rootScope.base + 'series/' + $stateParams.seriesId + '/episode/' + id;
        // The checkbox is now checked
        if($scope.checked[id]) {
            console.log(auth);
            $http({
                method: 'POST',
                url: apiUrl,
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    season_id: season
                },
                headers: {
                    'Authorization': auth,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        } else {
            $http({
                method: 'DELETE',
                url: apiUrl,
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                data: {
                    season_id: season
                },
                headers: {
                    'Authorization': auth,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

        }
    };
}); 
