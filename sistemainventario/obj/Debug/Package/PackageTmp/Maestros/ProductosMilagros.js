var AppSession = "../Maestros/ProductosMilagros.aspx";

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    $('#MainContent_txtCodigoSuperior').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_LGProductos_Select',
                data: "{'Descripcion':'" + request.term + "','CodAlmacen':'" + $('#hfCodSede').val() + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            CodProducto: item.split(',')[5]
                        }
                    }))
                },
                error: function (response) {
                    alert(response.responseText);
                },
                failure: function (response) {
                    alert(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfCodigoSuperior').val(i.item.CodProducto);
        },
        minLength: 3
    });

    $('#MainContent_txtCodigoSuperiorEdicion').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_LGProductos_Select',
                data: "{'Descripcion':'" + request.term + "','CodAlmacen':'" + $('#hfCodSede').val() + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            CodProducto: item.split(',')[5]
                        }
                    }))
                },
                error: function (response) {
                    alert(response.responseText);
                },
                failure: function (response) {
                    alert(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfCodigoSuperiorEdicion').val(i.item.CodProducto);
        },
        minLength: 3
    });


    $('#MainContent_txtArticuloRelacionado').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_LGProductos_Select',
                data: "{'Descripcion':'" + request.term + "','CodAlmacen':'" + $('#hfCodSede').val() + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[1],
                            val: item.split(',')[0],
                            CodProducto: item.split(',')[5]
                        }
                    }))
                },
                error: function (response) {
                    alert(response.responseText);
                },
                failure: function (response) {
                    alert(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfCodigoArticuloRelacionado').val(i.item.CodProducto);
//            $('#MainContent_lblStock').text(i.item.Stock);
//            $('#MainContent_lblCosto').text(i.item.Costo);
//            $('#MainContent_lblMoneda').text(i.item.Moneda);

        },
        minLength: 3
    });

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }
    
    $('#divTabs').tabs();

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

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
            if(!F_ValidarGrabarDocumento())
              return false;

            if (confirm("ESTA SEGURO DE GRABAR EL PRODUCTO"))
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

    $('#MainContent_btnEdicion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
     try 
        {
            if(!F_ValidarEdicionDocumento())
              return false;

            if (confirm("ESTA SEGURO DE ACTUALIZAR LOS DATOS DEL PRODUCTO"))
              F_EdicionRegistro();

            return false;
        }        
        catch (e) 
        {
            alertify.log("Error Detectado: " + e);
        }
    });

    $("#MainContent_txtCostoConIgv").blur(function () {
      F_Precio();
    });

     $("#MainContent_txtTC").blur(function () {
      F_Precio();
    });

     $("#MainContent_txtCostoSolesIgv").blur(function () {
      F_Precio();
    });

     $("#MainContent_txtPrecio").blur(function () {
      F_Precio();
    });

     $("#MainContent_txtMargen").blur(function () {
      F_Precio();
    });

     $("#MainContent_txtPrecioMayorista").blur(function () {
      F_Precio();
    });

     $("#MainContent_txtMargenMayorista").blur(function () {
      F_Precio();
    });
    
    $("#MainContent_txtCostoEdicion").blur(function () 
    {
       F_PrecioEdicion();
    });
        
    $("#MainContent_txtMargenEdicion").blur(function () 
    {
       F_PrecioEdicion();
    });

    $("#MainContent_txtMargenMayoristaEdicion").blur(function () 
    {
          F_PrecioEdicion();
    });

    $("#MainContent_txtPrecioMayoristaEdicion").blur(function () {
          F_PrecioEdicion();
    });
      
       $("#MainContent_txtPrecioEdicion").blur(function () {
          F_PrecioEdicion();
    });

    $("#MainContent_txtFactorEdicion").keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
           e.preventDefault();
   });

    $("#MainContent_txtCostoEdicion").keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
           e.preventDefault();
   });

    $("#MainContent_txtCostoSolesEdicion").keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
           e.preventDefault();
   });

    $("#MainContent_txtPrecioEdicion").keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
           e.preventDefault();
   });
   
    $("#MainContent_txtCostoMercadoEdicion").keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
           e.preventDefault();
   });

    $("#MainContent_txtFactor").keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
           e.preventDefault();
   });

    $("#MainContent_txtCosto").keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
           e.preventDefault();
   });

    $("#MainContent_txtCostoSoles").keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
           e.preventDefault();
   });

    $("#MainContent_txtPrecio").keydown(function (e) {
       if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
           return;
       }
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
           e.preventDefault();
   });

   $("#MainContent_txtTCEdicion").blur(function () {
     F_PrecioEdicion();
   });

   $("#MainContent_txtDescripcionConsulta").blur(function () {
       try {

           if ($('#MainContent_txtDescripcionConsulta').val() == '')
               return false

           if ($('#MainContent_txtDescripcionConsulta').val == "" | $('#MainContent_txtDescripcionConsulta').val().length < 3)
               cadena = cadena + "\n" + "Descripcion (Minimo 3 Caracteres)"

           F_Buscar();
           return false;
       }

       catch (e) {

           alertify.log("Error Detectado: " + e);
       }

   });

   F_Controles_Inicializar();

   $('#MainContent_txtCodigo').css('background', '#FFFFE0');

   $('#MainContent_txtTC').css('background', '#FFFFE0');

   $('#MainContent_txtCodigo2').css('background', '#FFFFE0');

   $('#MainContent_txtPartidaArancelaria').css('background', '#FFFFE0');

   $('#MainContent_txtDescripcion').css('background', '#FFFFE0');

   $('#MainContent_txtDescripcionIngles').css('background', '#FFFFE0');

   $('#MainContent_txtMarca').css('background', '#FFFFE0');

   $('#MainContent_txtModelo').css('background', '#FFFFE0');

   $('#MainContent_txtMedida').css('background', '#FFFFE0');

   $('#MainContent_txtPosicion').css('background', '#FFFFE0');

   $('#MainContent_txtAño').css('background', '#FFFFE0');

   $('#MainContent_txtCostoConIgv').css('background', '#FFFFE0');

   $('#MainContent_txtCostoSolesIgv').css('background', '#FFFFE0');

   $('#MainContent_txtFactor').css('background', '#FFFFE0');

   $('#MainContent_txtPrecio1').css('background', '#FFFFE0');

   $('#MainContent_txtStockMinimo').css('background', '#FFFFE0');

   $('#MainContent_txtStockMaximo').css('background', '#FFFFE0');

   $('#MainContent_txtDescripcionConsulta').css('background', '#FFFFE0');

   $('#MainContent_txtCodigoProductoEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtTcEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtCodigo2Edicion').css('background', '#FFFFE0');

   $('#MainContent_txtPartidaArancelariaEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtDescripcionEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtDescripcionInglesEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtMarcaEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtModeloEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtMedidaEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtPosicionEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtAñoEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtCostoEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtCostoSolesEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtFactorEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtPrecioEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtStockMinimoEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtStockMaximoEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtMargen').css('background', '#FFFFE0');

   $('#MainContent_txtDescuento').css('background', '#FFFFE0');

   $('#MainContent_txtPrecio').css('background', '#FFFFE0');

   $('#MainContent_txtMargenEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtDescuentoEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtCodigoSuperior').css('background', '#FFFFE0');

   $('#MainContent_txtCodigoSuperiorEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtPeso').css('background', '#FFFFE0');

   $('#MainContent_txtPesoEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtUbicacion').css('background', '#FFFFE0');

   $('#MainContent_txtUbicacionEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtArticuloRelacionado').css('background', '#FFFFE0');

   $('#MainContent_txtArticuloPrincipal').css('background', '#FFFFE0');

   $('#MainContent_txtPesoArticuloRelacionadoEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtPesoArticuloRelacionado').css('background', '#FFFFE0');

   $('#MainContent_txtMargenMayorista').css('background', '#FFFFE0');
   
   $('#MainContent_txtPrecioMayorista').css('background', '#FFFFE0');

   $('#MainContent_txtMargenMayoristaEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtPrecioMayoristaEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtTCEdicion').css('background', '#FFFFE0');

   $('#MainContent_ddlStockconsulta').css('background', '#FFFFE0');

   $('#MainContent_ddlBloqueados').css('background', '#FFFFE0');

   $('#MainContent_txtMoleta').css('background', '#FFFFE0');

   $('#MainContent_txtMoletaEdicion').css('background', '#FFFFE0');

   $('#MainContent_txtFiltroMoleta').css('background', '#FFFFE0');
   
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

