$(document)
    .ready(function () {
        var table = $('#example').DataTable({
            ajax: {
                url: 'https://bayclouds.com/getData/'+localStorage.getItem('user_id'),
                dataSrc: 'data'
            },
            responsive: true,
            columns: [
                {
                    data: 'moo'
                }, {
                    data: 'addr_no'
                }, {
                    data: 'lat'
                }, {
                    data: 'lon'
                }, {
                    data: 'doc_id'
                }
            ]
        });

        $('#example tbody').on('click', 'tr', function () {
            $('#showImg').text('')

            var data = table
                .row(this)
                .data();

            var url = "https://bayclouds.com/getImg/" + data.doc_id
            $.get(url, function (data, status) {
                // alert("Data: " + JSON.stringify(data) + " : " + status);
                dataImg = data.data
                if (status == 'success') {

                    var img = ""
                    $('#imgShow').text('')

                    for (var key in dataImg) {

                        srcImg = "<img  class='ui fluid image' src='https://bayclouds.com:9999/uploadsimg/" + dataImg[key]['filename'] + "'>"
                        console.log(srcImg)

                        img = "<div style='width:100%' class='image'>" + srcImg + "</div>"

                        $('#imgShow').append(img)
                    }

                } else {
                    alert("เกิดข้อผิดพลาดในการดึงรูปถ่ายค่ะ")
                }
            });

            $('#hDoc_id').text(data.doc_id)
            $('.fullscreen.modal').modal('show');
            // $('.ui.modal').modal('show'); alert('You clicked on ' + data.doc_id + '\'s
            // row');
        });

    });