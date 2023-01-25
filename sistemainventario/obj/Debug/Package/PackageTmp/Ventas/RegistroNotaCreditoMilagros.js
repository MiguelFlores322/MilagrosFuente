var AppSession = "../Ventas/RegistroNotaCreditoMilagros.aspx";

var CodigoMenu = 1000;
var CodigoInterno = 5;
var P_UNIDADES_ENTEROS;

var Impresora = "EPSON LX-810";
var ImpresoraTickets = 'TICKETERA';

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#MainContent_txtCliente').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'0'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Direccion: item.split(',')[2],
                            DireccionEnvio: item.split(',')[3],
                            Distrito: item.split(',')[4],
                            CodDepartamento: item.split(',')[5],
                            CodProvincia: item.split(',')[6],
                            CodDistrito: item.split(',')[7],
                            NroRuc: item.split(',')[8],
                            Cliente: item.split(',')[9]
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
            $('#MainContent_txtNroRuc').val(i.item.NroRuc);

            //            $('#MainContent_txtDireccion').val('');
            //            $('#MainContent_txtDistrito').val(i.item.Distrito);
            //            $('#hfCodDireccion').val('0');
            //            $('#hfCodDepartamento').val(i.item.CodDepartamento);
            //            $('#hfCodProvincia').val(i.item.CodProvincia);
            //            $('#hfCodDistrito').val(i.item.CodDistrito);

            //            $('#MainContent_txtDireccion').focus();
            //            $('#MainContent_txtDestino').val(i.item.DireccionEnvio);
            //            F_BuscarDireccionPorDefecto();
        },
        minLength: 3
    });

    $('#MainContent_txtClienteConsulta').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'0'}",
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

    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        maxDate: '0'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());

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

    $('#MainContent_btnDescargarCDR').click(function () {
        try {
            F_DescargarArchivosPDF();
            F_DescargarArchivosXML();
            F_DescargarArchivosCDR();
        }
        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

        return false;

    });

    $('#MainContent_btnBuscarConsulta').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
        try {
            F_Buscar();
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnVerPDF').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_VerPDF();
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
        if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Insertar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
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
        if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Eliminar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
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

    $('#MainContent_btnGrabarEdicion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        if (!F_ValidarEdicionItem()) return false;
        try {
            F_EditarTemporal();
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnFactura').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        //if (F_PermisoOpcion(CodigoMenu, 4000601, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
        $('#div_Factura').dialog({
            resizable: false,
            modal: true,
            title: "Factura",
            title_html: true,
            height: 80,
            width: 400,
            autoOpen: false
        });
        var Contenedor = '#MainContent_';
        $(Contenedor + 'txtCodFactura').val('');
        $('#div_Factura').dialog('open');

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

    $('#MainContent_txtAcuenta').blur(function () {
        if ($('#MainContent_txtAcuenta').val() == '') {
            $('#MainContent_txtAcuenta').val('0.00');
            return false;
        }
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

    $(document).on("change", "select[id $= 'MainContent_ddlTipoOperaciones']", function () {
        F_FacturaNotaCredito();
    });

    $(document).on("change", "select[id $= 'MainContent_ddlTipoDocumento']", function () {
        F_Serie();
    });

    $(document).on("change", "select[id $= 'MainContent_ddlSerie']", function () {
        F_Mostrar_Correlativo(3);
        F_CambioSerie();
    });

    F_Controles_Inicializar();

    $('#MainContent_txtNumeroRelacionado').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtCliente').css('background', '#FFFFE0');

    $('#MainContent_txtClienteConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtSubTotal').css('background', '#FFFFE0');

    $('#MainContent_txtIgv').css('background', '#FFFFE0');

    $('#MainContent_txtTotal').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtAnexo').css('background', '#FFFFE0');


    $('#MainContent_txtNumero').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtCodFactura').css('background', '#FFFFE0');

    $('#MainContent_txtImporte').css('background', '#FFFFE0');

    $('#MainContent_txtPrecio').css('background', '#FFFFE0');

    $('#MainContent_txtUM').css('background', '#FFFFE0');

    $('#MainContent_txtCantidad').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcion').css('background', '#FFFFE0');

    $('#MainContent_txtCodigo').css('background', '#FFFFE0');

    $('#MainContent_txtCodigo').css('background', '#FFFFE0');

    $('#MainContent_txtAcuenta').css('background', '#FFFFE0');

    $('#MainContent_txtAcuentaNV').css('background', '#FFFFE0');

    $('#MainContent_txtVencimiento').css('background', '#FFFFE0');

    $('#MainContent_txtObservacion').css('background', '#FFFFE0');

    $('#MainContent_txtFacturaCDR').css('background', '#FFFFE0');

    $('#MainContent_txtArchivoCDR').css('background', '#FFFFE0');
    $('#MainContent_txtObservacionAnulacion').css('background', '#FFFFE0');

    $("#MainContent_txtNumero").ForceNumericOnly();

    $('#MainContent_btnAnular').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if ($.trim($('#MainContent_txtObservacionAnulacion').val()) == '') {
                alertify.log("INGRESAR LA OBSERVACION");
                return false;
            }
            F_AnularRegistro();
            return false;
        }
        catch (e) {
            //            toastr.warning("Error Detectado: " + e);
        }
    });

    F_Derecha();

    $('#MainContent_txtNumero').blur(function () {
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

$(document).on("change", "select[id $= 'MainContent_ddlFormaPago']", function () {
    F_FormaPago($("#MainContent_ddlFormaPago").val());

    if ($("#MainContent_ddlFormaPago").val() == 1) {
        $('#MainContent_txtAcuenta').prop('readonly', true);
        $('#MainContent_txtAcuenta').val($('#MainContent_txtTotal').val() - $('#MainContent_txtAcuentaNV').val());
    }
    else {
        $('#MainContent_txtAcuenta').prop('readonly', false);
        $('#MainContent_txtAcuenta').val('0.00');
    }
});

$(document).on("change", "select[id $= 'MainContent_ddlSerie']", function () {
    F_Mostrar_Correlativo(3);
});

$(document).on("change", "select[id $= 'MainContent_ddlEmpresa']", function () {
    F_CambioSerie_TipoDoc();
    F_FacturaNotaCredito();
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

function F_Controles_Inicializar() {

    if (P_UNIDADES_ENTEROS == "1")
        $('#MainContent_txtCantidad').ForceNumericOnly();

    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodDoc: 3,
                Filtro_CodTipoDoc2: 1,
                Filtro_CodCargo: 6,
                Filtro_CodEstado: 1,
                Filtro_CodEmpresa: 1
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
                        F_Update_Division_HTML('div_serie', result.split('~')[3]);
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[5]);
                        F_Update_Division_HTML('div_igv', result.split('~')[8]);
                        F_Update_Division_HTML('div_tipodocumento', result.split('~')[10]);
                        F_Update_Division_HTML('div_formapago', result.split('~')[9]);
                        F_Update_Division_HTML('div_CajaFisica', result.split('~')[11]);
                        F_Update_Division_HTML('div_EmpleadoConsulta', result.split('~')[13]);
                       // F_Update_Division_HTML('div_Empresa', result.split('~')[14]);
//                        F_Update_Division_HTML('div_EmpresaConsulta', result.split('~')[15]);
                        $('#hfCodEmpresa').val(result.split('~')[16]);
                        CodCajaFisica = result.split('~')[12];
                        $('#MainContent_txtNumero').val(result.split('~')[6]);
                        $('#MainContent_ddlMoneda').val('1');
                        $('#MainContent_lblTC').text(result.split('~')[7]);
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoOperaciones').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoDocumento').css('background', '#FFFFE0');
                        $('#MainContent_ddlFormaPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlFormaPago').val(1);
                        $('#MainContent_ddlCajaFisica').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpleadoConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresa').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresaConsulta').css('background', '#FFFFE0');
                        $('#MainContent_chkImpresion').prop('checked', true);
                        $('.ccsestilo').css('background', '#FFFFE0');
                        $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblImporte"));
                        F_Serie();
                        //                        F_CambioSerie_TipoDoc_Consulta();
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
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtCliente').val() == '' || $('#hfCodCtaCte').val() == 0)
            Cadena = Cadena + '<p></p>' + 'Razon Social';

        if ($(Cuerpo + 'lblTC').text() == '0' | $(Cuerpo + 'lblTC').text() == '')
            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtEmision').val() == '')
            Cadena = Cadena + '<p></p>' + 'Emision';

        if ($(Cuerpo + 'txtSubTotal').val() == '0.00')
            Cadena = Cadena + '<p></p>' + 'Ingrese Factura';

        if ($(Cuerpo + 'ddlCajaFisica').val() == null)
            Cadena = Cadena + '<p></p>' + 'Caja Fisica';

        if ($(Cuerpo + 'txtObservacion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Observacion';

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
        var FlagGuia = 0;
        var FlagIgv = 1;
        var Acuenta = 0;
        var Contenedor = '#MainContent_';
        var RazonSocial = $('#MainContent_txtCliente').val();

        if ($('#hfCodCtaCte').val() != 0) {
            var Index = $('#MainContent_txtCliente').val().indexOf('-');
            RazonSocial = RazonSocial.substr(RazonSocial.length - (RazonSocial.length - (Index + 2)));
        }

        //        if ($('#MainContent_ddlTipoDocumento').val() == 1) {
        //            $('#MainContent_ddlSerie').val('70');
        //            if ($('#MainContent_ddlSerie').val() == null) $('#MainContent_ddlSerie').val('70');
        //        }
        //        if ($('#MainContent_ddlTipoDocumento').val() == 2) {
        //            $('#MainContent_ddlSerie').val('70');
        //            if ($('#MainContent_ddlSerie').val() == null) $('#MainContent_ddlSerie').val('70');
        //        }
        if ($('#MainContent_ddlTipoDocumento').val() == 16) {
            if ($("#MainContent_ddlSerie option:selected").text() == '001') {
                alertify.log('las NC para Notas de Venta no pueden ser serie 001');
                return false;
            };
            if ($("#MainContent_ddlSerie option:selected").text() == 'F001') {
                alertify.log('las NC para Notas de Venta no pueden ser serie F001');
                return false;
            };
            if ($("#MainContent_ddlSerie option:selected").text() == 'B001') {
                alertify.log('las NC para Notas de Venta no pueden ser serie B001');
                return false;
            };
        }

        var objParams = {
            Filtro_CodTipoDoc: 3,
            Filtro_SerieDoc: $("#MainContent_ddlSerie option:selected").text(),
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
            Filtro_TasaIgv: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
            Filtro_CodDetalle: $('#hfCodigoTemporal').val(),
            Filtro_CodTipoOperacion: 5,
            Filtro_CodTipoOperacionNC: $(Contenedor + 'ddlTipoOperaciones').val(),
            Filtro_CodFactura_Asociada: $('#hfCodDocumentoVenta').val(),
            Filtro_Acuenta: $(Contenedor + 'txtAcuenta').val() * -1,
            Filtro_CodCajaFisica: $(Contenedor + 'ddlCajaFisica').val(),
            Filtro_Observacion: $('#MainContent_txtObservacion').val(),
            Filtro_CodEmpresa: $('#MainContent_ddlEmpresa').val()
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
                    if ($('#MainContent_chkImpresion').is(':checked')) {
                        var p1 = ''; var ti = 'IMP';
                        F_ImprimirDocumento(result.split('~')[2], '', p1, ti, 3);
                    }
                    alertify.log('SE GRABO CORRECTAMENTE');
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

function F_NuevoEdicion() {
    var Contenedor = '#MainContent_';
    $(Contenedor + 'txtCodigo').val('');
    $(Contenedor + 'txtDescripcion').val('');
    $(Contenedor + 'txtCantidad').val('');
    $(Contenedor + 'txtUM').val('');
    $(Contenedor + 'txtImporte').val(''),
    $(Contenedor + 'txtPrecio').val('');
    $('#MainContent_ddlCajaFisica').val(CodCajaFisica);
}

function F_Nuevo() {
    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());
    $('#hfCodDocumentoVenta').val(0);
    $('#hfCodCtaCte').val('0');
    $('#MainContent_ddlMoneda').val(1);
    $('#MainContent_txtAcuenta').val('0.00');
    $('#MainContent_txtAcuentaNV').val('0.00');
    $('#hfCodigoTemporal').val('0');
    $('#MainContent_txtCliente').val('');
    $('#MainContent_txtPlaca').val('');
    $('#MainContent_txtDistrito').val('');
    $('#MainContent_txtDireccion').val('');
    $('#MainContent_txtSubTotal').val('0.00');
    $('#MainContent_txtIgv').val('0.00');
    $('#MainContent_txtTotal').val('0.00');
    $('#MainContent_txtObservacion').val('');
    $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
    $('#MainContent_txtArticulo').val('');
    $('#MainContent_txtNroRuc').val('');
    $('#MainContent_txtNumeroRelacionado').val('');
    $('#MainContent_txtCliente').prop('readonly', true);
    $('#MainContent_txtCliente').focus();
    $('#MainContent_chkSinIgvMaestro').prop('checked', false);
    $('#MainContent_chkConIgvMaestro').prop('checked', false);
    $('#MainContent_chkImpresion').prop('checked', true);
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
                $('#MainContent_txtNumero').val(result.split('~')[2]);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[3]);
                $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblImporte"));
                $('.ccsestilo').css('background', '#FFFFE0');
                F_Mostrar_Correlativo(3);
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
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
    try {
        var chkNumero = '0';
        var chkFecha = '0';
        var chkCliente = '0';
        var chkAnexo = '0';

        if ($('#MainContent_chkNumero').is(':checked'))
            chkNumero = '1';

        if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = '1';

        if ($('#MainContent_chkCliente').is(':checked'))
            chkCliente = '1';

        if ($('#MainContent_chkAnexo').is(':checked'))
            chkAnexo = '1';

        var objParams = {
            Filtro_Serie: $("#MainContent_ddlSerieConsulta option:selected").text(),
            Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Anexo: $('#MainContent_txtAnexo').val(),
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            Filtro_CodTipoDoc: '3',
            Filtro_ChkNumero: chkNumero,
            Filtro_chkAnexo: chkAnexo,
            Filtro_ChkFecha: chkFecha,
            Filtro_ChkCliente: chkCliente,
            Filtro_CodVendedor: $('#MainContent_ddlEmpleadoConsulta').val(),
            Filtro_CodEmpresa: $('#MainContent_ddlEmpresaConsulta').val()
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
                $('#lblGrillaConsulta').text(F_Numerar_Grilla("grvConsulta", 'lblNumero'));
                F_Estados_Grilla("grvConsulta", 'lblNumero', 'lblEstado')
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
    $('#MainContent_txtDesde').val($('#MainContent_txtHasta').val());
    $('#MainContent_ddlEmpresaConsulta').val($('#hfCodEmpresa').val());
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
    var Mensaje = "Ingrese los sgtes datos:";

    if ($(Contenedor + 'txtCodFactura').val() == "")
        Mensaje = Mensaje + "<p></p>" + "Numero Factura";

    if (Mensaje != "Ingrese los sgtes datos:") {
        alertify.log(Mensaje);
        return false;
    }

    var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

    try {
        var objParams = {
            Filtro_NumeroDoc: $(Contenedor + 'txtCodFactura').val(),
            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtEmision').val(),
            Filtro_CodTipoDoc: $(Contenedor + 'ddlTipoDocumento').val(),
            Filtro_CodTipoOperacionNC: $(Contenedor + 'ddlTipoOperaciones').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: 0,
            Filtro_CodEmpresa: $('#MainContent_ddlEmpresa').val()
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
                $('#MainContent_txtAcuentaNV').val(result.split('~')[11]);
                $('#MainContent_txtNumeroRelacionado').val($(Contenedor + 'txtCodFactura').val());
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[9]);
                $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblImporte"));
                $('#hfCodDocumentoVenta').val(result.split('~')[10]);
                if ($(Contenedor + 'ddlTipoDocumento').val() == 2)
                    $('#MainContent_txtCliente').prop('readonly', false);
                else
                    $('#MainContent_txtCliente').prop('readonly', true);

                if ($('#MainContent_ddlFormaPago').val() == 1)
                    $('#MainContent_txtAcuenta').val(parseFloat(parseFloat($('#MainContent_txtTotal').val())).toFixed(2));

                if (result.split('~')[12] == 1) {
                    $('#MainContent_chkSinIgvMaestro').prop('checked', true);
                    $('#MainContent_chkConIgvMaestro').prop('checked', false);
                }
                else {
                    $('#MainContent_chkSinIgvMaestro').prop('checked', false);
                    $('#MainContent_chkConIgvMaestro').prop('checked', true);
                }
                $('.ccsestilo').css('background', '#FFFFE0');
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

function F_FacturaNotaCredito1() {

    var Contenedor = '#MainContent_';
    var Mensaje = "Ingrese los sgtes datos: ";

    if ($(Contenedor + 'txtCodFactura').val() == "")
        Mensaje = Mensaje + "<p></p>" + "Numero Factura";

    if (Mensaje != "Ingrese los sgtes datos: ") {
        alertify.log(Mensaje);
        return false;
    }
    var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

    try {
        var objParams = {
            Filtro_CodDocumentoVenta: $(Contenedor + 'txtCodFactura').val(),
            Filtro_CodTipoDoc: $(Contenedor + 'ddlTipoDocumento').val(),
            Filtro_CodTipoOperacionNC: $(Contenedor + 'ddlTipoOperaciones').val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: '0'
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

                $('#MainContent_txtCliente').val(result.split('~')[8]);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[9]);
                $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblImporte"));
                $('#hfCodDocumentoVenta').val(result.split('~')[10]);
                $('#MainContent_txtCliente').prop('readonly', true);

                if ($(Contenedor + 'ddlTipoDocumento').val() == 1) {
                    $('#MainContent_txtSubTotal').val(parseFloat(result.split('~')[5]).toFixed(2));
                    $('#MainContent_txtIgv').val(parseFloat(result.split('~')[6]).toFixed(2));
                    $('#MainContent_txtTotal').val(parseFloat(result.split('~')[7]).toFixed(2));
                }
                else {
                    $('#MainContent_txtSubTotal').val(parseFloat(parseFloat(result.split('~')[5]) / parseFloat(tasaigv)).toFixed(2));
                    $('#MainContent_txtIgv').val(parseFloat(parseFloat(parseFloat(result.split('~')[5]) / parseFloat(tasaigv)).toFixed(2) * (tasaigv - 1)).toFixed(2));
                    $('#MainContent_txtTotal').val(parseFloat(result.split('~')[5]).toFixed(2));
                }
                $('#MainContent_txtCliente').prop('readonly', true);

                $('#div_Factura').dialog('close');

                //F_TipoOperacion_CambioDiseno();
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
        var hfCodDetalle = '';
        var TasaIgv_NC = 1;

        $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;
            hfCodDetalle = chkSi.replace('chkEliminar', 'hfCodDetalle');

            if ($(chkSi).is(':checked')) {
                var objDetalle = {
                    CodDetalle: $(hfCodDetalle).val()
                };
                arrDetalle.push(objDetalle);
            }
        });

        if ($('#MainContent_chkConIgvMaestro').is(':checked'))
            TasaIgv_NC = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var Contenedor = '#MainContent_';
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        var objParams = {
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
            Filtro_TasaIgv: tasaigv,
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_TasaIgv_NC: TasaIgv_NC
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
                    $('#MainContent_txtAcuenta').val('0.00');
                    $('#MainContent_txtAcuentaNV').val('0.00');
                }
                else {
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    $('#MainContent_txtAcuentaNV').val(result.split('~')[8]);
                }
                if ($('#MainContent_ddlFormaPago').val() == 1)
                    $('#MainContent_txtAcuenta').val(parseFloat(parseFloat($('#MainContent_txtTotal').val()) - parseFloat($('#MainContent_txtAcuentaNV').val())).toFixed(2));

                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblImporte"));
                $('.ccsestilo').css('background', '#FFFFE0');
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
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Editar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
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
            width: 500,
            autoOpen: false
        });

        F_NuevoEdicion();

        var imgID = Fila.id;

        var lblCodigo = '#' + imgID.replace('imgEditarRegistro', 'lblCodigo');
        var txtDescripcion = '#' + imgID.replace('imgEditarRegistro', 'txtDescripcion');
        var lblCantidad = '#' + imgID.replace('imgEditarRegistro', 'lblCantidad');
        var lblUM = '#' + imgID.replace('imgEditarRegistro', 'lblUM');
        var lblPrecio = '#' + imgID.replace('imgEditarRegistro', 'lblPrecio');
        var lblImporte = '#' + imgID.replace('imgEditarRegistro', 'lblImporte');
        var hfCodDetalle = '#' + imgID.replace('imgEditarRegistro', 'hfCodDetalle');

        $(Contenedor + 'txtCodigo').val($(lblCodigo).text());
        $(Contenedor + 'txtDescripcion').val($(txtDescripcion).val());
        $(Contenedor + 'txtCantidad').val($(lblCantidad).text());
        $('#hfCantidad').val($(lblCantidad).text());
        $(Contenedor + 'txtUM').val($(lblUM).text());
        $(Contenedor + 'txtPrecio').val($(lblPrecio).text());
        $('#hfPrecio').val($(lblPrecio).text());
        $(Contenedor + 'txtImporte').val($(lblImporte).text());
        $('#hfCodDetalle').val($(hfCodDetalle).val());

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

function F_ValidarEdicionItem() {

    try {

        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if (parseFloat($('#MainContent_txtCantidad').val()) <= 0)
            Cadena = Cadena + '<p></p>' + 'La Cantidad no debe ser menor o igual a cero';

        if (parseFloat($('#MainContent_txtCantidad').val()) > parseFloat($('#hfCantidad').val()) & $('#MainContent_ddlTipoOperaciones').val() != 3)
            Cadena = Cadena + '<p></p>' + 'La Cantidad no debe ser mayor a la cantidad original';

        if (parseFloat($('#MainContent_txtPrecio').val()) <= 0 & $('#MainContent_ddlTipoOperaciones').val() != 3)
            Cadena = Cadena + '<p></p>' + 'El Precio no debe ser menor o igual a cero';

        if (parseFloat($('#MainContent_txtPrecio').val()) > parseFloat($('#hfPrecio').val()) & $('#MainContent_ddlTipoOperaciones').val() != 3)
            Cadena = Cadena + '<p></p>' + 'El Precio no debe ser mayor al Precio original';

        if (Cadena != 'Ingresar los sgtes. Datos:') {
            alertify.log(Cadena.toUpperCase());
            return false;
        }
        return true;
    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}

function F_EditarTemporal() {
    try {
        var arrDetalle = new Array();
        var TasaIgv_NC = 1;
        var Contenedor = '#MainContent_';
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        if ($('#MainContent_chkConIgvMaestro').is(':checked'))
            TasaIgv_NC = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_Cantidad: $(Contenedor + 'txtCantidad').val(),
            Filtro_Precio: $(Contenedor + 'txtPrecio').val() / TasaIgv_NC,
            Filtro_CodDetDocumentoVenta: $('#hfCodDetalle').val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_TasaIgv_NC: TasaIgv_NC
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
                    $('#MainContent_txtAcuenta').val('0.00');
                    $('#MainContent_txtAcuentaNV').val('0.00');
                }
                else {
                    $('#MainContent_txtAcuentaNV').val(parseFloat(result.split('~')[8]).toFixed(2));
                    $('#MainContent_txtSubTotal').val(parseFloat(result.split('~')[7]).toFixed(2));
                    $('#MainContent_txtIgv').val(parseFloat(result.split('~')[6]).toFixed(2));
                    $('#MainContent_txtTotal').val(parseFloat(result.split('~')[5]).toFixed(2))
                }
                if ($('#MainContent_ddlFormaPago').val() == 1)
                    $('#MainContent_txtAcuenta').val(parseFloat(parseFloat($('#MainContent_txtTotal').val()) - parseFloat($('#MainContent_txtAcuentaNV').val())).toFixed(2));

                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblImporte"));
                $('.ccsestilo').css('background', '#FFFFE0');
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
                $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblImporte"));
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

        var objParams = {
            Filtro_CodDoc: CodDoc,
            Filtro_SerieDoc: $("#MainContent_ddlSerie option:selected").text(),
            Filtro_CodEmpresa: $("#MainContent_ddlEmpresa").val()
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

function F_EliminarRegistro(Fila) {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Eliminar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
    try {
        var imgID = Fila.id;
        var lblCodigo = '#' + imgID.replace('imgEliminarDocumento', 'lblCodigo');
        var lblEstado = '#' + imgID.replace('imgEliminarDocumento', 'lblEstado');
        var lblNumero = '#' + imgID.replace('imgEliminarDocumento', 'lblNumero');
        var lblCliente = '#' + imgID.replace('imgEliminarDocumento', 'lblCliente');

        var nrodoc = $(lblNumero).text();
        if (nrodoc.substr(0, 1) != '0') {
            alertify.log("series F y B no se pueden eliminar porque son electronicas");
            return false;
        }

        if ($(lblEstado).text() == "CANCELADO PARCIAL") {
            alertify.log("Este documento se encuentra cancelado parcial; primero elimine la cobranza y luego anule la nota de credito");
            return false;
        }

        if ($(lblEstado).text() == "CANCELADO TOTAL") {
            alertify.log("Este documento se encuentra cancelado total; primero elimine la cobranza y luego anule la nota de credito");
            return false;
        }

        if (!confirm("ESTA SEGURO DE ELIMINAR LA NOTA DE CREDITO : " + $(lblNumero).text() + "\nDEL CLIENTE : " + $(lblCliente).text()))
            return false;

        var chkNumero = 0;
        var chkFecha = 0;
        var chkCliente = 0;

        if ($('#MainContent_chkNumero').is(':checked'))
            chkNumero = 1;

        if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = 1;

        if ($('#MainContent_chkCliente').is(':checked'))
            chkCliente = '1';

        var objParams = {
            Filtro_Codigo: $(lblCodigo).val(),
            Filtro_Serie: $("#MainContent_ddlSerie option:selected").text(),
            Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            Filtro_CodTipoDoc: '3',
            Filtro_ChkNumero: chkNumero,
            Filtro_ChkFecha: chkFecha,
            Filtro_ChkCliente: chkCliente,
            Filtro_CodEmpresa: $('#MainContent_ddlEmpresaConsulta').val()
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
                $('#lblGrillaConsulta').text(F_Numerar_Grilla("grvConsulta", 'lblNumero'));
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
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Anular') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
    try {

        if (!confirm("ESTA SEGURO DE ANULAR LA NOTA DE CREDITO : " + $('#hfNumeroAnulacion').val() + "\nDEL CLIENTE : " + $('#hfClienteAnulacion').val()))
            return false;

        var chkNumero = 0;
        var chkFecha = 0;
        var chkCliente = 0;

        if ($('#MainContent_chkNumero').is(':checked'))
            chkNumero = 1;

        if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = 1;

        if ($('#MainContent_chkCliente').is(':checked'))
            chkCliente = 1;

        var objParams = {
            Filtro_Codigo: $('#hfCodDocumentoVentaAnulacion').val(),
            Filtro_Serie: $("#MainContent_ddlSerie option:selected").text(),
            Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            Filtro_CodTipoDoc: 3,
            Filtro_ChkNumero: chkNumero,
            Filtro_ChkFecha: chkFecha,
            Filtro_ChkCliente: chkCliente,
            Filtro_CodEmpresa: $("#MainContent_ddlEmpresaConsulta").val(),
            Filtro_ObservacionAnulacion: $('#MainContent_txtObservacionAnulacion').val()
        };
        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_AnularRegistro_Net(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";
            F_Buscar();
            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                $('#lblGrillaConsulta').text(F_Numerar_Grilla("grvConsulta", 'lblNumero'));
                $('#div_Anulacion').dialog('close');
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

function F_ImprimirDocumento(codigo, Fila, rplc, TipoImp, TipoDoc) {
//    if (F_PermisoOpcion(CodigoMenu, 4000602, '') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
    var nrodoc = '';
    if (codigo == undefined) {
        var imgID = Fila.id;
        var lblCodigo = '#' + imgID.replace(rplc, 'lblCodigo');
        var lblNumero = '#' + imgID.replace(rplc, 'lblNumero');
        codigo = $(lblCodigo).val();
        nrodoc = $(lblNumero).text();
        TipoDoc = 3;
    }
    else {
        nrodoc = $("#MainContent_ddlSerie option:selected").text()
    }

    var imp = '';
    imp = ImpresoraTickets;
    //VALIDACONES PRE IMPRESION
    if (nrodoc.substr(0, 1) == 'F' || nrodoc.substr(0, 1) == 'B' || nrodoc.substr(0, 1) == '5') {
        switch (TipoImp) {
            case 'PDF':
                break;
            case 'IMP':
                break;
            case 'TK':
                break;
        }
    }
    else {
        switch (TipoImp) {
            case 'PDF':
                alertify.log('OPCION NO VALIDA PARA ESTE TIPO DE DOCUMENTO');
                return false;
                break;
            case 'IMP':
                return false;
                break;
            case 'TK':
                alertify.log('OPCION NO VALIDA PARA ESTE TIPO DE DOCUMENTO');
                return false;
                break;
        }
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodMenu = '214';
    var NombreArchivo = 'rptFacturaImpresionTicketNC.rpt';

    var PrimeraCopia = 'ORIGINAL';
    var SegundaCopia = 'COPIA';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'codigo=' + codigo + '&';
    rptURL = rptURL + 'SerieDoc=' + nrodoc.substr(0, 4) + '&';
    rptURL = rptURL + 'CodTipoDoc=' + TipoDoc + '&';
    rptURL = rptURL + 'TipoImpresion=' + TipoImp + '&';
    rptURL = rptURL + 'ArchivoRpt=' + NombreArchivo + '&';
    rptURL = rptURL + 'Impresora=' + imp + '&'; //cambiar aca tambien
    rptURL = rptURL + 'PrimeraCopia=' + PrimeraCopia + '&'; //cambiar aca tambien
    rptURL = rptURL + 'SegundaCopia=' + SegundaCopia + '&'; //cambiar aca tambien
    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function ImprimirFacturaDetalle(Fila) {

    var imgID = Fila.id;
    var lblCodigo = '#' + imgID.replace('imgPdf', 'lblCodigo');
    //    var lblEstado = '#' + imgID.replace('imgPdf', 'lblestado');

    //    if ($(lblEstado).text() == 'ANULADO') {
    //        alertify.log("La factura se encuentra anulada");
    //        return false;
    //    }

    var lblNumero = '#' + imgID.replace('imgPdf', 'lblNumero');
    var nrodoc = $(lblNumero).text();
    //if (nrodoc.substr(0, 1) == '0') return false;


    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '6';
    var CodTipoArchivo2 = '6';
    var CodMenu = '201';

    rptURL = '../Reportes/Web_Pagina_Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'CodTipoArchivo2=' + CodTipoArchivo2 + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + $(lblCodigo).val() + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_ReenvioMail(Fila) {
    var ID = Fila.id;
    var lblCodigo = '#' + ID.replace('imgMail', 'lblCodigo');

    try {
        var objParams = {
            Filtro_Codigo: $(lblCodigo).val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ReenvioMail_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1")
                alertify.log(str_mensaje_operacion);
            else
                alertify.log(str_mensaje_operacion);

            return false;

        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
    return false;
}

function F_Serie() {
    var arg;
    var FlagNCInterno = 0;

    if ($('#MainContent_ddlTipoDocumento').val() == 16)
        FlagNCInterno = 1;

    try {
        var objParams =
            {
                Filtro_CodDoc: 3,
                Filtro_CodEstado: 1,
                Filtro_Flag_Automatico: 0,
                Filtro_FlagNCInterno: FlagNCInterno,
                Filtro_CodTipoDoc2: $('#MainContent_ddlTipoDocumento').val(),
                Filtro_CodEmpresa: $('#MainContent_ddlEmpresa').val()
            };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_Serie_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_serie', result.split('~')[2]);
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        F_CambioSerie();
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

function F_CambioSerie() {
    if ($("#MainContent_ddlSerie option:selected").text().substr(0, 1) != '0')
    { $('#divNumero').prop("style").display = "none" }
    else
    { $('#divNumero').prop("style").display = "block" }

    if ($("#MainContent_ddlSerie option:selected").text().substr(0, 1) == '5')
    { $('#divNumero').prop("style").display = "block" }

    if ($("#MainContent_ddlSerie option:selected").text().substr(0, 1) == '8')
    { $('#divNumero').prop("style").display = "block" }

    F_Mostrar_Correlativo(3);
}

function F_ActualizarDescripcion(Fila) {
    try {
        var txtDescripcion = '#' + Fila;
        var lblCantidad = txtDescripcion.replace('txtDescripcion', 'lblCantidad');
        var hfDescripcion = txtDescripcion.replace('txtDescripcion', 'hfDescripcion');
        var lblPrecio = txtDescripcion.replace('txtDescripcion', 'lblPrecio');
        var hfCodDetalle = txtDescripcion.replace('txtDescripcion', 'hfCodDetalle');
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        var FlagIgv = 0;
        var TasaIgv_NC = 1;

        if ($(txtDescripcion).val().trim() == "" || $(txtDescripcion).val() == $(hfDescripcion).val()) {
            $(txtDescripcion).val($(hfDescripcion).val());
            return false;
        }

        if ($('#MainContent_chkConIgvMaestro').is(':checked')) {
            FlagIgv = 1;
            TasaIgv_NC = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        }

        var objParams = {
            Filtro_Precio: $(lblPrecio).text() / TasaIgv_NC,
            Filtro_Cantidad: $(lblCantidad).text(),
            Filtro_Descripcion: $(txtDescripcion).val(),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_CodDetDocumentoVenta: $(hfCodDetalle).val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: 0,
            Filtro_Flag: 0,
            Filtro_FlagIgv: FlagIgv,
            Filtro_TasaIgvDscto: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
            Filtro_TasaIgv_NC: TasaIgv_NC
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
                $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblImporte"));
                $('.ccsestilo').css('background', '#FFFFE0');
            }
            else {
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('#lblCantidadRegistro').text(F_Numerar_Grilla("grvDetalleArticulo", "lblImporte"));
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

function F_VerArchivoCDR(Control) {
    Control = '#' + Control.replace('lblEstadoSunat', 'lblNumero');
    $('#MainContent_txtFacturaCDR').val($(Control).text());
    $('#MainContent_txtArchivoCDR').val('');
    Control = Control.replace('lblNumero', 'lblCodigo');

    $('#hfCodDocumentoVentaDescargaCDR').val($(Control).val());


    $.ajax({
        async: true,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'RegistroFacturaMultipleKarina.aspx/F_ObtenerArchivoCDR_NET',
        dataType: "json",
        data: "{'CodDocumentoVenta':'" + $(Control).val() + "'}",
        success: function (dbObject) {
            MostrarEspera(true);
            var data = dbObject.d;
            try {

                $('#div_CDR').dialog({
                    resizable: false,
                    modal: true,
                    title: "Archivo CDR",
                    title_html: true,
                    height: 130,
                    width: 300,
                    autoOpen: false
                });

                $('#MainContent_txtArchivoCDR').val(data.ArchivoCDR.trim());
                $('#tr_btnDescargaCDR').css('display', 'block');
                if (data.ArchivoCDR.trim() === 'NO HA SIDO PROCESADO')
                    $('#tr_btnDescargaCDR').css('display', 'none');

                $('#div_CDR').dialog('open');

            }
            catch (x) { alertify.log(''); }
            MostrarEspera(false);
        },
        complete: function () {

        },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        async: true
    });
}

function F_DescargarArchivosPDF() {

    //descargo el PDF
    $.ajax({
        async: true,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Stocks.asmx/DescargarDocumentosSunat',
        dataType: "json",
        data: "{'CodDocumentoVenta':'" + $('#hfCodDocumentoVentaDescargaCDR').val() + "','TipoDocumento':'PDF'}",
        success: function (dataObject) {
            var result = dataObject.d;

            if (result.Mensaje === "" | result.Mensaje === "DOCUMENTO ANULADO") {
                try {
                    if (result.MensajePdf === "") {
                        var bytespdf = new Uint8Array(result.ArchivoPdf);
                        var blobpdf = new Blob([bytespdf], { type: "application/pdf" });
                        var linkpdf = document.createElement('a');
                        linkpdf.href = window.URL.createObjectURL(blobpdf);
                        linkpdf.download = result.ArchivoPdfNombre;
                        linkpdf.click();
                    } else {
                        alertify.error(result.MensajePdf);
                    }
                }
                catch (err) { }

            } else {
                alertify.error(result.Mensaje);
            }

            if (result.Mensaje + result.MensajePdf + result.MensajeXml === "") {
                alertify.success("Operacion completada con exito");
            }
        },
        complete: function () {

        },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        async: true
    });

    return true;
}

function F_DescargarArchivosXML() {

    //descargo el XML ENVIO
    $.ajax({
        async: true,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Stocks.asmx/DescargarDocumentosSunat',
        dataType: "json",
        data: "{'CodDocumentoVenta':'" + $('#hfCodDocumentoVentaDescargaCDR').val() + "','TipoDocumento':'ENVIO'}",
        success: function (dataObject) {
            var result = dataObject.d;

            if (result.Mensaje === "") {
                try {
                    if (result.MensajeXml === "") {
                        var bytesxml = new Uint8Array(result.ArchivoXml);
                        var blobxml = new Blob([bytesxml], { type: "application/xml" });
                        var linkxml = document.createElement('a');
                        linkxml.href = window.URL.createObjectURL(blobxml);
                        linkxml.download = result.ArchivoXmlNombre;
                        linkxml.click();
                    } else {
                        alertify.error(result.MensajeXml);
                    }

                }
                catch (err) { }

            } else {
                alertify.error(result.Mensaje);
            }

            if (result.Mensaje + result.MensajePdf + result.MensajeXml === "") {
                alertify.success("Operacion completada con exito");
            }
        },
        complete: function () {

        },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        async: true
    });


    return true;
}

function F_DescargarArchivosCDR() {

    //descargo el CDR RPTA
    $.ajax({
        async: true,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Stocks.asmx/DescargarDocumentosSunat',
        dataType: "json",
        data: "{'CodDocumentoVenta':'" + $('#hfCodDocumentoVentaDescargaCDR').val() + "','TipoDocumento':'RPTA'}",
        success: function (dataObject) {
            var result = dataObject.d;

            if (result.Mensaje === "") {
                try {
                    if (result.MensajeCdr === "") {
                        var bytescdr = new Uint8Array(result.ArchivoCdr);
                        var blobcdr = new Blob([bytescdr], { type: "application/cdr" });
                        var linkcdr = document.createElement('a');
                        linkcdr.href = window.URL.createObjectURL(blobcdr);
                        linkcdr.download = result.ArchivoCdrNombre;
                        linkcdr.click();
                    } else {
                        alertify.error(result.Mensajecdr);
                    }
                }
                catch (err) { }

            } else {
                alertify.error(result.Mensaje);
            }

            if (result.Mensaje + result.MensajePdf + result.MensajeXml === "") {
                alertify.success("Operacion completada con exito");
            }
        },
        complete: function () {

        },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        async: true
    });




}

function F_CambioSerie_TipoDoc() {
    if (!F_SesionRedireccionar(AppSession)) return false;

    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodDoc: 3,
                Filtro_CodEmpresa: $("#MainContent_ddlEmpresa").val()
            };


        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Series_Documentos_NET
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

                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');

                        $('.ccsestilo').css('background', '#FFFFE0');
                        F_CambioSerie();
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

function F_AnularPopUP(Fila) {
    if (!F_SesionRedireccionar(AppSession)) return false;
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Anular') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
    var imgID = Fila.id;
    var lblCodigo = '#' + imgID.replace('imgAnularDocumento', 'lblCodigo');
    var lblEstado = '#' + imgID.replace('imgAnularDocumento', 'hfEstado');
    var lblnumero = '#' + imgID.replace('imgAnularDocumento', 'lblNumero');
    var lblcliente = '#' + imgID.replace('imgAnularDocumento', 'lblCliente');
    var lblID = '#' + imgID.replace('imgAnularDocumento', 'hfCodigo');

    if ($(lblEstado).val() == "ANULADO") {
        alertify.log("LA NOTA DE CREDITO SE ENCUENTRA ANULADA");
        return false;
    }

    if ($(lblEstado).val() == "CANCELADO TOTAL") {
        alertify.log("ESTA NOTA DE CREDITO SE ENCUENTRA CANCELADA TOTAL; PRIMERO ELIMINE LA COBRANZA Y LUEGO ANULE LA NOTA DE CREDITO");
        return false;
    }

    $('#hfCodDocumentoVentaAnulacion').val($(lblCodigo).val());
    $('#hfClienteAnulacion').val($(lblcliente).text());
    $('#hfNumeroAnulacion').val($(lblnumero).text());
    $('#MainContent_txtObservacionAnulacion').val('');
    $('#lblfactanu').text($(lblnumero).text());
    $('#hfid').val($(lblID).val());
    $('#div_Anulacion').dialog({
        resizable: false,
        modal: true,
        title: "Anulacion de Nota de Credito",
        title_html: true,
        height: 190,
        width: 470,
        autoOpen: false
    });
    $('#div_Anulacion').dialog('open');
}


// DETALLE OBSERVACION
var CtlgvObservacion;
var HfgvObservacion;
function imgMasObservacion_Click(Control) {
    CtlgvObservacion = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        var grid = $(Control).next();
        F_Observacion(grid.attr('id'));
        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }
    return false;
}

function F_Observacion(Fila) {
    try {
        var Col = Fila.split('_')[3];
        var Codigo = $('#' + Fila.replace('pnlOrdersObservacion', 'lblCodigo')).val();
        var grvNombre = 'MainContent_grvConsulta_grvDetalleObservacion_' + Col;
        HfgvObservacion = '#' + Fila.replace('pnlOrdersObservacion', 'grvDetalleObservacion');

        if ($(HfgvObservacion).val() === "1") {
            $(CtlgvObservacion).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvObservacion).next().html() + '</td></tr>');
        }
        else {
            {
                var objParams =
                        {
                            Filtro_Col: Col,
                            Filtro_Codigo: Codigo,
                            Filtro_grvNombre: grvNombre
                        };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_Observacion_NET(arg, function (result) {

                    MostrarEspera(false);

                    var str_resultado_operacion = result.split('~')[0];
                    var str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion === "0") {
                        var p = $('#' + result.split('~')[3]).parent();
                        $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                        F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                        $(CtlgvObservacion).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvObservacion).next().html() + '</td></tr>');
                        $(HfgvObservacion).val('1');
                    }
                    else {
                        alertify.log(str_mensaje_operacion);
                    }
                    return false;
                });
            }
        }
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + e);
        return false;
    }
    return true;
}

var CtlgvAuditoria;
var HfgvAuditoria;
function imgMasAuditoria_Click(Control) {
    CtlgvAuditoria = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        var grid = $(Control).next();
        F_Auditoria(grid.attr('id'));
        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }
    return false;
}

function F_Auditoria(Fila) {
    try {
        var Col = Fila.split('_')[3];
        var Codigo = $('#' + Fila.replace('pnlOrdersAuditoria', 'lblCodigo')).val();
        var grvNombre = 'MainContent_grvConsulta_grvDetalleAuditoria_' + Col;
        HfgvAuditoria = '#' + Fila.replace('pnlOrdersAuditoria', 'hfDetalleCargadoAuditoria');

        if ($(HfgvAuditoria).val() == "1") {
            $(CtlgvAuditoria).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvAuditoria).next().html() + '</td></tr>');
            $(CtlgvAuditoria).attr('src', '../Asset/images/minus.gif');
        }
        else {
            {
                var objParams =
                        {
                            Filtro_Col: Col,
                            Filtro_Codigo: Codigo,
                            Filtro_grvNombre: grvNombre
                        };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                //MostrarEspera(true);
                $(CtlgvAuditoria).attr('src', '../Asset/images/loading.gif');
                F_Auditoria_NET(arg, function (result) {
                    $(CtlgvAuditoria).attr('src', '../Asset/images/minus.gif');
                    //MostrarEspera(false);

                    var str_resultado_operacion = result.split('~')[0];
                    var str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion === "0") {
                        var p = $('#' + result.split('~')[3]).parent();
                        $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                        F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                        $(CtlgvAuditoria).closest('tr').after('<tr><td></td><td colspan = "999">' + $(CtlgvAuditoria).next().html() + '</td></tr>');
                        $(HfgvAuditoria).val('1');
                    }
                    else {
                        toastr.warning(str_mensaje_operacion);
                    }
                    return false;
                });
            }
        }
    }
    catch (e) {
        MostrarEspera(false);
        toastr.warning("ERROR DETECTADO: " + e);
        return false;
    }
    return true;
}

function checkAll(objRef) {
    var checkallid = '#' + objRef.id;

    if ($(checkallid).is(':checked'))
        $('#MainContent_grvDetalleArticulo input:checkbox').prop('checked', true);
    else
        $('#MainContent_grvDetalleArticulo input:checkbox').prop('checked', false);
}
function F_CheckAll(x) {
    if (x.checked) {
        $('.chkItem').find('input').prop('checked', true);
    } else {
        $('.chkItem').find('input').prop('checked', false);
    }
}
function F_VerPDF() {

    var CodNC = $("#MainContent_grvConsulta input:checkbox:checked").not("#MainContent_grvConsulta_ChkAll").map(function () {
        var fila = this.id;
        var lblCodigo = "#" + fila.replace('chkPdf', 'lblCodigo');
        return $(lblCodigo).val();
    }).get();
    if (CodNC.length != 0) {
        var json = {
            Codigos: CodNC.toString(),
            CodTipoDoc: 3
        }
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            url: "../Servicios/PDF.asmx/F_Facturas_Pedido_Lote2_PDF",
            data: JSON.stringify(json),
            dataType: "json",
            async: true,
            success: function (data) {
                if (data.d === "")
                    toastr.error("no se pudo descargar los documentos");

                var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';

                window.open(data.d, 'PopUpRpt', Params);
                //window.open(data.d, '_blank');
                MostrarEspera(false);
            },
            error: function (response) {
                alertify.log(response.responseText);
                MostrarEspera(false);
            },
            failure: function (response) {
                alertify.log(response.responseText);
                MostrarEspera(false);
            }
        });

        MostrarEspera(true);
        return false;
    } else {
        alertify.log("Seleccione almenos un elemento");
    }

}