$(document).on("change", "select[id $= 'MainContent_ddlMoneda']",function () {
    if ($("#MainContent_ddlMonedaEdicion").val() == '2')
        $("#MainContent_txtCostoSolesIgv").val(parseFloat($("#MainContent_txtCostoConIgv").val() * $("#MainContent_txtTc").val()).toFixed(6));
    else
        $("#MainContent_txtCostoSolesIgv").val($("#MainContent_txtCostoConIgv").val());
    
    return false;
} );

$(document).on("change", "select[id $= 'MainContent_ddlMonedaEdicion']",function () {
    if ($("#MainContent_ddlMonedaEdicion").val() == '2')
        $("#MainContent_txtCostoSolesEdicion").val(parseFloat($("#MainContent_txtCostoEdicion").val() * $("#MainContent_txtTcEdicion").val()).toFixed(6));
    else
        $("#MainContent_txtCostoSolesEdicion").val($("#MainContent_txtCostoEdicion").val());
});

function F_Precio()
{
        if ($.trim($("#MainContent_txtCostoConIgv").val()) == '' ||  $.trim($("#MainContent_txtTC").val()) == '')
        {
                $("#MainContent_txtMargen").val('');
                $("#MainContent_txtMargenMayorista").val('');
                $("#MainContent_txtPrecioMayorista").val('');
                $("#MainContent_txtPrecio").val('');
                $("#MainContent_txtCostoSolesIgv").val('');
                return false;
        }             

        $("#MainContent_txtCostoSolesIgv").val(parseFloat(parseFloat($("#MainContent_txtCostoConIgv").val()) * parseFloat($("#MainContent_txtTC").val())).toFixed(2));
        
        if ($.trim($("#MainContent_txtPrecio").val()) == '' || ($.trim($("#MainContent_txtCostoSolesIgv").val()) == '' | parseFloat($("#MainContent_txtCostoSolesIgv").val()) ==0 ))
             return false;
        
        var PrecioMinorista = parseFloat($("#MainContent_txtPrecio").val());
        var Costo  = parseFloat($("#MainContent_txtCostoSolesIgv").val());

        $("#MainContent_txtMargen").val(parseFloat((PrecioMinorista-Costo)/Costo*100).toFixed(2));

        if ($.trim($("#MainContent_txtPrecioMayorista").val()) == '' ||  ($.trim($("#MainContent_txtCostoSolesIgv").val()) == '' | parseFloat($("#MainContent_txtCostoSolesIgv").val()) ==0 ))
             return false;
        
        var PrecioMayorista = parseFloat($("#MainContent_txtPrecioMayorista").val());

        $("#MainContent_txtMargenMayorista").val(parseFloat((PrecioMayorista-Costo)/Costo*100).toFixed(2));

        return false;
}

