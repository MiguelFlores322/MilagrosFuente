var AppSession = "../Ventas/NotaPedido.aspx";

//var ImpresorasNotaPedido = ['HP LASERJET M2727 MFP SERIES PCL 6'];
var FormatoReporteNotaPedido = 'rptCotizacionSimple.rpt';

var UltimoRegistro = 0;

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#MainContent_txtProveedor').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'" + 1 + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Direccion: item.split(',')[2],
                            De1: Number(item.split(',')[9]),
                            De2: Number(item.split(',')[10]),
                            De3: Number(item.split(',')[11]),
                            De4: Number(item.split(',')[16])
                        }
                    }));
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
            $('#hfCodCtaCte').val(i.item.val);
            $('#MainContent_txtDesc1').val(i.item.De1);
            if (i.item.De1 == 0) $('#MainContent_txtDesc1').attr('readonly', false);
            $('#MainContent_txtDesc2').val(i.item.De2);
            if (i.item.De2 == 0) $('#MainContent_txtDesc2').attr('readonly', false);
            $('#MainContent_txtDesc3').val(i.item.De3);
            if (i.item.De3 == 0) $('#MainContent_txtDesc3').attr('readonly', false);
            $('#MainContent_txtDesc4').val(i.item.De4);
            if (i.item.De4 == 0) $('#MainContent_txtDesc4').attr('readonly', false);
            descontar();
        },
        minLength: 3
    });

    $('#MainContent_txtClienteConsulta').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'" + 1 + "'}",
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
            $('#hfCodCtaCteConsulta').val(i.item.val);
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

    $('#MainContent_txtDespachoTransportista').autocomplete({
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
                            Direccion: item.split(',')[2],
                            De1: Number(item.split(',')[9]),
                            De2: Number(item.split(',')[10]),
                            De3: Number(item.split(',')[11]),
                            De4: Number(item.split(',')[16])
                        }
                    }));
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
            $('#hfCodDespachoTransportista').val(i.item.val);
            $('#hfDespachoTransportista').val(i.item.label);
        },
        minLength: 3
    });


    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());

    $('.MesAnioPicker').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yymm',

        onClose: function (dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).val($.datepicker.formatDate('yymm', new Date(year, month, 1)));
        }
    });

    $('.MesAnioPicker').datepicker($.datepicker.regional['es']);

    $('.MesAnioPicker').focus(function () {
        $('.ui-datepicker-calendar').hide();
        $('#ui-datepicker-div').position({
            my: 'center top',
            at: 'center bottom',
            of: $(this)
        });
    });

    $('.MesAnioPicker').datepicker('setDate', new Date());

    $('#divTabs').tabs();

    $('#MainContent_txtDesde').datepicker({ onSelect: function () {
        var date = $(this).datepicker('getDate');
        if (date) {
            date.setDate(1);
            $(this).datepicker('setDate', date);
        }
    }
    });

    $('#MainContent_txtDesde').datepicker({ beforeShowDay: function (date) {
        return [date.getDate() == 1, ''];
    }
    });

    F_Controles_Inicializar();

    $('#MainContent_btnBuscarArticulo').click(function () {
        try {
            MostrarEspera(true);
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
                MostrarEspera(false);
                alertify.log(cadena);
                return false;
            }

            F_Buscar_Productos()
        }
        catch (e) {
            MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }


        return false;

    });

    $('#MainContent_btnAgregarProducto').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            $('#MainContent_txtArticulo').val('');

            $("#divConsultaArticulo").dialog({
                resizable: false,
                modal: true,
                title: "Consulta de Productos",
                title_html: true,
                height: 500,
                width: 1200,
                autoOpen: false
            });

            $('#divConsultaArticulo').dialog('open');
            $('#MainContent_txtArticulo').focus();
            $('#MainContent_chKConIgv').prop('checked', true);
            $('#MainContent_chkSinIgv').prop('checked', false);

            var objParams = {};
            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

            F_CargarGrillaVaciaConsultaArticulo_NET(arg, function (result) {

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") {
                    F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);
                    $('.ccsestilo').css('background', '#FFFFE0');
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

            if (!F_ValidarAgregar())
                return false;

            $('.chkSi').each(function () {
                var ch = $(this).find('input')[0];
                if ($(ch).is(':checked')) {
                    var txtcantidad = ch.id;
                    txtcantidad = txtcantidad.replace('chkOK', 'txtCantidad');
                    F_AgregarTemporal(txtcantidad);
                }
            });

            F_LimpiarGrillaConsulta();

            $('#MainContent_txtArticulo').focus();
            return false;
        }

        catch (e) {
            MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnEliminar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (!F_ValidarEliminar())
                return false;

            if (confirm("ESTA SEGURO DE ELIMINAR LOS PRODUCTOS SELECCIONADOS"))
                F_EliminarTemporal();

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

            if (confirm("ESTA SEGURO DE GRABAR LA NOTA DE PEDIDO"))
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

    $('#MainContent_btnExcel').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_VisualizarExcel();
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
        return false;
    });

    $('#MainContent_btnPrincipales').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {

            if ($('#MainContent_ddlEstado').val() === "15") {
                F_VisualizarExcelCerrados();
            }
            else if ($('#MainContent_ddlEstado').val() === "8" | $('#MainContent_ddlEstado').val() === "5") {
                F_VisualizarExcelDespacho();
            }
            else {
                alertify.log('ESTE EXCEL SOLO PUEDE MOSTRARSE PARA APROBADOS Y FACTURADOS');
            }

        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
        return false;
    });

    $('#MainContent_btnImpresionStickers').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_GeneraStickers();
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
        return false;
    });

    $('#MainContent_btnImpresionPedidos').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        $('#div_ImpresorasNotaPedido').dialog({
            resizable: false,
            modal: true,
            title: "Seleccionar Impresora",
            title_html: true,
            height: 80,
            width: 470,
            autoOpen: false,
            open: function (event, ui) {
                $(".ui-dialog-titlebar-close", ui.dialog | ui).show();
            }
        });
        $('#div_ImpresorasNotaPedido').dialog('open');

        return false;
    });

    $('#MainContent_btnImprimirPedidos').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_ImpresionPedidos();
            $('#div_ImpresorasNotaPedido').dialog('close');
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
        return false;
    });

    $('#MainContent_txtEmision').on('change', function (e) {
        F_FormaPago($("#MainContent_ddlFormaPago").val());
        F_TipoCambio();
    });

    $("#MainContent_txtMonto").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $('#MainContent_txtNumero').blur(function () {
        var id = '0000000' + $('#MainContent_txtNumero').val();
        $('#MainContent_txtNumero').val(id.substr(id.length - 7));
        return false;
    });

    $('#MainContent_txtNumeroConsulta').blur(function () {
        if ($('#MainContent_txtNumeroConsulta').val() == '')
            return false;
        var id = '0000000' + $('#MainContent_txtNumeroConsulta').val();
        $('#MainContent_txtNumeroConsulta').val(id.substr(id.length - 7));
        return false;
    });

    $("#MainContent_btnExaminarExcel").click(function (evt) {
        if (!F_SesionRedireccionar(AppSession)) return false;
        F_GrabarDocumentoTemporal();
        return false;
    });

    $(document).on("change", "select[id $= 'MainContent_ddlSerie']", function () {
        F_Mostrar_Correlativo(17);
    });

    $('#MainContent_txtCodCotizacion').css('background', '#FFFFE0');

    $('#MainContent_txtProveedor').css('background', '#FFFFE0');

    $('#MainContent_txtAtencion').css('background', '#FFFFE0');

    $('#MainContent_txtReferencia').css('background', '#FFFFE0');

    $('#MainContent_txtVigencia').css('background', '#FFFFE0');

    $('#MainContent_txtVencimiento').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtPlaca').css('background', '#FFFFE0');

    $('#MainContent_txtClienteConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroGuia').css('background', '#FFFFE0');

    $('#MainContent_txtFechaTraslado').css('background', '#FFFFE0');

    $('#MainContent_txtDestino').css('background', '#FFFFE0');

    $('#MainContent_txtSubTotal').css('background', '#FFFFE0');

    $('#MainContent_txtIgv').css('background', '#FFFFE0');

    $('#MainContent_txtTotal').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtNumero').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtArticulo').css('background', '#FFFFE0');

    $("#MainContent_txtDesc1").css('background', '#FFFFE0');

    $("#MainContent_txtDesc2").css('background', '#FFFFE0');

    $("#MainContent_txtDesc3").css('background', '#FFFFE0');

    $("#MainContent_txtDesc4").css('background', '#FFFFE0');

    $("#MainContent_txtEmpresa").css('background', '#FFFFE0');

    $("#MainContent_txtFechaCierre").css('background', '#FFFFE0');

    $("#MainContent_txtValIgv").css('background', '#FFFFE0');

    $("#MainContent_txtBultos").css('background', '#FFFFE0');

    $("#MainContent_txtCuenta").css('background', '#FFFFE0');

    $("#MainContent_txtSumatoria").css('background', '#FFFFE0');

    $("#MainContent_txtTransportista").css('background', '#FFFFE0');

    $("#MainContent_txtTransportistaNP").css('background', '#FFFFE0');

    $("#MainContent_txtComentario").css('background', '#FFFFE0');

    $('#MainContent_txtCliente').css('background', '#FFFFE0');

    $('#MainContent_txtNroRuc').css('background', '#FFFFE0');

    $('#MainContent_txtDireccion').css('background', '#FFFFE0');

    $('#MainContent_txtClienteQuiere').css('background', '#FFFFE0');

    $("#MainContent_txtComentarioCerrado").css('background', '#FFFFE0');




    $("#MainContent_txtDespachoFecha").css('background', '#FFFFE0');

    $("#MainContent_txtDespachoNroGuias").css('background', '#FFFFE0');

    $("#MainContent_txtDespachoNroBultos").css('background', '#FFFFE0');

    $("#MainContent_txtDespachoChofer").css('background', '#FFFFE0');

    $("#MainContent_txtDespachoTransportista").css('background', '#FFFFE0');

    $("#MainContent_txtDespachoObservacion").css('background', '#FFFFE0');


    $('#div_ExcelCarga').dialog({
        resizable: false,
        modal: true,
        title: "Carga Excel",
        title_html: true,
        height: 80,
        width: 470,
        autoOpen: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).show();
        }
    });

    $("#divSeleccionarEmpresa").dialog({
        resizable: false,
        modal: true,
        title: "Empresas",
        title_html: true,
        height: 300,
        width: 420,
        autoOpen: false,
        closeOnEscape: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        }
    });

    $("#divConsultaCotizacion").dialog({
        resizable: false,
        modal: true,
        title: "Cotizaciones",
        title_html: true,
        height: 300,
        width: 710,
        autoOpen: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).show();
        },
        beforeClose: function (event, ui) {
            $('#MainContent_grvConCot tbody tr').remove();
        }
    });

    $('#div_CerrarNota').dialog({
        resizable: false,
        modal: true,
        title: "Cerrar Nota",
        title_html: true,
        height: 150,
        width: 200,
        autoOpen: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).show();
        }
    });

    $('#MainContent_btnCotizacion').click(function () {
        $("#divConsultaCotizacion").dialog('open');
        return false;
    });

    $('#MainContent_btnExaminar').click(function () {
        $("#div_ExcelCarga").dialog('open');
        return false;
    });

    $('#MainContent_btnConCotBus').click(function () {

        try {
            var Contenedor = "#MainContent_";

            var objParams = {
                Filtro_CodSede: $(Contenedor + 'hdnCodSede').val(),
                Filtro_SerieDoc: $(Contenedor + 'txtConCotSer').val(),
                Filtro_NumeroDoc: $(Contenedor + 'txtConCotNum').val(),
                Filtro_Referencia: $(Contenedor + 'txtConCotRef').val()
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

            F_ConsultarCotizacion_Net
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_grvConCot', result.split('~')[2]);
                        if (str_mensaje_operacion == 'No se encontraron registros')
                            alertify.log(str_mensaje_operacion);
                        $('.ccsestilo').css('background', '#FFFFE0');
                    }
                    else {

                        alertify.log(str_mensaje_operacion);

                    }
                }
            );

        }
        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

        return false;
    });

    $('.ccsestilo').css('background', '#FFFFE0');
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

