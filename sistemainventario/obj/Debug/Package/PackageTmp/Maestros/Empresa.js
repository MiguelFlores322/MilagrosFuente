var myDropzone = null;
var mydropzone_Edit = null;
var AppSession = "../Maestros/Empresa.aspx";
var CodigoMenu = 1000;
var CodigoInterno = 14;

$(document).ready(function () {
    F_ValidaSesionActiva(AppSession);

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
            $('#hfCodDistrito').val(i.item.CodDistrito);
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
            $('#hfCodDistritoEdicion').val(i.item.CodDistrito);
        },
        minLength: 3
    });

    $('#divTabs').tabs();

    $('#MainContent_imgBuscar').click(function () {
        try {
            var cadena = "Ingresar los sgtes. campos :";
            if ($('#MainContent_txtArticulo').val == "")
                cadena = cadena + "\n" + "Articulo"

            if ($('#MainContent_ddlMoneda option').size() == 0)
            { cadena = cadena + "\n" + "Moneda"; }
            else {
                if ($('#MainContent_ddlMoneda').val() == "-1")
                    cadena = cadena + "\n" + "Moneda";
            }

            if (cadena != "Ingresar los sgtes. campos :") {
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

    $('#MainContent_btnGrabar').click(function () {
    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Insertar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
        F_ValidaSesionActiva(AppSession);
        try {
            if (F_ValidarGrabarDocumento() == false)
                return false;

            if (confirm("Esta Seguro de Grabar la Empresa"))
                F_GrabarDocumento();
            //                F_Nuevo();
            //            }
            return false;
        }

        catch (e) {

            toastr.warning("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnBuscarConsulta').click(function () {
        try {
            F_ValidaSesionActiva(AppSession);
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Consultar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac

            F_Buscar();
            return false;
        }

        catch (e) {

            toastr.warning("Error Detectado: " + e);
        }

    });

    $('#MainContent_btnGrabarEdicion').click(function () {
        F_ValidaSesionActiva(AppSession);
        try {
            if (F_ValidarEdicionDocumento() == false)
                return false;

            if (confirm("ESTA SEGURO DE ACTUALIZAR LOS DATOS DE LA EMPRESA"))
                F_EdicionRegistro();

            return false;
        }

        catch (e) {

            toastr.warning("Error Detectado: " + e);
        }

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

            toastr.warning("Error Detectado: " + e);
        }

    });

    
    F_LimpiarCampos();

    F_Controles_Inicializar();
    
});

function F_LimpiarCampos()
{

    $('#MainContent_txtDescripcionConsulta').val('');
    $('#hfCodEmpresa').val('');
    $('#MainContent_txtRucEmpresa').val('');
    $('#MainContent_txtRazonSocial').val('');
    $('#MainContent_txtT_Nombrecomercial').val('');
    $('#MainContent_txtDireccion').val('');
    $('#MainContent_txtT_PaginaWeb').val('');
    $('#MainContent_txtT_Slogan').val('');
    $('#MainContent_txtT_Telefono').val('');
    $('#MainContent_txtT_CorreoEmpresa').val('');
    $('#MainContent_txtT_Celular').val('');
    $('#MainContent_txtT_Anexo').val('');
    $('#hfCodDistrito').val('');
    $('#MainContent_txtDistrito').val('');
    $('#MainContent_txtT_RepresentanteLegal').val('');
    $('#MainContent_txtT_CorreoPersonal').val('');
    $('#MainContent_ddl_EnvioAutomaticoSunat').val('M');

    $('#hfCodEmpresaEdicion').val('');
    $('#MainContent_txtRucEmpresaEdicion').val('');
    $('#MainContent_txtRazonSocialEdicion').val('');
    $('#MainContent_txtT_NombrecomercialEdicion').val('');
    $('#MainContent_txtDireccionEdicion').val('');
    $('#MainContent_txtT_PaginaWebEdicion').val('');
    $('#MainContent_txtT_SloganEdicion').val('');
    $('#MainContent_txtT_TelefonoEdicion').val('');
    $('#MainContent_txtT_CorreoEmpresaEdicion').val('');
    $('#MainContent_txtT_CelularEdicion').val('');
    $('#MainContent_txtT_AnexoEdicion').val('');
    $('#hfCodDistritoEdicion').val('');
    $('#MainContent_txtDistritoEdicion').val('');
    $('#MainContent_txtT_RepresentanteLegalEdicion').val('');
    $('#MainContent_txtT_CorreoPersonalEdicion').val('');
    $('#MainContent_ddl_EnvioAutomaticoSunatEdicion').val('M');

    $('#hid_id_logo_Edit').val('');
    $('#hid_id_logo_Edit2').val('M');


    $('#MainContent_txtDescripcionConsulta').css('background', '#FFFFE0');
    $('#MainContent_txtRucEmpresa').css('background', '#FFFFE0');
    $('#MainContent_txtRazonSocial').css('background', '#FFFFE0');
    $('#MainContent_txtT_Nombrecomercial').css('background', '#FFFFE0');
    $('#MainContent_txtDireccion').css('background', '#FFFFE0');
    $('#MainContent_txtT_PaginaWeb').css('background', '#FFFFE0');
    $('#MainContent_txtT_Slogan').css('background', '#FFFFE0');
    $('#MainContent_txtT_Telefono').css('background', '#FFFFE0');
    $('#MainContent_txtT_CorreoEmpresa').css('background', '#FFFFE0');
    $('#MainContent_txtT_Celular').css('background', '#FFFFE0');
    $('#MainContent_txtT_Anexo').css('background', '#FFFFE0');
    $('#MainContent_txtDistrito').css('background', '#FFFFE0');
    $('#MainContent_txtT_RepresentanteLegal').css('background', '#FFFFE0');
    $('#MainContent_txtT_CorreoPersonal').css('background', '#FFFFE0');
    $('#MainContent_ddl_EnvioAutomaticoSunat').css('background', '#FFFFE0');

    $('#MainContent_txtCodEmpresaEdicion').css('background', '#FFFFE0');
    $('#MainContent_txtRucEmpresaEdicion').css('background', '#FFFFE0');
    $('#MainContent_txtRazonSocialEdicion').css('background', '#FFFFE0');
    $('#MainContent_txtT_NombrecomercialEdicion').css('background', '#FFFFE0');
    $('#MainContent_txtDireccionEdicion').css('background', '#FFFFE0');
    $('#MainContent_txtT_PaginaWebEdicion').css('background', '#FFFFE0');
    $('#MainContent_txtT_SloganEdicion').css('background', '#FFFFE0');
    $('#MainContent_txtT_TelefonoEdicion').css('background', '#FFFFE0');
    $('#MainContent_txtT_CorreoEmpresaEdicion').css('background', '#FFFFE0');
    $('#MainContent_txtT_CelularEdicion').css('background', '#FFFFE0');
    $('#MainContent_txtT_AnexoEdicion').css('background', '#FFFFE0');
    $('#MainContent_txtDistritoEdicion').css('background', '#FFFFE0');
    $('#MainContent_txtT_RepresentanteLegalEdicion').css('background', '#FFFFE0');
    $('#MainContent_txtT_CorreoPersonalEdicion').css('background', '#FFFFE0');
    $('#MainContent_ddl_EnvioAutomaticoSunatEdicion').css('background', '#FFFFE0');






}

$().ready(function () {

    $(document).everyTime(900000, function () {
       F_ValidaSesionActiva(AppSession);
    });


});

//function F_ValidaSesionActiva() { 
//        $.ajax({
//            type: "POST",
//            url: '../Maestros/Empresa.aspx/KeepActiveSession',
//            data: {},
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            async: true,
//            //success: F_ValidaSesionActiva,
//            success: function(obj, status){
//            if (obj.d == false) //cambiar a false
//            {
//                window.location.href="../ErrorSession.aspx";
//            }

//            },
//            error: function (XMLHttpRequest, textStatus, errorThrown) {

//                toastr.warning(textStatus + ": " + XMLHttpRequest.responseText);
//            }
//        });
//}

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

function F_Controles_Inicializar() {
    F_ValidaSesionActiva(AppSession);
    var arg;

    try {
        var objParams = {};

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
                        $('#MainContent_txtCodEmpresa').focus();
                        F_AbrirDropzone_JS();
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

    try {
        var objParams = {
            Filtro_Descripcion: $("#MainContent_txtDescripcionConsulta").val(),
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
                $('#lblNumeroConsulta').text(F_Numerar_Grilla("grvConsulta", 'lblCodEmpresa')); 
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
        MostrarEspera(false);
        toastr.warning("Error Detectado: " + e);
        return false;
    }

}

function F_ValidarGrabarDocumento() {

    try {

        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtRucEmpresa').val() == '') Cadena = Cadena + '<p></p>' + 'Ruc';

//        try 
//        {
//            if (ValidarRuc($(Cuerpo + 'txtRucEmpresa').val()) == false) Cadena = Cadena + '<p></p>' + 'Ruc Incorrecto';
//        }  catch (e) { Cadena = Cadena + '<p></p>' + 'Ruc Incorrecto';}

        if ($(Cuerpo + 'txtRazonSocial').val() == '') Cadena = Cadena + '<p></p>' + 'Razon Social';

        if ($(Cuerpo + 'txtDireccion').val() == '') Cadena = Cadena + '<p></p>' + 'Direccion';

        if ($(Cuerpo + 'txtT_CorreoEmpresa').val() == '') Cadena = Cadena + '<p></p>' + 'Correo';

        if ($(Cuerpo + 'txtT_Anexo').val() == '') Cadena = Cadena + '<p></p>' + 'Anexo';

        if ($('#hfCodDistrito').val() == '') Cadena = Cadena + '<p></p>' + 'Distrito';

        if ($(Cuerpo + 'txtT_Telefono').val() == '') Cadena = Cadena + '<p></p>' + 'Telefono';

        //Valido si tiene imagen o no
        var arrImg = new Array();
        $('.dz-preview').each(function () {
            arrImg.push(this.id);
        }); 
        if (arrImg.length === 0) Cadena = Cadena + '<p></p>' + 'Imagen de Logo';


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
    var Contenedor = '#MainContent_';
    try {
        var arrImg = new Array();
        $('.dz-preview').each(function () {
            arrImg.push(this.id);
        }); 
        var IdImagen = arrImg[0];

        var objParams = {
            Filtro_RazonSocial: $(Contenedor + 'txtRazonSocial').val(),
            Filtro_NroRuc: $(Contenedor + 'txtRucEmpresa').val(),
            Filtro_Direccion: $(Contenedor + 'txtDireccion').val(),
            Filtro_Estado: "1",
            Filtro_T_CorreoEmpresa: $(Contenedor + 'txtT_CorreoEmpresa').val(),
            Filtro_T_Anexo: $(Contenedor + 'txtT_Anexo').val(),
            Filtro_T_Celular: $(Contenedor + 'txtT_Celular').val(),
            Filtro_T_RepresentanteLegal: $(Contenedor + 'txtT_RepresentanteLegal').val(),
            Filtro_T_CorreoPersonal: $(Contenedor + 'txtT_CorreoPersonal').val(),
            Filtro_T_PaginaWeb: $(Contenedor + 'txtT_PaginaWeb').val(),
            Filtro_T_Slogan: $(Contenedor + 'txtT_Slogan').val(),
//            Filtro_B_LogoEmpresa: $(Contenedor + 'ddlTipoCliente').val(),
//            Filtro_B_CodigoQR: $(Contenedor + 'ddlTipoCliente').val(),
            Filtro_CodDistrito: $('#hfCodDistrito').val(),
            Filtro_T_NombreComercial: $(Contenedor + 'txtT_Nombrecomercial').val(),
            Filtro_T_Telefono: $(Contenedor + 'txtT_Telefono').val(),
            Filtro_EnvioAutomaticoSunat: $(Contenedor + 'ddl_EnvioAutomaticoSunat').val(),
            Filtro_ID_TemporalImagen: IdImagen,
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
                if (str_mensaje_operacion == 'Se grabo correctamente') {
                    F_LimpiarCampos();
                    $('#mydropzone').remove();
                    F_AbrirDropzone_JS();
                    $(Contenedor + 'txtNroRuc').focus();
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


function F_EditarRegistro(Fila) {
if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Editar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
    try {
        var Cuerpo = '#MainContent_';  var CampoGrilla = ""; var CampoEdit = "";
        var imgID = Fila.id;
        
        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'lblCodEmpresa'); CampoEdit = '#hfCodEmpresaEdicion'; 
        $(CampoEdit).val($(CampoGrilla).text()); 

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfNroDuc'); CampoEdit = Cuerpo + 'txtRucEmpresaEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfRazonSocial'); CampoEdit = Cuerpo + 'txtRazonSocialEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfDireccion'); CampoEdit = Cuerpo + 'txtDireccionEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfT_CorreoEmpresa'); CampoEdit = Cuerpo + 'txtT_CorreoEmpresaEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfT_Anexo'); CampoEdit = Cuerpo + 'txtT_AnexoEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfT_Celular'); CampoEdit = Cuerpo + 'txtT_CelularEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfT_RepresentanteLegal'); CampoEdit = Cuerpo + 'txtT_RepresentanteLegalEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfT_CorreoPersonal'); CampoEdit = Cuerpo + 'txtT_CorreoPersonalEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfT_CorreoPersonal'); CampoEdit = Cuerpo + 'txtT_CorreoPersonalEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfT_PaginaWeb'); CampoEdit = Cuerpo + 'txtT_PaginaWebEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfT_Slogan'); CampoEdit = Cuerpo + 'txtT_SloganEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfCodDistrito'); CampoEdit = '#hfCodDistritoEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfDistrito'); CampoEdit = Cuerpo + 'txtDistritoEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfT_NombreComercial'); CampoEdit = Cuerpo + 'txtT_NombrecomercialEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfT_Telefono'); CampoEdit = Cuerpo + 'txtT_TelefonoEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        CampoGrilla = '#' + imgID.replace('imgEditarRegistro', 'hfEnvioAutomaticoSunat'); CampoEdit = Cuerpo + 'ddl_EnvioAutomaticoSunatEdicion'; 
        $(CampoEdit).val($(CampoGrilla).val());

        F_AbrirDropzone_Edit_JS($('#hfCodEmpresaEdicion').val(), $('#hfCodEmpresaEdicion').val());

        MostrarEspera(true);
        $("#divEdicionRegistro").dialog({
            resizable: false,
            modal: true,
            title: "Edicion de Empresa",
            title_html: true,
            height: 430,
            width: 1240,
            autoOpen: false
        });

        MostrarEspera(false);

        $('#divEdicionRegistro').dialog('open');
    }

    catch (e) {
        MostrarEspera(false);
        toastr.warning("Error Detectado: " + e);
        return false;
    }

}

function F_EdicionRegistro() {

        var IdImagen = 0;

        try
        {
            // recorrido para seleccionar imagen
            var arrImg = new Array();
            $('.dz-preview').each(function () {
                arrImg.push(this.id);
            });

            if (arrImg.length === 0)
            {
                IdImagen = 0;
            } else
            {
               if (arrImg[1] != 'LogoOriginal') IdImagen =  1;
            }
        } catch (e) {}

    try {
        var Contenedor = '#MainContent_';
        var objParams = {
            Filtro_CodEmpresa: $('#hfCodEmpresaEdicion').val(),
            Filtro_RazonSocial: $(Contenedor + 'txtRazonSocialEdicion').val(),
            Filtro_NroRuc: $(Contenedor + 'txtRucEmpresaEdicion').val(),
            Filtro_Direccion: $(Contenedor + 'txtDireccionEdicion').val(),
            Filtro_Estado: "1",
            Filtro_T_CorreoEmpresa: $(Contenedor + 'txtT_CorreoEmpresaEdicion').val(),
            Filtro_T_Anexo: $(Contenedor + 'txtT_AnexoEdicion').val(),
            Filtro_T_Celular: $(Contenedor + 'txtT_CelularEdicion').val(),
            Filtro_T_RepresentanteLegal: $(Contenedor + 'txtT_RepresentanteLegalEdicion').val(),
            Filtro_T_CorreoPersonal: $(Contenedor + 'txtT_CorreoPersonalEdicion').val(),
            Filtro_T_PaginaWeb: $(Contenedor + 'txtT_PaginaWebEdicion').val(),
            Filtro_T_Slogan: $(Contenedor + 'txtT_SloganEdicion').val(),
//            Filtro_B_LogoEmpresa: $(Contenedor + 'ddlTipoClienteEdicion').val(),
//            Filtro_B_CodigoQR: $(Contenedor + 'ddlTipoClienteEdicion').val(),
            Filtro_CodDistrito: $('#hfCodDistritoEdicion').val(),
            Filtro_T_NombreComercial: $(Contenedor + 'txtT_NombrecomercialEdicion').val(),
            Filtro_T_Telefono: $(Contenedor + 'txtT_TelefonoEdicion').val(),
            Filtro_EnvioAutomaticoSunat: $(Contenedor + 'ddl_EnvioAutomaticoSunatEdicion').val(),
            Filtro_ID_TemporalImagen: IdImagen,
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
                if (str_mensaje_operacion == 'Se Actualizo Correctamente.') {
                    F_Buscar();
                    F_Update_Division_HTML('div_consulta', result.split('~')[2]);
                    F_LimpiarCampos();
                    toastr.success('Se Actualizo Correctamente.');
                    $('#divEdicionRegistro').dialog('close');
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
        MostrarEspera(false);
        toastr.warning("Error Detectado: " + e);
        return false;
    }
}

function F_ValidarEdicionDocumento() {

    try {

        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtRucEmpresaEdicion').val() == '') Cadena = Cadena + '<p></p>' + 'Ruc';

        if ($(Cuerpo + 'txtRazonSocialEdicion').val() == '') Cadena = Cadena + '<p></p>' + 'Razon Social';

        if ($(Cuerpo + 'txtDireccionEdicion').val() == '') Cadena = Cadena + '<p></p>' + 'Direccion';

        if ($(Cuerpo + 'txtT_CorreoEmpresaEdicion').val() == '') Cadena = Cadena + '<p></p>' + 'Correo';

        if ($(Cuerpo + 'txtT_AnexoEdicion').val() == '') Cadena = Cadena + '<p></p>' + 'Anexo';

        if ($('#hfCodDistritoEdicion').val() == '') Cadena = Cadena + '<p></p>' + 'Distrito';

        if ($(Cuerpo + 'txtT_TelefonoEdicion').val() == '') Cadena = Cadena + '<p></p>' + 'Telefono';


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

function ValidarRuc(valor) {
    valor = trim(valor)
    if (esnumero(valor)) {
        if (valor.length == 8) {
            suma = 0
            for (i = 0; i < valor.length - 1; i++) {

                if (i == 0) suma += (digito * 2)
                else suma += (digito * (valor.length - i))
            }
            resto = suma % 11;
            if (resto == 1) resto = 11;
            if (resto + (valor.charAt(valor.length - 1) - '0') == 11) {
                return true
            }
        } else if (valor.length == 11) {
            suma = 0
            x = 6
            for (i = 0; i < valor.length - 1; i++) {
                if (i == 4) x = 8
                digito = valor.charAt(i) - '0';
                x--
                if (i == 0) suma += (digito * x)
                else suma += (digito * x)
            }
            resto = suma % 11;
            resto = 11 - resto

            if (resto >= 10) resto = resto - 10;
            if (resto == valor.charAt(valor.length - 1) - '0') {
                return true
            }
        }
    }
    return false
}





//Procedimiento para abrir el dropZone
function F_CrearDropzone_JS() {
    var midiv = document.createElement("div");
    midiv.setAttribute("id", "mydropzone");
    midiv.setAttribute("class", "dropzone");
    midiv.setAttribute("style", "width:450px; height:330px; margin-left: 10px; border-radius:12px; min-height:200px; padding:0px;");
    document.getElementById('drop').appendChild(midiv);
}

function F_CrearDropzone_Edit_JS() {
    var midiv_Edit = document.createElement("div");
    midiv_Edit.setAttribute("id", "mydropzone_Edit");
    midiv_Edit.setAttribute("class", "dropzone");
    midiv_Edit.setAttribute("style", "width:450px; height:330px; margin-left: 10px; border-radius:12px; min-height:200px; padding:0px;");
    document.getElementById('div_drop_Edit').appendChild(midiv_Edit);

}

function F_AbrirDropzone_JS() {
    F_CrearDropzone_JS();

    var str_id;
    str_id = $('#hfCodEmpresaEdicion').val(); if (str_id == '') str_id = '0';

    myDropzone = new Dropzone("#mydropzone", {
        url: "Empresa.aspx",
        method: "POST",
        paramName: "file1",
        parallelUploads: 1,
        addRemoveLinks: true,
        autoProcessQueue: true,
        uploadMultiple: false,
        maxFileSize: 2,
        maxFiles: 1,
        dictResponseError: "Ha ocurrido un error en el server",
        dictRemoveFile: "Remover Doc.",
        acceptedFiles: 'image/*,.jpeg,.jpg,.png,.bmp,.JPEG,.JPG,.PNG,.psd',
        previewTemplate: "<div id=\"idzID\" class=\"dz-preview dz-file-preview\">\n  <div  class=\"dz-details\">\n <div class=\"dz-filename\"><span data-dz-name></span></div>\n             <div class=\"dz-size\" data-dz-size></div>\n  <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage>Error, archivo no compatible o fuera del rango del tamaño permitido.</span></div>\n</div>",
        error: function (file, response) {
            file.previewElement.classList.add("dz-error");
        },
        init: function () {
            var thisDropzone = this;

            $('#btn_man_cancelar').click(function () {
                thisDropzone.removeAllFiles(true);
            });

            this.on("reset", function (file) {
                thisDropzone.removeAllFiles(true);
            });

            this.on("addedfile", function (file) {
                if (this.files.length) {
                    var i, len, pre;
                    for (i = 0, len = this.files.length; i < len - 1; i++) {
                        if (this.files[i].name == file.name) {
                            toastr.warning("EL LOGO : " + file.name + " YA SE ENCUENTRA REGISTRADO.");
                            return (pre = file.previewElement) != null ? pre.parentNode.removeChild(file.previewElement) : void 0;
                        }
                    }
                }
                return false;
            });

            this.on("maxfilesexceeded", function (file) {
                this.removeAllFiles();
                this.addFile(file);

            });

            this.on("success", function (file) {

                //if ($('#hid_tipo_operacion_mantenimiento').val() == "I") {
                //F_Botones_Mantenimiento_Lock();
                F_Consultar_Imagen(0);
                //}


            });
            this.on("removedfile", function (file) {
                //nuevo
                //                if ($('#hid_id_logo').val() !== "") {
                //                    F_Eliminar_Imagen($('#hid_id_logo').val(), 0);
                //                }
                var id = file.name.split('-', 2);
                var idn = id[1].toString().replace(".jpg", "");
                F_Eliminar_Temporal_Imagen(idn);
                $('#hid_id_logo').val('');

            });

            $.ajax({
                async: true,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                url: "../Digitalizacion/FileUpLoadDB.ashx?IdFile=" + str_id + "&Flag=2" + "&tipo=" + 0 + "&otro=" + Math.round(Math.random()) * 100,

                success: function (data) {
                    var obj = $.parseJSON(data);
                    //  if (obj != "") {
                    $.each(obj, function (index, item) {
                        var mockFile = {
                            name: item.T_NombreArchivo,
                            size: item.T_Tamaño
                        };
                        thisDropzone.emit("addedfile", mockFile);
                        thisDropzone.emit("thumbnail", mockFile, item.T_Preview);
                        thisDropzone.emit("sending", mockFile);
                        thisDropzone.emit("success", mockFile);
                        thisDropzone.files.push(mockFile);
                    });

                },
                error: function () {
                    toastr.warning('Ha ocurrido un error interno, por favor intentelo nuevamente.');
                }
            });

            return false;
        }
    });

    $(".dz-message").remove();
    $("#mydropzone").append('<div class="dz-default dz-message-mini" ></div>');


}

function F_AbrirDropzone_Edit_JS(str_id, nameimg) {
        if (str_id == '') str_id = '0';
        var IdEmpresa = str_id;
        $('#hid_id_logo_Edit').val('');  $('#hid_id_logo_Edit2').val('');
        $('#hid_id_logo_Edit').val(IdEmpresa); $('#hid_id_logo_Edit2').val(IdEmpresa);

    $('#mydropzone').remove();
    $('#mydropzone_Edit').remove();

    F_AbrirDropzone_JS();
    F_CrearDropzone_Edit_JS();

    mydropzone_Edit = new Dropzone("#mydropzone_Edit", {
        url: "Empresa.aspx",
        method: "POST",
        paramName: "file1",
        parallelUploads: 1,
        addRemoveLinks: true,
        autoProcessQueue: true,
        uploadMultiple: false,
        maxFileSize: 2,
        maxFiles: 1,
        dictResponseError: "Ha ocurrido un error en el server",
        dictRemoveFile: "Remover Doc.",
        acceptedFiles: 'image/*,.jpeg,.jpg,.png,.bmp,.JPEG,.JPG,.PNG,.psd',
        previewTemplate: "<div id=\"EDITidzEDIT\" class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n <div class=\"dz-filename\"><span data-dz-name></span></div>\n <div class=\"dz-size\" data-dz-size></div>\n  <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage>Error, archivo no compatible o fuera del rango del tamaño permitido.</span></div>\n</div>",
        error: function (file, response) {
            file.previewElement.classList.add("dz-error");
        },
        init: function () {
            var thisDropzone = this;
            var isDroped = false; //Droped (file) or Downloaded (from db)  //esta variable va a diferenciar cuando entra al dz un archivo dropeado o cargado de la base de datos

            //            $('button.ui-button').click(function () {
            //                thisDropzone.removeAllFiles(true);
            //            });

            //            $('#divEdicionRegistro').unload(function () {
            //                thisDropzone.removeAllFiles(true);
            //            });

            this.on("reset", function (file) {
                thisDropzone.removeAllFiles(true);
            });

            this.on("addedfile", function (file) {
                if (this.files.length) {
                    var i, len, pre;
                    for (i = 0, len = this.files.length; i < len - 1; i++) {
                        if (this.files[i].name == file.name) {
                            toastr.warning("EL LOGO : " + file.name + " YA SE ENCUENTRA REGISTRADO.");
                            return (pre = file.previewElement) != null ? pre.parentNode.removeChild(file.previewElement) : void 0;
                        }
                    }
                    isDroped = true;
                }
                return false;
            });

            this.on("maxfilesexceeded", function (file) {
                this.removeAllFiles();
                this.addFile(file);

            });

            this.on("success", function (file) {
                //if ($('#hid_tipo_operacion_mantenimiento').val() == "I") {
                //F_Botones_Mantenimiento_Lock();

                if (isDroped == true) {
                    F_Consultar_Imagen_Editar(idn)
                }
                else {
                    //var id = file.name.split('-', 2);
                    //var idn = id[1].toString().replace(".jpg", "");
                    $('#EDITidzEDIT').attr('id', 'LogoOriginal');
                }

                //                F_Consultar_Imagen_Editar(idn);
                //}

                isDroped = false;
            });
            this.on("removedfile", function (file) {
                //remover en editar

                //if ($('#hid_id_logo').val() !== "") {
                //    F_Eliminar_Imagen($('#hid_id_logo').val(), 0);
                //}
                //var id = file.name.split('-', 2);
                //var idn = id[1].toString().replace(".jpg", "");
                F_Eliminar_Imagen(idn);
                $('#hid_id_logo_Edit').val('');
                $('#hid_id_logo_Edit2').val('');
            });

            $.ajax({
                async: true,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                url: "../Digitalizacion/FileUpLoadDB.ashx?IdFile=" + $('#hfCodEmpresaEdicion').val() + "&nameimg=" + nameimg + "&Flag=2" + "&tipo=1" + "&otro=" + Math.round(Math.random()) * 100,

                success: function (data) {
                    var obj = $.parseJSON(data);
                    //  if (obj != "") {
                    $.each(obj, function (index, item) {
                        var mockFile = {
                            name: item.T_NombreArchivo,
                            size: item.T_Tamaño
                        };
                        isDroped = false;
                        thisDropzone.emit("addedfile", mockFile);
                        thisDropzone.emit("thumbnail", mockFile, item.T_Preview);
                        thisDropzone.emit("sending", mockFile);
                        thisDropzone.emit("success", mockFile);
                        thisDropzone.files.push(mockFile);
                        var id;
                        try
                        {   id = mockFile.name.split('-', 2); var idn = id[1].toString().replace(".jpg", "");
                        } catch(e){}
                        $('#EDITidzEDIT').attr('id', 'LogoOriginal');
                    });

                },
                error: function () {
                    toastr.warning('Ha ocurrido un error interno, por favor intentelo nuevamente.');
                }
            });

            return false;
        }
    });

    $(".dz-message").remove();
    $("#mydropzone_Edit").append('<div class="dz-default dz-message-mini" ></div>');
}

function F_Consultar_Imagen(str_tipoConsulta) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset= utf-8",
        url: "Empresa.aspx/F_UltimaImagenTMP_JS",
        dataType: "json",
        success: function (dataObject, textStatus) {
            if (textStatus == "success") {
                var data = dataObject.d;
                var id_imagen = data.ID_Imagen;
                if (data.msg == "") {
                    $('#hid_id_logo').val(id_imagen);
                    $('#idzID').attr('id', id_imagen);
                    F_Botones_Mantenimiento_Unlock();
                } else {
                    toastr.warning(data.msg);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) { },
        async: true
    });
}

function F_Consultar_Imagen_Editar(str_tipoConsulta) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset= utf-8",
        url: "Empresa.aspx/F_UltimaImagenTMP_JS",
        dataType: "json",
        success: function (dataObject, textStatus) {
            if (textStatus == "success") {
                var data = dataObject.d;
                var id_imagen = data.ID_Imagen;
                if (data.msg == "") {
                    $('#hid_id_logo_Edit2').val(id_imagen);
                    $('#EDITidzEDIT').attr('id', id_imagen);
                    F_Botones_Mantenimiento_Unlock();
                } else {
                    toastr.warning(data.msg);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        async: true
    });
}

function F_Consultar_Imagen_Editar2(str_tipoConsulta) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset= utf-8",
        url: "Empresa.aspx/F_UltimaImagenTMP_JS",
        dataType: "json",
        success: function (dataObject, textStatus) {
            if (textStatus == "success") {
                var data = dataObject.d;
                var id_imagen = data.ID_Imagen;
                if (data.msg == "") {
                    $('#hid_id_logo_Edit2').val(id_imagen);
                    $('#EDITidzEDIT').attr('id', id_imagen);
                    F_Botones_Mantenimiento_Unlock();
                } else {
                    toastr.warning(data.msg);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        },
        async: true
    });
}

function F_Botones_Mantenimiento_Unlock() {
    //    $('#btn_man_grabar').removeAttr('disabled');
    //    $('#btn_man_cancelar').removeAttr('disabled');
}

function F_Eliminar_Temporal_Imagen(id_Imagen, str_tipoConsulta) {

    var param = {
        ID_TemporalImagen: id_Imagen
    };

    $.ajax({
        async: true,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Empresa.aspx/F_Eliminar_Temporal_Imagen',
        dataType: "json",
        data: JSON.stringify({ 'objEntidad': param }),
        success: function (dataObject, textStatus) {
            if (textStatus == "success") {
                var data = dataObject.d;
                if (data.msg == "") {

                    if (str_tipoConsulta == 0) {
                        $('#hid_id_logo').val('');
                    } else {
                        $('#hid_id_QR').val('');
                    }

                } else {
                    toastr.warning(data.msg);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        },
        async: false

    });
}

function F_Eliminar_Imagen(id_Imagen, str_tipoConsulta) {

    var param = {
        IdImagenProducto1: id_Imagen
    };

    $.ajax({
        async: true,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Empresa.aspx/F_Eliminar_Imagen',
        dataType: "json",
        data: JSON.stringify({ 'objEntidad': param }),
        success: function (dataObject, textStatus) {
            if (textStatus == "success") {
                var data = dataObject.d;
                if (data.msg == "") {

                    if (str_tipoConsulta == 0) {
                        $('#hid_id_logo').val('');
                    } else {
                        $('#hid_id_QR').val('');
                    }

                } else {
                    toastr.warning(data.msg);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        },
        async: false

    });
}



//agutierrez
function F_VisualizarRegistro(Fila) {

    var imgID = Fila.id;
    var Cuerpo = '#MainContent_';
    var lblcodigo = '#' + imgID.replace('lblNroRuc', 'lblCodEmpresa');
    
    var str_id = $(lblcodigo).text(); if (str_id == "") { str_id = 0; };
    var arrImg = new Array();
    var carga = 0;
    $.ajax({
        async: true,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: "../Digitalizacion/FileDocDB.ashx?IdFile=" + str_id + "&Flag=2&tipo=1" + "&otro=" + Math.round(Math.random()) * 100,
        success: function (data) {
            MostrarEspera(true);
            try
            {
                var obj = $.parseJSON(data);
                $.each(obj, function (index, item) {
                    arrImg.push(item.img);
                });
                F_ArmarListaImagenes(arrImg);
            } catch (x) { toastr.warning('El Producto no tiene Imagenes'); }
            MostrarEspera(false);
        },
        error: function () {
            toastr.warning('Ha ocurrido un error interno, por favor intentelo nuevamente.');
        }
    });
}
//agutierrez
function F_ArmarListaImagenes(arrImg) {
    var lu = $('#luImagenes'); lu.empty();
    
    //imagenes dinamicas por cuadricula
    var med_li = ""; var med_img = "";
    switch (arrImg.length) {
        case 1: med_li = "width:900px; height:450px"; med_img = "max-width:850px; max-height:450px;"; break;
        case 2: med_li = "width:450px; height:450px"; med_img = "max-width:450px; max-height:450px;"; break;
        case 3: med_li = "width:300px; height:200px"; med_img = "max-width:250px; max-height:200px;"; break;
        case 4: med_li = "width:300px; height:200px"; med_img = "max-width:250px; max-height:200px;"; break;
        case 5: med_li = "width:300px; height:200px"; med_img = "max-width:250px; max-height:200px;"; break;
        case 6: med_li = "width:300px; height:200px"; med_img = "max-width:250px; max-height:200px;"; break;
        case 7: med_li = "width:225px; height:200px"; med_img = "max-width:175px; max-height:200px;"; break;
        case 8: med_li = "width:225px; height:200px"; med_img = "max-width:175px; max-height:200px;"; break;
        case 9: med_li = "width:225px; height:135px"; med_img = "max-width:175px; max-height:135px;"; break;
        case 10: med_li = "width:225px; height:105px"; med_img = "max-width:175px; max-height:105px;"; break;
        case 11: med_li = "width:225px; height:105px"; med_img = "max-width:175px; max-height:105px;"; break;
        case 12: med_li = "width:225px; height:105px"; med_img = "max-width:175px; max-height:105px;"; break;
        default: med_li = "width:300px; height:200px"; med_img = "max-width:250px; max-height:200px;"; break;
    }

    $.each(arrImg, function (key, value) {

        var fmt =   ' <li class="li-float" style="' + med_li + '"> ' +
                    '     <a href=' + value + '  ' +
                    '         target="_blank" ' +
                    '         rel="nofollow"  ' +
                    '         style="background-image: url(' + value + ');"> ' +
                    '         <img src="' + value + '" class="li-img" style="' + med_img +' margin: 0 auto" alt="Imagen 1"/> ' +
                    '      </a> ' +
                    ' </li> ';
        lu.append(fmt)
    });

    $("#divVisualizarImagen").dialog({
        resizable: false,
        modal: true,
        title: "Visualización del logo de la empresa",
        title_html: true,
        width: 1100,
        height: 550,
        autoOpen: false
    });

    $('#divVisualizarImagen').dialog('open');
}



