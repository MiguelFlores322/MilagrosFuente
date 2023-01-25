var AppSession = "../Maestros/Vendedores.aspx";

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#divTabs').tabs();

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try {
            if (!F_ValidarGrabarDocumento())
                return false;

            if (confirm("ESTA SEGURO DE GRABAR"))
                F_GrabarDocumento();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnNuevo').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_Nuevo();
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
            if (!F_ValidarEdicionDocumento())
                return false;

            if (confirm("ESTA SEGURO DE ACTUALIZAR LOS DATOS DEL VENDEDOR"))
                F_EdicionRegistro();

            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    F_Controles_Inicializar();

    F_Derecha();

    $('#MainContent_txtNombreCompleto').css('background', '#FFFFE0');

    $('#MainContent_txtComision').css('background', '#FFFFE0');

    $('#MainContent_txtNroDni').css('background', '#FFFFE0');

    $('#MainContent_txtComision').css('background', '#FFFFE0');

    $('#MainContent_txtNombreCompletoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtComisionEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtNroDniEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtComisionEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcionConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtUsuario').css('background', '#FFFFE0');

    $('#MainContent_txtClave').css('background', '#FFFFE0');

    $("#MainContent_chkUsuario").click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        if ($(this).is(':checked')) {
            $('#MainContent_txtUsuario').prop('readonly', false);
            $('#MainContent_txtClave').prop('readonly', false);
        }
        else {
            $('#MainContent_txtUsuario').prop('readonly', false);
            $('#MainContent_txtClave').prop('readonly', false);
            $('#MainContent_txtUsuario').val('');
            $('#MainContent_txtClave').val('');
        }
    });
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
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodSerie: 52
            };


        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_Controles_Inicializar_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_Estado', result.split('~')[2]);
                        F_Update_Division_HTML('div_EstadoEdicion', result.split('~')[3]);
                        F_Update_Division_HTML('div_Ruta', result.split('~')[4]);
                        F_Update_Division_HTML('div_RutaEdicion', result.split('~')[5]);
                        F_Update_Division_HTML('div_TipoEmpleado', result.split('~')[6]);
                        F_Update_Division_HTML('div_TipoEmpleadoEdicion', result.split('~')[7]);
                        $('#MainContent_ddlEstado').val('1');
                        $('#MainContent_ddlRuta').val('1');
                        $('#MainContent_ddlEstado').css('background', '#FFFFE0');
                        $('#MainContent_ddlRuta').css('background', '#FFFFE0');
                        $('#MainContent_ddlEstadoEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlRutaEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoEmpleadoEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoEmpleado').css('background', '#FFFFE0');
                        if (result.split('~')[8] == '0') 
                            $('#MainContent_chkAdministrador').prop('disabled', true);
            
                        if (result.split('~')[9] == '0')
                            $('#MainContent_chkAprobacionCredito').prop('disabled', true);                    
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
    if (!F_SesionRedireccionar(AppSession)) return false;

    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'ddlTipoEmpleado').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Tipo Empleado';

        if ($(Cuerpo + 'ddlTipoEmpleado').val() == null)
            Cadena = Cadena + '<p></p>' + 'Tipo Empleado';

        if ($(Cuerpo + 'txtNroDni').val() == '' && $(Cuerpo + 'txtNroDni').val().length < 8)
            Cadena = Cadena + '<p></p>' + 'NRO DNI';

        if ($(Cuerpo + 'txtNombreCompleto').val() == '')
            Cadena = Cadena + '<p></p>' + 'NOMBRE COMPLETO';

        if ($(Cuerpo + 'txtComision').val() == '')
            Cadena = Cadena + '<p></p>' + 'COMISION';

        if ($(Cuerpo + 'ddlRuta').val() == '0')
            Cadena = Cadena + '<p></p>' + 'RUTA';

        if ($(Cuerpo + 'ddlRuta').val() == null)
            Cadena = Cadena + "<p></p>" + "Ruta";

        if ($(Cuerpo + 'ddlEstado').val() == '0')
            Cadena = Cadena + '<p></p>' + 'ESTADO';

        if ($(Cuerpo + 'ddlEstado').val() == null)
            Cadena = Cadena + '<p></p>' + 'Estado';

        if ($(Cuerpo + 'ddlEstado').val() == '0')
            Cadena = Cadena + '<p></p>' + 'ESTADO';

        if ($("#MainContent_chkUsuario").is(':checked') && $(Cuerpo + 'txtUsuario').val() == '')
            Cadena = Cadena + '<p></p>' + 'Usuario';

        if ($("#MainContent_chkUsuario").is(':checked') && $(Cuerpo + 'txtClave').val() == '')
            Cadena = Cadena + '<p></p>' + 'Clave';

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

