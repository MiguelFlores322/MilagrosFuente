var AppSession = "../Maestros/Zona.aspx";

var CodigoMenu = 1000;
var CodigoInterno = 7;

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#divTabs').tabs();

  
    

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (F_ValidarGrabar() == false)
                return false;

            F_GrabarZona();

            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);

        }
    });

    $('#MainContent_btnNuevo').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
           F_LimpiarCampos();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnBuscarConsulta').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
        
            F_Buscar();
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnEdicion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            

            if (confirm("ESTA SEGURO DE ACTUALIZAR LOS DATOS DE LA ZONA"))
                F_EditarZona();
      
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    F_Controles_Inicializar();

    
});

$().ready(function () {

    $(document).everyTime(600000, function () {
        if (!F_ValidaSesionActiva(AppSession)) return false;
    });


});

$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' || d.type.toUpperCase() === 'EMAIL'))
             || d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else {
            doPrevent = true;
        }
    }

    if (doPrevent) {
        event.preventDefault();
    }
});

function VerifySessionState(result) { }

function F_Controles_Inicializar() {
    var arg;
    try {
        var objParams = {
        
        };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Controles_Inicializar_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_Estado', result.split('~')[2]);
                        F_Update_Division_HTML('div_EstadoEdicion', result.split('~')[3]);
                        $('#MainContent_ddlEstado').val(0);
                         $('#MainContent_ddlEstadoEdicion').val(0);
                         $('#MainContent_ddlTerritorio').val(0);
                         $('#MainContent_ddlTerritorioEdicion').val(0);
                        $('#MainContent_ddlEstadoEdicion').css('background', '#FFFFE0');
                        $('#MainContent_txtDescripcionConsulta').val('');
                        $('#MainContent_ddlEstado').css('background', '#FFFFE0');
                          $('#MainContent_ddlTerritorio').css('background', '#FFFFE0');
                          $('#MainContent_ddlTerritorioEdicion').css('background', '#FFFFE0');
                        $('#MainContent_txtDescripcion').css('background', '#FFFFE0');
                        $('#MainContent_txtDescripcionConsulta').css('background', '#FFFFE0');
                        $('#MainContent_txtDescripcionEdicion').css('background', '#FFFFE0');
                        F_InicializarCombo();
                    }
                    else {
                        toastr.warning(str_mensaje_operacion);
                    }
                }
            );
    } catch (mierror) {
        MostrarEspera(false);
        toastr.warning("Error detectado: " + mierror);
    }
}

function F_InicializarCombo() {
    if (!F_SesionRedireccionar(AppSession)) return false;

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Zona.aspx/F_Inicializar_NET',
        data: "{'CodEstado':'0'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                $('#MainContent_ddlTerritorio').empty();
                $.each(data.lTerritorio, function (index, item) {
                    if (item.CodEstado === 1)
                        $('#MainContent_ddlTerritorio').append($("<option></option>").val(item.CodTerritorio).html(item.Descripcion ));
                });
            }
            catch (x) { alertify.log('ERROR AL CARGAR LOS TERRITORIOS'); }

            try {
                $('#MainContent_ddlTerritorioEdicion').empty();
                $.each(data.lTerritorioEditar, function (index, item) {
                    if (item.CodEstado === 1)
                        $('#MainContent_ddlTerritorioEdicion').append($("<option></option>").val(item.CodTerritorio).html(item.Descripcion ));
                });
            }
            catch (x) { alertify.log('ERROR AL CARGAR LOS TERRITORIOS'); }
            //F_AbrirDropzone_JS();

        },
        complete: function () {

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }
    });





    F_Buscar();
    return true;
}

function F_ValidarGrabar() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtDescripcion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Territorio';

        if ($(Cuerpo + 'ddlEstado').val() == 0 || $(Cuerpo + 'ddlEstado').val() == null)
            Cadena = Cadena + '<p></p>' + 'Seleccione Estado';

            if ($(Cuerpo + 'ddlTerritorio').val() == 0 || $(Cuerpo + 'ddlTerritorio').val() == null)
            Cadena = Cadena + '<p></p>' + 'Seleccione Territorio';

        if (Cadena != 'Ingresar los sgtes. Datos:') {
            alertify.log(Cadena);
            return false;
        }
        return true;
    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}

function F_ValidarGrabarEdicion() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtDescripcionEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Territorio';

        if ($(Cuerpo + 'ddlEstadoEdicion').val() == 0 || $(Cuerpo + 'ddlEstadoEdicion').val() == null)
            Cadena = Cadena + '<p></p>' + 'Seleccione Estado';

             if ($(Cuerpo + 'ddlTerritorioEdicion').val() == 0 || $(Cuerpo + 'ddlTerritorioEdicion').val() == null)
            Cadena = Cadena + '<p></p>' + 'Seleccione Territorio';

        if (Cadena != 'Ingresar los sgtes. Datos:') {
            alertify.log(Cadena);
            return false;
        }
        return true;
    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}

function F_GrabarZona() {
    if (F_ValidarGrabar() == false)
        return false;


        var ZonaCE = {};
        ZonaCE["CodEstado"] = $('#MainContent_ddlEstado').val();
        ZonaCE["Descripcion"]= $('#MainContent_txtDescripcion').val();
        ZonaCE["CodTerritorio"] = $('#MainContent_ddlTerritorio').val();

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Zona.aspx/F_GrabarZona',
        dataType: "json",
        data: JSON.stringify(ZonaCE),
        success: function (dataObject) {
            var data = dataObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('SE GRABO CORRECTAMENTE');
                    
                    
                   
                } else {
                    alertify.log(data.MsgError);
                    console.log(data.MsgError);
                }
            }
            catch (x) { alertify.log('ERROR AL grabar'); }
        },
        complete: function () {

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }  
    });
    F_LimpiarCampos();
}

