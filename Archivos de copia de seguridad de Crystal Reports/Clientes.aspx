<%@ Page Title="Clientes" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="Clientes.aspx.cs" Inherits="SistemaInventario.Maestros.Clientes" %>

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
    <script type="text/javascript" language="javascript" src="Clientes.js" charset="UTF-8"></script>
    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo">
        Clientes</div>
    <div id="divTabs">
        <ul>
            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
            <li id="liConsulta"><a href="#tabConsulta">Consulta</a></li>
        </ul>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 640px">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    REGISTRO DE Clientes
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs">
                        <tr>
                            <td style="font-weight: bold">
                                Tipo de Cliente
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <div id="div_TipoCliente">
                                                <asp:DropDownList ID="ddlTipoCliente" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="padding-left: 114px; font-weight: bold">
                                            Nro Ruc
                                        </td>
                                        <td style="padding-left: 0px;">
                                            <asp:TextBox ID="txtNroRuc" runat="server" Width="82px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" MaxLength="11"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            Nro Dni
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtNroDni" runat="server" Width="75px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" MaxLength="8"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Razon Social
                            </td>
                            <td colspan='5' style="padding-left: 4px;">
                                <asp:TextBox ID="txtRazonSocial" runat="server" Width="500px" Font-Names="Arial"
                                    Font-Bold="True" ForeColor="Blue"></asp:TextBox>
                            </td>
                        </tr>
                        <tr style="display:none">
                            <td style="font-weight: bold">
                                Apellido Paterno
                            </td>
                            <td colspan='5'>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtApellidoPaterno" runat="server" Width="219px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            Materno
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtApellidoMaterno" runat="server" Width="219px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr style="display:none">
                            <td style="font-weight: bold">
                                Nombres
                            </td>
                            <td colspan='5'>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtNombres" runat="server" Width="500px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Distrito
                            </td>
                            <td colspan='5'>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtDistrito" runat="server" Width="500px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Direccion
                            </td>
                            <td style="padding-left: 4px;" colspan='5'>
                                <asp:TextBox ID="txtDireccion" runat="server" Width="500px" Font-Names="Arial" Font-Bold="True"
                                    ForeColor="Blue"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Referencia
                            </td>
                            <td style="padding-left: 4px;" colspan='5'>
                                <asp:TextBox ID="txtReferencia" runat="server" Width="500px" Font-Names="Arial" Font-Bold="True"
                                    ForeColor="Blue"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Telefono
                            </td>
                            <td style="padding-left: 4px;" colspan='5'>
                                <asp:TextBox ID="txtTelefono" runat="server" Width="500px" Font-Names="Arial" Font-Bold="True"
                                    ForeColor="Blue"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Contacto
                            </td>
                            <td style="padding-left: 4px;" colspan='5'>
                                <asp:TextBox ID="txtContacto" runat="server" Width="500px" Font-Names="Arial" Font-Bold="True"
                                    ForeColor="Blue"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Ruta
                            </td>
                            <td style="padding-left: 4px;" colspan='5'>
                                <div id="div_Ruta">
                                    <asp:DropDownList ID="ddlRuta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" BackColor="#FFFF99" Width="504">
                                    </asp:DropDownList>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Transportista
                            </td>
                            <td style="padding-left: 4px;" colspan='5'>
                                <asp:TextBox ID="txtTransportista" runat="server" Width="500px" Font-Names="Arial"
                                    Font-Bold="True" ForeColor="Blue"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                dscto 1
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtDescuento1" runat="server" Width="82px" Font-Names="Arial" CssClass="Derecha"
                                                ForeColor="Blue" Font-Bold="True" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; padding-left: 8px;">
                                            dscto 2
                                        </td>
                                        <td style="padding-left: 0px;">
                                            <asp:TextBox ID="txtDescuento2" runat="server" Width="82px" Font-Names="Arial" CssClass="Derecha"
                                                ForeColor="Blue" Font-Bold="True" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold;">
                                            dscto 3
                                        </td>
                                        <td style="padding-left: 9px;">
                                            <asp:TextBox ID="txtDescuento3" runat="server" Width="75px" Font-Names="Arial" CssClass="Derecha"
                                                ForeColor="Blue" Font-Bold="True" Text="0.00"></asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; padding-left: 9px;">
                                            dscto 4
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtDescuento4" runat="server" Width="75px" Font-Names="Arial" CssClass="Derecha"
                                                ForeColor="Blue" Font-Bold="True" Text="0.00"></asp:TextBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Forma de Pago
                            </td>
                            <td>
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <div id="div_FormaPago">
                                                <asp:DropDownList ID="ddlFormaPago" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="228">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold">
                                            Estado
                                        </td>
                                        <td style="padding-left: 12px;">
                                            <div id="div_Estado">
                                                <asp:DropDownList ID="ddlEstado" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="79">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="padding-left: 8px; font-weight: bold">
                                            Letra
                                        </td>
                                        <td style="padding-left: 13px;">
                                            <div id="div_Letra">
                                                <asp:DropDownList ID="ddlLetra" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="79">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Correo
                            </td>
                            <td style="padding-left: 4px;" colspan='5'>
                                <asp:TextBox ID="txtCorreo" runat="server" Width="500px" Font-Names="Arial" Font-Bold="True"
                                    ForeColor="Blue"></asp:TextBox>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Comentario
                            </td>
                            <td style="padding-left: 4px;" colspan='5'>
                                <asp:TextBox ID="txtComentario" runat="server" Width="500px" Font-Names="Arial" Height="36"
                                    Font-Bold="True" ForeColor="Blue"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:CheckBox ID="chkProveedor" runat="server" Text="Proveedor" Font-Bold="True"
                        Style="display: none;" />
                    <asp:HyperLink ID="hlSunat" Target="_blank" runat="server" ForeColor="Blue" Text="CONSULTA RUC SUNAT"
                        NavigateUrl="">CONSULTA RUC SUNAT</asp:HyperLink>
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
                            <td style="font-weight: bold">
                                Descripcion (Razon Social/RUC)
                            </td>
                            <td>
                                <asp:TextBox ID="txtDescripcionConsulta" runat="server" Width="772" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
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
                                    ToolTip="Eliminar Cliente" OnClientClick="F_AnularRegistro(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgEditarRegistro" ImageUrl="../Asset/images/btnEdit.gif"
                                    ToolTip="Editar Cliente" OnClientClick="F_EditarRegistro(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgDireccion" ImageUrl="../Asset/images/add_small.png"
                                    ToolTip="Direccion" OnClientClick="F_Direccion(this); return false;" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="ID">
                            <ItemStyle HorizontalAlign="Right" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblcodigo" Text='<%# Bind("Codigo") %>'></asp:Label>
                                <asp:HiddenField ID="hfDepartamento" runat="server" Value='<%# Bind("DscDepartamento") %>' />
                                <asp:HiddenField ID="hfProvincia" runat="server" Value='<%# Bind("DscProvincia") %>' />
                                <asp:HiddenField ID="hfDireccionEnvio" runat="server" Value='<%# Bind("DireccionEnvio") %>' />
                                <asp:HiddenField ID="hfApePaterno" runat="server" Value='<%# Bind("ApePaterno") %>' />
                                <asp:HiddenField ID="hfApeMaterno" runat="server" Value='<%# Bind("ApeMaterno") %>' />
                                <asp:HiddenField ID="hfNombres" runat="server" Value='<%# Bind("Nombres") %>' />
                                <asp:HiddenField ID="hfNroRuc" runat="server" Value='<%# Bind("NroRuc") %>' />
                                <asp:HiddenField ID="hfNroDni" runat="server" Value='<%# Bind("NroDni") %>' />
                                <asp:HiddenField ID="hfCodTipoCliente" runat="server" Value='<%# Bind("CodTipoCliente") %>' />
                                <asp:HiddenField ID="hfCodDepartamento" runat="server" Value='<%# Bind("CodDepartamento") %>' />
                                <asp:HiddenField ID="hfCodProvincia" runat="server" Value='<%# Bind("CodProvincia") %>' />
                                <asp:HiddenField ID="hfCodDistrito" runat="server" Value='<%# Bind("CodDistrito") %>' />
                                <asp:HiddenField ID="hfRazonSocial" runat="server" Value='<%# Bind("RazonSocial") %>' />
                                <asp:HiddenField ID="hfCodTransportista" runat="server" Value='<%# Bind("CodTransportista") %>' />
                                <asp:HiddenField ID="hfCodRuta" runat="server" Value='<%# Bind("CodRuta") %>' />
                                <asp:HiddenField ID="hfDescuento1" runat="server" Value='<%# Bind("Descuento1") %>' />
                                <asp:HiddenField ID="hfDescuento2" runat="server" Value='<%# Bind("Descuento2") %>' />
                                <asp:HiddenField ID="hfDescuento3" runat="server" Value='<%# Bind("Descuento3") %>' />
                                <asp:HiddenField ID="hfDescuento4" runat="server" Value='<%# Bind("Descuento4") %>' />
                                <asp:HiddenField ID="hfCodFormaPago" runat="server" Value='<%# Bind("CodFormaPago") %>' />
                                <asp:HiddenField ID="hfTelefono" runat="server" Value='<%# Bind("Telefono") %>' />
                                <asp:HiddenField ID="hfContacto" runat="server" Value='<%# Bind("Contacto") %>' />
                                <asp:HiddenField ID="hfReferencia" runat="server" Value='<%# Bind("Referencia") %>' />
                                <asp:HiddenField ID="hfCodEstado" runat="server" Value='<%# Bind("CodEstado") %>' />
                                <asp:HiddenField ID="hfCorreo" runat="server" Value='<%# Bind("Correo") %>' />
                                <asp:HiddenField ID="hfComentario" runat="server" Value='<%# Bind("Comentario") %>' />
                                <asp:HiddenField ID="lblDireccion" runat="server" Value='<%# Bind("Direccion") %>' />
                                <asp:HiddenField ID="lblDistrito" runat="server" Value='<%# Bind("DscDistrito") %>' />
                                <asp:HiddenField ID="hfFlagLetra" runat="server" Value='<%# Bind("FlagLetra") %>' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Cliente" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblCliente" Text='<%# Bind("Cliente") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="RUC" HeaderStyle-HorizontalAlign="Center">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblDocumento" Text='<%# Bind("Documento") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Ruta">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblRuta" Text='<%# Bind("Ruta") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Transportista">
                            <ItemStyle HorizontalAlign="Left" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblTransportista" Text='<%# Bind("Transportista") %>'></asp:Label>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="Estado" HeaderText="Estado">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                    </Columns>
                </asp:GridView>
            </div>
        </div>
    </div>
    <div id="divEdicionRegistro" style="display: none;">
        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                DATOS CLIENTE
            </div>
            <div class="ui-jqdialog-content">
                <table cellpadding="0" cellspacing="0" class="form-inputs">
                    <tr>
                        <td style="font-weight: bold">
                            Tipo de Cliente
                        </td>
                        <td>
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-left: 4px;">
                                        <div id="div_tipoclienteedicion">
                                            <asp:DropDownList ID="ddlTipoCliente_Edicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True">
                                            </asp:DropDownList>
                                        </div>
                                    </td>
                                    <td style="padding-left: 92px; font-weight: bold">
                                        Nro Ruc
                                    </td>
                                    <td style="padding-left: 5px;">
                                        <asp:TextBox ID="txtRucEdicion" runat="server" Width="82px" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" MaxLength="11"></asp:TextBox>
                                    </td>
                                    <td style="padding-left: 0px; font-weight: bold">
                                        Nro Dni
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtDniEdicion" runat="server" Width="75px" Font-Names="Arial" ForeColor="Blue"
                                            Font-Bold="True" MaxLength="8"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">
                            Razon Social
                        </td>
                        <td colspan='5' style="padding-left: 4px;">
                            <asp:TextBox ID="txtRazonSocialEdicion" runat="server" Width="500px" Font-Names="Arial"
                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                        </td>
                    </tr>
                    <tr style="display:none">
                        <td style="font-weight: bold">
                            Apellido Paterno
                        </td>
                        <td colspan='5'>
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <asp:TextBox ID="txtApellidoPaternoEdicion" runat="server" Width="219px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                    <td style="font-weight: bold">
                                        Materno
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtApellidoMaternoEdicion" runat="server" Width="219px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr style="display:none">
                        <td style="font-weight: bold">
                            Nombres
                        </td>
                        <td colspan='5'>
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <asp:TextBox ID="txtNombreEdicion" runat="server" Width="500px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">
                            Distrito
                        </td>
                        <td colspan='5'>
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <asp:TextBox ID="txtDistritoEdicion" runat="server" Width="500px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr style="display: none;">
                        <td style="font-weight: bold">
                            Direccion
                        </td>
                        <td style="padding-left: 4px;" colspan='5'>
                            <asp:TextBox ID="txtDireccionEdicion" runat="server" Width="500px" Font-Names="Arial"
                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">
                            Referencia
                        </td>
                        <td style="padding-left: 4px;" colspan='5'>
                            <asp:TextBox ID="txtReferenciaEdicion" runat="server" Width="500px" Font-Names="Arial"
                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">
                            Telefono
                        </td>
                        <td style="padding-left: 4px;" colspan='5'>
                            <asp:TextBox ID="txtTelefonoEdicion" runat="server" Width="500px" Font-Names="Arial"
                                Font-Bold="True" ForeColor="Blue"></asp:TextBox>
                        </td>
                    </tr>
                        <tr>
                            <td style="font-weight: bold">
                                Contacto
                            </td>
                            <td style="padding-left: 4px;" colspan='5'>
                                <asp:TextBox ID="txtContactoEdicion" runat="server" Width="500px" Font-Names="Arial" Font-Bold="True"
                                    ForeColor="Blue"></asp:TextBox>
                            </td>
                        </tr>
                    <tr>
                        <td style="font-weight: bold">
                            Ruta
                        </td>
                        <td style="padding-left: 4px;" colspan='5'>
                            <div id="div_RutaEdicion">
                                <asp:DropDownList ID="ddlRutaEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True" BackColor="#FFFF99" Width="505">
                                </asp:DropDownList>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">
                            Transportista
                        </td>
                        <td style="padding-left: 4px;" colspan='5'>
                            <asp:TextBox ID="txtTransportistaEdicion" runat="server" Width="500px" Font-Names="Arial"
                                Font-Bold="True" ForeColor="Blue"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">
                            dscto 1
                        </td>
                        <td>
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <asp:TextBox ID="txtDescuento1Edicion" runat="server" Width="82px" Font-Names="Arial"
                                            CssClass="Derecha" ForeColor="Blue" Font-Bold="True" Text="0.00"></asp:TextBox>
                                    </td>
                                    <td style="font-weight: bold; padding-left: 8px;">
                                        dscto 2
                                    </td>
                                    <td style="padding-left: 0px;">
                                        <asp:TextBox ID="txtDescuento2Edicion" runat="server" Width="82px" Font-Names="Arial"
                                            CssClass="Derecha" ForeColor="Blue" Font-Bold="True" Text="0.00"></asp:TextBox>
                                    </td>
                                    <td style="font-weight: bold; padding-left: 9px;">
                                        dscto 3
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtDescuento3Edicion" runat="server" Width="75px" Font-Names="Arial"
                                            CssClass="Derecha" ForeColor="Blue" Font-Bold="True" Text="0.00"></asp:TextBox>
                                    </td>
                                    <td style="font-weight: bold; padding-left: 9px;">
                                        dscto 4
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtDescuento4Edicion" runat="server" Width="75px" Font-Names="Arial"
                                            CssClass="Derecha" ForeColor="Blue" Font-Bold="True" Text="0.00"></asp:TextBox>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">
                            Forma de Pago
                        </td>
                        <td>
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <div id="div_FormaPagoEdicion">
                                            <asp:DropDownList ID="ddlFormaPagoEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" Width="228">
                                            </asp:DropDownList>
                                        </div>
                                    </td>
                                    <td style="font-weight: bold">
                                        Estado
                                    </td>
                                    <td style="padding-left: 12px;">
                                        <div id="div_EstadoEdicion">
                                            <asp:DropDownList ID="ddlEstadoEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" Width="79">
                                            </asp:DropDownList>
                                        </div>
                                    </td>
                                    <td style="padding-left: 8px; font-weight: bold">
                                        Letra
                                    </td>
                                    <td style="padding-left: 13px;">
                                        <div id="div_LetraEdicion">
                                            <asp:DropDownList ID="ddlLetraEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" Width="79">
                                            </asp:DropDownList>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">
                            Correo
                        </td>
                        <td style="padding-left: 4px;" colspan='5'>
                            <asp:TextBox ID="txtCorreoEdicion" runat="server" Width="500px" Font-Names="Arial"
                                Font-Bold="True" ForeColor="Blue"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">
                            Comentario
                        </td>
                        <td style="padding-left: 4px;" colspan='5'>
                            <asp:TextBox ID="txtComentarioEdicion" runat="server" Width="500px" Font-Names="Arial"
                                Font-Bold="True" TextMode="MultiLine" ForeColor="Blue" Height="36"></asp:TextBox>
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
    <div id="div_DireccionMultiple" style="display: none;">
        <table cellpadding="0" cellspacing="0">
            <tr>
                <td style="padding-top: 10px; font-weight: bold">
                    Distrito
                </td>
                <td style="padding-top: 10px;">
                    <asp:TextBox ID="txtDistritoMultiple" runat="server" Width="500px" Font-Names="Arial"
                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 5px; font-weight: bold">
                    Direccion
                </td>
                <td style="padding-top: 5px;">
                    <asp:TextBox ID="txtDireccionMultiple" runat="server" Width="500px" Font-Names="Arial"
                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 5px; font-weight: bold">
                    Email 1
                </td>
                <td style="padding-top: 5px;">
                    <asp:TextBox ID="txtEmailMultiple1" runat="server" Width="500px" Font-Names="Arial"
                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 5px; font-weight: bold">
                    Email 2
                </td>
                <td style="padding-top: 5px;">
                    <asp:TextBox ID="txtEmailMultiple2" runat="server" Width="500px" Font-Names="Arial"
                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 5px; font-weight: bold">
                    Email 3
                </td>
                <td style="padding-top: 5px;">
                    <asp:TextBox ID="txtEmailMultiple3" runat="server" Width="500px" Font-Names="Arial"
                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 5px; font-weight: bold">
                    Email 4
                </td>
                <td style="padding-top: 5px;">
                    <asp:TextBox ID="txtEmailMultiple4" runat="server" Width="500px" Font-Names="Arial"
                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 5px; font-weight: bold">
                    Email 5
                </td>
                <td style="padding-top: 5px;">
                    <asp:TextBox ID="txtEmailMultiple5" runat="server" Width="500px" Font-Names="Arial"
                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td style="padding-top: 5px; font-weight: bold">
                    Email 6
                </td>
                <td style="padding-top: 5px;">
                    <asp:TextBox ID="txtEmailMultiple6" runat="server" Width="500px" Font-Names="Arial"
                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td align="right" colspan="2">
                    <asp:Button ID="btnGrabarDireccion" runat="server" Text="GRABAR" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </td>
            </tr>
            <tr>
                <td style="padding-top: 5px;" colspan="2">
                    <div id="div_Direccion">
                        <asp:GridView ID="grvDireccion" runat="server" AutoGenerateColumns="False" border="0"
                            CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="860px">
                            <Columns>
                                <asp:TemplateField>
                                    <ItemTemplate>
                                        <asp:ImageButton runat="server" ID="imgAnularDocumento" ImageUrl="~/Asset/images/EliminarBtn.png"
                                            ToolTip="Eliminar Direccion" OnClientClick="F_EliminarDireccion(this); return false;" />
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField>
                                    <ItemTemplate>
                                        <asp:ImageButton runat="server" ID="imgEditarRegistro" ImageUrl="../Asset/images/btnEdit.gif"
                                            ToolTip="Editar Direccion" OnClientClick="F_EditarRegistroDireccion(this); return false;" />
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="ID">
                                    <ItemStyle HorizontalAlign="Right" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblCodDireccion" Text='<%# Bind("CodDireccion") %>'></asp:Label>
                                        <asp:HiddenField ID="hfCodDistrito" runat="server" Value='<%# Bind("CodDistrito") %>' />
                                        <asp:HiddenField ID="hfCodDepartamento" runat="server" Value='<%# Bind("CodDepartamento") %>' />
                                        <asp:HiddenField ID="hfCodProvincia" runat="server" Value='<%# Bind("CodProvincia") %>' />
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Distrito" HeaderStyle-HorizontalAlign="Center">
                                    <ItemStyle HorizontalAlign="left" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblDistrito" Text='<%# Bind("Distrito") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Direccion" HeaderStyle-HorizontalAlign="Center">
                                    <ItemStyle HorizontalAlign="Left" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblDireccion" Text='<%# Bind("Direccion") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Email 1" HeaderStyle-HorizontalAlign="Left">
                                    <ItemStyle HorizontalAlign="Left" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblEmail1" Text='<%# Bind("Email") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Email 2" HeaderStyle-HorizontalAlign="Left">
                                    <ItemStyle HorizontalAlign="Left" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblEmail2" Text='<%# Bind("Email2") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Email 3" HeaderStyle-HorizontalAlign="Left">
                                    <ItemStyle HorizontalAlign="Left" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblEmail3" Text='<%# Bind("Email3") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Email 4" HeaderStyle-HorizontalAlign="Left">
                                    <ItemStyle HorizontalAlign="Left" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblEmail4" Text='<%# Bind("Email4") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Email 5" HeaderStyle-HorizontalAlign="Left">
                                    <ItemStyle HorizontalAlign="Left" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblEmail5" Text='<%# Bind("Email5") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Email 6" HeaderStyle-HorizontalAlign="Left">
                                    <ItemStyle HorizontalAlign="Left" />
                                    <ItemTemplate>
                                        <asp:Label runat="server" ID="lblEmail6" Text='<%# Bind("Email6") %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                            </Columns>
                        </asp:GridView>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div id="div_EdicionDireccion" style="display: none;">
        <div class="ui-jqdialog-content">
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td align="right" style="padding-top: 10px;" colspan="2">
                        <asp:Button ID="btnGrabarEdicionDireccion" runat="server" Text="GRABAR" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                            Font-Names="Arial" Font-Bold="True" Width="120" />
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding-top: 5px;">
                        Distrito
                    </td>
                    <td style="padding-left: 5px; padding-top: 5px;">
                        <asp:TextBox ID="txtDistritoDireccionEdicion" runat="server" Width="360px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding-top: 5px;">
                        Direccion
                    </td>
                    <td style="padding-left: 5px; padding-top: 5px;">
                        <asp:TextBox ID="txtDireccionEdicionMultiple" runat="server" Width="360px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding-top: 5px;">
                        Email 1
                    </td>
                    <td style="padding-left: 5px; padding-top: 5px;">
                        <asp:TextBox ID="txtEmailEdicionMultiple1" runat="server" Width="360px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding-top: 5px;">
                        Email 2
                    </td>
                    <td style="padding-left: 5px; padding-top: 5px;">
                        <asp:TextBox ID="txtEmailEdicionMultiple2" runat="server" Width="360px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding-top: 5px;">
                        Email 3
                    </td>
                    <td style="padding-left: 5px; padding-top: 5px;">
                        <asp:TextBox ID="txtEmailEdicionMultiple3" runat="server" Width="360px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding-top: 5px;">
                        Email 4
                    </td>
                    <td style="padding-left: 5px; padding-top: 5px;">
                        <asp:TextBox ID="txtEmailEdicionMultiple4" runat="server" Width="360px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding-top: 5px;">
                        Email 5
                    </td>
                    <td style="padding-left: 5px; padding-top: 5px;">
                        <asp:TextBox ID="txtEmailEdicionMultiple5" runat="server" Width="360px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding-top: 5px;">
                        Email 6
                    </td>
                    <td style="padding-left: 5px; padding-top: 5px;">
                        <asp:TextBox ID="txtEmailEdicionMultiple6" runat="server" Width="360px" Font-Names="Arial"
                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
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
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfRegion" type="hidden" value="0" />
    <input id="hfProvincia" type="hidden" value="0" />
    <input id="hfDistrito" type="hidden" value="0" />
    <input id="hfRegionEdicion" type="hidden" value="0" />
    <input id="hfProvinciaEdicion" type="hidden" value="0" />
    <input id="hfDistritoEdicion" type="hidden" value="0" />
    <input id="hfMoneda" type="hidden" value="0" />
    <input id="hfCodDireccion" type="hidden" value="0" />
    <input id="hfCodTransportista" type="hidden" value="0" />
    <input id="hfCodTransportistaEdicion" type="hidden" value="0" />
</asp:Content>
