/*<Inicio_Cabecera>
	<Nombre>javascript.js</Nombre>
	<Descripcion>Pagina que administra el formato de fecha y hora por compañia	</Descripcion> *
	<Colaborador>Marco Antonio Flores Santos </Colaborador>
	<Fecha_Hora> 30/09/2008 10:00</Fecha_Hora>
	<Datos_de_Modificacion>
		<Colaborador>  Poner el nombre y apellido de la persona que crea la pagina</Colaborador>
		<Fecha_Hora>  Poner la Fecha y Hora de modificacion</Fecha_Hora>
		<Descripcion>Poner la descripcion de lo modificado</Descripcion>
	</Datos_de_Modificacion>
</Inicio_Cabecera>*/


//Declaracion de variables globales

var GlobalFormatoFecha="";
var GlobalPuntoDecimal="";
var GlobalSeparadorMiles = "";
var Utf8 = {

    // public method for url encoding
    encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // public method for url decoding
    decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
}
GlobalFormatoFecha=F_VariableGlobal("NumeroFecha","formato_fecha")
GlobalPuntoDecimal = F_VariableGlobal("NumeroFecha", "formato_punto_decimal")
GlobalSeparadorMiles = F_VariableGlobal("NumeroFecha", "formato_separador_miles")
GlobalMsgGrabarConfir = F_VariableGlobal("MsgOperacion", "GrabarConfir")
GlobalMsgGrabarOk = F_VariableGlobal("MsgOperacion", "GrabarOk")
GlobalMsgEditConfir = F_VariableGlobal("MsgOperacion", "EditConfir")
GlobalMsgEditOk = F_VariableGlobal("MsgOperacion", "EditOk")
GlobalMsgEliminarConfir = F_VariableGlobal("MsgOperacion", "EliminarConfir")
GlobalMsgEliminarOk = F_VariableGlobal("MsgOperacion", "EliminarOk")
GlobalMsgProcesarConfir = F_VariableGlobal("MsgOperacion", "ProcesarConfir")
GlobalMsgProcesarOk = F_VariableGlobal("MsgOperacion", "ProcesarOk")
///*******************************************************/
//Autor             : Marco Antonio Flores Santoss
//Nombre            : F_VariableGlobal
//Descripcion       : Determina la variable global sw fecha y Hora
//      Tipo        : Tamaño de espacios en blanco
///*******************************************************/
function F_VariableGlobal(Nombre, tipo) {
        if (Nombre == "NumeroFecha") { 
            //StrCookies=""
            //StrArrayCookies=""
            //StrCookies=document.cookie
            //StrArrayCookies = StrCookies.replace("NumeroFecha=", "")
            var Arreglo = new Array();

            //hid_NumeroFecha=window.parent.frames[0].document.getElementById("hid_NumeroFecha")
            hid_NumeroFecha="dd/MM/yyyy|.|,"
           // if (hid_NumeroFecha != null) { return }
            //if (hid_NumeroFecha == "") { return }
            //alert(hid_NumeroFecha.value)
            Arreglo = hid_NumeroFecha.split("|")
            if (tipo=="formato_fecha"){
                if ((Arreglo[0]==undefined)||(Arreglo[0]=="")){
                    return "dd/MM/yyyy"
                }else{
                    return Arreglo[0]
                }
            }   
       
            if (tipo=="formato_punto_decimal"){
                if ((Arreglo[1]==undefined)||(Arreglo[1]=="")){            
                    return "."
                }else{
                    return Arreglo[1]
                }
            
            }
      
            if (tipo=="formato_separador_miles"){
                 if (Arreglo[2]==undefined){
                    return ","
                }else{            
                    return Arreglo[2]
                }
            
            }   
            return ""

        }

    if (Nombre == "MsgOperacion") {
       
        //hid_Mensaje = window.parent.frames[0].document.getElementById("hid_Mensaje")
        //if (hid_Mensaje == null) { return false }
        var Arreglo = new Array();
        hid_Mensaje = "Grabar|¿Está seguro de grabar el registro?|Grabación realizada con éxito|Editar|¿Está seguro de modificar el registro?|Modificación realizada con éxito|Eliminar|¿Está seguro de eliminar el registro?|Eliminación realizada con éxito|Proceso|¿Está seguro de iniciar el Proceso?|El proceso culminó con éxito"
        Arreglo = hid_Mensaje.split("|")
                     
        switch(tipo)  {
            case "GrabarConfir":
                return Arreglo[1];
            case "GrabarOk":
                return Arreglo[2];
            case "EditConfir":
                return Arreglo[4]
            case "EditOk":
                return Arreglo[5]
            case "EliminarConfir":
                return Arreglo[7]
            case "EliminarOk":
                return Arreglo[8];
            case "ProcesarConfir":
                return Arreglo[10]
            case "ProcesarOk":
                return Arreglo[11]; 
       }
    }
    
}

///*******************************************************/
//Autor             : Francisco Cáceres Honores
//Nombre            : F_ValidaCampoOpciones
//Descripcion       : Valida que el valor ingresado solo acepte los caracteres especificados en la cadena ingresada como parámetro
//      field       : El componente del texto
///*******************************************************/
function F_ValidaCampoOpciones(field, opciones) 
{
    var ch_Caracter = String.fromCharCode(window.event.keyCode);
    KeyAscii = event.keyCode
    event.keyCode = 0
    arrOpc = opciones.split(",")
    flag=0
    for (i = 0; i < arrOpc.length; i++) 
    {
        if (ch_Caracter == arrOpc[i]) 
        {
            flag = 1            
        }
    }
    if (flag == 1) {
        event.keyCode = KeyAscii
    }
    else {
        KeyAscii = ""
    }
}

///*******************************************************/
//Autor             : Marco Antonio Flores Santos
//Nombre            : onKeyPressFecha
//Descripcion       : Valida que la fecha al momento de precionar el teclado
//      field       : El componente del texto
///*******************************************************/

