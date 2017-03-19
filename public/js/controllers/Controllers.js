//MainCtrl module which contains all the controller for our app. 'ngDialogue' is a dependnecy for modal popup
angular.module('MainCtrl', ['ngNotify', 'ngDialog'])
//Controller for showing login screen and handling login related functionality
//Just enter anything valid, and it will direct to home screen
    .controller('LoginController', ['$scope', '$state', function ($scope, $state) {
        var vm = this;
        vm.login = function () {
            $state.go("user");
        }
    }])

    //Controller for our default page as soon as user loggs in
    .controller('UserController', ['$scope', 'ngDialog', function ($scope, ngDialog) {

        //declaring all the controller variables
        var vm = this;
        //array for holding all the video objects
        vm.videoList = [];
        //for keeping track of current video index in videoList array
        var index = 0;
        //object for holding the current video object which is playing
        vm.video = {};
        //reference to the player object of yout tube api
        var player;

        //listener function for modal popup, for adding new videos to playlist
        vm.clickToOpen = function () {
            ngDialog.open({
                template: 'views/modal/modal.html',
                className: 'ngdialog-theme-default',
                controller: 'ModalController',
                controllerAs: 'vm',
                height: 320,
                width: 600
            });
        };

        //Event listener for saying the newly created object into the videoList array
        //This event is broadcasted inside the ModalController when user clicks on save button of modal
        $scope.$on('newVideo', function (e, videoObject) {
            console.log("Inside Main Controller. The received object is: ");
            if (videoObject.url.indexOf("=") != -1) {
                videoObject.url = videoObject.url.substring(videoObject.url.indexOf("=") + 1);
            }
            vm.videoList.push(videoObject);
            if (vm.videoList.length == 1) {
                var playAllButton = document.getElementById("playAllButtonId");
                playAllButton.classList.remove("hideElement");
            }
        });

        //calling you tube iframe_api for loading appropriate library to be used afterwards in this controller
        createIFrameApi();
        function createIFrameApi() {
            var tag = document.createElement('script');
            tag.id = 'iframe-demo';
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            
        }

        //the function is a listener to 'Play All' button in user's home page
        //plays all the videos by sequence
        vm.playAllVideos = function () {
            index = 0;
            enableAndDisableButton(0);
            hideButtonsAndCaption();
            vm.completitionMessage = "";
            if (player != null) {
                player.destroy();
                // $scope.$apply();
            }
            createYTPLayer();
        };

        //function for creating player instance for new video to be played and adding event listener to the instance
        function createYTPLayer() {
            player = new YT.Player('playerId', {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onStateChange,
                    'onError': onError
                }
            });
        }

        //event listener to be called as soon as player is ready
        //the function is used to play the video
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

        //event listener for state change event
        //when current video ends, the function calls 'playByIndex' function for playing next video in playlist
        function onStateChange(e) {
            // console.log(e);
            if (e.data == YT.PlayerState.ENDED) {
                // playNext();
                playByIndex(index + 1);
            }
        }

        //error event handler
        //in case of error, it calls 'playByIndex' function for playing next video in playlist
        function onError(e) {
            console.log("Video error");
            console.log(index);
            playByIndex(index + 1);
        }

        //listener function when user clicks on any item in the list
        //calls 'playByIndex' function with appropriate item index in the videoList array, which plays the clicked video
        vm.playVideoByIndex = function (i) {
            hideButtonsAndCaption();
            vm.completitionMessage = "";
            playByIndex(i);
        };

        //listener function for 'next' button
        vm.playNext = function () {
            playByIndex(index + 1);
        };

        //listener function for 'prev' button
        vm.playPrevious = function () {
            playByIndex(index - 1)
        };


        //function is used to play a video
        //receive the parameter to identify which video is to be played
        //calls the 'createYTPlayer' to create new player instance for playing current video
        //displays the message on playlist completion
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

        //function is used to disable and enable 'prev' and 'next' button in UI
        //if first video is playing 'prev' button is disabled
        //if last video is playing 'next' button is disabled
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

        //an additional function to display dom element specific to a video
        //captions, title and views, and prev-next button are displayed only when video is playing otherwise they are hidden
        function hideButtonsAndCaption() {
            var buttons = document.getElementById("buttonsDivId");
            if (buttons.classList.contains('hideElement')) {
                buttons.classList.remove('hideElement');
            }
            var caption = document.getElementById("captionId");
            if (caption.classList.contains('hideElement')) {
                caption.classList.remove('hideElement');
            }
        }

    }])

    //Separate controller for modal popup which is called when user clicks on plus sign in UI
    .controller('ModalController', ['$rootScope', '$scope', 'ngDialog', function ($rootScope, $scope, ngDialog) {
        var vm = this;
        //variable for storing current video
        vm.video = {};

        //listener function which is called, when user clicks on 'save' button in popup
        vm.save = function () {
            vm.video.viewCount = 0;
            //for broadcasting event to 'UserController'
            $rootScope.$broadcast('newVideo', vm.video);
            ngDialog.close();
        };

        //listener function when user clicks on 'cancel' button in popup
        vm.cancel = function () {
            ngDialog.close();
        };

    }]);


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