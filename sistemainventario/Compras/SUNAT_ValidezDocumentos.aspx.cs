using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data;
using System.Collections;
using System.Configuration;
using CapaNegocios;
using CapaEntidad;
using SistemaInventario.Clases;
using EasyCallback;
using Newtonsoft.Json;
using System.Web.Services;
using System.Net;
using System.IO;

namespace SistemaInventario.Compras
{
    public partial class SUNAT_ValidezDocumentos : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            CallbackManager.Register(F_Controles_Inicializar_NET);
            CallbackManager.Register(F_Buscar_NET);
        }

        private string _menu = "10000"; private string _opcion = "200001";
        protected void Page_Load(object sender, EventArgs e)
        {
            String Menu = Request.QueryString["Mn"]; String Opcion = Request.QueryString["Op"];
            Utilitarios.Menu.EstablecerPermisos(int.Parse(Session["CodUsuario"].ToString()));
            Utilitarios.Menu.ModificarAccesos((System.Web.UI.WebControls.Menu)Master.FindControl("NavigationMenu"), Convert.ToInt32((Session["CodUsuario"])));
            Session["datos"] = true;
            P_Inicializar_GrillaVacia_ConsultaFactura();
        }


        public void P_Inicializar_GrillaVacia_ConsultaFactura()
        {
            DataTable dta_consulta = null;
            DataRow dtr_filaconsulta = null;

            dta_consulta = new DataTable();

            dta_consulta.Columns.Add("ID", typeof(string));
            dta_consulta.Columns.Add("CodCtaCte", typeof(string));
            dta_consulta.Columns.Add("Almacen", typeof(string));
            dta_consulta.Columns.Add("RucEmpresa", typeof(string));
            dta_consulta.Columns.Add("TD", typeof(string));
            dta_consulta.Columns.Add("CodTipoComprobante", typeof(string));
            dta_consulta.Columns.Add("Serie", typeof(string));
            dta_consulta.Columns.Add("FechaEmision", typeof(string));
            dta_consulta.Columns.Add("NroDocumento", typeof(string));
            dta_consulta.Columns.Add("EstadoSunat", typeof(string));
            dta_consulta.Columns.Add("Emp", typeof(string));
            dta_consulta.Columns.Add("Codigo", typeof(string));
            dta_consulta.Columns.Add("RazonSocial", typeof(string));
            dta_consulta.Columns.Add("Documento", typeof(string));
            dta_consulta.Columns.Add("Numero", typeof(string));
            dta_consulta.Columns.Add("Emision", typeof(string));
            dta_consulta.Columns.Add("Ingreso", typeof(string));
            dta_consulta.Columns.Add("Vcto", typeof(string));
            dta_consulta.Columns.Add("Moneda", typeof(string));
            dta_consulta.Columns.Add("Dscto", typeof(string));
            dta_consulta.Columns.Add("SubTotal", typeof(string));
            dta_consulta.Columns.Add("Igv", typeof(string));
            dta_consulta.Columns.Add("Total", typeof(string));
            dta_consulta.Columns.Add("TipoCambio", typeof(string));
            dta_consulta.Columns.Add("Anexo", typeof(string));
            dta_consulta.Columns.Add("Estado", typeof(string));
            dta_consulta.Columns.Add("Condicion", typeof(string));
            dta_consulta.Columns.Add("Periodo", typeof(string));
            dta_consulta.Columns.Add("FechaCancelacion", typeof(string));
            dta_consulta.Columns.Add("Saldo", typeof(string));
            dta_consulta.Columns.Add("CodTipoDoc", typeof(string));
            dta_consulta.Columns.Add("CodMoneda", typeof(string));
            dta_consulta.Columns.Add("FechaUltimaValidacionSunat", typeof(string));
            dta_consulta.Columns.Add("CerradoConsultaSunat", typeof(string));
            dta_consulta.Columns.Add("Validacion", typeof(string));
            dtr_filaconsulta = dta_consulta.NewRow();

            dtr_filaconsulta[0] = "";
            dtr_filaconsulta[1] = "";
            dtr_filaconsulta[2] = "";
            dtr_filaconsulta[3] = "";
            dtr_filaconsulta[4] = "";
            dtr_filaconsulta[5] = "";
            dtr_filaconsulta[6] = "";
            dtr_filaconsulta[7] = "";
            dtr_filaconsulta[8] = "";
            dtr_filaconsulta[9] = "";
            dtr_filaconsulta[10] = "";
            dtr_filaconsulta[11] = "";
            dtr_filaconsulta[12] = "";
            dtr_filaconsulta[13] = "";
            dtr_filaconsulta[14] = "";
            dtr_filaconsulta[15] = "";
            dtr_filaconsulta[16] = "";
            dtr_filaconsulta[17] = "";
            dtr_filaconsulta[18] = "";
            dtr_filaconsulta[19] = "";
            dta_consulta.Rows.Add(dtr_filaconsulta);

            grvConsulta.DataSource = dta_consulta;
            grvConsulta.DataBind();
        }


        public String F_Controles_Inicializar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_ddl_sucursal_html = "";
            int int_resultado_operacion = 0;
            Hashtable obj_parametros = null;
            string Token = "";
            string Link = "";
            string UrlServerPeticionLocal = "";
            string NroRucEmpresa = "";
            string Token_Empresa = "";

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);

                P_Controles_Inicializar(obj_parametros, ref ddlSucursal);

                str_ddl_sucursal_html = Mod_Utilitario.F_GetHtmlForControl(ddlSucursal);

                int_resultado_operacion = 1;
                str_mensaje_operacion = "";
            }
            catch (Exception ex)
            {
                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;
            }

            str_resultado =
                Convert.ToString(int_resultado_operacion) + "~" +
                str_mensaje_operacion + "~" +
                str_ddl_sucursal_html + "~" +
                Token + "~" +
                Link + "~" +
                UrlServerPeticionLocal + "~" +
                NroRucEmpresa + "~" + 
                Token_Empresa;

            return str_resultado;
        }


        public String F_Buscar_NET(String arg)
        {
            String str_resultado = "";
            String str_mensaje_operacion = "";
            String str_grvConsulta_html = "";
            int int_resultado_operacion = 0;
            int cantidadRegistros = 0;
            Hashtable obj_parametros = null;

            try
            {
                obj_parametros = SistemaInventario.Clases.JsonSerializer.FromJson<Hashtable>(arg);
                P_Buscar(obj_parametros, ref grvConsulta);
                if (grvConsulta.Rows.Count == 0)
                {
                    P_Inicializar_GrillaVacia_ConsultaFactura();
                    str_mensaje_operacion = "No se encontro registros.";
                }
                else
                    str_mensaje_operacion = "";
                cantidadRegistros = grvConsulta.Rows.Count;

                str_grvConsulta_html = Mod_Utilitario.F_GetHtmlForControl(grvConsulta);
                int_resultado_operacion = 1;

            }
            catch (Exception ex)
            {

                str_mensaje_operacion = "Ha ocurrido el siguiente error: " + ex.Message;
                int_resultado_operacion = 0;

            }

            str_resultado =
                Convert.ToString(int_resultado_operacion)
                + "~" +
                str_mensaje_operacion
                + "~" +
                str_grvConsulta_html
                + "~" +
                cantidadRegistros;


            return str_resultado;

        }


        public void P_Controles_Inicializar(Hashtable objTablaFiltro, ref DropDownList combosucursal)
        {
            DataTable dta_consulta = null;

            int iCodEmpresa = 1;

            TCAlmacenCE objEntidadAlmacen = null;
            TCAlmacenCN objOperacionAlmacen = null;

            objEntidadAlmacen = new TCAlmacenCE();

            objEntidadAlmacen.CodEmpresa = iCodEmpresa;
            objEntidadAlmacen.CodAlmacen = 0;

            objOperacionAlmacen = new TCAlmacenCN();

            combosucursal.Items.Clear();

            dta_consulta = objOperacionAlmacen.F_TCAlmacen_Listar(objEntidadAlmacen);

            combosucursal.DataSource = dta_consulta;
            combosucursal.DataTextField = "DscAlmacen";
            combosucursal.DataValueField = "CodAlmacen";
            combosucursal.DataBind();

            ListItem iTodos = new ListItem("--TODOS--", "0");
            combosucursal.Items.Add(iTodos);
            
        }

        public void P_Buscar(Hashtable objTablaFiltro, ref GridView GrillaBuscar)
        {
            NotaIngresoSalidaCabCE objEntidad = null;
            NotaIngresoSalidaCabCN objOperacion = null;

            DataTable dta_consulta = null;

            objEntidad = new NotaIngresoSalidaCabCE();

            objEntidad.Desde = Convert.ToDateTime(objTablaFiltro["Filtro_Desde"]);
            objEntidad.Hasta = Convert.ToDateTime(objTablaFiltro["Filtro_Hasta"]);
            objEntidad.EstadoSunat = Convert.ToInt32(objTablaFiltro["Filtro_EstadoSunat"]);


            objOperacion = new NotaIngresoSalidaCabCN();

            dta_consulta = objOperacion.F_SUNAT_EstadoDocumentos(objEntidad);

            GrillaBuscar.DataSource = dta_consulta;
            GrillaBuscar.DataBind();
        }

        //public void prueba() {
        //     string result = "";
        //    try
        //    {
        //        var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://api.sunat.gob.pe/v1/contribuyente/contribuyentes/20547868839/validarcomprobante");
        //        httpWebRequest.ContentType = "application/json";
        //        httpWebRequest.Method = "POST";
        //        httpWebRequest.Headers.Add("Authorization", "Bearer eyJraWQiOiJhcGkuc3VuYXQuZ29iLnBlLmtpZDEwMSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OTc3MjZkYi1hODJmLTRhNjQtOTdlMS02MjJhZjlmMzdkY2EiLCJhdWQiOiJbe1wiYXBpXCI6XCJodHRwczpcL1wvYXBpLnN1bmF0LmdvYi5wZVwiLFwicmVjdXJzb1wiOlt7XCJpZFwiOlwiXC92MVwvY29udHJpYnV5ZW50ZVwvY29udHJpYnV5ZW50ZXNcIixcImluZGljYWRvclwiOlwiMFwiLFwiZ3RcIjpcIjAxMDAwMFwifV19XSIsIm5iZiI6MTYxNjY4Mzg5NCwiY2xpZW50SWQiOiI3OTc3MjZkYi1hODJmLTRhNjQtOTdlMS02MjJhZjlmMzdkY2EiLCJpc3MiOiJodHRwczpcL1wvYXBpLXNlZ3VyaWRhZC5zdW5hdC5nb2IucGVcL3YxXC9jbGllbnRlc2V4dHJhbmV0XC83OTc3MjZkYi1hODJmLTRhNjQtOTdlMS02MjJhZjlmMzdkY2FcL29hdXRoMlwvdG9rZW5cLyIsImV4cCI6MTYxNjY4NzQ5NCwiZ3JhbnRUeXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwiaWF0IjoxNjE2NjgzODk0fQ.tt6UAR5kMtOe9JqOUfv3aVkpBDDIq4aAFmgnxqo-ND72qz9-SiZsB8u_KusI57TiRIYrsvLR4TbbweWTbusvP49esFMYBGAZIH63CrZq7wroTWUnkrvrzFtQ5ZdrmW5Rf9fXK8D3OMdeDCUTKiL3AvMOuuRFaVZM2eRmPBRKf03XHDcKhHMp_bzqkafVgDfnwdY7T4oLp1GvLmqYC02x7IpT3R_MMeapvEcOrxwTjY0x48Go1t_G8EH8i7sAhb2DVhdnDNm0y2gHaHqEWrGNmyqc60rOaUk3mbXZVzOYkLX2L1IbaI98Cn1RCYI-mHCPeVwchvJidnaADkJBywZtnQ");
        //        //httpWebRequest.Headers.Add("Content-Type", "application/json");
        //        //httpWebRequest.Headers.Add("Cookie", "TS018e7c3c=014dc399cbe7920b4998e3965c165877011a44c396ff09964287a73cc49e8738359cd11d8b24eb0db961e0e397909e29aa9855e89e");
        //        
        //        using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
        //        {
        //            string strJSON = "{\r\n    \"numRuc\" : \"20605156372\",\r\n    \"codComp\" : \"01\",\r\n    \"numeroSerie\" : \"F001\",\r\n    \"numero\" : \"00010475\",\r\n    \"fechaEmision\" : \"08/03/2021\",\r\n    \"monto\" : 120\r\n}";
        //            streamWriter.Write(strJSON);
        //        }
        //
        //        var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
        //
        //        using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
        //        {
        //            result = streamReader.ReadToEnd();
        //        }
        //    }
        //    catch (Exception ex) { }
        //
        //
        //    //var client = new RestClient("https://api.sunat.gob.pe/v1/contribuyente/contribuyentes/20547868839/validarcomprobante");
        //    //client.Timeout = -1;
        //    //var request = new RestRequest(Method.POST);
        //    //request.AddHeader("Authorization", "Bearer eyJraWQiOiJhcGkuc3VuYXQuZ29iLnBlLmtpZDEwMSIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OTc3MjZkYi1hODJmLTRhNjQtOTdlMS02MjJhZjlmMzdkY2EiLCJhdWQiOiJbe1wiYXBpXCI6XCJodHRwczpcL1wvYXBpLnN1bmF0LmdvYi5wZVwiLFwicmVjdXJzb1wiOlt7XCJpZFwiOlwiXC92MVwvY29udHJpYnV5ZW50ZVwvY29udHJpYnV5ZW50ZXNcIixcImluZGljYWRvclwiOlwiMFwiLFwiZ3RcIjpcIjAxMDAwMFwifV19XSIsIm5iZiI6MTYxNjY4Mzg5NCwiY2xpZW50SWQiOiI3OTc3MjZkYi1hODJmLTRhNjQtOTdlMS02MjJhZjlmMzdkY2EiLCJpc3MiOiJodHRwczpcL1wvYXBpLXNlZ3VyaWRhZC5zdW5hdC5nb2IucGVcL3YxXC9jbGllbnRlc2V4dHJhbmV0XC83OTc3MjZkYi1hODJmLTRhNjQtOTdlMS02MjJhZjlmMzdkY2FcL29hdXRoMlwvdG9rZW5cLyIsImV4cCI6MTYxNjY4NzQ5NCwiZ3JhbnRUeXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwiaWF0IjoxNjE2NjgzODk0fQ.tt6UAR5kMtOe9JqOUfv3aVkpBDDIq4aAFmgnxqo-ND72qz9-SiZsB8u_KusI57TiRIYrsvLR4TbbweWTbusvP49esFMYBGAZIH63CrZq7wroTWUnkrvrzFtQ5ZdrmW5Rf9fXK8D3OMdeDCUTKiL3AvMOuuRFaVZM2eRmPBRKf03XHDcKhHMp_bzqkafVgDfnwdY7T4oLp1GvLmqYC02x7IpT3R_MMeapvEcOrxwTjY0x48Go1t_G8EH8i7sAhb2DVhdnDNm0y2gHaHqEWrGNmyqc60rOaUk3mbXZVzOYkLX2L1IbaI98Cn1RCYI-mHCPeVwchvJidnaADkJBywZtnQ");
        //    //request.AddHeader("Content-Type", "application/json");
        //    //request.AddHeader("Cookie", "TS018e7c3c=014dc399cbe7920b4998e3965c165877011a44c396ff09964287a73cc49e8738359cd11d8b24eb0db961e0e397909e29aa9855e89e");
        //    //request.AddParameter("application/json", "{\r\n    \"numRuc\" : \"20605156372\",\r\n    \"codComp\" : \"01\",\r\n    \"numeroSerie\" : \"F001\",\r\n    \"numero\" : \"00010475\",\r\n    \"fechaEmision\" : \"08/03/2021\",\r\n    \"monto\" : 120\r\n}", ParameterType.RequestBody);
        //    //IRestResponse response = client.Execute(request);
        //    //Console.WriteLine(response.Content);
        //
        //}
        //
    }
}