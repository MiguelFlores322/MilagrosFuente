var AppSession = "../Maestros/Productos.aspx";
var myDropzone = null;
var mydropzone_Edit = null;

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }


    $('#MainContent_txtModeloDetalle').autocomplete(
    {
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_MODELOVEHICULO_AUTOCOMPLETE',
                data: "{'Descripcion':'" + request.term + "'}",
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
            $('#hfCodModeloDetalle').val(i.item.val);
        },
        complete: function () {

        },
        minLength: 2
    });


    $('#divTabs').tabs();

    $('#MainContent_imgBuscar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val == "")
                cadena = cadena + "<p></p>" + "Articulo"

            if ($('#MainContent_ddlMoneda option').size() == 0)
            { cadena = cadena + "<p></p>" + "Moneda"; }
            else {
                if ($('#MainContent_ddlMoneda').val() == "-1")
                    cadena = cadena + "<p></p>" + "Moneda";
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
            if (!F_ValidarGrabarDocumento())
                return false;

            if (confirm("ESTA SEGURO DE GRABAR EL PRODUCTO"))
                F_GrabarDocumento();
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnGrabarDetalle').click(function () {
        try {
            if (!F_ValidarGrabarDetalle())
                return false;

            if (confirm("ESTA SEGURO DE GRABAR EL DETALLE DEL PRODUCTO"))
                F_GrabarDetalle();

            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnGrabarDetalleEdicion').click(function () {
        try {
            if (!F_ValidarGrabarDetalleEdicion())
                return false;

            if (confirm("ESTA SEGURO DE ACTUALIZAR EL DETALLE DEL PRODUCTO"))
                F_EdicionDetalleRegistro();

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

            if (confirm("ESTA SEGURO DE ACTUALIZAR LOS DATOS DEL PRODUCTO"))
                F_EdicionRegistro();

            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    $("#MainContent_txtCosto").blur(function () {
        F_ValidaMonto("MainContent_txtCosto");
        //$("#MainContent_txtCostoDolaresIgv").val(parseFloat($("#MainContent_txtCostoSolesIgv").val() / $("#MainContent_txtTC").val()).toFixed(2));
        return true;
    });

    $("#MainContent_txtCostoEdicion").blur(function () {
        F_ValidaMonto("MainContent_txtCostoEdicion");
        //$("#MainContent_txtCostoDolaresIgv").val(parseFloat($("#MainContent_txtCostoSolesIgv").val() / $("#MainContent_txtTC").val()).toFixed(2));
        return true;
    });

    $("#MainContent_txtPrecio").blur(function () {
        F_ValidaMonto("MainContent_txtPrecio");
        //$("#MainContent_txtPrecioDolaresIgv").val(parseFloat($("#MainContent_txtPrecioSolesIgv").val() / $("#MainContent_txtTC").val()).toFixed(2));
        return true;
    });

    $("#MainContent_txtPrecioEdicion").blur(function () {
        F_ValidaMonto("MainContent_txtPrecioEdicion");
        //$("#MainContent_txtPrecioDolaresIgv").val(parseFloat($("#MainContent_txtPrecioSolesIgv").val() / $("#MainContent_txtTC").val()).toFixed(2));
        return true;
    });

    $("#MainContent_txtPrecio2").blur(function () {
        F_ValidaMonto("MainContent_txtPrecio2");
        //$("#MainContent_txtPrecio2DolaresIgv").val(parseFloat($("#MainContent_txtPrecio2SolesIgv").val() / $("#MainContent_txtTC").val()).toFixed(2));
        return true;
    });

    $("#MainContent_txtPrecio2Edicion").blur(function () {
        F_ValidaMonto("MainContent_txtPrecio2Edicion");
        //$("#MainContent_txtPrecio2DolaresIgv").val(parseFloat($("#MainContent_txtPrecio2SolesIgv").val() / $("#MainContent_txtTC").val()).toFixed(2));
        return true;
    });

    $("#MainContent_txtPrecio3").blur(function () {
        F_ValidaMonto("MainContent_txtPrecio3");
        //$("#MainContent_txtPrecio3DolaresIgv").val(parseFloat($("#MainContent_txtPrecio3SolesIgv").val() / $("#MainContent_txtTC").val()).toFixed(2));
        return true;
    });

    $("#MainContent_txtPrecio3Edicion").blur(function () {
        F_ValidaMonto("MainContent_txtPrecio3Edicion");
        //$("#MainContent_txtPrecio3DolaresIgv").val(parseFloat($("#MainContent_txtPrecio3SolesIgv").val() / $("#MainContent_txtTC").val()).toFixed(2));
        return true;
    });

    $("#MainContent_txtStockMinimo").blur(function () {
        F_ValidaMonto("MainContent_txtStockMinimo");
        //$("#MainContent_txtStockMinimoDolaresIgv").val(parseFloat($("#MainContent_txtStockMinimoSolesIgv").val() / $("#MainContent_txtTC").val()).toFixed(2));
        return true;
    });

    $("#MainContent_txtStockMinimoEdicion").blur(function () {
        F_ValidaMonto("MainContent_txtStockMinimoEdicion");
        //$("#MainContent_txtStockMinimoDolaresIgv").val(parseFloat($("#MainContent_txtStockMinimoSolesIgv").val() / $("#MainContent_txtTC").val()).toFixed(2));
        return true;
    });

    $("#MainContent_txtStockMaximo").blur(function () {
        F_ValidaMonto("MainContent_txtStockMaximo");
        //$("#MainContent_txtStockMaximoDolaresIgv").val(parseFloat($("#MainContent_txtStockMaximoSolesIgv").val() / $("#MainContent_txtTC").val()).toFixed(2));
        return true;
    });

    $("#MainContent_txtStockMaximoEdicion").blur(function () {
        F_ValidaMonto("MainContent_txtStockMaximoEdicion");
        //$("#MainContent_txtStockMaximoDolaresIgv").val(parseFloat($("#MainContent_txtStockMaximoSolesIgv").val() / $("#MainContent_txtTC").val()).toFixed(2));
        return true;
    });


    $('#MainContent_txtMarca').autocomplete(
    {
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_MARCAPRODUCTO_AUTOCOMPLETE',
                data: "{'Descripcion':'" + request.term + "'}",
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
            $('#hfCodMarca').val(i.item.val);
        },
        complete: function () {

        },
        minLength: 1
    });

    $('#MainContent_txtMarcaEdicion').autocomplete(
    {
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_MARCAPRODUCTO_AUTOCOMPLETE',
                data: "{'Descripcion':'" + request.term + "'}",
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
            $('#hfCodMarcaEdicion').val(i.item.val);
        },
        complete: function () {

        },
        minLength: 1
    });


    $("#MainContent_txtDescripcionConsulta").blur(function () {
        try {

            if ($('#MainContent_txtDescripcionConsulta').val() == '')
                return false


            if ($('#MainContent_txtDescripcionConsulta').val == "" | $('#MainContent_txtDescripcionConsulta').val().length < 3)
                cadena = cadena + "<p></p>" + "Descripcion (Minimo 3 Caracteres)"

            F_Buscar();
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_txtArticuloRelacionado').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_LGProductos_Select',
                data: "{'Descripcion':'" + request.term + "','CodAlmacen':'" + $('#hfCodSede').val() + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Stock: item.split(',')[2],
                            Costo: item.split(',')[3],
                            Moneda: item.split(',')[4]
                        }
                    }))
                },
                error: function (response) {
                    alert(response.responseText);
                },
                failure: function (response) {
                    alert(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfCodigoArticuloRelacionado').val(i.item.val);
            //            $('#MainContent_lblStock').text(i.item.Stock);
            //            $('#MainContent_lblCosto').text(i.item.Costo);
            //            $('#MainContent_lblMoneda').text(i.item.Moneda);

        },
        minLength: 3
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

    $('#MainContent_txtTCEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtCodigo2').css('background', '#FFFFE0');

    $('#MainContent_txtPartidaArancelaria').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcion').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcionIngles').css('background', '#FFFFE0');

    $('#MainContent_txtMarca').css('background', '#FFFFE0');

    $('#MainContent_txtModelo').css('background', '#FFFFE0');

    $('#MainContent_txtMedida').css('background', '#FFFFE0');

    $('#MainContent_txtPosicion').css('background', '#FFFFE0');

    $('#MainContent_txtAño').css('background', '#FFFFE0');

    $('#MainContent_txtCosto').css('background', '#FFFFE0');

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

    $('#MainContent_txtAñoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtCostoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtCostoSolesEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtFactorEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtPrecio1Edicion').css('background', '#FFFFE0');

    $('#MainContent_txtPrecio2Edicion').css('background', '#FFFFE0');

    $('#MainContent_txtStockMinimoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtStockMaximoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtUbicacion').css('background', '#FFFFE0');

    $('#MainContent_txtUbicacionEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtPrecioMinimo').css('background', '#FFFFE0');

    $('#MainContent_txtMoneda').css('background', '#FFFFE0');

    $('#MainContent_txtCodigoVisualizacion').css('background', '#FFFFE0');

    $('#MainContent_txtCodigo2Visualizacion').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcionVisualizacion').css('background', '#FFFFE0');

    $('#MainContent_txtMedidaVisualizacion').css('background', '#FFFFE0');

    $('#MainContent_txtPaisVisualizacion').css('background', '#FFFFE0');

    $('#MainContent_txtMarcaVisualizacion').css('background', '#FFFFE0');

    $('#MainContent_txtModeloVisualizacion').css('background', '#FFFFE0');

    $('#MainContent_txtPosicionVisualizacion').css('background', '#FFFFE0');

    $('#MainContent_txtAnovisualizacion').css('background', '#FFFFE0');

    $('#MainContent_txtArticuloPrincipal').css('background', '#FFFFE0');

    $('#MainContent_txtCodigoArticuloPrincipal').css('background', '#FFFFE0');

    $('#MainContent_txtArticuloRelacionado').css('background', '#FFFFE0');

    $('#MainContent_txtCodigoInterno').css('background', '#FFFFE0');

    $('#MainContent_txtCodigoInternoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtCostoDolaresIgv').css('background', '#FFFFE0');

    $('#MainContent_txtPrecio3').css('background', '#FFFFE0');

    $('#MainContent_txtPrecio3Edicion').css('background', '#FFFFE0');

    $('#MainContent_txtCodigoEdicion').css('background', '#FFFFE0');

    $('#MainContent_ddlFiltroCodEstado').css('background', '#FFFFE0');

    $('#MainContent_txtProductoDetalle').css('background', '#FFFFE0');

    $('#MainContent_txtModeloDetalle').css('background', '#FFFFE0');

    $('#MainContent_txtAñoDetalle').css('background', '#FFFFE0');

    $('#MainContent_txtMotorDetalle').css('background', '#FFFFE0');

    $('#MainContent_txtProductoDetalleEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtModeloDetalleEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtAñoDetalleEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtMotorDetalleEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtCajaCambio').css('background', '#FFFFE0');

    $('#MainContent_txtFiltro').css('background', '#FFFFE0');

    $('#MainContent_txtTransmision').css('background', '#FFFFE0');

    $('#MainContent_txtCajaCambioEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtFiltroEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtTransmisionEdicion').css('background', '#FFFFE0');

    F_Derecha();

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

