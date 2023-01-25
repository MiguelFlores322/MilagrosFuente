var AppSession = "../Maestros/AlmacenFisico.aspx";
var CodigoMenu = 1000; /// EXCLUSIVIDAD DE LA PAGINA
var CodigoInterno = 4; /// EXCLUSIVIDAD DE LA PAGINA

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

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
                    toastr.warning(response.responseText);
                },
                failure: function (response) {
                    toastr.warning(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfRegion').val(i.item.val);
            $('#hfProvincia').val(i.item.CodProvincia);
            $('#hfDistrito').val(i.item.CodDistrito);
        },
        minLength: 3
    });

    $('#MainContent_txtDistritoEdicion').autocomplete({
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
                    toastr.warning(response.responseText);
                },
                failure: function (response) {
                    toastr.warning(response.responseText);
                }
            });
        },
        select: function (e, i) {
            $('#hfRegionEdicion').val(i.item.val);
            $('#hfProvinciaEdicion').val(i.item.CodProvincia);
            $('#hfDistritoEdicion').val(i.item.CodDistrito);
        },
        minLength: 3
    });


    $('#divTabs').tabs();

    $('#MainContent_btnGrabar').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Insertar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac

        try {
            if (!F_ValidarGrabarDocumento())
                return false;

            if (confirm("ESTA SEGURO DE GRABAR"))
                F_GrabarDocumento();

            return false;
        }

        catch (e) {

            toastr.warning("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnNuevo').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            F_Nuevo();
            return false;
        }

        catch (e) {

            toastr.warning("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnBuscarConsulta').click(function () {
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

    $('#MainContent_btnEdicion').click(function () {
        if (!F_SesionRedireccionar(AppSession)) return false;
        try {
            if (!F_ValidarEdicionDocumento())
                return false;

            if (confirm("ESTA SEGURO DE ACTUALIZAR LOS DATOS DEL VENDEDOR"))
                F_EdicionRegistro();

            return false;
        }
        catch (e) {
            toastr.warning("Error Detectado: " + e);
        }
    });

    F_Controles_Inicializar();


    $('#MainContent_txtDescripcion').css('background', '#FFFFE0');
    $('#MainContent_txtDescripcionEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtDireccion').css('background', '#FFFFE0');
    $('#MainContent_txtDireccionEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtDistrito').css('background', '#FFFFE0');
    $('#MainContent_txtDistritoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcionConsulta').css('background', '#FFFFE0');

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
                Filtro_CodSerie: 52
            };


        arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);

        F_Controles_Inicializar_NET
            (
                arg,
                function (result) {

                    var str_resultado_operacion = "";
                    var str_mensaje_operacion = "";

                    str_resultado_operacion = result.split('~')[0];
                    str_mensaje_operacion = result.split('~')[1];

                    if (str_resultado_operacion == "1") {
                        F_Update_Division_HTML('div_Estado', result.split('~')[2]);
                        F_Update_Division_HTML('div_EstadoEdicion', result.split('~')[3]);
                        F_Update_Division_HTML('div_Tipo', result.split('~')[4]);
                        F_Update_Division_HTML('div_TipoEdicion', result.split('~')[5]);
                        $('#MainContent_ddlEstado').val('1');
                        $('#MainContent_ddlTipo').val('1');
                        $('#MainContent_ddlEstado').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipo').css('background', '#FFFFE0');
                        $('#MainContent_ddlEstadoEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipoEdicion').css('background', '#FFFFE0');
                        $('#MainContent_ddlTipo').css('background', '#FFFFE0');
                        if (result.split('~')[8] == '0') 
                            $('#MainContent_chkAdministrador').prop('disabled', true);
            
                        if (result.split('~')[9] == '0')
                            $('#MainContent_chkAprobacionCredito').prop('disabled', true);                    
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
    if (!F_SesionRedireccionar(AppSession)) return false;

    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'ddlTipo').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Tipo';

        if ($(Cuerpo + 'ddlTipo').val() == null)
            Cadena = Cadena + '<p></p>' + 'Tipo';

        if ($(Cuerpo + 'txtDescripcion').val() == '')
            Cadena = Cadena + '<p></p>' + 'DESCRIPCION';

        if ($(Cuerpo + 'txtDireccion').val() == '')
            Cadena = Cadena + '<p></p>' + 'COMISION';

        if ($('#hfDistrito').val() == '0')
            Cadena = Cadena + '<p></p>' + 'DISTRITO';

        if ($(Cuerpo + 'ddlEstado').val() == '0')
            Cadena = Cadena + '<p></p>' + 'ESTADO';

        if ($(Cuerpo + 'ddlEstado').val() == null)
            Cadena = Cadena + '<p></p>' + 'ESTADO';

        if ($(Cuerpo + 'ddlEstado').val() == '0')
            Cadena = Cadena + '<p></p>' + 'ESTADO';

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

function F_GrabarDocumento() {
    if (!F_SesionRedireccionar(AppSession)) return false;

    try {
        var Contenedor = '#MainContent_';

        var objParams = {
            Filtro_Descripcion: $(Contenedor + 'txtDescripcion').val(),
            Filtro_Direccion: $(Contenedor + 'txtDireccion').val(),
            Filtro_CodDepartamento: $('#hfRegion').val(),
            Filtro_CodProvincia: $('#hfProvincia').val(),
            Filtro_CodDistrito: $('#hfDistrito').val(),
            Filtro_CodTipo: $(Contenedor + 'ddlTipo').val(),
            Filtro_CodEstado: $(Contenedor + 'ddlEstado').val(),
        };


        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_GrabarDocumento_NET(arg, function (result) {

            MostrarEspera(false);

            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];

            if (str_resultado_operacion == "1") {
                if (str_mensaje_operacion == 'Se Grabo Correctamente') {
                    toastr.success('Se grabo correctamente.');
                    F_Nuevo();
                }
                else {
                    toastr.warning(result.split('~')[1]);
                }
            }
            else {
                toastr.warning(result.split('~')[1]);
            }

            return false;

        });
    }

    catch (e) {

        toastr.warning("Error Detectado: " + e);
        return false;
    }
}

function F_Nuevo() {
    var Contenedor = '#MainContent_';
    $(Contenedor + 'txtDescripcion').val('');
    $(Contenedor + 'txtDireccion').val('');
    $(Contenedor + 'txtDistrito').val('');
    $('#hfRegion').val('');
    $('#hfProvincia').val('');
    $('#hfDistrito').val('');
    $(Contenedor + 'ddlTipo').val('1');
    $(Contenedor + 'ddlEstado').val('1');
}

function F_Buscar() {

    try {
        var objParams = {
            Filtro_Descripcion: $("#MainContent_txtDescripcionConsulta").val()
        };

        var arg = Sys.Serialization.JavaScriptSerializer.serialize(objParams);
        MostrarEspera(true);

        F_Buscar_NET(arg, function (result) {
            var str_resultado_operacion = "";
            var str_mensaje_operacion = "";

            str_resultado_operacion = result.split('~')[0];
            str_mensaje_operacion = result.split('~')[1];
            MostrarEspera(false);
            if (str_resultado_operacion == "1") {

                F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                $('#lblNumeroConsulta').text(F_Numerar_Grilla("grvConsulta", 'lblCodAlmacenFisico')); 
                if (str_mensaje_operacion != "")
                    toastr.warning(result.split('~')[1]);

            }
            else {
                toastr.warning(result.split('~')[1]);
            }

            return false;

        });
    }

    catch (e) {

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
    if (!F_SesionRedireccionar(AppSession)) return false;
    
    try {
        var imgID = Fila.id;
        var lblCodAlmacenFisico = '#' + imgID.replace('imgEditarRegistro', 'lblCodAlmacenFisico');
        var lblDescripcion = '#' + imgID.replace('imgEditarRegistro', 'lblDescripcion');
        var lblDireccion = '#' + imgID.replace('imgEditarRegistro', 'lblDireccion');
        var hfCodRegion = '#' + imgID.replace('imgEditarRegistro', 'hfCodRegion');
        var hfCodProvincia = '#' + imgID.replace('imgEditarRegistro', 'hfCodProvincia');
        var hfCodDistrito = '#' + imgID.replace('imgEditarRegistro', 'hfCodDistrito');
        var hfCodEstado = '#' + imgID.replace('imgEditarRegistro', 'hfCodEstado');
        var hfCodTipo = '#' + imgID.replace('imgEditarRegistro', 'hfCodTipo');
        var lblDistrito = '#' + imgID.replace('imgEditarRegistro', 'lblDistrito');
        var Cuerpo = '#MainContent_';
        if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Editar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac

        $('#hfCodAlmacenFisico').val($(lblCodAlmacenFisico).text());
        $(Cuerpo + 'txtDescripcionEdicion').val($(lblDescripcion).text());
        $(Cuerpo + 'txtDireccionEdicion').val($(lblDireccion).text());
        $('#hfRegionEdicion').val($(hfCodRegion).val());
        $('#hfProvinciaEdicion').val($(hfCodProvincia).val());
        $('#hfDistritoEdicion').val($(hfCodDistrito).val());
        $(Cuerpo + 'txtDistritoEdicion').val($(lblDistrito).text());
        $(Cuerpo + 'ddlTipoEdicion').val($(hfCodTipo).val());
        $(Cuerpo + 'ddlEstadoEdicion').val($(hfCodEstado).val());

        $("#divEdicionRegistro").dialog({
            resizable: false,
            modal: true,
            title: "Edicion de Vendedor",
            title_html: true,
            height: 250,
            width: 670,
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

        var objParams = {
            Filtro_CodAlmacenFisico: $('#hfCodAlmacenFisico').val(),
            Filtro_Descripcion: $(Contenedor + 'txtDescripcionEdicion').val(),
            Filtro_Direccion: $(Contenedor + 'txtDireccionEdicion').val(),
            Filtro_CodDepartamento: $('#hfRegionEdicion').val(),
            Filtro_CodProvincia: $('#hfProvinciaEdicion').val(),
            Filtro_CodDistrito: $('#hfDistritoEdicion').val(),
            Filtro_CodTipo: $(Contenedor + 'ddlTipoEdicion').val(),
            Filtro_CodEstado: $(Contenedor + 'ddlEstadoEdicion').val(),
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
                if (str_mensaje_operacion == 'SE ACTUALIZO CORRECTAMENTE') {
                    $(Contenedor + 'txtDescripcionEdicion').val('');
                    $(Contenedor + 'txtDireccionEdicion').val('');
                    $('#hfRegionEdicion').val(0);
                    $('#hfProvinciaEdicion').val(0);
                    $('#hfDistritoEdicion').val(0);
                    $('#hfCodAlmacenFisico').val(0);
                    toastr.success('Se ACTUALIZO Correctamente.');
                    F_Update_Division_HTML('div_consulta', result.split('~')[2]);
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

function F_ValidarEdicionDocumento() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'ddlTipoEdicion').val() == '0')
            Cadena = Cadena + '<p></p>' + 'Tipo';

        if ($(Cuerpo + 'ddlTipoEdicion').val() == null)
            Cadena = Cadena + '<p></p>' + 'Tipo';

        if ($(Cuerpo + 'txtDescripcionEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'DESCRIPCION';

        if ($(Cuerpo + 'txtDireccionEdicion').val() == '')
            Cadena = Cadena + '<p></p>' + 'COMISION';

        if ($('#hfDistritoEdicion').val() == '0')
            Cadena = Cadena + '<p></p>' + 'DISTRITO';

        if ($(Cuerpo + 'ddlEstadoEdicion').val() == '0')
            Cadena = Cadena + '<p></p>' + 'ESTADO';

        if ($(Cuerpo + 'ddlEstadoEdicion').val() == null)
            Cadena = Cadena + '<p></p>' + 'ESTADO';

        if ($(Cuerpo + 'ddlEstadoEdicion').val() == '0')
            Cadena = Cadena + '<p></p>' + 'ESTADO';

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