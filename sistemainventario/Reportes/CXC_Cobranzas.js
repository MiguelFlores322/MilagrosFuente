var AppSession = "../Reportes/CXC_Cobranzas.aspx";
var ddlCliente;

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

    $('#MainContent_btnBuscar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_Buscar()
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
        return false;
    });

    $('#MainContent_chkVencidas').change(function () {
        if ($(this).is(":checked")) {
            $(this).prop("checked", true);
            $('#MainContent_chkDeudas').prop("checked", false);
            $('#MainContent_chkTodas').prop("checked", false);
        }
        else
        { $(this).prop("checked", true); }

    });

    $('#MainContent_chkDeudas').change(function () {
        if ($(this).is(":checked")) {
            $(this).prop("checked", true);
            $('#MainContent_chkVencidas').prop("checked", false);
            $('#MainContent_chkTodas').prop("checked", false);
        }
        else
        { $(this).prop("checked", true); }
    });

    $('#MainContent_chkTodas').change(function () {
        if ($(this).is(":checked")) {
            $(this).prop("checked", true);
            $('#MainContent_chkVencidas').prop("checked", false);
            $('#MainContent_chkDeudas').prop("checked", false);
        }
        else
        { $(this).prop("checked", true); }
    });

    $('#MainContent_txtCliente').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_ddlTipoDocumento').css('background', '#FFFFE0');

    F_Controles_Inicializar();
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

$(document).on("change", "select[id $= 'MainContent_ddlRuta']", function () {
    F_Vendedor($("#MainContent_ddlRuta").val());
});

function VerifySessionState(result) { }

function F_Buscar(){
    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = 5;
    var CodMenu = 400;
    var CodVendedor = 0;
    var Desde = $("#MainContent_txtDesde").val();
    var Hasta = $('#MainContent_txtHasta').val();

    if ($('#MainContent_txtCliente').val() == '')
        $('#hfCodCtaCte').val(0);

    if ($('#MainContent_txtCliente').val() != $('#hfCliente').val()) {
        $('#hfCodCtaCte').val(0);
        $('#MainContent_txtCliente').val('');
    }

    if (!$('#MainContent_chkRango').is(':checked')) {
        Desde = '01/01/1990';
        Hasta = '01/01/1990';
    }


    var cantidad = ddlCliente.selected().length;

    var arrClientes = new Array();
    $.each(ddlCliente.selected(), function (index, item) {
        var objDetalle = {
        CodCtaCte: item
        };                    
        arrClientes.push(objDetalle);
    });

    var Titulo = "REPORTE DE COBRANZAS";
    var SubTitulo = "DESDE " + $("#MainContent_txtDesde").val() + " HASTA " + $('#MainContent_txtHasta').val();
    var NombreTabla = "ReporteViaje";
    var NombreArchivo = "Web_Reporte_Cobranzas_rptCobranzasGrupal.rpt";

    if (ddlCliente.selected().length==1)
    {
       NombreTabla = "Cobranzas";
       NombreArchivo = "Web_Reporte_Cobranzas_rptCobranzasUnitario.rpt";
    }

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu='        + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo='    + TipoArchivo + '&';
    rptURL = rptURL + 'Titulo='         + Titulo + '&';
    rptURL = rptURL + 'SubTitulo='      + SubTitulo + '&';
    rptURL = rptURL + 'XmlCliente='     + Sys.Serialization.JavaScriptSerializer.serialize(arrClientes) + '&';
    rptURL = rptURL + 'Desde='          + Desde + '&';
    rptURL = rptURL + 'Hasta='          + Hasta + '&';
    rptURL = rptURL + 'CodTipoDoc='     + $("#MainContent_ddlTipoDocumento").val() + '&';
    rptURL = rptURL + 'CodMoneda='      + $("#MainContent_ddlMoneda").val() + '&';
    rptURL = rptURL + 'CodVendedor='    + $('#MainContent_ddlVendedor').val() + '&';
    rptURL = rptURL + 'NombreTabla='    + NombreTabla + '&';
    rptURL = rptURL + 'NombreArchivo='  + NombreArchivo + '&';
    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_Controles_Inicializar() {
    var arg;

    try {
        var objParams =
            {
                Filtro_CodRuta: 0,
                Filtro_CodCargo: 6,
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
                        F_Update_Division_HTML('div_Ruta', result.split('~')[3]);
                        F_Update_Division_HTML('div_Vendedor', result.split('~')[4]);
                        F_Update_Division_HTML('div_moneda', result.split('~')[5]);

                        $('#MainContent_ddlEmpresa').val(0);
                        $('#MainContent_ddlRuta').val(0);
                        $('#MainContent_ddlVendedor').val(0);
                        $('#MainContent_ddlMoneda').val(1);
                        $('#MainContent_ddlVendedor').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresa').css('background', '#FFFFE0');
                        $('#MainContent_ddlRuta').css('background', '#FFFFE0');    
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');    
                        $("#MainContent_chkGuia").prop("checked", true);
                        $('.ccsestilo').css('background', '#FFFFE0');


                        
            ddlCliente = new SlimSelect({
                select: '#ddlCliente',
                placeholder: 'TODOS LOS CLIENTES POR DEFECTO',
                searchingText: 'Buscando...', // Optional - Will show during ajax request
                searchText: 'NO SE ENCONTRARON CLIENTES',
                searchPlaceholder: 'BUSQUEDA DE CLIENTES POR RUC/DNI/RAZON SOCIAL',
                searchFocus: true, // Whether or not to focus on the search input field
                closeOnSelect: false,
                  ajax: function (search, callback) {
                    // Check search value. If you dont like it callback(false) or callback('Message String')
                    if (search.length < 2) {
                      callback('Necesita 3 caracteres')
                      return
                    }

                        $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete_toList',
                        data: "{'NroRuc':'" + "" + "','RazonSocial':'" + search + "','CodTipoCtaCte':'1','CodTipoCliente':'0'}",
                        dataType: "json",
                        async: false,
                        success: function (json) {

                                let data = [];
                                var d = json.d;
                                for (let i = 0; i < d.length; i++) {
                                data.push({
                                text: d[i].RazonSocial,
                                value: d[i].CodCtaCte
                    
                            })
                        };

                        callback(data);

                                },
                                error: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                },
                                failure: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                }
                            });

                  }
            });


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

function F_Vendedor(CodRuta) {
    var arg;

    try {
        var objParams =
            {
                Filtro_CodRuta: CodRuta
            };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Vendedor_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_Vendedor', result.split('~')[2]);
                        if (CodRuta==0)                                   
                            $('#MainContent_ddlVendedor').val(0);
                        $('#MainContent_ddlVendedor').css('background', '#FFFFE0');                    
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