function VerifySessionState(result) { }

$(document).on("change", "select[id $= 'MainContent_ddlMoneda']", function () {
    if ($("#MainContent_txtCostoConIgv") == '')
        return false;

    //    $("#MainContent_txtPrecio1").val(parseFloat($("#MainContent_txtCostoConIgv").val() * 1.45).toFixed(2));
    //    $("#MainContent_txtPrecio2").val(parseFloat($("#MainContent_txtCostoConIgv").val() * 1.35).toFixed(2));
    //    $("#MainContent_txtPrecio3").val(parseFloat($("#MainContent_txtCostoConIgv").val() * 1.35).toFixed(2));

    //    if ($("#MainContent_ddlMoneda").val() == '2')
    //        $("#MainContent_txtCostoSolesIgv").val(parseFloat($("#MainContent_txtCostoConIgv").val() * $("#MainContent_txtTC").val()).toFixed(6));
    //    else
    //        $("#MainContent_txtCostoSolesIgv").val($("#MainContent_txtCostoConIgv").val());

    return false;
});

$(document).on("change", "select[id $= 'MainContent_ddlMonedaEdicion']", function () {
    //    if ($("#MainContent_txtCostoEdicion") == '')
    //        return false;

    //    $("#MainContent_txtPrecio1Edicion").val(parseFloat($("#MainContent_txtCostoEdicion").val() * 1.12).toFixed(2));
    //    $("#MainContent_txtPrecio2Edicion").val(parseFloat($("#MainContent_txtCostoEdicion").val() * 1.15).toFixed(2));
    //    $("#MainContent_txtPrecio3Edicion").val(parseFloat($("#MainContent_txtCostoEdicion").val() * 1.20).toFixed(2));

    //    if ($("#MainContent_ddlMonedaEdicion").val() == '2')
    //        $("#MainContent_txtCostoSolesEdicion").val(parseFloat($("#MainContent_txtCostoEdicion").val() * $("#MainContent_txtTcEdicion").val()).toFixed(6));
    //    else
    //        $("#MainContent_txtCostoSolesEdicion").val($("#MainContent_txtCostoEdicion").val());

    return false;
});

$(document).on("change", "select[id $= 'MainContent_ddlUMCompra']", function () {
    $('#MainContent_ddlUMVenta').val($('#MainContent_ddlUMCompra').val());
});

$(document).on("change", "select[id $= 'MainContent_ddlUMVenta']", function () {
    $('#MainContent_ddlUMCompra').val($('#MainContent_ddlUMVenta').val());
});

$(document).on("change", "select[id $= 'MainContent_ddlCompraEdicion']", function () {
    $('#MainContent_ddlVentaEdicion').val($('#MainContent_ddlCompraEdicion').val());
});

$(document).on("change", "select[id $= 'MainContent_ddlVentaEdicion']", function () {
    $('#MainContent_ddlCompraEdicion').val($('#MainContent_ddlVentaEdicion').val());
});

