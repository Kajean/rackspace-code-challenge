angular.module('myApp.components.postsTable', [])
  .component('postsTable', {
    templateUrl: 'components/posts-table/posts-table.html',
    controller: PostsTableController,
    controllerAs: 'postsTable'
  });

function PostsTableController($http, $log) {
  var ctrl = this;
  ctrl.data = null;
  ctrl.dataReady = false;
  ctrl.failedToLoad = false;
  ctrl.sortType = 'userId';
  ctrl.sortReverse = false;

  $http.get('http://jsonplaceholder.typicode.com/posts').then(
    function (rsp) {
      if (rsp && angular.isArray(rsp.data)) {
        ctrl.data = rsp.data;
        ctrl.dataReady = true;
      }
    }, 
    function (rsp) {
      $log.error('Could not load data from URL');
      $log.error(rsp);
      ctrl.failedToLoad = true;
    });

  ctrl.setSort = function(type) {
    if (ctrl.sortType == type) {
      ctrl.sortReverse = !ctrl.sortReverse;
    }
    else {
      ctrl.sortType = type;
      ctrl.sortReverse = false;
    }
  };
}