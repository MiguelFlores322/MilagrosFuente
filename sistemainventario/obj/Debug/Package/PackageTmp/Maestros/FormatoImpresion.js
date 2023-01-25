var AppSession = "../Maestros/FormatoImpresion.aspx";

var CodigoMenu = 1000;
var CodigoInterno = 7;

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        maxDate: '0'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());

    $('#divTabs').tabs();

  
    

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (F_ValidarGrabar() == false)
                return false;

            F_GrabarFormatoImpresion();

            return false;
        }
        catch (e) {
            toastr.warning("Error Detectado: " + e);

        }
    });

    $('#MainContent_btnNuevo').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
           F_LimpiarCampos();

            return false;
        }

        catch (e) {

            toastr.warning("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnBuscarConsulta').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
        
            F_Buscar();
            return false;
        }

        catch (e) {

            toastr.warning("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnEdicion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            

            if (confirm("ESTA SEGURO DE ACTUALIZAR LOS DATOS DEL FORMATO IMPRESION"))
                F_EditarFormatoImpresion();
      
            return false;
        }
        catch (e) {
            toastr.warning("Error Detectado: " + e);
        }
    });

    F_Controles_Inicializar();

     $("#MainContent_txtSerie").ForceNumericOnly();
      $("#MainContent_txtSerieEdicion").ForceNumericOnly();
    $("#MainContent_txtNumeroItem").ForceNumericOnly();
      $("#MainContent_txtNumeroItemEdicion").ForceNumericOnly();
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
                         $('#MainContent_ddlEstado').css('background', '#FFFFE0');
                         $('#MainContent_ddlTipoFormato').val(0);
                         $('#MainContent_ddlTipoFormato').css('background', '#FFFFE0');
                         $('#MainContent_ddlTipoDocumento').val(0);
                         $('#MainContent_ddlTipoDocumento').css('background', '#FFFFE0');
                         $('#MainContent_txtSerie').val('');
                         $('#MainContent_txtSerie').css('background', '#FFFFE0');
                         $('#MainContent_txtNombre').val('');
                         $('#MainContent_txtNombre').css('background', '#FFFFE0');
                         $('#MainContent_txtImpresora').val('');
                         $('#MainContent_txtImpresora').css('background', '#FFFFE0');
                          $('#MainContent_txtDataTable').val('');
                          $('#MainContent_txtDataTable').css('background', '#FFFFE0');
                          $('#MainContent_txtNumeroItem').val('');
                          $('#MainContent_txtNumeroItem').css('background', '#FFFFE0');
                          $('#MainContent_txtDescripcionConsulta').css('background', '#FFFFE0');
                          $('#MainContent_ddlTipoDocConsulta').css('background', '#FFFFE0');
                          $('#MainContent_txtDesde').css('background', '#FFFFE0');
                          $('#MainContent_txtHasta').css('background', '#FFFFE0');
                         //edicion
                         $('#MainContent_ddlEstadoEdicion').val(0);
                        $('#MainContent_ddlEstadoEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoFormatoEdicion').val(0);
                         $('#MainContent_ddlTipoFormatoEdicion').css('background', '#FFFFE0');
                         $('#MainContent_ddlTipoDocumentoEdicion').val(0);
                         $('#MainContent_ddlTipoDocumentoEdicion').css('background', '#FFFFE0');
                         $('#MainContent_txtSerieEdicion').val('');
                         $('#MainContent_txtSerieEdicion').css('background', '#FFFFE0');
                         $('#MainContent_txtNombreEdicion').val('');
                         $('#MainContent_txtNombreEdicion').css('background', '#FFFFE0');
                         $('#MainContent_txtImpresoraEdicion').val('');
                         $('#MainContent_txtImpresoraEdicion').css('background', '#FFFFE0');
                          $('#MainContent_txtDataTableEdicion').val('');
                          $('#MainContent_txtDataTableEdicion').css('background', '#FFFFE0');
                          $('#MainContent_txtNumeroItemEdicion').val('');
                          $('#MainContent_txtNumeroItemEdicion').css('background', '#FFFFE0');
                          
                        
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
        url: 'FormatoImpresion.aspx/F_Inicializar_NET',
        data: "{'CodEstado':'0'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                $('#MainContent_ddlTipoFormato').empty();
                $.each(data.lTipoFormato, function (index, item) {
                    if (item.Estado === "A")
                        $('#MainContent_ddlTipoFormato').append($("<option></option>").val(item.CodConcepto).html(item.Formato));
                });
            }
            catch (x) { toastr.warning('ERROR AL CARGAR LOS FORMATOS'); }

              try {
                $('#MainContent_ddlTipoFormatoEdicion').empty();
                $.each(data.lTipoFormatoEditar, function (index, item) {
                    if (item.Estado === "A")
                        $('#MainContent_ddlTipoFormatoEdicion').append($("<option></option>").val(item.CodConcepto).html(item.Formato));
                });
            }
            catch (x) { toastr.warning('ERROR AL CARGAR LOS FORMATOS'); }

            try {
                $('#MainContent_ddlTipoDocumento').empty();
                $.each(data.lTipoDocumento, function (index, item) {
                    if (item.Estado === "A")
                        $('#MainContent_ddlTipoDocumento').append($("<option></option>").val(item.CodDoc).html(item.Documento));
                });
            }
            catch (x) { toastr.warning('ERROR AL CARGAR LOS DOCUMENTOS'); }

             try {
                $('#MainContent_ddlTipoDocConsulta').empty();
                $.each(data.lTipoDocumentoConsultar, function (index, item) {
                    if (item.Estado === "A")
                        $('#MainContent_ddlTipoDocConsulta').append($("<option></option>").val(item.CodDoc).html(item.Documento));
                });
            }
            catch (x) { toastr.warning('ERROR AL CARGAR LOS DOCUMENTOS'); }

              try {
                $('#MainContent_ddlTipoDocumentoEdicion').empty();
                $.each(data.lTipoDocumentoEditar, function (index, item) {
                    if (item.Estado === "A")
                        $('#MainContent_ddlTipoDocumentoEdicion').append($("<option></option>").val(item.CodDoc).html(item.Documento));
                });
            }
            catch (x) { toastr.warning('ERROR AL CARGAR LOS DOCUMENTOS'); }
            
            //F_AbrirDropzone_JS();

        },
        complete: function () {

        },
        error: function (response) {
            toastr.warning(response.responseText);
        },
        failure: function (response) {
            toastr.warning(response.responseText);
        }
    });





