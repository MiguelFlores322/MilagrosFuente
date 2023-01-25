var AppSession = "../Ventas/RegistroNotaVenta.aspx";
var CodigoEmpresa = 1; //Cambiara automaticamente cuando el usuario seleccione la empresa
var MultiEmpresa = true;
var Impresora = "EPSON LX-810";
var ImpresoraTickets = 'TICKETERA';
var NroCopiasTickets = '2';
var ImpresoraPDF = 'IMPRESORAFACTURAELECTRONICA';
var NroCopiasPDF = '2';
var ImpresoraMTX = 'EPSON LX-350 ESC/P';
var NroCopiasMTX = '2';
var ArchivoRPTFactura = 'XXX';
var ArchivoRPTBoleta = 'YYY';
var MargenInferior = 0;
var ValidarStock = 1; //1 Si valida //0 No Valida

var UltimoRegistro = 0;

var FlagAdministrador = 0;

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
    //    document.onkeydown = function (evt) {
    //        return (evt ? evt.which : event.keyCode) != 13;
    //    }

    $('#MainContent_txtCliente').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'" + 0 + "'}",
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
                            FormaPago: item.split(',')[12],
                            Telefono: item.split(',')[13],
                            CodTransportista: item.split(',')[14],
                            Transportista: item.split(',')[15],
                            CodVendedor: item.split(',')[17],
                            FlagIncluyeIgv: item.split(',')[19],
                            Comentario: item.split(',')[20]
                        }
                    }))
                },
                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                },
                select: function (e, i) {
                    $('#MainContent_txtDireccion').val(i.item.Direccion);
                    $('#MainContent_txtObservacionCliente').val(i.item.Comentario);
                    
                },


            });
        },
        select: function (e, i) {
            $('#hfCodCtaCte').val(i.item.val);
            $('#MainContent_txtNroRuc').val(i.item.NroRuc);
            $('#MainContent_txtDireccion').val(i.item.Direccion);
            $('#MainContent_txtDestino').val(i.item.DireccionEnvio);
            $('#MainContent_txtDistrito').val(i.item.Distrito);
            $('#hfCodDepartamento').val(i.item.CodDepartamento);
            $('#hfCodProvincia').val(i.item.CodProvincia);
            $('#hfCodDistrito').val(i.item.CodDistrito);
            $('#MainContent_ddlFormaPago').val(i.item.FormaPago);
            $('#hfCodTransportista').val(i.item.CodTransportista);
            $('#MainContent_txtTransportista').val(i.item.Transportista);
              $('#MainContent_txtObservacionCliente').val(i.item.Comentario);
            //F_BuscarDireccionPorDefecto();

            if ($('#hfNroRuc').val() != '11111111') {
               switch(i.item.FlagIncluyeIgv) {
            case '1':
              $('#MainContent_chkMayorista').prop("checked", true);
                        $('#MainContent_chkMinorista').prop("checked", false);
                        $('#MainContent_chkSi').prop("checked", true);
                        $('#MainContent_chkNo').prop("checked", false);
                        $('#MainContent_chkSi').prop("disabled", false);
                        $('#MainContent_chkNo').prop("disabled", false);
              break;
            case '2':
               $('#MainContent_chkMayorista').prop("checked", true);
                        $('#MainContent_chkMinorista').prop("checked", false);
                        $('#MainContent_chkSi').prop("checked", false);
                        $('#MainContent_chkNo').prop("checked", true);
                        $('#MainContent_chkSi').prop("disabled", false);
                        $('#MainContent_chkNo').prop("disabled", false);
              break;
             case '3':
               $('#MainContent_chkMayorista').prop("checked", false);
                        $('#MainContent_chkMinorista').prop("checked", true);
                        $('#MainContent_chkSi').prop("checked", false);
                        $('#MainContent_chkNo').prop("checked", false);
                        $('#MainContent_chkSi').prop("disabled", true);
                        $('#MainContent_chkNo').prop("disabled", true);
              break;
          }
          }
            F_ObtenerDireccionCliente();


        },
        minLength: 3
    });

    $('#MainContent_txtClienteConsulta').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'" + 0 + "'}",
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
            $('#hfCodDepartamento').val(i.item.val);
            $('#hfCodProvincia').val(i.item.CodProvincia);
            $('#hfCodDistrito').val(i.item.CodDistrito);
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

    $('#MainContent_txtDireccion').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCDireccion_ListarXCodTransportista_AutoComplete',
                data: "{ 'Direccion': '" + request.term + "', 'CodCtaCte': '" + $('#hfCodCtaCte').val() + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0]
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
            $('#hfCodDireccion').val(i.item.val);
        },
        minLength: 3
    });

    $('#MainContent_txtDireccionTransportista').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCDireccion_ListarXCodTransportista_AutoComplete',
                data: "{ 'Direccion': '" + request.term + "', 'CodCtaCte': '" + $('#hfCodTransportista').val() + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0]
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
            //            $('#hfCodDireccion').val(i.item.val);
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

       $("#divConsultaCotizacion").dialog({
        resizable: false,
        modal: true,
        title: "Cotizacion",
        title_html: true,
        height: 300,
        width: 710,
        autoOpen: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).show();
        },
        beforeClose: function (event, ui) {
            $('#MainContent_grvConCTVenta tbody tr').remove();
        }
    });

    $('#MainContent_btnFacturarCT').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        $("#divConsultaCotizacion").dialog('open');
        return false;
    });

    $('#MainContent_btnBuscarArticulo').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val() == "")
                return false
            if ($('#MainContent_txtArticulo').val == "" | $('#MainContent_txtArticulo').val().length < 3)
                cadena = cadena + "\n" + "Articulo (Minimo 3 Caracteres)"

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

    $('#MainContent_btnAgregarProducto').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

            if (($('#MainContent_chkMayorista').prop("checked") == false &
                $('#MainContent_chkMinorista').prop("checked") == false & 
                $('#MainContent_chkSi').prop("checked") == false 
                & $('#MainContent_chkNo').prop("checked") == false
                ) |
                ($('#MainContent_chkMayorista').prop("checked") == true &
                $('#MainContent_chkSi').prop("checked") == false 
                & $('#MainContent_chkNo').prop("checked") == false
                )) {                
                     Cadena = Cadena + '<p></p>' + 'DEBE SELECCIONAR EL TIPO DE PRECIOS, MAYORISTA O MINORISTA, APLICA IGV O NO';
                }

                 if ($(Cuerpo + 'lblTC').text() == '0')
                     Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

                     if (Cadena != 'Ingresar los sgtes. Datos:') {
            alertify.log(Cadena);
            return false;
        }
                 
            var TipoPrecios = 'PRECIOS MAYORISTAS';
            if ($('#MainContent_chkMinorista').prop('checked') == true)
                TipoPrecios = 'PRECIOS MINORISTAS';

            $('#MainContent_lblTipoPrecios').text(TipoPrecios);

            $('#MainContent_txtArticulo').val('');
            $('#MainContent_chkServicios').prop('checked', false);
            $('#MainContent_chkNotaPedido').prop('checked', false);
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

            var objParams = {};
            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

            F_CargarGrillaVaciaConsultaArticulo_NET(arg, function (result) {

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1")
                    F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);
                else
                    alertify.log(result.split('~')[1]);
                $('.ccsestilo').css('background', '#FFFFE0');
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

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnAgregarItemOC').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {

            if (!F_ValidarAgregarOC())
                return false;

            F_AgregarTemporalOC();
            F_LimpiarGrillaConsultaOC();

            if ($("#MainContent_ddlFormaPago").val() == 1) {
                $("#MainContent_ddlFormaPago").val(11)
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 7));
            }

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
            if ($("#MainContent_txtNroLetra").val() != '' & $("#MainContent_txtMontoLetra").val() != '' & $("#hfCodLetra").val() != '0') {
                if (!F_ValidarGrabarProtesto())
                    return false;

                if (confirm("ESTA SEGURO DE GRABAR LA PROFORMA"))
                    F_GrabarProtesto();
            }
            else {
                if (!F_ValidarGrabarDocumento())
                    return false;

                if (confirm("ESTA SEGURO DE GRABAR LA PROFORMA"))
                    F_GrabarDocumento();
            }
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnVistaPrevia').click(function () {
        //        if (!F_SesionRedireccionar(AppSession)) return false;

        if (!F_ValidarGrabarDocumento())
            return false;

        F_ImprimirVistaPreviaFactura($('#hfCodigoTemporal').val());
        $('#MainContent_btnGrabar').prop("disabled", false);
        return false;

    });

    $('#MainContent_btnVistaPreviaGuia').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        if (!$('#MainContent_chkGuia').is(':checked')) {
            alertify.log("Error detectado: " + mierror);
            return false;
        }

        if (!F_ValidarGrabarDocumento())
            return false;

        F_ImprimirVistaPreviaGuia($('#hfCodigoTemporal').val());
        return false;
    });

    $('#MainContent_btnNuevo').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_Nuevo(0, 0);
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

    $('#MainContent_btnOC').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_FacturacionOC();
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnDevolverItemOC').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (F_ValidarDevolucion("Seleccione un articulo para devolver") == false)
                return false;

            if (confirm("Esta seguro de la devolucion de los productos seleccionado"))
                F_Devolucion();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnCotizacion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        $('#div_FacturarCotizacion').dialog({
            resizable: false,
            modal: true,
            title: "Facturar Cotizacion",
            title_html: true,
            height: 80,
            width: 300,
            autoOpen: false
        });
        var Contenedor = '#MainContent_';
        $(Contenedor + 'txtCodCotizacion').val('');
        $('#div_FacturarCotizacion').dialog('open');

        return false;

    });

    $('#MainContent_btnFacturarCotizacion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_FacturacionCotizacion();
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnDevolverGuia').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (F_ValidarDevolucionGuia("Seleccione un articulo para devolver") == false)
                return false;

            if (confirm("Esta seguro de la devolucion de los productos seleccionado"))
                F_DevolucionGuia();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnGuia').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            $('#MainContent_txtDescripcionGuia').val('');
            F_FacturacionGuia();
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnAgregarGuia').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {

            if (!F_ValidarDevolucionGuia())
                return false;

            F_AgregarTemporalGuia();
            F_LimpiarGrillaConsultaOC();

            return false;
        }

        catch (e) {
            MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnFacturarNotaVenta').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            $('#div_FacturacionNotaVenta').dialog({
                resizable: false,
                modal: true,
                title: "Facturar Nota Venta",
                title_html: true,
                height: 80,
                width: 280,
                autoOpen: false
            });
            var Contenedor = '#MainContent_';
            $(Contenedor + 'txtCodNotaVenta').val('');
            $('#div_FacturacionNotaVenta').dialog('open');

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnBuscarGuia').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {

            if ($('#MainContent_txtDescripcionGuia').val == "" | $('#MainContent_txtDescripcionGuia').val().length < 3) {
                alertify.log("Articulo (Minimo 3 Caracteres)");
                return false;
            }



            F_FacturacionGuia();
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnAgregarItemNV').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {

            if (F_ValidarAgregarNV() == false)
                return false;

            F_AgregarTemporalNV();


            return false;
        }

        catch (e) {
            MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnDevolverNV').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (F_ValidarDevolucionNV("Seleccione un articulo para devolver") == false)
                return false;

            if (confirm("Esta seguro de la devolucion de los productos seleccionado"))
                F_DevolucionNV();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnBuscarNV').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        F_FacturacionNV($('#MainContent_txtDesdeNV').val(), $('#MainContent_txtHastaNV').val());
        return false;
    });

        $('#MainContent_btnBuscarConCT').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try {
            var Contenedor = "#MainContent_";

            var objParams = {
                Filtro_CodEmpresa: $(Contenedor + 'hdnCodEmpresa').val(),
                Filtro_CodSede: $(Contenedor + 'hdnCodSede').val(),
                Filtro_SerieDoc: $(Contenedor + 'txtCTSerie').val(),
                Filtro_NumeroDoc: $(Contenedor + 'txtCTNumero').val(),
                Filtro_RazonSocial: $(Contenedor + 'txtCTRazonSocial').val()
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

            F_ConsultarCotizaciones_Net
            (
                arg,
                function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_grvConCTVenta', result.split('~')[2]);
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

    $('#MainContent_txtEmision').on('change', function (e) {
        F_FormaPago($("#MainContent_ddlFormaPago").val());
        F_TipoCambio();
    });

        $('#MainContent_txtNroRuc').blur(function () {
        try 
        {
            F_ValidaRucDni($('#MainContent_txtNroRuc').val());
            return false;
              
        }
        catch (e) {

            alertify.log("Error Detectado: " + e);
        }


        return false;
    });

    $("#MainContent_txtNumero").ForceNumericOnly();

    $("#MainContent_txtNumeroConsulta").ForceNumericOnly();

    $("#MainContent_txtNumeroGuia").ForceNumericOnly();

    $('#MainContent_txtCTSerie').blur(function () {
        if ($('#MainContent_txtCTSerie').val() == '')
            return false;
        var id = '0000' + $('#MainContent_txtCTSerie').val();
        $('#MainContent_txtCTSerie').val(id.substr(id.length - 4));
        return false;
    });

    $('#MainContent_txtCTNumero').blur(function () {
        if ($('#MainContent_txtCTNumero').val() == '')
            return false;
        var id = '00000000' + $('#MainContent_txtCTNumero').val();
        $('#MainContent_txtCTNumero').val(id.substr(id.length - 8));
        return false;
    });

    $('#MainContent_txtNumero').blur(function () {
        if ($('#MainContent_txtNumero').val() == '')
            return false;
        var id = '00000000' + $('#MainContent_txtNumero').val();
        $('#MainContent_txtNumero').val(id.substr(id.length - 8));
        return false;
    });

    $('#MainContent_txtNumeroGuia').blur(function () {
        if ($('#MainContent_txtNumeroGuia').val() == '')
            return false;
        var id = '00000000' + $('#MainContent_txtNumeroGuia').val();
        $('#MainContent_txtNumeroGuia').val(id.substr(id.length - 8));
        return false;
    });

    $('#MainContent_txtNumeroConsulta').blur(function () {
        if ($('#MainContent_txtNumeroConsulta').val() == '')
            return false;
        var id = '00000000' + $('#MainContent_txtNumeroConsulta').val();
        $('#MainContent_txtNumeroConsulta').val(id.substr(id.length - 8));
        return false;
    });

    $('#MainContent_txtNumeroNotaVenta').blur(function () {
        if ($('#MainContent_txtNumeroNotaVenta').val() == '')
            return false;
        var id = '0000000' + $('#MainContent_txtNumeroNotaVenta').val();
        $('#MainContent_txtNumeroNotaVenta').val(id.substr(id.length - 7));
        return false;
    });

    $("#MainContent_chkServicios").change(function () {
        if (this.checked) {
            $('#MainContent_chkNotaPedido').prop('disabled', false);
            if ($('#hfNotaPedido') == '1')
                $('#MainContent_chkNotaPedido').prop('checked', true);
            else
                $('#MainContent_chkNotaPedido').prop('checked', false);
            $('#MainContent_txtArticulo').focus();
        }
        else {
            $('#MainContent_chkNotaPedido').prop('disabled', true);
            $('#MainContent_chkNotaPedido').prop('check', false);
        }

    });

    $("#MainContent_chkNotaPedido").change(function () {
        if (this.checked) {
            $('#hfNotaPedido').val('1');
            $('#MainContent_txtArticulo').val('');
            $('#MainContent_txtArticulo').focus();
        }

        else {
            $('#hfNotaPedido').val('0');

            var hfcodtipoproducto_grilla = '';
            var chkDel = '';
            var i = 0;

            $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                chkDel = '#' + this.id;
                hfcodtipoproducto_grilla = chkDel.replace('chkEliminar', 'hfcodtipoproducto');
                if ($(hfcodtipoproducto_grilla).val() == '2') {
                    $(chkDel).prop('checked', true);
                    i = 1;
                }

            });

            if (i == 1) {
                if (confirm("Esta seguro de quitar el pedido")) {
                    F_EliminarTemporal();
                }
                else {

                    $('#MainContent_chkNotaPedido').prop('checked', true);
                    $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                        chkDel = '#' + this.id;
                        hfcodtipoproducto_grilla = chkDel.replace('chkEliminar', 'hfcodtipoproducto');
                        if ($(hfcodtipoproducto_grilla).val() == '2') {
                            $(chkDel).prop('checked', false);
                        }

                    });
                    $('#hfNotaPedido').val('1');
                    $('#MainContent_txtArticulo').focus();

                }

            }
            return false;
        }



    });

    $("#MainContent_chkGuia").click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        if ($(this).is(':checked')) {
            $('#MainContent_txtNumeroGuia').prop('readonly', false);
            $('#MainContent_txtDestino').prop('readonly', false);
            $('#MainContent_txtFechaTraslado').prop('readonly', false);
            $('#MainContent_txtDestino').focus();
            F_Mostrar_Correlativo(10);
        }
        else {
            $('#MainContent_txtNumeroGuia').val('');
            $('#MainContent_txtNumeroGuia').prop('readonly', true);
            $('#MainContent_txtDestino').prop('readonly', true);
            $('#MainContent_txtFechaTraslado').prop('readonly', true);
        }
    });

    $('#MainContent_txtObservacion').css('background', '#FFFFE0');

    $("#MainContent_txtNroRuc").ForceNumericOnly();

    $("#MainContent_txtCodCotizacion").ForceNumericOnly();

    $('#MainContent_txtCodCotizacion').css('background', '#FFFFE0');

    $('#MainContent_txtCliente').css('background', '#FFFFE0');

    $('#MainContent_txtDistrito').css('background', '#FFFFE0');

    $('#MainContent_txtNroRuc').css('background', '#FFFFE0');

    $('#MainContent_txtDireccion').css('background', '#FFFFE0');

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

    $('#MainContent_txtDescripcionGuia').css('background', '#FFFFE0');

    $('#MainContent_txtUltimoPrecio').css('background', '#FFFFE0');

    $('#MainContent_txtMonedaPrecio').css('background', '#FFFFE0');

    $('#MainContent_txtFechaPrecio').css('background', '#FFFFE0');

    $('#MainContent_txtCantidadPrecio').css('background', '#FFFFE0');

    $('#MainContent_txtAcuenta').css('background', '#FFFFE0');

    $('#MainContent_txtEmpresa').css('background', '#FFFFE0');

    $('#MainContent_txtTransportista').css('background', '#FFFFE0');

    $('#MainContent_txtMarcaGuia').css('background', '#FFFFE0');

    $('#MainContent_txtLicenciaGuia').css('background', '#FFFFE0');

    $('#MainContent_txtNuBultos').css('background', '#FFFFE0');

    $('#MainContent_txtPeso').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroNotaVenta').css('background', '#FFFFE0');

    $('#MainContent_txtClienteNV').css('background', '#FFFFE0');

    $('#MainContent_txtHastaNV').css('background', '#FFFFE0');

    $('#MainContent_txtDesdeNV').css('background', '#FFFFE0');

    $('#MainContent_txtDireccionTransportista').css('background', '#FFFFE0');

    $('#MainContent_txtConCotRef').css('background', '#FFFFE0');

    $('#MainContent_txtConCotNum').css('background', '#FFFFE0');

    $('#MainContent_txtConCotSer').css('background', '#FFFFE0');

    $('#MainContent_txtNvSerie').css('background', '#FFFFE0');

    $('#MainContent_txtNvNumero').css('background', '#FFFFE0');

    $('#MainContent_txtNvRazonSocial').css('background', '#FFFFE0');

    $('#MainContent_txtNroLetra').css('background', '#FFFFE0');

    $('#MainContent_txtMontoLetra').css('background', '#FFFFE0');

    $('#MainContent_txtCTSerie').css('background', '#FFFFE0');

    $('#MainContent_txtCTNumero').css('background', '#FFFFE0');

    $('#MainContent_txtCTRazonSocial').css('background', '#FFFFE0');

    $('#MainContent_txtObservacionCliente').css('background', '#33CC33');

    forceNumber($('#MainContent_txtAcuenta'));

    F_Derecha();

    $('.ccsestilo').css('background', '#FFFFE0');

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

    if ($('#MainContent_hdnCodEmpresa').val() == '') {
        $('#divSeleccionarEmpresa').dialog('open');
    }

    $("#divConsultaNotaPedido").dialog({
        resizable: false,
        modal: true,
        title: "Nota Pedido",
        title_html: true,
        height: 300,
        width: 710,
        autoOpen: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).show();
        },
        beforeClose: function (event, ui) {
            $('#MainContent_grvConNtPedido tbody tr').remove();
        }
    });

    $("#divConsultaNotaVenta").dialog({
        resizable: false,
        modal: true,
        title: "Nota Venta",
        title_html: true,
        height: 300,
        width: 710,
        autoOpen: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).show();
        },
        beforeClose: function (event, ui) {
            $('#MainContent_grvConNtVenta tbody tr').remove();
        }
    });

    $('#MainContent_btnNotaPedido').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            var Contenedor = "#MainContent_";

            var objParams = {
                Filtro_CodEmpresa: $(Contenedor + 'hdnCodEmpresa').val(),
                Filtro_CodSede: $(Contenedor + 'hdnCodSede').val(),
                Filtro_SerieDoc: $(Contenedor + 'txtConCotSer').val(),
                Filtro_NumeroDoc: $(Contenedor + 'txtConCotNum').val(),
                Filtro_Referencia: $(Contenedor + 'txtConCotRef').val(),
                Filtro_CodTipoDoc: 16
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

            F_ConsultarNotaPedido_Net
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_grvConNtPedido', result.split('~')[2]);
                        if (str_mensaje_operacion == 'No se encontraron registros')
                            alertify.log(str_mensaje_operacion);
                        $('.ccsestilo').css('background', '#FFFFE0');
                        $("#divConsultaNotaPedido").dialog('open');
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

    $('#MainContent_btnFacturarNV').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        $("#divConsultaNotaVenta").dialog('open');
        return false;
    });

    $('#MainContent_btnConCotBus').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            var Contenedor = "#MainContent_";

            var objParams = {
                Filtro_CodEmpresa: $(Contenedor + 'hdnCodEmpresa').val(),
                Filtro_CodSede: $(Contenedor + 'hdnCodSede').val(),
                Filtro_SerieDoc: $(Contenedor + 'txtConCotSer').val(),
                Filtro_NumeroDoc: $(Contenedor + 'txtConCotNum').val(),
                Filtro_Referencia: $(Contenedor + 'txtConCotRef').val(),
                Filtro_CodTipoDoc: 16
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

            F_ConsultarNotaPedido_Net
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_grvConNtPedido', result.split('~')[2]);
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

    $('#MainContent_btnBuscarConNv').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try {
            var Contenedor = "#MainContent_";

            var objParams = {
                Filtro_CodEmpresa: $(Contenedor + 'hdnCodEmpresa').val(),
                Filtro_CodSede: $(Contenedor + 'hdnCodSede').val(),
                Filtro_SerieDoc: $(Contenedor + 'txtNvSerie').val(),
                Filtro_NumeroDoc: $(Contenedor + 'txtNvNumero').val(),
                Filtro_RazonSocial: $(Contenedor + 'txtNvRazonSocial').val()
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

            F_ConsultarNotaVenta_Net
            (
                arg,
                function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_grvConNtVenta', result.split('~')[2]);
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

    $('#MainContent_btnBuscarLetra').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_BuscarLetra();
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });
    
    $('.ccsestilo').css('background', '#FFFFE0');
    if (!F_SesionRedireccionar(AppSession)) return false;
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

$(document).on("change", "select[id $= 'MainContent_ddlSerieGuia']", function () {
    F_Mostrar_Correlativo(10);
});

$(document).on("change", "select[id $= 'MainContent_ddlSerie']", function () {
    if ($("#MainContent_ddlSerie option:selected").text() == '7777') {
        $('#MainContent_ddlSerieGuia').val('');
        $('#MainContent_txtNumeroGuia').val('');
        $('#MainContent_txtDestino').val('');
        $('#MainContent_txtTransportista').val('');
        $('#MainContent_txtDireccionTransportista').val('');
        $('#MainContent_txtPlaca').val('');
        $('#MainContent_txtMarcaGuia').val('');
        $('#MainContent_txtLicenciaGuia').val('');
        $('#MainContent_txtNuBultos').val('');
        $('#MainContent_txtPeso').val('');
        $('#MainContent_txtNroRuc').val('');
        $('#MainContent_txtCliente').val('');
        $('#MainContent_txtDireccion').val('');
        $('#MainContent_btnBuscarLetra').prop('disabled', false);
        $('#MainContent_btnGrabar').prop('disabled', false);
        $('#MainContent_btnEliminar').prop('disabled', true);
        $('#MainContent_btnNotaPedido').prop('disabled', true);
        $('#MainContent_btnVistaPrevia').prop('disabled', true);
        $('#MainContent_chkGuia').prop('disabled', true);
        $('#MainContent_ddlSerieGuia').prop('disabled', true);
        $('#MainContent_txtNumeroGuia').prop('readonly', true);
        $('#MainContent_txtDestino').prop('readonly', true);
        $('#MainContent_txtTransportista').prop('readonly', true);
        $('#MainContent_txtDireccionTransportista').prop('readonly', true);
        $('#MainContent_txtPlaca').prop('readonly', true);
        $('#MainContent_txtMarcaGuia').prop('readonly', true);
        $('#MainContent_txtLicenciaGuia').prop('readonly', true);
        $('#MainContent_txtNuBultos').prop('readonly', true);
        $('#MainContent_txtPeso').prop('readonly', true);
        $('#MainContent_txtTotal').prop('readonly', false);
        $('#MainContent_txtNroLetra').prop('readonly', false);

        $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
            var chkSi = this;
            $(chkSi).prop('checked', true);
        });

        F_EliminarTemporal();
    }
    else {
        $('#MainContent_btnBuscarLetra').prop('disabled', true);
        //$('#MainContent_btnGrabar').prop('disabled', true);
        $('#MainContent_btnEliminar').prop('disabled', false);
        $('#MainContent_btnNotaPedido').prop('disabled', false);
        $('#MainContent_btnVistaPrevia').prop('disabled', false);
        $('#MainContent_chkGuia').prop('disabled', false);
        $('#MainContent_ddlSerieGuia').prop('disabled', false);
        $('#MainContent_txtNumeroGuia').prop('readonly', false);
        $('#MainContent_txtDestino').prop('readonly', false);
        $('#MainContent_txtTransportista').prop('readonly', false);
        $('#MainContent_txtDireccionTransportista').prop('readonly', false);
        $('#MainContent_txtPlaca').prop('readonly', false);
        $('#MainContent_txtMarcaGuia').prop('readonly', false);
        $('#MainContent_txtLicenciaGuia').prop('readonly', false);
        $('#MainContent_txtNuBultos').prop('readonly', false);
        $('#MainContent_txtPeso').prop('readonly', false);
        $('#MainContent_txtNroLetra').prop('readonly', true);
        $('#MainContent_txtTotal').prop('readonly', true);
        $('#MainContent_txtNroLetra').val('');
        $('#MainContent_txtMontoLetra').val('');
        $('#MainContent_txtNroRuc').val('');
        $('#MainContent_txtCliente').val('');
        $('#MainContent_txtDireccion').val('');
        $('#MainContent_txtMontoLetra').val('');
        $('#MainContent_txtTotal').val('0.00');
        $('#hfCodCtaCte').val(0);
        $('#hfCodDepartamento').val(0);
        $('#hfCodProvincia').val(0);
        $('#hfCodDistrito').val(0);
    }
    F_Mostrar_Correlativo(16);
});

