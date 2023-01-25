var AppSession = "../CuentasPorPagar/RegistroPagos.aspx";
var CodigoMenu = 7000; var CodigoInterno = 1;

var Buscando = false;

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#MainContent_txtProveedor').autocomplete({

        source: function (request, response) {
        
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 2 + "','CodTipoCliente':'0'}",
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
                    toastr.warning(response.responseText);
                },
                failure: function (response) {
                    toastr.warning(response.responseText);
                }
            });
        },
        select: function (e, i) {
            Buscando = true;
            $('#hfCodCtaCte').val(i.item.val);          
            $('#hfCliente').val(i.item.label);          

            if (F_ValidarAgregar() === true)

                F_AgregarTemporal();
        },
        minLength: 3
    });

    $('#MainContent_txtProveedorConsulta').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 2 + "','CodTipoCliente':'0'}",
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
                    toastr.warning(response.responseText);
                },
                failure: function (response) {
                    toastr.warning(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfCodCtaCteConsulta').val(i.item.val);
        },
        minLength: 3
    });

    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        maxDate: '0'
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

    $('#MainContent_imgBuscar').click(function () {
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
                  toastr.warning(cadena);
                  return false;
              }

              F_Buscar_Productos() 
        }
        catch (e) {

            toastr.warning("Error Detectado: " + e);
        }


        return false;

    });

    $('#MainContent_btnFiltrar').click(function () {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
    if (F_ValidarAgregar())
        F_AgregarTemporal();

        return false;       
    });  

    $('#btnGrabarEdicion').click(function () {
    if (F_ValidarAgregar())
        F_AgregarTemporal();

        return false;       
    });  

    $('#MainContent_btnLimpiarFiltros').click(function () {
        F_Inicializar_Filtros();
        return false;
       
    });  
    
    $('#MainContent_btnAgregar').click(function () {
     try 
        {
            if ($('#hfCobranzas').val()==0)
            { 
                if (!F_ValidarAgregar())
                    return false;
                F_AgregarTemporal();
            }
            else
            {
                if (!F_ValidarAgregarFacturaCobranzas())
                    return false;
                F_AgregarTemporalCobranzas();        
            }
            return false;
        }        
        catch (e) 
        {
            toastr.warning("Error Detectado: " + e);
        }     
        });

    $('#MainContent_btnEliminarFactura').click(function () {
     try 
        {
            if(!F_ValidarEliminar_Factura())
              return false;

            if (confirm("ESTA SEGURO DE ELIMINAR LAS FACTURAS SELECCIONADAS"))
            F_EliminarTemporal_Factura();

            return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnGrabar').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Insertar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
     try 
        {
            if(!F_ValidarGrabarDocumento())
              return false;

            if (confirm("ESTA SEGURO DE GRABAR EL PAGO"))
            F_GrabarDocumento();

            return false;
        }        
        catch (e) 
        {
            toastr.warning("Error Detectado: " + e);
        }
             
        });

    $('#MainContent_btnEdicionMedioPago').click(function () {

        var Cuerpo = '#MainContent_';

        if ($(Cuerpo + 'ddlMedioPagoEdicion').val() != '1' & $('#MainContent_ddlCuentaEdicion option:selected').text() == '' )
         {
            toastr.warning('DEBE ESPECIFICAR UNA CUENTA VALIDA');
            return false;
         };

        if ($(Cuerpo + 'ddlMedioPagoEdicion').val() === '1' & $('#MainContent_ddlCuentaEdicion option:selected').text() != '' )
         {
            toastr.warning('EFECTIVO NO DEBE ESPECIFICAR NRO DE CUENTAS');
            return false;
         };

        if ($(Cuerpo + 'ddlMedioPagoEdicion').val() != '1' & $('#MainContent_txtNroOperacionEdicion').val() == '')
        {
            toastr.warning('DEBE ESPECIFICAR UN NUMERO DE OPERACION');
            return false;
        }

        if ($(Cuerpo + 'ddlMedioPagoEdicion').val() === '1' & $('#MainContent_ddlCuentaEdicion option:selected').text() != '' )
        {
            toastr.warning('EFECTIVO NO DEBE ESPECIFICAR UN NUMERO DE OPERACION');
            return false;
        }


           if (($(Cuerpo + 'ddlMedioPagoEdicion').val()!='1' & $(Cuerpo + 'ddlMedioPagoEdicion').val()!='5' & $(Cuerpo + 'ddlMedioPagoEdicion').val()!='6') && $(Cuerpo + 'txtNroOperacionEdicion').val()=='') {
                toastr.warning('Nro Operacion');
                return false;
            }

            if (($(Cuerpo + 'ddlMedioPagoEdicion').val()!='1' & $(Cuerpo + 'ddlMedioPagoEdicion').val()!='5' & $(Cuerpo + 'ddlMedioPagoEdicion').val()!='6') && $(Cuerpo + 'ddlCuentaEdicion').val()==null) {
                toastr.warning('Nro Cuenta');
                return false;
            }

            if (($(Cuerpo + 'ddlMedioPagoEdicion').val()!='1' & $(Cuerpo + 'ddlMedioPagoEdicion').val()!='5' & $(Cuerpo + 'ddlMedioPagoEdicion').val()!='6') && $(Cuerpo + 'ddlCuentaEdicion').val()==null) {
                toastr.warning('Nro Cuenta');
                return false;
            }

            if ($(Cuerpo + 'ddlMedioPagoEdicion').val() =='6') {
                toastr.warning('NO SE PUEDE TRANSFORMAR LA COBRANZA EN CANJE');
                return false;
            }


        if (confirm("ESTA SEGURO DE EDITAR LOS MEDIOS DE PAGO"))
        F_EdicionMedioPago();

        return false;
       
    });  

    $('#MainContent_btnNuevo').click(function () {
     try 
        {
          F_Nuevo();
          
          return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnBuscarConsulta').click(function () {
     try 
        {
          F_Buscar();
          return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnGrabarLetra').click(function () {
     try 
        {
            if(F_ValidarAgregarLetra()==false)
              return false;

            if (confirm("Esta Seguro de Agregar la Letra"))
            F_AgregarLetra();
//                F_Nuevo();
//            }
            return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnEliminarLetra').click(function () {
     try 
        {
            if(F_ValidarEliminar_Letra()==false)
              return false;

            if (confirm("Esta seguro de eliminar la(s) letra(s) seleccionada(s)"))
            F_EliminarTemporal_Letra();

            return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnCobranzas').click(function () {
        try 
        {
          var Cadena = "Ingrese los sgtes. campos: "     
          if ($('#hfCodCtaCte').val()=="0")
          Cadena=Cadena + '<p></p>' + "Razon Social";

          if (Cadena != "Ingrese los sgtes. campos: ")
          {toastr.warning(Cadena);
          return false;
          }
          
                $("#divConsultaFactura").dialog({
                    resizable: false,
                    modal: true,
                    title: "Consulta de Factura",
                    title_html: true,
                    height: 450,
                    width: 420,
                    autoOpen: false
                });

                $('#divConsultaFactura').dialog('open');
               
                var Letra=0;
                var Factura=0;

                if ($('#MainContent_chkFactura').is(':checked'))
                Factura=1;

                if ($('#MainContent_chkFactura').is(':checked'))
                Letra=1;

                 var objParams = {
                                    Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                                    Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                                    Filtro_Letra: Letra,
                                    Filtro_Factura: Factura
                                 };
                 var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                  MostrarEspera(true);

                F_Buscar_FacturaPagos_NET(arg, function (result) {


                 MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    $('#hfCobranzas').val(1);

                if (str_resultado_operacion == "1") 
                {
                  
                    F_Update_Division_HTML('div_grvConsultaFactura', result.split('~')[2]);                            
                $('#hfCobranzas').val(1);     
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }

                return false;

                });


        }
        catch (e) {
         MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
        }


        return false;

    });  

    $('#MainContent_btnCobranzasEliminar').click(function () {
     try 
        {
            if(!F_ValidarEliminar_FacturaCobranza())
              return false;

            if (confirm("ESTA SEGURO DE ELIMINAR LAS FACTURAS SELECCIONADAS"))
            F_EliminarTemporal_FacturaCobranza();

            return false;
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnNotaVenta').click(function () {
        try 
        {
          var Cadena = "Ingrese los sgtes. campos:  <br> <p></p>"     


//           if ($('#hfCodCtaCte').val()=="4479")
//             $('#hfCodCtaCte').val("3873");

//          if ($('#hfCodCtaCte').val()!="3873")
//          Cadena=Cadena + '<p></p>' + "Cliente Varios";

          if (Cadena != "Ingrese los sgtes. campos:  <br> <p></p>")
          {toastr.warning(Cadena);
          return false;
          }
          
                $("#divConsultaFactura").dialog({
                    resizable: false,
                    modal: true,
                    title: "Consulta de Nota de Venta",
                    title_html: true,
                    height: 450,
                    width: 450,
                    autoOpen: false
                });

                $('#divConsultaFactura').dialog('open');               

                 var objParams = {
                                    Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                                    Filtro_Total: '700'
                                 };
                 var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_Buscar_NotaVenta_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                  
                    F_Update_Division_HTML('div_grvConsultaFactura', result.split('~')[2]);   
                     $('#hfNotaVenta').val(0);                         
                  
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }

                return false;

                });


        }
        catch (e) {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
        }


        return false;

    }); 

    $('#MainContent_btnGrabarEditar').click(function () {   
        if ($('#hfCodTipoDoc').val()==3  || $('#hfCodTipoDoc').val()==8)
            $('#MainContent_txtAcuentaEdicion').val(Math.abs($('#MainContent_txtAcuentaEdicion').val()) * -1);
        F_EditarDetalle();
        return false;   
    });  

    $('#MainContent_txtEmision').on('change', function (e) {
        F_ListarNroCuenta($("#MainContent_ddlFormaPago").val());
        F_TipoCambio();
    });

    $('#MainContent_txtAmortizacion').blur(function () {
     if ($('#MainContent_txtAmortizacion').val()=='')
     $('#MainContent_txtAmortizacion').val('0.00');

     $('#MainContent_txtTotalPago').val(parseFloat(parseFloat($('#MainContent_txtAmortizacion').val()) + parseFloat($('#MainContent_txtTotalFactura').val())).toFixed(3));
     $('#MainContent_txtAmortizacion').val(parseFloat($('#MainContent_txtAmortizacion').val()).toFixed(3));
     return false;
    });

    $('#MainContent_chkFactura').change(function () {
        if ($(this).is(":checked")) {
            $(this).prop("checked", true);
            $('#MainContent_chkLetra').prop("checked", false);
        }
        else
        { $(this).prop("checked", true); }
    });

    $('#MainContent_chkLetra').change(function () {
        if ($(this).is(":checked")) {
            $(this).prop("checked", true);
            $('#MainContent_chkFactura').prop("checked", false);
        }
        else
        { $(this).prop("checked", true); }
    });

    $("#MainContent_chkCComision").change(function () {
        if (this.checked)  {
          $('#MainContent_chkSComision').prop('checked', false);        
          $('#MainContent_txtComision').prop('disabled', false);   
          $('#MainContent_txtComision').val(5); }
    });

    $("#MainContent_chkSComision").change(function () {
        if (this.checked) {
          $('#MainContent_chkCComision').prop('checked', false);      
          $('#MainContent_txtComision').prop('disabled', true);   
          $('#MainContent_txtComision').val(0); }
    });
    
    $("#MainContent_chkFiltroFecha").click(function () {
        if ($(this).is(':checked')) {
            $('#MainContent_txtFiltroFechaDesde').prop('disabled', false);
            $('#MainContent_txtFiltroFechaHasta').prop('disabled', false);
        }
        else {
            $('#MainContent_txtFiltroFechaDesde').prop('disabled', true);
            $('#MainContent_txtFiltroFechaHasta').prop('disabled', true);
        }
    });
    
    $("#MainContent_chkFiltroMonto").click(function () {
        if ($(this).is(':checked')) {
            $('#MainContent_txtFiltroMontoDesde').prop('disabled', false);
            $('#MainContent_txtFiltroMontoHasta').prop('disabled', false);
            $('#MainContent_txtFiltroMontoDesde').val('0');
            $('#MainContent_txtFiltroMontoHasta').val('99999');
        }
        else {
            $('#MainContent_txtFiltroMontoDesde').prop('disabled', true);
            $('#MainContent_txtFiltroMontoHasta').prop('disabled', true);
            $('#MainContent_txtFiltroMontoDesde').val('');
            $('#MainContent_txtFiltroMontoHasta').val('');
        }
    });

    $("#MainContent_txtProveedor").bind("propertychange change keyup paste input", function(){
        if ($("#MainContent_txtProveedor").val() != $("#hfCliente").val() & $("#hfCodCtaCte").val() != '0' & Buscando == false)
        {
        if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
            $("#MainContent_txtProveedor").val('');
            $("#hfCliente").val('');
            $("#hfCodCtaCte").val('0');
            toastr.warning('paso por aca');
            F_Nuevo();
        }
    });
    
    $('#MainContent_txtAcuentaEdicion').blur(function () {
    F_CalcularEdicion(); 
    return true;
});
    
    $('#MainContent_txtTCEdicion').blur(function () {
    F_CalcularEdicion();
    return true;
});

    $(document).on("change", "select[id $= 'MainContent_ddlMedioPago']",function () {

    if ($("#MainContent_ddlMedioPago").val() === '3' | $("#MainContent_ddlMedioPago").val() === '4') {
        $("#td_DatosBancarios").css('display', 'block');
    }
    else
    {
        $("#td_DatosBancarios").css('display', 'none');
    }
    return true;
});

    $('#MainContent_btnAnular').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
            try {
                if ($.trim($('#MainContent_txtObservacionAnulacion').val())=='')
                {
                 toastr.warning("INGRESAR LA OBSERVACION");
                  return false;
                }
                F_AnularRegistro();
                return false;
            }
            catch (e) {
                toastr.warning("Error Detectado: " + e);
            }
        });


$(document).on("change", "select[id $= 'MainContent_ddlMedioPagoEdicion']",function () {

    if ($("#MainContent_ddlMedioPagoEdicion").val() === '1') {
        $("#MainContent_ddlBancoEdicion").val(null);
        $("#MainContent_ddlCuentaEdicion").val(null);
        $("#MainContent_txtNroOperacionEdicion").val('');
    }
    
    return true;
});

    F_Controles_Inicializar();

    $('#MainContent_txtProveedor').css('background', '#FFFFE0');

    $('#MainContent_txtTC').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtNroOperacion').css('background', '#FFFFE0');

    $('#MainContent_txtNroOperacionEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtObservacion').css('background', '#FFFFE0');

    $('#MainContent_txtTotalFactura').css('background', '#FFFFE0');

    $('#MainContent_txtResponsable').css('background', '#FFFFE0');

    $('#MainContent_txtPagador').css('background', '#FFFFE0');

    $('#MainContent_txtTotalLetra').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtClienteConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtOperacion').css('background', '#FFFFE0');

    $('#MainContent_txtTotalDeuda').css('background', '#FFFFE0');

    $('#MainContent_txtCobroOperacion').css('background', '#FFFFE0');

    $('#MainContent_txtTotalCobranza').css('background', '#FFFFE0');

    $('#MainContent_txtProveedorConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtComision').css('background', '#FFFFE0');

    $('#MainContent_txtFiltroFechaDesde').css('background', '#FFFFE0');

    $('#MainContent_txtFiltroFechaHasta').css('background', '#FFFFE0');

    $('#MainContent_txtFiltroMontoDesde').css('background', '#FFFFE0');

    $('#MainContent_txtFiltroMontoHasta').css('background', '#FFFFE0');

    $('#MainContent_ddlFiltroMoneda').css('background', '#FFFFE0');

    $('#MainContent_ddlFiltroEstado').css('background', '#FFFFE0');

    $('#MainContent_txtFacturaEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtTotalFacturaEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtSaldoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtAcuentaEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtNuevoSaldoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtTCEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtEmisionEdicion').css('background', '#FFFFE0');

    $('#MainContent_ddlCajaFisicaEdicion').css('background', '#FFFFE0');

    $('#MainContent_ddlMedioPagoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtObservacionAnulacion').css('background', '#FFFFE0');
        
    F_Derecha();

    Buscando = false;
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

$(document).on("change", "select[id $= 'MainContent_ddlMoneda']",function () {    
       $('#MainContent_btnFiltrar').click();
} );

$(document).on("change", "select[id $= 'MainContent_ddlBanco']",function () {
     F_ListarNroCuenta();
} );

$(document).on("change", "select[id $= 'MainContent_ddlBancoEdicion']",function () {
     F_ListarNroCuentaEdicion();
} );

function F_Controles_Inicializar() {
if (!F_SesionRedireccionar(AppSession)) return false;

    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodSerie: 61,
                Filtro_CodBanco: '1',
                Filtro_CodMoneda: '1'
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
                    if (str_resultado_operacion == "1") 
                    {                        
                        F_Update_Division_HTML('div_moneda', result.split('~')[2]);
                        F_Update_Division_HTML('div_MedioPago', result.split('~')[4]);
                        F_Update_Division_HTML('div_Banco', result.split('~')[5]);
                        F_Update_Division_HTML('div_Cuenta', result.split('~')[6]);
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[7]);
                        F_Update_Division_HTML('div_BancoEdicion', result.split('~')[8]);
                        F_Update_Division_HTML('div_CuentaEdicion', result.split('~')[9]);
                        F_Update_Division_HTML('div_FiltroMoneda', result.split('~')[10]);
                        F_Update_Division_HTML('div_CajaFisica', result.split('~')[11]);
                        F_Update_Division_HTML('div_MedioPagoConsulta', result.split('~')[12]);
                        F_Update_Division_HTML('div_CajaFisicaConsulta', result.split('~')[13]);
                        $('#MainContent_txtTC').val(parseFloat(result.split('~')[3]).toFixed(6));
                        $('#MainContent_ddlMoneda').val('1');
                        $('#MainContent_ddlSerieConsulta').val('1');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlBanco').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPagoConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlCuenta').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPago').val(1);
                        $('#MainContent_ddlMedioPagoConsulta').val(0);
                        $('#MainContent_ddlBancoEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlCuentaEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlFiltroMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlCajaFisica').css('background', '#FFFFE0');
                        $('#MainContent_ddlCajaFisicaConsulta').css('background', '#FFFFE0');
                        $('.ccsestilo').css('background', '#FFFFE0');

                        F_Inicializar_Filtros();
                    }
                    else {
                        toastr.warning(str_mensaje_operacion);
                    }
                }
            );
    } catch (mierror) {
    MostrarEspera(false);
        toastr.warning("Error detectado: " + mierror);
    }
}