function F_PrecioEdicion()
{
        if ($.trim($("#MainContent_txtCostoEdicion").val()) == '' ||  $.trim($("#MainContent_txtTCEdicion").val()) == '')
        {
                $("#MainContent_txtMargenEdicion").val('');
                $("#MainContent_txtMargenMayoristaEdicion").val('');
                $("#MainContent_txtPrecioMayoristaEdicion").val('');
                $("#MainContent_txtPrecioEdicion").val('');
                $("#MainContent_txtCostoSolesEdicion").val('');
                return false;
        }             

        $("#MainContent_txtCostoSolesEdicion").val(parseFloat(parseFloat($("#MainContent_txtCostoEdicion").val()) * parseFloat($("#MainContent_txtTCEdicion").val())).toFixed(2));
        
        if ($.trim($("#MainContent_txtPrecioEdicion").val()) == '' || ($.trim($("#MainContent_txtCostoSolesEdicion").val()) == '' | parseFloat($("#MainContent_txtCostoSolesEdicion").val()) ==0 ))
             return false;
        
        var PrecioMinorista = parseFloat($("#MainContent_txtPrecioEdicion").val());
        var Costo  = parseFloat($("#MainContent_txtCostoSolesEdicion").val());

        $("#MainContent_txtMargenEdicion").val(parseFloat((PrecioMinorista-Costo)/Costo*100).toFixed(2));

        if ($.trim($("#MainContent_txtPrecioMayoristaEdicion").val()) == '' ||  ($.trim($("#MainContent_txtCostoSolesEdicion").val()) == '' | parseFloat($("#MainContent_txtCostoSolesEdicion").val()) ==0 ))
             return false;
        
        var PrecioMayorista = parseFloat($("#MainContent_txtPrecioMayoristaEdicion").val());

        $("#MainContent_txtMargenMayoristaEdicion").val(parseFloat((PrecioMayorista-Costo)/Costo*100).toFixed(2));

        return false;
}

function F_ElegirEmpresa(Fila) {
    MostrarEspera(true);
    var imgID = Fila.id;
    var ddlSede = '#' + imgID.replace('imgSelecEmpresa', 'ddlSede');
    $('#hfCodSede').val($(ddlSede).val());
    $('#divSeleccionarEmpresa').dialog('close');
    MostrarEspera(false);
}
  
