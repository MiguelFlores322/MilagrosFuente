$(document).ready(function () {
    $(".account").click(function () {
        var X = $(this).attr('id');

        if (X == 1) {
            $(".submenu").hide();
            $(this).attr('id', '0');
            $('#lblNombreUsuario').css('color', 'white');
        }
        else {
            $(".submenu").show();
            $(this).attr('id', '1');
            $('#lblNombreUsuario').css('color', 'black');
        }

    });

    //Mouseup textarea false
    $(".submenu").mouseup(function () {
        $('#lblNombreUsuario').css('color', 'white');
        return false
    });
    $(".account").mouseup(function () {
        $('#lblNombreUsuario').css('color', 'white');
        return false
    });


    //Textarea without editing.
    $(document).mouseup(function () {
        $('#lblNombreUsuario').css('color', 'white');
        $(".submenu").hide();
        $(".account").attr('id', '');
    });

    $("#btnSalirSistema").click(function () {

        if (!confirm("¿SALIR DEL SISTEMA?"))
            return false;

        document.location = '../Salir.aspx';
    });

});


function F_Update_Division_HTML(str_nombre_div, str_valor_div) {

    $('#' + str_nombre_div).css('display', 'none');
    $('#' + str_nombre_div).html(str_valor_div);
    $('#' + str_nombre_div).css('display', 'block');

}

function F_General_Inicializar_UserControl_Paginacion(str_nombre_control_paginacion)
{

    $('#' + str_nombre_control_paginacion + '_hid_total_paginas').val(0);
    $('#' + str_nombre_control_paginacion + '_lbl_total_paginas').text(0);
    $('#' + str_nombre_control_paginacion + '_txt_pagina').val(0);

}

function F_General_Validar_UserControl_Paginacion(str_nombre_control_paginacion) {

    var str_pagina_actual;
    var str_pagina_total;

    str_pagina_actual = $('#' + str_nombre_control_paginacion + "_txt_pagina").val();
    str_pagina_total = $("#" + str_nombre_control_paginacion + "_hid_total_paginas").val();

    if (parseInt(str_pagina_actual) > (str_pagina_total)) {

        $('#' + str_nombre_control_paginacion + "_txt_pagina").val(str_pagina_total);

    }
    else {

        if (parseInt(str_pagina_actual) == 0) {

            $('#' + str_nombre_control_paginacion + "_txt_pagina").val("1");

        }
        else {

            $('#' + str_nombre_control_paginacion  + "_txt_pagina").val(str_pagina_actual);

        }

    }

}

function F_General_Validar_Resultado_Busqueda_UserControl_Paginacion(str_nombre_control_paginacion,str_tipo_busqueda,str_valor) {

    $('#' + str_nombre_control_paginacion + '_hid_total_paginas').val(str_valor);
    $('#' + str_nombre_control_paginacion + '_lbl_total_paginas').text(str_valor);

    if (str_tipo_busqueda == "0" & str_valor != "0") {

        //una nueva busqueda

        $('#' + str_nombre_control_paginacion + '_txt_pagina').val(1);

    }
    else {

        if (str_valor == "0") {

            $('#' + str_nombre_control_paginacion + '_txt_pagina').val(0);

        }

    }

}

function F_General_Limpiar_Control_Buscador_Instituto(str_contro_busqueda_instituto)
{

    $('#' + str_contro_busqueda_instituto + '_txt_bus_ins_codigo').val('');
    $('#' + str_contro_busqueda_instituto + '_txt_bus_ins_region').val('');
    $('#' + str_contro_busqueda_instituto + '_txt_bus_ins_descripcion').val('');
    $('#' + str_contro_busqueda_instituto + '_hid_bus_ins_id_instituto').val('');

}

function F_General_Limpiar_Control_Buscador_Docente(str_contro_busqueda_docente) {

    $('#' + str_contro_busqueda_docente + '_txt_bus_codigo').val('');
    $('#' + str_contro_busqueda_docente + '_txt_bus_docente').val('');
    $('#' + str_contro_busqueda_docente + '_hid_bus_id_docente').val('');

    F_General_Limpiar_Control_Buscador_Instituto(str_contro_busqueda_docente + "_" + "txt_bus_instituto");

    $('#' + str_contro_busqueda_docente + '_txt_busqueda').val('');
    
}

