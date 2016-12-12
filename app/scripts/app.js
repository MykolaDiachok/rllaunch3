(function () {
    'use strict';
    var config = {
        apiKey: "AIzaSyChPIptyKnTtCNddTA04jEE1LDy3KqTi0k",
        authDomain: "rllaunch-286fc.firebaseapp.com",
        databaseURL: "https://rllaunch-286fc.firebaseio.com",
        storageBucket: "rllaunch-286fc.appspot.com",
        messagingSenderId: "667449459266"
    };
    firebase.initializeApp(config);

    angular.module('launchrlApp', ['firebase', 'ngCookies'])
        .controller('LaunchRLCtrl', ['$scope', '$firebaseAuth', '$cookieStore',
            function ($scope, $firebaseAuth, $cookieStore) {
                var auth = $firebaseAuth();
                $scope.firebaseUser = null;
                $scope.error = null;
                $scope.user = {};

                var cookieFirebaseUserCredential = $cookieStore.get('credential');
                //console.log(cookieFirebaseUserCredential);

                if (cookieFirebaseUserCredential) {
                    if (cookieFirebaseUserCredential.provider == 'password') {
                        auth.$signInWithEmailAndPassword(cookieFirebaseUserCredential.Db, cookieFirebaseUserCredential.Fc).then(function (firebaseUser) {
                            $scope.firebaseUser = firebaseUser;
                        }).catch(function (error) {
                            $scope.error = error;
                        })
                    }
                }


                $scope.signIn = function (inputuser) {
                    $scope.firebaseUser = null;
                    $scope.error = null;
                    console.log(inputuser.email + ' ' + inputuser.password + ' ' + inputuser.remember);
                    auth.$signInWithEmailAndPassword(inputuser.email, inputuser.password).then(function (firebaseUser) {
                        var credential = firebase.auth.EmailAuthProvider.credential(inputuser.email, inputuser.password);
                        $scope.firebaseUser = firebaseUser;
                        $cookieStore.put('credential', credential);
                    }).catch(function (error) {
                        $scope.error = error;
                    });
                };
            }
        ])
})();