function F_ValidarAgregar() {
if (!F_SesionRedireccionar(AppSession)) return false;


    //valido que los datos esten bien
    //-------------------------------
    if ($('#hfCodCtaCte').val() === 0)
    {
        toastr.warning('AGREGAR CLIENTE');
        return false;
    }

    if ($('#MainContent_chkFiltroMonto').prop('checked') === true)
    {
        if ($('#MainContent_txtFiltroMontoDesde').val().trim() === '' | $('#MainContent_txtFiltroMontoHasta').val().trim() === '')
        {
            toastr.warning('ESPECIFIQUE UN RANGO DE MONTO VALIDO');    
            $('#MainContent_txtFiltroMontoDesde').focus();
            return false;
        }


        if (isNaN($('#MainContent_txtFiltroMontoDesde').val()) | isNaN($('#MainContent_txtFiltroMontoHasta').val())) {
            toastr.warning('ESPECIFIQUE UN RANGO DE MONTO VALIDO');    
            $('#MainContent_txtFiltroMontoDesde').focus();        
            return false;
        }

        if (Number($('#MainContent_txtFiltroMontoDesde').val()) > Number($('#MainContent_txtFiltroMontoHasta').val())) {
            toastr.warning('ESPECIFIQUE UN RANGO DE MONTO VALIDO');    
            $('#MainContent_txtFiltroMontoDesde').focus();        
            return false;
        }
    }
    
    return true;
}

function F_AgregarTemporal() {
if (!F_SesionRedireccionar(AppSession)) return false;

        try 
        {
            var FlagFiltroFecha = 0;
            if ($('#MainContent_chkFiltroFecha').prop('checked') === true)
                FlagFiltroFecha = 1;

            var FlagFiltroMonto = 0;
            var FiltroMontoDesde = 0;
            var FiltroMontoHasta = 0;
            if ($('#MainContent_chkFiltroMonto').prop('checked') === true) {
                FlagFiltroMonto = 1; 
                FiltroMontoDesde = $('#MainContent_txtFiltroMontoDesde').val();
                FiltroMontoHasta = $('#MainContent_txtFiltroMontoHasta').val();
                }


            var FiltroCodMoneda = 0;
            var FiltroEstado = 0;


            //cada que haga una busqueda seran temporales diferentes
            $('#hfCodigoTemporal').val('0');
            $('#hfCodigoTemporalPago').val('0');

            var objParams = {
                    Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                    Filtro_FlagFiltroFecha: FlagFiltroFecha,
                    Filtro_FechaDesde: $('#MainContent_txtFiltroFechaDesde').val(),
                    Filtro_FechaHasta: $('#MainContent_txtFiltroFechaHasta').val(),
                    Filtro_FlagFiltroMonto: FlagFiltroMonto,
                    Filtro_MontoDesde: FiltroMontoDesde,
                    Filtro_MontoHasta: FiltroMontoHasta,
                    Filtro_CodMoneda: $('#MainContent_ddlFiltroMoneda').val(),
                    Filtro_CodEstado: $('#MainContent_ddlFiltroEstado').val(),
                    Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                    Filtro_CodigoTemporalPago: $('#hfCodigoTemporalPago').val(),
                    Filtro_TC: $('#MainContent_txtTC').val(),
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
                    $('#hfCodigoTemporalPago').val(result.split('~')[4]);
                    numerar();
                    numerar2();
                    F_Update_Division_HTML('div_grvFacturaCobranzas', result.split('~')[5]);
                    
                    F_Update_Division_HTML('div_grvFacturaPagos', result.split('~')[6]);
                    $('#MainContent_txtCobroOperacion').val(parseFloat($('#MainContent_txtTotalCobranza').val() - $('#MainContent_txtTotalDeuda').val()).toFixed(2));
                    $('.ccsestilo').css('background', '#FFFFE0');
                    
                    Buscando = false;
                }
                else 
                {
                    toastr.warning(result.split('~')[2]);
                }
                return false;
                });
                //numerar los registro fuera de los parametros
                numerar();
                    numerar2();
        }        
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
        }
}