function F_Prueba() {

    if ($('#MainContent_chkSinIgv').is(':checked'))
        $('#MainContent_chKConIgv').prop('checked', false);
    else
        $('#MainContent_chKConIgv').prop('checked', true);
    return false;
}

function F_ValidarCheckSinIgv(ControlID) {

    var chkok_grilla = '';

    chkok_grilla = '#' + ControlID;

    if ($(chkok_grilla).is(':checked'))
        $('#MainContent_chkSinIgv').prop('checked', false);
    else
        $('#MainContent_chkSinIgv').prop('checked', true);

    return false;
}

$(document).on("change", "select[id $= 'MainContent_ddlFormaPago']", function () {
    F_FormaPago($("#MainContent_ddlFormaPago").val());
});

function F_Controles_Inicializar() {
    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodSede: $('#hfCodSede').val(),
                Filtro_CodEmpresa: $('#hfCodEmpresa').val(),
                Filtro_CodAlmacenFisico: 1
            };

//            var val;
//            for (val in ImpresorasNotaPedido) {
//                st = new Option(ImpresorasNotaPedido[val], ImpresorasNotaPedido[val]);
//                document.getElementById('MainContent_ddlImpresoraNotaPedido').add(st);
//            }
//            $("#MainContent_ddlImpresoraNotaPedido").css('background', '#FFFFE0');

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
                        F_Update_Division_HTML('div_moneda', result.split('~')[3]);
                        F_Update_Division_HTML('div_igv', result.split('~')[6]);
                        F_Update_Division_HTML('div_Preparado', result.split('~')[10]);
                        F_Update_Division_HTML('div_Aprobado', result.split('~')[11]);
                        F_Update_Division_HTML('div_ddlvendcerra', result.split('~')[12]);
                        F_Update_Division_HTML('div_ddlVendedorEspecial', result.split('~')[13]);
                        F_Update_Division_HTML('div_Estado', result.split('~')[14]);
                        F_Update_Division_HTML('div_EmpresaConsulta', result.split('~')[9]);
                        F_Update_Division_HTML('div_VendedorConsulta', result.split('~')[15]);
                        F_Update_Division_HTML('div_UsuarioCredito', result.split('~')[16]);
                        F_Update_Division_HTML('div_TipoDoc', result.split('~')[19]);
                        F_Update_Division_HTML('div_AlmacenFisico', result.split('~')[20]);
                        F_Update_Division_HTML('div_ComboImpresoraNotaPedido', result.split('~')[21]);
                        $('#MainContent_ddlEmpresaConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlVendedorConsulta').css('background', '#FFFFE0');
                        $('#MainContent_lblTC').text(result.split('~')[4]);
                        $('#MainContent_txtNumero').val(result.split('~')[5]);
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlEstado').css('background', '#FFFFE0');
                        $('#MainContent_ddlPreparado').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoDoc').css('background', '#FFFFE0');
                        $('#MainContent_ddlAlmacenFisico').css('background', '#FFFFE0');
                        $('#MainContent_ddlAprobado').css('background', '#FFFFE0');
                        $('#MainContent_ddlVendedorCerrado').css('background', '#FFFFE0');
                        $('#MainContent_ddlVendedorEspecial').css('background', '#FFFFE0');
                        $('#MainContent_ddlUsuarioCredito').css('background', '#FFFFE0');
                        $('#MainContent_ddlImpresoraNotaPedido').css('background', '#FFFFE0');
                        $('#MainContent_ddlMoneda').val(2);
                        $('#MainContent_ddlEstado').val(15);
                        $('#MainContent_ddlPreparado').val(0);
                        $('#MainContent_ddlAprobado').val(0);
                        $('#MainContent_ddlImpresoraNotaPedido').val(1102);
                        $('#MainContent_ddlUsuarioCredito').val(result.split('~')[17]);
                        $('.ccsestilo').css('background', '#FFFFE0');
                        $('#MainContent_chkNotaVenta').prop('checked', false);
                        if (result.split('~')[18] == '0')
                            $('#MainContent_ddlUsuarioCredito').prop('disabled', true);

                        $("#divTabs").tabs("option", "active", $("#liConsulta").index());
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

function F_Buscar_Productos() {
    var arg;
    var CodTipoProducto = '2';
    try {
        var objParams =
            {
                Filtro_DscProducto: $('#MainContent_txtArticulo').val(),
                Filtro_CodTipoProducto: CodTipoProducto,
                Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                Filtro_Empresa: $('#hfCodEmpresa').val(),
                Filtro_Almacen: $('#hfCodSede').val(),
                Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                Filtro_CodAlmacenFisico: 0,
                Filtro_NV: $('#MainContent_chkNotaVenta').is(':checked') ? 1 : 0
            };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);

        F_Buscar_Productos_NET
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
                        if (str_mensaje_operacion == 'No se encontraron registros')
                            alertify.log(str_mensaje_operacion);
                        $('#MainContent_chkDescripcion').focus()
                        $('.ccsestilo').css('background', '#FFFFE0');
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

function F_ValidarDsc(ControlID, Dsc) {

    var dsc = '#' + ControlID;
    
    //valida el descuento
    if ($(dsc).val() == '') {
        alertify.log('Descuento Invalido');
        $(dsc).val(0);
    }

    if (isNaN($(dsc).val()) == true) {
        alertify.log('Descuento Invalido');
        $(dsc).val(0);
    }

    var dcto = parseFloat($(dsc).val()).toFixed(2);
    if (dcto < 0 || dcto > 100) {
        alertify.log('Descuento Invalido');
        $(ControlID).val(0);
     }


    var IDPrincipal = ControlID.replace(Dsc, 'chkOK');
    F_ValidarCheck(IDPrincipal);
    return false;
}

function F_ValidarCheck(ControlID) {


    var cadena = 'Ingrese los sgtes. campos: '

    var chkOK = '#' + ControlID;
    var txtPrecio = chkOK.replace('chkOK', 'txtPrecio');
    var hdnPrecio = chkOK.replace('chkOK', 'hfPrecioOrig');
    var txtCantidad = chkOK.replace('chkOK', 'txtCantidad');
    var txtDescuento1 = chkOK.replace('chkOK', 'txtDescuento1');
    var txtDescuento2 = chkOK.replace('chkOK', 'txtDescuento2');
    var txtDescuento3 = chkOK.replace('chkOK', 'txtDescuento3');
    var txtDescuento4 = chkOK.replace('chkOK', 'txtDescuento4');
    var lblPrecioSoles = chkOK.replace('chkOK', 'lblPrecioSoles');
    var lblPrecioDolares = chkOK.replace('chkOK', 'lblPrecioDolares');

    var dcto = parseFloat(1 - (parseFloat(parseFloat(1 - (
                (1 - (parseFloat($(txtDescuento1).val()) / 100)) *
                (1 - (parseFloat($(txtDescuento2).val()) / 100)) *
                (1 - (parseFloat($(txtDescuento3).val()) / 100)) *
                (1 - (parseFloat($(txtDescuento4).val()) / 100))
                )))));
    
    if ($(chkOK).is(':checked')) {
        $(txtCantidad).prop('disabled', false);
        $(txtPrecio).prop('disabled', false);
        var i = 0;
        if ($(txtPrecio).val() == "") {
            $(txtPrecio).focus();
            i = 1
        }

        if (i == 0 && $(txtCantidad).val() == "")
        { $(txtPrecio).focus(); }

        var pre = 0;
        var po = 0;
        if ($('#MainContent_ddlMoneda').val() == 1) {
            pre = Number($(lblPrecioSoles).text());
            po = Number($(lblPrecioSoles).text());
        } else {
            pre = Number($(lblPrecioDolares).text());
            po = Number($(lblPrecioDolares).text());
        }

        $(hdnPrecio).val(po);

        pre = Number(pre) * Number(dcto);
        pre = Number(pre.toFixed(2));

        $(txtPrecio).val(pre);
    }
    else {
        $(txtCantidad).val('');
        $(txtPrecio).val('');
        $(txtCantidad).prop('disabled', true);
        $(txtPrecio).prop('disabled', true);
    }
    return true;
}

function F_FormaPago(CodFormaPago) {
    var arg;
    try {
        switch (CodFormaPago) {
            case "1":
            case "12":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 0));

                break;

            case "3":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 30));

                break;

            case "4":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 15));

                break;

            case "8":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 45));

                break;

            case "9":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 60));

                break;

            case "11":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 7));

                break;

            case "13":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 75));

                break;

            case "14":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 90));

                break;
        }


    }
    catch (mierror) {
        alertify.log("Error detectado: " + mierror);
    }

}

function F_ValidarAgregar() {
    try {
        var chkSi = '';
        var chkDel = '';
        var txtcantidad_grilla = '';
        var txtprecio_grilla = '';
        var cadena = "Ingrese los sgtes. campos: ";
        var lblcodproducto_grilla = '';
        var hfcodarticulodetalle_grilla = '';
        var lbldscproducto_grilla = '';
        var x = 0;

        $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
            chkSi = '#' + this.id;
            txtprecio_grilla = chkSi.replace('chkOK', 'txtPrecioLibre');
            txtcantidad_grilla = chkSi.replace('chkOK', 'txtCantidad');
            lblcodproducto_grilla = chkSi.replace('chkOK', 'lblcodproducto');

            if ($(chkSi).is(':checked')) {
                if ($(txtprecio_grilla).val() == '')
                    cadena = cadena + "\n" + "Precio para el Codigo " + $(lblcodproducto_grilla).text();

                if ($(txtcantidad_grilla).val() == '')
                    cadena = cadena + "\n" + "Cantidad para el Codigo " + $(lblcodproducto_grilla).text();

                x = 1;
            }
        });

        if (x == 0)
            cadena = "No ha seleccionado ningun producto";

        if (cadena != "Ingrese los sgtes. campos: ") {

            alertify.log(cadena);
            return false;
        }
        else {
            cadena = "Los sgtes. productos se encuentran agregados : ";
            $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
                chkSi = '#' + this.id;
                lblcodproducto_grilla = chkSi.replace('chkOK', 'lblcodproducto');

                if ($(chkSi).is(':checked')) {
                    $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                        chkDel = '#' + this.id;
                        hfcodarticulodetalle_grilla = chkDel.replace('chkEliminar', 'hfcodarticulo');
                        lbldscproducto_grilla = chkDel.replace('chkEliminar', 'lblproducto');

                        if ($(lblcodproducto_grilla).text() == $(hfcodarticulodetalle_grilla).val()) {
                            cadena = cadena + "\n" + $(lbldscproducto_grilla).text();
                        }

                    });
                }
            });
        }

        if (cadena != "Los sgtes. productos se encuentran agregados : ") {

//            alertify.log(cadena);
            //            return false;
            return true;
        }
        else {
            return true;
        }
    }

    catch (e) {

        alertify.log("Error Detectado: " + e);

    }
}

