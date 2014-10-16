/*global todoApp*/

todoApp.factory('adapter', function($q, $rootScope, $storage, uuid2) {
    'use strict';

    function getAdapter(type) {
        var storage = $storage(type);
        return {
            fetch: function(options) {
                var deferred = $q.defer();

                deferred.resolve(Object.keys(storage.$$table).map(function(id) {
                    return storage.$$table[id];
                }));
                
                return deferred.promise;
            },

            create: function(data) {
                var deferred = $q.defer();

                var id = uuid2.newuuid();
                data.id = id;
                storage.addItem(id, data);
                deferred.resolve(data);

                return deferred.promise;
            },

            update: function(id, data) {
                var deferred = $q.defer();

                storage.setItem(id, data);
                deferred.resolve(data);

                return deferred.promise;
            },

            destroy: function(id) {
                var deferred = $q.defer();

                storage.removeItem(id);
                deferred.resolve();

                return deferred.promise;
            }
        };
    }

    return {
        getAdapter: getAdapter
    };
});