$(document).on("change", "select[id $= 'MainContent_ddlSerieConsulta']", function () {
    F_Buscar();
});

$(document).on("change", "select[id $= 'MainContent_ddlFormaPago']", function () {
    $('#MainContent_ddlFormaPago').css('background', '#FFFFE0');
    F_FormaPago($("#MainContent_ddlFormaPago").val());
    if ($("#MainContent_ddlFormaPago").val() == 1) {
        $('#MainContent_txtAcuenta').prop('readonly', true);
        $('#MainContent_txtAcuenta').val($('#MainContent_txtTotal').val()); //- $('#MainContent_txtAcuentaNV').val());

        $('#tr_avisof').css('background-color', 'white');
        $('#div_avisofp').css('display', 'none');
    }
    else {
        $('#MainContent_txtAcuenta').prop('readonly', false);
        $('#MainContent_txtAcuenta').val('0.00');

        $('#tr_avisof').css('background-color', 'red');
        $('#div_avisofp').css('display', 'block');
    }
});

function F_Controles_Inicializar() {
    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodAlmacenFisico: 1,
                Filtro_CodSede: 1,
                Filtro_CodEmpresa: 1,
                Filtro_CodDoc: 16,
                Filtro_SerieDoc: '0001'
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
                        F_Update_Division_HTML('div_formapago', result.split('~')[4]);
                        F_Update_Division_HTML('div_moneda', result.split('~')[5]);

                        F_Update_Division_HTML('div_VendedorComision', result.split('~')[13]);
                        $('#MainContent_lblTC').text(result.split('~')[6]);
                        F_Update_Division_HTML('div_igv', result.split('~')[8]);
                        F_Update_Division_HTML('div_AlmacenFisico', result.split('~')[15]);
                        $('#MainContent_ddlMoneda').val(1);
                        $('#MainContent_ddlFormaPago').val(1);
                        $('#MainContent_txtNumero').val(result.split('~')[7]);
                        $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
                        $('#hfCodUsuario').val(result.split('~')[10]);
                        $('#hfPartida').val(result.split('~')[11]);

                        FlagAdministrador = result.split('~')[16];

                        $('#MainContent_hdnCodSede').val(result.split('~')[17]);
                        $("#MainContent_ddlAlmacenFisico").val(result.split('~')[17]);

                        $('#MainContent_ddlVendedorComision').css('background', '#FFFFE0');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlFormaPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieGuia').css('background', '#FFFFE0');
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlVendedor').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieNV').css('background', '#FFFFE0');
                        $('#MainContent_ddlDireccion').css('background', '#FFFFE0');
                        $('#MainContent_ddlDestino').css('background', '#FFFFE0');
                        $('#MainContent_ddlDireccionTransportista').css('background', '#FFFFE0');
                        $('#MainContent_ddlAlmacenFisico').css('background', '#FFFFE0');                  
                        $("#MainContent_ddlSerieGuia").prop("disabled", true);
                        //$('#MainContent_btnGrabar').prop("disabled", true);
                        $('#MainContent_chkMayorista').prop("checked", false);
                        $('#MainContent_chkMinorista').prop("checked", false);
                        $('#MainContent_chkSi').prop("checked", false);
                        $('#MainContent_chkNo').prop("checked", false);
                        $('#MainContent_chkSi').prop("disabled", true);
                        $('#MainContent_chkNo').prop("disabled", true);
                        $('#hfCodDocumentoVentaAnterior').val(0);
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
        MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);
    }
}

