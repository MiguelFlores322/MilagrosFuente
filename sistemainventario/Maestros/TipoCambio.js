var AppSession = "../Maestros/TipoCambio.aspx";
var CodigoMenu = 1000; /// EXCLUSIVIDAD DE LA PAGINA
var CodigoInterno = 5; /// EXCLUSIVIDAD DE LA PAGINA


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

    $('#MainContent_txtFecha').datepicker({ onSelect: function () {
        var date = $(this).datepicker('getDate');
        if (date) {
            date.setDate(1);
            $(this).datepicker('setDate', date);
        }
    }
    });

    $('#MainContent_txtFecha').datepicker({ beforeShowDay: function (date) {
        return [date.getDate() == 1, ''];
    }
    });

    $('#MainContent_btnBuscar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
        try {
            F_Buscar();
            
            return false;
        }
        catch (e) {
            toastr.warning("Error Detectado: " + e);
        }
    });

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Insertar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
        try {
            if (!F_ValidarGrabarDocumento())
                return false;

            if (confirm("ESTA SEGURO DE GRABAR EL TIPO DE CAMBIO"))
                F_GrabarDocumento();

            return false;
        }
        catch (e) {
            toastr.warning("Error Detectado: " + e);
       }
    });

    $('#MainContent_btnEdicion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (F_ValidarEdicionDocumento() == false)
                return false;

            if (confirm("Esta Seguro de Actualizar los datos del Cliente."))
                F_EdicionRegistro();
            //                F_Nuevo();
            //            }
            return false;
        }

        catch (e) {

            toastr.warning("Error Detectado: " + e);
        }

    });
    
    $("#MainContent_txtParalelo").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $("#MainContent_txtCompraSunat").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $("#MainContent_txtVentaSunat").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
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

    F_Derecha();

    $('#MainContent_txtFecha').css('background', '#FFFFE0');

    $('#MainContent_txtCompraSunat').css('background', '#FFFFE0');

    $('#MainContent_txtVentaSunat').css('background', '#FFFFE0');

    $('#MainContent_txtParalelo').css('background', '#FFFFE0');

    $('#MainContent_txtPeriodo').css('background', '#FFFFE0');

    $('#MainContent_txtFechaEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtCompraSunatEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtVentaSunatEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtParaleloEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtPeriodoEdicion').css('background', '#FFFFE0');
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
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
    var arg;

    try {
        var objParams =
            {
                Filtro_Periodo: $('#MainContent_txtPeriodo').val()

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
                        F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);
                        $('#lblNumeroConsulta').text(F_Numerar_Grilla("grvConsultaArticulo", 'lblCodTipoCambio')); 
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

function F_Buscar() {

    var arg;

    try {
        var objParams =
            {
                Filtro_Periodo: $('#MainContent_txtPeriodo').val()

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
                        F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);
                        $('#lblNumeroConsulta').text(F_Numerar_Grilla("grvConsultaArticulo", 'lblCodTipoCambio')); 
                    }
                    else {

                        toastr.warning(str_mensaje_operacion);

                    }


                }
            );

    } catch (mierror) {

        toastr.warning("Error detectado: " + mierror);

    }

}

function F_ValidarGrabarDocumento() {
    try {

        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtFecha').val() == '')
            Cadena = Cadena + '<p></p>' + 'Fecha';

        if ($(Cuerpo + 'txtCompraSunat').val() == '')
            Cadena = Cadena + '<p></p>' + 'Compra';

        if ($(Cuerpo + 'txtVentaSunat').val() == '')
            Cadena = Cadena + '<p></p>' + 'Venta';

        if ($(Cuerpo + 'txtParalelo').val() == '')
            Cadena = Cadena + '<p></p>' + 'Paralelo';

        if (($(Cuerpo + 'txtCompraSunat').val() != '' & $(Cuerpo + 'txtVentaSunat').val() != '') && ($(Cuerpo + 'txtCompraSunat').val() > $(Cuerpo + 'txtVentaSunat').val()))
            Cadena = Cadena + '<p></p>' + 'La Compra no puede ser mayor que la venta';

        if (Cadena != 'Ingresar los sgtes. Datos:') {
            toastr.warning(Cadena);
            return false;
        }
        return true;
    }

    catch (e) {

        toastr.warning("Error Detectado: " + e);
    }
}

