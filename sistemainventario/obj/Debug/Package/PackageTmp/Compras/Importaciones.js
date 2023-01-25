var AppSession = "../Compras/Importaciones.aspx";

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
            $('#hfCodCtaCte').val(i.item.val);
            
        },
        minLength: 3
    });

    $('#MainContent_txtClienteConsulta').autocomplete({
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

    $('.MesAnioPicker').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'yymm',

        onClose: function (dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).val($.datepicker.formatDate('yymm', new Date(year, month, 1)));
        }
    });

    $('.MesAnioPicker').datepicker($.datepicker.regional['es']);

    $('.MesAnioPicker').focus(function () {
        $('.ui-datepicker-calendar').hide();
        $('#ui-datepicker-div').position({
            my: 'center top',
            at: 'center bottom',
            of: $(this)
        });
    });

    $('.MesAnioPicker').datepicker('setDate', new Date());
    
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
        MostrarEspera(true);
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
                  MostrarEspera(false);
                  alertify.log(cadena);
                  return false;
              }

              F_Buscar_Productos() 
        }
        catch (e) {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
        }


        return false;

    });

    $('#MainContent_btnAgregarProducto').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
        try 
        {
               
                $('#MainContent_txtArticulo').val('');
                
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


                F_CargarGrillaVaciaConsultaArticulo_NET(arg, function (result) {
//                var Entity = Sys.Serialization.JavaScriptSerializer.deserialize(result);

//                MostrarEspera(false);

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

            alertify.log("ERROR DETECTADO: " + e);
        }


        return false;

    });  

    $('#MainContent_btnAgregar').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
        
        if (F_ValidarAgregar()==false)
        return false;
              
        F_AgregarTemporal();
        F_LimpiarGrillaConsulta();
        
        $('#MainContent_txtArticulo').focus();
        return false;
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
        }
     
        });

    $('#MainContent_btnAgregarItemOC').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {        
           if (!F_ValidarAgregarOC())
               return false;
             
        F_AgregarTemporalOC();

            if ($("#MainContent_ddlFormaPago").val()==1)
            {
            $("#MainContent_ddlFormaPago").val(11)
            $('#MainContent_txtVencimiento').val(Date_AddDays($('#MainContent_txtEmision').val(),7));            
            }

        return false;
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
        }
     
    });

    $('#MainContent_btnEliminar').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
            if(F_ValidarEliminar()==false)
              return false;

            if (confirm("ESTA SEGURO DE ELIMINAR LOS PRODUCTOS SELECCIONADOS"))
            F_EliminarTemporal();

            return false;
        }
        
        catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
        }
     
        });

    $('#MainContent_btnGrabar').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
            if(!F_ValidarGrabarDocumento())
              return false;

            if (confirm("ESTA SEGURO DE GRABAR LA FACTURA DE COMPRA"))
            F_GrabarDocumento();

            return false;
        }
        
        catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
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

            alertify.log("ERROR DETECTADO: " + e);
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

            alertify.log("ERROR DETECTADO: " + e);
        }
     
        });

    $('#MainContent_btnOC').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
          F_FacturacionOC();
          return false;
        }
        
        catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
        }
     
        });
        
    $('#MainContent_btnDevolverItemOC').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
            if(F_ValidarDevolucion("SELECCIONE UN PRODUCTO PARA DEVOLVER")==false)
              return false;

            if (confirm("ESTA SEGURO DE LA DEVOLUCION DE LOS PRODUCTOS SELECCIONADOS"))
            F_Devolucion();

            return false;
        }
        
        catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
        }
     
        });

    $('#MainContent_btnGrabarEdicion').click(function () {
            if (!F_SesionRedireccionar(AppSession)) return false;
        try {

            F_EditarTemporal();

            return false;
        }

        catch (e) {

            alertify.log("ERROR DETECTADO: " + e);
        }

    });

    $('#MainContent_txtEmision').on('change', function (e) {
        F_FormaPago($("#MainContent_ddlFormaPago").val());
        F_TipoCambio();
    });

    $("#MainContent_txtMonto").keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
           e.preventDefault();
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

            alertify.log("ERROR DETECTADO: " + e);
        }


        return false;
    });

    $('#div_SerieDetalle').bind('dialogclose', function(event) {
      F_BuscarTemporal();
      return false;
 });
     
    $('#MainContent_txtVencimiento').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtSerie').css('background', '#FFFFE0');

    $('#MainContent_txtProveedor').css('background', '#FFFFE0');

    $('#MainContent_txtClienteConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtPeriodo').css('background', '#FFFFE0');

    $('#MainContent_txtFechaIngreso').css('background', '#FFFFE0');

    $('#MainContent_txtPeriodo').css('background', '#FFFFE0');

    $('#MainContent_txtSubTotal').css('background', '#FFFFE0');

    $('#MainContent_txtIgv').css('background', '#FFFFE0');

    $('#MainContent_txtTotal').css('background', '#FFFFE0');

    $('#MainContent_txtMonto').css('background', '#FFFFE0');

    $('#MainContent_txtDsctoTotal').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtNumero').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtArticulo').css('background', '#FFFFE0');

    $('#MainContent_txtPeriodoConsulta').css('background', '#FFFFE0');
            
    forceNumber($('#MainContent_txtDsctoTotal'));

    forceNumber($('#MainContent_txtMonto'));

    F_Derecha();

    $('.ccsestilo').css('background', '#FFFFE0');

    $("#MainContent_chkNumero").click( function(){
            if (!F_SesionRedireccionar(AppSession)) return false;

    if($(this).is(':checked')) 
    {
        $('#MainContent_txtNumeroConsulta').prop('readonly',false);
        $('#MainContent_txtNumeroConsulta').focus();        
    }   
    else
    {
        $('#MainContent_txtNumeroConsulta').prop('readonly',true);
        $('#MainContent_txtNumeroConsulta').val('');   
    }  

});

    $("#MainContent_chkCliente").click( function(){
            if (!F_SesionRedireccionar(AppSession)) return false;

    if($(this).is(':checked')) 
    {
        $('#MainContent_txtClienteConsulta').prop('readonly',false);
        $('#MainContent_txtClienteConsulta').focus();        
    }   
    else
    {
        $('#MainContent_txtClienteConsulta').prop('readonly',true);
        $('#MainContent_txtClienteConsulta').val('');   
        $('#hfCodCtaCteConsulta').val(0);
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

function F_Prueba(){

           if ($('#MainContent_chkSinIgv').is(':checked'))
               $('#MainContent_chKConIgv').prop('checked', false);
           else
               $('#MainContent_chKConIgv').prop('checked', true);
return false;
}    
     
function F_ValidarCheckSinIgv(ControlID) {

   var chkok_grilla='';

            chkok_grilla = '#' + ControlID;
           
           if ($(chkok_grilla).is(':checked'))
               $('#MainContent_chkSinIgv').prop('checked', false);
           else
               $('#MainContent_chkSinIgv').prop('checked', true);
         
   return false;
}

$(document).on("change", "select[id $= 'MainContent_ddlFormaPago']",function () {
     F_FormaPago($("#MainContent_ddlFormaPago").val());
} );

function F_Controles_Inicializar() {

    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodSerie: 66

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
                        F_Update_Division_HTML('div_formapago', result.split('~')[4]);
                        F_Update_Division_HTML('div_moneda', result.split('~')[5]);
                        $('#MainContent_lblTC').text(result.split('~')[6]);
                        $('#MainContent_ddlSerieConsulta').val(61);
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[2]);
                        F_Update_Division_HTML('div_igv', result.split('~')[8]);
                        F_Update_Division_HTML('div_tipodocumento', result.split('~')[9]);
                        F_Update_Division_HTML('div_clasificacion', result.split('~')[10]);
                        $('#MainContent_ddlMoneda').val(1);
                        $('#MainContent_ddlFormaPago').val(1);
                        $('#MainContent_ddlTipoDocumento').val(1);
                        $('#MainContent_ddlClasificacion').val(2);
                        $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
                        $("#MainContent_txtPeriodo").val($('#MainContent_txtFechaIngreso').val().substr($('#MainContent_txtFechaIngreso').val().length - 4) + $('#MainContent_txtFechaIngreso').val().substring(3, 5));
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlFormaPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlClasificacion').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoDocumento').css('background', '#FFFFE0');
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_chKConIgv').prop('disabled',true);
                        $('#MainContent_chkSinIgv').prop('disabled',true);
                        $('.ccsestilo').css('background', '#FFFFE0');
                    }
                    else {

                        alertify.log(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
          MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + mierror);

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
                        if (str_mensaje_operacion=='No se encontraron registros')
                        alertify.log(str_mensaje_operacion);
                    }
                    else {

                        alertify.log(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
          MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + mierror);

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
                        $(txtprecio_grilla).val($(lblprecio).text());
                       $(txtprecio_grilla).prop('disabled', true);
                        $(txtcant_grilla).focus();
                        break;

              case "2":
                        lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio2');
                        $(txtprecio_grilla).val($(lblprecio).text());
                         $(txtprecio_grilla).prop('disabled', true);
                        $(txtcant_grilla).focus();
                        break;
              case "3":
                        lblprecio = ddlLista_Grilla.replace('ddlLista', 'lblPrecio3');
                        $(txtprecio_grilla).val($(lblprecio).text());
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
          
            if ($(chkok_grilla).is(':checked'))
            {               
                $(txtcant_grilla).prop('disabled', false);
                var i=0;
                if($(txtprecio_grilla).val()=="")
                {
                    $(txtcant_grilla).focus();
                    i=1;
                }
                if(i==0 && $(txtcant_grilla).val()=="")
                    $(txtcant_grilla).focus();
            }
            else
            {
                $(txtprecio_Grilla).val('');
                $(txtcant_grilla).val('');                           
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
     }

     
    }
     catch (mierror) 
     {
        alertify.log("ERROR DETECTADO: " + mierror);
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
                   {
                       
                        alertify.logyfi.standard(cadena);
                       return false;
                   }
                   else
                   {
                   return true;
                   }
        }
        
        catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
           
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
        var txtdscto_grilla='';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla='';
        var hfcosto_grilla='';
        var hfcosto_grilla='';
        var Contenedor = '#MainContent_';
        var tasaigv;
                                   
        if ($('#MainContent_chKConIgv').is(':checked'))
             tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
        else
             tasaigv=1;
               
                $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcodproducto_grilla = chkSi.replace('chkOK', 'lblcodproducto');
                    lblcodunidadventa_grilla = chkSi.replace('chkOK', 'lblcodunidadventa');
                    lblcosto_grilla = chkSi.replace('chkOK', 'lblcosto');
                    txtprecio_grilla = chkSi.replace('chkOK', 'txtPrecioLibre');
                    txtcantidad_grilla = chkSi.replace('chkOK', 'txtCantidad');
                    hfcodunidadventa_grilla = chkSi.replace('chkOK', 'hfcodunidadventa');
                    hfcosto_grilla= chkSi.replace('chkOK', 'hfcosto');
                    txtdscto_grilla = chkSi.replace('chkOK', 'txtDscto');
                    lblProducto = chkSi.replace('chkOK', 'lblProducto');

                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                        CodArticulo: $(lblcodproducto_grilla).text(),
                        Cantidad: $(txtcantidad_grilla).val(),
                        Precio: parseFloat($(txtprecio_grilla).val()) / parseFloat(tasaigv),
                        PrecioDscto: parseFloat($(txtprecio_grilla).val()) / parseFloat(tasaigv) * (1-(parseFloat($(txtdscto_grilla).val()) / 100)),
                        Costo: $(hfcosto_grilla).val(),
                        CodUm: $(hfcodunidadventa_grilla).val(),
                        Dscto: $(txtdscto_grilla).val(),
                        Descripcion: $(lblProducto).text().replace("&", "&amp;"),
                        CodDetalle: 0
                        };                                               
                        arrDetalle.push(objDetalle);
                    }
                });

                var objParams = {
                                        Filtro_CodTipoDoc: "2",
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
                                        Filtro_TasaIgv: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
                                        Filtro_TasaIgvDscto: tasaigv,
                                        Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                                        Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_AgregarTemporal_NET(arg, function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtMonto').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                    if (result.split('~')[2]=='Los Producto(s) se han agregado con exito')
                    alertify.log('Los Producto(s) se han agregado con exito');
                    $('#MainContent_chkDescripcion').focus();
                }
                else 
                {
                    MostrarEspera(false);
                    alertify.log(result.split('~')[2]);

                }

                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            
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
     $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
             chkDel = '#' + this.id;
             lblimporte_grilla = chkDel.replace('chkEliminar', 'lblimporte');
             Total+=parseFloat($(lblimporte_grilla).text());
     });
     var Cuerpo='#MainContent_'
    $(Cuerpo + 'txtTotal').val(Total.toFixed(2));
    $(Cuerpo + 'txtMonto').val(Total.toFixed(2));
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
                var tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                var objParams = {
                                  Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                  Filtro_TasaIgv: tasaigv,
                                  Filtro_TasaIgvDscto: tasaigv,
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
                    $('#MainContent_txtMonto').val(result.split('~')[5]);
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                     $('.ccsestilo').css('background', '#FFFFE0');
                   // if (result.split('~')[2]=='Se han eliminado los productos correctamente.')
                    //alertify.log('Se han eliminado los productos correctamente.');
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
            alertify.log("ERROR DETECTADO: " + e);
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

            alertify.log("ERROR DETECTADO: " + e);
        }
}

