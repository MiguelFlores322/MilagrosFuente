<%@ Page Title="Factura Compra" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="RegistroFacturaCompraMilagros.aspx.cs" Inherits="SistemaInventario.Compras.RegistroFacturaCompraMilagros" %>

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
    <script src="../Scripts/inputatajos/kibo.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="RegistroFacturaCompraMilagros.js"
        charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class='overlay'>
        <div class="titulo">
            REGISTRO DE COMPRAS FACTURA</div>
        <div id="divTabs">
            <ul>
                <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
                <li id="liConsulta"><a href="#tabConsulta" onclick="getContentTab();">Consulta</a></li>
            </ul>
            <div id="tabRegistro">
                <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                    <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                        Datos de Factura
                    </div>
                    <div>
                        <table cellpadding="0" cellspacing="0" class="form-inputs" width="750">
                            <tr>
                                <td style="font-weight: bold">
                                    proveedor
                                </td>
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <asp:TextBox ID="txtProveedor" runat="server" Width="428px" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True"></asp:TextBox>
                                                <asp:ImageButton ID="imgAddScop" Style="display: none;" runat="server" ImageUrl="~/Asset/images/add_small.png"
                                                    ImageAlign="AbsMiddle" ToolTip="Agregar Proveedor" />
                                                <asp:Label ID="Label1" runat="server" Text="T.C." Font-Bold="True"></asp:Label>
                                                <asp:Label ID="lblTC" runat="server" Text="Label" Font-Bold="True"></asp:Label>
                                            </td>
                                            <td style="font-weight: bold">
                                                Emision
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtEmision" runat="server" Width="50px" CssClass="Jq-ui-dtp" Font-Names="Arial"
                                                    ForeColor="Blue" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                            </td>
                                            <td style="font-weight: bold">
                                                Ingreso
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtFechaIngreso" runat="server" Width="50px" CssClass="Jq-ui-dtp"
                                                    Font-Names="Arial" ForeColor="Blue" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                            </td>
                                            <td style="font-weight: bold; display: none;">
                                                PERIODO
                                            </td>
                                            <td style="display: none;">
                                                <asp:TextBox ID="txtPeriodo" runat="server" Width="37px" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" CssClass="MesAnioPicker" ReadOnly="true"></asp:TextBox>
                                            </td>
                                            <td style="font-weight: bold">
                                                cond.
                                            </td>
                                            <td>
                                                <div id="div_formapago">
                                                    <asp:DropDownList ID="ddlFormaPago" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                        Font-Bold="True" Width="93">
                                                    </asp:DropDownList>
                                                </div>
                                            </td>
                                            <td style="font-weight: bold">
                                                vcto
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtVencimiento" runat="server" Width="50px" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                            </td>
                                            <td style="font-weight: bold; display: none;">
                                                Empresa
                                                <asp:HiddenField ID="hdnCodEmpresa" runat="server" />
                                                <asp:HiddenField ID="hdnCodSede" runat="server" />
                                            </td>
                                            <td style="display: none;">
                                                <asp:TextBox ID="txtEmpresa" runat="server" Width="475px" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" ReadOnly="true"></asp:TextBox>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold">
                                    Tipo Doc
                                </td>
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <div id="div_TipoDocumento2">
                                                    <asp:DropDownList ID="ddlTipoDocumento2" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                        Font-Bold="True" Width="140">
                                                        <asp:ListItem Value="16">PROFORMAS</asp:ListItem>
                                                        <asp:ListItem Value="2">BOLETAS</asp:ListItem>
                                                        <asp:ListItem Value="1">FACTURAS</asp:ListItem>
                                                    </asp:DropDownList>
                                                </div>
                                            </td>
                                            <td style="font-weight: bold">
                                                Guia
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtNumeroGuia" runat="server" Width="254" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True"></asp:TextBox>
                                            </td>
                                            <td style="font-weight: bold">
                                                Moneda
                                            </td>
                                            <td style="padding-left: 28px;">
                                                <div id="div_moneda">
                                                    <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                        Font-Bold="True" Width="75">
                                                    </asp:DropDownList>
                                                </div>
                                            </td>
                                            <td style="font-weight: bold">
                                                Serie
                                            </td>
                                            <td style="padding-left: 20px;">
                                                <asp:TextBox ID="txtSerie" runat="server" Width="40" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True"></asp:TextBox>
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtNumero" runat="server" Width="50" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True"></asp:TextBox>
                                            </td>
                                            <td style="font-weight: bold">
                                                Igv
                                            </td>
                                            <td>
                                                <div id="div_igv">
                                                    <asp:DropDownList ID="ddlIgv" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                        Font-Bold="True" Width="59">
                                                    </asp:DropDownList>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" align="right">
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <asp:CheckBox runat="server" ID="chkConIgvMaestro" Text="C/Igv" onclick="F_ValidarCheckConIgvMaestro(this.id);"
                                                    Checked="True" Font-Bold="True" />
                                            </td>
                                            <td>
                                                <asp:CheckBox runat="server" ID="chkSinIgvMaestro" Text="S/Igv" onclick="F_ValidarCheckSinIgvMaestro(this.id);"
                                                    Font-Bold="True" />
                                            </td>
                                            <td style="font-weight: bold; display: none">
                                                dscto
                                            </td>
                                            <td style="display: none;">
                                                <asp:TextBox ID="txtDsctoTotal" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                    CssClass="Derecha" Font-Bold="True" Text="0.00"></asp:TextBox>
                                            </td>
                                            <td style="display: none; font-weight: bold">
                                                Importe
                                            </td>
                                            <td style="display: none;">
                                                <asp:TextBox ID="txtImporte" runat="server" Width="70px" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                            </td>
                                            <td style="display: none; font-weight: bold">
                                                Descuento
                                            </td>
                                            <td style="display: none;">
                                                <asp:TextBox ID="txtDescuento" runat="server" Width="70px" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" CssClass="Derecha" Text="0.00"></asp:TextBox>
                                            </td>
                                            <td style="font-weight: bold">
                                                SubTotal
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtSubTotal" runat="server" Width="71px" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                            </td>
                                            <td style="font-weight: bold; padding-left: 1PX;">
                                                Igv
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtIgv" runat="server" Width="70px" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                            </td>
                                            <td style="font-weight: bold">
                                                total
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtTotal" runat="server" Width="70px" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" CssClass="Derecha" ReadOnly="True" Text="0.00"></asp:TextBox>
                                            </td>
                                            <td style="font-weight: bold">
                                                Monto
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtMonto" runat="server" Width="70px" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" CssClass="Derecha" Text="0.00"></asp:TextBox>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <td style="font-weight: bold">
                                    Guia
                                </td>
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="font-weight: bold">
                                                ALMACEN
                                            </td>
                                            <td style="display: none;">
                                                <div id="div_AlmacenFisico">
                                                    <asp:DropDownList ID="ddlAlmacenFisico" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                        Font-Bold="True" Width="140">
                                                    </asp:DropDownList>
                                                </div>
                                            </td>
                                            <td style="font-weight: bold">
                                                Tipo Documento
                                            </td>
                                            <td>
                                            </td>
                                            <td style="display: none;">
                                                <div id="div_tipodocumento">
                                                    <asp:DropDownList ID="ddlTipoDocumento" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                        Font-Bold="True" Width="88">
                                                    </asp:DropDownList>
                                                </div>
                                            </td>
                                            <td style="display: none;">
                                                <div id="div_clasificacion">
                                                    <asp:DropDownList ID="ddlClasificacion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                        Font-Bold="True" Width="100">
                                                    </asp:DropDownList>
                                                </div>
                                            </td>
                                            <td style="display: none;">
                                                <asp:CheckBox ID="chkPercepcion" runat="server" Text="Percepcion" Font-Bold="True" />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="linea-button">
                        <asp:Button ID="btnNuevo" runat="server" Text="Nuevo (F1)" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                        <asp:Button ID="btnEliminar" runat="server" Text="Eliminar (F2)" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                        <asp:Button ID="btnAgregarProducto" runat="server" Text="Agregar (F3)" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                        <asp:Button ID="btnOC" runat="server" Text="OC" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" Style="display: none;" />
                        <asp:Button ID="btnGrabar" runat="server" Text="Grabar (F4)" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
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
                        Width="1018px">
                        <Columns>
                            <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                <ItemTemplate>
                                    <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" />
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="#">
                                <ItemStyle HorizontalAlign="Center" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblNumId" Text='' CssClass="numero"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField DataField="CodigoProducto" HeaderText="Código">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Left" />
                            </asp:BoundField>
                            <asp:TemplateField HeaderText="Producto">
                                <ItemStyle HorizontalAlign="Left" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Producto") %>'></asp:Label>
                                    <asp:HiddenField ID="hfCodArticulo" runat="server" Value='<%# Bind("CodArticulo") %>' />
                                    <asp:HiddenField ID="hfCodDetalleOC" runat="server" Value='<%# Bind("CodDetalleOC") %>' />
                                    <asp:HiddenField ID="hfPrecio" runat="server" Value='<%# Bind("Importe") %>' />
                                    <asp:HiddenField ID="hfCantidad" runat="server" Value='<%# Bind("Cantidad") %>' />
                                    <asp:HiddenField ID="hfCodDetalle" runat="server" Value='<%# Bind("CodDetalle") %>' />
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Cantidad" ItemStyle-HorizontalAlign="Center">
                                <ItemTemplate>
                                    <asp:TextBox runat="server" ID="txtCantidad" Width="75px" Font-Bold="true" Style="text-align: center;"
                                        CssClass="ccsestilo" Font-Names="Arial" ForeColor="Blue" Text='<%# Bind("Cantidad") %>'
                                        onblur="F_ActualizarCantidad(this.id); return false;"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField DataField="UM" HeaderText="UM">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Left" />
                            </asp:BoundField>
                            <asp:TemplateField HeaderText="Precio">
                                <ItemStyle HorizontalAlign="Right" />
                                <ItemTemplate>
                                    <asp:TextBox runat="server" ID="txtPrecio" Width="75px" Font-Bold="true" Style="text-align: center;"
                                        Font-Names="Arial" CssClass="ccsestilo" ForeColor="Blue" Text='<%# Bind("Precio") %>'
                                        onblur="F_ActualizarPrecio(this.id); return false;"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Importe" ItemStyle-HorizontalAlign="Center">
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblImporte" Text='<%# Bind("Importe") %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
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
                                    <td>
                                        <div id="div_TipoDocumento3">
                                            <asp:DropDownList ID="ddlTipoDocumento3" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" Width="100">
                                                <asp:ListItem Value="16">PROFORMAS</asp:ListItem>
                                                <asp:ListItem Value="2">BOLETAS</asp:ListItem>
                                                <asp:ListItem Value="1">FACTURAS</asp:ListItem>
                                            </asp:DropDownList>
                                        </div>
                                    </td>
                                    <td>
                                        <asp:CheckBox ID="chkNumero" runat="server" Text="Numero" Font-Bold="True" />
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtNumeroConsulta" runat="server" Width="70" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                    <td>
                                        <asp:CheckBox ID="chkRango" runat="server" Text="Fecha" Font-Bold="True" />
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtDesde" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtHasta" runat="server" Width="55" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" CssClass="Jq-ui-dtp" ReadOnly="True"></asp:TextBox>
                                    </td>
                                    <td>
                                        <asp:CheckBox ID="chkCliente" runat="server" Text="Proveedor" Font-Bold="True" />
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtClienteConsulta" runat="server" Width="420" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="linea-button">
                        <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                    </div>
                </div>
                <div id="div_consulta" style="padding-top: 5px;">
                    <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" border="0"
                        CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="1005px"
                        OnRowDataBound="grvConsulta_RowDataBound">
                        <Columns>
                            <asp:TemplateField>
                                <ItemTemplate>
                                    <asp:ImageButton runat="server" ID="imgAnularDocumento" ImageUrl="~/Asset/images/EliminarBtn.png"
                                        ToolTip="Eliminar Factura" OnClientClick="F_AnularRegistro(this); return false;" />
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField>
                                <ItemTemplate>
                                    <asp:ImageButton runat="server" ID="imgEditarRegistro" ImageUrl="~/Asset/images/btnEdit.gif"
                                        ToolTip="Editar Registro" OnClientClick="F_EditarRegistro(this); return false;" />
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField>
                                <ItemTemplate>
                                    <asp:ImageButton runat="server" ID="imgReemplazar" ImageUrl="~/Asset/images/Reemplazo.png"
                                        ToolTip="Actualizar Documento" OnClientClick="F_ReemplazarDocumento(this); return false;" />
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="PDF" Visible="true">
                                <ItemTemplate>
                                    <asp:ImageButton runat="server" ID="imgPdf" ImageUrl="~/Asset/images/pdf.png" ToolTip="Generar Version PDF"
                                        OnClientClick="F_ImprimirFacturaPDF(this); return false;" />
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField>
                                <ItemTemplate>
                                    <img id="imgMas" alt="" style="cursor: pointer" src="../Asset/images/plus.gif" onclick="imgMas_Click(this);"
                                        title="Ver Detalle" />
                                    <asp:Panel ID="pnlOrders" runat="server" Style="display: none">
                                        <asp:GridView ID="grvDetalle" runat="server" border="0" CellPadding="0" CellSpacing="1"
                                            AutoGenerateColumns="False" GridLines="None" class="GridView">
                                            <Columns>
                                                <asp:TemplateField HeaderText="ID">
                                                    <ItemStyle Font-Bold="true" HorizontalAlign="Center" />
                                                    <ItemTemplate>
                                                        <asp:HyperLink runat="server" ID="lblID" Font-Underline="true" ForeColor="Blue" Style="cursor: hand"
                                                            Text='<%# Bind("ID") %>' onclick="F_VerSeries_Factura(this.id); return false;"
                                                            ToolTip="Ver Series">
                                                        </asp:HyperLink>
                                                    </ItemTemplate>
                                                </asp:TemplateField>
                                                <asp:BoundField DataField="Codigo" HeaderText="Codigo">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                </asp:BoundField>
                                                <asp:BoundField DataField="Producto" HeaderText="Descripcion">
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
                                                <asp:BoundField DataField="Precio" HeaderText="Precio C/D">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                </asp:BoundField>
                                                <asp:BoundField DataField="Importe" HeaderText="Importe">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Right" />
                                                </asp:BoundField>
                                            </Columns>
                                        </asp:GridView>
                                    </asp:Panel>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Numero">
                                <ItemStyle HorizontalAlign="Left" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblNumero" Text='<%# Bind("Numero") %>'></asp:Label>
                                    <asp:HiddenField ID="hfCodTipoDoc" runat="server" Value='<%# Bind("CodTipoDoc") %>' />
                                    <asp:HiddenField ID="hfCodMoneda" runat="server" Value='<%# Bind("CodMoneda") %>' />
                                    <asp:HiddenField ID="hfFlagIgv" runat="server" Value='<%# Bind("FlagIgv") %>' />
                                    <asp:HiddenField ID="hfTasaIgv" runat="server" Value='<%# Bind("TasaIgv") %>' />
                                    <asp:HiddenField ID="hfCodigo" runat="server" Value='<%# Bind("Codigo") %>' />
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Proveedor" HeaderStyle-HorizontalAlign="Center">
                                <ItemStyle HorizontalAlign="Left" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblcliente" Text='<%# Bind("RazonSocial") %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField DataField="Emision" HeaderText="Emision">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" />
                            </asp:BoundField>
                            <asp:BoundField DataField="Condicion" HeaderText="Condicion">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Left" />
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
                            <%--      <asp:BoundField DataField="FechaCancelacion" HeaderText="Cancelac" HeaderStyle-HorizontalAlign="Center">
                                <HeaderStyle HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" />
                            </asp:BoundField>--%>
                            <asp:TemplateField HeaderText="Estado" HeaderStyle-HorizontalAlign="Center">
                                <ItemStyle HorizontalAlign="Left" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblEstado" Text='<%# Bind("Estado") %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Periodo" HeaderStyle-HorizontalAlign="Center">
                                <ItemStyle HorizontalAlign="Left" />
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblPeriodo" Text='<%# Bind("Periodo") %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                        </Columns>
                    </asp:GridView>
                </div>
            </div>
        </div>
        <div id="divFacturacionOC" style="display: none;">
            <table cellpadding="0" cellspacing="0" width="850">
                <tr>
                    <td align="right" style="padding-top: 10px;">
                        <asp:Button ID="btnDevolverItemOC" runat="server" Text="Devolver" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120px" />
                        <asp:Button ID="btnAgregarItemOC" runat="server" Text="Agregar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120px" />
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 5px;">
                        <div id="div_DetalleOC">
                            <asp:GridView ID="grvDetalleOC" runat="server" AutoGenerateColumns="False" border="0"
                                CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="860px">
                                <Columns>
                                    <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                        <ItemTemplate>
                                            <asp:CheckBox runat="server" ID="chkEliminar" CssClass="chkDelete" Text="" onclick="F_ValidarCheck_OC(this.id);" />
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="ID">
                                        <ItemStyle HorizontalAlign="Right" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblCodDetalle" Text='<%# Bind("CodDetalle") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:BoundField DataField="Fecha" HeaderText="Fecha">
                                        <HeaderStyle HorizontalAlign="Center" />
                                        <ItemStyle HorizontalAlign="Center" />
                                    </asp:BoundField>
                                    <asp:TemplateField HeaderText="Numero">
                                        <ItemStyle HorizontalAlign="Left" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblNumero" Text='<%# Bind("Numero") %>'></asp:Label>
                                            <asp:HiddenField ID="hfCodArticulo" runat="server" Value='<%# Bind("CodArticulo") %>' />
                                            <asp:HiddenField ID="hfCodUndMedida" runat="server" Value='<%# Bind("CodUndMedida") %>' />
                                            <asp:HiddenField ID="hfCodMovimiento" runat="server" Value='<%# Bind("CodMovimiento") %>' />
                                            <asp:HiddenField ID="hfSerieDocSust" runat="server" Value='<%# Bind("SerieDocSust") %>' />
                                            <asp:HiddenField ID="hfNumeroDocSust" runat="server" Value='<%# Bind("NumeroDocSust") %>' />
                                            <asp:HiddenField ID="hfStockActual" runat="server" Value='<%# Bind("StockActual") %>' />
                                            <asp:HiddenField ID="hfCodDetalle" runat="server" Value='<%# Bind("CodDetalle") %>' />
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Codigo">
                                        <ItemStyle HorizontalAlign="Left" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblCodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Descripcion">
                                        <ItemStyle HorizontalAlign="Left" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Producto") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Compra">
                                        <ItemStyle HorizontalAlign="Right" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblCantidad" Text='<%# Bind("Cantidad") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:BoundField DataField="UM" HeaderText="UM">
                                        <HeaderStyle HorizontalAlign="Center" />
                                        <ItemStyle HorizontalAlign="Left" />
                                    </asp:BoundField>
                                    <asp:TemplateField HeaderText="Precio">
                                        <ItemStyle HorizontalAlign="Right" />
                                        <ItemTemplate>
                                            <asp:Label runat="server" ID="lblPrecio" Text='<%# Bind("Precio") %>'></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Cantidad" ItemStyle-HorizontalAlign="Center">
                                        <ItemTemplate>
                                            <asp:TextBox runat="server" ID="txtCantidadEntregada" Width="55px" CssClass="ccsestilo"
                                                Style="text-align: center;" Font-Names="Arial" ForeColor="Blue" Font-Bold="True"
                                                Enabled="False" onblur="F_ValidarStockGrillaOC(this.id);"></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                </Columns>
                            </asp:GridView>
                        </div>
                    </td>
                </tr>
            </table>
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
                                <td style="padding-left: 5px; font-weight: bold">
                                    <asp:CheckBox ID="chkDescripcion" runat="server" Text="descripcion" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:TextBox ID="txtArticulo" runat="server" Width="650px" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True"></asp:TextBox>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <asp:CheckBox runat="server" ID="chKConIgv" Text="Con Igv" onclick="F_ValidarCheckSinIgv(this.id);"
                                        Checked="True" Font-Bold="True" />
                                </td>
                                <td>
                                    <asp:CheckBox runat="server" ID="chkSinIgv" Text="Sin Igv" onclick="F_Prueba();"
                                        Font-Bold="True" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnBuscarArticulo" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                    <asp:Button ID="btnAgregar" runat="server" Text="Agregar (F5)" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </div>
            </div>
            <div id="div_grvConsultaArticulo" style="padding-top: 5px;">
                <asp:GridView ID="grvConsultaArticulo" runat="server" AutoGenerateColumns="False"
                    border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                    Width="980px">
                    <Columns>
                        <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:CheckBox runat="server" ID="chkOK" CssClass="chkSi" Text="" onclick="F_ValidarCheck(this.id);" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="CodigoProducto" HeaderText="Codigo">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="Descripcion">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblProducto" Text='<%# Bind("Descripcion") %>'></asp:Label>
                                <asp:HiddenField ID="hfCodUnidadVenta" runat="server" Value='<%# Bind("CodUnidadVenta") %>' />
                                <asp:HiddenField ID="hfCosto" runat="server" Value='<%# Bind("Costo") %>' />
                                <asp:HiddenField ID="hfCodProducto" runat="server" Value='<%# Bind("CodProducto") %>' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="ADespacho">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblDespacho" Text='<%# Bind("ADespacho") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Pre-2" Visible="false">
                            <ItemStyle HorizontalAlign="Center" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblPrecio2" Text='<%# Bind("Precio2") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Pre-3" Visible="false">
                            <ItemStyle HorizontalAlign="Center" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblPrecio3" Text='<%# Bind("Precio3") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Moneda" HeaderText="Mon." Visible="false">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:TemplateField HeaderText="UM">
                            <ItemStyle HorizontalAlign="Center" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblUM" Text='<%# Bind("UM") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Cant." ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtCantidad" Width="55px" Style="text-align: center;"
                                    onblur="F_ValidarStockGrilla();" Font-Names="Arial" ForeColor="Blue" Font-Bold="True"
                                    CssClass="ccsestilo" Enabled="False"></asp:TextBox>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Precio Unit." ItemStyle-HorizontalAlign="Center">
                            <ItemTemplate>
                                <asp:TextBox runat="server" ID="txtPrecioLibre" Width="80px" Style="text-align: center;"
                                    CssClass="ccsestilo" Font-Names="Arial" ForeColor="Blue" Font-Bold="True" onblur="F_ValidarImporteGrilla(this.id); return false;"></asp:TextBox>
                            </ItemTemplate>
                        </asp:TemplateField>
                    </Columns>
                </asp:GridView>
            </div>
        </div>
        <div id="div_Mantenimiento" style="display: none;">
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs">
                    <tr>
                        <td colspan="2">
                            <asp:Button ID="btnGrabarEdicion" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                Font-Names="Arial" Font-Bold="True" Width="120" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 10px;" colspan='2'>
                            <table>
                                <tr>
                                    <td style="font-weight: bold">
                                        Periodo
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtPeriodoConsulta" runat="server" Width="75px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True" CssClass="MesAnioPicker" ReadOnly="true"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
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
    </div>
    <input id="hfImporte" type="hidden" value="0" />
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfCodCtaCteConsulta" type="hidden" value="0" />
    <input id="hfCodigoTemporal" type="hidden" value="0" />
    <input id="hfCodDocumentoVenta" type="hidden" value="0" />
    <input id="hfCodDetDocumentoVenta" type="hidden" value="0" />
    <input id="hfCodProducto" type="hidden" value="0" />
    <input id="hfCantidad" type="hidden" value="0" />
    <input id="hfFlagSerie" type="hidden" value="0" />
    <input id="hfCodEmpresa" type="hidden" value="0" />
    <input id="hfCodSede" type="hidden" value="0" />
    <input id="hfCodAlmacen" type="hidden" value="0" />
    <input id="hfCodFacturaAnterior" type="hidden" value="0" />
</asp:Content>
