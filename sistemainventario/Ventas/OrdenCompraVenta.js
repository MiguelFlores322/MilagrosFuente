var AppSession = "../Ventas/OrdenCompraVenta.aspx";

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
//    document.onkeydown = function (evt) {
//        return (evt ? evt.which : event.keyCode) != 13;
//    }
    
    $('#MainContent_txtSerializacion').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            F_AgregarTemporalSerializacion();
            return false;
        }
        event.stopPropagation();
    });

    $('#MainContent_txtCliente').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'" + 1 + "'}",
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
            $('#MainContent_txtNroRuc').val(i.item.NroRuc);
            $('#MainContent_txtDireccion').val(i.item.Direccion);
            $('#MainContent_txtDestino').val(i.item.DireccionEnvio);
            $('#MainContent_txtDistrito').val(i.item.Distrito);
            $('#hfCodDepartamento').val(i.item.CodDepartamento);
            $('#hfCodProvincia').val(i.item.CodProvincia);
            $('#hfCodDistrito').val(i.item.CodDistrito);
        },
        minLength: 3
    });

    $('#MainContent_txtClienteConsulta').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'" + 1 + "'}",
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

    $('#MainContent_txtDistrito').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCDistrito_Listar',
                data: "{'Descripcion':'" + request.term + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[3],
                            val: item.split(',')[0],
                            CodProvincia: item.split(',')[1],
                            CodDistrito: item.split(',')[2]
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
            $('#hfCodDepartamento').val(i.item.val);
            $('#hfCodProvincia').val(i.item.CodProvincia);
            $('#hfCodDistrito').val(i.item.CodDistrito);
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

    $('#divTabs').tabs();   
    
    $('#MainContent_txtDesde').datepicker({onSelect: function() {
      var date = $(this).datepicker('getDate');
      if (date) {
            date.setDate(1);
            $(this).datepicker('setDate', date);
      }
      }}); 

    $('#MainContent_txtDesde').datepicker({beforeShowDay: function(date) {
      return [date.getDate() == 1, ''];
    }});

    F_Controles_Inicializar();

    $('#MainContent_btnBuscarArticulo').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
        try 
        {
        var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val=="")
            cadena=cadena + "<p></p>" + "Articulo"

              if ($('#MainContent_ddlMoneda option').size() == 0)
              { cadena = cadena + "<p></p>" + "Moneda"; }
              else 
              {
              if ($('#MainContent_ddlMoneda').val() == "-1")
                    cadena = cadena + "<p></p>" + "Moneda";
              }

              if ( cadena != "Ingresar los sgtes. campos :")
              {
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

    $('#MainContent_btnAgregarProducto').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
        try 
        {
               
                $('#MainContent_txtArticulo').val('');
                $('#MainContent_chkServicios').prop('checked',false);
                $('#MainContent_chkNotaPedio').prop('checked',false);
                $("#divConsultaArticulo").dialog({
                    resizable: false,
                    modal: true,
                    title: "Consulta de Productos",
                    title_html: true,
                    height: 500,
                    width: 1020,
                    autoOpen: false
                });

                $('#divConsultaArticulo').dialog('open');
                $('#MainContent_txtArticulo').focus();


                 var objParams = { };
                 var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                 MostrarEspera(true);
                F_CargarGrillaVaciaConsultaArticulo_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                  
                    F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);                            
                           $('.ccsestilo').css('background', '#FFFFE0');
                }
                else 
                {
                    alertify.log(result.split('~')[1]);
                }

                return false;

                });


        }
        catch (e) {
        MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }


        return false;

    });  

    $('#MainContent_btnAgregar').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
        if (!F_ValidarAgregar())
        return false;

        F_AgregarTemporal();
        F_LimpiarGrillaConsulta();
        $('#MainContent_txtArticulo').focus();
        return false;
        }
        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnEliminar').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
            if(!F_ValidarEliminar())
              return false;

            if (confirm("ESTA SEGURO DE ELIMINAR LOS PRODUCTOS SELECCIONADOS"))
            F_EliminarTemporal();

            return false;
        }
        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnGrabar').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
            if(!F_ValidarGrabarDocumento())
              return false;

            if (confirm("ESTA SEGURO DE GRABAR LA ORDEN DE COMPRA DE VENTA"))
            F_GrabarDocumento();

            return false;
        }        
        catch (e) 
        {
            alertify.log("Error Detectado: " + e);
        }     
    });

    $('#MainContent_btnNuevo').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
          F_Nuevo();

          return false;
        }
        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnBuscarConsulta').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
          F_Buscar();
          return false;
        }
        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnDevolverOC').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
            if(F_ValidarDevolucion("Seleccione un articulo para devolver")==false)
              return false;

            if (confirm("Esta seguro de la devolucion de los productos seleccionado"))
            F_Devolucion();

            return false;
        }
        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnGrabarOC').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
            if(F_ValidarDevolucion("Seleccione un articulo para facturar")==false)
              return false;

            if(F_ValidarGrabarDocumentoOC()==false)
              return false;

            if (confirm("Esta seguro de facturar la nota de venta"))
            F_GrabarOC();

            return false;
        }
        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnGrabarComision').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
         
            if (confirm("Esta Seguro de Grabar la Comision"))
            F_GrabarComision();

            return false;
        }
        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_txtEmision').on('change', function (e) {
        F_FormaPago($("#MainContent_ddlFormaPago").val());
        F_TipoCambio();
    });

    $('#MainContent_txtEmisionOC').on('change', function (e) {
        F_FormaPago($("#MainContent_ddlFormaPagoOC").val());
        F_TipoCambio();
    });
       
    $("#MainContent_txtNumero").ForceNumericOnly();

    $("#MainContent_txtNumeroConsulta").ForceNumericOnly();

    $("#MainContent_txtNroRuc").ForceNumericOnly();

    $("#MainContent_txtSerieOC").ForceNumericOnly();

    $("#MainContent_txtNumeroOC").ForceNumericOnly();

    $('#MainContent_txtSerieOC').blur(function () {
    if ($('#MainContent_txtSerieOC').val() == '')
    return false;
        var id='000' + $('#MainContent_txtSerieOC').val();
            $('#MainContent_txtSerieOC').val(id.substr(id.length - 3));   
       return false;
    });

    $('#MainContent_txtNumeroOC').blur(function () {
    if ($('#MainContent_txtNumeroOC').val()=='')
    return false;
        var id='0000000' + $('#MainContent_txtNumeroOC').val();
            $('#MainContent_txtNumeroOC').val(id.substr(id.length - 7));   
       return false;
    });

    $('#MainContent_txtArticulo').blur(function () {
          try 
        {
        if ($('#MainContent_txtArticulo').val()=='')
        return false

        var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val=="" | $('#MainContent_txtArticulo').val().length<3)
            cadena=cadena + "<p></p>" + "Articulo (Minimo 2 Caracteres)"

              if ($('#MainContent_ddlMoneda option').size() == 0)
              { cadena = cadena + "<p></p>" + "Moneda"; }
              else 
              {
              if ($('#MainContent_ddlMoneda').val() == "-1")
                    cadena = cadena + "<p></p>" + "Moneda";
              }

              if ( cadena != "Ingresar los sgtes. campos :")
              {
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

    $('#MainContent_txtNumeroConsulta').blur(function () {
    if ($('#MainContent_txtNumeroConsulta').val()=='')
    return false;
        var id='0000000' + $('#MainContent_txtNumeroConsulta').val();
            $('#MainContent_txtNumeroConsulta').val(id.substr(id.length - 7));   
       return false;
    });

    $('#div_SerieDetalle').bind('dialogclose', function(event) {
      F_BuscarTemporal();
      return false;
 });

    $("#MainContent_txtNumero").ForceNumericOnly();

    $("#MainContent_txtNumeroConsulta").ForceNumericOnly();

    $('#MainContent_txtArticulo').blur(function () {
          try 
        {
        if ($('#MainContent_txtArticulo').val()=='')
        return false

        var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val=="" | $('#MainContent_txtArticulo').val().length<3)
            cadena=cadena + "<p></p>" + "Articulo (Minimo 2 Caracteres)"

              if ($('#MainContent_ddlMoneda option').size() == 0)
              { cadena = cadena + "<p></p>" + "Moneda"; }
              else 
              {
              if ($('#MainContent_ddlMoneda').val() == "-1")
                    cadena = cadena + "<p></p>" + "Moneda";
              }

              if ( cadena != "Ingresar los sgtes. campos :")
              {
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

    $('#MainContent_txtNumero').blur(function () {
        var id = '0000000' + $('#MainContent_txtNumero').val();
        $('#MainContent_txtNumero').val(id.substr(id.length - 7));
        return false;
    });

    $("#MainContent_chkServicios").change(function () {
        if (this.checked) {
            $('#MainContent_chkNotaPedido').prop('disabled', false);
            if ($('#hfNotaPedido') == '1')
                $('#MainContent_chkNotaPedido').prop('checked', true);
            else
                $('#MainContent_chkNotaPedido').prop('checked', false);
            $('#MainContent_txtArticulo').focus();
        }
        else {
            $('#MainContent_chkNotaPedido').prop('disabled', true);
            $('#MainContent_chkNotaPedido').prop('check', false);
        }

    });

    $("#MainContent_chkNotaPedido").change(function () {
        if (this.checked) {
            $('#hfNotaPedido').val('1');
            $('#MainContent_txtArticulo').val('');
            $('#MainContent_txtArticulo').focus();
        }

        else {
            $('#hfNotaPedido').val('0');

            var hfcodtipoproducto_grilla = '';
            var chkDel = '';
            var i = 0;

            $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                chkDel = '#' + this.id;
                hfcodtipoproducto_grilla = chkDel.replace('chkEliminar', 'hfcodtipoproducto');
                if ($(hfcodtipoproducto_grilla).val() == '2') {
                    $(chkDel).prop('checked', true);
                    i = 1;
                }

            });

            if (i == 1) {
                if (confirm("Esta seguro de quitar el pedido")) {
                    F_EliminarTemporal();
                }
                else {

                    $('#MainContent_chkNotaPedido').prop('checked', true);
                    $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                        chkDel = '#' + this.id;
                        hfcodtipoproducto_grilla = chkDel.replace('chkEliminar', 'hfcodtipoproducto');
                        if ($(hfcodtipoproducto_grilla).val() == '2') {
                            $(chkDel).prop('checked', false);
                        }

                    });
                    $('#hfNotaPedido').val('1');
                    $('#MainContent_txtArticulo').focus();

                }

            }
            return false;
        }



    });

    $('#div_SerieDetalle').bind('dialogclose', function(event) {
      F_BuscarTemporal();
      return false;
 });

     $('#MainContent_txtVencimiento').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtDireccion').css('background', '#FFFFE0');

    $('#MainContent_txtSerializacion').css('background', '#FFFFE0');

    $('#MainContent_txtCliente').css('background', '#FFFFE0');

    $('#MainContent_txtClienteConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroGuia').css('background', '#FFFFE0');

    $('#MainContent_txtFechaTraslado').css('background', '#FFFFE0');

    $('#MainContent_txtDestino').css('background', '#FFFFE0');

    $('#MainContent_txtSubTotal').css('background', '#FFFFE0');

    $('#MainContent_txtIgv').css('background', '#FFFFE0');

    $('#MainContent_txtTotal').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtNumero').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtArticulo').css('background', '#FFFFE0');

    $('#MainContent_txtNroRuc').css('background', '#FFFFE0');

    $('#MainContent_txtDistrito').css('background', '#FFFFE0');

    $('#MainContent_txtSerieOC').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroOC').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').blur(function () {
        var id = '0000000' + $('#MainContent_txtNumeroConsulta').val();
        $('#MainContent_txtNumeroConsulta').val(id.substr(id.length - 7));
        return false;
    });

    F_Derecha();

    $('.ccsestilo').css('background', '#FFFFE0');

    $("#MainContent_txtCliente").on('change', function () {
        if ($.trim($(this).val()) == '') {
            $('#hfCodCtaCte').val(0);
        }
    });

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

