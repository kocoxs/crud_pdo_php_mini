$(function() {
  
  // LLamadas Ajax
  var id = "";
  function getAll(){
    $(".table_data").html("");
    $.ajax({
      method: "GET",
      url: "libreria/bd.php?operacion=listar",
      data: {},
      dataType: "json",
      success: function (data){
        console.log(data);
        for (var i = data.length - 1; i >= 0; i--) {
          var _html = $(".template_data").html();
          var fila = "";
          fila =  "<th>" + data[i].id + "</th>"
          fila += "<td>" + data[i].nombre+ "</td>"
          fila += "<td>" + data[i].correo+ "</td>"
          fila += "<td>" + data[i].fecha_nacimiento+ "</td>"
          fila += "<td>" + _html.replace("@@id_editar",data[i].id).replace("@@id_eliminar",data[i].id) + "</td>"
          $(".table_data").append( "<tr>" + fila + "</tr>");
        };
      }
    })
    .done(function( msg ) {
      console.log("consulta realizada exitosamente.");
    });
  }

  function crear(_nombre, _correo, _fecha) {
    $.ajax({
      method: "GET",
      url: "libreria/bd.php?operacion=crear",
      data: {nombre:_nombre, correo:_correo, fecha:_fecha },
      dataType: "json",
      success: function (data){
        if(data){
          getAll();
          alert("Creado Exitosamente");
          $("#myModal").modal('hide');
        }
      }
    })
    .done(function( msg ) {
      console.log("consulta crear realizada exitosamente.");
      $("#txt_nombre").val("");
      $("#txt_correo").val("");
      $("#txt_fecha").val("");
    });
  }

  function editar(_id ,_nombre, _correo, _fecha) {
    $.ajax({
      method: "GET",
      url: "libreria/bd.php?operacion=editar",
      data: {id: _id ,nombre:_nombre, correo:_correo, fecha:_fecha },
      dataType: "json",
      success: function (data){
        if(data){
          getAll();
          alert("Editado Exitosamente");
          $("#myModal2").modal('hide');
        }
      }
    })
    .done(function( msg ) {
      console.log("consulta crear realizada exitosamente.");
      $("#txt_nombre2").val("");
      $("#txt_correo2").val("");
      $("#txt_fecha2").val("");
    });
  }

  function eliminar(_id) {
    $.ajax({
      method: "GET",
      url: "libreria/bd.php?operacion=eliminar",
      data: {id:_id},
      dataType: "json",
      success: function (data){
        if(data){
          getAll();
          alert("Eliminado Exitosamente");
        }
      }
    })
    .done(function( msg ) {
      console.log("consulta Eliminar realizada exitosamente.");
    });
  }  

  // Funciones

  $( "#txt_fecha, #txt_fecha2" ).datepicker();

  $("#btn_nuevo").click(function(){
    var _nombre, _correo, _fecha;

    _nombre = $("#txt_nombre").val()
    _correo = $("#txt_correo").val()
    _fecha = $("#txt_fecha").val()

    crear(_nombre, _correo, _fecha);
  });

  $("#btn_editar").click(function(){
    var _nombre, _correo, _fecha;

    _nombre = $("#txt_nombre2").val()
    _correo = $("#txt_correo2").val()
    _fecha = $("#txt_fecha2").val()

    editar(id, _nombre, _correo, _fecha);
  });

  $( "table" ).on( "click", ".btn_editar", function() {
    console.log("Editar: ", $( this ));

    var fila = $($($($(this).parent()).parent()).children("td"))
    id = $($($($(this).parent()).parent()).children("th")).html()

    console.log(id);

    $("#txt_nombre2").val($(fila[0]).html())
    $("#txt_correo2").val($(fila[1]).html())
    $("#txt_fecha2").val($(fila[2]).html())

    $("#myModal2").modal('show');

  });

  $( "table" ).on( "click", ".btn_eliminar", function() {
    eliminar($(this).attr("data-id"))
  });

  getAll();

});