function F_GrabarDocumento() {
    //Principal
    try {

        var lblcodproducto_grilla = '';
        var lblcodunidadventa_grilla = '';
        var lblcosto_grilla = '';
        var chkSi = '';
        var txtCantidad = '';
        var txtPrecio = '';
        var hfPrecioOrig = '';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla = '';
        var hfcosto_grilla = '';
        var chkNotaPedido = 0;
        var chkServicio = 0;
        var lblProducto = '';
        var hdPrecioOrig = 0;
        var lblcodum = '';
        var txtDescripcion = '';
        var lblimporte = '';

        if ($('#MainContent_chkServicios').is(':checked'))
            chkServicio = 1;

        if ($('#MainContent_chkNotaPedido').is(':checked'))
            chkNotaPedido = 1;

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        var valum = true;

        $('.detallesart').each(function () {
            chkSi = '#' + this.id;
            lblcodproducto_grilla = chkSi.replace('lblcoddetalle', 'hfcodarticulo');
            txtDescripcion = chkSi.replace('lblcoddetalle', 'txtDescripcion');
            txtPrecio = chkSi.replace('lblcoddetalle', 'txtPrecio');
            hfPrecioOrig = chkSi.replace('lblcoddetalle', 'hfPrecioOrig');
            txtCantidad = chkSi.replace('lblcoddetalle', 'txtCantidad');
            lblcodum = chkSi.replace('lblcoddetalle', 'lblUm');
            lblimporte = chkSi.replace('lblcoddetalle', 'lblimporte');

            if ($(lblcodum).text() == '') {
                valum = false;
                return false;
            }

            if ($(lblcodproducto_grilla).val() != '') {
                var objDetalle = {
                    CodArticulo: $(lblcodproducto_grilla).val(),
                    Descripcion: $(txtDescripcion).val().replace("&", "&amp;"),
                    Cantidad: $(txtCantidad).val(),
                    Precio: $(txtPrecio).val() / tasaigv,
                    PrecioOrig: $(hfPrecioOrig).val() / tasaigv,
                    CodDetalle: $(chkSi).text(),
                    SubTotal: $(lblimporte).text()
                };

                arrDetalle.push(objDetalle);
            }
        });

        if (!valum) {
            alertify.log("Todos los productos deben tener UM.");
            return false;
        }

        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_CodTipoDoc: "17",
            Filtro_Serie: $(Contenedor + 'ddlSerie option:selected').text(),
            Filtro_Numero: $(Contenedor + 'txtNumero').val(),
            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtVigencia').val(),
            Filtro_CodCliente: $('#hfCodCtaCte').val(),
            Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
            Filtro_CodProforma: "0",
            Filtro_Igv: $(Contenedor + 'txtIgv').val(),
            Filtro_Total: $(Contenedor + 'txtTotal').val(),
            Filtro_CodTraslado: "0",
            Filtro_Descuento: "0",
            Filtro_CodTasa: $(Contenedor + 'ddlIgv').val(),
            Filtro_Servicio: chkServicio,
            Filtro_NotaPedido: chkNotaPedido,
            Filtro_CodEmpresa: $('#hfCodEmpresa').val(),
            Filtro_CodSede: $('#hfCodEmpresa').val(),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_NotaVenta: $(Contenedor + 'chkNotaVenta').is(":checked"),
            Filtro_Desc1: $(Contenedor + 'txtDesc1').val(),
            Filtro_Desc2: $(Contenedor + 'txtDesc2').val(),
            Filtro_Desc3: $(Contenedor + 'txtDesc3').val(),
            Filtro_Desc4: $(Contenedor + 'txtDesc4').val(),
            Filtro_CodVenPre: $(Contenedor + 'ddlVendedorPreparado').val(),
            Filtro_CodVenApr: $(Contenedor + 'ddlVendedorAprobado').val(),
            Filtro_CodVenCerr: $(Contenedor + 'ddlVendedorCerrado').val(),
            Filtro_CodEstado: $('#hfCodEstado').val(),
            Filtro_Bultos: $(Contenedor + 'txtBultos').val(),
            Filtro_CodAlmacenFisico: $(Contenedor + 'ddlAlmacenFisico').val(),
            Filtro_ValIgv: $(Contenedor + 'txtValIgv').val() == '' ? '' : parseFloat((Contenedor + 'txtValIgv').val()) / 100,           
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
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
                alertify.log(str_mensaje_operacion);
                F_Nuevo();
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
    }
}

function F_GrabarDocumentoTemporal() {
    //Principal
    try {
        var fileUpload = $("#MainContent_fuExcel").get(0);
        var files = fileUpload.files;

        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            data.append(files[i].name, files[i]);
        }

        var lblcodproducto_grilla = '';
        var lblcodunidadventa_grilla = '';
        var lblcosto_grilla = '';
        var chkSi = '';
        var txtCantidad = '';
        var txtPrecio = '';
        var hfPrecioOrig = '';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla = '';
        var hfcosto_grilla = '';
        var chkNotaPedido = 0;
        var chkServicio = 0;
        var lblProducto = '';
        var hdPrecioOrig = 0;

        if ($('#MainContent_chkServicios').is(':checked'))
            chkServicio = 1;

        if ($('#MainContent_chkNotaPedido').is(':checked'))
            chkNotaPedido = 1;

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_CodTipoDoc: "17",
            Filtro_Serie: $(Contenedor + 'ddlSerie option:selected').text(),
            Filtro_Numero: $(Contenedor + 'txtNumero').val(),
            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtVigencia').val(),
            Filtro_CodCliente: $('#hfCodCtaCte').val(),
            Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
            Filtro_CodProforma: "0",
            Filtro_Igv: $(Contenedor + 'txtIgv').val(),
            Filtro_Total: $(Contenedor + 'txtTotal').val(),
            Filtro_CodTraslado: "0",
            Filtro_Descuento: "0",
            Filtro_CodTasa: $(Contenedor + 'ddlIgv').val(),
            Filtro_Servicio: chkServicio,
            Filtro_NotaPedido: chkNotaPedido,
            Filtro_CodEmpresa: $(Contenedor + 'hdnCodEmpresa').val(),
            Filtro_CodSede: $(Contenedor + 'hdnCodSede').val(),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_NotaVenta: $(Contenedor + 'chkNotaVenta').is(":checked"),
            Filtro_Desc1: $(Contenedor + 'txtDesc1').val(),
            Filtro_Desc2: $(Contenedor + 'txtDesc2').val(),
            Filtro_Desc3: $(Contenedor + 'txtDesc3').val(),
            Filtro_Desc4: $(Contenedor + 'txtDesc4').val(),
            Filtro_CodVenPre: $(Contenedor + 'ddlVendedorPreparado').val(),
            Filtro_CodVenApr: $(Contenedor + 'ddlVendedorAprobado').val(),
            Filtro_CodVenCerr: $(Contenedor + 'ddlVendedorCerrado').val(),
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_GrabarTemporal_NET(arg, function (result) {



            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                var options = {};
                options.url = "../Servicios/CargaArchivo.ashx";
                options.type = "POST";
                options.data = data;
                options.contentType = false;
                options.processData = false;
                options.success = function (result) { alert(result); };
                options.error = function (err) { alert(err.statusText); };

                $.ajax(options);

                MostrarEspera(false);
            }
            else {
                alertify.log(result.split('~')[2]);
            }

            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
    }
}

function F_LimpiarGrillaConsulta() {
    var chkSi = '';
    var txtprecio_grilla = '';
    var txtcantidad_grilla = '';
    var ddlLista_grilla = '';

    $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
        chkSi = '#' + this.id;
        txtprecio_grilla = chkSi.replace('chkOK', 'txtPrecioLibre');
        txtcantidad_grilla = chkSi.replace('chkOK', 'txtCantidad');
        ddlLista_grilla = chkSi.replace('chkOK', 'ddlLista');

        $(txtcantidad_grilla).prop('disabled', true);
        $(txtprecio_grilla).val('');
        $(txtcantidad_grilla).val('');
        $(ddlLista_grilla).val('4');

        $(chkSi).prop('checked', false);

    });
}

function F_MostrarTotales(Fila, Flag) {
    try {
        var lblimporte = '', txtPrecio = '', txtCantidad = '';
        var chkDel = '';
        var Total = 0;
        var Igv = 0;
        var Subtotal = 0;
        if (Flag == 1) {
            txtCantidad = '#' + Fila;
            txtPrecio = txtCantidad.replace('txtCantidad', 'txtPrecio');
            lblimporte = txtCantidad.replace('txtCantidad', 'lblimporte');
        }
        else {
            txtPrecio = '#' + Fila;
            txtCantidad = txtPrecio.replace('txtPrecio', 'txtCantidad');
            lblimporte = txtPrecio.replace('txtPrecio', 'lblimporte');
        }

        $(lblimporte).text(parseFloat(Number($(txtPrecio).val()) * Number($(txtCantidad).val())).toFixed(2));

                $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                    chkDel = '#' + this.id;
                    lblimporte = chkDel.replace('chkEliminar', 'lblimporte');
        //            txtPrecio = chkDel.replace('chkEliminar', 'txtPrecio');
        //            txtCantidad = chkDel.replace('chkEliminar', 'txtCantidad');

        //            $(txtPrecio).val(parseFloat($(txtPrecio).val()));
        //            $(txtCantidad).val(parseFloat($(txtCantidad).val()));

        //            var pre = Number($(txtPrecio).val());
        //            var can = Number($(txtCantidad).val());
        //            var imp = pre * can;

        //            $(lblimporte).text(imp.toFixed(2));

                    Total += parseFloat(parseFloat($(lblimporte).text()).toFixed(2));
                });

//        $('.numero').each(function () {
//            chkDel = '#' + this.id;
//            lblimporte = chkDel.replace('lblcoddetalle', 'lblimporte');
//            Total += parseFloat(parseFloat($(lblimporte).text()).toFixed(2));
//        });

        var Cuerpo = '#MainContent_'
        $(Cuerpo + 'txtTotal').val(Total.toFixed(2));
        $(Cuerpo + 'txtMonto').val(Total.toFixed(2));
        recalcularmontos();
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_EliminarTemporal() {
    try {
        var chkSi;
        var importe = Number($("#MainContent_txtTotal").val());

        $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
            chkSi = this;
            var id = "#" + this.id;

            if ($(chkSi).is(':checked')) {
                var imp = Number($(id.replace("chkEliminar", "lblimporte")).text());
                importe -= imp;
                var trr = $(chkSi).parent().parent().parent();
                $(trr).remove();
            }
        });

        $("#MainContent_txtTotal").val(importe.toFixed(2));
        recalcularmontos();
        numerar();
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
    }
}

function F_ValidarEliminar() {

    try {
        var chkSi = '';
        var x = 0;

        $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;

            if ($(chkSi).is(':checked'))
                x = 1;

        });

        if (x == 0) {
            alertify.log("Seleccione un articulo para eliminar");
            return false;
        }
        else
        { return true; }

    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}