function F_EditarZona() {
    if (F_ValidarGrabarEdicion() == false)
        return false;
        
        

        var ZonaCE = {};
        ZonaCE["CodTerritorio"] = $('#MainContent_ddlTerritorioEdicion').val();
         ZonaCE["CodZona"] = $('#hfCodZona').val();
        ZonaCE["Descripcion"]= $('#MainContent_txtDescripcionEdicion').val();
        ZonaCE["CodEstado"] = $('#MainContent_ddlEstadoEdicion').val();

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Zona.aspx/F_EditarZona',
        dataType: "json",
        data: JSON.stringify(ZonaCE),
        success: function (dataObject) {
            var data = dataObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('SE ACTUALIZO CORRECTAMENTE');
                    
                    
                   $('#divEdicionRegistro').dialog('close');
                   F_Buscar();
                } else {
                    alertify.log(data.MsgError);
                    console.log(data.MsgError);
                }
            }
            catch (x) { alertify.log('ERROR AL grabar'); }
        },
        complete: function () {

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }  
    });
    F_LimpiarCampos();
}

function F_Buscar() {
    try {
       

        var objParams = {
            Filtro_Descripcion: $("#MainContent_txtDescripcionConsulta").val(),
            
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_Buscar_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                if (str_mensaje_operacion != '')
                    alertify.warning(str_mensaje_operacion);
            }
            else {
                alertify.warning(result.split('~')[1]);
            }

            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        alertify.warning("Error Detectado: " + e);
        return false;
    }
}
var TipoOperacion = '';
var divEdicionRegistro_height = 200;
var divEdicionRegistro_width = 730
function F_Editar(Fila) {
     TipoOperacion = "Editar";

    var imgID = Fila.id;
        var CodZona = '#' + imgID.replace('imgReemplazar', 'lblCodZona');

    F_LimpiarCampos();

    $("#divEdicionRegistro").dialog({
        resizable: false,
        modal: true,
        title: "Edicion de Territorio",
        title_html: true,
        height: divEdicionRegistro_height,
        width: divEdicionRegistro_width,
        autoOpen: false
    });
    
    codigo = $(CodZona).val()
     if(codigo ==0)
     codigo = 0


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Zona.aspx/F_ObtenerZona',
        data: "{'codZona':'" + codigo + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    $('#MainContent_txtDescripcionEdicion').val(data.Descripcion);
                    if(data.CodEstado=='1')
                    $('#MainContent_ddlEstadoEdicion').val(1);
                    if(data.CodEstado=='2')
                    $('#MainContent_ddlEstadoEdicion').val(2);
                    //$('#MainContent_txtClaveOperacionesEspeciales').val(data.ClaveOperacionesEspeciales.trim());
                    codigo= data.CodTerritorio
                    $('#MainContent_ddlTerritorioEdicion').val(codigo);
                    $('#hfCodZona').val(data.CodZona);
                    $('#divEdicionRegistro').dialog('open');


                }
            }
            catch (x) { alertify.log('ERROR AL CARGAR LOS MENUES'); }
        },
        complete: function () {

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }
    });





}

function F_EliminarRegistro(Fila) {
     TipoOperacion = "Editar";

    var imgID = Fila.id;
        var CodZona = '#' + imgID.replace('imgAnularDocumento', 'lblCodZona');
        var Zona = '#' + imgID.replace('imgAnularDocumento', 'lblZona');

        var ZonaCE = {};
        
        ZonaCE["CodZona"] = $(CodZona).val()

    F_LimpiarCampos();

   if (!confirm("ESTA SEGURO DE ELIMINAR LA ZONA " + $(Zona).text()))
            return false;
    
    


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Zona.aspx/F_EliminaZona',
        data: JSON.stringify(ZonaCE),
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "La Zona se elimino correctamente.") {
                    
                    //$('#MainContent_txtClaveOperacionesEspeciales').val(data.ClaveOperacionesEspeciales.trim());
                    
                    F_Buscar();
                    alertify.log(data.MsgError);

                }
            }
            catch (x) { alertify.log('ERROR AL CARGAR LAS ZONAS'); }
        },
        complete: function () {

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }
    });





}

function F_LimpiarCampos() {
    $('#MainContent_txtDescripcion').val("");
    
    $('#MainContent_ddlEstado').val("0");
    $('#MainContent_ddlTerritorio').val("0");
    return true;
}

function esnumero(campo) { return (!(isNaN(campo))); }

function MostrarEspera(pboolMostrar) {
    if (pboolMostrar) {
        $('#dlgWait').dialog({
            autoOpen: false,
            modal: true,
            height: 'auto',
            resizable: false,
            dialogClass: 'alert'
        });

        $('.alert div.ui-dialog-titlebar').hide();
        //        $('.ui-button').remove();
        $('#dlgWait').dialog('open');
    }
    else {
        $('#dlgWait').dialog('close');
    }
}

function numerar() {
    var c = 0;
    $('.detallesart2').each(function () {
        c++;
        $(this).text(c.toString());
    });
    $("#MainContent_lblNumRegistros").text(c);
}

function getContentTab() {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
   $('#MainContent_txtDescripcionConsulta').val("");
    
    F_Buscar();
    return false;
}