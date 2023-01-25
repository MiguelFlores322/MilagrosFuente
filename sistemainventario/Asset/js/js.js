function jqueryDialog(t, d, w, b, b1, b2, bh) {
    $('.jquery-dialog').css('display', 'none');
    $('.jquery-dialog').dialog('destroy');
    $('.jquery-dialog').attr('title', t);

    $('.jquery-dialog').html("<\p>" + d + "</\p>");

    $('.jquery-dialog').dialog({
        modal: true,
        disabled: false,
        width: w,
        resizable: false
    });

    if (b == 1) {
        $('.jquery-dialog').dialog(
            "option",
            "buttons",
            [{
                text: b1,
                click: function() {
                    $("#" + bh).click();
                }
            }, {
                text: b2,
                click: function() {
                    $(this).dialog("close");
                }
}]
        );
    }

}


function activarBoton(idBoton, estado) {

    if (estado == true) {
        $("#" + idBoton).show();
    } else {
        $("#" + idBoton).hide();

    }
}
jQuery.fn.reset = function() {
    $(this).each(function() { this.reset(); });
}

//permite validar si se puede aplicar un numero
jQuery.fn.ForceNumericOnly =
function() {
    return this.each(function() {
        $(this).keydown(function(e) {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            return (
                key == 8 ||
                key == 9 ||
                key == 46 ||
                (key >= 37 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};
function jqueryDialog_close() {
    $('.jquery-dialog').dialog('destroy');
}

function ltrim(s) {
    return s.replace(/^\s+/, "");
}
function rtrim(s) {
    return s.replace(/\s+$/, "");
}
function trim(s) {
    return rtrim(ltrim(s));
}

function ValidarFecha(Cadena) {
    var Fecha = new String(Cadena)
    //Crea un string  
    // var RealFecha= new Date()   //Para sacar la fecha de hoy  
    // Cadena Año  
    var Ano = new String(Fecha.substring(Fecha.lastIndexOf("/") + 1, Fecha.length))
    //Cadena Mes  
    var Mes = new String(Fecha.substring(Fecha.indexOf("/") + 1, Fecha.lastIndexOf("/")))
    //Cadena Día  
    var Dia = new String(Fecha.substring(0, Fecha.indexOf("/")))
    //Valido el año  
    if (isNaN(Ano) || Ano.length < 4 || parseFloat(Ano) < 1900 || Ano.length > 4) {
        //alert('Año inválido')  
        return false
    }
    //Valido el Mes  
    else if (isNaN(Mes) || parseFloat(Mes) < 1 || parseFloat(Mes) > 12) {
        //alert('Mes inválido')  
        return false
    }
    //Valido el Dia  
    else if (isNaN(Dia) || parseInt(Dia, 10) < 1 || parseInt(Dia, 10) > 31) {
        //alert('Día inválido')  
        return false
    }
    else if (Mes == 4 || Mes == 6 || Mes == 9 || Mes == 11 || Mes == 2) {
        if (Mes == 2 && Dia > 28 || Dia > 30) {
            // alert('Día inválido')  
            return false
        }
    } else
        return true

}

function controlesGlobales() {
    $("button, input:submit, input:button, input:reset, .buttonImage").button();
    $("input:text").attr("autocomplete", "off");
    $.datepicker.setDefaults($.datepicker.regional['es']);

    $("#txtFechaAlta").datepicker({
        dateFormat: 'dd/mm/yy'
    });

    $("#tabOperaciones").tabs();

    /* formateamos los input file*/
    $(".inputFile").fileinput({
        buttonText: " ... "
    }).change(function() {
        $(this).parent().find('fileinput-input').text($(this).val());
    });


}


getDimensions = function(oElement) {
    var x, y, w, h;
    x = y = w = h = 0;
    if (document.getBoxObjectFor) { // Mozilla
        var oBox = document.getBoxObjectFor(oElement);
        x = oBox.x - 1;
        w = oBox.width;
        y = oBox.y - 1;
        h = oBox.height;
    }
    else if (oElement.getBoundingClientRect) { // IE
        var oRect = oElement.getBoundingClientRect();
        x = oRect.left - 2;
        w = oElement.clientWidth;
        y = oRect.top - 2;
        h = oElement.clientHeight;
       
    }
    return { x: x, y: y, w: w, h: h };
}



/*************NO TOCAR ESTA FUNCION *************/

function FlotarListaBuscador(divBuscador, divLista) {
    var myBuscador = document.getElementById(divBuscador);
    var xLeft = getDimensions(myBuscador).x;
    var yTop = getDimensions(myBuscador).y;
    $("#" + divLista).fadeIn(400);   
    $("#" + divLista).css("top", (yTop + 23) + "px");
    $("#" + divLista).css("left", (xLeft + 2) + "px");
    

//    $(".ui-draggable").mousemove(function() {

//        var xLeft = getDimensions(myBuscador).x;
//        var yTop = getDimensions(myBuscador).y;
//        $("#" + divLista).css("top", (yTop + 23) + "px");
//        $("#" + divLista).css("left", (xLeft + 2) + "px");
//    });

//    $(window).resize(function() {

//        var xLeft = getDimensions(myBuscador).x;
//        var yTop = getDimensions(myBuscador).y;
//        $("#" + divLista).css("top", (yTop + 23) + "px");
//        $("#" + divLista).css("left", (xLeft + 2) + "px");
//    });
}


jQuery.fn.ForceNumeric2 = function() {

    return this.each(function() {
        $(this).keydown(function(e) {
            var key = e.which || e.keyCode;

            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
            // numbers   
                         key >= 48 && key <= 57 ||
            // Numeric keypad
                         key >= 96 && key <= 105 ||
            // comma, period and minus, . on keypad
                        key == 190 || key == 188 || key == 109 || key == 110 ||
            // Backspace and Tab and Enter
                        key == 8 || key == 9 || key == 13 ||
            // Home and End
                        key == 35 || key == 36 ||
            // left and right arrows
                        key == 37 || key == 39 ||
            // Del and Ins
                        key == 46 || key == 45)
                return true;

            return false;
        });
    });
}



/************************************/
function mostrarLoad(iTop) {
    var html = '<div id="ProgressControl" style="top:' + iTop +'px; position:absolute; z-index:200000; width:200px; color:#6699CC; font-size:17px;">';

    html = html + 'cargando... <img src="../../asset/images/progress.gif"></img>';
    html = html + '</div>';
    $("body").append(html);
}


/****************funciones de progreso **************/
//function showProgress() {
//    var html = '<div id="ProPan" style="display:none;width:100%;height:100%;overflow:hidden;z-index:10000;top: 0px;left: 0px;text-align: center;position:absolute;background-color: #FFFFFF; opacity:0.6;filter:alpha(opacity=40);">';
//    html = html + '<img alt="loading" style="margin-left: 5%;margin-top: 15%" src="../asset/images/ajax-loader.gif"/>';
//    html = html + '</div>';
//    $("body").append(html);
//}

//function hideProgress() {
//    $("#ProPan").remove();
//}

function showProgress() {
    $("#ProPan").show();
}

function hideProgress() {
    $("#ProPan").hide();
}

function MostrarProgress() {
    $("#ProPan").show().delay(1000).fadeOut(); ;
   // $("#ProPan")
  //  $('#foo').slideUp(300).delay(800).fadeIn(400);
}
/********************************/

/********** bloquea las acciones de enter en los formularios************/



/********** bloquea las acciones de enter en los formularios************/

//$('form').live('keypress', function(e) {
//    if (e == 13) {
//        return false;
//    }
//});

//$('input').live('keypress', function(e) {
//    if (e.which == 13) {
//        return false;
//    }
//});

/******************************************************************/
/**
* tipoBusqueda: 1(empresa), 2(cliente), 3(participante-usuario)
*
*/
function validarBuscar(txtCliente, btnBuscar, tipoBusqueda) {
    $("#" + btnBuscar).click(function () {
        var controlMensaje = "";
        if ($("#" + txtCliente).val.length <= 3) {
            switch (tipoBusqueda) {
                case 1: controlMensaje = "LA EMPRESA"; break;
                case 2: controlMensaje = "EL CLIENTE"; break;
                case 3: controlMensaje = "EL PARTICIPANTE"; break;
            }
            alert("DEBE DE INGRESAR MAS DE TRES CARACTERES PARA " + controlMensaje);
            return false;
        }

    });
}
/**********************************************************************/
