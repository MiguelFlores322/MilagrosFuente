<%@ Page Title="Carga Nota Pedido" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="CargaNotaPedido.aspx.cs" Inherits="SistemaInventario.Ventas.CargaNotaPedido" %>

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
    <script type="text/javascript" language="javascript" src="CargaNotaPedido.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo">
        Carga de Nota Pedido</div>
    <div id="divTabs">
        <ul>
            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
        </ul>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    Datos de Nota Pedido
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs" width="750">
                        <tr>
                            <td style="font-weight: bold;display:none;">
                                Empresa
                                <asp:HiddenField ID="hdnCodEmpresa" runat="server" Value="1" />
                                <asp:HiddenField ID="hdnCodSede" runat="server" Value="1" />
                            </td>
                            <td style="padding-left: 4px;display:none;">
                                <asp:TextBox ID="txtEmpresa" runat="server" Width="507px" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True" ReadOnly="true"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;display:none;">
                                Vendedor Preparado
                            </td>
                            <td style="padding-left: 4px;display:none;">
                                <div id="div_ddlvendedor">
                                    <asp:DropDownList ID="ddlVendedorPreparado" runat="server" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Width="260">
                                    </asp:DropDownList>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;display:none;">
                                Proforma
                            </td>
                            <td style="padding-left: 4px;display:none;">
                                <asp:CheckBox ID="chkNotaVenta" runat="server" />
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold;display:none;">
                                Igv
                            </td>
                            <td style="padding-left: 4px;display:none;">
                                <asp:TextBox ID="txtIgv" runat="server" Width="100" CssClass="Derecha"></asp:TextBox>
                            </td> 
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Excel
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:FileUpload ID="fupExcel" runat="server" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnCargar" runat="server" Text="Cargar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </div>
            </div>
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                Articulos con algun incoveniente
            </div>
            <div id="div_grvDetalleArticulo" style="padding-top: 5px;">
                <asp:GridView ID="grvDetalleArticulo" runat="server" AutoGenerateColumns="False"
                    border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                    Width="1017px" onrowdatabound="grvDetalleArticulo_RowDataBound">
                    <Columns>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgEditarRegistro" ImageUrl="../Asset/images/btnEdit.gif"
                                    ToolTip="Editar Producto" OnClientClick="F_EditarRegistro(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="OBS">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblObs" Text='<%# Bind("OBS") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="ID">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblcoddetalle" Text='<%# Bind("ID") %>' CssClass="detallesart"></asp:Label>
                                <asp:HiddenField ID="hdnCodProducto" runat="server" Value='<%# Bind("CODPRODUCTO") %>' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="RUC">
                            <ItemTemplate>
                                <asp:Label ID="lblRuc" runat="server" Text='<%# Bind("RUC") %>'></asp:Label>
                            </ItemTemplate>
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="CODIGO">
                            <ItemTemplate>
                                <asp:Label ID="lblCodigo" runat="server" Text='<%# Bind("CODIGO") %>'></asp:Label>
                            </ItemTemplate>
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="PRODUCTO">
                            <ItemTemplate>
                                <asp:Label ID="lblDescripcion" runat="server" Text='<%# Bind("DESCRIPCION") %>'></asp:Label>
                            </ItemTemplate>
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" Width="480px" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="UND">
                            <ItemTemplate>
                                <asp:Label ID="lblUnd" runat="server" Text='<%# Bind("UND") %>'></asp:Label>
                            </ItemTemplate>
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="CANT">
                            <ItemTemplate>
                                <asp:Label ID="lblCant" runat="server" Text='<%# Bind("CANT") %>'></asp:Label>
                            </ItemTemplate>
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="PRECIO">
                            <ItemTemplate>
                                <asp:Label ID="lblPrecio" runat="server" Text='<%# Bind("PRECIOLISTA") %>'></asp:Label>
                            </ItemTemplate>
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" Width="75px" />
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Importe">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblimporte" Text='<%# Bind("SUBTOTAL") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                    </Columns>
                </asp:GridView>
            </div>

        </div>
    </div>
    <div id="divEdicionRegistro" style="display: none">
        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                DATOS PRODUCTO
            </div>
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs">
                    <tr>
                        <td style="font-weight: bold">
                            Codigo
                        </td>
                        <td>
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <asp:TextBox ID="txtCodigoProductoEdicion" runat="server" Width="225px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                        <asp:HiddenField ID="hdnIdRegistro" runat="server" />
                                    </td>
                                    <td style="font-weight: bold">
                                        Codigo 2
                                    </td>
                                    <td style="padding-left: 21px;">
                                        <asp:TextBox ID="txtCodigo2Edicion" runat="server" Width="230px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                    <td style="font-weight: bold; display: none;">
                                        t.c.
                                    </td>
                                    <td style="font-weight: bold; display: none;">
                                        <asp:TextBox ID="txtTcEdicion" runat="server" Width="34px" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" ReadOnly="True" Text="2.796"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">
                            Familia
                        </td>
                        <td>
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <div id="div_FamiliaEdicion">
                                            <asp:DropDownList ID="ddlFamiliaEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" Width="540">
                                            </asp:DropDownList>
                                        </div>
                                    </td>
                                    <td style="font-weight: bold; display: none;">
                                        Partida Arancelaria
                                    </td>
                                    <td style="font-weight: bold; display: none;">
                                        <asp:TextBox ID="txtPartidaArancelariaEdicion" runat="server" Width="193px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">
                            Descripcion
                        </td>
                        <td style="padding-left: 4px;">
                            <asp:TextBox ID="txtDescripcionEdicion" runat="server" Width="536px" Font-Names="Arial"
                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                        </td>
                    </tr>
                     <tr>
                        <td style="font-weight: bold">
                            Cod Superior
                        </td>
                        <td style="padding-left: 4px;">
                            <asp:TextBox ID="txtCodigoSuperiorEdicion" runat="server" Width="535px" Font-Names="Arial"
                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                            <asp:HiddenField ID="hfCodigoSuperiorEdicion" runat="server" />
                        </td>
                    </tr>
                               <tr>
                            <td style="font-weight: bold">
                             PESO                             </td>

                             <td>
                             <table  cellpadding="0" cellspacing="0" >
                             <tr>
                               <td style="padding-left:3px;">
                             <asp:TextBox ID="txtPeso" runat="server"  Width="85px" Font-Names="Arial"   ForeColor="Blue"  Font-Bold="True"  CssClass = "Derecha" ></asp:TextBox>
                             </td>
                               <td style="font-weight: bold">
                             UM Peso
                             </td>

                             <td style="padding-left:6px;">
                                     <div id="div_Peso">
                                         <asp:DropDownList ID="ddlPeso" runat="server" Font-Names="Arial"  ForeColor="Blue"  Font-Bold="True"   Width="55">
                                         </asp:DropDownList>
                                     </div>
                               </td>
                             </tr>
                             </table>
                             </td>
                           
                                </tr>

                    <tr>
                        <td style="font-weight: bold; display: none;">
                            Modelo
                        </td>
                        <td style="padding-left: 4px; display: none;">
                            <asp:TextBox ID="txtModeloEdicion" runat="server" Width="534px" Font-Names="Arial"
                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">
                            Costo C/Igv
                        </td>
                        <td colspan='5'>
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <asp:TextBox ID="txtCostoEdicion" runat="server" Width="85px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                    </td>
                                    <td style="padding-left: 2px; font-weight: bold">
                                        Moneda
                                    </td>
                                    <td style="padding-left: 8px;">
                                        <div id="div_MonedaEdicion">
                                            <asp:DropDownList ID="ddlMonedaEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" Width="78">
                                            </asp:DropDownList>
                                        </div>
                                    </td>
                                    <td style="font-weight: bold; padding-left: 2px;">
                                        Precio Lista
                                    </td>
                                    <td style="padding-left: 1px;">
                                        <asp:TextBox ID="txtPrecioEdicion" runat="server" Width="85px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                    </td>
                                    <td style="padding-left: 3px; font-weight: bold">
                                        UNIDAD MEDIDA
                                    </td>
                                    <td>
                                        <div id="div_CompraEdicion">
                                            <asp:DropDownList ID="ddlCompraEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" Width="58">
                                            </asp:DropDownList>
                                        </div>
                                    </td>
                                    <td style="font-weight: bold; display: none;">
                                        Margen
                                    </td>
                                    <td style="font-weight: bold; display: none;">
                                        <asp:TextBox ID="txtMargenEdicion" runat="server" Width="74px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True" Text="0.00"></asp:TextBox>
                                    </td>
                                    <td style="font-weight: bold; display: none;">
                                        Descuento
                                    </td>
                                    <td style="font-weight: bold; display: none;">
                                        <asp:TextBox ID="txtDescuentoEdicion" runat="server" Width="74px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True" Text="0.00"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                   
                    <tr>
                        <td style="font-weight: bold; display: none;">
                            Cost. C/Igv S/
                        </td>
                        <td colspan='5' style="font-weight: bold; display: none;">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <asp:TextBox ID="txtCostoSolesEdicion" runat="server" Width="75px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                    <td style="font-weight: bold; display: none;">
                                        Stock Min.
                                    </td>
                                    <td style="font-weight: bold; display: none;">
                                        <asp:TextBox ID="txtStockMinimoEdicion" runat="server" Width="75px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                    <td style="font-weight: bold; display: none;">
                                        Stock Max.
                                    </td>
                                    <td style="font-weight: bold; display: none;">
                                        <asp:TextBox ID="txtStockMaximoEdicion" runat="server" Width="74px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; display: none;">
                            Medida
                        </td>
                        <td colspan='5' style="font-weight: bold; display: none;">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <asp:TextBox ID="txtMedidaEdicion" runat="server" Width="211px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                    <td style="font-weight: bold">
                                        Posicion
                                    </td>
                                    <td style="padding-left: 15px;">
                                        <asp:TextBox ID="txtPosicionEdicion" runat="server" Width="248px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; display: none;">
                            Año
                        </td>
                        <td colspan='5'>
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="font-weight: bold; display: none;">
                                        <asp:TextBox ID="txtAñoEdicion" runat="server" Width="211px" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True"></asp:TextBox>
                                    </td>
                                    <td style="padding-left: 2px; font-weight: bold; display: none;">
                                        UM Venta
                                    </td>
                                    <td style="padding-left: 23px; display: none;">
                                        <div id="div_VentaEdicion">
                                            <asp:DropDownList ID="ddlVentaEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" Width="79">
                                            </asp:DropDownList>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; display: none;">
                            Desc. Ingles
                        </td>
                        <td style="font-weight: bold; display: none;">
                            <asp:TextBox ID="txtDescripcionInglesEdicion" runat="server" Width="534px" Font-Names="Arial"
                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; display: none;">
                            Marca
                        </td>
                        <td style="padding-left: 4px; display: none;">
                            <asp:TextBox ID="txtMarcaEdicion" runat="server" Width="534px" Font-Names="Arial"
                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="linea-button">
                <asp:Button ID="btnEdicion" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    Font-Names="Arial" Font-Bold="True" Width="120px" OnClientClick="F_GrabarProducto(); return false;" />
            </div>
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
</asp:Content>
