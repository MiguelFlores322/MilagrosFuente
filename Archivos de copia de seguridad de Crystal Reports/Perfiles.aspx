<%@ Page Title="Perfiles" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="Perfiles.aspx.cs" Inherits="SistemaInventario.Maestros.Perfiles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"
        type="text/javascript"></script>
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/dropzone.min.js" type="text/javascript"></script>
    <script type="text/javascript">        Dropzone.autoDiscover = false;</script>
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript" language="javascript"
        charset="UTF-8"></script>
    <script type="text/javascript" language="javascript" src="Perfiles.js" charset="UTF-8"></script>
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"
        type="text/css" />
    <link rel="stylesheet" href="../Asset/css/dropzone.css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo" style="width: 480px">
        Perfiles</div>
    <div id="divTabsXXXXXX">
        <%--        <ul>
            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
            <li id="liConsulta"><a href="#tabConsulta">Consulta</a></li>
        </ul>--%>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 480px">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    REGISTRO DE Perfiles
                </div>
                <div>
                    <table cellpadding="0" cellspacing="0" class="form-inputs">
                        <tr>
                            <asp:CheckBox ID="chkUsuario" Text="MOSTRAR Usuarios Inactivos" runat="server" Font-Bold="True" />
                        </tr>
                        <tr>
                            <td style="font-weight: bold; width: 50px">
                                Usuario
                            </td>
                            <td style="width: 350px">
                                <div id="div_Usuario" style="width: 354px">
                                    <asp:DropDownList ID="ddlUsuario" runat="server" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Width="350">
                                    </asp:DropDownList>
                                </div>
                            </td>
                            <td style="width: 20px">
                                <input type="image" id="btnAgregarUsuario" title="AGREGAR USUARIO" src="../Asset/images/adduser.png"
                                    onclick="F_Agregar(); return false;" style="height: 18px; width: 18px;">
                            </td>
                            <td style="width: 20px">
                                <input type="image" id="btnEditarUsuario" title="EDITAR USUARIO SELECCIONADO" src="../Asset/images/btnEdit.gif"
                                    onclick="F_Editar(); return false;" style="height: 18px; width: 18px;">
                            </td>
                            <td style="width: 20px;">
                                <%--                                <input type="image" id="btnAccesosRemotos" title="EDITAR ACCESOS REMOTOS" src="../Asset/images/internet_earthx16.png"
                                    onclick="F_AccesosRemotos_Listar(); return false;" style="height: 18px; width: 18px;">--%>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            </p>
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 900px">
                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                    Permisos de Usuarios
                </div>
                <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 898px">
                    <table>
                        <tr>
                            <td style="font-weight: bold; width: 50px">
                                Menu
                            </td>
                            <td style="width: 350px">
                                <div id="div_Menu" style="width: 354px">
                                    <asp:DropDownList ID="ddlMenu" runat="server" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Width="350">
                                    </asp:DropDownList>
                                </div>
                            </td>
                            <td style="width: 20px">
                            </td>
                            <td style="width: 20px">
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="div_tablapermisos" style="width: 900px">
                    <%--                    <center>
                        <h1>
                            Permisos</h1>
                    </center>--%>
                    <table id="tab_Permisos" cellpadding="0" cellspacing="0" class="GridView" width="900">
                        <thead>
                            <tr>
                                <th style="width: 400px">
                                    Pagina
                                </th>
                                <th>
                                    Permiso
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <div id="div_AvisoAdmin" style="display: none">
                        <center>
                            <h1>
                                LOS USUARIOS ADMINISTRADORES NO REQUIEREN PERMISOS, PORQUE YA POR DEFECTO PUEDEN
                                ENTRAR A DONDE NECESITEN</h1>
                        </center>
                    </div>
                </div>
            </div>
            <div id="div_UsuariosAuxiliares" style="width: 6000px; display: none">
                <center>
                    <h1>
                        Ultimos Accesos Remotos</h1>
                </center>
                <table id="Table1" cellpadding="0" cellspacing="0" class="GridView" width="500">
                    <thead>
                        <tr>
                            <th>
                                Eliminar
                            </th>
                            <th style="width: 400px">
                                Id Remoto de Origen
                            </th>
                            <th>
                                Permiso
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div id="div_accesosremotos" style="width: 480px; display: none">
                <center>
                    <h1>
                        Ultimos Accesos Remotos</h1>
                </center>
                <table id="tab_AccesosRemotos" cellpadding="0" cellspacing="0" class="GridView" width="500">
                    <thead>
                        <tr>
                            <th>
                                Eliminar
                            </th>
                            <th style="width: 400px">
                                Id Remoto de Origen
                            </th>
                            <th>
                                Permiso
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    <div id="divEdicionRegistro" style="display: none;">
        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            <table cellpadding="0" cellspacing="0" class="form-inputs" width="700" height: "180px">
                <tr style="width: 700px;height: 180px">
                    <td valign="top" style="width: 500px; height: 180px">
                        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 502px;
                            height: 180px">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix"
                                style="width: 500px">
                                DATOS USUARIO
                            </div>
                            <div>
                                <table cellpadding="0" cellspacing="0" class="form-inputs" width="500">
                                    <tr>
                                        <td style="font-weight: bold; width: 65px">
                                            USUARIO
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtNombreUsuario" runat="server" Width="150" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True">
                                            </asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold; width: 65px">
                                            CLAVE
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtClave" runat="server" Width="150" Font-Names="Arial" ForeColor="Blue"
                                                TextMode="Password" Font-Bold="True">
                                            </asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold">
                                            TIPO
                                        </td>
                                        <td>
                                            <div id="div_Tipo">
                                                <asp:DropDownList ID="ddlTipo" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="154">
                                                    <asp:ListItem Value="NOR" Selected="True">USUARIO</asp:ListItem>
                                                    <asp:ListItem Value="ADM">ADMINISTRADOR DEL SISTEMA</asp:ListItem>
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold">
                                            ESTADO
                                        </td>
                                        <td>
                                            <div id="div_EstadoEdicion">
                                                <asp:DropDownList ID="ddlEstadoEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="154">
                                                </asp:DropDownList>
                                            </div>
                                            <div class="ui-jqdialog-content">
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix"
                                style="width: 500px; display: none">
                                CLAVE OPERACIONES ESPECIALES
                            </div>
                            <div style="display: none">
                                <table cellpadding="0" cellspacing="0" width="500">
                                    <tr>
                                        <td>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: bold; width: 310px">
                                                        CLAVE PARA OTORGAR PERMISOS A OTROS USUARIOS
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtClaveOperacionesEspeciales" runat="server" Width="150" Font-Names="Arial"
                                                            ForeColor="Blue" TextMode="Password" Font-Bold="True">
                                                        </asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr style="display: none">
                                        <td>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <td>
                                                            <button type="btnAsignarUsuarios" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                                                style="width: 465px; height: 20px" onclick="F_UsuariosAuxiliares_Listar(); return false;">
                                                                Lista de Usuarios de los que sera auxiliar</button>
                                                        </td>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix"
                                style="width: 500px">
                                DATOS DE EMPLEADO
                            </div>
                            <div >
                                <table cellpadding="0" cellspacing="0" class="form-inputs" width="500" >
                                    <tr>
                                        <td style="font-weight: bold; width: 65px">
                                            CARGO
                                        </td>
                                        <td>
                                            <div id="div_CargoEdicion">
                                                <asp:DropDownList ID="ddlCargoEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="154">
                                                </asp:DropDownList>
                                            </div>
                                            <div class="ui-jqdialog-content">
                                            </div>
                                        </td>
                                        <td style="font-weight: bold; width: 65px">
                                            DNI
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtNroDni" runat="server" Width="150" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True" MaxLength="8">
                                            </asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold">
                                            APELLIDOS
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtApellidos" runat="server" Width="150" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True">
                                            </asp:TextBox>
                                        </td>
                                        <td style="font-weight: bold">
                                            NOMBRES
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtNombres" runat="server" Width="150" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True">
                                            </asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; width: 65px">
                                            Caja
                                        </td>
                                        <td>
                                            <div id="div_CajaFisica">
                                                <asp:DropDownList ID="ddlCajaFisica" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="154">
                                                </asp:DropDownList>
                                            </div>
                                            <div class="ui-jqdialog-content">
                                            </div>
                                        </td>
                                        
                                        <td style="font-weight: bold; width: 50px">
                                            Copiar Usuario
                                        </td>
                                        <td style="width: 350px">
                                            <div id="div1" style="width: 154px">
                                                <asp:DropDownList ID="ddlUsuarioCopiar" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True" Width="154">
                                                </asp:DropDownList>
                                            </div>
                                        </td>
                                        <td style="font-weight: bold; width: 65px">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; width: 500px">
                                         
                                    </tr>
                                        </td>
                                    </tr>
                                                                           
                                </table>
                            </div>
                            
                        </div>
                   
                    <td valign="top" style="width: 300px; height: 180px">
                        <%--IMAGEN--%>
                        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 170px;
                            height: 180px">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix"
                                style="width: 169px">
                                Foto
                            </div>
                            <div>
                                <table cellpadding="0" cellspacing="0" class="form-inputs">
                                    <tr>
                                        <td style="height: 10px">
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
            <div id="div_Almacenes" style="padding-top: 5px;">
                                            <asp:GridView ID="grvAlmacenes" runat="server" AutoGenerateColumns="False"
                    border="0" CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None"
                    Width="700px">
                                                <columns>
                                                        <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center">
                                                            <HeaderTemplate>
                                                                <asp:CheckBox ID="checkAll" runat="server" onclick="checkAll(this);" />
                                                            </HeaderTemplate>
                                                            <ItemTemplate>
                                                                <asp:CheckBox runat="server" ID="chkAlmacen" CssClass="checks" Text="" />
                                                            </ItemTemplate>
                                                            <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                                        </asp:TemplateField>
                                                        <asp:TemplateField HeaderText="Sucursales" ItemStyle-HorizontalAlign="Left">
                                                            
                                                            <ItemTemplate >
                                                                <asp:Label runat="server" ID="lblDescripcion" Width="200px" Font-Names="Arial" Text='<%# Bind("Descripcion") %>'></asp:Label>
                                                                <asp:HiddenField ID="hfCodalmacen" runat="server" Value='<%# Bind("CodAlmacenFisico") %>' />
                                                            </ItemTemplate>
                                                        </asp:TemplateField>
                                                        
                                                    </columns>
                                            </asp:GridView>
                                        </div>
            <div class="linea-button">
                <%--                <asp:Button ID="btnEdicion" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    Font-Names="Arial" Font-Bold="True" Width="120px" OnClick="F_Editar(); return false;" />--%>
                <button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    style="width: 120px; height: 20px" onclick="F_Grabar(); return false;">
                    Grabar</button>
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
    <input id="hfIDFamilia" type="hidden" value="0" />
</asp:Content>
