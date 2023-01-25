var AppSession = "../Maestros/Clientes.aspx";
var CodigoMenu = 1000;
var CodigoInterno = 11;

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    $('table[id$="MainContent_grvDireccion"] input.txtDistrito').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: '../Servicios/Servicios.asmx/F_TCDistrito_Listar',
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: "{ 'Descripcion' : '" + request.term + "'}",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[3],
                            val: item.split(',')[0],
                            CodProvincia: item.split(',')[1],
                            CodDistrito: item.split(',')[2]
                        }
                    }))
                },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfRegionEdicion').val(i.item.val);
            $('#hfProvinciaEdicion').val(i.item.CodProvincia);
            $('#hfDistritoEdicion').val(i.item.CodDistrito);
        },
        minLength: 3
    });

    $('#MainContent_txtDistrito').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCDistrito_Listar',
                data: "{'Descripcion':'" + request.term + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[3],
                            val: item.split(',')[0],
                            CodProvincia: item.split(',')[1],
                            CodDistrito: item.split(',')[2]
                        }
                    }))
                },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfRegion').val(i.item.val);
            $('#hfProvincia').val(i.item.CodProvincia);
            $('#hfDistrito').val(i.item.CodDistrito);
        },
        minLength: 3
    });

    $('#MainContent_txtDistritoEdicion').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCDistrito_Listar',
                data: "{'Descripcion':'" + request.term + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[3],
                            val: item.split(',')[0],
                            CodProvincia: item.split(',')[1],
                            CodDistrito: item.split(',')[2]
                        }
                    }))
                },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfRegionEdicion').val(i.item.val);
            $('#hfProvinciaEdicion').val(i.item.CodProvincia);
            $('#hfDistritoEdicion').val(i.item.CodDistrito);
        },
        minLength: 3
    });

    $('#MainContent_txtDistritoDireccionEdicion').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCDistrito_Listar',
                data: "{'Descripcion':'" + request.term + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[3],
                            val: item.split(',')[0],
                            CodProvincia: item.split(',')[1],
                            CodDistrito: item.split(',')[2]
                        }
                    }))
                },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfRegion').val(i.item.val);
            $('#hfProvincia').val(i.item.CodProvincia);
            $('#hfDistrito').val(i.item.CodDistrito);
        },
        minLength: 3
    });

    $('#MainContent_txtDistritoMultiple').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCDistrito_Listar',
                data: "{'Descripcion':'" + request.term + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[3],
                            val: item.split(',')[0],
                            CodProvincia: item.split(',')[1],
                            CodDistrito: item.split(',')[2]
                        }
                    }))
                },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfRegionEdicion').val(i.item.val);
            $('#hfProvinciaEdicion').val(i.item.CodProvincia);
            $('#hfDistritoEdicion').val(i.item.CodDistrito);
        },
        minLength: 3
    });

    $('#MainContent_txtTransportista').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 2 + "','CodTipoCliente':'" + 2 + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Direccion: item.split(',')[2]
                        }
                    }))
                },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfCodTransportista').val(i.item.val);

        },
        minLength: 3
    });


    $('#MainContent_txtTransportistaEdicion').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 2 + "','CodTipoCliente':'" + 2 + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Direccion: item.split(',')[2]
                        }
                    }))
                },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfCodTransportistaEdicion').val(i.item.val);

        },
        minLength: 3
    });

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#divTabs').tabs();

    $('#MainContent_imgBuscar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val == "")
                cadena = cadena + "\n" + "Articulo"

            if ($('#MainContent_ddlMoneda option').size() == 0)
            { cadena = cadena + "\n" + "Moneda"; }
            else {
                if ($('#MainContent_ddlMoneda').val() == "-1")
                    cadena = cadena + "\n" + "Moneda";
            }

            if (cadena != "Ingresar los sgtes. campos :") {
                alertify.log(cadena);
                return false;
            }

            F_Buscar_Productos()
        }
        catch (e) {

            alertify.log("Error Detectado: " + e);
        }


        return false;

    });

    $('#MainContent_btnAgregarFactura').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            var Cadena = "Ingrese los sgtes. campos: "
            if ($('#hfCodCtaCte').val() == "0")
                Cadena = Cadena + '<p></p>' + "Razon Social";

            if (Cadena != "Ingrese los sgtes. campos: ") {
                alertify.log(Cadena);
                return false;
            }

            $("#divEdicionRegistro").dialog({
                resizable: false,
                modal: true,
                title: "Consulta de Factura",
                title_html: true,
                height: 450,
                width: 420,
                autoOpen: false
            });

            $('#divEdicionRegistro').dialog('open');

            var Letra = 0;
            var Factura = 0;

            if ($('#MainContent_chkFactura').is(':checked'))
                Factura = 1;

            if ($('#MainContent_chkFactura').is(':checked'))
                Letra = 1;

            var objParams = {
                Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                Filtro_Letra: Letra,
                Filtro_Factura: Factura
            };
            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);


            F_Buscar_Factura_NET(arg, function (result) {
                //                var Entity = Sys.Serialization.JavaScriptSerializer.deserialize(result);

                //                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") {

                    F_Update_Division_HTML('div_grvConsultaFactura', result.split('~')[2]);

                }
                else {
                    alertify.log(result.split('~')[1]);
                }

                return false;

            });


        }
        catch (e) {

            alertify.log("Error Detectado: " + e);
        }


        return false;

    });

    $('#MainContent_btnAgregar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (F_ValidarAgregar() == false)
                return false;

            F_AgregarTemporal();
            $('#MainContent_txtArticulo').focus();
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnEliminarFactura').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (F_ValidarEliminar_Factura() == false)
                return false;

            if (confirm("Esta seguro de eliminar los documentos seleccionado"))
                F_EliminarTemporal_Factura();

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

            if (confirm("ESTA SEGURO DE GRABAR EL CLIENTE"))
                F_GrabarDocumento();

            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnGrabarDireccion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (!F_ValidarGrabarDireccion())
                return false;

            if (confirm("ESTA SEGURO DE GRABAR LA DIRECCION"))
                F_GrabarDireccion();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnGrabarEdicionDireccion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (!F_ValidarGrabarDireccionMultiple())
                return false;

            if (confirm("ESTA SEGURO DE GRABAR LA DIRECCION"))
                F_GrabarDireccionMultiple();

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

            if (confirm("ESTA SEGURO DE ACTUALIZAR LOS DATOS DEL CLIENTE"))
                F_EdicionRegistro();

            return false;
        }
        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    F_Controles_Inicializar();

    $("#MainContent_txtNroRuc").ForceNumericOnly();
    $("#MainContent_txtNroDni").ForceNumericOnly();
    $("#MainContent_txtRucEdicion").ForceNumericOnly();
    $("#MainContent_txtDniEdicion").ForceNumericOnly();

    $('#MainContent_txtNroRuc').css('background', '#FFFFE0');

    $('#MainContent_txtNroDni').css('background', '#FFFFE0');

    $('#MainContent_txtRazonSocial').css('background', '#FFFFE0');

    $('#MainContent_txtApellidoPaterno').css('background', '#FFFFE0');

    $('#MainContent_txtApellidoMaterno').css('background', '#FFFFE0');

    $('#MainContent_txtNombres').css('background', '#FFFFE0');

    $('#MainContent_txtDistrito').css('background', '#FFFFE0');

    $('#MainContent_txtDireccion').css('background', '#FFFFE0');

    $('#MainContent_txtDireccionEnvio').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcionConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtDniEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtRazonSocialEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtApellidoPaternoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtApellidoMaternoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtNombreEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtDistritoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtDireccionEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtDireccionEnvioEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtRucEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtDistritoMultiple').css('background', '#FFFFE0');

    $('#MainContent_txtDireccionMultiple').css('background', '#FFFFE0');

    $('#MainContent_txtDistritoDireccionEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtDireccionEdicionMultiple').css('background', '#FFFFE0');

    $('#MainContent_txtTransportista').css('background', '#FFFFE0');

    $('#MainContent_txtDescuento1').css('background', '#FFFFE0');

    $('#MainContent_txtDescuento2').css('background', '#FFFFE0');

    $('#MainContent_txtDescuento3').css('background', '#FFFFE0');

    $('#MainContent_txtDescuento4').css('background', '#FFFFE0');

    $('#MainContent_txtTelefono').css('background', '#FFFFE0');

    $('#MainContent_txtTelefonoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtContacto').css('background', '#FFFFE0');

    $('#MainContent_txtContactoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtTransportistaEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtDescuento1Edicion').css('background', '#FFFFE0');

    $('#MainContent_txtDescuento2Edicion').css('background', '#FFFFE0');

    $('#MainContent_txtDescuento3Edicion').css('background', '#FFFFE0');

    $('#MainContent_txtDescuento4Edicion').css('background', '#FFFFE0');

    $('#MainContent_txtReferenciaEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtReferencia').css('background', '#FFFFE0');

    $('#MainContent_txtCorreoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtCorreo').css('background', '#FFFFE0');

    $('#MainContent_txtComentarioEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtComentario').css('background', '#FFFFE0');

    $('#MainContent_txtEmailMultiple1').css('background', '#FFFFE0');
    $('#MainContent_txtEmailMultiple2').css('background', '#FFFFE0');
    $('#MainContent_txtEmailMultiple3').css('background', '#FFFFE0');
    $('#MainContent_txtEmailMultiple4').css('background', '#FFFFE0');
    $('#MainContent_txtEmailMultiple5').css('background', '#FFFFE0');
    $('#MainContent_txtEmailMultiple6').css('background', '#FFFFE0');

    $('#MainContent_txtEmailEdicionMultiple1').css('background', '#FFFFE0');
    $('#MainContent_txtEmailEdicionMultiple2').css('background', '#FFFFE0');
    $('#MainContent_txtEmailEdicionMultiple3').css('background', '#FFFFE0');
    $('#MainContent_txtEmailEdicionMultiple4').css('background', '#FFFFE0');
    $('#MainContent_txtEmailEdicionMultiple5').css('background', '#FFFFE0');
    $('#MainContent_txtEmailEdicionMultiple6').css('background', '#FFFFE0');

    F_Derecha();

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

