/*global todoApp */
todoApp.directive('infoPane', function () {
    function link(scope) {
        // Updated statistic on List changes
        scope.$watch('todos', function(todos) {
            var remainingCnt = 0;
            var completedCnt = 0;

            todos.forEach(function(todo) {
                if (todo.completed) {
                    completedCnt++;
                } else {
                    remainingCnt++;
                }
            });

            scope.completedCnt = completedCnt;
            scope.remainingCnt = remainingCnt;
        }, true);
    }
    return {
        restrict: 'EA',
        link: link,
        template:
            '{{remainingCnt}} task(s) left' +
            '<a class="clear-completed" href="" ng-click="clearCompleted()" ng-show="completedCnt">' +
                'Clear {{completedCnt}} completed task(s)' +
            '</a>'
    };
});
