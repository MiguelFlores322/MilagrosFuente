var AppSession = "../CuentasPorPagar/RegistroPercepciones.aspx";

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
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 2 + "','CodTipoCliente':'" + 2 + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                                label: item.split(',')[1],
                                val:   item.split(',')[0],
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
            $('#hfCodCtaCte').val(i.item.val);
        },
        minLength: 3
    });

    $('#MainContent_txtProveedorConsulta').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarClientes_AutoComplete',
                data: "{'NroRuc':'" + "" + "','RazonSocial':'" + request.term + "','CodTipoCtaCte':'" + 2 + "','CodTipoCliente':'" + 2 + "'}",
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

    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);

    $('.Jq-ui-dtp').datepicker('setDate', new Date());

    $('#MainContent_txtEmision').datepicker({ onSelect: function () {
        var date = $(this).datepicker('getDate');
        if (date) {
            date.setDate(1);
            $(this).datepicker('setDate', date);
        }
    }
    });

    $('#MainContent_txtEmision').datepicker({ beforeShowDay: function (date) {
        return [date.getDate() == 1, ''];
    }
    });

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
            if (!F_SesionRedireccionar(AppSession)) return false;
        try 
        {
        var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val=="")
            cadena=cadena + "\n" + "Articulo"

              if ($('#MainContent_ddlMoneda option').size() == 0)
              { cadena = cadena + "\n" + "Moneda"; }
              else 
              {
              if ($('#MainContent_ddlMoneda').val() == "-1")
                    cadena = cadena + "\n" + "Moneda";
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

    $('#MainContent_btnAgregarFactura').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
        try 
        {
          var Cadena = "Ingrese los sgtes. campos: "     
                  if ($('#hfCodCtaCte').val()=="0")
                      Cadena = Cadena + '<p></p>' + "Razon Social";

                  if (Cadena != "Ingrese los sgtes. campos: ")
                  {
                      alertify.log(Cadena);
                      return false;
                  }
          
                $("#divConsultaFactura").dialog({
                    resizable: false,
                    modal: true,
                    title: "Consulta de Factura",
                    title_html: true,
                    height: 450,
                    width: 510,
                    autoOpen: false
                });

                $('#divConsultaFactura').dialog('open');
               
                var objParams = {
                                    Filtro_CodSede:    $('#hfCodSede').val(),
                                    Filtro_CodCtaCte:  $('#hfCodCtaCte').val(),
                                    Filtro_TC:         $("#MainContent_txtTC").val(),
                                    Filtro_Monto:      '700'
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
                $('#MainContent_txtArticulo').focus();
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
            if(F_ValidarEliminar_Factura()==false)
              return false;

            if (confirm("Esta seguro de eliminar las facturas seleccionado"))
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

            if (confirm("ESTA SEGURO DE GRABAR LA RETENCION"))
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

    $('#MainContent_txtEmision').on('change', function (e) {
 
        F_TipoCambio();
    });

    $("#MainContent_txtSerie").ForceNumericOnly();

    $("#MainContent_txtNumero").ForceNumericOnly();
        
    $('#MainContent_txtNumero').blur(function () {
        var id='0000000' + $('#MainContent_txtNumero').val();
            $('#MainContent_txtNumero').val(id.substr(id.length - 7));   
       return false;
    });

    $('#MainContent_txtSerie').blur(function () {
        var id='000' + $('#MainContent_txtSerie').val();
            $("#MainContent_txtSerie").val(id.substr(id.length - 3));
        return false;
    });

    F_Controles_Inicializar();

    $('#MainContent_txtProveedor').css('background', '#FFFFE0');

    $('#MainContent_txtTC').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtNroOperacion').css('background', '#FFFFE0');

    $('#MainContent_txtTotalFactura').css('background', '#FFFFE0');

    $('#MainContent_txtResponsable').css('background', '#FFFFE0');

    $('#MainContent_txtSerie').css('background', '#FFFFE0');

    $('#MainContent_txtTotalLetra').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtNumero').css('background', '#FFFFE0');

    $('#MainContent_txtAmortizacion').css('background', '#FFFFE0');

    $('#MainContent_txtProveedorConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtTotalPago').css('background', '#FFFFE0');

    $('#MainContent_txtFactura').css('background', '#FFFFE0');

    $('#MainContent_txtEmpresa').css('background', '#FFFFE0');

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

    $('#divSeleccionarEmpresa').dialog('open');

    F_Derecha();
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
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodTasa: 4
               
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
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[5]);
                        F_Update_Division_HTML('div_tasa', result.split('~')[4]);
                        $('#MainContent_txtTC').val(result.split('~')[3]);
                        $('#MainContent_ddlMoneda').val(1);
                        $('#MainContent_ddlMoneda').prop('disabled','true');
                        $('#MainContent_ddlTasa').css('background', '#FFFFE0');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
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
                var chkSi  = '';
                var cadena = '';
                var x      = 0;
                var j      = 0;
                var lblcodproducto_grilla = '';
                var lblDetalle_grilla     = '';
                var lblFactura_grilla     = '';
                var chkDel                = '';

                $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    if ($(chkSi).is(':checked')) 
                         x=1;
                });

               if(x==0)
                    cadena = "No ha seleccionado ninguna factura"; 
               else
               { 
                    cadena = "Las sgtes. facturas se encuentran agregadas : ";
                    $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcodproducto_grilla = chkSi.replace('chkOK', 'lblCodigo');
               
                         if ($(chkSi).is(':checked')) 
                            {
                                 $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                                    chkDel = '#' + this.id;
                                    lblDetalle_grilla = chkDel.replace('chkEliminar', 'lblcodigo');
                                    lblFactura_grilla=chkDel.replace('chkEliminar', 'lblFactura');
                                    if ($(lblcodproducto_grilla).text()==$(lblDetalle_grilla).text())
                                    {
                                    cadena= cadena + "\n"  + $(lblFactura_grilla).text();
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
        var lblMoneda_grilla ='';
        var chkSi ='';
        var arrDetalle = new Array();
        var hfCodMoneda ='';
        var Dolares = 0;
        var lblDolares ='';
                   
                $('#MainContent_grvConsultaFactura .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblCodigo_grilla = chkSi.replace('chkOK', 'lblCodigo');
                    lblFactura_grilla = chkSi.replace('chkOK', 'lblFactura');
                    lblEmision_grilla = chkSi.replace('chkOK', 'lblEmision');
                    lblTotal_grilla = chkSi.replace('chkOK', 'lblTotal');
                    lblMoneda_grilla = chkSi.replace('chkOK', 'lblMoneda');
                    hfCodMoneda = chkSi.replace('chkOK', 'hfCodMoneda');
                    lblDolares = chkSi.replace('chkOK', 'lblDolares');

                    if ($(lblMoneda_grilla).text()=='DOLARES')
                        Dolares = $(lblDolares).text();
                    else 
                        Dolares = parseFloat($(lblTotal_grilla).text())/ parseFloat($('#MainContent_txtTC').val());

                    if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                                CodigoFactura: $(lblCodigo_grilla).text(),
                                Factura:       $(lblFactura_grilla).text(),
                                Emision:       $(lblEmision_grilla).text() ,
                                Soles:         $(lblTotal_grilla).val(),
                                Dolares:       Dolares,
                                TC:            $('#MainContent_txtTC').val(),
                                CodMoneda:     $(hfCodMoneda).val(),
                                Total:         $(lblTotal_grilla).val(),
                                Moneda:        'SOLES'
                        };
                        $('#hfMoneda').val('1');
                        arrDetalle.push(objDetalle);
                    }
                });

                var objParams = {
                                Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                Filtro_CodigoTemporal:$('#hfCodigoTemporal').val()
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
                var Total=0;
                    Total=result.split('~')[5]*$("#MainContent_ddlTasa option:selected").text();
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    $('#MainContent_txtTotalFactura').val(Total.toFixed(2));
                    $('#MainContent_txtFactura').val(result.split('~')[5]);
                    F_Update_Division_HTML('div_grvFactura', result.split('~')[4]);
                    if (result.split('~')[2]=='La(s) factura(s) se han agregado con exito')
                    alertify.log('La(s) factura(s) se han agregado con exito');
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
    Total= Total.toFixed(2)*$("#MainContent_ddlTasa option:selected").text();
     var Cuerpo='#MainContent_';
    $(Cuerpo + 'txtTotal').val(Total.toFixed(2));
}