function F_ValidarGrabarDocumento(){
    try 
        {
        var Cuerpo='#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p>'; 

        if ($(Cuerpo + 'txtProveedor').val()=='' || $('#hfCodCtaCte').val()==0)
                Cadena=Cadena  + 'Proveedor <p></p>';
        
        if ($(Cuerpo + 'lblTC').text()=='0')
                Cadena=Cadena + 'Tipo de Cambio <p></p>';

        if ($(Cuerpo + 'txtSerie').val()=='')
                Cadena=Cadena +  'Serie de Factura <p></p>';

        if ($(Cuerpo + 'txtNumero').val()=='')
                Cadena=Cadena +  'Numero de Factura <p></p>';

        if ($(Cuerpo + 'txtEmision').val()=='')
                Cadena=Cadena + 'Fecha de Emision <p></p>';

        if ($(Cuerpo + 'txtPeriodo').val()=='')
                Cadena=Cadena +  'Periodo <p></p>';

        if ($(Cuerpo + 'txtTotal').val()=='' | $(Cuerpo + 'txtTotal').val()=='0.00')
                Cadena=Cadena + 'No ha ingresado ningun producto';

        
        if (Cadena != 'Ingresar los sgtes. Datos: <br> <p></p>')
        {     
         alertify.log(Cadena);
        return false;}
        return true;
        }
        
    catch (e) 
        {

            alertify.log("ERROR DETECTADO: " + e);
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
        var FlagPercepcion=0; 
        var NotaPedido='0';
        var Contenedor = '#MainContent_';
        
        if($(Contenedor + 'chkPercepcion').is(':checked')) 
        FlagPercepcion=1; 

                var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                var objParams = {
                                        Filtro_CodTipoDoc: $(Contenedor + 'ddlTipoDocumento').val(),
                                        Filtro_SerieDocSust: $(Contenedor + 'txtSerie').val(),
                                        Filtro_NumeroDocSust: $(Contenedor + 'txtNumero').val(),
                                        Filtro_FechaIngreso: $(Contenedor + 'txtFechaIngreso').val(),
                                        Filtro_FechaRegistro: $(Contenedor + 'txtEmision').val(),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                                        Filtro_ImpSubTotal: $(Contenedor + 'txtSubTotal').val(),
                                        Filtro_ImpIGV: $(Contenedor + 'txtIgv').val(),
                                        Filtro_ImpTotal: $(Contenedor + 'txtTotal').val(),
                                        Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
                                        Filtro_Descuento: $(Contenedor + 'txtDsctoTotal').val(),
                                        Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
                                        Filtro_CodTasa: $(Contenedor + 'ddlIgv').val() ,
                                        Filtro_Periodo: $(Contenedor + 'txtPeriodo').val(),
                                        Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
                                        Filtro_TasaIgv: tasaigv,
                                        Filtro_Total: $(Contenedor + 'txtMonto').val(),
                                        Filtro_CodClasificacion: $(Contenedor + 'ddlClasificacion').val(),
                                        Filtro_CodDetalle: $('#hfCodigoTemporal').val(),
                                        Filtro_FlagPercepcion: FlagPercepcion                                        
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
                        alertify.log('SE GRABO CORRECTAMENTE');
                        F_Nuevo();
                    }
                    else
                    {
                        alertify.log(str_mensaje_operacion);
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
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }
}

function F_Nuevo(){
       $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
       $('.Jq-ui-dtp').datepicker('setDate', new Date());       
       $('#MainContent_ddlTipoDocumento').val('1');
       $('#MainContent_ddlMoneda').val('1');
       $('#MainContent_ddlClasificacion').val('2');
       $('#MainContent_ddlFormaPago').val('1');
       $('#MainContent_ddlTipoDocumento').val('1');
       $('#hfCodigoTemporal').val('0');
       $('#hfCodCtaCte').val('0');
       $('#MainContent_txtProveedor').val('');
       $('#MainContent_txtPeriodo').val('');
       $('#MainContent_txtSubTotal').val('0.00');
       $('#MainContent_txtIgv').val('0.00');
       $('#MainContent_txtTotal').val('0.00');
       $('#MainContent_txtMonto').val('0.00');
       $('#MainContent_txtSerie').val('');
       $('#MainContent_txtNumero').val('');
       $('#MainContent_txtVencimiento').val($('#MainContent_txtEmision').val());
       $('#MainContent_txtArticulo').val('');
       $('#MainContent_txtProveedor').focus();
       $("#MainContent_txtPeriodo").val($('#MainContent_txtFechaIngreso').val().substr($('#MainContent_txtFechaIngreso').val().length - 4) + $('#MainContent_txtFechaIngreso').val().substring(3, 5));
       $('#MainContent_chkConIgvMaestro').prop('checked',true);
       $('#MainContent_chkSinIgvMaestro').prop('checked',false);

       try 
        {
              var objParams = {
                                Filtro_CodSerie: '66'
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
            alertify.log("ERROR DETECTADO: " + e);
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
                                 Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                 Filtro_Desde: $('#MainContent_txtDesde').val(),
                                 Filtro_Hasta: $('#MainContent_txtHasta').val(),
                                 Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                 Filtro_ChkNumero: chkNumero,
                                 Filtro_ChkFecha: chkFecha,
                                 Filtro_ChkCliente: chkCliente,
                                 Filtro_CodTipoDocSust: 1,
                                 Filtro_CodClasificacion: 2                                        
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
            alertify.log("ERROR DETECTADO: " + e);
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
    var lblnumero_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblnumero');
    var lblcliente_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblcliente');
  
    if ($(lblEstado).text()=="CANCELADO TOTAL") 
    {alertify.log ("ESTE FACTURA SE ENCUENTRA CANCELADA; PRIMERO ELIMINE EL PAGO Y LUEGO ELIMINE LA FACTURA");
    return false;}

    if(confirm("ESTA SEGURO DE ELIMINAR LA FACTURA : " + $(lblnumero_grilla).text() + "<p></p>" + "DEL PROVEEDOR : " +  $(lblcliente_grilla).text())==false)
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
                          Filtro_Serie: $("#MainContent_ddlSerie option:selected").text(),
                          Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                          Filtro_Desde: $('#MainContent_txtDesde').val(),
                          Filtro_Hasta: $('#MainContent_txtHasta').val(),
                          Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                          Filtro_CodTipoDocSust: 1,
                          Filtro_ChkNumero: chkNumero,
                          Filtro_ChkFecha: chkFecha,
                          Filtro_ChkCliente: chkCliente,
                          Filtro_CodClasificacion: 2
    };

    var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
     MostrarEspera(true);
    F_AnularRegistro_Net(arg, function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
         MostrarEspera(false);
        if (str_mensaje_operacion == "Se anulo correctamente.") {
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);      
    
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
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }

 
}

function getContentTab(){
    $('#MainContent_txtDesde').val(Date_AddDays($('#MainContent_txtHasta').val(), -7))  ;
    $('#MainContent_chkRango').prop('checked',true);
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
                    $('#MainContent_lblTC').text(result.split('~')[2]);
                else 
                    alertify.log(result.split('~')[1]);
                
                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }

}

function F_Mostrar_Correlativo(CodSerie,CodTipoDoc) {

    var arg;

    try {

        var objParams = {

            Filtro_CodSerie: CodSerie
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
                        if (CodTipoDoc==1)
                        {
                             $('#MainContent_txtNumero').val(result.split('~')[2]);
                          
                        }
                            
                        else
                            $('#MainContent_txtNumeroGuia').val(result.split('~')[2]);
                                
                    }
                    else {

                        alertify.log(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {
    MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + mierror);

    }

}

function F_FacturacionOC() {
        var Contenedor = '#MainContent_';
        var Mensaje = "Ingrese los sgtes datos: ";

        if ($(Contenedor + 'txtProveedor').val()=="" || $('#hfCodCtaCte').val()==0)
            Mensaje= Mensaje + "<p></p>" + "Proveedor";
        
        if ($(Contenedor + 'lblTC').text()=="0")
           Mensaje= Mensaje + "<p></p>" + "Tipo de Cambio";
        
        if (Mensaje !="Ingrese los sgtes datos: ")
        {
            alertify.log(Mensaje);
            return false;
        }
        
        try {
            var objParams = {
                Filtro_CodCtaCte:$('#hfCodCtaCte').val(),
                Filtro_CodMoneda:$(Contenedor + 'ddlMoneda').val()
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
                                title: "Facturacion Orden de Compra",
                                title_html: true,
                                height: 500,
                                width: 890,
                                autoOpen: false
                        });
                        F_Update_Division_HTML('div_DetalleOC', result.split('~')[2]);
                          $('.ccsestilo').css('background', '#FFFFE0');
                        if (str_mensaje_operacion!="")
                        alertify.log(str_mensaje_operacion);
                        else
                        $('#divFacturacionOC').dialog('open');

                        return false;

                }
                   
                else
                    alertify.log(result.split('~')[1]);

                return false;

            });
        }

        catch (e) {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }
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

            alertify.log("ERROR DETECTADO: " + e);
        }
}

