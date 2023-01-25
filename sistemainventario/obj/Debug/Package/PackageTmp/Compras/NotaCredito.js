var AppSession = "../Compras/NotaCredito.aspx";

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#MainContent_txtClienteConsulta').autocomplete({
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
            $('#hfCodCtaCteConsulta').val(i.item.val);
        },
        minLength: 3
    });

    $('#MainContent_txtCliente').autocomplete({
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
            $('#hfCodCtaCte').val(i.item.val);
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

    $('#divTabs').tabs();

    $('#MainContent_txtNumero').blur(function () {
        if ($('#MainContent_txtNumero').val() == "")
            return false;

        var id = '00000000' + $('#MainContent_txtNumero').val();
        $('#MainContent_txtNumero').val(id.substr(id.length - 8));
        return false;
    });

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

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (!F_ValidarGrabarDocumento())
                return false;

            if (confirm("ESTA SEGURO DE GRABAR LA NOTA DE CREDITO"))
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

    $('#MainContent_btnEliminar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (F_ValidarEliminar() == false)
                return false;

            if (confirm("Esta seguro de eliminar los productos seleccionado"))
                F_EliminarTemporal();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnGrabarEdicion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_EditarTemporal();
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnAgregarFactura').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_AgregarVariosFacturas();
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnBuscarFiltro').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_BuscarProductoFactura();
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnBuscarFactura').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_BuscarFactura();
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnFactura').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        if ($('#hfCodCtaCte').val() == '0') {
            alertify.log("Elija un PROVEEDOR.");
            return false;
        }

        $('#MainContent_grvDetalleFactura').remove();
        $('#MainContent_grvProductoFiltro').remove();
        $('#divCrtFiltroProductos').hide();

        $('#divFacturacionBusqueda').dialog('open');

        return false;
    });

    $('#MainContent_btnFacturarNotaCredito').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_FacturaNotaCredito();
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_txtEmision').on('change', function (e) {
        F_TipoCambio();
    });

    $("#MainContent_txtPrecio").blur(function () {

        if ($("#MainContent_txtPrecio") == '')
            return false;

        $("#MainContent_txtImporte").val(parseFloat($("#MainContent_txtPrecio").val() * $("#MainContent_txtCantidad").val()).toFixed(2));


        return false;

    });

    $("#MainContent_txtCantidad").blur(function () {

        if ($("#MainContent_txtCantidad") == '')
            return false;

        $("#MainContent_txtImporte").val(parseFloat($("#MainContent_txtPrecio").val() * $("#MainContent_txtCantidad").val()).toFixed(2));


        return false;

    });
    
    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtCliente').css('background', '#FFFFE0');

    $('#MainContent_txtClienteConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtSubTotal').css('background', '#FFFFE0');

    $('#MainContent_txtIgv').css('background', '#FFFFE0');

    $('#MainContent_txtTotal').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtNumero').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtCodFactura').css('background', '#FFFFE0');

    $('#MainContent_txtImporte').css('background', '#FFFFE0');

    $('#MainContent_txtPrecio').css('background', '#FFFFE0');

    $('#MainContent_txtEmpresa').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroFactura').css('background', '#FFFFE0');

    $('#MainContent_txtCodFiltro').css('background', '#FFFFE0');

    $('#MainContent_txtProFiltro').css('background', '#FFFFE0');

    $('#MainContent_txtFechaIniFact').css('background', '#FFFFE0');

    $('#MainContent_txtFechaFinFact').css('background', '#FFFFE0');

    $('#MainContent_txtUM').css('background', '#FFFFE0');

    $('#MainContent_txtCantidad').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcion').css('background', '#FFFFE0');

    $('#MainContent_txtCodigo').css('background', '#FFFFE0');

    $('#MainContent_txtSerie').css('background', '#FFFFE0');

    $('#MainContent_txtVencimiento').css('background', '#FFFFE0');

    $("#MainContent_txtNumero").ForceNumericOnly();

    $('#MainContent_txtSerie').change(function () {
        try {
            var lg = $('#MainContent_txtSerie').val();
            var Letra = $('#MainContent_txtSerie').val().charAt(0)
            if (lg != "") {
                if (Letra.toString().toUpperCase() == "F" | Letra.toString().toUpperCase() == "E")
                { $('#MainContent_txtSerie').val(Letra + ('00' + $('#MainContent_txtSerie').val().substr(1)).slice(-1 * 3)); }
                else
                { $('#MainContent_txtSerie').val(('0000' + lg).slice(-1 * 4)); }
            }
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
        return false;
    });

    $('#MainContent_txtNumero').blur(function () {
        if ($('#MainContent_txtNumero').val() == '')
            return false;
        var id = '00000000' + $('#MainContent_txtNumero').val();
        $('#MainContent_txtNumero').val(id.substr(id.length - 8));
        return false;
    });

    $('#div_SerieDetalle').bind('dialogclose', function (event) {
        F_BuscarTemporal();
        return false;
    });

    $('#MainContent_txtNumeroConsulta').blur(function () {
        var id = '0000000' + $('#MainContent_txtNumeroConsulta').val();
        $('#MainContent_txtNumeroConsulta').val(id.substr(id.length - 7));
        return false;
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

     $('.ccsestilo').css('background', '#FFFFE0');

    $('#divSeleccionarEmpresa').dialog('open');

    $('#divFacturacionBusqueda').dialog({
        resizable: false,
        modal: true,
        title: "Factura",
        title_html: true,
        height: 500,
        width: 700,
        autoOpen: false
    });
      
    F_Derecha();

    F_Controles_Inicializar();
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

$(document).on("change", "select[id $= 'MainContent_ddlFormaPago']", function () {
    F_FormaPago($("#MainContent_ddlFormaPago").val());
});

$(document).on("change", "select[id $= 'MainContent_ddlSerieConsulta']", function () {
    F_Buscar();
});

function F_FormaPago(CodFormaPago) {

    var arg;
    try {
        switch (CodFormaPago) {
            case "1":
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

            case "12":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 0));
                break;
        }


    }
    catch (mierror) {
        alertify.log("Error detectado: " + mierror);
    }

}

function VerifySessionState(result) { }

function F_Controles_Inicializar() {

    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodDoc: 3,
                Filtro_CodAlmacenFisico: 0
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
                        F_Update_Division_HTML('div_moneda', result.split('~')[2]);
                        F_Update_Division_HTML('div_TipoOperaciones', result.split('~')[4]);
                        F_Update_Division_HTML('div_igv', result.split('~')[8]);
                        F_Update_Division_HTML('div_tipodocumento', result.split('~')[10]);
                        F_Update_Division_HTML('div_formapago', result.split('~')[9]);
                        F_Update_Division_HTML('div_AlmacenFisico', result.split('~')[11]);
                        $('#MainContent_txtNumero').val(result.split('~')[6]);
                        $('#MainContent_ddlMoneda').val(1);
                        $('#MainContent_lblTC').text(result.split('~')[7]);
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoOperaciones').css('background', '#FFFFE0');                  
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoDocumento').css('background', '#FFFFE0');
                        $('#MainContent_ddlFormaPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlAlmacenFisico').css('background', '#FFFFE0');        
                        $('#MainContent_ddlFormaPago').val(1);     
                        $('#MainContent_ddlTipoOperaciones').val('6');             
                        $('.ccsestilo').css('background', '#FFFFE0');
                        if ($('#MainContent_txtEmpresa').val() != '')
                            F_ElegirEmpresa2();
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

function F_MostrarTotales() {

    var lblimporte_grilla = '';
    var chkDel = '';
    var Total = 0;
    var Igv = 0;
    var Subtotal = 0;
    $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
        chkDel = '#' + this.id;
        lblimporte_grilla = chkDel.replace('chkEliminar', 'lblimporte');
        Total += parseFloat($(lblimporte_grilla).text());
    });
    var Cuerpo = '#MainContent_'
    $(Cuerpo + 'txtTotal').val(Total.toFixed(2));
    $(Cuerpo + 'txtIgv').val((Total * parseFloat($(Cuerpo + 'ddligv').val())).toFixed(2));
    $(Cuerpo + 'txtSubTotal').val((Total / (1 + parseFloat($(Cuerpo + 'ddligv').val()))).toFixed(2));

}

