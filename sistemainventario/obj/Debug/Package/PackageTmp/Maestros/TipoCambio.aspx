<%@ Page Title="Tipo Cambio" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="TipoCambio.aspx.cs" Inherits="SistemaInventario.Maestros.TipoCambio" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"   type="text/javascript"></script>     
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="TipoCambio.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"  type="text/css" />      
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/toars/toastr.min.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/toars/toastr.min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 630px">
        Tipo de Cambio</div>
    <div id="tabRegistro" style="width: 630px">
        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                Registro
            </div>
            <div id="divConsultaArticulo">
                <div class="ui-jqdialog-content">
                    <table width="600">
                        <tr>
                            <td style="padding-left: 5px; font-weight: bold;">
                                Fecha
                            </td>
                            <td style="padding-left: 9px;">
                                <asp:TextBox ID="txtFecha" runat="server" Width="55px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="true"></asp:TextBox>
                            </td>
                            <td style="padding-left: 5px; font-weight: bold;">
                                Compra
                            </td>
                            <td>
                                <asp:TextBox ID="txtCompraSunat" runat="server" Width="65px" Font-Names="Arial" ForeColor="Blue"
                                  CssClass="Derecha"    Font-Bold="True"></asp:TextBox>
                            </td>
                            <td style="padding-left: 5px; font-weight: bold;">
                                Venta
                            </td>
                            <td>
                                <asp:TextBox ID="txtVentaSunat" runat="server" Width="65px" Font-Names="Arial" ForeColor="Blue"
                                  CssClass="Derecha"    Font-Bold="True"></asp:TextBox>
                            </td>
                            <td style="padding-left: 5px; font-weight: bold;">
                                Paralelo
                            </td>
                            <td>
                                <asp:TextBox ID="txtParalelo" runat="server" Width="65px" Font-Names="Arial" ForeColor="Blue"
                                  CssClass="Derecha"    Font-Bold="True" class="MesAnioPicker hasDatepicker"></asp:TextBox>
                            </td>
                            <td style="padding-left: 11px;">
                                <asp:Button ID="btnGrabar" runat="server" Text="Grabar" Font-Names="Arial" Font-Bold="True"
                                    class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                    Width="120px" />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div style="padding-top: 5px;">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    Busqueda
                </div>
                <div>
                    <table>
                        <tr>
                            <td style="font-weight: bold;">
                                Periodo
                            </td>
                            <td>
                                <asp:TextBox ID="txtPeriodo" runat="server" Width="55px" Font-Names="Arial" Font-Bold="True"
                                    CssClass="MesAnioPicker" ReadOnly="true" ForeColor="Blue">
                                </asp:TextBox>
                            </td>
                            <td style="padding-left: 30px;">
                                <asp:HyperLink ID="HyperLink1" Target="_blank" runat="server" ForeColor="Blue" Font-Bold="True"
                                    Text="TIPO DE CAMBIO SUNAT" NavigateUrl="http://www.sunat.gob.pe/cl-at-ittipcam/tcS01Alias">TIPO DE CAMBIO SUNAT</asp:HyperLink>
                            </td>
                            <td style="padding-left: 30px;">
                                <asp:HyperLink ID="HyperLink2" Target="_blank" runat="server" ForeColor="Blue" Font-Bold="True"
                                    Text="TIPO DE CAMBIO SBS" NavigateUrl="http://www.sbs.gob.pe/app/stats/tc-cv.asp">TIPO DE CAMBIO SBS</asp:HyperLink>
                            </td>
                            <td style="padding-left: 90px;">
                                <asp:Button ID="btnBuscar" runat="server" Text="BUSCAR" Font-Names="Arial" Font-Bold="True"
                                    class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                    Width="120px" />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="5">
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div style="padding-top: 5px;">
               <table cellpadding="0" cellspacing="0" align="center">
                                    <tr>
                                        <td style="font-weight: bold">
                                           Cantidad de Registros:
                                        </td>
                                        <td style="font-weight: bold">
                                            <label id="lblNumeroConsulta"></label>
                                        </td>                                
                                    </tr>
                                </table>
            </div>
        <div id="div_grvConsultaArticulo" style="padding-top: 5px;">
            <asp:GridView ID="grvConsultaArticulo" runat="server" AutoGenerateColumns="False"
                border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                Width="630px">
                <Columns>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:ImageButton runat="server" ID="imgEditarRegistro" ImageUrl="../Asset/images/btnEdit.gif"
                                ToolTip="Editar Tipo de Cambio" OnClientClick="F_EditarRegistro(this); return false;" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="ID" HeaderStyle-HorizontalAlign="Center">
                        <ItemStyle HorizontalAlign="Right" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblCodTipoCambio" Text='<%# Bind("Codigo") %>' CssClass="detallesart"></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Moneda" HeaderStyle-HorizontalAlign="Center">
                        <ItemStyle HorizontalAlign="Left" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblMoneda" Text='<%# Bind("Moneda") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Compra" HeaderStyle-HorizontalAlign="Center">
                        <ItemStyle HorizontalAlign="Right" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblCompra" Text='<%# Bind("CompraSunat") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Venta" HeaderStyle-HorizontalAlign="Center">
                        <ItemStyle HorizontalAlign="Right" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblVenta" Text='<%# Bind("VentaSunat") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Paralelo" HeaderStyle-HorizontalAlign="Center">
                        <ItemStyle HorizontalAlign="Right" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblParalelo" Text='<%# Bind("Paralelo") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Fecha" HeaderStyle-HorizontalAlign="Center">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblFecha" Text='<%# Bind("Fecha") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>
    </div>
    <div id="divEdicionRegistro" style="display: none;">
        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                DATOS TIPO CAMBIO
            </div>
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs">
                    <tr>
                        <td style="padding-left: 5px; font-weight: bold;">
                            Fecha
                        </td>
                        <td style="padding-left: 9px;">
                            <asp:TextBox ID="txtFechaEdicion" runat="server" Width="55px" Font-Names="Arial"
                                ForeColor="Blue" Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="true"></asp:TextBox>
                        </td>
                        <td style="padding-left: 5px; font-weight: bold;">
                            Compra
                        </td>
                        <td>
                            <asp:TextBox ID="txtCompraSunatEdicion" runat="server" Width="65px" Font-Names="Arial"
                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                        </td>
                        <td style="padding-left: 5px; font-weight: bold;">
                            Venta
                        </td>
                        <td>
                            <asp:TextBox ID="txtVentaSunatEdicion" runat="server" Width="65px" Font-Names="Arial"
                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                        </td>
                        <td style="padding-left: 5px; font-weight: bold;">
                            Paralelo
                        </td>
                        <td>
                            <asp:TextBox ID="txtParaleloEdicion" runat="server" Width="65px" Font-Names="Arial"
                                ForeColor="Blue" Font-Bold="True" class="MesAnioPicker hasDatepicker"></asp:TextBox>
                        </td>
                        <td style="padding-left: 11px; display:none">
                            <asp:Button ID="btnGrabarEdicion" runat="server" Text="Grabar" Font-Names="Arial"
                                Font-Bold="True" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                Width="120px" />
                        </td>
                    </tr>
                </table>
            </div>
            <div class="linea-button">
                <asp:Button ID="btnEdicion" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    Font-Names="Arial" Font-Bold="True" Width="120px" />
            </div>
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
        <input id="hfCodTipoCambio" type="hidden" value="0" />
</asp:Content>
