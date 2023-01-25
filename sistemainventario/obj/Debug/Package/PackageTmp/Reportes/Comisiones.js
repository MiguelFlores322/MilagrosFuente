$(document).ready(function () {
    if (!F_SesionRedireccionar('')) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#divTabs').tabs();

    $('#MainContent_btnGenerar').click(function () {
        try {
            F_Generar()
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
        return false;
    });

    $('#MainContent_btnBuscar').click(function () {
        try {
            F_Buscar()
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
        return false;
    });

    $('#MainContent_btnExcel').click(function () {
        try {
            if ($('#hfCodComisionCab').val() == '0') {
                alertify.log("GENERE UNA OPERACION DE COMISION");
                return false;
            }
            F_Excel($('#hfCodComisionCab').val());
            return false;
        }
        catch (e) {

            alertify.log("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnCerrar').click(function () {
        F_Cerrar();
        return false;
    });

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHastaConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtDesdeConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtFechaCierre').css('background', '#FFFFE0');

    F_Controles_Inicializar();
});

$().ready(function () {

    $(document).everyTime(900000, function () {

        $.ajax({
            type: "POST",
            url: '../Ventas/RegistroFactura.aspx/KeepActiveSession',
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

    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());

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

$(document).on("change", "select[id $= 'MainContent_ddlRuta']", function () {
    F_Vendedor($("#MainContent_ddlRuta").val());
});

function VerifySessionState(result) { }

function F_Excel(CodComisionCab) {
    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodMenu = 3;

    rptURL = '../Reportes/ConstruirExcel.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodComisionCab=' + CodComisionCab + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_Controles_Inicializar() {
    var arg;

    try {
        var objParams =
            {
                Filtro_CodRuta: 0
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
                        F_Update_Division_HTML('div_Empresa', result.split('~')[2]);
                        F_Update_Division_HTML('div_TipoDoc', result.split('~')[3]);
                        F_Update_Division_HTML('div_Vendedor', result.split('~')[4]);
                        F_Update_Division_HTML('div_VendedorConsulta', result.split('~')[5]);
                        $('#MainContent_ddlEmpresa').val(0);
                        $('#MainContent_ddlTipoDoc').val(1);
                        $('#MainContent_ddlVendedor').val(1);
                        $('#MainContent_ddlVendedorConsulta').val(0);
                        $('#MainContent_ddlVendedor').css('background', '#FFFFE0');
                        $('#MainContent_ddlVendedorConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresa').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoDoc').css('background', '#FFFFE0');
                        $("#MainContent_chkGuia").prop("checked", true);
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

function F_Generar() {
    try {
        var objParams = {
            Filtro_CodEmpresa: $("#MainContent_ddlEmpresa").val(),
            Filtro_CodTipoDoc: '0', 
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            Filtro_CodVendedor: $('#MainContent_ddlVendedor').val(),
            Filtro_EstadoDoc: ''            
        };
  
        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_Generar_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                $('#hfCodComisionCab').val(result.split('~')[3]);
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

function F_Buscar() {
        var chkFecha = '0';

        if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = '1';

    try {
        var objParams = {
            Filtro_ChkFecha: chkFecha,
            Filtro_Desde: $('#MainContent_txtDesdeConsulta').val(),
            Filtro_Hasta: $('#MainContent_txtHastaConsulta').val(),
            Filtro_CodVendedor: $('#MainContent_ddlVendedorConsulta').val()            
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
                F_Update_Division_HTML('div_consultacomisiones', result.split('~')[2]);
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

function F_Actualizar(Control) {
    var lblVNVC = '';
    var lblVNV = '';
    var boolEstado = false;
    var imgCerrar = '';
    var hfCodComisionCab = '';
    var hfCodComisionDet = '';
    var hfNroLote = '';
    var cadena = 'Ingrese los sgtes. campos: '

    imgCerrar = '#' + Control.id;
    lblVNVC = imgCerrar.replace('imgCerrar', 'lblVNVC');
    lblVNV = imgCerrar.replace('imgCerrar', 'lblVNV');
    hfCodComisionCab = imgCerrar.replace('imgCerrar', 'hfCodComisionCab');
    hfCodComisionDet = imgCerrar.replace('imgCerrar', 'hfCodComisionDet');  
  
    if ($(lblVNVC).text()=='0.00')
            $(lblVNVC).text($(lblVNV).text());
    else
            $(lblVNVC).text('0.00');
 
    try {
        var objParams = {
            Filtro_CodComisionDet: $(hfCodComisionDet).val(),    
            Filtro_CodComisionCab: $(hfCodComisionCab).val(),
            Filtro_TotalVnvComisionable: $(lblVNVC).text()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_Actualizar_NET(arg, function (result) {
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

function getContentTab() {
    $('#MainContent_txtDesdeConsulta').val(Date_AddDays($('#MainContent_txtHastaConsulta').val(), -360));
    $('#MainContent_chkRango').prop('checked', true);
    F_Buscar();
    return false;
}

function F_ConsultaLotes(Fila) {
    try {
        var imgID = Fila.id;
        var hfCodComisionCab = '#' + imgID.replace('imgReemplazo', 'hfCodComisionCab');
        var hfCodVendedor = '#' + imgID.replace('imgReemplazo', 'hfCodVendedor');
        var lblEstado = '#' + imgID.replace('imgReemplazo', 'lblEstado');
        var lblDesde = '#' + imgID.replace('imgReemplazo', 'lblDesde');
        var lblHasta = '#' + imgID.replace('imgReemplazo', 'lblHasta');
 
        if ($(lblEstado).text() == "CERRADO") {
            alertify.log("EL PROCESO ESTA CERRADO, NO SE PUEDE MODIFICAR");
            return false;
        }

        var objParams = {
            Filtro_CodComisionCab: $(hfCodComisionCab).val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ConsultaLotes_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                $('#MainContent_txtDesde').val($(lblDesde).text());
                $('#MainContent_txtHasta').val($(lblHasta).text());
                $('#MainContent_ddlVendedor').val($(hfCodVendedor).val());
                $('#hfCodComisionCab').val($(hfCodComisionCab).val());
                $("#divTabs").tabs("option", "active", $("#liRegistro").index());                
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

function F_ConsultaExcel(Fila) {
        var imgID = Fila.id;
        var hfCodComisionCab = '#' + imgID.replace('imgExcel', 'hfCodComisionCab');
        F_Excel($(hfCodComisionCab).val()) ;
}

function F_EliminarRegistro(Fila) {
    try {
        var imgID = Fila.id;
        var hfCodComisionCab = '#' + imgID.replace('imgEliminarDocumento', 'hfCodComisionCab');
        var lblEstado = '#' + imgID.replace('imgEliminarDocumento', 'lblEstado');
        
        if ($(lblEstado).text() == "CERRADO") {
            alertify.log("EL PROCESO ESTA CERRADO, NO SE PUEDE ELIMINAR");
            return false;
        }

        if (!confirm("ESTA SEGURO DE ELIMINAR EL PROCESO"))
            return false;
            
        var chkFecha = '0';
                
        if ($('#MainContent_chkRango').is(':checked'))
            chkFecha = '1';

        var objParams = {
            Filtro_CodComisionCab: $(hfCodComisionCab).val(),
            Filtro_ChkFecha: chkFecha,
            Filtro_Desde: $('#MainContent_txtDesdeConsulta').val(),
            Filtro_Hasta: $('#MainContent_txtHastaConsulta').val(),
            Filtro_CodVendedor: $('#MainContent_ddlVendedorConsulta').val()  
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
                F_Update_Division_HTML('div_consultacomisiones', result.split('~')[2]);
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

function F_Cerrar() {
    try {
        var objParams = {
            Filtro_CodComisionCab: $("#hfCodComisionCab").val(),
            Filtro_FechaCierre: $("#MainContent_txtFechaCierre").val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_Cerrar_Net(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                $('#hfCodComisionCab').val('0');
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

function F_Recorrido(obj, CodEstado, Titulo, Cadena, Label) {
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