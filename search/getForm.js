$(document)
    .ready(function () {
        var table
        table = $('#example').DataTable({
            ajax: {
                url: 'https://bayclouds.com/getData/' + localStorage.getItem('user_id'),
                dataSrc: 'data'
            },
            scrollX: true,
            // responsive: true,
            destroy: true,
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
                }, {
                    data: 'doc_id',
                    "render": function (data, type, row, meta) {
                        // console.log(JSON.stringify(row)) row.addr_no
                        var raw = [
                            "'" + row.lat + "'",
                            "'" + row.lon + "'",
                            "'" + row.asset_type + "'",
                            "'" + row.moo + "'",
                            "'" + row.addr_no + "'"
                        ]
                        txt = "'sendEditForm','" + data + "','" + row.addr_no + "'," + raw + ""
                        del = "'" + data + "','" + row.addr_no + "'"
                        return '<i class="photo icon" style="color:green" onclick="getImg(' + data + ')"></i> | <i class="write icon" onclick="openEditModal(' + txt + ')"></i> | <i class="remove icon" style="color:red" onclick="delData(' + del + ')"></i> ';
                    }
                }
            ]
        });

        // setInterval(function () {
        //     table
        //         .ajax
        //         .reload();
        // }, 3000);

        $("#selAssetType").change(function () {
            // console.log($( "#selAssetType option:selected" ).val())
            var sel = $("#selAssetType option:selected").val()

            if (sel == 0) {
                sel = ""
                url = 'https://bayclouds.com/getData/' + localStorage.getItem('user_id')
            } else {
                url = 'https://bayclouds.com/getDataType/' + sel + "/" + localStorage.getItem('user_id')
            }

            table = $('#example').DataTable({
                ajax: {
                    url: url,
                    dataSrc: 'data'
                },
                destroy: true,
                scrollX: true,
                // responsive: true,
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
                    }, {
                        data: 'doc_id',
                        "render": function (data, type, row, meta) {
                            // console.log(JSON.stringify(row)) row.addr_no
                            var raw = [
                                "'" + row.lat + "'",
                                "'" + row.lon + "'",
                                "'" + row.asset_type + "'",
                                "'" + row.moo + "'",
                                "'" + row.addr_no + "'"
                            ]
                            txt = "'sendEditForm','" + data + "','" + row.addr_no + "'," + raw + ""
                            del = "'" + data + "','" + row.addr_no + "'"
                            return '<i class="photo icon" style="color:green" onclick="getImg(' + data + ')"></i> | <i class="write icon" onclick="openEditModal(' + txt + ')"></i> | <i class="remove icon" style="color:red" onclick="delData(' + del + ')"></i> ';
                        }
                    }
                ]
            });

        });

    });

function getImg(data) {
    $('#showImg').text('')

    var url = "https://bayclouds.com/getImg/" + data
    $.get(url, function (data, status) {
        // alert("Data: " + JSON.stringify(data) + " : " + status);
        dataImg = data.data
        if (status == 'success') {

            var img = ""
            $('#imgShow').text('')

            for (var key in dataImg) {

                srcImg = "<img  class='ui fluid image' src='http://203.154.82.62:9999/uploadsimg/" + dataImg[key]['filename'] + "'>"
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
}

function openEditModal(form, doc_id, old_addr_no, lat, lon, asset_type, moo, addr_no) {
    // console.log(JSON.stringify(row))
    $('.ai.modal').modal('show');
    btnOnClick = "sendEditData('" + form + "','" + doc_id + "','" + old_addr_no + "')"
    $('#btnEdit').attr('onclick', btnOnClick);

    $('#lat').val(lat)
    $('#lon').val(lon)
    $('#addr_no').val(addr_no)
    $('#editModal').text(doc_id)

    if (asset_type == "1") {
        $("#r1").prop("checked", true);
    } else if (asset_type == "2") {
        $("#r2").prop("checked", true);
    } else {
        $("#r3").prop("checked", true);
    }

    $("#moo").val(moo);

}

function sendEditData(form, doc_id, old_addr_no) {
    $("#btnEdit").addClass("loading");
    var dataJson = gForm(form)
    dataJson.old_addr_no = old_addr_no
    dataJson.doc_id = doc_id
    console.log(dataJson)
    $
        .ajax({method: "POST", url: "https://bayclouds.com/editFormData/", data: dataJson})
        .done(function (msg) {
            if (msg.status == "ok") {
                swal('แก้ไขสำเร็จแล้ว', '', 'success')
                $("#btnEdit").removeClass("loading");
                $('.ai.modal').modal('hide');
                $('#example').DataTable().ajax.reload();
            } else {
                alert("เกิดข้อผิดพลาด ในการบันทึกข้อมูล")
                $("#btnEdit").removeClass("loading");
                $('.ai.modal').modal('show');
            }
        });

}

function delData(doc_id, old_addr_no) {
    var txt;
    var r = confirm("คุณแน่ใจหรือไม่ค่ะ");
    if (r == true) {

        var dataJson = {}
        dataJson.doc_id = doc_id
        dataJson.old_addr_no = old_addr_no

        $
            .ajax({method: "POST", url: "https://bayclouds.com/delFormData/", data: dataJson})
            .done(function (msg) {
                if (msg.status == "ok") {
                    swal('ลบสำเร็จแล้ว', '', 'success')
                    // $("#btnEdit").removeClass("loading");
                    $('.ai.modal').modal('hide');
                    $('#example').DataTable().ajax.reload();
                } else {
                    alert("เกิดข้อผิดพลาด ในการบันทึกข้อมูล")
                    // $("#btnEdit").removeClass("loading");
                    $('.ai.modal').modal('show');
                }
            });
    } else {}
}