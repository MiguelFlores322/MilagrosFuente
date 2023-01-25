var AppSession = "../CuentasPorCobrar/CobranzasConsultas.aspx";

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
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'2'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            Direccion: item.split(',')[2],
                            Contacto: item.split(',')[18]
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
            $('#MainContent_txtPagador').val(i.item.Contacto);      
        },
        minLength: 3
    });

    $('#MainContent_txtProveedorConsulta').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 1 + "','CodTipoCliente':'2'}",
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
    
    $("#MainContent_chkAplicarSaldo").change(function () {
        if ($('#MainContent_chkAplicarSaldo').is(":checked"))
        {
            $('#MainContent_txtMontoDetalle').val($('#MainContent_txtSaldo').val());
            $('#MainContent_ddlMoneda').val(2);
            $('#MainContent_ddlMoneda').prop("disabled", true);
            if ( parseFloat($('#MainContent_txtMontoDetalle').val()) > parseFloat($('#MainContent_txtSaldo').val()) | parseFloat($('#MainContent_txtMontoDetalle').val()) <= 0)
            {
                $('#MainContent_ddlMoneda').prop("disabled", false);                
            }
        }
        else
        {
            $('#MainContent_txtMontoDetalle').val(parseFloat($('#MainContent_txtSaldo').val()));
            $('#MainContent_ddlMoneda').prop("disabled", false);        
        }
        F_CalcularMontos();
    });

    $('#MainContent_imgBuscar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try 
        {
              var cadena = "Ingresar los sgtes. campos :";

              if ($('#MainContent_txtArticulo').val=="")
                     cadena = cadena + "<p></p>" + "Articulo";

              if ($('#MainContent_ddlMoneda option').size() == 0)
              {     
                     cadena = cadena + "<p></p>" + "Moneda"; 
              }
              else 
              {
                  if ($('#MainContent_ddlMoneda').val() == "-1")
                     cadena = cadena + "<p></p>" + "Moneda";
              }

              if (cadena != "Ingresar los sgtes. campos :")
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

    $('#MainContent_btnAgregarFactura').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

          $('#hfCodigoTemporal').val('0');
          if ($('#MainContent_chkFactura').is(":checked"))
                F_Buscar_Factura();
          else
                F_Buscar_Letra();
          return false;       
    });  

    $('#MainContent_btnAgregar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

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
            alertify.log("Error Detectado: " + e);
        }     
        });

    $('#MainContent_btnEliminarFactura').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

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

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

     try 
        {
            if(!F_ValidarGrabarDocumento())
              return false;

            if (confirm("ESTA SEGURO DE GRABAR LA COBRANZA"))
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

    $('#MainContent_btnGrabarLetra').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

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

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnEliminarLetra').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

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

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnCobranzas').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try 
        {
          var Cadena = "Ingrese los sgtes. campos: "     
          if ($('#hfCodCtaCte').val()=="0")
          Cadena=Cadena + '<p></p>' + "Razon Social";

          if (Cadena != "Ingrese los sgtes. campos: ")
          {alertify.log(Cadena);
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

    $('#MainContent_btnCobranzasEliminar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

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

            alertify.log("Error Detectado: " + e);
        }
     
        });

    $('#MainContent_btnValidar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try 
        {
          var Cadena = "Ingrese los sgtes. campos:";
               
          if ($('#MainContent_txtUsuario').val()=="")
              Cadena=Cadena + '<p></p>' + "usuario";

          if ($('#MainContent_txtContraseña').val()=="")
              Cadena=Cadena + '<p></p>' + "Clave";

          if (Cadena != "Ingrese los sgtes. campos:")
          {alertify.log(Cadena);
          return false;
          }
          
                 var objParams = {
                                     Filtro_Usuario:$('#MainContent_txtUsuario').val(),
                                     Filtro_NvClave:$('#MainContent_txtContraseña').val(),
                                     Filtro_Pagina:'CuentasPorCobrar/RegistroCobranzas.aspx'
                                 }
                 var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_ValidarUsuario_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    $('#hfCodUsuarioAuxiliar').val(result.split('~')[2]);
                    if (str_mensaje_operacion == "USUARIO AUXILIAR AUTORIZADO") 
                    {
                        $('#MainContent_btnAgregarFactura').prop("disabled",false)
                        $('#MainContent_btnGrabar').prop("disabled",false)
                        $('#divSeleccionarEmpresa').dialog('close');
                        $('#MainContent_txtProveedor').focus();
                    }
                    else 
                    {
                        $('#MainContent_btnAgregarFactura').prop("disabled",true)
                        $('#MainContent_btnGrabar').prop("disabled",true)                     
                    }
                       alertify.log(str_mensaje_operacion);
                return false;

                });
        }
        catch (e) {
            MostrarEspera(false);
            alertify.log("Error Detectado: " + e);
        }

        return false;

    }); 

    $('#MainContent_btnBuscarNotaCredito').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

        try 
        {
          var Cadena = "Ingrese los sgtes. campos:";
               
          if ($('#MainContent_txtSerieNotaCredito').val()=="")
              Cadena=Cadena + '<p></p>' + "SERIE NOTA CREDITO";

          if ($('#MainContent_txtNumeroNotaCredito').val()=="")
              Cadena=Cadena + '<p></p>' + "NUMERO NOTA CREDITO";

          if (Cadena != "Ingrese los sgtes. campos:")
          {alertify.log(Cadena);
          return false;
          }
          
                 var objParams = {
                                     Filtro_SerieDoc:   $('#MainContent_txtSerieNotaCredito').val(),
                                     Filtro_NumeroDoc:  $('#MainContent_txtNumeroNotaCredito').val(),
                                     Filtro_CodTipoDoc: 3,
                                     Filtro_CodEmpresa: $('#hfCodEmpresa').val() ,
                                     Filtro_CodCliente: $('#hfCodCtaCteNC').val() 
                                 }
                 var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_VERIFICARNC_NET(arg, function (result) {
                MostrarEspera(false);

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
            
                    if (str_resultado_operacion == "1") 
                    {
                         if (str_mensaje_operacion =="")
                         {
                             $('#hfCodNotaCredito').val(result.split('~')[2]); 
                             $('#MainContent_txtSaldo').val(result.split('~')[3]);  
                             $('#MainContent_ddlMoneda').val(result.split('~')[4]);  
                             $('#MainContent_chkAplicarSaldo').prop("disabled",true);                         
                             $('#MainContent_chkAplicarSaldo').prop("checked",false); 
                             $('#MainContent_ddlMoneda').prop("disabled",true);                          
                         }
                         else
                         {
                         alertify.log(str_mensaje_operacion);                                                    
                         }
                         
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

    $('#MainContent_btnCerrarNotaPedido').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;

     try 
        {
          F_ActualizarDetalle();
          return false;
        }        
        catch (e) 
        {
            alertify.log("Error Detectado: " + e);
        }             
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

    $('#MainContent_txtMontoDetalle').blur(function () {

        if ($('#MainContent_chkAplicarSaldo').is(":checked"))
        {

            if ( parseFloat($('#MainContent_txtMontoDetalle').val()) > parseFloat($('#MainContent_txtSaldo').val()) | parseFloat($('#MainContent_txtMontoDetalle').val()) < 0)
            {
                $('#MainContent_txtMontoDetalle').val($('#MainContent_txtSaldo').val());
                $('#MainContent_ddlMoneda').val(2);
                $('#MainContent_ddlMoneda').prop("disabled", true);
                
            }
        }

        F_CalcularMontos();
        return false;
    });

     $('#MainContent_txtTCDetalle').blur(function () {
         if (parseFloat($('#MainContent_txtTCDetalle').val()) == 0 || $('#MainContent_txtTCDetalle').val()=='' ||  $('#MainContent_ddlMoneda').val()==0)
             return false;

         if ($('#MainContent_ddlMoneda').val()==2)
         {
         $('#MainContent_txtMontoCobrado').val($('#MainContent_txtMontoDetalle').val());
         $('#MainContent_txtNuevoSaldo').val(parseFloat(parseFloat($('#MainContent_txtSaldoActual').val()) - parseFloat($('#MainContent_txtMontoCobrado').val())).toFixed(2));
         }                
         else
         {
          $('#MainContent_txtMontoCobrado').val(parseFloat(parseFloat($('#MainContent_txtMontoDetalle').val())/parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2));
         }
        F_CalcularMontos();
               
         return false;
    });

    $('#MainContent_chkFactura').change(function () {
        if ($(this).is(":checked")) {
            $(this).prop("checked", true);
            $('#MainContent_chkLetra').prop("checked", false);
            $("#MainContent_grvFactura tbody tr").remove();
        }
    });

    $('#MainContent_chkLetra').change(function () {
        if ($(this).is(":checked")) {
            $(this).prop("checked", true);
            $('#MainContent_chkFactura').prop("checked", false);
            $("#MainContent_grvFactura tbody tr").remove();
        }
    });     
    
    $('#MainContent_chkRazonSocial').change(function () {
        if ($(this).is(":checked")) {
            $('#MainContent_txtProveedor').prop("readonly", false);
        }
        else
        {
            $('#MainContent_txtProveedor').prop("readonly", true);
            $('#MainContent_txtProveedor').val("");
            $('#hfCodCtaCte').val('0');
        }
    });

    $('#MainContent_chkRangoMonto').change(function () {
        if ($(this).is(":checked")) {           
            $('#MainContent_txtMontoDesde').prop("readonly", false);
            $('#MainContent_txtMontoHasta').prop("readonly", false);
        }
        else{
            $('#MainContent_txtMontoDesde').val("");
            $('#MainContent_txtMontoHasta').val("");
            $('#MainContent_txtMontoDesde').prop("readonly", true);
            $('#MainContent_txtMontoHasta').prop("readonly", true);
        }
    }); 
    
    $('#MainContent_chkCiudad').change(function () {
        if ($(this).is(":checked")) {
            $('#MainContent_txtDistrito').prop("readonly", false);
        }
        else
        {
            $('#MainContent_txtDistrito').prop("readonly", true);
            $('#MainContent_txtDistrito').val("");
            $('#hfCodDistrito').val('0');
        }
    });    

    $('#MainContent_txtSerieNotaCredito').blur(function () {
        if ($('#MainContent_txtSerieNotaCredito').val() == '')
            return false;
        var id = '0000' + $('#MainContent_txtSerieNotaCredito').val();
        $('#MainContent_txtSerieNotaCredito').val(id.substr(id.length - 4));
        return false;
    });

    $('#MainContent_txtNumeroNotaCredito').blur(function () {
        if ($('#MainContent_txtNumeroNotaCredito').val() == '')
            return false;
        var id = '00000000' + $('#MainContent_txtNumeroNotaCredito').val();
        $('#MainContent_txtNumeroNotaCredito').val(id.substr(id.length - 8));
        return false;
    });

    $('#MainContent_txtProveedor').css('background', '#FFFFE0');

    $('#MainContent_txtTC').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtNroOperacion').css('background', '#FFFFE0');

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

    $('#MainContent_txtEmpresa').css('background', '#FFFFE0');

    $('#MainContent_txtMontoCobrado').css('background', '#FFFFE0');

    $('#MainContent_txtSaldoDetalle').css('background', '#FFFFE0');

    $('#MainContent_txtFechaOperacionDetalle').css('background', '#FFFFE0');

    $('#MainContent_txtMontoDetalle').css('background', '#FFFFE0');

    $('#MainContent_txtTCDetalle').css('background', '#FFFFE0');

    $('#MainContent_txtCobranzaSoles').css('background', '#FFFFE0');

    $('#MainContent_txtUsuario').css('background', '#FFFFE0');

    $('#MainContent_txtContraseña').css('background', '#FFFFE0');

    $('#MainContent_txtMontoDesde').css('background', '#FFFFE0');

    $('#MainContent_txtMontoHasta').css('background', '#FFFFE0');

    $('#MainContent_txtDistrito').css('background', '#FFFFE0');

    $('#MainContent_txtObservacion').css('background', '#FFFFE0');

    $('#MainContent_txtMontoOriginal').css('background', '#FFFFE0');

    $('#MainContent_txtFechaVoucher').css('background', '#FFFFE0');

    $('#MainContent_txtNuevoSaldo').css('background', '#FFFFE0');

    $('#MainContent_txtSaldoActual').css('background', '#FFFFE0');

    $('#MainContent_txtSaldo').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroNotaCredito').css('background', '#FFFFE0');

    $('#MainContent_txtSerieNotaCredito').css('background', '#FFFFE0');


    $('#MainContent_txtCobranzaClienteDisplay').css('background', '#FFFFE0');

    $('#MainContent_txtCobranzaDocumentoDisplay').css('background', '#FFFFE0');

    $('#MainContent_txtCobranzaEmpresaDisplay').css('background', '#FFFFE0');

    $('#MainContent_txtCobranzaFechaDisplay').css('background', '#FFFFE0');

    $('#MainContent_txtCobranzaAcuentaDisplay').css('background', '#FFFFE0');


    F_Derecha();

    F_Controles_Inicializar();

    $("#divSeleccionarEmpresa").dialog({
        resizable: false,
        modal: true,
        title: "VALIDAR USUARIO AUXILIAR",
        title_html: true,
        height: 130,
        width: 250,
        autoOpen: false,
        closeOnEscape: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        }
    });

   // $('#divSeleccionarEmpresa').dialog('open');
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

$(document).on("change", "select[id $= 'MainContent_ddlMoneda']",function () {

    
    if ($('#MainContent_ddlMoneda').val() === '1') {
        $('#tr_TC_DETALLE_COBRANZA').css('display', 'block');
        $('#MainContent_txtTCDetalle').val('');    

    } else {
        $('#tr_TC_DETALLE_COBRANZA').css('display', 'none');
        $('#MainContent_txtTCDetalle').val($('#MainContent_txtTC').val());    
    }
    

     F_ListarNroCuenta();
     F_CalcularMontos();
} );

function F_CalcularMontos()
{
    if ($('#MainContent_chkAplicarSaldo').is(":checked"))
    {
        if (parseFloat($('#MainContent_txtSaldo').val()) == 0)
        {
            $('#MainContent_chkAplicarSaldo').prop("checked", false);
        }
    }

        if ($('#MainContent_ddlMoneda').val()==2)
        {
            $('#MainContent_txtMontoCobrado').val($('#MainContent_txtMontoDetalle').val());
            $('#MainContent_txtNuevoSaldo').val(parseFloat(parseFloat($('#MainContent_txtSaldoActual').val()) - parseFloat($('#MainContent_txtMontoCobrado').val())).toFixed(2));
        }                
        else
        {

        if ($('#MainContent_txtTCDetalle').val() === '') {
            alertify.log('especifique tasa de cambio');
            $('#MainContent_txtTCDetalle').focus();
            }

            $('#MainContent_txtMontoCobrado').val(parseFloat(parseFloat($('#MainContent_txtMontoDetalle').val())/parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2));
            $('#MainContent_txtNuevoSaldo').val(parseFloat(parseFloat($('#MainContent_txtSaldoActual').val()) - parseFloat($('#MainContent_txtMontoCobrado').val())).toFixed(2));
        }             
    return true;
}

$(document).on("change", "select[id $= 'MainContent_ddlBanco']",function () {
     F_ListarNroCuenta();
} );

$(document).on("change", "select[id $= 'MainContent_ddlMedioPago']",function () {
          F_Banco();
          return false;   
} );

$(document).on("change", "select[id $= 'MainContent_ddlDestinoCajaEmpresa']",function () {
     F_ListarNroCuenta();
} );


function F_Controles_Inicializar() {
    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodSerie:  61,
                Filtro_CodBanco:  '1',
                Filtro_CodMoneda: '1',
                Filtro_CodEmpresa: $('#hfCodEmpresa').val()
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
                        F_Update_Division_HTML('div_DestinoCajaEmpresa', result.split('~')[5]); 
                        $('#MainContent_txtTC').val(result.split('~')[3]);
                        $('#MainContent_ddlMoneda').val('2');
                        $('#MainContent_ddlSerieConsulta').val('1');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlBanco').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlCuenta').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlDestinoCajaEmpresa').css('background', '#FFFFE0');
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlMedioPago').val(1);    
                        $('#MainContent_ddlDestinoCajaEmpresa').val(1);    
                        $('#hfCodCtaCte').val('0');
                        $('#hfCodDistrito').val('0');  
                        $('#MainContent_chkRazonSocial').prop("checked",true);
                        $('#MainContent_chkRangoMonto').prop("checked", false);
                        $('#MainContent_chkCiudad').prop("checked", false);       
                        $('#MainContent_btnGrabar').prop("disabled",true);
                        $('#MainContent_txtDistrito').prop("readonly", true);
                        $('#MainContent_txtMontoDesde').prop("readonly", true);
                        $('#MainContent_txtMontoHasta').prop("readonly", true);
                        $('#MainContent_txtProveedor').prop("readonly", true);
                        $('.ccsestilo').css('background', '#FFFFE0');
                        $('#MainContent_chkCliente').prop("checked", true);       
                        $('#MainContent_txtProveedor').prop("readonly", false);
                        $('#MainContent_txtProveedor').focus();
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

function F_ValidarAgregar(){
try 
        {
               var chkSi='';
               var cadena= '';
               var x=0;
               var j=0;
               var lblCodigo='';
               var hfCodigo='';
               var lblFactura_grilla='';
               var chkDel='';

               $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
                     chkSi = '#' + this.id;
                                 
                     if ($(chkSi).is(':checked')) 
                      x=1;                       
               });

               if(x==0)
               {cadena="No ha seleccionado ninguna factura";}
               else
               { 
                    cadena="Las sgtes. facturas se encuentran agregadas :  <br> <p></p>";
                    $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblCodigo = chkSi.replace('chkOK', 'lblCodigo');
               
                         if ($(chkSi).is(':checked')) 
                            {
                                 $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                                        chkDel = '#' + this.id;
                                        hfCodigo = chkDel.replace('chkEliminar', 'hfCodigo');
                                        lblFactura_grilla = chkDel.replace('chkEliminar', 'lblFactura');
                                        if ($(lblCodigo).text()==$(hfCodigo).val())
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
                      alertify.log(cadena);
                      return false;
                   } 
                return true; 
        }        
        catch (e) 
        {
            alertify.log("Error Detectado: " + e);
        }
}

function F_AgregarTemporal(){
try 
        {
        var lblCodigo_grilla='';
        var lblFactura_grilla='';
        var lblEmision_grilla='';
        var lblTotal_grilla='';
        var lblMoneda_grilla='';
        var chkSi='';
        var hfCodMoneda='';
        var hfCodEmpresa='';
        var hfCodCtaCte='';
        var hfTotal='';
        var hfVencimiento='';
        var hfCodTipoDoc = '';
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
                    hfCodEmpresa = chkSi.replace('chkOK', 'hfCodEmpresa');
                    hfCodCtaCte = chkSi.replace('chkOK', 'hfCodCtaCte');
                    hfTotal = chkSi.replace('chkOK', 'hfTotal');
                    hfVencimiento = chkSi.replace('chkOK', 'hfVencimiento');
                    hfCodTipoDoc = chkSi.replace('chkOK', 'hfCodTipoDoc');
                    var objDetalle = {
                        CodigoFactura: $(lblCodigo_grilla).text(),
                        Factura: $(lblFactura_grilla).text(),
                        Emision: $(lblEmision_grilla).text() ,
                        Vencimiento: $(hfVencimiento).val() ,
                        Soles:   0,
                        Dolares: 0,
                        xSoles:   $(lblSoles).text(),
                        xDolares: $(lblDolares).text(),
                        TC: $(lblTC).text(),
                        CodMoneda: $(hfCodMoneda).val(),
                        CodEmpresa: $(hfCodEmpresa).val(),
                        CodCtaCte: $(hfCodCtaCte).val(),
                        Total: $(hfTotal).val(),
                        CodTipoDoc : $(hfCodTipoDoc).val()
                        };
                        $('#hfMoneda').val($(lblMoneda_grilla).text());
                        arrDetalle.push(objDetalle);
                });

                var objParams = {
                                    Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                    Filtro_CodigoTemporal:$('#hfCodigoTemporal').val(),
                                    Filtro_CodMoneda:0
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
                        $('#MainContent_txtTotalCobranza').val('0.00');
                        F_Update_Division_HTML('div_grvFactura', result.split('~')[4]);
                        $('#MainContent_txtCobroOperacion').val('0.00');
                        $('.ccsestilo').css('background', '#FFFFE0');
                       // F_ValidarTextMoneda(); 
                       var chkSi = '';
                       var lblSaldoSoles = '';
                       var lblSaldoDolares = '';
                       var Soles = 0;
                       var Dolares = 0;
                       $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                            chkSi = '#' + this.id;
                            lblSaldoSoles = chkSi.replace('chkEliminar', 'lblSaldoSoles');
                            lblSaldoDolares = chkSi.replace('chkEliminar', 'lblSaldoDolares');                       
                    
                            Soles+=parseFloat($(lblSaldoSoles).text());
                            Dolares+=parseFloat($(lblSaldoDolares).text());
                        });
                     
                       $('#MainContent_txtTotalDeuda').val(Dolares.toFixed(2));
                       $('#divConsultaFactura').dialog('close');                  
                       $('#MainContent_ddlMoneda').prop("disabled", false);      
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

function F_MostrarTotales(){

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
                        CodDetalle: $(lblID).text()
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

function F_ValidarEliminar_Factura(){

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
               alertify.log("Seleccione una factura para eliminar");
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
            var Cadena = 'Ingresar los sgtes. Datos:'; 

            if ($(Cuerpo + 'txtProveedor').val()=='' || $('#hfCodCtaCte').val()==0)
                    Cadena=Cadena + '<p></p>' + 'Razon Social';
        
            if ($(Cuerpo + 'txtTCDetalle').val()=='0')
                    Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

            if ($(Cuerpo + 'txtTCDetalle').val()=='')
                    Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

            if ($(Cuerpo + 'txtEmision').val()=='')
                    Cadena=Cadena + '<p></p>' + 'Emision';
                    
            if ($(Cuerpo + 'ddlMedioPago').val()=='0')
                    Cadena=Cadena + '<p></p>' + 'Medio de Pago';
                    
            if ($('#MainContent_chkAplicarSaldo').is(":checked"))
            {
                if (parseFloat($('#MainContent_txtNuevoSaldo').val()) < 0)
                Cadena=Cadena + '<p></p>' + 'No se puede aplicar Saldo Mayor a la Deuda';
            }

            var Mensaje = "LOS SGTES DOCUMENTOS TIENEN UN ACUENTA CERO";
            var lblFactura = '';
            var lblSoles='';
            var lblDolares='';
            var Soles=0;
            var Dolares=0;
            var chkSi = '';
            $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                            chkSi = '#' + this.id;
                            lblSoles = chkSi.replace('chkEliminar', 'lblSoles');
                            lblDolares = chkSi.replace('chkEliminar', 'lblDolares');                       
                            lblFactura = chkSi.replace('chkEliminar', 'lblFactura'); 
                    
                            Soles=parseFloat($(lblSoles).text());
                            Dolares=parseFloat($(lblDolares).text());

                            if ($(chkSi).is(":checked") && (Soles==0 || Dolares==0)) 
                                Mensaje = Mensaje + '<p></p>'  + $(lblFactura).text();
            });

            if (Mensaje != "LOS SGTES DOCUMENTOS TIENEN UN ACUENTA CERO")
               Cadena = Cadena  + '<p></p>'  + Mensaje;

            if (Cadena != 'Ingresar los sgtes. Datos:')
            {
                alertify.log(Cadena.toUpperCase());
                return false;
            }
            return true;
        }        
        catch (e) 
        {
            alertify.log("Error Detectado: " + e);
        }
}