function F_General_Limpiar_Control_Buscador_Alumno(str_control_busqueda_alumno) {


    $('#' + str_control_busqueda_alumno + '_txt_bus_codigo').val('');
    $('#' + str_control_busqueda_alumno + '_txt_bus_alumno').val('');
    $('#' + str_control_busqueda_alumno + '_hid_bus_id_alumno').val('');

    F_General_Limpiar_Control_Buscador_Instituto(str_control_busqueda_alumno + "_" + "txt_bus_instituto");

    $('#' + str_control_busqueda_alumno + '_ddl_bus_especialidad').empty();

    $('#' + str_control_busqueda_alumno + '_txt_busqueda').val('');

}

function F_General_Limpiar_Control_Buscador_Curso(str_control_busqueda_curso) {

    $('#' + str_control_busqueda_curso + '_txt_bus_codigo').val('');
    $('#' + str_control_busqueda_curso + '_txt_bus_curso').val('');
    $('#' + str_control_busqueda_curso + '_hid_bus_id_curso').val('');

    $('#' + str_control_busqueda_curso + '_ddl_bus_especialidad').empty();
    $('#' + str_control_busqueda_curso + '_ddl_bus_curricula').empty();
    $('#' + str_control_busqueda_curso + '_txt_curso').val('');
    
}

function F_General_Limpiar_Control_Buscador_Unidad_Didactica(str_control_busqueda_curso) {

    $('#' + str_control_busqueda_curso + '_txt_bus_codigo').val('');
    $('#' + str_control_busqueda_curso + '_txt_bus_curso').val('');
    $('#' + str_control_busqueda_curso + '_hid_bus_id_curso').val('');

    $('#' + str_control_busqueda_curso + '_ddl_bus_especialidad').empty();
    $('#' + str_control_busqueda_curso + '_txt_curso').val('');

}

function F_General_Limpiar_Control_Buscador_Ubigeo(str_control_busqueda_ubigeo) {

    $('#' + str_control_busqueda_ubigeo + '_txt_bus_ubi_cod_ubigeo').val('');
    $('#' + str_control_busqueda_ubigeo + '_txt_bus_ubi_departamento').val('');
    $('#' + str_control_busqueda_ubigeo + '_txt_bus_ubi_provincia').val('');
    $('#' + str_control_busqueda_ubigeo + '_txt_bus_ubi_distrito').val('');
    $('#' + str_control_busqueda_ubigeo + '_hid_bus_id_distrito').val('');

}

function F_General_Asignar_Valores_Control_Buscador_Instituto(str_contro_busqueda_instituto,str_codigo,str_region,str_descripcion,str_id) 
{

    $('#' + str_contro_busqueda_instituto + '_txt_bus_ins_codigo').val(str_codigo);
    $('#' + str_contro_busqueda_instituto + '_txt_bus_ins_region').val(str_region);
    $('#' + str_contro_busqueda_instituto + '_txt_bus_ins_descripcion').val(str_descripcion);
    $('#' + str_contro_busqueda_instituto + '_hid_bus_ins_id_instituto').val(str_id);

}

function F_General_Asignar_Valores_Control_Buscador_Alumno(str_control_busqueda_alumno, str_codigo, str_alumno, str_id_alumno) {

    $('#' + str_control_busqueda_alumno + '_txt_bus_codigo').val(str_codigo);
    $('#' + str_control_busqueda_alumno + '_txt_bus_alumno').val(str_alumno);
    $('#' + str_control_busqueda_alumno + '_hid_bus_id_alumno').val(str_id_alumno);

}

function F_General_Asignar_Valores_Control_Buscador_Docente(str_contro_busqueda_docente, str_dni, str_docente, str_id_docente) {

    $('#' + str_contro_busqueda_docente + '_txt_bus_codigo').val(str_dni);
    $('#' + str_contro_busqueda_docente + '_txt_bus_docente').val(str_docente);
    $('#' + str_contro_busqueda_docente + '_hid_bus_id_docente').val(str_id_docente);
    
}

