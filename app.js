angular.module('recursionDemo', ['RecursionHelper'])
  .controller("TreeController", function($scope) {
    $scope.menuFamily = data;
      
  })
  .directive("tree", function(RecursionHelper) {
    return {
      restrict: "EA",
      scope: {
        family: '=',
        level: '@',
        parentcolor: '@',
      },
      templateUrl: 'template.html',
          
      compile: function(element) {
      
        return RecursionHelper
            .compile(element, function(
              scope, iElement, iAttrs,
                  controller, transcludeFn) {
          scope.activeIndex = -1;
          
          scope.getNextLevel = function(level) {
            return parseInt(level) + 1;
          };
          
          scope.setBGColor = function(level) {
            var styleObj = {};
            var colorCode = 0xf0f0f0 * parseInt(scope.level);
            styleObj['background-color'] = '#' +
              colorCode.toString(16).slice(-6);
            return styleObj;
          };
          
          scope.setTextAlignment = function(level) {
            var styleObj = {};
            if (level >= 2) {
              styleObj['padding-left'] = '35px';
            }
            return styleObj;
          };
          
          scope.getIcon = function(index) {
            if (scope.family[index].children.length) {
              if (scope.activeIndex != -1) {
                return "^";
              } else {
                return "v";
              }
            }
          };
          
          scope.setActive = function(index) {
            if (scope.family[index].children.length) {
              if (scope.activeIndex == index) {
                scope.activeIndex = -1;
              } else {
                scope.activeIndex = index;
              }
            }
          };
        });
      },
    };
});
