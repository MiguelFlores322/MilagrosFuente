<%@ Page Title="Empresa" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"    CodeBehind="Empresa.aspx.cs" Inherits="SistemaInventario.Maestros.Empresa" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"  type="text/javascript"></script>      
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/dropzone.min.js" type="text/javascript"></script>
    <script type="text/javascript">        Dropzone.autoDiscover = false;</script>
    <script src="../Asset/js/sss.js" type="text/javascript"></script>
    <link rel="stylesheet" href="../Asset/css/checkbox.css" />
    <link rel="stylesheet" href="../Asset/css/imagescss.css" />
    <link href="../Asset/css/sss.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="Empresa.js" charset="UTF-8"></script>
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="../Asset/css/dropzone.css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/toars/toastr.min.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/toars/toastr.min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 1200px;">
        Empresa</div>
    <div id="divTabs" style="width: 1200px; height: 500px">
        <ul>
            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
            <li id="liConsulta"><a href="#tabConsulta">Consulta</a></li>
        </ul>
        <div id="tabRegistro">
            <table cellpadding="0" cellspacing="0" class="form-inputs">
                <tr>
                    <td>
                        <%--DATOS DE LA EMPRESA--%>
                        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 640px;
                            height: 360px">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                DATOS DE LA EMPRESA
                            </div>
                            <div>
                                <table cellpadding="0" cellspacing="0" class="form-inputs">
                                    <tr>
                                        <td style="font-weight: bold; width: 110px;">
                                            Ruc
                                        </td>
                                        <td>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <input id="hfCodEmpresa" type="hidden" />
                                                        <asp:TextBox ID="txtRucEmpresa" runat="server" Width="150px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; width: 110px;">
                                            Razon Social
                                        </td>
                                        <td style="padding-left: 4px;">
                                            <asp:TextBox ID="txtRazonSocial" runat="server" Width="500px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; width: 110px">
                                            Nombre Comercial
                                        </td>
                                        <td style="padding-left: 4px;">
                                            <asp:TextBox ID="txtT_Nombrecomercial" runat="server" Width="500px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" ToolTip="Nombre Comercial"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; width: 110px;">
                                            Direccion
                                        </td>
                                        <td style="padding-left: 4px;">
                                            <asp:TextBox ID="txtDireccion" runat="server" Width="500px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; width: 110px;">
                                            Distrito
                                        </td>
                                        <td style="padding-left: 4px;">
                                            <input id="hfCodDistrito" type="hidden" />
                                            <asp:TextBox ID="txtDistrito" runat="server" Width="500px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; width: 110px;">
                                            Pagina Web
                                        </td>
                                        <td style="padding-left: 4px;">
                                            <asp:TextBox ID="txtT_PaginaWeb" runat="server" Width="500px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True" ToolTip="Página Web"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; width: 110px;">
                                            Slogan
                                        </td>
                                        <td style="padding-left: 4px;">
                                            <asp:TextBox ID="txtT_Slogan" runat="server" Width="500px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" ToolTip="Slogan"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; width: 110px;">
                                            Telefono
                                        </td>
                                        <td colspan='5'>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <asp:TextBox ID="txtT_Telefono" runat="server" Width="105px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold; text-align: center; width: 73px;">
                                                        Anexo
                                                    </td>
                                                    <td style="padding-left: 13px;">
                                                        <asp:TextBox ID="txtT_Anexo" runat="server" Width="100px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold; text-align: center; width: 71px;">
                                                        Celular
                                                    </td>
                                                    <td style="padding-left: 13px;">
                                                        <asp:TextBox ID="txtT_Celular" runat="server" Width="105px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold">
                                            Correo Empresa
                                        </td>
                                        <td colspan='5'>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <asp:TextBox ID="txtT_CorreoEmpresa" runat="server" Width="500px" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold">
                                            Represent Legal
                                        </td>
                                        <td colspan='5'>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <asp:TextBox ID="txtT_RepresentanteLegal" runat="server" Width="500px" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold">
                                            Correo Represent
                                        </td>
                                        <td colspan='5'>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <asp:TextBox ID="txtT_CorreoPersonal" runat="server" Width="500px" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True" ToolTip="Correo Personal del Representante Legal"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; width: 110px;">
                                            Sunat
                                        </td>
                                        <td colspan='5'>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <div id="div_EnvioAutomaticoSunat">
                                                            <asp:DropDownList ID="ddl_EnvioAutomaticoSunat" runat="server" Font-Names="Arial"
                                                                ForeColor="Blue" Font-Bold="True" Width="250px">
                                                                <asp:ListItem Value="M">Envio de Facturación Manual</asp:ListItem>
                                                                <asp:ListItem Value="A">Envio de Facturación Automatico</asp:ListItem>
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
                                <asp:Button ID="btnGrabar" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                    Font-Names="Arial" Font-Bold="True" Width="120px" />
                            </div>
                        </div>
                    </td>
                    <td>
                        <%--IMAGEN--%>
                        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 500px;
                            height: 360px">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                LOGO DE LA EMPRESA</div>
                            <div>
                                <table cellpadding="0" cellspacing="0" class="form-inputs">
                                    <tr>
                                        <td style="height: 290px">
                                            <%--                                                              <span style="padding-left:140px; padding-top:145px">Imagen del Artículo</span>--%>
                                            <span>
                                                <input id="hid_tipo_operacion_mantenimiento" type="hidden" />
                                                <input id="hid_id_mantenimiento" type="hidden" />
                                                <input id="hid_id_logo" type="hidden" />
                                            </span>
                                            <div id="drop" style="padding-top: 1px;">
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="tabConsulta">
            <div id='divConsulta' class="ui-jqgrid ui-widget ui-widget-content ui-corner-all"
                style="width: 1018px">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    Criterio de busqueda
                </div>
                <div class="ui-jqdialog-content">
                    <table cellpadding="0" cellspacing="0" class="form-inputs">
                        <tr>
                            <td style="font-weight: bold; width: 150px">
                                Ruc / Razon Social
                            </td>
                            <td>
                                <asp:TextBox ID="txtDescripcionConsulta" runat="server" Width="800" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar" CssClass="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Width="120" />
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
            <div id="div_consulta" style="padding-top: 5px;">
                <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" border="0"
                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" Width="1018px">
                    <Columns>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <center>
                                    <asp:ImageButton runat="server" ID="imgEditarRegistro" ImageUrl="../Asset/images/btnEdit.gif"
                                        ToolTip="Editar Producto" OnClientClick="F_EditarRegistro(this); return false;" />
                                </center>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Codigo" HeaderStyle-HorizontalAlign="Center" HeaderStyle-Width="50px">
                            <ItemStyle HorizontalAlign="Center" />
                            <ItemTemplate>
                                <asp:Label runat="server" ID="lblCodEmpresa" Text='<%# Bind("CodEmpresa") %>' CssClass="detallesart"></asp:Label>
                                <asp:HiddenField ID="hfNroDuc" runat="server" Value='<%# Bind("NroRuc") %>' />
                                <asp:HiddenField ID="hfRazonSocial" runat="server" Value='<%# Bind("RazonSocial") %>' />
                                <asp:HiddenField ID="hfDireccion" runat="server" Value='<%# Bind("Direccion") %>' />
                                <asp:HiddenField ID="hfEstado" runat="server" Value='<%# Bind("Estado") %>' />
                                <asp:HiddenField ID="hfT_CorreoEmpresa" runat="server" Value='<%# Bind("T_CorreoEmpresa") %>' />
                                <asp:HiddenField ID="hfT_Anexo" runat="server" Value='<%# Bind("T_Anexo") %>' />
                                <asp:HiddenField ID="hfT_Celular" runat="server" Value='<%# Bind("T_Celular") %>' />
                                <asp:HiddenField ID="hfT_RepresentanteLegal" runat="server" Value='<%# Bind("T_RepresentanteLegal") %>' />
                                <asp:HiddenField ID="hfT_CorreoPersonal" runat="server" Value='<%# Bind("T_CorreoPersonal") %>' />
                                <asp:HiddenField ID="hfT_PaginaWeb" runat="server" Value='<%# Bind("T_PaginaWeb") %>' />
                                <asp:HiddenField ID="hfT_Slogan" runat="server" Value='<%# Bind("T_Slogan") %>' />
                                <asp:HiddenField ID="hfCodDistrito" runat="server" Value='<%# Bind("CodDistrito") %>' />
                                <asp:HiddenField ID="hfDistrito" runat="server" Value='<%# Bind("Distrito") %>' />
                                <asp:HiddenField ID="hfT_NombreComercial" runat="server" Value='<%# Bind("T_NombreComercial") %>' />
                                <asp:HiddenField ID="hfT_Telefono" runat="server" Value='<%# Bind("T_Telefono") %>' />
                                <asp:HiddenField ID="hfEnvioAutomaticoSunat" runat="server" Value='<%# Bind("EnvioAutomaticoSunat") %>' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderText="Ruc" HeaderStyle-HorizontalAlign="Center" HeaderStyle-Width="100px">
                            <ItemStyle HorizontalAlign="Center" />
                            <ItemTemplate>
                                <asp:HyperLink runat="server" ID="lblNroRuc" Font-Underline="true" ForeColor="Blue"
                                    Style="cursor: hand" Text='<%# Bind("NroRuc") %>' onclick="F_VisualizarRegistro(this); return false;">
                                </asp:HyperLink>
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="RazonSocial" HeaderText="Razon Social" HeaderStyle-Width="300px">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Direccion" HeaderText="Direccion" HeaderStyle-Width="650px">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                    </Columns>
                </asp:GridView>
            </div>
        </div>
    </div>
    <div id="divEdicionRegistro" style="display: none;">
        <table cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <%--DATOS DE LA EMPRESA--%>
                    <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 640px;
                        height: 360px">
                        <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                            DATOS DE LA EMPRESA
                        </div>
                        <div>
                            <table cellpadding="0" cellspacing="0" class="form-inputs">
                                <tr>
                                    <td style="font-weight: bold; width: 110px;">
                                        Ruc
                                    </td>
                                    <td>
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <input id="hfCodEmpresaEdicion" type="hidden" />
                                                    <asp:TextBox ID="txtRucEmpresaEdicion" runat="server" Width="150px" Font-Names="Arial"
                                                        ForeColor="Blue" Font-Bold="True" ReadOnly="true"></asp:TextBox>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; width: 110px;">
                                        Razon Social
                                    </td>
                                    <td style="padding-left: 4px;">
                                        <asp:TextBox ID="txtRazonSocialEdicion" runat="server" Width="500px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; width: 110px">
                                        Nombre Comercial
                                    </td>
                                    <td style="padding-left: 4px;">
                                        <asp:TextBox ID="txtT_NombrecomercialEdicion" runat="server" Width="500px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True" ToolTip="Nombre Comercial"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; width: 110px;">
                                        Direccion
                                    </td>
                                    <td style="padding-left: 4px;">
                                        <asp:TextBox ID="txtDireccionEdicion" runat="server" Width="500px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; width: 110px;">
                                        Distrito
                                    </td>
                                    <td style="padding-left: 4px;">
                                        <input id="hfCodDistritoEdicion" type="hidden" />
                                        <asp:TextBox ID="txtDistritoEdicion" runat="server" Width="500px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; width: 110px;">
                                        Pagina Web
                                    </td>
                                    <td style="padding-left: 4px;">
                                        <asp:TextBox ID="txtT_PaginaWebEdicion" runat="server" Width="500px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True" ToolTip="Página Web"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; width: 110px;">
                                        Slogan
                                    </td>
                                    <td style="padding-left: 4px;">
                                        <asp:TextBox ID="txtT_SloganEdicion" runat="server" Width="500px" Font-Names="Arial"
                                            ForeColor="Blue" Font-Bold="True" ToolTip="Slogan"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; width: 110px;">
                                        Telefono
                                    </td>
                                    <td colspan='5'>
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <asp:TextBox ID="txtT_TelefonoEdicion" runat="server" Width="105px" Font-Names="Arial"
                                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                </td>
                                                <td style="font-weight: bold; text-align: center; width: 73px;">
                                                    Anexo
                                                </td>
                                                <td style="padding-left: 13px;">
                                                    <asp:TextBox ID="txtT_AnexoEdicion" runat="server" Width="100px" Font-Names="Arial"
                                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                </td>
                                                <td style="font-weight: bold; text-align: center; width: 71px;">
                                                    Celular
                                                </td>
                                                <td style="padding-left: 13px;">
                                                    <asp:TextBox ID="txtT_CelularEdicion" runat="server" Width="105px" Font-Names="Arial"
                                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold">
                                        Correo Empresa
                                    </td>
                                    <td colspan='5'>
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <asp:TextBox ID="txtT_CorreoEmpresaEdicion" runat="server" Width="500px" Font-Names="Arial"
                                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold">
                                        Represent Legal
                                    </td>
                                    <td colspan='5'>
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <asp:TextBox ID="txtT_RepresentanteLegalEdicion" runat="server" Width="500px" Font-Names="Arial"
                                                        ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold">
                                        Correo Represent
                                    </td>
                                    <td colspan='5'>
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <asp:TextBox ID="txtT_CorreoPersonalEdicion" runat="server" Width="500px" Font-Names="Arial"
                                                        ForeColor="Blue" Font-Bold="True" ToolTip="Correo Personal del Representante Legal"></asp:TextBox>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; width: 110px;">
                                        Sunat
                                    </td>
                                    <td colspan='5'>
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <div id="div_ddl_EnvioAutomaticoSunatEdicion">
                                                        <asp:DropDownList ID="ddl_EnvioAutomaticoSunatEdicion" runat="server" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True" Width="250px">
                                                            <asp:ListItem Value="M">Envio de Facturación Manual</asp:ListItem>
                                                            <asp:ListItem Value="A">Envio de Facturación Automatico</asp:ListItem>
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
                            <asp:Button ID="btnGrabarEdicion" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                Font-Names="Arial" Font-Bold="True" Width="120px" />
                        </div>
                    </div>
                </td>
                <td style="padding-left: 5px;">
                    <%--IMAGEN--%>
                    <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 550px;
                        height: 360px">
                        <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix"
                            style="width: 550px">
                            LOGO DE LA EMPRESA</div>
                        <div>
                            <table cellpadding="0" cellspacing="0" class="form-inputs">
                                <tr>
                                    <td style="height: 290px" align="center">
                                        <%--<span style="padding-left:140px; padding-top:145px">Imagen del Artículo</span>--%>
                                        <span>
                                            <input id="hid_id_nombre_edit" type="hidden" />
                                            <input id="hid_id_logo_Edit" type="hidden" />
                                            <input id="hid_id_logo_Edit2" type="hidden" />
                                        </span>
                                        <div id="div_drop_Edit" style="padding-top: 5px;">
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <%--VISUALIZACION DE IMAGENES--%>
    <div id="divVisualizarImagen" class="wrapper" style="display: none;">
        <ul id="luImagenes" class="ul-float">
        </ul>
    </div>
    <div id="dlgWait" style="background-color: #CCE6FF; text-align: center; display: none;
        width: 1000px; height: 500px">
        <br />
        <br />
        <center>
            <asp:Label ID="Label2" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large"
                Style="text-align: center"></asp:Label></center>
        <br />
        <center>
            <img alt="Wait..." src="../Asset/images/ajax-loader2.gif" /></center>
    </div>
    <div id="div_SESION" style="background-color: #F5F5F2; display: none;">
        <br />
        <br />
        <center>
            <%--0080FF--%>
            <%--045FB4--%>
            <span style="color: #0080FF; font-size: xx-large; font-style: normal; font-family: Segoe UI;
                font-weight: lighter"><i class="icon-sitemap"></i>¡ EL TIEMPO DE SESIÓN HA EXPIRADO
                !</span>
            <hr style="color: #FAFAFA; background-color: #FAFAFA" />
            <span style="font-size: large; font-weight: 100; font-family: Segoe UI; text-align: left">
                Ha caducado el tiempo de sesión vuelva a iniciar sesión por favor.</span>
        </center>
        <br />
        <br />
        <span style="font-size: large; text-align: left; font-family: Segoe UI; color: #6E6E6E">
            Pruebe uno de los siguientes:</span>
        <ul style="text-align: left">
            <li><i class="icon-hand-right blue"></i><span style="font-size: medium; text-align: justify;
                font-family: Segoe UI; color: #6E6E6E">Vuelva a iniciar sesión</span></li>
            <p>
            </p>
            <p>
            </p>
            <li><i class="icon-hand-right blue"></i><span style="font-size: medium; text-align: left;
                font-family: Segoe UI; color: #6E6E6E">Comuniquese con el área de sistemas, por
                favor </span></li>
        </ul>
        <br />
        <br />
        <br />
        <br />
        <a href="javascript:InicioSession()" class="btn btn-grey"><i class="icon-arrow-left">
        </i>Iniciar Sesión</a>
        <%--<img alt="Wait..." src="../Asset/images/ajax-loader2.gif" /></center>--%>
    </div>
    <input id="hfCodCtaCte" type="hidden" value="0" />
    <input id="hfCodCtaCteConsulta" type="hidden" value="0" />
    <input id="hfCodigoTemporal" type="hidden" value="0" />
    <input id="hfCodProducto" type="hidden" value="0" />
    <input id="hfMoneda" type="hidden" value="0" />
    <input id="hfCodSede" type="hidden" value="0" />
</asp:Content>