$(document).on("change", "select[id $= 'MainContent_ddlSerieGuia']",function () {
     F_Mostrar_Correlativo($("#MainContent_ddlSerieGuia").val(), 10);
} );

$(document).on("change", "select[id $= 'MainContent_ddlSerie']",function () {
     F_Mostrar_Correlativo($("#MainContent_ddlSerie").val(), 16);
} );

$(document).on("change", "select[id $= 'MainContent_ddlSerieOC']",function () {
     F_Mostrar_Correlativo($("#MainContent_ddlSerieOC").val(), 1);
} );

$(document).on("change", "select[id $= 'MainContent_ddlFormaPago']",function () {
     F_FormaPago($("#MainContent_ddlFormaPago").val());
} );

function F_Controles_Inicializar() {

    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodSerie: 16

            };

        MostrarEspera(true);    
        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_Controles_Inicializar_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);    
                    if (str_resultado_operacion == "1") 
                    {                 
                        F_Update_Division_HTML('div_formapago', result.split('~')[2]);
                        F_Update_Division_HTML('div_moneda', result.split('~')[3]);
                        F_Update_Division_HTML('div_igv', result.split('~')[5]);
                        F_Update_Division_HTML('div_Vendedor', result.split('~')[6]);
                        F_Update_Division_HTML('div_Estado', result.split('~')[7]);
                        $('#MainContent_lblTC').text(result.split('~')[4]);
                        $('#MainContent_ddlMoneda').val(1);
                        $('#MainContent_ddlEstado').val(0);
                        $('#MainContent_ddlFormaPago').val(11);
                        $('#MainContent_ddlVendedor').val(6);
                        $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
                        $('#MainContent_ddlVendedor').css('background', '#FFFFE0');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlFormaPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlEstado').css('background', '#FFFFE0');
                        $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),7));
                        $('.ccsestilo').css('background', '#FFFFE0');
                    }
                    else {
                        alertify.log(str_mensaje_operacion);
                    }
                }
            );
    } 
        catch (mierror) {
        MostrarEspera(false);    
        alertify.log("Error detectado: " + mierror);
    }
}

function F_Mostrar_Correlativo(CodSerie,CodTipoDoc) {

    var arg;

    try {

        var objParams = {

            Filtro_CodDoc: CodTipoDoc
        };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);    
        F_Mostrar_Correlativo_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);    
                    if (str_resultado_operacion == "1") 
                    {
                        if (CodTipoDoc==16)
                            $('#MainContent_txtNumero').val(result.split('~')[2]);
                        else
                            $('#MainContent_txtNumeroGuia').val(result.split('~')[2]);
                        
                        if (CodTipoDoc==1)
                            $('#MainContent_txtNumeroOC').val(result.split('~')[2]);        
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

function F_Buscar_Productos() {

    var arg;
    var CodTipoProducto='2';
    try {
        var objParams =
            {
                Filtro_DscProducto: $('#MainContent_txtArticulo').val(),
                Filtro_CodTipoProducto: CodTipoProducto,
                Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
            };


        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);    
        F_Buscar_Productos_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);    
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);
                        $('.ccsestilo').css('background', '#FFFFE0');
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
 
function F_ValidarPrecioLista(ControlID) {

    var ddlLista_Grilla = '';
    var lblprecio = '';
    var txtcant_grilla = '';
    var txtprecio_grilla = '';
    var boolEstado = false;

            ddlLista_Grilla = '#' + ControlID;
            txtprecio_grilla = ddlLista_Grilla.replace('ddlLista', 'txtPrecioLibre');
            txtcant_grilla = ddlLista_Grilla.replace('ddlLista', 'txtCantidad');

             switch ($(ddlLista_Grilla).val()) 
             {
              case "1":
                        lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio1');
                        $(txtprecio_grilla).val($(lblprecio).val());
                       $(txtprecio_grilla).prop('disabled', true);
                        $(txtcant_grilla).focus();
                        break;

              case "2":
                        lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio2');
                        $(txtprecio_grilla).val($(lblprecio).val());
                         $(txtprecio_grilla).prop('disabled', true);
                        $(txtcant_grilla).focus();
                        break;
              case "3":
                        lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio3');
                        $(txtprecio_grilla).val($(lblprecio).val());
                        $(txtprecio_grilla).prop('disabled', true);
                        $(txtcant_grilla).focus();
                        break;

              case "4":
                    $(txtprecio_grilla).val('');
                    $(txtprecio_grilla).prop('disabled', false);
                    $(txtprecio_grilla).focus();
                        break;
    }

    return true;
}

function F_ValidarStockGrilla(ControlID) {

    var txtcantidad_Grilla = '';
    var lblstock = '';
    var txtcant_grilla = '';
    var boolEstado = false;
    var chkok_grilla = '';

    txtcantidad_Grilla = '#' + ControlID;
    chkok_grilla = txtcantidad_Grilla.replace('txtCantidad', 'chkOK');
    lblstock = txtcantidad_Grilla.replace('txtCantidad', 'lblstock');

    if ($(txtcantidad_Grilla).val() == '')
        return false;

    boolEstado = $(chkok_grilla).is(':checked');

    if ($('#MainContent_chkNotaPedido').is(':checked')) {
        if (boolEstado && parseFloat($(txtcantidad_Grilla).val()) > parseFloat($(lblstock).text())) {
            alertify.log("STOCK INSUFICIENTE");
            $(txtcantidad_Grilla).val('');
            $(chkok_grilla).prop('checked', false);
            return false;
        }
    }
    else {
        if ($('#MainContent_chkServicios').is(':checked') == false && boolEstado && parseFloat($(txtcantidad_Grilla).val()) > parseFloat($(lblstock).text())) {
            alertify.log("STOCK INSUFICIENTE");
            if (parseFloat($(lblstock).text()) == 0) {
                $(txtcantidad_Grilla).val('');
                $(chkok_grilla).prop('checked', false);
            }
            else {
               // $(txtcantidad_Grilla).select();
            }           
            return false;
        }
    }

    F_AgregarTemporal();
    F_LimpiarGrillaConsulta();
    $('#MainContent_txtArticulo').focus();

    return true;
}

function F_ValidarPrecioGrilla(ControlID) {

    var txtprecio_Grilla = '';
    var lblprecio_grilla = '';
    var txtcant_grilla = '';
    var txtprecio_grilla = '';
    var boolEstado = false;
    var chkok_grilla='';

            txtprecio_Grilla = '#' + ControlID;
            chkok_grilla = txtprecio_Grilla.replace('txtPrecioLibre', 'chkOK');
            lblprecio_grilla = txtprecio_Grilla.replace('txtPrecioLibre', 'lblPrecio1');
            boolEstado = $(chkok_grilla).is(':checked');


//            if ($('#hfCodUsuario').val()!='5' && boolEstado && parseFloat($(txtprecio_Grilla).val())< parseFloat($(lblprecio_grilla).val()))
//            {alertify.log("Precio por debajo del minimo");
//            $(txtprecio_Grilla).val('');
//              return false;
//             }

    return true;
}