function F_GrabarDocumento(){
  try 
        {
        var Contenedor = '#MainContent_';
        var CodBanco=0;
        var CodCtaBancaria=0;
        var NroOperacion='';
        var CodTipoDoc=1;
        var CobranzaSoles = 0;
        var CobranzaDolares = 0;
        var chkEliminar = "";      
        var lblDolares = "";
        var lblSoles = "";
        var Total = 0.00;
        var CodTipoDoc=1;
        var Soles = 0;
        var Dolares = 0;
        var xSoles = 0;
        var xDolares = 0;

         if ($('#MainContent_chkLetra').is(":checked")) 
          CodTipoDoc=19;

         if ($('#MainContent_ddlMoneda').val() == $('#hfCodMonedaDetalle').val())
           {
                    if ($('#MainContent_ddlMoneda').val()== "1") 
                    {
                        Soles    = $('#MainContent_txtMontoDetalle').val();
                        Dolares  = (parseFloat($('#MainContent_txtMontoDetalle').val())/parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2); 
                        xSoles   = $('#MainContent_txtMontoDetalle').val();
                        xDolares = (parseFloat($('#MainContent_txtMontoDetalle').val())/parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2);   
                    }
                    else
                    {
                        Soles   = (parseFloat($('#MainContent_txtMontoDetalle').val())*parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2); 
                        Dolares = $('#MainContent_txtMontoDetalle').val(); 
                        xSoles   = (parseFloat($('#MainContent_txtMontoDetalle').val())*parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2); 
                        xDolares = $('#MainContent_txtMontoDetalle').val();   
                    }                        
           }
           else
           {
                    if ($('#MainContent_ddlMoneda').val() == 1) 
                    {
                            Soles   = $('#MainContent_txtMontoDetalle').val(); 
                            Dolares = (parseFloat($('#MainContent_txtMontoDetalle').val())/parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2);
                            xSoles   = (parseFloat($('#MainContent_txtSaldoDetalle').val())*parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2); 
                            xDolares = parseFloat($('#MainContent_txtSaldoDetalle').val()).toFixed(2);
                    }
                    else
                    {
                            Soles   =  (parseFloat($('#MainContent_txtMontoDetalle').val())*parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2);
                            Dolares =  $('#MainContent_txtMontoDetalle').val();
                            xSoles   = parseFloat($('#MainContent_txtSaldoDetalle').val()).toFixed(2);
                            xDolares = (parseFloat($('#MainContent_txtSaldoDetalle').val())/parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2); 
                    }
            }   

            var FlagSaldoAplicado = 0;
            if ($('#MainContent_chkAplicarSaldo').is(":checked"))
                FlagSaldoAplicado = 1;

       CobranzaSoles = Soles;
       CobranzaDolares=Dolares;
        var objParams = {
                             Filtro_CodigoTemporal:        $('#hfCodigoTemporal').val(),
                             Filtro_CodigoTemporalPago:    $('#hfCodigoTemporalPago').val(),
                             Filtro_CodMoneda:             $(Contenedor + 'ddlMoneda').val(),
                             Filtro_CodMedioPago:          $(Contenedor + 'ddlMedioPago').val(),
                             Filtro_NroOperacion:          '',
                             Filtro_TipoCambio:            $(Contenedor + 'txtTC').val(),
                             Filtro_FechaOperacion:        $(Contenedor + 'txtOperacion').val(),
                             Filtro_FechaEmision:          $(Contenedor + 'txtEmision').val(),
                             Filtro_Responsable:           $(Contenedor + 'txtResponsable').val(),
                             Filtro_Observacion:           $(Contenedor + 'txtObservacion').val(),
                             Filtro_CodBanco:              0,
                             Filtro_CodCtaBancaria:        0,
                             Filtro_CobranzaSoles:         CobranzaSoles,
                             Filtro_DeudaSoles:            0,
                             Filtro_CobroOperacionSoles:   CobranzaSoles,
                             Filtro_CobranzaDolares:       CobranzaDolares,
                             Filtro_DeudaDolares:          0,
                             Filtro_CobroOperacionDolares: CobranzaDolares,
                             Filtro_CodTipoDoc:            CodTipoDoc,
                             Filtro_CodCtaCte:             $('#hfCodCtaCte').val(),
                             Filtro_CodSede:               $('#hfCodSede').val(),
                             Filtro_CodEmpresa:            $('#hfCodEmpresa').val(),
                             Filtro_CodUsuarioAuxiliar:    $('#hfCodUsuarioAuxiliar').val(),
                             Filtro_SaldoAplicado:         FlagSaldoAplicado,
                             Filtro_CodNotaCredito:        $('#hfCodNotaCredito').val(),
                             Filtro_CodDestinoCajaEmpresa: $('#MainContent_ddlDestinoCajaEmpresa').val()
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
                            alertify.log('SE REGISTRO LA COBRANZA CORRECTAMENTE');
                            F_Buscar_Factura();
                            $('#MainContent_ddlMoneda').prop("disabled", false);    
                    }   
                    else
                    alertify.log(result.split('~')[1]);                
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
       var Contenedor = '#MainContent_';
       $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
       $('.Jq-ui-dtp').datepicker('setDate', new Date());
       $('#hfCodigoTemporal').val('0');
       $('#hfMoneda').val('0');  
       $('#hfCodUsuarioAuxiliar').val('0');  
       $(Contenedor + 'txtTotalCobranza').val('0.00');
       $(Contenedor + 'txtTotalDeuda').val('0.00') ;
       $(Contenedor + 'txtResponsable').val('');
       $(Contenedor + 'txtPagador').val(''); 
       $(Contenedor + 'txtUsuario').val('');
       $(Contenedor + 'txtContraseña').val('');
       $(Contenedor + 'txtEmpresa').val('');
       $(Contenedor + 'txtCobroOperacion').val('0.00') ;   
       $(Contenedor + 'txtCobranzaSoles').val('0.00') ;     
       $(Contenedor + 'ddlMoneda').val('2'),
       $(Contenedor + 'ddlMedioPago').val(1),
       $(Contenedor + 'txtProveedor').val('');
       $('#MainContent_txtDistrito').prop("readonly", true);
       $('#MainContent_txtMontoDesde').prop("readonly", true);
       $('#MainContent_txtMontoHasta').prop("readonly", true);
       $('#MainContent_txtProveedor').prop("readonly", true);
       $('#MainContent_txtDistrito').val("");
       $('#MainContent_txtMontoDesde').val("");
       $('#MainContent_txtMontoHasta').val("");
       $('#MainContent_txtProveedor').val("");
       $('#hfCodCtaCte').val('0');     
       $('#hfCodUsuarioAuxiliarAnulacion').val('0');
       $('#MainContent_btnGrabar').prop("disabled",true)
       $('#MainContent_chkRazonSocial').prop("checked",true);
       $('#MainContent_txtProveedor').prop("readonly", false);
       
       
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
                    F_Update_Division_HTML('div_grvFactura', result.split('~')[3]);                            
                    F_Update_Division_HTML('div_FacturaCobranzas', result.split('~')[4]);         
                    $('.ccsestilo').css('background', '#FFFFE0');
                    //$('#divSeleccionarEmpresa').dialog('open');
                    $('#MainContent_txtProveedor').focus();
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
              var chkSerie='0';

              if ($('#MainContent_chkCliente').is(':checked') & Number($('#hfCodCtaCteConsulta').val()) == 0) {
                alertify.log('DEBE ESPECIFICAR UN CLIENTE');
                return false;
              }


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
                                 Filtro_CodSede: $('#hfCodSede').val(),
                                 Filtro_CodEmpresa: $('#hfCodEmpresa').val()
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
                    if  (str_mensaje_operacion!="")                       
                    alertify.log(result.split('~')[1]);
                  
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
        if ($('#hfCodUsuarioAuxiliarAnulacion').val()=='0')
        {
             $('#divSeleccionarEmpresa').dialog('open');
             $('#hfCodUsuarioAuxiliarAnulacion').val('1');
             return false;
        }            

                var imgID = Fila.id;
                var lblID = '#' + imgID.replace('imgAnularDocumento', 'lblID');
                var lblCodigo_Factura = '#' + imgID.replace('imgAnularDocumento', 'hfcodfactura');
                var lblnumero_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblnumero');
                var lblProveedor = '#' + imgID.replace('imgAnularDocumento', 'lblProveedor');

                if(!confirm("ESTA SEGURO DE ELIMINAR LA COBRANZA DEL CLIENTE "  + $(lblProveedor).text()))
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
                                      Filtro_CodCobranza: $(lblID).val(),
                                      Filtro_CodDocumentoVenta: $(lblCodigo_Factura).val(),
                                      Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                      Filtro_Desde: $('#MainContent_txtDesde').val(),
                                      Filtro_Hasta: $('#MainContent_txtHasta').val(),
                                      Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                      Filtro_ChkNumero: chkNumero,
                                      Filtro_ChkFecha: chkFecha,
                                      Filtro_ChkCliente: chkCliente,
                                      Filtro_ChkSerie: chkSerie,
                                      Filtro_CodSede: $('#hfCodSede').val(),
                                      Filtro_CodEmpresa: $('#hfCodEmpresa').val()
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
                $('#hfCodUsuarioAuxiliarAnulacion').val('0');
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

function getContentTab(){
    //$('#MainContent_chkRango').prop('checked', true);
    $('#MainContent_txtDesde').val(Date_AddDays($('#MainContent_txtHasta').val(), -7));
    $('#MainContent_chkRango').prop('checked', false);
    $('#MainContent_chkCliente').prop('checked', true);
    //F_Buscar();
    return false;
}

function F_ValidarAgregarLetra(){

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
        {alertify.log(Cadena);
        $(Cuerpo + 'txtNroLetra').focus();
        return false;}
        return true;
        }
        
    catch (e) 
        {

            alertify.log("Error Detectado: " + e);
        }
}

function F_AgregarLetra(){

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
                     alertify.log('La(s) Letra(s) se ha agregado con exito'); 
                     F_LimpiarLetra();
                     
                   }
                   else
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

function F_ValidarEliminar_Letra(){

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
               alertify.log("Seleccione una Letra para eliminar");
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

function F_EliminarTemporal_Letra(){

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
                    alertify.log(result.split('~')[2]);
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

function F_LimpiarLetra(){

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

    var arg;

    try {

        var objParams = {
            Filtro_CodBanco:  $('#MainContent_ddlBanco').val(),
            Filtro_CodMoneda:  $('#MainContent_ddlMoneda').val(),
            Filtro_CodEmpresa: $('#hfCodEmpresa').val(),
            Filtro_CodDestinoCajaEmpresa: $('#MainContent_ddlDestinoCajaEmpresa').val()
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

                        alertify.log(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
    MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);

    }

}

function F_ValidarAgregarFacturaCobranzas(){
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
                                 $('#MainContent_grvFacturaCobranzas .chkDelete :checkbox').each(function () {
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
                      alertify.log(cadena);
                      return false;
                   } 
                   return true;                 
        }        
        catch (e) 
        {
            alertify.log("Error Detectado: " + e);
        }
}

function F_AgregarTemporalCobranzas(){
try 
        {
        var lblCodigo_grilla='';
        var lblFactura_grilla='';
        var lblEmision_grilla='';
        var lblTotal_grilla='';
        var lblMoneda_grilla='';
        var chkSi='';
        var arrDetalle = new Array();
                   
                $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblCodigo_grilla = chkSi.replace('chkOK', 'lblCodigo');
                    lblFactura_grilla = chkSi.replace('chkOK', 'lblFactura');
                    lblEmision_grilla = chkSi.replace('chkOK', 'lblEmision');
                    lblSoles = chkSi.replace('chkOK', 'lblSoles');
                    lblDolares = chkSi.replace('chkOK', 'lblDolares');
                    lblTC = chkSi.replace('chkOK', 'lblTC');             

             
                        var objDetalle = {
                            CodigoFactura: $(lblCodigo_grilla).text(),
                            Factura: $(lblFactura_grilla).text(),
                            Emision: $(lblEmision_grilla).text() ,
                            Soles:   $(lblSoles).text(),
                            Dolares: $(lblDolares).text(),
                            TC:      $(lblTC).text()
                        };
                        $('#hfMoneda').val($(lblMoneda_grilla).text());
                        arrDetalle.push(objDetalle);
                  
                });

                var objParams = {
                                Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                Filtro_CodigoTemporal:$('#hfCodigoTemporalPago').val(),
                                Filtro_CodMoneda:2
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
                    alertify.log(result.split('~')[2]);
                }
                return false;
                });
        }        
        catch (e) 
        {
            alertify.log("Error Detectado: " + e);
        }
}