function F_Devolucion(){
 try 
        {
                var chkSi='';
                var arrDetalle = new Array();
                var lblcoddetalle_grilla='';   
                var hfCodUndMedida='';
                var hfSerieDocSust = new Array();
                var lblPrecio='';    
                var hfNumeroDocSust='';
                var txtCantidadEntregada = new Array();
                var hfStockActual='';   
                var lblProducto='';   
                var Mensaje = "LOS SGTES PRODUCTOS TIENEN STOCK MENOR QUE LA DEVOLUCION";

                $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblCodDetalle = chkSi.replace('chkEliminar', 'lblCodDetalle');
                    hfCodArticulo = chkSi.replace('chkEliminar', 'hfCodArticulo');
                    hfCodUndMedida = chkSi.replace('chkEliminar', 'hfCodUndMedida');
                    hfSerieDocSust = chkSi.replace('chkEliminar', 'hfSerieDocSust');
                    lblPrecio = chkSi.replace('chkEliminar', 'lblPrecio');
                    hfNumeroDocSust = chkSi.replace('chkEliminar', 'hfNumeroDocSust');
                    txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
                    hfStockActual = chkSi.replace('chkEliminar', 'hfStockActual');
                    lblProducto = chkSi.replace('chkEliminar', 'lblProducto');
                  
                  if ($(chkSi).is(':checked')) 
                    {
                       if (parseFloat($(hfStockActual).val()) < parseFloat ($(txtCantidadEntregada).val()) )
                            Mensaje = Mensaje + '<p></p>' + $(lblProducto).text();

                        var objDetalle = {
                        CodDetalle: $(lblCodDetalle).text(),
                        CodArticulo: $(hfCodArticulo).val(),
                        CodUndMedida: $(hfCodUndMedida).val(),
                        SerieDoc: $(hfSerieDocSust).val(),
                        NumeroDoc: $(hfNumeroDocSust).val(),
                        Costo: $(lblPrecio).text(),
                        Cantidad: $(txtCantidadEntregada).val()
                        };                                               
                        arrDetalle.push(objDetalle);
                    }
                });

                if (Mensaje != "LOS SGTES PRODUCTOS TIENEN STOCK MENOR QUE LA DEVOLUCION")
                {
                    alertify.log(Mensaje);
                    return false ;
                }
                            
                var Contenedor = '#MainContent_';
                var tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

                var objParams = {
                                        Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                                        Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
                                        Filtro_CodTasa: $(Contenedor + 'ddlIgv').val() ,
                                        Filtro_TasaIgv: tasaigv                                      
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
//                    if (result.split('~')[2]=='Se grabo correctamente')
//                    alertify.log('Se grabo correctamente');
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
            alertify.log("ERROR DETECTADO: " + e);
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
            lblCantidad = chkok_grilla.replace('chkEliminar', 'lblCantidad');
                 
            boolEstado = $(chkok_grilla).is(':checked');
            if (boolEstado)
            {               
                $(txtCantidadEntregada).prop('disabled', false);
                $(txtCantidadEntregada).val($(lblCantidad).text());
                $(txtCantidadEntregada).focus();
            }
            else
            {
                $(txtCantidadEntregada).val('');
                $(txtCantidadEntregada).prop('disabled', true);
            }           
        
    return true;
}