function F_MostrarTotales(){
if (!F_SesionRedireccionar(AppSession)) return false;

var lblimporte_grilla='';
var chkDel='';
var Total=0;
var Igv=0;
var Subtotal=0;
     $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
             chkDel = '#' + this.id;
             lblimporte_grilla = chkDel.replace('chkEliminar', 'lblimporte');
             Total+=parseFloat($(lblimporte_grilla).text());
     });
     var Cuerpo='#MainContent_'
    $(Cuerpo + 'txtTotal').val(Total.toFixed(2));
    $(Cuerpo + 'txtIgv').val((Total*parseFloat($(Cuerpo + 'ddligv').val())).toFixed(2));
    $(Cuerpo + 'txtSubTotal').val((Total/(1+parseFloat($(Cuerpo + 'ddligv').val()))).toFixed(2));

}

function F_EliminarTemporal_Factura(){
if (!F_SesionRedireccionar(AppSession)) return false;
  try 
        {
        var chkSi='';
        var arrDetalle = new Array();
        var lblID='';
        
               
                $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblID = chkSi.replace('chkEliminar', 'lblID');
                   
                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {                       
                        CodDetalle: $(lblID).val()
                        };                                               
                        arrDetalle.push(objDetalle);
                    }
                });

            
                var objParams = {
                                  Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                  Filtro_CodigoTemporal:$('#hfCodigoTemporal').val(),
                                  Filtro_CodMoneda:$('#MainContent_ddlMoneda').val()
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);

                F_EliminarTemporal_Factura_NET(arg, function (result) {
    
                 MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    if (result.split('~')[5]=='0')
                        $('#MainContent_txtTotalCobranza').val('0.00');
                    else
                        $('#MainContent_txtTotalCobranza').val(result.split('~')[5]);                   
                    
                    $('#MainContent_txtCobroOperacion').val(parseFloat($('#MainContent_txtTotalCobranza').val() - $('#MainContent_txtTotalDeuda').val()).toFixed(2));
                    F_Update_Division_HTML('div_grvFactura', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                     F_ValidarTextMoneda(); 
                }
                else 
                {
                    toastr.warning(result.split('~')[2]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
        }
}

function F_ValidarEliminar_Factura(){
if (!F_SesionRedireccionar(AppSession)) return false;
 try 
        {
        var chkSi='';
        var x=0;

                $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                               
                     if ($(chkSi).is(':checked')) 
                        x=1;
                        
               });

               if(x==0)
               {
               toastr.warning("Seleccione una factura para eliminar");
               return false;
               }
               else
               {return true;}
               
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
}

function F_ValidarGrabarDocumento(){
if (!F_SesionRedireccionar(AppSession)) return false;
        try 
        {
            var Cuerpo='#MainContent_';
            var Cadena = 'Ingresar los sgtes. Datos:'; 

            if ($(Cuerpo + 'txtProveedor').val()=='' || $('#hfCodCtaCte').val()==0)
                    Cadena=Cadena + '<p></p>' + 'Razon Social';
        
            if ($(Cuerpo + 'txtTC').val()=='0')
                    Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

            if ($(Cuerpo + 'txtTC').val()=='')
                    Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

            if ($(Cuerpo + 'txtEmision').val()=='')
                    Cadena=Cadena + '<p></p>' + 'Emision';

            if ($(Cuerpo + 'ddlMedioPago').val()=='0')
                    Cadena=Cadena + '<p></p>' + 'Medio de Pago';

            if (($(Cuerpo + 'ddlMedioPago').val()!='1' & $(Cuerpo + 'ddlMedioPago').val()!='5' & $(Cuerpo + 'ddlMedioPago').val()!='6') && $(Cuerpo + 'txtNroOperacion').val()=='')
                    Cadena=Cadena + '<p></p>' + 'Nro Operacion';

            if (($(Cuerpo + 'ddlMedioPago').val()!='1' & $(Cuerpo + 'ddlMedioPago').val()!='5' & $(Cuerpo + 'ddlMedioPago').val()!='6') && $(Cuerpo + 'ddlCuenta').val()==null)
                    Cadena=Cadena + '<p></p>' + 'Nro Cuenta';

            if ($(Cuerpo + 'ddlMedioPago').val() =='6')
            {
                if ((parseFloat(parseFloat($('#MainContent_txtTotalCobranza').val())-parseFloat($('#MainContent_txtTotalDeuda').val())).toFixed(2)) != 0) 
                        Cadena=Cadena + '<p></p>' + 'CUANDO ES CANJE, EL MONTO DEBE SER CERO (0)';            
            }
            else
            {

                if ((parseFloat(parseFloat($('#MainContent_txtTotalDeuda').val())-parseFloat($('#MainContent_txtTotalCobranza').val()))) <= 0) 
                {
                    if (parseFloat($('#MainContent_txtTotalDeuda').val()) < 0 & parseFloat($('#MainContent_txtTotalCobranza').val()) == 0)
                    {
                        if ($(Cuerpo + 'ddlMedioPago').val() =='6' | $(Cuerpo + 'ddlMedioPago').val() =='7')
                        {
                            Cadena=Cadena + '<p></p>' + 'NO SE PUEDE USAR EL CANJE O LA TARJETA PARA PAGAR UNA NOTA DE CREDITO';
                        }
                    }
                    else
                    {
                        Cadena=Cadena + '<p></p>' + 'EL MONTO DE LA COBRANZA DEBE SER MAYOR A CERO';
                    }
                }        
            }

             if ($(Cuerpo + 'ddlCajaFisica').val() == null)
                Cadena=Cadena + '<p></p>' + 'Caja Fisica';

            if (Cadena != 'Ingresar los sgtes. Datos:')
            {
                toastr.warning(Cadena.toUpperCase());
                return false;
            }
            return true;
        }        
        catch (e) 
        {
            toastr.warning("Error Detectado: " + e);
        }
}

function F_GrabarDocumento(){
if (!F_SesionRedireccionar(AppSession)) return false;

  try 
        {
        var Contenedor = '#MainContent_';
        var CodBanco=0;
        var CodCtaBancaria=0;
        var NroOperacion='';
        var CodTipoDoc=1;
        var CobranzaSoles = 0;
        var DeudaSoles = 0;
        var CobroOperacionSoles = 0;
        var CobranzaDolares = 0;
        var DeudaDolares = 0;
        var CobroOperacionDolares = 0;
        var chkEliminar = "";      
        var lblDolares = "";
        var Total = 0.00;
        var CodTipoDoc=1;

         if ($('#MainContent_chkLetra').is(":checked")) 
          CodTipoDoc=19;

        if ($(Contenedor + 'ddlMoneda').val()==1)
        {
             CobranzaSoles = $(Contenedor + 'txtTotalCobranza').val();
             DeudaSoles =    $(Contenedor + 'txtTotalDeuda').val();
             CobroOperacionSoles = $(Contenedor + 'txtCobroOperacion').val();

            $('#MainContent_txtTotalFactura').val(parseFloat(Total).toFixed(2));
            $('#MainContent_txtTotalLiquidacion').val(parseFloat(Total).toFixed(2));

             CobranzaDolares = 0;
             DeudaDolares = 0;
             CobroOperacionDolares = 0;
        }
        else
        {
             CobranzaSoles = 0;
             DeudaSoles = 0;
             CobroOperacionSoles = 0;
             CobranzaDolares = $(Contenedor + 'txtTotalCobranza').val();
             DeudaDolares =    $(Contenedor + 'txtTotalDeuda').val();
             CobroOperacionDolares = $(Contenedor + 'txtCobroOperacion').val();        
        }
        
        switch ($(Contenedor + 'ddlMedioPago').val())
        { 
           case '1':
           case '6':
                    CodBanco = 0;
                    CodCtaBancaria = 0;
                    NroOperacion = "";
                    break;
           case '3':
           case '4':
           case '8':
           case '9':
           case '10':
                    CodBanco = $(Contenedor + 'ddlBanco').val();
                    CodCtaBancaria =$(Contenedor + 'ddlCuenta').val();
                    NroOperacion = $(Contenedor + 'txtNroOperacion').val();
                    break;
           default:
           break;
        }


        //PRIMERO SE ACTUALIZAN LOS TEMPORALES CON LA DATA CARGADA PARA QUE SE PUEDA GUARDAR
        //-------------------------------------------------------------------------------------
        var lblCodigo_grilla='';
        var lblFactura_grilla='';
        var lblEmision_grilla='';
        var lblTotal_grilla='';
        var lblMoneda_grilla='';
        var hfSoles='';
        var hfDolares='';
        var chkSi='';
        var lblTC = '';
        var hfCodMoneda='';
        var arrDetalleCobranzas = new Array();
        var arrDetallePagos = new Array();
                   
        $('#MainContent_grvFacturaCobranzas :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblCodigo_grilla = chkSi.replace('chkEditar', 'hfCodigoFactura');
            lblFactura_grilla = chkSi.replace('chkEditar', 'lblFactura');
            lblEmision_grilla = chkSi.replace('chkEditar', 'lblEmision');
            hfSoles = chkSi.replace('chkEditar', 'hfSoles');
            hfDolares = chkSi.replace('chkEditar', 'hfDolares');
            lblTC = chkSi.replace('chkEditar', 'lblTC');           
            hfCodMoneda = chkSi.replace('chkEditar', 'hfCodMoneda');        

            if ($(chkSi).is(':checked')) 
            {
                var objDetalle = {
                    CodigoFactura: $(lblCodigo_grilla).val(),
                    Factura: $(lblFactura_grilla).text(),
                    Emision: $(lblEmision_grilla).text() ,
                    Soles:   $(hfSoles).val(),
                    Dolares: $(hfDolares).val(),
                    TC: $(lblTC).text(),
                    CodMoneda: $(hfCodMoneda).val()
                };
                arrDetalleCobranzas.push(objDetalle);
                }
            });

        $('#MainContent_grvFacturaPagos :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblCodigo_grilla = chkSi.replace('chkEditar', 'hfCodigoFactura');
            lblFactura_grilla = chkSi.replace('chkEditar', 'lblFactura');
            lblEmision_grilla = chkSi.replace('chkEditar', 'lblEmision');
            hfSoles = chkSi.replace('chkEditar', 'hfSoles');
            hfDolares = chkSi.replace('chkEditar', 'hfDolares');
            lblTC = chkSi.replace('chkEditar', 'lblTC');           
            hfCodMoneda = chkSi.replace('chkEditar', 'hfCodMoneda');        

            if ($(chkSi).is(':checked')) 
            {
                var objDetalle = {
                    CodigoFactura: $(lblCodigo_grilla).val(),
                    Factura: $(lblFactura_grilla).text(),
                    Emision: $(lblEmision_grilla).text() ,
                    Soles:   $(hfSoles).val(),
                    Dolares: $(hfDolares).val(),
                    TC: $(lblTC).text(),
                    CodMoneda: $(hfCodMoneda).val()
                };
                $('#hfMoneda').val($(lblMoneda_grilla).text());
                arrDetallePagos.push(objDetalle);
                }
            });
              
        var objParams = {   
                             Filtro_Tipo:                  'P', //indica que es cobranza
                             Filtro_CodigoTemporal:        $('#hfCodigoTemporal').val(),
                             Filtro_CodigoTemporalPago:    $('#hfCodigoTemporalPago').val(),
                             Filtro_CodMoneda:             $(Contenedor + 'ddlMoneda').val(),
                             Filtro_CodMedioPago:          $(Contenedor + 'ddlMedioPago').val(),
                             Filtro_NroOperacion:          NroOperacion,
                             Filtro_TipoCambio:            $(Contenedor + 'txtTC').val(),
                             Filtro_FechaOperacion:        $(Contenedor + 'txtOperacion').val(),
                             Filtro_FechaEmision:          $(Contenedor + 'txtEmision').val(),
                             Filtro_Responsable:           $(Contenedor + 'txtResponsable').val(),
                             Filtro_Observacion:           $(Contenedor + 'txtPagador').val(),
                             Filtro_CodBanco:              CodBanco,
                             Filtro_CodCtaBancaria:        CodCtaBancaria,
                             Filtro_CobranzaSoles:         CobranzaSoles,
                             Filtro_DeudaSoles:            DeudaSoles,
                             Filtro_CobroOperacionSoles:   CobroOperacionSoles,
                             Filtro_CobranzaDolares:       CobranzaDolares,
                             Filtro_DeudaDolares:          DeudaDolares,
                             Filtro_CobroOperacionDolares: CobroOperacionDolares,
                             Filtro_CodTipoDoc:            CodTipoDoc,
                             Filtro_CodCtaCte:             $('#hfCodCtaCte').val(),
                             Filtro_XmlDetalleCobranzas:   Sys.Serialization.JavaScriptSerializer.serialize(arrDetalleCobranzas), 
                             Filtro_XmlDetallePagos:       Sys.Serialization.JavaScriptSerializer.serialize(arrDetallePagos), 
                             Filtro_CodCajaFisica: $(Contenedor + 'ddlCajaFisica').val()
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
                    if (str_mensaje_operacion=='SE REGISTRO LA COBRANZA CORRECTAMENTE')
                    { 
                            F_Update_Division_HTML('div_grvFactura', result.split('~')[4]);
                            F_Update_Division_HTML('div_FacturaCobranzas', result.split('~')[5]);
                            $('#MainContent_btnNuevo').click();
                            toastr.success('SE REGISTRO EL PAGO CORRECTAMENTE');
                            $(Contenedor + 'txtProveedor').focus();
                            $('.ccsestilo').css('background', '#FFFFE0');
                    }   
                    else
                    {
                        toastr.warning(result.split('~')[1]);                    
                    }
                                    
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }

                return false;
                });
        }        
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
            return false;
        }
}

