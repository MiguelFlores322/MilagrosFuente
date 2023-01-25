var AppSession = "../Reportes/InventarioValorizado.aspx";
var ddlAlmacen;

$(document).ready(function () {
    if (!F_SesionRedireccionar('')) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    


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
    
    $('#MainContent_txtArticulo').css('background', '#FFFFE0');
    $('#MainContent_chkAlmacen').prop("checked", true);
});

function F_Controles_Inicializar() {

    var arg;

    try {
        var objParams =
            {
                Filtro_CodSerie: 67
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
                        $('#hfCodSede').val(result.split('~')[2]);
                        F_Update_Division_HTML('div_Empresa', result.split('~')[3]);
                        $('#MainContent_ddlEmpresa').css('background', '#FFFFE0');
                        $('#MainContent_ddlEmpresa').val('0');
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

$().ready(function () {

    $(document).everyTime(900000, function () {

        $.ajax({
            type: "POST",
            url: '../Reportes/RegistroVentas.aspx/KeepActiveSession',
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

function F_Reporte() {
    var Cuerpo = '#MainContent_';
    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodMenu = 2003;
    chkStock = '1';
    ChkAlmacen = '0';

    if ($('#MainContent_chkStock').is(':checked'))
        chkStock ='0';

    if ($('#MainContent_chkAlmacen').is(':checked'))
        CodMenu = 2004;


    rptURL = '../Reportes/ConstruirExcel.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'Articulo=' + $('#MainContent_txtArticulo').val() + '&';
    rptURL = rptURL + 'Stock=' + chkStock + '&';
    rptURL = rptURL + 'Almacen=' + ChkAlmacen + '&';
   
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

function Almacen() {
 if (!F_SesionRedireccionar(AppSession)) return false;
        var Descripcion="";

        $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'InventarioValorizado.aspx/F_Almacenes_Listar_NET',
        data: "{'pTodos':'0','Descripcion':'" + Descripcion + "'}",
        dataType: "json",
        async: true,
        success: function (json) {

                let data = []
                var d = json.d;
                for (let i = 0; i < d.length; i++) {
                data.push({
                text: d[i].DscAlmacen,
                value: d[i].CodAlmacen
                    
                    })
                };

                ddlAlmacen = new SlimSelect({
                  select: '#ddlAlmacen',
                  //placeholder: 'TODAS LAS FAMILIAS POR DEFECTO',
                  searchingText: 'Buscando...', // Optional - Will show during ajax request
                  searchText: 'NO SE ENCONTRARON ALMACENES',
                  searchPlaceholder: 'BUSQUEDA DE ALMACENES',
                  searchFocus: true, // Whether or not to focus on the search input field
                  closeOnSelect: false,
                  data: data
                });

                },
                error: function (response) {
                    console.log(response.responseText);
                    
                },
                failure: function (response) {
                    console.log(response.responseText);
                    
                }
            });
}





