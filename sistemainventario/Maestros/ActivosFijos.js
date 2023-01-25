var AppSession = "../Maestros/ActivosFijos.aspx";

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

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

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try {
            if (F_ValidarGrabarDocumento() == false)
                return false;

            if (confirm("Esta Seguro de Grabar el Producto"))
                F_GrabarDocumento();
            //                F_Nuevo();
            //            }
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
            if (F_ValidarEdicionDocumento() == false)
                return false;

            if (confirm("Esta Seguro de Actualizar los datos del Producto."))
                F_EdicionRegistro();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $("#MainContent_txtCostoConIgv").blur(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        if ($("#MainContent_txtCostoConIgv") == '')
            return false;

        $("#MainContent_txtPrecio1").val(parseFloat($("#MainContent_txtCostoConIgv").val() * 1.12).toFixed(2));
        $("#MainContent_txtPrecio2").val(parseFloat($("#MainContent_txtCostoConIgv").val() * 1.15).toFixed(2));
        $("#MainContent_txtPrecio3").val(parseFloat($("#MainContent_txtCostoConIgv").val() * 1.20).toFixed(2));

        if ($("#MainContent_ddlMoneda").val() == '2')
            $("#MainContent_txtCostoSolesIgv").val(parseFloat($("#MainContent_txtCostoConIgv").val() * $("#MainContent_txtTC").val()).toFixed(6));
        else
            $("#MainContent_txtCostoSolesIgv").val($("#MainContent_txtCostoConIgv").val());

        return false;

    });

    $("#MainContent_txtCostoEdicion").blur(function () {


        if ($("#MainContent_txtCostoEdicion") == '')
            return false;

        $("#MainContent_txtPrecio1Edicion").val(parseFloat($("#MainContent_txtCostoEdicion").val() * 1.12).toFixed(2));
        $("#MainContent_txtPrecio2Edicion").val(parseFloat($("#MainContent_txtCostoEdicion").val() * 1.15).toFixed(2));
        $("#MainContent_txtPrecio3Edicion").val(parseFloat($("#MainContent_txtCostoEdicion").val() * 1.20).toFixed(2));

        if ($("#MainContent_ddlMonedaEdicion").val() == '2')
            $("#MainContent_txtCostoSolesEdicion").val(parseFloat($("#MainContent_txtCostoEdicion").val() * $("#MainContent_txtTcEdicion").val()).toFixed(6));
        else
            $("#MainContent_txtCostoSolesEdicion").val($("#MainContent_txtCostoEdicion").val());

        if ($('#hfCodigoTemporal').val() == '1')
            $("#MainContent_txtCostoMercadoEdicion").val($("#MainContent_txtCostoEdicion").val());

        return false;

    });

    $("#MainContent_txtCostoMercadoEdicion").blur(function () {

        if ($("#MainContent_txtCostoMercadoEdicion") == '')
            return false;

        $("#MainContent_txtPrecio1Edicion").val(parseFloat($("#MainContent_txtCostoMercadoEdicion").val() * 1.12).toFixed(2));
        $("#MainContent_txtPrecio2Edicion").val(parseFloat($("#MainContent_txtCostoMercadoEdicion").val() * 1.15).toFixed(2));
        $("#MainContent_txtPrecio3Edicion").val(parseFloat($("#MainContent_txtCostoMercadoEdicion").val() * 1.20).toFixed(2));

        return false;

    });

    $("#MainContent_txtDescripcionConsulta").blur(function () {
        try {

            if ($('#MainContent_txtDescripcionConsulta').val() == '')
                return false


            if ($('#MainContent_txtDescripcionConsulta').val == "" | $('#MainContent_txtDescripcionConsulta').val().length < 3)
                cadena = cadena + "\n" + "Descripcion (Minimo 3 Caracteres)"

            F_Buscar();
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $("#MainContent_txtMedidaEdicion").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtAroEdicion").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtSeccionEdicion").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtFactorEdicion").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtCostoEdicion").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtCostoSolesEdicion").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtPrecio1Edicion").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtPrecio2Edicion").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtPrecio3Edicion").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtCostoMercadoEdicion").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtMedida").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtAro").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtSeccion").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtFactor").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtCosto").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtCostoSoles").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtPrecio1").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtPrecio2").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    $("#MainContent_txtPrecio3").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
            e.preventDefault();
    });

    F_Controles_Inicializar();

    $('#MainContent_txtCodigo').css('background', '#FFFFE0');

    $('#MainContent_txtTC').css('background', '#FFFFE0');

    $('#MainContent_txtCodigo2').css('background', '#FFFFE0');

    $('#MainContent_txtPartidaArancelaria').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcion').css('background', '#FFFFE0');

    $('#MainContent_txtMedida').css('background', '#FFFFE0');

    $('#MainContent_txtAroEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtSeccionEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtPrecio3Edicion').css('background', '#FFFFE0');

    $('#MainContent_txtCostoMercadoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtAño').css('background', '#FFFFE0');

    $('#MainContent_txtCostoConIgv').css('background', '#FFFFE0');

    $('#MainContent_txtCostoSolesIgv').css('background', '#FFFFE0');

    $('#MainContent_txtFactor').css('background', '#FFFFE0');

    $('#MainContent_txtPrecio1').css('background', '#FFFFE0');

    $('#MainContent_txtPrecio2').css('background', '#FFFFE0');

    $('#MainContent_txtStockMinimo').css('background', '#FFFFE0');

    $('#MainContent_txtStockMaximo').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcionConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtCodigoProductoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtTcEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtCodigo2Edicion').css('background', '#FFFFE0');

    $('#MainContent_txtPartidaArancelariaEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcionEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcionInglesEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtMarcaEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtModeloEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtMedidaEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtPosicionEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtPrecio3').css('background', '#FFFFE0');

    $('#MainContent_txtCostoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtCostoSolesEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtFactorEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtPrecio1Edicion').css('background', '#FFFFE0');

    $('#MainContent_txtPrecio2Edicion').css('background', '#FFFFE0');

    $('#MainContent_txtSeccion').css('background', '#FFFFE0');

    $('#MainContent_txtAro').css('background', '#FFFFE0');

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