function F_Controles_Inicializar() {
    var arg;
    try {
        var objParams ={};
           
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
                        F_Update_Division_HTML('div_umcompra', result.split('~')[4]);
                        F_Update_Division_HTML('div_umventa', result.split('~')[5]);
                        F_Update_Division_HTML('div_Familia', result.split('~')[6]);
                        F_Update_Division_HTML('div_familiaconsulta', result.split('~')[7]);
                        F_Update_Division_HTML('div_FamiliaEdicion', result.split('~')[8]);
                        F_Update_Division_HTML('div_MonedaEdicion', result.split('~')[9]);
                        F_Update_Division_HTML('div_CompraEdicion', result.split('~')[10]);
                        F_Update_Division_HTML('div_VentaEdicion', result.split('~')[11]);
                        F_Update_Division_HTML('div_Peso', result.split('~')[13]);
                        F_Update_Division_HTML('div_PesoEdicion', result.split('~')[14]);
                        $('#hfCodSede').val(result.split('~')[12]);
                        $('#MainContent_ddlMoneda').val('1');
                        $('#MainContent_ddlUMCompra').val('6');
                        $('#MainContent_ddlUMVenta').val('6');
                        $('#MainContent_ddlPeso').val('10');
                        $('#MainContent_txtFactor').val('1');
                        $('#MainContent_ddlFamiliaConsulta').val('0');
                        $('#MainContent_txtCostoSolesIgv').prop('disabled',true);
                        $('#MainContent_txtPrecio2').prop('disabled', true);
                        $('#MainContent_ddlFamilia').val('0001');
                        $('#MainContent_ddlFamilia').css('background', '#FFFFE0');
                        $('#MainContent_ddlUMCompra').css('background', '#FFFFE0');
                        $('#MainContent_ddlUMVenta').css('background', '#FFFFE0');
                        $('#MainContent_ddlMoneda').css('background', '#FFFFE0');
                        $('#MainContent_ddlFamiliaEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlCompraEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlVentaEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlMonedaEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlFamiliaConsulta').css('background', '#FFFFE0');
                        $('#MainContent_ddlPeso').css('background', '#FFFFE0');
                        $('#MainContent_ddlPesoEdicion').css('background', '#FFFFE0');
                        $('#MainContent_chkAplicaIgvMayorista').prop('checked', false);
                        $('#MainContent_txtCodigo').focus();
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

function F_ValidarGrabarDocumento(){
    try 
        {
                var Cuerpo='#MainContent_';
                var Cadena = 'Ingresar los sgtes. Datos:';

                if ($(Cuerpo + 'txtCodigo').val() == '')
                    Cadena = Cadena + '<p></p>' + 'Codigo';

                if ($(Cuerpo + 'txtCodigo').val().length != 13)
                    Cadena = Cadena + '<p></p>' + 'Codigo de 13 Caracteres';

                if ($(Cuerpo + 'txtDescripcion').val()=='')
                        Cadena=Cadena + '<p></p>' + 'Descripcion';
        
                if ($(Cuerpo + 'txtTC').val()=='0')
                        Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

                if ($(Cuerpo + 'txtFactor').val()=='')
                        Cadena=Cadena + '<p></p>' + 'Factor';
        
                if (($(Cuerpo + 'ddlUMCompra').val() != $(Cuerpo + 'ddlUMVenta').val()) && ($(Cuerpo + 'txtFactor').val()=='1' | $(Cuerpo + 'txtFactor').val()=='1.00'))
                        Cadena=Cadena + '<p></p>' + 'El Factor no puede ser 1.';
        
                if ($(Cuerpo + 'txtCostoConIgv').val()=='')
                    Cadena = Cadena + '<p></p>' + 'Costo';

                if ($(Cuerpo + 'txtMargen').val()=='')
                    Cadena = Cadena + '<p></p>' + 'Margen Minorista';

                if ($(Cuerpo + 'txtPrecio').val()=='')
                    Cadena = Cadena + '<p></p>' + 'Precio Minorista';

                if ($(Cuerpo + 'txtMargenMayorista').val()=='')
                    Cadena = Cadena + '<p></p>' + 'Margen Mayorista';

                if ($(Cuerpo + 'txtPrecioMayorista').val()=='')
                    Cadena = Cadena + '<p></p>' + 'Precio Mayorista';

                 if (!($(Cuerpo + 'chkSI').prop("checked") || $(Cuerpo + 'chkNO').prop("checked")))
                    Cadena = Cadena + '<p></p>' + 'SELECCIONE SI O NO';

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
            var FlagInluyeIgvMinorista = 1;
            var FlagInluyeIgvMayorista = 0; if ($('#MainContent_chkSI').is(':checked')) FlagInluyeIgvMayorista = 1;
            var FlagInventario = 0; if ($('#MainContent_chkFlagInventario').is(':checked')) FlagInventario = 1;
            var Peso = 0; if($.trim($("#MainContent_txtPeso").val()) != '') Peso = $("#MainContent_txtPeso").val();
            var FlagBloqueoMayorista = 0; if ($('#MainContent_chkBloqueoMayorista').is(':checked')) FlagBloqueoMayorista = 1;
            var objParams = {
                                        Filtro_CodFamilia: $(Contenedor + 'ddlFamilia').val(),
                                        Filtro_DscProducto: $(Contenedor + 'txtDescripcion').val(),
                                        Filtro_DscProductoIngles: $(Contenedor + 'txtDescripcionIngles').val(),                                                                                  
                                        Filtro_PartidaArancelaria: $(Contenedor + 'txtPartidaArancelaria').val(),
                                        Filtro_CodTipoProducto: '2',
                                        Filtro_CodUnidadCompra: $(Contenedor + 'ddlUMCompra').val(),
                                        Filtro_CodUnidadVenta: $(Contenedor + 'ddlUMCompra').val(),
                                        Filtro_Costo:$(Contenedor + 'txtCostoSolesIgv').val() ,
                                        Filtro_CostoOriginal: $(Contenedor + 'txtCostoConIgv').val(),
                                        Filtro_Factor: 1,
                                        Filtro_CodigoProducto: $(Contenedor + 'txtCodigo').val(),
                                        Filtro_Descuento: 0, //$(Contenedor + 'txtDescuento').val(),
                                        Filtro_Margen: $(Contenedor + 'txtMargen').val(),
                                        Filtro_CodigoAlternativo: $(Contenedor + 'txtCodigo2').val(),
                                        Filtro_Precio: $(Contenedor + 'txtPrecio').val(),
                                        Filtro_Margen: $(Contenedor + 'txtMargen').val(),
                                        Filtro_Descuento:$(Contenedor + 'txtDescuento').val(),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMoneda').val(),
                                        Filtro_Marca: $(Contenedor + 'txtMarca').val(),
                                        Filtro_Posicion: $(Contenedor + 'txtPosicion').val(),
                                        Filtro_Modelo:$(Contenedor + 'txtModelo').val(),
                                        Filtro_Medida: $(Contenedor + 'txtMedida').val(),
                                        Filtro_StockMinimo: $(Contenedor + 'txtStockMinimo').val(),
                                        Filtro_StockMaximo: $(Contenedor + 'txtStockMaximo').val(),
                                        Filtro_Anio: $(Contenedor + 'txtAño').val(),
                                        Filtro_CodigoSuperior: $('#hfCodigoSuperior').val(),
                                        Filtro_Peso:Peso,
                                        Filtro_CodPeso: $(Contenedor + 'ddlPeso').val(),
                                        Filtro_Ubicacion: $(Contenedor + 'txtUbicacion').val(),
                                        Filtro_MargenMayorista: $(Contenedor + 'txtMargenMayorista').val(),
                                        Filtro_PrecioMayorista: $(Contenedor + 'txtPrecioMayorista').val(),
                                        Filtro_CodEstado: 1,
                                        Filtro_FlagInventario: FlagInventario,
                                        Filtro_FlagInluyeIgvMinorista: FlagInluyeIgvMinorista,
                                        Filtro_FlagInluyeIgvMayorista: FlagInluyeIgvMayorista,
                                        Filtro_FlagBloqueoMayorista: FlagBloqueoMayorista,
                                        Filtro_Moleta: $(Contenedor + 'txtMoleta').val(),
                        };

                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                MostrarEspera(true);
                F_GrabarDocumento_NET(arg, function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                    MostrarEspera(false);
                    if (str_resultado_operacion == "1") {
                        if (str_mensaje_operacion == 'Se Grabo Correctamente.') {
                            alertify.log('Se Grabo Correctamente.');
                            F_Nuevo();
                        }
                        else
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

function F_Nuevo(){
                        var Contenedor = '#MainContent_';
                        $(Contenedor + 'txtUbicacion').val('')
                        $(Contenedor + 'txtCodigo').val('');
                        $(Contenedor + 'txtDescripcion').val('');
                        $(Contenedor + 'txtMarca').val('') ;
                        $(Contenedor + 'txtModelo').val('');
                        $(Contenedor + 'txtMedida').val(''),
                        $(Contenedor + 'txtFactor').val('1'),
                        $(Contenedor + 'txtCostoConIgv').val('');
                        $(Contenedor + 'txtCostoSolesIgv').val('');
                        $(Contenedor + 'ddlMoneda').val('1');
                        $(Contenedor + 'ddlUMCompra').val('6');
                        $(Contenedor + 'ddlUMVenta').val('6');
                        $(Contenedor + 'ddlFamilia').val('007');
                        $(Contenedor + 'ddlPeso').val('10');
                        $(Contenedor + 'txtPrecio1').val('0.00'),
                        $(Contenedor + 'txtPeso').val(''),
                        $(Contenedor + 'txtPrecio2').val('0.00');
                        $(Contenedor + 'txtPrecio').val('');
                        $(Contenedor + 'txtStockMinimo').val('0.00');
                        $(Contenedor + 'txtStockMaximo').val('0.00');
                        $(Contenedor + 'txtAño').val('');
                        $(Contenedor + 'txtMarca').prop('disabled',false) ;
                        $(Contenedor + 'txtModelo').prop('disabled',false);
                        $(Contenedor + 'txtMedida').prop('disabled', false),
                        $(Contenedor + 'txtCodigo2').val(''),
                        $(Contenedor + 'txtPartidaArancelaria').val('');
                        $(Contenedor + 'txtDescripcionIngles').val('');
                        $(Contenedor + 'txtAño').val(''),
                        $(Contenedor + 'txtMargen').val('');
                        $(Contenedor + 'txtDescuento').val('0.00');
                        $(Contenedor + 'txtPosicion').val('0.00');
                        $(Contenedor + 'txtCodigoSuperior').val('');
                        $(Contenedor + 'txtPrecioMayorista').val('');
                        $(Contenedor + 'txtMargenMayorista').val('');
                        $(Contenedor + 'txtTC').val('');
                        $('#hfCodigoSuperior').val(0);
                        $('#MainContent_ddlFamilia').val('0001');
                        $('#MainContent_chkAplicaIgvMayorista').prop('checked', false);
                        $('#MainContent_chkSI').prop('checked', false);
                        $('#MainContent_chkNO').prop('checked', false);
                        $(Contenedor + 'txtCodigo').focus();

                        return false;
}

function F_Buscar() {
    var FlagBloqueoMayorista = 0; if ($('#MainContent_chkBloqueoConsulta').is(':checked')) FlagBloqueoMayorista = 1;
       try 
        {
                var objParams = {
                                 Filtro_Descripcion : $("#MainContent_txtDescripcionConsulta").val(),
                                 Filtro_CodFamilia  : $('#MainContent_ddlFamiliaConsulta').val(),
                                 Filtro_CodAlmacen  : $('#hfCodSede').val(),
                                 Filtro_FlagStock   : $('#MainContent_ddlStockconsulta').val(),
                                 Filtro_FlagBloqueoMayorista: $('#MainContent_ddlBloqueados').val(),
                                 Filtro_Moleta      : Number(($('#MainContent_chkFiltroMoleta').is(':checked')) ? $('#MainContent_txtFiltroMoleta').val() : '0'),
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

function F_AnularRegistro(Fila) {
 try 
        {
    var imgID = Fila.id;
    
    var lblCodigo = '#' + imgID.replace('imgAnularDocumento', 'lblcodigo');
    var lblProducto_grilla = '#' + imgID.replace('imgAnularDocumento', 'lblProducto');


    if(!confirm("ESTA SEGURO DE ELIMINAR EL PRODUCTO " +  $(lblProducto_grilla).text()))
    return false;

            var objParams = {
                                      Filtro_CodProducto: $(lblCodigo).text(),
                                      Filtro_Descripcion: $('#MainContent_txtDescripcionConsulta').val(),
                                      Filtro_CodFamilia: $('#MainContent_ddlFamiliaConsulta').val()
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

function F_EditarRegistro(Fila) {
    var hfCodProducto = '#' + Fila.id.replace('imgEditarRegistro', 'hfCodProducto');
    var CodProducto = $(hfCodProducto).val();

    try {
        var objParams = {
            Filtro_CodProducto: CodProducto
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        //MostrarEspera(true);
        F_Listar_Editar_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            if (str_resultado_operacion == "1") {
                var Cuerpo = '#MainContent_';
                $('#hfCodProducto').val(CodProducto);
                $(Cuerpo + 'txtCodigoProductoEdicion').val(result.split('~')[3]);
                $(Cuerpo + 'ddlFamiliaEdicion').val(result.split('~')[5]);
                $(Cuerpo + 'txtDescripcionEdicion').val(result.split('~')[7]);
                $(Cuerpo + 'txtCostoEdicion').val(result.split('~')[21]);           
                $(Cuerpo + 'ddlMonedaEdicion').val(result.split('~')[17]);
                $(Cuerpo + 'txtPrecioEdicion').val(result.split('~')[26]);
                $(Cuerpo + 'ddlCompraEdicion').val(result.split('~')[15]);
                $(Cuerpo + 'txtCodigoSuperiorEdicion').val(result.split('~')[33]);
                $(Cuerpo + 'txtPesoEdicion').val(result.split('~')[30]);
                $(Cuerpo + 'ddlPesoEdicion').val(result.split('~')[28]);
                $('#hfCodigoSuperiorEdicion').val(result.split('~')[27]);
                $(Cuerpo + 'txtUbicacionEdicion').val(result.split('~')[34]);       
                $(Cuerpo + 'txtCostoSolesEdicion').val(result.split('~')[19]);
                $(Cuerpo + 'txtDescuentoEdicion').val(result.split('~')[25]);
                $(Cuerpo + 'ddlVentaEdicion').val(result.split('~')[16]);
                $(Cuerpo + 'txtMargenEdicion').val(result.split('~')[24]);
                $(Cuerpo + 'txtMargenMayoristaEdicion').val(result.split('~')[37]);
                $(Cuerpo + 'txtPrecioMayoristaEdicion').val(result.split('~')[36]);


                $(Cuerpo + 'chkAplicaIgvMayoristaEdicion').prop('checked', false);
                if (result.split('~')[39] == '1')
                    $(Cuerpo + 'chkAplicaIgvMayoristaEdicion').prop('checked', true);

                $(Cuerpo + 'txtCodigoProductoEdicion').prop('disabled', false);
                $(Cuerpo + 'txtPrecio2Edicion').prop('disabled', true);
        
                $('#MainContent_chkFlagInventarioEdicion').prop('checked', false);
                if (result.split('~')[39] == '1') 
                {
                $('#MainContent_chkSIEdicion').prop('checked', true);
                $('#MainContent_chkNOEdicion').prop('checked', false);
                }
                else
                {
                $('#MainContent_chkSIEdicion').prop('checked', false);
                $('#MainContent_chkNOEdicion').prop('checked', true);
                }
                $(Cuerpo + 'txtTCEdicion').val(parseFloat(parseFloat($(Cuerpo + 'txtCostoSolesEdicion').val())/parseFloat($(Cuerpo + 'txtCostoEdicion').val())).toFixed(3));   

                   if (result.split('~')[41] == '1')
                       $(Cuerpo + 'chkBloqueoMayoristaEdicion').prop('checked', true);
                       else
                           $(Cuerpo + 'chkBloqueoMayoristaEdicion').prop('checked', false);

                $(Cuerpo + 'txtMoletaEdicion').val(result.split('~')[42]);

                $("#divEdicionRegistro").dialog({
                resizable: false,
                modal: true,
                title: "Edicion de Productos",
                title_html: true,
                height: 230,
                width: 950,
                autoOpen: false
                });

                $('#divEdicionRegistro').dialog('open');
            }
            else {
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

function F_EdicionRegistro(){

  try 
        {
        var Contenedor = '#MainContent_';

        if ($.trim($(Contenedor + 'txtCodigoSuperiorEdicion').val()) == '')
            $('#hfCodigoSuperiorEdicion').val('0');
        var FlagInventario = 0; if ($('#MainContent_chkFlagInventarioEdicion').is(':checked')) FlagInventario = 1;
        var FlagInluyeIgvMinorista = 1;
        var FlagInluyeIgvMayorista = 0; if ($('#MainContent_chkSIEdicion').is(':checked')) FlagInluyeIgvMayorista = 1;
        var FlagBloqueoMayorista = 0; if ($('#MainContent_chkBloqueoMayoristaEdicion').is(':checked')) FlagBloqueoMayorista = 1;

        var objParams = {
                                        Filtro_CodProducto: $('#hfCodProducto').val(),
                                        Filtro_CodFamiliaEdicion: $(Contenedor + 'ddlFamiliaEdicion').val(),
                                        Filtro_DscProductoEdicion: $(Contenedor + 'txtDescripcionEdicion').val(),
                                        Filtro_DscProductoIngles: $(Contenedor + 'txtDescripcionInglesEdicion').val(),
                                        Filtro_CodTipoProducto: '2',
                                        Filtro_CodUnidadCompra: $(Contenedor + 'ddlCompraEdicion').val(),
                                        Filtro_CodUnidadVenta: $(Contenedor + 'ddlVentaEdicion').val(),
                                        Filtro_Costo: $(Contenedor + 'txtCostoSolesEdicion').val(),
                                        Filtro_CostoOriginal: $(Contenedor + 'txtCostoEdicion').val(),
                                        Filtro_Factor:1,
                                        Filtro_CodigoProducto: $(Contenedor + 'txtCodigoProductoEdicion').val(),
                                        Filtro_CodigoAlternativo: $(Contenedor + 'txtCodigo2Edicion').val(),
                                        Filtro_Precio: $(Contenedor + 'txtPrecioEdicion').val(),
                                        Filtro_Descuento: $(Contenedor + 'txtDescuentoEdicion').val(),
                                        Filtro_Margen:$(Contenedor + 'txtMargenEdicion').val(),
                                        Filtro_CodMoneda: $(Contenedor + 'ddlMonedaEdicion').val(),
                                        Filtro_Marca: $(Contenedor + 'txtMarcaEdicion').val(),
                                        Filtro_Modelo:$(Contenedor + 'txtModeloEdicion').val(),
                                        Filtro_Medida: $(Contenedor + 'txtMedidaEdicion').val(),
                                        Filtro_Posicion: $(Contenedor + 'txtPosicionEdicion').val(),
                                        Filtro_CostoMarginable: $(Contenedor + 'txtCostoMercadoEdicion').val(),
                                        Filtro_Flag:$('#hfCodigoTemporal').val(),
                                        Filtro_CodFamilia:'0',
                                        Filtro_Descripcion: $(Contenedor + 'txtDescripcionConsulta').val(),
                                        Filtro_Anio: $(Contenedor + 'txtAñoEdicion').val(),
                                        Filtro_PartidaArancelaria: $(Contenedor + 'txtPartidaArancelariaEdicion').val(),
                                        Filtro_StockMinimo: $(Contenedor + 'txtStockMinimoEdicion').val(),
                                        Filtro_StockMaximo: $(Contenedor + 'txtStockMaximoEdicion').val(),
                                        Filtro_CodigoSuperior: $('#hfCodigoSuperiorEdicion').val(),
                                        Filtro_Peso: $(Contenedor + 'txtPesoEdicion').val(),
                                        Filtro_CodPeso: $(Contenedor + 'ddlPesoEdicion').val(),
                                        Filtro_Ubicacion: $(Contenedor + 'txtUbicacionEdicion').val(),
                                        Filtro_FlagInventario: FlagInventario,
                                        Filtro_PrecioMayorista :  $(Contenedor + 'txtPrecioMayoristaEdicion').val(),
                                        Filtro_MargenMayorista: $(Contenedor + 'txtMargenMayoristaEdicion').val(),
                                        Filtro_FlagInluyeIgvMayorista : FlagInluyeIgvMayorista,
                                        Filtro_FlagInluyeIgvMinorista : FlagInluyeIgvMinorista,
                                        Filtro_FlagBloqueoMayorista: FlagBloqueoMayorista,
                                        Filtro_Moleta: $(Contenedor + 'txtMoletaEdicion').val(),
                        };


                var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
                MostrarEspera(true);
                F_EdicionRegistro_NET(arg, function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];
                MostrarEspera(false);
                if (str_resultado_operacion == "1") 
                {
                    if (str_mensaje_operacion=='Se Actualizo Correctamente.')
                    { 
                        F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                        $(Contenedor + 'txtCodigoProductoEdicion').val('');
                        $(Contenedor + 'txtDescripcionEdicion').val('');
                        $(Contenedor + 'txtMarcaEdicion').val('') ;
                        $(Contenedor + 'txtModeloEdicion').val('');
                        $(Contenedor + 'txtMedidaEdicion').val(''),
                        $(Contenedor + 'txtFactorEdicion').val('1'),
                        $(Contenedor + 'txtCostoConIgvEdicion').val('');
                        $(Contenedor + 'txtCostoSolesIgvEdicion').val('');
                        $(Contenedor + 'txtAñoEdicion').val('');
                        $(Contenedor + 'txtPrecio1').val(''),
                        $(Contenedor + 'txtPrecio2').val('');
                        $(Contenedor + 'txtPrecio').val('');
                  
                        $(Contenedor + 'ddlFamiliaConsulta').val('0'),
                        alertify.log('Se Actualizo Correctamente.');
                        $('#divEdicionRegistro').dialog('close');
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

function F_ValidarEdicionDocumento(){
    try 
        {
        var Cuerpo='#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:'; 

        if ($(Cuerpo + 'txtDescripcionEdicion').val()=='')
                Cadena=Cadena + '<p></p>' + 'Descripcion';
        
        if ($(Cuerpo + 'txtTcEdicion').val()=='0')
                Cadena=Cadena + '<p></p>' + 'Tipo de Cambio';

        if ($(Cuerpo + 'txtFactorEdicion').val()=='')
                Cadena=Cadena + '<p></p>' + 'Factor';
        
        if (($(Cuerpo + 'ddlCompraEdicion').val() != $(Cuerpo + 'ddlVentaEdicion').val()) && ($(Cuerpo + 'txtFactorEdicion').val()=='1' | $(Cuerpo + 'txtFactorEdicion').val()=='1.00'))
                Cadena=Cadena + '<p></p>' + 'La unidad de compra y venta son distintas,el Factor no puede ser 1.';
        
        if ($(Cuerpo + 'txtCostoConIgvEdicion').val()=='')
                Cadena=Cadena + '<p></p>' + 'Costo';

        if ($(Cuerpo + 'txtPrecio1Edicion').val()=='')
                Cadena=Cadena + '<p></p>' + 'Precio 1';

        if ($(Cuerpo + 'txtPrecio2Edicion').val()=='')
                Cadena=Cadena + '<p></p>' + 'Precio 2';

        if ($(Cuerpo + 'txtPrecioEdicion').val()=='')
                Cadena=Cadena + '<p></p>' + 'Precio 3';

        if ($(Cuerpo + 'txtPesoEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Peso';

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

function F_ArticulosRelacionados(Fila) {
    try {
        var imgID = Fila.id;
        var hfCodAlterno = '#' + imgID.replace('imgAgregarArticulosRelacionados', 'hfCodProducto');
        var hfDescripcionCorta = '#' + imgID.replace('imgAgregarArticulosRelacionados', 'hfDescripcion');
        var hfCodigo = '#' + imgID.replace('imgAgregarArticulosRelacionados', 'hfCodigo');
        var Cuerpo = '#MainContent_';

        $('#hfCodigoArticuloPrincipal').val($(hfCodAlterno).val());
        $(Cuerpo + 'txtArticuloPrincipal').val($(hfCodigo).val() + ' - ' + $(hfDescripcionCorta).val());

        F_ConsultarArticulosRelacionados($(hfCodAlterno).val());

        $("#divProductosRelacionados").dialog({
                    resizable: false,
                    modal: true,
                    title: "Articulos Relacionados",
                    title_html: true,
                    height: 500,
                    width: 900,
                    autoOpen: false
                });
        $('#divProductosRelacionados').dialog('open');
        $('#hfCodigoArticuloRelacionado').val('');
        $('#MainContent_txtArticuloRelacionado').val('');
        $('#MainContent_txtArticuloRelacionado').focus();
        $('#MainContent_txtPesoArticuloRelacionado').val(1);
      }
    catch (e) {
        MostrarEspera(false);
        alertify.log("Error Detectado: " + e);
        return false;
    }
}

function F_ConsultarArticulosRelacionados(CodAlterno) {

    var objParams = {
        CodProductoPrincipal: CodAlterno
    };

    var EstructuraTabla = '<table class="GridView">' +
                          '     <tr> ' +
                          '         <th width="5"></th> <th width="5"></th>  <th>ID</th> ' +
                          '         <th>Codigo</th> <th>Descripcion</th> <th>Peso</th> ' +  
                          '     </tr> ' +
                          '     @Cuerpo '  +
                          ' </table> ';
    var CuerpoTabla = '';
    var fmtoCuerpo = '';

    $.ajax({
        async: true,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'ProductosMilagros.aspx/F_LGProductosRelaciones_Listar_NET',
        dataType: "json",
        data: JSON.stringify({ 'CodProducto': objParams }),
        success: function (dbObject) {
            MostrarEspera(true);
            var data = dbObject.d;
            try {
                $.each(data.rows, function (index, item) {
                    fmtoCuerpo = '     <tr> ' +
                                 '         <td> <input type="image" ID="D:' + item.CodProducto + '"  src="../Asset/images/EliminarBtn.png" alt="Eliminar" width="10" height="10" onclick="F_EliminarArticuloRelacionado(this); return false;"> ' + 
                                 '              <input type="hidden" id="hfCodProducto" value="' + item.CodProducto +'"> ' +
                                 '              <input type="hidden" id="hfCodPeso_' + item.CodProducto + '" value="' + item.Peso.toFixed(0) + '"> </td> ' +
                                 '         <td> <input type="image" ID="E:' + item.CodProducto + '"  src="../Asset/images/btnEdit.gif" alt="Editar" width="10" height="10" onclick="F_EdicionArticuloRelacionado(this); return false;">  </td> ' + 
                                 '         <td>' + item.CodProducto + '</td> <td>' + item.CodigoProducto + '</td> <td>' + item.DscProducto + '</td> <td>' + item.Peso.toFixed(2) + '</td> ' +
                                 '     </tr> ';
                    /// <reference path="" />

                                                  // <button type="button" ID="' + item.CodAlterno + '" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" onclick="F_EliminarArticuloRelacionado(this); return false;">X</button>
                                 
                    CuerpoTabla = CuerpoTabla + fmtoCuerpo;
                });

                EstructuraTabla = EstructuraTabla.replace('@Cuerpo', CuerpoTabla);
                var lu = $('#divProductosRelacionadosListado'); lu.empty();
                lu.append(EstructuraTabla)

            }
            catch (x) { alertify.log('El Producto no tiene Imagenes'); }
            MostrarEspera(false);
        },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        async: true
    });

}

function F_AgregarArticulosRelacionados() {
    var CodProductoPrincipal = $('#hfCodigoArticuloPrincipal').val();
    var CodProductoRelacionado = $('#hfCodigoArticuloRelacionado').val();

    if (CodProductoPrincipal.trim() == '' || CodProductoRelacionado.trim() == '') {
        alertify.log('Debe de seleccionar tanto un artículo principal como el artículo relacionado');
        return;
    }

    if ($('#MainContent_txtPesoArticuloRelacionado').val() == '') {
        alertify.log('INGRESE UN PESO VALIDO');
        return;
    }

   if ($('#MainContent_txtPesoArticuloRelacionado').val() == 0) {
        alertify.log('INGRESE UN PESO VALIDO');
        return;
    }


        var objParams = {
            Filtro_CodProductoPrincipal: CodProductoPrincipal,
            Filtro_CodProductoRelacionado: CodProductoRelacionado,
            Filtro_Peso: $('#MainContent_txtPesoArticuloRelacionado').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_LGProductosRelaciones_Insert_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            F_ConsultarArticulosRelacionados(CodProductoPrincipal);

            alertify.log(str_mensaje_operacion);

            $('#hfCodigoArticuloRelacionado').val('');
            $('#MainContent_txtArticuloRelacionado').val('');
            $('#MainContent_txtArticuloRelacionado').focus();
            $('#MainContent_txtPesoArticuloRelacionado').focus(1);

            MostrarEspera(false);

            return false;

        });


}

function F_EdicionArticuloRelacionado(Fila) {
    var CodProductoPrincipal = $('#hfCodigoArticuloPrincipal').val();
    var CodProductoRelacionado = Fila.id.replace('E:', '');
    var Peso = $('#hfCodPeso_' + CodProductoRelacionado).val();

    $("#divProductosRelacionadosEditar").dialog({
        resizable: false,
        modal: true,
        title: "Edicion de Articulo Relacionado",
        title_html: true,
        height: 100,
        width: 100,
        autoOpen: false
    });

    $('#divProductosRelacionadosEditar').dialog('open');

    $('#MainContent_txtPesoArticuloRelacionadoEdicion').val(Peso);
    $('#hfCodArticuloRelacionadoEdicion').val(CodProductoRelacionado);
}

function F_EditarArticuloRelacionado() {
    if ($('#MainContent_txtPesoArticuloRelacionadoEdicion').val() == '') {
        alertify.log('INGRESE UN PESO VALIDO');
        return;
    }

   if ($('#MainContent_txtPesoArticuloRelacionadoEdicion').val() == 0) {
        alertify.log('INGRESE UN PESO VALIDO');
        return;
    }

        var objParams = {
            Filtro_CodProductoPrincipal: $('#hfCodigoArticuloPrincipal').val(),
            Filtro_CodProductoRelacionado: $('#hfCodArticuloRelacionadoEdicion').val(),
            Filtro_Peso: $('#MainContent_txtPesoArticuloRelacionadoEdicion').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_LGProductosRelaciones_Update_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            F_ConsultarArticulosRelacionados($('#hfCodigoArticuloPrincipal').val());

            alertify.log(str_mensaje_operacion);

            $('#hfCodigoArticuloRelacionado').val('');
            $('#MainContent_txtArticuloRelacionado').val('');
            $('#MainContent_txtArticuloRelacionado').focus();
            $('#divProductosRelacionadosEditar').dialog('close');
            MostrarEspera(false);

            return false;

        });


}

function F_EliminarArticuloRelacionado(Fila) {
    var CodProductoPrincipal = $('#hfCodigoArticuloPrincipal').val();
    var CodProductoRelacionado = Fila.id.replace('D:', '');

    if (confirm("ESTA SEGURO DE ELIMINAR LA RELACION DEL PRODUCTO")) {
        var objParams = {
            Filtro_CodProductoPrincipal: CodProductoPrincipal,
            Filtro_CodProductoRelacionado: CodProductoRelacionado
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_LGProductosRelaciones_Eliminar_NET(arg, function (result) {

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            F_ConsultarArticulosRelacionados(CodProductoPrincipal);

            alertify.log(str_mensaje_operacion);

            $('#hfCodigoArticuloRelacionado').val('');
            $('#MainContent_txtArticuloRelacionado').val('');
            $('#MainContent_txtArticuloRelacionado').focus();

            MostrarEspera(false);

            return false;

        });





    }

}

function F_ValidarCheckMayoristaSINO(ControlID) {

    if (ControlID == 'MainContent_chkSI') {
        if ($('#MainContent_chkSI').prop('checked') == true) {
            $('#MainContent_chkSI').prop('checked', true);
            $('#MainContent_chkNO').prop('checked', false);
        }
        else {
            $('#MainContent_chkSI').prop('checked', false);
            $('#MainContent_chkNO').prop('checked', true);  
        } }
    else {
        if ($('#MainContent_chkNO').prop('checked') == true) {
            $('#MainContent_chkNO').prop('checked', true);
            $('#MainContent_chkSI').prop('checked', false);     
        }
        else {
            $('#MainContent_chkNO').prop('checked', false);
            $('#MainContent_chkSI').prop('checked', true);     
        } }

return true;
}

function F_ValidarCheckMayoristaSINOEdicion(ControlID) {

    if (ControlID == 'MainContent_chkSIEdicion') {
        if ($('#MainContent_chkSIEdicion').prop('checked') == true) {
            $('#MainContent_chkSIEdicion').prop('checked', true);
            $('#MainContent_chkNOEdicion').prop('checked', false);
        }
        else {
            $('#MainContent_chkSIEdicion').prop('checked', false);
            $('#MainContent_chkNOEdicion').prop('checked', true);  
        } }
    else {
        if ($('#MainContent_chkNOEdicion').prop('checked') == true) {
            $('#MainContent_chkNOEdicion').prop('checked', true);
            $('#MainContent_chkSIEdicion').prop('checked', false);     
        }
        else {
            $('#MainContent_chkNOEdicion').prop('checked', false);
            $('#MainContent_chkSIEdicion').prop('checked', true);     
        } }

return true;
}