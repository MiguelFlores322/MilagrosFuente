<%@ Page Title="Nota Pedido" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="NotaPedido.aspx.cs" Inherits="SistemaInventario.Ventas.NotaPedido" %>

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
    <script type="text/javascript" language="javascript" src="NotaPedido.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo">
        Nota Pedido</div>
    <div id="divTabs">
        <ul>
            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
            <li id="liConsulta"><a href="#tabConsulta" onclick="getContentTab();">Consulta</a></li>
        </ul>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    Datos de Nota Pedido
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs" width="750">
                        <tr>
                            <td style="font-weight: bold">
                                Empresa
                                <asp:HiddenField ID="hdnCodEmpresa" runat="server" />
                                <asp:HiddenField ID="hdnCodSede" runat="server" />
                            </td>
                            <td style="padding-left: 4px;">
                                <asp:TextBox ID="txtEmpresa" runat="server" Width="420px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True" ReadOnly="true"></asp:TextBox>
                            </td>
                            <td style="font-weight: bold">
                                Direccion
                            </td>
                            <td rowspan='2' valign="top">
                                <asp:TextBox ID="txtDireccion" runat="server" Width="420px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True" TextMode="MultiLine" Height="35"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Cliente
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtNroRuc" runat="server" Width="70px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" MaxLength="11"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtCliente" runat="server" Width="342px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                            <asp:ImageButton ID="imgAddScop" runat="server" ImageUrl="~/Asset/images/add_small.png"
                                                ImageAlign="AbsMiddle" ToolTip="Agregar Cliente" Style="display: none;" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Emision
                            </td>
                            <td colspan='3'>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtEmision" runat="server" Width="55px" CssClass="Jq-ui-dtp" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            Moneda
                                        </td>
                                        <td style="padding-left: 3px;">
                                            <div id="div_moneda">
                                                <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="89">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td>
                                            <asp:Label ID="Label1" runat="server" Text="T.C." Font-Bold="True"></asp:Label>
                                            <asp:Label ID="lblTC" runat="server" Text="Label" Font-Bold="True"></asp:Label>
                                        </td>
                                        <td style="display: none;">
                                            <div id="div_serie">
                                                <asp:DropDownList ID="ddlSerie" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="display: none;">
                                            <asp:TextBox ID="txtNumero" runat="server" Width="43" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" MaxLength="7" ReadOnly="true"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            Igv
                                        </td>
                                        <td>
                                            <div id="div_igv">
                                                <asp:DropDownList ID="ddlIgv" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="60">
                                                </asp:DropDownList>
                                            </div>
                                            <asp:TextBox ID="txtValIgv" runat="server" Width="60" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" MaxLength="7" Text="" Style="display: none" ReadOnly="true"></asp:TextBox>
                                        </td>
                                        <td style="display: none;">
                                            <div id="div_ddlvendprepa">
                                                <asp:DropDownList ID="ddlVendedorPreparado" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="200">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="padding-left: 38px; display: none;">
                                        </td>
                                        <td style="font-weight: bold">
                                            Bultos
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtBultos" runat="server" Width="33px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" Text="0" Style="text-align: right;"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; padding-left: 7px;">
                                            Total
                                        </td>
                                        <td style="padding-left: 26px;">
                                            <asp:TextBox ID="txtTotal" runat="server" Width="90px" Font-Names="Arial" ForeColor="Blue"
                                                Style="text-align: right;" Font-Bold="True" ReadOnly="True" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtVigencia" runat="server" Width="55px" CssClass="Jq-ui-dtp novisible"
                                                Font-Names="Arial" ForeColor="Blue" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                            <asp:TextBox ID="txtAtencion" runat="server" Width="300px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" Style="display: none"></asp:TextBox>
                                            <asp:TextBox ID="txtReferencia" runat="server" Width="310px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" Style="display: none"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Descuento
                            </td>
                            <td colspan='3'>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="font-weight: bold">
                                            <asp:TextBox ID="txtDesc1" runat="server" Width="34px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="True" Style="text-align: right;" onchange="F_ModificarDescuentoDocumento(this);"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtDesc2" runat="server" Width="34px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="True" Style="text-align: right;" onchange="F_ModificarDescuentoDocumento(this);"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            <asp:TextBox ID="txtDesc3" runat="server" Width="34px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="True" Style="text-align: right;" onchange="F_ModificarDescuentoDocumento(this);"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            <asp:TextBox ID="txtDesc4" runat="server" Width="36px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ReadOnly="True" Style="text-align: right;" onchange="F_ModificarDescuentoDocumento(this);"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold;">
                                            ALMACEN
                                        </td>
                                        <td>
                                            <div id="div_AlmacenFisico">
                                                <asp:DropDownList ID="ddlAlmacenFisico" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="200">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold;">
                                            <asp:CheckBox ID="chkNotaVenta" runat="server" Text="Proforma" Checked="false" Enabled="False" />
                                        </td>
                                        <td style="font-weight: bold;">
                                            <asp:CheckBox ID="chkBoleta" runat="server" Text="Boleta" Checked="false" Enabled="False" />
                                        </td>
                                        <td style="font-weight: bold;">
                                            <asp:CheckBox ID="chkFactura" runat="server" Text="Factura" Enabled="False" Checked="false" />
                                        </td>
                                        <td style="font-weight: bold; padding-left: 155px; display: none;">
                                            SubTotal
                                        </td>
                                        <td style="padding-left: 7px; display: none;">
                                            <asp:TextBox ID="txtSubTotal" runat="server" Width="90px" Font-Names="Arial" ForeColor="Blue"
                                                Style="text-align: right;" Font-Bold="True" ReadOnly="True" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; display: none;">
                                            Igv
                                        </td>
                                        <td style="display: none;">
                                            <asp:TextBox ID="txtIgv" runat="server" Width="90px" Font-Names="Arial" ForeColor="Blue"
                                                Style="text-align: right;" Font-Bold="True" ReadOnly="True" Text="0.00"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnNuevo" runat="server" Text="Nuevo" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnEliminar" runat="server" Text="Eliminar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <%--        <asp:Button ID="btnExaminar" runat="server" Text="Examinar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />--%>
                    <asp:Button ID="btnCotizacion" runat="server" Text="Cotizacion" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" Style="display: none;" />
                    <asp:Button ID="btnAgregarProducto" runat="server" Text="Agregar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnGrabar" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </div>
            </div>
            <div style="text-align: center; width: 100%; color: Black; font-weight: bold">
                Cantidad de registros
                <asp:Label ID="lblNumRegistros" runat="server" Text="0"></asp:Label>
            </div>
            <div id="div_grvDetalleArticulo" style="padding-top: 5px;">
                <asp:GridView ID="grvDetalleArticulo" runat="server" AutoGenerateColumns="False"
                    border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                    Width="1017px">
                    <Columns>
                        <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" />
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>
                        <%--          <asp:TemplateField HeaderText="#">
                            <ItemStyle HorizontalAlign="Center" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblNumId" Text='' CssClass="numero"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>--%>
                        <asp:TemplateField HeaderText="ID">
                            <HeaderStyle CssClass="novisible" />
                            <ItemStyle HorizontalAlign="Right" CssClass="novisible" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblcoddetalle" Text='<%# Bind("CodDetalle") %>' CssClass="detallesart"></asp:Label>
                                <asp:HiddenField ID="hfcodarticulo" runat="server" Value='<%# Bind("CodArticulo") %>' />
                                <asp:HiddenField ID="hfPrecio" runat="server" Value='<%# Bind("Precio") %>' />
                                <asp:HiddenField ID="hfCantidad" runat="server" Value='<%# Bind("Cantidad") %>' />
                                <div class="precOrig">
                                    <asp:HiddenField ID="hfPrecioOrig" runat="server" Value='<%# Bind("PrecioOrig") %>' />
                                </div>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <%--        <asp:BoundField DataField="NroItem" HeaderText="Item">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>--%>
                        <asp:TemplateField HeaderText="Item">
                            <ItemStyle HorizontalAlign="Center" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblNumId" Text='<%# Bind("NroItem") %>' CssClass="numero"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Codigo">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblCodigoProducto" Text='<%# Bind("CodigoProducto") %>'
                                    CssClass="csimp"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Descripcion" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtDescripcion" Font-Bold="true" CssClass="ccsestilo"
                                    Width="450px" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Producto") %>'></asp:TextBox>
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Cantidad" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtCantidad" Width="75px" Font-Bold="true" Style="text-align: center;"
                                    CssClass="ccsestilo" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Cantidad") %>'
                                    onchange="F_MostrarTotales(this.id,1); return false;"></asp:TextBox>
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="UM">
                            <ItemTemplate>
                                <asp:Label ID="lblUm" runat="server" Text='<%# Bind("UM") %>'></asp:Label>
                            </ItemTemplate>
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Precio" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtPrecio" Width="75px" Font-Bold="true" Style="text-align: center;"
                                    CssClass="ccsestilo precioArt" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Precio") %>'
                                    onchange="F_MostrarTotales(this.id,2); return false;"></asp:TextBox>
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Importe">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblimporte" Text='<%# Bind("Importe") %>' CssClass="csimp"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <%--    <asp:TemplateField HeaderText="D1" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtDescuento1" Width="20px" Font-Bold="true" Style="text-align: center;"
                                    CssClass="ccsestilo precioArt" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Descuento1") %>'
                                    onchange="F_MostrarTotales(this.id,2); return false;"></asp:TextBox>
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>


                               <asp:TemplateField HeaderText="D2" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtDescuento2" Width="20px" Font-Bold="true" Style="text-align: center;"
                                    CssClass="ccsestilo precioArt" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Descuento2") %>'
                                    onchange="F_MostrarTotales(this.id,2); return false;"></asp:TextBox>
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>

                               <asp:TemplateField HeaderText="D3" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtDescuento3" Width="20px" Font-Bold="true" Style="text-align: center;"
                                    CssClass="ccsestilo precioArt" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Descuento3") %>'
                                    onchange="F_MostrarTotales(this.id,2); return false;"></asp:TextBox>
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>

                             <asp:TemplateField HeaderText="D4" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtDescuento4" Width="20px" Font-Bold="true" Style="text-align: center;"
                                    CssClass="ccsestilo precioArt" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Descuento4") %>'
                                    onchange="F_MostrarTotales(this.id,2); return false;"></asp:TextBox>
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>
                        --%>
                        <asp:BoundField DataField="Descuento1" HeaderText="D1">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Descuento2" HeaderText="D2">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Descuento3" HeaderText="D3">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Descuento4" HeaderText="D4">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                    </Columns>
                </asp:GridView>
            </div>
        </div>
        <div id="tabConsulta">
            <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    Criterio de busqueda
                </div>
                <div class="ui-jqdialog-content">
                    <table cellpadding="0" cellspacing="0" class="form-inputs">
                        <tbody>
                            <tr>
                                <td style="font-weight: bold">
                                    ESTADO
                                </td>
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <div id="div_Estado">
                                                    <asp:DropDownList ID="ddlEstado" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                        Font-Bold="True">
                                                    </asp:DropDownList>
                                                </div>
                                            </td>
                                            <td style="font-weight: bold">
                                                Empresas
                                            </td>
                                            <td>
                                                <div id="div_EmpresaConsulta">
                                                    <asp:DropDownList ID="ddlEmpresaConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                        Font-Bold="True" Width="242">
                                                    </asp:DropDownList>
                                                </div>
                                            </td>
                                            <td style="font-weight: bold">
                                                Vendedor
                                            </td>
                                            <td>
                                                <div id="div_VendedorConsulta">
                                                    <asp:DropDownList ID="ddlVendedorConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                        Font-Bold="True">
                                                    </asp:DropDownList>
                                                </div>
                                            </td>
                                            <td style="font-weight: bold;">
                                                Cuenta
                                            </td>
                                            <td style="padding-left: 20px;">
                                                <asp:TextBox ID="txtCuenta" runat="server" Width="40px" Font-Names="Arial" ForeColor="Blue"
                                                    Style="text-align: right;" Font-Bold="True" ReadOnly="True" Text="0"></asp:TextBox>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <asp:CheckBox ID="chkCliente" runat="server" Text="Cliente" Font-Bold="True" />
                                </td>
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <asp:TextBox ID="txtClienteConsulta" runat="server" Width="402" Font-Names="Arial"
                                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                            </td>
                                            <td>
                                                <asp:CheckBox ID="chkRango" runat="server" Text="Fecha" Font-Bold="True" />
                                            </td>
                                            <td style="padding-left: 4px;">
                                                <asp:TextBox ID="txtHasta" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                            </td>
                                            <td style="font-weight: bold; padding-left: 52px;">
                                                Sumatoria
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtSumatoria" runat="server" Width="100px" Font-Names="Arial" ForeColor="Blue"
                                                    Style="text-align: right;" Font-Bold="True" ReadOnly="True" Text="0.00"></asp:TextBox>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnExcel" runat="server" Text="EXCEL" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnPrincipales" runat="server" Text="PRINCIPALES" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnImpresionStickers" runat="server" Text="Stickers" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnImpresionPedidos" runat="server" Text="Imprimir" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </div>
            </div>
            <div id="div_consulta" style="padding-top: 5px;">
                <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" border="0"
                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="1000px"
                    OnRowDataBound="grvConsulta_RowDataBound">
                    <Columns>
                        <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" />
                            </ItemTemplate>
                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="A">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgAnularDocumento" ImageUrl="~/Asset/images/Eliminar.jpg"
                                    ToolTip="ANULAR" OnClientClick="F_AnularRegistro(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="PDF">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgPdf" ImageUrl="~/Asset/images/pdf.png" ToolTip="VER PDF"
                                    OnClientClick="F_VisualizarCotizacion(this,19,5); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="STK" Visible="false">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgPdf2" ImageUrl="~/Asset/images/pdf.png" ToolTip="Generar Stickers"
                                    OnClientClick="F_VisualizarCotizacion(this,19,6); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="E">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgEditar" ImageUrl="~/Asset/images/btnEdit.gif"
                                    ToolTip="EDITAR" OnClientClick="F_ElegirNotaPedido(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="DE">
                            <ItemTemplate>
                                <img id="imgMas" alt="" style="cursor: pointer" src="../Asset/images/plus.gif" onclick="imgMas_Click(this);"
                                    title="Ver Detalle" />
                                <asp:Panel ID="pnlOrders" runat="server" Style="display: none">
                                    <asp:GridView ID="grvDetalle" runat="server" border="0" CellPadding="0" CellSpacing="1"
                                        AutoGenerateColumns="False" GridLines="None" class="GridView">
                                        <Columns>
                                            <asp:BoundField DataField="NroItem" HeaderText="Item">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Center" />
                                            </asp:BoundField>
                                            <asp:TemplateField HeaderText="Codigo">
                                                <ItemStyle HorizontalAlign="Left" />
                                                <ItemTemplate>
                                                    <asp:Label runat="server" ID="lblCodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:BoundField DataField="Descripcion" HeaderText="Descripcion">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Cantidad" HeaderText="Cantidad">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Right" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="UM" HeaderText="UM">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Left" />
                                            </asp:BoundField>
                                            <asp:BoundField DataField="Precio" HeaderText="Precio">
                                                <HeaderStyle HorizontalAlign="Center" />
                                                <ItemStyle HorizontalAlign="Right" />
                                            </asp:BoundField>
                                            <asp:TemplateField HeaderText="Importe">
                                                <ItemStyle HorizontalAlign="Right" />
                                                <ItemTemplate>
                                                    <asp:Label runat="server" ID="lblImporte" Text='<%# Bind("Importe") %>' CssClass="detallesart2"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                        </Columns>
                                    </asp:GridView>
                                </asp:Panel>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Numero">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblNumeroPedido" Text='<%# Bind("Numero") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Empresa" HeaderText="Empresa">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Emision" HeaderText="Fecha">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="NroRuc" HeaderText="Ruc">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Cliente">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblCliente" Text='<%# Bind("Cliente") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Transportista">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblTransportista" Text='<%# Bind("Transportista") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="TD" HeaderText="TD">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Total">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblTotal" Text='<%# Bind("Total") %>' CssClass="numero2"
                                    DataFormatString="{0:N2}"></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="A">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgPreparado" ImageUrl="~/Asset/images/ok.gif"
                                    ToolTip="PREPARADO" OnClientClick="F_CerrarNotaPedido(this,15,'APROBACION NOTA DE PEDIDO','imgPreparado','PREPARADO POR'); return false;" />
                                <asp:HiddenField ID="hdnCodEstado" runat="server" Value='<%# Bind("CodEstado") %>' />
                                <asp:HiddenField ID="lblEstado" runat="server" Value='<%# Bind("Estado") %>' />
                                <asp:HiddenField ID="lblNumero" runat="server" Value='<%# Bind("Numero") %>' />
                                <asp:HiddenField ID="lblID" runat="server" Value='<%# Bind("ID") %>' />
                                <asp:HiddenField ID="hfCodVendPreparado" runat="server" Value='<%# Bind("CodVendPreparado") %>' />
                                <asp:HiddenField ID="hfCodVendAprobado" runat="server" Value='<%# Bind("CodVendAprobado") %>' />
                                <asp:HiddenField ID="hfCodTransportista" runat="server" Value='<%# Bind("CodTransportista") %>' />
                                <asp:HiddenField ID="hfTransportistaNP" runat="server" Value='<%# Bind("TransportistaNP") %>' />
                                <asp:HiddenField ID="hfComentario" runat="server" Value='<%# Bind("Comentario") %>' />
                                <asp:HiddenField ID="hfCodUsuarioCredito" runat="server" Value='<%# Bind("CodUsuarioCredito") %>' />
                                <asp:HiddenField ID="hfTransportistaCliente" runat="server" Value='<%# Bind("TransportistaCliente") %>' />
                                <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc") %>' />
                                <asp:HiddenField ID="hfCodAlmacenFisico" runat="server" Value='<%# Bind("CodAlmacenFisico") %>' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <%--        <asp:TemplateField HeaderText="A">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgAprobar" ImageUrl="~/Asset/images/ok.gif"
                                    ToolTip="APROBAR" OnClientClick="F_CerrarNotaPedido(this,15,'APROBACION NOTA DE PEDIDO','imgAprobar','APROBADO POR'); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>--%>
                        <asp:TemplateField HeaderText="C">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgCerrar" ImageUrl="~/Asset/images/ok.gif" ToolTip="CERRAR"
                                    OnClientClick="F_CerrarNotaPedido(this,8,'CIERRE NOTA DE PEDIDO','imgCerrar','CERRADO POR'); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="D">
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgDespacho" ImageUrl="~/Asset/images/ok.gif"
                                    ToolTip="DATOS DEL DESPACHO" OnClientClick="F_CerrarNotaPedido(this,5,'DATOS DEL DESPACHO','imgDespacho',''); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                    </Columns>
                </asp:GridView>
            </div>
        </div>
    </div>
    <div id="div_CerrarNota" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0" class="form-inputs">
                <tr>
                    <td style="font-weight: bold;">
                        Fecha Cierre
                    </td>
                    <td>
                        <asp:TextBox ID="txtFechaCierre" runat="server" Width="55px" CssClass="Jq-ui-dtp"
                            Font-Names="Arial" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        CERRADO POR
                    </td>
                    <td>
                        <div id="div_ddlvendcerra">
                            <asp:DropDownList ID="ddlVendedorCerrado" runat="server" Font-Names="Arial" ForeColor="Blue"
                                Font-Bold="True" Width="200">
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        Comentario
                    </td>
                    <td>
                        <asp:TextBox ID="txtComentarioCerrado" runat="server" Width="300" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True" Enabled="False" TextMode="MultiLine" Height="40"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td align="right" colspan="2">
                        <asp:Button ID="btnCerrarNotaPedido" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" OnClientClick="f_cerrardocu(); return false;" />
                        <asp:HiddenField ID="hdnCodNotaPedido" runat="server" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="div_Preparacion" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0" class="form-inputs">
                <tr>
                    <td style="font-weight: bold;">
                        EL CLIENTE QUIERE
                    </td>
                    <td>
                        <div id="div_TipoDoc">
                            <asp:DropDownList ID="ddlTipoDoc" runat="server" Font-Names="Arial" ForeColor="Blue"
                                Font-Bold="True" Width="200" BackColor="#FFFF99" Enabled="False">
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        PREPARADO POR
                    </td>
                    <td>
                        <div id="div_Preparado">
                            <asp:DropDownList ID="ddlPreparado" runat="server" Width="200" ForeColor="Blue">
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        APROBADO POR
                    </td>
                    <td>
                        <div id="div_Aprobado">
                            <asp:DropDownList ID="ddlAprobado" runat="server" Font-Names="Arial" ForeColor="Blue"
                                Font-Bold="True" Width="200">
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        APROBACION DE CREDITO
                    </td>
                    <td>
                        <div id="div_UsuarioCredito">
                            <asp:DropDownList ID="ddlUsuarioCredito" runat="server" Width="200" ForeColor="Blue">
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        Transportista Escogido
                    </td>
                    <td>
                        <asp:TextBox ID="txtTransportista" runat="server" Width="300" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblTransportistaNP" runat="server" Text="Transportista Pedido" Font-Bold="True"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtTransportistaNP" runat="server" Width="300" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True" Enabled="False"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        Comentario
                    </td>
                    <td>
                        <asp:TextBox ID="txtComentario" runat="server" Width="300" Font-Names="Arial" ForeColor="Blue"
                            Font-Bold="True" Enabled="False" TextMode="MultiLine" Height="40"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td align="right" colspan="2">
                        <asp:Button ID="btnGrabarPreparado" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" OnClientClick="f_cerrardocu(); return false;" />
                        <asp:HiddenField ID="HiddenField1" runat="server" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="divConsultaArticulo" style="display: none;">
        <div id='div1' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                Criterio de busqueda
            </div>
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs">
                    <tbody>
                        <tr>
                            <td>
                                <asp:CheckBox ID="chkServicios" runat="server" Text="Servicios" Font-Bold="True"
                                    Style="display: none;" />
                            </td>
                            <td>
                                <asp:CheckBox ID="chkNotaPedido" runat="server" Text="nota pedido" Font-Bold="True"
                                    Style="display: none;" />
                            </td>
                            <td style="padding-left: 5px; font-weight: bold">
                                <asp:CheckBox ID="chkDescripcion" runat="server" Text="descripcion" Font-Bold="True" />
                            </td>
                            <td>
                                <asp:TextBox ID="txtArticulo" runat="server" Width="717px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True"></asp:TextBox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="linea-button">
                <asp:Button ID="btnBuscarArticulo" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    Font-Names="Arial" Font-Bold="True" Width="120" />
                <asp:Button ID="btnAgregar" runat="server" Text="Agregar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    Font-Names="Arial" Font-Bold="True" Width="120" />
            </div>
        </div>
        <div id="div_grvConsultaArticulo" style="padding-top: 5px;">
            <asp:GridView ID="grvConsultaArticulo" runat="server" AutoGenerateColumns="False"
                border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                Width="1180px">
                <Columns>
                    <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <asp:CheckBox runat="server" ID="chkOK" CssClass="chkSi" Text="" onclick="F_ValidarCheck(this.id);" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="ID">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblcodproducto" Text='<%# Bind("CodProducto") %>'></asp:Label>
                            <asp:HiddenField ID="hfcodunidadventa" runat="server" Value='<%# Bind("CodUnidadVenta") %>' />
                            <asp:HiddenField ID="hfcosto" runat="server" Value='<%# Bind("Costo") %>' />
                            <asp:HiddenField ID="hfDescuento" runat="server" Value='<%# Bind("Descuento") %>' />
                            <asp:HiddenField ID="hfCodFamilia" runat="server" Value='<%# Bind("CodFamilia") %>' />
                            <asp:HiddenField ID="hfCostoProductoSoles" runat="server" Value='<%# Bind("CostoProductoSoles") %>' />
                            <asp:HiddenField ID="hfCostoProductoDolares" runat="server" Value='<%# Bind("CostoProductoDolares") %>' />
                            <asp:HiddenField ID="hfMargen" runat="server" Value='<%# Bind("Margen") %>' />
                            <asp:HiddenField ID="hfCostoUniOriginal" runat="server" Value='<%# Bind("CostoUniOriginal") %>' />
                            <asp:HiddenField ID="hfPrecioOrig" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Codigo">
                        <ItemStyle Font-Bold="true" HorizontalAlign="Left" />
                        <ItemTemplate>
                            <asp:HyperLink runat="server" ID="hlkCodigo" Font-Underline="true" ForeColor="Blue"
                                Style="cursor: hand" Text='<%# Bind("CodigoProducto") %>' onclick="F_VerUltimoPrecio(this.id); return false;"
                                ToolTip="Ver Series">
                            </asp:HyperLink>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Descripcion">
                        <ItemStyle HorizontalAlign="Left" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Producto") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Soles" Visible="false">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblPrecioSoles" Text='<%# Bind("PrecioSoles") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Adespa">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblDespacho" Text='<%# Bind("Adespacho") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Aconten">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblTemplo" Text='<%# Bind("AContenedores") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Total">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblChala1" Text='<%# Bind("Total") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Dolares">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblPrecioDolares" Text='<%# Bind("PrecioDolares") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="UM">
                        <ItemStyle HorizontalAlign="Center" />
                        <ItemTemplate>
                            <asp:Label runat="server" ID="lblUM" Text='<%# Bind("UM") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Desc1" ItemStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtDescuento1" Width="35px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" onblur="F_ValidarDsc(this.id, 'txtDescuento1');"
                                Text='<%# Bind("Descuento1") %>' CssClass="ccsestilo" Enabled="True"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Desc2" ItemStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtDescuento2" Width="35px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" onblur="F_ValidarDsc(this.id, 'txtDescuento2');"
                                Text='<%# Bind("Descuento2") %>' CssClass="ccsestilo" Enabled="True"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Desc3" ItemStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtDescuento3" Width="35px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" onblur="F_ValidarDsc(this.id, 'txtDescuento3');"
                                Text='<%# Bind("Descuento3") %>' CssClass="ccsestilo" Enabled="True"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Desc4" ItemStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtDescuento4" Width="35px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" onblur="F_ValidarDsc(this.id, 'txtDescuento4');"
                                Text='<%# Bind("Descuento4") %>' CssClass="ccsestilo" Enabled="True"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:BoundField DataField="TipoCambio" HeaderText="TC" Visible="false">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Right" />
                    </asp:BoundField>
                    <asp:BoundField DataField="Descuento" HeaderText="Dscto-Max" Visible="False">
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Right" />
                    </asp:BoundField>
                    <asp:TemplateField HeaderText="Precio" ItemStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtPrecio" Width="55px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" onblur="F_ValidarPrecioGrilla(this.id);"
                                CssClass="ccsestilo" Enabled="False" ReadOnly="true"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Dscto" ItemStyle-HorizontalAlign="Center" Visible="False">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtDescuento" Width="55px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" onblur="F_ValidarDescuento(this.id);" CssClass="ccsestilo"
                                Enabled="False"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Cant." ItemStyle-HorizontalAlign="Center">
                        <ItemTemplate>
                            <asp:TextBox runat="server" ID="txtCantidad" Width="55px" Font-Bold="true" Style="text-align: center;"
                                ForeColor="Blue" Font-Names="Arial" CssClass="ccsestilo" Enabled="False"></asp:TextBox>
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>
    </div>
    <div id="div_ExcelCarga" style="display: none;">
        <div class="ui-jqdialog-content">
            <table>
                <tr>
                    <td style="font-weight: bold">
                        Archivo Excel
                    </td>
                    <td style="padding-left: 5px;">
                        <asp:FileUpload ID="fuExcel" runat="server" />
                    </td>
                    <td style="padding-left: 10px;">
                        <asp:Button ID="btnExaminarExcel" runat="server" Text="Cargar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                    </td>
                </tr>
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
    <div id="divConsultaCotizacion" style="display: none">
        <div id='div2' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 670px">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                Criterio de busqueda
            </div>
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs" style="width: 670px">
                    <tbody>
                        <tr>
                            <td style="padding-left: 5px; font-weight: bold">
                                Serie
                                <div id="div_ddlVendedorEspecial">
                                    <asp:DropDownList ID="ddlVendedorEspecial" runat="server" Width="200" ForeColor="Blue">
                                    </asp:DropDownList>
                                </div>
                            </td>
                            <td>
                                <asp:TextBox ID="txtConCotSer" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True"></asp:TextBox>
                            </td>
                            <td style="padding-left: 5px; font-weight: bold">
                                Numero
                            </td>
                            <td>
                                <asp:TextBox ID="txtConCotNum" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-left: 5px; font-weight: bold">
                                Referencia
                            </td>
                            <td colspan="3">
                                <asp:TextBox ID="txtConCotRef" runat="server" Width="250px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True"></asp:TextBox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="linea-button">
                <asp:Button ID="btnConCotBus" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    Font-Names="Arial" Font-Bold="True" Width="120" />
            </div>
        </div>
        <div id="div_grvConCot" style="padding-top: 5px;">
            <asp:GridView ID="grvConCot" runat="server" AutoGenerateColumns="False" border="0"
                CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="650px">
                <Columns>
                    <asp:TemplateField HeaderText="Serie">
                        <ItemTemplate>
                            <asp:Label ID="lblCotSerie" runat="server" Text='<%# Bind("Serie") %>'></asp:Label>
                            <asp:HiddenField ID="hdnCodProforma" runat="server" Value='<%# Bind("CodProforma") %>' />
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Left" Width="40px" />
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Numero">
                        <ItemTemplate>
                            <asp:Label ID="lblCotNumero" runat="server" Text='<%# Bind("Numero") %>'></asp:Label>
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Left" Width="100px" />
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Cliente">
                        <ItemTemplate>
                            <asp:Label ID="lblClienteCon" runat="server" Text='<%# Bind("RazonSocial") %>'></asp:Label>
                        </ItemTemplate>
                        <HeaderStyle HorizontalAlign="Center" />
                        <ItemStyle HorizontalAlign="Left" Width="250px" />
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Referencia">
                        <ItemTemplate>
                            <asp:Label ID="lblCotReferencia" runat="server" Text='<%# Bind("Referencia") %>'></asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:ImageButton ID="imgSelecCot" runat="server" ImageUrl="~/Asset/images/ok.gif"
                                OnClientClick="F_ElegirCotizacion(this); return false;" ToolTip="Elegir" />
                        </ItemTemplate>
                        <ItemStyle Width="20px" />
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>
    </div>
    <div id="div_ImpresorasNotaPedido" style="display: none;">
        <div class="ui-jqdialog-content">
            <table>
                <tr>
                    <td style="font-weight: bold">
                        Impresora
                    </td>
                    <td style="padding-left: 3px;">
                        <div id="div_ComboImpresoraNotaPedido">
                            <asp:DropDownList ID="ddlImpresoraNotaPedido" runat="server" Font-Names="Arial" ForeColor="Blue"
                                Font-Bold="True" Width="250">
                            </asp:DropDownList>
                        </div>
                    </td>
                    <td style="font-weight: bold">
                        <asp:Button ID="btnImprimirPedidos" runat="server" Text="Imprimir" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                    </td>
                </tr>
            </table>
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
    <div id="div_PopUpPendiente" style="display: none;">
        <div class="ui-jqdialog-content">
            <table>
                <tr>
                    <td>
                        <div id="div_Pendiente" style="padding-top: 5px;">
                            <asp:GridView ID="grv_Pendiente" runat="server" AutoGenerateColumns="False" border="0"
                                CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="300px">
                                <Columns>
                                    <asp:BoundField DataField="Dolares" HeaderText="Dolares" DataFormatString="{0:N2}">
                                        <HeaderStyle HorizontalAlign="Center" />
                                        <ItemStyle HorizontalAlign="Right" Font-Size="Medium" />
                                    </asp:BoundField>
                                    <asp:BoundField DataField="Soles" HeaderText="Soles" DataFormatString="{0:N2}">
                                        <HeaderStyle HorizontalAlign="Center" />
                                        <ItemStyle HorizontalAlign="Right" Font-Size="Medium" />
                                    </asp:BoundField>
                                    <asp:BoundField DataField="NumeroPedido" HeaderText="Pedidos">
                                        <HeaderStyle HorizontalAlign="Center" />
                                        <ItemStyle HorizontalAlign="Right" Font-Size="Medium" />
                                    </asp:BoundField>
                                </Columns>
                            </asp:GridView>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="div_Despacho" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0" class="form-inputs">
                <tr>
                    <td style="font-weight: bold;">
                        Despacho
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtDespachoFecha" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold; padding-left: 10px">
                                    Nro. Guias
                                </td>
                                <td>
                                    <asp:TextBox ID="txtDespachoNroGuias" runat="server" Width="300" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Enabled="True"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold">
                        Nro. Bultos
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtDespachoNroBultos" runat="server" Width="137" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Enabled="True"></asp:TextBox>
                                </td>
                                <td style="font-weight: bold; padding-left: 10px">
                                    Chofer
                                </td>
                                <td style="padding-left: 19px">
                                    <asp:TextBox ID="txtDespachoChofer" runat="server" Width="218" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Enabled="True"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        Transporte
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtDespachoTransportista" runat="server" Width="440" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Enabled="True"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                        Observacion
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <asp:TextBox ID="txtDespachoObservacion" runat="server" Width="440" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" Enabled="True"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <asp:Label ID="lblUsuarioTransportista" runat="server" Text="" Font-Bold="True" Width="250px"></asp:Label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="right" colspan="2">
                        <asp:Button ID="btnDespachoGrabar" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" OnClientClick="f_actualizarDatosDespacho(); return false;" />
                        <asp:HiddenField ID="HiddenField2" runat="server" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfCodCtaCteConsulta" type="hidden" value="0" />
    <input id="hfCodCtaCteOC" type="hidden" value="0" />
    <input id="hfCodMovimiento" type="hidden" value="0" />
    <input id="hfCodEmpresa" type="hidden" value="0" />
    <input id="hfCodSede" type="hidden" value="0" />
    <input id="hfCodigoTemporal" type="hidden" value="0" />
    <input id="hfCodDocumentoVenta" type="hidden" value="0" />
    <input id="hfCodEstado" type="hidden" value="0" />
    <input id="hfCodEstadoCierre" type="hidden" value="0" />
    <input id="hfCodVendPreparado" type="hidden" value="0" />
    <input id="hfCodVendAprobado" type="hidden" value="0" />
    <input id="hfCodVendCierre" type="hidden" value="0" />
    <input id="hfCodTransportista" type="hidden" value="0" />
    <input id="hfCodDespachoTransportista" type="hidden" value="0" />
    <input id="hfDespachoTransportista" type="hidden" value="0" />
</asp:Content>