function F_General_Asignar_Valores_Control_Buscador_Unidad_Didactica(str_control_busqueda_ud, str_codigo, str_unidad_didactica, str_id_ud) {

    $('#' + str_control_busqueda_ud + '_txt_bus_codigo').val(str_codigo);
    $('#' + str_control_busqueda_ud + '_txt_bus_curso').val(str_unidad_didactica);
    $('#' + str_control_busqueda_ud + '_hid_bus_id_curso').val(str_id_ud);

}

function F_Habilitar_Menu_Modulo_Seguridad() {

    $('ul#menu_seguridad').css('display', 'block');

}

function F_Habilitar_Menu_Modulo_Configuracion_Basica() {

    $('ul#menu_configuracion_basica').css('display', 'block');

}

function F_Habilitar_Menu_Modulo_Admision_Mantenimiento() {

    $('ul#menu_admision').css('display', 'block');
    $('ul#menu_admision_mantenimiento').css('display', 'block');

}

function F_Habilitar_Menu_Modulo_Admision_Operaciones() {

    $('ul#menu_admision').css('display', 'block');
    $('ul#menu_admision_operaciones').css('display', 'block');

}

function F_Habilitar_Menu_Modulo_Admision_Operaciones_Exonerados() {

    $('ul#menu_admision').css('display', 'block');
    $('ul#menu_admision_operaciones').css('display', 'block');
    $('ul#menu_admision_exonerados').css('display', 'block');

}

function F_Habilitar_Menu_Modulo_Admision_Operaciones_Ordinarios() {

    $('ul#menu_admision').css('display', 'block');
    $('ul#menu_admision_operaciones').css('display', 'block');
    $('ul#menu_admision_ordinarios').css('display', 'block');

}

function F_Habilitar_Menu_Modulo_Academico_Mantenimiento() {

    $('ul#menu_academico').css('display', 'block');
    $('ul#menu_academico_mantenimiento').css('display', 'block');

}

function F_Habilitar_Menu_Modulo_Academico_Operaciones() {

    $('ul#menu_academico').css('display', 'block');
    $('ul#menu_academico_operaciones').css('display', 'block');

}

function F_Habilitar_Menu_Modulo_Academico_Reportes() {

    $('ul#menu_academico').css('display', 'block');
    $('ul#menu_academico_reportes').css('display', 'block');

}

function F_General_MostrarEspera(pboolMostrar) {
    if (pboolMostrar) {
        $('#dlgWait').dialog({
            autoOpen: false,
            modal: true,
            height: 'auto',
            resizable: false,
            dialogClass: 'alert'
        });

        $('.alert div.ui-dialog-titlebar').hide();
        $('.ui-button').remove();
        $('#dlgWait').dialog('open');
    }
    else {
        $('#dlgWait').dialog('close');
    }
}

function Date_AddDays(strFechaIni, intDias) {
    //  --> "intDias" + "strFechaIni" = "strFechaFin"
    var strFechaFin = '';

    milisegundos = parseInt(35 * 24 * 60 * 60 * 1000, 10);
          
    day = strFechaIni.split('/')[0];
    month = strFechaIni.split('/')[1];
    year = strFechaIni.split('/')[2];

    fecha = new Date(year, month - 1, day);

    //Obtenemos los milisegundos desde media noche del 1/1/1970
    tiempo = fecha.getTime();

    //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...
    milisegundos = parseInt(intDias * 24 * 60 * 60 * 1000, 10);

    //Modificamos la fecha actual
    total = fecha.setTime(tiempo + milisegundos);

    day = fecha.getDate();
    month = fecha.getMonth() + 1;
    year = fecha.getFullYear();

    day = '0' + day;
    month = '0' + month;

    day = day.slice(-2);
    month = month.slice(-2);

    strFechaFin = day + '/' + month + '/' + year;

    return strFechaFin;
}

function F_Derecha() {
    $('.Derecha').css('text-align', 'right');
}