//    F_Buscar();
    return true;
}

function F_ValidarGrabar() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtSerie').val() == '')
            Cadena = Cadena + '<p></p>' + 'Serie del Documento';

            if ($(Cuerpo + 'txtNombre').val() == '')
            Cadena = Cadena + '<p></p>' + 'Nombre del Archivo';

            if ($(Cuerpo + 'txtImpresora').val() == '')
            Cadena = Cadena + '<p></p>' + 'Nombre de la Impresora';

            if ($(Cuerpo + 'txtDataTable').val() == '')
            Cadena = Cadena + '<p></p>' + 'Data Table';

            if ($(Cuerpo + 'txtNumeroItem').val() == '')
            Cadena = Cadena + '<p></p>' + 'Numero de Item';

        if ($(Cuerpo + 'ddlEstado').val() == 0 || $(Cuerpo + 'ddlEstado').val() == null)
            Cadena = Cadena + '<p></p>' + 'Seleccione Estado';

            if ($(Cuerpo + 'ddlTipoFormato').val() == 0 || $(Cuerpo + 'ddlTipoFormato').val() == null)
            Cadena = Cadena + '<p></p>' + 'Seleccione Formato';

            if ($(Cuerpo + 'ddlTipoDocumento').val() == 0 || $(Cuerpo + 'ddlTipoDocumento').val() == null)
            Cadena = Cadena + '<p></p>' + 'Seleccione Documento';

        if (Cadena != 'Ingresar los sgtes. Datos:') {
            toastr.warning(Cadena);
            return false;
        }
        return true;
    }

    catch (e) {

        toastr.warning("Error Detectado: " + e);
    }
}

