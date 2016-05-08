showTracker.controller('loginCtrl', function($scope, $cordovaBarcodeScanner, $rootScope, $state) {
    $scope.data = {};

    $scope.login = function() {
        if($scope.data.key) {
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
});
