showTracker.controller('loginCtrl', function($scope, $cordovaBarcodeScanner, $rootScope, $state, $window) {
    $scope.data = {};
    if(window.localStorage.getItem("key") !== undefined) {
        $scope.data.key = window.localStorage.getItem("key");
    }

    $scope.login = function() {
        if($scope.data.key) {
            window.localStorage.setItem("key", $scope.data.key);
            $rootScope.key = $scope.data.key;
            $state.go('watchlist');
        }
    };

    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            $scope.data.key = imageData.text;
        }, function(error) {
            console.log("An error occured -> " + error);
        });
    };

    $scope.clearData = function() {
        if($window.confirm("Are you sure?")) {
            if($rootScope.key) {
                $rootScope.key = "";
            }

            if($scope.data.key) {
                $scope.data.key = "";
            }

            if(window.localStorage.getItem("key") !== undefined) {
                window.localStorage.removeItem("key");
            }
        }
    };
});
