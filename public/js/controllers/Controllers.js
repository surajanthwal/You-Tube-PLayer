// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', ['ngNotify', 'ngDialog'])

    .controller('UserController', ['$scope', 'ngDialog', function ($scope, ngDialog) {
        var vm = this;
        var index = 0;
        vm.video = {};
        vm.videoList = [

            // {
            //     url: 'jIqRbFQl-ds',
            //     title: 'Humpty Sharma',
            //     startTime: 40,
            //     endTime: 45
            // },
            // {
            //     url: 'XatXy6ZhKZw',
            //     title: 'Weekend',
            //     startTime: 60,
            //     endTime: 65
            // },
            // {
            //     url: 'D5drYkLiLI8',
            //     title: 'Selena',
            //     startTime: 66,
            //     endTime: 70
            // },
            // {
            //     url: 'n6CwOTJMCbY',
            //     title: 'BB ki wines',
            //     startTime: 10,
            //     endTime: 15
            // }
            // ,
            // {
            //     url: 'JGwWNGJdvx8',
            //     title: 'Ed sheeren',
            //     startTime: 100,
            //     endTime: 102
            // }
        ];
        vm.clickToOpen = function () {
            ngDialog.open({
                template: 'views/modal/modal.html',
                className: 'ngdialog-theme-default',
                controller: 'ModalController',
                controllerAs: 'vm',
                height: 300,
                width: 500
            });


        };

        $scope.$on('newVideo', function (e, videoObject) {
            console.log("Inside Main Controller. The received object is: ");
            if (videoObject.url.indexOf("=") != -1) {
                videoObject.url = videoObject.url.substring(videoObject.url.indexOf("=") + 1);
                console.log(videoObject);
            }
            vm.videoList.push(videoObject);
        });

        createIFrameApi();
        var player;
        vm.playAllVideos = function () {
            index = 0;
            enableAndDisableButton(0);
            var buttons = document.getElementById("buttonsDivId");
            if (buttons.classList.contains('hideElement')) {
                buttons.classList.remove('hideElement');
            }
            var caption = document.getElementById("captionId");
            if (caption.classList.contains('hideElement')) {
                caption.classList.remove('hideElement');
            }
            vm.completitionMessage = "";
            if (player != null) {
                player.destroy();
                // $scope.$apply();
            }
            createYTPLayer();
        };

        function createIFrameApi() {
            var tag = document.createElement('script');
            tag.id = 'iframe-demo';
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        function createYTPLayer() {
            // if (player != null) {
            // player.destroy();
            // $scope.$apply();
            // }
            player = new YT.Player('playerId', {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onStateChange,
                    'onError': onError
                }
            });
        }

        function onPlayerReady(e) {
            console.log("Initial value of index: " + index);
            vm.video = vm.videoList[index];
            vm.video.viewCount += 1;
            $scope.$apply();
            player.loadVideoById({
                'videoId': vm.videoList[index].url,
                'startSeconds': vm.videoList[index].startTime,
                'endSeconds': vm.videoList[index].endTime,
                'suggestedQuality': 'large'
            });
            // player.playVideo();
        }

        function onStateChange(e) {
            // console.log(e);
            if (e.data == YT.PlayerState.ENDED) {
                // playNext();
                playByIndex(index + 1);
            }
        }

        function onError(e) {
            console.log("Video error");
            console.log(index);
            playByIndex(index + 1);
        }

        function playByIndex(i) {
            if (i >= 0 && i < vm.videoList.length) {
                enableAndDisableButton(i);
                index = i;
                vm.video = vm.videoList[index];
                if (player != null) {
                    player.destroy();
                }
                createYTPLayer();
                $scope.$apply();
            } else if (i >= vm.videoList.length) {
                index = 0;
                player.destroy();
                player = null;
                console.log(document.getElementById("playerId"));
                var listItem = document.getElementById(vm.videoList.length - 1);
                listItem.classList.remove("active");
                vm.completitionMessage = "Your playlist is over. Please click on Play All button to restart the playlist";
                var buttons = document.getElementById("buttonsDivId");
                buttons.classList.toggle('hideElement');
                var caption = document.getElementById("captionId");
                caption.classList.toggle('hideElement');
                $scope.$apply();
            }
        }

        function enableAndDisableButton(i) {
            var previousButton = document.getElementById("previousButtonId");
            var nextButton = document.getElementById("nextButtonId");

            if (i == 0) {
                previousButton.disabled = true;
            } else {
                previousButton.disabled = false;
            }

            if (i == vm.videoList.length - 1) {
                nextButton.disabled = true;
            } else {
                nextButton.disabled = false;

            }
        }

        // function playVideoByIndex(index) {
        //     if (index < vm.videoList.length) {
        //         vm.video = vm.videoList[index];
        //         player.destroy();
        //         createYTPLayer();
        //         $scope.$apply();
        //
        // player = new YT.Player('playerId', {
        //     events: {
        //         'onReady': onPlayerReady,
        //         'onStateChange': onStateChange
        //     }
        // });

        // player.cueVideoById({
        //     'videoId': vm.videoList[index].url,
        //     'startSeconds': vm.videoList[index].startTime,
        //     'endSeconds': vm.videoList[index].endTime,
        // });
        // player.playVideo();
        //     }
        // }

        vm.playVideoByIndex = function (i) {
            var buttons = document.getElementById("buttonsDivId");
            if (buttons.classList.contains('hideElement')) {
                buttons.classList.remove('hideElement');
            }
            var caption = document.getElementById("captionId");
            if (caption.classList.contains('hideElement')) {
                caption.classList.remove('hideElement');
            }
            vm.completitionMessage = "";
            playByIndex(i);
        };

        vm.playNext = function () {
            playByIndex(index + 1);
        };

        vm.playPrevious = function () {
            playByIndex(index - 1)
        };

        // function playNext() {
        // playByIndex(index+1);
        // console.log(index);
        // if (index < vm.videoList.length)
        //     playVideoByIndex(index);
        // else {
        //     index = 0;
        //     player.destroy();
        //     console.log(document.getElementById("playerId"));
        //     var listItem = document.getElementById(vm.videoList.length - 1);
        //     listItem.classList.remove("active");
        //     vm.completitionMessage = "Your playlist is over. Please click on Play All button to restart the playlist";
        //     $scope.$apply();
        // }
        // }

        function onSpecificPlayerReady(e) {
            vm.video = vm.videoList[index];
            // $scope.$apply();
            player.loadVideoById({
                'videoId': vm.videoList[index].url,
                'startSeconds': vm.videoList[index].startTime,
                'endSeconds': vm.videoList[index].endTime,
                'suggestedQuality': 'large'
            });
            player.playVideo();
        }

    }])

    .controller('ModalController', ['$rootScope', '$scope', 'ngDialog', function ($rootScope, $scope, ngDialog) {
        var vm = this;
        vm.video = {};
        console.log("Inside modal controller");

        vm.save = function () {
            // console.log("Video Object:");
            // console.log(vm.video);
            console.log("Inside modal save");
            vm.video.viewCount = 0;
            $rootScope.$broadcast('newVideo', vm.video);
            ngDialog.close();
        };

        vm.cancel = function () {
            ngDialog.close();
        };

    }])
    .controller('PatientController', ['$scope', '$http', 'ngNotify',
        function ($scope, $http, ngNotify) {
            var vm = this;
            vm.user = {};
            vm.gender = ["Male", "Female"];
            vm.setAge = function () {
                vm.user.age = new Date().getFullYear() - vm.user.dob.getFullYear();
            }

            vm.submitForm = function () {
                console.log(vm.user);
                $http.post('/registerUser', {'data': vm.user}).then(function (response) {
                        console.log(response);
                        ngNotify.set(response.data);
                    },
                    function (err) { // optional
                        console.log("Error");// failed
                    }
                );

            };
        }])
    .controller('AllPatients', ['$scope', 'allUsers', function ($scope, allUsers) {
        var vm = this;
        vm.patients = allUsers.data;
        console.log("hi man");
        console.log(allUsers);

    }]);
