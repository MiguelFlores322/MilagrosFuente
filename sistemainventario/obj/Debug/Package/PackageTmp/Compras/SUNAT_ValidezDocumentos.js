var AppSession = "../Reportes/Ventas_VentasNetas.aspx";
var CodigoMenu = 3000;
var CodigoInterno = 8;

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;



    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('.Jq-ui-dtp').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $('.Jq-ui-dtp').datepicker($.datepicker.regional['es']);
    $('.Jq-ui-dtp').datepicker('setDate', new Date());

    $('#MainContent_btnReporte').click(function () {
   // if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
        try {
            F_Buscar();
            $('#MainContent_ddlEstadoSunat').prop("disabled", true); //desabilitar.
            //F_Reporte();
            return false;
        }
        catch (e) {
            toastr.warning("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnExcel').click(function () {
        try {
            F_Excel();
            return false;
        }
        catch (e) {
            toastr.warning("Error Detectado: " + e);
        }
    });

    
    $('#MainContent_btnValidar').click(function () {

        try {
            F_ValidarSunat();
//            $('#MainContent_ddlEstadoSunat').val('-1');
            $('#MainContent_ddlEstadoSunat').prop("disabled", false); //desabilitar.
            return false;
        }
        catch (e) {
            toastr.warning("Error Detectado: " + e);
        }
    });

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

    F_Controles_Inicializar();

    $('#MainContent_ddlSucursal').css('background', '#FFFFE0');
    $('#MainContent_txtDesde').css('background', '#FFFFE0');
    $('#MainContent_txtHasta').css('background', '#FFFFE0');
    $('#MainContent_ddlEstadoSunat').css('background', '#FFFFE0');
    $('#MainContent_ddlEstadoSunat').prop("disabled", true); //desabilitar.
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
                        F_Update_Division_HTML('div_Sucursal', result.split('~')[2]);
                        $('#MainContent_ddlSucursal').css('background', '#FFFFE0');
                        $('#MainContent_ddlSucursal').val('0');
                        $('#MainContent_ddlEstadoSunat').val('-1');
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

$(document).on("change", "select[id $= 'MainContent_ddlEstadoSunat']", function () {    
        F_Buscar();
});


function F_Buscar() {
    /*if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion*/
    try {
        var chkNumero = '0';
        var chkFecha = '0';
        var chkCliente = '0';

        

        var objParams = {
            //Filtro_Numero: $('#MainContent_txtNumeroConsulta').val(),
            Filtro_Desde: $('#MainContent_txtDesde').val(),
            Filtro_Hasta: $('#MainContent_txtHasta').val(),
            //Filtro_CodCtaCte: $('#hfCodCtaCteConsulta').val(),
            //Filtro_ChkNumero: chkNumero,
            //Filtro_ChkFecha: chkFecha,
            //Filtro_ChkCliente: chkCliente,
            Filtro_EstadoSunat: $('#MainContent_ddlEstadoSunat').val(),
            //Filtro_CodClasificacion: 2,
            //Filtro_CodEstado: $('#MainContent_ddlEstado').val()
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

                $('#lblCantidadRegistros').text('Cantidad de Registros: ' + result.split('~')[3]);
                $('#hfCantidadRegistros').val(result.split('~')[3]);
                $('#MainContent_ddlEstadoSunat').val('-1');

                if (str_mensaje_operacion != '')
                    toastr.warning(str_mensaje_operacion);    
                $('.validacion').each(function() {
                  if($(this).text() =='NO APLICA VALIDACION'){
                       $(this).css('color', 'red');
                  }else{
                       $(this).css('color', 'green');
                  }
                });            
            }
            else {
                toastr.warning(result.split('~')[1]);
            }

            return false;

        });

    }

    catch (e) {
        MostrarEspera(false);
        toastr.warning("ERROR DETECTADO: " + e);
        return false;
    }

}



function F_Reporte() {
    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodTipoArchivo = 5;
    var CodMenu = 202;
    var Titulo = "REPORTE VENTAS NETAS";
    var SubTitulo = "DESDE " + $("#MainContent_txtDesde").val() + " HASTA " + $('#MainContent_txtHasta').val();
    var NombreTabla = "VentasNetas";
    var NombreArchivo = "Web_Reporte_Ventas_rptVentasNetas.rpt";
   
    rptURL = '../Reportes/Web_Pagina_Crystal_Nuevo.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'TipoArchivo=' + TipoArchivo + '&';
    rptURL = rptURL + 'Titulo=' + Titulo + '&';
    rptURL = rptURL + 'SubTitulo=' + SubTitulo + '&';
    rptURL = rptURL + 'CodAlmacen=' + $('#MainContent_ddlSucursal').val() + '&';
    rptURL = rptURL + 'Desde=' + $("#MainContent_txtDesde").val() + '&';
    rptURL = rptURL + 'Hasta=' + $('#MainContent_txtHasta').val() + '&';
    rptURL = rptURL + 'NombreTabla=' + NombreTabla + '&';
    rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';

    window.open(rptURL, "PopUpRpt", Params);

    return false;
}

