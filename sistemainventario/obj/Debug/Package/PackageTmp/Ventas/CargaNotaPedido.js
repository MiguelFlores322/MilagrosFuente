var AppSession = "../Ventas/RegistroFactura.aspx";


$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#divTabs').tabs();

    $("#MainContent_btnCargar").click(function (evt) {
        if (!F_SesionRedireccionar(AppSession)) return false;
        F_GrabarDocumentoTemporal();
        return false;
    });

    F_InicializarForm();

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

 //   $('#divSeleccionarEmpresa').dialog('open');

//    $('#MainContent_txtEmpresa').css('background', '#FFFFE0');

//    $("#divEdicionRegistro").dialog({
//        resizable: false,
//        modal: true,
//        title: "Creacion de Productos",
//        title_html: true,
//        height: 240,
//        width: 670,
//        autoOpen: false
//    });

    $('#MainContent_txtCodigoSuperiorEdicion').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_LGProductos_Select',
                data: "{'Descripcion':'" + request.term + "','CodAlmacen':'" + $('#MainContent_hdnCodSede').val() + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            CodProducto: item.split(',')[5]
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
            $('#MainContent_hfCodigoSuperiorEdicion').val(i.item.CodProducto);
        },
        minLength: 3
    });

    $("#MainContent_chkNotaVenta").click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        if ($(this).is(':checked')) {
            $("#MainContent_txtIgv").prop('readonly', false);
        }
        else {
            $("#MainContent_txtIgv").prop('readonly', true);
            $("#MainContent_txtIgv").val('');
        }
    });

    $("#MainContent_txtCodigoProductoEdicion").css('background', '#FFFFE0');
    $("#MainContent_txtCodigo2Edicion").css('background', '#FFFFE0');
    $("#MainContent_txtDescripcionEdicion").css('background', '#FFFFE0');
    $("#MainContent_txtCostoEdicion").css('background', '#FFFFE0');
    $("#MainContent_txtPrecioEdicion").css('background', '#FFFFE0');
    $("#MainContent_txtCodigoSuperiorEdicion").css('background', '#FFFFE0');
    $("#MainContent_txtIgv").css('background', '#FFFFE0');
    $("#MainContent_txtPeso").css('background', '#FFFFE0');
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