function F_ValidarCheck(ControlID) {

    var txtprecio_Grilla = '';
    var ddlLista_grilla = '';
    var txtcant_grilla = '';
    var txtprecio_grilla = '';
    var boolEstado = false;
    var chkok_grilla='';

    var cadena='Ingrese los sgtes. campos: '
            
            chkok_grilla = '#' + ControlID;
            txtprecio_grilla = chkok_grilla.replace('chkOK', 'txtPrecioLibre');
            txtcant_grilla = chkok_grilla.replace('chkOK', 'txtCantidad');
            ddlLista_grilla = chkok_grilla.replace('chkOK', 'ddlLista');          
            
            boolEstado = $(chkok_grilla).is(':checked');
            if (boolEstado)
            {
               
                $(txtcant_grilla).prop('disabled', false);
                var i=0;
                if($(txtprecio_grilla).val()=="")
                {$(txtprecio_grilla).focus();
                i=1}

                if(i==0 && $(txtcant_grilla).val()=="")
                { $(txtprecio_grilla).select(); }
            }
            else
            {
                $(txtcant_grilla).val('');             
                $(txtcant_grilla).prop('disabled', true);
            }    
    return true;
}

function F_FormaPago(CodFormaPago) {
 var arg;
    try 
    {
     switch (CodFormaPago)
     {
             case "1":
             case "12":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),0));
                  
                       break;

            case "3":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),30));
          
                       break;

            case "4":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),15));
                      
                       break;

            case "8":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),45));
              
                       break;

            case "9":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),60));
          
                       break;

            case "11":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),7));

                       break;

            case "13":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),75));
                      
                       break;

            case "14":
                       $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),90));
                    
                       break;

     }

     
    }
     catch (mierror) 
     {
        alertify.log("Error detectado: " + mierror);
     }

}

function F_ValidarAgregar(){

 try 
        {
        var chkSi='';
        var chkDel='';
        var txtcantidad_grilla='';
        var txtprecio_grilla='';
        var cadena = "Ingrese los sgtes. campos: ";
        var lblcodproducto_grilla='';
        var hfcodarticulodetalle_grilla='';
        var lbldscproducto_grilla='';
        var x=0;

                $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    txtprecio_grilla = chkSi.replace('chkOK', 'txtPrecioLibre');
                    txtcantidad_grilla = chkSi.replace('chkOK', 'txtCantidad');
                    lblcodproducto_grilla = chkSi.replace('chkOK', 'lblcodproducto');
                    
                     if ($(chkSi).is(':checked')) 
                        {
                            if ($(txtprecio_grilla).val()=='')
                                cadena=cadena + "<p></p>" + "Precio para el Codigo " + $(lblcodproducto_grilla).text() ;
                        
                            if ($(txtcantidad_grilla).val()=='')
                            cadena=cadena + "<p></p>" + "Cantidad para el Codigo " + $(lblcodproducto_grilla).text(); 
                        
                            x=1;
                        }
               });

               if(x==0)
               cadena="No ha seleccionado ningun producto";

                if (cadena != "Ingrese los sgtes. campos: ")
                   {
                      alertify.log(cadena);
                      return false;
                   } 
                   else
                   {
                    cadena="Los sgtes. productos se encuentran agregados : ";
                    $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcodproducto_grilla = chkSi.replace('chkOK', 'lblcodproducto');
               
                         if ($(chkSi).is(':checked')) 
                            {
                                 $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                                   chkDel = '#' + this.id;
                                   hfcodarticulodetalle_grilla = chkDel.replace('chkEliminar', 'hfcodarticulo');
                                   lbldscproducto_grilla = chkDel.replace('chkEliminar', 'lblproducto');
                                    
                                    if ($(lblcodproducto_grilla).text()==$(hfcodarticulodetalle_grilla).val())
                                    {
                                    cadena= cadena + "<p></p>"  + $(lbldscproducto_grilla).text();
                                    }
                         
                                  });
                            }
                    });
                   }    
                                 
                   if (cadena != "Los sgtes. productos se encuentran agregados : ") 
                   {alertify.log(cadena);
                   return false;}
                   else
                   {
                   return true;
                   }
        }
        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
}

function F_AgregarTemporal(){

  try 
        {
        var lblcodproducto_grilla='';
        var lblcodunidadventa_grilla='';
        var lblcosto_grilla='';
        var chkSi='';
        var txtcantidad_grilla='';
        var txtprecio_grilla='';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla='';
        var hfcosto_grilla='';
        var chkNotaPedido = 0;
        var chkServicio = 0;
        var lblProducto = "";
        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        if ($('#MainContent_chkServicios').is(':checked'))
            chkServicio = 1;

        if ($('#MainContent_chkNotaPedido').is(':checked'))
            chkNotaPedido = 1;
               
                $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcodproducto_grilla = chkSi.replace('chkOK', 'lblcodproducto');
                    lblcodunidadventa_grilla = chkSi.replace('chkOK', 'lblcodunidadventa');
                    lblcosto_grilla = chkSi.replace('chkOK', 'lblcosto');
                    txtprecio_grilla = chkSi.replace('chkOK', 'txtPrecioLibre');
                    txtcantidad_grilla = chkSi.replace('chkOK', 'txtCantidad');
                    hfcodunidadventa_grilla = chkSi.replace('chkOK', 'hfcodunidadventa');
                    hfcosto_grilla = chkSi.replace('chkOK', 'hfcosto');
                    lblProducto = chkSi.replace('chkOK', 'lblProducto');

                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                        CodArticulo: $(lblcodproducto_grilla).text(),
                        Descripcion: $(lblProducto).text().replace("&", "&amp;"),
                        Cantidad: $(txtcantidad_grilla).val(),
                        Precio: $(txtprecio_grilla).val() / tasaigv,
                        PrecioDscto: $(txtprecio_grilla).val() / tasaigv,
                        Costo: $(hfcosto_grilla).val(),
                        CodUm: $(hfcodunidadventa_grilla).val(),
                        CodDetalle:0,
                        Acuenta:0
                        };
                                               
                        arrDetalle.push(objDetalle);
                    }
                });

            
                var Contenedor = '#MainContent_';
                
                var objParams = {
                                        Filtro_CodTipoDoc: "1",
                                        Filtro_SerieDoc: $(Contenedor + 'ddlSerie').val(),
                                        Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
                                        Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
                                        Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
                                        Filtro_CodCliente: $(Contenedor + 'hfCodCtaCte').val(),
                                        Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
                                        Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
                                        Filtro_CodProforma: "0",
                                        Filtro_Igv: $(Contenedor + 'txtIgv').val(),
                                        Filtro_Total: $(Contenedor + 'txtTotal').val(),
                                        Filtro_CodGuia: "0",
                                        Filtro_Descuento: "0",
                                        Filtro_TasaIgv: tasaigv,
                                        Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                                        Filtro_Servicio: chkServicio,
                                        Filtro_NotaPedido: chkNotaPedido,
                                        Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                MostrarEspera(true);

                F_AgregarTemporal_NET(arg, function (result) {
        
                 MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                    if (result.split('~')[2]=='Los Producto(s) se han agregado con exito')
                        alertify.log('Los Producto(s) se han agregado con exito');

                    $('#MainContent_txtArticulo').val('');
                    $('#MainContent_chkDescripcion').focus();
                }
                else 
                {
                    alertify.log(result.split('~')[2]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
        MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }
}

function F_LimpiarGrillaConsulta(){

         var chkSi='';
         var txtprecio_grilla='';
         var txtcantidad_grilla='';
         var ddlLista_grilla='';

         $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
                     chkSi = '#' + this.id;
                     txtprecio_grilla = chkSi.replace('chkOK', 'txtPrecioLibre');
                     txtcantidad_grilla = chkSi.replace('chkOK', 'txtCantidad');
                     ddlLista_grilla = chkSi.replace('chkOK', 'ddlLista');
                     
                     $(txtcantidad_grilla).prop('disabled', true);
                     $(txtprecio_grilla).val('');
                     $(txtcantidad_grilla).val('');
                     $(ddlLista_grilla).val('4');

                     $(chkSi).prop('checked', false);
                       
         });
}

function F_MostrarTotales(){

var lblimporte_grilla='';
var chkDel='';
var Total=0;
var Igv=0;
var Subtotal=0;
var Cuerpo='#MainContent_';

     $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
             chkDel = '#' + this.id;
             lblimporte_grilla = chkDel.replace('chkEliminar', 'lblimporte');
             Total+=parseFloat($(lblimporte_grilla).text());
     });

    $(Cuerpo + 'txtTotal').val(Total.toFixed(2));
    $(Cuerpo + 'txtIgv').val((Total*parseFloat($(Cuerpo + 'ddligv').val())).toFixed(2));
    $(Cuerpo + 'txtSubTotal').val((Total/(1+parseFloat($(Cuerpo + 'ddligv').val()))).toFixed(2));

}

