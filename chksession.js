function chkSession(){
    if (localStorage.getItem('user_id')) {
        console.log("chkSession: OK")
    } else {
        alert("หลุดจากระบบค่ะ")
        window
        .location
        .replace("../");
    }
}

function logout(){
    var txt;
    var r = confirm("คุณแน่ใจหรือไม่ค่ะ");
    if (r == true) {
        localStorage.clear()
        window
        .location
        .replace("../");
    } else {
        
    }


}
