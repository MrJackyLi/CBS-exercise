angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $state, $ionicFilterBar, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.add = function (view) {
    $state.go(view);
  };

  var filterBarInstance;
  $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.chats,
      update: function (filteredItems, filterText) {
        $scope.chats = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      }
    });
  };

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('AddCtrl', function($scope, $state, Chats){
  $scope.close = function () {
    $state.go('tab.chats');
  };

  $scope.chats = Chats.all();

  $scope.newChat = {
    id: $scope.chats.length,
    name: '',
    lastText: '',
    face: ''
  };

  $scope.confirm = function () {
    Chats.add($scope.newChat);
    $scope.close();
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