function F_Nuevo(){
if (!F_SesionRedireccionar(AppSession)) return false;
       var Contenedor = '#MainContent_';
       $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
       $('.Jq-ui-dtp').datepicker('setDate', new Date());
       $('#MainContent_ddlMoneda').val('1');
       $('#hfCodCtaCte').val('0');
       $('#hfCodigoTemporal').val('0');
       $('#hfMoneda').val('0');  

        $('#hfCodCobranza').val('0');
        $('#hfCodCtaCte').val('0');
        $('#hfCodCtaCteConsulta').val('0');
        $('#hfCodigoTemporal').val('0');
        $('#hfCobranzas').val('0');
        $('#hfCodigoTemporalPago').val('0');
        $('#hfMoneda').val('0');
        $('#hfNotaVenta').val('0');

       $(Contenedor + 'txtTotalCobranza').val('0.00');
       $(Contenedor + 'txtTotalDeuda').val('0.00') ;
       $(Contenedor + 'txtResponsable').val('');
       $(Contenedor + 'txtPagador').val('');
       $(Contenedor + 'txtCobroOperacion').val('0.00') ;
       $(Contenedor + 'txtNroOperacion').val('');
       $(Contenedor + 'ddlMoneda').val('1'),
       $(Contenedor + 'ddlMedioPago').val(1),
       $(Contenedor + 'ddlBanco').val('1');  
       $(Contenedor + 'txtProveedor').val('');
       $('#hfCodCtaCte').val('0');
       $(Contenedor + 'txtProveedor').focus();
       try 
        {
              var objParams = {
                                        Filtro_CodSerie: '61'
                                        
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
                    F_Update_Division_HTML('div_grvFacturaCobranzas', result.split('~')[2]);                            
                    F_Update_Division_HTML('div_grvFacturaPagos', result.split('~')[3]);         
                    $('.ccsestilo').css('background', '#FFFFE0');
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
            return false;
        }

}

function F_Buscar(){
if (!F_SesionRedireccionar(AppSession)) return false;
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
       try 
        {
              var chkNumero='0';
              var chkFecha='0';
              var chkCliente='0';
              var chkSerie='0';

              if ($('#MainContent_chkNumero').is(':checked'))
              chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
              chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
              chkCliente='1';

              if ($('#MainContent_chkSerie').is(':checked'))
              chkSerie='1';
              
              var objParams = {
                                 Filtro_Serie: $("#MainContent_ddlSerieConsulta option:selected").text(),
                                 Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                 Filtro_Desde: $('#MainContent_txtDesde').val(),
                                 Filtro_Hasta: $('#MainContent_txtHasta').val(),
                                 Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                 Filtro_ChkNumero: chkNumero,
                                 Filtro_ChkFecha: chkFecha,
                                 Filtro_ChkCliente: chkCliente,
                                 Filtro_ChkSerie: chkSerie,
                                 Filtro_CodMedioPago: $("#MainContent_ddlMedioPagoConsulta").val(),       
                                 Filtro_CodCajaFisica: $("#MainContent_ddlCajaFisicaConsulta").val()  
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
                    $('#lblNumeroConsulta').text(F_Numerar_Grilla("grvConsulta",'lblNroOperacion'));
                    if  (str_mensaje_operacion!="")                       
                    toastr.warning(result.split('~')[1]);
                  
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
        MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
            return false;
        }

}

function F_AnularPopUP(Fila) {
if (!F_SesionRedireccionar(AppSession)) return false;
        if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Anular') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
        var imgID = Fila.id;
        var lblCodigo = '#' + imgID.replace('imgAnularDocumento', 'lblCodigo');
        var lblEstado = '#' + imgID.replace('imgAnularDocumento', 'lblEstado');
        var lblnumero = '#' + imgID.replace('imgAnularDocumento', 'lblFactura');
        var lblcliente = '#' + imgID.replace('imgAnularDocumento', 'lblProveedor');
        var lblID = '#' + imgID.replace('imgAnularDocumento', 'hfCodigo');
            
        
        $('#hfCodDocumentoVentaAnulacion').val($(lblCodigo).val()) ;
        $('#hfClienteAnulacion').val($(lblcliente).text()) ;
        $('#hfNumeroAnulacion').val($(lblnumero).text()) ;
        $('#MainContent_txtObservacionAnulacion').val('');
        $('#hfid').val($(lblID).val());
        $('#div_Anulacion').dialog({
               resizable: false,
               modal: true,
               title: "Eliminacion de Pago",
               title_html: true,
               height: 190,
               width: 470,
               autoOpen: false
           });          
        $('#div_Anulacion').dialog('open');
}

function F_AnularRegistro() {
if (!F_SesionRedireccionar(AppSession)) return false;
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Eliminar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
 try 
        {
               

                if(!confirm("ESTA SEGURO DE ELIMINAR EL PAGO DEL PROVEEDOR "  + $('#hfClienteAnulacion').val()))
                return false;

                var chkNumero='0';
                var chkFecha='0';
                var chkCliente='0';
                var chkSerie='0';

                if ($('#MainContent_chkNumero').is(':checked'))
                    chkNumero='1';

                if ($('#MainContent_chkRango').is(':checked'))
                    chkFecha='1';

                if ($('#MainContent_chkCliente').is(':checked'))
                    chkCliente='1';

                if ($('#MainContent_chkSerie').is(':checked'))
                    chkSerie='1';

              var objParams = {
                                      Filtro_CodCobranza: $('#hfid').val(),
                                      Filtro_CodDocumentoVenta: $('lblnumero').val(),
                                      Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                      Filtro_Desde: $('#MainContent_txtDesde').val(),
                                      Filtro_Hasta: $('#MainContent_txtHasta').val(),
                                      Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                      Filtro_ChkNumero: chkNumero,
                                      Filtro_ChkFecha: chkFecha,
                                      Filtro_ChkCliente: chkCliente,
                                      Filtro_ChkSerie: chkSerie,
                                      Filtro_Observacion: 'ELIMINADO DESDE EL FORMULARIO PAGOS',
                                      Filtro_ObservacionAnulacion: $('#MainContent_txtObservacionAnulacion').val()
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
                $('#div_Anulacion').dialog('close');   
                toastr.warning(result.split('~')[1]);
        }
        else {
             toastr.warning(result.split('~')[1]);
        }

        return false;
    });

            }
        
        catch (e) 
        {
        MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
            return false;
        }

 
}

function getContentTab(){
//    $('#MainContent_txtDesde').val(Date_AddDays($('#MainContent_txtHasta').val(), -7));
    $('#MainContent_chkRango').prop('checked', true);
    F_Buscar();
    return false;
}

function F_ValidarAgregarLetra(){
if (!F_SesionRedireccionar(AppSession)) return false;
    try 
        {

        var Cuerpo='#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p> <br> <p></p>'; 
        var lblcoddetalle_grilla='';
        var x=0;

         $('#MainContent_grvLetra .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcoddetalle_grilla = chkSi.replace('chkEliminar', 'lblLetra');
                   
                    if ($(lblcoddetalle_grilla).text()==$(Cuerpo + 'txtNroLetra').val())
                    x=1;
                      
                });

        if (x==0)     
        {        
        if ($(Cuerpo + 'txtImporteLetra').val() =='')
                Cadena=Cadena + '<p></p>' + 'Importe de Letra';

        if ($(Cuerpo + 'txtImporteLetra').val() !='' && (parseFloat($(Cuerpo + 'txtImporteLetra').val())> parseFloat($(Cuerpo + 'txtTotalFacturaLetra').val())))
                Cadena=Cadena + '<p></p>' + 'El importe de la letra no puede ser mayor al total de la factura';

        if ($(Cuerpo + 'txtNroLetra').val()=='')
                Cadena=Cadena + '<p></p>' + 'Nro Letra';

        if ($(Cuerpo + 'txtVencimiento').val()=='')
                Cadena=Cadena + '<p></p>' + 'Vencimiento';

        if ($(Cuerpo + 'txtImporteLetra').val()=='')
                Cadena=Cadena + '<p></p>' + 'Importe';

        if (($(Cuerpo + 'txtTotalFactura').val() !='0.00' & $(Cuerpo + 'txtTotalLetra').val() !='0.00') && (parseFloat($(Cuerpo + 'txtTotalFactura').val()) == parseFloat($(Cuerpo + 'txtTotalLetra').val())))
                Cadena=Cadena + '<p></p>' + 'No se puede agregar mas letras; el total de la factura y la letra son iguales.';}
        else
        {
        Cadena="La letra " + $(Cuerpo + 'txtNroLetra').val() + ' se encuentra agregada';
        }

        if (Cadena != 'Ingresar los sgtes. Datos: <br> <p></p> <br> <p></p>')
        {toastr.warning(Cadena);
        $(Cuerpo + 'txtNroLetra').focus();
        return false;}
        return true;
        }
        
    catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
}