function F_ElegirEmpresa(Fila) {
    MostrarEspera(true);

    var imgID = Fila.id;
    var hfCodEmpresa = '#' + imgID.replace('imgSelecEmpresa', 'hfCodEmpresa');
    var lblNombre = '#' + imgID.replace('imgSelecEmpresa', 'lblRazonSocial');
    var ddlSede = '#' + imgID.replace('imgSelecEmpresa', 'ddlSede');
    var Cuerpo = '#MainContent_';

    $(Cuerpo + 'txtEmpresa').val($(lblNombre).text());
    $(Cuerpo + 'hdnCodEmpresa').val($(hfCodEmpresa).val());
    $(Cuerpo + 'hdnCodSede').val($(ddlSede).val());

    var arg;

    try {
        var objParams =
            {
                Filtro_Empresa: $(hfCodEmpresa).val(),
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
                        F_Update_Division_HTML('div_serie', result.split('~')[2]);
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[3]);
                        F_Update_Division_HTML('div_serieguia', result.split('~')[4]);
                        F_Update_Division_HTML('div_SerieNV', result.split('~')[5]);
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        F_Mostrar_Correlativo(16);
                        $('#MainContent_ddlSerieGuia').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieNV').css('background', '#FFFFE0');
                        $('.ccsestilo').css('background', '#FFFFE0');

                        $('#MainContent_btnAgregarProducto').css('display', 'none');
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
    var arg;
    try {
        var objParams =
            {
                Filtro_Empresa: $(Cuerpo + 'hdnCodEmpresa').val(),
                Filtro_Sede: $(Cuerpo + 'hdnCodSede').val()
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
                        F_Update_Division_HTML('div_serieguia', result.split('~')[4]);
                        F_Update_Division_HTML('div_SerieNV', result.split('~')[5]);
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        F_Mostrar_Correlativo(16);
                        $('#MainContent_ddlSerieGuia').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieNV').css('background', '#FFFFE0');


                        $('#MainContent_btnNotaPedido').css('display', 'none');
                        $('#MainContent_btnVistaPrevia').css('display', 'none');
                        $('#MainContent_btnVistaPreviaGuia').css('display', 'none');



                        $('.ccsestilo').css('background', '#FFFFE0');

                                                
                        MultiEmpresa = false;

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

function cambiaracuenta() {

    var acuenta = Number($("#MainContent_txtAcuenta").val());

    var tot = Number($("#MainContent_txtTotal").val()) - Number($("#MainContent_lblAcuentaNv").text());

    if (!(tot > acuenta) && $('#MainContent_ddlFormaPago').val() != '1') {
        alertify.log("El acuenta debe ser menor que el importe total.");
        return false;
    }

    if (acuenta > 0) {
        $(".csimp").each(function () {
            var imp = Number($(this).text());
            var id = "#" + this.id;
            id = id.replace("lblimporte", "hfAcuenta");
            var idnv = id.replace("lblAcuenta", "hdnAcuentaNv");
            imp = imp - Number($(idnv).val());

            var ac = 0;
            if (acuenta > imp) {
                ac = imp;
                acuenta -= imp;
            } else {
                ac = acuenta;
                acuenta = 0;
            }
            $(id).text(ac.toFixed(2));
        });
    } else {
        $(".csimp").each(function () {
            var id = "#" + this.id;
            id = id.replace("lblimporte", "hfAcuenta");
            $(id).text("0.00");
        });
    }
    return false;
}

function actualizarAcuentaNv() {
    var imp = 0;
    $(".csimp").each(function () {
        var id = "#" + this.id;
        id = id.replace("lblimporte", "hdnAcuentaNv");
        imp += Number($(id).val());
        $("#MainContent_lblAcuentaNv").text(imp.toFixed(2));
    });
}

function F_Mostrar_Correlativo(CodDoc) {

    var arg;
    var SerieDoc = '';

    if (CodDoc == 16)
        SerieDoc = $("#MainContent_ddlSerie option:selected").text();
    else
        SerieDoc = $("#MainContent_ddlSerieGuia option:selected").text();

    try {
        var objParams = {
            Filtro_CodDoc: CodDoc,
            Filtro_SerieDoc: SerieDoc,
            Filtro_CodSede: 1,
            Filtro_CodEmpresa: 1
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
                    if (str_resultado_operacion == "1") {
                        if (CodDoc == 16) {
                            $('#MainContent_txtNumero').val(result.split('~')[2]);
                            F_Mostrar_Correlativo(10);
                        }
                        else {
                            $('#MainContent_txtNumeroGuia').val(result.split('~')[2]);
                        }
                    }
                    else
                        alertify.log(str_mensaje_operacion);
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
                Filtro_Empresa: $('#MainContent_hdnCodEmpresa').val(),
                Filtro_Almacen: $('#MainContent_hdnCodSede').val(),
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

function F_ValidarStockGrilla(ControlID) {

    var txtCantidad = '#' + ControlID;
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

    var Stock = 0;

    var lblChala1 = txtCantidad.replace('txtCantidad', 'lblChala1');
    var lblChala2 = txtCantidad.replace('txtCantidad', 'lblChala2');

    //    if ($('#hfCodSede').val() == 2)
    Stock = $(lblChala1).text();
    //    else
    //        Stock = $(lblChala2).text();
    boolEstado = $(chkOK).is(':checked');
    //    if ($('#MainContent_chkNotaPedido').is(':checked')) {
    //        if ($(chkOK).is(':checked') && parseFloat($(txtCantidad).val()) > parseFloat(Stock)) {
    //            alertify.log("Stock insuficiente");
    //            $(txtCantidad).val('');
    //            return false;
    //        }
    //    }
    //    else {
    //    if (boolEstado && parseFloat($(txtCantidad).val()) > parseFloat(Stock)) {
    //        alertify.log("Stock insuficiente");
    //        $(txtCantidad).val('');
    //        return false;
    //    }
    //        else {

    F_AgregarTemporal(ControlID);
    F_LimpiarGrillaConsulta();
    $('#MainContent_txtArticulo').focus();
    return false;
    //        }

    //    }


    return true;
}

function F_ElegirNotaPedido(Fila) {
    try {
        var imgID = "#" + Fila.id;
        var Clave = "";
        var hfCodProf = imgID.replace('imgSelecCot', 'hdnCodProforma');
        var Cuerpo = '#MainContent_';
        var CodEmp = $(Cuerpo + 'hdnCodEmpresa').val();
        var CodSede = $(Cuerpo + 'hdnCodSede').val();
        var serie = $(Cuerpo + "ddlSerie option:selected").text();

        $('#hfCodProforma2').val($(hfCodProf).val());
        var objParams = {
            Filtro_CodNotPedido: $(hfCodProf).val(),
            Filtro_CodEmpresa: CodEmp,
            Filtro_CodSede: CodSede,
            Filtro_CodDoc: 16,
            Filtro_NumSerie: serie,
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ObtenerNotaPedido_Net(arg, function (resu) {
            var result = JSON.parse(resu);

            var str_resultado_operacion = result.int_resultado_operacion;
            var str_mensaje_operacion = result.str_mensaje_operacion;
            var objprof = result.objprof;

            MostrarEspera(false);

            if (str_mensaje_operacion == "") {
                var Cuerpo = '#MainContent_';
                $('#hfCodCtaCte').val(objprof.CodCliente);
                $(Cuerpo + 'txtCliente').val(objprof.RazonSocial);
                $(Cuerpo + 'txtNroRuc').val(objprof.NroRuc);
                $(Cuerpo + 'txtEmpresa').val(objprof.Empresa);
                $(Cuerpo + 'ddlMoneda').val(objprof.CodMoneda);
                $(Cuerpo + 'ddlIgv').val(objprof.CodTasa);
                $(Cuerpo + 'txtDistrito').val(objprof.Distrito);
                $(Cuerpo + 'txtDireccion').val(objprof.Direccion);
                $(Cuerpo + 'txtDestino').val(objprof.Direccion + ' ' + objprof.Distrito);
                $('#hfCodDepartamento').val(objprof.CodDepartamento);
                $('#hfCodProvincia').val(objprof.CodProvincia);
                $('#hfCodDistrito').val(objprof.CodDistrito);
                $('#hfNotaPedido').val(objprof.CodDocumentoVenta);
                $(Cuerpo + 'txtDireccionTransportista').val(objprof.DireccionTransportista);
                $(Cuerpo + 'txtTransportista').val(objprof.Transportista);
                $('#hfCodTransportista').val(objprof.CodTransportista);
                $(Cuerpo + 'ddlFormaPago').val(objprof.CodFormaPago);
                F_FormaPago($("#MainContent_ddlFormaPago").val());
                $(Cuerpo + 'ddlVendedorComision').val(objprof.CodVendedor);
                $(Cuerpo + 'txtNuBultos').val(objprof.NroBultos);
                $("#MainContent_txtValIgv").val(objprof.ValIgv == null || objprof.ValIgv == undefined ? "" : objprof.ValIgv);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.det);
                $('.ccsestilo').css('background', '#FFFFE0');
                numerar();
                $("#divConsultaNotaPedido").dialog('close');
                $('#hfCodigoTemporal').val(result.int_CodigoTemporal);
                F_Update_Division_HTML('div_Direccion', result.Direccion);
                F_Update_Division_HTML('div_Destino', result.Destino);
                F_Update_Division_HTML('div_DireccionTransportista', result.DireccionTransportista);
                $('#MainContent_ddlDireccion').css('background', '#FFFFE0');
                $('#MainContent_ddlDestino').css('background', '#FFFFE0');
                $('#MainContent_ddlDireccionTransportista').css('background', '#FFFFE0');  
                F_Mostrar_Correlativo(10);
                F_MostrarTotales();
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

function F_ObtenerDireccionCliente() {
    var CodVendedor = $('#MainContent_ddlVendedorComision').val();

    try {

        var objParams = {
            Filtro_CodCliente: $('#hfCodCtaCte').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ObtenerDireccionCliente_Net(arg, function (resu) {
            var result = JSON.parse(resu);

            var str_resultado_operacion = result.int_resultado_operacion;
            var str_mensaje_operacion = result.str_mensaje_operacion;
            var objprof = result.objprof;

            MostrarEspera(false);

            if (str_mensaje_operacion == "") {
                var Cuerpo = '#MainContent_';
//                $(Cuerpo + 'txtDireccionTransportista').val(objprof.DireccionTransportista);
//                $(Cuerpo + 'txtTransportista').val(objprof.Transportista);
//                $('#hfCodTransportista').val(objprof.CodTransportista);
                F_Update_Division_HTML('div_Direccion', result.Direccion);
                F_Update_Division_HTML('div_Destino', result.Destino);
                F_Update_Division_HTML('div_DireccionTransportista', result.DireccionTransportista);
                $('#MainContent_ddlDireccion').css('background', '#FFFFE0');
                $('#MainContent_ddlDestino').css('background', '#FFFFE0');
                $('#MainContent_ddlDireccionTransportista').css('background', '#FFFFE0');  
                $('#MainContent_ddlVendedorComision').val(CodVendedor);
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

function F_ElegirNotaVenta(Fila) {

    try {
        var Cuerpo = '#MainContent_';
        var imgID = "#" + Fila.id;
        var Clave = "";
        var hfCodProf = imgID.replace('imgSelecCot', 'hdnCodNtVenta');
        var CodEmp = $(Cuerpo + 'hdnCodEmpresa').val();
        var CodSede = $(Cuerpo + 'hdnCodSede').val();
        var serie = $(Cuerpo + "ddlSerie option:selected").text();

        var objParams = {
            Filtro_CodNotVenta: $(hfCodProf).val(),
            Filtro_CodEmpresa: CodEmp,
            Filtro_CodSede: CodSede,
            Filtro_CodDoc: 16,
            Filtro_NumSerie: serie
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ObtenerNotaVenta_Net(arg, function (resu) {
            var result = JSON.parse(resu);

            var str_resultado_operacion = result.int_resultado_operacion;
            var str_mensaje_operacion = result.str_mensaje_operacion;
            var objprof = result.objprof;

            if (str_mensaje_operacion == "") {

                $('#hfCodCtaCte').val(objprof.CodCliente);
                $(Cuerpo + 'hdnCodEmpresa').val(objprof.CodEmpresa);
                $(Cuerpo + 'hdnCodSede').val(objprof.CodSede);
                $(Cuerpo + 'txtCliente').val(objprof.RazonSocial);
                $(Cuerpo + 'txtNroRuc').val(objprof.NroRuc);
                $(Cuerpo + 'txtEmpresa').val(objprof.Empresa);
                $(Cuerpo + 'ddlMoneda').val(objprof.CodMoneda);
                $(Cuerpo + 'txtEmision').val(GetFormattedDate(objprof.FechaEmision));
                $(Cuerpo + 'txtVencimiento').val(GetFormattedDate(objprof.FechaVencimiento));
                $(Cuerpo + 'txtSubTotal').val(objprof.SubTotal);
                $(Cuerpo + 'txtIgv').val(objprof.Igv);
                $(Cuerpo + 'txtTotal').val(objprof.Total);
                $(Cuerpo + 'lblTC').val(objprof.TipoCambio);
                $(Cuerpo + 'txtDistrito').val(objprof.Distrito);
                $(Cuerpo + 'txtDireccion').val(objprof.Direccion);
                $(Cuerpo + 'txtDistrito').val(objprof.Distrito);
                //                $(Cuerpo + 'txtAcuenta').val(objprof.Acuenta);
                $(Cuerpo + 'lblAcuentaNv').text(objprof.Acuenta);
                $(Cuerpo + 'ddlFormaPago').val(objprof.CodFormaPago);
                $(Cuerpo + 'hfFlagNotaVenta').val(1);
                $('#hfCodDepartamento').val(objprof.CodDepartamento);
                $('#hfCodProvincia').val(objprof.CodProvincia);
                $('#hfCodDistrito').val(objprof.CodDistrito);
                $('#hfCodDocumentoRef').val($(hfCodProf).val());
                $(Cuerpo + 'ddlVendedorComision').val(objprof.CodVendedor);

                F_Update_Division_HTML('div_grvDetalleArticulo', result.det);
                $('.ccsestilo').css('background', '#FFFFE0');
                                switch(objprof.FlagIncluyeIgv)
                {
                    case 1:
                        $('#MainContent_chkMayorista').prop("checked", true);
                        $('#MainContent_chkMinorista').prop("checked", false);
                        $('#MainContent_chkSi').prop("checked", true);
                        $('#MainContent_chkNo').prop("checked", false);
                        $('#MainContent_chkSi').prop("disabled", false);
                        $('#MainContent_chkNo').prop("disabled", false);
                    break;
                    case 2:
                        $('#MainContent_chkMayorista').prop("checked", true);
                        $('#MainContent_chkMinorista').prop("checked", false);
                        $('#MainContent_chkSi').prop("checked", false);
                        $('#MainContent_chkNo').prop("checked", true);
                        $('#MainContent_chkSi').prop("disabled", false);
                        $('#MainContent_chkNo').prop("disabled", false);
                    break;
                    case 3:
                        $('#MainContent_chkMayorista').prop("checked", false);
                        $('#MainContent_chkMinorista').prop("checked", true);
                        $('#MainContent_chkSi').prop("checked", false);
                        $('#MainContent_chkNo').prop("checked", false);
                        $('#MainContent_chkSi').prop("disabled", true);
                        $('#MainContent_chkNo').prop("disabled", true);
                    break;
                    default:
                    break;
                }
                $("#divConsultaNotaVenta").dialog('close');
                actualizarAcuentaNv();
                F_CalcularNotaVentaConIgv();
                numerar();
                $('.tprecio').attr('readonly', true);
                $('.tcant').attr('readonly', true);
            }

            MostrarEspera(false);
            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_CalcularNotaVentaConIgv() {
    var impt = 0;

    var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text());

    $('.csimp').each(function () {
        var lblimporte = '#' + this.id;
        var txtPrecio = lblimporte.replace('lblimporte', 'txtPrecio');
        var txtCantidad = lblimporte.replace('lblimporte', 'txtCantidad');
        //        var lblAcuenta = lblimporte.replace('lblimporte', 'lblAcuenta');
        //        var acu = Number($(lblAcuenta).text());
        var pre = Number($(txtPrecio).val());
        var cant = Number($(txtCantidad).val());
        //        acu = acu * (1 + tasaigv);
        //        acu = Number(acu.toFixed(2));
        pre = pre * (1 + tasaigv);
        pre = Number(pre.toFixed(2));
        var imp = pre * cant;
        impt += Number(imp.toFixed(2));
        $(txtPrecio).val(pre);
        $(txtCantidad).val(cant);
        $(lblimporte).text(imp.toFixed(2));
        //        $(lblAcuenta).text(acu.toFixed(2));
    });

    $('#MainContent_txtTotal').val(impt.toFixed(2));

    var acut = Number($('#MainContent_txtAcuenta').val());
    acut = acut * (1 + tasaigv);
    acut = Number(acut.toFixed(2));
    $('#MainContent_txtAcuenta').val(acut);

    recalcularmontos();
}

//CHECK ELEGIR ARTICULO 
function F_ValidarCheckElegirArticulo(ControlID) {

    if ($('#MainContent_chkMinorista').prop('checked') == true)
        F_ValidarCheckPrecio(ControlID);

    if ($('#MainContent_chkMayorista').prop('checked') == true)
        F_ValidarCheckPrecioMayorista(ControlID);

    return true;
}
//CHECK ELEGIR ARTICULO PRECIO
function F_ValidarCheckPrecio(ControlID){
    var cadena = 'Ingrese los sgtes. campos: '

    var chkOK = '#' + ControlID;
    var txtPrecio = chkOK.replace('chkOK', 'txtPrecio');
    var hdnPrecio = chkOK.replace('chkOK', 'hfPrecioOrig');
    var txtCantidad = chkOK.replace('chkOK', 'txtCantidad');
    var txtDescuento = chkOK.replace('chkOK', 'txtDescuento');
    var txtDescuento1 = chkOK.replace('chkOK', 'txtDescuento1');
    var txtDescuento2 = chkOK.replace('chkOK', 'txtDescuento2');
    var txtDescuento3 = chkOK.replace('chkOK', 'txtDescuento3');
    var txtDescuento4 = chkOK.replace('chkOK', 'txtDescuento4');
    var lblPrecioSoles = txtDescuento.replace('txtDescuento', 'lblPrecioSoles');
    var lblPrecioDolares = txtDescuento.replace('txtDescuento', 'lblPrecioSoles');
    var hfFlagAplicaIgvPrecio = txtDescuento.replace('txtDescuento', 'hfFlagAplicaIgvPrecio');
    var chkFlagAplicaIgv = txtDescuento.replace('txtDescuento', 'chkAplicaIgv');
   
        

    var dcto = parseFloat(1 - (parseFloat(parseFloat(1 - (
                (1 - (parseFloat($(txtDescuento1).val()) / 100)) *
                (1 - (parseFloat(0) / 100)) *
                (1 - (parseFloat(0) / 100)) *
                (1 - (parseFloat(0) / 100))
                )))));


    if ($(chkOK).is(':checked')) {
        $(txtCantidad).prop('disabled', false);
        $(txtDescuento).prop('disabled', false);
//        $(txtPrecio).prop('disabled', true);
//        if (FlagAdministrador == 1)
//            $(txtPrecio).prop('disabled', false);

        //si el flag de aplica igv = 1
       
        var i = 0;
        if ($(txtPrecio).val() == "") {
            $(txtPrecio).select();
            i = 1;
        }

        if (i == 0 && $(txtCantidad).val() == "")
        { $(txtPrecio).select(); }

        var pre = 0;
        var po = 0;
        if ($('#MainContent_ddlMoneda').val() == 1) {
            pre = Number($(lblPrecioSoles).text());
            po = Number($(lblPrecioSoles).text());
        } else {
            pre = Number($(lblPrecioDolares).text());
            po = Number($(lblPrecioDolares).text());
        }

        $(chkFlagAplicaIgv).prop('checked', false);
        if ($(hfFlagAplicaIgvPrecio).val() == 1)
            {
                //pre = pre * (Number($('#MainContent_ddlIgv option:selected').text()) + 1); (los precios minoristas ya vienen por defecto con igv)
                $(chkFlagAplicaIgv).prop('checked', true);
                $(chkFlagAplicaIgv).prop('disabled', true); //no se permite modificar el check en minoristas

            }

        pre = pre * Number(dcto);
        pre = (((pre) * 1).toFixed(1)) /1;
        $(txtPrecio).val(pre.toFixed(2));

        $(hdnPrecio).val(po.toFixed(2));

//        $(txtCantidad).select();
//        if (FlagAdministrador == 1)
            $(txtPrecio).select();

        $(txtCantidad).prop('disabled', false);
        $(txtDescuento).prop('disabled', false);
        $(txtPrecio).prop('disabled', false);
    }
    else {
        $(txtCantidad).val('');
        $(txtDescuento).val('');
        $(txtPrecio).val('');
        $(txtCantidad).prop('disabled', true);
        $(txtDescuento).prop('disabled', true);
        $(txtPrecio).prop('disabled', true);
        $(chkFlagAplicaIgv).prop('checked', false);
    }


return true;
}
//CHECK ELEGIR ARTICULO PRECIO MAYORISTA
function F_ValidarCheckPrecioMayorista(ControlID){
    var cadena = 'Ingrese los sgtes. campos: '

    var chkOK = '#' + ControlID;
    var txtPrecio = chkOK.replace('chkOK', 'txtPrecio');
    var hdnPrecioMayorista = chkOK.replace('chkOK', 'hfPrecioMayoristaOrig');
    var txtCantidad = chkOK.replace('chkOK', 'txtCantidad');
    var txtDescuento = chkOK.replace('chkOK', 'txtDescuento');
    var txtDescuento1 = chkOK.replace('chkOK', 'txtDescuento1');
    var txtDescuento2 = chkOK.replace('chkOK', 'txtDescuento2');
    var txtDescuento3 = chkOK.replace('chkOK', 'txtDescuento3');
    var txtDescuento4 = chkOK.replace('chkOK', 'txtDescuento4');
    var lblPrecioMayoristaSoles = txtDescuento.replace('txtDescuento', 'lblPrecioMayoristaSoles');
    var lblPrecioMayoristaDolares = txtDescuento.replace('txtDescuento', 'lblPrecioMayoristaSoles');
    var hfFlagAplicaIgvPrecioMayorista = txtDescuento.replace('txtDescuento', 'hfFlagAplicaIgvPrecioMayorista');
    var chkFlagAplicaIgv = txtDescuento.replace('txtDescuento', 'chkAplicaIgv');
     var hfFlagBloqueoMayorista = txtDescuento.replace('txtDescuento', 'hfFlagBloqueoMayorista');

     if ($('#MainContent_chkMayorista').is(':checked') & $(hfFlagBloqueoMayorista).val()=='1')
     {
            alertify.log("PRODUCTO BLOQUEADO PARA LA VENTA MAYORISTA");
            $(chkOK).prop('checked',false)
            return false;
     }

    var dcto = parseFloat(1 - (parseFloat(parseFloat(1 - (
                (1 - (parseFloat($(txtDescuento1).val()) / 100)) *
                (1 - (parseFloat(0) / 100)) *
                (1 - (parseFloat(0) / 100)) *
                (1 - (parseFloat(0) / 100))
                )))));

    if ($(chkOK).is(':checked')) {
        $(txtCantidad).prop('disabled', false);
        $(txtDescuento).prop('disabled', false);
        $(txtPrecio).prop('disabled', false);
//        if (FlagAdministrador == 1)
//            $(txtPrecio).prop('disabled', false);
        $(chkFlagAplicaIgv).prop('disabled', false);
        var i = 0;
        if ($(txtPrecio).val() == "") {
            $(txtPrecio).select();
            i = 1;
        }

        if (i == 0 && $(txtCantidad).val() == "")
        { $(txtPrecio).select(); }

        var pre = 0;
        var po = 0;
        if ($('#MainContent_ddlMoneda').val() == 1) {
            pre = Number($(lblPrecioMayoristaSoles).text());
            po = Number($(lblPrecioMayoristaSoles).text());
        } else {
            pre = Number($(lblPrecioMayoristaDolares).text());
            po = Number($(lblPrecioMayoristaDolares).text());
        }

        $(chkFlagAplicaIgv).prop('checked', false);
        if ($(hfFlagAplicaIgvPrecioMayorista).val() == 1) //si el flag igv de mayorista viene 1, ya el precio viene con igv de la consulta, y este no se puede modificar.
            {
                //pre = pre * (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
                $(chkFlagAplicaIgv).prop('checked', true);
                $(chkFlagAplicaIgv).prop('disabled', true);
            }

        if ($('#MainContent_chkSi').is(':checked') == 1 & $(hfFlagAplicaIgvPrecioMayorista).val() == 0)
        {
            pre = pre * (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
        }

        pre = pre * Number(dcto);
        pre = (((pre) * 1).toFixed(1)) /1;
        $(txtPrecio).val(pre.toFixed(2));

        $(hdnPrecioMayorista).val(po.toFixed(2));

//        $(txtCantidad).select();
//        if (FlagAdministrador == 1)
            $(txtPrecio).select();

        $(txtCantidad).prop('disabled', false);
        $(txtDescuento).prop('disabled', false);
        $(txtPrecio).prop('disabled', false);

    }
    else {
        $(txtCantidad).val('');
        $(txtDescuento).val('');
        $(txtPrecio).val('');
        $(txtCantidad).prop('disabled', true);
        $(txtDescuento).prop('disabled', true);
        $(txtPrecio).prop('disabled', true);
        $(chkFlagAplicaIgv).prop('checked', false);
    }

return true;
}

//CHECK APLICAR IGV ARTICULO
function F_ValidarCheckAplicarIgv(ControlID, PrecioNuevo) {

    if ($('#MainContent_chkMinorista').prop('checked') == true)
        F_ValidarCheckAplicarIgvMinorista(ControlID, PrecioNuevo);

    if ($('#MainContent_chkMayorista').prop('checked') == true)
        F_ValidarCheckAplicarIgvMayorista(ControlID, PrecioNuevo);

    return true;
}
//CHECK APLICAR IGV ARTICULO PRECIO
function F_ValidarCheckAplicarIgvMinorista(ControlID, PrecioNuevo){
    var cadena = 'Ingrese los sgtes. campos: '

    var chkOK = '#' + ControlID;
    var txtPrecio = chkOK.replace('chkAplicaIgv', 'txtPrecio');
    var hdnPrecio = chkOK.replace('chkAplicaIgv', 'hfPrecioOrig');
    var txtCantidad = chkOK.replace('chkAplicaIgv', 'txtCantidad');
    var txtDescuento = chkOK.replace('chkAplicaIgv', 'txtDescuento');
    var txtDescuento1 = chkOK.replace('chkAplicaIgv', 'txtDescuento1');
    var txtDescuento2 = chkOK.replace('chkAplicaIgv', 'txtDescuento2');
    var txtDescuento3 = chkOK.replace('chkAplicaIgv', 'txtDescuento3');
    var txtDescuento4 = chkOK.replace('chkAplicaIgv', 'txtDescuento4');
    var lblPrecioSoles = txtDescuento.replace('txtDescuento', 'lblPrecioSoles');
    var lblPrecioDolares = txtDescuento.replace('txtDescuento', 'lblPrecioSoles');
    var hfFlagAplicaIgvPrecio = txtDescuento.replace('txtDescuento', 'hfFlagAplicaIgvPrecio');
    var chkFlagAplicaIgv = txtDescuento.replace('txtDescuento', 'chkAplicaIgv');
    var chkElegido = txtDescuento.replace('txtDescuento', 'chkOK');

    var dcto = parseFloat(1 - (parseFloat(parseFloat(1 - (
                (1 - (parseFloat($(txtDescuento1).val()) / 100)) *
                (1 - (parseFloat(0) / 100)) *
                (1 - (parseFloat(0) / 100)) *
                (1 - (parseFloat(0) / 100))
                )))));
    dcto = 1;

    if ($(chkElegido).prop('checked') == false)
    {
        $(chkOK).prop('checked', false);
        return false;
    }

        $(txtCantidad).prop('disabled', false);
        $(txtDescuento).prop('disabled', false);
        $(chkFlagAplicaIgv).prop('disabled', false);
        var i = 0;
        if ($(txtPrecio).val() == "") {
//            $(txtPrecio).select();
            i = 1;
        }

//        if (i == 0 && $(txtCantidad).val() == "")
//        { $(txtPrecio).select(); }

        var pre = 0;
        var po = 0;
        if ($('#MainContent_ddlMoneda').val() == 1) {
            pre = Number($(lblPrecioSoles).text());
            po = Number($(lblPrecioSoles).text());
        } else {
            pre = Number($(lblPrecioDolares).text());
            po = Number($(lblPrecioDolares).text());
        }

        if (!isNaN(PrecioNuevo))
            pre = Number(PrecioNuevo);

        if ($(chkOK).is(':checked') == 1)
            {
                pre = pre * (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
            }

        pre = pre * Number(dcto);
        pre = (((pre) * 1).toFixed(1)) /1;
        $(txtPrecio).val(pre.toFixed(2));

        $(hdnPrecio).val(po.toFixed(2));

            //$(txtPrecio).select();


return true;
}
//CHECK APLICAR IGV ARTICULO PRECIO MAYORISTA
function F_ValidarCheckAplicarIgvMayorista(ControlID, PrecioNuevo){
    var cadena = 'Ingrese los sgtes. campos: '

    var chkOK = '#' + ControlID;
    var txtPrecio = chkOK.replace('chkAplicaIgv', 'txtPrecio');
    var hdnPrecioMayorista = chkOK.replace('chkAplicaIgv', 'hfPrecioMayoristaOrig');
    var txtCantidad = chkOK.replace('chkAplicaIgv', 'txtCantidad');
    var txtDescuento = chkOK.replace('chkAplicaIgv', 'txtDescuento');
    var txtDescuento1 = chkOK.replace('chkAplicaIgv', 'txtDescuento1');
    var txtDescuento2 = chkOK.replace('chkAplicaIgv', 'txtDescuento2');
    var txtDescuento3 = chkOK.replace('chkAplicaIgv', 'txtDescuento3');
    var txtDescuento4 = chkOK.replace('chkAplicaIgv', 'txtDescuento4');
    var lblPrecioMayoristaSoles = txtDescuento.replace('txtDescuento', 'lblPrecioMayoristaSoles');
    var lblPrecioMayoristaDolares = txtDescuento.replace('txtDescuento', 'lblPrecioMayoristaSoles');
    var hfFlagAplicaIgvPrecioMayorista = txtDescuento.replace('txtDescuento', 'hfFlagAplicaIgvPrecioMayorista');
    var chkFlagAplicaIgv = txtDescuento.replace('txtDescuento', 'chkAplicaIgv');
    var chkElegido = txtDescuento.replace('txtDescuento', 'chkOK');

    var dcto = parseFloat(1 - (parseFloat(parseFloat(1 - (
                (1 - (parseFloat($(txtDescuento1).val()) / 100)) *
                (1 - (parseFloat(0) / 100)) *
                (1 - (parseFloat(0) / 100)) *
                (1 - (parseFloat(0) / 100))
                )))));
    dcto = 1;

    if ($(chkElegido).prop('checked') == false)
    {
        $(chkOK).prop('checked', false);
        return false;
    }

        $(txtCantidad).prop('disabled', false);
        $(txtDescuento).prop('disabled', false);
        $(chkFlagAplicaIgv).prop('disabled', false);
        var i = 0;
        if ($(txtPrecio).val() == "") {
//            $(txtPrecio).select();
            i = 1;
        }

        if (i == 0 && $(txtCantidad).val() == "")
//        { $(txtPrecio).select(); }

        var pre = 0;
        var po = 0;
        if ($('#MainContent_ddlMoneda').val() == 1) {
            pre = Number($(lblPrecioMayoristaSoles).text());
            po = Number($(lblPrecioMayoristaSoles).text());
        } else {
            pre = Number($(lblPrecioMayoristaDolares).text());
            po = Number($(lblPrecioMayoristaDolares).text());
        }

        if (!isNaN(PrecioNuevo))
            pre = Number(PrecioNuevo);

        if ($('#MainContent_chkSi').prop('checked') == true & $(hfFlagAplicaIgvPrecioMayorista).val() == 0 & isNaN(PrecioNuevo))
            {
                pre = pre * (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
            }

        pre = pre * Number(dcto);
        pre = (((pre) * 1).toFixed(1)) /1;
        $(txtPrecio).val(pre.toFixed(2));

        $(hdnPrecioMayorista).val(po.toFixed(2));

//            $(txtPrecio).select();

return true;
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

    var lblPrecioMayoristaSoles = dsc.replace('txtDescuento1', 'lblPrecioSoles');
    var lblPrecioMayoristaDolares = dsc.replace('txtDescuento1', 'lblPrecioMayoristaSoles');
    var hfFlagAplicaIgvPrecioMayorista = dsc.replace('txtDescuento1', 'hfFlagAplicaIgvPrecioMayorista');
    var txtDescuento1 = dsc.replace('txtDescuento1', 'txtDescuento1');
    var txtPrecio = dsc.replace('txtDescuento1', 'txtPrecio');
    var lblCostoSoles = dsc.replace('txtDescuento1', 'lblCostoSoles');
    var lblMargenMinorista = dsc.replace('txtDescuento1', 'lblMargenMinoristaSoles');
    var lblMargenMayorista = dsc.replace('txtDescuento1', 'lblMargenMayoristaSoles');
    
    var dcto = parseFloat(1 - (parseFloat(parseFloat(1 - (
                (1 - (parseFloat($(dsc).val()) / 100)) *
                (1 - (parseFloat(0) / 100)) *
                (1 - (parseFloat(0) / 100)) *
                (1 - (parseFloat(0) / 100))
                )))));

    var pre = 0;
    
    if ($('#MainContent_chkMinorista').prop('checked') == true)
        pre = Number($(lblPrecioMayoristaSoles).text());

    if ($('#MainContent_chkMayorista').prop('checked') == true)
        pre = Number($(lblPrecioMayoristaDolares).text());

    if ($('#MainContent_chkMinorista').prop('checked') == true)
    { }
    else
    {
        if ($(hfFlagAplicaIgvPrecioMayorista).val() == 0 & $('#MainContent_chkSi').prop('checked') == true)
        {
            pre = pre * (Number($('#MainContent_ddlIgv option:selected').text()) + 1)
        }
        else 
        {}          
    }



//        if ($('#MainContent_chkSi').is(':checked') || $(hfFlagAplicaIgvPrecioMayorista).val() == 1)
//        {
//            pre = pre * (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
//        }

    pre = pre * dcto;
    pre = (((pre) * 1).toFixed(1)) /1;
    $(txtPrecio).val(pre.toFixed(2));


    //calculo el margen
    var PrecioMargen = pre;
    var igvMargen = (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
    if ($('#MainContent_chkMinorista').prop('checked') == true)
    {
        igvMargen = (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
    }
    else
    {
        if ($(hfFlagAplicaIgvPrecioMayorista).val() == 1 | $('#MainContent_chkSi').prop('checked') == true)
        {
            igvMargen = (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
        }
        else 
        {
            igvMargen = 1;
        }          
    }
        
    PrecioMargen = PrecioMargen / igvMargen;

    var Margen = F_Margen(Number($(lblCostoSoles).text()), PrecioMargen, 1);
    if ($('#MainContent_chkMinorista').prop('checked') == true)
    $(lblMargenMinorista).text(Margen.toString() + '%');
    else
    $(lblMargenMayorista).text(Margen.toString() + '%');

    return false;
}

function F_ValidarPrecioGrilla(ControlID) {
    var txtPrecio = '#' + ControlID;
    if ($(txtPrecio).val() == '')
        return false;


    var PrecioNuevo = Number($(txtPrecio).val());
    var txtPrecioOriginal = txtPrecio.replace('txtPrecio', 'hfPrecioMinorista');
    if ($('#MainContent_chkMinorista').prop('checked') == false)
        txtPrecioOriginal = txtPrecio.replace('txtPrecio', 'hfPrecioMayorista');
    var PrecioOriginal = Number($(txtPrecioOriginal).val());

        if (FlagAdministrador != 1) {        
            if (PrecioNuevo < PrecioOriginal) {
                $(txtPrecio).val(PrecioOriginal);
                alertify.log('LOS PRECIOS NO PUEDEN SER DISMINUIDOS');
                return false; }
            return false; }

    //calcula el descuento
    var txtDescuento = txtPrecio.replace('txtPrecio', 'txtDescuento1');
    var lblCostoSoles = txtPrecio.replace('txtPrecio', 'lblCostoSoles');
    var hfFlagAplicaIgvPrecioMayorista = txtPrecio.replace('txtPrecio', 'hfFlagAplicaIgvPrecioMayorista');
    var lblMargenMinorista = txtPrecio.replace('txtPrecio', 'lblMargenMinoristaSoles');
    var lblMargenMayorista = txtPrecio.replace('txtPrecio', 'lblMargenMayoristaSoles');

    var pre = PrecioNuevo;

    if ($('#MainContent_chkSi').is(':checked') || $(hfFlagAplicaIgvPrecioMayorista).val() == 1)
    {
        pre = pre * (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
    }


    //calculo el margen
    var PrecioMargen = PrecioNuevo;
    var igvMargen = (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
    var igvPrecioOriginal = (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
    if ($(hfFlagAplicaIgvPrecioMayorista).val() == 0 & $('#MainContent_chkMayorista').prop('checked') == true) igvPrecioOriginal = 1;
    if ($('#MainContent_chkMinorista').prop('checked') == true)
    {
        igvMargen = (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
    }
    else
    {
        if ($(hfFlagAplicaIgvPrecioMayorista).val() == 1 | $('#MainContent_chkSi').prop('checked') == true)
        {
            igvMargen = (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
        }
        else 
        {
            igvMargen = 1;
        }          
    }
        
    PrecioMargen = PrecioMargen / igvMargen;

    var Margen = F_Margen(Number($(lblCostoSoles).text()), PrecioMargen, 1);
    if ($('#MainContent_chkMinorista').prop('checked') == true)
    $(lblMargenMinorista).text(Margen.toString() + '%');
    else
    $(lblMargenMayorista).text(Margen.toString() + '%');

    //Descuento txtDescuento1
     $(txtDescuento).val((((PrecioOriginal/igvPrecioOriginal)-PrecioMargen)/(PrecioOriginal/igvPrecioOriginal) * 100).toFixed(2));

    var dsc = '#' + ControlID;
    var IDPrincipal = ControlID.replace('txtPrecio', 'chkAplicaIgv');
    F_ValidarCheckAplicarIgv(IDPrincipal, PrecioNuevo);

    return false;
}

function F_Margen(Costo, Precio, Flag) {
    return ((Precio-Costo)/Costo*100).toFixed(2);
}

function F_FormaPago(CodFormaPago) {

    var arg;
    try {
        switch (CodFormaPago) {
            case "1":
            case "6":
            case "12":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 0));
                break;

            case "4":
                $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(), 30));
                break;

            case "3":
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
        var txtPrecio = '';
        var hfCodSuperior = '';
        var cantidadBus = 0;
        var cantidadAgr = 0;
        var codSuperior = '';
        var cadenavalstock = "No existe stock por dependencia de padre, en los siguientes productos:";
        var stockchala = 0;
        var x = 0;

        $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
            chkSi = '#' + this.id;
            txtPrecio = chkSi.replace('chkOK', 'txtPrecio');
            txtcantidad_grilla = chkSi.replace('chkOK', 'txtCantidad');
            lblcodproducto_grilla = chkSi.replace('chkOK', 'lblcodproducto');

            if ($(chkSi).is(':checked')) {
                if ($(txtPrecio).val() == '')
                    cadena = cadena + "\n" + "Precio para el Codigo " + $(lblcodproducto_grilla).val();

                if ($(txtcantidad_grilla).val() == '')
                    cadena = cadena + "\n" + "Cantidad para el Codigo " + $(lblcodproducto_grilla).val();

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
                lblcodproducto_grilla = chkSi.replace('chkOK', 'hfCodProducto');
                cantidadAgr = Number($(chkSi.replace('chkOK', 'txtCantidad')).val());
                codSuperior = $(chkSi.replace('chkOK', 'hfCodSuperior')).val();
                stockchala = $(chkSi.replace('chkOK', 'lblChala1')).val();

                if ($(chkSi).is(':checked')) {
                    $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                        chkDel = '#' + this.id;
                        hfcodarticulodetalle_grilla = chkDel.replace('chkEliminar', 'hfcodarticulo');
                        lbldscproducto_grilla = chkDel.replace('chkEliminar', 'txtDescripcion');
                        cantidadBus = Number($(chkDel.replace('chkEliminar', 'txtCantidad')).val());

                        if ($(lblcodproducto_grilla).val() == $(hfcodarticulodetalle_grilla).val()) {
                            cadena = cadena + "\n" + $(lbldscproducto_grilla).val();
                        }

                        if (codSuperior == $(hfcodarticulodetalle_grilla).val()) {
                            var stockmi = cantidadAgr + cantidadBus;
                            if (stockmi < stockchala) {
                                cadenavalstock = cadenavalstock + "\n" + $(lbldscproducto_grilla).val();
                            }
                        }

                    });
                }
            });
        }

        if (cadena != "Los sgtes. productos se encuentran agregados : ") {
            alertify.log(cadena);
            return false;
        } else if (cadenavalstock != "No existe stock por dependencia de padre, en los siguientes productos:") {
            alertify.log(cadenavalstock);
            return false;
        } else {
            return true;
        }
    }
    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
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
    var chkAplicaIgv = ''
    var hfCodigoProducto = ''

    var lblDescuento1 = '';
    var lblDescuento2 = '';
    var lblDescuento3 = '';

    var hfFlagAplicaIgvPrecioMayorista = '';

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
    chkAplicaIgv = txtCantidad.replace('txtCantidad', 'chkAplicaIgv');
    hfCodigoProducto = txtCantidad.replace('txtCantidad', 'hfCodigoProducto');

    hfFlagAplicaIgvPrecioMayorista = txtCantidad.replace('txtCantidad', 'hfFlagAplicaIgvPrecioMayorista');
    
    var ValorFlagIncluyeIgvMayorista = 0;

    if ($(hfFlagAplicaIgvPrecioMayorista).val() == 0 & $('#MainContent_chkMayorista').is(":checked"))
        var ValorFlagIncluyeIgvMayorista = 1;

    hdPrecioOrig = txtCantidad.replace('txtCantidad', 'hfPrecioMayorista');
    if ($("#MainContent_chkMinorista").prop("checked") == true)
        hdPrecioOrig = txtCantidad.replace('txtCantidad', 'hfPrecioMayorista');

    lblDescuento1 = txtCantidad.replace('txtCantidad', 'lblDescuento1');
    lblDescuento2 = txtCantidad.replace('txtCantidad', 'lblDescuento2');
    lblDescuento3 = txtCantidad.replace('txtCantidad', 'lblDescuento3');

    var imp = 0;
    var precio = Number($(txtPrecio).val());
    var d1, d2, d3, d4;
    imp = precio * Number($(txtCantidad).val());
    var agregado = false;
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
            html += '<tr>';
            html += '<td align="center">';
            html += '<span class="chkDelete"><input id="MainContent_grvDetalleArticulo_chkEliminar_' + c +'" type="checkbox" name="ctl00$MainContent$grvDetalleArticulo$ctl24$chkEliminar"></span>';
            html += '</td><td align="center">';
            html += '<span id="MainContent_grvDetalleArticulo_lblNumId_' + c +'" class="numero">1</span>';
            html += '</td><td align="right">';
            html += '<span id="MainContent_grvDetalleArticulo_lblNroItem_' + c +'">1</span>';
            html += '</td><td class="novisible" align="right">';
            html += '<span id="MainContent_grvDetalleArticulo_lblcoddetalle_' + c +'" class="detallesart">0</span>';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfcodarticulo" id="MainContent_grvDetalleArticulo_hfcodarticulo_' + c + '" value="' + $(lblcodproducto_grilla).val() + '">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCodDetalle" id="MainContent_grvDetalleArticulo_hfCodDetalle_' + c +'" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfPrecio" id="MainContent_grvDetalleArticulo_hfPrecio_' + c + '" value="' + precio + '">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl02$hfPrecio" id="MainContent_grvDetalleArticulo_hfPrecioOriginal_' + c + '" value="' + $(hdPrecioOrig).val() + '">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCantidad" id="MainContent_grvDetalleArticulo_hfCantidad_' + c + '" value="' + $(txtCantidad).val() + '">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfDescripcion" id="MainContent_grvDetalleArticulo_hfDescripcion_' + c + '" value="">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCodTipoDoc" id="MainContent_grvDetalleArticulo_hfCodTipoDoc_' + c +'" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCodUnidMed" id="MainContent_grvDetalleArticulo_hfCodUnidMed_' + c +'" value="6">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCostoArt" id="MainContent_grvDetalleArticulo_hfCostoArt_' + c +'" value="0.000000">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCodSuperior" id="MainContent_grvDetalleArticulo_hfCodSuperior_' + c +'" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCodTipoDocDet" id="MainContent_grvDetalleArticulo_hfCodTipoDocDet_' + c +'" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfOC" id="MainContent_grvDetalleArticulo_hfOC_' + c +'" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hdnAcuentaNv" id="MainContent_grvDetalleArticulo_hdnAcuentaNv_' + c +'" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfAcuenta" id="MainContent_grvDetalleArticulo_hfAcuenta_' + c + '" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfFlagIncluyeIgv" id="MainContent_grvDetalleArticulo_hfFlagIncluyeIgv_' + c + '" value="' + ValorFlagIncluyeIgvMayorista +'">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfUltimoPrecio" id="MainContent_grvDetalleArticulo_hfFlagIncluyeIgv_' + c + '" value="0">';
            html += '</td><td align="left" id="MainContent_grvDetalleArticulo_lblCodigoProducto_' + c + '" ></td><td align="center">';
            html += '<input name="ctl00$MainContent$grvDetalleArticulo$ctl24$txtDescripcion" type="text" value="" id="MainContent_grvDetalleArticulo_txtDescripcion_' + c + '" class="ccsestilo" onchange="F_ActualizarDescripcionNP(this.id); return false;" style="color: blue; font-family: Arial; font-weight: bold; width: 480px; background: rgb(255, 255, 224);">';
            html += '</td><td align="center">';
            html += '<input name="ctl00$MainContent$grvDetalleArticulo$ctl24$txtCantidad" type="text" value="' + $(txtCantidad).val() + '" id="MainContent_grvDetalleArticulo_txtCantidad_' + c + '" class="ccsestilo tcant" onchange="F_ActualizarCantidad(this.id); return false;" style="color: blue; font-family: Arial; font-weight: bold; width: 75px; text-align: center; background: rgb(255, 255, 224);">';
            html += '</td><td align="left">' + $(lblUM).text() + '</td><td align="center">';
            html += '<input name="ctl00$MainContent$grvDetalleArticulo$ctl24$txtPrecio" type="text" value="' + precio.toFixed(2) + '" id="MainContent_grvDetalleArticulo_txtPrecio_' + c + '" class="ccsestilo tprecio" onchange="F_ActualizarCantidad(this.id); return false;" style="color: blue; font-family: Arial; font-weight: bold; width: 75px; text-align: center; background: rgb(255, 255, 224);">';
            html += '</td><td align="right">';
            html += '<span id="MainContent_grvDetalleArticulo_lblimporte_' + c + '" class="csimp">' + imp.toFixed(2) + '</span>';
            html += '</td>';
            html += '</tr>';

        UltimoRegistro++;

        $('#MainContent_grvDetalleArticulo tr:last').after(html);

        $('#MainContent_grvDetalleArticulo_hfDescripcion_' + c).val($(lblProducto).text());
        $('#MainContent_grvDetalleArticulo_txtDescripcion_' + c).val($(lblProducto).text());
        $('#MainContent_grvDetalleArticulo_lblCodigoProducto_' + c).text($(hfCodigoProducto).val());

        var importe = Number($("#MainContent_txtTotal").val());
        importe += Number(imp.toFixed(2));
        $("#MainContent_txtTotal").val(importe.toFixed(2));
        numerar();
        agregado = true;
    }
    recalcularmontos();

    if (agregado==true)
        alertify.log('PRODUCTO(S) AGREGADO(S)');
}

function F_AgregarTemporal2(Arreglo, FlagIncluyeIgv) {
    if (FlagIncluyeIgv == 1 | FlagIncluyeIgv == 2)
        FlagIncluyeIgv = 1;
    else 
        FlagIncluyeIgv = 0;

        var dd = $('.numero');

        var f = $(dd[0]).text();

        if (f == '') {
            var fil = $(dd[0]).parent().parent();
            $(fil).remove();
        }

        //dd = $('.detallesart');
        dd = $('.numero');
        UltimoRegistro = 0;
        

    $.each(Arreglo, function (index, item) {



        var c = UltimoRegistro; //  Number(dd.length);
        var html = '<tr>';
            html += '<tr>';
            html += '<td align="center">';
            html += '<span class="chkDelete"><input id="MainContent_grvDetalleArticulo_chkEliminar_' + c +'" type="checkbox" name="ctl00$MainContent$grvDetalleArticulo$ctl24$chkEliminar"></span>';
            html += '</td><td align="center">';
            html += '<span id="MainContent_grvDetalleArticulo_lblNumId_' + c +'" class="numero">1</span>';
            html += '</td><td align="right">';
            html += '<span id="MainContent_grvDetalleArticulo_lblNroItem_' + c +'">1</span>';
            html += '</td><td class="novisible" align="right">';
            html += '<span id="MainContent_grvDetalleArticulo_lblcoddetalle_' + c +'" class="detallesart">0</span>';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfcodarticulo" id="MainContent_grvDetalleArticulo_hfcodarticulo_' + c + '" value="' + item.CodArticulo + '">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCodDetalle" id="MainContent_grvDetalleArticulo_hfCodDetalle_' + c +'" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfPrecio" id="MainContent_grvDetalleArticulo_hfPrecio_' + c + '" value="' + item.Precio + '">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl02$hfPrecio" id="MainContent_grvDetalleArticulo_hfPrecioOriginal_' + c + '" value="' + item.Precio + '">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCantidad" id="MainContent_grvDetalleArticulo_hfCantidad_' + c + '" value="' + item.Cantidad + '">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfDescripcion" id="MainContent_grvDetalleArticulo_hfDescripcion_' + c + '" value="">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCodTipoDoc" id="MainContent_grvDetalleArticulo_hfCodTipoDoc_' + c +'" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCodUnidMed" id="MainContent_grvDetalleArticulo_hfCodUnidMed_' + c +'" value="' + item.CodUndMedida + '">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCostoArt" id="MainContent_grvDetalleArticulo_hfCostoArt_' + c +'" value="0.000000">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCodSuperior" id="MainContent_grvDetalleArticulo_hfCodSuperior_' + c +'" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfCodTipoDocDet" id="MainContent_grvDetalleArticulo_hfCodTipoDocDet_' + c +'" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfOC" id="MainContent_grvDetalleArticulo_hfOC_' + c +'" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hdnAcuentaNv" id="MainContent_grvDetalleArticulo_hdnAcuentaNv_' + c +'" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfAcuenta" id="MainContent_grvDetalleArticulo_hfAcuenta_' + c + '" value="0">';
            html += '<input type="hidden" name="ctl00$MainContent$grvDetalleArticulo$ctl24$hfFlagIncluyeIgv" id="MainContent_grvDetalleArticulo_hfFlagIncluyeIgv_' + c + '" value="' + FlagIncluyeIgv +'">';
            html += '</td><td align="left" id="MainContent_grvDetalleArticulo_lblCodigoProducto_' + c + '" >' + item.CodigoProducto + '</td><td align="center">';
            html += '<input name="ctl00$MainContent$grvDetalleArticulo$ctl24$txtDescripcion" type="text" value="" id="MainContent_grvDetalleArticulo_txtDescripcion_' + c + '" class="ccsestilo" onchange="F_ActualizarDescripcionNP(this.id); return false;" style="color: blue; font-family: Arial; font-weight: bold; width: 480px; background: rgb(255, 255, 224);">';
            html += '</td><td align="center">';
            html += '<input name="ctl00$MainContent$grvDetalleArticulo$ctl24$txtCantidad" type="text" value="' + item.Cantidad + '" id="MainContent_grvDetalleArticulo_txtCantidad_' + c + '" class="ccsestilo tcant" onchange="F_ActualizarCantidad(this.id); return false;" style="color: blue; font-family: Arial; font-weight: bold; width: 75px; text-align: center; background: rgb(255, 255, 224);">';
            html += '</td><td align="left">' + item.UM  + '</td><td align="center">';
            html += '<input name="ctl00$MainContent$grvDetalleArticulo$ctl24$txtPrecio" type="text" value="' + item.Precio.toFixed(2) + '" id="MainContent_grvDetalleArticulo_txtPrecio_' + c + '" class="ccsestilo tprecio" onchange="F_ActualizarCantidad(this.id); return false;" style="color: blue; font-family: Arial; font-weight: bold; width: 75px; text-align: center; background: rgb(255, 255, 224);">';
            html += '</td><td align="right">';
            html += '<span id="MainContent_grvDetalleArticulo_lblimporte_' + c + '" class="csimp">' + item.Importe.toFixed(2) + '</span>';
            html += '</td>';
            html += '</tr>';

        UltimoRegistro++;

        $('#MainContent_grvDetalleArticulo tr:last').after(html);

        $('#MainContent_grvDetalleArticulo_hfDescripcion_' + c).val(item.Descripcion);
        $('#MainContent_grvDetalleArticulo_txtDescripcion_' + c).val(item.Descripcion);

//        var importe = Number($("#MainContent_txtTotal").val());
//        importe += Number(item.Importe.toFixed(2));
//        $("#MainContent_txtTotal").val(importe.toFixed(2));
        numerar();
        agregado = true;

    });




    recalcularmontos();

}

function recalcularmontos() {
    var tasaigv = parseFloat($("#MainContent_txtValIgv").val());
    tasaigv = tasaigv == 0 || tasaigv == undefined || isNaN(tasaigv) ? parseFloat($("#MainContent_ddlIgv option:selected").text()) : tasaigv;
    var importe = Number($("#MainContent_txtTotal").val());
    var subtotal = importe / (1 + tasaigv);
    var igv = importe - subtotal;
    $("#MainContent_txtIgv").val(igv.toFixed(2));
    $("#MainContent_txtSubTotal").val(subtotal.toFixed(2));
}

function F_LimpiarGrillaConsulta() {
    var chkSi = '';
    var txtPrecio = '';
    var txtCantidad = '';

    $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
        chkSi = '#' + this.id;
        txtPrecio = chkSi.replace('chkOK', 'txtPrecio');
        txtCantidad = chkSi.replace('chkOK', 'txtCantidad');
        $(txtCantidad).prop('disabled', true);
        $(txtPrecio).val('');
        $(txtCantidad).val('');
        $(chkSi).prop('checked', false);
    });
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
    recalcularmontos();
}

function F_EliminarTemporal() {

    try {
        var chkSi;
        var importe = Number($("#MainContent_txtTotal").val());
        var arrDetalle = new Array();

        $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
            chkSi = this;
            var id = "#" + this.id;

            if ($(chkSi).is(':checked')) {

                //arma arreglo para eliminacion en temporal de base de datos
                var objDetalle = { CodDetalle: $(id.replace("chkEliminar", "hfCodDetalle")).val() };
                arrDetalle.push(objDetalle);


                var imp = Number($(id.replace("chkEliminar", "lblimporte")).text());
                importe -= imp;
                var trr = $(chkSi).parent().parent().parent();
                $(trr).remove();
            };
        });

        //eliminacion de base de datos
        MostrarEspera(true);
        var objParams = {
            Filtro_CodDocumentoVenta: $("#hfCodigoTemporal").val(),
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
        };
        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        //eliminacion del temporal en base de datos
        F_NotaPedidoDet_EliminarTemporal_NET(arg, function (result) {
            var result = JSON.parse(result);

            MostrarEspera(false);

            var str_resultado_operacion = result.int_resultado_operacion;
            var str_mensaje_operacion = result.str_mensaje_operacion;

            if (str_resultado_operacion == "1") {

                $("#MainContent_txtTotal").val(importe.toFixed(2));
                recalcularmontos();
                numerar();
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

        if ($(Cuerpo + 'txtCliente').val() == '' && $('#hfCodCtaCte').val() == 0)
            Cadena = Cadena + '<p></p>' + 'Cliente';

        if ($(Cuerpo + 'lblTC').text() == '0')
            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtNumero').val() == '')
            Cadena = Cadena + '<p></p>' + 'Numero de Proforma';

        if ($(Cuerpo + 'txtEmision').val() == '')
            Cadena = Cadena + '<p></p>' + 'Fecha de Emision';

        if ($(Cuerpo + 'ddlFormaPago').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Condicion de Pago';    

        if ($('#MainContent_ddlVendedorComision').val() == null)
            Cadena = Cadena + '<p></p>' + 'Vendedor';

        if ($(Cuerpo + 'chkGuia').is(':checked') && $(Cuerpo + 'txtNumeroGuia').val() == '')
            Cadena = Cadena + '<p></p>' + 'Numero de Guia';

        if ($(Cuerpo + 'chkGuia').is(':checked') && $(Cuerpo + 'txtFechaTraslado').val() == '')
            Cadena = Cadena + '<p></p>' + 'Fecha de Traslado';

        if ($(Cuerpo + 'chkGuia').is(':checked') && $(Cuerpo + 'txtDestino').val() == '')
            Cadena = Cadena + '<p></p>' + 'Destino';

        if ($(Cuerpo + 'chkGuia').is(':checked') && $('#hfCodTransportista').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Transportista';
            
        if ($('#hfCodCtaCte').val() == 0 && $('#hfCodDistrito').val() == 0)
            Cadena = Cadena + '<p></p>' + 'Distrito';

        if ($('#hfCodCtaCte').val() == 0 && $(Cuerpo + 'txtDireccion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Direccion';

        if ($(Cuerpo + 'txtTotal').val() == '0.00')
            Cadena = Cadena + '<p></p>' + 'No ha ingresado ningun producto';
                
        if (Cadena != 'Ingresar los sgtes. Datos:') {
            alertify.log(Cadena);
            return false;
        }
        return true;
    }
    catch (e) {
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_GrabarDocumento(vistaprevia) {
    try {
        var FlagGuia = 0;
        var FlagRetencion = 0;
        var FlagIgv = 1;
        var FlagNV = 0;
        var Contenedor = '#MainContent_';
        var Index = $('#MainContent_txtCliente').val().indexOf('-');
        var RazonSocial = $('#MainContent_txtCliente').val();
        var hfCodTipoDoc = '';
        var chkSi = '';
        var Observacion = 'LOS PRECIOS NO INCLUYEN IGV';
        var FlagIncluyeIgv = 0;

            if (($('#MainContent_chkMayorista').prop("checked") == false &
                $('#MainContent_chkMinorista').prop("checked") == false & 
                $('#MainContent_chkSi').prop("checked") == false 
                & $('#MainContent_chkNo').prop("checked") == false) 
                |
                ($('#MainContent_chkMayorista').prop("checked") == true &
                $('#MainContent_chkSi').prop("checked") == false 
                & $('#MainContent_chkNo').prop("checked") == false
                )
                ) {
                alertify.log("DEBE SELECCIONAR EL TIPO DE PRECIOS, MAYORISTA O MINORISTA, APLICA IGV O NO");
                return false;
                }

        MostrarEspera(true);

        if ($('#hfCodCtaCte').val() != 0) {
            var Index = $('#MainContent_txtCliente').val().indexOf('-');
            if (Index >= 0)
                RazonSocial = RazonSocial.substr(RazonSocial.length - (RazonSocial.length - (Index + 2)));
        }

        if ($(Contenedor + 'chkGuia').is(':checked'))
            FlagGuia = 1;

        if ($(Contenedor + 'chkRetencion').is(':checked'))
            FlagRetencion = 1;

        if ($('#MainContent_chkMinorista').prop('checked') == true | $('#MainContent_chkSi').prop('checked') == true) 
            Observacion = 'LOS PRECIOS INCLUYEN IGV';

        if ($('#MainContent_chkSi').prop('checked') == true) //Mayorista - Incluye Igv
            FlagIncluyeIgv = 1;

        if ($('#MainContent_chkNo').prop('checked') == true) //Mayorista - No Incluye Igv
            FlagIncluyeIgv = 2;

        if ($('#MainContent_chkMinorista').prop('checked') == true) //Minorista
            FlagIncluyeIgv = 3;

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        var chkSi = '';
        var lblcodproducto_grilla = '';
        var txtDescripcion = '';
        var txtPrecio = '';
        var txtCantidad = '';
        var hfcodunidadventa = '';
        var hfcoddetalle = '';
        var lblAcuenta = '';
        var hfCostoArt = '';
        var hfCodTipoDocDet = '';
        var hfOc = '';
        var hfAcuentaNv = '';
        var hfAcuenta = '';
        var lblimporte = '';
        var lblNroItem = '';
        var arrDetalle = new Array();

        $('.detallesart').each(function () {
            chkSi = '#' + this.id;
            lblcodproducto_grilla = chkSi.replace('lblcoddetalle', 'hfcodarticulo');
            txtDescripcion = chkSi.replace('lblcoddetalle', 'txtDescripcion');
            txtPrecio = chkSi.replace('lblcoddetalle', 'txtPrecio');
            txtCantidad = chkSi.replace('lblcoddetalle', 'txtCantidad');
            hfcodunidadventa = chkSi.replace('lblcoddetalle', 'hfCodUnidMed');
            hfcoddetalle = chkSi.replace('lblcoddetalle', 'hfCodDetalle');
            lblAcuenta = chkSi.replace('lblcoddetalle', 'lblAcuenta');
            hfCodTipoDoc = chkSi.replace('lblcoddetalle', 'hfCodTipoDoc');
            hfCostoArt = chkSi.replace('lblcoddetalle', 'hfCostoArt');
            hfCodTipoDocDet = chkSi.replace('lblcoddetalle', 'hfCodTipoDocDet');
            hfOc = chkSi.replace('lblcoddetalle', 'hfOC');
            hfAcuentaNv = chkSi.replace('lblcoddetalle', 'hdnAcuentaNv');
            hfAcuenta = chkSi.replace('lblcoddetalle', 'hfAcuenta');
            lblimporte = chkSi.replace('lblcoddetalle', 'lblimporte');
            lblNroItem = chkSi.replace('lblcoddetalle', 'lblNroItem');

            var objDetalle = {
                CodArticulo: $(lblcodproducto_grilla).val(),
                Descripcion: $(txtDescripcion).val().replace("&", "&amp;"),
                Cantidad: $(txtCantidad).val(),
                Precio: $(txtPrecio).val() / tasaigv,
                CodUm: $(hfcodunidadventa).val(),
                CodDetalle: $(hfcoddetalle).val(),
                Acuenta: $(hfAcuenta).val(),
                AcuentaNv: $(hfAcuentaNv).val(),
                CodTipoDoc: $(hfCodTipoDoc).val(),
                Costo: $(hfCostoArt).val(),
                CodTipoDocDetalle: $(hfCodTipoDocDet).val(),
                Importe: $(lblimporte).text() / tasaigv,
                NroItem: $(lblNroItem).text(),
                Oc: $(hfOc).val()
            };

            arrDetalle.push(objDetalle);
        });

        var objParams = {
            Filtro_CodDocumentoVenta: Number($('#hfCodDocumentoVenta').val()),
            Filtro_CodEmpresa: 1,
            Filtro_CodSede: 1,
            Filtro_CodTipoDoc: 16,
            Filtro_SerieDoc: $("#MainContent_ddlSerie option:selected").text(),
            Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
            Filtro_CodCliente: $('#hfCodCtaCte').val(),
            Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
            Filtro_Igv: $(Contenedor + 'txtIgv').val(),
            Filtro_Total: $(Contenedor + 'txtTotal').val(),
            Filtro_CodTraslado: $('#hfCodTraslado').val(),
            Filtro_CodProforma: $('#hfCodProforma').val(),
            Filtro_FlagGuia: FlagGuia,
            Filtro_SerieGuia: $("#MainContent_ddlSerieGuia option:selected").text(),
            Filtro_NumeroGuia: $(Contenedor + 'txtNumeroGuia').val(),
            Filtro_FechaTraslado: $(Contenedor + 'txtFechaTraslado').val(),
            Filtro_CodTipoCliente: 2,
            Filtro_CodClaseCliente: 1,
            Filtro_CodDepartamento: $('#hfCodDepartamento').val(),
            Filtro_CodProvincia: $('#hfCodProvincia').val(),
            Filtro_CodDistrito: $('#hfCodDistrito').val(),
            Filtro_ApePaterno: '',
            Filtro_ApeMaterno: '',
            Filtro_Nombres: '',
            Filtro_RazonSocial: RazonSocial,
            Filtro_NroDni: '',
            Filtro_NroRuc: $(Contenedor + 'txtNroRuc').val(),
            Filtro_CodDireccion: $('#MainContent_ddlDireccion').val(),
            Filtro_Direccion: $("#MainContent_ddlDireccion option:selected").text(),
            Filtro_Destino: $("#MainContent_ddlDestino option:selected").text(),
            Filtro_FlagIgv: FlagIgv,
            Filtro_Placa: $(Contenedor + 'txtPlaca').val(),
            Filtro_Cliente: RazonSocial,
            Filtro_CodTasa: $(Contenedor + 'ddlIgv').val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_CodDetalle: $('#hfCodigoTemporal').val(),
            Filtro_CodTipoOperacion: 1,
            Filtro_Partida: $('#hfPartida').val(),
            Filtro_DireccionCompleta: $("#MainContent_ddlDireccion option:selected").text(),
            Filtro_Descuento: 0,
            Filtro_FlagRetencion: FlagRetencion,
            Filtro_CodVendedor: $(Contenedor + 'ddlVendedorComision').val(),
            Filtro_Acuenta: 0,
            Filtro_FlagNV: 0,
            Filtro_VistaPrevia: vistaprevia,
            Filtro_CodDocumentoNotaPedido: Number($('#hfNotaPedido').val()),
            Filtro_CodDocumentoRef: Number($('#hfCodDocumentoRef').val()),
            Filtro_CodFormaPagoRef: Number($('#hfCodFormaPagoRef').val()),
            Filtro_CodTransportista: $('#hfCodTransportista').val(),
            Filtro_MarcaGuia: $(Contenedor + 'txtMarcaGuia').val(),
            Filtro_LicenciaGuia: $(Contenedor + 'txtLicenciaGuia').val(),
            Filtro_NroBultos: Number($(Contenedor + 'txtNuBultos').val()),
            Filtro_Peso: Number($(Contenedor + 'txtPeso').val()),
            Filtro_AcuentaNv: 0,
            Filtro_DireccionTrans: $("#MainContent_ddlDireccionTransportista option:selected").text(),
            Filtro_CodAlmacenFisico: 1,
            Filtro_CodDocumentoAnterior: Number($('#hfCodDocumentoVentaAnterior').val()),
            Filtro_Observacion: Observacion,
            Filtro_Observacion2: $('#MainContent_txtObservacion').val(),
            Filtro_FlagIncluyeIgv: FlagIncluyeIgv,
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_GrabarDocumento_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se Grabo Correctamente') {
                    //                    if (vistaprevia == 0) {
                    alertify.log('La proforma se grabo correctamente.');
                    $('#MainContent_txtNumero').val(result.split('~')[3]);
                    // if ($('#MainContent_chkImpresion').is(':checked')) F_ImprimirFactura(result.split('~')[2]);

                    // F_Nuevo(result.split('~')[4]);                        
                    //                    } else {
                    //                        $('#MainContent_hdnVistaPrevia').val(1);
                    //                        F_ImprimirVistaPreviaFactura(result.split('~')[2]);
                    //                        $('#hfCodDocumentoVenta').val(result.split('~')[2]);
                    //                    }

                    if ($('#MainContent_chkImpresion').is(':checked')) {
                        var p1 = ''; var ti = 'TK';
                        //if ($('#MainContent_chkImpresionTicket').is(':checked')) ti = 'TK';
                        F_ImprimirFacturaHTML(result.split('~')[2], '', p1, ti, 16);
                    }

                    F_Nuevo(result.split('~')[4], $('#hfCodProforma2').val());
                    $('#MainContent_ddlFormaPago').val('1');
                    $('#tr_avisof').css('background-color', 'white');
                    $('#div_avisofp').css('display', 'none');


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

function F_Nuevo(Codigo, CodProforma) {
    if (CodProforma != "0") {
        F_ReelegirNotaPedido(CodProforma);
        return false;
    }

    $('#MainContent_btnBuscarLetra').prop('disabled', true);
    //$('#MainContent_btnGrabar').prop('disabled', true);
    $('#MainContent_btnEliminar').prop('disabled', false);
    $('#MainContent_btnNotaPedido').prop('disabled', false);
    $('#MainContent_btnVistaPrevia').prop('disabled', false);
    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());
    $('#hfCodTraslado').val('0');
    $('#hfCodProforma').val('0');
    $('#hfCodNotaVenta').val('0');
    $('#hfCodDepartamento').val('0');
    $('#hfCodProvincia').val('0');
    $('#hfCodDistrito').val('0');
    $('#hfCodCtaCte').val('0');
    $('#hfNotaPedido').val('0');
    $('#hfCodLetra').val('0');
    $('#MainContent_ddlMoneda').val(1);
    $('#MainContent_ddlFormaPago').val('1');
    $('#hfCodigoTemporal').val('0');
    $('#MainContent_txtCliente').val('');
    $('#MainContent_txtPlaca').val('');
    $('#MainContent_txtDistrito').val('');
    $('#MainContent_txtDireccion').val('');
    $('#MainContent_txtSubTotal').val('0.00');
    $('#MainContent_txtIgv').val('0.00');
    $('#MainContent_txtTotal').val('0.00');
    $('#MainContent_txtAcuenta').val('0.00');
    $('#MainContent_txtDestino').val('');
    $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
    $('#MainContent_txtArticulo').val('');
    $('#MainContent_txtAcuenta').prop('readonly', true);
    $('#MainContent_chkServicios').prop('checked', false);
    $('#MainContent_chkNotaPedido').prop('checked', false);
    $('#MainContent_chkImpresion').prop('checked', false);
    $('#MainContent_chkRetencion').prop('checked', false);
    $('#MainContent_txtNroRuc').val('');
    $('#MainContent_ddlVendedorComision').val(1);
    $('#MainContent_txtCliente').focus();
    $('#MainContent_hdnVistaPrevia').val(0);
    $('#MainContent_hfFlagNotaVenta').val(0);
    $('.tprecio').attr('readonly', false);
    $('.tcant').attr('readonly', false);
    $('#hfCodDocumentoRef').val("");
    $('#hfCodFormaPagoRef').val("");
    $('#hfCodTransportista').val('0');
    $('#MainContent_txtTransportista').val('');
    $('#MainContent_txtMarcaGuia').val("");
    $('#MainContent_txtLicenciaGuia').val("");
    $('#MainContent_txtNuBultos').val("");
    $('#MainContent_txtPeso').val("");
    $('#MainContent_txtDireccionTransportista').val("");
    $("#MainContent_lblNumRegistros").text("0");
    $("#MainContent_txtValIgv").val("");
    $('#MainContent_txtNroLetra').val('');
    $('#MainContent_txtMontoLetra').val('');
    $('#MainContent_txtObservacion').val('');
    $('#hfCodDocumentoVentaAnterior').val(0);
    //$('#MainContent_btnGrabar').prop("disabled", true);
    $('#MainContent_chkMayorista').prop("checked", false);
    $('#MainContent_chkMinorista').prop("checked", false);
    $('#MainContent_chkSi').prop("checked", false);
    $('#MainContent_chkNo').prop("checked", false);
    $('#MainContent_chkSi').prop("disabled", true);
    $('#MainContent_chkNo').prop("disabled", true);
    $('#MainContent_ddlDireccion').empty();
    ValorSINOdefecto = true;
    try {
        var objParams = {
            Filtro_CodDoc: 16,
            Filtro_SerieDoc: $('#MainContent_ddlSerie').val(),
            Filtro_CodSerieGuia: '4',
            Filtro_CodNotaVenta: $('#hfCodDocumentoVenta').val(),
            Filtro_CodSede: $('#MainContent_hdnCodSede').val(),
            Filtro_CodEmpresa: $('#MainContent_hdnCodSede').val()
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
                $('#MainContent_txtNumero').val(result.split('~')[3]);
                //$('#MainContent_txtNumeroGuia').val(result.split('~')[4]);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[2]);
                $('#hfCodDocumentoVenta').val('0');
                $('.ccsestilo').css('background', '#FFFFE0');
                F_Mostrar_Correlativo(16);
                UltimoRegistro = 100000;
                if (MultiEmpresa == true)
                    $('#divSeleccionarEmpresa').dialog('open');
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
            Filtro_Serie: $("#MainContent_ddlSerieConsulta option:selected").text(),
            Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            Filtro_CodTipoDoc: 16,
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
        var lblCodMarcaGv = '#' + imgID.replace('imgAnularDocumento', 'lblcodigo');
        var lblEstado = '#' + imgID.replace('imgAnularDocumento', 'lblEstado');
        var lblnumero_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblNumero');
        var lblcliente_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblcliente');

        if ($(lblEstado).text() == "ANULADO") {
            alertify.log("LA FACTURA SE ENCUENTRA ANULADA");
            return false;
        }

        if ($(lblEstado).text() == "CANCELADO PARCIAL") {
            alertify.log("ESTA FACTURA SE ENCUENTRA CANCELADA PARCIAL; PRIMERO ELIMINE LA COBRANZA Y LUEGO ANULE LA FACTURA");
            return false;
        }

        if ($(lblEstado).text() == "CANCELADO TOTAL") {
            alertify.log("ESTA FACTURA SE ENCUENTRA CANCELADA TOTAL; PRIMERO ELIMINE LA COBRANZA Y LUEGO ANULE LA FACTURA");
            return false;
        }

        if (!confirm("ESTA SEGURO DE ANULAR LA FACTURA : " + $(lblnumero_grilla).text() + "\nDEL CLIENTE : " + $(lblcliente_grilla).text()))
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
            Filtro_Codigo: $(lblCodMarcaGv).text(),
            Filtro_Serie: $("#MainContent_ddlSerieConsulta option:selected").text(),
            Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            Filtro_CodTipoDoc: 16,
            Filtro_ChkNumero: chkNumero,
            Filtro_ChkFecha: chkFecha,
            Filtro_ChkCliente: chkCliente,
            Filtro_CodSede: $('#MainContent_hdnCodSede').val()
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

function getContentTab() {
    $('#MainContent_txtDesde').val(Date_AddDays($('#MainContent_txtHasta').val(), -7));
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

function F_ImprimirGuia(Fila) {
    var imgID = Fila.id;
    var lblCodigo = '#' + imgID.replace('imgImprimir', 'hfCodTraslado');
    var lblEstado = '#' + imgID.replace('imgImprimir', 'lblestado');

    if ($(lblEstado).text() == 'ANULADO') {
        alertify.log("La factura se encuentra anulada");
        return false;
    }

    if ($(lblCodigo).val() == '0') {
        alertify.log("La factura no tiene guia adjunta");
        return false;
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '200';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + $(lblCodigo).val() + '&';
    rptURL = rptURL + 'Impresora=' + Impresora + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_ImprimirFactura(Codigo) {

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '201';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + Codigo + '&';
    rptURL = rptURL + 'Impresora=' + Impresora + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function numerar() {
    var c = 0;
    $('.numero').each(function () {
        c++;
        $(this).text(c.toString());
    });
    $("#MainContent_lblNumRegistros").text(c);
}

function F_ImprimirVistaPreviaFactura(Codigo) {
    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = 5;
    var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
    var Contenedor = '#MainContent_';
    var CodMenu = 210;
    var Contenedor = '#MainContent_';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'CodDocumentoVenta=' + Codigo + '&';
    rptURL = rptURL + 'CodEmpresa=' + $(Contenedor + 'hdnCodEmpresa').val() + '&';
    rptURL = rptURL + 'CodSede=' + $(Contenedor + 'hdnCodSede').val() + '&';
    rptURL = rptURL + 'CodTipoDoc=' + 16 + '&';
    rptURL = rptURL + 'SerieDoc=' + $("#MainContent_ddlSerie option:selected").text() + '&';
    rptURL = rptURL + 'NumeroDoc=' + $(Contenedor + 'txtNumero').val() + '&';
    rptURL = rptURL + 'Cliente=' + $(Contenedor + 'txtCliente').val() + '&';
    rptURL = rptURL + 'Direccion=' + $(Contenedor + 'txtDireccion').val() + '&';
    rptURL = rptURL + 'FormaPago=' + $("#MainContent_ddlFormaPago option:selected").text() + '&';
    rptURL = rptURL + 'NroRuc=' + $(Contenedor + 'txtNroRuc').val() + '&';
    rptURL = rptURL + 'CodDepartamento=' + $('#hfCodDepartamento').val() + '&';
    rptURL = rptURL + 'SerieGuia=' + $("#MainContent_ddlSerieGuia option:selected").text() + '&';
    rptURL = rptURL + 'NumeroGuia=' + $(Contenedor + 'txtNumeroGuia').val() + '&';
    rptURL = rptURL + 'FechaEmision=' + $(Contenedor + 'txtEmision').val() + '&';
    rptURL = rptURL + 'CodMoneda=' + $(Contenedor + 'ddlMoneda').val() + '&';
    rptURL = rptURL + 'SubTotal=' + $(Contenedor + 'txtSubTotal').val() + '&';
    rptURL = rptURL + 'Igv=' + $(Contenedor + 'txtIgv').val() + '&';
    rptURL = rptURL + 'Total=' + $(Contenedor + 'txtTotal').val() + '&';
    rptURL = rptURL + 'TasaIgv=' + tasaigv + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function ImprimirFacturaDetalle(Fila) {
    var imgID = Fila.id;
    var lblCodigo = '#' + imgID.replace('imgPdf', 'lblcodigo');
    var lblEstado = '#' + imgID.replace('imgPdf', 'lblestado');

    if ($(lblEstado).text() == 'ANULADO') {
        alertify.log("La proforma se encuentra anulada");
        return false;
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '219';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + $(lblCodigo).text() + '&';
    rptURL = rptURL + 'Impresora=' + Impresora + '&';

    window.open(rptURL, "PopUpRpt", Params);

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

function F_VerUltimoPrecio(HlkControlID) {
    var Contenedor = '#cphCuerpo_';
    var CodNeumatico = '';
    var CodNeumaticoAlm = '';

    CodNeumatico = $('#' + HlkControlID).text();
    CodProducto = $('#' + HlkControlID.replace('hlkCodigo', 'lblcodproducto')).val();

    try {
        var objParams = {
            Filtro_CodProducto: CodProducto,
            Filtro_CodTipoOperacion: '1',
            Filtro_CodCtaCte: $('#hfCodCtaCte').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_VerUltimoPrecio_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                $('#MainContent_txtUltimoPrecio').val('');
                $('#MainContent_txtMonedaPrecio').val('');
                $('#MainContent_txtFechaPrecio').val('');
                $('#MainContent_txtCantidadPrecio').val('');

                $('#MainContent_txtUltimoPrecio').val(result.split('~')[2]);
                $('#MainContent_txtMonedaPrecio').val(result.split('~')[3]);
                $('#MainContent_txtFechaPrecio').val(result.split('~')[4]);
                $('#MainContent_txtCantidadPrecio').val(result.split('~')[5]);

                $('#div_ultimoprecio').dialog({
                    resizable: false,
                    modal: true,
                    title: "Historial Venta",
                    title_html: true,
                    height: 120,
                    width: 350,
                    autoOpen: false
                });

                $('#div_ultimoprecio').dialog('open');


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

function F_FacturacionOC() {
    var Contenedor = '#MainContent_';
    var Mensaje = "Ingresar los sgtes. Datos:";

    if ($(Contenedor + 'txtProveedor').val() == "" || $('#hfCodCtaCte').val() == 0)
        Mensaje = Mensaje + "\n" + "CLIENTE";

    if ($(Contenedor + 'lblTC').text() == "0")
        Mensaje = Mensaje + "\n" + "Tipo de Cambio";

    if (Mensaje != "Ingresar los sgtes. Datos:") {
        alertify.log(Mensaje);
        return false;
    }

    try {
        var objParams = {
            Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_FacturacionOC_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {

                $('#divFacturacionOC').dialog({
                    resizable: false,
                    modal: true,
                    title: "Facturacion Orden de Compra",
                    title_html: true,
                    height: 500,
                    width: 890,
                    autoOpen: false
                });
                F_Update_Division_HTML('div_DetalleOC', result.split('~')[2]);

                if (str_mensaje_operacion != "")
                    alertify.log(str_mensaje_operacion);
                else
                    $('#divFacturacionOC').dialog('open');

                $('.ccsestilo').css('background', '#FFFFE0');
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

function F_ValidarAgregarOC() {
    try {
        var cadena = "Ingrese los sgtes. campos: ";
        var chkSi = '';
        var lblCodigo = '';
        var txtCantidadEntregada = '';
        var x = 0;

        $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;

            txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
            lblCodigo = chkSi.replace('chkEliminar', 'lblCodigo');

            if ($(chkSi).is(':checked')) {
                if ($(txtCantidadEntregada).val() == '')
                    cadena = cadena + "\n" + "Cantidad para el Codigo " + $(lblCodigo).text();
                x = 1;
            }
        });

        if (x == 0)
            cadena = "No ha seleccionado ningun producto";

        if (cadena != "Ingrese los sgtes. campos: ") {
            alertify.log(cadena);
            return false;
        }

        return true;
    }

    catch (e) {

        alertify.log("Error Detectado: " + e);

    }
}

function F_AgregarTemporalOC() {
    try {

        var lblcodproducto_grilla = '';
        var lblcodunidadventa_grilla = '';
        var lblNumero = '';
        var lblcosto_grilla = '';
        var chkSi = '';
        var txtcantidad_grilla = '';
        var txtprecio_grilla = '';
        var txtdscto_grilla = '';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla = '';
        var hfcosto_grilla = '';
        var lblProducto = '';
        var Contenedor = '#MainContent_';

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblcodproducto_grilla = chkSi.replace('chkEliminar', 'hfCodArticulo');
            lblcodunidadventa_grilla = chkSi.replace('chkEliminar', 'hfCodUndMedida');
            lblcosto_grilla = chkSi.replace('chkEliminar', 'lblPrecio');
            txtprecio_grilla = chkSi.replace('chkEliminar', 'lblPrecio');
            txtcantidad_grilla = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
            hfcodunidadventa_grilla = chkSi.replace('chkEliminar', 'hfCodUndMedida');
            hfcosto_grilla = chkSi.replace('chkEliminar', 'hfcosto');
            lblCodDetalle = chkSi.replace('chkEliminar', 'lblCodDetalle');
            hfCostoUnitario = chkSi.replace('chkEliminar', 'hfCostoUnitario');
            lblNumero = chkSi.replace('chkEliminar', 'lblNumero');
            lblProducto = chkSi.replace('chkEliminar', 'lblProducto');

            if ($(chkSi).is(':checked')) {
                var objDetalle = {
                    CodArticulo: $(lblcodproducto_grilla).val(),
                    Cantidad: $(txtcantidad_grilla).val(),
                    Precio: $(txtprecio_grilla).text() / tasaigv,
                    PrecioDscto: $(txtprecio_grilla).text() / tasaigv,
                    Costo: $(hfcosto_grilla).text(),
                    CodUm: $(hfcodunidadventa_grilla).val(),
                    CostoUnitario: $(hfCostoUnitario).val(),
                    Dscto: 0,
                    CodDetalle: $(lblCodDetalle).text(),
                    OC: $(lblNumero).text(),
                    CodTipoDoc: 5,
                    Acuenta: 0,
                    Descripcion: $(lblProducto).text().replace("&", "&amp;")
                };

                arrDetalle.push(objDetalle);
            }
        });

        var objParams = {
            Filtro_CodTipoDoc: "16",
            Filtro_SerieDoc: $(Contenedor + 'ddlSerie').val(),
            Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
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
            Filtro_TasaIgv: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
            Filtro_TasaIgvDscto: tasaigv,
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_AgregarTemporal_NET(arg, function (result) {
            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                $('#MainContent_txtTotal').val(result.split('~')[5]);
                $('#MainContent_txtMonto').val(result.split('~')[5]);
                $('#MainContent_txtIgv').val(result.split('~')[6]);
                $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
                $('#divFacturacionOC').dialog('close');
                if (result.split('~')[2] == 'Los Producto(s) se han agregado con exito')
                    alertify.log('Los Producto(s) se han agregado con exito');
            }
            else {
                MostrarEspera(false);
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

function F_LimpiarGrillaConsultaOC() {
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

function F_ValidarDevolucion(Mensaje) {
    try {
        var chkSi = '';
        var x = 0;

        $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;

            if ($(chkSi).is(':checked'))
                x = 1;
        });


        if (x == 0) {
            alertify.log(Mensaje);
            return false;
        }
        else
        { return true; }

    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}

function F_Devolucion() {
    try {
        var chkSi = '';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla = '';


        $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblCodDetalle = chkSi.replace('chkEliminar', 'lblCodDetalle');
            hfCodArticulo = chkSi.replace('chkEliminar', 'hfCodArticulo');
            hfCodUndMedida = chkSi.replace('chkEliminar', 'hfCodUndMedida');
            hfCostoUnitario = chkSi.replace('chkEliminar', 'hfCostoUnitario');
            hfSerieDoc = chkSi.replace('chkEliminar', 'hfSerieDoc');
            lblPrecio = chkSi.replace('chkEliminar', 'lblPrecio');
            hfNumeroDoc = chkSi.replace('chkEliminar', 'hfNumeroDoc');
            txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');

            if ($(chkSi).is(':checked')) {
                var objDetalle = {
                    CodDetalle: $(lblCodDetalle).text(),
                    CodArticulo: $(hfCodArticulo).val(),
                    CodUndMedida: $(hfCodUndMedida).val(),
                    SerieDoc: $(hfSerieDoc).val(),
                    NumeroDoc: $(hfNumeroDoc).val(),
                    Costo: $(lblPrecio).text(),
                    Cantidad: $(txtCantidadEntregada).val(),
                    CostoUnitario: $(hfCostoUnitario).val(),
                    CodTipoDoc: 5
                };

                arrDetalle.push(objDetalle);
            }
        });


        var Contenedor = '#MainContent_';
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_CodTasa: $(Contenedor + 'ddlIgv').val(),
            Filtro_TasaIgv: tasaigv
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_Devolucion_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {

                if (result.split('~')[2] == 'Se grabo correctamente') {
                    F_Update_Division_HTML('div_DetalleOC', result.split('~')[3]);
                    alertify.log('Se grabo correctamente');
                }
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

function F_ValidarCheck_OC(ControlID) {

    var txtprecio_Grilla = '';
    var ddlLista_grilla = '';
    var txtcant_grilla = '';
    var txtprecio_grilla = '';
    var boolEstado = false;
    var chkok_grilla = '';

    chkok_grilla = '#' + ControlID;
    txtCantidadEntregada = chkok_grilla.replace('chkEliminar', 'txtCantidadEntregada');
    lblCantidad = chkok_grilla.replace('chkEliminar', 'lblCantidad');

    boolEstado = $(chkok_grilla).is(':checked');
    if (boolEstado) {

        $(txtCantidadEntregada).prop('disabled', false);
        $(txtCantidadEntregada).val($(lblCantidad).text());
        $(txtCantidadEntregada).focus();
    }
    else {
        $(txtCantidadEntregada).val('');
        $(txtCantidadEntregada).prop('disabled', true);
    }


    return true;
}

function F_ValidarStockGrillaOC(ControlID) {


    var txtcantidad_Grilla = '';
    var lblstock = '';
    var txtcant_grilla = '';
    var boolEstado = false;
    var chkok_grilla = '';

    txtcantidad_Grilla = '#' + ControlID;
    chkok_grilla = txtcantidad_Grilla.replace('txtCantidadEntregada', 'chkEliminar');
    lblstock = txtcantidad_Grilla.replace('txtCantidadEntregada', 'lblCantidad');


    boolEstado = $(chkok_grilla).is(':checked');

    if (boolEstado && parseFloat($(txtcantidad_Grilla).val()) > parseFloat($(lblstock).text())) {
        alertify.log("Stock insuficiente");
        $(txtcantidad_Grilla).val($(lblstock).text());
        F_MostrarTotales();
        return false;
    }
    if ($(txtcantidad_Grilla).val() == '')
        $(txtcantidad_Grilla).val($(lblstock).text());

    if (boolEstado == false)
        $(txtcantidad_Grilla).val($(lblstock).text());

    //    F_MostrarTotales();
    return true;
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

function F_FacturacionCotizacion() {
    var Contenedor = '#MainContent_';
    var Mensaje = "Ingresar los sgtes. Datos: <br> <p></p>";

    if ($(Contenedor + 'txtCodCotizacion').val() == "")
        Mensaje = Mensaje + "\n" + "Codigo (ID)";

    if (Mensaje != "Ingresar los sgtes. Datos: <br> <p></p>") {
        alertify.log(Mensaje);
        return false;
    }
    var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

    try {
        var objParams = {
            Filtro_CodProforma: $(Contenedor + 'txtCodCotizacion').val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: 0
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_FacturacionCotizacion_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_mensaje_operacion == "") {
                $('#hfCodigoTemporal').val(result.split('~')[2]);
                $('#hfCodCtaCte').val(result.split('~')[3]);
                $('#MainContent_ddlMoneda').val(result.split('~')[4]);
                $('#MainContent_txtSubTotal').val(result.split('~')[5]);
                $('#MainContent_txtIgv').val(result.split('~')[6]);
                $('#MainContent_txtTotal').val(result.split('~')[7]);
                $('#hfCodDepartamento').val(result.split('~')[8]);
                $('#hfCodProvincia').val(result.split('~')[9]);
                $('#hfCodDistrito').val(result.split('~')[10]);
                $('#MainContent_txtDireccion').val(result.split('~')[11]);
                $('#MainContent_txtNroRuc').val(result.split('~')[12]);
                $('#MainContent_txtDistrito').val(result.split('~')[13]);
                $('#MainContent_txtCliente').val(result.split('~')[14]);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[15]);
                $('#MainContent_ddlFormaPago').val('1');
                $('#hfCodProforma').val($(Contenedor + 'txtCodCotizacion').val());
                $('#div_FacturarCotizacion').dialog('close');
                $('.ccsestilo').css('background', '#FFFFE0');
                //                if ($('#MainContent_ddlFormaPago').val() == 1)
                //                    $('#MainContent_txtAcuenta').val(parseFloat($('#MainContent_txtTotal').val()) - parseFloat($('#MainContent_txtAcuentaNV').val()).toFixed(2));
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

function F_FacturacionGuia() {
    var Contenedor = '#MainContent_';
    var Mensaje = "Ingresar los sgtes. Datos: <br> <p></p>";

    if ($(Contenedor + 'txtProveedor').val() == "" || $('#hfCodCtaCte').val() == 0)
        Mensaje = Mensaje + "\n" + "CLIENTE";

    if ($(Contenedor + 'lblTC').text() == "0")
        Mensaje = Mensaje + "\n" + "Tipo de Cambio";

    if (Mensaje != "Ingresar los sgtes. Datos: <br> <p></p>") {
        alertify.log(Mensaje);
        return false;
    }

    try {
        var objParams = {
            Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
            Filtro_CodMotivoTraslado: 9,
            Filtro_Descripcion: $(Contenedor + 'txtDescripcionGuia').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_FacturacionGuia_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {

                $('#div_FacturacionGuia').dialog({
                    resizable: false,
                    modal: true,
                    title: "Facturacion Guia",
                    title_html: true,
                    height: 500,
                    width: 890,
                    autoOpen: false
                });
                F_Update_Division_HTML('div_GrillaFacturacionGuia', result.split('~')[2]);

                if (str_mensaje_operacion != "")
                    alertify.log(str_mensaje_operacion);
                else
                    $('#div_FacturacionGuia').dialog('open');

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

function F_ValidarDevolucionGuia(Mensaje) {
    try {
        var chkSi = '';
        var x = 0;

        $('#MainContent_grvFacturacionGuia .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;

            if ($(chkSi).is(':checked'))
                x = 1;
        });


        if (x == 0) {
            alertify.log(Mensaje);
            return false;
        }
        else
        { return true; }

    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}

function F_DevolucionGuia() {
    try {
        var chkSi = '';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla = '';


        $('#MainContent_grvFacturacionGuia .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblCodDetalle = chkSi.replace('chkEliminar', 'lblCodDetalle');
            hfCodArticulo = chkSi.replace('chkEliminar', 'hfCodArticulo');
            hfCodUndMedida = chkSi.replace('chkEliminar', 'hfCodUndMedida');
            hfCostoUnitario = chkSi.replace('chkEliminar', 'hfCostoUnitario');
            hfSerieDoc = chkSi.replace('chkEliminar', 'hfSerieDoc');
            lblPrecio = chkSi.replace('chkEliminar', 'lblPrecio');
            hfNumeroDoc = chkSi.replace('chkEliminar', 'hfNumeroDoc');
            txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');

            if ($(chkSi).is(':checked')) {
                var objDetalle = {
                    CodDetalle: $(lblCodDetalle).text(),
                    CodArticulo: $(hfCodArticulo).val(),
                    CodUndMedida: $(hfCodUndMedida).val(),
                    SerieDoc: $(hfSerieDoc).val(),
                    NumeroDoc: $(hfNumeroDoc).val(),
                    Costo: $(lblPrecio).text(),
                    Cantidad: $(txtCantidadEntregada).val(),
                    CostoUnitario: $(hfCostoUnitario).val()
                };

                arrDetalle.push(objDetalle);
            }
        });


        var Contenedor = '#MainContent_';
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_CodTasa: $(Contenedor + 'ddlIgv').val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_CodMotivoTraslado: 9

        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_DevolucionGuia_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_GrillaFacturacionGuia', result.split('~')[3]);
                if (result.split('~')[2] == 'Se grabo correctamente')
                    alertify.log('Se grabo correctamente');
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

function F_ListarNroCuenta() {

    var arg;

    try {

        var objParams = {

            Filtro_CodBanco: $('#MainContent_ddlBanco').val(),
            Filtro_CodMoneda: $('#MainContent_ddlMoneda').val()
        };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ListarNroCuenta_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_Cuenta', result.split('~')[2]);

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

function F_AgregarTemporalGuia() {
    try {

        var lblcodproducto_grilla = '';
        var lblcodunidadventa_grilla = '';
        var lblNumero = '';
        var lblcosto_grilla = '';
        var chkSi = '';
        var txtcantidad_grilla = '';
        var txtprecio_grilla = '';
        var txtdscto_grilla = '';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla = '';
        var hfcosto_grilla = '';
        var lblProducto = '';
        var Contenedor = '#MainContent_';

        $('#MainContent_grvFacturacionGuia .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblcodproducto_grilla = chkSi.replace('chkEliminar', 'hfCodArticulo');
            lblcodunidadventa_grilla = chkSi.replace('chkEliminar', 'hfCodUndMedida');
            lblcosto_grilla = chkSi.replace('chkEliminar', 'lblPrecio');
            txtprecio_grilla = chkSi.replace('chkEliminar', 'lblPrecio');
            txtcantidad_grilla = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
            hfcodunidadventa_grilla = chkSi.replace('chkEliminar', 'hfCodUndMedida');
            hfcosto_grilla = chkSi.replace('chkEliminar', 'lblPrecio');
            lblCodDetalle = chkSi.replace('chkEliminar', 'lblCodDetalle');
            hfCostoUnitario = chkSi.replace('chkEliminar', 'hfCostoUnitario');
            lblNumero = chkSi.replace('chkEliminar', 'lblNumero');
            lblProducto = chkSi.replace('chkEliminar', 'lblProducto');

            if ($(chkSi).is(':checked')) {
                var objDetalle = {
                    CodArticulo: $(lblcodproducto_grilla).val(),
                    Cantidad: $(txtcantidad_grilla).val(),
                    Precio: $(txtprecio_grilla).text(),
                    PrecioDscto: $(txtprecio_grilla).text(),
                    Costo: $(hfcosto_grilla).text(),
                    CodUm: $(hfcodunidadventa_grilla).val(),
                    CostoUnitario: $(hfCostoUnitario).val(),
                    Dscto: 0,
                    CodDetalle: $(lblCodDetalle).text(),
                    OC: $(lblNumero).text(),
                    Acuenta: 0,
                    CodTipoDoc: 10,
                    Descripcion: $(lblProducto).text().replace("&", "&amp;")
                };

                arrDetalle.push(objDetalle);
            }
        });

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);


        var objParams = {
            Filtro_CodTipoDoc: "1",
            Filtro_SerieDoc: $(Contenedor + 'ddlSerie').val(),
            Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
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
            Filtro_TasaIgv: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
            Filtro_TasaIgvDscto: tasaigv,
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_AgregarTemporal_NET(arg, function (result) {
            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                $('#MainContent_txtTotal').val(result.split('~')[5]);
                $('#MainContent_txtMonto').val(result.split('~')[5]);
                $('#MainContent_txtIgv').val(result.split('~')[6]);
                $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                if ($('#MainContent_ddlFormaPago').val() == 1)
                    $('#MainContent_txtAcuenta').val(parseFloat($('#MainContent_txtTotal').val())); //- parseFloat($('#MainContent_txtAcuentaNV').val())).toFixed(2));
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
                $('#div_FacturacionGuia').dialog('close');
                if (result.split('~')[2] == 'Los Producto(s) se han agregado con exito')
                    alertify.log('Los Producto(s) se han agregado con exito');
            }
            else {
                MostrarEspera(false);
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

function F_FacturacionNV(Desde, Hasta) {
    var Contenedor = '#MainContent_';
    var Mensaje = "Ingresar los sgtes. Datos:";
    var NumeroDoc = "";
    var Cliente = "";

    if ($(Contenedor + 'lblTC').text() == "0")
        Mensaje = Mensaje + "<p></p>" + "Tipo de Cambio";

    if ($('#MainContent_chkNotaVenta').is(':checked'))
        NumeroDoc = $(Contenedor + 'txtNumeroNotaVenta').val();
    else
        NumeroDoc = "";

    if ($('#MainContent_txtClienteNV').val().length > 2)
        Cliente = $(Contenedor + 'txtClienteNV').val();
    else
        Cliente = "";

    if (Mensaje != "Ingresar los sgtes. Datos:") {
        alertify.log(Mensaje);
        return false;
    }

    try {
        var objParams = {
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_Desde: Desde,
            Filtro_Hasta: Hasta,
            Filtro_NumeroDoc: NumeroDoc,
            Filtro_SerieDoc: $("#MainContent_ddlSerieNV option:selected").text(),
            Filtro_Cliente: Cliente
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_FacturacionNV_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {

                $('#divFacturacionNV').dialog({
                    resizable: false,
                    modal: true,
                    title: "Facturacion Nota de Venta",
                    title_html: true,
                    height: 500,
                    width: 1000,
                    autoOpen: false
                });
                F_Update_Division_HTML('div_DetalleNV', result.split('~')[2]);
                $('.ccsestilo').css('background', '#FFFFE0');

                if (str_mensaje_operacion != "")
                    alertify.log(str_mensaje_operacion);
                else
                    $('#divFacturacionNV').dialog('open');

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

function F_ValidarAgregarNV() {
    try {
        var cadena = "Ingrese los sgtes. campos: ";
        var chkSi = '';
        var lblCodigo = '';
        var txtCantidadEntregada = '';
        var x = 0;

        $('#MainContent_grvDetalleNV .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;

            txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
            lblCodigo = chkSi.replace('chkEliminar', 'lblCodigo');

            if ($(chkSi).is(':checked')) {
                if ($(txtCantidadEntregada).val() == '')
                    cadena = cadena + "<p></p>" + "Cantidad para el Codigo " + $(lblCodigo).text();
                x = 1;
            }
        });

        if (x == 0)
            cadena = "No ha seleccionado ningun producto";

        if (cadena != "Ingrese los sgtes. campos: ") {
            alertify.log(cadena);
            return false;
        }
        else
            return true;
    }
    catch (e) {
        alertify.log("Error Detectado: " + e);
    }
}

function F_AgregarTemporalNV() {
    try {
        var lblcodproducto_grilla = '';
        var lblcodunidadventa_grilla = '';
        var lblcosto_grilla = '';
        var chkSi = '';
        var txtcantidad_grilla = '';
        var txtprecio_grilla = '';
        var txtdscto_grilla = '';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla = '';
        var hfcosto_grilla = '';
        var lblProducto = '';
        var lblAcuenta = '';
        var Contenedor = '#MainContent_';
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        $('#MainContent_grvDetalleNV .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblcodproducto_grilla = chkSi.replace('chkEliminar', 'hfCodArticulo');
            lblcodunidadventa_grilla = chkSi.replace('chkEliminar', 'hfCodUndMedida');
            lblPrecio = chkSi.replace('chkEliminar', 'lblPrecio');
            txtcantidad_grilla = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
            hfcodunidadventa_grilla = chkSi.replace('chkEliminar', 'hfCodUndMedida');
            hfcosto_grilla = chkSi.replace('chkEliminar', 'lblPrecio');
            lblCodDetalle = chkSi.replace('chkEliminar', 'lblCodDetalle');
            hfCostoUnitario = chkSi.replace('chkEliminar', 'hfCostoUnitario');
            lblNumero = chkSi.replace('chkEliminar', 'lblNumero');
            lblProducto = chkSi.replace('chkEliminar', 'lblProducto');
            lblAcuenta = chkSi.replace('chkEliminar', 'lblAcuenta');

            if ($(chkSi).is(':checked')) {
                var objDetalle = {
                    CodArticulo: $(lblcodproducto_grilla).val(),
                    Cantidad: $(txtcantidad_grilla).val(),
                    Precio: $(lblPrecio).text() / tasaigv,
                    PrecioDscto: $(lblPrecio).text() / tasaigv,
                    Costo: $(hfcosto_grilla).text(),
                    CodUm: $(hfcodunidadventa_grilla).val(),
                    CostoUnitario: $(hfCostoUnitario).val(),
                    Dscto: 0,
                    CodDetalle: $(lblCodDetalle).text(),
                    OC: $(lblNumero).text(),
                    Descripcion: $(lblProducto).text().replace("&", "&amp;"),
                    Acuenta: $(lblAcuenta).text(),
                    CodTipoDoc: 16
                };
                arrDetalle.push(objDetalle);
            }
        });

        var objParams = {
            Filtro_CodTipoDoc: 16,
            Filtro_SerieDoc: $(Contenedor + 'ddlSerie').val(),
            Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
            Filtro_CodCliente: $('#hfCodCtaCte').val(),
            Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
            Filtro_CodProforma: "0",
            Filtro_Igv: $(Contenedor + 'txtIgv').val(),
            Filtro_Total: $(Contenedor + 'txtTotal').val(),
            Filtro_CodGuia: "1",
            Filtro_Descuento: "0",
            Filtro_TasaIgv: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
            Filtro_TasaIgvDscto: tasaigv,
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_AgregarTemporal_NET(arg, function (result) {
            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (result.split('~')[2] == "Los Producto(s) se han agregado con exito") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                $('#MainContent_txtTotal').val(parseFloat(result.split('~')[5]).toFixed(2));
                $('#MainContent_txtIgv').val(parseFloat(result.split('~')[6]).toFixed(2));
                $('#MainContent_txtSubTotal').val(parseFloat(result.split('~')[7]).toFixed(2));
                //                $('#MainContent_txtAcuentaNV').val(parseFloat(result.split('~')[8]).toFixed(2));
                if ($('#MainContent_ddlFormaPago').val() == 1)
                    $('#MainContent_txtAcuenta').val(parseFloat($('#MainContent_txtTotal').val())); // - parseFloat($('#MainContent_txtAcuentaNV').val())).toFixed(2));
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
                $('#divFacturacionNV').dialog('close');
                if (result.split('~')[2] == 'Los Producto(s) se han agregado con exito')
                    alertify.log('Los Producto(s) se han agregado con exito');
            }
            else {
                MostrarEspera(false);
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

function F_VistaPreliminar(HlkControlID) {
    var Codigo = '';

    Codigo = $('#' + HlkControlID).text();


    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '5';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + Codigo + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;

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

        if (parseFloat($(lblAcuenta).text()) != 0) {
            $(txtPrecio).val(parseFloat($(hfPrecio).val()).toFixed(2));
            return false;
        }

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
                    //                    $('#MainContent_txtAcuentaNV').val('0.00');
                }
                else {
                    $('#MainContent_txtTotal').val(parseFloat(result.split('~')[5]).toFixed(2));
                    $('#MainContent_txtIgv').val(parseFloat(result.split('~')[6]).toFixed(2));
                    $('#MainContent_txtSubTotal').val(parseFloat(result.split('~')[7]).toFixed(2));
                    //                    $('#MainContent_txtAcuentaNV').val(parseFloat(result.split('~')[8]).toFixed(2));
                }
                if ($('#MainContent_ddlFormaPago').val() == 1)
                    $('#MainContent_txtAcuenta').val(parseFloat($('#MainContent_txtTotal').val())); // - parseFloat($('#MainContent_txtAcuentaNV').val()).toFixed(2));
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

function F_ActualizarCantidad(Fila) {
    try {
        var txt = '#' + Fila;
        var txtPrecio = '';
        var lblimporte = '';
        var lblimporte2 = '';
        var txtCantidad = '';
        var txtDescripcion = '';
        var codDetalle = '';
        var PrecioOriginal = 0;
        var Precio = 0;

        if (txt.indexOf('txtCantidad') > -1) {
            txtPrecio = txt.replace('txtCantidad', 'txtPrecio');
            lblimporte = txt.replace('txtCantidad', 'lblimporte');
            txtCantidad = txt;
            txtDescripcion = Fila.replace('txtCantidad', 'txtDescripcion');
            codDetalle = Fila.replace('txtCantidad', 'hfCodDetalle');
            PrecioOriginal = Number($(txt.replace('txtCantidad', 'hfPrecioOriginal')).val());
            Precio = Number($(txt.replace('txtCantidad', 'hfPrecio')).val());
        } else {
            txtCantidad = txt.replace('txtPrecio', 'txtCantidad');
            lblimporte = txt.replace('txtPrecio', 'lblimporte');
            txtPrecio = txt;
            txtDescripcion = Fila.replace('txtPrecio', 'txtDescripcion');
            codDetalle = Fila.replace('txtPrecio', 'hfCodDetalle');
            PrecioOriginal = Number($(txt.replace('txtPrecio', 'hfPrecioOriginal')).val());
            Precio = Number($(txt.replace('txtPrecio', 'hfPrecio')).val());
        }

        $(txtPrecio).val(parseFloat($(txtPrecio).val()).toFixed(2));
        $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));


        var PrecioNuevo = Number($(txtPrecio).val());

        if (FlagAdministrador != 1)
        {        
            if (PrecioNuevo < PrecioOriginal)
            {
                $(txtPrecio).val(PrecioOriginal);
                alertify.log('LOS PRECIOS NO PUEDEN SER DISMINUIDOS');
            }
        }
//        else
//        {
//            $(txtPrecio).val(PrecioOriginal);
//            alertify.log('LOS PRECIOS SOLO PUEDEN SER MODIFICADOS POR ADMINISTRADORES');
//    
//        }
        var chkSi ='';
        var pre = Number($(txtPrecio).val());
        var can = Number($(txtCantidad).val()); 
        var imp = (pre * can).toFixed(2);;

        $(lblimporte).text(imp);
        var impt = 0;
        
//                $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {    
////        $(".csimp").each(function () {
//            var t = Number($(this).text());
//            impt += t;
//        });

   $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblimporte2 = chkSi.replace('chkEliminar', 'lblimporte');
            impt+=parseFloat($(lblimporte2).text());  
        });

//   $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
//            chkSi = '#' + this.id;
//            impt+=parseFloat(chkSi.replace('chkEliminar', 'lblimporte').text());         
//        });

        $("#MainContent_txtTotal").val(impt.toFixed(2));
        recalcularmontos();
        cambiaracuenta();


        //Actualizacion de datos en la tabla temporal

        MostrarEspera(true);
        var objParams = {
            Filtro_CodDocumentoVenta: $("#hfCodigoTemporal").val(),
            Filtro_CodDetalle: $('#' + codDetalle).val(),
            Filtro_Cantidad: $(txtCantidad).val(),
            Filtro_Precio: $(txtPrecio).val(),
            Filtro_Descripcion: $('#' + txtDescripcion).val()
        };
        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        //eliminacion del temporal en base de datos
        F_ActualizarPrecioNP_Net(arg, function (result) {

            MostrarEspera(false);

           
            return false;
        });





    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_ActualizarDescripcionNP(Fila) {
    try {
        var txt = '#' + Fila;
        var txtPrecio = '';
        var txtCantidad = '';
        var txtDescripcion = '';
        var codDetalle = '';

        txtCantidad = txt.replace('txtDescripcion', 'txtCantidad');
        txtPrecio = txt.replace('txtDescripcion', 'txtPrecio');
        codDetalle = Fila.replace('txtDescripcion', 'hfCodDetalle');


        //Actualizacion de datos en la tabla temporal
        MostrarEspera(true);
        var objParams = {
            Filtro_CodDocumentoVenta: $("#hfCodigoTemporal").val(),
            Filtro_CodDetalle: $('#' + codDetalle).val(),
            Filtro_Cantidad: $(txtCantidad).val(),
            Filtro_Precio: $(txtPrecio).val(),
            Filtro_Descripcion: $('#' + Fila).val()
        };
        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        //eliminacion del temporal en base de datos
        F_ActualizarPrecioNP_Net(arg, function (result) {

            MostrarEspera(false);

            if (str_resultado_operacion == "1") {

            }
            else {

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

function F_EliminarRegistro(Fila) {
    try {
        var imgID = Fila.id;
        var lblCodMarcaGv = '#' + imgID.replace('imgEliminarDocumento', 'lblcodigo');
        var lblEstado = '#' + imgID.replace('imgEliminarDocumento', 'lblEstado');
        var lblnumero_grilla = '#' + imgID.replace('imgEliminarDocumento', 'lblNumero');
        var lblcliente_grilla = '#' + imgID.replace('imgEliminarDocumento', 'lblcliente');

        if ($(lblEstado).text() == "CANCELADO PARCIAL") {
            alertify.log("ESTA FACTURA SE ENCUENTRA CANCELADA PARCIAL; PRIMERO ELIMINE LA COBRANZA Y LUEGO ELIMINE LA FACTURA");
            return false;
        }

        if ($(lblEstado).text() == "CANCELADO TOTAL") {
            alertify.log("ESTA FACTURA SE ENCUENTRA CANCELADA TOTAL; PRIMERO ELIMINE LA COBRANZA Y LUEGO ELIMINE LA FACTURA");
            return false;
        }

        if (!confirm("ESTA SEGURO DE ELIMINAR LA FACTURA : " + $(lblnumero_grilla).text() + "\nDEL CLIENTE : " + $(lblcliente_grilla).text()))
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
            Filtro_Codigo: $(lblCodMarcaGv).text(),
            Filtro_Serie: $("#MainContent_ddlSerieConsulta option:selected").text(),
            Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            Filtro_CodTipoDoc: '16',
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

function F_BuscarGuia() {

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
            Filtro_Serie: $("#MainContent_ddlSerieConsulta option:selected").text(),
            Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            Filtro_CodTipoDoc: '16',
            Filtro_ChkNumero: chkNumero,
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

function F_ValidarDevolucionNV(Mensaje) {
    try {
        var chkSi = '';
        var x = 0;

        $('#MainContent_grvDetalleNV .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;

            if ($(chkSi).is(':checked'))
                x = 1;
        });


        if (x == 0) {
            alertify.log(Mensaje);
            return false;
        }
        else
        { return true; }

    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}

function F_DevolucionNV() {
    try {
        var chkSi = '';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla = '';


        $('#MainContent_grvDetalleNV .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblCodDetalle = chkSi.replace('chkEliminar', 'lblCodDetalle');
            hfCodArticulo = chkSi.replace('chkEliminar', 'hfCodArticulo');
            hfCodUndMedida = chkSi.replace('chkEliminar', 'hfCodUndMedida');
            hfCostoUnitario = chkSi.replace('chkEliminar', 'hfCostoUnitario');
            hfSerieDoc = chkSi.replace('chkEliminar', 'hfSerieDoc');
            lblPrecio = chkSi.replace('chkEliminar', 'lblPrecio');
            hfNumeroDoc = chkSi.replace('chkEliminar', 'hfNumeroDoc');
            txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');

            if ($(chkSi).is(':checked')) {
                var objDetalle = {
                    CodDetalle: $(lblCodDetalle).text(),
                    CodArticulo: $(hfCodArticulo).val(),
                    CodUndMedida: $(hfCodUndMedida).val(),
                    SerieDoc: $(hfSerieDoc).val(),
                    NumeroDoc: $(hfNumeroDoc).val(),
                    Costo: $(lblPrecio).text(),
                    Cantidad: $(txtCantidadEntregada).val(),
                    CostoUnitario: $(hfCostoUnitario).val(),
                    CodTipoDoc: 16
                };

                arrDetalle.push(objDetalle);
            }
        });


        var Contenedor = '#MainContent_';
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_CodTasa: $(Contenedor + 'ddlIgv').val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_CodTipoOperacion: 1,
            Filtro_CodTipoDoc: 16

        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_DevolucionNV_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                if (result.split('~')[2] == 'Se grabo correctamente') {
                    alertify.log('Se grabo correctamente');
                    F_Update_Division_HTML('div_DetalleNV', result.split('~')[3]);
                }

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

function F_ActualizarDescripcion(Fila) {
    try {
        var txtDescripcion = '#' + Fila;
        var Clave = "";
        var lblcoddetalle = txtDescripcion.replace('txtDescripcion', 'lblcoddetalle');
        var hfPrecio = txtDescripcion.replace('txtDescripcion', 'hfPrecio');
        var hfCantidad = txtDescripcion.replace('txtDescripcion', 'hfCantidad');
        var txtPrecio = txtDescripcion.replace('txtDescripcion', 'txtPrecio');
        var hfDescripcion = txtDescripcion.replace('txtDescripcion', 'hfDescripcion');
        var txtCantidad = txtDescripcion.replace('txtDescripcion', 'txtCantidad');

        if ($(txtDescripcion).val().trim() == "" || $(txtDescripcion).val() == $(hfDescripcion).val()) {
            $(txtDescripcion).val($(hfDescripcion).val());
            return false;
        }

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_Precio: $(txtPrecio).val() / tasaigv,
            Filtro_Cantidad: $(txtCantidad).val(),
            Filtro_Descripcion: $(txtDescripcion).val(),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_CodDetDocumentoVenta: $(lblcoddetalle).text(),
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
                }
                else {
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                }
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

function F_ReelegirNotaPedido(CodProforma) {
    try {
        $('#hfCodDocumentoVenta').val('0');
        var objParams = {
            Filtro_CodNotPedido: CodProforma,
            Filtro_CodEmpresa: $('#MainContent_hdnCodEmpresa').val(),
            Filtro_CodSede: $('#MainContent_hdnCodSede').val(),
            Filtro_CodDoc: 16,
            Filtro_NumSerie: $("#MainContent_ddlSerie option:selected").text(),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ObtenerNotaPedido_Net(arg, function (resu) {
            var result = JSON.parse(resu);
            var str_resultado_operacion = result.int_resultado_operacion;
            var str_mensaje_operacion = result.str_mensaje_operacion;
            var objprof = result.objprof;

            MostrarEspera(false);

            if (str_mensaje_operacion == "") {
                var Cuerpo = '#MainContent_';
                $("#MainContent_txtValIgv").val(objprof.ValIgv == null || objprof.ValIgv == undefined ? "" : objprof.ValIgv);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.det);
                $('#hfCodigoTemporal').val(result.int_CodigoTemporal);
                $('.ccsestilo').css('background', '#FFFFE0');
                numerar();
                $("#divConsultaNotaPedido").dialog('close');
                $(Cuerpo + 'chkGuia').prop('checked', true);
                //$('#MainContent_btnGrabar').prop("disabled", true);
                F_Mostrar_Correlativo(16);
                F_MostrarTotales();
                if ($(Cuerpo + 'txtTotal').val() == '0.00' || $(Cuerpo + 'txtTotal').val() == '0') {
                    $("#hfCodProforma2").val(0);
                    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
                    $('.Jq-ui-dtp').datepicker('setDate', new Date());
                    $('#hfCodTraslado').val('0');
                    $('#hfCodProforma').val('0');
                    $('#hfCodNotaVenta').val('0');
                    $('#hfCodDepartamento').val('0');
                    $('#hfCodProvincia').val('0');
                    $('#hfCodDistrito').val('0');
                    $('#hfCodCtaCte').val('0');
                    $('#hfNotaPedido').val('0');
                    $('#MainContent_ddlMoneda').val(1);
                    $('#MainContent_ddlFormaPago').val('1');
                    $('#hfCodigoTemporal').val('0');
                    $('#hfCodDocumentoVenta').val('0');
                    $('#MainContent_txtCliente').val('');
                    $('#MainContent_txtPlaca').val('');
                    $('#MainContent_txtDistrito').val('');
                    $('#MainContent_txtDireccion').val('');
                    $('#MainContent_txtDestino').val('');
                    $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
                    $('#MainContent_txtArticulo').val('');
                    $('#MainContent_txtAcuenta').prop('readonly', true);
                    $('#MainContent_chkGuia').prop('checked', true);
                    $('#MainContent_chkGuia').prop('disabled', true);
                    $('#MainContent_chkServicios').prop('checked', false);
                    $('#MainContent_chkNotaPedido').prop('checked', false);
                    $('#MainContent_chkImpresion').prop('checked', false);
                    $('#MainContent_chkRetencion').prop('checked', false);
                    $('#MainContent_txtNroRuc').val('');
                    $('#MainContent_txtCliente').focus();
                    $('#MainContent_hdnVistaPrevia').val(0);
                    $('#MainContent_hfFlagNotaVenta').val(0);
                    $('.tprecio').attr('readonly', false);
                    $('.tcant').attr('readonly', false);
                    $('#hfCodDocumentoRef').val("");
                    $('#hfCodFormaPagoRef').val("");
                    $('#hfCodTransportista').val('0');
                    $('#MainContent_txtTransportista').val('');
                    $('#MainContent_txtMarcaGuia').val("");
                    $('#MainContent_txtLicenciaGuia').val("");
                    $('#MainContent_txtNuBultos').val("");
                    $('#MainContent_txtPeso').val("");
                    $('#MainContent_txtDireccionTransportista').val("");
                    if (MultiEmpresa == true)
                        $('#divSeleccionarEmpresa').dialog('open');
                }
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

function F_ElegirNotaPedido_Serie() {
    try {
        var Cuerpo = '#MainContent_';

        var objParams = {
            Filtro_CodNotPedido: $('#hfCodProforma2').val(),
            Filtro_CodEmpresa: $(Cuerpo + 'hdnCodEmpresa').val(),
            Filtro_CodSede: $(Cuerpo + 'hdnCodSede').val(),
            Filtro_CodDoc: 16,
            Filtro_NumSerie: $(Cuerpo + "ddlSerie option:selected").text(),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ObtenerNotaPedido_Net(arg, function (resu) {
            var result = JSON.parse(resu);

            var str_resultado_operacion = result.int_resultado_operacion;
            var str_mensaje_operacion = result.str_mensaje_operacion;
            var objprof = result.objprof;

            MostrarEspera(false);

            if (str_mensaje_operacion == "") {
                var Cuerpo = '#MainContent_';
                $(Cuerpo + 'txtSubTotal').val(objprof.SubTotal);
                $(Cuerpo + 'txtIgv').val(objprof.Igv);
                $(Cuerpo + 'txtTotal').val(objprof.Total);
                $("#MainContent_txtValIgv").val(objprof.ValIgv == null || objprof.ValIgv == undefined ? "" : objprof.ValIgv);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.det);
                $('.ccsestilo').css('background', '#FFFFE0');
                numerar();
                $("#divConsultaNotaPedido").dialog('close');
                $(Cuerpo + 'chkGuia').prop('checked', true);
                $('#hfCodigoTemporal').val(result.int_CodigoTemporal);
                F_Mostrar_Correlativo(16);
                F_MostrarTotales();
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

function F_EliminarVistaPrevia() {
    var Contenedor = '#MainContent_';
    //$(Contenedor + 'hdnVistaPrevia').val() == '1'
    try {
        if ($("#MainContent_lblNumRegistros").text() != "0") {
            var objParams = {
                Filtro_CodNotaVenta: Number($('#hfCodDocumentoVenta').val())
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

            F_EliminarVistaPrevia_Net(arg, function (result) {
                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") {
                    $('#hfCodDocumentoVenta').val('0');
                    $(Contenedor + 'hdnVistaPrevia').val('0');
                    // alertify.log(str_mensaje_operacion);
                    if ($("#MainContent_lblNumRegistros").text() != "0")
                        F_ElegirNotaPedido_Serie();
                    return false;
                }
                return false;
            });
        }
    }
    catch (e) {
        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function F_BuscarLetra() {
    try {

        var objParams = {
            Filtro_NumeroDoc: $('#MainContent_txtNroLetra').val(),
            Filtro_CodEmpresa: Number($('#MainContent_hdnCodEmpresa').val())
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_BuscarLetra_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == '') {
                    $('#MainContent_txtNroRuc').val(result.split('~')[2]);
                    $('#MainContent_txtCliente').val(result.split('~')[3]);
                    $('#MainContent_txtDireccion').val(result.split('~')[4]);
                    $('#MainContent_txtMontoLetra').val(result.split('~')[5]);
                    $('#hfCodCtaCte').val(result.split('~')[6]);
                    $('#hfCodDepartamento').val(result.split('~')[7]);
                    $('#hfCodProvincia').val(result.split('~')[8]);
                    $('#hfCodDistrito').val(result.split('~')[9]);
                    $('#hfCodLetra').val(result.split('~')[10]);
                    F_Update_Division_HTML('div_Destino', result.split('~')[11]);
                    F_Update_Division_HTML('div_Direccion', result.split('~')[12]);
                    $('#MainContent_ddlDestino').css('background', '#FFFFE0');
                    $('#MainContent_ddlDireccion').css('background', '#FFFFE0');
                    $('#MainContent_btnGrabar').prop('disabled', false);
                    $('#MainContent_txtTotal').prop('readonly', false);
                }
                else
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

function F_ValidarGrabarProtesto() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtCliente').val() == '' && $('#hfCodCtaCte').val() == 0)
            Cadena = Cadena + '<p></p>' + 'Cliente';

        if ($(Cuerpo + 'lblTC').text() == '0')
            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtNumero').val() == '')
            Cadena = Cadena + '<p></p>' + 'Numero de Factura';

        if ($(Cuerpo + 'txtEmision').val() == '')
            Cadena = Cadena + '<p></p>' + 'Fecha de Emision';

        if ($('#hfCodCtaCte').val() == 0 && $('#hfCodDistrito').val() == 0)
            Cadena = Cadena + '<p></p>' + 'Distrito';

        if ($('#hfCodCtaCte').val() == 0 && $(Cuerpo + 'txtDireccion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Direccion';

        if ($(Cuerpo + 'txtNroLetra').val() == '' && $('#hfCodLetra').val() == 0)
            Cadena = Cadena + '<p></p>' + 'NUMERO LETRA';

        if ($(Cuerpo + 'txtTotal').val() == '0.00')
            Cadena = Cadena + '<p></p>' + 'Ingrese El Total';
        else {
            if (parseFloat(parseFloat($(Cuerpo + 'txtTotal').val()) > $(Cuerpo + 'txtMontoLetra').val()))
                Cadena = Cadena + '<p></p>' + 'LA COMISION NO PUEDE SER MAYOR AL TOTAL DE LA LETRA';
        }

        if (Cadena != 'Ingresar los sgtes. Datos:') {
            alertify.log(Cadena);
            return false;
        }
        return true;
    }
    catch (e) {
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_GrabarProtesto() {
    try {
        var Contenedor = '#MainContent_';
        var Index = $('#MainContent_txtCliente').val().indexOf('-');
        var RazonSocial = $('#MainContent_txtCliente').val();

        MostrarEspera(true);

        if ($('#hfCodCtaCte').val() != 0) {
            var Index = $('#MainContent_txtCliente').val().indexOf('-');
            RazonSocial = RazonSocial.substr(RazonSocial.length - (RazonSocial.length - (Index + 2)));
        }

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

        var objParams = {
            Filtro_CodEmpresa: Number($(Contenedor + 'hdnCodEmpresa').val()),
            Filtro_CodSede: Number($(Contenedor + 'hdnCodSede').val()),
            Filtro_CodTipoDoc: 16,
            Filtro_CodEstado: 6,
            Filtro_SerieDoc: $("#MainContent_ddlSerie option:selected").text(),
            Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
            Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
            Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
            Filtro_CodCliente: $('#hfCodCtaCte').val(),
            Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
            Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
            Filtro_Igv: $(Contenedor + 'txtIgv').val(),
            Filtro_Total: $(Contenedor + 'txtTotal').val(),
            Filtro_Saldo: $(Contenedor + 'txtTotal').val(),
            Filtro_TasaIgv: tasaigv,
            Filtro_Cliente: RazonSocial,
            Filtro_CodTasa: $(Contenedor + 'ddlIgv').val(),
            Filtro_DireccionCompleta: $(Contenedor + 'txtDireccion').val() + ' ' + $(Contenedor + 'txtDistrito').val(),
            Filtro_CodAlterno: 'S000001',
            Filtro_CodLetra: $('#hfCodLetra').val(),
            Filtro_NroLetra: $(Contenedor + 'txtNroLetra').val(),
            Filtro_CodDireccion: $(Contenedor + 'ddlDireccion').val(),
            Filtro_CodVendedor: $(Contenedor + 'ddlVendedorComision').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_GrabarProtesto_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se Grabo Correctamente') {
                    alertify.log('La PROFORMA se grabo correctamente.');
                    $('#MainContent_txtNumero').val(result.split('~')[3]);
                    //if ($('#MainContent_chkImpresion').is(':checked')) F_ImprimirFactura(result.split('~')[2]);

                    F_Nuevo(0, 0);
                    $('#MainContent_ddlFormaPago').val('1');
                    $('#tr_avisof').css('background-color', 'white');
                    $('#div_avisofp').css('display', 'none');
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

function F_ImprimirVistaPreviaGuia(Codigo) {
    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = 5;
    var Contenedor = '#MainContent_';
    var CodMenu = 212;
    var Peso = 0;
    var NroBultos = 0;
    if ($("#MainContent_txtPeso").val() != '')
        Peso = $("#MainContent_txtPeso").val()

    if ($("#MainContent_txtNuBultos").val() != '')
        NroBultos = $("#MainContent_txtNuBultos").val()

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'CodDocumentoVenta=' + Codigo + '&';
    rptURL = rptURL + 'CodEmpresa=' + $(Contenedor + 'hdnCodEmpresa').val() + '&';
    rptURL = rptURL + 'CodSede=' + $(Contenedor + 'hdnCodSede').val() + '&';
    rptURL = rptURL + 'CodTipoDoc=' + 10 + '&';
    rptURL = rptURL + 'SerieDoc=' + '' + '&';
    rptURL = rptURL + 'NumeroDoc=' + '' + '&';
    rptURL = rptURL + 'Cliente=' + $(Contenedor + 'txtCliente').val() + '&';
    rptURL = rptURL + 'NroRuc=' + $(Contenedor + 'txtNroRuc').val() + '&';
    rptURL = rptURL + 'SerieDocGuia=' + $("#MainContent_ddlSerieGuia option:selected").text() + '&';
    rptURL = rptURL + 'NumeroDocGuia=' + $(Contenedor + 'txtNumeroGuia').val() + '&';
    rptURL = rptURL + 'FechaEmision=' + $(Contenedor + 'txtEmision').val() + '&';
    rptURL = rptURL + 'CodDireccion=' + $(Contenedor + 'ddlDireccion').val() + '&';
    rptURL = rptURL + 'Destino=' + $("#MainContent_ddlDestino option:selected").text() + '&';
    rptURL = rptURL + 'Transportista=' + $("#MainContent_txtTransportista").val() + '&';
    rptURL = rptURL + 'DireccionTrans=' + $("#MainContent_ddlDireccionTransportista option:selected").text() + '&';
    rptURL = rptURL + 'Marca=' + $(Contenedor + 'txtMarcaGuia').val() + '&';
    rptURL = rptURL + 'NroBultos=' + NroBultos + '&';
    rptURL = rptURL + 'Licencia=' + $("#MainContent_txtLicenciaGuia").val() + '&';
    rptURL = rptURL + 'Peso=' + Peso + '&';
    rptURL = rptURL + 'Placa=' + $("#MainContent_txtPlaca").val() + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_DireccionTransportista(CodTransportista) {
    try {
        var objParams = {
            Filtro_CodTransportista: CodTransportista
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_DireccionTransportista_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            F_Update_Division_HTML('div_DireccionTransportista', result.split('~')[2]);
            $('#MainContent_ddlDireccionTransportista').css('background', '#FFFFE0');

            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function F_ImprimirFacturaHTML(codigo, Fila, rplc, TipoImp, TipoDoc) {
    var nrodoc = ''; TipoDoc = '1';
    if (codigo == undefined) {
        var imgID = Fila.id;
        //        var lblCodigo = '#' + imgID.replace('imgPdf', 'lblCodigo');
        var lblCodigo = '#' + imgID.replace(rplc, 'lblcodigo');
        var lblNumero = '#' + imgID.replace(rplc, 'lblNumero');

        codigo = $(lblCodigo).text();
        nrodoc = $(lblNumero).text();


    }
    else {
        nrodoc = $("#MainContent_ddlSerie option:selected").text()
    }


    { //si es factura ELECTRONICA : impresion ticketera **5** / pdf de frente **4**
        var rptURL = '';
        var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
        var TipoArchivo = 'application/pdf';
        var CodTipoArchivo = '4'; //impresion ticketera **5** / pdf de frente **4**
        var CodTipoArchivo2 = 16; // TipoDoc.toString(); //Formato a imprimir FT:1/BO:2/NC:3
        var CodMenu = '214';

        var imp = ''; var cop = '';
        if (TipoImp == 'PDF') {
            CodTipoArchivo = 5;
        }
        imp = ImpresoraPDF;
        cop = NroCopiasPDF;
        var ArchivoRpt = '';

        if (TipoImp == 'TK') {
            CodTipoArchivo = 16;
            imp = ImpresoraTickets;
            cop = NroCopiasTickets;

            switch (CodTipoArchivo2) {
                case 16: //NOTA DE VENTA
                    ArchivoRpt = "rptFacturaImpresionTicketNV.rpt";
                    break;
                default: //FACTURA
                    ArchivoRpt = "rptFacturaImpresionTicket.rpt";
                    break;
            }
        }

        var PrimeraCopia = 'ORIGINAL';
        var SegundaCopia = 'COPIA';

        rptURL = '../Reportes/Crystal.aspx';
        rptURL = rptURL + '?';
        rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
        rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
        rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
        rptURL = rptURL + 'CodTipoArchivo2=' + CodTipoArchivo2 + '&';
        rptURL = rptURL + 'Codigo=' + codigo + '&';
        rptURL = rptURL + 'Impresora=' + imp + '&'; //cambiar aca tambien
        rptURL = rptURL + 'NroCopias=' + cop + '&'; //cambiar aca tambien
        rptURL = rptURL + 'ArchivoRpt=' + ArchivoRpt + '&'; //cambiar aca tambien
        rptURL = rptURL + 'PrimeraCopia=' + PrimeraCopia + '&'; //cambiar aca tambien
        rptURL = rptURL + 'SegundaCopia=' + SegundaCopia + '&'; //cambiar aca tambien

        window.open(rptURL, "PopUpRpt", Params);
    }
    return false;
}

function F_ElegirCotizacion(Fila) {

    try {
        var Cuerpo = '#MainContent_';
        var imgID = "#" + Fila.id;
        var Clave = "";
        var hfCodProf = imgID.replace('imgSelecCot', 'hdnCodNtVenta');
        var CodEmp = $(Cuerpo + 'hdnCodEmpresa').val();
        var CodSede = $(Cuerpo + 'hdnCodSede').val();
        var serie = $(Cuerpo + "ddlSerie option:selected").text();

        var objParams = {
            Filtro_CodNotVenta: $(hfCodProf).val(),
            Filtro_CodEmpresa: CodEmp,
            Filtro_CodSede: CodSede,
            Filtro_CodDoc: 15,
            Filtro_NumSerie: serie
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ObtenerNotaVenta_Net(arg, function (resu) {
            var result = JSON.parse(resu);

            var str_resultado_operacion = result.int_resultado_operacion;
            var str_mensaje_operacion = result.str_mensaje_operacion;
            var objprof = result.objprof;

            if (str_mensaje_operacion == "") {

                $('#hfCodCtaCte').val(objprof.CodCliente);
                $(Cuerpo + 'hdnCodEmpresa').val(objprof.CodEmpresa);
                $(Cuerpo + 'hdnCodSede').val(objprof.CodSede);
                $(Cuerpo + 'txtCliente').val(objprof.RazonSocial);
                $(Cuerpo + 'txtNroRuc').val(objprof.NroRuc);
                $(Cuerpo + 'txtEmpresa').val(objprof.Empresa);
                $(Cuerpo + 'ddlMoneda').val(objprof.CodMoneda);
//                $(Cuerpo + 'txtEmision').val(GetFormattedDate(objprof.FechaEmision));
                $(Cuerpo + 'txtVencimiento').val(GetFormattedDate(objprof.FechaVencimiento));
                $(Cuerpo + 'txtSubTotal').val(objprof.SubTotal);
                $(Cuerpo + 'txtIgv').val(objprof.Igv);
                $(Cuerpo + 'txtTotal').val(parseFloat(objprof.Total).toFixed(2));
                $(Cuerpo + 'lblTC').val(objprof.TipoCambio);
                $(Cuerpo + 'txtDistrito').val(objprof.Distrito);
                $(Cuerpo + 'txtDireccion').val(objprof.Direccion);
                $(Cuerpo + 'txtDistrito').val(objprof.Distrito);        
                $(Cuerpo + 'lblAcuentaNv').text(objprof.Acuenta);
                $(Cuerpo + 'ddlFormaPago').val(objprof.CodFormaPago);
                if (objprof.CodFormaPago==0)
                    $(Cuerpo + 'ddlFormaPago').val(1);
                $(Cuerpo + 'hfFlagNotaVenta').val(1);
                $('#hfCodDepartamento').val(objprof.CodDepartamento);
                $('#hfCodProvincia').val(objprof.CodProvincia);
                $('#hfCodDistrito').val(objprof.CodDistrito);
                $('#hfCodDocumentoRef').val($(hfCodProf).val());
                $(Cuerpo + 'ddlVendedorComision').val(objprof.CodVendedor);

                F_Update_Division_HTML('div_grvDetalleArticulo', result.det);
                F_AgregarTemporal2(objprof.listaDet, objprof.FlagIncluyeIgv);
                $('.ccsestilo').css('background', '#FFFFE0');
                
                switch(objprof.FlagIncluyeIgv)
                {
                    case 1:
                        $('#MainContent_chkMayorista').prop("checked", true);
                        $('#MainContent_chkMinorista').prop("checked", false);
                        $('#MainContent_chkSi').prop("checked", true);
                        $('#MainContent_chkNo').prop("checked", false);
                        $('#MainContent_chkSi').prop("disabled", false);
                        $('#MainContent_chkNo').prop("disabled", false);
                    break;
                    case 2:
                        $('#MainContent_chkMayorista').prop("checked", true);
                        $('#MainContent_chkMinorista').prop("checked", false);
                        $('#MainContent_chkSi').prop("checked", false);
                        $('#MainContent_chkNo').prop("checked", true);
                        $('#MainContent_chkSi').prop("disabled", false);
                        $('#MainContent_chkNo').prop("disabled", false);
                    break;
                    case 3:
                        $('#MainContent_chkMayorista').prop("checked", false);
                        $('#MainContent_chkMinorista').prop("checked", true);
                        $('#MainContent_chkSi').prop("checked", false);
                        $('#MainContent_chkNo').prop("checked", false);
                        $('#MainContent_chkSi').prop("disabled", true);
                        $('#MainContent_chkNo').prop("disabled", true);
                    break;
                    default:
                    break;
                }

                $("#divConsultaNotaVenta").dialog('close');

                actualizarAcuentaNv();
                //F_CalcularNotaVentaConIgv();
                F_ObtenerDireccionCliente();
                numerar();
                //$('.tprecio').attr('readonly', true);
                //$('.tcant').attr('readonly', true);
               
            }

            MostrarEspera(false);
            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

var ValorSINOdefecto = true;
function F_ValidarCheckMayoristaMinorista(ControlID) {

    if (ControlID == 'MainContent_chkMayorista') {
        if ($('#MainContent_chkMayorista').prop('checked') == true) {
         
            $('#MainContent_chkMinorista').prop('checked', false);

            $('#MainContent_chkSi').prop("disabled", false);
            $('#MainContent_chkNo').prop("disabled", false);
            if (ValorSINOdefecto == true) {
                    $('#MainContent_chkSi').prop("checked", false);
                    $('#MainContent_chkNo').prop("checked", false);
                } else {
                    $('#MainContent_chkSi').prop("checked", false);
                    $('#MainContent_chkNo').prop("checked", false);
                }
        }
        else {
            if ($('#MainContent_chkNo').is(':checked'))
                F_AplicarIgv(true);

            $('#MainContent_chkMayorista').prop('checked', false);
  

            $('#MainContent_chkSi').prop("checked", false);
            $('#MainContent_chkNo').prop("checked", false);
            $('#MainContent_chkSi').prop("disabled", true);
            $('#MainContent_chkNo').prop("disabled", true);
            ValorSINOdefecto = true;

        } }
    else {
        if ($('#MainContent_chkMinorista').prop('checked') == true) {
            if ($('#MainContent_chkNo').is(':checked'))
                F_AplicarIgv(true);

            $('#MainContent_chkMinorista').prop('checked', true);
            $('#MainContent_chkMayorista').prop('checked', false);

            $('#MainContent_chkSi').prop("checked", false);
            $('#MainContent_chkNo').prop("checked", false);
            $('#MainContent_chkSi').prop("disabled", true);
            $('#MainContent_chkNo').prop("disabled", true);
            ValorSINOdefecto = true;
        }
        else {

           // $('#MainContent_chkMayorista').prop('checked', true);    

            $('#MainContent_chkSi').prop("disabled", false);
            $('#MainContent_chkNo').prop("disabled", false);
            if (ValorSINOdefecto == true) {
                    $('#MainContent_chkSi').prop("checked", false);
                    $('#MainContent_chkNo').prop("checked", false);
                } else {
                    $('#MainContent_chkSi').prop("checked", false);
                    $('#MainContent_chkNo').prop("checked", false);
                }
        } }

return true;
}

function F_ValidarCheckMayoristaSINO(ControlID) {

    if (ControlID == 'MainContent_chkSi') {
        if ($('#MainContent_chkSi').prop('checked') == true) {
            $('#MainContent_chkSi').prop('checked', true);
            $('#MainContent_chkNo').prop('checked', false);
            //ValorSINOdefecto = true;
        }
        else {
            $('#MainContent_chkSi').prop('checked', false);
            $('#MainContent_chkNo').prop('checked', true);    
            //ValorSINOdefecto = false;
        } }
    else {
        if ($('#MainContent_chkNo').prop('checked') == true) {
            $('#MainContent_chkNo').prop('checked', true);
            $('#MainContent_chkSi').prop('checked', false);
            //ValorSINOdefecto = false;
        }
        else {
            $('#MainContent_chkNo').prop('checked', false);
            $('#MainContent_chkSi').prop('checked', true); 
            //ValorSINOdefecto = true;   
        } }

        var Aplicar = true;
        if ($('#MainContent_chkNo').is(':checked'))
        Aplicar = false;

    F_AplicarIgv(Aplicar);
return true;
}

function F_ActualizarDetalle(){
  try 
        {
        if($('#MainContent_txtTotal').val()=='0.00')
        return;

        var FlagIgv = 0;
        var Contenedor = '#MainContent_';    
        var tasaigv = 1;

        if ($('#MainContent_chkConIgvMaestro').is(':checked')) { 
             tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
             FlagIgv = 1;         
        }                
                var objParams = {
                                  Filtro_CodDocumentoVenta: $('#hfCodigoTemporal').val(),
                                  Filtro_TasaIgv: tasaigv,
                                  Filtro_FlagIgv: FlagIgv,
                                  Filtro_TasaIgvDscto:parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1)                                    
                                };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_ActualizarDetalle_NET(arg, function (result) {
                
                  MostrarEspera(false);

                   var str_resultado_operacion = result.split('~')[0];
                   var str_mensaje_operacion = result.split('~')[1];

                  if (str_mensaje_operacion == "Se Grabo Correctamente")
                   {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    if (result.split('~')[5]=='0')
                    {
                         $('#MainContent_txtTotal').val('0.00');
                         $('#MainContent_txtAcuenta').val('0.00');
                         $('#MainContent_txtIgv').val('0.00');
                         $('#MainContent_txtSubTotal').val('0.00');
                         $('#MainContent_txtDsctoTotal').val('0.00');
                         $('#MainContent_txtMonto').val('0.00');
                    }
                    else
                    {
                         $('#MainContent_txtTotal').val(result.split('~')[5]);
                         $('#MainContent_txtAcuenta').val(result.split('~')[5]);
                         $('#MainContent_txtIgv').val(result.split('~')[6]);
                         $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                         $('#MainContent_txtMonto').val(result.split('~')[5]);
                         $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                    }                   
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                     $('.ccsestilo').css('background', '#FFFFE0');
                   }
                else 
                {
                     F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                      $('.ccsestilo').css('background', '#FFFFE0');
                     alertify.log(result.split('~')[1]);
                }

                $('#hfNotaPedido').val(result.split('~')[9]);
                 if ($('#hfNotaPedido').val() == '5')
                        $('#hfCodCtaCteNP').val($('#hfCodCtaCte').val());
                        else $('#hfCodCtaCteNP').val(0);

                return false;

                });
        }
        
        catch (e) 
        {
              MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }
}

function F_BuscarDireccionPorDefecto() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Servicios.asmx/F_TCDireccion_ListarXCodDistrito_AutoComplete',
        data: "{'Direccion':'','CodDepartamento':'" + $('#hfCodDepartamento').val() + "','CodProvincia':'" + $('#hfCodProvincia').val() + "','CodDistrito':'" + $('#hfCodDistrito').val() + "','CodCtaCte':'" + $('#hfCodCtaCte').val() + "'}",
        dataType: "json",
        async: false,
        success: function (data) {
                if (data.d.length >= 1)
                {
                    var sel = $('#MainContent_ddlDireccion');
                    //sel.empty();

                    $.each(data.d, function (item) {
//                        opt.appendChild(document.createTextNode(data.d[item].split(',')[1]));
//                        opt.value = data.d[item].split(',')[0]; 
//                        sel.appendTo(opt); 


//                        var option = document.createElement("option"); //Creamos la opcion
//                        var p =     document.getElementsByTagName('p')[0];
//                        option.innerHTML = data.d[item].split(',')[0]; //Metemos el texto en la opción
//                        sel.appendChild(option); //Metemos la opción en el select

//	                sel.options[sel.options.length] = new Option(data.d[item].split(',')[1], data.d[item].split(',')[0]);

//       var option = document.createElement("OPTION");
//       option.innerHTML = data.d[item].split(',')[1];
//       option.value = data.d[item].split(',')[0];
//       sel.options.add(option);



//    for(var i=0; i < provincias.length; i++){ 
//        var option = document.createElement("option"); //Creas el elemento opción
//        $(option).html(provincias[i]); //Escribes en él el nombre de la provincia
//        $(option).appendTo("#provincias"); //Lo metes en el select con id provincias
//    }


                        }
                        )


                    

//                    $('#hfCodDireccion').val(data.d[0].split(',')[0]);
//                    $('#MainContent_txtDireccion').val(data.d[0]);
                }
        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }
    });

    return false;
}

function F_ValidaRucDni() {
if (!F_SesionRedireccionar(AppSession)) return false;
    if ($('#MainContent_txtNroRuc').val().length > 0)
    {
            if ($('#MainContent_txtNroRuc').val().length == 8)
            {
                //$('#MainContent_txtCliente').prop('disabled', true);
                $('#MainContent_txtCliente').val('');
                $('#hfCliente').val('');
                $('#MainContent_txtApePaterno').prop('disabled', false);
                $('#MainContent_txtApeMaterno').prop('disabled', false);
                $('#MainContent_txtNombres').prop('disabled', false);
                $('#MainContent_txtApePaterno').focus();
                $('#hfNroRuc').val($('#MainContent_txtNroRuc').val());
                F_BuscarDatosPorRucDni($('#MainContent_txtNroRuc').val());
                return true;
            }
            else
            {
                if ($('#MainContent_txtNroRuc').val().length == 11)
                {
                    $('#MainContent_txtCliente').prop('disabled', false);
                    $('#MainContent_txtApePaterno').prop('disabled', true);
                    $('#MainContent_txtApePaterno').val('');
                    $('#MainContent_txtApeMaterno').prop('disabled', true);
                    $('#MainContent_txtApeMaterno').val('');
                    $('#MainContent_txtNombres').prop('disabled', true);
                    $('#MainContent_txtNombres').val('');
                    $('#MainContent_txtCliente').focus();
                    F_BuscarPadronSunat();
                    return true;
                }
                else
                {
                    if ($('#MainContent_txtNroRuc').val() == '1' | $('#MainContent_txtNroRuc').val() == '0')
                    {
                        var NroRuc = '11111111';
                        if ($('#MainContent_txtNroRuc').val() == '0')
                            NroRuc = '00000000000';
                        //$('#MainContent_txtCliente').prop('disabled', true);
                        $('#MainContent_txtCliente').val('');
                        $('#hfCliente').val('');
                        $('#MainContent_txtApePaterno').prop('disabled', false);
                        $('#MainContent_txtApeMaterno').prop('disabled', false);
                        $('#MainContent_txtNombres').prop('disabled', false);
                        $('#MainContent_txtApePaterno').focus();
                        $('#hfNroRuc').val($('#MainContent_txtNroRuc').val());
                        F_BuscarDatosPorRucDni(NroRuc);
                        return true;
                    }
                    else
                    {
                        alertify.log('NRO. RUC/DNI INVALIDO'); 
                        $('#MainContent_txtNroRuc').val('');
                        F_LimpiarCampos();
                        return true;
                    }
                }
            }
    }
    else
    {
        if ($('#MainContent_txtNroRuc').val() != $('#hfNroRuc').val())
        {
            F_LimpiarCampos();
        }
    }
   return false;
}

function F_BuscarPadronSunat() {

            MostrarEspera(true);

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCCuentaCorriente_PadronSunat_Milagros',
                data: "{'NroRuc':'" + $('#MainContent_txtNroRuc').val() +"'}",
                dataType: "json",
                async: false,
                success: function (dbObject) {
                MostrarEspera(true);
                var data = dbObject.d;
                try {
                    $('#hfCodCtaCte').val(data[0].split(',')[0]); 
                    $('#hfCliente').val(data[0].split(',')[1]); //razon social
                    $('#MainContent_txtNroRuc').val(data[0].split(',')[8]);
                    $('#hfNroRuc').val(data[0].split(',')[8]);
                    $('#MainContent_txtCliente').val(data[0].split(',')[1]);
                    $('#hfCliente').val(data[0].split(',')[1]);
                    $('#MainContent_txtDireccion').val(data[0].split(',')[2]);
                    $('#MainContent_txtDestino').val(data[0].split(',')[2]);
                    $('#MainContent_txtDistrito').val(data[0].split(',')[4]);
                    $('#MainContent_txtApePaterno').val("");
                    $('#MainContent_txtApeMaterno').val("");
                    $('#MainContent_txtNombres').val("");
                    $('#hfCodDireccion').val('0');
                    $('#hfCodDepartamento').val(data[0].split(',')[5]);
                    $('#hfCodProvincia').val(data[0].split(',')[6]);
                    $('#hfCodDistrito').val(data[0].split(',')[7]);
                    $('#hfDistrito').val(data[0].split(',')[4]);
                    $('#txtSaldoCreditoFavor').text(data[0].split(',')[12]);
                    $('#hfSaldoCreditoFavor').val(data[0].split(',')[12].replace("S/", "").replace(" ", ""));
                     $('#MainContent_txtObservacionCliente').val(data[0].split(',')[14]);
                    if ($('#hfNroRuc').val() != '11111111') {
                    var FlagIncluyeIgv = data[0].split(',')[13];

                    if (FlagIncluyeIgv == '1') //Mayorista - Incluye Igv
                    {
                        $('#MainContent_chkMayorista').prop("checked", true);
                        $('#MainContent_chkMinorista').prop("checked", false);
                        $('#MainContent_chkSi').prop("checked", true);
                        $('#MainContent_chkNo').prop("checked", false);
                        $('#MainContent_chkSi').prop("disabled", false);
                        $('#MainContent_chkNo').prop("disabled", false);
                    }

                    if (FlagIncluyeIgv == '2') //Mayorista - Incluye Igv
                    {
                        $('#MainContent_chkMayorista').prop("checked", true);
                        $('#MainContent_chkMinorista').prop("checked", false);
                        $('#MainContent_chkSi').prop("checked", false);
                        $('#MainContent_chkNo').prop("checked", true);
                        $('#MainContent_chkSi').prop("disabled", false);
                        $('#MainContent_chkNo').prop("disabled", false);
                    }

                    if (FlagIncluyeIgv == '3') //Mayorista - Incluye Igv
                    {
                        $('#MainContent_chkMayorista').prop("checked", false);
                        $('#MainContent_chkMinorista').prop("checked", true);
                        $('#MainContent_chkSi').prop("checked", false);
                        $('#MainContent_chkNo').prop("checked", false);
                        $('#MainContent_chkSi').prop("disabled", true);
                        $('#MainContent_chkNo').prop("disabled", true);
                    }
                    }

            F_ObtenerDireccionCliente();
            MostrarEspera(false);
//            if ($('#hfNotaPedido').val() == '5' & $('#hfCodCtaCte').val() != $('#hfCodCtaCteNP').val())
//                F_EliminarTodos();
//            if ($('#hfNotaPedido').val() != '0'  & ($('#MainContent_ddlTipoDoc').val() == '5' | $('#MainContent_ddlTipoDoc').val() == '15' | $('#MainContent_ddlTipoDoc').val() == '16'))
//                F_EliminarTodos();

                }
                catch (x) { alertify.log(x); }
                MostrarEspera(false);
            },


                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });



return true;
}

function F_BuscarDatosPorRucDni(RucDni) {

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_BuscarDatosPorRucDni_Milagros',
                data: "{'NroRuc':'" + RucDni +"'}",
                dataType: "json",
                async: false,
                success: function (dbObject) {
                MostrarEspera(true);
                var data = dbObject.d;
                if (data.length > 0)
                {
                try {
                                $('#hfCodCtaCte').val(data[0].split(',')[0]); 
                                $('#hfCliente').val(data[0].split(',')[1]); //razon social
                                $('#MainContent_txtNroRuc').val(data[0].split(',')[8]);
                                $('#hfNroRuc').val(data[0].split(',')[8]);
                                $('#MainContent_txtCliente').val(data[0].split(',')[1]);
                                $('#hfCliente').val(data[0].split(',')[1]);
                                $('#MainContent_txtDireccion').val(data[0].split(',')[2]);
                                $('#MainContent_txtDestino').val(data[0].split(',')[2]);
                                $('#MainContent_txtDistrito').val(data[0].split(',')[4]);

                                $('#MainContent_txtApePaterno').val(data[0].split(',')[9]);
                                $('#hfApePaterno').val(data[0].split(',')[9]);
                                $('#MainContent_txtApeMaterno').val(data[0].split(',')[10]);
                                $('#MainContent_txtNombres').val(data[0].split(',')[11]);
                                $('#hfCodDireccion').val('0');

                                $('#hfCodDepartamento').val(data[0].split(',')[5]);
                                $('#hfCodProvincia').val(data[0].split(',')[6]);
                                $('#hfCodDistrito').val(data[0].split(',')[7]);
                                $('#hfDistrito').val(data[0].split(',')[4]);
                                $('#txtSaldoCreditoFavor').text(data[0].split(',')[12]);
                                $('#hfSaldoCreditoFavor').val(data[0].split(',')[12].replace("S/", "").replace(" ", ""));
                                $('#MainContent_txtObservacionCliente').val(data[0].split(',')[14]);
                    if ($('#hfNroRuc').val() != '11111111') {
                    var FlagIncluyeIgv = data[0].split(',')[13];

                    if (FlagIncluyeIgv == '1') //Mayorista - Incluye Igv
                    {
                        $('#MainContent_chkMayorista').prop("checked", true);
                        $('#MainContent_chkMinorista').prop("checked", false);
                        $('#MainContent_chkSi').prop("checked", true);
                        $('#MainContent_chkNo').prop("checked", false);
                        $('#MainContent_chkSi').prop("disabled", false);
                        $('#MainContent_chkNo').prop("disabled", false);
                    }

                    if (FlagIncluyeIgv == '2') //Mayorista - Incluye Igv
                    {
                        $('#MainContent_chkMayorista').prop("checked", true);
                        $('#MainContent_chkMinorista').prop("checked", false);
                        $('#MainContent_chkSi').prop("checked", false);
                        $('#MainContent_chkNo').prop("checked", true);
                        $('#MainContent_chkSi').prop("disabled", false);
                        $('#MainContent_chkNo').prop("disabled", false);
                    }

                    if (FlagIncluyeIgv == '3') //Mayorista - Incluye Igv
                    {
                        $('#MainContent_chkMayorista').prop("checked", false);
                        $('#MainContent_chkMinorista').prop("checked", true);
                        $('#MainContent_chkSi').prop("checked", false);
                        $('#MainContent_chkNo').prop("checked", false);
                        $('#MainContent_chkSi').prop("disabled", true);
                        $('#MainContent_chkNo').prop("disabled", true);
                    }
                    }

                                F_ObtenerDireccionCliente();
                }
                catch (x) { alertify.log(x); }
                }
                else {
                    alertify.log('NO SE ENCUENTRA DNI, CREELO DESDE EL MANTENIMIENTO DE CLIENTES');
                    F_LimpiarCampos();
                    $('#MainContent_txtNroRuc').focus();
                }
                MostrarEspera(false);
            },


                error: function (response) {
                    alertify.log(response.responseText);
                },
                failure: function (response) {
                    alertify.log(response.responseText);
                }
            });



return true;
}

function F_LimpiarCampos() {
if (!F_SesionRedireccionar(AppSession)) return false;


    $('#hfCodDepartamento').val('0');
    $('#hfCodProvincia').val('0');
    $('#hfCodDistrito').val('0');
    $('#hfCodCtaCte').val('0');
    $('#MainContent_txtCliente').val('');
    $('#MainContent_txtDireccion').val('');
    $('#hfCodCtaCte').val(0);
    $('#MainContent_txtNroRuc').val('');
    $('#hfNroRuc').val('');
    $('#MainContent_txtCliente').val('');
    $('#hfCliente').val('');
    $('#MainContent_txtDireccion').val('');
    $('#hfCodDireccion').val(0);
    $('#hfCodDepartamento').val(0);
    $('#hfCodProvincia').val(0);
    $('#hfCodDistrito').val(0);
    $('#MainContent_ddlDireccion').empty();


return true;
}

function F_ElegirNV(Fila) {

    try {
        var Cuerpo = '#MainContent_';
        var imgID = "#" + Fila.id;
        var Clave = "";
        var hfCodProf = imgID.replace('imgReemplazar', 'lblcodigo');
        var lblNumero = imgID.replace('imgReemplazar', 'lblNumero');

        var objParams = {
            Filtro_CodNotVenta: $(hfCodProf).text(),
            Filtro_CodEmpresa: 0,
            Filtro_CodSede: 0,
            Filtro_CodDoc: 16,
            Filtro_NumSerie: ''
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ObtenerNotaVenta_Net(arg, function (resu) {
            var result = JSON.parse(resu);

            var str_resultado_operacion = result.int_resultado_operacion;
            var str_mensaje_operacion = result.str_mensaje_operacion;
            var objprof = result.objprof;

            if (str_mensaje_operacion == "") {

                $('#hfCodCtaCte').val(objprof.CodCliente);
                $(Cuerpo + 'hdnCodEmpresa').val(objprof.CodEmpresa);
                $(Cuerpo + 'hdnCodSede').val(objprof.CodSede);
                $(Cuerpo + 'txtCliente').val(objprof.RazonSocial);
                $(Cuerpo + 'txtNroRuc').val(objprof.NroRuc);
                $(Cuerpo + 'txtEmpresa').val(objprof.Empresa);
                $(Cuerpo + 'ddlMoneda').val(objprof.CodMoneda);
                $(Cuerpo + 'txtEmision').val(GetFormattedDate(objprof.FechaEmision));
                $(Cuerpo + 'txtVencimiento').val(GetFormattedDate(objprof.FechaVencimiento));
                $(Cuerpo + 'txtSubTotal').val(objprof.SubTotal);
                $(Cuerpo + 'txtIgv').val(objprof.Igv);
                $(Cuerpo + 'txtTotal').val(objprof.Total);
                $(Cuerpo + 'lblTC').val(objprof.TipoCambio);
                $(Cuerpo + 'txtDistrito').val(objprof.Distrito);
                $(Cuerpo + 'txtDireccion').val(objprof.Direccion);
                $(Cuerpo + 'txtDistrito').val(objprof.Distrito);
                $(Cuerpo + 'txtObservacion').val(objprof.Observacion2);
                $(Cuerpo + 'lblAcuentaNv').text(objprof.Acuenta);
                $(Cuerpo + 'ddlFormaPago').val(objprof.CodFormaPago);
                $(Cuerpo + 'txtObservacionCliente').val(objprof.Comentario);
                if (objprof.CodFormaPago==0)
                    $(Cuerpo + 'ddlFormaPago').val(1);
                $(Cuerpo + 'hfFlagNotaVenta').val(1);
                $('#hfCodDepartamento').val(objprof.CodDepartamento);
                $('#hfCodProvincia').val(objprof.CodProvincia);
                $('#hfCodDistrito').val(objprof.CodDistrito);
                $('#hfCodDocumentoVentaAnterior').val($(hfCodProf).text());
                $('#MainContent_txtNumero').val($(lblNumero).text().split('-')[1]);
                $(Cuerpo + 'ddlVendedorComision').val(objprof.CodVendedor);

                F_Update_Division_HTML('div_grvDetalleArticulo', result.det);
                F_AgregarTemporal2(objprof.listaDet, objprof.FlagIncluyeIgv);

                switch(objprof.FlagIncluyeIgv)
                {
                    case 1:
                        $('#MainContent_chkMayorista').prop("checked", true);
                        $('#MainContent_chkMinorista').prop("checked", false);
                        $('#MainContent_chkSi').prop("checked", true);
                        $('#MainContent_chkNo').prop("checked", false);
                        $('#MainContent_chkSi').prop("disabled", false);
                        $('#MainContent_chkNo').prop("disabled", false);
                    break;
                    case 2:
                        $('#MainContent_chkMayorista').prop("checked", true);
                        $('#MainContent_chkMinorista').prop("checked", false);
                        $('#MainContent_chkSi').prop("checked", false);
                        $('#MainContent_chkNo').prop("checked", true);
                        $('#MainContent_chkSi').prop("disabled", false);
                        $('#MainContent_chkNo').prop("disabled", false);
                    break;
                    case 3:
                        $('#MainContent_chkMayorista').prop("checked", false);
                        $('#MainContent_chkMinorista').prop("checked", true);
                        $('#MainContent_chkSi').prop("checked", false);
                        $('#MainContent_chkNo').prop("checked", false);
                        $('#MainContent_chkSi').prop("disabled", true);
                        $('#MainContent_chkNo').prop("disabled", true);
                    break;
                    default:
                    break;
                }
                

                $('.ccsestilo').css('background', '#FFFFE0');

                F_ObtenerDireccionCliente();
                $("#divTabs").tabs("option", "active", $("#liRegistro").index());
            }

            MostrarEspera(false);
            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_AplicarIgv(Aplicar) {

    var chkDel = 'MainContent_grvDetalleArticulo_chkEliminar_0';
    $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
        chkDel = '#' + this.id;
        var hfcodtipoproducto_grilla = chkDel.replace('chkEliminar', 'hfFlagIncluyeIgv');
        var Precio = chkDel.replace('chkEliminar', 'txtPrecio');
        var pre = 0;
        if ($(hfcodtipoproducto_grilla).val() == '1') {
            if (Aplicar == true)
            {
                pre = $(Precio).val();
                pre = pre * (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
                pre = (((pre) * 1).toFixed(1)) /1;
                $(Precio).val(pre);
                F_ActualizarCantidad(Precio.replace('#', ''));
            }
            else
            {
                pre = $(Precio).val();
                pre = pre / (Number($('#MainContent_ddlIgv option:selected').text()) + 1);
                pre = (((pre) * 1).toFixed(1)) /1;
                $(Precio).val(pre);
                F_ActualizarCantidad(Precio.replace('#', ''));
            }
        }

    });

return true;
}