function F_EliminarTemporal_Factura(){

  try 
        {
        var chkSi='';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla='';
        
               
                $('#MainContent_grvFactura .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcoddetalle_grilla = chkSi.replace('chkEliminar', 'lblDetalle');
                   
                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                       
                        CodDetalle: $(lblcoddetalle_grilla).text()
                        };
                                               
                        arrDetalle.push(objDetalle);
                    }
                });

            
                var objParams = {
                                  Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                  Filtro_CodigoTemporal:$('#hfCodigoTemporal').val()
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
                    {
                    $('#MainContent_txtTotalFactura').val('0.00');
                    $('#MainContent_txtFactura').val('0.00');
                    }
                    
                    else
                    {
                        var Total=0;
                        Total=result.split('~')[5]*$("#MainContent_ddlTasa option:selected").text();
                        $('#MainContent_txtTotalFactura').val(Total.toFixed(2));
                        $('#MainContent_txtFactura').val(result.split('~')[5]);
                    }
                    
                    F_Update_Division_HTML('div_grvFactura', result.split('~')[4]);
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
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p>'; 

        if ($(Cuerpo + 'txtTC').val()=='')
                Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtSerie').val()=='')
                Cadena=Cadena + '<p></p>' + 'Serie';
        
        if ($(Cuerpo + 'txtNumero').val()=='')
                Cadena=Cadena + '<p></p>' + 'Numero';

        if ($(Cuerpo + 'txtProveedor').val()=='' || $('#hfCodCtaCte').val()==0)
                Cadena=Cadena + '<p></p>' + 'Razon Social';
        
        if ($(Cuerpo + 'txtTC').val()=='0')
                Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtTC').val()=='')
                Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtEmision').val()=='')
                Cadena=Cadena + '<p></p>' + 'Emision';

        if ($(Cuerpo + 'txtTotalFactura').val()=='0.00')
                Cadena=Cadena + '<p></p>' + 'Ingrese Factura(s)';

        if ($(Cuerpo + 'txtResponsable').val()=='')
                Cadena=Cadena + '<p></p>' + 'Responsable';
        
        if (Cadena != 'Ingresar los sgtes. Datos: <br> <p></p>')
        {alertify.log(Cadena);
        return false;}
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
                  var Contenedor='#MainContent_';
                    var objParams = {
                                        Filtro_CodEmpresa: $('#hfCodEmpresa').val(),
                                        Filtro_CodSede:    $('#hfCodSede').val(),
                                        Filtro_CodTipoDoc: 21,
                                        Filtro_SerieDoc:  $(Contenedor + 'txtSerie').val(),
                                        Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
                                        Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
                                        Filtro_CodCliente: $('#hfCodCtaCte').val(),
                                        Filtro_CodEstado: 12,
                                        Filtro_CodFormaPago: 1,
                                        Filtro_FechaVencimiento: $(Contenedor + 'txtEmision').val(),
                                        Filtro_FechaCancelacion: $(Contenedor + 'txtEmision').val(),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_TipoCambio: $(Contenedor + 'txtTC').val(),
                                        Filtro_SubTotal: 0,
                                        Filtro_Igv: 0,
                                        Filtro_Total: $(Contenedor + 'txtTotalFactura').val(),
                                        Filtro_CodTasa: $(Contenedor + 'ddlTasa').val(),
                                        Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                                        Filtro_CodTipoOperacion: 1,
                                        Filtro_Responsable: $(Contenedor + 'txtResponsable').val(),
                                        Filtro_Tasa: $("#MainContent_ddlTasa option:selected").text()

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
                    if (str_mensaje_operacion=='Se grabo correctamente')
                    { 
                        F_Update_Division_HTML('div_grvFactura', result.split('~')[2]);
                        $(Contenedor + 'txtResponsable').val('');
                        $(Contenedor + 'txtSerie').val('');
                        $(Contenedor + 'txtNumero').val('');
                        $(Contenedor + 'ddlMoneda').val('1'),
                        $(Contenedor + 'ddlTasa').val('3'),
                        $(Contenedor + 'txtProveedor').val('');
                        $('#hfCodigoTemporal').val('0');
                        $('#hfMoneda').val('0');
                        $('#MainContent_txtTotalFactura').val('0.00');
                        $('#MainContent_txtFactura').val('0.00');
                        $('#hfCodCtaCte').val('0');
                        $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
                        $('.Jq-ui-dtp').datepicker('setDate', new Date());
                        $('#MainContent_ddlMoneda').prop('disabled','true');
                        alertify.log('Se grabo correctamente');
                        $(Contenedor + 'txtProveedor').focus();
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
                        $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
                        $('.Jq-ui-dtp').datepicker('setDate', new Date());
                        $('#MainContent_ddlMoneda').val('1');
                        $('#hfCodCtaCte').val('0');
                        $('#hfCodigoTemporal').val('0');
                        $('#hfMoneda').val('0');
                        var Contenedor='#MainContent_';
                        $(Contenedor + 'txtTotalFactura').val('0.00');
                        $(Contenedor + 'txtFactura').val('0.00');
                        $(Contenedor + 'txtResponsable').val('');
                        $(Contenedor + 'txtPagador').val('');
                        $(Contenedor + 'txtTotalLetra').val('0.00') ;
                        $(Contenedor + 'txtNroOperacion').val('');
                        $(Contenedor + 'ddlMoneda').val(1);
                        $(Contenedor + 'txtProveedor').val('');
                        $('#hfCodCtaCte').val('0');
                        $(Contenedor + 'ddlMoneda').prop('disabled','true');
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
                        F_Update_Division_HTML('div_grvFactura', result.split('~')[3]);                            
                        $('.ccsestilo').css('background', '#FFFFE0');
                        $('#divSeleccionarEmpresa').dialog('open');         
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

              if ($('#MainContent_chkNumero').is(':checked'))
                  chkNumero='1';

              if ($('#MainContent_chkRango').is(':checked'))
                  chkFecha='1';

              if ($('#MainContent_chkCliente').is(':checked'))
                  chkCliente='1';

              if ($('#MainContent_chkSerie').is(':checked'))
                  chkSerie='1';
              
              var objParams = {
                                 Filtro_CodSede:    $('#hfCodSede').val(),
                                 Filtro_Serie:      'TODOS',
                                 Filtro_Numero:     $('#MainContent_txtNumeroConsulta').val(),
                                 Filtro_Desde:      $('#MainContent_txtDesde').val(),
                                 Filtro_Hasta:      $('#MainContent_txtHasta').val(),
                                 Filtro_CodCtaCte:  $('#hfCodCtaCteConsulta').val(),
                                 Filtro_ChkNumero:  chkNumero,
                                 Filtro_ChkFecha:   chkFecha,
                                 Filtro_ChkCliente: chkCliente,
                                 Filtro_ChkSerie:   chkSerie,
                                 Filtro_CodTipoDoc: 21
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

function getContentTab(){

    var date = new Date();
    date.setMonth(date.getMonth(), 1);
 
    $('#MainContent_txtDesde').val(date.format("dd/MM/yyyy"));
    $('#MainContent_chkRango').prop('checked',true);
    F_Buscar();
    return false;

}

function F_ValidarAgregarLetra(){

    try 
        {

        var Cuerpo='#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p>'; 
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

        if (Cadena != 'Ingresar los sgtes. Datos: <br> <p></p>')
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

function F_AnularRegistro(Fila) {
 try 
        {
    var imgID = Fila.id;
    var lblCodigo = '#' + imgID.replace('imgAnularDocumento', 'lblCodigo');
    var lblEstado = '#' + imgID.replace('imgAnularDocumento', 'lblEstado');
    var lblNumero = '#' + imgID.replace('imgAnularDocumento', 'lblNumero');
    var lblCliente = '#' + imgID.replace('imgAnularDocumento', 'lblCliente');
    
    if(!confirm("ESTA SEGURO DE ANULAR LA RETENCION : " + $(lblNumero).text() + "\nDEL CLIENTE : " +  $(lblCliente).text()))
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
                                      Filtro_CodSede: $('#hfCodSede').val(),
                                      Filtro_CodDocumentoVenta: $(lblCodigo).text(),
                                      Filtro_Serie: 'TODOS',
                                      Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                      Filtro_Desde:  $('#MainContent_txtDesde').val(),
                                      Filtro_Hasta:  $('#MainContent_txtHasta').val(),
                                      Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                      Filtro_CodTipoDoc: 21,
                                      Filtro_CodTipoOperacion: 1,
                                      Filtro_ChkNumero: chkNumero,
                                      Filtro_ChkFecha: chkFecha,
                                      Filtro_ChkCliente: chkCliente
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

function F_ElegirEmpresa(Fila) {
    MostrarEspera(true);
    var imgID = Fila.id;
    var hfCodEmpresa_Grilla = '#' + imgID.replace('imgSelecEmpresa', 'hfCodEmpresa');
    var ddlSede       = '#' + imgID.replace('imgSelecEmpresa', 'ddlSede');
    var lblNombre     = '#' + imgID.replace('imgSelecEmpresa', 'lblRazonSocial');
    var Cuerpo = '#MainContent_';
    $(Cuerpo + 'txtEmpresa').val($(lblNombre).text());
    $('#hfCodEmpresa').val($(hfCodEmpresa_Grilla).val());
    $('#hfCodSede').val($(ddlSede).val());
    $('#divSeleccionarEmpresa').dialog('close');
    MostrarEspera(false);
}