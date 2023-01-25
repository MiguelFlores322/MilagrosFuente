<%@ Page Title="Caja Banco" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="CajaBanco.aspx.cs" Inherits="SistemaInventario.Reportes.CajaBanco" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"
        type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="CajaBanco.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 470px">
        REPORTE CAJA BANCO</div>
    <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 470px">
        <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
            cuenta origen
        </div>
        <table cellpadding="0" cellspacing="0" class="form-inputs" width="470">
            <tr>
                <td style="font-weight: bold">
                    Empresa
                </td>
                <td>
                    <div id="div_Empresa">
                        <asp:DropDownList ID="ddlEmpresa" runat="server" Font-Names="Arial" ForeColor="Blue"
                            Font-Bold="True" Width="200">
                        </asp:DropDownList>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="font-weight: bold">
                    Banco
                </td>
                <td>
                    <div id="div_Banco">
                        <asp:DropDownList ID="ddlBanco" runat="server" Font-Names="Arial" ForeColor="Blue"
                            Font-Bold="True" Width="200">
                        </asp:DropDownList>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="font-weight: bold">
                    Moneda
                </td>
                <td>
                    <div id="div_Moneda">
                        <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial" ForeColor="Blue"
                            Font-Bold="True" Width="200">
                        </asp:DropDownList>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="font-weight: bold">
                    Cuenta Bancaria
                </td>
                <td>
                    <div id="div_CuentaBancaria">
                        <asp:DropDownList ID="ddlCuentaBancaria" runat="server" Font-Names="Arial" ForeColor="Blue"
                            Font-Bold="True" Width="200">
                        </asp:DropDownList>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="font-weight: bold">
                    Desde
                </td>
                <td>
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <asp:TextBox ID="txtDesde" runat="server" Width="55px" CssClass="Jq-ui-dtp" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                            </td>
                            <td style="font-weight: bold">
                                Hasta
                            </td>
                            <td>
                                <asp:TextBox ID="txtHasta" runat="server" Width="55px" CssClass="Jq-ui-dtp" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <div class="linea-button">
            <asp:Button ID="btnReporte" runat="server" Text="Reporte" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                Font-Names="Arial" Font-Bold="True" Width="120px" />
        </div>
    </div>
    <div id="dlgWait" style="background-color: #CCE6FF; text-align: center; display: none;">
        <br />
        <br />
        <center>
            <asp:Label ID="Label2" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large"
                Style="text-align: center"></asp:Label></center>
        <br />
        <center>
            <img alt="Wait..." src="../Asset/images/ajax-loader2.gif" /></center>
    </div>
    <input id="hfFlagRenovar" type="hidden" value="0" />
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfCodCtaCteConsulta" type="hidden" value="0" />
    <input id="hfCodigoTemporal" type="hidden" value="0" />
    <input id="hfCodDocumentoVenta" type="hidden" value="0" />
    <input id="hfCodEmpresa" type="hidden" value="0" />
    <input id="hfCodSede" type="hidden" value="0" />
</asp:Content>
