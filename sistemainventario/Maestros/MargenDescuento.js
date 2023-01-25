var AppSession = "../Maestros/Zona.aspx";
var ddlFamiliaBuscar;
var ddlMarca;
var ddlFamilia;
var ddlMarcaBuscar;
var ddlMarcaEdicion;
var CodigoMenu = 1000;
var CodigoInterno = 7;

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#divTabs').tabs();

    $('#MainContent_txtMarcaEdicion').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarMarca_AutoComplete',
                data: "{'DescripcionMarcaProducto':'" + request.term + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[2],
                            val: item.split(',')[0],
                            
                        }
                    }))
                },
                error: function (response) {
                    console.log(response.responseText);
                },
                failure: function (response) {
                    console.log(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfCodMarcaProductoEditar').val(i.item.val);
            $('#MainContent_txtMarcaEdicion').val(i.item.DescripcionMarcaProducto);
            
        },
        minLength: 2
    });


    $('#MainContent_txtFamiliaEdicion').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_ListarFamilias_AutoComplete',
                data: "{'DscFamilia':'" + request.term + "'}",
                dataType: "json",
                async: true,
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split(',')[2],
                            val: item.split(',')[0],
                            
                        }
                    }))
                },
                error: function (response) {
                    console.log(response.responseText);
                },
                failure: function (response) {
                    console.log(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfIDFamiliaEditar').val(i.item.val);
            $('#MainContent_txtFamiliaEdicion').val(i.item.DscFamilia);
            
        },
        minLength: 3
    });

    
  
    

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (F_ValidarGrabar() == false)
                return false;

            F_GrabarMargenDescuento();

            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);

        }
    });

    $('#MainContent_btnNuevo').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
           F_LimpiarCampos();

            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnBuscarConsulta').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
        
            F_Buscar();
            return false;
        }

        catch (e) {

            alertify.log("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnEdicion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            

            if (confirm("ESTA SEGURO DE ACTUALIZAR LOS DATOS DEL MARGEN DESCUENTO"))
                F_EditarMargenDescuento();
      
            return false;
        }
        catch (e) {
            alertify.log("Error Detectado: " + e);
        }
    });

    F_Controles_Inicializar();

    
    
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

function F_Controles_Inicializar() {
    var arg;
    try {
        var objParams = {
        
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
//                        F_Update_Division_HTML('div_Familia', result.split('~')[2]);
                        F_Update_Division_HTML('div_EstadoEdicion', result.split('~')[3]);
                        $('#MainContent_ddlFamilia').val(0);
                         
                         $('#MainContent_ddlMarca').val(0);
                         $('#MainContent_ddlFamiliaEdicion').val(0);
                         $('#MainContent_ddlMarcaEdicion').val(0);
                        
                        $('#MainContent_txtDescuento').val('');
                        $('#MainContent_ddlFamilia').css('background', '#FFFFE0');
                          $('#MainContent_ddlMarca').css('background', '#FFFFE0');
                          $('#MainContent_txtMarcaEdicion').css('background', '#FFFFE0');
                          $('#MainContent_txtFamiliaEdicion').css('background', '#FFFFE0');

                        $('#MainContent_txtDescuento').css('background', '#FFFFE0');
                        $('#MainContent_txtDescripcionConsulta').css('background', '#FFFFE0');
                        $('#MainContent_txtDescuentoEdicion').css('background', '#FFFFE0');
                        F_InicializarComboFamilia();
                        F_InicializarMarcaProducto();
                        F_InicializarMarcaProductoBuscar();
                        F_InicializarFamiliaBuscar();
                        F_InicializarFamiliaEditar();
                        F_InicializarMarcaProductoEditar();
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

function F_InicializarComboFamilia() {

   if (!F_SesionRedireccionar(AppSession)) return false;

                  $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: 'MargenDescuento.aspx/F_InicializarFamilimia_NET',
                        data: "{'CodEstado':'A'}",
                        dataType: "json",
                        async: false,
                        success: function (json) {

                                let data = [];
                                var d = json.d;
                                for (let i = 0; i < d.lFamilia.length; i++) {
                                data.push({
                                text: d["lFamilia"][i].DscFamilia,
                                value: d["lFamilia"][i].IDFamilia
                    
                            })
                        };

                       ddlFamilia = new SlimSelect({
                select: '#ddlFamilia',
                placeholder: 'TODOS LAS MARCAS POR DEFECTO',
                searchingText: 'Buscando...', // Optional - Will show during ajax request
                searchText: 'NO SE ENCONTRARON MARCA',
                searchPlaceholder: 'BUSQUEDA DE MARCA',
                searchFocus: true, // Whether or not to focus on the search input field
                closeOnSelect: false,
                 selectByGroup: true,
                data:data
                });
                                },
                                error: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                },
                                failure: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                }
                            });
    return true;
}

