<%@ Page Title="Cobranzas" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="CobranzasConsultas.aspx.cs" Inherits="SistemaInventario.Reportes.CobranzasConsultas" %>

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
    <script type="text/javascript" language="javascript" src="CobranzasConsultas.js"
        charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 995px">
        CONSULTA DE CUENTAS POR COBRAR</div>
    <div id="divTabs" style="width: 990px">
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 955px">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    CRITERIO DE BUSQUEDA
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs" width="750">
                        <tr>
                            <td style="font-weight: bold; display: none;">
                                EMPRESA
                            </td>
                            <td style="padding-left: 4px; display: none;">
                                <asp:TextBox ID="txtEmpresa" runat="server" Width="605px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True" ReadOnly="true"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;">
                                <asp:CheckBox ID="chkRazonSocial" runat="server" Text="Razon Social" Font-Bold="True" />
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtProveedor" runat="server" Width="308px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:CheckBox ID="chkRangoMonto" runat="server" Text="Monto" Font-Bold="True" />
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtMontoDesde" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtMontoHasta" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:CheckBox ID="chkCiudad" runat="server" Text="CIUDAD" Font-Bold="True" />
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtDistrito" runat="server" Width="250" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; display: none;">
                                            tc
                                        </td>
                                        <td style="display: none;">
                                            <asp:TextBox ID="txtTC" runat="server" Width="31px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; display: none;">
                                            Emision
                                        </td>
                                        <td style="padding-left: 67px; display: none;">
                                            <asp:TextBox ID="txtEmision" runat="server" Width="55px" CssClass="Jq-ui-dtp" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="display: none;">
                                            Moneda
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; display: none;">
                                Responsable
                            </td>
                            <td style="display: none;">
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtResponsable" runat="server" Width="308px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="padding-left: 2px; font-weight: bold">
                                            CONTACTO
                                        </td>
                                        <td style="padding-left: 54px;">
                                            <asp:TextBox ID="txtPagador" runat="server" Width="391px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                        </td>
                                        <td style="display: none;">
                                            <asp:TextBox ID="txtOperacion" runat="server" Width="55px" CssClass="Jq-ui-dtp" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" Enabled="False"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; display: none;">
                                total Deuda us$
                            </td>
                            <td style="display: none;">
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                        </td>
                                        <td style="font-weight: bold;">
                                            total cobranza us$
                                        </td>
                                        <td style="padding-left: 4px;">
                                            <asp:TextBox ID="txtTotalCobranza" runat="server" Width="89px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td style="padding-left: 1px; font-weight: bold">
                                            total cobranza s/.
                                        </td>
                                        <td style="padding-left: 3px;">
                                            <asp:TextBox ID="txtCobranzaSoles" runat="server" Width="90px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td style="padding-left: 3px; display: none;">
                                            <asp:TextBox ID="txtCobroOperacion" runat="server" Width="101px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" CssClass="Derecha" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td style="display: none;">
                                            <asp:CheckBox ID="chkFactura" runat="server" Text="Factura" Font-Bold="True" Checked="True" />
                                        </td>
                                        <td style="display: none;">
                                            <asp:CheckBox ID="chkLetra" runat="server" Text="Letra" Font-Bold="True" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:CheckBox ID="chkImprimir" runat="server" Text="Imprimir" Font-Bold="True" Style="display: none;" />
                    <asp:Button ID="btnNuevo" runat="server" Text="Nuevo" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                    <asp:Button ID="btnAgregarFactura" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnEliminarFactura" runat="server" Text="Eliminar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" Style="display: none;" />
                    <asp:Button ID="btnAgregarLetra" runat="server" Text="Agregar LETRA" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" Style="display: none;" />
                    <asp:Button ID="btnEliminarLetra" runat="server" Text="Eliminar LETRA" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" Style="display: none;" />
                    <asp:Button ID="btnCobranzas" runat="server" Text="Agregar Pagos" Style="display: none;"
                        class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnCobranzasEliminar" runat="server" Text="Eliminar Pagos" Style="display: none;"
                        class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnGrabar" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" Style="display: none;" />
                </div>
            </div>
            <div style="padding-top: 5px;">
                <table cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="font-weight: bold; padding-left: 7PX;">
                                        total Cobranza US$
                                    </td>
                                    <td style="padding-left: 5PX;">
                                        <asp:TextBox ID="txtTotalDeuda" runat="server" Width="120px" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="padding-top: 5px;">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                FACTURAS | BOLETAS | PROFORMAS | LETRAS POR COBRAR
                            </div>
                            <div id="div_grvFactura" style="padding-top: 1px;">
                                <asp:GridView ID="grvFactura" runat="server" AutoGenerateColumns="False" border="0"
                                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="957px">
                                    <Columns>
                                        <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" onclick="F_EditarDetalle(this.id);" Enabled="false" />
                                                <asp:HiddenField ID="hfCodigo" runat="server" Value='<%# Bind("Codigo") %>' />
                                                <asp:HiddenField ID="hfSoles" runat="server" Value='<%# Bind("Soles") %>' />
                                                <asp:HiddenField ID="hfDolares" runat="server" Value='<%# Bind("Dolares") %>' />
                                                <asp:HiddenField ID="hfxSoles" runat="server" Value='<%# Bind("xSoles") %>' />
                                                <asp:HiddenField ID="hfxDolares" runat="server" Value='<%# Bind("xDolares") %>' />
                                                <asp:HiddenField ID="hfTC" runat="server" Value='<%# Bind("TC") %>' />
                                                <asp:HiddenField ID="hfCodMoneda" runat="server" Value='<%# Bind("CodMoneda") %>' />
                                                <asp:HiddenField ID="hfMoneda" runat="server" Value='<%# Bind("Moneda") %>' />
                                                <asp:HiddenField ID="hfCodEmpresa" runat="server" Value='<%# Bind("CodEmpresa") %>' />
                                                <asp:HiddenField ID="hfID" runat="server" Value='<%# Bind("Detalle") %>' />
                                                <asp:HiddenField ID="hfCodBanco" runat="server" Value='<%# Bind("CodBanco") %>' />
                                                <asp:HiddenField ID="hfCodCtaBancaria" runat="server" Value='<%# Bind("CodCtaBancaria") %>' />
                                                <asp:HiddenField ID="hfFlagCheck" runat="server" Value='<%# Bind("FlagCheck") %>' />
                                                <asp:HiddenField ID="hfSaldo" runat="server" Value='<%# Bind("Saldo") %>' />
                                                <asp:HiddenField ID="hfCodCtaCte" runat="server" Value='<%# Bind("CodCtaCte") %>' />
                                                <asp:HiddenField ID="hfEmpresa" runat="server" Value='<%# Bind("Empresa") %>' />
                                                <asp:HiddenField ID="hfCliente" runat="server" Value='<%# Bind("Cliente") %>' />
                                                <asp:HiddenField ID="hfNumero" runat="server" Value='<%# Bind("Factura") %>' />
                                                <asp:HiddenField ID="hfEmision" runat="server" Value='<%# Bind("Emision") %>' />
                                                <asp:HiddenField ID="hfVencimiento" runat="server" Value='<%# Bind("Vencimiento") %>' />
                                                <asp:HiddenField ID="hfAcuenta" runat="server" Value='<%# Bind("Acuenta") %>' />
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:BoundField DataField="Empresa" HeaderText="Empresa">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Left" />
                                        </asp:BoundField>
                                        <asp:BoundField DataField="Cliente" HeaderText="Cliente">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Left" />
                                        </asp:BoundField>
                                        <asp:TemplateField HeaderText="Numero">
                                            <ItemStyle HorizontalAlign="Center" />
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblFactura" Text='<%# Bind("Factura") %>'></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="TOTAL US$" ItemStyle-HorizontalAlign="Right">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblTotal" Text='<%# Bind("Total") %>'></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:BoundField DataField="Emision" HeaderText="Emision">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Center" />
                                        </asp:BoundField>
                                        <asp:BoundField DataField="Vencimiento" HeaderText="Vencimiento">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Center" />
                                        </asp:BoundField>
                                        <asp:TemplateField HeaderText="TC" Visible="false">
                                            <ItemStyle HorizontalAlign="Center" />
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="txtTC" Text='<%# Bind("TC") %>'></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:BoundField DataField="Acuenta" HeaderText="Acuenta">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Right" />
                                        </asp:BoundField>
                                        <asp:TemplateField HeaderText="Saldo US$" ItemStyle-HorizontalAlign="Right">
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblSaldoDolares" Text='<%# Bind("xDolares") %>'></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                    </Columns>
                                </asp:GridView>
                            </div>
                        </td>
                        <td style="padding-left: 5px; display: none;" valign="top">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                FACTURAS POR PAGAR
                            </div>
                            <div id="div_FacturaCobranzas" style="padding-top: 1px;">
                                <asp:GridView ID="grvFacturaCobranzas" runat="server" AutoGenerateColumns="False"
                                    border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                    Width="476px">
                                    <Columns>
                                        <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" OnClientClick="ImprimirFacturaDetalle(this); return false;" />
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="ID">
                                            <ItemStyle HorizontalAlign="Right" />
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblID" Text='<%# Bind("Detalle") %>'></asp:Label>
                                                <asp:HiddenField ID="hfCodigo" runat="server" Value='<%# Bind("Codigo") %>' />
                                                <asp:HiddenField ID="hfSoles" runat="server" Value='<%# Bind("Soles") %>' />
                                                <asp:HiddenField ID="hfDolares" runat="server" Value='<%# Bind("Dolares") %>' />
                                                <asp:HiddenField ID="hfxSoles" runat="server" Value='<%# Bind("xSoles") %>' />
                                                <asp:HiddenField ID="hfxDolares" runat="server" Value='<%# Bind("xDolares") %>' />
                                                <asp:HiddenField ID="hfTC" runat="server" Value='<%# Bind("TC") %>' />
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Numero">
                                            <ItemStyle HorizontalAlign="Center" />
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblFactura" Text='<%# Bind("Factura") %>'></asp:Label>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:BoundField DataField="Emision" HeaderText="Emision">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Center" />
                                        </asp:BoundField>
                                        <asp:TemplateField HeaderText="TC" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:TextBox runat="server" ID="txtTC" Width="60px" Font-Bold="true" Style="text-align: center;"
                                                    CssClass="ccsestilo" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("TC") %>'
                                                    onblur="F_VentaTC(this.id,1,1); return false;"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <%--          <asp:BoundField DataField="xSoles" HeaderText="Saldo S/.">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Center" />
                                        </asp:BoundField>--%>
                                        <asp:BoundField DataField="xDolares" HeaderText="Saldo $">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Right" />
                                        </asp:BoundField>
                                        <asp:TemplateField HeaderText="Soles" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:TextBox runat="server" ID="lblSoles" Width="60px" Font-Bold="true" Style="text-align: Right;"
                                                    CssClass="ccsestilo" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Soles") %>'
                                                    onblur="F_VentaTC(this.id,2,1); return false;"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Dolares" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:TextBox runat="server" ID="lblDolares" Width="60px" Font-Bold="true" Style="text-align: Right;"
                                                    CssClass="ccsestilo" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Dolares") %>'
                                                    onblur="F_VentaTC(this.id,3,1); return false;"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                    </Columns>
                                </asp:GridView>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div id="divConsultaFactura" style="display: none;">
        <div class="ui-jqdialog-content">
            <table width="360">
                <tr>
                    <td>
                        <asp:Button ID="btnAgregar" runat="server" Text="Agregar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                    </td>
                </tr>
            </table>
        </div>
        <div id="div_grvConsultaFactura" style="padding-top: 5PX;">
            <asp:GridView ID="grvConsultaFactura" runat="server" AutoGenerateColumns="False"
                border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                Width="400">
                <Columns>
                    <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                        <HeaderTemplate>
                            <asp:CheckBox runat="server" ID="chkOKPrin" Text="" onclick="$('#MainContent_grvConsultaFactura .chkSi input').prop('checked',$('#MainContent_grvConsultaFactura_chkOKPrin').is(':checked'));" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:CheckBox runat="server" ID="chkOK" CssClass="chkSi" Text="" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="ID">
                        <ItemStyle HorizontalAlign="Right" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblCodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                            <asp:HiddenField ID="hfCodMoneda" runat="server" Value='<%# Bind("CodMoneda") %>' />
                            <asp:HiddenField ID="hfCodEmpresa" runat="server" Value='<%# Bind("CodEmpresa") %>' />
                            <asp:HiddenField ID="hfCodCtaCte" runat="server" Value='<%# Bind("CodCtaCte")  %>' />
                            <asp:HiddenField ID="hfTotal" runat="server" Value='<%# Bind("Total")  %>' />
                            <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc")  %>' />
                            <asp:HiddenField ID="hfVencimiento" runat="server" Value='<%# Bind("Vencimiento")  %>' />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Numero">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblFactura" Text='<%# Bind("Factura") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Emision">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblEmision" Text='<%# Bind("Emision") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Soles">
                        <ItemStyle HorizontalAlign="Right" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblSoles" Text='<%# Bind("Soles") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Dolares">
                        <ItemStyle HorizontalAlign="Right" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblDolares" Text='<%# Bind("Dolares") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="TC">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblTC" Text='<%# Bind("TC") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
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
    <div id="divSeleccionarEmpresa" style="display: none;">
        <table>
            <tr>
                <td style="font-weight: bold">
                    Usuario Auxiliar
                </td>
                <td>
                    <asp:TextBox ID="txtUsuario" runat="server" Width="98px" Font-Names="Arial" ForeColor="Blue"
                        Font-Bold="True" ToolTip="Ingresar Usuario"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td style="font-weight: bold">
                    Clave
                </td>
                <td>
                    <asp:TextBox ID="txtContraseña" runat="server" Width="98px" Font-Names="Arial" ForeColor="Blue"
                        Font-Bold="True" TextMode="Password" ToolTip="Ingresar Contraseña"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td colspan="2" align="right">
                    <asp:Button ID="btnValidar" runat="server" Text="VALIDAR" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </td>
            </tr>
        </table>
        <asp:GridView ID="grvEmpresas" runat="server" AutoGenerateColumns="False" border="0"
            Style="display: none;" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
            Width="400px">
            <Columns>
                <asp:TemplateField HeaderText="Nombre">
                    <ItemTemplate>
                        <asp:Label ID="lblRazonSocial" runat="server" Text='<%# Bind("RazonSocial") %>' Font-Size="Medium"></asp:Label>
                    </ItemTemplate>
                    <HeaderStyle HorizontalAlign="Center" />
                    <ItemStyle HorizontalAlign="Left" Width="100px" />
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Sede">
                    <ItemTemplate>
                        <asp:DropDownList ID="ddlSede" runat="server">
                        </asp:DropDownList>
                    </ItemTemplate>
                    <ItemStyle HorizontalAlign="Center" Width="70px" />
                </asp:TemplateField>
                <asp:TemplateField>
                    <ItemTemplate>
                        <asp:ImageButton ID="imgSelecEmpresa" runat="server" ImageUrl="~/Asset/images/ok.gif"
                            OnClientClick="F_ElegirEmpresa(this); return false;" ToolTip="Elegir" />
                        <asp:HiddenField ID="hfCodEmpresa" runat="server" Value='<%# Bind("CodEmpresa") %>' />
                    </ItemTemplate>
                    <ItemStyle Width="20px" />
                </asp:TemplateField>
            </Columns>
        </asp:GridView>
    </div>
    <div id="div_CerrarNota" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0" class="form-inputs">
                <tr style="display: none">
                    <td style="font-weight: bold">
                        Nota Credito
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0" class="form-inputs">
                            <tr>
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <asp:TextBox ID="txtSerieNotaCredito" runat="server" Width="34" Font-Names="Arial"
                                                    ForeColor="Blue" Font-Bold="True" Style="text-align: right;"></asp:TextBox>
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtNumeroNotaCredito" runat="server" Width="64" Font-Names="Arial"
                                                    ForeColor="Blue" Font-Bold="True" Style="text-align: right;"></asp:TextBox>
                                            </td>
                                            <td>
                                                <asp:Button ID="btnBuscarNotaCredito" runat="server" Text="Nota Credito" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                                    Font-Names="Arial" Font-Bold="True" Width="120" />
                                                <asp:HiddenField ID="HiddenField1" runat="server" />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; width: 150">
                        Cliente
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtCobranzaClienteDisplay" runat="server" Width="270" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Style="text-align: left;" Enabled="False"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold;">
                                    Documento
                                </td>
                                <td style="padding-left: 17px">
                                    <asp:TextBox ID="txtCobranzaDocumentoDisplay" runat="server" Width="100" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Style="text-align: center;" Enabled="False"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold;">
                                    Empresa
                                </td>
                                <td style="padding-left:18px">
                                    <asp:TextBox ID="txtCobranzaEmpresaDisplay" runat="server" Width="50" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Style="text-align: center;" Enabled="False"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold;">
                                    Fecha
                                </td>
                                <td>
                                    <asp:TextBox ID="txtCobranzaFechaDisplay" runat="server" Width="60" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Style="text-align: right;" Enabled="False"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                    </td>
                    <td style="font-weight: bold">
                        ________________________________________________________________________________________________________________________________
                    </td>
                </tr>
                <tr style="display: none">
                    <td style="font-weight: bold;">
                        Saldo $
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td colspan='2'>
                                    <asp:TextBox ID="txtSaldo" runat="server" Width="106" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Style="text-align: right;" Enabled="False"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold;">
                                    <asp:CheckBox ID="chkAplicarSaldo" runat="server" Text="Aplicar Saldo a Favor" Font-Bold="True" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        Forma Pago
                    </td>
                    <td style="padding-left: 4px;">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <div id="div_MedioPago">
                                        <asp:DropDownList ID="ddlMedioPago" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="100">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                <td style="font-weight: bold; padding-left: 20px">
                                    Nro Op.
                                </td>
                                <td>
                                    <asp:TextBox ID="txtNroOperacion" runat="server" Width="100px" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold;">
                                    Moneda
                                </td>
                                <td style="padding-left: 38px;">
                                    <div id="div_moneda">
                                        <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="105">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                <td style="font-weight: bold;">
                                    Cuanto
                                </td>
                                <td style="padding-left: 24px;">
                                    <asp:TextBox ID="txtMontoDetalle" runat="server" Width="100" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Style="text-align: right;"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                    </td>
                    <td>
                        <table>
                            <tr id="tr_TC_DETALLE_COBRANZA">
                                <td style="font-weight: bold; padding-left: 472px">
                                    TC
                                </td>
                                <td style="padding-left: 50px;">
                                    <asp:TextBox ID="txtTCDetalle" runat="server" Width="55px" Style="text-align: right;"
                                        Font-Names="Arial" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        Monto Original
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtMontoOriginal" runat="server" Width="100" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Style="text-align: right;" Enabled="False"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold; padding-left: 8px">
                                    Acuenta
                                </td>
                                <td style="padding-left: 4px;">
                                    <asp:TextBox ID="txtCobranzaAcuentaDisplay" runat="server" Width="100" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Style="text-align: right;" Enabled="False"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold;">
                                    Saldo Actual
                                </td>
                                <td style="padding-left: 4px;">
                                    <asp:TextBox ID="txtSaldoActual" runat="server" Width="100" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Style="text-align: right;" Enabled="False"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold;">
                                    ESTO PAGO
                                </td>
                                <td style="padding-left: 10px;">
                                    <asp:TextBox ID="txtMontoCobrado" runat="server" Width="100" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Style="text-align: right;" Enabled="False"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold; padding-left: 10px;">
                                    Nuevo Saldo
                                </td>
                                <td>
                                    <asp:TextBox ID="txtNuevoSaldo" runat="server" Width="100" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Style="text-align: right;" ReadOnly="True"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        DONDE ENTRO
                    </td>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <div id="div_DestinoCajaEmpresa">
                                        <asp:DropDownList ID="ddlDestinoCajaEmpresa" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="104">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                <td style="font-weight: bold; display: none">
                                    <%--bloqueado--%>
                                    Fecha Voucher
                                </td>
                                <td style="display: none">
                                    <%--bloqueado--%>
                                    <asp:TextBox ID="txtFechaVoucher" runat="server" Width="100" CssClass="Jq-ui-dtp"
                                        Font-Names="Arial" ForeColor="Blue" Font-Bold="True" ReadOnly="True" Enabled="False"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold; padding-left:8px">
                                    FECHA
                                </td>
                                <td style="padding-left:15px">
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <asp:TextBox ID="txtFechaOperacionDetalle" runat="server" Width="100" CssClass="Jq-ui-dtp"
                                                    Font-Names="Arial" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="font-weight: bold;">
                                    Ubicacion
                                </td>
                                <td style="padding-left: 25px">
                                    <div id="div_Banco">
                                        <asp:DropDownList ID="ddlBanco" runat="server" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" Width="104">
                                        </asp:DropDownList>
                                    </div>
                                </td>
                                <td style="font-weight: bold;">
                                    Nro Cuenta
                                </td>
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="display: block;">
                                                <div id="div_Cuenta">
                                                    <asp:DropDownList ID="ddlCuenta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                        Font-Bold="True" Width="103px">
                                                    </asp:DropDownList>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        Observacion
                    </td>
                    <td style="padding-left: 4px;">
                        <asp:TextBox ID="txtObservacion" runat="server" Width="255px" CssClass="Jq-ui-dtp"
                            Font-Names="Arial" ForeColor="Blue" Font-Bold="True" TextMode="MultiLine" Height="60"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td align="right" colspan="4">
                        <asp:Button ID="btnCerrarNotaPedido" runat="server" Text="Descargar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                        <asp:HiddenField ID="hdnCodNotaPedido" runat="server" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <input id="hfCodDistrito" type="hidden" value="0" />
    <input id="hfCodEmpresa" type="hidden" value="0" />
    <input id="hfCodSede" type="hidden" value="0" />
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfCodCtaCteConsulta" type="hidden" value="0" />
    <input id="hfCodCtaCteNC" type="hidden" value="0" />
    <input id="hfCodigoTemporal" type="hidden" value="0" />
    <input id="hfCobranzas" type="hidden" value="0" />
    <input id="hfCodigoTemporalPago" type="hidden" value="0" />
    <input id="hfMoneda" type="hidden" value="0" />
    <input id="hfNotaVenta" type="hidden" value="0" />
    <input id="hfCampo" type="hidden" value="" />
    <input id="hfDetalleSoles" type="hidden" value="0" />
    <input id="hfDetalleDolares" type="hidden" value="" />
    <input id="hfIDDetalle" type="hidden" value="" />
    <input id="hfCodMonedaDetalle" type="hidden" value="0" />
    <input id="hfFactura" type="hidden" value="" />
    <input id="hfCodUsuarioAuxiliar" type="hidden" value="0" />
    <input id="hfCodUsuarioAuxiliarAnulacion" type="hidden" value="0" />
    <input id="hfCodNotaCredito" type="hidden" value="0" />
</asp:Content>