function F_AgregarLetra(){
if (!F_SesionRedireccionar(AppSession)) return false;
  try 
        {
            var lblCodigo_grilla='';
            var chkSi='';
            var arrDetalle = new Array();
            var Contenedor = '#MainContent_';
       
                   
                $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblCodigo_grilla = chkSi.replace('chkEliminar', 'lblcodigo');
                  
                 
                        var objDetalle = {
                        CodFactura: $(lblCodigo_grilla).text()
                        };
                                               
                        arrDetalle.push(objDetalle);
                   
                });

          
               var objParams = {
                                        Filtro_Numero: $(Contenedor + 'txtNroLetra').val(),
                                        Filtro_Emision: $(Contenedor + 'txtFechaGiro').val(),
                                        Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
                                        Filtro_Total: $(Contenedor + 'txtImporteLetra').val(),
                                        Filtro_Moneda: $(Contenedor + 'txtMoneda').val(),
                                        Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                                        Filtro_TipoCambio:  $(Contenedor + 'txtTC').val(),
                                        Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                        Filtro_XmlConsulta: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                        
                               };


                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                MostrarEspera(true);
                F_AgregarLetraTemporal_NET(arg, function (result) {
  
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                   if (str_mensaje_operacion=='La(s) Letra(s) se ha agregado con exito')
                   {
                     F_Update_Division_HTML('div_grvLetra', result.split('~')[2]);  
                     $('#MainContent_txtTotalLetra').val(result.split('~')[3]);  
                     toastr.success('La(s) Letra(s) se ha agregado con exito'); 
                     F_LimpiarLetra();
                     
                   }
                   else
                    toastr.warning(str_mensaje_operacion); 
                    
                    
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
            return false;
        }
}

function F_ValidarEliminar_Letra(){
if (!F_SesionRedireccionar(AppSession)) return false;
 try 
        {
        var chkSi='';
        var x=0;

                $('#MainContent_grvLetra .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                               
                     if ($(chkSi).is(':checked')) 
                        x=1;
                        
               });

               if(x==0)
               {
               toastr.warning("Seleccione una Letra para eliminar");
               return false;
               }
               else
               {return true;}
               
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
}

function F_EliminarTemporal_Letra(){
if (!F_SesionRedireccionar(AppSession)) return false;
  try 
        {
        var chkSi='';
        var arrDetalle = new Array();
        var arrConsulta = new Array();
        var lblcoddetalle_grilla='';
        var lblCodigo_grilla='';
        
               
                $('#MainContent_grvLetra .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcoddetalle_grilla = chkSi.replace('chkEliminar', 'lblCodigo');
                   
                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                       
                        CodLetraCab: $(lblcoddetalle_grilla).text()
                        };
                                               
                        arrDetalle.push(objDetalle);
                    }
                });

                $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblCodigo_grilla = chkSi.replace('chkEliminar', 'lblcodigo');
                  
                 
                        var objDetalle = {
                        CodFactura: $(lblCodigo_grilla).text()
                        };
                                               
                        arrConsulta.push(objDetalle);
                   
                });

                var objParams = {
                                  Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                  Filtro_XmlConsulta: Sys.Serialization.JavaScriptSerializer.serialize(arrConsulta)
                                };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);

                F_EliminarTemporal_Letra_NET(arg, function (result) {
         
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                   
                    if (result.split('~')[4]=='0')
                    $('#MainContent_txtTotalLetra').val('0.00');
                    else
                    $('#MainContent_txtTotalLetra').val(result.split('~')[4]);
                    F_Update_Division_HTML('div_grvLetra', result.split('~')[3]);
                    toastr.warning(result.split('~')[2]);
                }
                else 
                {
                    toastr.warning(result.split('~')[2]);
                }

                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
        }
}

function F_LimpiarLetra(){
if (!F_SesionRedireccionar(AppSession)) return false;
                $('#MainContent_txtMoneda').val($("#MainContent_ddlMoneda option:selected").text());
                $('#MainContent_txtProveedorLetra').val($('#MainContent_txtProveedor').val());
                $('#MainContent_txtFechaGiro').val($('#MainContent_txtEmision').val());
                $('#MainContent_txtTotalFacturaLetra').val($('#MainContent_txtTotalFactura').val());
                $('#MainContent_txtImporteLetra').val('');
                $('#MainContent_txtVencimiento').val('');
                $('#MainContent_txtNroLetra').val('');
                $('#MainContent_ddlFormaPago').val('3');
                F_ListarNroCuenta('3');
                $('#div_DatosLetra').dialog('open');
                $('#MainContent_txtNroLetra').focus();
     }

function F_TipoCambio(){
if (!F_SesionRedireccionar(AppSession)) return false;
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
                    $('#MainContent_txtTC').val(result.split('~')[2]);
                else 
                    toastr.warning(result.split('~')[1]);
                
                return false;

                });
        }
        
        catch (e) 
        {
        MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
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

function F_ListarNroCuenta() {
if (!F_SesionRedireccionar(AppSession)) return false;
    var arg;

    try {

        var objParams = {

            Filtro_CodBanco:  $('#MainContent_ddlBanco').val(),
            Filtro_CodMoneda:  $('#MainContent_ddlMoneda').val()
        };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ListarNroCuenta_NET
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
                     F_Update_Division_HTML('div_Cuenta', result.split('~')[2]);
                            $('#MainContent_ddlCuenta').css('background', '#FFFFE0');       
                    }
                    else {

                        toastr.warning(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
    MostrarEspera(false);
        toastr.warning("Error detectado: " + mierror);

    }

}

function F_ListarNroCuentaEdicion() {
if (!F_SesionRedireccionar(AppSession)) return false;
    var arg;

    try {

        var objParams = {

            Filtro_CodBanco:  $('#MainContent_ddlBancoEdicion').val(),
            Filtro_CodMoneda:  $('#MainContent_ddlMoneda').val()
        };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_ListarNroCuenta_NET
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
                     F_Update_Division_HTML('div_CuentaEdicion', result.split('~')[3]);
                            $('#MainContent_ddlCuentaEdicion').css('background', '#FFFFE0');       
                    }
                    else {

                        toastr.warning(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
    MostrarEspera(false);
        toastr.warning("Error detectado: " + mierror);

    }

}

function F_ValidarAgregarFacturaCobranzas(){
if (!F_SesionRedireccionar(AppSession)) return false;
try 
        {
        var chkSi='';
        var cadena= '';
        var x=0;
        var j=0;
        var lblcodproducto_grilla='';
        var lblDetalle_grilla='';
        var lblFactura_grilla='';
        var chkDel='';

               $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                                 
                    if ($(chkSi).is(':checked')) 
                        x=1;                       
               });

               if(x==0)
               {cadena="No ha seleccionado ningun documento";}
               else
               { 
               cadena="Los sgtes. documentos se encuentran agregados : ";
                    $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcodproducto_grilla = chkSi.replace('chkOK', 'lblCodigo');
               
                         if ($(chkSi).is(':checked')) 
                            {
                                 $('#MainContent_grvFacturaPagos .chkDelete :checkbox').each(function () {
                                    chkDel = '#' + this.id;
                                    lblDetalle_grilla = chkDel.replace('chkEliminar', 'lblcodigo');
                                    lblFactura_grilla=chkDel.replace('chkEliminar', 'lblFactura');
                                    if ($(lblcodproducto_grilla).text()==$(lblDetalle_grilla).text())
                                    {
                                    cadena= cadena + "<p></p>"  + $(lblFactura_grilla).text();
                                    j+=1;
                                    }
                                  });
                            }
                    });
                }
                
                if (x!=0 && j==0)
                cadena="";

                if (cadena != "")
                   {
                      toastr.warning(cadena);
                      return false;
                   } 
                   return true;                 
        }        
        catch (e) 
        {
            toastr.warning("Error Detectado: " + e);
        }
}

function F_AgregarTemporalCobranzas(){
if (!F_SesionRedireccionar(AppSession)) return false;
try 
        {
        var lblCodigo_grilla='';
        var lblFactura_grilla='';
        var lblEmision_grilla='';
        var lblTotal_grilla='';
        var lblMoneda_grilla='';
        var chkSi='';
        var hfCodMoneda='';
        var arrDetalle = new Array();
                   
                $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblCodigo_grilla = chkSi.replace('chkOK', 'lblCodigo');
                    lblFactura_grilla = chkSi.replace('chkOK', 'lblFactura');
                    lblEmision_grilla = chkSi.replace('chkOK', 'lblEmision');
                    lblSoles = chkSi.replace('chkOK', 'lblSoles');
                    lblDolares = chkSi.replace('chkOK', 'lblDolares');
                    lblTC = chkSi.replace('chkOK', 'lblTC');             
                    hfCodMoneda = chkSi.replace('chkOK', 'hfCodMoneda'); 

                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                            CodigoFactura: $(lblCodigo_grilla).text(),
                            Factura: $(lblFactura_grilla).text(),
                            Emision: $(lblEmision_grilla).text() ,
                            Soles:   $(lblSoles).text(),
                            Dolares: $(lblDolares).text(),
                            TC:      $(lblTC).text(),
                            CodMoneda: $(hfCodMoneda).val()
                        };
                        $('#hfMoneda').val($(lblMoneda_grilla).text());
                        arrDetalle.push(objDetalle);
                    }
                });

                var objParams = {
                                Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                Filtro_CodigoTemporal:$('#hfCodigoTemporalPago').val(),
                                Filtro_CodMoneda:$('#MainContent_ddlMoneda').val()
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_AgregarTemporalCobranzas_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporalPago').val(result.split('~')[3]);
                    $('#MainContent_txtTotalDeuda').val(parseFloat(result.split('~')[5]).toFixed(2));
                    $('#MainContent_txtCobroOperacion').val(parseFloat(parseFloat($('#MainContent_txtTotalCobranza').val()) - parseFloat($('#MainContent_txtTotalDeuda').val())).toFixed(2));
                    F_Update_Division_HTML('div_FacturaCobranzas', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                    F_ValidarTextMoneda();
                     $('#divConsultaFactura').dialog('close');

                    
                }
                else 
                {
                    toastr.warning(result.split('~')[2]);
                }
                
                return false;
                });
                  //numerar los registro fuera de los parametros
                
                 
        }        
        catch (e) 
        {
            toastr.warning("Error Detectado: " + e);
        }
}

function F_EliminarTemporal_FacturaCobranza(){
if (!F_SesionRedireccionar(AppSession)) return false;
  try 
        {
        var chkSi='';
        var arrDetalle = new Array();
        var lblID='';        
               
                $('#MainContent_grvFacturaPagos .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblID = chkSi.replace('chkEliminar', 'lblID');
                   
                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {                       
                        CodDetalle: $(lblID).val()
                        };                                               
                        arrDetalle.push(objDetalle);
                    }
                });
                            
                var objParams = {
                                  Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                  Filtro_CodigoTemporal:$('#hfCodigoTemporalPago').val(),
                                  Filtro_CodMoneda:$('#MainContent_ddlMoneda').val()
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                 MostrarEspera(true);
                F_EliminarTemporal_FacturaCobranza_NET(arg, function (result) {
                  MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                 $('#hfCodigoTemporalPago').val(result.split('~')[3]);
                    if (result.split('~')[5]=='0')
                            $('#MainContent_txtTotalDeuda').val('0.00');
                    else
                            $('#MainContent_txtTotalDeuda').val(result.split('~')[5]);
                     
                    $('#MainContent_txtCobroOperacion').val(parseFloat($('#MainContent_txtTotalCobranza').val() - $('#MainContent_txtTotalDeuda').val()).toFixed(2));
                    F_Update_Division_HTML('div_FacturaCobranzas', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                     F_ValidarTextMoneda(); 
                }
                else 
                {
                    toastr.warning(result.split('~')[2]);
                }

                return false;

                });
        }        
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
        }
}