$(document).on("change", "select[id $= 'MainContent_ddlFamilia']", function () {
    F_ValidarFamilia($("#MainContent_ddlFamilia").val(), 0);
});

$(document).on("change", "select[id $= 'MainContent_ddlFamiliaEdicion']", function () {
    F_ValidarFamilia($("#MainContent_ddlFamiliaEdicion").val(), 1);
});

$(document).on("change", "select[id $= 'MainContent_ddlMoneda']", function () {
    if ($("#MainContent_txtCostoConIgv") == '')
        return false;

    $("#MainContent_txtPrecio1").val(parseFloat($("#MainContent_txtCostoConIgv").val() * 1.12).toFixed(2));
    $("#MainContent_txtPrecio2").val(parseFloat($("#MainContent_txtCostoConIgv").val() * 1.15).toFixed(2));
    $("#MainContent_txtPrecio3").val(parseFloat($("#MainContent_txtCostoConIgv").val() * 1.20).toFixed(2));

    if ($("#MainContent_ddlMoneda").val() == '2')
        $("#MainContent_txtCostoSolesIgv").val(parseFloat($("#MainContent_txtCostoConIgv").val() * $("#MainContent_txtTC").val()).toFixed(6));
    else
        $("#MainContent_txtCostoSolesIgv").val($("#MainContent_txtCostoConIgv").val());

    return false;
});