function F_ValidarGrabarDocumento() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'lblTC').text() == '0')
            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtEmision').val() == '')
            Cadena = Cadena + '<p></p>' + 'Fecha de Emision';

        if ($(Cuerpo + 'txtTotal').val() == '' | $(Cuerpo + 'txtTotal').val() == '0.00')
            Cadena = Cadena + '<p></p>' + 'No ha ingresado ningun producto';

        var lblCodigoProducto = '';
        var lblimporte = '';
        var Mensaje = 'Los sgtes codigos tienen importe cero';

        $('.detallesart').each(function () {
            chkSi = '#' + this.id;
            lblCodigoProducto = chkSi.replace('lblcoddetalle', 'lblCodigoProducto');
            lblimporte = chkSi.replace('lblcoddetalle', 'lblimporte');

            if ($(lblimporte).text() == '0.00') {
                Mensaje = Mensaje + '<p></p>' + $(lblCodigoProducto).text();
            }
        });

        if (Mensaje != 'Los sgtes codigos tienen importe cero')
            Cadena = Cadena + '<p></p>' + Mensaje;

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

function F_ModificarDescuentoDocumento(obj) {

    var de = Number($(obj).val());

    //    if (de == 0) {
    //        alertify.log("Ingresar valor Mayor que 0.");
    //        return false;
    //    }

    var validar = false;

    $(".precioArt").each(function () {
        if ($(this).val() != "") {
            validar = true;
            return false;
        }
    });

    if (!validar) {
        alertify.log("No existe articulos.");
        return false;
    }

    descontar();
}