$(document).on("change", "select[id $= 'MainContent_ddlTipoCliente']", function () {
    F_ValidarTipoCliente($("#MainContent_ddlTipoCliente").val());
});

function F_Controles_Inicializar() {
    var arg;
    try {
        var objParams = {};

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
                        F_Update_Division_HTML('div_TipoCliente', result.split('~')[2]);
                        F_Update_Division_HTML('div_tipoclienteedicion', result.split('~')[3]);
                        F_Update_Division_HTML('div_Ruta', result.split('~')[4]);
                        F_Update_Division_HTML('div_RutaEdicion', result.split('~')[5]);
                        F_Update_Division_HTML('div_FormaPago', result.split('~')[6]);
                        F_Update_Division_HTML('div_FormaPagoEdicion', result.split('~')[7]);
                        F_Update_Division_HTML('div_Estado', result.split('~')[8]);
                        F_Update_Division_HTML('div_EstadoEdicion', result.split('~')[9]);
                        F_Update_Division_HTML('div_Letra', result.split('~')[10]);
                        F_Update_Division_HTML('div_LetraEdicion', result.split('~')[11]);
                        $('#MainContent_ddlTipoCliente').val(2);
                        $('#MainContent_ddlRuta').val(1);
                        $('#MainContent_ddlEstado').val(1);
                        $('#MainContent_ddlFormaPago').val(4);
                        $('#MainContent_ddlLetra').val(0);
                        $('#MainContent_ddlLetraEdicion').val(0);
                        $('#MainContent_txtRazonSocial').prop('disabled', false);
                        $('#MainContent_txtNroRuc').prop('disabled', false);
                        $('#MainContent_txtApellidoPaterno').val('');
                        $('#MainContent_txtApellidoMaterno').val('');
                        $('#MainContent_txtNombres').val('');
                        $('#MainContent_txtNroDni').val('');
                        $('#MainContent_ddlRuta').val(0);
                        $('#MainContent_txtApellidoPaterno').prop('disabled', true);
                        $('#MainContent_txtApellidoMaterno').prop('disabled', true);
                        $('#MainContent_txtNombres').prop('disabled', true);
                        $('#MainContent_txtNroDni').prop('disabled', true);
                        $('#MainContent_ddlTipoCliente').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoCliente_Edicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlRuta').css('background', '#FFFFE0');
                        $('#MainContent_ddlRutaEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlFormaPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlFormaPagoEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlEstado').css('background', '#FFFFE0');
                        $('#MainContent_ddlEstadoEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlLetra').css('background', '#FFFFE0');
                        $('#MainContent_ddlLetraEdicion').css('background', '#FFFFE0');
                        $('#MainContent_txtNroRuc').focus();
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

function F_ValidarTipoCliente(CodTipoCliente) {
    var arg;
    try {
        if (CodTipoCliente == '1') {
            $('#MainContent_txtNroDni').prop('disabled', false);
            //            $('#MainContent_txtApellidoPaterno').prop('disabled', false);
            //            $('#MainContent_txtApellidoMaterno').prop('disabled', false);
            //            $('#MainContent_txtNombres').prop('disabled', false);
            //            $('#MainContent_txtRazonSocial').prop('disabled', true);
            $('#MainContent_txtNroRuc').prop('disabled', true);
            $('#MainContent_txtRazonSocial').val('');
            $('#MainContent_txtNroRuc').val('');
            $('#MainContent_txtNroDni').focus();

        }
        else {
            //            $('#MainContent_txtRazonSocial').prop('disabled', false);
            $('#MainContent_txtNroRuc').prop('disabled', false);
            $('#MainContent_txtApellidoPaterno').val('');
            $('#MainContent_txtApellidoMaterno').val('');
            $('#MainContent_txtNombres').val('');
            $('#MainContent_txtNroDni').val('');
            //            $('#MainContent_txtApellidoPaterno').prop('disabled', true);
            //            $('#MainContent_txtApellidoMaterno').prop('disabled', true);
            //            $('#MainContent_txtNombres').prop('disabled', true);
            $('#MainContent_txtNroDni').prop('disabled', true);
            $('#MainContent_txtNroRuc').focus();


            if (CodTipoCliente == '3') {
                $('#MainContent_txtNroRuc').val('55555555555');
                $('#MainContent_txtNroRuc').val('55555555555');
                
                $('#MainContent_txtDistrito').val('LIMA LIMA LIMA');
                $('#hfDistrito').val('22');
                $('#hfProvincia').val('8');
                $('#hfRegion').val('1');
                $('#MainContent_txtDireccion').val('LIMA');
                $('#MainContent_txtReferencia').val('LIMA');
                $('#MainContent_txtRazonSocial').focus();
                
            }

        }



        return false;


    }
    catch (mierror) {
        alertify.log("Error detectado: " + mierror);
    }

}

function F_ValidarGrabarDocumento() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'ddlTipoCliente').val() == '2' && $(Cuerpo + 'txtRazonSocial').val() == '')
            Cadena = Cadena + '<p></p>' + 'Razon Social';

        if ($(Cuerpo + 'ddlTipoCliente').val() == '2' && $(Cuerpo + 'txtNroRuc').val() == '')
            Cadena = Cadena + '<p></p>' + 'Nro Ruc';

        if ($(Cuerpo + 'ddlTipoCliente').val() == '2' && $(Cuerpo + 'txtNroRuc').val() == '55555555555' && ValidarRuc($(Cuerpo + 'txtNroRuc').val()) == false)
            Cadena = Cadena + "\n" + "Ruc Invalido";

        if ($(Cuerpo + 'ddlTipoCliente').val() == '1' && $(Cuerpo + 'txtNroDni').val() == '')
            Cadena = Cadena + '<p></p>' + 'Nro Dni';

        if ($(Cuerpo + 'txtNroDni').val() != '' && $(Cuerpo + 'txtNroDni').val().length < 8)
            Cadena = Cadena + '<p></p>' + 'Nro Dni debe tener 8 digitos';

        //        if ($(Cuerpo + 'ddlTipoCliente').val() == '1' && $(Cuerpo + 'txtApellidoPaterno').val() == '')
        //            Cadena = Cadena + '<p></p>' + 'Apellido Paterno';

        //        if ($(Cuerpo + 'ddlTipoCliente').val() == '1' && $(Cuerpo + 'txtApellidoMaterno').val() == '')
        //            Cadena = Cadena + '<p></p>' + 'Apellido Materno';

        //        if ($(Cuerpo + 'ddlTipoCliente').val() == '1' && $(Cuerpo + 'txtNombres').val() == '')
        //            Cadena = Cadena + '<p></p>' + 'Nombres';

        if ($(Cuerpo + 'txtDistrito').val() == '' || $('#hfDistrito').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Distrito';

        if ($(Cuerpo + 'txtDireccion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Direccion';

                if ($(Cuerpo + 'txtReferencia').val() == '')
                    Cadena = Cadena + '<p></p>' + 'Referencia';

        //        if ($(Cuerpo + 'ddlRuta').val() == '0')
        //            Cadena = Cadena + '<p></p>' + 'Ruta';

        //        if ($(Cuerpo + 'txtTransportista').val() == '' || $('#hfCodTransportista').val() == '0')
        //            Cadena = Cadena + '<p></p>' + 'Transportista';

        if ($(Cuerpo + 'txtDescuento1').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descuento 1';

        if ($(Cuerpo + 'txtDescuento2').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descuento 2';

        if ($(Cuerpo + 'txtDescuento3').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descuento 3';

        if ($(Cuerpo + 'txtDescuento4').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descuento 4';

        if ($(Cuerpo + 'ddlFormaPago').val() == '0')
            Cadena = Cadena + '<p></p>' + "Forma Pago";

        if ($(Cuerpo + 'ddlEstado').val() == '0')
            Cadena = Cadena + '<p></p>' + "Estado";

                if ($(Cuerpo + 'ddlLetra').val() == '0')
                    Cadena = Cadena + '<p></p>' + "Letra";

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

    try {
        var Contenedor = '#MainContent_';
        var FlagProveedor = 0;
        var TipoDocumento = '1';

        if ($('#MainContent_chkProveedor').is(':checked'))
            FlagProveedor = 1;

        if ($('#MainContent_txtNroDni').val() == '')
            TipoDocumento = '6';

        if ($('#MainContent_ddlTipoCliente').val() == '3') {
            $(Contenedor + 'txtNroRuc').val('55555555555');
            $(Contenedor + 'txtNroDni').val('');
        }

        var objParams = {
            Filtro_CodTipoCliente: $(Contenedor + 'ddlTipoCliente').val(),
            Filtro_NroRuc: $(Contenedor + 'txtNroRuc').val(),
            Filtro_NroDni: $(Contenedor + 'txtNroDni').val(),
            Filtro_RazonSocial: $(Contenedor + 'txtRazonSocial').val(),
            Filtro_ApePaterno: $(Contenedor + 'txtApellidoPaterno').val(),
            Filtro_ApeMaterno: $(Contenedor + 'txtApellidoMaterno').val(),
            Filtro_Nombres: $(Contenedor + 'txtNombres').val(),
            Filtro_CodDepartamento: $('#hfRegion').val(),
            Filtro_CodProvincia: $('#hfProvincia').val(),
            Filtro_CodDistrito: $('#hfDistrito').val(),
            Filtro_Direccion: $(Contenedor + 'txtDireccion').val(),
            Filtro_DireccionEnvio: $(Contenedor + 'txtDireccion').val() + ' ' + $(Contenedor + 'txtDistrito').val(),
            Filtro_FlagProveedor: FlagProveedor,
            Filtro_TipoDocumento: TipoDocumento,
            Filtro_Descuento1: $(Contenedor + 'txtDescuento1').val(),
            Filtro_Descuento2: $(Contenedor + 'txtDescuento2').val(),
            Filtro_Descuento3: $(Contenedor + 'txtDescuento3').val(),
            Filtro_Descuento4: $(Contenedor + 'txtDescuento4').val(),
            Filtro_CodTransportista: $('#hfCodTransportista').val(),
            Filtro_CodRuta: $(Contenedor + 'ddlRuta').val(),
            Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
            Filtro_Telefono: $(Contenedor + 'txtTelefono').val(),
            Filtro_CodEstado: $(Contenedor + 'ddlEstado').val(),
            Filtro_Referencia: $(Contenedor + 'txtReferencia').val(),
            Filtro_Correo: $(Contenedor + 'txtCorreo').val(),
            Filtro_Comentario: $(Contenedor + 'txtComentario').val(),
            Filtro_FlagLetra: $(Contenedor + 'ddlLetra').val(),
            Filtro_Contacto: $(Contenedor + 'txtContacto').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_GrabarDocumento_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se grabo correctamente') {
                    $(Contenedor + 'txtNroRuc').val('');
                    $(Contenedor + 'txtNroDni').val('');
                    $(Contenedor + 'txtRazonSocial').val('');
                    $(Contenedor + 'txtApellidoPaterno').val('');
                    $(Contenedor + 'txtApellidoMaterno').val('');
                    $(Contenedor + 'txtNombres').val('');
                    $(Contenedor + 'txtRegion').val('');
                    $(Contenedor + 'txtProvincia').val('');
                    $(Contenedor + 'txtDistrito').val('');
                    $(Contenedor + 'txtDireccion').val('');
                    $(Contenedor + 'txtDireccionEnvio').val('');
                    $(Contenedor + 'txtTransportista').val('');
                    $(Contenedor + 'txtReferencia').val('');
                    $(Contenedor + 'txtTelefono').val('');
                    $(Contenedor + 'txtContacto').val('');
                    $(Contenedor + 'txtCorreo').val('');
                    $(Contenedor + 'txtComentario').val('');
                    $(Contenedor + 'ddlTipoCliente').val('2');
                    $(Contenedor + 'ddlRuta').val('0');
                    $(Contenedor + 'txtDescuento1').val('0.00'),
                    $(Contenedor + 'txtDescuento2').val('0.00'),
                    $(Contenedor + 'txtDescuento3').val('0.00'),
                    $('#hfCodTransportista').val('0');
                    $('#hfRegion').val('0');
                    $('#hfProvincia').val('0');
                    $('#hfDistrito').val('0');
                    $(Contenedor + 'txtNroRuc').prop('disabled', false);
                    $(Contenedor + 'txtRazonSocial').prop('disabled', false);
                    $(Contenedor + 'txtNroDni').prop('disabled', true);
                    $(Contenedor + 'txtApellidoPaterno').prop('disabled', true);
                    $(Contenedor + 'txtApellidoMaterno').prop('disabled', true);
                    $(Contenedor + 'chkProveedor').prop('checked', false);
                    $(Contenedor + 'txtNombres').prop('disabled', true);
                    alertify.log('Se Grabo Correctamente.');
                    $(Contenedor + 'txtNroRuc').focus();
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

function F_Nuevo() {
    var Contenedor = '#MainContent_';
    $(Contenedor + 'txtNroRuc').val('');
    $(Contenedor + 'txtNroDni').val('');
    $(Contenedor + 'txtRazonSocial').val('');
    $(Contenedor + 'txtApellidoPaterno').val('');
    $(Contenedor + 'txtApellidoMaterno').val('');
    $(Contenedor + 'txtNombres').val('');
    $(Contenedor + 'txtRegion').val('');
    $(Contenedor + 'txtProvincia').val('');
    $(Contenedor + 'txtDistrito').val('');
    $(Contenedor + 'txtDireccion').val('');
    $(Contenedor + 'txtDireccionEnvio').val('');
    $(Contenedor + 'ddlTipoCliente').val('2');
    $(Contenedor + 'ddlRuta').val('0');
    $(Contenedor + 'ddlLetra').val('0');
    $('#hfRegion').val('0');
    $('#hfProvincia').val('0');
    $('#hfDistrito').val('0');
    $(Contenedor + 'txtNroRuc').prop('disabled', false);
    $(Contenedor + 'txtRazonSocial').prop('disabled', false);
    $(Contenedor + 'txtNroDni').prop('disabled', true);
    $(Contenedor + 'txtApellidoPaterno').prop('disabled', true);
    $(Contenedor + 'txtApellidoMaterno').prop('disabled', true);
    $(Contenedor + 'txtNombres').prop('disabled', true);
    $(Contenedor + 'chkProveedor').prop('checked', false);
    $(Contenedor + 'txtTransportista').val('');
    $(Contenedor + 'txtDescuento1').val('0.00');
    $(Contenedor + 'txtDescuento2').val('0.00');
    $(Contenedor + 'txtDescuento3').val('0.00');
    $(Contenedor + 'txtDescuento4').val('0.00');
    $(Contenedor + 'txtNroRuc').focus();
    $(Contenedor + 'ddlFormaPago').val(4);
    $(Contenedor + 'txtTelefono').val('');
    $(Contenedor + 'txtContacto').val('');
    return false;
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

function F_AnularRegistro(Fila) {
    try {
        var imgID = Fila.id;

        var lblCodigo = '#' + imgID.replace('imgAnularDocumento', 'lblcodigo');
        var lblProducto_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblCliente');

        if (!confirm("ESTA SEGURO DE ELIMINAR EL CLIENTE " + $(lblProducto_grilla).text()))
            return false;

        var objParams = {
            Filtro_CodCtaCte: $(lblCodigo).text(),
            Filtro_Descripcion: $('#MainContent_txtDescripcionConsulta').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_AnularRegistro_Net(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);
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

function F_EditarRegistro(Fila) {
    try {
        var imgID = Fila.id;
        var lblcodigo_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblcodigo');
        var lblCliente_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblCliente');
        var lblDireccion_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblDireccion');
        var lblDistrito_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblDistrito');
        var hfDepartamento_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfDepartamento');
        var hfProvincia_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfProvincia');
        var hfDireccionEnvio_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfDireccionEnvio');
        var hfApePaterno_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfApePaterno');
        var hfApeMaterno_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfApeMaterno');
        var hfNombres_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfNombres');
        var hfNroRuc_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfNroRuc');
        var hfNroDni_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfNroDni');
        var hfCodTipoCliente_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCodTipoCliente');
        var hfCodDepartamento_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCodDepartamento');
        var hfCodProvincia_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCodProvincia');
        var hfCodDistrito_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCodDistrito');
        var hfRazonSocial_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfRazonSocial');
        var lblTransportista = '#' + imgID.replace('imgEditarRegistro', 'lblTransportista');
        var hfCodTransportista = '#' + imgID.replace('imgEditarRegistro', 'hfCodTransportista');
        var hfCodRuta = '#' + imgID.replace('imgEditarRegistro', 'hfCodRuta');
        var hfDescuento1 = '#' + imgID.replace('imgEditarRegistro', 'hfDescuento1');
        var hfDescuento2 = '#' + imgID.replace('imgEditarRegistro', 'hfDescuento2');
        var hfDescuento3 = '#' + imgID.replace('imgEditarRegistro', 'hfDescuento3');
        var hfDescuento4 = '#' + imgID.replace('imgEditarRegistro', 'hfDescuento4');
        var hfCodFormaPago = '#' + imgID.replace('imgEditarRegistro', 'hfCodFormaPago');
        var hfTelefono = '#' + imgID.replace('imgEditarRegistro', 'hfTelefono');
        var hfContacto = '#' + imgID.replace('imgEditarRegistro', 'hfContacto');
        var hfReferencia = '#' + imgID.replace('imgEditarRegistro', 'hfReferencia');
        var hfCodEstado = '#' + imgID.replace('imgEditarRegistro', 'hfCodEstado');
        var hfCorreo = '#' + imgID.replace('imgEditarRegistro', 'hfCorreo');
        var hfComentario = '#' + imgID.replace('imgEditarRegistro', 'hfComentario');
        var hfFlagLetra = '#' + imgID.replace('imgEditarRegistro', 'hfFlagLetra');

        var Cuerpo = '#MainContent_';

        $(Cuerpo + 'txtRucEdicion').val($(hfNroRuc_grilla).val());
        $(Cuerpo + 'ddlTipoCliente_Edicion').val($(hfCodTipoCliente_grilla).val());
        $(Cuerpo + 'txtDniEdicion').val($(hfNroDni_grilla).val());
        $(Cuerpo + 'txtRazonSocialEdicion').val($(hfRazonSocial_grilla).val());
        $(Cuerpo + 'txtApellidoPaternoEdicion').val($(hfApePaterno_grilla).val());
        $(Cuerpo + 'txtApellidoMaternoEdicion').val($(hfApeMaterno_grilla).val());
        $(Cuerpo + 'txtNombreEdicion').val($(hfNombres_grilla).val());
        $(Cuerpo + 'txtDistritoEdicion').val($(hfDepartamento_grilla).val() + ' ' + $(hfProvincia_grilla).val() + ' ' + $(lblDistrito_grilla).val());
        $(Cuerpo + 'txtDireccionEdicion').val($(lblDireccion_grilla).val());
        $(Cuerpo + 'txtDireccionEnvioEdicion').val($(hfDireccionEnvio_grilla).val());
        $(Cuerpo + 'txtReferenciaEdicion').val($(hfReferencia).val());
        $('#hfRegionEdicion').val($(hfCodDepartamento_grilla).val());
        $('#hfProvinciaEdicion').val($(hfCodProvincia_grilla).val());
        $('#hfDistritoEdicion').val($(hfCodDistrito_grilla).val());
        $('#hfCodCtaCte').val($(lblcodigo_grilla).text());
        //$(Cuerpo + 'ddlTipoCliente_Edicion').prop('disabled', true);
        $(Cuerpo + 'ddlRutaEdicion').val($(hfCodRuta).val());
        $('#hfCodTransportistaEdicion').val($(hfCodTransportista).val());
        $(Cuerpo + 'txtTransportistaEdicion').val($(lblTransportista).text());
        $(Cuerpo + 'txtDescuento1Edicion').val($(hfDescuento1).val());
        $(Cuerpo + 'txtDescuento2Edicion').val($(hfDescuento2).val());
        $(Cuerpo + 'txtDescuento3Edicion').val($(hfDescuento3).val());
        $(Cuerpo + 'txtDescuento4Edicion').val($(hfDescuento4).val());
        $(Cuerpo + 'ddlFormaPagoEdicion').val($(hfCodFormaPago).val());
        $(Cuerpo + 'txtTelefonoEdicion').val($(hfTelefono).val());
        $(Cuerpo + 'txtContactoEdicion').val($(hfContacto).val());
        $(Cuerpo + 'ddlEstadoEdicion').val($(hfCodEstado).val());
        $(Cuerpo + 'txtCorreoEdicion').val($(hfCorreo).val());
        $(Cuerpo + 'txtComentarioEdicion').val($(hfComentario).val());
        $(Cuerpo + 'ddlLetraEdicion').val($(hfFlagLetra).val());

        $("#divEdicionRegistro").dialog({
            resizable: false,
            modal: true,
            title: "Edicion de Cliente",
            title_html: true,
            height: 500,
            width: 700,
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
        var TipoDocumento = '1';

        if ($('#MainContent_txtNroDni').val() == '')
            TipoDocumento = '6';

        if ($('#MainContent_ddlTipoCliente').val() == '3') {
            $(Contenedor + 'txtRucEdicion').val('55555555555');
            $(Contenedor + 'txtDniEdicion').val('');
        }

        var objParams = {
            Filtro_CodTipoCliente: $(Contenedor + 'ddlTipoCliente_Edicion').val(),
            Filtro_NroRuc: $(Contenedor + 'txtRucEdicion').val(),
            Filtro_NroDni: $(Contenedor + 'txtDniEdicion').val(),
            Filtro_RazonSocial: $(Contenedor + 'txtRazonSocialEdicion').val(),
            Filtro_ApePaterno: $(Contenedor + 'txtApellidoPaternoEdicion').val(),
            Filtro_ApeMaterno: $(Contenedor + 'txtApellidoMaternoEdicion').val(),
            Filtro_Nombres: $(Contenedor + 'txtNombreEdicion').val(),
            Filtro_CodDepartamento: $('#hfRegionEdicion').val(),
            Filtro_CodProvincia: $('#hfProvinciaEdicion').val(),
            Filtro_CodDistrito: $('#hfDistritoEdicion').val(),
            Filtro_Direccion: $(Contenedor + 'txtDireccionEdicion').val(),
            Filtro_DireccionEnvio: $(Contenedor + 'txtDireccionEdicion').val() + ' ' + $(Contenedor + 'txtDistritoEdicion').val(),
            Filtro_TipoDocumento: TipoDocumento,
            Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
            Filtro_Descripcion: $(Contenedor + 'txtDescripcionConsulta').val(),
            Filtro_Descuento1: $(Contenedor + 'txtDescuento1Edicion').val(),
            Filtro_Descuento2: $(Contenedor + 'txtDescuento2Edicion').val(),
            Filtro_Descuento3: $(Contenedor + 'txtDescuento3Edicion').val(),
            Filtro_Descuento4: $(Contenedor + 'txtDescuento4Edicion').val(),
            Filtro_CodTransportista: $('#hfCodTransportistaEdicion').val(),
            Filtro_CodRuta: $(Contenedor + 'ddlRutaEdicion').val(),
            Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPagoEdicion').val(),
            Filtro_Telefono: $(Contenedor + 'txtTelefonoEdicion').val(),
            Filtro_Contacto: $(Contenedor + 'txtContactoEdicion').val(),
            Filtro_CodEstado: $(Contenedor + 'ddlEstadoEdicion').val(),
            Filtro_Referencia: $(Contenedor + 'txtReferenciaEdicion').val(),
            Filtro_Correo: $(Contenedor + 'txtCorreoEdicion').val(),
            Filtro_Comentario: $(Contenedor + 'txtComentarioEdicion').val(),
            Filtro_FlagLetra: $(Contenedor + 'ddlLetraEdicion').val()
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
                if (str_mensaje_operacion == 'Se grabo correctamente') {
                    $(Contenedor + 'txtRucEdicion').val('');
                    $(Contenedor + 'txtDniEdicion').val('');
                    $(Contenedor + 'txtRazonSocialEdicion').val('');
                    $(Contenedor + 'txtApellidoPaternoEdicion').val('');
                    $(Contenedor + 'txtApellidoMaternoEdicion').val('');
                    $(Contenedor + 'txtNombreEdicion').val('');
                    $(Contenedor + 'txtRegionEdicion').val('');
                    $(Contenedor + 'txtContactoEdicion').val('');
                    $(Contenedor + 'txtProvinciaEdicion').val('');
                    $(Contenedor + 'txtDistritoEdicion').val('');
                    $(Contenedor + 'txtDireccionEdicion').val('');
                    $(Contenedor + 'txtDireccionEnvioEdicion').val('');
                    $(Contenedor + 'ddlTipoCliente_Edicion').val('2');
                    $('#hfRegionEdicion').val('0');
                    $('#hfProvinciaEdicion').val('0');
                    $('#hfDistritoEdicion').val('0');
                    alertify.log('Se Grabo Correctamente.');
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

        if ($(Cuerpo + 'ddlTipoCliente_Edicion').val() == '2' && $(Cuerpo + 'txtRazonSocialEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Razon Social';

        if ($(Cuerpo + 'ddlTipoCliente_Edicion').val() == '2' && $(Cuerpo + 'txtRucEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Nro Ruc';

        if ($(Cuerpo + 'ddlTipoCliente_Edicion').val() == '2' && ValidarRuc($(Cuerpo + 'txtRucEdicion').val()) == false)
            Cadena = Cadena + "\n" + "Ruc Invalido";

        if ($(Cuerpo + 'ddlTipoCliente_Edicion').val() == '1' && $(Cuerpo + 'txtDniEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Nro Dni';

        if ($(Cuerpo + 'txtDniEdicion').val() != '' && $(Cuerpo + 'txtDniEdicion').val().length < 8)
            Cadena = Cadena + '<p></p>' + 'Nro Dni debe tener 8 digitos';

        //        if ($(Cuerpo + 'ddlTipoCliente_Edicion').val() == '1' && $(Cuerpo + 'txtApellidoPaternoEdicion').val() == '')
        //            Cadena = Cadena + '<p></p>' + 'Apellido Paterno';

        //        if ($(Cuerpo + 'ddlTipoCliente_Edicion').val() == '1' && $(Cuerpo + 'txtApellidoMaternoEdicion').val() == '')
        //            Cadena = Cadena + '<p></p>' + 'Apellido Materno';

        //        if ($(Cuerpo + 'ddlTipoCliente_Edicion').val() == '1' && $(Cuerpo + 'txtNombreEdicion').val() == '')
        //            Cadena = Cadena + '<p></p>' + 'Nombres';

        if ($(Cuerpo + 'txtDistritoEdicion').val() == '' || $('#hfDistritoEdicion').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Distrito';

        if ($(Cuerpo + 'txtDireccionEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Direccion';

        //        if ($(Cuerpo + 'txtReferenciaEdicion').val() == '')
        //            Cadena = Cadena + '<p></p>' + 'Referencia';

        //        if ($(Cuerpo + 'txtTransportistaEdicion').val() == '' || $('#hfCodTransportistaEdicion').val() == '0')
        //            Cadena = Cadena + '<p></p>' + 'Transportista';

        if ($(Cuerpo + 'txtDescuento1Edicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descuento 1';

        if ($(Cuerpo + 'txtDescuento2Edicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descuento 2';

        if ($(Cuerpo + 'txtDescuento3Edicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descuento 3';

        if ($(Cuerpo + 'txtDescuento4Edicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descuento 4';

        if ($(Cuerpo + 'ddlFormaPagoEdicion').val() == '0')
            Cadena = Cadena + '<p></p>' + "Forma Pago";

        if ($(Cuerpo + 'ddlEstadoEdicion').val() == '0')
            Cadena = Cadena + '<p></p>' + "Estado";

        //        if ($(Cuerpo + 'ddlLetraEdicion').val() == '0')
        //            Cadena = Cadena + '<p></p>' + "Letra";

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

function ValidarRuc(valor) {
    valor = trim(valor)
    if (esnumero(valor)) {
        if (valor.length == 8) {
            suma = 0
            for (i = 0; i < valor.length - 1; i++) {

                if (i == 0) suma += (digito * 2)
                else suma += (digito * (valor.length - i))
            }
            resto = suma % 11;
            if (resto == 1) resto = 11;
            if (resto + (valor.charAt(valor.length - 1) - '0') == 11) {
                return true
            }
        } else if (valor.length == 11) {
            suma = 0
            x = 6
            for (i = 0; i < valor.length - 1; i++) {
                if (i == 4) x = 8
                digito = valor.charAt(i) - '0';
                x--
                if (i == 0) suma += (digito * x)
                else suma += (digito * x)
            }
            resto = suma % 11;
            resto = 11 - resto

            if (resto >= 10) resto = resto - 10;
            if (resto == valor.charAt(valor.length - 1) - '0') {
                return true
            }
        }
    }
    return false
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

function F_Direccion(Fila) {

    var imgID = Fila.id;
    var lblcodigo_grilla = '#' + imgID.replace('imgDireccion', 'lblcodigo');
    var Cuerpo = '#MainContent_';

    try {
        var objParams = {
            Filtro_CodCtaCte: $(lblcodigo_grilla).text()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_Direccion_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {

                $('#div_DireccionMultiple').dialog({
                    resizable: false,
                    modal: true,
                    title: "Direcciones",
                    title_html: true,
                    height: 500,
                    width: 890,
                    autoOpen: false
                });
                F_Update_Division_HTML('div_Direccion', result.split('~')[2]);
                $('#hfCodCtaCte').val($(lblcodigo_grilla).text());
                $('#hfRegionEdicion').val('0');
                $('#hfProvinciaEdicion').val('0');
                $('#hfDistritoEdicion').val('0');
                $(Cuerpo + 'txtDireccionMultiple').val('');
                $(Cuerpo + 'txtDistritoMultiple').val('');
                $('#div_DireccionMultiple').dialog('open');

                return false;

            }

            else
                alertify.log(result.split('~')[1]);

            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function F_ValidarGrabarDireccion() {

    try {

        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p>';

        if ($(Cuerpo + 'txtDistritoMultiple').val() == '')
            Cadena = Cadena + '<p></p>' + 'Distrito';
        else {
            if ($(hfDistritoEdicion).val() == "0")
                Cadena = Cadena + '<p></p>' + 'Distrito';
        }

        if ($(Cuerpo + 'txtDireccionMultiple').val() == '')
            Cadena = Cadena + '<p></p>' + 'Direccion';


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

function F_GrabarDireccion() {

    try {
        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
            Filtro_CodDepartamento: $('#hfRegionEdicion').val(),
            Filtro_CodProvincia: $('#hfProvinciaEdicion').val(),
            Filtro_CodDistrito: $('#hfDistritoEdicion').val(),
            Filtro_Direccion: $(Contenedor + 'txtDireccionMultiple').val(),
            Filtro_Email1: $(Contenedor + 'txtEmailMultiple1').val(),
            Filtro_Email2: $(Contenedor + 'txtEmailMultiple2').val(),
            Filtro_Email3: $(Contenedor + 'txtEmailMultiple3').val(),
            Filtro_Email4: $(Contenedor + 'txtEmailMultiple4').val(),
            Filtro_Email5: $(Contenedor + 'txtEmailMultiple5').val(),
            Filtro_Email6: $(Contenedor + 'txtEmailMultiple6').val()
        };


        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_GrabarDireccion_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se Grabo Correctamente') {
                    F_Update_Division_HTML('div_Direccion', result.split('~')[2]);
                    alertify.log('Se Grabo Correctamente.');
                    $('#hfRegionEdicion').val('0');
                    $('#hfProvinciaEdicion').val('0');
                    $('#hfDistritoEdicion').val('0');
                    $(Contenedor + 'txtDireccionMultiple').val('');
                    $(Contenedor + 'txtDistritoMultiple').val('');
                    $(Contenedor + 'txtEmailMultiple1').val('');
                    $(Contenedor + 'txtEmailMultiple2').val('');
                    $(Contenedor + 'txtEmailMultiple3').val('');
                    $(Contenedor + 'txtEmailMultiple4').val('');
                    $(Contenedor + 'txtEmailMultiple5').val('');
                    $(Contenedor + 'txtEmailMultiple6').val('');
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

function F_EditarRegistroDireccion(Fila) {

    try {
        var imgID = Fila.id;
        var hfCodDistrito = '#' + imgID.replace('imgEditarRegistro', 'hfCodDistrito');
        var hfCodDepartamento = '#' + imgID.replace('imgEditarRegistro', 'hfCodDepartamento');
        var hfCodProvincia = '#' + imgID.replace('imgEditarRegistro', 'hfCodProvincia');
        var lblCodDireccion = '#' + imgID.replace('imgEditarRegistro', 'lblCodDireccion');
        var lblDireccion = '#' + imgID.replace('imgEditarRegistro', 'lblDireccion');
        var lblDistrito = '#' + imgID.replace('imgEditarRegistro', 'lblDistrito');
        var lblEmail1 = '#' + imgID.replace('imgEditarRegistro', 'lblEmail1');
        var lblEmail2 = '#' + imgID.replace('imgEditarRegistro', 'lblEmail2');
        var lblEmail3 = '#' + imgID.replace('imgEditarRegistro', 'lblEmail3');
        var lblEmail4 = '#' + imgID.replace('imgEditarRegistro', 'lblEmail4');
        var lblEmail5 = '#' + imgID.replace('imgEditarRegistro', 'lblEmail5');
        var lblEmail6 = '#' + imgID.replace('imgEditarRegistro', 'lblEmail6');


        var Cuerpo = '#MainContent_';

        $(Cuerpo + 'txtDistritoDireccionEdicion').val($(lblDistrito).text());
        $(Cuerpo + 'txtDireccionEdicionMultiple').val($(lblDireccion).text());
        $(Cuerpo + 'txtEmailEdicionMultiple1').val($(lblEmail1).text());
        $(Cuerpo + 'txtEmailEdicionMultiple2').val($(lblEmail2).text());
        $(Cuerpo + 'txtEmailEdicionMultiple3').val($(lblEmail3).text());
        $(Cuerpo + 'txtEmailEdicionMultiple4').val($(lblEmail4).text());
        $(Cuerpo + 'txtEmailEdicionMultiple5').val($(lblEmail5).text());
        $(Cuerpo + 'txtEmailEdicionMultiple6').val($(lblEmail6).text());

        $('#hfCodDireccion').val($(lblCodDireccion).text());
        $('#hfDistrito').val($(hfCodDistrito).val());
        $('#hfProvincia').val($(hfCodProvincia).val());
        $('#hfRegion').val($(hfCodDepartamento).val());

        $("#div_EdicionDireccion").dialog({
            resizable: false,
            modal: true,
            title: "Edicion de Direccion",
            title_html: true,
            height: 350,
            width: 800,
            autoOpen: false
        });



        $('#div_EdicionDireccion').dialog('open');


        return false;

    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function F_ValidarGrabarDireccionMultiple() {

    try {

        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p>';

        if ($(Cuerpo + 'txtDistritoDireccionEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Distrito';
        else {
            if ($('#hfDistrito').val() == "0")
                Cadena = Cadena + '<p></p>' + 'Distrito';
        }

        if ($(Cuerpo + 'txtDireccionEdicionMultiple').val() == '')
            Cadena = Cadena + '<p></p>' + 'Direccion';


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

function F_GrabarDireccionMultiple() {
    try {
        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
            Filtro_CodDireccion: $('#hfCodDireccion').val(),
            Filtro_CodDepartamento: $('#hfRegion').val(),
            Filtro_CodProvincia: $('#hfProvincia').val(),
            Filtro_CodDistrito: $('#hfDistrito').val(),
            Filtro_Direccion: $(Contenedor + 'txtDireccionEdicionMultiple').val(),
            Filtro_Email1: $(Contenedor + 'txtEmailEdicionMultiple1').val(),
            Filtro_Email2: $(Contenedor + 'txtEmailEdicionMultiple2').val(),
            Filtro_Email3: $(Contenedor + 'txtEmailEdicionMultiple3').val(),
            Filtro_Email4: $(Contenedor + 'txtEmailEdicionMultiple4').val(),
            Filtro_Email5: $(Contenedor + 'txtEmailEdicionMultiple5').val(),
            Filtro_Email6: $(Contenedor + 'txtEmailEdicionMultiple6').val()
        };


        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_GrabarDireccionMultiple_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se Grabo Correctamente') {
                    F_Update_Division_HTML('div_Direccion', result.split('~')[2]);
                    alertify.log('Se Grabo Correctamente.');
                    $('#hfRegion').val('0');
                    $('#hfProvincia').val('0');
                    $('#hfDistrito').val('0');
                    $('#div_EdicionDireccion').dialog('close');
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

function F_EliminarDireccion(Fila) {
    try {
        var imgID = Fila.id;

        var lblCodDireccion = '#' + imgID.replace('imgAnularDocumento', 'lblCodDireccion');
        var lblDistrito = '#' + imgID.replace('imgAnularDocumento', 'lblDistrito');
        var lblDireccion = '#' + imgID.replace('imgAnularDocumento', 'lblDireccion');

        if (!confirm("ESTA SEGURO DE ELIMINAR LA DIRECCION " + $(lblDistrito).text() + " " + $(lblDireccion).text()))
            return false;

        var objParams = {
            Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
            Filtro_CodDireccion: $(lblCodDireccion).text()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_EliminarDireccion_Net(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_Direccion', result.split('~')[2]);
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
//Buscar Cliente Ruc  mdiante la Api
function F_ValidaRucDni() {
    if (!F_SesionRedireccionar(AppSession)) return false;
    if ($('#MainContent_txtNroRuc').val().length > 0) {
        if (ValidarRuc($('#MainContent_txtNroRuc').val()) == false) {
            toastr.warning('NRO. RUC INVALIDO');
            $('#MainContent_txtNroRuc').val('');
            $('#MainContent_txtNroRuc').focus();
            return false;
        }
        else {
            //DNI
            if ($('#MainContent_txtNroRuc').val().length == 8) {
                toastr.warning('NRO. RUC INVALIDO');
                $('#MainContent_txtNroRuc').val('');
                $('#MainContent_txtNroRuc').focus();
                return false;
            }
            else {
                if ($('#MainContent_txtNroRuc').val().length == 11) {
                    $('#MainContent_txtCliente').prop('disabled', false);
                    $('#MainContent_txtApePaterno').prop('disabled', true);
                    $('#MainContent_txtApePaterno').val('');
                    $('#MainContent_txtApeMaterno').prop('disabled', true);
                    $('#MainContent_txtApeMaterno').val('');
                    $('#MainContent_txtNombres').prop('disabled', true);
                    $('#MainContent_txtNombres').val('');
                    $('#MainContent_txtCliente').focus();
                    F_BuscarPadronSunat();
                }
                else {
                    toastr.warning('NRO. RUC INVALIDO');
                    $('#MainContent_txtNroRuc').val('');
                    //F_LimpiarCampos();
                }
            }

        }
    }
    else {
        if ($('#MainContent_txtNroRuc').val() != $('#hfNroRuc').val()) {
            //F_LimpiarCampos();
        }
    }
    return false;
}

function F_BuscarPadronSunat() {

    $('#MainContent_chkProveedor').prop('disabled', false);


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Servicios.asmx/F_TCCuentaCorriente_PadronSunat',
        data: "{'NroRuc':'" + $('#MainContent_txtNroRuc').val() + "','CodTipoCtaCte':'0'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            MostrarEspera(true);
            var data = dbObject.d;
            try {
                if (data[0].split(',')[0] != '0') {
                    try {
                        $.each(data, function (index, item) {
                            if (item.split(',')[13] === '1') {
                                toastr.warning('EL CLIENTE YA EXISTE');
                                $('#MainContent_txtNroRuc').val('');
                                $('#MainContent_txtRazonSocial').val('');
                                $('#MainContent_txtDistrito').val('');
                                $('#MainContent_txtDireccion').val('');
                                $('#MainContent_txtDireccionEnvio').val('');
                                $('#MainContent_txtNroRuc').focus();
                            } else if (item.split(',')[13] === '2' | item.split(',')[13] === '0') {
                                $('#MainContent_txtRazonSocial').val(data[0].split(',')[1]); //razon social
                                $('#MainContent_txtDireccion').val(data[0].split(',')[2]);
                                $('#MainContent_txtDireccionEnvio').val(data[0].split(',')[2]);
                                $('#MainContent_txtDistrito').val(data[0].split(',')[4]);
                                $('#hfRegion').val(data[0].split(',')[5]);
                                $('#hfProvincia').val(data[0].split(',')[6]);
                                $('#hfDistrito').val(data[0].split(',')[7]);

                                if (item.split(',')[13] === '2') {
                                    $('#MainContent_chkProveedor').prop('checked', false);
                                    $('#MainContent_chkProveedor').prop('disabled', true);
                                    toastr.warning('COMO PROVEEDOR EXISTE Y NO SE PUEDE CREAR NUEVAMENTE');
                                }
                            }
                        });
                    }
                    catch (x) { toastr.warning('El Producto no tiene Imagenes'); }
                }
                else {
                    $('#MainContent_txtRazonSocial').val(data[0].split(',')[1]); //razon social
                    $('#MainContent_txtDireccion').val(data[0].split(',')[2]);
                    $('#MainContent_txtDireccionEnvio').val(data[0].split(',')[2]);
                    $('#MainContent_txtDistrito').val(data[0].split(',')[4]);
                    $('#hfRegion').val(data[0].split(',')[5]);
                    $('#hfProvincia').val(data[0].split(',')[6]);
                    $('#hfDistrito').val(data[0].split(',')[7]);

                }
            }
            catch (x) {
                $.ajax({
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    url: 'https://dniruc.apisperu.com/api/v1/ruc/' + $('#MainContent_txtNroRuc').val() + '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImpvZWx1czE5OTZAZ21haWwuY29tIn0.JkskM6epuwRxjj-ESBJRhvsDzgHEbt7rxOhzgsoXRKo',
                    dataType: "json",
                    async: true,
                    success: function (dbObject) {
                        MostrarEspera(true);
                        var data = dbObject.d;
                        try {

                            $('#MainContent_txtRazonSocial').val(dbObject.razonSocial); //razon social
                            $('#MainContent_txtNombreComercial').val(dbObject.nombreComercial); //razon social
                            var direccion = dbObject.direccion;
                            var distrito = dbObject.departamento + ' ' + dbObject.provincia + ' ' + dbObject.distrito;
                            $('#MainContent_txtDireccion').val(direccion.replace(distrito, ""));
                            $('#MainContent_txtDireccionEnvio').val(direccion.replace(distrito, ""));
                            $('#MainContent_txtDistrito').val(distrito);
                            $('#hfUbigeo').val(dbObject.ubigeo);
                            F_BuscarDireccionNuevo();
                        }
                        catch (x) { }
                        MostrarEspera(false);
                    },


                    error: function (response) {
                        toastr.warning(response.responseText);
                    },
                    failure: function (response) {
                        toastr.warning(response.responseText);
                    }
                });

            }
            MostrarEspera(false);
        },


        error: function (response) {
            toastr.warning(response.responseText);
        },
        failure: function (response) {
            toastr.warning(response.responseText);
        }
    });





    return true;
}

//Joel
function F_BuscarDireccionNuevo() {
if (!F_SesionRedireccionar(AppSession)) return false;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Servicios.asmx/F_Direccion_Buscar',
        data: "{'Ubigeo':'" + $('#hfUbigeo').val() + "'}",
        dataType: "json",
        async: false,
       success: function (dbObject) {
             var data = dbObject.d;   
                    $('#hfRegion').val(data[0].split(',')[0]);
                        $('#hfProvincia').val(data[0].split(',')[1]);
                        $('#hfDistrito').val(data[0].split(',')[2]);
                    return true;
                
        },
        complete: function () {
            if (($('#hfRegion').val() == '' | $('#hfProvincia').val() == '') && $('#hfDistrito').val() == '')
            {
                toastr.warning('NO HAY DIRECCION PARA EL DISTRITO ESPECIFICADO')
                $('#MainContent_txtDireccion').val('');
                $('#hfDireccion').val('');
                $('#hfCodDireccion').val('0');
                $('#MainContent_txtCorreo').val('');
            }

        },
        error: function (response) {
            toastr.warning(response.responseText);
        },
        failure: function (response) {
            toastr.warning(response.responseText);
        }
    });

    return false;
}