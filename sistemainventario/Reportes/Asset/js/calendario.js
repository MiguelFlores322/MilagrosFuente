$(document).ready(function() {

    $(".button-navegacion").mouseover(function() {
    $(this).attr("style", "background-color:#D1EBFB");

    }).mouseout(function() {
        $(this).removeAttr("style");
    })

    $(".nav a img").live('click', function() {
        //ajaxLoader(true);
    })

    //Ver el detalle de la cita	
    //cargarTooltip();

    $(".date").live('click', function() {

//        var idCita = $(this).attr('id');
//   
//        $("#hdIdCitaActual").val(idCita);
        //        $("#btnSubmitearPanel").click();
        //        return false;
    })

    //Mostrar efecto al pasar el mouse en la navegacion de fechas
    $("#afp-Calendar .nav").live('mouseover', function() {
        $(this).addClass('ui-state-hover');
    })

    $("#afp-Calendar .nav").live('mouseleave', function() {
        $(this).removeClass('ui-state-hover');
    })

    //Mostrar la frase agregar cita al pasar el mouse
    $("#afp-Calendar td.days div .head-day").live('mouseover', function() {
        $('.MensajeCita', this).text('Crear cita');
        if ($(this).hasClass('x') == false) {
            $(this).addClass('ui-state-active');
        }
    })
    
    //QUitar la frase agregar cita al retirar el mouse
    $("#afp-Calendar td.days div .head-day").live('mouseleave', function() {
        $('.MensajeCita', this).html('&nbsp;');
        if ($(this).hasClass('x') == false) {
            $(this).removeClass('ui-state-active');
        }
    })
    
    // muestre el div de mantenimiento de 
    $("#afp-Calendar td h4").live('click', function() {
        fecha = $(this).attr('id');
        ruta_cita = "../Cita/frmCita.aspx";
        $.post(ruta_cita, {
            fecha: fecha
        }, function(data) {

            jqueryDialog('Asignado una Cita', data);

            $("#btnGuardar").remove();
        })
        return false;
    })

    $(".tooltip").live('hover', function() {
        $(".tooltip").fadeOut('fast');
    })

})

function cargarTooltip(){
	$("#afp-Calendar .date").each(function() {
	    $(this).simpletip({
	    	position: 'rigth',
	        content : $('.description',this).val()
	    });
	})
}