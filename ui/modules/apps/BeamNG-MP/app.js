angular.module('beamng.apps')

.directive('BeamNG-MP', ['bngApi', function (bngApi) {
	return {
		templateUrl: 'modules/apps/BeamNG-MP/app.html',
		replace: true,
		restrict: 'E',
		scope: false,
		controller: function ($scope, $element, $attrs) {
			$scope.checkImg = "url(modules/apps/BeamNG-MP/checkmark.png)";
			$scope.mainStyle = {appWidth: "100%", appHeight: "100%", inLeft: "auto", inRight: "4px", appShow: "visible", groupsShow: "hidden"};
			$scope.checkStyle = {awareness: $scope.checkImg, method: ""};
			$scope.visible = {main: true};
			$scope.inSymbol = "-";
			$scope.joinOptions = [
				{port: 1, ip: ""}
			];

			this.init = function() {
				var command = `extensions.freeroam_multiplayer.ready()`;
				bngApi.engineLua(command);
			}

			this.toggleAll = function() {
				$scope.visible.main = !$scope.visible.main;
				if($scope.visible.main == false) {
					$scope.mainStyle = {appWidth: "24px", appHeight: "24px", inLeft: "4px", inRight: "auto", appShow: "hidden", groupsShow: "hidden"};
					$scope.inSymbol = "+";
				} else {
					$scope.mainStyle = {appWidth: "100%", appHeight: "100%", inLeft: "auto", inRight: "4px", appShow: "visible", groupsShow: "hidden"};
					$scope.inSymbol = "-";
				}
			}

			this.setPort = function() {
				var command = `extensions.freeroam_multiplayer.setPort(${this.joinOptions.port})`;
				bngApi.engineLua(command);
			}

			this.setIP = function() {
				var command = `extensions.freeroam_multiplayer.setIP(${this.joinOptions.ip})`;
				bngApi.engineLua(command);
			}

			this.joinSession = function() {
				var command = `extensions.freeroam_multiplayer.joinSession(${this.joinOptions.mode})`;
				bngApi.engineLua(command);
			}

			this.hostSession = function() {
				var command = `extensions.freeroam_multiplayer.hostSession(${this.hostOptions.mode})`;
				bngApi.engineLua(command);
			}
		},
		controllerAs: 'ctrl'
	};
}]);