function F_ValidarGrabarEdicion() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtSerieEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Serie del Documento';

            if ($(Cuerpo + 'txtNombreEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Nombre del Archivo';

            if ($(Cuerpo + 'txtImpresoraEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Nombre de la Impresora';

            if ($(Cuerpo + 'txtDataTableEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Data Table';

            if ($(Cuerpo + 'txtNumeroItemEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Numero de Item';

        if ($(Cuerpo + 'ddlEstadoEdicion').val() == 0 || $(Cuerpo + 'ddlEstadoEdicion').val() == null)
            Cadena = Cadena + '<p></p>' + 'Seleccione Estado';

            if ($(Cuerpo + 'ddlTipoFormatoEdicion').val() == 0 || $(Cuerpo + 'ddlTipoFormatoEdicion').val() == null)
            Cadena = Cadena + '<p></p>' + 'Seleccione Formato';

            if ($(Cuerpo + 'ddlTipoDocumentoEdicion').val() == 0 || $(Cuerpo + 'ddlTipoDocumentoEdicion').val() == null)
            Cadena = Cadena + '<p></p>' + 'Seleccione Documento';

        if (Cadena != 'Ingresar los sgtes. Datos:') {
            toastr.warning(Cadena);
            return false;
        }
        return true;
    }

    catch (e) {

        toastr.warning("Error Detectado: " + e);
    }
}

function F_GrabarFormatoImpresion() {
    if (F_ValidarGrabar() == false)
        return false;
        var chkDefecto=0;

        if($('#MainContent_chkDefecto').is(':checked'))
        chkDefecto=1;

        var FormatoImpresionCE = {};
        
        FormatoImpresionCE["CodConcepto"]= $('#MainContent_ddlTipoFormato').val();
        FormatoImpresionCE["CodDoc"] = $('#MainContent_ddlTipoDocumento').val();
        FormatoImpresionCE["SerieDoc"] = $('#MainContent_txtSerie').val();
        FormatoImpresionCE["NombreArchivo"] = $('#MainContent_txtNombre').val();
        FormatoImpresionCE["Impresora"] = $('#MainContent_txtImpresora').val();
        FormatoImpresionCE["Datatable"] = $('#MainContent_txtDataTable').val();
        FormatoImpresionCE["NroItem"] = $('#MainContent_txtNumeroItem').val();
        FormatoImpresionCE["FlagDefecto"] = chkDefecto;
        FormatoImpresionCE["CodEstado"] = $('#MainContent_ddlEstado').val();

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'FormatoImpresion.aspx/F_GrabarFormatoImpresion',
        dataType: "json",
        data: JSON.stringify(FormatoImpresionCE),
        success: function (dataObject) {
            var data = dataObject.d;
            try {
                if (data.MsgError === "") {
                    toastr.success('SE GRABO CORRECTAMENTE');
                    
                    
                   
                } else {
                    toastr.warning(data.MsgError);
                    console.log(data.MsgError);
                }
            }
            catch (x) { toastr.warning('ERROR AL grabar'); }
        },
        complete: function () {

        },
        error: function (response) {
            toastr.warning(response.responseText);
        },
        failure: function (response) {
            toastr.warning(response.responseText);
        }  
    });
    F_LimpiarCampos();
}

function F_EditarFormatoImpresion() {
    if (F_ValidarGrabarEdicion() == false)
        return false;
        var chkDefecto=0;

        if($('#MainContent_chkDefectoEdicion').is(':checked'))
        chkDefecto=1;

        
        

        var FormatoImpresionCE = {};
        FormatoImpresionCE["CodFormatoImpresion"]= $('#hfCodFormatoImpresionedicion').val();
        FormatoImpresionCE["CodConcepto"]= $('#MainContent_ddlTipoFormatoEdicion').val();
        FormatoImpresionCE["CodDoc"] = $('#MainContent_ddlTipoDocumentoEdicion').val();
        FormatoImpresionCE["SerieDoc"] = $('#MainContent_txtSerieEdicion').val();
        FormatoImpresionCE["NombreArchivo"] = $('#MainContent_txtNombreEdicion').val();
        FormatoImpresionCE["Impresora"] = $('#MainContent_txtImpresoraEdicion').val();
        FormatoImpresionCE["Datatable"] = $('#MainContent_txtDataTableEdicion').val();
        FormatoImpresionCE["NroItem"] = $('#MainContent_txtNumeroItemEdicion').val();
        FormatoImpresionCE["FlagDefecto"] = chkDefecto;
        FormatoImpresionCE["CodEstado"] = $('#MainContent_ddlEstadoEdicion').val();

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'FormatoImpresion.aspx/F_EditarFormatoImpresion',
        dataType: "json",
        data: JSON.stringify(FormatoImpresionCE),
        success: function (dataObject) {
            var data = dataObject.d;
            try {
                if (data.MsgError === "") {
                    toastr.success('SE ACTUALIZO CORRECTAMENTE');
                    
                    
                   $('#divEdicionRegistro').dialog('close');
                   F_Buscar();
                } else {
                    toastr.warning(data.MsgError);
                    console.log(data.MsgError);
                }
            }
            catch (x) { toastr.warning('ERROR AL grabar'); }
        },
        complete: function () {

        },
        error: function (response) {
            toastr.warning(response.responseText);
        },
        failure: function (response) {
            toastr.warning(response.responseText);
        }  
    });
    F_LimpiarCampos();
}

function F_Buscar() {
    try {
       var chkFecha = '0';
       var chkCliente = '0';

       if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = '1';

        if ($('#MainContent_chkCliente').is(':checked'))
            chkCliente = '1';

        var objParams = {
            
            Filtro_Serie: $("#MainContent_ddlTipoDocConsulta").val(),
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_ChkFecha: chkFecha,
            Filtro_ChkCliente: chkCliente,
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
var divEdicionRegistro_height = 400;
var divEdicionRegistro_width = 730
function F_Editar(Fila) {
     TipoOperacion = "Editar";

    var imgID = Fila.id;
        var CodFormatoImpresion = '#' + imgID.replace('imgReemplazar', 'hfCodFormatoImpresion');

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
    
    codigo = $(CodFormatoImpresion).val()
     if(codigo =="")
     codigo = 0


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'FormatoImpresion.aspx/F_ObtenerFormatoImpresion',
        data: "{'CodFormatoImpresion':'" + codigo + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                Formato=data.codTipoFormato
                $('#MainContent_ddlTipoFormatoEdicion').val(Formato);
                Documento=data.CodDoc
                $('#MainContent_ddlTipoDocumentoEdicion').val(Documento);
                $('#MainContent_txtSerieEdicion').val(data.SerieDoc);
                $('#MainContent_txtNombreEdicion').val(data.NombreArchivo);
                $('#MainContent_txtImpresoraEdicion').val(data.Impresora);
                $('#MainContent_txtDataTableEdicion').val(data.Datatable);
                $('#MainContent_txtNumeroItemEdicion').val(data.NroItem);
//                    $('#MainContent_txtDescripcionEdicion').val(data.Descripcion);
                    codestado=data.CodEstado
                    $('#MainContent_ddlEstadoEdicion').val(codestado);
                   if(data.FlagDefecto=='1'){
                    $('#MainContent_chkDefectoEdicion').prop('checked', true);
                    }else{
                     $('#MainContent_chkDefectoEdicion').prop('checked', false);
                    }
                    $('#hfCodFormatoImpresionedicion').val(data.CodFormatoImpresion);
                    $('#divEdicionRegistro').dialog('open');


                }
            }
            catch (x) { toastr.warning('ERROR AL CARGAR LOS MENUES'); }
        },
        complete: function () {

        },
        error: function (response) {
            toastr.warning(response.responseText);
        },
        failure: function (response) {
            toastr.warning(response.responseText);
        }
    });





}