function F_EliminarTemporal_FacturaCobranza(){

  try 
        {
        var chkSi='';
        var arrDetalle = new Array();
        var lblID='';        
               
                $('#MainContent_grvFacturaCobranzas .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblID = chkSi.replace('chkEliminar', 'lblID');
                   
                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {                       
                        CodDetalle: $(lblID).text()
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

function F_ValidarEliminar_FacturaCobranza(){

 try 
        {
        var chkSi='';
        var x=0;
                
                $('#MainContent_grvFacturaCobranzas .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                               
                     if ($(chkSi).is(':checked')) 
                        x=1;
                        
               });

               if(x==0)
               {
               alertify.log("Seleccione una proforma para eliminar");
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
            var hfTC =  ''; 
            var CodigoTemporal = 0;      
            var Dolares = 0;
            var Soles = 0;  
            var hfCodMoneda = 0; 
            var hfCodBanco =    ''; 
            var hfCodCtaBancaria =  ''; 
            var NroOperacion =    ''; 
            var FechaOperacion =  ''; 

            switch(Flag) 
            {
                case 1:
                    txtTC       = '#' + Fila;         
                    lblID       = txtTC.replace('txtTC', 'hfID');
                    lblSoles    = txtTC.replace('txtTC', 'lblSoles');
                    lblDolares  = txtTC.replace('txtTC', 'lblDolares');
                    hfSoles     = txtTC.replace('txtTC', 'hfSoles'); 
                    hfDolares   = txtTC.replace('txtTC', 'hfDolares'); 
                    hfxSoles    = txtTC.replace('txtTC', 'hfxSoles'); 
                    hfxDolares  = txtTC.replace('txtTC', 'hfxDolares'); 
                    hfTC        = txtTC.replace('txtTC', 'hfTC');
                    hfCodMoneda = txtTC.replace('txtTC', 'hfCodMoneda');
                    hfCodBanco    = txtTC.replace('txtTC', 'hfCodBanco'); 
                    hfCodCtaBancaria  = txtTC.replace('txtTC', 'hfCodCtaBancaria'); 
                    lblNroOperacion        = txtTC.replace('txtTC', 'lblNroOperacion');
                    lblFechaOperacion = txtTC.replace('txtTC', 'lblFechaOperacion');
                    if(parseFloat($(txtTC).val())==parseFloat($(hfTC).val()))
                        return false;
                    break;
                case 2:
                    lblSoles    = '#' + Fila;         
                    lblID       = lblSoles.replace('lblSoles', 'hfID');
                    txtTC       = lblSoles.replace('lblSoles', 'txtTC');
                    lblDolares  = lblSoles.replace('lblSoles', 'lblDolares');
                    hfSoles     = lblSoles.replace('lblSoles', 'hfSoles'); 
                    hfDolares   = lblSoles.replace('lblSoles', 'hfDolares');  
                    hfxSoles    = lblSoles.replace('lblSoles', 'hfxSoles'); 
                    hfxDolares  = lblSoles.replace('lblSoles', 'hfxDolares');
                    hfCodMoneda = lblSoles.replace('lblSoles', 'hfCodMoneda');
                    hfCodBanco    = lblSoles.replace('lblSoles', 'hfCodBanco'); 
                    hfCodCtaBancaria  = lblSoles.replace('lblSoles', 'hfCodCtaBancaria'); 
                    lblNroOperacion        = lblSoles.replace('lblSoles', 'lblNroOperacion');
                    lblFechaOperacion = lblSoles.replace('lblSoles', 'lblFechaOperacion');
                    if(parseFloat($(hfSoles).val())==parseFloat($(lblSoles).val()))
                        return false; 
                    if(parseFloat($(hfxSoles).val()) < parseFloat($(lblSoles).val()))
                    {
                        $(lblSoles).val($(hfSoles).val());
                        return false;
                    }      
                    break;
                default:
                    lblDolares  = '#' + Fila;         
                    lblID       = lblDolares.replace('lblDolares', 'hfID');
                    txtTC       = lblDolares.replace('lblDolares', 'txtTC');
                    lblSoles    = lblDolares.replace('lblDolares', 'lblSoles');
                    hfSoles     = lblDolares.replace('lblDolares', 'hfSoles'); 
                    hfDolares   = lblDolares.replace('lblDolares', 'hfDolares'); 
                    hfxSoles    = lblDolares.replace('lblDolares', 'hfxSoles'); 
                    hfxDolares  = lblDolares.replace('lblDolares', 'hfxDolares');  
                    hfCodMoneda = lblDolares.replace('lblDolares', 'hfCodMoneda');
                    hfCodBanco    = lblDolares.replace('lblDolares', 'hfCodBanco'); 
                    hfCodCtaBancaria  = lblDolares.replace('lblDolares', 'hfCodCtaBancaria'); 
                    lblNroOperacion        = lblDolares.replace('lblDolares', 'lblNroOperacion');
                    lblFechaOperacion = lblDolares.replace('lblDolares', 'lblFechaOperacion');

                    if(parseFloat($(hfDolares).val())==parseFloat($(lblDolares).val()))
                        return false;  
                    if(parseFloat($(hfxDolares).val()) < parseFloat($(lblDolares).val()))
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
                     
            var objParams = {
                              Filtro_CodFacturaDet: $(lblID).val(),
                              Filtro_TipoCambio: $(txtTC).val(),
                              Filtro_CodMoneda: $('#MainContent_ddlMoneda').val(),
                              Filtro_Soles: Soles,
                              Filtro_Dolares: Dolares,
                              Filtro_CodigoTemporal: CodigoTemporal,
                              Filtro_Operacion : Operacion,
                              Filtro_CodBanco: $(hfCodBanco).val(),
                              Filtro_CodCtaBancaria: $(hfCodCtaBancaria).val(),
                              Filtro_NroOperacion: $(lblNroOperacion).text(),
                              Filtro_FechaOperacion : $(lblFechaOperacion).text(),
                              Filtro_FlagCheck : 1
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
                             $('#MainContent_txtCobroOperacion').val(parseFloat(Total).toFixed(2));  
                     }
                     else
                     {
                             F_Update_Division_HTML('div_FacturaCobranzas', result.split('~')[2]);
                             $('#MainContent_grvFacturaCobranzas .chkDelete :checkbox').each(function () {
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
            alertify.log("Error Detectado: " + e);
            return false;
        } 
}

function F_ValidarTextMoneda()
{
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
        
         $('#MainContent_grvFacturaCobranzas .chkDelete :checkbox').each(function () {
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
     var lblSoles   = '#' + Fila;         
     var lblDolares = lblSoles.replace('lblSoles', 'lblDolares'); 
     var hfSoles = lblSoles.replace('lblSoles', 'hfSoles'); 
     var hfDolares = lblSoles.replace('lblSoles', 'hfDolares'); 
     
     if($(hfSoles).val()<$(lblSoles).val())  
        $(lblSoles).val($(hfSoles).val());

     if($(hfDolares).val()<$(lblDolares).val())  
        $(lblDolares).val($(hfDolares).val());
}

function F_Buscar_Factura()
{
 try 
        {
                var Cadena = "Ingrese los sgtes. campos: ";
                var MontoDesde = 0;
                var MontoHasta = 0;
                
                if ($('#MainContent_chkRazonSocial').is(':checked') & ($('#MainContent_txtProveedor').val()=="" || $('#hfCodCtaCte').val()=="0"))
                    Cadena=Cadena + '<p></p>' + "Razon Social";

                if ($('#MainContent_chkRangoMonto').is(':checked') & $('#MainContent_txtMontoDesde').val()=="")
                    Cadena=Cadena + '<p></p>' + "Monto Desde";

                if ($('#MainContent_chkRangoMonto').is(':checked') & $('#MainContent_txtMontoHasta').val()=="")
                    Cadena=Cadena + '<p></p>' + "Monto Hasta";

                if ($('#MainContent_chkCiudad').is(':checked') & ($('#MainContent_txtDistrito').val()=="" || $('#hfCodDistrito').val()=="0"))
                    Cadena=Cadena + '<p></p>' + "Monto Hasta";

                if (Cadena != "Ingrese los sgtes. campos: ")
                {
                  alertify.log(Cadena);
                  return false;
                }

                if ($('#MainContent_txtMontoDesde').val()!="")
                    MontoDesde = $('#MainContent_txtMontoDesde').val();

                if ($('#MainContent_txtMontoHasta').val()!="")
                    MontoHasta = $('#MainContent_txtMontoHasta').val();

               
                 var objParams = {
                                    Filtro_CodCtaCte:   $('#hfCodCtaCte').val(),
                                    Filtro_CodDistrito: $('#hfCodDistrito').val(),
                                    Filtro_MontoDesde:  MontoDesde,
                                    Filtro_MontoHasta:  MontoHasta
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
                     F_Update_Division_HTML('div_grvFactura', result.split('~')[4]); 
                     if (result.split('~')[3]=='0') 
                     {
                         
                         alertify.log('NO SE ENCONTRARON REGISTROS');
                         return false;
                     }
                     else
                     {
                         F_AgregarFacturaCobranzas();   
                     }
                     $('#hfCobranzas').val(0);                                         
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
}

function F_Buscar_Letra ()
{
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

function F_ElegirEmpresa(Fila) {
    MostrarEspera(true);
    var imgID = Fila.id;
    var hfCodEmpresaGrilla = '#' + imgID.replace('imgSelecEmpresa', 'hfCodEmpresa');
    var ddlSede       = '#' + imgID.replace('imgSelecEmpresa', 'ddlSede');
    var lblRazonSocial = '#' + imgID.replace('imgSelecEmpresa', 'lblRazonSocial');
    $('#hfCodEmpresa').val($(hfCodEmpresaGrilla).val());
    var codSed = $(ddlSede).val();
    $('#hfCodSede').val(codSed);

    $('#divSeleccionarEmpresa').dialog('close');
    var Cuerpo = '#MainContent_';
    $(Cuerpo + 'txtEmpresa').val($(lblRazonSocial).text());
    F_Controles_Inicializar();
    MostrarEspera(false);
}

function F_AgregarFacturaCobranzas()
{
            if ($('#hfCobranzas').val()==0)
            { 
//                if (!F_ValidarAgregar())
//                    return false;
                F_AgregarTemporal();
            }
            else
            {
//                if (!F_ValidarAgregarFacturaCobranzas())
//                    return false;
                F_AgregarTemporalCobranzas();        
            }
}

function F_ListarNroCuenta_Detalle(Fila) {
    var arg;
    var imgID = Fila.id;
    var ddlCuentaBancaria = '#' + imgID.replace('ddlBanco', 'ddlCuentaBancaria');

  
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

                        alertify.log(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
    MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);

    }

}

function F_EditarDetalle(Fila) {
     var imgID = '#' + Fila;  
     $('hfCampo').val(imgID);
     var hfCodEmpresa =imgID.replace('chkEliminar', 'hfCodEmpresa');
     var lblSaldoSoles =  imgID.replace('chkEliminar', 'lblSaldoSoles');
     var lblSaldoDolares = imgID.replace('chkEliminar', 'lblSaldoDolares');
     var lblSoles =  imgID.replace('chkEliminar', 'lblSoles');
     var lblDolares = imgID.replace('chkEliminar', 'lblDolares');
     var txtTC = imgID.replace('chkEliminar', 'txtTC');
     var chkEliminar = imgID.replace('chkEliminar', 'chkEliminar');
     var hfID = imgID.replace('chkEliminar', 'hfID');
     var hfCodMoneda = imgID.replace('chkEliminar', 'hfCodMoneda');
     var hfMoneda = imgID.replace('chkEliminar', 'hfMoneda');
     var lblFactura = imgID.replace('chkEliminar', 'lblFactura');
     var lblTotal = imgID.replace('chkEliminar', 'lblTotal');
     var hfSaldo =imgID.replace('chkEliminar', 'hfSaldo');
     var hfCodCtaCte =imgID.replace('chkEliminar', 'hfCodCtaCte');
     var hfEmpresa =imgID.replace('chkEliminar', 'hfEmpresa');
     var hfCliente =imgID.replace('chkEliminar', 'hfCliente');
     var hfNumero =imgID.replace('chkEliminar', 'hfNumero');
     var hfEmision =imgID.replace('chkEliminar', 'hfEmision');
     var hfVencimiento =imgID.replace('chkEliminar', 'hfVencimiento');
     var hfAcuenta = imgID.replace('chkEliminar', 'hfAcuenta');

     var Cuerpo = '#MainContent_';

     $(Cuerpo + 'txtMontoOriginal').val($(lblTotal).text()); 
     $(Cuerpo + 'txtSaldoActual').val($(lblSaldoDolares).text()); 
     $('#hfFactura').val($(lblFactura).text().substring(0, 2));       
     $('#hfDetalleSoles').val($(lblSaldoSoles).text());
     $('#hfDetalleDolares').val($(lblSaldoDolares).text()); 
     $('#hfIDDetalle').val($(hfID).val()); 
     $('#hfCodMonedaDetalle').val($(hfCodMoneda).val()); 
     $('#hfCodEmpresa').val($(hfCodEmpresa).val()); 
     $('#hfCodCtaCteNC').val($(hfCodCtaCte).val()); 
     $('#hfCodNotaCredito').val(0); 
     $(Cuerpo + 'txtMonedaDetalle').val($(hfMoneda).val());
     $(Cuerpo + 'txtTCDetalle').val($(txtTC).text());
     $(txtTC).prop('readonly',false); 
     $(Cuerpo + 'txtMontoDetalle').val('');
     $(Cuerpo + 'txtMontoCobrado').val('');
     $(Cuerpo + 'txtNuevoSaldo').val('');
     $(Cuerpo + 'txtObservacion').val('');
     $(Cuerpo + 'txtNroOperacion').val('');
     $(Cuerpo + 'txtSerieNotaCredito').val('');
     $(Cuerpo + 'txtNumeroNotaCredito').val('');
     $('#MainContent_ddlMoneda').prop('disabled',false);
     $('#MainContent_ddlBanco').val(0);
     $('#MainContent_ddlMoneda').val(0);
     $('#MainContent_ddlMedioPago').val(0);
     $('#MainContent_chkAplicarSaldo').prop("disabled",false);                         
     $('#MainContent_chkAplicarSaldo').prop("checked",false); 
     $('#MainContent_ddlMoneda').prop("disabled",false);   
     $('#MainContent_txtFechaOperacionDetalle').val('');

     $(Cuerpo + 'txtCobranzaClienteDisplay').val($(hfCliente).val());
     $(Cuerpo + 'txtCobranzaDocumentoDisplay').val($(hfNumero).val());
     $(Cuerpo + 'txtCobranzaEmpresaDisplay').val($(hfEmpresa).val());
     $(Cuerpo + 'txtCobranzaFechaDisplay').val($(hfEmision).val());
     $(Cuerpo + 'txtCobranzaAcuentaDisplay').val($(hfAcuenta).val());

     if ($(Cuerpo + 'txtCobranzaFechaDisplay').val() === '')
        $(Cuerpo + 'txtCobranzaFechaDisplay').val($(hfVencimiento).val());   


     $(Cuerpo + 'txtSaldo').val($(hfSaldo).val());
     var chkEliminar = '';
  
     $("#div_CerrarNota").dialog({
         resizable: false,
         modal: true,
         title: "Detalle Cobranza",
         title_html: true,
         height: 470,
         width: 1000,
         autoOpen: false,
         close : function(){
                  $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                    chkEliminar = '#' + this.id;
                   $(chkEliminar).prop('checked',false)   ;                    
             });
              }  
     });
     $('#div_CerrarNota').dialog('open');    
}

function F_Banco() {
    var Cuerpo = '#MainContent_';
    var arg;
    var FlagCaja = 0; 

    if ($(Cuerpo + 'ddlMedioPago').val()=='1')
         FlagCaja = 1;

    try {
        var objParams =
            {
                Filtro_CodEmpresa: $('#hfCodEmpresa').val(),
                Filtro_FlagCaja: FlagCaja
            };
            
        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_EditarDetalle_NET
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
                        F_Update_Division_HTML('div_Banco', result.split('~')[2]);
                        $('#MainContent_ddlBanco').css('background', '#FFFFE0');          
                        
                        //agutierrez verificar aca luego
                        if ($('#MainContent_ddlMedioPago').val()=="3") 
                        {
                                //$('#MainContent_ddlBanco').val(0);                            
//                                $('#MainContent_ddlBanco').prop('disabled',true);
//                                $('#MainContent_ddlCuenta').prop('disabled',true);
                                $('#MainContent_txtNroOperacion').prop('readonly',true);
                                $('#MainContent_txtNroOperacion').val('');
                                $('#MainContent_ddlMoneda').focus();
                        }
                        else
                        {                                                      
                                $('#MainContent_txtNroOperacion').val('');
                                $('#MainContent_ddlBanco').prop('disabled',false);
                                $('#MainContent_ddlCuenta').prop('disabled',false);
                                $('#MainContent_txtNroOperacion').prop('readonly',false);                                 
                                $('#MainContent_txtNroOperacion').focus();
                        }

                         $('#MainContent_ddlBanco').val(0);
//                         $('#MainContent_ddlMoneda').val(0);     
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

function F_ActualizarDetalle() {
 try 
        {             
            var Cuerpo='#MainContent_';
            var Cadena = 'Ingresar los sgtes. Datos:'; 

            if ($('#MainContent_ddlMedioPago').val()!="0" && $(Cuerpo + 'ddlMedioPago').val()==null)
                    Cadena=Cadena + '<p></p>' + 'Forma Pago';

            if ($(Cuerpo + 'txtMontoDetalle').val()=='' || parseFloat($(Cuerpo + 'txtMontoDetalle').val())==0)
                    Cadena=Cadena + '<p></p>' + 'Cuanto';

            if ($('#MainContent_ddlMoneda').val()=="0" || $(Cuerpo + 'ddlMoneda').val()==null)
                    Cadena=Cadena + '<p></p>' + 'Moneda';

            if ($(Cuerpo + 'txtTCDetalle').val()=='' || parseFloat($(Cuerpo + 'txtTCDetalle').val())=='0')
                    Cadena=Cadena + '<p></p>' + 'TC';

            if ($('#MainContent_ddlBanco').val()=="0" || $(Cuerpo + 'ddlBanco').val()==null)
                    Cadena=Cadena + '<p></p>' + 'Banco';

            if ($('#MainContent_ddlMedioPago').val()=="1" && $(Cuerpo + 'txtNroOperacion').val()=='')
                    Cadena=Cadena + '<p></p>' + 'Nro Operacion';

            if ($(Cuerpo + 'txtFechaOperacionDetalle').val()=='')
                    Cadena=Cadena + '<p></p>' + 'Fecha Entrada';

            if ($(Cuerpo + 'txtObservacion').val()=='')
                    Cadena=Cadena + '<p></p>' + 'Observacion';
        
            if ($('#MainContent_ddlMoneda').val() =="1")
                $('#hfDetalleSoles').val($('#MainContent_txtMontoDetalle').val());                      
            else
                $('#hfDetalleDolares').val($('#MainContent_txtMontoDetalle').val());

            if ($('#hfCodNotaCredito').val() > 0 & parseFloat($('#MainContent_txtSaldo').val())<parseFloat($('#MainContent_txtMontoDetalle').val()) )
                    Cadena=Cadena + '<p></p>' + 'Cuanto no debe ser mayor a saldo';

            var Soles = 0;
            var Dolares = 0;
            var xSoles = 0;
            var xDolares = 0;
          
           if ($('#MainContent_ddlMoneda').val() == $('#hfCodMonedaDetalle').val())
           {
                    if ($('#MainContent_ddlMoneda').val()== "1") 
                    {
                        Soles    = $('#MainContent_txtMontoDetalle').val();
                        Dolares  = (parseFloat($('#MainContent_txtMontoDetalle').val())/parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2); 
                        xSoles   = $('#MainContent_txtMontoDetalle').val();
                        xDolares = (parseFloat($('#MainContent_txtMontoDetalle').val())/parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2);   
                    }
                    else
                    {
                        Soles   = (parseFloat($('#MainContent_txtMontoDetalle').val())*parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2); 
                        Dolares = $('#MainContent_txtMontoDetalle').val(); 
                        xSoles   = (parseFloat($('#MainContent_txtMontoDetalle').val())*parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2); 
                        xDolares = $('#MainContent_txtMontoDetalle').val();   
                    }                        
           }
           else
           {
                    if ($('#MainContent_ddlMoneda').val() == 1) 
                    {
                            Soles   = $('#MainContent_txtMontoDetalle').val(); 
                            Dolares = (parseFloat($('#MainContent_txtMontoDetalle').val())/parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2);
                            xSoles   = (parseFloat($('#MainContent_txtSaldoDetalle').val())*parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2); 
                            xDolares = parseFloat($('#MainContent_txtSaldoDetalle').val()).toFixed(2);
                    }
                    else
                    {
                            Soles   =  (parseFloat($('#MainContent_txtMontoDetalle').val())*parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2);
                            Dolares =  $('#MainContent_txtMontoDetalle').val();
                            xSoles   = parseFloat($('#MainContent_txtSaldoDetalle').val()).toFixed(2);
                            xDolares = (parseFloat($('#MainContent_txtSaldoDetalle').val())/parseFloat($('#MainContent_txtTCDetalle').val())).toFixed(2); 
                    }
            }   

            if (parseFloat(Soles) >parseFloat(xSoles) && parseFloat(Dolares) > parseFloat(xDolares))
                  Cadena=Cadena + '<p></p>' + 'Acuenta no debe ser mayor al saldo';
 
            if (Cadena != 'Ingresar los sgtes. Datos:')
            {
                alertify.log(Cadena.toUpperCase());
                return false;
            }   

            if(!F_ValidarGrabarDocumento())
              return false;

            if (!confirm("ESTA SEGURO DE GRABAR LA COBRANZA"))
                return false;

            if ($('#hfFactura').val()=='NC')  
            {
                Soles*=-1;
                Dolares*=-1;
            }
            
            var FlagAplicarSaldo = 0;
            if ($('#MainContent_chkAplicarSaldo').is(":checked"))
                FlagAplicarSaldo = 1;


            var objParams = {
                              Filtro_CodFacturaDet: $('#hfIDDetalle').val(),
                              Filtro_TipoCambio: $('#MainContent_txtTCDetalle').val(),
                              Filtro_CodMoneda: 0,
                              Filtro_Soles: Soles,
                              Filtro_Dolares: Dolares,
                              Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                              Filtro_Operacion : 0,
                              Filtro_CodBanco: $('#MainContent_ddlBanco').val(),
                              Filtro_CodCtaBancaria: $('#MainContent_ddlCuenta').val(),
                              Filtro_NroOperacion: $('#MainContent_txtNroOperacion').val(),
                              Filtro_FechaOperacion : $('#MainContent_txtFechaOperacionDetalle').val(),
                              Filtro_FlagCheck : 1,
                              Filtro_Observacion : $('#MainContent_txtObservacion').val(),
                              Filtro_Saldo: $('#MainContent_txtSaldo').val(),
                              Filtro_FlagAplicarSaldo: FlagAplicarSaldo
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
                     var lblDolares = '';
                     var TotalDolares = 0;       
                     var TotalSoles = 0;       
                     F_Update_Division_HTML('div_grvFactura', result.split('~')[2]);
                     $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                                     chkSi = '#' + this.id;
                                     lblSoles = chkSi.replace('chkEliminar', 'lblSoles');
                                     lblDolares = chkSi.replace('chkEliminar', 'lblDolares');
                                     hfFlagCheck = chkSi.replace('chkEliminar', 'hfFlagCheck');
                                     if ($(hfFlagCheck).val()==1)
                                            $(chkSi).prop('checked',true);
                                     
                                     TotalDolares+= parseFloat($(lblDolares).text());
                                     TotalSoles+= parseFloat($(lblSoles).text());
                             });               
                     $('#MainContent_txtTotalCobranza').val(parseFloat(TotalDolares).toFixed(2));    
                     $('#MainContent_txtCobranzaSoles').val(parseFloat(TotalSoles).toFixed(2));  
                     if ($('#MainContent_ddlMoneda').val()=="1")
                        $('#MainContent_txtCobroOperacion').val(parseFloat(TotalSoles).toFixed(2)); 
                     else
                        $('#MainContent_txtCobroOperacion').val(parseFloat(TotalDolares).toFixed(2)); 
                     $('.ccsestilo').css('background', '#FFFFE0');
                     $('#div_CerrarNota').dialog('close');  
                     //alertify.log("SE ACTUALIZO CORRECTAMENTE");   

                     F_GrabarDocumento();
                     return false;
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
            alertify.log("Error Detectado: " + e);
            return false;
        } 
}

function F_ActualizarDetalle_Cero() {
 try 
        {   
            var objParams = {
                              Filtro_CodFacturaDet: $('#hfIDDetalle').val(),
                              Filtro_TipoCambio: $('#MainContent_txtTCDetalle').val(),
                              Filtro_CodMoneda: 0,
                              Filtro_Soles: 0,
                              Filtro_Dolares: 0,
                              Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                              Filtro_Operacion : 0,
                              Filtro_CodBanco: 0,
                              Filtro_CodCtaBancaria: 0,
                              Filtro_NroOperacion: '',
                              Filtro_FechaOperacion : '',
                              Filtro_FlagCheck : 0
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
                             F_Update_Division_HTML('div_grvFactura', result.split('~')[2]);
                             $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                                     chkSi = '#' + this.id;
                                     lblSoles = chkSi.replace('chkEliminar', 'lblSoles');
                                     lblDolares = chkSi.replace('chkEliminar', 'lblDolares');
                                     hfFlagCheck = chkSi.replace('chkEliminar', 'hfFlagCheck');
                                     if ($(hfFlagCheck).val()==1)
                                            $(chkSi).prop('checked',true);
                                     
                                     if ($('#MainContent_ddlMoneda').val()==1)
                                         Total+= parseFloat($(lblSoles).text());
                                     else
                                         Total+= parseFloat($(lblDolares).text());
                             });                      
                             $('#MainContent_txtTotalCobranza').val(parseFloat(Total).toFixed(2));    
                             $('#MainContent_txtCobroOperacion').val(parseFloat(Total).toFixed(2));  
                      
                             if ($("#MainContent_ddlMoneda option:selected").text()=="1")
                                    $(lblSoles).prop('readonly',true);
                             else
                                    $(lblDolares).prop('readonly',true); 

                            
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
            alertify.log("Error Detectado: " + e);
            return false;
        } 
}