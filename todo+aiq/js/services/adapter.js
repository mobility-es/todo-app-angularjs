/*global todoApp, aiq*/

todoApp.factory('adapter', function($q, $rootScope) {
    'use strict';

    function getAdapter(type) {
        return {
            registerListeners: function(handler) {
                var createCallback = function(action) {
                    return function(id) {
                        aiq.datasync.getDocument(id, {
                            success: function(document) {
                                $rootScope.$apply(function() {
                                    handler.apply(null, [action, document]);
                                });
                            }
                        });
                    };
                };
                aiq.datasync.bind('document-created', {
                    _type: type,
                    callback: createCallback('create')
                });
                aiq.datasync.bind('document-updated', {
                    _type: type,
                    callback: createCallback('update')
                });
                aiq.datasync.bind('document-deleted', {
                    _type: type,
                    callback: function(id) {
                        handler('destroy', id);
                    }
                });

                return this;
            },
            
            fetch: function(options) {
                var deferred = $q.defer();

                aiq.datasync.getDocuments(type, {
                    success: deferred.resolve,
                    failure: deferred.reject
                });
                
                return deferred.promise;
            },

            create: function(data) {
                var deferred = $q.defer();

                aiq.datasync.createDocument(type, data, {
                    success: deferred.resolve,
                    failure: deferred.reject
                });

                return deferred.promise;
            },

            update: function(id, data) {
                var deferred = $q.defer();

                aiq.datasync.updateDocument(id, data, {
                    success: deferred.resolve,
                    failure: deferred.reject
                });

                return deferred.promise;
            },

            destroy: function(id) {
                var deferred = $q.defer();

                aiq.datasync.deleteDocument(id, {
                    success: deferred.resolve,
                    failure: deferred.reject
                });

                return deferred.promise;
            }
        };
    }

    return {
        getAdapter: getAdapter
    };
});