$(document).on("change", "select[id $= 'MainContent_ddlMonedaEdicion']", function () {
    if ($("#MainContent_txtCostoEdicion") == '')
        return false;

    $("#MainContent_txtPrecio1Edicion").val(parseFloat($("#MainContent_txtCostoEdicion").val() * 1.12).toFixed(2));
    $("#MainContent_txtPrecio2Edicion").val(parseFloat($("#MainContent_txtCostoEdicion").val() * 1.15).toFixed(2));
    $("#MainContent_txtPrecio3Edicion").val(parseFloat($("#MainContent_txtCostoEdicion").val() * 1.20).toFixed(2));

    if ($("#MainContent_ddlMonedaEdicion").val() == '2')
        $("#MainContent_txtCostoSolesEdicion").val(parseFloat($("#MainContent_txtCostoEdicion").val() * $("#MainContent_txtTcEdicion").val()).toFixed(6));
    else
        $("#MainContent_txtCostoSolesEdicion").val($("#MainContent_txtCostoEdicion").val());

    return false;
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

                        F_Update_Division_HTML('div_moneda', result.split('~')[2]);
                        F_Update_Division_HTML('div_umcompra', result.split('~')[4]);
                        F_Update_Division_HTML('div_umventa', result.split('~')[5]);
                        F_Update_Division_HTML('div_Familia', result.split('~')[6]);
                        F_Update_Division_HTML('div_familiaconsulta', result.split('~')[7]);
                        F_Update_Division_HTML('div_FamiliaEdicion', result.split('~')[8]);
                        F_Update_Division_HTML('div_MonedaEdicion', result.split('~')[9]);
                        F_Update_Division_HTML('div_CompraEdicion', result.split('~')[10]);
                        F_Update_Division_HTML('div_VentaEdicion', result.split('~')[11]);
                        $('#MainContent_ddlMoneda').val('2');
                        $('#MainContent_ddlUMCompra').val('22');
                        $('#MainContent_ddlUMVenta').val('22');
                        $('#MainContent_txtFactor').val('1');
                        $('#MainContent_ddlFamilia').val('009');
                        $('#MainContent_txtCostoSolesIgv').prop('disabled', true);
                        $('#MainContent_txtPrecio1').prop('disabled', true);
                        $('#MainContent_txtPrecio2').prop('disabled', true);
                        $('#MainContent_txtPrecio3').prop('disabled', true);
                        $('#MainContent_ddlFamilia').css('background', '#FFFFE0');
                        $('#MainContent_ddlUMCompra').css('background', '#FFFFE0');
                        $('#MainContent_ddlUMVenta').css('background', '#FFFFE0');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlFamiliaEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlCompraEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlVentaEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlMonedaEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlFamiliaConsulta').css('background', '#FFFFE0');

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

function F_ValidarFamilia(CodFamilia, Mantenimiento) {
    var arg;
    try {
        if (Mantenimiento == '0') {
            switch (CodFamilia) {
                case "006":
                case "008":
                    $('#MainContent_txtAro').prop('disabled', false);
                    $('#MainContent_txtMedida').prop('disabled', true);
                    $('#MainContent_txtSeccion').prop('disabled', true);
                    $('#MainContent_txtMedida').val('');
                    $('#MainContent_txtSeccion').val('');
                    break;
                case "001":
                case "003":
                case "007":
                    $('#MainContent_txtAro').prop('disabled', false);
                    $('#MainContent_txtMedida').prop('disabled', false);
                    $('#MainContent_txtSeccion').prop('disabled', false);

                    break;
                default:
                    $('#MainContent_txtAro').prop('disabled', true);
                    $('#MainContent_txtMedida').prop('disabled', true);
                    $('#MainContent_txtSeccion').prop('disabled', true);
                    $('#MainContent_txtAro').val('');
                    $('#MainContent_txtMedida').val('');
                    $('#MainContent_txtSeccion').val('');
                    break;
            }
        }
        else {
            switch (CodFamilia) {

                case "006":
                case "008":
                    $('#MainContent_txtAroEdicion').prop('disabled', false);
                    $('#MainContent_txtMedidaEdicion').prop('disabled', true);
                    $('#MainContent_txtSeccionEdicion').prop('disabled', true);
                    $('#MainContent_txtMedidaEdicion').val('');
                    $('#MainContent_txtSeccionEdicion').val('');
                    break;
                case "007":
                case "001":
                case "003":
                    $('#MainContent_txtAroEdicion').prop('disabled', false);
                    $('#MainContent_txtMedidaEdicion').prop('disabled', true);
                    $('#MainContent_txtSeccionEdicion').prop('disabled', true);
                    break;
                default:
                    $('#MainContent_txtAroEdicion').prop('disabled', true);
                    $('#MainContent_txtMedidaEdicion').prop('disabled', true);
                    $('#MainContent_txtSeccionEdicion').prop('disabled', true);
                    $('#MainContent_txtAroEdicion').val('');
                    $('#MainContent_txtMedidaEdicion').val('');
                    $('#MainContent_txtSeccionEdicion').val('');
                    break;
            }
        }



    }
    catch (mierror) {
        alertify.log("Error detectado: " + mierror);
    }

}

function F_ValidarGrabarDocumento() {

    try {

        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p>';

        if ($(Cuerpo + 'txtDescripcion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descripcion';

        if ($(Cuerpo + 'txtTC').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtFactor').val() == '')
            Cadena = Cadena + '<p></p>' + 'Factor';

        if (($(Cuerpo + 'ddlUMCompra').val() != $(Cuerpo + 'ddlUMVenta').val()) && ($(Cuerpo + 'txtFactor').val() == '1' | $(Cuerpo + 'txtFactor').val() == '1.00'))
            Cadena = Cadena + '<p></p>' + 'El Factor no puede ser 1.';

        if (($(Cuerpo + 'ddlFamilia').val() == '001' | $(Cuerpo + 'ddlFamilia').val() == '003' | $(Cuerpo + 'ddlFamilia').val() == '007' | $(Cuerpo + 'ddlFamilia').val() == '008' | $(Cuerpo + 'ddlFamilia').val() == '006') && $(Cuerpo + 'txtAro').val() == '')
            Cadena = Cadena + '<p></p>' + 'Aro/Peso/Placas';

        if (($(Cuerpo + 'ddlFamilia').val() == '001' | $(Cuerpo + 'ddlFamilia').val() == '003' | $(Cuerpo + 'ddlFamilia').val() == '007') && $(Cuerpo + 'txtMedida').val() == '')
            Cadena = Cadena + '<p></p>' + 'Medida';

        if (($(Cuerpo + 'ddlFamilia').val() == '001' | $(Cuerpo + 'ddlFamilia').val() == '003' | $(Cuerpo + 'ddlFamilia').val() == '007') && $(Cuerpo + 'txtSeccion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Seccion';

        if ($(Cuerpo + 'txtCostoConIgv').val() == '')
            Cadena = Cadena + '<p></p>' + 'Costo';

        if ($(Cuerpo + 'txtPrecio1').val() == '')
            Cadena = Cadena + '<p></p>' + 'Precio 1';

        if ($(Cuerpo + 'txtPrecio2').val() == '')
            Cadena = Cadena + '<p></p>' + 'Precio 2';

        if ($(Cuerpo + 'txtPrecio3').val() == '')
            Cadena = Cadena + '<p></p>' + 'Precio 3';


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
        var Contenedor = '#MainContent_';
        var Aro = '0';
        var Medida = '0';
        var Seccion = '0';

        if ($(Contenedor + 'txtAro').val() != '')
            Aro = $(Contenedor + 'txtAro').val();

        if ($(Contenedor + 'txtMedida').val() != '')
            Medida = $(Contenedor + 'txtMedida').val();

        if ($(Contenedor + 'txtSeccion').val() != '')
            Seccion = $(Contenedor + 'txtSeccion').val();

        var objParams = {
            Filtro_CodFamilia: $(Contenedor + 'ddlFamilia').val(),
            Filtro_DscProducto: $(Contenedor + 'txtDescripcion').val(),
            Filtro_CodTipoProducto: '3',
            Filtro_CodUnidadCompra: $(Contenedor + 'ddlUMCompra').val(),
            Filtro_CodUnidadVenta: $(Contenedor + 'ddlUMVenta').val(),
            Filtro_Costo: $(Contenedor + 'txtCostoConIgv').val(),
            Filtro_CostoOriginal: $(Contenedor + 'txtCostoSolesIgv').val(),
            Filtro_Factor: $(Contenedor + 'txtFactor').val(),
            Filtro_CodigoProducto: $(Contenedor + 'txtCodigo').val(),
            Filtro_Precio: $(Contenedor + 'txtPrecio1').val(),     
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_Aro: Aro,
            Filtro_Medida: Medida,
            Filtro_Seccion: Seccion
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
            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se Grabo Correctamente.') {

                    $(Contenedor + 'txtCodigo').val('');
                    $(Contenedor + 'txtDescripcion').val('');
                    $(Contenedor + 'txtAro').val('');
                    $(Contenedor + 'txtMedida').val('');
                    $(Contenedor + 'txtSeccion').val(''),
                        $(Contenedor + 'txtFactor').val('1'),
                        $(Contenedor + 'txtCostoConIgv').val('');
                    $(Contenedor + 'txtCostoSolesIgv').val('');
                    $(Contenedor + 'ddlMoneda').val('2');
                    $(Contenedor + 'ddlUMCompra').val('22');
                    $(Contenedor + 'ddlUMVenta').val('22');
                    $(Contenedor + 'ddlFamilia').val('007');
                    $(Contenedor + 'txtPrecio1').val(''),
                        $(Contenedor + 'txtPrecio2').val('');
                    $(Contenedor + 'txtPrecio3').val('');
                    $(Contenedor + 'txtAro').prop('disabled', false);
                    $(Contenedor + 'txtMedida').prop('disabled', false);
                    $(Contenedor + 'txtSeccion').prop('disabled', false),
                        alertify.log('Se Grabo Correctamente.');
                    $(Contenedor + 'txtCodigo').focus();
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

    $(Contenedor + 'txtCodigo').val('');
    $(Contenedor + 'txtDescripcion').val('');
    $(Contenedor + 'txtAro').val('');
    $(Contenedor + 'txtMedida').val('');
    $(Contenedor + 'txtSeccion').val(''),
                        $(Contenedor + 'txtFactor').val('1'),
                        $(Contenedor + 'txtCostoConIgv').val('');
    $(Contenedor + 'txtCostoSolesIgv').val('');
    $(Contenedor + 'ddlMoneda').val('2');
    $(Contenedor + 'ddlUMCompra').val('22');
    $(Contenedor + 'ddlUMVenta').val('22');
    $(Contenedor + 'ddlFamilia').val('007');
    $(Contenedor + 'txtPrecio1').val(''),
                        $(Contenedor + 'txtPrecio2').val('');
    $(Contenedor + 'txtPrecio3').val('');
    $(Contenedor + 'txtAro').prop('disabled', false);
    $(Contenedor + 'txtMedida').prop('disabled', false);
    $(Contenedor + 'txtSeccion').prop('disabled', false),
                        $(Contenedor + 'txtCodigo').focus();
    return false;
}

function F_Buscar() {

    try {
        var objParams = {
            Filtro_Descripcion: $("#MainContent_txtDescripcionConsulta").val(),
            Filtro_CodFamilia: $('#MainContent_ddlFamiliaConsulta').val(),
            Filtro_CodTipoProducto: 3

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
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function F_AnularRegistro(Fila) {
    try {
        var imgID = Fila.id;

        var lblCodigo = '#' + imgID.replace('imgAnularDocumento', 'lblcodigo');
        var lblProducto_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblProducto');


        if (confirm("Esta seguro de eliminar el producto " + $(lblProducto_grilla).text()) == false)
            return false;

        var objParams = {
            Filtro_CodProducto: $(lblCodigo).text(),
            Filtro_Descripcion: $('#MainContent_txtDescripcionConsulta').val(),
            Filtro_CodFamilia: $('#MainContent_ddlFamiliaConsulta').val()
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

function F_EditarRegistro(Fila) {

    try {
        var imgID = Fila.id;
        var lblCodigoProducto_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblCodigoProducto');
        var lblProducto_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblProducto');
        var lblCosto_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblCosto');
        var lblPrecio1_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblPrecio1');
        var lblPrecio2_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblPrecio2');
        var lblPrecio3_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblPrecio3');
        var hfAro3_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfAro3');
        var hfMedida3_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfMedida3');
        var hfSeccion_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfSeccion');
        var hfCodMoneda_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCodMoneda');
        var hfCodUnidadCompra_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCodUnidadCompra');
        var hfCodUnidadVenta_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCodUnidadVenta');
        var hfCodFamilia_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCodFamilia');
        var hfFactor_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfFactor');
        var lblcodigo_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblcodigo');
        var lblcostomercado_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCostoMercado');
        var lblcostosoles_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCostoSoles');

        var Cuerpo = '#MainContent_';

        $(Cuerpo + 'txtCodigoProductoEdicion').val($(lblCodigoProducto_grilla).text());
        $(Cuerpo + 'ddlFamiliaEdicion').val($(hfCodFamilia_grilla).val());
        $(Cuerpo + 'txtDescripcionEdicion').val($(lblProducto_grilla).text());
        $(Cuerpo + 'txtAroEdicion').val($(hfAro3_grilla).val());
        $(Cuerpo + 'txtMedidaEdicion').val($(hfMedida3_grilla).val());
        $(Cuerpo + 'txtSeccionEdicion').val($(hfSeccion_grilla).val());
        $(Cuerpo + 'txtFactorEdicion').val($(hfFactor_grilla).val());
        $(Cuerpo + 'txtCostoEdicion').val($(lblCosto_grilla).text());
        $(Cuerpo + 'ddlMonedaEdicion').val($(hfCodMoneda_grilla).val());
        $(Cuerpo + 'ddlCompraEdicion').val($(hfCodUnidadCompra_grilla).val());
        $(Cuerpo + 'ddlVentaEdicion').val($(hfCodUnidadVenta_grilla).val());
        $(Cuerpo + 'txtCostoSolesEdicion').val($(lblcostosoles_grilla).val());
        $(Cuerpo + 'txtPrecio1Edicion').val($(lblPrecio1_grilla).text());
        $(Cuerpo + 'txtPrecio2Edicion').val($(lblPrecio2_grilla).text());
        $(Cuerpo + 'txtPrecio3Edicion').val($(lblPrecio3_grilla).text());
        $(Cuerpo + 'txtPrecio1Edicion').prop('disabled', true);
        $(Cuerpo + 'txtPrecio2Edicion').prop('disabled', true);
        $(Cuerpo + 'txtPrecio3Edicion').prop('disabled', true);
        $(Cuerpo + 'txtCostoSolesEdicion').prop('disabled', true);
        $(Cuerpo + 'txtCostoMercadoEdicion').val($(lblcostomercado_grilla).val());
        $('#hfCodProducto').val($(lblcodigo_grilla).text());
        $(Cuerpo + 'ddlFamiliaConsulta').val($(hfCodFamilia_grilla).val());

        switch ($("#MainContent_ddlFamiliaEdicion").val()) {
            case "001":
            case "003":
            case "006":
                $('#MainContent_txtAroEdicion').prop('disabled', false);
                $('#MainContent_txtMedidaEdicion').prop('disabled', true);
                $('#MainContent_txtSeccionEdicion').prop('disabled', true);
                break;
            case "007":
            case "008":
                $('#MainContent_txtAroEdicion').prop('disabled', false);
                $('#MainContent_txtMedidaEdicion').prop('disabled', false);
                $('#MainContent_txtSeccionEdicion').prop('disabled', false);
                break;
            default:
                $('#MainContent_txtAroEdicion').prop('disabled', true);
                $('#MainContent_txtMedidaEdicion').prop('disabled', true);
                $('#MainContent_txtSeccionEdicion').prop('disabled', true);
                break;
        }


        var d = new Date();
        var objParams = {
            Filtro_CodProducto: $('#hfCodProducto').val(),
            Filtro_Emision: d.format("dd/MM/yyyy")

        };


        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ConsultaMovimiento_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {

                $(Cuerpo + 'txtTcEdicion').val(result.split('~')[4]);
                if (result.split('~')[2] == '0') {
                    $(Cuerpo + 'txtCostoEdicion').prop('disabled', false);
                    $('#hfCodigoTemporal').val('1');
                }

                else {
                    $(Cuerpo + 'txtCostoEdicion').prop('disabled', true);
                    $(Cuerpo + 'ddlMonedaEdicion').prop('disabled', true);
                    $(Cuerpo + 'ddlCompraEdicion').prop('disabled', true);
                    $(Cuerpo + 'ddlVentaEdicion').prop('disabled', true);
                }
                if (result.split('~')[3] == '5') {
                    $(Cuerpo + 'txtCostoMercadoEdicion').prop('disabled', false);
                    $('#hfCodigoTemporal').val('2');
                }

                else
                    $(Cuerpo + 'txtCostoMercadoEdicion').prop('disabled', true);

                $("#divEdicionRegistro").dialog({
                    resizable: false,
                    modal: true,
                    title: "Edicion de Productos",
                    title_html: true,
                    height: 250,
                    width: 655,
                    autoOpen: false
                });

                $('#divEdicionRegistro').dialog('open');

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

function F_EdicionRegistro() {

    try {
        var Contenedor = '#MainContent_';
        var Aro = '0';
        var Medida = '0';
        var Seccion = '0';

        if ($(Contenedor + 'txtAroEdicion').val() != '')
            Aro = $(Contenedor + 'txtAroEdicion').val();

        if ($(Contenedor + 'txtMedidaEdicion').val() != '')
            Medida = $(Contenedor + 'txtMedidaEdicion').val();

        if ($(Contenedor + 'txtSeccionEdicion').val() != '')
            Seccion = $(Contenedor + 'txtSeccionEdicion').val();

        var objParams = {
            Filtro_CodProducto: $('#hfCodProducto').val(),
            Filtro_CodFamiliaEdicion: $(Contenedor + 'ddlFamiliaEdicion').val(),
            Filtro_DscProductoEdicion: $(Contenedor + 'txtDescripcionEdicion').val(),
            Filtro_CodTipoProducto: '3',
            Filtro_CodUnidadCompra: $(Contenedor + 'ddlCompraEdicion').val(),
            Filtro_CodUnidadVenta: $(Contenedor + 'ddlVentaEdicion').val(),
            Filtro_Costo: $(Contenedor + 'txtCostoSolesEdicion').val(),
            Filtro_CostoOriginal: $(Contenedor + 'txtCostoEdicion').val(),
            Filtro_Factor: parseFloat($(Contenedor + 'txtFactorEdicion').val()),
            Filtro_CodigoProducto: $(Contenedor + 'txtCodigoProductoEdicion').val(),
            Filtro_Precio: $(Contenedor + 'txtPrecio1Edicion').val(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMonedaEdicion').val(),
            Filtro_Aro: Aro,
            Filtro_Medida: Medida,
            Filtro_Seccion: Seccion,
            Filtro_CostoMarginable: $(Contenedor + 'txtCostoMercadoEdicion').val(),
            Filtro_Flag: $('#hfCodigoTemporal').val(),
            Filtro_CodFamilia: '0',
            Filtro_Descripcion: $(Contenedor + 'txtDescripcionConsulta').val()
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
                if (str_mensaje_operacion == 'Se Actualizo Correctamente.') {
                    F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                    $(Contenedor + 'txtCodigoProductoEdicion').val('');
                    $(Contenedor + 'txtDescripcionEdicion').val('');
                    $(Contenedor + 'txtAroEdicion').val('');
                    $(Contenedor + 'txtMedidaEdicion').val('');
                    $(Contenedor + 'txtSeccionEdicion').val(''),
                        $(Contenedor + 'txtFactorEdicion').val('1'),
                        $(Contenedor + 'txtCostoConIgvEdicion').val('');
                    $(Contenedor + 'txtCostoSolesIgvEdicion').val('');
                    $(Contenedor + 'txtPrecio1').val(''),
                        $(Contenedor + 'txtPrecio2').val('');
                    $(Contenedor + 'txtPrecio3').val('');
                    $(Contenedor + 'txtAroEdicion').prop('disabled', false);
                    $(Contenedor + 'txtMedidaEdicion').prop('disabled', false);
                    $(Contenedor + 'txtSeccionEdicion').prop('disabled', false),
                        $(Contenedor + 'ddlFamiliaConsulta').val('0'),
                        alertify.log('Se Actualizo Correctamente.');
                    $('#divEdicionRegistro').dialog('close');
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
        return false;
    }
}

function F_ValidarEdicionDocumento() {

    try {

        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p>';

        if ($(Cuerpo + 'txtDescripcionEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descripcion';

        if ($(Cuerpo + 'txtTcEdicion').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtFactorEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Factor';

        if (($(Cuerpo + 'ddlCompraEdicion').val() != $(Cuerpo + 'ddlVentaEdicion').val()) && ($(Cuerpo + 'txtFactorEdicion').val() == '1' | $(Cuerpo + 'txtFactorEdicion').val() == '1.00'))
            Cadena = Cadena + '<p></p>' + 'La unidad de compra y venta son distintas,el Factor no puede ser 1.';

        if (($(Cuerpo + 'ddlFamiliaEdicion').val() == '001' | $(Cuerpo + 'ddlFamiliaEdicion').val() == '003' | $(Cuerpo + 'ddlFamiliaEdicion').val() == '007' | $(Cuerpo + 'ddlFamiliaEdicion').val() == '008' | $(Cuerpo + 'ddlFamiliaEdicion').val() == '006') && $(Cuerpo + 'txtAroEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Aro/Peso/Placas';

        if (($(Cuerpo + 'ddlFamiliaEdicion').val() == '001' | $(Cuerpo + 'ddlFamiliaEdicion').val() == '003' | $(Cuerpo + 'ddlFamiliaEdicion').val() == '007') && $(Cuerpo + 'txtMedidaEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Medida';

        if (($(Cuerpo + 'ddlFamiliaEdicion').val() == '001' | $(Cuerpo + 'ddlFamiliaEdicion').val() == '003' | $(Cuerpo + 'ddlFamiliaEdicion').val() == '007') && $(Cuerpo + 'txtSeccionEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Seccion';

        if ($(Cuerpo + 'txtCostoConIgvEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Costo';

        if ($(Cuerpo + 'txtPrecio1Edicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Precio 1';

        if ($(Cuerpo + 'txtPrecio2Edicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Precio 2';

        if ($(Cuerpo + 'txtPrecio3Edicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Precio 3';


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