function F_ValidarStockGrilla() {
        if (!F_ValidarAgregar())
        return false;
              
        F_AgregarTemporal();
        F_LimpiarGrillaConsulta();
        
        $('#MainContent_txtArticulo').focus();
        return false;
}

function F_ValidarStockGrillaOC(ControlID) {
   
    var txtcantidad_Grilla = '';
    var lblstock = '';
    var txtcant_grilla = '';
    var boolEstado = false;
    var chkok_grilla = '';

    txtcantidad_Grilla = '#' + ControlID;
    chkok_grilla = txtcantidad_Grilla.replace('txtCantidadEntregada', 'chkEliminar');
    lblstock = txtcantidad_Grilla.replace('txtCantidadEntregada', 'lblCantidad');

    
    boolEstado = $(chkok_grilla).is(':checked');

    if (boolEstado &&  parseFloat($(txtcantidad_Grilla).val()) > parseFloat($(lblstock).text())) {
            alertify.log("Stock insuficiente");
            $(txtcantidad_Grilla).val($(lblstock).text());
            return false;
    }
    if ($(txtcantidad_Grilla).val()=='')
        $(txtcantidad_Grilla).val($(lblstock).text());
    
    if (boolEstado==false)
     $(txtcantidad_Grilla).val($(lblstock).text());


    return true;
}