function F_GrabarDocumento() {
    if (!F_SesionRedireccionar(AppSession)) return false;

    try {
        var Contenedor = '#MainContent_';
        var FlagAdministrador = 0;
        var FlagAprobacionCredito = 0;
        var FlagUsuario = 0;

        if ($("#MainContent_chkAdministrador").is(':checked'))
            FlagAdministrador = 1;

        if ($("#MainContent_chkAprobacionCredito").is(':checked'))
            FlagAprobacionCredito = 1;

        if ($("#MainContent_chkUsuario").is(':checked'))
            FlagUsuario = 1;

        var objParams = {
            Filtro_NroDni: $(Contenedor + 'txtNroDni').val(),
            Filtro_Vendedor: $(Contenedor + 'txtNombreCompleto').val(),
            Filtro_Comision: $(Contenedor + 'txtComision').val(),
            Filtro_CodRuta: $(Contenedor + 'ddlRuta').val(),
            Filtro_CodEstado: $(Contenedor + 'ddlEstado').val(),
            Filtro_Usuario: $(Contenedor + 'txtUsuario').val(),
            Filtro_Clave: $(Contenedor + 'txtClave').val(),
            Filtro_CodTipoEmpleado: $(Contenedor + 'ddlTipoEmpleado').val(),
            Filtro_FlagAdministrador: FlagAdministrador,
            Filtro_FlagAprobacionCredito: FlagAprobacionCredito,
            Filtro_FlagUsuario: FlagUsuario
        };


        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_GrabarDocumento_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se grabo correctamente') {
                    alertify.log('Se grabo correctamente.');
                    F_Nuevo();
                }
                else {
                    alertify.log(result.split('~')[1]);
                }
            }
            else {
                alertify.log(result.split('~')[1]);
            }

            return false;

        });
    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_Nuevo() {
    var Contenedor = '#MainContent_';
    $(Contenedor + 'txtNroDni').val('');
    $(Contenedor + 'ddlRuta').val('1');
    $(Contenedor + 'txtComision').val('');
    $(Contenedor + 'txtNombreCompleto').val('');
    $(Contenedor + 'txtUsuario').val('');
    $(Contenedor + 'txtClave').val('');
    $(Contenedor + 'txtUsuario').prop('readonly',true);
    $(Contenedor + 'txtClave').val('readonly',true);
    $(Contenedor + 'ddlTipoEmpleado').val(0);
    $("#MainContent_chkAdministrador").prop('checked',false);
    $("#MainContent_chkAprobacionCredito").prop('checked', false);
    $("#MainContent_chkUsuario").prop('checked', false);
}

function F_Buscar() {

    try {
        var objParams = {
            Filtro_Descripcion: $("#MainContent_txtDescripcionConsulta").val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_Buscar_NET(arg, function (result) {
            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {

                F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                if (str_mensaje_operacion != "")
                    alertify.log(result.split('~')[1]);

            }
            else {
                alertify.log(result.split('~')[1]);
            }

            return false;

        });
    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
        return false;
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
    if (!F_SesionRedireccionar(AppSession)) return false;
    try {
        var imgID = Fila.id;
        var lblCodVendedor = '#' + imgID.replace('imgEditarRegistro', 'lblCodVendedor');
        var lblDni = '#' + imgID.replace('imgEditarRegistro', 'lblDni');
        var lblVendedor = '#' + imgID.replace('imgEditarRegistro', 'lblVendedor');
        var lblComision = '#' + imgID.replace('imgEditarRegistro', 'lblComision');
        var hfCodRuta = '#' + imgID.replace('imgEditarRegistro', 'hfCodRuta');
        var hfCodEstado = '#' + imgID.replace('imgEditarRegistro', 'hfCodEstado');
        var Cuerpo = '#MainContent_';

        $('#hfCodVendedor').val($(lblCodVendedor).text());
        $(Cuerpo + 'txtNroDniEdicion').val($(lblDni).text());
        $(Cuerpo + 'txtNombreCompletoEdicion').val($(lblVendedor).text());
        $(Cuerpo + 'txtComisionEdicion').val($(lblComision).text());
        $(Cuerpo + 'ddlRutaEdicion').val($(hfCodRuta).val());
        $(Cuerpo + 'ddlEstadoEdicion').val($(hfCodEstado).val());

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

function F_EdicionRegistro() {
    try {
        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_CodVendedor: $('#hfCodVendedor').val(),
            Filtro_NroDni: $(Contenedor + 'txtNroDniEdicion').val(),
            Filtro_Vendedor: $(Contenedor + 'txtNombreCompletoEdicion').val(),
            Filtro_Comision: $(Contenedor + 'txtComisionEdicion').val(),
            Filtro_CodRuta: $(Contenedor + 'ddlRutaEdicion').val(),
            Filtro_CodEstado: $(Contenedor + 'ddlEstadoEdicion').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_EdicionRegistro_NET(arg, function (result) {
            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'SE ACTUALIZO CORRECTAMENTE') {
                    $(Contenedor + 'txtNroDniEdicion').val('');
                    $(Contenedor + 'txtNombreCompletoEdicion').val('');
                    $(Contenedor + 'txtComisionEdicion').val(0);
                    $(Contenedor + 'ddlRutaEdicion').val(0);
                    $(Contenedor + 'ddlEstadoEdicion').val(0);
                    $('#hfCodVendedor').val('0');
                    alertify.log('Se ACTUALIZO Correctamente.');
                    F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                    $('#divEdicionRegistro').dialog('close');
                }
                else
                    alertify.log(result.split('~')[1]);
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

function F_ValidarEdicionDocumento() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtNroDniEdicion').val() == '' && $(Cuerpo + 'txtNroDniEdicion').val().length < 8)
            Cadena = Cadena + '<p></p>' + 'NRO DNI';

        if ($(Cuerpo + 'txtNombreCompletoEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'NOMBRE COMPLETO';

        if ($(Cuerpo + 'txtComisionEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'COMISION';

        if ($(Cuerpo + 'ddlRutaEdicion').val() == '0')
            Cadena = Cadena + '<p></p>' + 'RUTA';

        if ($(Cuerpo + 'ddlEstadoEdicion').val() == '0')
            Cadena = Cadena + '<p></p>' + 'ESTADO';

        if ($(Cuerpo + 'ddlRutaEdicion').val() == null)
            Cadena = Cadena + "<p></p>" + "Ruta";

        if ($(Cuerpo + 'ddlEstadoEdicion').val() == null)
            Cadena = Cadena + '<p></p>' + 'Estado';

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