function onKeyPressFecha(field)
{
	KeyAscii = event.keyCode
	event.keyCode = 0
	//Controlar el scrito de Numero
	bolEscribirNumero=false
	FormatoFecha=GlobalFormatoFecha
	if ( (FormatoFecha=="dd/MM/yyyy")|| (FormatoFecha=="MM/dd/yyyy"))	{
	    if ((field.value.length==1)||(field.value.length==4))
                bolEscribirNumero=true
    }	

	if ( (FormatoFecha=="yyyy/dd/MM")|| (FormatoFecha=="yyyy/MM/dd"))	{
	    if ((field.value.length==3)||(field.value.length==6))
                bolEscribirNumero=true
    }	

    if ( (FormatoFecha=="dd/yyyy/MM")|| (FormatoFecha=="MM/yyyy/dd"))	{
	    if ((field.value.length==1)||(field.value.length==6))
                bolEscribirNumero=true
    }	

		
	//if((field.value.length==1)||(field.value.length==4))
	if (bolEscribirNumero==true)
	{
		if (KeyAscii<48 || KeyAscii>57 )
		{ 
			event.keyCode = 0
		}
		else
		{
			event.keyCode = 0
			field.value=field.value + String.fromCharCode(KeyAscii)+ "/";
		}		   
	}
	else
	{
		if(KeyAscii<48 || KeyAscii>57 )
		{
			event.keyCode = 0
		}
		else
		{
			event.keyCode=KeyAscii		
		}
	} 
}


///*******************************************************/
//Autor             : Marco Antonio Flores Santos
//Nombre            : F_ValidaFechaOnBlur
//Descripcion       : Valida que la fecha al momento de salir del control
//      field       : El componente del texto
///*******************************************************/
function F_ValidaFechaOnBlur(field)
{ 
	
	if (field.value!="")
	{
		Fecha=field.value;
		if(!F_fechaValida(Fecha))
		{
			alert("Fecha ingresada no posee el formato "+ GlobalFormatoFecha + " o rango invalido");
			field.value="";
			if (field.disabled!=true){
			  field.focus();
			}
		}else
		{
			//fiel.focus();
		}
	}	
}



///*******************************************************/
//Autor             : Marco Antonio Flores Santos
//Nombre            : F_fechaValida
//Descripcion       : Valida el formato de una caja de texto fecha
//      caja        : El componente del texto
///*******************************************************/
function F_fechaValida(caja){
       var a;
		var m;
		var d;
		
		FormatoFecha=GlobalFormatoFecha
		//formatear fecha
		if (caja.length!=10){
		    return false;
		}
		
		
		    
		if ( (FormatoFecha=="MM/dd/yyyy"))	{
	        caja=caja.substr(3,2)+"/"+caja.substr(0,2)+"/"+caja.substr(6,4)     
        }	

	    if ( (FormatoFecha=="yyyy/dd/MM"))	{
	            caja=caja.substr(5,2)+"/"+caja.substr(8,2)+"/"+caja.substr(0,4)         	    
        }
        
        if ( (FormatoFecha=="yyyy/MM/dd"))	{
            caja=caja.substr(8,2)+"/"+caja.substr(5,2)+"/"+caja.substr(0,4)         	    
       }	
        
        if ( (FormatoFecha=="dd/yyyy/MM") )	{
	        caja=caja.substr(0,2)+"/"+caja.substr(8,2)+"/"+caja.substr(3,4)         	    
        }	
        
        if ( (FormatoFecha=="MM/yyyy/dd") )	{
	        caja=caja.substr(8,2)+"/"+caja.substr(0,2)+"/"+caja.substr(3,4)  
        }	
			
		if (caja) 
		{	
			borrar = caja; 
			
			        
			
			if ((caja.substr (2,1) == "/") && (caja.substr(5, 1) == "/")) 
			{		
				for (i=0 ; i<10; i++) 
				{			
					if (((caja.substr (i,1)<"0" ) || (caja.substr(i ,1)>"9")) && (i != 2) && (i != 5)) 
					{	
					borrar = "";
					break;
					} 
				} 
				
				if(borrar) 
				{						   		
					a = caja.substr(6,4); 
					m = caja.substr(3 ,2); 
					d = caja.substr(0 ,2); 				
																		
					if((a < 1900) || (a > 2999 ) || (m < 1 ) || (m > 12 ) || (d < 1 ) || (d > 31 ))
					{
						borrar = ""; 
					}
					else 
					{					
						if((a%4 != 0) && (m == 2) && (d > 28 )) 		
						{
							borrar = ""; // A?o no viciesto y es febrero y el dia es mayor a 28 
						}
						else 
						{
							if ((((m == 4) || (m == 6) || (m == 9) || (m==11 )) && (d> 30)) || ((m==2 ) && (d> 29))) 
							{
								borrar = ""; 
							}
						}
					} 
				}
			}
			else
			{
			return false;
			} 
		} 
		else 
		{
			borrar = ""; 
			 			
		}
		
		if (borrar =="") 
		{
			return false; 
		}
		else 
		{
			return true; 
		}
} 	
	

///*******************************************************/
//Autor             : Marco Antonio Flores Santos
//Nombre            : F_SoloNumeroDecimal
//Descripcion       : Valida que la caja de texto solo tenga numeros decimales
//      text        : El componente del texto
///*******************************************************/
	
function F_SoloNumeroDecimal(Text,NroDecimales) {
    //alert(GlobalPuntoDecimal)
        Cursor=posicionCursor(Text)
        var ch_Caracter = String.fromCharCode(window.event.keyCode);
        var PuntoDecimal = GlobalPuntoDecimal
      
        var Patron = "-0123456789"+PuntoDecimal
        var intEncontrado =Patron.indexOf(ch_Caracter);
        var intNumeroDigitos = NroDecimales;
        
        
        if (intEncontrado == -1) {
           window.event.keyCode = 0;
        }        
        else {           
                    window.event.keyCode = (ch_Caracter.toUpperCase()).charCodeAt();

        }
            
            
            intEncontrado =Text.value.indexOf("-");
            if ((intEncontrado != -1) && (ch_Caracter=="-")) {
                window.event.keyCode = 0;
            }    
            
            if ((Cursor!=0) && (ch_Caracter=="-")) {
                window.event.keyCode = 0;
            }    

            
                
        
            intEncontrado =Text.value.indexOf(PuntoDecimal);
            if ((intEncontrado != -1)&& (ch_Caracter==PuntoDecimal)){
                window.event.keyCode = 0;
            }  
            
            if ((Cursor>intEncontrado)&&((Text.value.length-intEncontrado)>intNumeroDigitos)&&(intEncontrado!=-1) ) {
                window.event.keyCode = 0;
            }              
            
            if (Text.value.length>0){
                if ((ch_Caracter=="-")&&(Text.value.substr(0, 1)=="-")){
                    window.event.keyCode = 0; 
                }
            }      
            
            //intEncontrado =Text.value.indexOf(PuntoDecimal);               
        
        
}

///*******************************************************/
//Autor             : Francisco Cáceres Honores
//Nombre            : F_ConvierteTextoToDecimal
//Descripcion       : Convierte un texto con formato decimal a un número decimal
//      field       : Cadena del texto
///*******************************************************/
function F_ConvierteTextoToDecimal(strCadena) {
    var cad = ""
    cad = strCadena.replace(/,/gi, "");
    return cad;
}