function forceNumber(element) {
    element
    .data("oldValue", '')
    .bind("paste", function (e) {
        var validNumber = /^[-]?\d+(\.\d{1,2})?$/;
        element.data('oldValue', element.val())
        setTimeout(function () {
            if (!validNumber.test(element.val()))
                element.val(element.data('oldValue'));
        }, 0);
    });
    element
    .keypress(function (event) {
        var text = $(this).val();
        if ((event.which != 46 || text.indexOf('.') != -1) && //if the keypress is not a . or there is already a decimal point
        ((event.which < 48 || event.which > 57) && //and you try to enter something that isn't a number
          (event.which != 45 || (element[0].selectionStart != 0 || text.indexOf('-') != -1)) && //and the keypress is not a -, or the cursor is not at the beginning, or there is already a -
          (event.which != 0 && event.which != 8))) { //and the keypress is not a backspace or arrow key (in FF)
            event.preventDefault(); //cancel the keypress
        }

        if ((text.indexOf('.') != -1) && (text.substring(text.indexOf('.')).length > 2) && //if there is a decimal point, and there are more than two digits after the decimal point
        ((element[0].selectionStart - element[0].selectionEnd) == 0) && //and no part of the input is selected
        (element[0].selectionStart >= element.val().length - 2) && //and the cursor is to the right of the decimal point
        (event.which != 45 || (element[0].selectionStart != 0 || text.indexOf('-') != -1)) && //and the keypress is not a -, or the cursor is not at the beginning, or there is already a -
        (event.which != 0 && event.which != 8)) { //and the keypress is not a backspace or arrow key (in FF)
            event.preventDefault(); //cancel the keypress
        }
    });
}

function F_ValidarFechaMayor(FechaInicial, FechaFinal) {
    ValorInicial = FechaInicial.split("/");
    ValorFinal = FechaFinal.split("/");

    // Verificamos que la fecha no sea posterior a la actual
    var Inicial = new Date(ValorInicial[2], (ValorInicial[1] - 1), ValorInicial[0]);
    var Final = new Date(ValorFinal[2], (ValorFinal[1] - 1), ValorFinal[0]);
    if (Inicial > Final) 
        return true;
    else
        return false;
}

Number.prototype.redondear = function (d) {
    var num = this;
    d = d == undefined ? 2 : d;
    var ret = 0;
    ret = Math.round(num * Math.pow(10, d)) / Math.pow(10, d);
    return ret;
};


//Mantenimiento de session activa
//-------------------------------
var VerificarSession = true;
$().ready(function () {
    $(document).everyTime(600000, function () {
        if (!F_ValidaSesionActiva('', true)) return false;
    });
});

function F_SesionRedireccionar(directorio) {
    return F_ValidaSesionActiva(directorio, true);
}

var redireccionar = false;
function F_ValidaSesionActiva(directorio, Redir) {
    if (VerificarSession === false)
        return true;

    var Espera = false;
    var Resultado = false;
    redireccionar = Redir;

    var dtx = new Date();
    var timex = dtx.getHours() + dtx.getMinutes() + dtx.getSeconds();

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: '../Servicios/Servicios.asmx/KeepActiveSession',
                data: "{}",
                dataType: "json",
                async: false,
                success: function (obj, status) {
                    if (obj.d.SesionActiva === false) //cambiar a false
            {
                if (redireccionar == true) window.location.href = "../ErrorSession.aspx";
            }
            else {
                Resultado = true;
                //url: directorio + '/KeepActiveSession?time=' + timex,
                var dt = new Date();
                var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

                var NombreUsuario = obj.d.Nombre.trim(); // +' ' + obj.d.Apellidos;
                if (NombreUsuario.trim() === '')
                    NombreUsuario = obj.d.NombreUsuario;

                if (NombreUsuario.trim() === '')
                    NombreUsuario = '';

                $('#lblAlmacen').text("sucursal : " + obj.d.Almacen);
                $('#imgUsuario').css('display', 'block');
                //$('#imgUsuario').attr('src', '../Asset/images/mainuser.png');
                $('#lblNombreUsuario').text(NombreUsuario.trim());
                $('#lblNombreEmpresa').text('sgae - ' + obj.d.Empresa);

                


                var rutaImg;
                rutaImg = "../files/temp/session/" + obj.d.ImagenNombre;
                var result = doesFileExist(rutaImg);
                if (result === false) {
                    rutaImg = "../../files/temp/session/" + obj.d.ImagenNombre;
                    result = doesFileExist(rutaImg);
                    if (result === false)
                        rutaImg = "../../Asset/images/mainuser.png";
                            result = doesFileExist(rutaImg);
                                if (result === false)
                                    rutaImg = "../Asset/images/mainuser.png";
                }

                var result = doesFileExist(rutaImg);

                $('#imgUsuario').attr('src', rutaImg);

            };
            redireccionar = false;
            Espera = true;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            alertify.log(textStatus + ": " + XMLHttpRequest.responseText);
            Espera = true;
            Resultado = false;
        }
    });

    do { } while (Espera == false); //Esperar a que se ejecuta el Ajax
    return Resultado;
}