function F_Controles_Inicializar() {

    var arg;

    try {
        var objParams = {
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
                        F_Update_Division_HTML('div_umcompra', result.split('~')[4]);
                        F_Update_Division_HTML('div_umventa', result.split('~')[5]);
                        F_Update_Division_HTML('div_Familia', result.split('~')[6]);
                        F_Update_Division_HTML('div_familiaconsulta', result.split('~')[7]);
                        F_Update_Division_HTML('div_FamiliaEdicion', result.split('~')[8]);
                        F_Update_Division_HTML('div_MonedaEdicion', result.split('~')[9]);
                        F_Update_Division_HTML('div_CompraEdicion', result.split('~')[10]);
                        F_Update_Division_HTML('div_VentaEdicion', result.split('~')[11]);
                        $('#MainContent_txtTC').val(result.split('~')[3]);
                        $('#MainContent_txtTCEdicion').val(result.split('~')[3]);
                        $('#hfCodSede').val(result.split('~')[12]);
                        $('#MainContent_ddlMoneda').val('1');
                        $('#MainContent_ddlUMCompra').val('22');
                        $('#MainContent_ddlUMVenta').val('22');
                        $('#MainContent_txtFactor').val('1');
                        $('#MainContent_ddlFamiliaConsulta').val('0');
                        //$('#MainContent_txtPrecio2').prop('disabled', true);
                        //$('#MainContent_txtPrecio3').prop('disabled', true);
                        $('#MainContent_ddlFamilia').css('background', '#FFFFE0');
                        $('#MainContent_ddlUMCompra').css('background', '#FFFFE0');
                        $('#MainContent_ddlUMVenta').css('background', '#FFFFE0');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlFamiliaEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlCompraEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlVentaEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlMonedaEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlFamiliaConsulta').css('background', '#FFFFE0');
                        $('#MainContent_txtCodigoInterno').focus();

                        F_AbrirDropzone_JS();

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

function F_ValidarGrabarDocumento() {

    try {

        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p>';

        if ($(Cuerpo + 'txtCodigoInterno').val().trim() == '')
            Cadena = Cadena + '<p></p>' + 'Codigo Interno';

        if ($(Cuerpo + 'txtDescripcion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descripcion';

        if ($(Cuerpo + 'txtTC').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtFactor').val() == '')
            Cadena = Cadena + '<p></p>' + 'Factor';

        if (($(Cuerpo + 'ddlUMCompra').val() != $(Cuerpo + 'ddlUMVenta').val()) && ($(Cuerpo + 'txtFactor').val() == '1' | $(Cuerpo + 'txtFactor').val() == '1.00'))
            Cadena = Cadena + '<p></p>' + 'El Factor no puede ser 1.';

        if ($(Cuerpo + 'txtCostoCon').val() == '')
            Cadena = Cadena + '<p></p>' + 'Costo';

        if ($(Cuerpo + 'txtPrecio1').val() == '')
            Cadena = Cadena + '<p></p>' + 'Precio ';

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

        if ($(Contenedor + 'txtStockMinimo').val() == '')
            $(Contenedor + 'txtStockMinimo').val('0.00');

        if ($(Contenedor + 'txtStockMaximo').val() == '')
            $(Contenedor + 'txtStockMaximo').val('0.00');

        var CostoSoles = 0;
        var CostoDolares = 0;
        var Precio1Dolares = 0;
        var Precio2Dolares = 0;
        var Precio3Dolares = 0;

        if ($(Contenedor + 'ddlMoneda').val() == '1') {
            CostoSoles = $(Contenedor + 'txtCosto').val();
            CostoDolares = (Number($(Contenedor + 'txtCosto').val()) / Number($(Contenedor + 'txtTC').val())).toFixed(2);
            Precio1Dolares = (Number($(Contenedor + 'txtPrecio1').val()) / Number($(Contenedor + 'txtTC').val())).toFixed(2);
            Precio2Dolares = (Number($(Contenedor + 'txtPrecio2').val()) / Number($(Contenedor + 'txtTC').val())).toFixed(2);
            Precio3Dolares = (Number($(Contenedor + 'txtPrecio3').val()) / Number($(Contenedor + 'txtTC').val())).toFixed(2);
        } else {
            CostoSoles = (Number($(Contenedor + 'txtCosto').val()) * Number($(Contenedor + 'txtTC').val())).toFixed(2);
            CostoDolares = $(Contenedor + 'txtCosto').val();
            Precio1Dolares = Number($(Contenedor + 'txtPrecio1').val());
            Precio2Dolares = Number($(Contenedor + 'txtPrecio2').val());
            Precio3Dolares = Number($(Contenedor + 'txtPrecio3').val());
        }


        // recorrido para seleccionar imagen
        var arrImg = new Array();
        $('.dz-preview').each(function () {
            arrImg.push(this.id);
        });





        var objParams = {
            Filtro_IdFamilia: $(Contenedor + 'ddlFamilia').val(),
            Filtro_DscProducto: $(Contenedor + 'txtDescripcion').val().toUpperCase().trim(),
            Filtro_DscProductoIngles: $(Contenedor + 'txtDescripcionIngles').val().toUpperCase().trim(),
            Filtro_PartidaArancelaria: $(Contenedor + 'txtPartidaArancelaria').val(),
            Filtro_CodTipoProducto: '2',
            Filtro_CodUnidadCompra: $(Contenedor + 'ddlUMCompra').val(),
            Filtro_CodUnidadVenta: $(Contenedor + 'ddlUMVenta').val(),
            Filtro_Costo: $(Contenedor + 'txtCosto').val(),
            Filtro_CostoOriginal: $(Contenedor + 'txtCosto').val(),
            Filtro_Factor: $(Contenedor + 'txtFactor').val(),
            Filtro_CodigoInterno: $(Contenedor + 'txtCodigoInterno').val().toUpperCase().trim(),
            Filtro_CodigoProducto: $(Contenedor + 'txtCodigo').val().toUpperCase().trim(),
            Filtro_CodigoAlternativo: $(Contenedor + 'txtCodigo2').val().toUpperCase().trim(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
            Filtro_CostoSoles: CostoSoles,
            Filtro_CostoDolares: CostoDolares,
            Filtro_Precio: $(Contenedor + 'txtPrecio1').val(),
            Filtro_Precio2: $(Contenedor + 'txtPrecio2').val(),
            Filtro_Precio3: $(Contenedor + 'txtPrecio3').val(),
            Filtro_PrecioDolares: Precio1Dolares,
            Filtro_Precio2Dolares: Precio2Dolares,
            Filtro_Precio3Dolares: Precio3Dolares,
            Filtro_Anio: $(Contenedor + 'txtAño').val(),
            Filtro_Ubicacion: $(Contenedor + 'txtUbicacion').val().toUpperCase().trim(),
            Filtro_IdImagenProducto: $('#hid_id_logo').val(),
            Filtro_Marca: $(Contenedor + 'txtMarca').val().toUpperCase().trim(),
            Filtro_Posicion: $(Contenedor + 'txtPosicion').val().toUpperCase().trim(),
            Filtro_Modelo: $(Contenedor + 'txtModelo').val().toUpperCase().trim(),
            Filtro_Medida: $(Contenedor + 'txtMedida').val().toUpperCase().trim(),
            Filtro_StockMinimo: $(Contenedor + 'txtStockMinimo').val(),
            Filtro_StockMaximo: $(Contenedor + 'txtStockMaximo').val(),
            Filtro_Imagenes: Sys.Serialization.JavaScriptSerializer.serialize(arrImg)
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
                if (str_mensaje_operacion == 'Se Grabo Correctamente.') {

                    $('#hid_id_logo').val('');
                    $(Contenedor + 'txtCodigoInterno').val('');
                    $(Contenedor + 'txtCodigo2').val('');
                    $(Contenedor + 'txtCodigo').val('');
                    $(Contenedor + 'txtDescripcion').val('');
                    $(Contenedor + 'txtDescripcionIngles').val('');
                    $(Contenedor + 'txtPosicion').val('');
                    $(Contenedor + 'txtMarca').val('');
                    $(Contenedor + 'txtModelo').val('');
                    $(Contenedor + 'txtMedida').val(''),
                    $(Contenedor + 'txtFactor').val('1'),
                    $(Contenedor + 'txtCosto').val('');
                    $(Contenedor + 'txtUbicacion').val('');
                    $(Contenedor + 'txtStockMinimo').val('0.00');
                    $(Contenedor + 'txtStockMaximo').val('0.00');
                    $(Contenedor + 'ddlMoneda').val('1');
                    $(Contenedor + 'ddlUMCompra').val('22');
                    $(Contenedor + 'ddlUMVenta').val('22');
                    $(Contenedor + 'ddlFamilia').val('007');
                    $(Contenedor + 'txtPrecio1').val(''),
                        $(Contenedor + 'txtPrecio2').val('');
                    $(Contenedor + 'txtPrecio3').val('');
                    alertify.log('Se Grabo Correctamente.');
                    $(Contenedor + 'txtCodigo').focus();

                    $('#mydropzone').remove();
                    F_AbrirDropzone_JS();
                    //                    F_AbrirDropzone_JS();
                    //                    F_AbrirDropzone_Edit_JS

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
    $(Contenedor + 'txtCodigo2').val('');
    $(Contenedor + 'txtPartidaArancelaria').val('');
    $(Contenedor + 'txtDescripcionIngles').val('');
    $(Contenedor + 'txtMarca').val('');
    $(Contenedor + 'txtModelo').val('');
    $(Contenedor + 'txtMedida').val(''),
    $(Contenedor + 'txtFactor').val('1'),
    $(Contenedor + 'txtCostoConIgv').val('');
    $(Contenedor + 'txtCostoSolesIgv').val('');
    $(Contenedor + 'ddlMoneda').val('1');
    $(Contenedor + 'ddlUMCompra').val('22');
    $(Contenedor + 'ddlUMVenta').val('22');
    $(Contenedor + 'ddlFamilia').val('007');
    $(Contenedor + 'txtPrecio1').val(''),
    $(Contenedor + 'txtPrecio2').val('');
    $(Contenedor + 'txtPrecio3').val('');
    $(Contenedor + 'txtUbicacion').val('');
    $(Contenedor + 'txtStockMinimo').val('0.00');
    $(Contenedor + 'txtStockMaximo').val('0.00');
    $(Contenedor + 'txtAño').val('');
    $(Contenedor + 'txtMarca').prop('disabled', false);
    $(Contenedor + 'txtModelo').prop('disabled', false);
    $(Contenedor + 'txtMedida').prop('disabled', false),
    $('hid_id_logo').val('');
    $('hid_id_logo_Edit').val('');
    $('hid_id_logo_Edit2').val('');
    $(Contenedor + 'txtCodigo').focus();

    return false;

}

function F_Buscar() {

    try {
        var objParams = {
            Filtro_Descripcion: $("#MainContent_txtDescripcionConsulta").val(),
            Filtro_IdFamilia: $('#MainContent_ddlFamiliaConsulta').val(),
            Filtro_CodEstado: $('#MainContent_ddlFiltroCodEstado').val()

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
                $('#lblNumeroConsulta').text(F_Numerar_Grilla("grvConsulta", 'lblProducto')); 
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


        if (!confirm("ESTA SEGURO DE ELIMINAR EL PRODUCTO " + $(lblProducto_grilla).text()))
            return false;

        var objParams = {
            Filtro_CodProducto: $(lblCodigo).val(),
            Filtro_Descripcion: $('#MainContent_txtDescripcionConsulta').val(),
            Filtro_IdFamilia: $('#MainContent_ddlFamiliaConsulta').val()
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

function F_ActivarRegistro(Fila) {
    try {
        var imgID = Fila.id;

        var lblCodigo = '#' + imgID.replace('imgActivarProducto', 'lblcodigo');
        var lblProducto_grilla = '#' + imgID.replace('imgActivarProducto', 'lblProducto');


        if (!confirm("ESTA SEGURO DE ACTIVAR EL PRODUCTO " + $(lblProducto_grilla).text()))
            return false;

        var objParams = {
            Filtro_CodProducto: $(lblCodigo).val(),
            Filtro_Descripcion: $('#MainContent_txtDescripcionConsulta').val(),
            Filtro_IdFamilia: $('#MainContent_ddlFamiliaConsulta').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ActivarRegistro_Net(arg, function (result) {

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
        var lblCodigo_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblCodigo');
        var hfCodigoInterno_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCodigoInterno');
        var lblCodigoProducto_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblCodigoProducto');
        var hfDescripcionCorta = '#' + imgID.replace('imgEditarRegistro', 'hfDescripcionCorta');
        var hfAro3_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfAro3');
        var hfMarca = '#' + imgID.replace('imgEditarRegistro', 'hfMarca');
        var hfMedida = '#' + imgID.replace('imgEditarRegistro', 'hfMedida');
        var hfCodMoneda_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCodMoneda');
        var hfCodUnidadCompra_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCodUnidadCompra');
        var hfCodUnidadVenta_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCodUnidadVenta');
        var hfIdFamilia_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfIdFamilia');
        var hfFactor_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfFactor');
        var lblcodigo_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblcodigo');
        var hfModelo = '#' + imgID.replace('imgEditarRegistro', 'hfModelo');
        var hfPosicion = '#' + imgID.replace('imgEditarRegistro', 'hfPosicion');
        var hfAnio = '#' + imgID.replace('imgEditarRegistro', 'hfAnio');
        var hfStockMaximo = '#' + imgID.replace('imgEditarRegistro', 'hfStockMaximo');
        var hfStockMinimo = '#' + imgID.replace('imgEditarRegistro', 'hfStockMinimo');
        var hfCodigoAlternativo = '#' + imgID.replace('imgEditarRegistro', 'hfCodigoAlternativo');
        var hfDscProductoIngles = '#' + imgID.replace('imgEditarRegistro', 'hfDscProductoIngles');
        var hfPartidaArancelaria = '#' + imgID.replace('imgEditarRegistro', 'hfPartidaArancelaria');
        var lblUbicacionRaymondi = '#' + imgID.replace('imgEditarRegistro', 'lblUbicacionRaymondi');
        var lblUbicacionPrincipal = '#' + imgID.replace('imgEditarRegistro', 'lblUbicacionPrincipal');
        var lbIdImagenProducto1 = '#' + imgID.replace('imgEditarRegistro', 'hIdImagenProducto1');
        var hfCostoSoles_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCostoSoles');
        var hfCostoDolares_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfCostoDolares');
        var hfPrecio1_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfPrecio1');
        var hfPrecio2_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfPrecio2');
        var hfPrecio3_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfPrecio3');
        var hfUbicacion_grilla = '#' + imgID.replace('imgEditarRegistro', 'hfUbicacion');

        var Cuerpo = '#MainContent_';

        $(Cuerpo + 'txtCodigoEdicion').val($(lblCodigoProducto_grilla).text());
        $(Cuerpo + 'txtCodigoInternoEdicion').val($(hfCodigoInterno_grilla).val());
        $(Cuerpo + 'ddlFamiliaEdicion').val($(hfIdFamilia_grilla).val());
        $(Cuerpo + 'txtDescripcionEdicion').val($(hfDescripcionCorta).val());
        $(Cuerpo + 'txtMarcaEdicion').val($(hfMarca).val());
        $(Cuerpo + 'txtModeloEdicion').val($(hfModelo).val());
        $(Cuerpo + 'txtMedidaEdicion').val($(hfMedida).val());
        $(Cuerpo + 'txtPosicionEdicion').val($(hfPosicion).val());
        $(Cuerpo + 'txtFactorEdicion').val($(hfFactor_grilla).val());
        $(Cuerpo + 'ddlMonedaEdicion').val($(hfCodMoneda_grilla).val());
        $(Cuerpo + 'ddlCompraEdicion').val($(hfCodUnidadCompra_grilla).val());
        $(Cuerpo + 'ddlVentaEdicion').val($(hfCodUnidadVenta_grilla).val());
        $(Cuerpo + 'txtAñoEdicion').val($(hfAnio).val());

        var CostoSoles = Number($(hfCostoSoles_grilla).val()).toFixed(2);
        var CostoDolares = Number($(hfCostoDolares_grilla).val()).toFixed(2);
        var Precio1 = Number($(hfPrecio1_grilla).val()).toFixed(2);
        var Precio2 = Number($(hfPrecio2_grilla).val()).toFixed(2);
        var Precio3 = Number($(hfPrecio3_grilla).val()).toFixed(2);

        if ($(Cuerpo + 'ddlMonedaEdicion').val() == '1') {
            $(Cuerpo + 'txtCostoEdicion').val(CostoSoles);
        } else {
            $(Cuerpo + 'txtCostoEdicion').val(CostoDolares);
        }

        $(Cuerpo + 'txtPrecio1Edicion').val(Precio1);
        $(Cuerpo + 'txtPrecio2Edicion').val(Precio2);
        $(Cuerpo + 'txtPrecio3Edicion').val(Precio3);

        $('#hfCodProducto').val($(lblcodigo_grilla).val());
        $(Cuerpo + 'ddlFamiliaConsulta').val($(hfIdFamilia_grilla).val());

        $(Cuerpo + 'txtStockMaximoEdicion').val($(hfStockMaximo).val());
        $(Cuerpo + 'txtStockMinimoEdicion').val($(hfStockMinimo).val());
        $(Cuerpo + 'txtCodigo2Edicion').val($(hfCodigoAlternativo).val());
        $(Cuerpo + 'txtDescripcionInglesEdicion').val($(hfDscProductoIngles).val());
        $(Cuerpo + 'txtPartidaArancelariaEdicion').val($(hfPartidaArancelaria).val());
        $(Cuerpo + 'txtPartidaArancelariaEdicion').val($(hfPartidaArancelaria).val());
        $(Cuerpo + 'txtUbicacionEdicion').val($(hfUbicacion_grilla).val());

        $('#hid_id_nombre_edit').val(lbIdImagenProducto1); //asigna el campo de la grilla donde se refrescara el numero de la imagen
        $('#hid_id_logo_Edit').val($(lbIdImagenProducto1).val());
        $('#hid_id_logo_Edit2').val($(lbIdImagenProducto1).val());

        //        if ($("#hfCodSede").val() == 2)
        //            $(Cuerpo + 'txtUbicacionEdicion').val($(lblUbicacionRaymondi).text());
        //        else
        //            $(Cuerpo + 'txtUbicacionEdicion').val($(lblUbicacionPrincipal).text());

        var d = new Date();
        var objParams = {
            Filtro_CodProducto: $('#hfCodProducto').val(),
            Filtro_Emision: d.format("dd/MM/yyyy")

        };

        F_AbrirDropzone_Edit_JS($('#hfCodProducto').val(), $('#hfCodProducto').val());

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
                    height: 540,
                    width: 1260,
                    autoOpen: false
                });

                $('#divEdicionRegistro').dialog('open');

            }
            else {
                alertify.log(result.split('~')[1]);
            }

            return false;

        });

        //Consulta de Imagen

    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function F_ActualizarRemoto(Fila) {

    if (!confirm("ESTA SEGURO DE ACTUALIZAR EL PRODUCTO EN TODOS LOS ALMACENES, LAS ACTUALIZACIONES SE HACEN EN BASE A LO MAS ACTUAL, SI EN LA NUBE EXISTE UNA VERSION MAS ACTUALIZADA QUE EL PRODUCTO, SE TOMARA ESA VERSION COMO NUEVA ACTUALIZACION"))
        return false;


    try {
        var imgID = Fila.id;
        var lblCodigo_grilla = '#' + imgID.replace('imgRefresh', 'lblCodigo');
        var hfCodigoInterno_grilla = '#' + imgID.replace('imgRefresh', 'hfCodigoInterno');
        var lblCodigoProducto_grilla = '#' + imgID.replace('imgRefresh', 'lblCodigoProducto');
        var hfDescripcionCorta = '#' + imgID.replace('imgRefresh', 'hfDescripcionCorta');
        var hfAro3_grilla = '#' + imgID.replace('imgRefresh', 'hfAro3');
        var hfMarca = '#' + imgID.replace('imgRefresh', 'hfMarca');
        var hfMedida = '#' + imgID.replace('imgRefresh', 'hfMedida');
        var hfCodMoneda_grilla = '#' + imgID.replace('imgRefresh', 'hfCodMoneda');
        var hfCodUnidadCompra_grilla = '#' + imgID.replace('imgRefresh', 'hfCodUnidadCompra');
        var hfCodUnidadVenta_grilla = '#' + imgID.replace('imgRefresh', 'hfCodUnidadVenta');
        var hfIdFamilia_grilla = '#' + imgID.replace('imgRefresh', 'hfIdFamilia');
        var hfFactor_grilla = '#' + imgID.replace('imgRefresh', 'hfFactor');
        var lblcodigo_grilla = '#' + imgID.replace('imgRefresh', 'lblcodigo');
        var hfModelo = '#' + imgID.replace('imgRefresh', 'hfModelo');
        var hfPosicion = '#' + imgID.replace('imgRefresh', 'hfPosicion');
        var hfAnio = '#' + imgID.replace('imgRefresh', 'hfAnio');
        var hfStockMaximo = '#' + imgID.replace('imgRefresh', 'hfStockMaximo');
        var hfStockMinimo = '#' + imgID.replace('imgRefresh', 'hfStockMinimo');
        var hfCodigoAlternativo = '#' + imgID.replace('imgRefresh', 'hfCodigoAlternativo');
        var hfDscProductoIngles = '#' + imgID.replace('imgRefresh', 'hfDscProductoIngles');
        var hfPartidaArancelaria = '#' + imgID.replace('imgRefresh', 'hfPartidaArancelaria');
        var lblUbicacionRaymondi = '#' + imgID.replace('imgRefresh', 'lblUbicacionRaymondi');
        var lblUbicacionPrincipal = '#' + imgID.replace('imgRefresh', 'lblUbicacionPrincipal');
        var lbIdImagenProducto1 = '#' + imgID.replace('imgRefresh', 'hIdImagenProducto1');

        var hfCostoSoles_grilla = '#' + imgID.replace('imgRefresh', 'hfCostoSoles');
        var hfCostoDolares_grilla = '#' + imgID.replace('imgRefresh', 'hfCostoDolares');
        var hfPrecio1_grilla = '#' + imgID.replace('imgRefresh', 'hfPrecio1');
        var hfPrecio2_grilla = '#' + imgID.replace('imgRefresh', 'hfPrecio2');
        var hfPrecio3_grilla = '#' + imgID.replace('imgRefresh', 'hfPrecio3');
        var hfPrecio1Dolares_grilla = '#' + imgID.replace('imgRefresh', 'hfPrecio1Dolares');
        var hfPrecio2Dolares_grilla = '#' + imgID.replace('imgRefresh', 'hfPrecio2Dolares');
        var hfPrecio3Dolares_grilla = '#' + imgID.replace('imgRefresh', 'hfPrecio3Dolares');
        var hfUbicacion_grilla = '#' + imgID.replace('imgRefresh', 'hfUbicacion');

        var Img = 0;
        if ($(lbIdImagenProducto1).val() != '')
            Img = $(lbIdImagenProducto1).val();

        var objParams = {
            Filtro_CodProducto: $(lblcodigo_grilla).val(),
            Filtro_IdFamilia: $(hfIdFamilia_grilla).val(),
            Filtro_DscProducto: $(hfDescripcionCorta).val().toUpperCase().trim(),
            Filtro_DscProductoIngles: $(hfDscProductoIngles).val().toUpperCase().trim(),
            Filtro_PartidaArancelaria: $(hfPartidaArancelaria).val(),
            Filtro_CodTipoProducto: '2',
            Filtro_CodUnidadCompra: $(hfCodUnidadCompra_grilla).val(),
            Filtro_CodUnidadVenta: $(hfCodUnidadVenta_grilla).val(),
            Filtro_Costo: Number($(hfCostoSoles_grilla).val()).toFixed(2),
            Filtro_CostoOriginal: Number($(hfCostoDolares_grilla).val()).toFixed(2),
            Filtro_Factor: Number($(hfFactor_grilla).val()).toFixed(0),
            Filtro_CodigoInterno: $(hfCodigoInterno_grilla).val().toUpperCase().trim(),
            Filtro_CodigoProducto: $(lblCodigoProducto_grilla).text().toUpperCase().trim(),
            Filtro_CodigoAlternativo: $(hfCodigoAlternativo).val().toUpperCase().trim(),
            Filtro_CodMoneda: $(hfCodMoneda_grilla).val(),
            Filtro_CostoSoles: Number($(hfCostoSoles_grilla).val()).toFixed(2),
            Filtro_CostoDolares: Number($(hfCostoDolares_grilla).val()).toFixed(2),
            Filtro_Precio: Number($(hfPrecio1_grilla).val()).toFixed(2),
            Filtro_Precio2: Number($(hfPrecio2_grilla).val()).toFixed(2),
            Filtro_Precio3: Number($(hfPrecio3_grilla).val()).toFixed(2),
            Filtro_PrecioDolares: Number($(hfPrecio1Dolares_grilla).val()).toFixed(2),
            Filtro_Precio2Dolares: Number($(hfPrecio2Dolares_grilla).val()).toFixed(2),
            Filtro_Precio3Dolares: Number($(hfPrecio3Dolares_grilla).val()).toFixed(2),
            Filtro_Anio: $(hfAnio).val(),
            Filtro_Ubicacion: $(hfUbicacion_grilla).val().toUpperCase().trim(),
            //Filtro_IdImagenProducto: IdImagenEdit,
            Filtro_Marca: $(hfMarca).val().toUpperCase().trim(),
            Filtro_Posicion: $(hfPosicion).val().toUpperCase().trim(),
            Filtro_Modelo: $(hfModelo).val().toUpperCase().trim(),
            Filtro_Medida: $(hfMedida).val().toUpperCase().trim(),
            Filtro_StockMinimo: $(hfStockMinimo).val(),
            Filtro_StockMaximo: $(hfStockMaximo).val(),
            Filtro_IdImagenProducto1: Img
        };


        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ActualizarRemoto_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == '') {
                    alertify.log("EL PROCESO PUEDE TARDAR UN PAR DE MINUTOS, LAS ACTUALIZACIONES SE HACEN EN BASE A LO MAS ACTUAL");
                }

            }
            else {
                alertify.log(result.split('~')[1]);
            }

            return false;

        });

        //Consulta de Imagen

    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }

}

//agutierrez
function F_VisualizarRegistro(Fila) {

    var imgID = Fila.id;
    var Cuerpo = '#MainContent_';
    var lblcodigo = '#' + imgID.replace('imgVisualizarRegistro', 'lblcodigo');
    //lblProducto
    var hlblCodigoProducto = '#' + imgID.replace('imgVisualizarRegistro', 'lblCodigoProducto'); $(Cuerpo + 'txtCodigoVisualizacion').val($(hlblCodigoProducto).text());
    var hlblCodigo = '#' + imgID.replace('imgVisualizarRegistro', 'hfCodigoAlternativo'); $(Cuerpo + 'txtCodigo2Visualizacion').val($(hlblCodigo).val());
    var hlblProducto = '#' + imgID.replace('imgVisualizarRegistro', 'lblProducto'); $(Cuerpo + 'txtDescripcionVisualizacion').val($(hlblProducto).text());
    var hlblMedida = '#' + imgID.replace('imgVisualizarRegistro', 'hfMedida'); $(Cuerpo + 'txtMedidaVisualizacion').val($(hlblMedida).val());

    var hlblPais = '#' + imgID.replace('imgVisualizarRegistro', 'lblPrecio1'); $(Cuerpo + 'txtPaisVisualizacion').val($(hlblPais).text());
    var hlblMarca = '#' + imgID.replace('imgVisualizarRegistro', 'hfMarca'); $(Cuerpo + 'txtMarcaVisualizacion').val($(hlblMarca).val());
    var hlblModelo = '#' + imgID.replace('imgVisualizarRegistro', 'hfModelo'); $(Cuerpo + 'txtModeloVisualizacion').val($(hlblModelo).val());
    var hlblPosicion = '#' + imgID.replace('imgVisualizarRegistro', 'hfPosicion'); $(Cuerpo + 'txtPosicionVisualizacion').val($(hlblPosicion).val());
    var hlblAño = '#' + imgID.replace('imgVisualizarRegistro', 'hfAnio'); $(Cuerpo + 'txtAnovisualizacion').val($(hlblAño).val());




    var str_id = $(lblcodigo).val(); if (str_id == "") { str_id = 0; };
    var arrImg = new Array();
    var carga = 0;
    $.ajax({
        async: true,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: "../Digitalizacion/FileDocDB.ashx?IdFile=" + str_id + "&Flag=1&tipo=1" + "&otro=" + Math.round(Math.random()) * 100,
        success: function (data) {
            MostrarEspera(true);
            try {
                var obj = $.parseJSON(data);
                $.each(obj, function (index, item) {
                    arrImg.push(item.img);
                });
                F_ArmarListaImagenes(arrImg);
            } catch (x) { alertify.log('El Producto no tiene Imagenes'); }
            MostrarEspera(false);
        },
        error: function () {
            alertify.log('Ha ocurrido un error interno, por favor intentelo nuevamente.');
        }
    });
}
//agutierrez
function F_ArmarListaImagenes(arrImg) {
    var lu = $('#luImagenes'); lu.empty();

    //imagenes dinamicas por cuadricula
    var med_li = ""; var med_img = "";
    switch (arrImg.length) {
        case 1: med_li = "width:900px; height:450px"; med_img = "max-width:850px; max-height:450px;"; break;
        case 2: med_li = "width:450px; height:450px"; med_img = "max-width:450px; max-height:450px;"; break;
        case 3: med_li = "width:300px; height:200px"; med_img = "max-width:250px; max-height:200px;"; break;
        case 4: med_li = "width:300px; height:200px"; med_img = "max-width:250px; max-height:200px;"; break;
        case 5: med_li = "width:300px; height:200px"; med_img = "max-width:250px; max-height:200px;"; break;
        case 6: med_li = "width:300px; height:200px"; med_img = "max-width:250px; max-height:200px;"; break;
        case 7: med_li = "width:225px; height:200px"; med_img = "max-width:175px; max-height:200px;"; break;
        case 8: med_li = "width:225px; height:200px"; med_img = "max-width:175px; max-height:200px;"; break;
        case 9: med_li = "width:225px; height:135px"; med_img = "max-width:175px; max-height:135px;"; break;
        case 10: med_li = "width:225px; height:105px"; med_img = "max-width:175px; max-height:105px;"; break;
        case 11: med_li = "width:225px; height:105px"; med_img = "max-width:175px; max-height:105px;"; break;
        case 12: med_li = "width:225px; height:105px"; med_img = "max-width:175px; max-height:105px;"; break;
        default: med_li = "width:300px; height:200px"; med_img = "max-width:250px; max-height:200px;"; break;
    }

    $.each(arrImg, function (key, value) {

        var fmt = ' <li class="li-float" style="' + med_li + '"> ' +
                    '     <a href=' + value + '  ' +
                    '         target="_blank" ' +
                    '         rel="nofollow"  ' +
                    '         style="background-image: url(' + value + ');"> ' +
                    '         <img src="' + value + '" class="li-img" style="' + med_img + ' margin: 0 auto" alt="Imagen 1"/> ' +
                    '      </a> ' +
                    ' </li> ';
        lu.append(fmt)
    });

    $("#divVisualizarImagen").dialog({
        resizable: false,
        modal: true,
        title: "Visualización del Artículo",
        title_html: true,
        width: 1100,
        height: 650,
        autoOpen: false
    });

    $('#divVisualizarImagen').dialog('open');
}

function F_EdicionRegistro() {

    try {
        var Contenedor = '#MainContent_';

        if ($(Contenedor + 'txtStockMinimoEdicion').val() == '')
            $(Contenedor + 'txtStockMinimoEdicion').val('0.00');

        if ($(Contenedor + 'txtStockMaximoEdicion').val() == '')
            $(Contenedor + 'txtStockMaximoEdicion').val('0.00');

        var CostoSoles = 0;
        var CostoDolares = 0;
        var Precio1Dolares = 0;
        var Precio2Dolares = 0;
        var Precio3Dolares = 0;

        if ($(Contenedor + 'ddlMonedaEdicion').val() == '1') {
            CostoSoles = $(Contenedor + 'txtCostoEdicion').val();
            CostoDolares = (Number($(Contenedor + 'txtCostoEdicion').val()) / Number($(Contenedor + 'txtTCEdicion').val())).toFixed(2);
            Precio1Dolares = (Number($(Contenedor + 'txtPrecio1Edicion').val()) / Number($(Contenedor + 'txtTCEdicion').val())).toFixed(2);
            Precio2Dolares = (Number($(Contenedor + 'txtPrecio2Edicion').val()) / Number($(Contenedor + 'txtTCEdicion').val())).toFixed(2);
            Precio3Dolares = (Number($(Contenedor + 'txtPrecio3Edicion').val()) / Number($(Contenedor + 'txtTCEdicion').val())).toFixed(2);
        } else {
            CostoSoles = (Number($(Contenedor + 'txtCostoEdicion').val()) * Number($(Contenedor + 'txtTCEdicion').val())).toFixed(2);
            CostoDolares = $(Contenedor + 'txtCostoEdicion').val();
            Precio1Dolares = Number($(Contenedor + 'txtPrecio1Edicion').val());
            Precio2Dolares = Number($(Contenedor + 'txtPrecio2Edicion').val());
            Precio3Dolares = Number($(Contenedor + 'txtPrecio3Edicion').val());
        }


        var IdImagenEdit = 0;
        if ($('#hid_id_logo_Edit').val() != $('#hid_id_logo_Edit2').val()) { IdImagenEdit = $('#hid_id_logo_Edit2').val(); }

        // recorrido para seleccionar imagen
        var arrImg = new Array();
        $('.dz-preview').each(function () {
            arrImg.push(this.id);
        });
        $(Contenedor + 'txtFactorEdicion').val(1);
        var objParams = {
            Filtro_CodProducto: $('#hfCodProducto').val(),
            Filtro_IdFamilia: $(Contenedor + 'ddlFamiliaEdicion').val(),
            Filtro_DscProducto: $(Contenedor + 'txtDescripcionEdicion').val().toUpperCase().trim(),
            Filtro_Descripcion: $(Contenedor + 'txtDescripcionEdicion').val().toUpperCase().trim(),
            Filtro_DscProductoIngles: $(Contenedor + 'txtDescripcionInglesEdicion').val().toUpperCase().trim(),
            Filtro_PartidaArancelaria: $(Contenedor + 'txtPartidaArancelariaEdicion').val(),
            Filtro_CodTipoProducto: '2',
            Filtro_CodUnidadCompra: $(Contenedor + 'ddlCompraEdicion').val(),
            Filtro_CodUnidadVenta: $(Contenedor + 'ddlVentaEdicion').val(),
            Filtro_Costo: $(Contenedor + 'txtCostoEdicion').val(),
            Filtro_CostoOriginal: $(Contenedor + 'txtCostoEdicion').val(),
            Filtro_Factor: Number($(Contenedor + 'txtFactorEdicion').val()).toFixed(0),
            Filtro_CodigoInterno: $(Contenedor + 'txtCodigoInternoEdicion').val().toUpperCase().trim(),
            Filtro_CodigoProducto: $(Contenedor + 'txtCodigoEdicion').val().toUpperCase().trim(),
            Filtro_CodigoAlternativo: $(Contenedor + 'txtCodigo2Edicion').val().toUpperCase().trim(),
            Filtro_CodMoneda: $(Contenedor + 'ddlMonedaEdicion').val(),
            Filtro_CostoSoles: CostoSoles,
            Filtro_CostoDolares: CostoDolares,
            Filtro_Precio: $(Contenedor + 'txtPrecio1Edicion').val(),
            Filtro_Precio2: $(Contenedor + 'txtPrecio2Edicion').val(),
            Filtro_Precio3: $(Contenedor + 'txtPrecio3Edicion').val(),
            Filtro_PrecioDolares: Precio1Dolares,
            Filtro_Precio2Dolares: Precio2Dolares,
            Filtro_Precio3Dolares: Precio3Dolares,
            Filtro_Anio: $(Contenedor + 'txtAñoEdicion').val(),
            Filtro_Ubicacion: $(Contenedor + 'txtUbicacionEdicion').val().toUpperCase().trim(),
            Filtro_IdImagenProducto: IdImagenEdit,
            Filtro_Marca: $(Contenedor + 'txtMarcaEdicion').val().toUpperCase().trim(),
            Filtro_Posicion: $(Contenedor + 'txtPosicionEdicion').val().toUpperCase().trim(),
            Filtro_Modelo: $(Contenedor + 'txtModeloEdicion').val().toUpperCase().trim(),
            Filtro_Medida: $(Contenedor + 'txtMedidaEdicion').val().toUpperCase().trim(),
            Filtro_StockMinimo: $(Contenedor + 'txtStockMinimoEdicion').val(),
            Filtro_StockMaximo: $(Contenedor + 'txtStockMaximoEdicion').val(),
            Filtro_IdImagenProducto1: IdImagenEdit,
            Filtro_Imagenes: Sys.Serialization.JavaScriptSerializer.serialize(arrImg)
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
                    $('#divEdicionRegistro').dialog('close');
                    var nombrecampo = $('#hid_id_nombre_edit').val();
                    $(Contenedor + 'txtCodigoProductoEdicion').val('');
                    $(Contenedor + 'txtDescripcionEdicion').val('');
                    $(Contenedor + 'txtMarcaEdicion').val('');
                    $(Contenedor + 'txtModeloEdicion').val('');
                    $(Contenedor + 'txtMedidaEdicion').val(''),
                    $(Contenedor + 'txtFactorEdicion').val('1'),
                    $(Contenedor + 'txtCostoConIgvEdicion').val('');
                    $(Contenedor + 'txtCostoSolesIgvEdicion').val('');
                    $(Contenedor + 'txtAñoEdicion').val('');
                    $(Contenedor + 'txtPrecio1').val(''),
                    $(Contenedor + 'txtPrecio2').val('');
                    $(Contenedor + 'txtPrecio3').val('');
                    $(Contenedor + 'txtUbicacion').val('');
                    $(Contenedor + 'ddlFamiliaConsulta').val('0');
                    $('#hid_id_logo_Edit').val('');
                    $('#hid_id_logo_Edit2').val('');
                }
                else {
                    alertify.log(str_mensaje_operacion);
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

        //        if ($(Cuerpo + 'txtTcEdicion').val() == '0')
        //            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        //        if ($(Cuerpo + 'txtFactorEdicion').val() == '')
        //            Cadena = Cadena + '<p></p>' + 'Factor';

        if (($(Cuerpo + 'ddlCompraEdicion').val() != $(Cuerpo + 'ddlVentaEdicion').val()) && ($(Cuerpo + 'txtFactorEdicion').val() == '1' | $(Cuerpo + 'txtFactorEdicion').val() == '1.00'))
            Cadena = Cadena + '<p></p>' + 'La unidad de compra y venta son distintas,el Factor no puede ser 1.';

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

function F_VerPrecioMinimo(HlkControlID) {
    var Contenedor = '#MainContent_';



    $(Contenedor + 'txtPrecioMinimo').val($('#' + HlkControlID.replace('lblPrecio1', 'hfPrecio2')).val());
    $(Contenedor + 'txtMoneda').val($('#' + HlkControlID.replace('lblPrecio1', 'lblMoneda')).text());

    $('#div_ultimoprecio').dialog({
        resizable: false,
        modal: true,
        title: "Precio Minimo",
        title_html: true,
        height: 100,
        width: 300,
        autoOpen: false
    });

    $('#div_ultimoprecio').dialog('open');


}

//Procedimiento para abrir el dropZone
function F_CrearDropzone_JS() {
    var midiv = document.createElement("div");
    midiv.setAttribute("id", "mydropzone");
    midiv.setAttribute("class", "dropzone");
    midiv.setAttribute("style", "width:450px; height:420px; margin-left: 10px; border-radius:12px; min-height:200px; padding:0px;");
    document.getElementById('drop').appendChild(midiv);
}

function F_CrearDropzone_Edit_JS() {
    var midiv_Edit = document.createElement("div");
    midiv_Edit.setAttribute("id", "mydropzone_Edit");
    midiv_Edit.setAttribute("class", "dropzone");
    midiv_Edit.setAttribute("style", "width:450px; height:420px; margin-left: 10px; border-radius:12px; min-height:200px; padding:0px;");
    document.getElementById('div_drop_Edit').appendChild(midiv_Edit);

}

function F_AbrirDropzone_JS() {
    F_CrearDropzone_JS();

    var str_id;
    str_id = $('#hid_id_mantenimiento').val(); if (str_id == '') str_id = '0';

    myDropzone = new Dropzone("#mydropzone", {
        url: "Productos.aspx",
        method: "POST",
        paramName: "file1",
        parallelUploads: 10,
        addRemoveLinks: true,
        autoProcessQueue: true,
        uploadMultiple: true,
        maxFileSize: 2,
        maxFiles: null,
        dictResponseError: "Ha ocurrido un error en el server",
        dictRemoveFile: "Remover Doc.",
        acceptedFiles: 'image/*,.jpeg,.jpg,.png,.bmp,.JPEG,.JPG,.PNG,.psd',
        previewTemplate: "<div id=\"idzID\" class=\"dz-preview dz-file-preview\">\n  <div  class=\"dz-details\">\n <div class=\"dz-filename\"><span data-dz-name></span></div>\n             <div class=\"dz-size\" data-dz-size></div>\n  <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage>Error, archivo no compatible o fuera del rango del tamaño permitido.</span></div>\n</div>",
        error: function (file, response) {
            file.previewElement.classList.add("dz-error");
        },
        init: function () {
            var thisDropzone = this;

            $('#btn_man_cancelar').click(function () {
                thisDropzone.removeAllFiles(true);
            });

            this.on("reset", function (file) {
                thisDropzone.removeAllFiles(true);
            });

            this.on("addedfile", function (file) {
                if (this.files.length) {
                    var i, len, pre;
                    for (i = 0, len = this.files.length; i < len - 1; i++) {
                        if (this.files[i].name == file.name) {
                            alertify.log("EL LOGO : " + file.name + " YA SE ENCUENTRA REGISTRADO.");
                            return (pre = file.previewElement) != null ? pre.parentNode.removeChild(file.previewElement) : void 0;
                        }
                    }
                }
                return false;
            });

            this.on("maxfilesexceeded", function (file) {
                this.removeAllFiles();
                this.addFile(file);

            });

            this.on("success", function (file) {

                //if ($('#hid_tipo_operacion_mantenimiento').val() == "I") {
                //F_Botones_Mantenimiento_Lock();
                F_Consultar_Imagen(0);
                //}


            });
            this.on("removedfile", function (file) {
                //nuevo
                //                if ($('#hid_id_logo').val() !== "") {
                //                    F_Eliminar_Imagen($('#hid_id_logo').val(), 0);
                //                }
                var id = file.name.split('-', 2);
                var idn = id[1].toString().replace(".jpg", "");
                F_Eliminar_Temporal_Imagen(idn);
                $('#hid_id_logo').val('');

            });

            $.ajax({
                async: true,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                url: "../Digitalizacion/FileUpLoadDB.ashx?IdFile=" + str_id + "&Flag=1" + "&tipo=" + 0 + "&otro=" + Math.round(Math.random()) * 100,

                success: function (data) {
                    var obj = $.parseJSON(data);
                    //  if (obj != "") {
                    $.each(obj, function (index, item) {
                        var mockFile = {
                            name: item.T_NombreArchivo,
                            size: item.T_Tamaño
                        };
                        thisDropzone.emit("addedfile", mockFile);
                        thisDropzone.emit("thumbnail", mockFile, item.T_Preview);
                        thisDropzone.emit("sending", mockFile);
                        thisDropzone.emit("success", mockFile);
                        thisDropzone.files.push(mockFile);
                    });

                },
                error: function () {
                    alertify.log('Ha ocurrido un error interno, por favor intentelo nuevamente.');
                }
            });

            return false;
        }
    });

    $(".dz-message").remove();
    $("#mydropzone").append('<div class="dz-default dz-message-mini" ></div>');


}

function F_AbrirDropzone_Edit_JS(str_id, nameimg) {
    //    var str_id;
    //    str_id = $('#hid_id_logo_Edit').val(); if (str_id == '') str_id = '0';
    $('#mydropzone').remove();
    $('#mydropzone_Edit').remove();
    //    if (mydropzone_Edit != null) {
    //        mydropzone_Edit.removeAllFiles(true);
    //        mydropzone_Edit = null;
    //    } else {
    F_AbrirDropzone_JS();
    F_CrearDropzone_Edit_JS();
    //    }

    mydropzone_Edit = new Dropzone("#mydropzone_Edit", {
        url: "Productos.aspx",
        method: "POST",
        paramName: "file1",
        parallelUploads: 10,
        addRemoveLinks: true,
        autoProcessQueue: true,
        uploadMultiple: true,
        maxFileSize: 2,
        maxFiles: null,
        dictResponseError: "Ha ocurrido un error en el server",
        dictRemoveFile: "Remover Doc.",
        acceptedFiles: 'image/*,.jpeg,.jpg,.png,.bmp,.JPEG,.JPG,.PNG,.psd',
        previewTemplate: "<div id=\"EDITidzEDIT\" class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n <div class=\"dz-filename\"><span data-dz-name></span></div>\n <div class=\"dz-size\" data-dz-size></div>\n  <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage>Error, archivo no compatible o fuera del rango del tamaño permitido.</span></div>\n</div>",
        error: function (file, response) {
            file.previewElement.classList.add("dz-error");
        },
        init: function () {
            var thisDropzone = this;
            var isDroped = false; //Droped (file) or Downloaded (from db)  //esta variable va a diferenciar cuando entra al dz un archivo dropeado o cargado de la base de datos

            //            $('button.ui-button').click(function () {
            //                thisDropzone.removeAllFiles(true);
            //            });

            //            $('#divEdicionRegistro').unload(function () {
            //                thisDropzone.removeAllFiles(true);
            //            });

            this.on("reset", function (file) {
                thisDropzone.removeAllFiles(true);
            });

            this.on("addedfile", function (file) {
                if (this.files.length) {
                    var i, len, pre;
                    for (i = 0, len = this.files.length; i < len - 1; i++) {
                        if (this.files[i].name == file.name) {
                            alertify.log("EL LOGO : " + file.name + " YA SE ENCUENTRA REGISTRADO.");
                            return (pre = file.previewElement) != null ? pre.parentNode.removeChild(file.previewElement) : void 0;
                        }
                    }
                    isDroped = true;
                }
                return false;
            });

            this.on("maxfilesexceeded", function (file) {
                this.removeAllFiles();
                this.addFile(file);

            });

            this.on("success", function (file) {
                //if ($('#hid_tipo_operacion_mantenimiento').val() == "I") {
                //F_Botones_Mantenimiento_Lock();

                if (isDroped == true) {
                    F_Consultar_Imagen_Editar(idn)
                }
                else {
                    var id = file.name.split('-', 2);
                    var idn = id[1].toString().replace(".jpg", "");
                    $('#EDITidzEDIT').attr('id', idn);
                }

                //                F_Consultar_Imagen_Editar(idn);
                //}

                isDroped = false;
            });
            this.on("removedfile", function (file) {
                //remover en editar

                //if ($('#hid_id_logo').val() !== "") {
                //    F_Eliminar_Imagen($('#hid_id_logo').val(), 0);
                //}
                var id = file.name.split('-', 2);
                var idn = id[1].toString().replace(".jpg", "");
                F_Eliminar_Imagen(idn);
                $('#hid_id_logo_Edit').val('');
                $('#hid_id_logo_Edit2').val('');
            });

            $.ajax({
                async: true,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                url: "../Digitalizacion/FileUpLoadDB.ashx?IdFile=" + str_id + "&nameimg=" + nameimg + "&Flag=1" + "&tipo=1" + "&otro=" + Math.round(Math.random()) * 100,

                success: function (data) {
                    var obj = $.parseJSON(data);
                    //  if (obj != "") {
                    $.each(obj, function (index, item) {
                        var mockFile = {
                            name: item.T_NombreArchivo,
                            size: item.T_Tamaño
                        };
                        isDroped = false;
                        thisDropzone.emit("addedfile", mockFile);
                        thisDropzone.emit("thumbnail", mockFile, item.T_Preview);
                        thisDropzone.emit("sending", mockFile);
                        thisDropzone.emit("success", mockFile);
                        thisDropzone.files.push(mockFile);
                        var id = mockFile.name.split('-', 2); var idn = id[1].toString().replace(".jpg", "");
                        $('#EDITidzEDIT').attr('id', idn);
                    });

                },
                error: function () {
                    alertify.log('Ha ocurrido un error interno, por favor intentelo nuevamente.');
                }
            });

            return false;
        }
    });

    $(".dz-message").remove();
    $("#mydropzone_Edit").append('<div class="dz-default dz-message-mini" ></div>');
}

function F_Consultar_Imagen(str_tipoConsulta) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset= utf-8",
        url: "Productos.aspx/F_UltimaImagenTMP_JS",
        dataType: "json",
        success: function (dataObject, textStatus) {
            if (textStatus == "success") {
                var data = dataObject.d;
                var id_imagen = data.ID_Imagen;
                if (data.msg == "") {
                    $('#hid_id_logo').val(id_imagen);
                    $('#idzID').attr('id', id_imagen);
                    F_Botones_Mantenimiento_Unlock();
                } else {
                    alertify.log(data.msg);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        async: true
    });
}

function F_Consultar_Imagen_Editar(str_tipoConsulta) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset= utf-8",
        url: "Productos.aspx/F_UltimaImagenTMP_JS",
        dataType: "json",
        success: function (dataObject, textStatus) {
            if (textStatus == "success") {
                var data = dataObject.d;
                var id_imagen = data.ID_Imagen;
                if (data.msg == "") {
                    $('#hid_id_logo_Edit2').val(id_imagen);
                    $('#EDITidzEDIT').attr('id', id_imagen);
                    F_Botones_Mantenimiento_Unlock();
                } else {
                    alertify.log(data.msg);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        async: true
    });
}

function F_Consultar_Imagen_Editar2(str_tipoConsulta) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset= utf-8",
        url: "Productos.aspx/F_UltimaImagenTMP_JS",
        dataType: "json",
        success: function (dataObject, textStatus) {
            if (textStatus == "success") {
                var data = dataObject.d;
                var id_imagen = data.ID_Imagen;
                if (data.msg == "") {
                    $('#hid_id_logo_Edit2').val(id_imagen);
                    $('#EDITidzEDIT').attr('id', id_imagen);
                    F_Botones_Mantenimiento_Unlock();
                } else {
                    alertify.log(data.msg);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        async: true
    });
}

function F_Botones_Mantenimiento_Unlock() {
    //    $('#btn_man_grabar').removeAttr('disabled');
    //    $('#btn_man_cancelar').removeAttr('disabled');
}

function F_Eliminar_Temporal_Imagen(id_Imagen, str_tipoConsulta) {

    var param = {
        ID_TemporalImagen: id_Imagen
    };

    $.ajax({
        async: true,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Productos.aspx/F_Eliminar_Temporal_Imagen',
        dataType: "json",
        data: JSON.stringify({ 'objEntidad': param }),
        success: function (dataObject, textStatus) {
            if (textStatus == "success") {
                var data = dataObject.d;
                if (data.msg == "") {

                    if (str_tipoConsulta == 0) {
                        $('#hid_id_logo').val('');
                    } else {
                        $('#hid_id_QR').val('');
                    }

                } else {
                    alertify.log(data.msg);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        },
        async: false

    });
}

function F_Eliminar_Imagen(id_Imagen, str_tipoConsulta) {

    var param = {
        IdImagenProducto1: id_Imagen
    };

    $.ajax({
        async: true,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Productos.aspx/F_Eliminar_Imagen',
        dataType: "json",
        data: JSON.stringify({ 'objEntidad': param }),
        success: function (dataObject, textStatus) {
            if (textStatus == "success") {
                var data = dataObject.d;
                if (data.msg == "") {

                    if (str_tipoConsulta == 0) {
                        $('#hid_id_logo').val('');
                    } else {
                        $('#hid_id_QR').val('');
                    }

                } else {
                    alertify.log(data.msg);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        },
        async: false

    });
}

function F_ArticulosRelacionados(Fila) {

    try {
        var imgID = Fila.id;
        var hfCodAlterno = '#' + imgID.replace('imgAgregarArticulosRelacionados', 'hfCodAlterno');
        var hfDescripcionCorta = '#' + imgID.replace('imgAgregarArticulosRelacionados', 'lblProducto');

        var Cuerpo = '#MainContent_';

        $('#hfCodigoArticuloPrincipal').val($(hfCodAlterno).val());
        $('#MainContent_txtCodigoArticuloPrincipal').val($(hfCodAlterno).val());
        $(Cuerpo + 'txtArticuloPrincipal').val($(hfDescripcionCorta).text());




        F_ConsultarArticulosRelacionados($(hfCodAlterno).val());


        $("#divProductosRelacionados").dialog({
            resizable: false,
            modal: true,
            title: "Articulos Relacionados",
            title_html: true,
            height: 500,
            width: 900,
            autoOpen: false
        });

        $('#divProductosRelacionados').dialog('open');

        $('#hfCodigoArticuloRelacionado').val('');
        $('#MainContent_txtArticuloRelacionado').val('');
        $('#MainContent_txtArticuloRelacionado').focus();

    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function F_ConsultarArticulosRelacionados(CodAlterno) {

    var objParams = {
        CodAlternoPrincipal: CodAlterno
    };

    var EstructuraTabla = '<table class="GridView">' +
                          '     <tr> ' +
                          '         <th width="5"></th>  <th>Codigo</th> ' +
                          '         <th>Codigo 2</th> <th>Producto</th>   <th>Ray</th> ' +
                          '         <th>pri</th>    <th>cho</th>        <th>5P</th>  ' +
                          '         <th>c3</th>     <th>lu1</th>        <th>lu2</th> ' +
                          '         <th>um</th>     <th>precio</th>     <th>moneda</th> ' +
                          '     </tr> ' +
                          '     @Cuerpo ' +
                          ' </table> ';
    var CuerpoTabla = '';
    var fmtoCuerpo = '';

    $.ajax({
        async: true,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Productos.aspx/F_LGProductosRelaciones_Listar_NET',
        dataType: "json",
        data: JSON.stringify({ 'CodAlterno': objParams }),
        success: function (dbObject) {
            MostrarEspera(true);
            var data = dbObject.d;
            try {
                $.each(data.rows, function (index, item) {
                    fmtoCuerpo = '     <tr> ' +
                                 '         <td> <input type="image" ID="' + item.CodAlterno + '"  src="../Asset/images/EliminarBtn.png" alt="Eliminar" width="10" height="10" onclick="F_EliminarArticuloRelacionado(this); return false;">  </td>  <td>' + item.CodigoProducto + '</td>' +
                                 '         <td>' + item.CodigoAlternativo + '</td> <td>' + item.DscProducto + '</td> <td>' + item.Stock + '</td> ' +
                                 '         <td>' + item.Principal + '</td> <td>' + item.Chorrillos + '</td> <td>' + item.QTOPISO + '</td> ' +
                                 '         <td>' + item.CUADRA3 + '</td> <td>' + item.LURIN1 + '</td> <td>' + item.LURIN2 + '</td> ' +
                                 '         <td>' + item.UM + '</td> <td>' + item.Precio1.toFixed(2) + '</td> <td>' + item.Observacion + '</td> ' +
                                 '     </tr> ';
                    /// <reference path="" />

                    // <button type="button" ID="' + item.CodAlterno + '" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="F_EliminarArticuloRelacionado(this); return false;">X</button>

                    CuerpoTabla = CuerpoTabla + fmtoCuerpo;
                });

                EstructuraTabla = EstructuraTabla.replace('@Cuerpo', CuerpoTabla);
                var lu = $('#divProductosRelacionadosListado'); lu.empty();
                lu.append(EstructuraTabla)

            }
            catch (x) { alertify.log('El Producto no tiene Imagenes'); }
            MostrarEspera(false);
        },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        async: true
    });

}

function F_AgregarArticulosRelacionados() {
    var CodAlternoPrincipal = $('#hfCodigoArticuloPrincipal').val();
    var CodAlternoRelacionado = $('#hfCodigoArticuloRelacionado').val();

    if (CodAlternoPrincipal.trim() == '' || CodAlternoRelacionado.trim() == '') {
        alertify.log('Debe de seleccionar tanto un artículo principal como el artículo relacionado');
        return;
    }

    var objParams = {
        Filtro_CodAlternoPrincipal: CodAlternoPrincipal,
        Filtro_CodAlternoRelacionado: CodAlternoRelacionado
    };

    var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
    MostrarEspera(true);

    F_LGProductosRelaciones_Insert_NET(arg, function (result) {

        var str_resultado_operacion = "";
        var str_mensaje_operacion = "";

        str_resultado_operacion = result.split('~')[0];
        str_mensaje_operacion = result.split('~')[1];

        F_ConsultarArticulosRelacionados(CodAlternoPrincipal);

        alertify.log(str_mensaje_operacion);

        $('#hfCodigoArticuloRelacionado').val('');
        $('#MainContent_txtArticuloRelacionado').val('');
        $('#MainContent_txtArticuloRelacionado').focus();

        MostrarEspera(false);

        return false;

    });


}

function F_EliminarArticuloRelacionado(Fila) {
    var CodAlternoPrincipal = $('#hfCodigoArticuloPrincipal').val();
    var CodAlternoRelacionado = Fila.id;

    if (confirm("ESTA SEGURO DE ELIMINAR LA RELACION DEL PRODUCTO")) {
        var objParams = {
            Filtro_CodAlternoPrincipal: CodAlternoPrincipal,
            Filtro_CodAlternoRelacionado: CodAlternoRelacionado
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_LGProductosRelaciones_Eliminar_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            F_ConsultarArticulosRelacionados(CodAlternoPrincipal);

            alertify.log(str_mensaje_operacion);

            $('#hfCodigoArticuloRelacionado').val('');
            $('#MainContent_txtArticuloRelacionado').val('');
            $('#MainContent_txtArticuloRelacionado').focus();

            MostrarEspera(false);

            return false;

        });





    }

}

function F_ValidaMonto(ControlId) {

    ControlId = '#' + ControlId;

    if ($(ControlId).val() == '')
        return false;

    if (isNaN($(ControlId).val())) {
        $(ControlId).val('');
        $(ControlId).select();
        return false;
    }

    $(ControlId).val(parseFloat($(ControlId).val()).toFixed(2));


    if ($("#MainContent_txtTC").val() == '') {
        alertify.log('DEBE ESPECIFICAR TIPO DE CAMPO');
        return false;
    }

    if (Number($("#MainContent_txtTC").val()) === 0) {
        alertify.log('DEBE ESPECIFICAR TIPO DE CAMPO');
        return false;
    }

    return true;
}

var Ctlgv;
var Hfgv;

function imgMas_Click_antigua(Control) {
    Ctlgv = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {

        var grid = $(Control).next();
        F_LlenarGridDetalle(grid.attr('id'));
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }

    return false;
}

function F_LlenarGridDetalle_antigua(Fila) {
    try {
        var nmrow = 'MainContent_grvConsulta_pnlOrders_0';
        var Col = Fila.split('_')[3];
        var Codigo = $('#' + Fila.replace('pnlOrders', 'hfCodProductoAzure')).val();
        var grvNombre = 'MainContent_grvConsulta_grvDetalle_' + Col;
        Hfgv = '#' + Fila.replace('pnlOrders', 'hfDetalleCargado');

        if ($(Hfgv).val() === "1") {
            $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
            $(Ctlgv).attr('src', '../Asset/images/minus.gif');
        }
        else {
            {
                var objParams =
                        {
                            Filtro_Col: Col,
                            Filtro_Codigo: Codigo,
                            Filtro_CodTipoDoc: 0,
                            Filtro_grvNombre: grvNombre
                        };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                $(Ctlgv).attr('src', '../Asset/images/loading.gif');
                F_LlenarGridDetalle_NET(arg, function (result) {
                    $(Ctlgv).attr('src', '../Asset/images/minus.gif');

                    var str_resultado_operacion = result.split('~')[0];
                    var str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion === "0") {
                        var p = $('#' + result.split('~')[3]).parent();
                        $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                        F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                        $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
                        $(Hfgv).val('1');
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























function F_ValidarGrabarDetalle() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtModeloDetalle').val() == '' | $('#hfCodModeloDetalle').val() == 0)
            Cadena = Cadena + '<p></p>' + 'Modelo';

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

function F_GrabarDetalle() {
    try {
        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_CodProducto: $('#hfCodProducto').val(),
            Filtro_CodModeloVehiculo: $('#hfCodModeloDetalle').val(),
            Filtro_Anio: $(Contenedor + 'txtAñoDetalle').val(),
            Filtro_Motor: $(Contenedor + 'txtMotorDetalle').val(),
            Filtro_Transmision: $(Contenedor + 'txtTransmision').val(),
            Filtro_CajaCambio: $(Contenedor + 'txtCajaCambio').val(),
            Filtro_Filtro: $(Contenedor + 'txtFiltro').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_GrabarDetalle_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'SE GRABO CORRECTAMENTE') {
                    $('#hfCodModeloDetalle').val(0);
                    $(Contenedor + 'txtAñoDetalle').val('');
                    $(Contenedor + 'txtMotorDetalle').val('');
                    $(Contenedor + 'txtModeloDetalle').val('');
                    $(Contenedor + 'txtTransmision').val('');
                    $(Contenedor + 'txtCajaCambio').val('');
                    $(Contenedor + 'txtFiltro').val('');
                    F_Buscar_Detalle($('#hfCodProducto').val());
                    alertify.log('Se Grabo Correctamente.');
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

function F_ActualizarDetalle() {
    try {
        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_CodProducto: $('#hfCodProducto').val(),
            Filtro_CodModeloVehiculo: $('#hfCodModeloDetalle').val(),
            Filtro_Anio: $(Contenedor + 'txtAñoDetalle').val(),
            Filtro_Motor: $(Contenedor + 'txtMotorDetalle').val(),
            Filtro_Transmision: $(Contenedor + 'txtTransmisionEdicion').val(),
            Filtro_CajaCambio: $(Contenedor + 'txtCajaCambioEdicion').val(),
            Filtro_Filtro: $(Contenedor + 'txtFiltroEdicion').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ActualizarDetalle_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se Grabo Correctamente.') {
                    F_Buscar_Detalle();
                    alertify.log('Se Grabo Correctamente.');
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

function F_Buscar_Detalle(CodProducto) {
    try {
        var objParams = {
            Filtro_CodProducto: CodProducto
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_Buscar_Detalle_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_ProductoDetalle', result.split('~')[2]);
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

function F_DetalleProducto(Fila) {
    var imgID = Fila.id;
    var Contenedor = '#MainContent_';
    var lblCodigo = '#' + imgID.replace('imgDetalleProducto', 'lblcodigo');
    var lblCodigoProducto = '#' + imgID.replace('imgDetalleProducto', 'lblCodigoProducto');
    var lblProducto = '#' + imgID.replace('imgDetalleProducto', 'lblProducto');
    $('#hfCodProducto').val($(lblCodigo).val());
    $(Contenedor + 'txtProductoDetalle').val($(lblProducto).text());
    $(Contenedor + 'txtModeloDetalle').val('');
    $(Contenedor + 'txtAñoDetalle').val('');
    $(Contenedor + 'txtMotorDetalle').val('');
    $(Contenedor + 'txtCajaCambio').val('');
    $(Contenedor + 'txtTransmision').val('');
    $(Contenedor + 'txtFiltro').val('');
    $('#hfCodModeloDetalle').val(0);
    $('#div_DetalleProducto').dialog({
        resizable: false,
        modal: true,
        title: "DETALLE PRODUCTO",
        title_html: true,
        height: 500,
        width: 890,
        autoOpen: false
    });
    $('#div_DetalleProducto').dialog('open');
    F_Buscar_Detalle($(lblCodigo).val());
    return false;
}

function F_EliminarDetalleProducto(Fila) {
    try {
        var imgID = Fila.id;
        var hfCodProductoModelo = '#' + imgID.replace('imgAnularDocumento', 'hfCodProductoModelo');

        if (!confirm("ESTA SEGURO DE ELIMINAR EL DETALLE"))
            return false;

        var objParams = {
            Filtro_CodProductoModelo: $(hfCodProductoModelo).val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Eliminar_Detalle_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                F_Buscar_Detalle($('#hfCodProducto').val())
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

function F_EditarDetalleProducto(Fila) {
    try {
        var imgID = Fila.id;
        var lblLinea = '#' + imgID.replace('imgEditarRegistro', 'lblLinea');
        var hfCodProductoModelo = '#' + imgID.replace('imgEditarRegistro', 'hfCodProductoModelo');
        var hfCodModelo = '#' + imgID.replace('imgEditarRegistro', 'hfCodModelo');
        var lblModelo = '#' + imgID.replace('imgEditarRegistro', 'lblModelo');
        var lblAño = '#' + imgID.replace('imgEditarRegistro', 'lblAño');
        var lblMotor = '#' + imgID.replace('imgEditarRegistro', 'lblMotor');
        var lblCajaCambio = '#' + imgID.replace('imgEditarRegistro', 'lblCajaCambio');
        var lblTransmision = '#' + imgID.replace('imgEditarRegistro', 'lblTransmision');
        var lblFiltro = '#' + imgID.replace('imgEditarRegistro', 'lblFiltro');
        var Cuerpo = '#MainContent_';

        $(Cuerpo + 'txtProductoDetalleEdicion').val($(Cuerpo + 'txtProductoDetalle').val());
        $(Cuerpo + 'txtModeloDetalleEdicion').val($(lblLinea).text() + ' - ' + $(lblModelo).text());
        $(Cuerpo + 'txtAñoDetalleEdicion').val($(lblAño).text());
        $(Cuerpo + 'txtMotorDetalleEdicion').val($(lblMotor).text());
        $(Cuerpo + 'txtCajaCambioEdicion').val($(lblCajaCambio).text());
        $(Cuerpo + 'txtTransmisionEdicion').val($(lblTransmision).text());
        $(Cuerpo + 'txtFiltroEdicion').val($(lblFiltro).text());
        $('#hfCodModeloDetalleEdicion').val($(hfCodModelo).val());
        $('#hfCodProductoModelo').val($(hfCodProductoModelo).val());

        $("#div_DetalleProductoEditar").dialog({
            resizable: false,
            modal: true,
            title: "Edicion Detalle Producto",
            title_html: true,
            height: 250,
            width: 500,
            autoOpen: false
        });

        $('#div_DetalleProductoEditar').dialog('open');
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_EdicionDetalleRegistro() {
    try {
        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_CodProductoModelo: $('#hfCodProductoModelo').val(),
            Filtro_CodProducto: $('#hfCodProducto').val(),
            Filtro_CodModeloVehiculo: $('#hfCodModeloDetalleEdicion').val(),
            Filtro_Anio: $(Contenedor + 'txtAñoDetalleEdicion').val(),
            Filtro_Motor: $(Contenedor + 'txtMotorDetalleEdicion').val(),
            Filtro_Transmision: $(Contenedor + 'txtTransmisionEdicion').val(),
            Filtro_CajaCambio: $(Contenedor + 'txtCajaCambioEdicion').val(),
            Filtro_Filtro: $(Contenedor + 'txtFiltroEdicion').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ActualizarDetalle_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'SE ACTUALIZO CORRECTAMENTE') {
                    alertify.log('Se Actualizo Correctamente.');
                    $('#hfCodModeloDetalleEdicion').val(0);
                    $(Contenedor + 'txtAñoDetalleEdicion').val('');
                    $(Contenedor + 'txtMotorDetalleEdicion').val('');
                    $(Contenedor + 'txtModeloDetalleEdicion').val('');
                    $(Contenedor + 'txtFiltroEdicion').val('');
                    $(Contenedor + 'txtCajaCambioEdicion').val('');
                    $(Contenedor + 'txtTransmisionEdicion').val('');
                    $('#div_DetalleProductoEditar').dialog('close');
                    F_Buscar_Detalle($('#hfCodProducto').val());
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

function F_ValidarGrabarDetalleEdicion() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtModeloDetalleEdicion').val() == '' | $('#hfCodModeloDetalleEdicion').val() == 0)
            Cadena = Cadena + '<p></p>' + 'Modelo';

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

var Ctlgv;
var Hfgv;

function imgMas_Click(Control) {
    Ctlgv = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {

        var grid = $(Control).next();
        F_LlenarGridDetalle(grid.attr('id'));
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }

    return false;
}

function F_LlenarGridDetalle(Fila) {
    try {

        var nmrow = 'MainContent_grvConsulta_pnlOrders_0';
        var Col = Fila.split('_')[3];
        var Codigo = $('#' + Fila.replace('pnlOrders', 'lblcodigo')).val();
        var grvNombre = 'MainContent_grvConsulta_grvDetalle_' + Col;
        Hfgv = '#' + Fila.replace('pnlOrders', 'hfDetalleCargado');

        if ($(Hfgv).val() === "1") {
            $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
            $(Ctlgv).attr('src', '../Asset/images/minus.gif');
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
                $(Ctlgv).attr('src', '../Asset/images/loading.gif');
                F_LlenarGridDetalle_NET(arg, function (result) {

                    $(Ctlgv).attr('src', '../Asset/images/minus.gif');
                    //MostrarEspera(false);

                    var str_resultado_operacion = result.split('~')[0];
                    var str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion === "0") {
                        var p = $('#' + result.split('~')[3]).parent();
                        $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                        F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                        $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
                        $(Hfgv).val('1');
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