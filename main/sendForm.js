$(document)
    .ready(function () {

        $('#uploadForm')
            .submit(function () {

                $("#save").addClass("loading");
                 
                var txt;
                var r = confirm("คุณแน่ใจหรือไม่ค่ะ");
                if (r == true) {
                    var data = $('#formData').serializeArray()
                    var dataJson = {}
                    var doc_id = Math.floor((Math.random() * 9999) + 1000)

                    $(this).ajaxSubmit({
                        error: function (xhr) {
                            console.log('Error: ' + xhr.status);
                            $("#save").removeClass("loading");
                        },
                        success: function (response) {
                            console.log(response)
                            var arrImg = []
                            for (f = 0; f < response.file.length; f++) {
                                arrImg.push(response.file[f])
                            }

                            console.log("arr IMG >>" + arrImg)
                            $
                                .ajax({
                                    method: "POST",
                                    url: "https://bayclouds.com/saveImg",
                                    data: {
                                        "doc_id": doc_id,
                                        "file": arrImg
                                    }
                                })
                                .done(function (msg) {
                                    if (msg.status == "ok") {
                                        console.log("Save IMG Ok")
                                        $('#file1').val('')

                                        $.each(data, function (key, value) {
                                            dataJson[value.name] = value.value
                                        });

                                        dataJson.doc_id = doc_id
                                        dataJson.user_id = localStorage.getItem('user_id')

                                        console.log(dataJson)

                                        $
                                            .ajax({method: "POST", url: "https://bayclouds.com/sendFormData", data: dataJson})
                                            .done(function (msg) {
                                                if (msg.status == "ok") {
                                                    swal('บันทึกสำเร็จแล้ว', 'รหัสของคุณคือ : ' + doc_id, 'success')
                                                    $("#save").removeClass("loading");
                                                } else {
                                                    alert("เกิดข้อผิดพลาด ในการบันทึกข้อมูล")
                                                    $("#save").removeClass("loading");
                                                }
                                            });

                                    } else {
                                        console.log("No IMG Fail")
                                        $.each(data, function (key, value) {
                                            dataJson[value.name] = value.value
                                        });

                                        dataJson.doc_id = doc_id
                                        dataJson.user_id = localStorage.getItem('user_id')

                                        console.log(dataJson)

                                        $
                                            .ajax({method: "POST", url: "https://bayclouds.com/sendFormData", data: dataJson})
                                            .done(function (msg) {
                                                if (msg.status == "ok") {
                                                    swal('บันทึกสำเร็จแล้ว', 'รหัสของคุณคือ : ' + doc_id, 'success')
                                                    $("#save").removeClass("loading");
                                                } else {
                                                    alert("เกิดข้อผิดพลาด ในการบันทึกข้อมูล")
                                                    $("#save").removeClass("loading");
                                                }
                                            });
                                    }
                                });
                        }
                    });

                    return false;
                } else {
                    return false;
                    $("#save").removeClass("loading");
                }

            });

    });