function F_InicializarComboFamilia2() {

                  if (!F_SesionRedireccionar(AppSession)) return false;

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'MargenDescuento.aspx/F_InicializarFamilimia_NET',
        data: "{'CodEstado':'A'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                $('#MainContent_ddlFamilia').empty();
                $.each(data.lFamilia, function (index, item) {
                    
                        $('#MainContent_ddlFamilia').append($("<option></option>").val(item.IDFamilia).html(item.DscFamilia ));
                });
            }
            catch (x) { alertify.log('ERROR AL CARGAR LAS FAMILIAS'); }

//            try {
//                $('#MainContent_ddlFamiliaEdicion').empty();
//                $.each(data.lFamiliaEditar, function (index, item) {
//                    
//                        $('#MainContent_ddlFamiliaEdicion').append($("<option></option>").val(item.IDFamilia).html(item.DscFamilia ));
//                });
//            }
//            catch (x) { alertify.log('ERROR AL CARGAR LAS FAMILIAS'); }

//            try {
//                $('#MainContent_ddlMarcaEdicion').empty();
//                $.each(data.lMarcaProductoEdicion, function (index, item) {
//                    
//                        $('#MainContent_ddlMarcaEdicion').append($("<option></option>").val(item.CodMarcaProducto).html(item.DescripcionMarcaProducto));
//                        
//                });
//            }
//            catch (x) { alertify.log('ERROR AL CARGAR LAS MARCAS'); }

            //F_AbrirDropzone_JS();

        },
        complete: function () {

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }
    });





//    F_Buscar();
    return true;
}

function F_InicializarMarcaProducto() {
    if (!F_SesionRedireccionar(AppSession)) return false;

                  $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: 'MargenDescuento.aspx/F_InicializarMarcaProducto_NET',
                        data: "{'CodEstado':'0'}",
                        dataType: "json",
                        async: false,
                        success: function (json) {

                                let data = [];
                                var d = json.d;
                                for (let i = 0; i < d.lMarcaProducto.length; i++) {
                                data.push({
                                text: d["lMarcaProducto"][i].DescripcionMarcaProducto,
                                value: d["lMarcaProducto"][i].CodMarcaProducto
                    
                            })
                        };

                       ddlMarca = new SlimSelect({
                select: '#ddlMarca',
                placeholder: 'TODOS LAS MARCAS POR DEFECTO',
                searchingText: 'Buscando...', // Optional - Will show during ajax request
                searchText: 'NO SE ENCONTRARON MARCA',
                searchPlaceholder: 'BUSQUEDA DE MARCA',
                searchFocus: true, // Whether or not to focus on the search input field
                closeOnSelect: false,
                 selectByGroup: true,
                data:data
                });
                                },
                                error: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                },
                                failure: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                }
                            });





   
    return true;
}

function F_InicializarMarcaProductoBuscar() {
    if (!F_SesionRedireccionar(AppSession)) return false;

                  $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: 'MargenDescuento.aspx/F_InicializarBuscar_NET',
                        data: "{'CodEstado':'0'}",
                        dataType: "json",
                        async: false,
                        success: function (json) {

                                let data = [];
                                var d = json.d;
                                for (let i = 0; i < d.lMarcaProductoBuscar.length; i++) {
                                data.push({
                                text: d["lMarcaProductoBuscar"][i].DescripcionMarcaProducto,
                                value: d["lMarcaProductoBuscar"][i].CodMarcaProducto
                    
                            })
                        };

                       ddlMarcaBuscar = new SlimSelect({
                select: '#ddlMarcaBuscar',
                placeholder: 'TODOS LAS MARCAS POR DEFECTO',
                searchingText: 'Buscando...', // Optional - Will show during ajax request
                searchText: 'NO SE ENCONTRARON MARCA',
                searchPlaceholder: 'BUSQUEDA DE MARCA',
                searchFocus: true, // Whether or not to focus on the search input field
                closeOnSelect: false,
                 selectByGroup: true,
                data:data
                });
                                },
                                error: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                },
                                failure: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                }
                            });





   
    return true;
}