//Este fragmento de codigo a veces da errores, pero está bien que lo de
//es decir, son errores provocados, ya que valida la existencia de algunos 
//directorios para poder realizar diferentes acciones
function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}
//-------------------------------

function F_Numerar_Grilla(NombreGrilla,NombreLabel) {       
    var Control = $('#MainContent_' + NombreGrilla + '_' + NombreLabel + '_0').text();
    var C=0;
    $('#MainContent_' + NombreGrilla + ' .detallesart').each(function () {
        C++;
    });
    if (C==1 & Control=='')
        C=0;
    return C;
}

function F_ValidarCorreo(Correo) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(Correo);
}

























function F_PermisoOpcion(CodigoMenu, CodigoInterno, Opcion) {

    //return true;
    //Para mas facil compresion se utiliza los campos CodigoMenu y CodigoInterno
    //de las tablas Menu, MenuPaginas, y tambien MenuPaginasFunciones.... 
    //debes seguir las reglas de NORMALIZACION DE TABLAS para poder trabajar con ello
    //el parametro Opcion es (Opcional), se pasa en blanco '' cuando no es necesario
    //--
    //La funcion retorna 1/0 tipo texto, donde 1 es true o si tiene permiso.
    //--
    //PERMISOS DENTRO DE LA PAGINA: ------Administrador, Insertar, Consultar, Editar, Eliminar, Anular------
    //son los permisos especificos por cada pagina, se personalizan en la pagina Perfiles.
    //Quiero saber si el usuario logeado tiene permiso de Eliminar clientes..::
    //... se pasan las opciones: F_PermisoOpcion(1000, 1, 'Eliminar')
    //Donde 1000 es el menu de Maestros (Tabla Menu.CodigoMenu), 1 es la Pagina de Clientes (tabla MenuPaginas.CodigoInterno)...
    //--
    //FUNCIONES ESPECIALES DE PAGINA; Si quieres saber si tienes permiso a una funcion de pagina por ejemplo:
    //Permiso especial para aprobar pedidos "VENTAS >> NOTA DE PEDIDO >> APROBACION DE CREDITOS"
    //... se pasan las opciones: F_PermisoOpcion(3000, 777001, '')
    //donde 3000 es el menu de Ventas (Tabla Menu.CodigoMenu), y 777001 Funcion (tabla MenuPaginasFunciones.CodigoInterno)



    var Espera = false; var Resultado = "0";
    var dtx = new Date(); var timex = dtx.getHours() + dtx.getMinutes() + dtx.getSeconds();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Seguridad.asmx/F_PermisoOpcion',
        data: "{'CodigoMenu':'" + CodigoMenu + "','CodigoInterno':'" + CodigoInterno + "','Opcion':'" + Opcion + "'}",
        dataType: "json",
        async: false,
        success: function (obj, status) {
            Resultado = obj.d;
            Espera = true;

            if (Resultado === "0") {

                var textoMensaje = "";
                switch (Opcion) {
                    case "Administrador": textoMensaje = "NO TIENE PERMISO DE ADMINISTRADOR DE PAGINA"; break;
                    case "Insertar": textoMensaje = "NO TIENE PERMISO DE GRABAR NUEVOS DATOS EN ESTA PAGINA"; break;
                    case "Consultar": textoMensaje = "NO TIENE PERMISO DE CONSULTAR EN ESTA PAGINA"; break;
                    case "Editar": textoMensaje = "NO TIENE PERMISO DE MODIFICAR INFORMACION EN ESTA PAGINA"; break;
                    case "Eliminar": textoMensaje = "NO TIENE PERMISO DE ELIMINAR DATOS EN ESTA PAGINA"; break;
                    case "Anular": textoMensaje = "NO TIENE PERMISO DE ANULAR REGISTROS EN ESTA PAGINA"; break;
                    default: textoMensaje = "NO TIENE PERMISO A EJECUTAR ESTA OPCION"; break;
                }
                toastr.warning(textoMensaje);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            toastr.warning(textStatus + ": " + XMLHttpRequest.responseText);
            Espera = true;
            Resultado = false;
        }
    });

    do { } while (Espera == false); //Esperar a que se ejecuta el Ajax
    return Resultado;


}

