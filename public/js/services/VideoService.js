
//Video service to add a video and to get the latest video
angular.module('MyApp', []).factory('VideoService', [function () {
    var video = {};
    var addVideo = function (newObj) {
        this.video = newObj;
    };

    var getVideo = function () {
        return video;
    };

    return {
        addVideo: addVideo,
        getVideo: getVideo
    };

}]);
