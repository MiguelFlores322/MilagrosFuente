var AppSession = "../Maestros/Perfiles.aspx";
var myDropzone = null;
var mydropzone_Edit = null;

var CodigoMenu = 1000;
var CodigoInterno = 9;

$(document).ready(function () {
    if (!F_SesionRedireccionar(AppSession)) return false;

    document.onkeydown = function (evt) {
        return (evt ? evt.which : event.keyCode) != 13;
    }

    $('#divTabs').tabs();

    F_Inicializar();

    $('#MainContent_txtDescripcionEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcion').css('background', '#FFFFE0');

    $('#MainContent_txtDescripcionConsulta').css('background', '#FFFFE0');

    $('#MainContent_txtCodFamiliaEdicion').css('background', '#FFFFE0');

    $('#MainContent_ddlUsuario').css('background', '#FFFFE0');

    $('#MainContent_ddlMenu').css('background', '#FFFFE0');

    $('#MainContent_txtNombreUsuario').css('background', '#FFFFE0');

    $('#MainContent_txtClave').css('background', '#FFFFE0');

    $('#MainContent_txtClaveOperacionesEspeciales').css('background', '#FFFFE0');

    $('#MainContent_txtApellidos').css('background', '#FFFFE0');

    $('#MainContent_txtNombres').css('background', '#FFFFE0');

    $('#MainContent_ddlTipo').css('background', '#FFFFE0');

    $('#MainContent_ddlEstadoEdicion').css('background', '#FFFFE0');

    $('#MainContent_ddlCargoEdicion').css('background', '#FFFFE0');

    $('#MainContent_txtNroDni').css('background', '#FFFFE0');

    $('#MainContent_ddlCajaFisica').css('background', '#FFFFE0');

    $('#MainContent_ddlUsuarioCopiar').css('background', '#FFFFE0');
    
    
    $("#div_accesosremotos").dialog({
        resizable: false,
        modal: true,
        title: "Accesos Remotos de Usuarios",
        title_html: true,
        height: 330,
        width: 720,
        autoOpen: false
    });

    $('#div_accesosremotos').dialog('close');



    $("#MainContent_chkUsuario").change(function () {
        F_Ini_ComboUsuario();
    });

});

//Inicializador de Componentes
function F_Inicializar() {
    if (!F_SesionRedireccionar(AppSession)) return false;

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Inicializar_NET',
        data: "{'CodEstado':'0'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                $('#MainContent_ddlUsuario').empty();
                $.each(data.lUsuario, function (index, item) {
                    if (item.CodEstado === 1)
                        $('#MainContent_ddlUsuario').append($("<option></option>").val(item.CodUsuario).html(item.NombreUsuario + ' ' + item.Perfil));
                });
            }
            catch (x) { alertify.log('ERROR AL CARGAR LOS USUARIOS'); }

            try {
                $('#MainContent_ddlUsuarioCopiar').empty();
                $.each(data.lUsuarioCopiar, function (index, item) {
                    if (item.CodEstado === 1)
                        $('#MainContent_ddlUsuarioCopiar').append($("<option></option>").val(item.CodUsuario).html(item.NombreUsuario + ' ' + item.Perfil));
                });
            }
            catch (x) { alertify.log('ERROR AL CARGAR LOS USUARIOS'); }

            try {
                $('#MainContent_ddlMenu').empty();
                $.each(data.lMenu, function (index, item) {
                    $('#MainContent_ddlMenu').append($("<option></option>").val(item.CodigoMenu).html(item.DscMenu));
                });
            }
            catch (x) { alertify.log('ERROR AL CARGAR LOS MENUES'); }

            try {
                $('#MainContent_ddlCajaFisica').empty();
                $.each(data.lCajas, function (index, item) {
                    $('#MainContent_ddlCajaFisica').append($("<option></option>").val(item.CodCajaFisica).html(item.Descripcion));
                });
            }
            catch (x) { alertify.log('ERROR AL CARGAR LAS CAJAS'); }

            F_PaginasPermisos(data.lPermisos);

            F_Ini_OtrosCombos();

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





    F_Buscar();
    return true;
}
function F_Ini_ComboUsuario() {
    var CodEstado =1;
    if ($('#MainContent_chkUsuario').is(':checked'))
        CodEstado=2

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Usuario_Listar_NET',
        data: "{'CodEstado':'" + CodEstado + "','FlagActivo':'0'}", //agregar parametro ms de FlagUsuariosInactivos
        
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                $('#MainContent_ddlUsuario').empty();
                $.each(dbObject.d, function (index, item) {
                    $('#MainContent_ddlUsuario').append($("<option></option>").val(item.CodUsuario).html(item.NombreUsuario + ' ' + item.Perfil));
                });
            }
            catch (x) { alertify.log('ERROR AL CARGAR LOS USUARIOS'); }

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
    return true;
}
function F_Ini_ComboMenues() {

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Menu_Listar_NET',
        data: "{'CodEstado':'1'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                $('#MainContent_ddlMenu').empty();
                $.each(dbObject.d, function (index, item) {
                    $('#MainContent_ddlMenu').append($("<option></option>").val(item.CodigoMenu).html(item.DscMenu));
                });
                F_PaginasPermisos_Listar();
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

    return true;
}
function F_Ini_OtrosCombos() {

    //Carga los estados en la pantalla de Agregar Usuario
    F_Conceptos($('#MainContent_ddlEstadoEdicion'), 24);

    F_Cargos(1);

    return true;
}