function F_ValidarEliminar_FacturaCobranza(){
if (!F_SesionRedireccionar(AppSession)) return false;
 try 
        {
        var chkSi='';
        var x=0;
                
                $('#MainContent_grvFacturaPagos .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                               
                     if ($(chkSi).is(':checked')) 
                        x=1;
                        
               });

               if(x==0)
               {
               toastr.warning("Seleccione una proforma para eliminar");
               return false;
               }
               else
               {return true;}
               
        }
        
        catch (e) 
        {

            toastr.warning("Error Detectado: " + e);
        }
}

function F_VentaTC(Fila,Flag,Operacion) {
 try 
        {
            var txtTC =  '';         
            var lblID =  '';
            var lblSoles   = '';
            var lblDolares = '';
            var hfSoles =    ''; 
            var hfDolares =  ''; 
            var hfxSoles =    ''; 
            var hfxDolares =  ''; 
            var lblFactura =  ''; 
            var hfTC =  ''; 
            var CodigoTemporal = 0;      
            var Dolares = 0;
            var Soles = 0;  
            var hfCodMoneda = 0; 
            var Valor = 1;

            switch(Flag) 
            {
                case 1:
                    txtTC       = '#' + Fila;         
                    lblID       = txtTC.replace('txtTC', 'lblID');
                    lblSoles    = txtTC.replace('txtTC', 'lblSoles');
                    lblDolares  = txtTC.replace('txtTC', 'lblDolares');
                    hfSoles     = txtTC.replace('txtTC', 'hfSoles'); 
                    hfDolares   = txtTC.replace('txtTC', 'hfDolares'); 
                    hfxSoles    = txtTC.replace('txtTC', 'hfxSoles'); 
                    hfxDolares  = txtTC.replace('txtTC', 'hfxDolares'); 
                    hfTC        = txtTC.replace('txtTC', 'hfTC');
                    hfCodMoneda = txtTC.replace('txtTC', 'hfCodMoneda');
                    lblFactura  = txtTC.replace('txtTC', 'lblFactura');
                    if(Math.abs(parseFloat($(txtTC).val()))==Math.abs(parseFloat($(hfTC).val())))
                        return false;
                    break;
                case 2:
                    lblSoles    = '#' + Fila;         
                    lblID       = lblSoles.replace('lblSoles', 'lblID');
                    txtTC       = lblSoles.replace('lblSoles', 'txtTC');
                    lblDolares  = lblSoles.replace('lblSoles', 'lblDolares');
                    hfSoles     = lblSoles.replace('lblSoles', 'hfSoles'); 
                    hfDolares   = lblSoles.replace('lblSoles', 'hfDolares');  
                    hfxSoles    = lblSoles.replace('lblSoles', 'hfxSoles'); 
                    hfxDolares  = lblSoles.replace('lblSoles', 'hfxDolares');
                    hfCodMoneda = lblSoles.replace('lblSoles', 'hfCodMoneda');
                    lblFactura  = lblSoles.replace('lblSoles', 'lblFactura');
                    if(parseFloat($(hfSoles).val())==parseFloat($(lblSoles).val()))
                        return false; 
                    if(Math.abs(parseFloat($(hfxSoles).val()))< Math.abs(parseFloat($(lblSoles).val())))
                    {
                        $(lblSoles).val($(hfSoles).val());
                        return false;
                    }      
                    break;
                default:
                    lblDolares  = '#' + Fila;         
                    lblID       = lblDolares.replace('lblDolares', 'lblID');
                    txtTC       = lblDolares.replace('lblDolares', 'txtTC');
                    lblSoles    = lblDolares.replace('lblDolares', 'lblSoles');
                    hfSoles     = lblDolares.replace('lblDolares', 'hfSoles'); 
                    hfDolares   = lblDolares.replace('lblDolares', 'hfDolares'); 
                    hfxSoles    = lblDolares.replace('lblDolares', 'hfxSoles'); 
                    hfxDolares  = lblDolares.replace('lblDolares', 'hfxDolares');  
                    hfCodMoneda = lblDolares.replace('lblDolares', 'hfCodMoneda');
                    lblFactura  = lblDolares.replace('lblDolares', 'lblFactura');
                    if(Math.abs(parseFloat($(hfDolares).val()))==Math.abs(parseFloat($(lblDolares).val())))
                        return false;  
                    if(Math.abs(parseFloat($(hfxDolares).val()))< Math.abs(parseFloat($(lblDolares).val())))
                    {
                        $(lblDolares).val($(hfDolares).val());
                        return false;
                    }                        
            }
    
            if(Operacion==0)
                CodigoTemporal = $('#hfCodigoTemporal').val();
            else
                CodigoTemporal = $('#hfCodigoTemporalPago').val();

            if ($('#MainContent_ddlMoneda').val() == $(hfCodMoneda).val())
            {
                    Soles   = $(lblSoles).val();
                    Dolares = $(lblDolares).val();     
            }
            else
            {
                    if ($('#MainContent_ddlMoneda').val() == 1) 
                    {
                            Soles   = parseFloat($(lblDolares).val())*parseFloat($(txtTC).val()); 
                            Dolares = parseFloat($(lblDolares).val());
                    }
                    else
                    {
                            Soles   = $(lblSoles).val() ; 
                            Dolares = parseFloat($(lblSoles).val())/parseFloat($(txtTC).val());
                    }
            }  

            if ($(lblFactura).text().substring(0, 2)=="NC")
                Valor = -1;
            
            if (Soles>0)   
            {
                Soles*=Valor;
                Dolares*=Valor;
            }      
                     
            var objParams = {
                              Filtro_CodFacturaDet: $(lblID).val(),
                              Filtro_TipoCambio: $(txtTC).val(),
                              Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                              Filtro_Soles: Soles,
                              Filtro_Dolares: Dolares,
                              Filtro_CodigoTemporal: CodigoTemporal,
                              Filtro_Operacion : Operacion
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);
            F_ActualizarTC_Net(arg, function (result) {

                var str_resultado_operacion = result.split('~')[0];
                var str_mensaje_operacion = result.split('~')[1];

                MostrarEspera(false);
                if (str_mensaje_operacion == "")
                {          
                     var chkSi = '';
                     var lblSoles = '';
                     var lblDolares = '';
                     var Total = 0;       
                     
                     if (Operacion==0)  
                     {
                             F_Update_Division_HTML('div_grvFactura', result.split('~')[2]);
                             $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                                     chkSi = '#' + this.id;
                                     lblSoles = chkSi.replace('chkEliminar', 'lblSoles');
                                     lblDolares = chkSi.replace('chkEliminar', 'lblDolares');

                                     if ($('#MainContent_ddlMoneda').val()==1)
                                         Total+= parseFloat($(lblSoles).val());
                                     else
                                         Total+= parseFloat($(lblDolares).val());
                             });               
                             $('#MainContent_txtTotalCobranza').val(parseFloat(Total).toFixed(2));    
                     }
                     else
                     {
                            F_Update_Division_HTML('div_FacturaCobranzas', result.split('~')[2]);
                            $('#MainContent_grvFacturaPagos .chkDelete :checkbox').each(function () {
                                 chkSi = '#' + this.id;
                                 lblSoles = chkSi.replace('chkEliminar', 'lblSoles');
                                 lblDolares = chkSi.replace('chkEliminar', 'lblDolares');

                                 if ($('#MainContent_ddlMoneda').val()==1)
                                     Total+= parseFloat($(lblSoles).val());
                                 else
                                     Total+= parseFloat($(lblDolares).val());
                            });               
                            $('#MainContent_txtTotalDeuda').val(parseFloat(Total).toFixed(2)) ;    
                     }
                     $('#MainContent_txtCobroOperacion').val(parseFloat(parseFloat($('#MainContent_txtTotalCobranza').val())-parseFloat($('#MainContent_txtTotalDeuda').val())).toFixed(2));               
                     $('.ccsestilo').css('background', '#FFFFE0');
                }
                else 
                {
                     F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[2]);
                     $('.ccsestilo').css('background', '#FFFFE0');
                }
                return false;
            });
        }
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
            return false;
        } 
}

function F_ValidarTextMoneda() {
if (!F_SesionRedireccionar(AppSession)) return false;
        var lblSoles = '';
        var lblDolares = '';

        $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblSoles = chkSi.replace('chkEliminar', 'lblSoles');
                    lblDolares = chkSi.replace('chkEliminar', 'lblDolares');
                    if($('#MainContent_ddlMoneda').val()==1)
                    {
                        $(lblSoles).prop("readonly",false);
                        $(lblDolares).prop("readonly",true);
                    }
                    else
                    {
                        $(lblSoles).prop("readonly",true);
                        $(lblDolares).prop("readonly",false);
                    }        
         });
        
         $('#MainContent_grvFacturaPagos .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblSoles = chkSi.replace('chkEliminar', 'lblSoles');
                    lblDolares = chkSi.replace('chkEliminar', 'lblDolares');
                    if($('#MainContent_ddlMoneda').val()==1)
                    {
                        $(lblSoles).prop("readonly",false);
                        $(lblDolares).prop("readonly",true);
                    }
                    else
                    {
                        $(lblSoles).prop("readonly",true);
                        $(lblDolares).prop("readonly",false);
                    }        
         });
}

function F_Moneda(Fila,Flag) { 
if (!F_SesionRedireccionar(AppSession)) return false;
     var lblSoles   = '#' + Fila;         
     var lblDolares = lblSoles.replace('lblSoles', 'lblDolares'); 
     var hfSoles = lblSoles.replace('lblSoles', 'hfSoles'); 
     var hfDolares = lblSoles.replace('lblSoles', 'hfDolares'); 
     
     if($(hfSoles).val()<$(lblSoles).val())  
        $(lblSoles).val($(hfSoles).val());

     if($(hfDolares).val()<$(lblDolares).val())  
        $(lblDolares).val($(hfDolares).val());
}

function F_Buscar_Factura () {
if (!F_SesionRedireccionar(AppSession)) return false;
 try 
        {
          var Cadena = "Ingrese los sgtes. campos: "  
          if ($('#hfCodCtaCte').val()=="4479")
             $('#hfCodCtaCte').val("3873");
          if ($('#hfCodCtaCte').val()=="0")
          Cadena=Cadena + '<p></p>' + "Razon Social";

          if (Cadena != "Ingrese los sgtes. campos: ")
          {toastr.warning(Cadena);
          return false;
          }
          
                $("#divConsultaFactura").dialog({
                    resizable: false,
                    modal: true,
                    title: "Consulta de Factura",
                    title_html: true,
                    height: 450,
                    width: 440,
                    autoOpen: false
                });

                $('#divConsultaFactura').dialog('open');
               
                 var objParams = {
                                    Filtro_CodCtaCte: $('#hfCodCtaCte').val()
                                 };
                 var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_Buscar_Factura_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                     F_Update_Division_HTML('div_grvConsultaFactura', result.split('~')[2]);   
                     $('#hfCobranzas').val(0);                      
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }
                return false;
                });
        }
        catch (e) {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
        }
        return false;
}

