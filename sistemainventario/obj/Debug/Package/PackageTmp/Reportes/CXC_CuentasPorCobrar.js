var AppSession = "../Reportes/CuentasPorCobrar.aspx";

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
                            NroRuc: item.split(',')[8]
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
        },
        minLength: 3
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
});

$().ready(function () {

    $(document).everyTime(600000, function () {

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

function F_Buscar() {
    var Hasta = '';
    var CodEstado = '';
    var Desde = '30/09/2016';

    if ($('#MainContent_chkVencidas').is(':checked')) {
        Hasta = $.datepicker.formatDate('dd/mm/yy', new Date());
        CodEstado = 6;
    }

    if ($('#MainContent_chkDeudas').is(':checked')) {
        Hasta = '01/01/1900';
        CodEstado = 6;
    }

    if ($('#MainContent_chkTodas').is(':checked')) {
        Hasta = '01/01/1900';
        CodEstado = 0;
    }

    if (!$('#MainContent_chkChromapixel').is(':checked')) {
        Desde = '01/01/1900';     
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = 9;

    rptURL = '../Reportes/Web_Pagina_Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'CodEstado=' + CodEstado + '&';
    rptURL = rptURL + 'Hasta=' + Hasta + '&';
    rptURL = rptURL + 'Desde=' + Desde + '&';
    rptURL = rptURL + 'CodCtacte=' + $('#hfCodCtaCte').val() + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}


