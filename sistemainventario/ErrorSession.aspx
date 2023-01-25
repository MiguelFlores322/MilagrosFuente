<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ErrorSession.aspx.cs" Inherits="SistemaInventario.ErrorSession" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link href="Asset/css/sss.css" rel="stylesheet" type="text/css" />
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/jscript">
        function deshabilitaRetroceso() {
            window.location.hash = "no-back-button";
            window.location.hash = "Again-No-back-button" //chrome
            window.onhashchange = function () { window.location.hash = "no-back-button"; }
        }
        function Inicio() {
            window.location.href = "../SISTEMA/Inicio.aspx";
        }
    </script>
</head>
<body onload="deshabilitaRetroceso()">
    <form id="form1" runat="server">
    <div id="div_SESION" style="background-color: #F5F5F2">
        <br />
        <br />
        <center>
            <span style="color: #0080FF; font-size: xx-large; font-style: normal; font-family: Segoe UI;
                font-weight: lighter"><i class="icon-sitemap"></i>¡ EL TIEMPO DE SESIÓN HA EXPIRADO
                !</span>
            <hr style="color: #FAFAFA; background-color: #FAFAFA" />
            <span style="font-size: large; font-weight: 100; font-family: Segoe UI; text-align: left">
                Ha caducado el tiempo de sesión vuelva a iniciar sesión por favor.</span>
        </center>
        <br />
        <br />
        <span style="font-size: large; text-align: left; font-family: Segoe UI; color:#6E6E6E">Pruebe uno de
            los siguientes:</span>
        <ul style="text-align: left">
            <li><i class="icon-hand-right blue"></i><span style="font-size: medium; text-align: justify;
                font-family: Segoe UI; color:#6E6E6E">Vuelva a iniciar sesión</span></li>
            <p>
            </p>
            <p>
            </p>
            <li><i class="icon-hand-right blue"></i><span style="font-size: medium; text-align: left;
                font-family: Segoe UI; color:#6E6E6E">Comuniquese con el área de sistemas, por favor </span>
            </li>
        </ul>
        <br />
        <br />
        <br />
        <br />
        <center>
            <a href="javascript:Inicio()" class="button-link">  <i class="icon-arrow-left"></i>Iniciar Sesión</a>
        </center>
        <%--<img alt="Wait..." src="../Asset/images/ajax-loader2.gif" /></center>--%>
    </div>
    </form>
</body>
</html>
