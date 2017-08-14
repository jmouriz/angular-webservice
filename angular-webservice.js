(function(window, angular, undefined) {
   
   'use strict';
   
   angular.module('ngWebservice', []).service('$webservice', ['$window', '$http', '$timeout', '$q', function($window, $http, $timeout, $q) {
      var $this = this;

      $this.timeout = 30; /* seconds => todo: config */
   
      $this.get = function(service, action, data) { 
         /*
         var canceller = $q.defer();
         if (!navigator.onLine && !/:\/\/(localhost|127\.0\.0\.1|192\.168\.[0-9]{1,3}\.[0-9]{1,3})\//.test(config.webservices)) {
            canceller.resolve('off-line');
            return canceller.promise;
         }
         */
         return $this.request(service, action, data);
      };
   
      $this.queue = function(service, action, data) { 
         /*
         var queue = localStorageService.get('network-queue') || [];
         queue.push({
               service: service,
               action: action,
               data: data,
         });
         localStorageService.set('network-queue', queue);
         */
      };
   
      $this.request = function(url, data) { 
         //$$('Application').busy(true);
         var canceller = $q.defer();
         var success = false; /* todo => utilizar la promesa */
         var promise = $http.post(url, data, { timeout: canceller.promise }).then(function(response) {
            success = true;
            //$$('Application').busy(false);
            if (response.status == 200) {
               /*
               if (response.data.hasOwnProperty('status') && response.data.status === 'unauthorized') {
                  localStorageService.remove('session');
                  $$('Application').update();
                  $$('Menu').go('login');
                  var toast = $mdToast.simple();
                  toast.textContent('Tú sesión ha expirado, por favor, vuelve a conectarte.');
                  $mdToast.show(toast.hideDelay(3000));
                  throw 'session-expired';
               } else {
                  return response.data;
               }
               */
               return response.data;
            } else {
               console.log(response);
               throw response.status;
            }
         }, function (error) {
            throw error.status + ': ' + error.data;
         });
         $timeout(function() {
            if (!success) {
               /*
               $$('Application').busy(false);
               var toast = $mdToast.simple();
               toast.textContent('Demora excesiva al conectarse con el servidor, por favor, reintenta más tarde.');
               $mdToast.show(toast.hideDelay(3000));
               */
               canceller.resolve('timeout');
            }
         }, $this.timeout * 1000);
         return promise;
      }
   
      $this.synchronize = function() {
         /*
         var queue = localStorageService.get('$webservices.queue') || [];
         var operation = null;
         while (operation = queue.shift()) {
            $this.request(operation.service, operation.action, operation.data);
            localStorageService.set('network-queue', queue);
         }
         */
      };
   }]);
})(window, window.angular, undefined);
