var AppSession = "../Maestros/Configuracion.aspx";



$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#MainContent_btnBuscar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {

            F_Buscar();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (!F_ValidarGrabarDocumento())
                return false;

            if (confirm("ESTA SEGURO DE GRABAR EL TIPO DE CAMBIO"))
                F_GrabarDocumento();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    F_Controles_Inicializar();

    $('#MainContent_txtCodDet').css('background', '#FFFFE0');
    $('#MainContent_txtNombre').css('background', '#FFFFE0');
    $('#MainContent_txtValor').css('background', '#FFFFE0');
});

$().ready(function () {

    $(document).everyTime(900000, function () {
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
        var objParams =
            {
                Filtro_Maestra: $('#MainContent_ddlGrupoMaestra').val()

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
                        F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);
                    }
                    else {

                        alertify.log(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
        MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);

    }

}

function F_Buscar() {

    var arg;

    try {
        var objParams =
            {
                Filtro_Maestra: $('#MainContent_ddlGrupoMaestra').val()

            };


        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Buscar_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);
                    }
                    else {

                        alertify.log(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {

        alertify.log("Error detectado: " + mierror);

    }

}

function F_ValidarGrabarDocumento() {

    try {

        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p>';

        if ($(Cuerpo + 'txtNombre').val().trim() == '')
            Cadena = Cadena + '<p></p>' + 'Nombre';

        if ($(Cuerpo + 'txtValor').val() == '')
            Cadena = Cadena + '<p></p>' + 'Valor';

        if (Cadena != 'Ingresar los sgtes. Datos: <br> <p></p>') {
            alertify.log(Cadena);
            return false;
        }
        return true;
    }
    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}

function F_GrabarDocumento() {
    var Contenedor = '#MainContent_';
    try {

        var objParams = {
            Filtro_CodDetMaestra: $(Contenedor + 'txtCodDet').val(),
            Filtro_Nombre: $(Contenedor + 'txtNombre').val(),
            Filtro_Valor: $(Contenedor + 'txtValor').val(),
            Filtro_Activo: $(Contenedor + 'chkActivo').is(":checked"),
            Filtro_Maestra: $(Contenedor +'ddlGrupoMaestra').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_GrabarDocumento_NET(arg, function (result) {
            //                var Entity = Sys.Serialization.JavaScriptSerializer.deserialize(result);

            //                MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_mensaje_operacion == "Se grabo correctamente") {
                F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);
                alertify.log(str_mensaje_operacion);
                $('#divEdicionRegistro').dialog('close');
            }
            else {
                alertify.log(result.split('~')[1]);
            }

            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}


function grabarDocumento() {
    if (F_ValidarGrabarDocumento()) {
        F_GrabarDocumento();
    }
}


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



function F_EditarRegistro(Fila) {
    try {
        var imgID = Fila.id;
        var lblCodDetalle = '#' + imgID.replace('imgEditarRegistro', 'lblId');
        var lblNombre = '#' + imgID.replace('imgEditarRegistro', 'lblNombre');
        var lblValor = '#' + imgID.replace('imgEditarRegistro', 'lblValor');
        var chkActivo = '#' + imgID.replace('imgEditarRegistro', 'chkActivo');
         
        var Cuerpo = '#MainContent_';

        $(Cuerpo + 'txtCodDet').val($(lblCodDetalle).text());
        $(Cuerpo + 'txtNombre').val($(lblNombre).text());
        $(Cuerpo + 'txtValor').val($(lblValor).text());
        $(Cuerpo + 'chkActivo').prop('checked',$(chkActivo).is(":checked"));

        $("#divEdicionRegistro").dialog({
            resizable: false,
            modal: true,
            title: "Edicion de Vendedor",
            title_html: true,
            height: 200,
            width: 670,
            autoOpen: false
        });

        $('#divEdicionRegistro').dialog('open');
        return false;
    }
    catch (e) {
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

