<%@ Page Title="MedioPago" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="MedioPago.aspx.cs" Inherits="SistemaInventario.Reportes.MedioPago" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>       
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="MedioPago.js" charset="UTF-8"></script>
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />       
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 430px">
        Reporte de Ventas por Medio de Pago</div>
    <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all"
        style="width: 430px">
        <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
            Criterio de busqueda
        </div>
        <div class="ui-jqdialog-content" style="width: 430px;">
            <table cellpadding="0" cellspacing="0" class="form-inputs" width="350">
                <tr>
                    <td style="font-weight: bold">
                        Empresa
                    </td>
                    <td colspan='4' style="padding-left: 4px;">
                        <div id="div_Empresa">
                            <asp:DropDownList ID="ddlEmpresa" runat="server" Font-Names="Arial" ForeColor="Blue"
                                Font-Bold="True" Width="200" BackColor="#FFFF99">
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>

                    <tr>
                    <td style="font-weight: bold">
                        Sucursal
                    </td>
                    <td colspan='4' style="padding-left: 4px;">
                        <div id="div_Sucursal">
                            <asp:DropDownList ID="ddlSucursal" runat="server" Font-Names="Arial" ForeColor="Blue"
                                Font-Bold="True" Width="200" BackColor="#FFFF99">
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold ;display: none;">
                        Tipo Doc
                    </td>
                    <td colspan='4' style="padding-left: 4px;;display: none">
                        <div id="div_TipoDoc">
                            <asp:DropDownList ID="ddlTipoDoc" runat="server" Font-Names="Arial" ForeColor="Blue"
                                Font-Bold="True" Width="200" BackColor="#FFFF99">
                                <asp:ListItem Selected="True" Text="TODOS" Value="0"></asp:ListItem>
                                <asp:ListItem Text="SUNAT" Value="1"></asp:ListItem>
                                <asp:ListItem Text="PROFORMAS" Value="16"></asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold">
                        Desde
                    </td>
                    <td colspan='4'>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtDesde" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold; padding-left: 42px;">
                                    Hasta
                                </td>
                                <td>
                                    <asp:TextBox ID="txtHasta" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold">
                        CLIENTE
                    </td>
                    <td style="padding-left: 4px;">
                        <asp:TextBox ID="txtCliente" runat="server" Width="350px" Font-Names="Arial" ForeColor="Blue"
                            Font-Bold="True"></asp:TextBox>
                    </td>
                    <td style="display: none;">
                        <asp:CheckBox ID="chkVencidas" runat="server" Text="Solo Vencidas" Font-Bold="True" />
                    </td>
                    <td style="display: none;">
                        <asp:CheckBox ID="chkDeudas" runat="server" Text="todas DEUDAS" Checked="True" Font-Bold="True" />
                    </td>
                    <td style="display: none;">
                        <asp:CheckBox ID="chkTodas" runat="server" Text="todas" Font-Bold="True" />
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold ;display: none;" colspan='5'>
                        <asp:CheckBox ID="chkVenasExternas" runat="server" Text="Incluir ventas externas" Font-Bold="True" />
                    </td>
                </tr>
            </table>
        </div>
        <div class="linea-button">
            <asp:Button ID="btnExcel" runat="server" Text="Excel" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                Font-Names="Arial" Font-Bold="True" Width="120" Style="display: none;" />
            <asp:Button ID="btnBuscar" runat="server" Text="Reporte" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                Font-Names="Arial" Font-Bold="True" Width="120" />
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
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfCliente" type="hidden" value="0" />
</asp:Content>
