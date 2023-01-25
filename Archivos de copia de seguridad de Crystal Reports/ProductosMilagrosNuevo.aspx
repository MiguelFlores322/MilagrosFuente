<%@ Page Title="Productos" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="ProductosMilagrosNuevo.aspx.cs" Inherits="SistemaInventario.Maestros.ProductosMilagrosNuevo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"  type="text/javascript"></script>      
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
    <script src="../Asset/js/dropzone.min.js" type="text/javascript"></script>
    <script type="text/javascript">        Dropzone.autoDiscover = false;</script>
    <script src="../Asset/js/sss.js" type="text/javascript"></script>
    <link href="../Asset/css/checkbox.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/imagescss.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/sss.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/js/js.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript" src="ProductosMilagrosNuevo.js" charset="UTF-8"></script>       
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet"   type="text/css" />     
    <link rel="stylesheet" href="../Asset/css/dropzone.css" />
    <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/toars/toastr.min.css" rel="stylesheet" type="text/css" />
    <script src="../Asset/toars/toastr.min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="titulo">
        Productos</div>
    <div id="divTabs" style="width: 1200px">
        <ul>
            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
            <li id="liConsulta"><a href="#tabConsulta">Consulta</a></li>
        </ul>
        <div id="tabRegistro">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 1100px">
                <table>
                    <tr>
                        <td style="width: 735px; vertical-align: top">
                            <div style="width: 735px;" class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                    REGISTRO DE PRODUCTOS
                                </div>
                                <div>
                                    <table cellpadding="0" cellspacing="0" class="form-inputs">
                                        <tr>
                                            <td style="font-weight: bold; width: 110px">
                                                Codigo
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtCodigo" runat="server" Width="200px" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: bold">
                                                Descripcion
                                            </td>
                                            <td style="padding: 0 0 0 0">
                                                <table cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <asp:TextBox ID="txtDescripcion" runat="server" Width="430px" Font-Names="Arial"
                                                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                        </td>
                                                        <td style="font-weight: bold;">
                                                            Moneda
                                                        </td>
                                                        <td>
                                                            <div id="div_moneda">
                                                                <asp:DropDownList ID="ddlMoneda" runat="server" Font-Names="Arial" Width="105px"
                                                                    ForeColor="Blue" Font-Bold="True">
                                                                </asp:DropDownList>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: bold;">
                                                Costo Dolar
                                            </td>
                                            <td style="padding: 0 0 0 0">
                                                <table cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <asp:TextBox ID="txtCostoConIgv" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                                        </td>
                                                        <td style="font-weight: bold; padding-left: 20px">
                                                            tipo cambio
                                                        </td>
                                                        <td style="padding-left: 21px;">
                                                            <asp:TextBox ID="txtTC" runat="server" Width="34px" Font-Names="Arial" ForeColor="Blue"
                                                                CssClass="Derecha" Font-Bold="True"></asp:TextBox>
                                                        </td>
                                                        <td style="font-weight: bold; padding-left: 12px">
                                                            costo sol
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtCostoSolesIgv" runat="server" Width="80px" Font-Names="Arial"
                                                                CssClass="Derecha" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                        </td>
                                                        <td style="font-weight: bold; padding-left: 10px">
                                                            Precio Minorista
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtPrecio" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: bold">
                                                Margen Minorista
                                            </td>
                                            <td style="padding: 0 0 0 0">
                                                <table cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <asp:TextBox ID="txtMargen" runat="server" Width="34px" Font-Names="Arial" ForeColor="Blue"
                                                                CssClass="Derecha" Font-Bold="True"></asp:TextBox>
                                                        </td>
                                                        <td style="font-weight: bold; padding-left: 6px">
                                                            precio Mayorista
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtPrecioMayorista" runat="server" Width="80px" Font-Names="Arial"
                                                                ForeColor="Blue" Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                                        </td>
                                                        <td style="font-weight: bold; padding-left: 11px">
                                                            margen Mayorista
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtMargenMayorista" runat="server" Width="34px" Font-Names="Arial"
                                                                CssClass="Derecha" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                        </td>
                                                        <td style="padding-left: 4px">
                                                            <asp:CheckBox ID="chkSI" runat="server" Text="SI" Font-Bold="True" onclick="F_ValidarCheckMayoristaSINO(this.id);"
                                                                ForeColor="Red" />
                                                        </td>
                                                        <td>
                                                            <asp:CheckBox ID="chkNO" runat="server" Text="NO" Font-Bold="True" onclick="F_ValidarCheckMayoristaSINO(this.id);"
                                                                ForeColor="Red" />
                                                        </td>
                                                        <td style="font-weight: bold; padding-left: 16PX;">
                                                            UM
                                                        </td>
                                                        <td>
                                                            <div id="div_umcompra">
                                                                <asp:DropDownList ID="ddlUMCompra" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                    Font-Bold="True" Width="84px">
                                                                </asp:DropDownList>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: bold;">
                                                Ubicacion
                                            </td>
                                            <td style="padding: 0 0 0 0">
                                                <table cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                            <asp:TextBox ID="txtUbicacion" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True"></asp:TextBox>
                                                        </td>
                                                        <td style="font-weight: bold; padding-left: 31px">
                                                            PESO
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtPeso" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                                        </td>
                                                        <td style="font-weight: bold; padding-left: 11px">
                                                            UM Peso
                                                        </td>
                                                        <td style="padding-left: 58px">
                                                            <div id="div_Peso">
                                                                <asp:DropDownList ID="ddlPeso" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                    Font-Bold="True" Width="40">
                                                                </asp:DropDownList>
                                                            </div>
                                                        </td>
                                                        <td style="font-weight: bold; padding-left: 11px">
                                                            Moleta
                                                        </td>
                                                        <td style="padding-left: 57px">
                                                            <asp:TextBox ID="txtMoleta" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Text="0" CssClass="Derecha"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                        <td style="font-weight: bold;">
                                        ESTADO
                                        </td>

                                        <td>
                                        <table cellpadding="0" cellspacing="0">
                                        <tr>
                                                    <td style="font-weight: bold;">
                                <div id="div_FiltroCodEstado">
                                    <asp:DropDownList ID="ddlFiltroCodEstado" runat="server" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Width="78">                              
                                        <asp:ListItem Value="1" Selected>Activo</asp:ListItem>
                                        <asp:ListItem Value="2">Inactivo</asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                            </td>

                                            <td>
                                                <asp:CheckBox ID="chkBloqueoMayorista" runat="server" Text="Bloqueo Mayorista" Font-Bold="True"
                                                    ForeColor="Red" />
                                            </td>
                                        </tr>
                                        </table>
                                        </td>
                                                           
                                        </tr>
                                        <tr style="padding: 0 0 0 0">
                                            <td style="font-weight: bold; display: none;">
                                                Costo Con Igv S/
                                            </td>
                                            <td style="padding: 0 0 0 0">
                                                <table cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="padding-left: 0px; font-weight: bold; display: none;">
                                                            Stock Min.
                                                        </td>
                                                        <td style="padding-left: 14px; display: none;">
                                                            <asp:TextBox ID="txtStockMinimo" runat="server" Width="75px" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Text="0"></asp:TextBox>
                                                        </td>
                                                        <td style="padding-left: 2px; font-weight: bold; display: none;">
                                                            Stock Max.
                                                        </td>
                                                        <td style="padding-left: 16px; font-weight: bold; display: none;">
                                                            <asp:TextBox ID="txtStockMaximo" runat="server" Width="74px" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Text="0"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: bold; display: none;">
                                                Familia
                                            </td>
                                            <td style="display: none;">
                                                <table cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="display: none">
                                                            <asp:CheckBox ID="chkFlagInventario" runat="server" Text="Valida Inventario" Font-Bold="True" />
                                                        </td>
                                                        <td style="display: none">
                                                            <asp:CheckBox ID="chkAplicaIgvMayorista" runat="server" Text="Incluye Igv Mayorista"
                                                                Font-Bold="True" />
                                                        </td>
                                                        <td style="font-weight: bold; display: none">
                                                            Cod Superior
                                                        </td>
                                                        <td style="padding-left: 4px; display: none">
                                                            <asp:TextBox ID="txtCodigoSuperior" runat="server" Width="586px" Font-Names="Arial"
                                                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                        </td>
                                                        <td style="font-weight: bold; display: none;">
                                                            Año
                                                        </td>
                                                        <td style="padding-left: 4px; display: none;">
                                                            <asp:TextBox ID="txtAño" runat="server" Width="211px" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True"></asp:TextBox>
                                                        </td>
                                                        <td style="padding-left: 2px; font-weight: bold; display: none;">
                                                            UM Venta
                                                        </td>
                                                        <td style="padding-left: 27px; display: none;">
                                                            <div id="div_umventa">
                                                                <asp:DropDownList ID="ddlUMVenta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                    Font-Bold="True" Width="78">
                                                                </asp:DropDownList>
                                                            </div>
                                                        </td>
                                                        <td style="padding-left: 2px; font-weight: bold; display: none;">
                                                            Descuento
                                                        </td>
                                                        <td style="padding-left: 16px; display: none;">
                                                            <asp:TextBox ID="txtDescuento" runat="server" Width="75px" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Text="0"></asp:TextBox>
                                                        </td>
                                                        <td style="font-weight: bold; display: none">
                                                            CODIGO 2
                                                        </td>
                                                        <td style="padding-left: 23px; display: none">
                                                            <asp:TextBox ID="txtCodigo2" runat="server" Width="245px" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True"></asp:TextBox>
                                                        </td>
                                                        <td>
                                                            <div id="div_Familia">
                                                                <asp:DropDownList ID="ddlFamilia" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                    Font-Bold="True" Width="600">
                                                                </asp:DropDownList>
                                                            </div>
                                                        </td>
                                                        <td style="font-weight: bold; display: none;">
                                                            Partida Arancelaria
                                                        </td>
                                                        <td>
                                                            <asp:TextBox ID="txtPartidaArancelaria" runat="server" Width="192px" Font-Names="Arial"
                                                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: bold; display: none;">
                                                Desc. Ingles
                                            </td>
                                            <td style="padding-left: 4px; display: none;">
                                                <asp:TextBox ID="txtDescripcionIngles" runat="server" Width="534px" Font-Names="Arial"
                                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: bold; display: none;">
                                                Marca
                                            </td>
                                            <td colspan='5' style="padding-left: 4px; display: none;">
                                                <asp:TextBox ID="txtMarca" runat="server" Width="534px" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: bold; display: none;">
                                                Modelo
                                            </td>
                                            <td colspan='5' style="padding-left: 4px; display: none;">
                                                <asp:TextBox ID="txtModelo" runat="server" Width="534px" Font-Names="Arial" ForeColor="Blue"
                                                    Font-Bold="True"></asp:TextBox>
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
                                                            <asp:TextBox ID="txtMedida" runat="server" Width="211px" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True"></asp:TextBox>
                                                        </td>
                                                        <td style="font-weight: bold">
                                                            Posicion
                                                        </td>
                                                        <td style="padding-left: 15px;">
                                                            <asp:TextBox ID="txtPosicion" runat="server" Width="248px" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True"></asp:TextBox>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </td>
                        <td style="vertical-align: top">
                            <%--IMAGEN--%>
                            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 350px;
                                height: 350px">
                                <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                    IMAGEN DEL PRODUCTO</div>
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
                                                <div id="drop" style="padding-top: 5px;">
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="linea-button">
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
                    <table cellpadding="0" cellspacing="0" class="form-inputs">
                        <tr>
                            <td style="font-weight: bold; display: none;">
                                familia
                            </td>
                            <td style="display: none;">
                                <div id="div_familiaconsulta">
                                    <asp:DropDownList ID="ddlFamiliaConsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True">
                                    </asp:DropDownList>
                                </div>
                            </td>
                            <td style="font-weight: bold">
                                Codigo / Producto
                            </td>
                            <td>
                                <asp:TextBox ID="txtDescripcionConsulta" runat="server" Width="430" Font-Names="Arial"
                                    ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                            </td>
                            <td>
                                <asp:CheckBox ID="chkFiltroMoleta" runat="server" Text="Filtrar Por Moleta" Font-Bold="True" />
                            </td>
                            <td>
                                <asp:TextBox ID="txtFiltroMoleta" runat="server" Width="100" Font-Names="Arial" ForeColor="Blue"
                                    Font-Bold="True"></asp:TextBox>
                            </td>
                            <td style="font-weight: bold;">
                                Bloqueados
                            </td>
                            <td>
                                <div id="div_Bloqueados">
                                    <asp:DropDownList ID="ddlBloqueados" runat="server" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Width="100">
                                        <asp:ListItem Value="-1" Text="TODOS" Selected="True"></asp:ListItem>
                                        <asp:ListItem Value="1" Text="BLOQUEADOS"></asp:ListItem>
                                        <asp:ListItem Value="0" Text="NO BLOQUEADOS"></asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                            </td>
                            <td style="font-weight: bold; display: none;">
                                Stock
                            </td>
                            <td style="display: none;">
                                <div id="div_StockConsulta">
                                    <asp:DropDownList ID="ddlStockconsulta" runat="server" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Width="70">
                                        <asp:ListItem Value="0" Text="TODOS" Selected="True"></asp:ListItem>
                                        <asp:ListItem Value="1" Text="CON STOCK"></asp:ListItem>
                                        <asp:ListItem Value="2" Text="SIN STOCK"></asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="linea-button">
                    <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar" CssClass="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        Font-Names="Arial" Font-Bold="True" Width="120" />
                </div>
            </div>
            <div>
                <table class="GridView" style="padding-top: 5px; padding-bottom: 0px; margin-bottom: 5px">
                    <tr>
                        <th scope="col" style="width: 58px;">
                            &nbsp;
                        </th>
                        <th align="center" scope="col" style="width: 98px;">
                            CODIGO
                        </th>
                        <th align="center" scope="col">
                            DESCRIPCION
                        </th>
                        <th align="center" scope="col" style="width: 48px">
                            Stock
                        </th>
                        <th align="center" scope="col" style="width: 48px">
                            Costo
                        </th>
                        <th align="center" scope="col" style="width: 48px">
                            MAYORI
                        </th>
                        <th align="center" scope="col" style="width: 48px">
                            Marg %
                        </th>
                        <th align="center" scope="col" style="width: 48px">
                            MINORI
                        </th>
                        <th align="center" scope="col" style="width: 48px">
                            Marg %
                        </th>
                        <th align="center" scope="col" style="width: 48px">
                            Moleta
                        </th>
                        <th align="center" scope="col" style="width: 28px">
                            UM
                        </th>
                        <th align="center" scope="col" style="width: 48px">
                            Estado
                        </th>
                        <th scope="col" style="width: 7px">
                            &nbsp;
                        </th>
                    </tr>
                </table>
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
            <div id="div_consulta" style="overflow-y: scroll; height: 315px;">
                <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" border="0"
                    CellPadding="0" CellSpacing="1" CssClass="GridView" GridLines="None" DataKeyNames="ID"
                    OnRowDataBound="grvDetalleArticulo_RowDataBound" ShowHeader="false">
                    <Columns>
                        <asp:TemplateField ItemStyle-Width="60">
                            <ItemStyle HorizontalAlign="Center" />
                            <ItemTemplate>
                                <asp:ImageButton runat="server" ID="imgEditarRegistro" ImageUrl="../Asset/images/btnEdit.gif"
                                    ToolTip="Editar Producto" OnClientClick="F_EditarRegistro(this); return false;" CssClass="detallesart" />
                                <asp:ImageButton runat="server" ID="imgAgregarArticulosRelacionados" ImageUrl="../Asset/images/texto.png"
                                    ToolTip="Agregar Artículos Relacionados" OnClientClick="F_ArticulosRelacionados(this); return false;" />
                                <asp:ImageButton runat="server" ID="imgVisualizarRegistro" ImageUrl="../Asset/images/Viewx16.png"
                                    ToolTip="Visualizar Producto" OnClientClick="F_VisualizarRegistro(this); return false;" />
                                <asp:HiddenField ID="hfCodProducto" runat="server" Value='<%# Bind("ID") %>'  />
                                <asp:HiddenField ID="hfDescripcion" runat="server" Value='<%# Bind("Descripcion") %>' />
                                <asp:HiddenField ID="hfCodigo" runat="server" Value='<%# Bind("Codigo") %>' />
                                <asp:HiddenField ID="hfFlagBloqueoMayorista" runat="server" Value='<%# Bind("FlagBloqueoMayorista") %>' />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="CODIGO" HeaderText="CODIGO" ItemStyle-Width="100px">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="DESCRIPCION" HeaderText="DESCRIPCION">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Left" />
                        </asp:BoundField>
                        <asp:BoundField DataField="StockActual" HeaderText="Stock" DataFormatString="{0:N2}"
                            ItemStyle-Width="50px">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="CostoUniProducto" HeaderText="Costo" DataFormatString="{0:N2}"
                            ItemStyle-Width="50px">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="PRECIOMAYORISTA" HeaderText="MAYORISTA" DataFormatString="{0:N2}"
                            ItemStyle-Width="50px">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="MargenMayorista" HeaderText="Margen %" ItemStyle-Width="50px">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="PRECIO" HeaderText="MINORISTA" DataFormatString="{0:N2}"
                            ItemStyle-Width="50px">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Margen" HeaderText="Margen %" ItemStyle-Width="50px">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Right" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Moleta" HeaderText="Moleta" ItemStyle-Width="50px">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" BackColor="LightGreen" />
                        </asp:BoundField>
                        <asp:BoundField DataField="UM" HeaderText="UM" ItemStyle-Width="30px">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                        <asp:BoundField DataField="Estado" HeaderText="Estado" ItemStyle-Width="50px">
                            <HeaderStyle HorizontalAlign="Center" />
                            <ItemStyle HorizontalAlign="Center" />
                        </asp:BoundField>
                    </Columns>
                </asp:GridView>
            </div>
        </div>
    </div>
    <div id="divEdicionRegistro" style="display: none;">
        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
            <table>
                <tr>
                    <td style="vertical-align: top">
                        <div style="width: 735px;" class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                DATOS PRODUCTO
                            </div>
                            <div class="ui-jqdialog-content">
                                <table cellpadding="0" cellspacing="0" class="form-inputs">
                                    <tr>
                                        <td style="font-weight: bold; width: 110px">
                                            Codigo
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtCodigoProductoEdicion" runat="server" Width="200px" Font-Names="Arial"
                                                ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold">
                                            Descripcion
                                        </td>
                                        <td style="padding: 0 0 0 0">
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <asp:TextBox ID="txtDescripcionEdicion" runat="server" Width="430px" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold;">
                                                        Moneda
                                                    </td>
                                                    <td>
                                                        <div id="div_MonedaEdicion">
                                                            <asp:DropDownList ID="ddlMonedaEdicion" runat="server" Font-Names="Arial" Width="105"
                                                                ForeColor="Blue" Font-Bold="True">
                                                            </asp:DropDownList>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold">
                                            Costo Dolar
                                        </td>
                                        <td style="padding: 0 0 0 0">
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <asp:TextBox ID="txtCostoEdicion" runat="server" Width="80px" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold; padding-left: 20px;">
                                                        tipo cambio
                                                    </td>
                                                    <td style="padding-left: 21px;">
                                                        <asp:TextBox ID="txtTCEdicion" runat="server" Width="34px" Font-Names="Arial" ForeColor="Blue"
                                                            CssClass="Derecha" Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold; padding-left: 12px">
                                                        costo sol
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtCostoSolesEdicion" runat="server" Width="80px" Font-Names="Arial"
                                                            CssClass="Derecha" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold; padding-left: 10px">
                                                        Precio Minorista
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtPrecioEdicion" runat="server" Width="80px" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold">
                                            Margen Minorista
                                        </td>
                                        <td style="padding: 0 0 0 0">
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <asp:TextBox ID="txtMargenEdicion" runat="server" Width="34px" Font-Names="Arial"
                                                            ForeColor="Blue" CssClass="Derecha" Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold; padding-left: 6px">
                                                        precio Mayorista
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtPrecioMayoristaEdicion" runat="server" Width="80px" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold; padding-left: 11px">
                                                        margen Mayorista
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtMargenMayoristaEdicion" runat="server" Width="34px" Font-Names="Arial"
                                                            CssClass="Derecha" ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="padding-left: 4px">
                                                        <asp:CheckBox ID="chkSIEdicion" runat="server" Text="SI" Font-Bold="True" onclick="F_ValidarCheckMayoristaSINOEdicion(this.id);"
                                                            ForeColor="Red" />
                                                    </td>
                                                    <td>
                                                        <asp:CheckBox ID="chkNOEdicion" runat="server" Text="NO" Font-Bold="True" onclick="F_ValidarCheckMayoristaSINOEdicion(this.id);"
                                                            ForeColor="Red" />
                                                    </td>
                                                    <td style="font-weight: bold; padding-left: 16PX;">
                                                        UM
                                                    </td>
                                                    <td>
                                                        <div id="div_CompraEdicion">
                                                            <asp:DropDownList ID="ddlCompraEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Width="84px">
                                                            </asp:DropDownList>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">
                                            Ubicacion
                                        </td>
                                        <td style="padding: 0 0 0 0">
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <asp:TextBox ID="txtUbicacionEdicion" runat="server" Width="80px" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold; padding-left: 31px">
                                                        PESO
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtPesoEdicion" runat="server" Width="80px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True" CssClass="Derecha"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold; padding-left: 11px">
                                                        UM Peso
                                                    </td>
                                                    <td style="padding-left: 58px">
                                                        <div id="div_PesoEdicion">
                                                            <asp:DropDownList ID="ddlPesoEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Width="40">
                                                            </asp:DropDownList>
                                                        </div>
                                                    </td>
                                                    <td style="font-weight: bold; padding-left: 11px">
                                                        Moleta
                                                    </td>
                                                    <td style="padding-left: 57px;">
                                                        <asp:TextBox ID="txtMoletaEdicion" runat="server" Width="80px" Font-Names="Arial"
                                                            ForeColor="Blue" Font-Bold="True" Text="0" CssClass="Derecha"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                      <td style="padding-left: 5px; font-weight: bold;">
                                Estado
                            </td>
                            <td>
                            <table>
                            <tr>
                                                           <td style="font-weight: bold;">
                                <div id="div_FiltroEstadosEdicion">
                                    <asp:DropDownList ID="ddlFiltroCodEstadoEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                        Font-Bold="True" Width="78">                               
                                        <asp:ListItem Value="1">Activo</asp:ListItem>
                                        <asp:ListItem Value="2">Inactivo</asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                            </td>

                                        <td>
                                            <asp:CheckBox ID="chkBloqueoMayoristaEdicion" runat="server" Text="Bloqueo Mayorista"
                                                Font-Bold="True" ForeColor="Red" />
                                        </td>
                            </tr>
                            </table>
                            </td>
                         
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; display: none;">
                                            Costo Con Igv S/
                                        </td>
                                        <td>
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="padding-left: 2px; font-weight: bold; display: none;">
                                                        Stock Min.
                                                    </td>
                                                    <td style="padding-left: 14px; display: none;">
                                                        <asp:TextBox ID="TextBox12" runat="server" Width="75px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True" Text="0"></asp:TextBox>
                                                    </td>
                                                    <td style="padding-left: 2px; font-weight: bold; display: none;">
                                                        Stock Max.
                                                    </td>
                                                    <td style="padding-left: 16px; font-weight: bold; display: none;">
                                                        <asp:TextBox ID="TextBox13" runat="server" Width="74px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True" Text="0"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; display: none;">
                                            Familia
                                        </td>
                                        <td style="display: none;">
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="display: none">
                                                        <asp:CheckBox ID="CheckBox3" runat="server" Text="Valida Inventario" Font-Bold="True" />
                                                    </td>
                                                    <td style="display: none">
                                                        <asp:CheckBox ID="CheckBox4" runat="server" Text="Incluye Igv Mayorista" Font-Bold="True" />
                                                    </td>
                                                    <td style="font-weight: bold; display: none">
                                                        Cod Superior
                                                    </td>
                                                    <td style="padding-left: 4px; display: none">
                                                        <asp:TextBox ID="TextBox14" runat="server" Width="586px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold; display: none;">
                                                        Año
                                                    </td>
                                                    <td style="padding-left: 4px; display: none;">
                                                        <asp:TextBox ID="TextBox15" runat="server" Width="211px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="padding-left: 2px; font-weight: bold; display: none;">
                                                        UM Venta
                                                    </td>
                                                    <td style="padding-left: 27px; display: none;">
                                                        <div id="div_VentaEdicion">
                                                            <asp:DropDownList ID="ddlVentaEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Width="78">
                                                            </asp:DropDownList>
                                                        </div>
                                                    </td>
                                                    <td style="padding-left: 2px; font-weight: bold; display: none;">
                                                        Descuento
                                                    </td>
                                                    <td style="padding-left: 16px; display: none;">
                                                        <asp:TextBox ID="TextBox16" runat="server" Width="75px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True" Text="0"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold; display: none">
                                                        CODIGO 2
                                                    </td>
                                                    <td style="padding-left: 23px; display: none">
                                                        <asp:TextBox ID="TextBox17" runat="server" Width="245px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td>
                                                        <div id="div_FamiliaEdicion">
                                                            <asp:DropDownList ID="ddlFamiliaEdicion" runat="server" Font-Names="Arial" ForeColor="Blue"
                                                                Font-Bold="True" Width="600">
                                                            </asp:DropDownList>
                                                        </div>
                                                    </td>
                                                    <td style="font-weight: bold; display: none;">
                                                        Partida Arancelaria
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="TextBox18" runat="server" Width="192px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; display: none;">
                                            Desc. Ingles
                                        </td>
                                        <td style="padding-left: 4px; display: none;">
                                            <asp:TextBox ID="TextBox19" runat="server" Width="534px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; display: none;">
                                            Marca
                                        </td>
                                        <td colspan='5' style="padding-left: 4px; display: none;">
                                            <asp:TextBox ID="TextBox20" runat="server" Width="534px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; display: none;">
                                            Modelo
                                        </td>
                                        <td colspan='5' style="padding-left: 4px; display: none;">
                                            <asp:TextBox ID="TextBox21" runat="server" Width="534px" Font-Names="Arial" ForeColor="Blue"
                                                Font-Bold="True"></asp:TextBox>
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
                                                        <asp:TextBox ID="TextBox22" runat="server" Width="211px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                    <td style="font-weight: bold">
                                                        Posicion
                                                    </td>
                                                    <td style="padding-left: 15px;">
                                                        <asp:TextBox ID="TextBox23" runat="server" Width="248px" Font-Names="Arial" ForeColor="Blue"
                                                            Font-Bold="True"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </td>
                    <%--IMAGEN--%>
                    <td style="vertical-align: top">
                        <%--IMAGEN--%>
                        <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 350px;
                            height: 350px">
                            <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix"
                                style="width: 350px">
                                IMAGEN DEL PRODUCTO</div>
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
        <div class="linea-button">
            <asp:Button ID="btnEdicion" runat="server" Text="Grabar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                Font-Names="Arial" Font-Bold="True" Width="120px" />
        </div>
    </div>
    <%--PRODUCTOS RELACIONADOS--%>
    <div id="divProductosRelacionados" class="wrapper" style="display: none;">
        <table>
            <tr style="max-height: 100px;">
                <td>
                    <%--CAMPOS --%>
                    <div>
                        <table>
                            <tr>
                                <td style="font-weight: bold; width: 50px; text-align: right">
                                    Principal
                                </td>
                                <td colspan='5'>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <input id="hfCodigoArticuloPrincipal" type="hidden" value="0" />
                                                <asp:TextBox ID="txtArticuloPrincipal" runat="server" Width="780px" Font-Names="Arial"
                                                    ForeColor="Blue" Font-Bold="True" ReadOnly="true"></asp:TextBox>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold; width: 50px; text-align: right">
                                    Articulo
                                </td>
                                <td colspan='5'>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <input id="hfCodigoArticuloRelacionado" type="hidden" value="0" />
                                                <asp:TextBox ID="txtArticuloRelacionado" runat="server" Width="780px" Font-Names="Arial"
                                                    ForeColor="Blue" Font-Bold="True" ReadOnly="false"></asp:TextBox>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold; width: 50px; text-align: right">
                                    Peso
                                </td>
                                <td colspan='5'>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <asp:TextBox ID="txtPesoArticuloRelacionado" runat="server" Width="50px" Font-Names="Arial"
                                                    ForeColor="Blue" Font-Bold="True" ReadOnly="false"></asp:TextBox>
                                            </td>
                                            <td>
                                                <asp:ImageButton ID="ImageButton1" runat="server" Width="15px" Font-Names="Adrial"
                                                    Text="Agregar" ForeColor="Blue" Font-Bold="true" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                                    ImageUrl="~/Asset/images/ok.gif" ToolTip="Agregar" OnClientClick="F_AgregarArticulosRelacionados(); return false;">
                                                </asp:ImageButton>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <ul id="Ul1" class="ul-float">
                    </ul>
                </td>
            </tr>
        </table>
        <div id="divProductosRelacionadosListado">
            <table>
                <tr>
                    <td>
                        Código
                    </td>
                    <td>
                        Descripción
                    </td>
                    <td>
                        UM
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="divProductosRelacionadosEditar" class="wrapper" style="display: none;">
        <table>
            <tr style="max-height: 100px;">
                <td>
                    <%--CAMPOS --%>
                    <div>
                        <table>
                            <tr>
                                <td style="font-weight: bold; width: 50px; text-align: right">
                                    Peso
                                </td>
                                <td colspan='5'>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <input id="hfCodArticuloRelacionadoEdicion" type="hidden" value="0" />
                                                <asp:TextBox ID="txtPesoArticuloRelacionadoEdicion" runat="server" Width="50px" Font-Names="Arial"
                                                    ForeColor="Blue" Font-Bold="True" ReadOnly="false"></asp:TextBox>
                                            </td>
                                            <td>
                                                <asp:ImageButton ID="ImageButton2" runat="server" Width="15px" Font-Names="Adrial"
                                                    Text="Agregar" ForeColor="Blue" Font-Bold="true" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                                                    ImageUrl="~/Asset/images/ok.gif" ToolTip="Agregar" OnClientClick="F_EditarArticuloRelacionado(); return false;">
                                                </asp:ImageButton>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <ul id="Ul2" class="ul-float">
                    </ul>
                </td>
            </tr>
        </table>
    </div>
    <%--VISUALIZACION DE IMAGENES--%>
    <div id="divVisualizarImagen" class="wrapper" style="display: none;">
        <table>
            <tr style="max-height: 100px;">
                <td>
                    <%--CAMPOS --%>
                    <div>
                        <table>
                            <tr>
                                <td style="font-weight: bold; width: 50px; text-align: right">
                                    Código
                                </td>
                                <td colspan='5'>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <asp:TextBox ID="txtCodigoVisualizacion" runat="server" Width="100px" Font-Names="Arial"
                                                    ForeColor="Blue" Font-Bold="True" ReadOnly="true"></asp:TextBox>
                                            </td>
                                            <td style="font-weight: bold; width: 80px; text-align: right">
                                                Descripcion
                                            </td>
                                            <td style="padding-left: 5px;">
                                                <asp:TextBox ID="txtDescripcionVisualizacion" runat="server" Width="400px" Font-Names="Arial"
                                                    ForeColor="Blue" Font-Bold="True" ReadOnly="true"></asp:TextBox>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <ul id="luImagenes" class="ul-float">
                    </ul>
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
    <input id="hfCodProducto" type="hidden" value="0" />
    <input id="hfMoneda" type="hidden" value="0" />
    <input id="hfCodSede" type="hidden" value="0" />
    <input id="hfCodigoSuperior" type="hidden" value="0" />
    <input id="hfCodigoSuperiorEdicion" type="hidden" value="0" />
    <input id="hfCodTransportista" type="hidden" value="0" />
    <input id="hdCodProductoPrincipal" type="hidden" value="0" />
    <input id="hfCodProductoRelacionado" type="hidden" value="0" />
    <input id="hfIgv" type="hidden" value="0" />
</asp:Content>