function F_InicializarFamiliaBuscar() {
    if (!F_SesionRedireccionar(AppSession)) return false;

                  $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: 'MargenDescuento.aspx/F_InicializarBuscar_NET',
                        data: "{'CodEstado':'0'}",
                        dataType: "json",
                        async: false,
                        success: function (json) {

                                let data = [];
                                var d = json.d;
                                for (let i = 0; i < d.lFamiliaBuscar.length; i++) {
                                data.push({
                                text: d["lFamiliaBuscar"][i].DscFamilia,
                                value: d["lFamiliaBuscar"][i].IDFamilia
                    
                            })
                        };

                       ddlFamiliaBuscar = new SlimSelect({
                select: '#ddlFamiliaBuscar',
                placeholder: 'TODOS LAS FAMILIAS POR DEFECTO',
                searchingText: 'Buscando...', // Optional - Will show during ajax request
                searchText: 'NO SE ENCONTRARON FAMILIAS',
                searchPlaceholder: 'BUSQUEDA DE FAMILIA',
                searchFocus: true, // Whether or not to focus on the search input field
                closeOnSelect: false,
                 selectByGroup: true,
                data:data
                });
                                },
                                error: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                },
                                failure: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                }
                            });






    return true;
}

function F_InicializarMarcaProductoEditar() {

                  if (!F_SesionRedireccionar(AppSession)) return false;

                        $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: 'MargenDescuento.aspx/F_InicializarEditar_NET',
                        data: "{'CodEstado':'0'}",
                        dataType: "json",
                        async: false,
                        success: function (json) {

                                let data = [];
                                var d = json.d;
                                for (let i = 0; i < d.lMarcaProductoEdicion.length; i++) {
                                data.push({
                                text: d["lMarcaProductoEdicion"][i].DescripcionMarcaProducto,
                                value: d["lMarcaProductoEdicion"][i].CodMarcaProducto
                    
                            })
                        };

                       ddlMarcaEdicion = new SlimSelect({
                select: '#ddlMarcaEdicion',
                placeholder: 'TODOS LAS MARCAS POR DEFECTO',
                searchingText: 'Buscando...', // Optional - Will show during ajax request
                searchText: 'NO SE ENCONTRARON MARCAS',
                searchPlaceholder: 'BUSQUEDA DE MARCAS',
                searchFocus: false, // Whether or not to focus on the search input field
                closeOnSelect: true,
                 selectByGroup: true,
                data:data
                });
                                },
                                error: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                },
                                failure: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                }
                            });


    return true;
}

function F_InicializarFamiliaEditar() {
    if (!F_SesionRedireccionar(AppSession)) return false;

                  $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: 'MargenDescuento.aspx/F_InicializarFamilimia_NET',
                        data: "{'CodEstado':'A'}",
                        dataType: "json",
                        async: false,
                        success: function (json) {

                                let data = [];
                                var d = json.d;
                                for (let i = 0; i < d.lFamiliaEditar.length; i++) {
                                data.push({
                                text: d["lFamiliaEditar"][i].DscFamilia,
                                value: d["lFamiliaEditar"][i].IDFamilia
                    
                            })
                        };

                       ddlFamiliaEdicion = new SlimSelect({
                select: '#ddlFamiliaEdicion',
                placeholder: 'TODOS LAS FAMILIAS POR DEFECTO',
                searchingText: 'Buscando...', // Optional - Will show during ajax request
                searchText: 'NO SE ENCONTRARON FAMILIAS',
                searchPlaceholder: 'BUSQUEDA DE FAMILIA',
                searchFocus: true, // Whether or not to focus on the search input field
                closeOnSelect: true,
                data:data
                });
                                },
                                error: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                },
                                failure: function (response) {
                                    alertify.log(response.responseText);
                                    callback(false);
                                }
                            });





//    F_Buscar();
    return true;
}


function F_ValidarGrabar() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtDescuento').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descuento';

        

            

        if (Cadena != 'Ingresar los sgtes. Datos:') {
            alertify.log(Cadena);
            return false;
        }
        return true;
    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}

