<%@ Page Title="MargenDescuento" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="MargenDescuento.aspx.cs" Inherits="SistemaInventario.Maestros.MargenDescuento" %>

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
    <script src="../Scripts/utilitarios.js" type="text/javascript" language="javascript"
        charset="UTF-8"></script>
    <script type="text/javascript" language="javascript" src="MargenDescuento.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/multiselect-slim-autoc/slimselect.min.css" rel="stylesheet"  type="text/css" />
    <link href="../Asset/multiselect-slim-autoc/slimcustom.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/multiselect-slim-autoc/slimselect.min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo">
        Margen Descuento</div>
    <div id="divTabs">
        <ul>
            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
            <li id="liConsulta"><a href="#tabConsulta"  onclick="getContentTab();">Consulta</a></li>
        </ul>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 700px">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    REGISTRO DE MARGEN DESCUENTO
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs">
                     
                       
                        <tr>
                            <td style="font-weight: bold">
                                Familia
                            </td>
                            <td style="padding-left: 4px;">
                            <select id="ddlFamilia" style="width: 590px" multiple>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Marca
                            </td>
                            <td style="padding-left: 4px;">
                            <select id="ddlMarca" style="width: 590px" multiple>
                            </select>
                    </td>
                        </tr>
                           <tr>
                            <td style="font-weight: bold">
                                Descuento
                            </td>
                            <td>
                                <asp:TextBox ID="txtDescuento" runat="server" Width="100px" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnNuevo" runat="server" Text="Nuevo" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                    <asp:Button ID="btnGrabar" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120px" />
                </div>
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
                            
                            <%--<td style="font-weight: bold">
                                Descripcion
                            </td>
                            <td>
                                <asp:TextBox ID="txtDescripcionConsulta" runat="server" Width="500" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                            </td>--%>
                            <td style="font-weight: bold">
                                Marca
                            </td>
                               
                            <td style="padding-left: 4px;">
                            <select id="ddlMarcaBuscar" style="width: 380px" multiple>
                            </select>
                    </td>
                    <td style="font-weight: bold">
                                Familia
                            </td>
                            <td style="padding-left: 4px;">
                            <select id="ddlFamiliaBuscar" style="width: 380px" multiple>
                            </select>
                    </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </div>
            </div>
            <div id="div_consulta" style="padding-top: 5px;">
                <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" border="0"
                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="1017px">
                    <Columns>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgAnularDocumento" ImageUrl="~/Asset/images/EliminarBtn.png"
                                    ToolTip="ELIMINAR TERRITORIO" OnClientClick="F_EliminarRegistro(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgReemplazar" ImageUrl="../Asset/images/btnEdit.gif"
                                    ToolTip="ACTUALIZAR DOCUMENTO" OnClientClick="F_Editar(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        
                        
                        <asp:TemplateField HeaderText="Familia" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblFamilia" Text='<%# Bind("Familia") %>'></asp:Label>
                                <asp:HiddenField ID="hfCodUsuario" runat="server" Value='<%# Bind("CodUsuario") %>' />
                                <asp:HiddenField ID="hfIDFamilia" runat="server" Value='<%# Bind("IDFamilia") %>' />
                                <asp:HiddenField ID="hfCodMarcaProducto" runat="server" Value='<%# Bind("CodMarcaProducto") %>' />
                                <asp:HiddenField ID="lblCodMargenDescuento" runat="server" Value='<%# Bind("CodMargenDescuento") %>' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Marca" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblMarca" Text='<%# Bind("Marca") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Descuento" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblDescuento" Text='<%# Bind("descuento") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                    </Columns>
                </asp:GridView>
            </div>
        </div>
    </div>
    <div id="divEdicionRegistro" style="display: none;">
        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                DATOS Margen Descuento
            </div>
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs">
                    <tr> 
                                    <td style=" font-weight: bold">
                                        Familia
                                    </td>
                                <td >
                                        <asp:TextBox ID="txtFamiliaEdicion" runat="server" Width="380" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" align="right" MaxLength="11"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                              <td style=" font-weight: bold">
                                        Marca
                                    </td>
                                  <td >
                                        <asp:TextBox ID="txtMarcaEdicion" runat="server" Width="380" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" align="right" MaxLength="11"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                <td style=" font-weight: bold">
                                        Descuento
                                    </td>
                                <td >
                                        <asp:TextBox ID="txtDescuentoEdicion" runat="server" Width="100" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" align="right" MaxLength="11"></asp:TextBox>
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
        <br />
        <br />
        <center>
            <img alt="Wait..." src="../Asset/images/ajax-loader2.gif" /></center>
    </div>
    <input id="hfCodMargenDescuento" type="hidden" value="0" />
    <input id="hfIDFamiliaEditar" type="hidden" value="0" />
    <input id="hfCodMarcaProductoEditar" type="hidden" value="0" />
</asp:Content>
