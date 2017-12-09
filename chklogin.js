function chklogin(params) {

    dataJson = {}
    dataJson.user = $('#user').val()
    dataJson.password = $('#password').val()

    $("#btnLogin").addClass("loading");

    $
        .ajax({method: "POST", url: "https://bayclouds/chklogin", data: dataJson})
        .done(function (msg) {
            if (msg.status == "ok") {
                localStorage.setItem("user_id", msg.user_id)
                localStorage.setItem("name", msg.name)
                if (localStorage.getItem('user_id')) {
                    window
                        .location
                        .replace("./main");
                } else {
                    swal('คุณเข้าระบบผิดวิธีค่ะ', 'กรุณาแจ้ง ogs.co.th', 'error')
                }
            } else if (msg.status == "deny") {
                swal('กรอกชื่อ/รหัส ผ่านผิดค่ะ', '', 'error')
            } else {
                swal('เกิดปัญหาการส่งข้อมูลของระบบค่ะ', 'กรุณาแจ้ง ogs.co.th', 'error')
            }
        });

    $("#btnLogin").removeClass("loading");

}

$(document)
    .keypress(function (e) {
        if (e.which == 13) {
            chklogin()
        }
    });