function F_ValidarGrabarEdicion() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtDescuentoEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Descuento';

             if ($(Cuerpo + 'txtMarcaEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Marca';

             if ($(Cuerpo + 'txtFamiliaEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Familia';

//        if ($(Cuerpo + 'ddlFamiliaEdicion').val() == 0 || $(Cuerpo + 'ddlFamiliaEdicion').val() == null)
//            Cadena = Cadena + '<p></p>' + 'Seleccione Familia';

//             if ($(Cuerpo + 'ddlMarcaEdicion').val() == 0 || $(Cuerpo + 'ddlMarcaEdicion').val() == null)
//            Cadena = Cadena + '<p></p>' + 'Seleccione Territorio';

        if (Cadena != 'Ingresar los sgtes. Datos:') {
            alertify.log(Cadena);
            return false;
        }
        return true;
    }

    catch (e) {

        alertify.log("Error Detectado: " + e);
    }
}

function F_GrabarMargenDescuento() {
    if (F_ValidarGrabar() == false)
        return false;

       var arrFamilia = new Array();
    $.each(ddlFamilia.selected(), function (index, item) {
        var objFamilia = {
        IDFamilia: item
        };
                    
        arrFamilia.push(objFamilia);
    });


     var arrMarca = new Array();
    $.each(ddlMarca.selected(), function (index, item) {
        var objMarca = {
        CodMarcaProducto: item
        };
                    
        arrMarca.push(objMarca);
    });

     

     if (arrMarca.length == 0) {
        alertify.log('DEBE SELECCIONAR UNO O VARIOS MARCAS');
        return true;
    }

    if (arrFamilia.length == 0) {
        alertify.log('DEBE SELECCIONAR UNO O VARIOS FAMILIAS');
        return true;
    }

        var MargenDescuentoCE = {};
        MargenDescuentoCE["DescripcionMargen"] = Number($('#MainContent_txtDescuento').val());
        MargenDescuentoCE["IDFamilia"]=   Sys.Serialization.JavaScriptSerializer.serialize(arrFamilia);
        MargenDescuentoCE["CodMarca"] =  Sys.Serialization.JavaScriptSerializer.serialize(arrMarca);

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'MargenDescuento.aspx/F_GrabarMargenDescuento',
        dataType: "json",
        data: JSON.stringify(MargenDescuentoCE),
        success: function (dataObject) {
            var data = dataObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('SE GRABO CORRECTAMENTE');
                    
                    
                   
                } else {
                    alertify.log(data.MsgError);
                    console.log(data.MsgError);
                }
            }
            catch (x) { alertify.log('ERROR AL grabar'); }
        },
        complete: function () {

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }  
    });
    F_LimpiarCampos();
}

function F_EditarMargenDescuento() {
    if (F_ValidarGrabarEdicion() == false)
        return false;
        
        

        var MargenDescuentoCE = {};
        MargenDescuentoCE["CodMarca"] = $('#hfCodMarcaProductoEditar').val();
        MargenDescuentoCE["IDFamilia"] = $('#hfIDFamiliaEditar').val();
         MargenDescuentoCE["CodMargenDescuento"] = $('#hfCodMargenDescuento').val();
        MargenDescuentoCE["Descuento"]= $('#MainContent_txtDescuentoEdicion').val();
//        MargenDescuentoCE["CodMarca"] = $('#MainContent_ddlEstadoEdicion').val();

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'MargenDescuento.aspx/F_EditarMargenDescuento',
        dataType: "json",
        data: JSON.stringify(MargenDescuentoCE),
        success: function (dataObject) {
            var data = dataObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('SE ACTUALIZO CORRECTAMENTE');
                    
                    
                   $('#divEdicionRegistro').dialog('close');
                   F_Buscar();
                } else {
                    alertify.log(data.MsgError);
                    console.log(data.MsgError);
                }
            }
            catch (x) { alertify.log('ERROR AL grabar'); }
        },
        complete: function () {

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }  
    });
    F_LimpiarCampos();
}