//procedimiento Generico para cargar Conceptos en combos
function F_Cargos(CodEstado) {

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Cargos_Listar_NET',
        data: "{'CodEstado':'" + CodEstado + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {

                $('#MainContent_ddlCargoEdicion').empty();
                $.each(dbObject.d, function (index, item) {
                    $('#MainContent_ddlCargoEdicion').append($("<option></option>").val(item.CodCargo).html(item.Descripcion));
                });

            }
            catch (x) { alertify.log('ERROR AL CARGAR LOS CONCEPTOS'); }
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

//procedimiento Generico para cargar Conceptos en combos
function F_Conceptos(Control, CodPrincipal) {

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Conceptos_Listar_NET',
        data: "{'CodPrincipal':'" + CodPrincipal + "'}",
        dataType: "json",
        async: false,
        success: function (dbObject) {
            var data = dbObject.d;
            try {

                $(Control).empty();
                $.each(dbObject.d, function (index, item) {
                    $(Control).append($("<option></option>").val(item.CodConcepto).html(item.DscAbvConcepto));
                });

            }
            catch (x) { alertify.log('ERROR AL CARGAR LOS CONCEPTOS'); }
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

//Proceso de Asignación de Permisos
$(document).on("change", "select[id $= 'MainContent_ddlUsuario']", function () {
    TipoOperacion = "Editar";
    F_PaginasPermisos_Listar();
    F_AbrirDropzone_JS();
});
$(document).on("change", "select[id $= 'MainContent_ddlMenu']", function () {
    F_PaginasPermisos_Listar();
});

function F_PaginasPermisos_Listar() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_MenuPaginas_Permisos_Usuarios_NET',
        data: "{'CodUsuario':'" + $('#MainContent_ddlUsuario').val() + "','CodigoMenu':'" + $('#MainContent_ddlMenu').val() + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            F_PaginasPermisos(dbObject.d);
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

function F_PaginasPermisos(Lista) {
    try {
        //Limpio y Reconstruyo la table
        $('#tab_Permisos').empty();
        var html = '<thead><tr> ' +
                            '<th></th> ' + 
                            '<th style="width:400px">Pagina</th> ' + 
                            '<th style="width:60px">Permiso</th> ' + 
                            '<th style="width:60px;display:none">Admin</th> ' + 
                            '<th style="width:60px">Registrar</th> ' + 
                            '<th style="width:60px">Consultar</th> ' + 
                            '<th style="width:60px">Editar</th> ' + 
                            '<th style="width:60px">Eliminar</th> ' + 
                            '<th style="width:60px">Anular</th> ' + 
                    '</tr></thead>';
        $(html).appendTo($("#tab_Permisos"));

        $("#div_AvisoAdmin").css('display', 'none');
        if (Lista.length === 0)
            $("#div_AvisoAdmin").css('display', 'block');

        //ciclo de permisos
        $.each(Lista, function (index, item) {

            //Variables
            var namePrincipal = ''; var name = ''; var title = ''; var img = ''; var fnc = '';
            var imgPowerOn = '../Asset/images/poweron.png'; var imgPowerOff = '../Asset/images/poweroff.png';
            var CampoPer = ''; var CampoAdm = ''; var CampoIns = ''; var CampoCon = ''; var CampoEdi = ''; var CampoEli = ''; var CampoAnu = ''; var CampoFun = '';
            var EnabledDisabled = ''; var EnableDisabledBoton = '';
            var nameImgMas = '';

            //Permiso-Solito
            name = 'CodigoPagina_' + item.CodigoPagina; title = 'HABILITADO'; img = imgPowerOn; fnc = 'F_Desactivar';
            if (item.Permiso === 0) { title = 'SIN PERMISO'; img = imgPowerOff; fnc = 'F_Activar'; EnabledDisabled = 'display:none;'; }
            CampoPer = '<input type="image" id="' + name + '" title="' + title + '" src="' + img + '" onclick="' + fnc + '(this.id); return false;" style="height:15px;width:28px;">';
            namePrincipal = name;
            //-----------------------
            //Administrador de Pagina
            name = 'AdminPagina_' + item.CodigoPagina; title = 'HABILITADO'; img = imgPowerOn; fnc = 'F_DesactivarOtrasOpciones';
            if (item.Administrador === 0) { title = 'SIN PERMISO'; img = imgPowerOff; fnc = 'F_ActivarOtrasOpciones'; }
            EnableDisabledBoton = ""; if (EnabledDisabled === "display:none;") EnableDisabledBoton = EnabledDisabled; else { if (item.Administrador === -1) EnableDisabledBoton = "display:none;"; }
            CampoAdm = '<input type="image" id="' + name + '" title="' + title + '" src="' + img + '" onclick="' + fnc + '(this.id, 1); return false;" style="height:15px;width:28px;' + EnableDisabledBoton + '" >';
            //Insertar
            name = 'InsertarPagina_' + item.CodigoPagina; title = 'HABILITADO'; img = imgPowerOn; fnc = 'F_DesactivarOtrasOpciones';
            if (item.Insertar === 0) { title = 'SIN PERMISO'; img = imgPowerOff; fnc = 'F_ActivarOtrasOpciones'; }
            EnableDisabledBoton = ""; if (EnabledDisabled === "display:none;") EnableDisabledBoton = EnabledDisabled; else { if (item.Insertar === -1) EnableDisabledBoton = "display:none;"; }
            CampoIns = '<input type="image" id="' + name + '" title="' + title + '" src="' + img + '" onclick="' + fnc + '(this.id, 2); return false;" style="height:15px;width:28px;' + EnableDisabledBoton + '">';
            //Consultar
            name = 'ConsultarPagina_' + item.CodigoPagina; title = 'HABILITADO'; img = imgPowerOn; fnc = 'F_DesactivarOtrasOpciones';
            if (item.Consultar === 0) { title = 'SIN PERMISO'; img = imgPowerOff; fnc = 'F_ActivarOtrasOpciones'; }
            EnableDisabledBoton = ""; if (EnabledDisabled === "display:none;") EnableDisabledBoton = EnabledDisabled; else { if (item.Consultar === -1) EnableDisabledBoton = "display:none;"; }
            CampoCon = '<input type="image" id="' + name + '" title="' + title + '" src="' + img + '" onclick="' + fnc + '(this.id, 3); return false;" style="height:15px;width:28px;' + EnableDisabledBoton + '">';
            //Editar
            name = 'EditarPagina_' + item.CodigoPagina; title = 'HABILITADO'; img = imgPowerOn; fnc = 'F_DesactivarOtrasOpciones';
            if (item.Editar === 0) { title = 'SIN PERMISO'; img = imgPowerOff; fnc = 'F_ActivarOtrasOpciones'; }
            EnableDisabledBoton = ""; if (EnabledDisabled === "display:none;") EnableDisabledBoton = EnabledDisabled; else { if (item.Editar === -1) EnableDisabledBoton = "display:none;"; }
            CampoEdi = '<input type="image" id="' + name + '" title="' + title + '" src="' + img + '" onclick="' + fnc + '(this.id, 4); return false;" style="height:15px;width:28px;' + EnableDisabledBoton + '">';
            //Eliminar
            name = 'EliminarPagina_' + item.CodigoPagina; title = 'HABILITADO'; img = imgPowerOn; fnc = 'F_DesactivarOtrasOpciones';
            if (item.Eliminar === 0) { title = 'SIN PERMISO'; img = imgPowerOff; fnc = 'F_ActivarOtrasOpciones'; }
            EnableDisabledBoton = ""; if (EnabledDisabled === "display:none;") EnableDisabledBoton = EnabledDisabled; else { if (item.Eliminar === -1) EnableDisabledBoton = "display:none;"; }
            CampoEli = '<input type="image" id="' + name + '" title="' + title + '" src="' + img + '" onclick="' + fnc + '(this.id, 5); return false;" style="height:15px;width:28px;' + EnableDisabledBoton + '">';
            //Anular
            name = 'AnularPagina_' + item.CodigoPagina; title = 'HABILITADO'; img = imgPowerOn; fnc = 'F_DesactivarOtrasOpciones';
            if (item.Anular === 0) { title = 'SIN PERMISO'; img = imgPowerOff; fnc = 'F_ActivarOtrasOpciones'; }
            EnableDisabledBoton = ""; if (EnabledDisabled === "display:none;") EnableDisabledBoton = EnabledDisabled; else { if (item.Anular === -1) EnableDisabledBoton = "display:none;"; }
            CampoAnu = '<input type="image" id="' + name + '" title="' + title + '" src="' + img + '" onclick="' + fnc + '(this.id, 6); return false;" style="height:15px;width:28px;' + EnableDisabledBoton + '">';

            var subtabla = '';
            nameImgMas = 'imgMas' + item.CodigoPagina;
            var estructuraSubtabla =
            ' <img id="' + nameImgMas + '" alt="" style="cursor: pointer" src="../Asset/images/plus.gif" onclick="imgMas_Click(this);" title="Ver Detalle"> ' +
            ' <div id="MainContent_grvConsulta_pnlOrders_0" style="display:none"> ' +
            ' <div> ' +
            ' 	<table cellspacing="1" cellpadding="0" border="0" class="GridView" id="MainContent_grvConsulta_grvDetalle_0"> ' +
            ' 		<tbody><tr> ' +
            ' 			<th align="center" scope="col">Funcion</th><th style="width:50px;" align="center" scope="col">Permiso</th> ' +
            ' 		</tr> @Cuerpo' +
            ' 		 ' +
            ' 	</tbody></table> ' +
            ' </div> ' +
            ' </div> ';
            $.each(item.Funciones, function (index2, item2) {

                //Funcion
                name = 'CodigoPagina_' + item2.IdFuncion; title = 'HABILITADO'; img = imgPowerOn; fnc = 'F_DesactivarOtrasOpciones';
                if (item2.Permiso === 0) { title = 'SIN PERMISO'; img = imgPowerOff; fnc = 'F_ActivarOtrasOpciones'; }
                CampoFun = '<input type="image" id="' + name + '" title="' + title + '" src="' + img + '" onclick="' + fnc + '(this.id, 9); return false;" style="height:14px;width:28px;' + EnabledDisabled + '">';

                subtabla = subtabla +
                ' 		<tr style="height:5px;"> ' +
                ' 			<td align="left">' + item2.DscPagina + '</td> <td>' + CampoFun + ' </td> ' +
                ' 		</tr> ';
            });

            if (subtabla != '')
                subtabla = estructuraSubtabla.replace('@Cuerpo', subtabla);


            html = '<tr>' +
                    '<td>' + subtabla + '</td>' +
                    '<td>' + item.DscPagina + '</td>' +
                    '<td> <center>' + CampoPer + '</center></td>' +
                    '<td style="display:none"> <center>' + CampoAdm + '</center></td>' +
                    '<td> <center>' + CampoIns + '</center></td>' +
                    '<td> <center>' + CampoCon + '</center></td>' +
                    '<td> <center>' + CampoEdi + '</center></td>' +
                    '<td> <center>' + CampoEli + '</center></td>' +
                    '<td> <center>' + CampoAnu + '</center></td>' +
                    '</tr>';
            $(html).appendTo($("#tab_Permisos"))

            if (subtabla != '')
                imgMas_Click($('#' + nameImgMas));

        });
        /// <reference path="" />
    }
    catch (x) { alertify.log('ERROR AL CARGAR LOS MENUES'); }
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
// QUE ESTA PASANDO ACA->PREGUNTAR A ADRIAN
function F_Activar(Pagina) {
    //if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Editar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
    var CodigoPagina = Pagina.replace('CodigoPagina_', '');

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Activar_Permisos_Usuarios_NET',
        data: "{'CodUsuario':'" + $('#MainContent_ddlUsuario').val() + "','CodigoPagina':'" + CodigoPagina + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('PERMISO ASIGNADO');
                    F_PaginasPermisos_Listar();
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
// QUE ESTA PASANDO ACA->PREGUNTAR A ADRIAN
function F_Desactivar(Pagina) {
    //if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Editar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
    var CodigoPagina = Pagina.replace('CodigoPagina_', '');

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Desactivar_Permisos_Usuarios_NET',
        data: "{'CodUsuario':'" + $('#MainContent_ddlUsuario').val() + "','CodigoPagina':'" + CodigoPagina + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('PERMISO ELIMINADO');
                    F_PaginasPermisos_Listar();
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
// QUE ESTA PASANDO ACA ->PREGUNTAR A ADRIAN
function F_ActivarOtrasOpciones(Pagina, Funcion) {
    var CodigoPagina = Pagina.split('_')[1];
    var fn = '';
    switch (Funcion) {
        case 1: fn = 'Administrador'; break;
        case 2: fn = 'Insertar'; break;
        case 3: fn = 'Consultar'; break;
        case 4: fn = 'Editar'; break;
        case 5: fn = 'Eliminar'; break;
        case 6: fn = 'Anular'; break;
        case 9: fn = 'Funcion'; break;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_ActivarOtrasOpciones_Permisos_Usuarios_NET',
        data: "{'CodUsuario':'" + $('#MainContent_ddlUsuario').val() + "','CodigoPagina':'" + CodigoPagina + "','Funcion':'" + fn + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('PERMISO ASIGNADO');
                    F_PaginasPermisos_Listar();
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

function F_DesactivarOtrasOpciones(Pagina, Funcion) {
    var CodigoPagina = Pagina.split('_')[1];
    var fn = '';
    switch (Funcion) {
        case 1: fn = 'Administrador'; break;
        case 2: fn = 'Insertar'; break;
        case 3: fn = 'Consultar'; break;
        case 4: fn = 'Editar'; break;
        case 5: fn = 'Eliminar'; break;
        case 6: fn = 'Anular'; break;
        case 9: fn = 'Funcion'; break;
    }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_DesactivarOtrasOpciones_Permisos_Usuarios_NET',
        data: "{'CodUsuario':'" + $('#MainContent_ddlUsuario').val() + "','CodigoPagina':'" + CodigoPagina + "','Funcion':'" + fn + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('PERMISO ELIMINADO');
                    F_PaginasPermisos_Listar();
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


//Proceso de Agregar usuario
var TipoOperacion = '';
var divEdicionRegistro_height = 400;
var divEdicionRegistro_width = 730;
function F_Agregar() {
    if (!F_SesionRedireccionar(AppSession)) return false;
    
    TipoOperacion = "Agregar";
    $('#MainContent_txtNombreUsuario').prop('disabled', false);
    if (TipoOperacion = "Agregar")
        $('#MainContent_ddlUsuarioCopiar').prop("disabled", false);
    
    F_LimpiarCampos();

    $("#divEdicionRegistro").dialog({
        resizable: false,
        modal: true,
        title: "creacion de Usuario",
        title_html: true,
        height: divEdicionRegistro_height,
        width: divEdicionRegistro_width,
        autoOpen: false
    });


    $('#divEdicionRegistro').dialog('open');

}
//Proceso de Editar Usuario
function F_Editar() {
    if (!F_SesionRedireccionar(AppSession)) return false;
//    if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Editar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informac
    TipoOperacion = "Editar";

    if (TipoOperacion="Editar")
        $('#MainContent_ddlUsuarioCopiar').prop("disabled", true);

    


    F_LimpiarCampos();

    $("#divEdicionRegistro").dialog({
        resizable: false,
        modal: true,
        title: "Edicion de Usuario",
        title_html: true,
        height: divEdicionRegistro_height,
        width: divEdicionRegistro_width,
        autoOpen: false
    });

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Usuario_Obtener_NET',
        data: "{'CodUsuario':'" + $('#MainContent_ddlUsuario').val() + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    $('#MainContent_txtNombreUsuario').val(data.NombreUsuario.trim());
                    $('#MainContent_txtClave').val(data.Clave.trim());
                    //$('#MainContent_txtClaveOperacionesEspeciales').val(data.ClaveOperacionesEspeciales.trim());
                    $('#MainContent_txtApellidos').val(data.Apellidos.trim());
                    $('#MainContent_txtNombres').val(data.Nombre.trim());
                    $('#MainContent_ddlTipo').val(data.Tipo.trim());
                    $('#MainContent_ddlEstadoEdicion').val(data.CodEstado);
                    $('#MainContent_ddlCargoEdicion').val(data.CodCargo);
                    $('#MainContent_txtNroDni').val(data.NroDni);
                    $('#MainContent_ddlCajaFisica').val(data.CodCajaFisica);
                    idImagenBuff = data.IdImagen;
                    F_AbrirDropzone_JS();
//                    if (data.CodEstado == 1)
//                        $('#MainContent_grvAlmacenes_chkAlmacen_0').prop("checked", true);
                    
                    F_checkeditar();
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
//Proceso de Grabar Usuario
function F_Grabar() {
    var chkSi = '';
    var arrAlmacen = new Array();
    var hfCodAlmacen = '';

    if (!F_SesionRedireccionar(AppSession)) return false;
    var CodUsuario = 0;
    if (TipoOperacion == "Editar")
        CodUsuario = $('#MainContent_ddlUsuario').val();
    if (TipoOperacion == "Agregar")
        CodUsuariocopiar = $('#MainContent_ddlUsuarioCopiar').val();
    if (TipoOperacion == "Editar")
        CodUsuariocopiar = 0;

  // if (TipoOperacion != "Editar")
  //     if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Editar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion
  // else
  //     if (F_PermisoOpcion(CodigoMenu, CodigoInterno, 'Insertar') === "0") return false; //Entra a /Scripts/Utilitarios.js.F_PermisosOpcion para mas informacion

    if (F_ValidarGrabar() == false)
        return false;

    var UsuarioCE = {};
    UsuarioCE["CodUsuario"] = Number(CodUsuario);
    UsuarioCE["NombreUsuario"] = $('#MainContent_txtNombreUsuario').val();
    UsuarioCE["Clave"] = $('#MainContent_txtClave').val();
    UsuarioCE["ClaveOperacionesEspeciales"] = $('#MainContent_txtClaveOperacionesEspeciales').val();
    UsuarioCE["Apellidos"] = $('#MainContent_txtApellidos').val();
    UsuarioCE["Nombre"] = $('#MainContent_txtNombres').val();
    UsuarioCE["Tipo"] = $('#MainContent_ddlTipo').val();
    UsuarioCE["CodEstado"] = Number($('#MainContent_ddlEstadoEdicion').val());
    UsuarioCE["CodCargo"] = Number($('#MainContent_ddlCargoEdicion').val());
    UsuarioCE["NroDni"] = $('#MainContent_txtNroDni').val();
    UsuarioCE["CodCajaFisica"] = $('#MainContent_ddlCajaFisica').val();
    UsuarioCE["CodUsuarioCopiar"]=Number(CodUsuariocopiar);
    UsuarioCE["IdImagen"] = $('#hid_id_logo').val();
    $('#MainContent_grvAlmacenes .checks :checkbox').each(function () {
        chkSi = '#' + this.id;
        hfCodAlmacen = chkSi.replace('chkAlmacen', 'hfCodalmacen');
        if ($(chkSi).is(':checked')) {
            var objDetalle = {
                CodAlmacen: $(hfCodAlmacen).val()
            };
            arrAlmacen.push(objDetalle);
        }
    });

    
        UsuarioCE["AlmacenCod"]= Sys.Serialization.JavaScriptSerializer.serialize(arrAlmacen);
        
    
    


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Usuario_Grabar_NET',
        data: JSON.stringify(UsuarioCE),
        dataType: "json",
        async: false,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('SE GRABO CORRECTAMENTE');

                    if (TipoOperacion == "Agregar") {
                        F_Inicializar();
                    } if (TipoOperacion == "Editar") {
                        F_Inicializar();
                    } else {
                        F_PaginasPermisos_Listar();
                    }

                    F_LimpiarCampos();
                    $('#divEdicionRegistro').dialog('close');
                    $('#MainContent_chkUsuario').prop('checked',false)
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


}

function F_ValidarGrabar() {
    try {
        var Cuerpo = '#MainContent_';
        var Cadena = 'Ingresar los sgtes. Datos:';

        if ($(Cuerpo + 'txtNombreUsuario').val().trim() == '')
            Cadena = Cadena + '<p></p>' + 'USUARIO';

        if ($(Cuerpo + 'txtClave').val().trim() == '')
            Cadena = Cadena + '<p></p>' + 'CLAVE';

        if ($(Cuerpo + 'ddlEstadoEdicion').val() == 0 || $(Cuerpo + 'ddlEstadoEdicion').val() == null)
            Cadena = Cadena + '<p></p>' + 'Estado';

        if ($(Cuerpo + 'ddlCargoEdicion').val() === 0 || $(Cuerpo + 'ddlCargoEdicion').val() === null)
            Cadena = Cadena + '<p></p>' + 'Cargo';

        if ($(Cuerpo + 'ddlCargoEdicion').val() != 0) {

            if ($(Cuerpo + 'txtNroDni').val().trim() === '')
                Cadena = Cadena + '<p></p>' + 'SI ES EMPLEADO EL NRO DNI ES OBLIGATORIO';

            if ($(Cuerpo + 'txtApellidos').val().trim() === '')
                Cadena = Cadena + '<p></p>' + 'SI ES EMPLEADO EL APELLIDO ES OBLIGATORIO';

            if ($(Cuerpo + 'txtNombres').val().trim() === '')
                Cadena = Cadena + '<p></p>' + 'SI ES EMPLEADO EL NOMBRE ES OBLIGATORIO';
        }

        if ($(Cuerpo + 'txtNroDni').val().trim() != '')
            if (!ValidarRuc($(Cuerpo + 'txtNroDni').val()))
                Cadena = Cadena + "\n" + "Ruc Invalido";

        if ($(Cuerpo + 'ddlCajaFisica').val() == null)
            Cadena = Cadena + '<p></p>' + 'Caja';

        var chkSi = '';
        var x = 0;

        $('#MainContent_grvAlmacenes .checks :checkbox').each(function () {
            chkSi = '#' + this.id;

            if ($(chkSi).is(':checked'))
                x = 1;

        });

        if (x == 0) {
            Cadena=Cadena+ '<p></p>' + 'Seleccione Almenos una Sucursal';
            
        }
        

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

function F_LimpiarCampos() {
    $('#MainContent_txtNombreUsuario').val("");
    $('#MainContent_txtClave').val("");
    //$('#MainContent_txtClaveOperacionesEspeciales').val("");
    $('#MainContent_txtApellidos').val("");
    $('#MainContent_txtNombres').val("");
    $('#MainContent_ddlTipo').val("NOR");
    $('#MainContent_ddlEstadoEdicion').val("1");
    $('#MainContent_ddlCargoEdicion').val("0");
    $('#MainContent_ddlCajaFisica').val("0");
    $('#hid_id_logo').val("0");
    $('#MainContent_txtNroDni').val("");
    idImagenBuff = 0;
    F_AbrirDropzone_JS();
    F_checkeditar();
    return true;
}

function ValidarRuc(valor) {
    valor = trim(valor)
    if (esnumero(valor)) {
        if (valor.length < 11) {
            if (valor.length == 8)
                return true;
            //            }
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
function esnumero(campo) { return (!(isNaN(campo))); }



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


//Procedimiento para abrir el dropZone
function F_CrearDropzone_JS() {
    var midiv = document.createElement("div");
    midiv.setAttribute("id", "mydropzone");
    midiv.setAttribute("class", "dropzone");
    midiv.setAttribute("style", "width:150px; height:190; margin-left: 1px; border-radius:12px; min-height:133px; padding:0px;");
    document.getElementById('drop').appendChild(midiv);
}

var idImagenBuff = '0';
function F_AbrirDropzone_JS() {

    try { $('#mydropzone').remove(); }
    catch (x) { }



    F_CrearDropzone_JS();

    var str_id = "0";
//        if ($('#MainContent_ddlUsuario').val() == 0)
            if (str_id == '')
    if (TipoOperacion == "Agregar")
         str_id = '0';

    if (TipoOperacion == "Editar")
        str_id = $('#MainContent_ddlUsuario').val();
    
    
     

    myDropzone = new Dropzone("#mydropzone", {
        url: "Perfiles.aspx",
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
                            alertify.log("EL LOGO : " + file.name + " YA SE ENCUENTRA REGISTRADO.");
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
                //var idn = id[1].toString().replace(".jpg", "");
                //F_Eliminar_Temporal_Imagen(idn);
                $('#hid_id_logo').val('0');

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

                        if (idImagenBuff != '0') {
                            $('#hid_id_logo').val(idImagenBuff);
                        }
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
                    alertify.log('Ha ocurrido un error interno, por favor intentelo nuevamente.');
                }
            });

            return false;
        }
    });

    $(".dz-message").remove();
    $("#mydropzone").append('<div class="dz-default dz-message-mini" ></div>');


}


function F_Consultar_Imagen(str_tipoConsulta) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset= utf-8",
        url: "Perfiles.aspx/F_UltimaImagenTMP_JS",
        dataType: "json",
        success: function (dataObject, textStatus) {
            if (textStatus == "success") {
                var data = dataObject.d;
                var id_imagen = data.ID_Imagen;
                if (data.msg == "") {

                    if (idImagenBuff != '0' & id_imagen === '') {
                        id_imagen = idImagenBuff;
                    }

                    $('#hid_id_logo').val(id_imagen);
                    $('#idzID').attr('id', id_imagen);
                    F_Botones_Mantenimiento_Unlock();
                } else {
                    alertify.log(data.msg);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) { },
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
        url: 'Perfiles.aspx/F_Eliminar_Temporal_Imagen',
        dataType: "json",
        data: JSON.stringify({ 'objEntidad': param }),
        success: function (dataObject, textStatus) {
            if (textStatus == "success") {
                var data = dataObject.d;
                if (data.msg == "") {

                    if (str_tipoConsulta == 0) {
                        $('#hid_id_logo').val('');
                        idImagenBuff = 0;
                    } else {
                        $('#hid_id_QR').val('');
                    }

                } else {
                    alertify.log(data.msg);
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
        url: 'Perfiles.aspx/F_Eliminar_Imagen',
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
                    alertify.log(data.msg);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        },
        async: false

    });
}

//mostrar los 3 almacenes

function F_Buscar() {

    try {
        var objParams = {
            Filtro_Descripcion: ""
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

                F_Update_Division_HTML('div_Almacenes', result.split('~')[2]);
                
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

function checkAll(objRef) {
    var checkallid = '#' + objRef.id;

    if ($(checkallid).is(':checked'))
        $('#MainContent_grvAlmacenes input:checkbox').prop('checked', true);
    else
        $('#MainContent_grvAlmacenes input:checkbox').prop('checked', false);
}
// joel 08/04/21c
function F_checkeditar() {


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Check_Editar',
        data: "{'CodUsuario':'" + $('#MainContent_ddlUsuario').val() + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {

                $.each(dbObject.d, function (index, item) {

                    //                    $('#MainContent_grvAlmacenes_chkAlmacen_0').prop("checked", true);
                    if (item.CodEstado == 1 && TipoOperacion == "Editar") {
                        $('#MainContent_grvAlmacenes_chkAlmacen_' + (item.CodAlmacen - 1)).prop("checked", true);
                    }
                    else if (TipoOperacion == "Agregar")
                        $('#MainContent_grvAlmacenes_chkAlmacen_' + (item.CodAlmacen - 1)).prop("checked", false);
                });


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

function F_EliminarUsuario(Fila) {
 
    var imgID = Fila.id;
    var ddlUsuario = '#' + imgID.replace('imgAnularDocumento', 'ddlUsuario');

    if (!confirm("ESTA SEGURO DE ELIMINAR EL USUARIO : " + $('#MainContent_ddlUsuario option:selected').text()))
        return false;

    var UsuarioCE = {};
    UsuarioCE["Usuario"] = $('#MainContent_ddlUsuario option:selected').text();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_EliminarUsuario',
        data: JSON.stringify(UsuarioCE),
        dataType: "json",
        async: false,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "EL USUARIO SE HA ELIMINADO") {
                    alertify.log(data.MsgError);
                    F_Inicializar();
                   
                } else {
                    alertify.log(data.MsgError);
                    console.log(data.MsgError);
                }
            }
            catch (x) { alertify.log('ERROR AL ELIMINAR'); }
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






















function F_AccesosRemotos_Listar() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_UsuariosDispositivos_Listar_NET',
        data: "{'CodUsuario':'" + $('#MainContent_ddlUsuario').val() + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            F_AccesosRemotos(dbObject.d);
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
function F_AccesosRemotos(Lista) {
    try {
        //Limpio y Reconstruyo la table
        $('#tab_AccesosRemotos').empty();
        var html = '<thead><tr><th style="width:100px">Ult. Intento</th><th style="width:450px">Accesos Remotos</th><th style="width:50px">Eliminar</th><th>Permiso</th></tr></thead>';
        $(html).appendTo($("#tab_AccesosRemotos"));

        //ciclo de permisos
        $.each(Lista, function (index, item) {

            var name = 'EliminarId_' + item.id;
            var title = 'ELIMINAR'; var img = '../Asset/images/EliminarBtn.png'; var fnc = 'F_EliminarAccesoRemoto';
            var Campoeli = '<input type="image" id="' + name + '" title="' + title + '" src="' + img + '" onclick="' + fnc + '(this.id); return false;" style="height:20px;width:20px;">';

            name = 'ActivarId_' + item.id;
            title = 'HABILITADO'; img = '../Asset/images/poweron.png'; var fnc = 'F_DesactivarAccesoRemoto';
            if (item.Permiso === 0) {
                title = 'SIN PERMISO'; img = '../Asset/images/poweroff.png'; fnc = 'F_ActivarAccesoRemoto';
            }
            var Campoimg = '<input type="image" id="' + name + '" title="' + title + '" src="' + img + '" onclick="' + fnc + '(this.id); return false;" style="height:20px;width:35px;">';

            html = '<tr>' +
                    '<td>' + item.FechaUltimoIngreso2 + '</td>' +
                    '<td>' + item.IdRemoto + '</td>' +
                    '<td> <center>' + Campoeli + '</center></td>' +
                    '<td> <center>' + Campoimg + '</center></td>' +
                    '</tr>';
            $(html).appendTo($("#tab_AccesosRemotos"))
        });
        /// <reference path="" />

        $('#div_accesosremotos').dialog('open');
    

    }
    catch (x) { alertify.log('ERROR AL CARGAR LOS MENUES'); }
}

function F_ActivarAccesoRemoto(Pagina) {
    var CodigoPagina = Pagina.replace('ActivarId_', '');

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Activar_AccesosRemotos_NET',
        data: "{'id':'" + CodigoPagina + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('PERMISO ASIGNADO');
                    F_AccesosRemotos_Listar();
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

function F_DesactivarAccesoRemoto(Pagina) {
    var CodigoPagina = Pagina.replace('ActivarId_', '');

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Desactivar_AccesosRemotos_NET',
        data: "{'id':'" + CodigoPagina + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('PERMISO DESHABILITADO');
                    F_AccesosRemotos_Listar();
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


function F_EliminarAccesoRemoto(Pagina) {
    var CodigoPagina = Pagina.replace('EliminarId_', '');

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Eliminar_AccesosRemotos_NET',
        data: "{'id':'" + CodigoPagina + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('PERMISO DESHABILITADO');
                    F_AccesosRemotos_Listar();
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

























function F_UsuariosAuxiliares_Listar() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_UsuariosAuxiliares_Listar_NET',
        data: "{'CodUsuario':'" + $('#MainContent_ddlUsuario').val() + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            F_UsuariosAuxiliares(dbObject.d);
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
function F_UsuariosAuxiliares(Lista) {
    try {
        //Limpio y Reconstruyo la table
        $('#tab_UsuariosAuxiliares').empty();
        var html = '<thead><tr><th style="width:100px">Ult. Intento</th><th style="width:450px">Accesos Remotos</th><th style="width:50px">Eliminar</th><th>Permiso</th></tr></thead>';
        $(html).appendTo($("#tab_UsuariosAuxiliares"));

        //ciclo de permisos
        $.each(Lista, function (index, item) {

            var name = 'EliminarId_' + item.id;
            var title = 'ELIMINAR'; var img = '../Asset/images/EliminarBtn.png'; var fnc = 'F_EliminarAccesoRemoto';
            var Campoeli = '<input type="image" id="' + name + '" title="' + title + '" src="' + img + '" onclick="' + fnc + '(this.id); return false;" style="height:20px;width:20px;">';

            name = 'ActivarId_' + item.id;
            title = 'HABILITADO'; img = '../Asset/images/poweron.png'; var fnc = 'F_DesactivarAccesoRemoto';
            if (item.Permiso === 0) {
                title = 'SIN PERMISO'; img = '../Asset/images/poweroff.png'; fnc = 'F_ActivarAccesoRemoto';
            }
            var Campoimg = '<input type="image" id="' + name + '" title="' + title + '" src="' + img + '" onclick="' + fnc + '(this.id); return false;" style="height:20px;width:35px;">';

            html = '<tr>' +
                    '<td>' + item.FechaUltimoIngreso2 + '</td>' +
                    '<td>' + item.IdRemoto + '</td>' +
                    '<td> <center>' + Campoeli + '</center></td>' +
                    '<td> <center>' + Campoimg + '</center></td>' +
                    '</tr>';
            $(html).appendTo($("#tab_UsuariosAuxiliares"))
        });
        /// <reference path="" />

        $('#div_UsuariosAuxiliares').dialog('open');


    }
    catch (x) { alertify.log('ERROR AL CARGAR LOS MENUES'); }
}

function F_ActivarAccesoRemoto(Pagina) {
    var CodigoPagina = Pagina.replace('ActivarId_', '');

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Activar_UsuariosAuxiliares_NET',
        data: "{'id':'" + CodigoPagina + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('PERMISO ASIGNADO');
                    F_UsuariosAuxiliares_Listar();
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

function F_DesactivarAccesoRemoto(Pagina) {
    var CodigoPagina = Pagina.replace('ActivarId_', '');

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Desactivar_UsuariosAuxiliares_NET',
        data: "{'id':'" + CodigoPagina + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('PERMISO DESHABILITADO');
                    F_UsuariosAuxiliares_Listar();
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


function F_EliminarAccesoRemoto(Pagina) {
    var CodigoPagina = Pagina.replace('EliminarId_', '');

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'Perfiles.aspx/F_Eliminar_UsuariosAuxiliares_NET',
        data: "{'id':'" + CodigoPagina + "'}",
        dataType: "json",
        async: true,
        success: function (dbObject) {
            var data = dbObject.d;
            try {
                if (data.MsgError === "") {
                    alertify.log('PERMISO DESHABILITADO');
                    F_UsuariosAuxiliares_Listar();
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