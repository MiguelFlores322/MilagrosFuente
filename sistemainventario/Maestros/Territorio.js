var AppSession = "../Maestros/Territorio.aspx";

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

            F_GrabarTerritorio();

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
        $('#MainContent_btnGenerarPdf').prop("disabled", false); //desabilitar.
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
            

            if (confirm("ESTA SEGURO DE ACTUALIZAR LOS DATOS DEL TERRITORIO"))
                F_EditarTerritorio();
      
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    F_Controles_Inicializar();

    $('#MainContent_ddlEstadoEdicion').prop("disabled", true); 
    
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
                        $('#MainContent_ddlEstadoEdicion').css('background', '#FFFFE0');
                        $('#MainContent_txtDescripcionConsulta').val('');
                        $('#MainContent_ddlEstado').css('background', '#FFFFE0');
                        $('#MainContent_txtDescripcion').css('background', '#FFFFE0');
                        $('#MainContent_txtDescripcionConsulta').css('background', '#FFFFE0');
                        $('#MainContent_txtDescripcionEdicion').css('background', '#FFFFE0');

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

function F_ValidarGrabar() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';
        if ($(Cuerpo + 'txtDescripcion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Territorio';
        if ($(Cuerpo + 'ddlEstado').val() == 0 || $(Cuerpo + 'ddlEstado').val() == null)
            Cadena = Cadena + '<p></p>' + 'Seleccione Estado';
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

function F_GrabarTerritorio() {
    if (F_ValidarGrabar() == false)
        return false;


        var TerritorioCE = {};
        TerritorioCE["Descripcion"]= $('#MainContent_txtDescripcion').val();
        TerritorioCE["CodEstado"] = $('#MainContent_ddlEstado').val();

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Territorio.aspx/F_GrabarTerritorio',
        dataType: "json",
        data: JSON.stringify(TerritorioCE),
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

function F_EditarTerritorio() {
    if (F_ValidarGrabarEdicion() == false)
        return false;
        
        

        var TerritorioCE = {};
         TerritorioCE["CodTerritorio"] = $('#hfCodTerritorio').val();
        TerritorioCE["Descripcion"]= $('#MainContent_txtDescripcionEdicion').val();
        TerritorioCE["CodEstado"] = $('#MainContent_ddlEstadoEdicion').val();

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Territorio.aspx/F_EditarTerritorio',
        dataType: "json",
        data: JSON.stringify(TerritorioCE),
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
                    toastr.warning(str_mensaje_operacion);
            }
            else {
                toastr.warning(result.split('~')[1]);
            }

            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        toastr.warning("Error Detectado: " + e);
        return false;
    }
}
var TipoOperacion = '';
var divEdicionRegistro_height = 200;
var divEdicionRegistro_width = 725
function F_Editar(Fila) {
     TipoOperacion = "Editar";

    var imgID = Fila.id;
        var CodTerritorio = '#' + imgID.replace('imgReemplazar', 'lblCodTerritorio');

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
    
    codigo = $(CodTerritorio).val()
     if(codigo ==0)
     codigo = 0


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Territorio.aspx/F_ObtenerTerritorio',
        data: "{'CodTerritorio':'" + codigo + "'}",
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
                    $('#hfCodTerritorio').val(data.CodTerritorio);
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
        var CodTerritorio = '#' + imgID.replace('imgAnularDocumento', 'lblCodTerritorio');
        var Territorio = '#' + imgID.replace('imgAnularDocumento', 'lblTerritorio');

        var TerritorioCE = {};
        
        TerritorioCE["CodTerritorio"] = $(CodTerritorio).val()

    F_LimpiarCampos();

   if (!confirm("ESTA SEGURO DE ELIMINAR EL TERRITORIO " + $(Territorio).text()))
            return false;

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Territorio.aspx/F_EliminarTerritorio',
        data: JSON.stringify(TerritorioCE),
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "El territorio se elimino correctamente.") {
                    
                    //$('#MainContent_txtClaveOperacionesEspeciales').val(data.ClaveOperacionesEspeciales.trim());
                    
                    F_Buscar();
                    alertify.log(data.MsgError);

                }
            }
            catch (x) { alertify.log('ERROR AL CARGAR LOS TERRITORIO'); }
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
