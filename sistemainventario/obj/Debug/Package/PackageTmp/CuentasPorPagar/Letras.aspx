<%@ Page Title="Letras - Compras" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="Letras.aspx.cs" Inherits="SistemaInventario.CuentasPorPagar.Letras" %>

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
    <script type="text/javascript" language="javascript" src="Letras.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 940px">
        REGISTRO DE LETRAS</div>
    <div id="divTabs" style="width: 940px">
        <ul>
            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
            <li id="liConsulta"><a href="#tabConsulta" onclick="getContentTab();">Consulta</a></li>
        </ul>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 900px">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    Datos de la Letra
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs" width="700">
                        <tr style="display:none">
                            <td style="font-weight: bold">
                                Empresa
                                <asp:HiddenField ID="hdnCodEmpresa" runat="server" />
                                <asp:HiddenField ID="hdnCodSede" runat="server" />
                            </td>
                            <td style="padding-left: 4px;">
                                <asp:TextBox ID="txtEmpresa" runat="server" Width="340px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True" ReadOnly="true" Font-Size="Medium"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Proveedor
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtProveedor" runat="server" Width="340px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            tc
                                        </td>
                                        <td>
                                            <asp:Label ID="lblTC" runat="server" Font-Bold="True" Text="Label"></asp:Label>
                                        </td>
                                        <td style="font-weight: bold">
                                            Emision
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtEmision" runat="server" Width="55px" CssClass="Jq-ui-dtp" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                total letra
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtTotalLetra" runat="server" Width="120px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; padding-left: 7PX;">
                                            total Factura
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtTotalFactura" runat="server" Width="120px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            Moneda
                                        </td>
                                        <td>
                                            <div id="div_moneda">
                                                <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="105">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnNuevo" runat="server" Text="Nuevo" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                    <asp:Button ID="btnAgregarFactura" runat="server" Text="Agregar Factura" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                    <asp:Button ID="btnEliminarFactura" runat="server" Text="Eliminar Factura" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                    <asp:Button ID="btnAgregarLetra" runat="server" Text="Agregar LETRA" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                    <asp:Button ID="btnEliminarLetra" runat="server" Text="Eliminar LETRA" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                    <asp:Button ID="btnGrabar" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                </div>
            </div>
            <div style="padding-top: 5PX;">
                <table cellpadding="0" cellspacing="0">
                    <tr>
                        <td valign="top">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                Letras
                            </div>
                            <div id="div_grvLetra" style="padding-top: 1px;">
                                <asp:GridView ID="grvLetra" runat="server" AutoGenerateColumns="False" border="0"
                                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="448px">
                                    <Columns>
                                        <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" />
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="ID">
                                            <ItemStyle HorizontalAlign="Right" />
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblCodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                                                <asp:HiddenField ID="hfLetra" runat="server" Value='<%# Bind("Letra") %>' />
                                                <asp:HiddenField ID="hfTotal" runat="server" Value='<%# Bind("Total") %>' />
                                                <asp:HiddenField ID="hfEmision" runat="server" Value='<%# Bind("Emision") %>' />
                                                <asp:HiddenField ID="hfVencimiento" runat="server" Value='<%# Bind("Vencimiento") %>' />
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Numero" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:TextBox runat="server" ID="txtLetra" Width="75px" Font-Bold="true" Style="text-align: center;"
                                                    CssClass="ccsestilo" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Letra") %>'
                                                    onblur="F_ActualizarLetra(this.id,1); return false;"></asp:TextBox>
                                            </ItemTemplate>
                                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Emision" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:TextBox runat="server" ID="txtEmision" Width="56px" Text='<%# Bind("Emision") %>'
                                                    ReadOnly="True" ForeColor="Blue" Font-Bold="True" Font-Names="Arial" CssClass="Jq-ui-dtp ccsestilo"
                                                    onchange="F_ActualizarLetra(this.id,2); return false;"></asp:TextBox>
                                            </ItemTemplate>
                                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Vencimiento" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:TextBox runat="server" ID="txtVencimiento" Width="56px" Text='<%# Bind("Vencimiento") %>'
                                                    ReadOnly="True" ForeColor="Blue" Font-Bold="True" Font-Names="Arial" CssClass="Jq-ui-dtp ccsestilo"
                                                    onchange="F_ActualizarLetra(this.id,3); return false;"></asp:TextBox>
                                            </ItemTemplate>
                                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="Total" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:TextBox runat="server" ID="txtTotal" Width="75px" Font-Bold="true" Style="text-align: center;"
                                                    CssClass="ccsestilo tprecio" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Total") %>'
                                                    onblur="F_ActualizarLetra(this.id,4); return false;"></asp:TextBox>
                                            </ItemTemplate>
                                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        </asp:TemplateField>
                                        <asp:BoundField DataField="Moneda" HeaderText="Moneda" Visible="false">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Left" />
                                        </asp:BoundField>
                                    </Columns>
                                </asp:GridView>
                            </div>
                        </td>
                        <td style="padding-left: 5PX;" valign="top">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                Facturas
                            </div>
                            <div id="div_grvFactura" style="padding-top: 1px;">
                                <asp:GridView ID="grvFactura" runat="server" AutoGenerateColumns="False" border="0"
                                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="447px">
                                    <Columns>
                                        <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                            <ItemTemplate>
                                                <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" />
                                                <asp:HiddenField ID="hfCodigo" runat="server" Value='<%# Bind("Codigo") %>' />
                                                <asp:HiddenField ID="hfSoles" runat="server" Value='<%# Bind("Soles") %>' />
                                                <asp:HiddenField ID="hfDolares" runat="server" Value='<%# Bind("Dolares") %>' />
                                                <asp:HiddenField ID="hfxSoles" runat="server" Value='<%# Bind("xSoles") %>' />
                                                <asp:HiddenField ID="hfxDolares" runat="server" Value='<%# Bind("xDolares") %>' />
                                                <asp:HiddenField ID="hfTC" runat="server" Value='<%# Bind("TC") %>' />
                                                <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc") %>' />
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:TemplateField HeaderText="ID">
                                            <ItemStyle HorizontalAlign="Right" />
                                            <ItemTemplate>
                                                <asp:Label runat="server" ID="lblID" Text='<%# Bind("Detalle") %>'></asp:Label>
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
                                        <asp:TemplateField HeaderText="TC" ItemStyle-HorizontalAlign="Center" Visible="false">
                                            <ItemTemplate>
                                                <asp:TextBox runat="server" ID="txtTC" Width="60px" Font-Bold="true" Style="text-align: center;"
                                                    CssClass="ccsestilo" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("TC") %>'
                                                    onblur="F_VentaTC(this.id,1,0); return false;"></asp:TextBox>
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:BoundField DataField="xSoles" HeaderText="Saldo S/." Visible="false">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Center" />
                                        </asp:BoundField>
                                        <asp:BoundField DataField="xDolares" HeaderText="Saldo $" Visible="false">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Center" />
                                        </asp:BoundField>
                                        <%--                 <asp:TemplateField HeaderText="TOTAL" ItemStyle-HorizontalAlign="Center">
                                                        <ItemTemplate>                                                                                                                        
                                                            <asp:TextBox runat="server" ID="lblSoles" Width="60px" Font-Bold="true" style="text-align:center;"   CssClass="ccsestilo"  
                                                                         Font-Names="Arial"  ForeColor="Blue" Text='<%# Bind("Soles") %>' onblur="F_VentaTC(this.id,2,0); return false;" Enabled="False"></asp:TextBox>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>--%>
                                        <asp:BoundField DataField="Soles" HeaderText="TOTAL" DataFormatString="{0:N2}">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Right" />
                                        </asp:BoundField>
                                        <asp:TemplateField HeaderText="Dolares" ItemStyle-HorizontalAlign="Center" Visible="false">
                                            <ItemTemplate>
                                                <asp:TextBox runat="server" ID="lblDolares" Width="60px" Font-Bold="true" Style="text-align: center;"
                                                    CssClass="ccsestilo" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Dolares") %>'
                                                    onblur="F_VentaTC(this.id,3,0); return false;"></asp:TextBox>
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
        <div id="tabConsulta">
            <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    Criterio de busqueda
                </div>
                <div class="ui-jqdialog-content">
                    <table cellpadding="0" cellspacing="0" class="form-inputs" width="700">
                        <tr>
                            <td>
                                <asp:CheckBox ID="chkNumero" runat="server" Text="Numero" Font-Bold="True" />
                            </td>
                            <td>
                                <asp:TextBox ID="txtNumeroConsulta" runat="server" Width="55" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                            </td>
                            <td>
                                <asp:CheckBox ID="chkRango" runat="server" Text="Fecha" Font-Bold="True" />
                            </td>
                            <td>
                                <asp:TextBox ID="txtDesde" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True" CssClass="Jq-ui-dtp"></asp:TextBox>
                            </td>
                            <td>
                                <asp:TextBox ID="txtHasta" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True" CssClass="Jq-ui-dtp"></asp:TextBox>
                            </td>
                            <td>
                                <asp:CheckBox ID="chkCliente" runat="server" Text="Cliente" Font-Bold="True" />
                            </td>
                            <td>
                                <asp:TextBox ID="txtProveedorConsulta" runat="server" Width="430" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                </div>
            </div>
            <div id="div_consulta" style="padding-top: 5px;">
                <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" border="0"
                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="913px"
                    OnRowDataBound="grvConsulta_RowDataBound">
                    <Columns>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgProforma" ImageUrl="~/Asset/images/texto.png"
                                    ToolTip="CODIGO UNICO" OnClientClick="F_Proforma(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgEliminarDocumento" ImageUrl="~/Asset/images/EliminarBtn.png"
                                    ToolTip="ELIMINAR LETRA" OnClientClick="F_EliminarRegistro(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <img id="imgMas" alt="" style="cursor: pointer" src="../Asset/images/plus.gif" onclick="imgMas_Click(this);"
                                    title="Ver Detalle" />
                                <asp:Panel ID="pnlOrders" runat="server" Style="display: none">
                                    <asp:GridView runat="server" ID="grvDetalle" border="0" CellPadding="0" CellSpacing="1"
                                        GridLines="None" class="GridView" />
                                </asp:Panel>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="ID">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblCodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                                <asp:HiddenField ID="hfCodEmpresa" runat="server" Value='<%# Bind("CodEmpresa") %>' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="EMP">
                            <ItemStyle HorizontalAlign="Center" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblEmpresa" Text='<%# Bind("Empresa") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="RazonSocial">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblCliente" Text='<%# Bind("RazonSocial") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Numero">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblNumero" Text='<%# Bind("Numero") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Emision" HeaderText="Emision">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Vcto" HeaderText="Vcto">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Moneda" HeaderText="Moneda">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Total" HeaderText="Total" HeaderStyle-HorizontalAlign="Center"
                            DataFormatString="{0:N2}">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Saldo" HeaderText="Saldo" HeaderStyle-HorizontalAlign="Center"
                            DataFormatString="{0:N2}">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="TipoCambio" HeaderText="TC">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Estado" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblEstado" Text='<%# Bind("Estado") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="N. Unico" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblCodigoUnico" Text='<%# Bind("CodigoUnico") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Ingreso" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblIngreso" Text='<%# Bind("IngresoBanco") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Banco" HeaderText="Banco" HeaderStyle-HorizontalAlign="Center">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                    </Columns>
                </asp:GridView>
            </div>
        </div>
    </div>
    <div id="divConsultaFactura" style="display: none;">
        <div class="ui-jqdialog-content">
            <table width="360">
                <tr>
                    <td>
                        <div id="div_grvConsultaFactura">
                            <asp:GridView ID="grvConsultaFactura" runat="server" AutoGenerateColumns="False"
                                border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                Width="360">
                                <Columns>
                                    <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                        <ItemTemplate>
                                            <asp:CheckBox runat="server" ID="chkOK" CssClass="chkSi" Text="" onclick="F_ValidarCheck(this.id);" />
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:BoundField DataField="Empresa" HeaderText="E">
                                        <HeaderStyle HorizontalAlign="Center" />
                                        <ItemStyle HorizontalAlign="Center" />
                                    </asp:BoundField>
                                    <asp:TemplateField HeaderText="Factura">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblFactura" Text='<%# Bind("Factura") %>'></asp:Label>
                                            <asp:HiddenField ID="lblCodigo" runat="server" Value='<%# Bind("Codigo") %>' />
                                            <asp:HiddenField ID="hfCodMoneda" runat="server" Value='<%# Bind("CodMoneda") %>' />
                                            <asp:HiddenField ID="hfCodEmpresa" runat="server" Value='<%# Bind("CodEmpresa") %>' />
                                            <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc") %>' />
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Emision">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblEmision" Text='<%# Bind("Emision") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Total">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblTotal" Text='<%# Bind("Total") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Moneda">
                                        <ItemStyle HorizontalAlign="Center" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblMoneda" Text='<%# Bind("Moneda") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                </Columns>
                            </asp:GridView>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td>
                                    <asp:Button ID="btnAgregar" runat="server" Text="Agregar" Width="120px" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                        Font-Names="Arial" Font-Bold="True" />
                                </td>
                                <td style="font-weight: bold; padding-left: 78px">
                                    Total
                                </td>
                                <td style="padding-left: 3px">
                                    <asp:TextBox ID="txtSumaAPagar" runat="server" Width="120px" Font-Names="Arial" ForeColor="Blue"
                                        CssClass="Derecha" ReadOnly="true" Font-Bold="True"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="div_DatosLetra" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0" class="form-inputs">
                <tr>
                    <td style="padding-top: 5PX; font-weight: bold">
                        Proveedor
                    </td>
                    <td colspan="3" style="padding-top: 5PX;">
                        <asp:TextBox ID="txtProveedorLetra" runat="server" Width="320px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold">
                        Nro Letra
                    </td>
                    <td>
                        <asp:TextBox ID="txtNroLetra" runat="server" Width="100px" Font-Names="Arial" ForeColor="Blue"
                            Font-Bold="True"></asp:TextBox>
                    </td>
                    <td style="font-weight: bold">
                        CANT. LETRA
                    </td>
                    <td>
                        <asp:TextBox ID="txtCantidadLetra" runat="server" Width="100px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                </tr>
                <tr style="display: none">
                    <td style="font-weight: bold">
                        Cond. Pago
                    </td>
                    <td>
                        <div id="div_formapago">
                            <asp:DropDownList ID="ddlFormaPago" runat="server" Font-Names="Arial" ForeColor="Blue"
                                Font-Bold="True" Width="104">
                            </asp:DropDownList>
                        </div>
                    </td>
                    <td style="font-weight: bold">
                        Moneda
                    </td>
                    <td>
                        <asp:TextBox ID="txtMoneda" runat="server" Width="100px" Font-Names="Arial" ForeColor="Blue"
                            Font-Bold="True" ReadOnly="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold">
                        Fecha Giro
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaGiro" runat="server" Width="55px" Font-Names="Arial" ForeColor="Blue"
                            Font-Bold="True" ReadOnly="False"></asp:TextBox>
                    </td>
                    <td style="font-weight: bold">
                        Total Factura
                    </td>
                    <td>
                        <asp:TextBox ID="txtTotalFacturaLetra" runat="server" Width="100px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True" CssClass="Derecha" ReadOnly="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" style="padding-left: 275px">
                        <asp:Button ID="btnGrabarLetra" runat="server" Text="Agregar Letra" Width="120px"
                            class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" />
                    </td>
                </tr>
                <%--             <tr>
                                                  <td  style="font-weight: bold">
                                                Importe
                                                </td>

                                                <td>
                                               <asp:TextBox ID="txtImporteLetra" runat="server" Width="100px" Font-Names="Arial"  ForeColor="Blue" CssClass = "Derecha"   Font-Bold="True"  ></asp:TextBox>
                                               </td>

                                                   <td  style="font-weight: bold">
                                                Vencimiento
                                                </td>

                                                <td>
                                               <asp:TextBox ID="txtVencimiento" runat="server" Width="55px" Font-Names="Arial"  ForeColor="Blue"  CssClass="Jq-ui-dtp"  Font-Bold="True"></asp:TextBox>
                                               </td>


                                        
                                                </tr>--%>
            </table>
        </div>
    </div>
    <div id="divSeleccionarEmpresa">
        <asp:GridView ID="grvEmpresas" runat="server" AutoGenerateColumns="False" border="0"
            CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="400px">
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
                        <asp:DropDownList ID="ddlSede" runat="server" Font-Names="Arial" ForeColor="Blue"
                            Font-Bold="True" CssClass="ccsestilo">
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
    <div id="div_CodigoUnico" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0" class="form-inputs">
                <tr>
                    <td style="font-weight: bold;">
                        Numero Letra
                    </td>
                    <td>
                        <asp:TextBox ID="txtLetraEdicion" runat="server" Width="120px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        Numero Unico
                    </td>
                    <td>
                        <asp:TextBox ID="txtCodigoUnico" runat="server" Width="120px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        Banco
                    </td>
                    <td>
                        <div id="div_Banco">
                            <asp:DropDownList ID="ddlBanco" runat="server" Font-Names="Arial" ForeColor="Blue"
                                Font-Bold="True" Width="124">
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold">
                        Fecha Emision
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaEmisionEdicion" runat="server" Width="55px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold">
                        Fecha Vencimiento
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaVencimientoEdicion" runat="server" Width="55px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold">
                        Fecha Ingreso
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaIngresoBanco" runat="server" Width="55px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        <asp:Button ID="btnGrabarCodigo" runat="server" Text="grabar" Width="120px" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="div_UsuarioEliminacion" style="display: none;">
        <table>
            <tr>
                <td style="font-weight: bold">
                    Usuario Auxiliar
                </td>
                <td>
                    <asp:TextBox ID="txtUsuarioEliminacion" runat="server" Width="98px" Font-Names="Arial"
                        ForeColor="Blue" Font-Bold="True" ToolTip="Ingresar Usuario"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td style="font-weight: bold">
                    Clave
                </td>
                <td>
                    <asp:TextBox ID="txtClaveEliminacion" runat="server" Width="98px" Font-Names="Arial"
                        ForeColor="Blue" Font-Bold="True" TextMode="Password" ToolTip="Ingresar Clave"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td colspan="2" align="right">
                    <asp:Button ID="btnValidar" runat="server" Text="VALIDAR" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </td>
            </tr>
        </table>
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
    <input id="hfCodCtaCteConsulta" type="hidden" value="0" />
    <input id="hfCodigoTemporal" type="hidden" value="0" />
    <input id="hfCodDocumentoVenta" type="hidden" value="0" />
    <input id="hfCodEmpresa" type="hidden" value="0" />
    <input id="hfCodSede" type="hidden" value="0" />
</asp:Content>
