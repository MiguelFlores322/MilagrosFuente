var AppSession = "../CajaBanco/CajaChica.aspx";

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);

    $('.Jq-ui-dtp').datepicker('setDate', new Date());

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

    $('#MainContent_txtHasta').datepicker({ onSelect: function () {
        var date = $(this).datepicker('getDate');
        if (date) {
            date.setDate(1);
            $(this).datepicker('setDate', date);
        }
    }
    });

    $('#MainContent_txtHasta').datepicker({ beforeShowDay: function (date) {
        return [date.getDate() == 1, ''];
    }
    });

    $('#MainContent_btnReGenerarCaja').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

        try {
            if (!F_ValidarGrabarDocumento())
                return false;

            if (confirm("GENERAR PREVIO DE CAJA")) {
                F_GrabarDocumento(1);
               // F_Reporte(16);
            }


            return false;
        }
        catch (e) {

            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnReporteResumido').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try {
            F_Reporte(15);
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnReporteDetalle').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try {
            F_Reporte(16);
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnReporteCancelacion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try {
            F_Reporte(17);
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnLiquidacionCaja').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try {

            $("#divConsultaFactura").dialog({
                resizable: false,
                modal: true,
                title: "LIQUIDACION CONTABLE DE CAJA",
                title_html: true,
                height: 650,
                width: 790,
                autoOpen: false
            });

            $('#divConsultaFactura').dialog('open');

            var objParams = {
                Filtro_Fecha: $('#MainContent_txtDesde').val()
            };
            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

            MostrarEspera(true);
            F_Buscar_Factura_NET(arg, function (result) {
                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") {
                    F_Update_Division_HTML('div_grvConsultaFactura', result.split('~')[2]);

                    var chkSi = "";
                    var hfTotal = "";
                    var Total = 0.00;

                    $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
                        chkSi = '#' + this.id;
                        hfTotal = chkSi.replace('chkOK', 'hfTotal');
                        $(chkSi).prop('checked', true);
                        Total += parseFloat($(hfTotal).val());
                    });
                    $('#MainContent_txtTotalFactura').val(parseFloat(Total).toFixed(2));
                    $('#MainContent_txtTotalLiquidacion').val(parseFloat(Total).toFixed(2));
                    //$('#MainContent_txtMontoAjustado').val(parseFloat(Total).toFixed(2));
                    $('#MainContent_txtMonto').val(parseFloat(parseFloat(Total).toFixed(1)).toFixed(2));
                    $('#MainContent_txtEmision').val($('#MainContent_txtDesde').val());
                    $('#MainContent_ddlMoneda').val(1);
                    $('#MainContent_ddlBanco').val(1);

                    if ($('#MainContent_txtTotalFactura').val() == "NaN") {
                        $('#MainContent_txtTotalFactura').val("0.00");
                        $('#MainContent_txtTotalLiquidacion').val("0.00");
                        $('#MainContent_txtMonto').val("0.00");
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


        return false;

    });

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try {
            if (!F_Validar())
                return false;

            if (confirm("ESTA SEGURO DE GRABAR LA LIQUIDACION"))
                F_Grabar();

            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

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

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtTC').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtNroOperacion').css('background', '#FFFFE0');

    $('#MainContent_txtTotalFactura').css('background', '#FFFFE0');

    $('#MainContent_txtTotalLiquidacion').css('background', '#FFFFE0');

    $('#MainContent_txtOperacion').css('background', '#FFFFE0');

    $('#MainContent_txtMonto').css('background', '#FFFFE0');

    F_Controles_Inicializar();

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

$(document).on("change", "select[id $= 'MainContent_ddlMoneda']", function () {
    F_ListarNroCuenta();
});

$(document).on("change", "select[id $= 'MainContent_ddlBanco']", function () {
    F_ListarNroCuenta();
});

function F_Reporte(CodMenu) {

    var Cuerpo = '#MainContent_';
    var Cadena = 'Ingresar los sgtes. Datos:';

    if ($(Cuerpo + 'txtDesde').val() == '')
        Cadena = Cadena + '<p></p>' + 'Desde';

    if (Cadena != 'Ingresar los sgtes. Datos:') {
        alertify.log(Cadena);
        return false;
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'FechaEmision=' + $('#MainContent_txtDesde').val() + '&';

    window.open(rptURL, "PopUpRpt", Params);

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

function F_ValidarGrabarDocumento() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtDesde').val() == '')
            Cadena = Cadena + '<p></p>' + 'Fecha de Caja';

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

function F_GrabarDocumento(Flag) {
    try {
        var Contenedor = '#MainContent_';
        var objParams = {
            Filtro_FechaCaja: $(Contenedor + 'txtDesde').val(),
            Filtro_Flag: Flag
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
                if (str_mensaje_operacion == 'Se Grabo Correctamente') {
                    alertify.log('Se grabo correctamente');
                    F_Reporte(16);
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

function F_Controles_Inicializar() {

    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtDesde').val(),
                Filtro_CodBanco: '1',
                Filtro_CodMoneda: '1'
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
                        F_Update_Division_HTML('div_moneda', result.split('~')[2]);
                        F_Update_Division_HTML('div_MedioPago', result.split('~')[4]);
                        F_Update_Division_HTML('div_Banco', result.split('~')[5]);
                        F_Update_Division_HTML('div_Cuenta', result.split('~')[6]);
                        $('#MainContent_txtTC').val(result.split('~')[3]);
                        $('#MainContent_ddlMoneda').val('1');
                        $('#MainContent_ddlMedioPago').val('3');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlBanco').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlCuenta').css('background', '#FFFFE0');
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
                        $('#MainContent_ddlCuenta').css('background', '#FFFFE0');
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

function yyyymmdd(dateIn) {
    var yyyy = dateIn.getFullYear();
    var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
    var dd = dateIn.getDate();
    return String(10000 * yyyy + 100 * mm + dd); // Leading zeros for mm and dd
}

function F_Validar() {

    try {

        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        var Fecha = yyyymmdd(new Date($(Cuerpo + 'txtEmision').val()));
        var Operacion = yyyymmdd(new Date($(Cuerpo + 'txtOperacion').val()));

        if ($(Cuerpo + 'txtTC').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtTC').val() == '')
            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtEmision').val() == '')
            Cadena = Cadena + '<p></p>' + 'Emision';

        if ($(Cuerpo + 'txtOperacion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Operacion';

        if ($(Cuerpo + 'txtTotalFactura').val() == '0.00')
            Cadena = Cadena + '<p></p>' + 'Total Factura';

        if ($(Cuerpo + 'txtTotalLiquidacion').val() == '0.00')
            Cadena = Cadena + '<p></p>' + 'Total Liquidacion';

        if (Math.abs(parseFloat($(Cuerpo + 'txtMonto').val()) - parseFloat($(Cuerpo + 'txtTotalLiquidacion').val())) > 0.10)
            Cadena = Cadena + '<p></p>' + 'Monto Ajustado no debe ser superior a 0.10';

        if ($(Cuerpo + 'ddlMedioPago').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Medio de Pago';

        if (($(Cuerpo + 'ddlMedioPago').val() != '1' & $(Cuerpo + 'ddlMedioPago').val() != '5') && $(Cuerpo + 'txtNroOperacion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Nro Operacion';

        if (($(Cuerpo + 'ddlMedioPago').val() != '1' & $(Cuerpo + 'ddlMedioPago').val() != '5') && $(Cuerpo + 'ddlCuenta').val() == null)
            Cadena = Cadena + '<p></p>' + 'Nro Cuenta';

        if (($(Cuerpo + 'txtEmision').val() != '' && $(Cuerpo + 'txtOperacion').val() != '') && parseFloat(Fecha) > parseFloat(Operacion))
            Cadena = Cadena + '<p></p>' + 'La Fecha de Operacion no debe ser anterior a la Fecha de la Caja';

        if ($(Cuerpo + 'txtTC').val() != '' && $(Cuerpo + 'txtTC').val() != '0' && $(Cuerpo + 'txtTotalFactura').val() != "" && $(Cuerpo + 'txtTotalLiquidacion').val() != "") {
            if ($('#MainContent_ddlMoneda').val() == 1) {
                if (parseFloat($(Cuerpo + 'txtTotalFactura').val()) != parseFloat($(Cuerpo + 'txtTotalLiquidacion').val()))
                    Cadena = Cadena + '<p></p>' + 'Total Factura y Total Liquidacion deben ser iguales.';
            }
            else {
                if (parseFloat($(Cuerpo + 'txtTotalFactura').val()) != (parseFloat($(Cuerpo + 'txtTotalLiquidacion').val()) * parseFloat($(Cuerpo + 'txtTC').val())).toFixed(2))
                    Cadena = Cadena + '<p></p>' + 'Total Factura y Total Liquidacion pago deben ser equivalentes.';
            }
        }

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

function F_Grabar() {
    try {
        var Contenedor = '#MainContent_';
        var CodBanco = 0;
        var CodCtaBancaria = 0;
        var NroOperacion = '';
        var CodTipoDoc = 19;
        var chkSi = "";
        var hfID = "";
        var arrDetalle = new Array();

        switch ($(Contenedor + 'ddlMedioPago').val()) {
            case '1':
            case '5':
                CodBanco = 0;
                CodCtaBancaria = 0;
                NroOperacion = "";
                break;
            case '2':
            case '3':
            case '4':
                CodBanco = $(Contenedor + 'ddlBanco').val();
                CodCtaBancaria = $(Contenedor + 'ddlCuenta').val();
                NroOperacion = $(Contenedor + 'txtNroOperacion').val();
                break;
            default:
                break;
        }

        $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
            chkSi = '#' + this.id;
            hfID = chkSi.replace('chkOK', 'hfID');

            if ($(chkSi).is(':checked')) {
                var objDetalle = {
                    ID: $(hfID).val()
                };
                arrDetalle.push(objDetalle);
            }
        });

        var objParams = {
            Filtro_FechaCaja: $(Contenedor + 'txtEmision').val(),
            Filtro_CodMedioPago: $(Contenedor + 'ddlMedioPago').val(),
            Filtro_CodBanco: CodBanco,
            Filtro_CodCtaBancaria: CodCtaBancaria,
            Filtro_NroOperacion: NroOperacion,
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_TipoCambio: $(Contenedor + 'txtTC').val(),
            Filtro_FechaLiquidacion: $(Contenedor + 'txtOperacion').val(),
            Filtro_Monto: $(Contenedor + 'txtTotalLiquidacion').val(),
            Filtro_MontoAjustado: $(Contenedor + 'txtMonto').val(),
            Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_Grabar_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'SE GRABO CORRECTAMENTE') {
                    alertify.log('SE GRABO CORRECTAMENTE');
                    $('#divConsultaFactura').dialog('close');
                }
            }
            else {
                alertify.log(result.split('~')[1]);
                $('#divConsultaFactura').dialog('close');
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

function F_ValidarCheck(ControlID) {
    var chkSi = "";
    var hfTotal = "";
    var Total = 0.00;

    $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
        chkSi = '#' + this.id;
        hfTotal = chkSi.replace('chkOK', 'hfTotal');
        if ($(chkSi).is(':checked'))
            Total += parseFloat($(hfTotal).val());
    });

    $('#MainContent_txtTotalFactura').val(parseFloat(Total).toFixed(2));
    $('#MainContent_txtTotalLiquidacion').val(parseFloat(Total).toFixed(2));

    return true;
}