function mGet(form, url) {
    console.log("mGet Ready")
}

function gForm(form) {
    var Nform = '#'+form
    console.log(Nform)
    var data = $(Nform).serializeArray()
    var dataJson = {}
    $.each(data, function (key, value) {
        dataJson[value.name] = value.value
    });
    return dataJson
}


function openSidebar() {
    $('.ui.sidebar')
    .sidebar('toggle')
  ;
}