function F_ValidarAgregarOC(){
try 
        {
            var cadena = "Ingrese los sgtes. campos: ";
            var chkSi='';
            var lblCodigo='';
            var txtCantidadEntregada='';
            var x=0;

            $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
                chkSi = '#' + this.id;
                    
                txtCantidadEntregada = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
                lblCodigo = chkSi.replace('chkEliminar', 'lblCodigo');
                    
                if ($(chkSi).is(':checked')) 
                   {
                     if ($(txtCantidadEntregada).val()=='')
                         cadena=cadena + "<p></p>" + "Cantidad para el Codigo " + $(lblCodigo).text(); 
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
                  return true;                     
        }        
        catch (e) 
        {
            alertify.log("ERROR DETECTADO: " + e);           
        }
}

function F_AgregarTemporalOC(){
try 
        {
       
        var lblcodproducto_grilla='';
        var lblcodunidadventa_grilla='';
        var lblcosto_grilla='';
        var chkSi='';
        var txtcantidad_grilla='';
        var txtprecio_grilla='';
        var txtdscto_grilla='';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla='';
        var hfcosto_grilla='';
        var lblProducto='';
        var Contenedor = '#MainContent_';  

        var tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1); 
             
                $('#MainContent_grvDetalleOC .chkDelete :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcodproducto_grilla = chkSi.replace('chkEliminar', 'hfCodArticulo');
                    lblcodunidadventa_grilla = chkSi.replace('chkEliminar', 'hfCodUndMedida');
                    lblcosto_grilla = chkSi.replace('chkEliminar', 'lblPrecio');
                    txtprecio_grilla = chkSi.replace('chkEliminar', 'lblPrecio');
                    txtcantidad_grilla = chkSi.replace('chkEliminar', 'txtCantidadEntregada');
                    hfcodunidadventa_grilla = chkSi.replace('chkEliminar', 'hfCodUndMedida');
                    hfcosto_grilla= chkSi.replace('chkEliminar', 'lblPrecio');
                    lblCodDetalle= chkSi.replace('chkEliminar', 'lblCodDetalle');
                    lblNumero = chkSi.replace('chkEliminar', 'lblNumero');
                    lblProducto = chkSi.replace('chkEliminar', 'lblProducto');

                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                        CodArticulo: $(lblcodproducto_grilla).val(),
                        Cantidad: $(txtcantidad_grilla).val(),
                        Precio: $(txtprecio_grilla).text() / tasaigv,
                        PrecioDscto: $(txtprecio_grilla).text() / tasaigv,
                        Costo: $(hfcosto_grilla).text(),
                        CostoUnitario: $(hfcosto_grilla).text(),
                        CodUm: $(hfcodunidadventa_grilla).val(),
                        Dscto: 0,
                        CodDetalle: $(lblCodDetalle).text(),
                        OC: $(lblNumero).text(),
                        Descripcion: $(lblProducto).text().replace("&", "&amp;")
                        };
                                               
                        arrDetalle.push(objDetalle);
                    }
                });

               
                                   
