$(document).ready(function(){
	mainmenu();
	
	$("#oHLaboral").click(function(){
		$.post(base_url+'opcion/hora',{
				action: 'traerHora_laboral'
			},function(data){
				if(data!='DATA'){
					$('#jquery-dialog').dialog('destroy');
					$('#jquery-dialog').html(data);
				}else{
					alert('No hay datos');
				}
		})
		
		return false;
	})
	
	$("#oPusuarios").click(function(){
		$.post(base_url+'opcion/admin',{
				action: 'traerTipo_usuario'
			},function(data){
				if(data!='DATA'){
					$('#jquery-dialog').dialog('destroy');
					$('#jquery-dialog').html(data);
	                $('#jquery-dialog').dialog({
	                    modal: true,
	                    disabled: false,
	                    width: '550px',
	                    title: 'Administrando Permisos'
	                });
				}else{
					alert('No hay datos');
				}
		})
		
		return false;
	})
	
	$("#cAsignar").live('click',function(){
		$.post(base_url+'citas',{
		},function(data){
			jqueryDialog('Asignado una Cita',data);
			$("#btnGuardar").remove();
		})

		return false;    	
	})
	
	$("#afp-menu #cboMes").live('change',function(){
		window.location.href = base_url+'calendario/mes/'+$("#cboAnio").val()+'/'+$("#cboMes").val();
	})

	$("#frmCambio").live('submit',function(){
		$(this).ajaxSubmit({
			type: 'POST',
			success: function(data){
				switch(data){
				case 'FRACASO':
					jAlert('El usuario ha cambiar no existe en la <strong>base de datos</strong>','Cambio Cancelado');
					break;
				case 'USUARIO':
					jAlert('No se puede cambiar usted mismo','Cambio Cancelado');
					break;
				case 'CAMBIO':
					jAlert('El cambio ha sido realizado con <strong>exito</strong>','Cambio Realizado');
					window.location.reload();
					break;
				default:
					jAlert('<strong style="color: red;">ERROR</strong>: ocurrio un error inesperado, contactese con <u>SOPORTE</u>','Error Inesperado');
				break;
				}
			}
		})
		return false;
	})

	$("#frmCambio a").live('click',function(){
		$.post(base_url+'calendario/cambio',function(data){
			if(data=='REGRESO'){
				jAlert('Se ha regresado al usuario actual','Cambio Realizado');
				window.location.reload();
			}else{
				jAlert('<strong style="color: red;">ERROR</strong>: ocurrio un error inesperado, contactese con <u>SOPORTE</u>','Error Inesperado');
			}
		})
		return false;
	})

	$("#afp-menu #nav li:not(.change_user):not(.date)").live('mouseenter',function(){
		if(!$(this).hasClass('user') && !$(this).hasClass('logout'))
			$(this).addClass('ui-state-active');
	})

	$("#afp-menu #nav li").live('mouseleave',function(){
		if(!$(this).hasClass('user') && !$(this).hasClass('logout'))
			$(this).removeClass('ui-state-active');
	})

	$('.logout').live('click',function(){
		$("body").fadeOut('fast');
		window.location.href = base_url+'logout';
	})
});

function mainmenu(){
	$(" #nav ul ").css({
		display: "none"
	});
	$(" #nav li").hover(function(){
		$(this).find('ul:first:hidden').css({
			visibility: "visible",
			display: "none"
		}).slideDown(400);
	},function(){
		$(this).find('ul:first').slideUp(400);
	});
}

function buscarUsuario(){
	$("#popup_prompt").autocomplete({
		dataType: 'JSON',
		source: function(request, response) {
			jQuery.ajax({
				url: base_url+"calendario/acciones",
				type: "post",
				dataType: "json",
				data: {
					action: 'buscarUsuario',
					usuario: request.term
				},
				success: function(data) {
					response($.map(data, function(item) {
						return {
							id: item.idUsuario,
							value: item.nombre
						}
					}))
				}
			})
		},
		select: function(e,ui){
			$("#hdCal_login_cu").val(ui.item.id);
		}
	})
}