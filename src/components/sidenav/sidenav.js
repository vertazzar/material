/**
 * @ngdoc module
 * @name material.components.sidenav
 *
 * @description
 * A Sidenav QP component.
 */
angular
    .module('material.components.sidenav', [
        'material.core',
        'material.components.backdrop'
    ])
    .factory('$mdSidenav', SidenavService );


/**
 * @ngdoc service
 * @name $mdSidenav
 * @module material.components.sidenav
 *
 * @description
 * `$mdSidenav` makes it easy to interact with multiple sidenavs
 * in an app. When looking up a sidenav instance, you can either look
 * it up synchronously or wait for it to be initializied asynchronously.
 * This is done by passing the second argument to `$mdSidenav`.
 *
 * @usage
 * <hljs lang="js">
 * // Async lookup for sidenav instance; will resolve when the instance is available
 * $mdSidenav(componentId, true).then(function(instance) {
 *   $log.debug( componentId + "is now ready" );
 * });
 * // Sync lookup for sidenav instance; this will resolve immediately.
 * $mdSidenav(componentId).then(function(instance) {
 *   $log.debug( componentId + "is now ready" );
 * });
 * // Async toggle the given sidenav;
 * // when instance is known ready and lazy lookup is not needed.
 * $mdSidenav(componentId)
 *    .toggle()
 *    .then(function(){
 *      $log.debug('toggled');
 *    });
 * // Async open the given sidenav
 * $mdSidenav(componentId)
 *    .open()
 *    .then(function(){
 *      $log.debug('opened');
 *    });
 * // Async close the given sidenav
 * $mdSidenav(componentId)
 *    .close()
 *    .then(function(){
 *      $log.debug('closed');
 *    });
 * // Async lookup for sidenav instance
 * $mdSidenav(componentId, true).then(function(instance) {
 *   // On close callback to handle close, backdrop click, or escape key pressed.
 *   // Callback happens BEFORE the close action occurs.
 *   instance.onClose(function() {
 *     $log.debug('closing');
 *   });
 * });
 * // Sync check to see if the specified sidenav is set to be open
 * $mdSidenav(componentId).isOpen();
 * // Sync check to whether given sidenav is locked open
 * // If this is true, the sidenav will be open regardless of close()
 * $mdSidenav(componentId).isLockedOpen();
 * </hljs>
 */
function SidenavService($mdComponentRegistry, $mdUtil, $q, $log) {
    var errorMsg = "SideNav '{0}' is not available! Did you use md-component-id='{0}'?";
    var service = {
        find    : findInstance,     //  sync  - returns proxy API
        waitFor : waitForInstance   //  async - returns promise
    };

    /**
     * Service API that supports three (3) usages:
     *   $mdSidenav().find("left")                       // sync (must already exist) or returns undefined
     *   $mdSidenav("left").toggle();                    // sync (must already exist) or returns reject promise;
     *   $mdSidenav("left",true).then( function(left){   // async returns instance when available
   *    left.toggle();
   *   });
     */
    return function(handle, enableWait) {
        if ( angular.isUndefined(handle) ) return service;

        var shouldWait = enableWait === true;
        var instance = service.find(handle, shouldWait);
        return  !instance && shouldWait ? service.waitFor(handle) :
            !instance && angular.isUndefined(enableWait) ? addLegacyAPI(service, handle) : instance;
    };

    /**
     * For failed instance/handle lookups, older-clients expect an response object with noops
     * that include `rejected promise APIs`
     */
    function addLegacyAPI(service, handle) {
        var falseFn  = function() { return false; };
        var rejectFn = function() {
            return $q.when($mdUtil.supplant(errorMsg, [handle || ""]));
        };

        return angular.extend({
            isLockedOpen : falseFn,
            isOpen       : falseFn,
            toggle       : rejectFn,
            open         : rejectFn,
            close        : rejectFn,
            onClose      : angular.noop,
            then : function(callback) {
                return waitForInstance(handle)
                    .then(callback || angular.noop);
            }
        }, service);
    }
    /**
     * Synchronously lookup the controller instance for the specified sidNav instance which has been
     * registered with the markup `md-component-id`
     */
    function findInstance(handle, shouldWait) {
        var instance = $mdComponentRegistry.get(handle);

        if (!instance && !shouldWait) {

            // Report missing instance
            $log.error( $mdUtil.supplant(errorMsg, [handle || ""]) );

            // The component has not registered itself... most like NOT yet created
            // return null to indicate that the Sidenav is not in the DOM
            return undefined;
        }
        return instance;
    }

    /**
     * Asynchronously wait for the component instantiation,
     * Deferred lookup of component instance using $component registry
     */
    function waitForInstance(handle) {
        return $mdComponentRegistry.when(handle).catch($log.error);
    }
}
