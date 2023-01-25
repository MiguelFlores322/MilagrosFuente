<%@ Page Title="Empleados" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Vendedores.aspx.cs" Inherits="SistemaInventario.Maestros.Vendedores" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../Asset/js/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery-ui-1.10.4.custom.min.js" type="text/javascript"></script>
    <script src="../Asset/js/jquery.timers.js" type="text/javascript"></script>
    <script src="../Asset/js/jq-ui/1.10.2/development-bundle/ui/i18n/jquery.ui.datepicker-es.js"type="text/javascript"></script>
 
    <script src="../Asset/js/autoNumeric-1.4.3.js" type="text/javascript"></script>
       <script src="../Asset/js/js.js" type="text/javascript"></script> 
       <script src="../Scripts/alertify.min.js" type="text/javascript"></script>
    <script src="../Scripts/utilitarios.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript"  src="Vendedores.js" charset="UTF-8"></script>

    <link href="../Asset/css/redmond/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Asset/css/Redmond/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
     <link href="../Asset/css/style.css" rel="stylesheet" type="text/css" />  
     <link href="../Asset/css/alertify.core.css" rel="stylesheet" type="text/css" /> 
     <link href="../Asset/css/alertify.default.css" rel="stylesheet" type="text/css" />

 </asp:Content>
 
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="titulo" >EMPLEADOS</div> 
                     <div id="divTabs">

                        <ul>
                            <li id="liRegistro"><a href="#tabRegistro">Registro</a></li>
                            <li id="liConsulta"><a href="#tabConsulta">Consulta</a></li>
                        </ul>

                        <div id="tabRegistro">
                               <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" style="width: 650px">
                                   <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                    REGISTRO DE EMPLEADOS
                                   </div>
                           
                                   <div >  
                                    <table  cellpadding="0" cellspacing="0" class="form-inputs">
                                             <tr>
                                                  <td style="font-weight: bold">
                                    TIPO EMPLEADO
                                    </td>

                                                  <td colspan='5'>
                                    <table  cellpadding="0" cellspacing="0" >
                                    <tr>
                                    <td>
                                     <div id="div_TipoEmpleado">
                                         <asp:DropDownList ID="ddlTipoEmpleado" runat="server" Font-Names="Arial"  ForeColor="Blue" Font-Bold="True" Width="192"> 
                                          </asp:DropDownList>
                                     </div>  
                                    </td>
                                    </tr>
                                    </table>
                                     
                                    </td>
                                             </tr>
                                    
                                             <tr>

                                                  <td   style="font-weight: bold">
                                    NRO  DNI  
                                     </td>

                                                  <td>
                                     <table  cellpadding="0" cellspacing="0" >
                                     <tr>
                                     <td>
                                   
                                     <asp:TextBox ID="txtNroDni" runat="server" Width="75px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"   CssClass = "Derecha"  MaxLength="8"></asp:TextBox>
                                     </td>
                                     
                                    <td   style="font-weight: bold">
                                    Nombre Completo
                                     </td>
                                          <td >
                             <asp:TextBox ID="txtNombreCompleto" runat="server"  Width="340px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True" ></asp:TextBox>
                             </td>
                                     </tr>
                                     </table>
                                     </td>

                                     
                                     </tr>
                                
                                             <tr>
   
                                         <td  style="font-weight: bold">
                                            COMISION %
                                         </td>

                                         <td colspan='5'>
                                        <table  cellpadding="0" cellspacing="0" >
                             <tr>

                            <td>
                                  <asp:TextBox ID="txtComision" runat="server"  Width="75px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"  CssClass = "Derecha" ></asp:TextBox>                        
                            </td>

                              <td  style="font-weight: bold;">
                             Ruta
                             </td>

                                 <td  style="padding-left:78px">
                               <div id="div_Ruta">
                                         <asp:DropDownList ID="ddlRuta" runat="server" Font-Names="Arial"  ForeColor="Blue" Font-Bold="True" Width="191"> 
                                          </asp:DropDownList>
                                     </div>  
                             </td>
                                 <td  style="font-weight: bold">
                             ESTADO
                             </td>

                                 <td  style="padding-left:2px">
                               <div id="div_Estado">
                                         <asp:DropDownList ID="ddlEstado" runat="server" Font-Names="Arial"  ForeColor="Blue" Font-Bold="True" Width="104"> 
                                          </asp:DropDownList>
                                     </div>  
                             </td>
                       
                                  
                                </tr>

                                </table>
                                         </td>

                                </tr>

                                             <tr>
                            <td>
                             <asp:CheckBox ID="chkUsuario" runat="server" Text="Usuario" Font-Bold="True" />
                            </td>

                            <td colspan='5'>
                            <table cellpadding="0" cellspacing="0">
                            <tr>
                             <td>
                                    <asp:TextBox ID="txtUsuario" runat="server" Width="146" Font-Names="Arial"
                                        ForeColor="Blue" Font-Bold="True" ReadOnly="True"></asp:TextBox>
                                    </td>
                                    <td style="font-weight: bold;padding-left:1px;">
                                            Clave
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtClave" runat="server" Width="90px" Font-Names="Arial" ForeColor="Blue"
                                                 Font-Bold="True" TextMode="Password"  ReadOnly="True" ></asp:TextBox>
                                        </td>
                                           <td>
                                             <asp:CheckBox ID="chkAdministrador" runat="server" Text="Administrador" Font-Bold="True" />
                                         </td>
                                        <td>
                                             <asp:CheckBox ID="chkAprobacionCredito" runat="server" Text="Aprobacion Credito" Font-Bold="True" />
                                         </td>
      
                            </tr>
                            </table>
                            </td>
                            </tr>

                                    </table>
                             
                            </div>     
                            
                               <div class="linea-button">
                               
                                     <asp:Button ID="btnNuevo" runat="server" Text="Nuevo"  
                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial"  Font-Bold="True"    Width="120px" />
                                     <asp:Button ID="btnGrabar" runat="server" Text="Grabar"  
                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial"  Font-Bold="True"   Width="120px"   />
                                    
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
                                                                          
                                           <td  style="font-weight: bold">
                                               Vendedor
                                             </td>
                                           
                                           <td>
                                                <asp:TextBox ID="txtDescripcionConsulta" runat="server" Width="772" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"  ></asp:TextBox>
                                             </td>

                                        </tr>

                                   

                                        </table>
                                                      
                            </div>

                            <div  class="linea-button">
                              <asp:Button ID="btnBuscarConsulta" runat="server" Text="Buscar"  
                                            class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                                    Font-Names="Arial"  Font-Bold="True"     Width="120" />
                            </div>
                        </div>
                            
                            <div id="div_consulta" style="padding-top:5px;" >
                                                    <asp:GridView ID="grvConsulta" runat="server" AutoGenerateColumns="False" 
                                                                  border="0" CellPadding="0" CellSpacing="1" CssClass="GridView"
                                                                  GridLines="None" Width="1017px" >
                                                                  
                                                <Columns>
                                                 
                                                      <asp:TemplateField>
                                                                <ItemTemplate>
                                                                    <asp:ImageButton runat="server" id="imgEditarRegistro" ImageUrl="../Asset/images/btnEdit.gif" ToolTip="EDITAR VENDEDOR" OnClientClick="F_EditarRegistro(this); return false;" />
                                                                </ItemTemplate>
                                                            </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="ID" >
                                                                <ItemStyle HorizontalAlign="Right" />
                                                                <ItemTemplate>
                                                                    <asp:Label runat="server" ID="lblCodVendedor" Text='<%# Bind("CodVendedor") %>'></asp:Label>
                                                                    <asp:HiddenField ID="hfCodRuta" runat="server" Value='<%# Bind("CodRuta") %>' />
                                                                    <asp:HiddenField ID="hfCodEstado" runat="server" Value='<%# Bind("CodEstado") %>' />
                                                                </ItemTemplate>
                                                    </asp:TemplateField>

                                                    <asp:TemplateField HeaderText="Dni" HeaderStyle-HorizontalAlign="Center">
                                                        <ItemStyle HorizontalAlign="Right" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblDni" Text='<%# Bind("Dni") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>

                                                     <asp:TemplateField HeaderText="Vendedor" HeaderStyle-HorizontalAlign ="Center" >
                                                        <ItemStyle HorizontalAlign="Left" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblVendedor" Text='<%# Bind("Vendedor") %>'></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>                                                    

                                                    <asp:BoundField DataField="Ruta" HeaderText="Ruta">
                                                    <HeaderStyle HorizontalAlign="Center" />
                                                    <ItemStyle HorizontalAlign="Left" />
                                                    </asp:BoundField>
                                                                         
                                                      <asp:TemplateField HeaderText="Comision %" HeaderStyle-HorizontalAlign ="Center" >
                                                        <ItemStyle HorizontalAlign="Right" />
                                                        <ItemTemplate>
                                                             <asp:Label runat="server" ID="lblComision" Text='<%# Bind("Comision") %>'></asp:Label>
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

      <div id="divEdicionRegistro" style="display:none;">
                            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all">
                                   <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">
                                    DATOS VENDEDOR
                                   </div>
                                  <div class="ui-jqdialog-content">
                               <table  cellpadding="0" cellspacing="0" class="form-inputs">
                                 <tr>
                                    <td>
                                    TIPO EMPLEADO
                                    </td>
                                    <td>
                                      <div id="div_TipoEmpleadoEdicion">
                                         <asp:DropDownList ID="ddlTipoEmpleadoEdicion" runat="server" Font-Names="Arial"  ForeColor="Blue" Font-Bold="True" Width="200"> 
                                          </asp:DropDownList>
                                     </div>  
                                    </td>
                                    </tr>
                                           <tr>

                                     <td   style="font-weight: bold">
                                    NRO  DNI  
                                     </td>

                                     <td style="padding-left:4px">
                                   
                                     <asp:TextBox ID="txtNroDniEdicion" runat="server" Width="75px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"   CssClass = "Derecha"  MaxLength="8"></asp:TextBox>
                                     </td>
                                     
                                    <td   style="font-weight: bold">
                                    Nombre Completo
                                     </td>
                                          <td >
                             <asp:TextBox ID="txtNombreCompletoEdicion" runat="server"  Width="350px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True" ></asp:TextBox>
                             </td>
                                     </tr>
                                
                                             <tr>
   
                                         <td  style="font-weight: bold">
                                            COMISION %
                                         </td>

                                         <td colspan='5'>
                                        <table  cellpadding="0" cellspacing="0" >
                             <tr>

                            <td>
                                  <asp:TextBox ID="txtComisionEdicion" runat="server"  Width="75px" Font-Names="Arial" ForeColor="Blue"  Font-Bold="True"  CssClass = "Derecha" ></asp:TextBox>                        
                            </td>

                              <td  style="font-weight: bold;padding-left:5px">
                             Ruta
                             </td>

                                 <td  style="padding-left:80px">
                               <div id="div_RutaEdicion">
                                         <asp:DropDownList ID="ddlRutaEdicion" runat="server" Font-Names="Arial"  ForeColor="Blue" Font-Bold="True" Width="200"> 
                                          </asp:DropDownList>
                                     </div>  
                             </td>
                                 <td  style="font-weight: bold">
                             ESTADO
                             </td>

                                 <td  style="padding-left:2px">
                               <div id="div_EstadoEdicion">
                                         <asp:DropDownList ID="ddlEstadoEdicion" runat="server" Font-Names="Arial"  ForeColor="Blue" Font-Bold="True" Width="104"> 
                                          </asp:DropDownList>
                                     </div>  
                             </td>
                       
                                  
                                </tr>

                                </table>
                                         </td>

                                </tr>
                                    </table>
                                    </div>

                                    <div  class="linea-button">
                                       <asp:Button ID="btnEdicion" runat="server" Text="Grabar"  
                                class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" 
                                        Font-Names="Arial"  Font-Bold="True"   Width="120px"   />
                                    </div>
                                </div>
                                </div>

      <div id="dlgWait" style="background-color:#CCE6FF; text-align:center; display:none;">
        <br /><br />
        <center><asp:Label ID="Label2" runat="server" Text="PROCESANDO..." Font-Bold="true" Font-Size="Large" style="text-align:center"></asp:Label></center>
        <br />
        <center><img alt="Wait..." src="../Asset/images/ajax-loader2.gif"/></center>
    </div>     

     <input id="hfCodVendedor" type="hidden"  value="0" />
 
</asp:Content>