function F_PermisoOpcion_SinAviso(CodigoMenu, CodigoInterno, Opcion) {
    //Para mas facil compresion se utiliza los campos CodigoMenu y CodigoInterno
    //de las tablas Menu, MenuPaginas, y tambien MenuPaginasFunciones.... 
    //debes seguir las reglas de NORMALIZACION DE TABLAS para poder trabajar con ello
    //el parametro Opcion es (Opcional), se pasa en blanco '' cuando no es necesario
    //--
    //La funcion retorna 1/0 tipo texto, donde 1 es true o si tiene permiso.
    //--
    //PERMISOS DENTRO DE LA PAGINA: ------Administrador, Insertar, Consultar, Editar, Eliminar, Anular------
    //son los permisos especificos por cada pagina, se personalizan en la pagina Perfiles.
    //Quiero saber si el usuario logeado tiene permiso de Eliminar clientes..::
    //... se pasan las opciones: F_PermisoOpcion(1000, 1, 'Eliminar')
    //Donde 1000 es el menu de Maestros (Tabla Menu.CodigoMenu), 1 es la Pagina de Clientes (tabla MenuPaginas.CodigoInterno)...
    //--
    //FUNCIONES ESPECIALES DE PAGINA; Si quieres saber si tienes permiso a una funcion de pagina por ejemplo:
    //Permiso especial para aprobar pedidos "VENTAS >> NOTA DE PEDIDO >> APROBACION DE CREDITOS"
    //... se pasan las opciones: F_PermisoOpcion(3000, 777001, '')
    //donde 3000 es el menu de Ventas (Tabla Menu.CodigoMenu), y 777001 Funcion (tabla MenuPaginasFunciones.CodigoInterno)



    var Espera = false; var Resultado = "0";
    var dtx = new Date(); var timex = dtx.getHours() + dtx.getMinutes() + dtx.getSeconds();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../Servicios/Seguridad.asmx/F_PermisoOpcion',
        data: "{'CodigoMenu':'" + CodigoMenu + "','CodigoInterno':'" + CodigoInterno + "','Opcion':'" + Opcion + "'}",
        dataType: "json",
        async: false,
        success: function (obj, status) {
            Resultado = obj.d;
            Espera = true;

            if (Resultado === "0") {

                var textoMensaje = "";
                switch (Opcion) {
                    case "Administrador": textoMensaje = "NO TIENE PERMISO DE ADMINISTRADOR DE PAGINA"; break;
                    case "Insertar": textoMensaje = "NO TIENE PERMISO DE GRABAR NUEVOS DATOS EN ESTA PAGINA"; break;
                    case "Consultar": textoMensaje = "NO TIENE PERMISO DE CONSULTAR EN ESTA PAGINA"; break;
                    case "Editar": textoMensaje = "NO TIENE PERMISO DE MODIFICAR INFORMACION EN ESTA PAGINA"; break;
                    case "Eliminar": textoMensaje = "NO TIENE PERMISO DE ELIMINAR DATOS EN ESTA PAGINA"; break;
                    case "Anular": textoMensaje = "NO TIENE PERMISO DE ANULAR REGISTROS EN ESTA PAGINA"; break;
                    default: textoMensaje = "NO TIENE PERMISO A EJECUTAR ESTA OPCION"; break;
                }
                //alertify.error(textoMensaje);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            alertify.log(textStatus + ": " + XMLHttpRequest.responseText);
            Espera = true;
            Resultado = false;
        }
    });

    do { } while (Espera == false); //Esperar a que se ejecuta el Ajax
    return Resultado;
}