function descontar() {
    try {
        MostrarEspera(true);

        var Contenedor = '#MainContent_';
        var d1, d2, d3, d4;

        d1 = Number($(Contenedor + 'txtDesc1').val());
        d2 = Number($(Contenedor + 'txtDesc2').val());
        d3 = Number($(Contenedor + 'txtDesc3').val());
        d4 = Number($(Contenedor + 'txtDesc3').val());

        var chkSi, txtPrecio, txtCantidad, lblImporte, hfPrecioOrig;
        var importetot = 0;

        $('.detallesart').each(function () {
            chkSi = '#' + this.id;

            if ($(chkSi).text() != '') {
                txtPrecio = chkSi.replace('lblcoddetalle', 'txtPrecio');
                hfPrecioOrig = chkSi.replace('lblcoddetalle', 'hfPrecioOrig');
                txtCantidad = chkSi.replace('lblcoddetalle', 'txtCantidad');
                lblImporte = chkSi.replace('lblcoddetalle', 'lblimporte');
                var prori = Number($(hfPrecioOrig).val());
                var pr = Number($(txtPrecio).val());
                var ct = Number($(txtCantidad).val());

                if (d1 > 0) pr = (prori * (100 - d1)) / 100;
                if (d2 > 0) pr = (pr * (100 - d2)) / 100;
                if (d3 > 0) pr = (pr * (100 - d3)) / 100;
                if (d4 > 0) pr = (pr * (100 - d4)) / 100;

                pr = Number(pr.toFixed(2));

                var imp = ct * pr;

                $(lblImporte).text(imp.toFixed(2));
                $(txtPrecio).val(pr);
                importetot += Number(imp.toFixed(2));
            }
        });

        if (importetot > 0) {
            $("#MainContent_txtTotal").val(importetot.toFixed(2));
            recalcularmontos();
        }
        MostrarEspera(false);
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_CambiarNotaVenta() {
    var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + 1;
    if ($('#MainContent_chkNotaVenta').is(':checked')) {
        $('.precOrig').each(function () {
            var p = Number($(this).find('input').val());
            p = p / tasaigv;
            $(this).find('input').val(p.toFixed(2));
        });
    } else {
        $('.precOrig').each(function () {
            var p = Number($(this).find('input').val());
            p = p * tasaigv;
            $(this).find('input').val(p.toFixed(2));
        });
    }
    descontar();

}

function F_Nuevo(seleemp) {
    if (seleemp == undefined) seleemp = true;
    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());
    $('#MainContent_ddlMoneda').val(2);
    $('#hfCodigoTemporal').val('0');
    $('#hfCodCtaCte').val('0');
    $('#hfCodEstado').val('0');
    $('#MainContent_txtProveedor').val('');
    $('#MainContent_txtSubTotal').val('0.00');
    $('#MainContent_txtIgv').val('0.00');
    $('#MainContent_txtTotal').val('0.00');
    $('#MainContent_txtNumero').val('');
    $('#MainContent_txtArticulo').val('');
    $('#MainContent_txtReferencia').val('');
    $('#MainContent_txtObservacion').val('');
    $('#MainContent_txtAtencion').val('');
    $('#MainContent_txtProveedor').focus();
    $('#MainContent_ddlVendedorPreparado').val('0');
    $('#MainContent_ddlVendedorAprobado').val('0');
    $('#MainContent_ddlVendedorCerrado').val('0');
    $('#MainContent_txtDesc1').val('');
    $('#MainContent_txtDesc2').val('');
    $('#MainContent_txtDesc3').val('');
    $('#MainContent_txtDesc4').val('');
    $("#MainContent_lblNumRegistros").text("0");
    $("#MainContent_txtBultos").val("0");
    $('#MainContent_txtValIgv').val('');
    $('#MainContent_txtValIgv').hide();
    $('#MainContent_ddlIgv').show();
    $('#MainContent_txtDireccion').val('');
    $('#MainContent_txtCliente').val('');
    $('#MainContent_txtNroRuc').val('');


    try {
        var objParams = {
            Filtro_CodSerie: $('#MainContent_ddlSerie').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);

        F_Nuevo_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[2]);
                $('#MainContent_txtNumero').val(result.split('~')[3]);
                $('.ccsestilo').css('background', '#FFFFE0');
                if (seleemp) $('#divSeleccionarEmpresa').dialog('open');
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

function F_Buscar() {
    try {
        var chkFecha = '0';
        var chkCliente = '0';

        if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = '1';

        if ($('#MainContent_chkCliente').is(':checked'))
            chkCliente = '1';

        var objParams = {
            Filtro_CodEmpresa: $('#MainContent_ddlEmpresaConsulta').val(),
            Filtro_CodVenPre: $("#MainContent_ddlVendedorConsulta").val(),
            Filtro_CodEstado: $("#MainContent_ddlEstado").val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            Filtro_ChkFecha: chkFecha,
            Filtro_ChkCliente: chkCliente
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
                var Cuenta = 0;
                var Sumatoria = 0;
                $('.numero2').each(function () {
                    Cuenta++;
                    Sumatoria += parseFloat($(this).text());
                });
                $("#MainContent_txtCuenta").val(Cuenta);
                $("#MainContent_txtSumatoria").val(Sumatoria.toFixed(2));

                if (isNaN($("#MainContent_txtSumatoria").val())) {
                    $("#MainContent_txtCuenta").val("0");
                    $("#MainContent_txtSumatoria").val("0.00");
                }

                if (str_mensaje_operacion != '')
                    alertify.log(str_mensaje_operacion);
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

function imgMas_Click(Control) {
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        $(Control).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Control).next().html() + '</td></tr>');
        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }

    return false;
}

function getContentTab() {
    $('#MainContent_chkRango').prop('checked', true);
    F_Buscar();
    return false;
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

function F_TipoCambio() {
    try {
        var objParams = {
            Filtro_Emision: $("#MainContent_txtEmision").val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_TipoCambio_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                $('#MainContent_lblTC').text(result.split('~')[2]);
                $('#MainContent_lblTCOC').text(result.split('~')[2]);
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

function F_Mostrar_Correlativo(CodDoc) {

    var arg;

    try {

        var objParams = {
            Filtro_Sede: $('#hfCodSede').val(),
            Filtro_CodDoc: CodDoc,
            Filtro_SerieDoc: $("#MainContent_ddlSerie option:selected").text()
        };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Mostrar_Correlativo_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);

                    if (str_resultado_operacion == "1")
                        $('#MainContent_txtNumero').val(result.split('~')[2]);

                    else
                        alertify.log(str_mensaje_operacion);

                    return false;

                }
            );

    } catch (mierror) {
        MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);

    }

}

function F_Imprimir(Codigo) {

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '203';
    var CodEstado = '0';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + Codigo + '&';
    rptURL = rptURL + 'CodEstado=' + CodEstado + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_ImprimirCotizacion(Fila) {

    var imgID = Fila.id;
    var lblID = '#' + imgID.replace('imgImprimir', 'lblID');

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '203';
    var CodEstado = '0';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + $(lblID).text() + '&';
    rptURL = rptURL + 'CodEstado=' + CodEstado + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_VisualizarCotizacion(Fila, CodMenu, CodTipArc) {

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = CodTipArc; // '5';
    var CodEstado = '0';
    var imgID = Fila.id;
    var varrpc = 'imgPdf'; if (CodTipArc == 6) varrpc = 'imgPdf2';
    var lblID = '#' + imgID.replace(varrpc, 'lblID')


    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + $(lblID).val() + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_VerCotizacion(Codigo) {

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '15';
    var CodEstado = '0';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + Codigo + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_ValidarPrecioLista(ControlID) {

    var ddlLista_Grilla = '';
    var lblprecio = '';
    var txtcant_grilla = '';
    var txtprecio_grilla = '';
    var boolEstado = false;

    ddlLista_Grilla = '#' + ControlID;
    txtprecio_grilla = ddlLista_Grilla.replace('ddlLista', 'txtPrecioLibre');
    txtcant_grilla = ddlLista_Grilla.replace('ddlLista', 'txtCantidad');

    switch ($(ddlLista_Grilla).val()) {
        case "1":
            lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio1');
            $(txtprecio_grilla).val($(lblprecio).val());
            $(txtprecio_grilla).prop('disabled', true);
            $(txtcant_grilla).focus();
            break;

        case "2":
            lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio2');
            $(txtprecio_grilla).val($(lblprecio).val());
            $(txtprecio_grilla).prop('disabled', true);
            $(txtcant_grilla).focus();
            break;
        case "3":
            lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio3');
            $(txtprecio_grilla).val($(lblprecio).val());
            $(txtprecio_grilla).prop('disabled', true);
            $(txtcant_grilla).focus();
            break;

        case "4":
            $(txtprecio_grilla).val('');
            $(txtprecio_grilla).prop('disabled', false);
            $(txtprecio_grilla).focus();
            break;
    }

    return true;
}

function F_ValidarPrecioGrilla(ControlID) {

    //            var txtprecio_Grilla = '';
    //            var lblprecio_grilla = '';
    //            var txtcant_grilla = '';
    //            var txtprecio_grilla = '';
    //            var boolEstado = false;
    //             chkok_grilla='';

    var txtPrecio = '#' + ControlID;
    //            chkok_grilla = txtPrecio.replace('txtPrecio', 'chkOK');
    //            lblprecio_grilla = txtPrecio.replace('txtPrecio', 'lblPrecio1');
    //            boolEstado = $(chkok_grilla).is(':checked');

    if ($(txtPrecio).val() == '')
        return false;

    //            if ($('#hfCodUsuario').val()!='5' && boolEstado && parseFloat($(txtprecio_Grilla).val())< parseFloat($(lblprecio_grilla).val()))
    //            {alertify.log("Precio por debajo del minimo");
    //            $(txtprecio_Grilla).val('');
    //              return false;
    //             }

    return false;
}

function F_ValidarDescuento(ControlID) {

    var txtDescuento = '#' + ControlID;
    var chkOK = txtDescuento.replace('txtDescuento', 'chkOK');
    var txtPrecio = txtDescuento.replace('txtDescuento', 'txtPrecio');

    if (!$(chkOK).is(':checked'))
        return false;

    if ($(txtDescuento).val() == "") {
        $(txtDescuento).val("");
        return false;
    }

    var hfDescuento = txtDescuento.replace('txtDescuento', 'hfDescuento');
    if (parseFloat($(txtDescuento).val()) > parseFloat($(hfDescuento).val())) {
        alertify.log("Descuento no permitido");
        $(txtDescuento).val("");
        return false;
    }
    var lblPrecioSoles = txtDescuento.replace('txtDescuento', 'lblPrecioSoles');
    var lblPrecioDolares = txtDescuento.replace('txtDescuento', 'lblPrecioDolares');
    var hfCodFamilia = txtDescuento.replace('txtDescuento', 'hfCodFamilia');
    var hfCostoProductoSoles = txtDescuento.replace('txtDescuento', 'hfCostoProductoSoles');
    var hfCostoProductoDolares = txtDescuento.replace('txtDescuento', 'hfCostoProductoDolares');
    var hfMargen = txtDescuento.replace('txtDescuento', 'hfMargen');

    var Descuento = 0;
    var Costo = 0;

    if ($('#MainContent_ddlMoneda').val() == 1)
        Costo = $(hfCostoProductoSoles).val();
    else
        Costo = $(hfCostoProductoDolares).val();

    Descuento = ($(hfMargen).val() - (parseFloat($(txtDescuento).val()) / 100)) + 1;
    Costo = (((Costo * Descuento) * 2).toFixed(0)) / 2;
    $(txtPrecio).val(Costo.toFixed(2));

    return true;
}

function F_ValidarStockGrilla(controlId) {

    var txtCantidad = '#' + controlId;
    var chkOK = txtCantidad.replace('txtCantidad', 'chkOK');
    var txtPrecio = txtCantidad.replace('txtCantidad', 'txtPrecio');
    var txtDescuento = txtCantidad.replace('txtCantidad', 'txtDescuento');

    if ($(txtCantidad).val() == '')
        return false;

    if (F_ValidarAgregar() == false) {
        $(txtCantidad).val('');
        $(txtPrecio).val('');
        $(txtDescuento).val('');
        $(chkOK).prop('checked', false);
        return false;
    }

    F_AgregarTemporal(controlId);

    F_LimpiarGrillaConsulta();
    $('#MainContent_txtArticulo').focus();
    return false;
}

function F_AgregarTemporal(controlId) {
    var lblcodproducto_grilla = '';
    var lblcodunidadventa_grilla = '';
    var lblcosto_grilla = '';
    var chkSi = '';
    var txtCantidad = '';
    var txtPrecio = '';
    var hfcodunidadventa_grilla = '';
    var hfcosto_grilla = '';
    var chkNotaPedido = 0;
    var chkServicio = 0;
    var lblProducto = '';
    var hdPrecioOrig = '';
    var lblUM = '';
    var hlkCodigo = '';
    var hdPrecioOrig = '';

    var lblDescuento1 = '';
    var lblDescuento2 = '';
    var lblDescuento3 = '';

    txtCantidad = '#' + controlId;

    lblcodproducto_grilla = txtCantidad.replace('txtCantidad', 'lblcodproducto');
    lblcodunidadventa_grilla = txtCantidad.replace('txtCantidad', 'lblcodunidadventa');
    lblcosto_grilla = txtCantidad.replace('txtCantidad', 'lblcosto');
    chkSi = txtCantidad.replace('txtCantidad', 'chkOK');
    txtPrecio = txtCantidad.replace('txtCantidad', 'txtPrecio');
    hfcodunidadventa_grilla = txtCantidad.replace('txtCantidad', 'hfcodunidadventa');
    hfcosto_grilla = txtCantidad.replace('txtCantidad', 'hfcosto');
    lblProducto = txtCantidad.replace('txtCantidad', 'lblProducto');
    hdPrecioOrig = txtCantidad.replace('txtCantidad', 'hfPrecioOrig');
    hlkCodigo = txtCantidad.replace('txtCantidad', 'hlkCodigo');
    lblUM = txtCantidad.replace('txtCantidad', 'lblUM');

    lblDescuento1 = txtCantidad.replace('txtCantidad', 'lblDescuento1');
    lblDescuento2 = txtCantidad.replace('txtCantidad', 'lblDescuento2');
    lblDescuento3 = txtCantidad.replace('txtCantidad', 'lblDescuento3');
    //    hdPrecioOrig = txtCantidad.replace('txtCantidad', 'hfPrecioOrig');


    var imp = 0;
    var precio = Number($(txtPrecio).val());
    var d1, d2, d3, d4;
//    d1 = Number($('#MainContent_txtDesc1').val());
//    if (d1 > 0) precio = precio * (100 - d1) / 100;
//    d2 = Number($('#MainContent_txtDesc2').val());
//    if (d2 > 0) precio = precio * (100 - d2) / 100;
//    d3 = Number($('#MainContent_txtDesc3').val());
//    if (d3 > 0) precio = precio * (100 - d3) / 100;
//    imp = precio * Number($(txtCantidad).val());
//    d4 = Number($('#MainContent_txtDesc4').val());
//    if (d4 > 0) precio = precio * (100 - d4) / 100;
//    precio = Number(precio.toFixed(2));
    imp = precio * Number($(txtCantidad).val());

    if ($(chkSi).is(':checked')) {

        //var dd = $('.detallesart');
        var dd = $('.numero');

        var f = $(dd[0]).text();

        if (f == '') {
            var fil = $(dd[0]).parent().parent();
            $(fil).remove();
        }

        //dd = $('.detallesart');
        dd = $('.numero');
        var c = UltimoRegistro; //  Number(dd.length);

        var html = '<tr>';
        html += '<td align="center">';
        html += '<span class="chkDelete"><input id="MainContent_grvDetalleArticulo_chkEliminar_' + c + '" type="checkbox" name="ctl00$MainContent$grvDetalleArticulo$ctl02$chkEliminar"></span>';
        html += '</td>';
        html += '<td align="center">';
        html += '<span id="MainContent_grvDetalleArticulo_lblNumId_' + c + '" class="numero"></span>';
        html += '</td>';
        html += '<td class="novisible" align="right">';
        html += '<span id="MainContent_grvDetalleArticulo_lblcoddetalle_' + c + '" class="detallesart">0</span>';
        html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl02$hfcodarticulo" id="MainContent_grvDetalleArticulo_hfcodarticulo_' + c + '" value="' + $(lblcodproducto_grilla).text() + '">';
        html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl02$hfPrecio" id="MainContent_grvDetalleArticulo_hfPrecio_' + c + '" value="' + precio + '">';
        html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl02$hfCantidad" id="MainContent_grvDetalleArticulo_hfCantidad_' + c + '" value="' + $(txtCantidad).val() + '">';
        html += '<div class="precOrig"><input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl02$hfPrecioOrig" id="MainContent_grvDetalleArticulo_hfPrecioOrig_' + c + '" value="' + $(hdPrecioOrig).val() + '"></div>';
        html += '</td>';
        html += '<td align="left" class="csimp" id="MainContent_grvDetalleArticulo_lblCodigoProducto_' + c + '" > ' + $(hlkCodigo).text() + '</td>';
        html += '<td align="center">';
        html += '<input name="ctl00$MainContent$grvDetalleArticulo$ctl02$txtDescripcion" type="text" value="' + $(lblProducto).text().replace("&", "&amp;") + '" id="MainContent_grvDetalleArticulo_txtDescripcion_' + c + '" class="ccsestilo" style="color: blue; font-family: Arial; font-weight: bold; width: 480px; background: rgb(255, 255, 224);">';
        html += '</td>';
        html += '<td align="center">';
        html += '<input name="ctl00$MainContent$grvDetalleArticulo$ctl02$txtCantidad" type="text" value="' + $(txtCantidad).val() + '" id="MainContent_grvDetalleArticulo_txtCantidad_' + c + '" class="ccsestilo" onblur="F_MostrarTotales(this.id,1); return false;" style="color: blue; font-family: Arial; font-weight: bold; width: 75px; text-align: center; background: rgb(255, 255, 224);">';
        html += '</td>';
        html += '<td align="left"><span id="MainContent_grvDetalleArticulo_lblUm_' + c + '" class="detallesart">' + $(lblUM).text() + '</span></td>';
        html += '<td align="center">';
        html += '<input name="ctl00$MainContent$grvDetalleArticulo$ctl02$txtPrecio" type="text" value="' + precio.toFixed(2) + '" id="MainContent_grvDetalleArticulo_txtPrecio_' + c + '" class="ccsestilo precioArt" onblur="F_MostrarTotales(this.id,2); return false;" style="color: blue; font-family: Arial; font-weight: bold; width: 75px; text-align: center; background: rgb(255, 255, 224);">';
        html += '</td><td align="right">';
        html += '<span id="MainContent_grvDetalleArticulo_lblimporte_' + c + '"  class="csimp">' + imp.toFixed(2) + '</span>';
        html += '</td>';
        html += '<td align="center">35 %</td>';
        html += '<td align="center">0 %</td>';
        html += '<td align="center">0 %</td>';
        html += '</tr>';
        UltimoRegistro++;


//        var html = '<tr>';
//        html += '<td align="center">';
//        html += '<span class="chkDelete"><input id="MainContent_grvDetalleArticulo_chkEliminar_' + c + '" type="checkbox" name="ctl00$MainContent$grvDetalleArticulo$ctl02$chkEliminar"></span>';
//        html += '</td>';
//        html += '<td align="center">';
//        html += '<span id="MainContent_grvDetalleArticulo_lblNumId_' + c + '" class="numero"></span>';
//        html += '</td>';
//        html += '<td class="novisible" align="right">';
//        html += '<span id="MainContent_grvDetalleArticulo_lblcoddetalle_' + c + '" class="detallesart">0</span>';
//        html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl02$hfcodarticulo" id="MainContent_grvDetalleArticulo_hfcodarticulo_' + c + '" value="' + $(lblcodproducto_grilla).text() + '">';
//        html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl02$hfPrecio" id="MainContent_grvDetalleArticulo_hfPrecio_' + c + '" value="' + precio + '">';
//        html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl02$hfCantidad" id="MainContent_grvDetalleArticulo_hfCantidad_' + c + '" value="' + $(txtCantidad).val() + '">';
//        html += '<div class="precOrig"><input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl02$hfPrecioOrig" id="MainContent_grvDetalleArticulo_hfPrecioOrig_' + c + '" value="' + $(hdPrecioOrig).val() + '"></div>';
//        html += '</td>';
//        html += '<td align="left">' + $(hlkCodigo).text() + '</td>';
//        html += '<td align="center">';
//        html += '<input name="ctl00$MainContent$grvDetalleArticulo$ctl02$txtDescripcion" type="text" value="' + $(lblProducto).text().replace("&", "&amp;") + '" id="MainContent_grvDetalleArticulo_txtDescripcion_' + c + '" class="ccsestilo" style="color: blue; font-family: Arial; font-weight: bold; width: 480px; background: rgb(255, 255, 224);">';
//        html += '</td>';
//        html += '<td align="center">';
//        html += '<input name="ctl00$MainContent$grvDetalleArticulo$ctl02$txtCantidad" type="text" value="' + $(txtCantidad).val() + '" id="MainContent_grvDetalleArticulo_txtCantidad_' + c + '" class="ccsestilo" onblur="F_MostrarTotales(); return false;" style="color: blue; font-family: Arial; font-weight: bold; width: 75px; text-align: center; background: rgb(255, 255, 224);">';
//        html += '</td>';
//        html += '<td align="left"><span id="MainContent_grvDetalleArticulo_lblUm_' + c + '" class="detallesart">' + $(lblUM).text() + '</span></td>';
//        html += '<td align="center">';
//        html += '<input name="ctl00$MainContent$grvDetalleArticulo$ctl02$txtPrecio" type="text" value="' + precio.toFixed(2) + '" id="MainContent_grvDetalleArticulo_txtPrecio_' + c + '" class="ccsestilo precioArt" onblur="F_MostrarTotales(); return false;" style="color: blue; font-family: Arial; font-weight: bold; width: 75px; text-align: center; background: rgb(255, 255, 224);">';
//        html += '</td><td align="right">';
//        html += '<span id="MainContent_grvDetalleArticulo_lblDescuento1_' + c + '"  class="csimp">' + lblDescuento1.text() + '</span>';
//        html += '</td><td align="right">';
//        html += '<span id="MainContent_grvDetalleArticulo_lblDescuento2_' + c + '"  class="csimp">' + lblDescuento2.text(2) + '</span>';
//        html += '</td><td align="right">';
//        html += '<span id="MainContent_grvDetalleArticulo_lblDescuento3_' + c + '"  class="csimp">' + lblDescuento3.text(2) + '</span>';
//        html += '</tr>';

        $('#MainContent_grvDetalleArticulo tr:last').after(html);
        var importe = Number($("#MainContent_txtTotal").val());
        importe += Number(imp.toFixed(2));
        $("#MainContent_txtTotal").val(importe.toFixed(2));
        numerar();
    }
    recalcularmontos();
}

function recalcularmontos() {
    var tasaigv = $('#MainContent_chkNotaVenta').is(':checked') ? 0 : parseFloat($("#MainContent_txtValIgv").val());
    tasaigv = tasaigv == undefined || isNaN(tasaigv) ? parseFloat($("#MainContent_ddlIgv option:selected").text()) : tasaigv;

    var Can = 0; var Precio = 0;
    var Total = 0;
    $('.csimp').each(function () {
        chkSi = '#' + this.id;
        Total += $(chkSi.replace('lblCodigoProducto', 'txtCantidad')).val() * $(chkSi.replace('lblCodigoProducto', 'txtPrecio')).val();
    });

    var subtotal = Total / (1 + tasaigv);
    var igv = Total - subtotal;
    $("#MainContent_txtIgv").val(igv.toFixed(2));
    $("#MainContent_txtSubTotal").val(subtotal.toFixed(2));
    $("#MainContent_txtTotal").val(Total.toFixed(2));

//    var tasaigv = $('#MainContent_chkNotaVenta').is(':checked') ? 0 : parseFloat($("#MainContent_txtValIgv").val());
//    tasaigv = tasaigv == undefined || isNaN(tasaigv) ? parseFloat($("#MainContent_ddlIgv option:selected").text()) : tasaigv;

//    var importe = Number($("#MainContent_txtTotal").val());
//    var subtotal = importe / (1 + tasaigv);
//    var igv = importe - subtotal;
//    $("#MainContent_txtIgv").val(igv.toFixed(2));
//    $("#MainContent_txtSubTotal").val(subtotal.toFixed(2));
}

function F_ActualizarPrecio(Fila) {
    try {
        var txtPrecio = '#' + Fila;

        var lblcoddetalle = txtPrecio.replace('txtPrecio', 'lblcoddetalle');
        var hfPrecio = txtPrecio.replace('txtPrecio', 'hfPrecio');
        var hfCantidad = txtPrecio.replace('txtPrecio', 'hfCantidad');
        var txtCantidad = txtPrecio.replace('txtPrecio', 'txtCantidad');

        if (parseFloat($(txtPrecio).val()) == parseFloat($(hfPrecio).val()) & parseFloat($(txtCantidad).val()) == parseFloat($(hfCantidad).val())) {
            $(txtPrecio).val(parseFloat($(txtPrecio).val()).toFixed(2));
            $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));
            return false;
        }

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_Precio: $(txtPrecio).val() / tasaigv,
            Filtro_Cantidad: $(txtCantidad).val(),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_CodDetDocumentoVenta: $(lblcoddetalle).text(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: 0
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ActualizarPrecio_Net(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_mensaje_operacion == "") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                if (result.split('~')[5] == '0') {
                    $('#MainContent_txtTotal').val('0.00');
                    $('#MainContent_txtIgv').val('0.00');
                    $('#MainContent_txtSubTotal').val('0.00');
                }
                else {
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                }

                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
            }
            else {
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
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

function F_AnularRegistro(Fila) {
    try {
        var imgID = Fila.id;
        var lblID = '#' + imgID.replace('imgAnularDocumento', 'lblID');
        var lblEstado = '#' + imgID.replace('imgAnularDocumento', 'lblEstado');
        var lblNumero = '#' + imgID.replace('imgAnularDocumento', 'lblNumeroPedido');
        var lblCliente = '#' + imgID.replace('imgAnularDocumento', 'lblCliente');

        if (!confirm("ESTA SEGURO ANULAR LA NOTA DE PEDIDO : " + $(lblNumero).text() + "\nDEL CLIENTE : " + $(lblCliente).text()))
            return false;

        var chkFecha = '0';
        var chkCliente = '0';

        if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = '1';

        if ($('#MainContent_chkCliente').is(':checked'))
            chkCliente = '1';

        var objParams = {
            Filtro_Codigo: $(lblID).val(),
            Filtro_CodEmpresa: $('#MainContent_ddlEmpresaConsulta').val(),
            Filtro_CodVenPre: $("#MainContent_ddlVendedorConsulta").val(),
            Filtro_CodEstado: $("#MainContent_ddlEstado").val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            Filtro_ChkFecha: chkFecha,
            Filtro_ChkCliente: chkCliente
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
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }


}

function F_ActualizarPrecio(Fila) {
    try {
        var txtPrecio = '#' + Fila;
        var lblcoddetalle = txtPrecio.replace('txtPrecio', 'lblcoddetalle');
        var hfPrecio = txtPrecio.replace('txtPrecio', 'hfPrecio');
        var hfCantidad = txtPrecio.replace('txtPrecio', 'hfCantidad');
        var txtCantidad = txtPrecio.replace('txtPrecio', 'txtCantidad');
        var txtDescripcion = txtPrecio.replace('txtPrecio', 'txtDescripcion');
        var lblAcuenta = txtPrecio.replace('txtPrecio', 'lblAcuenta');

        if (parseFloat($(txtPrecio).val()) == parseFloat($(hfPrecio).val()) & parseFloat($(txtCantidad).val()) == parseFloat($(hfCantidad).val())) {
            $(txtPrecio).val(parseFloat($(txtPrecio).val()).toFixed(2));
            $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));
            return false;
        }

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_Precio: $(txtPrecio).val() / tasaigv,
            Filtro_Cantidad: $(txtCantidad).val(),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_CodDetDocumentoVenta: $(lblcoddetalle).text(),
            Filtro_Descripcion: $(txtDescripcion).val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: 0,
            Filtro_Flag: 0
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ActualizarPrecio_Net(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_mensaje_operacion == "") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                if (result.split('~')[5] == '0') {
                    $('#MainContent_txtTotal').val('0.00');
                    $('#MainContent_txtIgv').val('0.00');
                    $('#MainContent_txtSubTotal').val('0.00');
                    $('#MainContent_txtAcuentaNV').val('0.00');
                }
                else {
                    $('#MainContent_txtTotal').val(parseFloat(result.split('~')[5]).toFixed(2));
                    $('#MainContent_txtIgv').val(parseFloat(result.split('~')[6]).toFixed(2));
                    $('#MainContent_txtSubTotal').val(parseFloat(result.split('~')[7]).toFixed(2));
                    $('#MainContent_txtAcuentaNV').val(parseFloat(result.split('~')[8]).toFixed(2));
                }
                if ($('#MainContent_ddlFormaPago').val() == 1)
                    $('#MainContent_txtAcuenta').val(parseFloat($('#MainContent_txtTotal').val()) - parseFloat($('#MainContent_txtAcuentaNV').val()).toFixed(2));
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
            }
            else {
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
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

function F_ElegirCotizacion(Fila) {

    try {
        var imgID = "#" + Fila.id;
        var Clave = "";
        var hfCodProf = imgID.replace('imgSelecCot', 'hdnCodProforma');

        var objParams = {
            Filtro_CodProf: $(hfCodProf).val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ObtenerCotizacion_Net(arg, function (resu) {
            var result = JSON.parse(resu);

            var str_resultado_operacion = result.int_resultado_operacion;
            var str_mensaje_operacion = result.str_mensaje_operacion;
            var objprof = result.objprof;

            MostrarEspera(false);

            if (str_mensaje_operacion == "") {
                var Cuerpo = '#MainContent_';

                $('#hfCodCtaCte').val(objprof.CodCtaCte);
                $('#hfCodEmpresa').val(objprof.CodEmpresa);
                $('#hfCodSede').val(objprof.CodSede);
                $(Cuerpo + 'txtProveedor').val(objprof.RazonSocial);
                $(Cuerpo + 'txtEmpresa').val(objprof.Empresa);
                $(Cuerpo + 'ddlMoneda').val(objprof.CodMoneda);
                $(Cuerpo + 'ddlIgv').val(objprof.CodTasa);
                $(Cuerpo + 'txtEmision').val(GetFormattedDate(objprof.FechaEmision));
                $(Cuerpo + 'txtVigencia').val(GetFormattedDate(objprof.Vencimiento));
                $(Cuerpo + 'txtAtencion').val(objprof.Atencion);
                $(Cuerpo + 'txtReferencia').val(objprof.Referencia);
                $(Cuerpo + 'txtSubTotal').val(objprof.SubTotal);
                $(Cuerpo + 'txtIgv').val(objprof.Igv);
                $(Cuerpo + 'txtTotal').val(objprof.Total);
                $(Cuerpo + 'lblTC').val(objprof.TipoCambio);

                $(Cuerpo + 'txtDesc1').val(objprof.Descuento1);
                if (objprof.Descuento1 == 0) $(Cuerpo + 'txtDesc1').prop("readonly", false);
                $(Cuerpo + 'txtDesc2').val(objprof.Descuento2);
                if (objprof.Descuento2 == 0) $(Cuerpo + 'txtDesc2').prop("readonly", false);
                $(Cuerpo + 'txtDesc3').val(objprof.Descuento3);
                if (objprof.Descuento3 == 0) $(Cuerpo + 'txtDesc3').prop("readonly", false);
                $(Cuerpo + 'txtDesc4').val(objprof.Descuento4);
                if (objprof.Descuento4 == 0) $(Cuerpo + 'txtDesc4').prop("readonly", false);

                F_Update_Division_HTML('div_grvDetalleArticulo', result.det);
                $('.ccsestilo').css('background', '#FFFFE0');

                $("#divConsultaCotizacion").dialog('close');
                numerar();
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

function F_ElegirNotaPedido(Fila) {
    try {
        var imgID = "#" + Fila.id;
        var Clave = "";
        var hfCodProf = imgID.replace('imgEditar', 'lblID');
        var hfCodEstado = imgID.replace('imgEditar', 'hdnCodEstado');
        var codEstado = $(hfCodEstado).val();
        var codnet = $(hfCodProf).val();

        if (codEstado == '5' || codEstado == '7') {
            alertify.log("No se puede editar por estar facturado.");
            return false;
        }

        var objParams = {
            Filtro_CodNotaPedido: $(hfCodProf).val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_Nuevo(false);

        F_ObtenerNotaPedido_Net(arg, function (resu) {
            var result = JSON.parse(resu);

            var str_resultado_operacion = result.int_resultado_operacion;
            var str_mensaje_operacion = result.str_mensaje_operacion;
            var objnt = result.objnt;

            MostrarEspera(false);

            if (str_mensaje_operacion == "") {
                var Cuerpo = '#MainContent_';
                $('#hfCodCtaCte').val(objnt.CodCtaCte);
                $('#hfCodEstado').val(objnt.CodEstado);
                $('#hfCodEmpresa').val(objnt.CodEmpresa);
                $('#hfCodSede').val(objnt.CodEmpresa);
                $(Cuerpo + 'txtCliente').val(objnt.RazonSocial);
                $(Cuerpo + 'txtEmpresa').val(objnt.Empresa);
                $(Cuerpo + 'ddlMoneda').val(objnt.CodMoneda);
                $(Cuerpo + 'ddlIgv').val(objnt.CodTasa);
                $(Cuerpo + 'txtEmision').val(GetFormattedDate(objnt.FechaEmision));
                $(Cuerpo + 'txtVigencia').val(GetFormattedDate(objnt.Vencimiento));
                $(Cuerpo + 'txtAtencion').val(objnt.Atencion);
                $(Cuerpo + 'txtReferencia').val(objnt.Referencia);
                $(Cuerpo + 'txtSubTotal').val(objnt.SubTotal);
                $(Cuerpo + 'txtIgv').val(objnt.Igv);
                $(Cuerpo + 'txtTotal').val(objnt.Total);
                $(Cuerpo + 'txtNroRuc').val(objnt.NroRuc);
                $(Cuerpo + 'txtDireccion').val(objnt.Direccion);
                $(Cuerpo + 'lblTC').val(objnt.TipoCambio);
                $(Cuerpo + 'txtDesc1').val(objnt.Descuento1);
                if (objnt.Descuento1 == 0) $(Cuerpo + 'txtDesc1').prop("readonly", false);
                $(Cuerpo + 'txtDesc2').val(objnt.Descuento2);
                if (objnt.Descuento2 == 0) $(Cuerpo + 'txtDesc2').prop("readonly", false);
                $(Cuerpo + 'txtDesc3').val(objnt.Descuento3);
                if (objnt.Descuento3 == 0) $(Cuerpo + 'txtDesc3').prop("readonly", false);
                $(Cuerpo + 'txtDesc4').val(objnt.Descuento4);
                if (objnt.Descuento4 == 0) $(Cuerpo + 'txtDesc4').prop("readonly", false);
                $(Cuerpo + 'ddlVendedorPreparado').val(objnt.CodVenPre);
                $(Cuerpo + 'ddlVendedorAprobado').val(objnt.CodVenApr);
                $(Cuerpo + 'ddlVendedorCerrado').val(objnt.CodVenCerr);
                $(Cuerpo + 'chkNotaVenta').prop("checked", objnt.NotaVenta);
                $(Cuerpo + 'ddlAlmacenFisico').val(objnt.CodAlmacenFisico);

                switch (objnt.CodTipoDoc) {
                    case 1:
                        $('#MainContent_chkFactura').prop('checked', true);
                        $('#MainContent_chkBoleta').prop('checked', false);
                        $('#MainContent_chkNotaVenta').prop('checked', false);
                        break;
                    case 2:
                        $('#MainContent_chkFactura').prop('checked', false);
                        $('#MainContent_chkBoleta').prop('checked', true);
                        $('#MainContent_chkNotaVenta').prop('checked', false);
                        break;
                    default:
                        $('#MainContent_chkFactura').prop('checked', false);
                        $('#MainContent_chkBoleta').prop('checked', false);
                        $('#MainContent_chkNotaVenta').prop('checked', true);
                }

                if (objnt.ValIgv == null || objnt.ValIgv == undefined) {
                    $(Cuerpo + 'txtValIgv').hide();
                    $(Cuerpo + 'ddlIgv').show();
                    $(Cuerpo + 'txtValIgv').val("");
                } else {
                    $(Cuerpo + 'txtValIgv').show();
                    $(Cuerpo + 'ddlIgv').hide();
                    $(Cuerpo + 'txtValIgv').val(objnt.ValIgv * 100);
                }

                $(Cuerpo + "ddlSerie").val($(Cuerpo + "ddlSerie option:contains(" + objnt.Serie + ")").val());
                $(Cuerpo + 'txtNumero').val(objnt.Numero);
                if ($(Cuerpo + 'txtNumero').val() == '') F_Mostrar_Correlativo(17);
                $('#hfCodigoTemporal').val(codnet);

                F_Update_Division_HTML('div_grvDetalleArticulo', result.det);
                $('.ccsestilo').css('background', '#FFFFE0');

                UltimoRegistro = 100000;
                numerar();
                //                F_MostrarTotales();
                $("#divTabs").tabs("option", "active", $("#liRegistro").index());
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

function numerar() {
    var c = 0;
    $('.numero').each(function () {
        c++;
        $(this).text(c.toString());
    });
    UltimoRegistro += c;
    $("#MainContent_lblNumRegistros").text(c);
}

function F_ElegirEmpresa(Fila) {
    MostrarEspera(true);

    var imgID = Fila.id;
    var lblCodDetalle = '#' + imgID.replace('imgSelecEmpresa', 'hfCodEmpresa');
    var lblNombre = '#' + imgID.replace('imgSelecEmpresa', 'lblRazonSocial');
    var ddlSede = '#' + imgID.replace('imgSelecEmpresa', 'ddlSede');
    var Cuerpo = '#MainContent_';
    $(Cuerpo + 'txtEmpresa').val($(lblNombre).text());
    $('#hfCodEmpresa').val($(lblCodDetalle).val());
    $('#hfCodSede').val($('#hfCodEmpresa').val());

    var arg;

    try {
        var objParams =
            {
                Filtro_Empresa: $(lblCodDetalle).val(),
                Filtro_Sede: $(ddlSede).val()
            };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_Consulta_Series_Net
            (
                arg,
                function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {          
                        $('#MainContent_ddlEmpresaConsulta').val($(lblCodDetalle).val());               
                        $('.ccsestilo').css('background', '#FFFFE0');
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

    $('#divSeleccionarEmpresa').dialog('close');
}

function GetFormattedDate(tt) {
    tt = tt.replace('/Date(', '');
    tt = tt.replace(')/', '');

    var todayTime = new Date(Number(tt));
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var mm = month.toString();
    var dd = day.toString();

    if (month < 10) mm = '0' + month;
    if (day < 10) dd = '0' + day;

    return dd + "/" + mm + "/" + year;
}

function F_CerrarNotaPedido(obj, CodEstado, Titulo, Cadena, Label) {
    var imgID = obj.id;
    if (CodEstado == 8) {
        var grvDetalle = '#' + imgID.replace(Cadena, 'grvDetalle') + ' .detallesart2';
        var lblCodigo = '';
        var Cadena2 = "Los sgtes codigos tienen importe cero";
        $(grvDetalle).each(function () {
            chkSi = '#' + this.id;
            lblCodigo = chkSi.replace('lblImporte', 'lblCodigo');
            if ($(chkSi).text() == '0.00') {
                Cadena2 = Cadena2 + '<p></p>' + $(lblCodigo).text();
            }
        });

        if (Cadena2 != "Los sgtes codigos tienen importe cero") {
            alertify.log(Cadena2);
            return false;
        }
    }

    var lblCodDetalle = '#' + imgID.replace(Cadena, 'lblID');   
    var hfTransportistaNP = '#' + imgID.replace(Cadena, 'hfTransportistaNP');
    var hfComentario = '#' + imgID.replace(Cadena, 'hfComentario');
    var hfCodUsuarioCredito = '#' + imgID.replace(Cadena, 'hfCodUsuarioCredito');
    var hfTransportistaCliente = '#' + imgID.replace(Cadena, 'hfTransportistaCliente');
    var hfCodTipoDoc = '#' + imgID.replace(Cadena, 'hfCodTipoDoc');

            if (CodEstado == 15) {
                $("#div_Preparacion").dialog({
                    resizable: false,
                    modal: true,
                    title: Titulo,
                    title_html: true,
                    height: 300,
                    width: 510,
                    autoOpen: false
                });
                $('#div_Preparacion').dialog('open');
            }
            else if (CodEstado == 5) {
                f_obtenerDatosDespacho($(lblCodDetalle).val());
                $("#MainContent_hdnCodNotaPedido").val($(lblCodDetalle).val());
                return true;
            }
            else {
                $("#div_CerrarNota").dialog({
                    resizable: false,
                    modal: true,
                    title: Titulo,
                    title_html: true,
                    height: 200,
                    width: 510,
                    autoOpen: false
                });
                $('#div_CerrarNota').dialog('open');
            }

            $("#MainContent_hdnCodNotaPedido").val($(lblCodDetalle).val());
            $("#hfCodEstadoCierre").val(CodEstado); 
            $("#MainContent_txtTransportista").val('');
            $("#MainContent_txtTransportistaNP").val($(hfTransportistaNP).val());
            $("#MainContent_txtComentario").val($(hfComentario).val());
            $("#hfCodTransportista").val(0);
            $('#MainContent_ddlPreparado').val(0);
            $('#MainContent_ddlAprobado').val(0);
            $('#MainContent_ddlUsuarioCredito').val(0);
            $('#MainContent_ddlTipoDoc').val($(hfCodTipoDoc).val());
            $("#MainContent_txtComentarioCerrado").val($("#MainContent_txtComentario").val());
            return false;
}

function f_cerrardocu() {
    var Cadena = 'Ingresar los sgtes. Datos:';

    if ($("#hfCodEstadoCierre").val() == "15") {
        if ($("#MainContent_ddlTipoDoc").val() == null | $("#MainContent_ddlTipoDoc").val() == 0) {
            Cadena = Cadena + '<p></p>' + 'EL CLIENTE QUIERE';
        }

        if ($("#MainContent_ddlPreparado").val() == null | $("#MainContent_ddlPreparado").val() == 0) {
            Cadena = Cadena + '<p></p>' + 'PREPARADO POR';
        }

        if ($("#MainContent_ddlAprobado").val() == null | $("#MainContent_ddlAprobado").val() == 0) {
            Cadena = Cadena + '<p></p>' + 'APROBADO POR';
        }

        if ($("#MainContent_ddlUsuarioCredito").val() == null | $("#MainContent_ddlAprobado").val() == 0) {
            Cadena = Cadena + '<p></p>' + 'APROBACION CREDITO';
        }

        if ($("#MainContent_txtTransportista").val() == '' | $("#hfCodTransportista").val() == '0') {
            Cadena = Cadena + '<p></p>' + 'TRANSPORTISTA ESCOGIDO';
        }
    }
    else {
        if ($("#MainContent_ddlVendedorCerrado").val() == null | $("#MainContent_ddlVendedorCerrado").val() == 0) {
            Cadena = Cadena + '<p></p>' + 'CERRADO POR';
        }
    }

    if (Cadena != 'Ingresar los sgtes. Datos:') {
        alertify.log(Cadena);
        return false;
    }

    var Contenedor = '#MainContent_';
 
    //Cerrar Nota Pedido
    try {
        var objParams = {
            Filtro_Codigo: $(Contenedor + 'hdnCodNotaPedido').val(),
            Filtro_FechaCierre: $(Contenedor + 'txtFechaCierre').val(),
            Filtro_Vendedor: $(Contenedor + 'ddlVendedorCerrado').val(),
            Filtro_CodEstado: $("#hfCodEstadoCierre").val(),
            Filtro_CodVendPreparado: $(Contenedor + 'ddlPreparado').val(),
            Filtro_CodVendAprobado: $(Contenedor + 'ddlAprobado').val(),
            Filtro_CodTransportista: $("#hfCodTransportista").val(),
            Filtro_CodUsuarioCredito: $(Contenedor + 'ddlUsuarioCredito').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_CerrarDocumento_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                alertify.log(str_mensaje_operacion);
                F_Buscar();
                $('#div_CerrarNota').dialog('close');
                $('#div_Preparacion').dialog('close');                
            }
            else {
                alertify.log(result.split('~')[2]);
            }

            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
    }
    return false;
}

function f_obtenerDatosDespacho(CodPedido) {

    $('#MainContent_txtDespachoNroGuias').val('');
    $('#MainContent_txtDespachoNroBultos').val('');
    $('#MainContent_txtDespachoChofer').val('');
    $('#MainContent_txtDespachoTransportista').val('');
    $('#MainContent_txtDespachoObservacion').val('');
    $('#MainContent_lblUsuarioTransportista').text('')
    $('#hfCodDespachoTransportista').val(0);
    $('#hfDespachoTransportista').val('');

    try {

        var objParams = {
            Filtro_CodNotaPedido: CodPedido
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_ObtenerNotaPedido_Net(arg, function (resu) {
            var result = JSON.parse(resu);

            var str_resultado_operacion = result.int_resultado_operacion;
            var str_mensaje_operacion = result.str_mensaje_operacion;
            var objnt = result.objnt;

            MostrarEspera(false);

            if (str_mensaje_operacion == "") {


                $('#MainContent_txtDespachoFecha').val(objnt.DespachoFechaStr);
                $('#MainContent_txtDespachoNroGuias').val(objnt.DespachoNroGuias);
                $('#MainContent_txtDespachoNroBultos').val(objnt.DespachoNroBultos);
                $('#MainContent_txtDespachoChofer').val(objnt.DespachoChofer);
                $('#MainContent_txtDespachoTransportista').val(objnt.DespachoTransportista);
                $('#MainContent_txtDespachoObservacion').val(objnt.DespachoObservacion);
                $('#hfCodDespachoTransportista').val(objnt.DespachoCodTransportista);
                $('#hfDespachoTransportista').val(objnt.DespachoTransportista);

                if (Number(objnt.DespachoCodUsuario) > 0)
                $('#MainContent_lblUsuarioTransportista').text('ULTIMA ACTUALIZACION:  ' + objnt.DespachoUsuario + '  -  ' + objnt.DespachoFechaRegistroStr);
            }


            $("#div_Despacho").dialog({
                resizable: false,
                modal: true,
                title: 'DESPACHO DE PEDIDO',
                title_html: true,
                height: 250,
                width: 580,
                autoOpen: false
            });
            $('#div_Despacho').dialog('open');

            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }





















return true;
}

function f_actualizarDatosDespacho() {
    var Cadena = 'Ingresar los sgtes. Datos:';

    if ($("#MainContent_txtDespachoNroGuias").val() == "") {
        Cadena = Cadena + '<p></p>' + 'NRO. DE GUIAS';
    }

    if ($("#MainContent_txtDespachoNroBultos").val() == "") {
        Cadena = Cadena + '<p></p>' + 'NRO. DE BULTOS';
    }

    if ($("#MainContent_txtDespachoChofer").val() == "") {
        Cadena = Cadena + '<p></p>' + 'CHOFER';
    }

    if ($("#MainContent_txtDespachoTransportista").val() === ""
            | $("#MainContent_txtDespachoTransportista").val() != $("#hfDespachoTransportista").val()
            | Number($("#hfCodDespachoTransportista").val()) === 0) {
        $("#MainContent_txtDespachoTransportista").val('');
        $("#hfDespachoTransportista").val('');
        $("#hfCodDespachoTransportista").val('0');
        Cadena = Cadena + '<p></p>' + 'TRANSPORTISTA';
    }

    if ($("#MainContent_txtDespachoObservacion").val() == '') {
        Cadena = Cadena + '<p></p>' + 'OBSERVACION';
    }

    if (Cadena != 'Ingresar los sgtes. Datos:') {
        alertify.log(Cadena);
        return false;
    }

    var Contenedor = '#MainContent_';


    if (confirm("ESTA SEGURO DE ACTUALIZAR LOS DATOS DE DESPACHO"))
    { }
    else {
        return false;
    }

    //Cerrar Nota Pedido
    try {
        var objParams = {
            Filtro_Codigo: $(Contenedor + 'hdnCodNotaPedido').val(),
            Filtro_DespachoFecha: $('#MainContent_txtDespachoFecha').val(),
            Filtro_DespachoChofer: $('#MainContent_txtDespachoChofer').val(),
            Filtro_DespachoNroGuias: $('#MainContent_txtDespachoNroGuias').val(),
            Filtro_DespachoNroBultos: $('#MainContent_txtDespachoNroBultos').val(),
            Filtro_DespachoObservacion: $('#MainContent_txtDespachoObservacion').val(),
            Filtro_DespachoCodTransportista: $("#hfCodDespachoTransportista").val(),
            Filtro_CodEstado: '7'
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_ActualizarDespacho_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                alertify.log(str_mensaje_operacion);
                F_Buscar();
                $('#div_Despacho').dialog('close');
            }
            else {
                alertify.log(result.split('~')[2]);
            }

            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
    }
    return false;
}

function F_VisualizarExcel() {
    if ($('#MainContent_ddlEstado').val() == "14" || $('#MainContent_ddlEstado').val() == "3") {
        alertify.log("SELECCIONE AL MENOS UNA NOTA DE PEDIDO");
        return false;
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var CodMenu = 2;
    var chkSi = '';
    var arrDetalle = new Array();
    var lblID = '';
    var i = 0;

    $('#MainContent_grvConsulta .chkDelete :checkbox').each(function () {
        chkSi = '#' + this.id;
        lblID = chkSi.replace('chkEliminar', 'lblID');

        if ($(chkSi).is(':checked')) {
            var objDetalle = {
                CodNotaPedido: $(lblID).val()
            };
            arrDetalle.push(objDetalle);
            i += 1;
        }
    });

    if (i == 0) {
        alertify.log("SELECCIONE AL MENOS UNA NOTA DE PEDIDO");
        return false;
    }

    var XmlDetalle = Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle);

    rptURL = '../Reportes/Excel.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'XmlDetalle=' + XmlDetalle + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_VisualizarExcelDespacho() {
//    if ($('#MainContent_ddlEstado').val() == "14" || $('#MainContent_ddlEstado').val() == "3") {
//        alertify.log("SELECCIONE AL MENOS UNA NOTA DE PEDIDO");
//        return false;
//    }

    var rptURL = '';
    var Params = 'width=' + (screen.width) + ', height=' + (screen.height) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var CodMenu = 3;
    var chkSi = '';
    var arrDetalle = new Array();
    var lblID = '';
    var i = 0;

    $('#MainContent_grvConsulta .chkDelete :checkbox').each(function () {
        chkSi = '#' + this.id;
        lblID = chkSi.replace('chkEliminar', 'lblID');

        if ($(chkSi).is(':checked')) {
            var objDetalle = {
                CodNotaPedido: $(lblID).val()
            };
            arrDetalle.push(objDetalle);
            i += 1;
        }
    });

    if (i == 0) {
        alertify.log("SELECCIONE AL MENOS UNA NOTA DE PEDIDO");
        return false;
    }

    var XmlDetalle = Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle);

    rptURL = '../Reportes/Excel.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'XmlDetalle=' + XmlDetalle + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_VisualizarExcelCerrados() {
    //    if ($('#MainContent_ddlEstado').val() == "14" || $('#MainContent_ddlEstado').val() == "3") {
    //        alertify.log("SELECCIONE AL MENOS UNA NOTA DE PEDIDO");
    //        return false;
    //    }

    var rptURL = '';
    var Params = 'width=' + (screen.width) + ', height=' + (screen.height) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var CodMenu = 4;
    var chkSi = '';
    var arrDetalle = new Array();
    var lblID = '';
    var i = 0;

    $('#MainContent_grvConsulta .chkDelete :checkbox').each(function () {
        chkSi = '#' + this.id;
        lblID = chkSi.replace('chkEliminar', 'lblID');

        if ($(chkSi).is(':checked')) {
            var objDetalle = {
                CodNotaPedido: $(lblID).val()
            };
            arrDetalle.push(objDetalle);
            i += 1;
        }
    });

    if (i == 0) {
        alertify.log("SELECCIONE AL MENOS UNA NOTA DE PEDIDO");
        return false;
    }

    var XmlDetalle = Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle);

    rptURL = '../Reportes/Excel.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'XmlDetalle=' + XmlDetalle + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_GeneraStickers() {
    if ($('#MainContent_ddlEstado').val() == "14" || $('#MainContent_ddlEstado').val() == "3") {
        alertify.log("SELECCIONE AL MENOS UNA NOTA DE PEDIDO");
        return false;
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width) + ', height=' + (screen.height) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var CodMenu = 19;
    var CodTipoArchivo = 6;
    var chkSi = '';
    var arrDetalle = new Array();
    var lblID = '';
    var i = 0;

    $('#MainContent_grvConsulta .chkDelete :checkbox').each(function () {
        chkSi = '#' + this.id;
        lblID = chkSi.replace('chkEliminar', 'lblID');

        if ($(chkSi).is(':checked')) {
            var objDetalle = {
                CodNotaPedido: $(lblID).val()
            };
            arrDetalle.push(objDetalle);
            i += 1;
        }
    });

    if (i == 0) {
        alertify.log("SELECCIONE AL MENOS UNA NOTA DE PEDIDO");
        return false;
    }

    var XmlDetalle = Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle);

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'XmlDetalle=' + XmlDetalle + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_ImpresionPedidos() {
    if ($('#MainContent_ddlEstado').val() == "14" || $('#MainContent_ddlEstado').val() == "3") {
        alertify.log("SELECCIONE AL MENOS UNA NOTA DE PEDIDO");
        return false;
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width) + ', height=' + (screen.height) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var CodMenu = 23;
    var CodTipoArchivo = 0;
    var chkSi = '';
    var arrDetalle = new Array();
    var lblID = '';
    var i = 0;

    $('#MainContent_grvConsulta .chkDelete :checkbox').each(function () {
        chkSi = '#' + this.id;
        lblID = chkSi.replace('chkEliminar', 'lblID');

        if ($(chkSi).is(':checked')) {
            var objDetalle = {
                CodNotaPedido: $(lblID).val()
            };
            arrDetalle.push(objDetalle);
            i += 1;
        }
    });

    if (i == 0) {
        alertify.log("SELECCIONE AL MENOS UNA NOTA DE PEDIDO");
        return false;
    }

    var XmlDetalle = Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle);

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'Impresora=' + $("#MainContent_ddlImpresoraNotaPedido").val() + '&';
    rptURL = rptURL + 'FormatoReporte=' + FormatoReporteNotaPedido + '&';
    rptURL = rptURL + 'XmlDetalle=' + XmlDetalle + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}