function F_Buscar_Letra () {
if (!F_SesionRedireccionar(AppSession)) return false;
   try 
        {
          var Cadena = "Ingrese los sgtes. campos: "     
          if ($('#hfCodCtaCte').val()=="0")
          Cadena=Cadena + '<p></p>' + "Razon Social";

          if (Cadena != "Ingrese los sgtes. campos: ")
          {alert(Cadena);
          return false;
          }
          
                $("#divConsultaFactura").dialog({
                    resizable: false,
                    modal: true,
                    title: "Consulta de Letras",
                    title_html: true,
                    height: 450,
                    width: 440,
                    autoOpen: false
                });

                $('#divConsultaFactura').dialog('open');
               

                 var objParams = {
                                    Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                                    Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                                    Filtro_CodTipoOperacion: 1,
                                    Filtro_Total: '700'
                                 };
                 var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_Buscar_Letra_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                  
                    F_Update_Division_HTML('div_grvConsultaFactura', result.split('~')[2]);   
                     $('#hfCobranzas').val(0);                         
                  
                }
                else 
                {
                    alert(result.split('~')[1]);
                }

                return false;

                });


        }
        catch (e) {
            MostrarEspera(false);
            alert("Error Detectado: " + e);
        }

}

function F_EditarMedioPago(Fila) {
if (!F_SesionRedireccionar(AppSession)) return false;
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Editar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
        try {
            var imgID = Fila.id;
            var lblCodigo = '#' + imgID.replace('imgEditar', 'hfCodigo');
            var lblCuenta = '#' + imgID.replace('imgEditar', 'lblCuenta');
            var lblNroOperacion = '#' + imgID.replace('imgEditar', 'lblNroOperacion');
            var hfCodMedioPago = '#' + imgID.replace('imgEditar', 'hfCodMedioPago');
            var hfCodBanco = '#' + imgID.replace('imgEditar', 'hfCodBanco');
            var hfCodCtaBancaria = '#' + imgID.replace('imgEditar', 'hfCodCtaBancaria');
            var hfObservacion = '#' + imgID.replace('imgEditar', 'hfObservacion');
            var hfComision = '#' + imgID.replace('imgEditar', 'hfComision');
            var hfCodMoneda = '#' + imgID.replace('imgEditar', 'hfCodMoneda');
            var hfCodCajaFisicaEdicion = '#' + imgID.replace('imgEditar', 'hfCodCajaFisica');
            var lblFecha = '#' + imgID.replace('imgEditar', 'lblFecha');
            
            //if (!($(hfCodMedioPago).val() == '3' | $(hfCodMedioPago).val() == '4' | $(hfCodMedioPago).val() == '8' | $(hfCodMedioPago).val() == '9' | $(hfCodMedioPago).val() == '10'))
            if ($(hfCodMedioPago).val() == '6')
            {
                toastr.warning('NO SE PUEDE EDITAR');
                return false;
            }


            $('#hfCodCobranza').val($(lblCodigo).val());
            $('#MainContent_ddlBancoEdicion').val($(hfCodBanco).val());
            $('#MainContent_ddlCuentaEdicion').val($(hfCodCtaBancaria).val());
            
            $('#MainContent_txtEmisionEdicion').val($(lblFecha).text());
            $('#MainContent_txtNroOperacionEdicion').val($(lblNroOperacion).text());
            $('#MainContent_txtObservacion').val($(hfObservacion).val());
            $('#MainContent_txtComision').val($(hfComision).val());

            $('#hfCodCajaFisicaEdicion').val($(hfCodCajaFisicaEdicion).val());
            $('#hfCodMedioPagoEdicion').val($(hfCodMedioPago).val());
            $('#hfCodBancoEdicion').val($(hfCodBanco).val());
            $('#hfCodCuentaEdicion').val($(hfCodCtaBancaria).val());

            if ($(hfComision).val() == '0.00' | $(hfComision).val() == '')
            {
                $('#MainContent_chkSComision').prop('checked', true); 
                $('#MainContent_chkCComision').prop('checked', false); 
                $('#MainContent_txtComision').prop('disabled', true); 
                $('#MainContent_txtComision').val('0'); 
            }
            else
            {
                $('#MainContent_chkSComision').prop('checked', false); 
                $('#MainContent_chkCComision').prop('checked', true);             
                $('#MainContent_txtComision').prop('disabled', false); 
            }


            var objParams = 
            {
                Filtro_CodMoneda: $(hfCodMoneda).val(),
                Filtro_CodBanco: ($(hfCodBanco).val() === '') ? '0' : $(hfCodBanco).val(),
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

            MostrarEspera(true);
            F_EdicionMedioPago_Net(arg, function (result) {
                
            MostrarEspera(false);

            var str_resultado_operacion = result.split('~')[0];
            var str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion === "1")
            {
                    F_Update_Division_HTML('div_CajaFisicaEdicion', result.split('~')[2]);
                    $('#MainContent_ddlCajaFisicaEdicion').css('background', '#FFFFE0');

                    F_Update_Division_HTML('div_MedioPagoEdicion', result.split('~')[3]);
                    $('#MainContent_ddlMedioPagoEdicion').css('background', '#FFFFE0');

                    F_Update_Division_HTML('div_BancoEdicion', result.split('~')[4]);
                    $('#MainContent_ddlBancoEdicion').css('background', '#FFFFE0');

                    F_Update_Division_HTML('div_CuentaEdicion', result.split('~')[5]);
                    $('#MainContent_ddlCuentaEdicion').css('background', '#FFFFE0');

                    $('#MainContent_ddlMedioPagoEdicion').val($('#hfCodMedioPagoEdicion').val());
                    $('#MainContent_ddlCajaFisicaEdicion').val($('#hfCodCajaFisicaEdicion').val());
                    $('#MainContent_ddlBancoEdicion').val($('#hfCodBancoEdicion').val());
                    $('#MainContent_ddlCuentaEdicion').val($('#hfCodCuentaEdicion').val());

                    $("#div_EdicionMedioPago").dialog({
                        resizable: false,
                        modal: true,
                        title: "EDICION COBRANZA",
                        title_html: true,
                        height: 330,
                        width: 540,
                        autoOpen: false
                    });


                    $('#div_EdicionMedioPago').dialog('open');

            }
            else
            {
                toastr.warning(str_mensaje_operacion);
            }

            return false;

            });


            return false;

        }

        catch (e) {

            toastr.warning("Error Detectado: " + e);
            return false;
        }

    }

function F_EdicionMedioPago(){
  try 
        {
        var objParams = {   
            Filtro_FechaEmision:           $('#MainContent_txtEmisionEdicion').val(),
            Filtro_CodMedioPago:           $('#MainContent_ddlMedioPagoEdicion').val(),
            Filtro_CodCajaFisica:          $('#MainContent_ddlCajaFisicaEdicion').val(),
            Filtro_CodCobranza:            $('#hfCodCobranza').val(),
            Filtro_CodBanco:               ($('#MainContent_ddlBancoEdicion option:selected').text() === '')? '0' : $('#MainContent_ddlBancoEdicion').val(),
            Filtro_CodCtaBancaria:         ($('#MainContent_ddlCuentaEdicion option:selected').text() === '')? '0' : $('#MainContent_ddlCuentaEdicion').val(),
            Filtro_NroOperacion:           $('#MainContent_txtNroOperacionEdicion').val(),
            Filtro_Observacion:            $('#MainContent_txtObservacion').val(),
            Filtro_Comision:               $('#MainContent_txtComision').val()
                         };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_EditarMedioPago_Net(arg, function (result) {
      
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") 
                {
                    toastr.warning(result.split('~')[1]);  
                    $('#div_EdicionMedioPago').dialog('close');
                    F_Buscar();              
                }
                else 
                {
                    toastr.warning(result.split('~')[1]);
                }

                return false;
                });
        }        
        catch (e) 
        {
            MostrarEspera(false);
            toastr.warning("Error Detectado: " + e);
            return false;
        }
}

function F_Inicializar_Filtros() {

//    $('#MainContent_txtProveedor').val('');
//    $('#hfCodCtaCte').val('0');

    $('#MainContent_chkFiltroFecha').prop('checked', false);
    $('#MainContent_txtFiltroFechaDesde').prop('disabled', true);
    $('#MainContent_txtFiltroFechaHasta').prop('disabled', true);


    $('#MainContent_chkFiltroMonto').prop('checked', false);
    $('#MainContent_txtFiltroMontoDesde').val('');
    $('#MainContent_txtFiltroMontoHasta').val('');
    $('#MainContent_txtFiltroMontoDesde').prop('disabled', true);
    $('#MainContent_txtFiltroMontoHasta').prop('disabled', true);
    

    $('#MainContent_ddlFiltroMoneda').val('0');
    $('#MainContent_ddlFiltroEstado').val('1');
return true;
}

function F_EdicionDetalle(Fila, Tipo) {
    Fila = '#' + Fila;

    var hfSaldo = Fila.replace('chkEditar', 'hfSaldo');
    var hfCodFacturaDet = Fila.replace('chkEditar', 'hfCodFacturaDet');
    var lblFactura = Fila.replace('chkEditar', 'lblFactura');
    var hfTotalFactura = Fila.replace('chkEditar', 'hfTotalFactura');
    var hfSaldo = Fila.replace('chkEditar', 'hfSaldo');
    var hfCodMoneda = Fila.replace('chkEditar', 'hfCodMoneda');
    var hfMoneda = Fila.replace('chkEditar', 'hfMoneda');
    var lblTC = Fila.replace('chkEditar', 'lblTC');

    var lblAcuenta = Fila.replace('chkEditar', 'lblAcuenta');
    var lblSaldoNuevo = Fila.replace('chkEditar', 'lblSaldoNuevo');
    

    if ($(Fila).prop('checked') === false)
        $(Fila).prop('checked', true);
        else
        $(Fila).prop('checked', false);


    if (isNaN($(hfSaldo).val())) {
        return false;
        }

    if (Number($(hfSaldo).val()) === 0) {
        toastr.warning('NO SE PUEDE EDITAR UNA FACTURA CANCELADA');
        return false;
        }

    $('#hfCodFacturaDet').val(Fila);
    $('#hfSoles').val(0);
    $('#hfDolares').val(0);
    $('#MainContent_txtAcuentaEdicion').val($(lblAcuenta).text().replace('S/', '').replace('$', '').trim());
    $('#MainContent_txtNuevoSaldoEdicion').val($(lblSaldoNuevo).text().replace('S/', '').replace('$', '').trim());
    $('#hfCodMonedaEdicion').val($(hfCodMoneda).val());
    $('#MainContent_txtTCEdicion').val($(lblTC).text())
    $('#MainContent_txtFacturaEdicion').val($(lblFactura).text())
    $('#MainContent_txtTotalFacturaEdicion').val("S/ " + $(hfTotalFactura).val())
    $('#MainContent_txtSaldoEdicion').val("S/ " + $(hfSaldo).val())
    if ($(hfCodMoneda).val() === '2') {
        $('#MainContent_txtTotalFacturaEdicion').val("$ " + $(hfTotalFactura).val())
        $('#MainContent_txtSaldoEdicion').val("$ " + $(hfSaldo).val())
        }
    $('#MainContent_lblMonedaEdicion').text($('#MainContent_ddlMoneda option:selected').text());
    $('#MainContent_lblMonedaEdicion2').text($(hfMoneda).val());

    $("#div_EdicionSaldos").dialog({
        resizable: false,
        modal: true,
        title: "Edicion",
        title_html: false,
        height: 180,
        width: 500,
        autoOpen: false
    });
    $('#div_EdicionSaldos').dialog('open');

    $('#MainContent_txtAcuentaEdicion').select();

    return true;
}
    