function F_Excel() {
    var Cuerpo = '#MainContent_';
    var rptURL = '';
    var Params = 'width=' + (screen.width * 0.48) + ', height=' + (screen.height * 0.40) + ', top=0, left=0, directories=no, menubar=no, toolbar=no, location=no, resizable=yes, scrollbars=yes, titlebar=yes';
    var TipoArchivo = 'application/pdf';
    var CodMenu = 202;
    var NombreArchivo = 'Xls_VentasNetas.xlsx';
    var NombreHoja = 'VENTAS';

    rptURL = '../Reportes/Web_Pagina_ConstruirExcel.aspx';
    rptURL = rptURL + '?';
    rptURL = rptURL + 'CodMenu=' + CodMenu + '&';
    rptURL = rptURL + 'Desde=' + $('#MainContent_txtDesde').val() + '&';
    rptURL = rptURL + 'Hasta=' + $('#MainContent_txtHasta').val() + '&';
    rptURL = rptURL + 'CodAlmacen=' + $('#MainContent_ddlSucursal').val() + '&';
    rptURL = rptURL + 'NombreArchivo=' + NombreArchivo + '&';
    rptURL = rptURL + 'NombreHoja=' + NombreHoja + '&';

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
        $('#dlgWait').dialog('open');
    }
    else {
        $('#dlgWait').dialog('close');
    }
}



//PROCESO DE VALIDACION DE LOS DOCUMENTOS//

var arrDetalle = new Array(); //Se crea un arreglo en el cual se almacenaran los datos
function F_ValidarSunat() {


    MostrarEspera(true);
    if (!confirm("¿SEGURO REALIZAR VALIDACION DE TODOS LOS DOCUMENTOS ENCONTRADOS?")) {
        MostrarEspera(false);
        return false;
    }

    arrDetalle = new Array();
    Cont = 0; //Se establece un contador para la longitud del arreglo 'arrDetalle'

    var token = F_ObtenerToken(); //Se obtiene un token para poder llevar a cabo la peticion, ver 'F_ObtenerToken()'

    //var Token_Empresa = token.Token_Empresa;
    //var RucEmpresa = token.RucEmpresa;
    //var UrlServerPeticionLocal = token.UrlServerPeticionLocal;
    //var link = token.link;
    //var token = token.token;

    //Se settean los datos del token en variables para llevar a cabo la peticion
    var hfRE = token.RucEmpresa;
    var hfTE = token.Token_Empresa;
    var hfLSL = token.UrlServerPeticionLocal;
    var hfLi = token.link;
    var hfTo = token.access_token;

    
    $('#MainContent_grvConsulta .detallesart').each(function () { //Se itera la tabla para obtener los datos necesarios para la validacion
        var lblNumero = '#' + this.id;
        var hfID = lblNumero.replace("lblNumero", "hfID");
        var hfRucEmpresa = lblNumero.replace("lblNumero", "hfRucEmpresa");
        var hfCodTipoComprobante = lblNumero.replace("lblNumero", "hfCodTipoComprobante");
        var hfSerie = lblNumero.replace("lblNumero", "hfSerie");
        var hfNumero = lblNumero.replace("lblNumero", "hfNumero");
        var hfFechaEmision = lblNumero.replace("lblNumero", "hfFechaEmision");
        var hfTotal = lblNumero.replace("lblNumero", "hfTotal");
        var hfNroDocumento = lblNumero.replace("lblNumero", "hfNroDocumento");
        var imgLoading = lblNumero.replace("lblNumero", "imgLoading");
        var lblEstadoSunat = lblNumero.replace("lblNumero", "lblEstadoSunat");
        var hfFechaUltimaValidacionSunat = lblNumero.replace("lblNumero", "hfFechaUltimaValidacionSunat");
        var hfCerradoConsultaSunat = lblNumero.replace("lblNumero", "hfCerradoConsultaSunat");
        var lblValidacion = lblNumero.replace("lblNumero","lblValidacion");
                
        if($(lblValidacion).text()=='APLICA VALIDACION'){ //Se coloca una condicional para saber si ese registro aplica o no la validacion, si aplica se añade al arreglo 'arrDetalle'
         var Cerrado = $(hfCerradoConsultaSunat).val();
            if ($(hfNroDocumento).val().length === 8 ) //Si el numero de documento tiene 8 digitos (DNI) no aplica la validacion
                Cerrado = 9999;
            //Se crea una variable donde se almacenaran los datos de las variables a las cuales se le settearon los datos del token, ademas se utilizaran las variables creadas dentro del foreach, ya que son necesarias para la peticion.
            //Deben ser estrictamente iguales los textos de los strings a los cuales se les esta concatenando las variables antes mencionadas, cualquier alteracion de estos podria generar un error en la peticion
            var request = "{'Token_Empresa':'" + hfTE + "','RucEmpresa':'" + hfRE + "','UrlServerPeticionLocal':'" + hfLSL + "','link':'" + hfLi + "','token':'" + hfTo + "','numRuc' : '" + $(hfNroDocumento).val() + "','codComp' : '" + $(hfCodTipoComprobante).val() + "','numeroSerie' : '" + $(hfSerie).val().toUpperCase() + "','numero' : '" + $(hfNumero).val() + "','fechaEmision' : '" + $(hfFechaEmision).val() + "','monto' : " + $(hfTotal).val() + " }";
            
            //Se crea un objeto, añadiendole las variables para la peticion
            var objDetalle = {
                Codigo: $(hfID).val(),
                Cerrado: Cerrado,
                Script: request,
                imgLoading: imgLoading,
                lblEstadoSunat: lblEstadoSunat
            };
            arrDetalle.push(objDetalle); //Se añade el objeto al arreglo 'arrDetalle'
            Cont = Cont + 1; //Se incrementa el contador en uno por cada objeto agregado
        }           
    });

    if (arrDetalle.length === 1 && Number(arrDetalle[0].Codigo) === 0) { //Condicional que verifica si se quiere validar antes de filtrar los datos
        toastr.warning("PRIMERO FILTRE LOS DATOS QUE DESEA VALIDAR");
        MostrarEspera(false);
        return false;
    }

    ContTOTAL = Cont -1; //Resta en uno al Contador y lo almacena en una variable para tener un contador real del arreglo
    Cont = 0; //Coloca la variable en 0 para su proxima utilizacion
    F_EjecutarConsulta(); //ver F_EjecutarConsulta()
    
    //$('#MainContent_btnReporte').click();
return false
}

