var map;
var uluru = {
    lat: 16.439625,
    lng: 102.828728
};

// var marker = []
var gmarkers = []


function initMap() {
    map = new google
        .maps
        .Map(document.getElementById('map'), {
            center:  uluru,
            zoom: 10
        });

    var marker = new google
        .maps
        .Marker({position: uluru, map: map, title: 'Maker', draggable: true});

    google
        .maps
        .event
        .addListener(marker, 'click', function () {
            console.log('Click >>')
        });

    google
        .maps
        .event
        .addListener(marker, 'dragend', function () {
            var my_Point = marker.getPosition(); // หาตำแหน่งของตัว marker เมื่อกดลากแล้วปล่อย
            map.panTo(my_Point); // ให้แผนที่แสดงไปที่ตัว marker

            $("#lat").val(my_Point.lat()); // เอาค่า latitude ตัว marker แสดงใน textbox id=lat
            $("#lon").val(my_Point.lng()); // เอาค่า longitude ตัว marker แสดงใน textbox id=lon
        });   
}

function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    // clearMarkers();
    marker = [];
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    alert("อุปกรณ์ของคุณไม่สนับสนุนระบบ GPS Geolocation")
}

function setCenter() {

    $("#btnSetCenter").addClass("loading");
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator
            .geolocation
            .getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                console.log(">>" + pos.lat + "//" + pos.lng)
                // clearMarkers()
                var marker = new google
                    .maps
                    .Marker({
                        position: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        map: map,
                        title: 'Maker',
                        draggable: true
                    });

                google
                    .maps
                    .event
                    .addListener(marker, 'dragend', function () {
                        var my_Point = marker.getPosition(); // หาตำแหน่งของตัว marker เมื่อกดลากแล้วปล่อย
                        map.panTo(my_Point); // ให้แผนที่แสดงไปที่ตัว marker

                        $("#lat").val(my_Point.lat()); // เอาค่า latitude ตัว marker แสดงใน textbox id=lat
                        $("#lon").val(my_Point.lng()); // เอาค่า longitude ตัว marker แสดงใน textbox id=lon
                    });

                map.setCenter(pos);
                map.setZoom(17);

                $("#lat").val(pos.lat);
                $("#lon").val(pos.lng);

                $("#btnSetCenter").removeClass("loading");

            }, function () {
                alert("อุปกรณ์ของคุณไม่สนับสนุนระบบ GPS Geolocation")
            });
    } else {
        // Browser doesn't support Geolocation
        alert("อุปกรณ์ของคุณไม่สนับสนุนระบบ GPS Geolocation")
    }

}