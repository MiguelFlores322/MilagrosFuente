﻿var AppSession = "../Inventario/GuiaRemision.aspx";
var Impresora = "EPSON LX-810";

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#MainContent_txtDestino').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_TCDireccion_Listar',
                data: "{'Descripcion':'" + request.term + "','Codigo':'" + $('#hfCodCtaCte').val() + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0]
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
            
        },
        minLength: 3
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
                            Direccion: item.split(',')[2],
                            DireccionEnvio: item.split(',')[3],
                            Distrito: item.split(',')[4],
                            CodDepartamento: item.split(',')[5],
                            CodProvincia: item.split(',')[6],
                            CodDistrito: item.split(',')[7],
                            NroRuc: item.split(',')[8],
                            FormaPago: item.split(',')[12],
                            Telefono: item.split(',')[13],
                            CodTransportista: item.split(',')[14],
                            Transportista: item.split(',')[15],
                            CodVendedor: item.split(',')[17]
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
            F_DireccionProveedor(i.item.val, 'div_Destino', '#MainContent_ddlDestino', 'div_Direccion', '#MainContent_ddlDireccion');          
        },
        minLength: 3
    });

    $('#MainContent_txtTransportista').autocomplete({
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
            $('#hfCodTransportista').val(i.item.val);
            F_DireccionTransportista(i.item.val,'div_DireccionTransportista','#MainContent_ddlDireccionTransportista');
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

    $('#MainContent_btnBuscarArticulo').click(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;
        try 
        {
        MostrarEspera(true);
        var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val=="")
            cadena=cadena + "\n" + "Articulo"

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
            alertify.log("Error Detectado: " + e);
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
              
               
                    $('#MainContent_chKConIgv').prop('checked', true);
                    $('#MainContent_chkSinIgv').prop('checked', false); 
                
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

            alertify.log("Error Detectado: " + e);
        }


        return false;

    });  

    $('#MainContent_btnAgregar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
        
//        if (F_ValidarAgregar()==false)
//        return false;
              
        F_AgregarTemporal();
        F_LimpiarGrillaConsulta();
        
        $('#MainContent_txtArticulo').focus();
        return false;
        }
        
        catch (e) 
        {
            MostrarEspera(false);
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

            if (confirm("ESTA SEGURO DE GRABAR LA GUIA DE REMISION"))
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

    $('#MainContent_txtEmision').on('change', function (e) {
        F_FormaPago($("#MainContent_ddlFormaPago").val());
        F_TipoCambio();
    });

    $('#MainContent_txtNumero').blur(function () {
        var id='00000000' + $('#MainContent_txtNumero').val();
            $('#MainContent_txtNumero').val(id.substr(id.length - 8));   
       return false;
   });

   $('#MainContent_txtSerieFactura').blur(function () {
       if ($('#MainContent_txtSerieFactura').val() == '')
           return false;
       var id = '0000' + $('#MainContent_txtSerieFactura').val();
       $('#MainContent_txtSerieFactura').val(id.substr(id.length - 4));
       return false;
   });

   $('#MainContent_txtNumeroFactura').blur(function () {
       if ($('#MainContent_txtNumeroFactura').val() == '')
           return false;
       var id = '00000000' + $('#MainContent_txtNumeroFactura').val();
       $('#MainContent_txtNumeroFactura').val(id.substr(id.length - 8));
       return false;
   });

    $('#MainContent_txtArticulo').blur(function () {
          try 
        {
        if ($('#MainContent_txtArticulo').val()=='')
        return false

        var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val=="" | $('#MainContent_txtArticulo').val().length<3)
            cadena=cadena + "\n" + "Articulo (Minimo 2 Caracteres)"

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

    $(document).on("change", "select[id $= 'MainContent_ddlSerie']",function () {
     F_Mostrar_Correlativo(10);
 });

    F_Controles_Inicializar();

    $('#MainContent_txtPeriodo').css('background', '#FFFFE0');

    $('#MainContent_txtProveedor').css('background', '#FFFFE0');

    $('#MainContent_txtFechaIngreso').css('background', '#FFFFE0');

    $('#MainContent_txtPeso').css('background', '#FFFFE0');

    $('#MainContent_txtDsctoTotal').css('background', '#FFFFE0');

    $('#MainContent_txtNuBultos').css('background', '#FFFFE0');

    $('#MainContent_txtEmision').css('background', '#FFFFE0');

    $('#MainContent_txtLicenciaGuia').css('background', '#FFFFE0');

    $('#MainContent_txtClienteConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtTransportista').css('background', '#FFFFE0');

    $('#MainContent_txtPartida').css('background', '#FFFFE0');

    $('#MainContent_txtDestino').css('background', '#FFFFE0');

    $('#MainContent_txtEmpresa').css('background', '#FFFFE0');

    $('#MainContent_txtPlaca').css('background', '#FFFFE0');

    $('#MainContent_txtMarcaGuia').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtNumero').css('background', '#FFFFE0');

    $('#MainContent_txtDesde').css('background', '#FFFFE0');

    $('#MainContent_txtHasta').css('background', '#FFFFE0');

    $('#MainContent_txtArticulo').css('background', '#FFFFE0');

    $('#MainContent_txtSerieFactura').css('background', '#FFFFE0');

    $('#MainContent_txtNumeroFactura').css('background', '#FFFFE0');

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

    if ($('#MainContent_hdnCodEmpresa').val() == '')
    {
        $('#divSeleccionarEmpresa').dialog('open');
    }

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

function F_ElegirEmpresa(Fila) {
    MostrarEspera(true);

    var imgID = Fila.id;
    var hfCodEmpresa = '#' + imgID.replace('imgSelecEmpresa', 'hfCodEmpresa');
    var lblNombre     = '#' + imgID.replace('imgSelecEmpresa', 'lblRazonSocial');
    var ddlSede       = '#' + imgID.replace('imgSelecEmpresa', 'ddlSede');
    var Cuerpo = '#MainContent_';

    $(Cuerpo + 'txtEmpresa').val($(lblNombre).text());
    $(Cuerpo + 'hdnCodEmpresa').val($(hfCodEmpresa).val());
    $(Cuerpo + 'hdnCodSede').val($(ddlSede).val());

    var arg;

    try {
        var objParams =
            {
                Filtro_Empresa: $(hfCodEmpresa).val(),
                Filtro_Sede: $(ddlSede).val()
            };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_Consulta_Series_Net
            (
                arg,
                function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                            F_Update_Division_HTML('div_serie', result.split('~')[2]);
                            F_Update_Division_HTML('div_serieconsulta', result.split('~')[3]);
                            F_Update_Division_HTML('div_serieguia', result.split('~')[4]);
                            F_Update_Division_HTML('div_SerieNV', result.split('~')[5]);
                            $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                            $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                           
                            F_Controles_Inicializar();
                            $('#MainContent_ddlSerieGuia').css('background', '#FFFFE0');                       
                            $('#MainContent_ddlSerieNV').css('background', '#FFFFE0');
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

    $('#divSeleccionarEmpresa').dialog('close');
}

var UnaEmpresa = 0;
function F_ElegirEmpresa2() {
    UnaEmpresa = 1;
    MostrarEspera(true);
    var Cuerpo = '#MainContent_';
    var arg;

    $(Cuerpo + 'hdnCodSede').val($(Cuerpo + 'hdnCodEmpresa').val());

    try {
        var objParams =
            {
                Filtro_Empresa: $(Cuerpo + 'hdnCodEmpresa').val(),
                Filtro_Sede: $(Cuerpo + 'hdnCodSede').val()
            };

        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_Consulta_Series_Net
            (
                arg,
                function (result) {
                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_serie', result.split('~')[2]);
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[3]);
                        F_Update_Division_HTML('div_serieguia', result.split('~')[4]);
                        F_Update_Division_HTML('div_SerieNV', result.split('~')[5]);
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');

                        F_Controles_Inicializar();
                        $('#MainContent_ddlSerieGuia').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieNV').css('background', '#FFFFE0');
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

    $('#divSeleccionarEmpresa').dialog('close');
}

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

function F_Controles_Inicializar() {

    if ($('#MainContent_hdnCodEmpresa').val() == "")
        return false;

    var arg;

    try {
        var objParams =
            {
                Filtro_Fecha: $('#MainContent_txtEmision').val(),
                Filtro_CodAlmacenFisico: 1,
                Filtro_CodEmpresa: $('#MainContent_hdnCodEmpresa').val()
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
                        F_Update_Division_HTML('div_MotivoTrabajo', result.split('~')[2]);
                        F_Update_Division_HTML('div_serie', result.split('~')[3]);    
                        F_Update_Division_HTML('div_AlmacenFisico', result.split('~')[4]);         
                        F_Update_Division_HTML('div_serieconsulta', result.split('~')[9]);                         
                        $('#MainContent_txtNumero').val(result.split('~')[7]);
                        $('#MainContent_txtPartida').val(result.split('~')[8]);               
                        $('#MainContent_ddlMotivoTrabajo').val(3);
                        $('#MainContent_lblTC').text(result.split('~')[6]);
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlFormaPago').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerie').css('background', '#FFFFE0');
                        $('#MainContent_ddlSerieConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlMotivoTrabajo').css('background', '#FFFFE0');
                        $('#MainContent_ddlIgv').css('background', '#FFFFE0');
                        $('#MainContent_ddlDestino').css('background', '#FFFFE0');
                        $('#MainContent_ddlDireccionTransportista').css('background', '#FFFFE0');
                        $('#MainContent_ddlAlmacenFisico').css('background', '#FFFFE0');
                        $('#MainContent_ddlDireccion').css('background', '#FFFFE0');
                        if ($('#MainContent_txtEmpresa').val() != '')
                            F_ElegirEmpresa2();

                         F_Mostrar_Correlativo(10);
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

function F_Buscar_Productos() {
    var arg;
    var CodTipoProducto='2';
    try {
        var objParams =
            {
                Filtro_DscProducto: $('#MainContent_txtArticulo').val()
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
          
            
            boolEstado = $(chkok_grilla).is(':checked');
            if (boolEstado)
            {
               
                $(txtcant_grilla).prop('disabled', false);
                var i=0;
                if($(txtprecio_grilla).val()=="")
                {$(txtprecio_grilla).focus();
                i=1}

                if(i==0 && $(txtcant_grilla).val()=="")
                {$(txtcant_grilla).focus();}
            }
            else
            {
                $(txtprecio_Grilla).val('');
                $(txtcant_grilla).val('');
                $(ddlLista_grilla).val('4');
              
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
                   
                    txtcantidad_grilla = chkSi.replace('chkOK', 'txtCantidad');
                    lblcodproducto_grilla = chkSi.replace('chkOK', 'lblcodproducto');
                    
                     if ($(chkSi).is(':checked')) 
                        {                                        
                            if ($(txtcantidad_grilla).val()=='')
                            cadena=cadena + "\n" + "Cantidad para el Codigo " + $(lblcodproducto_grilla).text(); 
                        
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
                                    cadena= cadena + "\n"  + $(lbldscproducto_grilla).text();
                                    }
                         
                                  });
                            }
                    });
                   }    
                                 
                   if (cadena != "Los sgtes. productos se encuentran agregados : ") 
                   {
                       
                       alertify.log(cadena);
                       return false;
                   }
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
        var lblPrecio1='';
        var txtdscto_grilla='';
        var arrDetalle = new Array();
        var hfcodunidadventa_grilla='';
        var hfcosto_grilla='';
        var lblProducto='';
        var Contenedor = '#MainContent_';
        var tasaigv;
                                   
          if ($('#MainContent_chKConIgv').is(':checked'))
                 tasaigv=parseFloat($("#MainContent_ddlIgv option:selected").text()) + parseFloat(1);
          else
                 tasaigv=1;
                        
                $('#MainContent_grvConsultaArticulo .chkSi :checkbox').each(function () {
                    chkSi = '#' + this.id;
                    lblcodproducto_grilla = chkSi.replace('chkOK', 'hfCodProducto');
                    txtcantidad_grilla = chkSi.replace('chkOK', 'txtCantidad');
                    lblProducto = chkSi.replace('chkOK', 'hfDescripcion');

                  if ($(chkSi).is(':checked')) 
                    {
                        var objDetalle = {
                        CodArticulo: $(lblcodproducto_grilla).val(),
                        Descripcion: $(lblProducto).val().replace("&", "&amp;"),
                        Cantidad: $(txtcantidad_grilla).val(),

                        Precio: 0,
                        PrecioDscto: 0,
                        Costo: 0,
                        CodUm: 0,
                        CodDetalle: 0,
                        Acuenta: 0,
                        CodTipoDoc:0

                        };                                               
                        arrDetalle.push(objDetalle);
                    }
                });

                var objParams = {
                                        Filtro_CodTipoDoc: "2",
                                        Filtro_SerieDoc: $(Contenedor + 'ddlSerie').val(),
                                        Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
                                        Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
                                        Filtro_Vencimiento: $(Contenedor + 'txtEmision').val(),
                                        Filtro_CodCliente: 119,
                                        Filtro_CodFormaPago: 1,
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_TipoCambio: 3.3,
                                        Filtro_SubTotal: 0,
                                        Filtro_CodProforma: 0,
                                        Filtro_Igv: 0,
                                        Filtro_Total: 0,
                                        Filtro_CodTraslado: 0,
                                        Filtro_Descuento: 0,
                                        Filtro_TasaIgv: 1.18,
                                        Filtro_TasaIgvDscto: 0,
                                        Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
                                        Filtro_CodAlmacenFisicoDesde: $('#MainContent_ddlPartida').val(),
                                        Filtro_CodAlmacenFisicoHasta: $('#MainContent_ddlDestino').val(),
                                        Filtro_FlagFormulario: 1,
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
                    if (result.split('~')[2]=='Los Producto(s) se han agregado con exito')
                        alertify.log('Los Producto(s) se han agregado con exito');
                    $('#MainContent_txtArticulo').val('');
                    $('#MainContent_chkDescripcion').focus();
                    $('.ccsestilo').css('background', '#FFFFE0');     
                    F_LimpiarGrillaConsulta();
                    $('#MainContent_txtArticulo').focus();
                }
                else 
                {
                    MostrarEspera(false);
                    alertify.log(result.split('~')[2]);
                    return false;
                }

                return true;

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

function F_EliminarTemporal() {

    try {
        var chkSi = '';
        var arrDetalle = new Array();
        var lblcoddetalle_grilla = '';


        $('#MainContent_grvDetalleArticulo .chkDelete :checkbox').each(function () {
            chkSi = '#' + this.id;
            lblcoddetalle_grilla = chkSi.replace('chkEliminar', 'lblcoddetalle');

            if ($(chkSi).is(':checked')) {
                var objDetalle = {

                    CodDetalle: $(lblcoddetalle_grilla).text()
                };

                arrDetalle.push(objDetalle);
            }
        });


        var Contenedor = '#MainContent_';
        var tasaigv = 1.18;
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

            if (str_resultado_operacion == "1") {
                $('#hfCodigoTemporal').val(result.split('~')[3]);
                $('#MainContent_txtMonto').val(result.split('~')[6]);
                $('#MainContent_txtTotal').val(result.split('~')[5]);
                $('#MainContent_txtIgv').val(result.split('~')[6]);
                $('#MainContent_txtSubTotal').val(result.split('~')[7]);
                $('#MainContent_txtDsctoTotal').val(result.split('~')[8]);
                F_Update_Division_HTML('div_grvDetalleArticulo', result.split('~')[4]);
                $('.ccsestilo').css('background', '#FFFFE0');
                if (result.split('~')[2] == 'Se han eliminado los productos correctamente.')
                    alertify.log('Se han eliminado los productos correctamente.');
            }
            else {
                alertify.log(result.split('~')[2]);
            }

            return false;

        });
    }

    catch (e) {
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
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($('#MainContent_ddlAlmacenFisico').val() == null)
            Cadena = Cadena + '<p></p>' + 'Almacen';

        if ($(Cuerpo + 'txtSerieFactura').val() == '')
            Cadena = Cadena + '<p></p>' + 'Serie Factura';

        if ($(Cuerpo + 'txtNumeroFactura').val() == '')
            Cadena = Cadena + '<p></p>' + 'Numero Factura';

        if ($(Cuerpo + 'txtProveedor').val()=='' || $('#hfCodCtaCte').val()==0)
            Cadena = Cadena + '<p></p>' + 'Proveedor';

        if ($('#MainContent_ddlDireccion').val() == null)
            Cadena = Cadena + '<p></p>' + 'Serie';

        if ($(Cuerpo + 'txtEmision').val()=='')
            Cadena=Cadena + '<p></p>' + 'Emision';

        if ($('#MainContent_ddlSerie').val() == null)
            Cadena = Cadena + '<p></p>' + 'Serie';

        if ($(Cuerpo + 'txtNumero').val()=='')
            Cadena = Cadena + '<p></p>' + 'Numero';

        if ($('#MainContent_ddlMotivoTrabajo').val() == null)
            Cadena = Cadena + '<p></p>' + 'Operacion';

        if ($(Cuerpo + 'txtPartida').val() == '')
            Cadena = Cadena + '<p></p>' + 'Partida';

        if ($('#MainContent_ddlDestino').val() == null)
            Cadena = Cadena + '<p></p>' + 'Destino';
   
        if (Cadena != 'Ingresar los sgtes. Datos:')
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
        var Contenedor = '#MainContent_';
        var Index= $('#MainContent_txtProveedor').val().indexOf('-');
        var RazonSocial = $('#MainContent_txtProveedor').val();
        RazonSocial=RazonSocial.substr(RazonSocial.length - (RazonSocial.length -(Index+2)));
        var Peso = 0;
        var NroBultos = 0;

        if ($.trim($(Contenedor + 'txtPeso').val()) != '')
            Peso = $(Contenedor + 'txtPeso').val();

        if ($.trim($(Contenedor + 'txtNuBultos').val()) != '')
            NroBultos = $(Contenedor + 'txtNuBultos').val();

        var objParams = {
                                        Filtro_CodAlmacenFisico: $(Contenedor + 'ddlAlmacenFisico').val(),
                                        Filtro_CodDocumentoVenta: $('#hfCodigoTemporal').val(),
                                        Filtro_FechaEmision: $(Contenedor + 'txtEmision').val(),
                                        Filtro_SerieDoc: $("#MainContent_ddlSerie option:selected").text(),
                                        Filtro_NumeroDoc: $(Contenedor + 'txtNumero').val(),
                                        Filtro_CodMotivoInterno: 3,
                                        Filtro_Partida: $(Contenedor + 'txtPartida').val(),
                                        Filtro_Destino: $("#MainContent_ddlDestino option:selected").text(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                                        Filtro_CodTipoOperacion: 11,
                                        Filtro_CodEmpresa: $(Contenedor + 'hdnCodEmpresa').val(),
                                        Filtro_CodMotivoTraslado: 3,
                                        Filtro_CodTransportista: $('#hfCodTransportista').val(),
                                        Filtro_DireccionTrans: $("#MainContent_ddlDireccionTransportista option:selected").text(),
                                        Filtro_Placa: $(Contenedor + 'txtPlaca').val(),
                                        Filtro_Marca: $(Contenedor + 'txtMarcaGuia').val(),
                                        Filtro_Licencia: $(Contenedor + 'txtLicenciaGuia').val(),
                                        Filtro_NroBultos: NroBultos,
                                        Filtro_Peso: Peso,                                    
                                        Filtro_Cliente: RazonSocial,
                                        Filtro_SerieFactura: $(Contenedor + 'txtSerieFactura').val(),
                                        Filtro_NumeroFactura: $(Contenedor + 'txtNumeroFactura').val(),
                                        Filtro_CodTipoDoc: 1,
                                        Filtro_CodDireccion: $(Contenedor + 'ddlDireccion').val()
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
                    if (str_mensaje_operacion == 'Se Grabo Correctamente')
                    {
                         alertify.log('Se grabo correctamente');
                         $('#MainContent_txtNumero').val(result.split('~')[3]);

                        F_Nuevo();
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
       $('#MainContent_ddlMotivoTrabajo').val('9');
       $('#MainContent_ddlDestino').val('0');
       $('#MainContent_ddlDireccion').val('0');
       $('#MainContent_ddlDireccionTransportista').val('0');
       $('#hfCodigoTemporal').val('0');
       $('#hfCodCtaCte').val('0');
       $('#hfCodTransportista').val('0');
       $('#MainContent_txtProveedor').val('');
       $('#MainContent_txtTransportista').val('');
       $('#MainContent_txtPlaca').val('');
       $('#MainContent_txtMarcaGuia').val('');
       $('#MainContent_txtLicenciaGuia').val('');
       $('#MainContent_txtSerieFactura').val('');
       $('#MainContent_txtNumeroFactura').val('');
       $('#MainContent_txtPeso').val('');
       $('#MainContent_txtNuBultos').val('');
       $('#MainContent_chkImprimirGuia').prop('checked', true);
       $('#MainContent_txtProveedor').focus();
       
       try 
        {
              var objParams = {
                                        Filtro_CodSerie: '4'                                        
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
                  $('#MainContent_txtNumero').val(result.split('~')[3]);
                  F_Mostrar_Correlativo(10);
                  if (UnaEmpresa == 0)
                  $('#divSeleccionarEmpresa').dialog('open'); 
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
                  Filtro_SerieDoc: $("#MainContent_ddlSerieConsulta option:selected").text(),                            
                                        Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                                        Filtro_Desde: $('#MainContent_txtDesde').val(),
                                        Filtro_Hasta: $('#MainContent_txtHasta').val(),
                                        Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                                        Filtro_ChkNumero: chkNumero,
                                        Filtro_ChkFecha: chkFecha,
                                        Filtro_ChkCliente: chkCliente,
                                        Filtro_CodEmpresa: $('#MainContent_hdnCodEmpresa').val(),
                                        Filtro_CodTipoOperacion:11
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
    var lblCodMarcaGv = '#' + imgID.replace('imgAnularDocumento', 'lblID');
    var lblestado_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblEstado');
    var lblnumero_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblnumero');
    var lblcliente_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblcliente');

    if ($(lblestado_grilla).text()!="ENVIADO") 
    {alert ("SOLO SE PUEDE ANULAR LAS GUIAS DE REMISION EN ESTADO ENVIADO");
    return false;}

    if(!confirm("ESTA SEGURO DE ANULAR LA GUIA DE REMISION : " + $(lblnumero_grilla).text() + "\nDEL PROVEEDOR : " +  $(lblcliente_grilla).text()))
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
                          Filtro_SerieDoc: $("#MainContent_ddlSerieConsulta option:selected").text(),     
                          Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
                          Filtro_Desde: $('#MainContent_txtDesde').val(),
                          Filtro_Hasta: $('#MainContent_txtHasta').val(),
                          Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
                          Filtro_ChkNumero: chkNumero,
                          Filtro_ChkFecha: chkFecha,
                          Filtro_ChkCliente: chkCliente,
                          Filtro_CodEmpresa: $('#MainContent_hdnCodEmpresa').val()
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
                alertify.log(result.split('~')[1]);
        }
        else {
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

function getContentTab(){

    var date = new Date();
    date.setMonth(date.getMonth(), 1);
 
    $('#MainContent_txtDesde').val(date.format("dd/MM/yyyy"));
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
                {$('#MainContent_lblTC').text(result.split('~')[2]);
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

function F_Mostrar_Correlativo(CodDoc) {

    var arg;

    try {
        var objParams = {
            Filtro_CodDoc: CodDoc,
            Filtro_SerieDoc: $("#MainContent_ddlSerie option:selected").text(),
            Filtro_CodEmpresa: $('#MainContent_hdnCodEmpresa').val()
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
                       
                            $('#MainContent_txtNumero').val(result.split('~')[2]);
                                               
                    }
                    else
                        alertify.log(str_mensaje_operacion);
                }
            );

    } catch (mierror) {
    MostrarEspera(false);
        alertify.log("Error detectado: " + mierror);

    }

}

function F_MostrarTotales(){

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

function F_ImprimirGuia(Codigo) {
   
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
    rptURL = rptURL + 'Codigo=' + Codigo + '&' ;
      
    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_ImprimirProforma(Codigo) {

    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = '5';
    var CodMenu = '203';

    rptURL = '../Reportes/Crystal.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'CodTipoArchivo=' + CodTipoArchivo + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Codigo=' + Codigo + '&' ;
      
    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_Imprimir(Fila) {
    var imgID = Fila.id;
    var lblID = '#' + imgID.replace('imgImprimir', 'lblID');
    var lblEstado = '#' + imgID.replace('imgImprimir', 'lblEstado');
   
    if ($(lblEstado).text()=='ANULADO')
    {
        alertify.log("La guia se encuentra anulada");
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
    rptURL = rptURL + 'Codigo=' + $(lblID).text() + '&';
    rptURL = rptURL + 'Impresora=' + Impresora + '&';
      
    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_ActualizarPrecio(Fila) {
    try {
        var txtPrecio = '#' + Fila;
        var lblcoddetalle = txtPrecio.replace('txtPrecio', 'lblcoddetalle');
        var hfPrecio = txtPrecio.replace('txtPrecio', 'hfPrecio');
        var hfCantidad = txtPrecio.replace('txtPrecio', 'hfCantidad');
        var txtCantidad = txtPrecio.replace('txtPrecio', 'txtCantidad');
        var lblproducto = txtCantidad.replace('txtCantidad', 'lblproducto');
        var lblAcuenta = txtPrecio.replace('txtPrecio', 'lblAcuenta');

        
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
            Filtro_Descripcion: $(lblproducto).text(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: 0,
            Filtro_Flag: 0
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
                    $('#MainContent_txtAcuentaNV').val('0.00');
                }
                else {
                    $('#MainContent_txtTotal').val(parseFloat(result.split('~')[5]).toFixed(2));
                    $('#MainContent_txtIgv').val(parseFloat(result.split('~')[6]).toFixed(2));
                    $('#MainContent_txtSubTotal').val(parseFloat(result.split('~')[7]).toFixed(2));
                    $('#MainContent_txtAcuentaNV').val(parseFloat(result.split('~')[8]).toFixed(2));
                }
                if ($('#MainContent_ddlFormaPago').val() == 1)
                    $('#MainContent_txtAcuenta').val(parseFloat($('#MainContent_txtTotal').val()) - parseFloat($('#MainContent_txtAcuentaNV').val()).toFixed(2));
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

function F_ActualizarCantidad(Fila) {
    try {
        var txtCantidad = '#' + Fila;
        var lblcoddetalle = txtCantidad.replace('txtCantidad', 'lblcoddetalle');
        var hfPrecio = txtCantidad.replace('txtCantidad', 'hfPrecio');
        var hfCantidad = txtCantidad.replace('txtCantidad', 'hfCantidad');
        var txtPrecio = txtCantidad.replace('txtCantidad', 'txtPrecio');
        var lblproducto = txtCantidad.replace('txtCantidad', 'lblproducto');
        var hfCodDetalleOC = txtCantidad.replace('txtCantidad', 'hfCodDetalleOC');
        var lblAcuenta = txtCantidad.replace('txtCantidad', 'lblAcuenta');
        var Flag = 0;
        Flag = 1

        if (parseFloat($(txtCantidad).val()) == parseFloat($(hfCantidad).val())) {
            
            $(txtCantidad).val(parseFloat($(txtCantidad).val()).toFixed(2));
            return false;
        }

        var tasaigv = 1.18;

        var objParams = {
            Filtro_Precio: 0,
            Filtro_Cantidad: $(txtCantidad).val(),
            Filtro_CodigoTemporal: $('#hfCodigoTemporal').val(),
            Filtro_Descripcion: $(lblproducto).text(),
            Filtro_CodDetDocumentoVenta: $(lblcoddetalle).text(),
            Filtro_Descripcion: $(lblproducto).text(),
            Filtro_TasaIgv: tasaigv,
            Filtro_NotaPedido: 0,
            Filtro_Flag: Flag,
            Filtro_CodAlmacenFisicoDesde: $('#MainContent_ddlPartida').val(),
            Filtro_CodAlmacenFisicoHasta: $('#MainContent_ddlDestino').val(),
            Filtro_FlagFormulario: 1
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

function F_FacturacionOC() {
        var Contenedor = '#MainContent_';
        var Mensaje = "Ingresar los sgtes. Datos: <br> <p></p>";

        if ($(Contenedor + 'txtProveedor').val() == "" || $('#hfCodCtaCte').val() == 0)
            Mensaje = Mensaje + "\n" + "Proveedor";

        if ($(Contenedor + 'lblTC').text() == "0")
            Mensaje = Mensaje + "\n" + "Tipo de Cambio";

        if (Mensaje != "Ingresar los sgtes. Datos: <br> <p></p>") {
            alertify.log(Mensaje);
            return false;
        }

        try {
            var objParams = {
                Filtro_CodCtaCte: $('#hfCodCtaCte').val(),
                Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val()
            };

            var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
            MostrarEspera(true);

            F_FacturacionOC_NET(arg, function (result) {
                MostrarEspera(false);

                var str_resultado_operacion = "";
                var str_mensaje_operacion = "";

                str_resultado_operacion = result.split('~')[0];
                str_mensaje_operacion = result.split('~')[1];

                if (str_resultado_operacion == "1") {

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

                    if (str_mensaje_operacion != "")
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
            alertify.log("Error Detectado: " + e);
            return false;
        }
    }

function F_ValidarStockGrilla(ControlID) {
    var txtCantidad = '#' + ControlID;
    var chkOK = txtCantidad.replace('txtCantidad', 'chkOK');
    var txtPrecio = txtCantidad.replace('txtCantidad', 'txtPrecio');
    var txtDescuento = txtCantidad.replace('txtCantidad', 'txtDescuento');

    if ($(txtCantidad).val() == '')
        return false;

    if (F_ValidarAgregar() == false) {
        $(txtCantidad).val('');
        $(txtPrecio).val('');
        $(txtDescuento).val('');
        $(chkOK).prop('checked', false);
        return false;
    }

    var Stock = 0;
    var lblChala1 = txtCantidad.replace('txtCantidad', 'lblstock');
    var lblChala2 = txtCantidad.replace('txtCantidad', 'lblChala2');
    
    Stock = $(lblChala1).text();

    boolEstado = $(chkOK).is(':checked');

    if (boolEstado && parseFloat($(txtCantidad).val()) > parseFloat(Stock)) {
            alertify.log("Stock insuficiente");
            $(txtCantidad).val('');
            return false;
        }

    F_AgregarTemporal();
    F_LimpiarGrillaConsulta();
    $('#MainContent_txtArticulo').focus();
    return false;
}

function F_DireccionTransportista(CodTransportista,Division,Combo) {
    try {
        var objParams = {
            Filtro_CodTransportista: CodTransportista
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_DireccionTransportista_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            F_Update_Division_HTML(Division, result.split('~')[2]);
            $(Combo).css('background', '#FFFFE0');

            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }

}

function F_DireccionProveedor(CodTransportista, Division, Combo, Division2, Combo2) {
    try {
        var objParams = {
            Filtro_CodTransportista: CodTransportista
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_DireccionProveedor_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            F_Update_Division_HTML(Division, result.split('~')[2]);
            F_Update_Division_HTML(Division2, result.split('~')[3]);
            $(Combo).css('background', '#FFFFE0');
            $(Combo2).css('background', '#FFFFE0');

            return false;
        });
    }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }

}



