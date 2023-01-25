var AppSession = "../Maestros/PrevioListaPreciosMilagros.aspx";


$(document).ready(function () {

    

    

//    F_Controles_Inicializar();

    $('#MainContent_btnImport').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            imgMas_Click();
            return false;
        }

        catch (e) {

            alertify.log("ERROR DETECTADO: " + e);
        }

    });
   
    
});

//function F_Controles_Inicializar(){

//    var arg;

//    try {
//        var objParams =
//            {
//                Filtro_Fecha: $('#MainContent_txtEmision').val(),
//                Filtro_CodSerie: 66

//            };


//        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
//        MostrarEspera(true);
//        F_Controles_Inicializar_NET
//            (
//                arg,
//                function (result) {

//                    var str_resultado_operacion = "";
//                    var str_mensaje_operacion = "";

//                    str_resultado_operacion = result.split('~')[0];
//                    str_mensaje_operacion = result.split('~')[1];
//                    MostrarEspera(false);
//                    if (str_resultado_operacion == "1") {
//                        F_Update_Division_HTML('div_formapago', result.split('~')[4]);
//                        F_Update_Division_HTML('div_moneda', result.split('~')[5]);
//                        $('#MainContent_txtTC').val(result.split('~')[6]);
//                        $('#MainContent_ddlSerieConsulta').val(61);
//                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[2]);
//                        F_Update_Division_HTML('div_igv', result.split('~')[8]);
//                        F_Update_Division_HTML('div_tipodocumento', result.split('~')[9]);
//                        F_Update_Division_HTML('div_clasificacion', result.split('~')[10]);
//                        //F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[11]);
//                        $('#MainContent_ddlMoneda').val(2);
//                        $('#MainContent_ddlFormaPago').val(1);
//                        $('#MainContent_ddlTipoDocumento').val(1);
//                        $('#MainContent_ddlClasificacion').val(2);
//                        $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
//                        $("#MainContent_txtPeriodo").val($('#MainContent_txtFechaIngreso').val().substr($('#MainContent_txtFechaIngreso').val().length - 4) + $('#MainContent_txtFechaIngreso').val().substring(3, 5));
//                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
//                        $('#MainContent_ddlFormaPago').css('background', '#FFFFE0');
//                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
//                        $('#MainContent_txtTC').css('background', '#FFFFE0');
//                        $('#MainContent_txtGastosOperativos').css('background', '#FFFFE0');
//                        $('#MainContent_ddlClasificacion').css('background', '#FFFFE0');
//                        $('#MainContent_ddlTipoDocumento').css('background', '#FFFFE0');
//                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
//                        $('#MainContent_chKConIgv').prop('disabled', true);
//                        $('#MainContent_chkSinIgv').prop('disabled', true);
//                        $('#hfNotaPedido').val('0');
//                        $('#hfCodCtaCteNP').val('0');
//                        $('.ccsestilo').css('background', '#FFFFE0');

//                        $('#divSeleccionarEmpresa').dialog('open');
//                    }
//                    else {

//                        alertify.log(str_mensaje_operacion);

//                    }


//                }
//            );

//    } catch (mierror) {
//        MostrarEspera(false);
//        alertify.log("ERROR DETECTADO: " + mierror);

//    }

//}