function F_CalcularEdicion (){
    if (isNaN($('#MainContent_txtAcuentaEdicion').val()) | $('#MainContent_txtAcuentaEdicion').val().trim() === '') {
        $('#MainContent_txtAcuentaEdicion').val('0.00');
        $('#MainContent_txtAcuentaEdicion').select();
        return false;
    }
    $('#MainContent_txtAcuentaEdicion').val(parseFloat($('#MainContent_txtAcuentaEdicion').val()).toFixed(2))


    if (isNaN($('#MainContent_txtTCEdicion').val()) | $('#MainContent_txtTCEdicion').val().trim() === '') {
        $('#MainContent_txtTCEdicion').val(parseFloat($('#MainContent_txtTC').val()).toFixed(6));
        $('#MainContent_txtTCEdicion').select();
        //return false;
    }
    $('#MainContent_txtTCEdicion').val(parseFloat($('#MainContent_txtTCEdicion').val()).toFixed(6));

    var SaldoActualReal = Number($('#MainContent_txtSaldoEdicion').val().replace('S/', '').replace('$', ''));
    var SaldoActual = Math.abs(SaldoActualReal);
    var Soles = 0;
    var Dolares = 0;
    var TC = Number($('#MainContent_txtTCEdicion').val());
    var Acuenta = 0;
    

    if ($('#MainContent_ddlMoneda').val() === $('#hfCodMonedaEdicion').val()){
        if ($('#MainContent_ddlMoneda').val() === '1') {
            Soles = Number($('#MainContent_txtAcuentaEdicion').val());
            Dolares = Number($('#MainContent_txtAcuentaEdicion').val()) / TC;
            Acuenta = Soles;
        }
        else
        {
            Soles = Number($('#MainContent_txtAcuentaEdicion').val()) * TC;
            Dolares = Number($('#MainContent_txtAcuentaEdicion').val());        
            Acuenta = Dolares;
        }
        
    }
    else
    {
        if ($('#MainContent_ddlMoneda').val() === '1') {
            Soles = Number($('#MainContent_txtAcuentaEdicion').val());
            Dolares = Number($('#MainContent_txtAcuentaEdicion').val()) / TC;
             if ($('#hfCodMonedaEdicion').val() === '1')
                Acuenta = Soles;
            else
                Acuenta = Dolares;
        }
        else
        {
            Soles = Number($('#MainContent_txtAcuentaEdicion').val()) * TC;
            Dolares = Number($('#MainContent_txtAcuentaEdicion').val());        
             if ($('#hfCodMonedaEdicion').val() === '1')
                Acuenta = Soles;
            else
                Acuenta = Dolares;
        }
    }


    var Ns = (SaldoActual-Acuenta);
    if (SaldoActualReal < 0) {
        Soles = Soles * -1;
        Dolares = Dolares * -1;
        Acuenta = Acuenta * -1;
        Ns = Ns * -1;
    }

    $('#hfSoles').val(Soles.toFixed(2));
    $('#hfDolares').val(Dolares.toFixed(2));
    $('#MainContent_txtNuevoSaldoEdicion').val(Ns.toFixed(2));
    if ($('#MainContent_txtNuevoSaldoEdicion').val() === '-0.00')
        $('#MainContent_txtNuevoSaldoEdicion').val('0.00')
return true;
}

function F_EditarDetalle (){
    if (F_CalcularEdicion() === false)
    return false;

    var Fila = $('#hfCodFacturaDet').val();
    var hfTotalFactura = Fila.replace('chkEditar', 'hfTotalFactura');
    var hfSoles = Fila.replace('chkEditar', 'hfSoles');
    var hfDolares = Fila.replace('chkEditar', 'hfDolares');
    var lblAcuenta = Fila.replace('chkEditar', 'lblAcuenta');
    var lblSaldoNuevo = Fila.replace('chkEditar', 'lblSaldoNuevo');
    var lblTC = Fila.replace('chkEditar', 'lblTC');


    var SaldoActualReal = Number($('#MainContent_txtSaldoEdicion').val().replace('S/', '').replace('$', ''));

    if (Number($('#MainContent_txtNuevoSaldoEdicion').val()) < 0 & SaldoActualReal > 0) {
        toastr.warning('EL PAGO NO PUEDE SER MAYOR AL SALDO DEL DOCUMENTO');
        return false;
    }
//    var saldoEdicion = Number($('#MainContent_txtSaldoEdicion').val().replace('S/', '').replace('$', ''));
//    var IndexSaldoEdicion= $('#MainContent_txtSaldoEdicion').val().indexOf('$');

//    var acuentaEdicion = Number($('#MainContent_txtAcuentaEdicion').val());

//    if (IndexSaldoEdicion === 0) //si es soles
//    {   
//        if ($('#MainContent_ddlMoneda').val() === '1')
//            acuentaEdicion = acuentaEdicion / Number($('#MainContent_txtTCEdicion').val());
//        else 
//            acuentaEdicion = acuentaEdicion * Number($('#MainContent_txtTCEdicion').val());
//    }
//    else
//    {   
//        if ($('#MainContent_ddlMoneda').val() === '2')
//            acuentaEdicion = acuentaEdicion * Number($('#MainContent_txtTCEdicion').val());
//        else 
//            acuentaEdicion = acuentaEdicion / Number($('#MainContent_txtTCEdicion').val());
//    }


//    //if (Number($('#MainContent_txtAcuentaEdicion').val()) > Number($('#MainContent_txtSaldoEdicion').val().replace('S/', '').replace('$', '')) & SaldoActualReal > 0) {
//    if (acuentaEdicion > saldoEdicion & SaldoActualReal > 0) {
//        toastr.warning('EL PAGO NO PUEDE SER MAYOR AL SALDO DEL DOCUMENTO, ACTUALMENTE ESTA DANDO: ' + acuentaEdicion.toString());
//        return false;
//    }

    var mon1 = 'S/ ';
    if ($('#MainContent_ddlMoneda').val() === '2')
        mon1 = '$ ';
    
    var mon2 = 'S/ ';
    if ($('#hfCodMonedaEdicion').val() === '2')
        mon2 = '$ ';

    var ac = Math.abs($('#MainContent_txtAcuentaEdicion').val()).toFixed(2);
    var sn = Math.abs($('#MainContent_txtNuevoSaldoEdicion').val()).toFixed(2);

    if (SaldoActualReal < 0) {
        ac = ac * -1;
        sn = sn * -1;
    }

    $(lblAcuenta).text(mon1 + ac);
    $(lblSaldoNuevo).text(mon2 + sn);
    $(hfSoles).val($('#hfSoles').val());
    $(hfDolares).val($('#hfDolares').val());
    $(lblTC).text($('#MainContent_txtTCEdicion').val());
    
    $(Fila).prop('checked', true);
    if (Number($('#MainContent_txtAcuentaEdicion').val()) === 0) {
        $(Fila).prop('checked', false);
        $(lblSaldoNuevo).text('0.00');
        $(lblTC).text(parseFloat($('#MainContent_txtTC').val()).toFixed(6));
        }

    var AcuentaCobranza = 0;
    $('#MainContent_grvFacturaCobranzas :checkbox').each(function () {
        chkSi = '#' + this.id;
        var lblAcuenta = chkSi.replace('chkEditar','lblAcuenta')
        if ($(chkSi).prop('checked') === true)
            AcuentaCobranza = AcuentaCobranza + Number($(lblAcuenta).text().replace('S/', '').replace('$', '').trim());
    });
    $('#MainContent_txtTotalCobranza').val(AcuentaCobranza);

    var AcuentaPagos = 0;
    $('#MainContent_grvFacturaPagos :checkbox').each(function () {
        chkSi = '#' + this.id;
        var lblAcuenta = chkSi.replace('chkEditar','lblAcuenta')
        if ($(chkSi).prop('checked') === true)
            AcuentaPagos = AcuentaPagos + Number($(lblAcuenta).text().replace('S/', '').replace('$', '').trim());
    });
    $('#MainContent_txtTotalDeuda').val(AcuentaPagos);

    $('#MainContent_txtCobroOperacion').val(AcuentaPagos-AcuentaCobranza)

    $('#div_EdicionSaldos').dialog('close');
return true;
}

var Ctlgv;
var Hfgv;
function imgMas_Click(Control) {
    Ctlgv = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {

        var grid = $(Control).next();
        F_LlenarGridDetalle(grid.attr('id'));
        //$(Control).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Control).next().html() + '</td></tr>');
//        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }

    return false;
}

function F_LlenarGridDetalle(Fila){
  try 
        {             
                var nmrow = 'MainContent_grvConsulta_pnlOrders_0';
                var Col = Fila.split('_')[3];
                var Codigo = $('#' + Fila.replace('pnlOrders', 'hfCodigo')).val();
                var grvNombre = 'MainContent_grvConsulta_grvDetalle_' + Col;
                Hfgv = '#' + Fila.replace('pnlOrders', 'hfDetalleCargado');

                if ($(Hfgv).val() === "1")
                {
                    $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
                    $(Ctlgv).attr('src', '../Asset/images/minus.gif');
                }
                else 
                {
                                                                                                                                                                                                                        {
                        var objParams = 
                        {
                            Filtro_Col: Col,
                            Filtro_Codigo: Codigo,
                            Filtro_CodTipoDoc: 0,
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

                        if (str_resultado_operacion === "0")
                        {
                            var p = $('#' + result.split('~')[3]).parent();
                            $(p).attr('id', result.split('~')[3].replace('MainContent', 'div')); $(p).empty();

                            F_Update_Division_HTML($(p).attr('id'), result.split('~')[2]);

                            $(Ctlgv).closest('tr').after('<tr><td></td><td colspan = "999">' + $(Ctlgv).next().html() + '</td></tr>');
                            $(Hfgv).val('1');
                        }
                        else
                        {
                            toastr.warning(str_mensaje_operacion);
                        }

                        return false;

                        });
        
                }

                }

        }
        catch (e) 
        {
              MostrarEspera(false);
            toastr.warning("ERROR DETECTADO: " + e);
            return false;
        }

        return true;
}

function imgMasObservacion_Click(Control) {
    Ctlgv = Control;
    var Src = $(Control).attr('src');

    if (Src.indexOf('plus') >= 0) {
        var grid = $(Control).next();
        F_Observacion(grid.attr('id'));        
//        $(Control).attr('src', '../Asset/images/minus.gif');
    }
    else {
        $(Control).attr("src", "../Asset/images/plus.gif");
        $(Control).closest("tr").next().remove();
    }
    return false;
}

function F_Observacion(Fila) {
    try {
        var Col = Fila.split('_')[3];
        var Codigo = $('#' + Fila.replace('pnlOrdersObservacion', 'hfCodigo')).val();
        var grvNombre = 'MainContent_grvConsulta_grvDetalleObservacion_' + Col;
        Hfgv = '#' + Fila.replace('pnlOrdersObservacion', 'hfDetalleCargadoObservacion');

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
                F_Observacion_NET(arg, function (result) {
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
                        toastr.warning(str_mensaje_operacion);
                    }
                    return false;
                });
            }
        }
    }
    catch (e) {
        MostrarEspera(false);
        toastr.warning("ERROR DETECTADO: " + e);
        return false;
    }
    return true;
}

function numerar() {
    var c = 0;
    $('.detallesart2').each(function () {
        c++;
        $(this).text(c.toString());
    });
    $("#MainContent_lblRegistroCobranza").text(c);
}

function numerar2() {
    var c = 0;
    $('.detallesart3').each(function () {
        c++;
        $(this).text(c.toString());
    });
    $("#MainContent_lblRegistroPagados").text(c);
}


