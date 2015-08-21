'use strict';

/**
 * @ngdoc service
 * @name skeinTestApp.data
 * @description
 * # data
 * Service in the skeinTestApp.
 */
angular.module('skeinTestApp').service('dataService', function () {
    var dbName = "skeinDB",
        collectionName = "tags",
        key = "user",
        baseUser = "base",
        storageService  = new App42Storage();

    this.loadTags = function (successHandler, errorHandler) {
        storageService.findDocumentByKeyValue(dbName,collectionName,key,baseUser,{
            success: function(object)
            {
                var storageObj = JSON.parse(object);
                var response = storageObj.app42.response.storage.jsonDoc[0];
                successHandler(response.tags);
            },
            error: errorHandler
        });
    };

    this.saveTags = function (tags, successHandler, errorHandler) {
        var jsonDoc = new Object();
        jsonDoc.user = baseUser;
        jsonDoc.tags = tags;
        storageService.saveOrUpdateDocumentByKeyValue(dbName,collectionName,key,baseUser,jsonDoc,{
            success: successHandler,
            error: errorHandler
        });
    }
});