function F_InicializarForm() {
    try {
        var objParams = {
            Filtro_CodSerie: $('#MainContent_ddlSerie').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);

        F_InicializarGrilla_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[2]);
                F_Update_Division_HTML('div_FamiliaEdicion', result.split('~')[3]);
                F_Update_Division_HTML('div_CompraEdicion', result.split('~')[4]);
                F_Update_Division_HTML('div_MonedaEdicion', result.split('~')[5]);
                F_Update_Division_HTML('div_ddlvendedor', result.split('~')[6]);
                F_Update_Division_HTML('div_Peso', result.split('~')[7]);
                $("#MainContent_txtIgv").prop('readonly', true);
                $("#MainContent_ddlPeso").val(10);
                $("#MainContent_ddlFamiliaEdicion").css('background', '#FFFFE0');
                $("#MainContent_ddlMonedaEdicion").css('background', '#FFFFE0');
                $("#MainContent_ddlCompraEdicion").css('background', '#FFFFE0');
                $("#MainContent_ddlVendedorPreparado").css('background', '#FFFFE0');
                $("#MainContent_ddlPeso").css('background', '#FFFFE0');

                if ($('#MainContent_txtEmpresa').val() != '')
                    F_ElegirEmpresa2();
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

function F_GrabarDocumentoTemporal() {
    if (!F_SesionRedireccionar(AppSession)) return false;
    //Principal
    try {

        if ($("#MainContent_fupExcel").val() == "") {
            alertify.log("Elija un archivo.");
            return false;
        }
//        return false;
        var fileUpload = $("#MainContent_fupExcel").get(0);
        var files = fileUpload.files;

        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            data.append(files[i].name, files[i]);
        }

        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_CodEmpresa: $(Contenedor + 'hdnCodEmpresa').val(),
            Filtro_CodVendedor: $(Contenedor + 'ddlVendedorPreparado').val(),
            Filtro_CodSede: $(Contenedor + 'hdnCodSede').val(),
            Filtro_NotaVenta: 0,
            Filtro_Igv: '0'
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_GrabarTemporal_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                var options = "";

                $.ajax(
                    {
                        url : "../Servicios/CargaArchivo.ashx",
                        type : "POST",
                        data : data,
                        contentType : false,
                        processData : false,
                        success : function (result2) { 
                            str_resultado_operacion = result2.split('~')[0];
                            str_mensaje_operacion = result2.split('~')[1];
                            alertify.log(str_mensaje_operacion);
                        },
                        error : function (err) { 
                            alertify.log(err.statusText); 
                        },
                        async : false
                    }
                );

                if (str_resultado_operacion == "1") {
                        var objParams2 = {
                                            Filtro_CodEmpresa: $(Contenedor + 'hdnCodEmpresa').val()
                                        };

                        var arg2 = Sys.Serialization.JavaScriptSerializer.serialize(objParams2);
                        F_ListarFaltantes_NET(arg2, function (result3) {
                            str_resultado_operacion = result3.split('~')[0];
                            str_mensaje_operacion = result3.split('~')[1];
                            if (str_resultado_operacion == "1") {
                                alertify.log('Debe revisar los siguientes articulos.');
                                $(Contenedor + 'grvDetalleArticulo').remove();
                                F_Update_Division_HTML('div_grvDetalleArticulo', result3.split('~')[2]);
                            }
                             
                        });
                }

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

function numerar() {
    var c = 1;
    $('.numero').each(function () {
        $(this).text(c.toString());
        c++;
    });
}

function F_ElegirEmpresa(Fila) {
    MostrarEspera(true);

    var imgID = Fila.id;
    var lblCodDetalle = '#' + imgID.replace('imgSelecEmpresa', 'hfCodEmpresa');
    var lblNombre = '#' + imgID.replace('imgSelecEmpresa', 'lblRazonSocial');
    var ddlSede = '#' + imgID.replace('imgSelecEmpresa', 'ddlSede');

    var Cuerpo = '#MainContent_';

    $(Cuerpo + 'txtEmpresa').val($(lblNombre).text());

    $('#divSeleccionarEmpresa').dialog('close');

    var codEmp = $(lblCodDetalle).val();
    $(Cuerpo + 'hdnCodEmpresa').val(codEmp);

    var codSed = $(ddlSede).val();
    $(Cuerpo + 'hdnCodSede').val(codSed);

    MostrarEspera(false);
}

function F_ElegirEmpresa2() {
    MostrarEspera(true);

    var Cuerpo = '#MainContent_';

    MostrarEspera(false);
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

function F_EditarRegistro(Fila) {
    if (!F_SesionRedireccionar(AppSession)) return false;
    try {
        var imgID = Fila.id;
        var lblCodigoProducto_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblCodigo');
        var lblProducto_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblDescripcion');
        var lblCosto_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblCosto');
        var lblPrecio = '#' + imgID.replace('imgEditarRegistro', 'lblPrecio');
        var lblUnidad = '#' + imgID.replace('imgEditarRegistro', 'lblUnd');

        if ($(lblCodigoProducto_grilla).text() == 'INVALIDO DOC')
            return false;
        var Cuerpo = '#MainContent_';

        $(Cuerpo + 'txtCodigoProductoEdicion').val($(lblCodigoProducto_grilla).text());
        $(Cuerpo + 'txtCodigo2Edicion').val('');
        $(Cuerpo + 'txtDescripcionEdicion').val($(lblProducto_grilla).text());
        $(Cuerpo + 'txtPrecioEdicion').val($(lblPrecio).text());
        $(Cuerpo + 'txtCostoEdicion').val('');
        $(Cuerpo + 'ddlCompraEdicion').val($(Cuerpo + 'ddlCompraEdicion option:contains("' + $(lblUnidad).text() + '")').val());
        $(Cuerpo + 'ddlMonedaEdicion').val('2');
        $(Cuerpo + 'txtCodigoSuperiorEdicion').val('');
        $(Cuerpo + 'hdnIdRegistro').val(imgID);
        $(Cuerpo + 'hfCodigoSuperiorEdicion').val('');

        $("#divEdicionRegistro").dialog({
            resizable: false,
            modal: true,
            title: "REGISTRO DE PRODUCTOS",
            title_html: true,
            height: 280,
            width: 720,
            autoOpen: false
        });

        $('#divEdicionRegistro').dialog('open');
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_GrabarProducto() {
    if (!F_SesionRedireccionar(AppSession)) return false;
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtCodigoEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Codigo';

        if ($(Cuerpo + 'txtDescripcionEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descripcion';

        if ($(Cuerpo + 'txtTCEdicion').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtFactorEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Factor';

        if ($(Cuerpo + 'ddlCompraEdicion').val() == "0")
            Cadena = Cadena + '<p></p>' + 'Unidad Medida';

        if (($(Cuerpo + 'ddlCompraEdicion').val() != $(Cuerpo + 'ddlVentaEdicion').val()) && ($(Cuerpo + 'txtFactorEdicion').val() == '1' | $(Cuerpo + 'txtFactorEdicion').val() == '1.00'))
            Cadena = Cadena + '<p></p>' + 'El Factor no puede ser 1.';

        if ($(Cuerpo + 'txtCostoEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Costo';

        if ($(Cuerpo + 'txtPrecioEdicion').val() == '' || $(Cuerpo + 'txtPrecioEdicion').val() == '0.00')
            Cadena = Cadena + '<p></p>' + 'Precio Lista';

        if ($(Cuerpo + 'txtPeso').val() == '')
            Cadena = Cadena + '<p></p>' + 'Peso';

        if (Cadena != 'Ingresar los sgtes. Datos:') {
            alertify.log(Cadena);
            return false;
        }

        if ($.trim($(Cuerpo + 'txtCodigoSuperiorEdicion').val()) == '')
            $(Cuerpo + 'hfCodigoSuperiorEdicion').val('0');

        var objParams = {
                Filtro_CodigoProducto     : $(Cuerpo + 'txtCodigoProductoEdicion').val(),
                Filtro_CodFamiliaEdicion  : $(Cuerpo + 'ddlFamiliaEdicion').val(),
                Filtro_DscProductoEdicion : $(Cuerpo + 'txtDescripcionEdicion').val(),
                Filtro_CodTipoProducto    : '2',
                Filtro_CodUnidadCompra    : $(Cuerpo + 'ddlCompraEdicion').val(),
                Filtro_CodUnidadVenta     : $(Cuerpo + 'ddlCompraEdicion').val(),
                Filtro_Costo              : $(Cuerpo + 'txtCostoEdicion').val(),
                Filtro_Precio             : $(Cuerpo + 'txtPrecioEdicion').val(),
                Filtro_CodMoneda          : $(Cuerpo + 'ddlMonedaEdicion').val(),
                Filtro_CodFamilia         : '0',
                Filtro_Factor             : 1,
                Filtro_CodigoSuperior     : $(Cuerpo + 'hfCodigoSuperiorEdicion').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_GrabarProducto_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1" && str_mensaje_operacion == 'Se Grabo Correctamente.') {
                var idimg = '#' + $('#MainContent_hdnIdRegistro').val();
                var filax = $(idimg).parent().parent();
                $(filax).remove();
                $('#divEdicionRegistro').dialog('close');
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