function F_ValidarEdicionDocumento() {

    try {

        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos: <br> <p></p>';

        if ($(Cuerpo + 'txtFechaEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Fecha';

        if ($(Cuerpo + 'txtCompraSunatEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Compra';

        if ($(Cuerpo + 'txtVentaSunatEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Venta';

        if ($(Cuerpo + 'txtParaleloEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'Paralelo';

        if (($(Cuerpo + 'txtCompraSunatEdicion').val() != '' & $(Cuerpo + 'txtVentaSunatEdicion').val() != '') && ($(Cuerpo + 'txtCompraSunatEdicion').val() > $(Cuerpo + 'txtVentaSunatEdicion').val()))
            Cadena = Cadena + '<p></p>' + 'La Compra no puede ser mayor que la venta';

        if (Cadena != 'Ingresar los sgtes. Datos: <br> <p></p>') {
            toastr.warning(Cadena);
            return false;
        }
        return true;
    }

    catch (e) {

        toastr.warning("Error Detectado: " + e);
    }
}

function F_GrabarDocumento() {
    var Contenedor = '#MainContent_';
    try {

        var objParams = {
            Filtro_Fecha: $(Contenedor + 'txtFecha').val(),
            Filtro_Compra: $(Contenedor + 'txtCompraSunat').val(),
            Filtro_Venta: $(Contenedor + 'txtVentaSunat').val(),
            Filtro_Paralelo: $(Contenedor + 'txtParalelo').val(),
            Filtro_Periodo: $(Contenedor + 'txtPeriodo').val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        MostrarEspera(true);
        F_GrabarDocumento_NET(arg, function (result) {
            //                var Entity = Sys.Serialization.JavaScriptSerializer.deserialize(result);

            //                MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_mensaje_operacion == "Se grabo correctamente") {

                $('#MainContent_txtCompraSunat').val('');
                $('#MainContent_txtVentaSunat').val('');
                $('#MainContent_txtParalelo').val('');
                F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);
                $('#lblNumeroConsulta').text(F_Numerar_Grilla("grvConsultaArticulo", 'lblCodTipoCambio')); 
                toastr.success(str_mensaje_operacion);
                $('#MainContent_txtCompraSunat').focus();
            }
            else {
                toastr.warning(result.split('~')[1]);
            }

            return false;

        });
    }

    catch (e) {
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

function F_EditarRegistro(Fila) {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Editar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
    try {
        var imgID = Fila.id;
        var lblCodTipoCambio_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblCodTipoCambio');
        var lblCompra_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblCompra');
        var lblVenta_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblVenta');
        var lblParalelo_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblParalelo');
        var lblFecha_grilla = '#' + imgID.replace('imgEditarRegistro', 'lblFecha');
        
        var Cuerpo = '#MainContent_';

        $('#hfCodTipoCambio').val($(lblCodTipoCambio_grilla).text());
        $(Cuerpo + 'txtFechaEdicion').val($(lblFecha_grilla).text());
        $(Cuerpo + 'txtCompraSunatEdicion').val($(lblCompra_grilla).text());
        $(Cuerpo + 'txtVentaSunatEdicion').val($(lblVenta_grilla).text());
        $(Cuerpo + 'txtParaleloEdicion').val($(lblParalelo_grilla).text());

        $("#divEdicionRegistro").dialog({
            resizable: false,
            modal: true,
            title: "Edicion de Tipo de Cambio",
            title_html: true,
            height: 120,
            width: 655,
            autoOpen: false
        });

        $('#divEdicionRegistro').dialog('open');

        return false;
    }
    catch (e) {
        toastr.warning("Error Detectado: " + e);
        return false;
    }
}

function F_EdicionRegistro() {

    try {
        var Contenedor = '#MainContent_';
        var TipoDocumento = '1';

        if ($('#MainContent_txtNroDni').val() == '')
            TipoDocumento = '6';

        var objParams = {
            Filtro_CodTipoCambio: $('#hfCodTipoCambio').val(),
            Filtro_Fecha: $(Contenedor + 'txtFechaEdicion').val(),
            Filtro_Compra: $(Contenedor + 'txtCompraSunatEdicion').val(),
            Filtro_Venta: $(Contenedor + 'txtVentaSunatEdicion').val(),
            Filtro_Paralelo: $(Contenedor + 'txtParaleloEdicion').val(),
            Filtro_Periodo: $(Contenedor + 'txtPeriodoEdicion').val()
        };


        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);
        F_EdicionRegistro_NET(arg, function (result) {
            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se grabo correctamente') {
                    $(Contenedor + 'txtRucEdicion').val('');
                    $('#hfCodTipoCambio').val();
                    $(Contenedor + 'txtFechaEdicion').val('0');
                    $(Contenedor + 'txtCompraSunatEdicion').val('0');
                    $(Contenedor + 'txtVentaSunatEdicion').val('0');
                    $(Contenedor + 'txtParaleloEdicion').val('0');
                    $(Contenedor + 'txtPeriodoEdicion').val('0');
                    toastr.success('Se Grabo Correctamente.');
                    F_Buscar();
                    //F_Update_Division_HTML('div_grvConsultaArticulo', result.split('~')[2]);
                    $('#divEdicionRegistro').dialog('close');

                }
                else
                    toastr.warning(result.split('~')[1]);

            }
            else {
                toastr.warning(result.split('~')[1]);
            }

            return false;

        });
    }

    catch (e) {
        MostrarEspera(false);
        toastr.warning("Error Detectado: " + e);
        return false;
    }
}
