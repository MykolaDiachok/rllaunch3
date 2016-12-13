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
                        auth.cr
                        auth.$signInWithEmailAndPassword(cookieFirebaseUserCredential.Db, cookieFirebaseUserCredential.Fc).then(function (firebaseUser) {
                            $scope.firebaseUser = firebaseUser;
                        }).catch(function (error) {
                            $scope.error = error;
                        })
                    }
                    else if (cookieFirebaseUserCredential.provider == 'facebook'){
                        //auth.$signInWithCredential
                    }
                    else if (cookieFirebaseUserCredential.provider == 'google'){

                    }
                }


                $scope.singInFacebook = function (inputuser) {
                    $scope.firebaseUser = null;
                    $scope.error = null;
                    auth.$signInWithPopup("facebook").then(function(firebaseUser){
                        console.log('fb auth - ok');
                        $scope.firebaseUser = firebaseUser;
                        var credential = firebaseUser.credential;
                        if(inputuser.remember) {
                            $cookieStore.put('credential', credential);
                        }
                        else{
                            $cookieStore.remove('credential');
                        }
                    }).catch(function (error) {
                        console.log('fb auth - error:'+error.message);
                        $scope.error = error;
                    });
                };

                $scope.signInGoogle = function (inputuser) {
                    $scope.firebaseUser = null;
                    $scope.error = null;
                };

                $scope.signIn = function (inputuser) {
                    $scope.firebaseUser = null;
                    $scope.error = null;
                    // console.log(inputuser.email + ' ' + inputuser.password + ' ' + inputuser.remember);
                    auth.$signInWithEmailAndPassword(inputuser.email, inputuser.password).then(function (firebaseUser) {
                        var credential = firebase.auth.EmailAuthProvider.credential(inputuser.email, inputuser.password);
                        $scope.firebaseUser = firebaseUser;
                        if(inputuser.remember) {
                            $cookieStore.put('credential', credential);
                        }
                        else{
                            $cookieStore.remove('credential');
                        }
                    }).catch(function (error) {
                        $scope.error = error;
                    });
                };
                
                $scope.signOut = function () {
                    auth.$signOut().then(function () {
                        console.log('Log out');
                    }).catch(function (error) {
                        $scope.error = error;
                    })
                }
                
            }
        ])
})();