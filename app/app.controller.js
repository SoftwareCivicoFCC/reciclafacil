(function() {
    'use strict';

angular
    .module('app')
    .controller('appController',appController);

appController.$inject = ['$scope','$http'];

function appController($scope,$http){
	/* jshint validthis: true */


		function start(pos){
			var myCenter = new google.maps.LatLng(pos.lat, pos.lng);
			  var mapProp = {
		        center:myCenter,
		        zoom:16,
		        mapTypeId:google.maps.MapTypeId.ROADMAP
		      };

		      $scope.map = new google.maps.Map(document.getElementById("map"),mapProp);
		   	  $scope.markersInstance = [];
		      $scope.markers = [];
		}


	$scope.loadMap = function(data){
		console.log(data);
		$scope.cleanMap();
		for(var k = 0; k < data.coordenadas.length ; k++){
			var _marker = {
				position: new google.maps.LatLng(data.coordenadas[k].latitud, data.coordenadas[k].longitud),
				color:data.fillColor
			};
			$scope.markers.push(_marker);
		}
        for(var i in $scope.markers){
          $scope.placeMarkerTo($scope.markers[i],$scope.map);
        }    
	};

$scope.cleanMap= function(){
    for(var i in $scope.markers){
        $scope.markersInstance[i].setMap(null);
    }

    $scope.markers = []; 
    $scope.markersInstance = []; 
};



    $scope.placeMarkerTo = function(data,map){
	  var newMarker = new google.maps.Marker({
	   	 position:data.position,
	   	 map:map,
		    icon: {
		      path: google.maps.SymbolPath.CIRCLE,
		      scale: 8, //tamaño
		      strokeColor: data.color, //color del borde
		      strokeWeight: 1, //grosor del borde
		      fillColor: data.color, //color de relleno
		      fillOpacity:1// opacidad del relleno
		    },
	  });
	  $scope.markersInstance.push(newMarker);
};


$http.get('js/test.js').then(function(res){
	$scope.reciclajes = res.data;
	console.log(res);

	if (navigator.geolocation) {
	  var pos = {};	
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        start(pos);

    });
	}

	//$scope.loadMap(res.data);
});





}

})();