//                if ($('#MainContent_chKConIgv').is(':checked'))
//                 tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
//                else
//                 tasaigv=1;
//                
                var objParams = {
                                        Filtro_CodTipoDoc: "5",
                                        Filtro_SerieDoc: $(Contenedor + 'ddlSerie').val(),
                                        Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
                                        Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
                                        Filtro_Vencimiento: $(Contenedor + 'txtVencimiento').val(),
                                        Filtro_CodCliente: $('#hfCodCtaCte').val(),
                                        Filtro_CodFormaPago: $(Contenedor + 'ddlFormaPago').val(),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_TipoCambio: $(Contenedor + 'lblTC').text(),
                                        Filtro_SubTotal: $(Contenedor + 'txtSubTotal').val(),
                                        Filtro_CodProforma: "0",
                                        Filtro_Igv: $(Contenedor + 'txtIgv').val(),
                                        Filtro_Total: $(Contenedor + 'txtTotal').val(),
                                        Filtro_CodGuia: "0",
                                        Filtro_Descuento: "0",
                                        Filtro_TasaIgv: parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
                                        Filtro_TasaIgvDscto: tasaigv,
                                        Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                                        Filtro_XmlDetalle: Sys.Serialization.JavaScriptSerializer.serialize(arrDetalle)
                               };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_AgregarTemporal_NET(arg, function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                if (str_resultado_operacion == "1") 
                {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    $('#MainContent_txtTotal').val(result.split('~')[5]);
                    $('#MainContent_txtMonto').val(result.split('~')[5]);
                    $('#MainContent_txtIgv').val(result.split('~')[6]);
                    $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                    $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                    $('.ccsestilo').css('background', '#FFFFE0');
                    $('#divFacturacionOC').dialog('close');
//                    if (result.split('~')[2]=='Los Producto(s) se han agregado con exito')
//                    alertify.log('Los Producto(s) se han agregado con exito');
                }
                else 
                {
                    MostrarEspera(false);
                    alertify.log(result.split('~')[2]);

                }

                return false;

                });
        }
        
        catch (e) 
        {
            MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
            
        }
}