function F_ValidarGrabarDocumento() {

    try {

        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p>';

        if ($(Cuerpo + 'txtCliente').val() == '' || $('#hfCodCtaCte').val() == 0)
            Cadena = Cadena + '<p></p>' + 'Razon Social';

        if ($(Cuerpo + 'txtSerie').val() == '')
            Cadena = Cadena + '<p></p>' + 'Serie';

        if ($(Cuerpo + 'txtNumero').val() == '')
            Cadena = Cadena + '<p></p>' + 'Numero';

        if ($(Cuerpo + 'txtTC').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtTC').val() == '')
            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtEmision').val() == '')
            Cadena = Cadena + '<p></p>' + 'Emision';

        if ($(Cuerpo + 'txtSubTotal').val() == '0.00')
            Cadena = Cadena + '<p></p>' + 'Ingrese Factura';

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
    try {
        var FlagGuia = '0';
        var FlagIgv = '1';
        var Contenedor = '#MainContent_';
        var Index = $('#MainContent_txtCliente').val().indexOf('-');
        var RazonSocial = $('#MainContent_txtCliente').val();

        if (Index == -1)
            $('#hfCodCtaCte').val('0');
        else
            RazonSocial = RazonSocial.substr(RazonSocial.length - (RazonSocial.length - (Index + 2)));

        if ($(Contenedor + 'chkGuia').is(':checked'))
            FlagGuia = '1';


        var objParams = {
            Filtro_CodTipoDoc: 3,
            Filtro_CodEmpresa: $(Contenedor + 'hdnCodEmpresa').val(),
            Filtro_CodSede: $(Contenedor + 'hdnCodSede').val(),
            Filtro_SerieDoc: $("#MainContent_txtSerie").val(),
            Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),

            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
            Filtro_CodCliente: $('#hfCodCtaCte').val(),
            Filtro_CodEstado: 6,
            Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),

            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val() * -1,
            Filtro_Igv: $(Contenedor + 'txtIgv').val() * -1,
            Filtro_Total: $(Contenedor + 'txtTotal').val() * -1,

            Filtro_FlagIgv: FlagIgv,
            Filtro_Cliente: RazonSocial,
            Filtro_CodTasa: $(Contenedor + 'ddlIgv').val(),

            Filtro_CodDetalle: $('#hfCodigoTemporal').val(),
            Filtro_CodTipoOperacion: 6,
            Filtro_CodTipoOperacionNC: $(Contenedor + 'ddlTipoOperaciones').val(),
            Filtro_CodFactura_Asociada: $('#hfCodDocumentoVenta').val(),
            Filtro_CodAlmacenFisico: $('#MainContent_ddlAlmacenFisico').val(),
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
                    alertify.log('Se grabo correctamente');
                    //                    if ($(Contenedor + 'ddlTipoOperaciones').val() != 3) {
                    //                        if (result.split('~')[2] != 0)
                    //                            F_ImprimirControl(result.split('~')[2]);
                    //                    }
                    F_Nuevo();
                }
                else {
                    alertify.log(str_mensaje_operacion);
                    return false;
                }

            }
            else {
                alertify.log(result.split('~')[1]);
                return false;
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

var chkeleg;
function elegirFactura(chk) {
    //    var chk = "#" + $(obj).find('input')[0].id;
    chkeleg = chk;
    var chkid = "#" + chk.id;
    var lblcodfactura = chkid.replace("chkEligirFact", "lblCodFactura");
    var eleg = $(chkid).is(":checked");
    var lblnumerofactura = chkid.replace("chkEligirFact", "lblNumero");
    $("#hfFacturaBuffer").val($(lblnumerofactura).text());

    $('.chkEligFact').each(function () {
        var id = '#' + $(this).find('input')[0].id;
        $(id).prop('checked', false);
    });

    if (eleg) {
        $("#divCrtFiltroProductos").show();
    } else {
        $("#divCrtFiltroProductos").hide();
        $('#MainContent_grvProductoFiltro').remove();
        $('#divCrtFiltroProductos').hide();
        $("#hfFacturaBuffer").val('');
    }

    $(chkid).prop('checked', eleg);
    $("#MainContent_hdnFiltroCodFactura").val($(lblcodfactura).text());

}

function F_AgregarVariosFacturas() {
    try {
        var id = '';
        var ids = '';
        var CodProducto = '';

        $('.chkEligProd').each(function () {
            id = '#' + $(this).find('input')[0].id;

            if ($(id).is(':checked')) {
                id = id.replace('chkEligirProdu', 'hdnCodDetalleFiltro');

                if (F_ValidaProductoFactura($(id.replace('hdnCodDetalleFiltro', 'lblCodProducto')).text()) == true) //busca si el articulo se repite
                    ids += ',' + $(id).val();
            }
        });

        if (ids != '') ids = ids.substring(1);
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        var objParams = {
            Filtro_NumFactura: ids,
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaCredito: $('#hfCodigoTemporal').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_FacturacionNotaCreditoVarios_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se grabo correctamente') {
                    alertify.log('Se encontro registros.');
                    $('#hfCodigoTemporal').val(result.split('~')[2]);
                    //                    $('#hfCodCtaCte').val(result.split('~')[3]);
                    //                    $('#MainContent_ddlMoneda').val(result.split('~')[4]);
                    $('#MainContent_txtSubTotal').val(parseFloat(result.split('~')[5]).toFixed(2));
                    $('#MainContent_txtIgv').val(parseFloat(result.split('~')[6]).toFixed(2));
                    $('#MainContent_txtTotal').val(parseFloat(result.split('~')[7]).toFixed(2));
                    //                    $('#MainContent_txtCliente').val(result.split('~')[8]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[9]);
                    $('#MainContent_txtCliente').prop('readonly', true);

                    //$('#MainContent_grvDetalleFactura').remove();
                    $('#MainContent_grvProductoFiltro').remove();
                    $('#divCrtFiltroProductos').hide();
                    $(chkeleg).prop('checked', false);


                    return false;
                }
                else {
                    alertify.log(str_mensaje_operacion);
                    return false;
                }
            }
            else {
                alertify.log(result.split('~')[1]);
                return false;
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

function F_ValidaProductoFactura(CodProducto) {
    var noEncontrado = true;
    var cadena = '';

    $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
        chkDel = '#' + this.id;
        lblCodigo_grilla = chkDel.replace('chkEliminar', 'lblCodigo');
        lblFactura_grilla = chkDel.replace('chkEliminar', 'lblNumDoc');
        lblProducto_grilla = chkDel.replace('chkEliminar', 'lblProducto');
                                    
        if ($(lblCodigo_grilla).text()==CodProducto & $(lblFactura_grilla).text().replace('FT : ', '') == $("#hfFacturaBuffer").val())
        {
            noEncontrado = false;
            cadena= cadena + "\n"  + $(lblProducto_grilla).text();
        }               
    });

    if (noEncontrado == false)
        alertify.log('NO SE PUEDE INCLUIR EL MISMO PRODUCTO DE LA MISMA FACTURA:  ' + cadena);

    return noEncontrado;
}

function F_BuscarFactura() {
    try {
        var Contenedor = '#MainContent_';
        var numfactura = '';
        var fechaini = '';
        var fechafin = '';

        if ($(Contenedor + 'chkNumFactura').is(':checked')) numfactura = $(Contenedor + 'txtNumeroFactura').val();

        if ($(Contenedor + 'chkFechaFactura').is(':checked')) 
        {
            fechaini = $(Contenedor + 'txtFechaIniFact').val();
            fechafin = $(Contenedor + 'txtFechaFinFact').val();
        }
        else 
        {
            fechaini = '01/01/1990';
            fechafin = '01/01/1990';
        }

        var objParams = {
            Filtro_CodEmpresa:       $(Contenedor + 'hdnCodEmpresa').val(),
            Filtro_CodSede:          $(Contenedor + 'hdnCodSede').val(),
            Filtro_CodTipoDocSust:   $(Contenedor + 'ddlTipoDocumento').val(),
            Filtro_NumeroDoc:        numfactura,
            Filtro_FechaInicio:      fechaini,
            Filtro_FechaFin:         fechafin,
            Filtro_Cliente:          $('#hfCodCtaCte').val(),
            Filtro_CodTipoDocSust:   $(Contenedor + 'ddlTipoDocumento').val(),
            Filtro_CodTipoDoc:       7,
            Filtro_CodClasificacion: 2,
            Filtro_CodTipoOperacion: 2
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_BuscarFacturas_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se encontraron registros') {
                    F_Update_Division_HTML('div_DetalleFactura', result.split('~')[2]);
                }
                else {
                    alertify.log(str_mensaje_operacion);
                    return false;
                }
            }
            else {
                alertify.log(result.split('~')[1]);
                return false;
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

function F_BuscarProductoFactura() {
    try {
        var Contenedor   = '#MainContent_';
        var numfactura   = '';
        var fechaini     = '';
        var fechafin     = '';
        var idcoddetalle = '';
        $(".coddetalleventa").each(function () {
            var xx = "#" + this.id;
            xx = xx.replace("lblCodDetalle", "hdnCodDetVenta");
            idcoddetalle = idcoddetalle + ',' + $(xx).val();
        });

        idcoddetalle = idcoddetalle.substring(1);

        var objParams = {
            Filtro_CodVenta: $(Contenedor + 'hdnFiltroCodFactura').val(),
            Filtro_Codigo: $(Contenedor + 'txtCodFiltro').val(),
            Filtro_Producto: $(Contenedor + 'txtProFiltro').val(),
            Filtro_CodDetalle: idcoddetalle
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_Buscar_ProductoFactura_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se encontraron registros') {
                    F_Update_Division_HTML('div_grvProductoFiltro', result.split('~')[2]);
                    if ($('#MainContent_ddlTipoOperaciones').val() == '2') {
                        $('.chkEligProd').each(function () {
                            id = '#' + $(this).find('input')[0].id;

                            $(id).prop('checked', true);
                            $(id).hide();

                        });
                    }
                }
                else {
                    alertify.log(str_mensaje_operacion);
                    return false;
                }
            }
            else {
                alertify.log(result.split('~')[1]);
                return false;
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

function F_NuevoEdicion() {
    var Contenedor = '#MainContent_';
    $(Contenedor + 'txtCodigo').val('');
    $(Contenedor + 'txtDescripcion').val('');
    $(Contenedor + 'txtCantidad').val('');
    $(Contenedor + 'txtUM').val('');
    $(Contenedor + 'txtImporte').val(''),
    $(Contenedor + 'txtPrecio').val('');
}

function F_Nuevo() {
    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());
    $('#hfCodDocumentoVenta').val(0);
    $('#hfCodCtaCte').val('0');
    $('#MainContent_ddlMoneda').val(1);
    $('#hfCodigoTemporal').val('0');
    $('#MainContent_txtCliente').val('');
    $('#MainContent_txtPlaca').val('');
    $('#MainContent_txtDistrito').val('');
    $('#MainContent_txtDireccion').val('');
    $('#MainContent_txtSerie').val('');
    $('#MainContent_txtSubTotal').val('0.00');
    $('#MainContent_txtIgv').val('0.00');
    $('#MainContent_txtTotal').val('0.00');
    $('#MainContent_txtDestino').val('');
    $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
    $('#MainContent_txtArticulo').val('');
    $('#MainContent_txtNroRuc').val('');
    $('#MainContent_txtCliente').prop('readonly', false);
    $('#MainContent_txtCliente').focus();

    try {
        var objParams = {
            Filtro_CodDoc: 3
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
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[3]);
                if (UnaEmpresa == 0)
                       $('#divSeleccionarEmpresa').dialog('open');                 
                   $('.ccsestilo').css('background', '#FFFFE0');
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

function F_Buscar() {
    try {
        var chkNumero = '0';
        var chkFecha = '0';
        var chkCliente = '0';

        if ($('#MainContent_chkNumero').is(':checked'))
            chkNumero = '1';

        if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = '1';

        if ($('#MainContent_chkCliente').is(':checked'))
            chkCliente = '1';

        var objParams = {
            Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Desde:  $('#MainContent_txtDesde').val(),
            Filtro_Hasta:  $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte:       $('#hfCodCtaCteConsulta').val(),
            Filtro_CodTipoDoc:      0,
            Filtro_CodTipoDocSust:   3,
            Filtro_CodTipoOperacion: 6,
            Filtro_CodClasificacion: 2,
            Filtro_ChkNumero: chkNumero,
            Filtro_ChkFecha: chkFecha,
            Filtro_ChkCliente: chkCliente,
            Filtro_CodSede: $('#MainContent_hdnCodSede').val(),
            Filtro_CodEmpresa: $('#MainContent_hdnCodEmpresa').val()
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

function F_AnularRegistro(Fila) {
    try {
        var imgID = Fila.id;
        var lblCodigo = '#' + imgID.replace('imgAnularDocumento', 'lblcodigo');
        var lblCodigo_Factura = '#' + imgID.replace('imgAnularDocumento', 'hfcodfactura');
        var lblnumero_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblnumero');
        var lblcliente_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblcliente');

        if (confirm("Esta seguro de anular la cobranza de la factura : " + "\n" + $(lblnumero_grilla).text() + " del cliente " + $(lblcliente_grilla).text()) == false)
            return false;

        var chkNumero = '0';
        var chkFecha = '0';
        var chkCliente = '0';
        var chkSerie = '0';

        if ($('#MainContent_chkNumero').is(':checked'))
            chkNumero = '1';

        if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = '1';

        if ($('#MainContent_chkCliente').is(':checked'))
            chkCliente = '1';

        if ($('#MainContent_chkSerie').is(':checked'))
            chkSerie = '1';

        var objParams = {
            Filtro_CodCobranza: $(lblCodigo).text(),
            Filtro_CodDocumentoVenta: $(lblCodigo_Factura).val(),
            Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            Filtro_ChkNumero: chkNumero,
            Filtro_ChkFecha: chkFecha,
            Filtro_ChkCliente: chkCliente,
            Filtro_ChkSerie: chkSerie
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_AnularRegistro_Net(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

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

function getContentTab() {
    $('#MainContent_txtDesde').val(Date_AddDays($('#MainContent_txtHasta').val(), -7));
    $('#MainContent_chkRango').prop('checked', true);
    F_Buscar();
    return false;
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

            if (str_resultado_operacion == "1")
                $('#MainContent_lblTC').text(result.split('~')[2]);
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

function F_FacturaNotaCredito() {
    var Contenedor = '#MainContent_';
    var Mensaje = "Ingresar los sgtes. Datos: <br> <p></p>";

    if ($(Contenedor + 'txtNumFactura').val() == "")
        Mensaje = Mensaje + "\n" + "Numero Factura";

    if (Mensaje != "Ingresar los sgtes. Datos: <br> <p></p>") {
        alertify.log(Mensaje);
        return false;
    }

    $(Contenedor + 'txtNumFactura').val($(Contenedor + 'txtNumFactura').val().trim())

    var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

    try {
        var objParams = {
            Filtro_CodEmpresa: $(Contenedor + 'hdnCodEmpresa').val(),
            Filtro_CodSede: $(Contenedor + 'hdnCodSede').val(),
            Filtro_NumFactura: $(Contenedor + 'txtNumFactura').val(),
            Filtro_CodTipoDoc: $(Contenedor + 'ddlTipoDocumento').val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: '0',
            Filtro_CodNotaCredito: Number($('#hfCodigoTemporal').val()),
            Filtro_CodCliente: Number($('#hfCodCtaCte').val())
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_FacturacionNotaCredito_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_mensaje_operacion == "") {
                $('#hfCodigoTemporal').val(result.split('~')[2]);
                $('#hfCodCtaCte').val(result.split('~')[3]);
                $('#MainContent_ddlMoneda').val(result.split('~')[4]);
                $('#MainContent_txtSubTotal').val(parseFloat(result.split('~')[5]).toFixed(2));
                $('#MainContent_txtIgv').val(parseFloat(result.split('~')[6]).toFixed(2));
                $('#MainContent_txtTotal').val(parseFloat(result.split('~')[7]).toFixed(2));
                $('#MainContent_txtCliente').val(result.split('~')[8]);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[9]);
                $('#hfCodDocumentoVenta').val(result.split('~')[10]);
                $('#MainContent_lblTC').text(result.split('~')[7]);
                if ($(Contenedor + 'ddlTipoDocumento').val() == 2)
                    $('#MainContent_txtCliente').prop('readonly', false);
                else
                    $('#MainContent_txtCliente').prop('readonly', true);
                $('#div_Factura').dialog('close');
                return false;
            }
            else {
                alertify.log(str_mensaje_operacion);
                return false;
            }
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_EliminarTemporal() {

    try {
        var chkSi = '';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla = '';


        $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblcoddetalle_grilla = chkSi.replace('chkEliminar', 'lblCodDetalle');

            if ($(chkSi).is(':checked')) {
                var objDetalle = {

                    CodDetalle: $(lblcoddetalle_grilla).text()
                };

                arrDetalle.push(objDetalle);
            }
        });


        var Contenedor = '#MainContent_';
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        var objParams = {
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
            Filtro_TasaIgv: tasaigv,
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_EliminarTemporal_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
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
                if (result.split('~')[2] == 'Se han eliminado los productos correctamente.')
                    alertify.log('Se han eliminado los productos correctamente.');
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

function F_ValidarEliminar() {

    try {
        var Contenedor = '#MainContent_';

        if ($(Contenedor + 'ddlTipoOperaciones').val() == 2) {
            alertify.log("No se puede eliminar productos, si la operacion es anulacion");
            return false;
        }

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

function F_EditarRegistro(Fila) {

    try {
        var Contenedor = '#MainContent_';

        if ($(Contenedor + 'ddlTipoOperaciones').val() == 2)
            return false;

        $("#div_Mantenimiento").dialog({
            resizable: false,
            modal: true,
            title: "Edicion Registro",
            title_html: true,
            height: 200,
            width: 450,
            autoOpen: false
        });

        F_NuevoEdicion();


        var imgID = Fila.id;

        var lblCodigo = '#' + imgID.replace('imgEditarRegistro', 'lblCodigo');
        var lblProducto = '#' + imgID.replace('imgEditarRegistro', 'lblProducto');
        var lblCantidad = '#' + imgID.replace('imgEditarRegistro', 'lblCantidad');
        var lblUM = '#' + imgID.replace('imgEditarRegistro', 'lblUM');
        var lblPrecio = '#' + imgID.replace('imgEditarRegistro', 'lblPrecio');
        var lblImporte = '#' + imgID.replace('imgEditarRegistro', 'lblImporte');
        var lblcoddetalle = '#' + imgID.replace('imgEditarRegistro', 'lblCodDetalle');

        $(Contenedor + 'txtCodigo').val($(lblCodigo).text());
        $(Contenedor + 'txtDescripcion').val($(lblProducto).text());
        $(Contenedor + 'txtCantidad').val($(lblCantidad).text());
        $(Contenedor + 'txtUM').val($(lblUM).text());
        $(Contenedor + 'txtPrecio').val($(lblPrecio).text());
        $(Contenedor + 'txtImporte').val($(lblImporte).text());
        $('#hfCodDetalle').val($(lblcoddetalle).text());

       if ($(Contenedor + 'ddlTipoOperaciones').val() == 6) {
            $(Contenedor + 'txtPrecio').prop('readonly', true);
            $(Contenedor + 'txtCantidad').prop('readonly', false);
        }
        else if ($(Contenedor + 'ddlTipoOperaciones').val() == 7) {
            $(Contenedor + 'txtPrecio').prop('readonly', false);
            $(Contenedor + 'txtCantidad').prop('readonly', true);
        }
        else if ($(Contenedor + 'ddlTipoOperaciones').val() == 3) {
            $(Contenedor + 'txtPrecio').prop('readonly', false);
            $(Contenedor + 'txtCantidad').prop('readonly', true);        
        }
        else {
            $(Contenedor + 'txtPrecio').prop('readonly', true);
            $(Contenedor + 'txtCantidad').prop('readonly', true);
        }
        $('#div_Mantenimiento').dialog('open');

        return false;


    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function F_EditarTemporal() {

    try {
        var chkSi = '';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla = '';

        var Contenedor = '#MainContent_';

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_Cantidad: $(Contenedor + 'txtCantidad').val(),
            Filtro_Precio: $(Contenedor + 'txtPrecio').val() / tasaigv,
            Filtro_CodDetDocumentoVenta: $('#hfCodDetalle').val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_EditarTemporal_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                if (result.split('~')[5] == '0') {
                    $('#MainContent_txtTotal').val('0.00');
                    $('#MainContent_txtIgv').val('0.00');
                    $('#MainContent_txtSubTotal').val('0.00');
                }
                else {

                    $('#MainContent_txtSubTotal').val(parseFloat(result.split('~')[7]).toFixed(2));
                    $('#MainContent_txtIgv').val(parseFloat(result.split('~')[6]).toFixed(2));
                    $('#MainContent_txtTotal').val(parseFloat(result.split('~')[5]).toFixed(2))
                }

                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('#div_Mantenimiento').dialog('close');
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

function F_VerSeries(HlkControlID) {

    var CodDetalle = '';

    CodDetalle = $('#' + HlkControlID).text();

    try {
        var objParams = {
            Filtro_CodDetalle: CodDetalle
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_VerSeries_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {

                F_Update_Division_HTML('div_GrillaSerieDetalle', result.split('~')[2]);
                if (str_mensaje_operacion != "") {
                    alertify.log(str_mensaje_operacion);
                }
                else {

                    $('#div_SerieDetalle').dialog({
                        resizable: false,
                        modal: true,
                        title: "Series",
                        title_html: true,
                        height: 320,
                        width: 400,
                        autoOpen: false
                    });

                    $('#div_SerieDetalle').dialog('open');
                }

                return false;
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

function F_EliminarSerie(Fila) {
    try {
        var imgID = Fila.id;
        var lblID = '#' + imgID.replace('imgEliminar', 'lblID');
        var hfCodDetDocumentoVenta = '#' + imgID.replace('imgEliminar', 'hfCodDetDocumentoVenta');
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_CodTemporalSerializacionDet: $(lblID).text(),
            Filtro_CodDetDocumentoVenta: $(hfCodDetDocumentoVenta).val(),
            Filtro_CodDetalle: $(hfCodDetDocumentoVenta).val()

        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_EliminarSerie_Net(arg, function (result) {
            MostrarEspera(false);
            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                $('#hfSerie').val(1);
                F_Update_Division_HTML('div_GrillaSerieDetalle', result.split('~')[3]);
                return false;
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

function F_BuscarTemporal() {

    try {
        if ($('#hfSerie').val() == 0)
            return false;

        var Contenedor = '#MainContent_';
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        var objParams = {
            Filtro_TasaIgv: tasaigv,
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_NotaPedido: 0
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_BuscarTemporal_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                $('#MainContent_txtTotal').val(result.split('~')[5]);
                $('#MainContent_txtIgv').val(result.split('~')[6]);
                $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                F_Update_Division_HTML('div_GrillaSerieDetalle', result.split('~')[8]);
                $('#hfSerie').val(0);
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

function F_Mostrar_Correlativo(CodDoc) {

    var arg;

    try {
        var SerieDoc = '';

        if (CodDoc == 3)
            SerieDoc = $("#MainContent_ddlSerie option:selected").text();
        else
            SerieDoc = $("#MainContent_ddlSerieGuia option:selected").text();

        var objParams = {

            Filtro_CodDoc: CodDoc,
            Filtro_SerieDoc: SerieDoc
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
                        if (CodDoc == 3)
                            $('#MainContent_txtNumero').val(result.split('~')[2]);
                        else
                            $('#MainContent_txtNumeroGuia').val(result.split('~')[2]);
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

function F_EliminarRegistro(Fila) {
    try {
        var imgID = Fila.id;
        var lblCodigo = '#' + imgID.replace('imgEliminarDocumento', 'lblCodigo');
        var lblEstado = '#' + imgID.replace('imgEliminarDocumento', 'lblEstado');
        var lblNumero = '#' + imgID.replace('imgEliminarDocumento', 'lblNumero');
        var lblCliente = '#' + imgID.replace('imgEliminarDocumento', 'lblCliente');

        if ($(lblEstado).text() != "DEUDA") {
            alertify.log("LA NOTA DE CREDITO SE ENCUENTRA CANCELADA; PRIMERO ELIMINE EL PAGO Y LUEGO ELIMINE LA NOTA DE CREDITO");
            return false;
        }

        if (!confirm("ESTA SEGURO DE ELIMINAR LA NOTA DE CREDITO : " + $(lblNumero).text() + "\nDEL PROVEEDOR : " + $(lblCliente).text()))
            return false;

        var chkNumero = '0';
        var chkFecha = '0';
        var chkCliente = '0';

        if ($('#MainContent_chkNumero').is(':checked'))
            chkNumero = '1';

        if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = '1';

        if ($('#MainContent_chkCliente').is(':checked'))
            chkCliente = '1';

        var objParams = {
            Filtro_Codigo: $(lblCodigo).text(),        
            Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Desde:  $('#MainContent_txtDesde').val(),
            Filtro_Hasta:  $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte:       $('#hfCodCtaCteConsulta').val(),
            Filtro_CodTipoDoc:      0,
            Filtro_CodTipoDocSust:   3,
            Filtro_CodTipoOperacion: 6,
            Filtro_CodClasificacion: 2,
            Filtro_ChkNumero: chkNumero,
            Filtro_ChkFecha: chkFecha,
            Filtro_ChkCliente: chkCliente,
            Filtro_CodSede: $('#MainContent_hdnCodSede').val(),
            Filtro_CodEmpresa: $('#MainContent_hdnCodEmpresa').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_EliminarRegistro_Net(arg, function (result) {

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

function F_AnularRegistro(Fila) {
    try {
        var imgID = Fila.id;
        var lblCodigo = '#' + imgID.replace('imgAnularDocumento', 'lblCodigo');
        var lblEstado = '#' + imgID.replace('imgAnularDocumento', 'lblEstado');
        var lblNumero = '#' + imgID.replace('imgAnularDocumento', 'lblNumero');
        var lblCliente = '#' + imgID.replace('imgAnularDocumento', 'lblCliente');

        if ($(lblEstado).text() == "ANULADO(A)") {
            alertify.log("Este documento se encuentra anulado");
            return false;
        }

        if ($(lblEstado).text() == "CANCELADO") {
            alertify.log("Este documento se encuentra cancelado; primero elimine la cobranza y luego anule la nota de credito");
            return false;
        }

        if (confirm("Esta seguro de anular la NOTA DE CREDITO : " + $(lblNumero).text() + "\n" + "Del Cliente : " + $(lblCliente).text()) == false)
            return false;


        var chkNumero = '0';
        var chkFecha = '0';
        var chkCliente = '0';

        if ($('#MainContent_chkNumero').is(':checked'))
            chkNumero = '1';

        if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = '1';

        if ($('#MainContent_chkCliente').is(':checked'))
            chkCliente = '1';

        var objParams = {
            Filtro_Codigo: $(lblCodigo).text(),
            Filtro_Serie: $("#MainContent_ddlSerie option:selected").text(),
            Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            Filtro_CodTipoDoc: '3',
            Filtro_ChkNumero: chkNumero,
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

function F_ImprimirControl(Codigo) {

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '209';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'CodControlInternoAlmacenCab=' + Codigo + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_ElegirEmpresa(Fila) {
    MostrarEspera(true);

    var imgID = Fila.id;
    var lblCodDetalle = '#' + imgID.replace('imgSelecEmpresa', 'hfCodEmpresa');
    var lblNombre = '#' + imgID.replace('imgSelecEmpresa', 'lblRazonSocial');
    var ddlSede = '#' + imgID.replace('imgSelecEmpresa', 'ddlSede');

    var Cuerpo = '#MainContent_';

    $(Cuerpo + 'txtEmpresa').val($(lblNombre).text());

    var codEmp = $(lblCodDetalle).val();
    $(Cuerpo + 'hdnCodEmpresa').val(codEmp);

    var codSed = $(ddlSede).val();
    $(Cuerpo + 'hdnCodSede').val(codSed);

    var arg;

    try {
        var objParams =
            {
                Filtro_Empresa: codEmp,
                Filtro_Sede: codSed
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
                        F_Update_Division_HTML('div_serie', result.split('~')[2]);
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[3]);
                        F_Update_Division_HTML('dv_ddlSerieFactura', result.split('~')[4]);
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieFactura').css('background', '#FFFFE0');
                        F_Mostrar_Correlativo(3);
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

var UnaEmpresa = 0;
function F_ElegirEmpresa2() {
    UnaEmpresa = 1;
    MostrarEspera(true);

    var Cuerpo = '#MainContent_';

    $(Cuerpo + 'hdnCodSede').val($(Cuerpo + 'hdnCodEmpresa').val());

    var codEmp = $(Cuerpo + 'hdnCodEmpresa').val();
    var codSed = $(Cuerpo + 'hdnCodSede').val();

    var arg;

    try {
        var objParams =
            {
                Filtro_Empresa: codEmp,
                Filtro_Sede: codSed
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
                        F_Update_Division_HTML('div_serie', result.split('~')[2]);
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[3]);
                        F_Update_Division_HTML('dv_ddlSerieFactura', result.split('~')[4]);
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieFactura').css('background', '#FFFFE0');
                        F_Mostrar_Correlativo(3);
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

function cambioTipo() {


    try {

        var objParams =
            {
                Filtro_Codigo: $('#hfCodigoTemporal').val()
            };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_EliminarDetalles_Net
            (
                arg,
                function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        $("#MainContent_grvDetalleArticulo").remove();
                        $("#MainContent_txtSubTotal").val('0.00');
                        $("#MainContent_txtIgv").val('0.00');
                        $("#MainContent_txtTotal").val('0.00');
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