///*******************************************************/
//Autor             : Marco Antonio Flores Santos
//Nombre            : posicionCursor
//Descripcion       : Obtiene la posicion del cursor dentro de una caja de texto
//      obj         : El componente del texto
///*******************************************************/

function posicionCursor(obj) {
    try {

        var tb = obj
        var cursor = -1;

        // IE
        if (document.selection && (document.selection != 'undefined')) {
            var _range = document.selection.createRange();
            var contador = 0;
            while (_range.move('character', -1))
                contador++;
            cursor = contador;
        }
        // FF
        else if (tb.selectionStart >= 0)
            cursor = tb.selectionStart;

        return cursor;
    }
    catch (e) {
    }
}


///*******************************************************/
//Autor             : Marco Antonio Flores Santos
//Nombre            : F_ValorNumero
//Descripcion       : Reemplaza la coma por el punto para darle el formato
//      obj         : El componente del texto
///*******************************************************/

function F_ValorNumero(StrNumero){
    
    if (GlobalPuntoDecimal==","){
        StrNumero=StrNumero.replace(/\./g,"")
        StrNumero=StrNumero.replace(/\,/g,".")
        
    }else{
        StrNumero=StrNumero.replace(/\,/g,"")    
    } 
    return parseFloat(StrNumero)   
   
}



///*******************************************************/
//Autor             : Marco Antonio Flores Santos
//Nombre            : F_DarFormatoNumero
//Descripcion       : Reemplaza la coma por el punto para darle el formato
//      obj         : El componente del texto
///*******************************************************/

function F_DarFormatoNumero(Obj,NroDecimales,NumeroMaximo,NumeroMinimo){
    if (Obj.value=="")
    {
        return
    }
    StrNumero=Obj.value
     if (GlobalPuntoDecimal==","){
        StrNumero=StrNumero.replace(/\./g,"")
        StrNumero=StrNumero.replace(/\,/g,".")
        
    }else{
        StrNumero=StrNumero.replace(/\,/g,"")    
    } 
    NumeroEval=F_ValorNumero(Obj.value)
   
    if (isNaN(NumeroEval)){
        alert("El valor Ingresado no es número")
        Obj.value=""
    }else{             
        if((parseFloat(NumeroMinimo)<=NumeroEval)&&(NumeroEval<=parseFloat(NumeroMaximo)) ){
            Obj.value =F_formato_numero(StrNumero,NroDecimales,GlobalPuntoDecimal,GlobalSeparadorMiles)   
        }else{
            alert("El valor ingresado no se encuentra dentro del rango de "+F_formato_numero(parseFloat(NumeroMinimo),NroDecimales,GlobalPuntoDecimal,GlobalSeparadorMiles)+ " a "+F_formato_numero(parseFloat(NumeroMaximo),NroDecimales,GlobalPuntoDecimal,GlobalSeparadorMiles))        
            Obj.value=""
            Obj.focus();
        }     
    }
   
}




///*******************************************************/
//Autor                     : Marco Antonio Flores Santos
//Nombre                    : F_formato_numero
//Descripcion               : Da el formato predeterminado a un numero 
//      numero              : El componente del texto
//      decimales           : Numero de decimales
//      separador_decimal   : Separador decimal    
//      separador_miles     : Separador de miles  
///*******************************************************/

function F_formato_numero(numero, decimales, separador_decimal, separador_miles){ // v2007-08-06
	numero=parseFloat(numero);
	if(isNaN(numero)){
		return "";
	}
	

	if(decimales!==undefined){
		// Redondeamos
		numero=numero.toFixed(decimales);
	}
  
	// Convertimos el punto en separador_decimal
	numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ",");
	
	indexDecimal=numero.indexOf(separador_decimal);
	
	NumeroParteEntera=numero.substr(0,indexDecimal)	
	NumeroParteDecimal=numero.substr(indexDecimal+1,numero.length-indexDecimal)

	
	if(separador_miles){
		// Añadimos los separadores de miles
		var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
		while(miles.test(NumeroParteEntera)) {	    		    
			NumeroParteEntera=NumeroParteEntera.replace(miles, "$1" + separador_miles + "$2");
		}
	}
	numero=NumeroParteEntera+separador_decimal+NumeroParteDecimal
	return numero;
}

///*******************************************************/
//Autor                     : Marco Antonio Flores Santos
//Nombre                    : F_SoloNumeroEntero
//Descripcion               : Valida que en control solo se escriba numeros enteros 
//      Text                : El componente a validar
///*******************************************************/

function F_SoloNumeroEntero(Text) {
    //Cursor = posicionCursor(Text)
    //[RAUL 17FEB11]
    KeyAscii = event.keyCode;
    if (KeyAscii == 13) {
        event.keyCode = 0;
    }
    else {
        //

        var ch_Caracter = String.fromCharCode(window.event.keyCode);
        var Patron = "0123456789"
        var intEncontrado = Patron.indexOf(ch_Caracter);
        if (intEncontrado == -1) {
            window.event.keyCode = 0;
        }
        else {
            window.event.keyCode = (ch_Caracter.toUpperCase()).charCodeAt();

        }
    }
}        


///*******************************************************/
//Autor                     : Marco Antonio Flores Santos
//Nombre                    : ColorearFila
//Descripcion               : Cambia el color d la fila
//      objFila             : Fila para cambiar el Color
//      CambioColor         : El color ha cambiar
///*******************************************************/

function ColorearFila(objFila,CambioColor){
        if (document.getElementById(objFila)==null){return}        
	    obj = document.getElementById(objFila);
	    //obj.style.backgroundColor=="#c9c9c9"){return}
	    obj.style.backgroundColor = CambioColor; 
}		   

///*******************************************************/
//Autor                     : Marco Antonio Flores Santos
//Nombre                    : RestaurarFila
//Descripcion               : Cambia el color d la fila
//      objFila             : Restaurar la fila al color original
//      CambioColor         : El color ha cambiar
///*******************************************************/

function RestaurarFila(objFila,Tipo,ColorNormal,ColorAlternativo){
        if (document.getElementById(objFila)==null){return}
       // alert(document.getElementById(objFila).style.backgroundColor)
        //if (document.getElementById(objFila).style.backgroundColor=="#c9c9c9"){return}
       
	    if (Tipo=="NORMAL"){		        
		    obj = document.getElementById(objFila);
		    obj.style.backgroundColor = ColorNormal;
	    }else{
		    obj = document.getElementById(objFila);
		    obj.style.backgroundColor = ColorAlternativo;
	    }
}