function F_EliminarTemporal(){

  try 
        {
        var chkSi='';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla='';
        
               
                $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcoddetalle_grilla = chkSi.replace('chkEliminar', 'lblcoddetalle');
                   
                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                       
                        CodDetalle: $(lblcoddetalle_grilla).text()
                        };
                                               
                        arrDetalle.push(objDetalle);
                    }
                });

            
                var Contenedor = '#MainContent_';
                var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                var objParams = {
                                  Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                  Filtro_TasaIgv: tasaigv,
                                  Filtro_CodigoTemporal: $('#hfCodigoTemporal').val()
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                MostrarEspera(true);    

                F_EliminarTemporal_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    if (result.split('~')[5]=='0')
                    {  
                        $('#MainContent_txtTotal').val('0.00');
                        $('#MainContent_txtIgv').val('0.00');
                        $('#MainContent_txtSubTotal').val('0.00');
                    }
                    else
                    {  
                        $('#MainContent_txtTotal').val(result.split('~')[5]);
                        $('#MainContent_txtIgv').val(result.split('~')[6]);
                        $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    }

                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
//                    if (result.split('~')[2]=='Se han eliminado los productos correctamente.')
//                    alertify.log('Se han eliminado los productos correctamente.');
                }
                else 
                {
                    alertify.log(result.split('~')[2]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);    
            alertify.log("Error Detectado: " + e);
        }
}

function F_ValidarEliminar(){

 try 
        {
        var chkSi='';
        var x=0;

                $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                               
                     if ($(chkSi).is(':checked')) 
                        x=1;
                        
               });

               if(x==0)
               {
               alertify.log("Seleccione un articulo para eliminar");
               return false;
               }
               else
               {return true;}
               
        }
        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
}

function F_ValidarGrabarDocumento(){

    try 
        {

        var Cuerpo='#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p> <br> <p></p>'; 

        if ($(Cuerpo + 'txtCliente').val()=='' || $('#hfCodCtaCte').val()==0)
                Cadena=Cadena + '<p></p>' + 'Cliente';
        
        if ($(Cuerpo + 'lblTC').text()=='0')
                Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtSerieOC').val()=='')
                Cadena=Cadena + '<p></p>' + 'Serie de OC';

        if ($(Cuerpo + 'txtNumeroOC').val()=='')
                Cadena=Cadena + '<p></p>' + 'Numero de OC';

        if ($(Cuerpo + 'txtEmision').val()=='')
                Cadena=Cadena + '<p></p>' + 'Fecha de Emision';
        
        if ($(Cuerpo + 'txtTotal').val()=='0.00')
                Cadena=Cadena + '<p></p>' + 'No ha ingresado ningun producto';

        if ($(Cuerpo + 'txtNroRuc').val().length !=8 && ValidarRuc($(Cuerpo + 'txtNroRuc').val()) == false)
                Cadena = Cadena + "<p></p>" + "Ruc Invalido"; 
         
        if ($(Cuerpo + 'txtNroRuc').val().length !=8 && $('#hfCodDistrito').val()==0)
                Cadena=Cadena + '<p></p>' + 'Distrito';

        if ($(Cuerpo + 'txtDireccion').val()=='')
                Cadena=Cadena + '<p></p>' + 'Direccion';
        
        if (Cadena != 'Ingresar los sgtes. Datos: <br> <p></p> <br> <p></p>')
        {alertify.log(Cadena);
        return false;}
        return true;
        }
        
    catch (e) 
        {

            alertify.log("Error Detectado: " + e);
             return true;
        }
}