function F_EliminarRegistro(Fila) {
     TipoOperacion = "Editar";

    var imgID = Fila.id;
        var CodFormatoImpresion = '#' + imgID.replace('imgAnularDocumento', 'hfCodFormatoImpresion');
        var FormatoImpresion = '#' + imgID.replace('imgAnularDocumento', 'hfCodFormatoImpresion');

        var FormatoImpresionCE = {};
        
        FormatoImpresionCE["CodFormatoImpresion"] = $(CodFormatoImpresion).val()

    F_LimpiarCampos();

   if (!confirm("ESTA SEGURO DE ELIMINAR EL FORMATO DE IMPRESION " ))
            return false;
    
    


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'FormatoImpresion.aspx/F_EliminaFormatoImpresion',
        data: JSON.stringify(FormatoImpresionCE),
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "El Formato de Impresion se elimino correctamente.") {
                    
                    //$('#MainContent_txtClaveOperacionesEspeciales').val(data.ClaveOperacionesEspeciales.trim());
                    
                    F_Buscar();
                    toastr.success(data.MsgError);

                }
            }
            catch (x) { toastr.warning('ERROR AL CARGAR LAS ZONAS'); }
        },
        complete: function () {

        },
        error: function (response) {
            toastr.warning(response.responseText);
        },
        failure: function (response) {
            toastr.warning(response.responseText);
        }
    });





}

function F_LimpiarCampos() {
   
    $('#MainContent_txtSerie').val("");
    $('#MainContent_txtNombre').val("");
    $('#MainContent_txtImpresora').val("");
    $('#MainContent_txtDataTable').val("");
    $('#MainContent_txtNumeroItem').val("");

    $('#MainContent_ddlTipoFormato').val("0");
    $('#MainContent_ddlTipoFormato').val("0");
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
     $('#MainContent_chkRango').prop('checked', true);
$('#MainContent_ddlTipoDocConsulta').val(0);
     MainContent_ddlTipoDocConsulta
    F_Buscar();
    return false;
}