function F_LimpiarGrillaConsultaOC(){
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

function F_VerSeries(HlkControlID) {
      
        var CodDetalle = '';
        var Cantidad = '';
        var CodProducto = '';
                       
           CodDetalle = $('#' + HlkControlID).text();
           Cantidad =   $('#' + HlkControlID.replace('lblcoddetalle', 'lblCantidad')).text();
           CodProducto = $('#' + HlkControlID.replace('lblcoddetalle', 'hfcodarticulo')).val();

           $('#hfCodDetDocumentoVenta').val(CodDetalle);
           $('#hfCodProducto').val(CodProducto);
           $('#hfCantidad').val(Cantidad);

        try {
            var objParams = {
                Filtro_CodDetDocumentoVenta: CodDetalle
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
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }

    }

function F_AgregarTemporalSerializacion(){

  try 
        {

            var chkSi = '';
            var lblSerie = '';
            var Contador = 0;
            var Contador2 = 0;

            $('#MainContent_grvSerieDetalle .chkDelete :checkbox').each(function () {
                chkSi = '#' + this.id;
                lblSerie = chkSi.replace('chkEliminar', 'lblSerie');

                Contador2 += 1;

                if ($(lblSerie).text() == $('#MainContent_txtSerializacion').val())
                    Contador += 1;

                if ($(lblSerie).text()=='' && Contador2==1)
                    Contador2-=1

               
            });

            
            if (Contador > 0) {
                $('#MainContent_txtSerializacion').val('');
            return false;
        }

          if (Contador2 == parseFloat($('#hfCantidad').val())) {
            $('#MainContent_txtSerializacion').val('');
            return false;
        }


        var Contenedor = '#MainContent_';

                var objParams = {
                                  Filtro_CodDetDocumentoVenta: $('#hfCodDetDocumentoVenta').val(),
                                  Filtro_CodDocumentoVenta: $('#hfCodigoTemporal').val(),
                                  Filtro_CodProducto: $('#hfCodProducto').val(),
                                  Filtro_Serie: $(Contenedor + 'txtSerializacion').val()
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
                    F_Update_Division_HTML('div_GrillaSerieDetalle', result.split('~')[3]);
                    if (result.split('~')[2]=='Se grabo correctamente')
                    {$('#MainContent_txtSerializacion').val('');
                     $('#MainContent_txtSerializacion').focus('');
                     $('#hfCantidadSerie').val(result.split('~')[4]);
                    }
                    else
                    {
                      $('#MainContent_txtSerializacion').val('');
                    $('#MainContent_txtSerializacion').focus('');
 alertify.log(result.split('~')[2]);
                    }
                   

                }
                else 
                {
                    if (result.split('~')[2]=='Se grabo correctamente')
                    {$('#MainContent_txtSerializacion').val('');
                    $('#MainContent_txtSerializacion').focus('');
                    }
                    else
                    {
                    
                    $('#MainContent_txtSerializacion').val('');
                    $('#MainContent_txtSerializacion').focus('');
                    alertify.log(str_mensaje_operacion);
                    return false;
                    }
                    

                     
                }

                return false;

                });
        }
        
        catch (e) 
        {
        MostrarEspera(false);
            alertify.log("ERROR DETECTADO: " + e);
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
            alertify.log("ERROR DETECTADO: " + e);
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
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
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
            alertify.log("ERROR DETECTADO: " + e);
        }
}

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
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }

    }

function F_EditarRegistro(Fila) {

    try {
        var Contenedor = '#MainContent_';
            
        $("#div_Mantenimiento").dialog({
            resizable: false,
            modal: true,
            title: "Edicion Registro",
            title_html: true,
            height: 120,
            width: 300,
            autoOpen: false
        });

        var imgID = Fila.id;

        var lblPeriodo = '#' + imgID.replace('imgEditarRegistro', 'lblPeriodo');
        var lblCodigo = '#' + imgID.replace('imgEditarRegistro', 'lblcodigo');
        
        $(Contenedor + 'txtPeriodoConsulta').val($(lblPeriodo).text());
        $('#hfCodDocumentoVenta').val($(lblCodigo).text());

        $('#div_Mantenimiento').dialog('open');

        return false;


    }

    catch (e) {

        alertify.log("ERROR DETECTADO: " + e);
        return false;
    }

}

function F_EditarTemporal() {

    try {
        var chkSi = '';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla = '';

        var Contenedor = '#MainContent_';

        var tasaigv = parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);


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
                        Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                        Filtro_Desde: $('#MainContent_txtDesde').val(),
                        Filtro_Hasta: $('#MainContent_txtHasta').val(),
                        Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                        Filtro_ChkNumero: chkNumero,
                        Filtro_ChkFecha: chkFecha,
                        Filtro_ChkCliente: chkCliente,
                        Filtro_Periodo: $('#MainContent_txtPeriodoConsulta').val(),
                        Filtro_CodMovimiento: $('#hfCodDocumentoVenta').val(),
                          Filtro_CodTipoDocSust: 1,
                                        Filtro_CodClasificacion: 2
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_EditarTemporal_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
          
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);    
                    if (str_mensaje_operacion!='')                        
                    alertify.log(str_mensaje_operacion);
                $('#div_Mantenimiento').dialog('close');
            }
            else {
                alertify.log(result.split('~')[2]);
            }

            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        alertify.log("ERROR DETECTADO: " + e);
    }
}

