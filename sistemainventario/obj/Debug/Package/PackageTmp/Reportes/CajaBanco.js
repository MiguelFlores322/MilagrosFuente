$(document).ready(function () {
    if (!F_SesionRedireccionar('')) return false;

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

    $('#divTabs').tabs();

    $('#MainContent_txtDesde').datepicker({ onSelect: function () {
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
    
    $('#MainContent_btnReporte').click(function () {
        try {

            F_Reporte();

            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });
       
    F_Controles_Inicializar();
    
    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('.ccsestilo').css('background', '#FFFFE0');

    F_Derecha();
});

$().ready(function () {

    $(document).everyTime(900000, function () {

        $.ajax({
            type: "POST",
            url: '../CuentasPorPagar/Letras.aspx/KeepActiveSession',
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: VerifySessionState,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alertify.log(textStatus + ": " + XMLHttpRequest.responseText);
            }
        });

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

$(document).on("change", "select[id $= 'MainContent_ddlEmpresa']", function () {
    F_ListarBancoOrigen($("#MainContent_ddlEmpresa").val());
});

$(document).on("change", "select[id $= 'MainContent_ddlEmpresaDestino']", function () {
    F_ListarBancoDestino($("#MainContent_ddlEmpresaDestino").val());
});

$(document).on("change", "select[id $= 'MainContent_ddlMoneda']", function () {
    F_ListarCuentaOrigen($("#MainContent_ddlBanco").val(), $("#MainContent_ddlMoneda").val());

    if ($('#MainContent_txtMonto').val() == '' || parseFloat($('#MainContent_txtMonto').val()) == 0)
        return false;
    if ($('#MainContent_ddlMoneda').val() == $('#MainContent_ddlMonedaDestino').val())
        $('#MainContent_txtMontoDestino').val($('#MainContent_txtMonto').val());
    else {
        if ($('#MainContent_ddlMonedaDestino').val() == '1')
            $('#MainContent_txtMontoDestino').val(parseFloat(parseFloat($('#MainContent_txtMonto').val()) * parseFloat($('#MainContent_txtTC').val())).toFixed(2));
        else
            $('#MainContent_txtMontoDestino').val(parseFloat(parseFloat($('#MainContent_txtMonto').val()) / parseFloat($('#MainContent_txtTC').val())).toFixed(2));
    }
    return false;
});

$(document).on("change", "select[id $= 'MainContent_ddlMonedaDestino']", function () {
    F_ListarCuentaDestino($("#MainContent_ddlBancoDestino").val(), $("#MainContent_ddlMonedaDestino").val());

    if ($('#MainContent_txtMonto').val() == '' || parseFloat($('#MainContent_txtMonto').val()) == 0)
        return false;
    if ($('#MainContent_ddlMoneda').val() == $('#MainContent_ddlMonedaDestino').val())
        $('#MainContent_txtMontoDestino').val($('#MainContent_txtMonto').val());
    else {
        if ($('#MainContent_ddlMonedaDestino').val() == '1')
            $('#MainContent_txtMontoDestino').val(parseFloat(parseFloat($('#MainContent_txtMonto').val()) * parseFloat($('#MainContent_txtTC').val())).toFixed(2));
        else
            $('#MainContent_txtMontoDestino').val(parseFloat(parseFloat($('#MainContent_txtMonto').val()) / parseFloat($('#MainContent_txtTC').val())).toFixed(2));
    }
    return false;
});

$(document).on("change", "select[id $= 'MainContent_ddlBanco']", function () {
    F_ListarCuentaOrigen($("#MainContent_ddlBanco").val(), $("#MainContent_ddlMoneda").val());
});

$(document).on("change", "select[id $= 'MainContent_ddlBancoDestino']", function () {
    F_ListarCuentaDestino($("#MainContent_ddlBancoDestino").val(), $("#MainContent_ddlMonedaDestino").val());
});

function F_Controles_Inicializar() {
    var arg;
    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodEmpresa: 1
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
                        F_Update_Division_HTML('div_Moneda', result.split('~')[2]);
                        F_Update_Division_HTML('div_MonedaDestino', result.split('~')[3]);
                        F_Update_Division_HTML('div_Empresa', result.split('~')[4]);
                        F_Update_Division_HTML('div_EmpresaDestino', result.split('~')[5]);
                        F_Update_Division_HTML('div_MedioPago', result.split('~')[6]);
                        F_Update_Division_HTML('div_Banco', result.split('~')[7]);
                        F_Update_Division_HTML('div_BancoDestino', result.split('~')[8]);
                        $('#MainContent_txtTC').val(result.split('~')[9]);
                        $('#MainContent_ddlMoneda').val(2);
                        $('#MainContent_ddlMonedaDestino').val(2);
                        $('#MainContent_ddlMedioPago').val(2);
                        $('#MainContent_ddlEmpresa').css('background', '#FFFFE0');
                        $('#MainContent_ddlBanco').css('background', '#FFFFE0');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlMonedaDestino').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresaDestino').css('background', '#FFFFE0');
                        $('#MainContent_ddlBancoDestino').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPago').css('background', '#FFFFE0');
                        $('.ccsestilo').css('background', '#FFFFE0');
                        F_ListarNroCuenta();
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

function F_ListarNroCuenta() {
    var arg;
    try {
        var objParams = {
            Filtro_CodBanco: $('#MainContent_ddlBanco').val(),
            Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
            Filtro_CodBancoDestino: $('#MainContent_ddlBancoDestino').val(),
            Filtro_CodMonedaDestino: $('#MainContent_ddlMonedaDestino').val()
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
                        F_Update_Division_HTML('div_CuentaBancaria', result.split('~')[2]);
                        $('#MainContent_ddlCuentaBancaria').css('background', '#FFFFE0');
                        F_Update_Division_HTML('div_CuentaBancariaDestino', result.split('~')[3]);
                        $('#MainContent_ddlCuentaBancariaDestino').css('background', '#FFFFE0');
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

function F_ListarCuentaOrigen(CodBanco, CodMoneda) {
    var arg;
    try {
        var objParams = {
            Filtro_CodBanco: CodBanco,
            Filtro_CodMoneda: CodMoneda
        };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ListarCuentaOrigen_NET
            (
                arg,
                function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_CuentaBancaria', result.split('~')[2]);
                        $('#MainContent_ddlCuentaBancaria').css('background', '#FFFFE0');
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

function F_ListarBancoOrigen(CodEmpresa) {
    var arg;
    try {
        var objParams = {
            Filtro_CodEmpresa: CodEmpresa
        };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ListarBancoOrigen_NET
            (
                arg,
                function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_Banco', result.split('~')[2]);
                        $('#MainContent_ddlBanco').css('background', '#FFFFE0');
                        F_ListarCuentaOrigen($("#MainContent_ddlBanco").val(), $("#MainContent_ddlMoneda").val());
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

function F_Reporte() {
    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = 5;
    var CodMenu = 21;

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Desde=' + $("#MainContent_txtDesde").val() + '&';
    rptURL = rptURL + 'Hasta=' + $('#MainContent_txtHasta').val() + '&';
    rptURL = rptURL + 'CodCuentaBancaria=' + $("#MainContent_ddlCuentaBancaria").val() + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}