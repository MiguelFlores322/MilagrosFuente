<%@ Page Title="Carga Nota Pedido" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="Excel.aspx.cs" Inherits="SistemaInventario.Ventas.Excel" %>

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
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script language="javascript" type="text/javascript">
        $(document).ready(function () {
            document.onkeydown = function (evt) {
                return (evt ? evt.which : event.keyCode) != 13;
            }
            $("#MainContent_ddlFamiliaEdicion").css('background', '#FFFFE0');
            $("#MainContent_ddlMonedaEdicion").css('background', '#FFFFE0');
            $("#MainContent_ddlCompraEdicion").css('background', '#FFFFE0');
            $("#MainContent_ddlVendedorPreparado").css('background', '#FFFFE0');
            $("#MainContent_ddlPeso").css('background', '#FFFFE0');
            $("#MainContent_txtCodigoProductoEdicion").css('background', '#FFFFE0');
            $("#MainContent_txtCodigo2Edicion").css('background', '#FFFFE0');
            $("#MainContent_txtDescripcionEdicion").css('background', '#FFFFE0');
            $("#MainContent_txtCostoEdicion").css('background', '#FFFFE0');
            $("#MainContent_txtPrecioEdicion").css('background', '#FFFFE0');
            $("#MainContent_txtCodigoSuperiorEdicion").css('background', '#FFFFE0');
            $("#MainContent_txtIgv").css('background', '#FFFFE0');
            $("#MainContent_txtPeso").css('background', '#FFFFE0');
            $("#MainContent_txtUbicacion").css('background', '#FFFFE0');
            $('.ccsestilo').css('background', '#FFFFE0');
        });

        function F_EditarRegistro(Codigo, Descripcion, UM, Precio, ID) {
            var Cuerpo = '#MainContent_';
            $(Cuerpo + 'txtCodigoProductoEdicion').val(Codigo);
            $(Cuerpo + 'txtCodigo2Edicion').val('');
            $(Cuerpo + 'txtDescripcionEdicion').val(Descripcion);
            $(Cuerpo + 'txtPrecioEdicion').val(Precio);
            $(Cuerpo + 'txtCostoEdicion').val('');
            $(Cuerpo + 'ddlCompraEdicion').val($(Cuerpo + 'ddlCompraEdicion option:contains("' + UM + '")').val());
            $(Cuerpo + 'ddlMonedaEdicion').val('2');
            $(Cuerpo + 'ddlFamiliaEdicion').val('0223');
            $(Cuerpo + 'ddlPeso').val('10');
            $(Cuerpo + 'txtCodigoSuperiorEdicion').val('');
            $(Cuerpo + 'hfCodigoSuperiorEdicion').val('0');
            $(Cuerpo + 'hfID').val(ID);
            $("#MainContent_ddlFamiliaEdicion").css('background', '#FFFFE0');
            $("#MainContent_ddlMonedaEdicion").css('background', '#FFFFE0');
            $("#MainContent_ddlCompraEdicion").css('background', '#FFFFE0');
            $("#MainContent_ddlVendedorPreparado").css('background', '#FFFFE0');
            $("#MainContent_ddlPeso").css('background', '#FFFFE0');
            return false;
        }

    </script>
    <div class="titulo" style="width: 1152px">
        Carga de Nota Pedido</div>
    <div>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 1152px">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix"
                    style="width: 1150px">
                    Datos de Nota Pedido
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs" width="1200">
                        <tr>
                            <td style="font-weight: bold">
                                Excel
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:FileUpload ID="FileUpload1" runat="server" />
                                        </td>
                                        <td>
                                            <%--                      <asp:Button ID="Import" runat="server" Text="Import" onclick="Import_Click"   /> <br />--%>
                                            <asp:Label ID="Label1" runat="server" Font-Bold="True"></asp:Label>
                                            <asp:HiddenField ID="HiddenField1" runat="server" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnImport" runat="server" Text="Cargar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" OnClick="btnImport_Click" />
                </div>
            </div>
            <table>
                <tr>
                    <td valign="top">
                        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix"
                                style="width: 650px">
                                Articulos con algun incoveniente
                            </div>
                            <div id="div_grvDetalleArticulo" style="padding-top: 5px;">
                                <asp:GridView ID="grvDetalleArticulo" runat="server" AutoGenerateColumns="False"
                                    border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                                    Width="650px" OnRowDataBound="grvDetalleArticulo_RowDataBound">
                                    <Columns>
                                        <asp:TemplateField>
                                            <ItemTemplate>
                                                <asp:ImageButton runat="server" ID="imgEditarRegistro" ImageUrl="../Asset/images/btnEdit.gif"
                                                    ToolTip="Editar Producto" OnClientClick="F_EditarRegistro(this); return false;" />
                                                <asp:HiddenField ID="hfTipo" runat="server" Value='<%# Bind("TIPO") %>' />
                                                <asp:HiddenField ID="hfID" runat="server" Value='<%# Bind("ID") %>' />
                                            </ItemTemplate>
                                        </asp:TemplateField>
                                        <asp:BoundField DataField="Ruc" HeaderText="Ruc">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Right" />
                                        </asp:BoundField>
                                        <asp:BoundField DataField="Codigo" HeaderText="Codigo">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Left" />
                                        </asp:BoundField>
                                        <asp:BoundField DataField="DESCRIPCION" HeaderText="DESCRIPCION">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Left" />
                                        </asp:BoundField>
                                        <asp:BoundField DataField="UND" HeaderText="UM">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Left" />
                                        </asp:BoundField>
                                        <asp:BoundField DataField="CANT" HeaderText="CANT">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Right" />
                                        </asp:BoundField>
                                        <asp:BoundField DataField="PRECIOLISTA" HeaderText="PRECIO">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Right" />
                                        </asp:BoundField>
                                        <asp:BoundField DataField="SUBTOTAL" HeaderText="Importe">
                                            <HeaderStyle HorizontalAlign="Center" />
                                            <ItemStyle HorizontalAlign="Right" />
                                        </asp:BoundField>
                                    </Columns>
                                </asp:GridView>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix"
                                style="width: 490px">
                                Registro de Productos
                            </div>
                            <table cellpadding="0" cellspacing="0" class="form-inputs">
                                <tr>
                                    <td style="font-weight: bold">
                                        Codigo
                                    </td>
                                    <td>
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <asp:TextBox ID="txtCodigoProductoEdicion" runat="server" Width="155px" Font-Names="Arial"
                                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                    <asp:HiddenField ID="hdnIdRegistro" runat="server" Value="0" />
                                                    <asp:HiddenField ID="hfID" runat="server" />
                                                </td>
                                                <td style="font-weight: bold">
                                                    Codigo 2
                                                </td>
                                                <td style="padding-left: 21px;">
                                                    <asp:TextBox ID="txtCodigo2Edicion" runat="server" Width="153px" Font-Names="Arial"
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
                                                            Font-Bold="True" Width="392">
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
                                        <asp:TextBox ID="txtDescripcionEdicion" runat="server" Width="388px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold">
                                        Cod Superior
                                    </td>
                                    <td style="padding-left: 4px;">
                                        <asp:TextBox ID="txtCodigoSuperiorEdicion" runat="server" Width="388px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                        <asp:HiddenField ID="hfCodigoSuperiorEdicion" runat="server" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold">
                                        PESO
                                    </td>
                                    <td>
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding-left: 3px;">
                                                    <asp:TextBox ID="txtPeso" runat="server" Width="85px" Font-Names="Arial" ForeColor="Blue"
                                                        Font-Bold="True" CssClass="Derecha" Text="0.00"></asp:TextBox>
                                                </td>
                                                <td style="font-weight: bold">
                                                    UM Peso
                                                </td>
                                                <td style="padding-left: 5px;">
                                                    <div id="div_Peso">
                                                        <asp:DropDownList ID="ddlPeso" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True" Width="78">
                                                        </asp:DropDownList>
                                                    </div>
                                                </td>
                                                <td style="padding-left: 3px; font-weight: bold">
                                                    UM
                                                </td>
                                                <td style="padding-left: 23px;">
                                                    <div id="div_CompraEdicion">
                                                        <asp:DropDownList ID="ddlCompraEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True" Width="58">
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
                                                        ForeColor="Blue" Font-Bold="True" CssClass="Derecha" Text="0.00"></asp:TextBox>
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
                                                    Precio
                                                </td>
                                                <td style="padding-left: 1px;">
                                                    <asp:TextBox ID="txtPrecioEdicion" runat="server" Width="85px" Font-Names="Arial"
                                                        ForeColor="Blue" Font-Bold="True" CssClass="Derecha"></asp:TextBox>
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
                                <tr>
                                    <td style="font-weight: bold;">
                                        Ubicacion
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtUbicacion" runat="server" Width="85px" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                            <div class="linea-button">
                                <asp:Button ID="btnEdicion" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                    Font-Names="Arial" Font-Bold="True" Width="120px" OnClick="btnEdicion_Click" />
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divEdicionRegistro" style="display: none">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    DATOS PRODUCTO
                </div>
                <div class="ui-jqdialog-content">
                </div>
                <div class="linea-button">
                </div>
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
</asp:Content>
