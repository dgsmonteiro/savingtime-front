(function() {
    'use strict';
    angular
        .module('consmesasstatus.controller', [])
        .controller('ConsMesasStatusCtrl', ConsMesasStatusCtrl);

    ConsMesasStatusCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopup', 'MesasService', '$ionicLoading', '$ionicNavBarDelegate', '$ionicHistory'];
    function ConsMesasStatusCtrl($rootScope, $scope, $state, $ionicPopup, MesasService, $ionicLoading, $ionicNavBarDelegate, $ionicHistory) {

      $scope.error = null;
      $scope.mesa = {}
      $scope.mesa.status = 'Inativa';

      $ionicLoading.show({
        template: '<ion-spinner icon="lines" class="spinner-stable"></ion-spinner>'
      });

      MesasService.consultarStatusMesa()
        .then(
          function(data) {
            $scope.statusmesa = data;
          },
          function(error) {
            $scope.error = "Carregue a página novamente";
          }
        );

      MesasService.consultarMesasStatus($scope.mesa.status)
        .then(
          function(data) {
              $scope.listmesas = data.object;
              if($scope.listmesas == null) {
                setTimeout(function () {
                  $scope.$apply(function(){
                    $scope.error = data.message;
                  });
                }, 1000);
              }
              setTimeout(function () {
                $ionicLoading.hide();
              },1500);
          },
          function(error) {
              $scope.error = "Carregue a página novamente";
              setTimeout(function () {
                $ionicLoading.hide();
              },1500);
          }
        );

      $scope.pesquisarMesasStatus = function() {
        $scope.error = null;
        $ionicLoading.show({
          template: '<ion-spinner icon="lines" class="spinner-stable"></ion-spinner>'
        });

        MesasService.consultarMesasStatus($scope.mesa.status)
          .then(
            function(data) {
                $scope.listmesas = data.object;
                if($scope.listmesas == null) {
                  setTimeout(function () {
                    $scope.$apply(function(){
                      $scope.error = data.message;
                    });
                  }, 1000);
                }
                setTimeout(function () {
                  $ionicLoading.hide();
                },1500);
            },
            function(error) {
                $scope.error = "Carregue a página novamente";
                setTimeout(function () {
                  $ionicLoading.hide();
                },1500);
            }
          );

      }

      $scope.editMesas = function(codigo) {
        for(var i=0; i < $scope.listmesas.length; i++) {
          if(codigo === $scope.listmesas[i].codigo){
            $scope.editmesa = $scope.listmesas[i];
          }
        }
        $state.go("edit/mesas", { mesa:   $scope.editmesa });
      };

      $scope.doRefresh = function() {
        $scope.error = null;
        MesasService.consultarMesasStatus($scope.mesa.status)
          .then(
            function(data) {
                $scope.listmesas = data.object;
                if($scope.listmesas == null) {
                  setTimeout(function () {
                    $scope.$apply(function(){
                      $scope.error = data.message;
                    });
                  }, 1000);
                }
                setTimeout(function () {
                  $ionicLoading.hide();
                },1500);
            },
            function(error) {
                $scope.error = "Carregue a página novamente";
                setTimeout(function () {
                  $ionicLoading.hide();
                },1500);
            }
          );
         $scope.$broadcast('scroll.refreshComplete');
      }

      $scope.back = function() {
        $ionicNavBarDelegate.back();
      }

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
          viewData.enableBack = true;
      });

      $scope.backConsMesas = function() {
        $state.go("mesas");
      }

      $scope.backToMain = function() {
        $state.go("main");
      }
    };
})();