function F_Buscar() {
    try {
       var chkMarca = '0';
        var chkFamilia = '0';

      
var arrMarcaBuscar = new Array();
    $.each(ddlMarcaBuscar.selected(), function (index, item) {
        var objMarcaBuscar = {
        CodMarcaProducto: item
        };
                    
        arrMarcaBuscar.push(objMarcaBuscar);
    });

var arrFamiliaBuscar = new Array();
    $.each(ddlFamiliaBuscar.selected(), function (index, item) {
        var objFamiliaBuscar = {
        IDFamilia: item
        };
                    
        arrFamiliaBuscar.push(objFamiliaBuscar);
    });

    if (arrMarcaBuscar.length > 0) {
       chkMarca = '1';
    }
        
        if (arrFamiliaBuscar.length > 0) {
       chkFamilia = '1';
    }
        

        var objParams = {
//            Filtro_Descripcion: $("#MainContent_txtDescripcionConsulta").val(),
            Filtro_chkMarca:chkMarca,
            Filtro_chkFamilia:chkFamilia,
            Filtro_FamiliaBuscar:Sys.Serialization.JavaScriptSerializer.serialize(arrFamiliaBuscar),
            Filtro_MarcaBuscar:Sys.Serialization.JavaScriptSerializer.serialize(arrMarcaBuscar)  
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_Buscar_NET(arg, function (result) {
            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                if (str_mensaje_operacion != '')
                    alertify.log(str_mensaje_operacion);
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
var TipoOperacion = '';
var divEdicionRegistro_height = 200;
var divEdicionRegistro_width = 730
function F_Editar(Fila) {
     TipoOperacion = "Editar";

    var imgID = Fila.id;
        var CodMargenDescuento = '#' + imgID.replace('imgReemplazar', 'lblCodMargenDescuento');

    F_LimpiarCampos();

    $("#divEdicionRegistro").dialog({
        resizable: false,
        modal: true,
        title: "Edicion de Margen de Descuento",
        title_html: true,
        height: divEdicionRegistro_height,
        width: divEdicionRegistro_width,
        autoOpen: false
    });
    
    codigo = $(CodMargenDescuento).val()
     if(codigo =="")
     codigo = 0


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'MargenDescuento.aspx/F_ObtenerMargenDescuento',
        data: "{'CodMargenDescuento':'" + codigo + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    $('#MainContent_txtDescuentoEdicion').val(data.DescripcionMargen);
                    codigoFamilia= data.IDFamilia
                    $('#MainContent_txtFamiliaEdicion').val(data.DscFamilia);
                    $('#hfIDFamiliaEditar').val(data.IDFamilia);
                    $('#hfCodMarcaProductoEditar').val(data.CodMarca);
                    //$('#MainContent_txtClaveOperacionesEspeciales').val(data.ClaveOperacionesEspeciales.trim());
                    codigoMarca= data.CodMarca
                    $('#MainContent_txtMarcaEdicion').val(data.Descripcion);
                    $('#hfCodMargenDescuento').val(data.CodMargenDescuento);
                    $('#divEdicionRegistro').dialog('open');


                }
            }
            catch (x) { alertify.log('ERROR AL CARGAR LOS MENUES'); }
        },
        complete: function () {

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }
    });





}

function F_EliminarRegistro(Fila) {
     TipoOperacion = "Editar";

    var imgID = Fila.id;
        var CodMargenDescuento = '#' + imgID.replace('imgAnularDocumento', 'lblCodMargenDescuento');
        var MargenDescuento = '#' + imgID.replace('imgAnularDocumento', 'lblDescuento');

        var MargenDescuentoCE = {};
        
        MargenDescuentoCE["CodMargenDescuento"] = $(CodMargenDescuento).val()

    F_LimpiarCampos();

   if (!confirm("ESTA SEGURO DE ELIMINAR EL DESCUENTO " ))
            return false;
    
    


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'MargenDescuento.aspx/F_EliminaMargenDescuento',
        data: JSON.stringify(MargenDescuentoCE),
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "El descuento se elimino correctamente.") {
                    
                    //$('#MainContent_txtClaveOperacionesEspeciales').val(data.ClaveOperacionesEspeciales.trim());
                    
                    F_Buscar();
                    alertify.log(data.MsgError);

                }
            }
            catch (x) { alertify.log('ERROR AL CARGAR LAS ZONAS'); }
        },
        complete: function () {

        },
        error: function (response) {
            alertify.log(response.responseText);
        },
        failure: function (response) {
            alertify.log(response.responseText);
        }
    });





}

function F_LimpiarCampos() {
    $('#MainContent_txtDescuento').val("");
    
    $('#MainContent_ddlFamilia').val("0");
    $('#MainContent_ddlMarca').val("0");
    return true;
}

function esnumero(campo) { return (!(isNaN(campo))); }

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

function numerar() {
    var c = 0;
    $('.detallesart2').each(function () {
        c++;
        $(this).text(c.toString());
    });
    $("#MainContent_lblNumRegistros").text(c);
}

function getContentTab() {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
//   $('#MainContent_txtDescripcionConsulta').val("");
    
    F_Buscar();
    return false;
}