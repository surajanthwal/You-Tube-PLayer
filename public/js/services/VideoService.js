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
