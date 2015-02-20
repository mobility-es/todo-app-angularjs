/*global todoApp, angular */
todoApp.controller('TodoCtrl', function TodoCtrl($scope, adapter) {
    'use strict';

    $scope.todos = [];
    $scope.title = '';

    var todoStorage = adapter.getAdapter('todo.model.TODO');
    todoStorage.fetch().then(function(todos) {
        $scope.todos = todos;
    });

    function indexOf(argument) {
        var id = angular.isObject(argument) ? $scope.getId(argument) : argument;
        var result = -1;
        $scope.todos.some(function(todo, index) {
            if ($scope.getId(todo) === id) {
                result = index;
                return true;
            }
        });
        return result;
    }

    function handler(operation, todo) {
        switch(operation) {
            case 'create':
                $scope.todos.push(todo);
                break;
            case 'update':
                angular.extend($scope.todos[indexOf(todo)], todo);
                break;
            case 'destroy':
                $scope.todos.splice(indexOf(todo), 1);
        }
    }

    $scope.getId = function(todo) {
        return todo.id;
    };

    $scope.add = function() {
        var title = this.title.trim();

        if (! title.length) {
            return;
        }

        // Send request to the Platform and in case of success add Todo to the List
        todoStorage.create({
            title: title,
            completed: false,
            createdAt: Date.now()
        }).then(angular.bind(null, handler, 'create'));

        this.title = '';
    };

    $scope.toggleComplete = function(todo) {
        var toggled = angular.extend({}, todo, { completed: !todo.completed });
        todoStorage.update($scope.getId(todo), toggled).then(angular.bind(null, handler, 'update'));
    };

    $scope.clearCompleted = function() {
        this.todos.forEach(function(todo) {
            if (todo.completed) {
                var id = $scope.getId(todo);
                todoStorage.destroy(id).then(angular.bind(null, handler, 'destroy', id));
            }
        });
    };
});