function F_ActualizarPrecio(Fila) {
 try 
        {
            var txtPrecio =  '#' + Fila;           
            var lblcoddetalle = txtPrecio.replace('txtPrecio', 'lblcoddetalle');
            var hfPrecio = txtPrecio.replace('txtPrecio', 'hfPrecio');
            var hfCantidad = txtPrecio.replace('txtPrecio', 'hfCantidad');
            var txtCantidad = txtPrecio.replace('txtPrecio', 'txtCantidad');
            var lblProducto = txtPrecio.replace('txtPrecio', 'lblProducto');

            if(parseFloat($(txtPrecio).val())==parseFloat($(hfPrecio).val()) & parseFloat($(txtCantidad).val())==parseFloat($(hfCantidad).val()))
            {
            $(txtPrecio).val(parseFloat($(txtPrecio).val()).toFixed(2));
            $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));
            return false;
            }
            
            var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

            var objParams = {
                              Filtro_Precio: ($(txtPrecio).val()/$(txtCantidad).val())/tasaigv,
                              Filtro_Cantidad: $(txtCantidad).val(),
                              Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                              Filtro_CodDetDocumentoVenta: $(lblcoddetalle).text(),
                              Filtro_Descripcion: $(lblProducto).text(),
                              Filtro_TasaIgvDscto: tasaigv,
                              Filtro_TasaIgv: tasaigv,
                              Filtro_NotaPedido: 0,
                              Filtro_CodTipoOperacion: 2
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
                        $('#MainContent_txtMonto').val('0.00');
                    }
                    else
                    {
                        $('#MainContent_txtTotal').val(result.split('~')[5]);
                        $('#MainContent_txtIgv').val(result.split('~')[6]);
                        $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                        $('#MainContent_txtMonto').val(result.split('~')[5]);
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
            alertify.log("ERROR DETECTADO: " + e);
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
            var lblPrecio = txtCantidad.replace('txtCantidad', 'lblPrecio');
            var lblProducto = txtCantidad.replace('txtCantidad', 'lblProducto');

            if(parseFloat($(txtPrecio).val())==parseFloat($(hfPrecio).val()) & parseFloat($(txtCantidad).val())==parseFloat($(hfCantidad).val()))
            {
            $(txtPrecio).val(parseFloat($(txtPrecio).val()).toFixed(2));
            $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));
            return false;
            }
            
            var tasaigv=parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);

            var objParams = {
                              Filtro_Precio: ($(txtPrecio).val()/$(txtCantidad).val())/tasaigv,
                              Filtro_Cantidad: $(txtCantidad).val(),
                              Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                              Filtro_CodDetDocumentoVenta: $(lblcoddetalle).text(),
                              Filtro_Descripcion: $(lblProducto).text(),
                              Filtro_TasaIgv: tasaigv,
                              Filtro_NotaPedido: 0,
                              Filtro_CodTipoOperacion: 2
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
                        $('#MainContent_txtMonto').val('0.00');
                    }
                    else
                    {
                        $('#MainContent_txtTotal').val(result.split('~')[5]);
                        $('#MainContent_txtIgv').val(result.split('~')[6]);
                        $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                        $('#MainContent_txtMonto').val(result.split('~')[5]);
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
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }

 
} 

function F_ValidarCheckSinIgvMaestro(ControlID) {
                       
           var chkok_grilla = '#' + ControlID;
           
           if ($(chkok_grilla).is(':checked'))
           {
               $('#MainContent_chkConIgvMaestro').prop('checked', false);
               $('#MainContent_chKConIgv').prop('checked', false);
               $('#MainContent_chkSinIgv').prop('checked', true);
           }               
           else
           {
               $('#MainContent_chkConIgvMaestro').prop('checked', true);
               $('#MainContent_chKConIgv').prop('checked', true);
               $('#MainContent_chkSinIgv').prop('checked', false);
           }               
         
         F_ActualizarDetalle();

}

function F_ValidarCheckConIgvMaestro(ControlID) {

           var chkok_grilla = '#' + ControlID;
                       
           if ($(chkok_grilla).is(':checked'))
           {
               $('#MainContent_chkSinIgvMaestro').prop('checked', false);
               $('#MainContent_chkSinIgv').prop('checked', false);
               $('#MainContent_chKConIgv').prop('checked', true);
           }              
           else
           {
               $('#MainContent_chkSinIgvMaestro').prop('checked', true);
               $('#MainContent_chkSinIgv').prop('checked', true);
               $('#MainContent_chKConIgv').prop('checked', false);
           }              
         
         F_ActualizarDetalle();
  
}

function F_ActualizarDetalle(){
  try 
        {
        if($('#MainContent_txtTotal').val()=='0.00')
        return;

        var FlagIgv = 0;
        var Contenedor = '#MainContent_';    
        var tasaigv;
                                   
                if ($('#MainContent_chKConIgv').is(':checked'))
                 tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
                else
                 tasaigv=1;
                
        if($(Contenedor + 'chkConIgvMaestro').is(':checked')) 
             FlagIgv = 1; 
                
                var objParams = {
                                  Filtro_CodDocumentoVenta: $('#hfCodigoTemporal').val(),
                                  Filtro_TasaIgv: parseFloat( $("#MainContent_ddlIgv option:selected").text()) + parseFloat(1),
                                  Filtro_FlagIgv: FlagIgv,
                                  Filtro_TasaIgvDscto: tasaigv,                                    
                                };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

                MostrarEspera(true);
                F_ActualizarDetalle_NET(arg, function (result) {
                
                  MostrarEspera(false);

                   var str_resultado_operacion = result.split('~')[0];
                   var str_mensaje_operacion = result.split('~')[1];

                  if (str_mensaje_operacion == "Se Grabo Correctamente")
                   {
                    $('#hfCodigoTemporal').val(result.split('~')[3]);
                    if (result.split('~')[5]=='0')
                    {
                         $('#MainContent_txtTotal').val('0.00');
                         $('#MainContent_txtIgv').val('0.00');
                         $('#MainContent_txtSubTotal').val('0.00');
                         $('#MainContent_txtDsctoTotal').val('0.00');
                         $('#MainContent_txtMonto').val('0.00');
                    }
                    else
                    {
                         $('#MainContent_txtTotal').val(result.split('~')[5]);
                         $('#MainContent_txtIgv').val(result.split('~')[6]);
                         $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                         $('#MainContent_txtMonto').val(result.split('~')[5]);
                         $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                    }                   
                    F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                     $('.ccsestilo').css('background', '#FFFFE0');
                   }
                else 
                {
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
            alertify.log("ERROR DETECTADO: " + e);
            return false;
        }
}