var ContTOTAL = 0;
var Cont = 0;
var arrActual; //Objeto que se utilizara para realizar la peticion una cantidad de veces
function F_EjecutarConsulta() {

        arrActual = arrDetalle[Cont]; //Se iguala el objeto 'arrActual' al arreglo anterior en la primera posicion porque la variable 'Cont' es 0

        if (Number(arrActual.Cerrado) === 0) { //Condicional que evalua si es DNI o no, ver F_ValidarSunat()
        
                //coloco la imagen para que sea fichado como si esta trabajando
                $(arrActual.imgLoading).attr("src","../Asset/images/progress.gif");

                    //var request2 = "{'Token_Empresa':'" + hfTE + "','RucEmpresa':'" + hfRE + "','UrlServerPeticionLocal':'" + hfLSL + "','link':'" + hfLi + "','token':'" + hfTo + "','numRuc' : '" + $(hfNroDocumento).val() + "','codComp' : '" + $(hfCodTipoComprobante).val() + "','numeroSerie' : '" + $(hfSerie).val().toUpperCase() + "','numero' : '" + $(hfNumero).val() + "','fechaEmision' : '" + $(hfFechaEmision).val() + "','monto' : " + $(hfTotal).val() + " }";

            var request2 = arrActual.Script; //Se obtiene el atributo Script del objeto para hacer la peticion


            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "../Servicios/SUNAT_Servicio.asmx/F_Consulta_Sunat_EstadoDocumento",
                data: request2,
                dataType: "json",
                async: true,
                success: function (data) {

                var respuesta = data.d;
                //Segun la respuesta, se obtiene un texto por el numero
                            var texto = "";
                            if (respuesta.Data.EstadoCp === 0) {
                                texto = "NO EXISTE"
                            }
                            if (respuesta.Data.EstadoCp === 1) {
                                texto = "ACEPTADO"
                            }
                            if (respuesta.Data.EstadoCp === 2) {
                                texto = "ANULADO"
                            }
                            if (respuesta.Data.EstadoCp === 3) {
                                texto = "AUTORIZADO"
                            }
                            if (respuesta.Data.EstadoCp === 4) {
                                texto = "NO AUTORIZADO"
                            }

                            $(arrActual.lblEstadoSunat).text(texto);

                        //Se marca la factura con el estado que le corresponde
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: '../Servicios/Servicios.asmx/F_SUNAT_MarcaDocumento',
                            data: "{'CodMovimiento':'" + arrActual.Codigo + "','CodRespuesta':'" + respuesta.Data.EstadoCp + "'}",
                            dataType: "json",
                            async: true,
                            success: function (data) {

                                $(arrActual.imgLoading).attr("src","../Asset/images/ok.gif");
                                if (Cont === ContTOTAL) { //Si son diferentes estos contadores, se vuelve a realizar la consulta pero con el contador incrementado en uno, es decir, el siguiente objeto.
                                    MostrarEspera(false); //Si son iguales, se detiene la repeticion
                                    return false;
                                    }
                                Cont = Cont + 1; //Aqui se incrementa en uno para obtener el siguiente objeto

                                F_EjecutarConsulta(); //Se ejecuta nuevamente el metodo
                            },
                            error: function (response) {
                                toastr.warning(response.statusText);
                                $(arrActual.imgLoading).attr("src","../Asset/images/cancelarx16.png");
                            },
                            failure: function (response) {
                                toastr.warning(response.statusText);
                                $(arrActual.imgLoading).attr("src","../Asset/images/cancelarx16.png");
                            }
                        });
                },
                error: function (response) {
                    toastr.warning(response.statusText);
                    $(arrActual.imgLoading).attr("src","../Asset/images/cancelarx16.png");

                },
                failure: function (response) {
                    toastr.warning(response.statusText);
                    $(arrActual.imgLoading).attr("src","../Asset/images/cancelarx16.png");
                }
            });         

        } else if (Number(arrActual.Cerrado) === 9999) { //Si es nro Documento es DNI
        
            //marco la factura con el estado que le corresponde
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/F_SUNAT_MarcaDocumento',
                data: "{'CodMovimiento':'" + arrActual.Codigo + "','CodRespuesta':'9999'}",
                dataType: "json",
                async: true,
                success: function (data) {

                    $(arrActual.lblEstadoSunat).text("NO APLICA PORQUE ES DNI"); 

                    $(arrActual.imgLoading).attr("src","../Asset/images/ok.gif");
                    if (Cont === ContTOTAL) { //Si son diferentes estos contadores, se vuelve a realizar la consulta pero con el contador incrementado en uno, es decir, el siguiente objeto.
                        MostrarEspera(false); //Si son iguales, se detiene la repeticion
                        return false;
                        }
                    Cont = Cont + 1; //Aqui se incrementa en uno para obtener el siguiente objeto

                    F_EjecutarConsulta(); //Se ejecuta nuevamente el metodo
                },
                error: function (response) {
                    toastr.warning(response.statusText);
                    $(arrActual.imgLoading).attr("src","../Asset/images/cancelarx16.png");
                },
                failure: function (response) {
                    toastr.warning(response.statusText);
                    $(arrActual.imgLoading).attr("src","../Asset/images/cancelarx16.png");
                }
            });
                  
        } else { //Si no es DNI ni RUC, no se toma en cuenta para marcar el documento
            $(arrActual.imgLoading).attr("src","../Asset/images/ok.gif");
            if (Cont === ContTOTAL){ //Si son diferentes estos contadores, se vuelve a realizar la consulta pero con el contador incrementado en uno, es decir, el siguiente objeto.
                MostrarEspera(false); //Si son iguales, se detiene la repeticion
                return false;
                }
                Cont = Cont + 1; //Aqui se incrementa en uno para obtener el siguiente objeto
                F_EjecutarConsulta(); //Se ejecuta nuevamente el metodo
            return false;
        }        
        return false;
}


function F_ObtenerToken() {
    var Token; //Se crea una variable para poder recibir los atributos del token        
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/SUNAT_Servicio.asmx/generacionNuevoToken',
        //data: "{'CodMovimiento':'" + $(hfID).val() + "','CodRespuesta':'" + respuesta.Data.EstadoCp + "'}",
        dataType: "json",
        async: false,
        success: function (data) {
            Token = data.d; //Se reciben los valores obtenidos de la peticion, ver '../Servicios/SUNAT_Servicio.asmx/generacionNuevoToken'            
        },
        error: function (response) {
            toastr.warning(response.statusText);
        },
        failure: function (response) {
            toastr.warning(response.statusText);
        }
    });
        
    return Token; //Retorno del token con los nuevos valores
}