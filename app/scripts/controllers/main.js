'use strict';

/**
 * @ngdoc function
 * @name skeinTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the skeinTestApp
 */
angular.module('skeinTestApp').controller('MainCtrl', function ($scope, $http, dataService) {
    $scope.hints = [];
    $scope.tags = [];
    $scope.tagField = '';

    var twitter,
        errorHandler = function (err) {
        toastr.error('Error during request, see details in console');
        console.log('Error: ');
        console.log(err);
    };

    OAuth.popup('twitter').done(function(result) {
        twitter = result;
    }).fail(errorHandler);

    $scope.refreshHints = function () {
        if(twitter && $scope.tagField.trim().length > 0) {
            twitter.get('1.1/search/tweets.json?q=%23' + $scope.tagField.replace(' ', '+%23')).then(function (res) {
                $scope.hints = [];
                res.statuses.forEach(function(status) {
                    status.entities.hashtags.forEach(function (hashtag) {
                        if($scope.hints.indexOf(hashtag.text) === -1 && $scope.tags.indexOf(hashtag.text) === -1) {
                            $scope.hints.push(hashtag.text);
                        }
                    })
                });
                $scope.$apply();
            }).fail(errorHandler);
        }else if($scope.tagField.trim().length === 0) {
            $scope.hints = [];
        }
    };
    $scope.addTag = function (hint) {
        if($scope.tags.indexOf(hint) === -1) {
            $scope.tags.push(hint);

            var hintIndex = $scope.hints.indexOf(hint);
            if (hintIndex > -1) {
                $scope.hints.splice(hintIndex, 1);
            }
        }
    };
    $scope.removeTag = function (tag) {
        var index = $scope.tags.indexOf(tag);

        if (index > -1) {
            $scope.tags.splice(index, 1);
        }
        $scope.refreshHints();
    };

    $scope.loadTags = function () {
        dataService.loadTags(function (tags) {
            $scope.tags = tags;
            $scope.$apply();
            $scope.refreshHints();
            toastr.success('Tags successfully loaded');
        });
    };

    $scope.saveTags = function () {
        dataService.saveTags($scope.tags, function () {
            toastr.success('Tags successfully saved');
        }, errorHandler);
    };
});