function PintaFila(hidIndex, objFila, Nombregrilla, ColorNormal, ColorAlternativo) {	

    grilla=document.getElementById(Nombregrilla) 
    if (grilla==null){return} 
    LisTR=grilla.getElementsByTagName("tr")  

    for (var i = 0; i <= LisTR.length-1; i++){ 
        if (i>0){    
            if ((i%2)==1){
                LisTR[i].style.backgroundColor = ColorNormal
             }else{
                LisTR[i].style.backgroundColor = ColorAlternativo
             }  
	    }
	}

	if (document.getElementById(hidIndex) == null) { return }
	if (document.getElementById(hidIndex).value =="-1" ) { return } 
    if ( document.getElementById(objFila)==null){return}   
    obj = document.getElementById(objFila);
	obj.style.backgroundColor = "#C9C9C9"
	
            
	
}
    
    function mensajeConfirm(e, mensaje) {
    if (!confirm(mensaje)) {
        if (window.event) {
                window.event.cancelBubble = true;
                window.event.returnValue = false;
        }
            if (e && e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }
    
    /*function mensajeConfirm(e, mensaje) {
        if (!confirm(mensaje)) {
            if (window.event) {
                window.event.cancelBubble = true;
                window.event.returnValue = false;
            }
            if (e && e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }*/
    

///*******************************************************/
//Autor              : Marco Antonio Flores Santos
//Nombre             : MostrarDiv
//Descripcion        : Muestra un Div en una determinada posicion 
//      ObjDiv          : Div que se va mostrar
//      left         : Posicion Izquierda
//      top          : Posicion Derecha
//      Mensaje      : Mensaje que sale en el DIV
///*******************************************************/      
   
    function MostrarDiv(ObjDiv,left,top,Mensaje)
		{	
			var Div=document.getElementById(ObjDiv);
			Div.style.display='block';
			Div.style.visibility='visible';
			Div.style.pixelLeft=left
			Div.style.pixelTop=top	
			Div.innerHTML=Mensaje
		}

///*******************************************************/
//Autor              : Marco Antonio Flores Santos
//Nombre             : OcultarDiv
//Descripcion        : Oculta un DIV
//      Obj          : Div que se va Ocultar
///*******************************************************/         	
    function OcultarDiv(Obj)
		{						
			var Div=document.getElementById(Obj);
			Div.style.display='none';
			Div.style.visibility='hidden'
		}
		
///*******************************************************/
//Autor              : Marco Antonio Flores Santos
//Nombre             : ColocarMensajeDiv
//Descripcion        : Muestra un mensje en un DIV y lo coloca donde corresponde
//      Obj          : OBjeto donde se va ha mostrar
//      Div          : Div que se va ha mostrar   
//      Mensaje      : Mensaje que sale en el DIV
///*******************************************************/      
		
		
    function ColocarMensajeDiv(obj,Div,Mensaje) {
    		var curleft = curtop = 0;
		obj=document.getElementById(obj);
		obj.focus();	
		
		if (obj.offsetParent) {
			curleft = obj.offsetLeft
			curtop = obj.offsetTop
			while (obj = obj.offsetParent) {
				curleft += obj.offsetLeft
				curtop += obj.offsetTop
			}
		}
		
		MostrarDiv(Div,curleft,curtop+15,Mensaje)			
		setTimeout("OcultarDiv('"+Div+"')",3000)		
	}
	
///*******************************************************/
//Autor              : Marco Antonio Flores Santos
//Nombre             : f_AllObligatoridad
//Descripcion        : Cololca obligatoridad(1)/libertad(0) a todos los componenetes del formulario
//      intOblig     : indica si los componentes son o no obligatorios (1=Obligatorios) y (2=No ogligatorios)
///*******************************************************/      
	
	
	function f_AllObligatoridad(intOblig){
        formulario=document.forms[0]	   
        for (var i = 0; i < formulario.elements.length; i++) {     		
            if ((formulario.elements[i].type=='text')||(formulario.elements[i].type=='select-one') || (formulario.elements[i].type=='textarea')){
                formulario.elements[i].required=intOblig
            }		      
        }            
	}

///*******************************************************/
//Autor              : Marco Antonio Flores Santos
//Nombre             : f_Salir
//Descripcion        : redireccionar a la pagina frmCuerpo
//    
///*******************************************************/      
   function f_Salir(){
        window.location.href="../../frmCuerpo.aspx";
        return false;
    }
        
///*******************************************************/
//Autor              : Alexander  Pereira
//Nombre             : leeCookie
//Descripcion        : devuelve el valor de una cookie segun la clave
//    
///*******************************************************/
function leeCookie(nombre) 
{
    // Obtener cookie
    var cookies = document.cookie; if (!cookies) return false;
    // Guardo en comienzo la posición del 1º caracter del nombre de la cookie que se busca
    var comienzo = cookies.indexOf(nombre);

    // Si  posición obtenida es inválida es porque no existe una cookie con ese nombre; se retorna false
    if (comienzo == -1) return false;
    // Guardo en comienzo la posición del 1º caracter del valor que pretendo retornar
    comienzo = comienzo + nombre.length + 1;
    // Guardo en cantidad la cantidad de caracteres de largo que posee el valor a retornar
    if (cantidad = cookies.indexOf("&", comienzo) > 0) {
        cantidad = cookies.indexOf("&", comienzo) - comienzo;
    }
    else {
        cantidad = cookies.length - comienzo;
    }

    if (cantidad == 0) {
        cantidad = cookies.length;
    }
    // Fracciono la cadena para retornar solo el valor de la cookie de interés
   return Utf8.decode(cookies.substr(comienzo, cantidad));
   // return cookies.substr(comienzo, cantidad);
}    
    
    function F_FechaMayorIgual(Obj1,Obj2) 
{
	

	FormatoFecha=GlobalFormatoFecha
		 
		if ( (FormatoFecha=="MM/dd/yyyy"))	{
	        Obj1=Obj1.substr(3,2)+"/"+Obj1.substr(0,2)+"/"+Obj1.substr(6,4)     
	        Obj2=Obj2.substr(3,2)+"/"+Obj2.substr(0,2)+"/"+Obj2.substr(6,4)     
        }	

	    if ( (FormatoFecha=="yyyy/dd/MM"))	{
            Obj1=Obj1.substr(5,2)+"/"+Obj1.substr(8,2)+"/"+Obj1.substr(0,4)         	    
	        Obj2=Obj2.substr(5,2)+"/"+Obj2.substr(8,2)+"/"+Obj2.substr(0,4)         	    
        }
        
        if ( (FormatoFecha=="yyyy/MM/dd"))	{
            Obj1=Obj1.substr(8,2)+"/"+Obj1.substr(5,2)+"/"+Obj1.substr(0,4)         	    
            Obj2=Obj2.substr(8,2)+"/"+Obj2.substr(5,2)+"/"+Obj2.substr(0,4) 
       }	
        
        if ( (FormatoFecha=="dd/yyyy/MM") )	{
	        Obj1=Obj1.substr(0,2)+"/"+Obj1.substr(8,2)+"/"+Obj1.substr(3,4)         	    
	        Obj2=Obj2.substr(0,2)+"/"+Obj2.substr(8,2)+"/"+Obj2.substr(3,4)         	    
        }	
        
        if ( (FormatoFecha=="MM/yyyy/dd") )	{
	        Obj1=Obj1.substr(8,2)+"/"+Obj1.substr(0,2)+"/"+Obj1.substr(3,4) 
	        Obj2=Obj2.substr(8,2)+"/"+Obj2.substr(0,2)+"/"+Obj2.substr(3,4)   
        }	

    String1 =  Obj1;
	String2 = Obj2;

	// Si los dias y los meses llegan con un valor menor que 10
	// Se concatena un 0 a cada valor dentro del string
	/* RAUL 11OCT10 : Cambie esto, se caia*/
	if (String1.substring(1,2)=="/") 
		String1="0"+String1
	if (String1.substring(4,5)=="/")
		String1=String1.substring(0,3)+"0"+String1.substring(3,9)
	if (String2.substring(1,2)=="/") 
		String2="0"+String2
	if (String2.substring(4,5)=="/")
		String2=String2.substring(0,3)+"0"+String2.substring(3,9)
	dia1=String1.substring(0,2);
	mes1=String1.substring(3,5);
	anyo1=String1.substring(6,10);
	dia2=String2.substring(0,2);
	mes2=String2.substring(3,5);
	anyo2=String2.substring(6,10);
	/**//*
	if (String1.value.substring(1, 2) == "/")
	    String1 = "0" + String1
	if (String1.value.substring(4, 5) == "/")
	    String1 = String1.substring(0, 3) + "0" + String1.substring(3, 9)
	if (String2.value.substring(1, 2) == "/")
	    String2 = "0" + String2
	if (String2.value.substring(4, 5) == "/")
	    String2 = String2.substring(0, 3) + "0" + String2.substring(3, 9)
	dia1 = String1.value.substring(0, 2);
	mes1 = String1.value.substring(3, 5);
	anyo1 = String1.value.substring(6, 10);
	dia2 = String2.value.substring(0, 2);
	mes2 = String2.value.substring(3, 5);
	anyo2 = String2.value.substring(6, 10);
*/
	if (dia1 == "08") // parseInt("08") == 10 base octogonal
		dia1 = "8";
	if (dia1 == '09') // parseInt("09") == 11 base octogonal
		dia1 = "9";
	if (mes1 == "08") // parseInt("08") == 10 base octogonal
		mes1 = "8";
	if (mes1 == "09") // parseInt("09") == 11 base octogonal
		mes1 = "9";
	if (dia2 == "08") // parseInt("08") == 10 base octogonal
		dia2 = "8";
	if (dia2 == '09') // parseInt("09") == 11 base octogonal
		dia2 = "9";
	if (mes2 == "08") // parseInt("08") == 10 base octogonal
		mes2 = "8";
	if (mes2 == "09") // parseInt("09") == 11 base octogonal
		mes2 = "9";

	dia1=parseInt(dia1);
	dia2=parseInt(dia2);
	mes1=parseInt(mes1);
	mes2=parseInt(mes2);
	anyo1=parseInt(anyo1);
	anyo2=parseInt(anyo2);

	if (anyo1>anyo2)
		return true;
	if ((anyo1==anyo2) && (mes1>mes2))
		return true;
		
	if ((anyo1==anyo2) && (mes1==mes2) && (dia1>dia2)){
		return true;
		    
	}	
	return false;
}

function RedirecTransaccion(URL){
    if (confirm("¿Está seguro de salir de la opción sin finalizar la transacción?")) {
        document.location.href = URL
    }
    return false
}

function F_CerrarVentana(URL) {
    if (confirm("¿Está seguro de salir de la opción sin finalizar la transacción?")) {
            window.close();
    }
    return false
}    
function F_Cerrar() {
    window.location.href= '../../frmcuerpo.aspx'
    return false
}    



function F_SelectAllChkGrilla(NombreGrilla, NombreCheck, Inicio)
{		    
	var i;
	var Check;		    				 		      
 	oTabla = document.getElementById(NombreGrilla);
	total_registros = oTabla.rows.length;	
      			
	for (i=Inicio;i<=total_registros; i++){  
	    //grvLista_ctl06_chkSel 	
	    if (i>9) {
            Check= NombreGrilla + "_ctl" + i + "_" + NombreCheck
         }else{   
            Check= NombreGrilla + "_ctl0" + i + "_" + NombreCheck
         }
         
		if (document.getElementById(Check)!=null){						
		    document.getElementById(Check).checked=true					
        }							
    }	
}

function F_Chk_Marcado_Grilla(NombreGrilla, NombreCheck, Inicio)
{		    
	var i;
	var Check;		    				 		      
 	oTabla = document.getElementById(NombreGrilla);
	total_registros = oTabla.rows.length;	
      			
	for (i=Inicio;i<=total_registros; i++){  	    	
	    if (i>9) {
            Check= NombreGrilla + "_ctl" + i + "_" + NombreCheck
         }else{   
            Check= NombreGrilla + "_ctl0" + i + "_" + NombreCheck
         }
         
		if (document.getElementById(Check)!=null){						
		    if (document.getElementById(Check).checked==true){
		        return true
		    }    
        }							
    }	
    return false
}

var isNN = (navigator.appName.indexOf("Netscape")!=-1);

function autoTab(input,len, e) {
  var keyCode = (isNN) ? e.which : e.keyCode; 
  var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
  if(input.value.length >= len && !containsElement(filter,keyCode)) {
    input.value = input.value.slice(0, len);
    input.form[(getIndex(input)+1) % input.form.length].focus();
  }

  function containsElement(arr, ele) {
    var found = false, index = 0;
    while(!found && index < arr.length)
    if(arr[index] == ele)
    found = true;
    else
    index++;
    return found;
  }

  function getIndex(input) {
    var index = -1, i = 0, found = false;
    while (i < input.form.length && index == -1)
    if (input.form[i] == input)index = i;
    else i++;
    return index;
  }
  return true;
}


 function trim(Cadena) {
	return Cadena.replace(/^\s+|\s+$/g,"");
}
function ltrim(Cadena)  {
	return Cadena.replace(/^\s+/,"");
}
function rtrim(Cadena) {
	return Cadena.replace(/\s+$/,"");
}

function F_RangosIncorrectos(Obj1,Obj2,StrError){
 if ( 
        ((Obj1.value!="")&& (Obj2.value=="")) ||
        ((Obj2.value!="")&& (Obj1.value=="")) 
   ){
      
        Obj1.className="error"   
        Obj1.className="error"   
        Obj2.focus();                              
          return StrError
    }
    return ""
}    


function F_CamposValidos(FormularioPagina,styloError) {     
      	
	  formulario = FormularioPagina
	  StrErrorCampos=""
	  for (var i = 0; i < formulario.elements.length; i++){ 
	  
		     if ( (formulario.elements[i].type=='text')||(formulario.elements[i].type=='textarea')){
		        if (formulario.elements[i].required=="1"){		        
		              if (formulario.elements[i].value==""){
		                formulario.elements[i].className = styloError
		                StrErrorCampos=StrErrorCampos+"- "+formulario.elements[i].realname+"\n"
		                if (formulario.elements[i].disabled==false){
		                    formulario.elements[i].focus();
		                }
		              }else{
		                formulario.elements[i].className = "stlTextBox"		            	            
		              } 
		        }
            }   
    		    
            if (formulario.elements[i].type=='select-one'){
                if (formulario.elements[i].required=="1"){
                    if (formulario.elements[i].value==formulario.elements[i].exclude){
		                formulario.elements[i].className = styloError
		                StrErrorCampos=StrErrorCampos+formulario.elements[i].realname+"\n"
		                if (formulario.elements[i].disabled==false){
		                    formulario.elements[i].focus();
		                }

                    }else{
		                formulario.elements[i].className = "stlCombo"		            	            
                    }   
		        }
            } 
	   } // for	  
	   
     if (StrErrorCampos==""){
        return true
     }else{
        alert("Ingrese valores y/o seleccione valores para el(los) siguientes(s) campo(s):\n"+StrErrorCampos)
        return false
     }
 }
 
 function RangoEnteroInvalido(Numero,numMin,digits){
    switch (digits) {
        case "int4": numMax = 127; break;
        case "int8": numMax = 255; break;
        case "int16": numMax = 32767; break;
        case "int32": numMax = 2147483647; break;
    }
    if ((numMin>Numero)||(numMax<Numero)){
        return true
    }else{
        return false        
    }                

}
 
 
 
 
 function F_ValorFecha(StrFecha){

        valorAux="0"
        FormatoFecha=GlobalFormatoFecha
    
         if ( (FormatoFecha=="dd/MM/yyyy"))	{
	        valorAux=  StrFecha.substr(6,4)+ StrFecha.substr(3,2)+ StrFecha.substr(0,2)
	        
        }	
        
        if ( (FormatoFecha=="MM/dd/yyyy"))	{
	        valorAux=  StrFecha.substr(6,4)+ StrFecha.substr(0,2)+ StrFecha.substr(3,2)
	        
        }	

	    if ( (FormatoFecha=="yyyy/dd/MM"))	{
            valorAux=  StrFecha.substr(0,4)+ StrFecha.substr(8,2)+ StrFecha.substr(5,2)
	     }
        
        if ( (FormatoFecha=="yyyy/MM/dd"))	{
            valorAux=  StrFecha.substr(0,4)+ StrFecha.substr(5,2)+ StrFecha.substr(8,2)	      
       }	
        
        if ( (FormatoFecha=="dd/yyyy/MM") )	{
                valorAux=  StrFecha.substr(3,4)+ StrFecha.substr(8,2)+ StrFecha.substr(0,2)       
         }	
        
        if ( (FormatoFecha=="MM/yyyy/dd") )	{
	        valorAux=  StrFecha.substr(3,4)+ StrFecha.substr(0,2)+ StrFecha.substr(8,2)       
	    }
	    
	    return parseInt(valorAux)
}    

function RecuperarDiaFecha(StrFecha){

        valorAux="0"
        FormatoFecha=GlobalFormatoFecha
    
         if ( (FormatoFecha=="dd/MM/yyyy"))	{
	        return StrFecha.substr(0,2)
	        
        }	
        
        if ( (FormatoFecha=="MM/dd/yyyy"))	{
	        return  StrFecha.substr(3,2)
	        
        }	

	    if ( (FormatoFecha=="yyyy/dd/MM"))	{
            return StrFecha.substr(5,2)
	     }
        
        if ( (FormatoFecha=="yyyy/MM/dd"))	{
           return StrFecha.substr(8,2)	      
       }	
        
        if ( (FormatoFecha=="dd/yyyy/MM") )	{
                return  StrFecha.substr(0,2)       
         }	
        
        if ( (FormatoFecha=="MM/yyyy/dd") )	{
	        return StrFecha.substr(8,2)       
	    }
	    
	  
}

function F_FormatearFecha(StrFecha){
        a = StrFecha.substr(0,4); 
		m = StrFecha.substr(4 ,2); 
		d = StrFecha.substr(6 ,2);
        valorAux=""
        FormatoFecha = GlobalFormatoFecha
        if ( (FormatoFecha=="dd/MM/yyyy"))	{
	        valorAux=d+"/"+m+"/"+a
	        
        }	
        
        if ( (FormatoFecha=="MM/dd/yyyy"))	{
	        valorAux=m+"/"+d+"/"+a
	        
        }	

	    if ( (FormatoFecha=="yyyy/dd/MM"))	{
            valorAux=a+"/"+d+"/"+m
	     }
        
        if ( (FormatoFecha=="yyyy/MM/dd"))	{
            valorAux=a+"/"+m+"/"+d
       }	
        
        if ( (FormatoFecha=="dd/yyyy/MM") )	{
                valorAux=d+"/"+a+"/"+m
         }	
        
        if ( (FormatoFecha=="MM/yyyy/dd") )	{
	        valorAux=m+"/"+a+"/"+d
	    }
	    
	    return valorAux
	}

	///*******************************************************/
	//Autor              : Francisco Junior Cáceres Honores
	//Nombre             : FechaSistema
	//Descripcion        : Obtiene la fecha del Sistema 
	//    
	///*******************************************************/ 
	function FechaSistema() {
	    var mydate = new Date();
	    var a = mydate.getYear();
	    if (a < 1000)
	        a += 1900;
	    var m = mydate.getMonth() + 1;
	    if (m < 10)
	        m = "0" + m;
	    var d= mydate.getDate();
	    if (d < 10)
	        d = "0" + d;
	        
	    valorAux = ""
	    FormatoFecha = GlobalFormatoFecha
	    
	    if ((FormatoFecha == "dd/MM/yyyy")) {
	        valorAux = d + "/" + m + "/" + a

	    }

	    if ((FormatoFecha == "MM/dd/yyyy")) {
	        valorAux = m + "/" + d + "/" + a

	    }

	    if ((FormatoFecha == "yyyy/dd/MM")) {
	        valorAux = a + "/" + d + "/" + m
	    }

	    if ((FormatoFecha == "yyyy/MM/dd")) {
	        valorAux = a + "/" + m + "/" + d
	    }

	    if ((FormatoFecha == "dd/yyyy/MM")) {
	        valorAux = d + "/" + a + "/" + m
	    }

	    if ((FormatoFecha == "MM/yyyy/dd")) {
	        valorAux = m + "/" + a + "/" + d
	    }

	    return valorAux
	}  
	
	///*******************************************************/
//Autor             : Marco Antonio Flores Santos
//Nombre            : F_DarFormatoNumero
//Descripcion       : Reemplaza la coma por el punto para darle el formato
//      obj         : El componente del texto
///*******************************************************/

function F_DarFormatoNumeroValor(valor,NroDecimales){
    StrNumero=""
    StrNumero=valor.toString() 
    if (StrNumero=="")
    {
      
        return ""
    }

   
     if (GlobalPuntoDecimal==","){
        StrNumero=StrNumero.replace(/\./g,"")
        StrNumero=StrNumero.replace(/\,/g,".")
       
    }else{
         StrNumero=StrNumero.replace(/\,/g,"")    
        
    } 
    
      NumeroEval=parseFloat(StrNumero)
  
 
    if (isNaN(NumeroEval)){
        alert("El valor Ingresado no es número")
        return ""
    }else{                    
        return F_formato_numero(StrNumero,NroDecimales,GlobalPuntoDecimal,GlobalSeparadorMiles)           
    }

}

///*******************************************************/
//Autor             : Francisco Junior Cáceres Honores
//Nombre            : F_CambiaFoco
//Descripcion       : Envía el foco a un componente ingresado como parámetro
//componente        : El componente del texto
//idsalir           : Identificador del botón salir (opcional), puede ser otro componente
///*******************************************************/
function F_EnviarFoco(componente, idsalir) {
    if (document.getElementById(idsalir) != null) {
        document.getElementById(idsalir).focus();
    }       

    if (document.getElementById(componente) != null) {
        if (document.getElementById(componente).disabled == false) {
            document.getElementById(componente).focus();
        }
       
    }

}

 


function InicializarGrilla(
    vGrilla,
    ddlPaginasGrid,
    lblTotalRegistros,
    ibtnPrimero,
    ibtnAnterior,
    ibtnSiguiente,
    ibtnUltimo
    ) {
    var oTabla;
    var nFila;
    oTabla = document.getElementById(vGrilla);
    if (document.getElementById(vGrilla) != null) {
        nFila = oTabla.rows.length;
        if (nFila > 1) {
            while (nFila != 1) {
                oTabla.deleteRow();
                nFila = nFila - 1;
            }
        }

        myList = document.getElementById(ddlPaginasGrid)
        if (myList != null){
            for (var count = myList.options.length - 1; count >= 0; count--) {
                myList.options[count] = null;
            }
        }
        
        if (document.getElementById(lblTotalRegistros)!= null) {
		    document.getElementById(lblTotalRegistros).innerText = "Total de registros: 0";
		}	

        if(document.getElementById(ibtnPrimero)!= null){
		    document.getElementById(ibtnPrimero).style.display = 'none'
        }	
        
        if (document.getElementById(ibtnAnterior)!=null){
		    document.getElementById(ibtnAnterior).style.display = 'none';
        }	
		
		if (document.getElementById(ibtnSiguiente)!=null){
		    document.getElementById(ibtnSiguiente).style.display = 'none';
		}   
        
        if (document.getElementById(ibtnUltimo) != null) {
		    document.getElementById(ibtnUltimo).style.display = 'none';
        }	       
        
    }
}

function F_BloquearMenu(){
  if (window.parent.frames[1]!=null){
    window.parent.frames[1].ManejarBloqueo(0)
  }
}

function F_CompletarCeros(TextBox,longitud){
    Text = document.getElementById(TextBox)
    Valor= Text.value
    lon = Valor.length
    
    
    Valor = ltrim(rtrim(Valor))
    if (Valor==""){
        Text.value=Valor
        return true
    }
    
    if (longitud < 30) {
        if (lon <= longitud){
            Valor= "0000000000000000000000000000000000000000000000000000000000000000000000000000".substring(0, longitud - lon) + Valor
          
        } 
    }
    Text.value=Valor
    return true
}

//[ RAUL 13ENE11
function F_CompletarCerosTextBox(field, len){
  
  var lg = field.value.length;
  if (lg<=0){return false;}
  var lgf = len - lg;
  var ceros = Left('0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',lgf)
  var nuevovalor = ceros + field.value;
  field.value = nuevovalor;
  return true;
  
}
// RAUL ]
//[RAUL 03DIC10]
function Left(cadena, tamanio){
  return cadena.substr(0, tamanio); 
}
//[RAUL]


// [ RAUL 04OCT11 

function onKeyPressTextBox() {
    KeyAscii = event.keyCode;
    if (KeyAscii == 13) {
        event.keyCode = 0;  
    }
}

// RAUL ] 


function F_SeleccionFormato(){
     Args = 'dialogHeight: 50px; dialogWidth: 200px; edge: Raised; center: Yes; help: No; resizable: No; status: No';
     window.showModalDialog("../../VisorReporte/SeleccionFormato.aspx", "", Args) 
}      

function F_VisorReportePrinter(){
    oDatos = new Object();
    Args = 'dialogHeight: 450px; dialogWidth: 600px; edge: Raised; center: Yes; help: No; resizable: No; status: No';
    ven=window.open('../../VisorReporte/VisorReporte.aspx', "Reportes", "left=50, top=50, width=700, height=450, toolbar=no, directories=no, location=no, statusbar=no, menubar=no, resizable=yes, scrollbars=yes");
    ven.focus();
}      

function F_Habilitar(field, habilita){
  field.disabled = habilita;
}
//[RAUL 25ENE11

function F_Selecciona(field)
{
  field.select();
}

function F_Enfoque(field){
    if (document.getElementById(field).disabled==false){
        document.getElementById(field).focus();
    }
}
//]

//[RAUL 10ENE11
function F_CargarVentanaPopUp(pURL, pAlto, pAncho, pBtnExec){
  try{    
    Args = 'dialogHeight:' + pAlto + 'px; dialogWidth: ' + pAncho + 'px; edge: Raised; center: Yes; help: No; resizable: No; status: No; scroll: No';
    if (window.showModalDialog(pURL, "", Args)) {
      if(pBtnExec.value!=""){  
        document.getElementById(pBtnExec).click();
      }
        return false;
    }
    else {
        return false;
    }
  }
  catch (err) {
    Error = "Error en la validación: " + err.description + "\n";
    alert(Error);
    return false;
  }
}
// ]


function F_Print(TipoPrint,Delimitador){
     oDatos = new Object();
     Args = 'dialogHeight: 130px; dialogWidth: 300px; edge: Raised; center: Yes; help: No; resizable: yes; status: No';
     sUrl="../../VisorReporte/Printer.aspx?TipoPrint="+TipoPrint+"&Delimitador="+Delimitador
     if (window.showModalDialog(sUrl, oDatos, Args)){
        return true
     }else{
        return false
     }

 }

 ///*******************************************************/
 //Autor             : Yanet Calin Choquenaira Garay
 //Nombre            : Agegar_fecha
 //Descripcion       : Modifica el valo de la fecha ya sea en el Mes y Año 
 //      Tipo        : 
 ///*******************************************************/

 Date.prototype.agregar = function(sInterval, iNum) {
     var dTemp = this;
     if (!sInterval || iNum == 0) return dTemp;
     switch (sInterval.toLowerCase()) {
         case "d":
             dTemp.setDate(dTemp.getDate() + iNum);
             break;
         case "mo":
             dTemp.setMonth(dTemp.getMonth() + iNum);
             break;
         case "y":
             dTemp.setFullYear(dTemp.getFullYear() + iNum);
             break;
     }
     return dTemp;
 }
 
/********************************************************
Autor             : Daniel Evangelista Zevallos
Nombre            : F_DateDiff
Descripcion       : Compara entre dos fechas y devuelve, la diferencia de dias, meses y años
Parametros        : 
                    - txtFechaUno: Nombre del objeto textBox que contiene la primera fecha.
                    - txtFechaDos: Nombre del objeto textBox que contiene la segunda fecha.
                    - DateInterval: El intervalo es 'd','m','y' : devuelve la cantidad de dias, meses, años respectivamente.
********************************************************/       
function F_DateDiff(txtFechaUno,txtFechaDos,DateInterval){
    var objFechaUno=txtFechaUno.value;
    var objFechaDos=txtFechaDos.value;
                        
    var objMesUno='';
    var objDiaUno='';
    var objAnioUno='';
    var objMesDos='';
    var objDiaDos='';
    var objAnioDos='';
            
    FormatoFecha=GlobalFormatoFecha;
            
    if ((FormatoFecha == "dd/MM/yyyy")) {
        objDiaUno=objFechaUno.substr(0,2);
        objMesUno=objFechaUno.substr(3,2);
        objAnioUno=objFechaUno.substr(6,4); 	            
        objDiaDos=objFechaDos.substr(0,2);
        objMesDos=objFechaDos.substr(3,2);
        objAnioDos=objFechaDos.substr(6,4);
    }
            
    if ( (FormatoFecha=="MM/dd/yyyy"))	{
        objMesUno=objFechaUno.substr(0,2);
        objDiaUno=objFechaUno.substr(3,2);
        objAnioUno=objFechaUno.substr(6,4);	            
        objMesDos=objFechaDos.substr(0,2);
        objDiaDos=objFechaDos.substr(3,2);
        objAnioDos=objFechaDos.substr(6,4);    
    }	
            
    if ( (FormatoFecha=="yyyy/dd/MM"))	{
        objAnioUno=objFechaUno.substr(0,4);
        objDiaUno=objFechaUno.substr(5,2);
        objMesUno=objFechaUno.substr(8,2); 	            
        objAnioDos=objFechaDos.substr(0,4);
        objDiaDos=objFechaDos.substr(5,2);
        objMesDos=objFechaDos.substr(8,2); 	            
    }
        
    if ( (FormatoFecha=="yyyy/MM/dd"))	{
        objAnioUno=objFechaUno.substr(0,4);
        objMesUno=objFechaUno.substr(5,2);
        objDiaUno=objFechaUno.substr(8,2); 	            
        objAnioDos=objFechaDos.substr(0,4);
        objMesDos=objFechaDos.substr(5,2);
        objDiaDos=objFechaDos.substr(8,2);             
    }	
        
    if ( (FormatoFecha=="dd/yyyy/MM") )	{
        objAnioUno=objFechaUno.substr(3,4);
        objMesUno=objFechaUno.substr(8,2);
        objDiaUno=objFechaUno.substr(0,2); 	            
        objAnioDos=objFechaDos.substr(3,4);
        objMesDos=objFechaDos.substr(8,2);
        objDiaDos=objFechaDos.substr(0,2);  	             	    
    }	
        
    if ( (FormatoFecha=="MM/yyyy/dd") )	{
        objAnioUno=objFechaUno.substr(3,4);
        objMesUno=objFechaUno.substr(0,2);
        objDiaUno=objFechaUno.substr(8,2); 	            
        objAnioDos=objFechaDos.substr(3,4);
        objMesDos=objFechaDos.substr(0,2);
        objDiaDos=objFechaDos.substr(8,2);
    }
            
    var dateFechaUno=objMesUno + '/' + objDiaUno + '/' + objAnioUno;
    var dateFechaDos=objMesDos + '/' + objDiaDos + '/' + objAnioDos;
            
    var DateDiff = { 
            inDays: function(d1, d2) {
                        var t2 = d2.getTime();
                        var t1 = d1.getTime(); 
                        return parseInt((t2-t1)/(24*3600*1000));
                    }, 
            inWeeks: function(d1, d2) {
                        var t2 = d2.getTime();
                        var t1 = d1.getTime(); 
                        return parseInt((t2-t1)/(24*3600*1000*7));
                    }, 
            inMonths: function(d1, d2) {
                        var d1Y = d1.getFullYear();
                        var d2Y = d2.getFullYear();
                        var d1M = d1.getMonth();
                        var d2M = d2.getMonth(); 
                        return (d2M+12*d2Y)-(d1M+12*d1Y);
                    }, 
            inYears: function(d1, d2) {
                        return d2.getFullYear()-d1.getFullYear();
                    }
        }
            
    var d1 = new Date(dateFechaUno);
    var d2 = new Date(dateFechaDos);
            
    switch(DateInterval){
        case 'd':
            return DateDiff.inDays(d1, d2).toString();
            break;
        case 'm':
            return DateDiff.inMonths(d1,d2).toString();
            break;
        case 'y':
            return DateDiff.inYears(d1,d2).toString();
            break;                
    }
}

