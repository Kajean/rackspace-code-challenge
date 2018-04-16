'use strict';

describe('myApp.components.postsTable module', function() {
  var $componentController;
  var PostsTableController;
  var $httpBackend;
  var url = '//jsonplaceholder.typicode.com/posts';
  var data = [{
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  }, {
    "userId": 3,
    "id": 26,
    "title": "est et quae odit qui non",
    "body": "similique esse doloribus nihil accusamus\nomnis dolorem fuga consequuntur reprehenderit fugit recusandae temporibus\nperspiciatis cum ut laudantium\nomnis aut molestiae vel vero"
  }];

  beforeEach(module('myApp.components.postsTable'));
  beforeEach(inject(function($injector) {
    $componentController = $injector.get('$componentController');
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('PostsTable controller init', function() {
    it('should be defined', function() {
      PostsTableController = $componentController('postsTable');
      expect(PostsTableController).toBeDefined();
    });

    it('has correct state before request completes', function () {
      PostsTableController = $componentController('postsTable');

      expect(PostsTableController.dataReady).toEqual(false);
      expect(PostsTableController.data).toEqual(null);
      expect(PostsTableController.failedToLoad).toEqual(false);
      expect(PostsTableController.sortType).toEqual('userId');
      expect(PostsTableController.sortReverse).toEqual(false);
    });
    
    it('successfully gets data from URL', function () {
      $httpBackend.expectGET(url).respond(data);

      PostsTableController = $componentController('postsTable');
      $httpBackend.flush();

      expect(PostsTableController.dataReady).toEqual(true);
      expect(PostsTableController.data).toEqual(data);
      expect(PostsTableController.failedToLoad).toEqual(false);
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('fails to gets data from URL', function () {
      $httpBackend.expectGET(url).respond(400, 'failed');

      PostsTableController = $componentController('postsTable');
      $httpBackend.flush();

      expect(PostsTableController.dataReady).toEqual(false);
      expect(PostsTableController.data).toEqual(null);
      expect(PostsTableController.failedToLoad).toEqual(true);
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('PostsTable functions', function () {
    beforeEach(function () {
      PostsTableController = $componentController('postsTable');
      PostsTableController.sortType = 'userId';
      PostsTableController.sortReverse = false;
    });

    describe('setSort', function () {
      it('different type', function () {
        PostsTableController.setSort('diff');
        expect(PostsTableController.sortType).toEqual('diff');
        expect(PostsTableController.sortReverse).toEqual(false);
      });

      it('different type resets sortReverse', function () {
        PostsTableController.sortReverse = true;
        PostsTableController.setSort('diff');
        expect(PostsTableController.sortType).toEqual('diff');
        expect(PostsTableController.sortReverse).toEqual(false);
      });

      it('same type flips sortReverse', function () {
        PostsTableController.setSort('userId');
        expect(PostsTableController.sortType).toEqual('userId');
        expect(PostsTableController.sortReverse).toEqual(true);
      });

      it('same type flips sortReverse 2', function () {
        PostsTableController.sortReverse = true;
        PostsTableController.setSort('userId');
        expect(PostsTableController.sortType).toEqual('userId');
        expect(PostsTableController.sortReverse).toEqual(false);
      });
    });
  })
});