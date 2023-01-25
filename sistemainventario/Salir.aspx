<%@ Page Title="Login" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="Salir.aspx.cs" Inherits="SistemaInventario.Salir" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="Asset/js/js.js" type="text/javascript"></script>
    <script src="Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="Salir.js" charset="UTF-8"></script>
    <script src="Asset/js/WaterMark.min.js" type="text/javascript"></script>
    <link href="Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
    <link href="Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .centrar
        {
            position: absolute; /*nos posicionamos en el centro del navegador*/
            top: 50%;
            left: 50%; /*determinamos una anchura*/
            width: 450px; /*indicamos que el margen izquierdo, es la mitad de la anchura*/
            margin-left: -200px; /*determinamos una altura*/
            height: 200px; /*indicamos que el margen superior, es la mitad de la altura*/
            margin-top: -150px;
            border: 0px solid #6699CC;
            padding: 5px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class='centrar'>
        <div id="tabRegistro" style="width: 350px">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            </div>
            <div id="dlgWait" style="background-color: #CCE6FF; text-align: center; display: none;">
                <br />
                <br />
                <center>
                    <asp:Label ID="Label2" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large"
                        Style="text-align: center"></asp:Label></center>
                <br />
                <center>
                    <img alt="Wait..." src="Asset/images/ajax-loader2.gif" /></center>
            </div>
        </div>
    </div>
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfCodCtaCteConsulta" type="hidden" value="0" />
    <input id="hfCodigoTemporal" type="hidden" value="0" />
    <input id="hfCodDocumentoVenta" type="hidden" value="0" />
</asp:Content>