function getContentTab() {
    $('#MainContent_txtDesde').val(Date_AddDays($('#MainContent_txtHasta').val(), -7));
    $('#MainContent_chkRango').prop('checked', true);
    //    F_Buscar();
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

function getContentTab() {
    $('#MainContent_txtDesde').val(Date_AddDays($('#MainContent_txtHasta').val(), -7));
    $('#MainContent_chkRango').prop('checked', true);
    F_Buscar();
    return false;
}

var lblCodMarcaGv = 0;
function F_AnularRegistro(Fila) {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Eliminar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
    try {
        var imgID = Fila.id;
        lblCodMarcaGv = '#' + imgID.replace('imgAnularDocumento', 'hfCodigo');
        var lblEstado = '#' + imgID.replace('imgAnularDocumento', 'lblEstado');
        var lblnumero_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblnumero');
        var lblcliente_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblcliente');

        //ESTO NO ES FUNCIONAL PORQUE HASTA AHORA LA ANULACION NO GUARDA EN PAGOS.... 
        //ASÍ QUE PARA QUE VALIDAR PAGOS SI NO REGISTRA.......
        //        if ($(lblEstado).text() == "CANCELADO TOTAL") {
        //            alertify.log("ESTE FACTURA SE ENCUENTRA CANCELADO TOTAL; PRIMERO ELIMINE EL PAGO Y LUEGO ELIMINE LA FACTURA");
        //            return false;
        //        }

        //        if ($(lblEstado).text() == "CANCELADO PARCIAL") {
        //            alertify.log("ESTE FACTURA SE ENCUENTRA CANCELADO PARCIAL; PRIMERO ELIMINE EL PAGO Y LUEGO ELIMINE LA FACTURA");
        //            return false;
        //        }

        if (!confirm("ESTA SEGURO DE ELIMINAR LA FACTURA : " + $(lblnumero_grilla).text() + "\nDEL PROVEEDOR : " + $(lblcliente_grilla).text()))
            return false;

        lblCodMarcaGv = $(lblCodMarcaGv).val();

        $('#divEliminar').dialog('open');
        return true;


    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + e);
        return false;
    }


}

var Ctlgv;
var Hfgv;
function imgMas_Click() {
    
      var grid = $(Control).next();
        F_LlenarGridDetalle(grid.attr('id'));
        
        
    return false;
}

function F_LlenarGridDetalle(Fila) {
    try {
        var nmrow = 'MainContent_grvConsulta_0';
        var Col = Fila.split('_')[3];
        var Codigo = $('#' + Fila.replace( 'hfCodigo')).val();
        var grvNuevo = 'MainContent_grvConsulta_grvNuevo_' + Col;
        var grvEliminar = 'MainContent_grvConsulta_grvEliminar_' + Col;
        Nuevo = '#' + Fila.replace('hfDetalleCargadoN');
        Eliminado = '#' + Fila.replace( 'hfDetalleCargadoE');

        if ($(Nuevo).val() === "1" || $(Eliminado).val() === "1") {
            $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
        }
        else {
            {
                var objParams =
                        {
                            Filtro_Col: Col,
                            Filtro_Codigo: Codigo,
                            Filtro_CodTipoDoc: 0,
                            Filtro_grvNuevo: grvNuevo,
                            Filtro_grvEliminar: grvEliminar
                        };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_LlenarGridDetalle_NET(arg, function (result) {

                    MostrarEspera(false);

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


function F_ExportarExcel2(Fila) {
    try {
        var imgID = Fila.id;
        lblCodMarcaGv = '#' + imgID.replace('imgExportarExcel', 'hfCodigo');
        var lblEstado = '#' + imgID.replace('imgExportarExcel', 'lblEstado');
        var lblnumero_grilla = '#' + imgID.replace('imgExportarExcel', 'lblnumero');
        var lblcliente_grilla = '#' + imgID.replace('imgExportarExcel', 'lblcliente');

        var rptURL = '';
        rptURL = '../Reportes/Web_Pagina_ConstruirExcel.aspx';
        var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
        var TipoArchivo = 'application/pdf';
        var CodTipoArchivo = '5';
        var CodMenu = '9';

        rptURL = rptURL + '?';
        rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
        rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
        rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
        rptURL = rptURL + 'Codigo=' + $(lblCodMarcaGv).val() + '&';

        window.open(rptURL, "PopUpRpt", Params);

        return false;
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + e);
        return false;
    }
}

function F_ExportarExcel(Fila) {

    var arg;

    var imgID = Fila.id;    
    var Codigo = '#' + imgID.replace('imgExportarExcel', 'hfCodigo');

    try {
        var objParams =
            {
                Filtro_Codigo: $(Codigo).val()
            };


        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        F_ExportarDetalle_NET
            (
                arg,
                function (result) {


                }
            );

    } catch (mierror) {
        MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + mierror);

    }

}