function F_GrabarDocumento(){
  try 
        {
        var lblcodproducto_grilla='';
        var lblcodunidadventa_grilla='';
        var lblcosto_grilla='';
        var chkSi='';
        var txtcantidad_grilla='';
        var txtprecio_grilla='';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla='';
        var hfcosto_grilla='';
        var FlagGuia='0';
        var NotaPedido='0';
        var Contenedor = '#MainContent_';
        
        if ($(Contenedor + 'chkGuia').is(':checked'))
                FlagGuia='1';

        if ($(Contenedor + 'chkNotaPedio').is(':checked'))
                NotaPedido='1';
                
        var RazonSocial = $('#MainContent_txtCliente').val();

        if ($('#hfCodCtaCte').val() != 0) {
            var Index = $('#MainContent_txtCliente').val().indexOf('-');
            RazonSocial=RazonSocial.substr(RazonSocial.length - (RazonSocial.length -(Index+2)));
       }
                
                var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                var objParams = {
                                        Filtro_CodTipoDoc: 5,
                                        Filtro_SerieDoc: $(Contenedor + 'txtSerieOC').val(),
                                        Filtro_NumeroDoc: $(Contenedor + 'txtNumeroOC').val(),
                                        Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
                                        Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
                                        Filtro_CodCliente: $('#hfCodCtaCte').val(),
                                        Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
                                        Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
                                        Filtro_Igv: $(Contenedor + 'txtIgv').val(),
                                        Filtro_Total: $(Contenedor + 'txtTotal').val(),
                                        Filtro_CodProforma: 0,
                                        Filtro_CodGuia: 0,
                                        Filtro_Acuenta: 0,
                                        Filtro_FlagGuia:FlagGuia,
                                        Filtro_SerieGuia: $("#MainContent_ddlSerieGuia option:selected").text(),
                                        Filtro_NumeroGuia: $(Contenedor + 'txtNumeroGuia').val(),
                                        Filtro_FechaTraslado: $(Contenedor + 'txtFechaTraslado').val(),
                                        Filtro_Destino: $(Contenedor + 'txtDestino').val(),
                                        Filtro_CodTasa: $(Contenedor + 'ddlIgv').val() ,
                                        Filtro_TasaIgv: tasaigv,
                                        Filtro_NotaPedido:NotaPedido,
                                        Filtro_CodSerie:$(Contenedor + 'ddlSerie').val(),
                                        Filtro_Cliente: $(Contenedor + 'txtCliente').val(),
                                        Filtro_CodDetalle: $('#hfCodigoTemporal').val(),
                                        Filtro_CodTipoCliente:  1,
                                        Filtro_CodClaseCliente: 1,
                                        Filtro_CodDepartamento: $('#hfCodDepartamento').val(),
                                        Filtro_CodProvincia: $('#hfCodProvincia').val(),
                                        Filtro_CodDistrito: $('#hfCodDistrito').val(),
                                        Filtro_ApePaterno:'',
                                        Filtro_ApeMaterno: '',
                                        Filtro_Nombres: '',
                                        Filtro_RazonSocial: RazonSocial,
                                        Filtro_NroDni:'',
                                        Filtro_NroRuc: $(Contenedor + 'txtNroRuc').val(),
                                        Filtro_Direccion: $(Contenedor + 'txtDireccion').val() ,   
                                        Filtro_CodVendedor: $(Contenedor + 'ddlVendedor').val()          
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                MostrarEspera(true);    

                F_GrabarDocumento_NET(arg, function (result) {
    
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {                                               
                    if (str_mensaje_operacion=='Se Grabo Correctamente')
                    {
                         if (result.split('~')[4]!=0)
                            F_ImprimirControl(result.split('~')[4]);

                         alertify.log('SE GRABO CORRECTAMENTE');
                         F_Nuevo();              
                    }
                    else
                    {
                    alertify.log(result.split('~')[1]);
                    }
                   
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

function F_Nuevo(){

       $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
       $('.Jq-ui-dtp').datepicker('setDate', new Date());
       $('#MainContent_ddlMoneda').val('1');
       $('#MainContent_ddlFormaPago').val('11');
       $('#hfCodigoTemporal').val('0');
       $('#MainContent_txtCliente').val('');
       $('#MainContent_txtDireccion').val('');
       $('#MainContent_txtSerieOC').val('');
       $('#MainContent_txtNumeroOC').val('');
       $('#MainContent_txtSubTotal').val('0.00');
       $('#MainContent_txtIgv').val('0.00');
       $('#MainContent_txtTotal').val('0.00');
       $('#MainContent_txtDestino').val('');
       $('#MainContent_txtDistrito').val('');
       $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
           $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),7));
       $('#MainContent_txtArticulo').val('');
       $('#MainContent_chkGuia').prop('checked', false);
       $('#MainContent_chkServicios').prop('checked', false);
       $('#MainContent_chkNotaPedio').prop('checked', false);
       $('#MainContent_txtCliente').focus();
       $('#hfCodCtaCte').val('0');
       $('#MainContent_txtCliente').val('');
       $('#MainContent_txtDireccion').val('');
       $('#MainContent_txtNroRuc').val('');
       $('#MainContent_txtDistrito').val('');
       $('#hfCodDepartamento').val(0);
       $('#hfCodProvincia').val(0);
       $('#hfCodDistrito').val(0);
       $('#hfFlagSerie').val(0);
       try 
        {
              var objParams = {
                              Filtro_CodDoc: 16,
                              Filtro_CodSerie: 10
                              };

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
                    $('#MainContent_txtNumero').val(result.split('~')[3]);
                    $('#MainContent_txtNumeroGuia').val(result.split('~')[4]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[2]);     
                    $('.ccsestilo').css('background', '#FFFFE0');                      
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

function F_Buscar(){

       try 
        {
              var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';

              if ($('#MainContent_chkNumero').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
              chkCliente='1';
              
              var objParams = {
                                        Filtro_Serie: 'TODOS',
                                        Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                        Filtro_Desde: $('#MainContent_txtDesde').val(),
                                        Filtro_Hasta: $('#MainContent_txtHasta').val(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                        Filtro_CodTipoDoc: 5,
                                        Filtro_ChkNumero: chkNumero,
                                        Filtro_ChkFecha: chkFecha,
                                        Filtro_ChkCliente: chkCliente,
                                        Filtro_CodEstado: $('#MainContent_ddlEstado').val()
                                        
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);    
                F_Buscar_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {                  
                    F_Update_Division_HTML('div_consulta', result.split('~')[2]);                            
                      if (str_mensaje_operacion!='')                           
                    alertify.log(str_mensaje_operacion);   
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

function F_AnularRegistro(Fila) {
 try 
        {
    var imgID = Fila.id;
    var lblCodMarcaGv = '#' + imgID.replace('imgAnularDocumento', 'lblcodigo');
    var lblEstado = '#' + imgID.replace('imgAnularDocumento', 'lblEstado');
    var lblNumero = '#' + imgID.replace('imgAnularDocumento', 'lblNumero');
    var lblcliente_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblcliente');

          if ($(lblEstado).text()=="FACTURADO") 
    {alertify.log ("LA ORDEN DE COMPRA VENTA SE ENCUENTRA FACTURADO,PRIMERO ELIMINE LA FACTURA");
    return false;}

      if ($(lblEstado).text()=="CANCELADO PARCIAL") 
    {alertify.log ("LA ORDEN DE COMPRA VENTA SE ENCUENTRA CANCELADO PARCIAL,PRIMERO ELIMINE LA COBRANZA");
    return false;}

      if ($(lblEstado).text()=="CANCELADO TOTAL") 
    {alertify.log ("LA ORDEN DE COMPRA VENTA SE ENCUENTRA CANCELADO TOTAL,PRIMERO ELIMINE LA COBRANZA");
    return false;}

    if ($(lblEstado).text()=="ANULADO") 
    {alertify.log ("LA ORDEN DE COMPRA VENTA SE ENCUENTRA ANULADA");
    return false;}

    if(!confirm("ESTA SEGURO DE ANULAR LA ORDEN COMPRA DE VENTA : " + $(lblNumero).text() + "\n" + "DEL CLIENTE : " +  $(lblcliente_grilla).text()))
    return false;

     var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';

              if ($('#MainContent_chkNumero').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
              chkCliente='1';

    var objParams = {
                          Filtro_Codigo: $(lblCodMarcaGv).text(),
                          Filtro_Serie: 'TODOS',
                          Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                          Filtro_Desde: $('#MainContent_txtDesde').val(),
                          Filtro_Hasta: $('#MainContent_txtHasta').val(),
                          Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                          Filtro_CodTipoDoc: 5,
                          Filtro_ChkNumero: chkNumero,
                          Filtro_ChkFecha: chkFecha,
                          Filtro_ChkCliente: chkCliente,
                          Filtro_CodEstado: $('#MainContent_ddlEstado').val()
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
        
        catch (e) 
        {
        MostrarEspera(false);    
            alertify.log("Error Detectado: " + e);
            return false;
        }

 
}

function getContentTab()
{
    $('#MainContent_txtDesde').val(Date_AddDays($('#MainContent_txtHasta').val(), -7));
    $('#MainContent_chkRango').prop('checked', true);
    F_Buscar();
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

function F_TipoCambio(){
    try 
        {
              var objParams = {
                                Filtro_Emision: $("#MainContent_txtEmision").val()
                              };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                    MostrarEspera(true);

                F_TipoCambio_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                { $('#MainContent_lblTC').text(result.split('~')[2]);
                 $('#MainContent_lblTCOC').text(result.split('~')[2]);}
                   
                else 
                    alertify.log(result.split('~')[1]);
                
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

function F_FacturacionOC(HlkControlID) {
        var Contenedor = '#cphCuerpo_';
 

        CodNeumatico = $('#' + HlkControlID).text();
        lblestado_grilla = $('#' + HlkControlID.replace('lblnumero', 'lblestado')).text();
        lblcliente = $('#' + HlkControlID.replace('lblnumero', 'lblcliente')).text();
        lblcodigo = $('#' + HlkControlID.replace('lblnumero', 'lblcodigo')).text();
        hfCodCtaCte = $('#' + HlkControlID.replace('lblnumero', 'hfCodCtaCte')).val();
        hfCodMoneda = $('#' + HlkControlID.replace('lblnumero', 'hfCodMoneda')).val();
        lblSubTotal = $('#' + HlkControlID.replace('lblnumero', 'lblSubTotal')).text();
        lblIgv = $('#' + HlkControlID.replace('lblnumero', 'lblIgv')).text();
        lblDscto = $('#' + HlkControlID.replace('lblnumero', 'lblDscto')).text();
        lblTotal = $('#' + HlkControlID.replace('lblnumero', 'lblTotal')).text();
        
           if (lblestado_grilla=="ANULADO") 
    {alertify.log ("Este documento se encuentra anulado");
    return false;}

        try {
            var tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
            var objParams = {
                Filtro_CodMovimiento: lblcodigo,
                Filtro_TasaIgv:tasaigv,
                Filtro_CodSerie:58
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);

            F_FacturacionOC_NET(arg, function (result) {
                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1")
                {
                   
                       $('#divFacturacionOC').dialog({
                                resizable: false,
                                modal: true,
                                title: "Facturacion Nota de Venta",
                                title_html: true,
                                height: 620,
                                width: 900,
                                autoOpen: false
                        });
                        F_Update_Division_HTML('div_DetalleOC', result.split('~')[2]);
                        
                        $('#MainContent_txtProveedorOC').val(lblcliente);
                        $('#hfCodCtaCteOC').val(hfCodCtaCte);
                        $('#hfCodMovimiento').val(lblcodigo);
                        $('#MainContent_ddlMonedaOC').val(hfCodMoneda);
                        $('#MainContent_ddlFormaPagoOC').val(1);
                        $('#MainContent_ddlTipoDocumentoOC').val(1);
                        $('#MainContent_txtDsctoOC').val(result.split('~')[6]);
                        $('#MainContent_txtSubTotalOC').val(result.split('~')[5]);
                        $('#MainContent_txtIgvOC').val(result.split('~')[4]);
                        $('#MainContent_txtTotalOC').val(result.split('~')[3]);
                        $('#MainContent_txtNumeroOC').val(result.split('~')[8]);
                        F_FormaPago($("#MainContent_ddlFormaPagoOC").val());

                        $('#divFacturacionOC').dialog('open');
                        $('#MainContent_txtSerieOC').focus();
                        return false;

                }
                   
                else
                    alertify.log(result.split('~')[1]);

                return false;

            });
        }

        catch (e) {
            MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
            return false;
        }
    }

function F_ValidarStockGrilla_OC(ControlID) {

    
    var txtcantidad_Grilla = '';
    var lblstock = '';
    var txtcant_grilla = '';
    var boolEstado = false;
    var chkok_grilla = '';

    txtcantidad_Grilla = '#' + ControlID;
    chkok_grilla = txtcantidad_Grilla.replace('txtCantidadEntregada', 'chkEliminar');
    lblstock = txtcantidad_Grilla.replace('txtCantidadEntregada', 'lblcantidad');

    
    boolEstado = $(chkok_grilla).is(':checked');

    if (boolEstado &&  parseFloat($(txtcantidad_Grilla).val()) > parseFloat($(lblstock).text())) {
            alertify.log("Stock insuficiente");
            $(txtcantidad_Grilla).val($(lblstock).text());
            F_MostrarTotales_OC();
            return false;
    }
    if ($(txtcantidad_Grilla).val()=='')
        $(txtcantidad_Grilla).val($(lblstock).text());
    
    if (boolEstado==false)
     $(txtcantidad_Grilla).val($(lblstock).text());

    F_MostrarTotales_OC();
    return true;
}

function F_MostrarTotales_OC(){

var lblimporte_grilla='';
var chkDel='';
var Total=0;
var Igv=0;
var Subtotal=0;
     $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
             chkDel = '#' + this.id;
             if ($(chkDel).is(':checked'))
             {
             lblimporte_grilla = chkDel.replace('chkEliminar', 'lblimporte');
             txtCantidadEntregada = chkDel.replace('chkEliminar', 'txtCantidadEntregada');
             lblprecio = chkDel.replace('chkEliminar', 'lblprecio');
             Total+=parseFloat($(lblprecio).text() * $(txtCantidadEntregada).val());
             $(lblimporte_grilla).text($(lblprecio).text() * $(txtCantidadEntregada).val());
             }
         
     });
     var Cuerpo='#MainContent_'
    $(Cuerpo + 'txtTotalOC').val(Total.toFixed(2));
    $(Cuerpo + 'txtMontoOC').val(Total.toFixed(2));
    $(Cuerpo + 'txtIgvOC').val((Total/(1+parseFloat( $("#MainContent_ddlIgv option:selected").text())) * parseFloat( $("#MainContent_ddlIgv option:selected").text())).toFixed(2));
    $(Cuerpo + 'txtSubTotalOC').val((Total/(1+parseFloat( $("#MainContent_ddlIgv option:selected").text()))).toFixed(2));
    
}

function F_ValidarDevolucion(Mensaje){

 try 
        {
        var chkSi='';
        var x=0;

                $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                               
                     if ($(chkSi).is(':checked')) 
                        x=1;
                        
               });

               if(x==0)
               {
               alertify.log(Mensaje);
               return false;
               }
               else
               {return true;}
               
        }
        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
}

function F_Devolucion(){

  try 
        {
        var chkSi='';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla='';
        
               
                $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcoddetalle_grilla = chkSi.replace('chkEliminar', 'lblcoddetalle');
                    hfcodarticulo = chkSi.replace('chkEliminar', 'hfcodarticulo');
                    txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
                   
                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                        CodDetalle: $(lblcoddetalle_grilla).text(),
                        CodArticulo: $(hfcodarticulo).val(),
                        Cantidad: $(txtCantidadEntregada).val()
                        };
                                               
                        arrDetalle.push(objDetalle);
                    }
                });

            
                var Contenedor = '#MainContent_';
                var tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                var objParams = {
                                  Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                  Filtro_CodMovimiento: $('#hfCodMovimiento').val(),
                                  Filtro_TasaIgv:tasaigv
                                };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_Devolucion_NET(arg, function (result) {

                  MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#MainContent_txtMontoOC').val(result.split('~')[4]);
                    $('#MainContent_txtTotalOC').val(result.split('~')[4]);
                    $('#MainContent_txtIgvOC').val(result.split('~')[5]);
                    $('#MainContent_txtSubTotalOC').val(result.split('~')[6]);
                    $('#MainContent_txtDsctoTotalOC').val(result.split('~')[7]);
                    F_Update_Division_HTML('div_DetalleOC', result.split('~')[3]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                    //if (result.split('~')[2]=='Se grabo correctamente')
                    //alertify.log('Se grabo correctamente');
                }
                else 
                {
                    alertify.log(result.split('~')[2]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
              MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }
}

function F_ValidarCheck_OC(ControlID) {

    var txtprecio_Grilla = '';
    var ddlLista_grilla = '';
    var txtcant_grilla = '';
    var txtprecio_grilla = '';
    var boolEstado = false;
    var chkok_grilla='';


            
            chkok_grilla = '#' + ControlID;
            txtCantidadEntregada = chkok_grilla.replace('chkEliminar', 'txtCantidadEntregada');
            lblcantidad = chkok_grilla.replace('chkEliminar', 'lblcantidad');
                 
            boolEstado = $(chkok_grilla).is(':checked');
            if (boolEstado)
            {
               
                $(txtCantidadEntregada).prop('disabled', false);
                $(txtCantidadEntregada).focus();
            }
            else
            {
                $(txtCantidadEntregada).val($(lblcantidad).text());
                $(txtCantidadEntregada).prop('disabled', true);
            }
            
        F_MostrarTotales_OC();
    return true;
}

function F_GrabarOC(){

  try 
        {
        var chkSi='';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla='';
        var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';

              if ($('#MainContent_chkNumero').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
              chkCliente='1';
               
                $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcoddetalle_grilla = chkSi.replace('chkEliminar', 'lblcoddetalle');
                    hfcodarticulo = chkSi.replace('chkEliminar', 'hfcodarticulo');
                    txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
                    hfCodUndMedida = chkSi.replace('chkEliminar', 'hfCodUndMedida');
                    hfCosto = chkSi.replace('chkEliminar', 'hfCosto');
                    hfPRECIO = chkSi.replace('chkEliminar', 'hfPRECIO');

                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                        CodArticulo: $(hfcodarticulo).val(),
                        Cantidad: $(txtCantidadEntregada).val(),
                        CodUndMedida: $(hfCodUndMedida).val(),
                        PRECIO: $(hfPRECIO).val(),
                        Costo: $(hfCosto).val(),
                        CantidadEntregada: $(txtCantidadEntregada).val()
                        };
                                               
                        arrDetalle.push(objDetalle);
                    }
                });

            
                var Contenedor = '#MainContent_';
                var tasaigv=parseFloat($("#MainContent_ddlIgvOC option:selected").text()) + parseFloat(1);
                var objParams = {
                                        Filtro_CodTipoDoc: $(Contenedor + 'ddlTipoDocumentoOC').val(),
                                        Filtro_SerieDoc: $("#MainContent_ddlSerieOC option:selected").text(),
                                        Filtro_Serie: $("#MainContent_ddlSerieOC option:selected").text(),
                                        Filtro_NumeroDoc: $(Contenedor + 'txtNumeroOC').val(),
                                        Filtro_FechaEmision: $(Contenedor + 'txtEmisionOC').val(),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMonedaOC').val(),
                                        Filtro_CodCliente: $('#hfCodCtaCteOC').val(),
                                        Filtro_SubTotal: $(Contenedor + 'txtSubTotalOC').val(),
                                        Filtro_Igv: $(Contenedor + 'txtIgvOC').val(),
                                        Filtro_Total: $(Contenedor + 'txtTotalOC').val(),
                                        Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPagoOC').val(),
                                        Filtro_Descuento: $(Contenedor + 'txtDsctoOC').val(),
                                        Filtro_TipoCambio: $(Contenedor + 'lblTCOC').text(),
                                        Filtro_CodTasa: $(Contenedor + 'ddlIgvOC').val() ,
                                        Filtro_Periodo: $(Contenedor + 'txtPeriodoOC').val(),
                                        Filtro_FechaVencimiento: $(Contenedor + 'txtVctoOC').val(),
                                        Filtro_TasaIgv: tasaigv,
                                        Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                        Filtro_CodDocumentoVenta: $('#hfCodMovimiento').val(),
                                        Filtro_TasaIgv:tasaigv,
                                        Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                        Filtro_Desde: $('#MainContent_txtDesde').val(),
                                        Filtro_Hasta: $('#MainContent_txtHasta').val(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                        Filtro_ChkNumero: chkNumero,
                                        Filtro_ChkFecha: chkFecha,
                                        Filtro_ChkCliente: chkCliente,
                                        Filtro_CodSerie: $(Contenedor + 'ddlSerieOC').val()
                                };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_GrabarOC_NET(arg, function (result) {

                  MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#MainContent_txtMontoOC').val('');
                    $('#MainContent_txtTotalOC').val('');
                    $('#MainContent_txtIgvOC').val('');
                    $('#MainContent_txtSubTotalOC').val('');
                    $('#MainContent_txtDsctoTotalOC').val('');
                    $('#MainContent_txtSerieOC').val('');
                    $('#MainContent_txtNumeroOC').val('');
                                    
                    if (result.split('~')[1]=='Se grabo correctamente')
                    {
                    alertify.log('Se grabo correctamente');
                    F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                    $('#divFacturacionOC').dialog('close');
                    }
                    else
                    alertify.log('Se grabo correctamente');
                    
                }
                else 
                {
                    alertify.log(result.split('~')[2]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
              MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }
}

function F_ValidarGrabarDocumentoOC(){

    try 
        {

        var Cuerpo='#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p> <br> <p></p>'; 

        if ($(Cuerpo + 'txtProveedorOC').val()=='' || $('#hfCodCtaCteOC').val()==0)
                Cadena=Cadena + '<p></p>' + 'Proveedor';
        
        if ($(Cuerpo + 'lblTCOC').text()=='0')
                Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtSerieOC').val()=='')
                Cadena=Cadena + '<p></p>' + 'Serie de Factura';

        if ($(Cuerpo + 'txtNumeroOC').val()=='')
                Cadena=Cadena + '<p></p>' + 'Numero de Factura';

        if ($(Cuerpo + 'txtEmisionOC').val()=='')
                Cadena=Cadena + '<p></p>' + 'Fecha de Emision';

        if ($(Cuerpo + 'txtPeriodoOC').val()=='')
                Cadena=Cadena + '<p></p>' + 'Periodo';

        if ($(Cuerpo + 'txtTotalOC').val()=='' | $(Cuerpo + 'txtTotalOC').val()=='0.00')
                Cadena=Cadena + '<p></p>' + 'No ha ingresado ningun producto';


        if (Cadena != 'Ingresar los sgtes. Datos: <br> <p></p> <br> <p></p>')
        {alertify.log(Cadena);
        return false;}
        return true;
        }
        
    catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
}

function F_AgregarTemporalSerializacion(){

  try 
        {
              

        var Contenedor = '#MainContent_';
        var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);      
                var objParams = {
                                  Filtro_Serie: $(Contenedor + 'txtSerializacion').val(),
                                  Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                                  Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                  Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
                                  Filtro_NotaPedido: 0,
                                  Filtro_TasaIgv: tasaigv
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                MostrarEspera(true);

                F_AgregarTemporalSerializacion_NET(arg, function (result) {
        
                 MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    if (result.split('~')[2]=='Los Producto(s) se han agregado con exito')
                    {$('#MainContent_txtSerializacion').val('');
                    $('#MainContent_txtSerializacion').focus('');
                    }
                     
                     else
                    alertify.log(result.split('~')[2]);

                }
                else 
                {
                     if (result.split('~')[2]=='Los Producto(s) se han agregado con exito')
                    {$('#MainContent_txtSerializacion').val('');
                    $('#MainContent_txtSerializacion').focus('');
                    }
                     
                }

                return false;

                });
        }
        
        catch (e) 
        {
        MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }
}

function F_EliminarSerie(Fila) {
 try 
        {
               if ($('#hfFlagSerie').val()==1)
        return false;

    var imgID = Fila.id;
    var lblID = '#' + imgID.replace('imgEliminar', 'lblID');
    var hfCodDetDocumentoVenta = '#' + imgID.replace('imgEliminar', 'hfCodDetDocumentoVenta');
    var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

    var objParams = {
                          Filtro_CodTemporalSerializacionDet: $(lblID).text(),
                          Filtro_CodDetDocumentoVenta: $(hfCodDetDocumentoVenta).val(),
                          Filtro_CodDetalle: $(hfCodDetDocumentoVenta).val()
                         
    };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                MostrarEspera(true);
                F_EliminarSerie_Net(arg, function (result) {
                MostrarEspera(false);
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
    
                   if (str_resultado_operacion == "1") {
                            $('#hfSerie').val(1);    
                            F_Update_Division_HTML('div_GrillaSerieDetalle', result.split('~')[3]);
                            return false;
                    }
        else {
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

function F_VerSeries(HlkControlID) {
      
        var CodDetalle = '';
                       
         CodDetalle = $('#' + HlkControlID).text();

        try {
            var objParams = {
                Filtro_CodDetalle: CodDetalle
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);

            F_VerSeries_NET(arg, function (result) {
                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1")
                {
                   
                   F_Update_Division_HTML('div_GrillaSerieDetalle', result.split('~')[2]) ;                   
                    if (str_mensaje_operacion != "")
                    {
                       alertify.log(str_mensaje_operacion);
                    }
                    else
                    {
                               
                     $('#div_SerieDetalle').dialog({
                         resizable: false,
                         modal: true,
                         title: "Series",
                         title_html: true,
                         height: 320,
                         width: 400,
                         autoOpen: false
                    });

                        $('#div_SerieDetalle').dialog('open');
                        $('#hfFlagSerie').val(0);
                    }
                            
                    return false;
                }
                   
                else
                {
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

function F_ActualizarPrecio(Fila) {
        try {
            var txtPrecio = '#' + Fila;
            var lblcoddetalle = txtPrecio.replace('txtPrecio', 'lblcoddetalle');
            var hfPrecio = txtPrecio.replace('txtPrecio', 'hfPrecio');
            var hfCantidad = txtPrecio.replace('txtPrecio', 'hfCantidad');
            var txtCantidad = txtPrecio.replace('txtPrecio', 'txtCantidad');
            var lblProducto = txtPrecio.replace('txtPrecio', 'lblProducto');

            if (parseFloat($(txtPrecio).val()) == parseFloat($(hfPrecio).val()) & parseFloat($(txtCantidad).val()) == parseFloat($(hfCantidad).val())) {
                $(txtPrecio).val(parseFloat($(txtPrecio).val()).toFixed(2));
                $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));
                return false;
            }

            var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

            var objParams = {
                Filtro_Precio: $(txtPrecio).val() / tasaigv,
                Filtro_Cantidad: $(txtCantidad).val(),
                Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                Filtro_CodDetDocumentoVenta: $(lblcoddetalle).text(),
                Filtro_Descripcion: $(lblProducto).text().replace("&", "&amp;"),
                Filtro_TasaIgv: tasaigv,
                Filtro_NotaPedido: 0
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);
            F_ActualizarPrecio_Net(arg, function (result) {

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];
                MostrarEspera(false);
                if (str_mensaje_operacion == "") {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    if (result.split('~')[5] == '0') {
                        $('#MainContent_txtTotal').val('0.00');
                        $('#MainContent_txtIgv').val('0.00');
                        $('#MainContent_txtSubTotal').val('0.00');
                    }
                    else {
                        $('#MainContent_txtTotal').val(result.split('~')[5]);
                        $('#MainContent_txtIgv').val(result.split('~')[6]);
                        $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    }

                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                }
                else {
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
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

function F_BuscarTemporal(){

  try 
        {
        if ($('#hfSerie').val()==0)
        return false;

        var Contenedor = '#MainContent_';
                var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                var objParams = {
                                        Filtro_TasaIgv: tasaigv,
                                        Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                                        Filtro_NotaPedido: 0
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                MostrarEspera(true);

                F_BuscarTemporal_NET(arg, function (result) {
        
                 MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    F_Update_Division_HTML('div_GrillaSerieDetalle', result.split('~')[8]);
                    $('#hfSerie').val(0);
               }
                else 
                {
                    alertify.log(result.split('~')[2]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
        MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }
}

function F_Comision(Fila) {
try
{
            var lblTotal =  '#' + Fila;
            var lblcodigo = lblTotal.replace('lblTotal', 'lblcodigo');
            var lblNumero = lblTotal.replace('lblTotal', 'lblnumero');
            $('#hfCodDocumentoVentaComision').val($(lblcodigo).text());
            var Cuerpo='#MainContent_';

            var objParams = {
                Filtro_CodDocumentoVenta: $(lblcodigo).text()
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);

            F_Comision_NET(arg, function (result) {
                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_mensaje_operacion == "")
                {
                       $('#hfCodComision').val(result.split('~')[2]);
                       
                       $('#MainContent_ddlVendedor').val(result.split('~')[4]);
                       if (result.split('~')[5]=='')
                       $('#MainContent_txtFactura').val($(lblNumero).text());
                       else
                       $('#MainContent_txtFactura').val(result.split('~')[5]);

                       $('#MainContent_txtComision').val(parseFloat(result.split('~')[6]).toFixed(2));

                       if (parseFloat(result.split('~')[7]).toFixed(2) == 0.00)
                        $('#MainContent_txtTotalFactura').val($(lblTotal).text());
                       else
                      $('#MainContent_txtTotalFactura').val(parseFloat(result.split('~')[7]).toFixed(2));
                           $("#div_Comision").dialog({
                    resizable: false,
                    modal: true,
                    title: "Comision",
                    title_html: true,
                    height: 200,
                    width: 400,
                    autoOpen: false
            });

                       $('#div_Comision').dialog('open');
                       return false;
                }
                else
                { 
                    alertify.log(str_mensaje_operacion);
                    return false;

                }
             });
            
           
            
        
  
                   
            return false;

        }
        
        catch (e) 
        {

            alertify.log("Error Detectado: " + e);
            return false;
        }

}

function F_GrabarComision(){

  try 
        {
        var Contenedor = '#MainContent_';

        if ($('#hfCodComision').val()!=0)
        {alertify.log ("La factura tiene una comision registrada"); return false;}

        if ($(Contenedor + 'txtComision').val()=='0.00' || $(Contenedor + 'txtComision').val()=='')
         {alertify.log ("Ingrese la comision"); return false;}
      
       if (parseFloat($(Contenedor + 'txtComision').val()) > parseFloat($(Contenedor + 'txtTotalFactura').val()))
         {alertify.log ("La comision no debe ser mayor que la venta"); return false;}
      

                 var objParams = {
                                        Filtro_CodDocumentoVenta: $('#hfCodDocumentoVentaComision').val(),
                                        Filtro_CodVendedor: $(Contenedor + 'ddlVendedor').val(),
                                        Filtro_Comision: $(Contenedor + 'txtComision').val(),
                                        Filtro_TotalFactura: $(Contenedor + 'txtTotalFactura').val(),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val()
                                                                           
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                MostrarEspera(true);

                F_GrabarComision_NET(arg, function (result) {
                
                  MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    if (str_mensaje_operacion=='Se grabo correctamente.')
                    {
                     alertify.log('Se grabo Correctamente');
                     $(Contenedor + 'txtComision').val('0.00');
                     $('#hfCodComision').val(0)
                     $('#div_Comision').dialog('close');
                    }
                    else
                    {
                   alertify.log(str_mensaje_operacion);
                    return false;
                    }
                   
                }
                else 
                {
                    alertify.log(result.split('~')[1]);
                    return false;
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

function F_VerPrecioMinimo(HlkControlID) {
    var Contenedor = '#MainContent_';



    $(Contenedor + 'txtPrecioMinimo').val($('#' + HlkControlID.replace('lblMoneda', 'lblPrecio2')).val());
    $(Contenedor + 'txtMoneda').val($('#' + HlkControlID).text());

    $('#div_PrecioMinimo').dialog({
        resizable: false,
        modal: true,
        title: "Precio Minimo",
        title_html: true,
        height: 100,
        width: 300,
        autoOpen: false
    });

    $('#div_PrecioMinimo').dialog('open');


}

function F_ImprimirGuia(Fila) {

    var imgID = Fila.id;
    var lblCodigo = '#' + imgID.replace('imgImprimir', 'hfCodGuia');
    var lblEstado = '#' + imgID.replace('imgImprimir', 'lblestado');
   
    if ($(lblEstado).text()=='ANULADO')
    {
        alertify.log("La factura se encuentra anulada");
        return false;
    }

    if ($(lblCodigo).val()=='0')
    {
        alertify.log("La factura no tiene guia adjunta");
        return false;
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '200';


    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + $(lblCodigo).val() + '&' ;
      
    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function ValidarRuc(valor) {
            valor = trim(valor)
            if (esnumero(valor)) {
                if (valor.length == 8) {
                    suma = 0
                    for (i = 0; i < valor.length - 1; i++) {

                        if (i == 0) suma += (digito * 2)
                        else suma += (digito * (valor.length - i))
                    }
                    resto = suma % 11;
                    if (resto == 1) resto = 11;
                    if (resto + (valor.charAt(valor.length - 1) - '0') == 11) {
                        return true
                    }
                } else if (valor.length == 11) {
                    suma = 0
                    x = 6
                    for (i = 0; i < valor.length - 1; i++) {
                        if (i == 4) x = 8
                        digito = valor.charAt(i) - '0';
                        x--
                        if (i == 0) suma += (digito * x)
                        else suma += (digito * x)
                    }
                    resto = suma % 11;
                    resto = 11 - resto

                    if (resto >= 10) resto = resto - 10;
                    if (resto == valor.charAt(valor.length - 1) - '0') {
                        return true
                    }
                }
            }
            return false
        }

function esnumero(campo) { return (!(isNaN(campo))); }

function F_VerSeries_Factura(HlkControlID) {
      
        var CodDetalle = '';
                       
        CodDetalle = $('#' + HlkControlID).text();

        try {
            var objParams = {
                Filtro_CodDetalle: CodDetalle
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);

            F_VerSeries_Factura_NET(arg, function (result) {
                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1")
                {
                    $('#hfFlagSerie').val(1);
                   F_Update_Division_HTML('div_GrillaSerieDetalle', result.split('~')[2]) ;                   
                    if (str_mensaje_operacion != "")
                    {
                       alertify.log(str_mensaje_operacion);
                    }
                    else
                    {
                               
                     $('#div_SerieDetalle').dialog({
                         resizable: false,
                         modal: true,
                         title: "Series",
                         title_html: true,
                         height: 320,
                         width: 400,
                         autoOpen: false
                    });
                   
                 
                    $('#div_SerieDetalle').dialog('open');
                    
                    }
                            
                    return false;
                }
                   
                else
                {
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

function F_EliminarRegistro(Fila) {
 try 
        {
    var imgID = Fila.id;
    var lblCodMarcaGv = '#' + imgID.replace('imgEliminarDocumento', 'lblcodigo');
    var lblEstado = '#' + imgID.replace('imgEliminarDocumento', 'lblEstado');
    var lblnumero_grilla = '#' + imgID.replace('imgEliminarDocumento', 'lblNumero');
    var lblcliente_grilla = '#' + imgID.replace('imgEliminarDocumento', 'lblcliente');
    
    if ($(lblEstado).text()=="FACTURADO") 
    {alertify.log ("LA ORDEN DE COMPRA VENTA SE ENCUENTRA FACTURADO,PRIMERO ELIMINE LA FACTURA");
    return false;}

      if ($(lblEstado).text()=="CANCELADO PARCIAL") 
    {alertify.log ("LA ORDEN DE COMPRA VENTA SE ENCUENTRA CANCELADO PARCIAL,PRIMERO ELIMINE LA COBRANZA");
    return false;}

      if ($(lblEstado).text()=="CANCELADO TOTAL") 
    {alertify.log ("LA ORDEN DE COMPRA VENTA SE ENCUENTRA CANCELADO TOTAL,PRIMERO ELIMINE LA COBRANZA");
    return false;}

    if(!confirm("ESTA SEGURO DE ELIMINAR LA ORDEN DE COMPRA VENTA : " + $(lblnumero_grilla).text() + "\n" + "DEL CLIENTE : " +  $(lblcliente_grilla).text()))
    return false;

     var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';

              if ($('#MainContent_chkNumero').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
              chkCliente='1';

    var objParams = {
                          Filtro_Codigo: $(lblCodMarcaGv).text(),
                          Filtro_Serie: 'TODOS',
                          Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                          Filtro_Desde: $('#MainContent_txtDesde').val(),
                          Filtro_Hasta: $('#MainContent_txtHasta').val(),
                          Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                          Filtro_CodTipoDoc: 5,
                          Filtro_ChkNumero: chkNumero,
                          Filtro_ChkFecha: chkFecha,
                          Filtro_ChkCliente: chkCliente,
                          Filtro_CodEstado: $('#MainContent_ddlEstado').val()
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
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);      
                alertify.log(result.split('~')[1]);
        }
        else {
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

function F_ActualizarCantidad(Fila) {
 try 
        {
            var txtCantidad =  '#' + Fila;           
            var lblcoddetalle = txtCantidad.replace('txtCantidad', 'lblcoddetalle');
            var hfPrecio = txtCantidad.replace('txtCantidad', 'hfPrecio');
            var hfCantidad = txtCantidad.replace('txtCantidad', 'hfCantidad');
            var txtPrecio = txtCantidad.replace('txtCantidad', 'txtPrecio');
            var hfStock = txtCantidad.replace('txtCantidad', 'hfStock');
            var lblProducto = txtCantidad.replace('txtCantidad', 'lblProducto');

            if(parseFloat($(txtPrecio).val())==parseFloat($(hfPrecio).val()) & parseFloat($(txtCantidad).val())==parseFloat($(hfCantidad).val()))
            {
                $(txtPrecio).val(parseFloat($(txtPrecio).val()).toFixed(2));
                $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));
                return false;
            }

            if(parseFloat($(hfStock).val())<parseFloat($(txtCantidad).val()))
            {               
                $(txtCantidad).val(parseFloat($(hfCantidad).val()).toFixed(2));
                return false;
            }
            
            var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

            var objParams = {
                              Filtro_Precio: $(txtPrecio).val()/tasaigv,
                              Filtro_Cantidad: $(txtCantidad).val(),
                              Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),                              
                              Filtro_CodDetDocumentoVenta: $(lblcoddetalle).text(),
                              Filtro_Descripcion: $(lblProducto).text().replace("&", "&amp;"),
                              Filtro_TasaIgv: tasaigv,
                              Filtro_NotaPedido: 0
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);
            F_ActualizarPrecio_Net(arg, function (result) {

                            var str_resultado_operacion = "";
                            var str_mensaje_operacion = "";

                            str_resultado_operacion = result.split('~')[0];
                            str_mensaje_operacion = result.split('~')[1];
                MostrarEspera(false);
                if (str_mensaje_operacion == "") {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    if (result.split('~')[5]=='0')
                    {
                     $('#MainContent_txtTotal').val('0.00');
                    $('#MainContent_txtIgv').val('0.00');
                    $('#MainContent_txtSubTotal').val('0.00');
                    }
                    else
                    {
                      $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    }
                   
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                }
                else {
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
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

function F_ActualizarDescripcion(Fila) {
 try 
        {            
            var txtDescripcion =  '#' + Fila;
            var Clave = "" ;
            var lblcoddetalle = txtDescripcion.replace('txtDescripcion', 'lblcoddetalle');
            var hfPrecio = txtDescripcion.replace('txtDescripcion', 'hfPrecio');
            var hfCantidad = txtDescripcion.replace('txtDescripcion', 'hfCantidad');
            var txtPrecio = txtDescripcion.replace('txtDescripcion', 'txtPrecio');
            var txtClaveGrilla = txtDescripcion.replace('txtDescripcion', 'txtClaveGrilla');
            var hfDescripcion = txtDescripcion.replace('txtDescripcion', 'hfDescripcion');
            var txtCantidad = txtDescripcion.replace('txtDescripcion', 'txtCantidad');
            var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
            if($(txtDescripcion).val().trim()=="")
            {
            $(txtDescripcion).val($(hfDescripcion).val());
            return false;
            }
            var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

            var objParams = {
                              Filtro_Precio: $(txtPrecio).val() / tasaigv,
                              Filtro_Cantidad: $(txtCantidad).val(),
                              Filtro_Descripcion: $(txtDescripcion).val(),
                              Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                              Filtro_CodDetDocumentoVenta: $(lblcoddetalle).text(),
                              Filtro_TasaIgv: tasaigv,
                              Filtro_NotaPedido: 0                              
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);
            F_ActualizarPrecio_Net(arg, function (result) {

                            var str_resultado_operacion = "";
                            var str_mensaje_operacion = "";

                            str_resultado_operacion = result.split('~')[0];
                            str_mensaje_operacion = result.split('~')[1];
                MostrarEspera(false);
                if (str_mensaje_operacion == "") {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    if (result.split('~')[5]=='0')
                    {
                        $('#MainContent_txtTotal').val('0.00');
                        $('#MainContent_txtIgv').val('0.00');
                        $('#MainContent_txtSubTotal').val('0.00');
                    }
                    else
                    {
                        $('#MainContent_txtTotal').val(result.split('~')[5]);
                        $('#MainContent_txtIgv').val(result.split('~')[6]);
                        $('#MainContent_txtSubTotal').val(result.split('~')[7]);                        
                    }                
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                }
                else {
                     F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                     $('.ccsestilo').css('background', '#FFFFE0');
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

function F_ImprimirControl(Codigo) {
        var rptURL = '';
        var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
        var TipoArchivo = 'application/pdf';
        var CodTipoArchivo = '5';
        var CodMenu = '209';

        rptURL = '../Reportes/Crystal.aspx';
        rptURL = rptURL + '?';
        rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
        rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
        rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
        rptURL = rptURL + 'CodControlInternoAlmacenCab=' + Codigo + '&';

        window.open(rptURL, "PopUpRpt", Params);


}

function F_ImprimirControlInterno(Fila) {
    var imgID = Fila.id;
    var hfCodControlInternoAlmacenCab = '#' + imgID.replace('imgTexto', 'hfCodControlInternoAlmacenCab');
    var lblEstado = '#' + imgID.replace('imgTexto', 'lblestado');

    if ($(lblEstado).text() == 'ANULADO') {
        alertify.log("La factura se encuentra anulada");
        return false;
    }

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '209';


    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'CodControlInternoAlmacenCab=' + $(hfCodControlInternoAlmacenCab).val() + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}
