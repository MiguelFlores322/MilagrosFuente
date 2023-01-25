var AppSession = "../Inventario/Kardex.aspx";

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
    $('#MainContent_txtRazonSocial').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 0 + "','CodTipoCliente':'" + 0 + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Direccion: item.split(',')[2]
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
            $('#hfCodCtaCteConsulta').val(i.item.val);

        },
        minLength: 3
    });

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#MainContent_txtArticulo').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_LGProductos_Select',
                data: "{'Descripcion':'" + request.term + "','CodAlmacen':'" + $('#MainContent_ddlAlmacenFisico').val() + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Stock: parseFloat(item.split(',')[2]).toFixed(2),
                            Costo: item.split(',')[3],
                            Moneda: item.split(',')[4],
                            Cod: item.split(',')[5]
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
            $('#hfCodCtaCte').val(i.item.Cod);
            $('#MainContent_lblStock').text(parseFloat(i.item.Stock).toFixed(2));
            $('#MainContent_lblCosto').text(i.item.Costo);
            $('#MainContent_lblMoneda').text(i.item.Moneda);

        },
        minLength: 3
    });

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
            if (!F_Validar())
                return false;

            F_Buscar();
            $('#MainContent_txtArticulo').focus();
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

    F_Controles_Inicializar();

    $('#MainContent_txtDesde').val('01/01/2017');

    $('#MainContent_txtArticulo').focus();

    $('#MainContent_txtArticulo').css('background', '#FFFFE0');

    $('#MainContent_txtRazonSocial').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtEmpresa').css('background', '#FFFFE0');

    $('#MainContent_ddlOrdenamiento').css('background', '#FFFFE0');

    

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

function F_Controles_Inicializar() {

    var arg;

    try {
        var objParams =
            {
                Filtro_CodSerie: 1
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
                        F_Update_Division_HTML('div_AlmacenFisico', result.split('~')[2]);
                        $('#MainContent_ddlAlmacenFisico').val(1);
                        $('#MainContent_ddlAlmacenFisico').css('background', '#FFFFE0');
                        $('.ccsestilo').css('background', '#FFFFE0');
                        $('#MainContent_lblSaldoInicial').text('0.00')
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

function F_Buscar() {
    var arg;
    try {
        if ($('#MainContent_txtRazonSocial').val() == '')
            $('#hfCodCtaCteConsulta').val('0');

        var objParams =
            {
                Filtro_Desde:               $('#MainContent_txtDesde').val(),
                Filtro_Hasta:               $('#MainContent_txtHasta').val(),
                Filtro_CodProducto:         $('#hfCodCtaCte').val(),
                Filtro_CodCtaCte:           $('#hfCodCtaCteConsulta').val(),
                Filtro_CodAlmacenFisico:    $('#MainContent_ddlAlmacenFisico').val(),
                Filtro_Ordenamiento:        $('#MainContent_ddlOrdenamiento').val()
            };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_Buscar_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_grvKardex', result.split('~')[2]);
                      //  $('#MainContent_lblStock').text(parseFloat(result.split('~')[3]).toFixed(2));
                        $('#MainContent_lblSaldoInicial').text(parseFloat(result.split('~')[4]).toFixed(2));
                        if (str_mensaje_operacion != '')
                            alertify.log(str_mensaje_operacion);
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

function F_Nuevo(){


       $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
       $('.Jq-ui-dtp').datepicker('setDate', new Date());
       $('#hfCodCtaCte').val('0');
       $('#MainContent_txtArticulo').val('');
       $('#MainContent_lblStock').text('0.00');
       $('#MainContent_lblCosto').text('0.00');
       $('#MainContent_lblMoneda').text('dolares');
       $('#MainContent_txtDesde').val('01/01/2014');
       $('#MainContent_txtArticulo').focus();
      
       try 
        {
              var objParams = {};
                                                                
                               

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_Nuevo_NET(arg, function (result) {
                
                 MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {

                    F_Update_Division_HTML('div_grvKardex', result.split('~')[2]);                            
                  
                }
                else 
                {
                    alertify.log(result.split('~')[1]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
            return false;
        }

}

function F_Validar(){ 
        var Cadena="Ingrese los sgtes. campos: ";    
        if($('#MainContent_txtArticulo').val()=="")
        Cadena= Cadena + "\n"  + "Articulo";

        if($('#MainContent_txtDesde').val()=="")
        Cadena= Cadena + "\n"  + "Desde";

        if($('#MainContent_txtHasta').val()=="")
        Cadena= Cadena + "\n"  + "Hasta";

        if (Cadena!="Ingrese los sgtes. campos: ")
        {
            alertify.log(Cadena);
            return false;
        }
        return true;
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

function F_ElegirEmpresa(Fila) {
    MostrarEspera(true);
    var imgID                = Fila.id;
    var hfCodEmpresa_Grilla  = '#' + imgID.replace('imgSelecEmpresa', 'hfCodEmpresa');
    var lblNombre            = '#' + imgID.replace('imgSelecEmpresa', 'lblRazonSocial');
    var ddlSede              = '#' + imgID.replace('imgSelecEmpresa', 'ddlSede');
    var Cuerpo               = '#MainContent_';
    $(Cuerpo + 'txtEmpresa').val($(lblNombre).text());
    $('#hfCodSede').val($(hfCodEmpresa_Grilla).val());
    $('#hfCodEmpresa').val($(hfCodEmpresa_Grilla).val());
    $('#divSeleccionarEmpresa').dialog('close');
    MostrarEspera(false);
}

