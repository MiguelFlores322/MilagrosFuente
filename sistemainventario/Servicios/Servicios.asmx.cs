using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Script.Services;
using CapaEntidad;
using CapaNegocios;
using System.Data;
using CapaDatos;

namespace SistemaInventario.App_Code
{
    /// <summary>
    /// Summary description for AutoComplete
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]

    public class Servicios : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public UsuarioCE KeepActiveSession()
        {
            bool SesionActiva = true;
            if (HttpContext.Current.Session["datos"] == null | Convert.ToInt32(HttpContext.Current.Session["CodUsuario"]) == 0)
                SesionActiva = false;

            UsuarioCE Usuario = new UsuarioCE();

            if (Convert.ToInt32(HttpContext.Current.Session["CodUsuario"]) > 0) {
                Usuario = (new UsuarioCN()).F_Usuario_Obtener(Convert.ToInt32(HttpContext.Current.Session["CodUsuario"]));

                HttpContext.Current.Session["FlagAdministrador"] = Usuario.FlagAdministrador.ToString();
                HttpContext.Current.Session["FlagCredito"] = Usuario.FlagCredito;
                HttpContext.Current.Session["FlagInicial"] = Usuario.FlagInicial;
               // HttpContext.Current.Session["CodSede"] = 0;
                HttpContext.Current.Session["Usuario"] = Usuario.NombreUsuario;
                HttpContext.Current.Session["Apellidos"] = Usuario.Apellidos;
                HttpContext.Current.Session["Nombre"] = Usuario.Nombre;
                HttpContext.Current.Session["Perfil"] = Usuario.Perfil;
                HttpContext.Current.Session["CodVendedor"] = Usuario.CodVendedor;

                DataTable dtEmpresa = (new TCAlmacenCN()).F_TCAlmacen_ObtenerDatos(Convert.ToInt32(HttpContext.Current.Session["CodAlmacen"]));

                HttpContext.Current.Session["CodEmpresa"] = Convert.ToInt32(dtEmpresa.Rows[0]["CodEmpresa"]);
                Usuario.CodEmpresa = Convert.ToInt32(dtEmpresa.Rows[0]["CodEmpresa"]);

                HttpContext.Current.Session["Empresa"] = dtEmpresa.Rows[0]["RazonSocial"];
                Usuario.Empresa = dtEmpresa.Rows[0]["RazonSocial"].ToString();

                HttpContext.Current.Session["Almacen"] = dtEmpresa.Rows[0]["DscAlmacen"];
                Usuario.Almacen = dtEmpresa.Rows[0]["DscAlmacen"].ToString();




                if (Usuario.IdImagen > 0) {
                    Session["ImagenUsuario"] = Usuario.ImagenUsuario;
                    Utilitarios.Menu.ImagenUsuario = (byte[])Usuario.ImagenUsuario;
                    Utilitarios.Menu.ImagenUsuarioNombre = Usuario.NombreUsuario + ".jpg";
                    Usuario.ImagenNombre = Usuario.NombreUsuario + ".jpg";
                    Utilitarios.Menu.F_ImagenUsuario();                                
                } else {
                    Utilitarios.Menu.ImagenUsuario = null;
                    Utilitarios.Menu.ImagenUsuarioNombre = "../Asset/images/mainuser.png";
                }
            }

            Usuario.ImagenUsuario = null; //debido a que el json no acepta una longitud de cadena demasiado grande
            Usuario.SesionActiva = SesionActiva;
            return Usuario;
        }

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_ListarClientes_AutoComplete(string NroRuc, string RazonSocial, int CodTipoCtaCte, int CodTipoCliente)
        {
            TCCuentaCorrienteCE objEntidad = new TCCuentaCorrienteCE();

            objEntidad.NroRuc = NroRuc;
            objEntidad.RazonSocial = RazonSocial;
            objEntidad.CodTipoCtacte = CodTipoCtaCte;
            objEntidad.CodTipoCliente = CodTipoCliente;

            DataTable dtTabla = null;
            TCCuentaCorrienteCN objOperacion = new TCCuentaCorrienteCN();
            dtTabla = objOperacion.F_TCCuentaCorriente_ListarClientes(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19},{20},{21},{22}",
                    dtTabla.Rows[i]["CodCtaCte"], dtTabla.Rows[i]["RazonSocial"], dtTabla.Rows[i]["Direccion"],
                    dtTabla.Rows[i]["DireccionEnvio"], dtTabla.Rows[i]["Distrito"], dtTabla.Rows[i]["CodDepartamento"], dtTabla.Rows[i]["CodProvincia"],
                    dtTabla.Rows[i]["CodDistrito"], dtTabla.Rows[i]["NroRuc"]
                    , dtTabla.Rows[i]["Descuento1"], dtTabla.Rows[i]["Descuento2"]
                    , dtTabla.Rows[i]["Descuento3"], dtTabla.Rows[i]["CodFormaPago"]
                    , dtTabla.Rows[i]["telefono"], dtTabla.Rows[i]["CodTransportista"]
                    , dtTabla.Rows[i]["Transportista"], dtTabla.Rows[i]["Descuento4"]
                    , dtTabla.Rows[i]["CodVendedor"], dtTabla.Rows[i]["Contacto"], dtTabla.Rows[i]["FlagIncluyeIgv"], dtTabla.Rows[i]["Comentario"]
                    , dtTabla.Rows[i]["Correo"], dtTabla.Rows[i]["Celular"]));
            return Lista.ToArray();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_ListarClientes_AutoComplete_Transportista(string NroRuc, string RazonSocial, int CodTipoCtaCte, int CodTipoCliente, int FlagTransportista)
        {
            TCCuentaCorrienteCE objEntidad = new TCCuentaCorrienteCE();

            objEntidad.NroRuc = NroRuc;
            objEntidad.RazonSocial = RazonSocial;
            objEntidad.CodTipoCtacte = CodTipoCtaCte;
            objEntidad.CodTipoCliente = CodTipoCliente;
            objEntidad.FlagTransportista = FlagTransportista;

            DataTable dtTabla = null;
            TCCuentaCorrienteCN objOperacion = new TCCuentaCorrienteCN();
            dtTabla = objOperacion.F_TCCuentaCorriente_ListarClientes(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19},{20}",
                    dtTabla.Rows[i]["CodCtaCte"], dtTabla.Rows[i]["RazonSocial"], dtTabla.Rows[i]["Direccion"],
                    dtTabla.Rows[i]["DireccionEnvio"], dtTabla.Rows[i]["Distrito"], dtTabla.Rows[i]["CodDepartamento"], dtTabla.Rows[i]["CodProvincia"],
                    dtTabla.Rows[i]["CodDistrito"], dtTabla.Rows[i]["NroRuc"]
                    , dtTabla.Rows[i]["Descuento1"], dtTabla.Rows[i]["Descuento2"]
                    , dtTabla.Rows[i]["Descuento3"], dtTabla.Rows[i]["CodFormaPago"]
                    , dtTabla.Rows[i]["telefono"], dtTabla.Rows[i]["CodTransportista"]
                    , dtTabla.Rows[i]["Transportista"], dtTabla.Rows[i]["Descuento4"]
                    , dtTabla.Rows[i]["CodVendedor"], dtTabla.Rows[i]["Contacto"], dtTabla.Rows[i]["FlagIncluyeIgv"], dtTabla.Rows[i]["Comentario"]));
            return Lista.ToArray();
        }


        //nueva lista de clients para consumir en listas multiples
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<TCCuentaCorrienteCE> F_ListarClientes_AutoComplete_toList(string NroRuc, string RazonSocial, int CodTipoCtaCte, int CodTipoCliente)
        {
            TCCuentaCorrienteCE objEntidad = new TCCuentaCorrienteCE();
            List<TCCuentaCorrienteCE> lClientes = new List<TCCuentaCorrienteCE>();

            objEntidad.NroRuc = NroRuc;
            objEntidad.RazonSocial = RazonSocial;
            objEntidad.CodTipoCtacte = CodTipoCtaCte;
            objEntidad.CodTipoCliente = CodTipoCliente;

            DataTable dtTabla = null;
            TCCuentaCorrienteCN objOperacion = new TCCuentaCorrienteCN();
            dtTabla = objOperacion.F_TCCuentaCorriente_ListarClientes(objEntidad);
            List<string> Lista = new List<string>();

            foreach (DataRow r in dtTabla.Rows)
            {
                TCCuentaCorrienteCE nCli = new TCCuentaCorrienteCE();
                nCli.CodCtaCte = Convert.ToInt32(r["CodCtaCte"].ToString());
                nCli.RazonSocial = r["RazonSocial"].ToString();
                nCli.Direccion = r["Direccion"].ToString();
                nCli.DireccionEnvio = r["DireccionEnvio"].ToString();
                nCli.Distrito = r["Distrito"].ToString();
                nCli.CodDepartamento = Convert.ToInt32(r["CodDepartamento"].ToString());
                nCli.CodProvincia = Convert.ToInt32(r["CodProvincia"].ToString());
                nCli.CodDistrito = Convert.ToInt32(r["CodDistrito"].ToString());
                nCli.NroRuc = r["NroRuc"].ToString();
                nCli.CodTipoCtaCte = Convert.ToInt32(r["CodTipoCtaCte"].ToString());
                nCli.CodDireccion = Convert.ToInt32(r["CodDireccion"]);
                lClientes.Add(nCli);
            }
            return lClientes;
        }
        //grafico estadistico
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<DocumentoVentaCabCE> F_GRAFICO_ESTADISTICO_NET(int GraficoDesde, int GraficoHasta)
        {
            DocumentoVentaCabCN obj = new DocumentoVentaCabCN();
            try
            {
                DataTable dtDatos = obj.F_GRAFICO_ESTADISTICO_NET(GraficoDesde, GraficoHasta);
                List<DocumentoVentaCabCE> lDatos = new List<DocumentoVentaCabCE>();

                foreach (DataRow r in dtDatos.Rows)
                {
                    lDatos.Add(new DocumentoVentaCabCE()
                    {
                        Venta = Convert.ToDecimal(r["Venta"].ToString()),
                        Meses = r["Periodo"].ToString(),
                    });
                }


                return lDatos;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_ListarClientes2_AutoComplete(string NroRuc, string RazonSocial, int CodTipoCtaCte, int CodTipoCliente)
        {
            TCCuentaCorrienteCE objEntidad = new TCCuentaCorrienteCE();

            objEntidad.NroRuc = NroRuc;
            objEntidad.RazonSocial = RazonSocial;
            objEntidad.CodTipoCtacte = CodTipoCtaCte;
            objEntidad.CodTipoCliente = CodTipoCliente;

            DataTable dtTabla = null;
            TCCuentaCorrienteCN objOperacion = new TCCuentaCorrienteCN();
            dtTabla = objOperacion.F_TCCuentaCorriente_ListarClientes(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18}",
                    dtTabla.Rows[i]["CodCtaCte"], dtTabla.Rows[i]["RazonSocial"], dtTabla.Rows[i]["Direccion"],
                    dtTabla.Rows[i]["DireccionEnvio"], dtTabla.Rows[i]["Distrito"], dtTabla.Rows[i]["CodDepartamento"], dtTabla.Rows[i]["CodProvincia"],
                    dtTabla.Rows[i]["CodDistrito"], dtTabla.Rows[i]["NroRuc"]
                    , dtTabla.Rows[i]["Descuento1"], dtTabla.Rows[i]["Descuento2"]
                    , dtTabla.Rows[i]["Descuento3"], dtTabla.Rows[i]["CodFormaPago"]
                    , dtTabla.Rows[i]["telefono"], dtTabla.Rows[i]["CodTransportista"]
                    , dtTabla.Rows[i]["Transportista"], dtTabla.Rows[i]["Descuento4"]
                    , dtTabla.Rows[i]["CodVendedor"], dtTabla.Rows[i]["Contacto"]));
            return Lista.ToArray();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_TCCuentaCorriente_PadronSunat(string NroRuc)
        {
            TCCuentaCorrienteCE objEntidad = new TCCuentaCorrienteCE();
            TCCuentaCorrienteCN objOperacion = new TCCuentaCorrienteCN();
            List<string> Lista = new List<string>();
            DataTable dtTabla = null;
            objEntidad.RazonSocial = NroRuc;
            objEntidad.NroRuc = NroRuc;

            //Primero hago una busqueda en el propio sistema, no vaya a ser que ya
            //los datos existan y se haga una consulta en balde
            dtTabla = objOperacion.F_TCCuentaCorriente_ListarClientes(objEntidad);
            foreach (DataRow R in dtTabla.Rows)
                Lista.Add(string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12}", R["CodCtaCte"], R["RazonSocial"], R["Direccion"],
                    R["DireccionEnvio"], R["Distrito"], R["CodDepartamento"], R["CodProvincia"], R["CodDistrito"],
                    R["NroRuc"], R["ApePaterno"], R["ApeMaterno"], R["Nombres"], R["SaldoCreditoFavor"]));


            ////Si no encuentra nada en la tabla TCCuentaCorriente, prosigue a buscarlo en el padron sunat
            //if (dtTabla.Rows.Count == 0)
            //{
            //    dtTabla = objOperacion.F_TCCuentaCorriente_PadronSunat(objEntidad);

            //    //SI ENCUENTRA EN EL PADRON SUNAT PROCEDE A CREAR EL CLIENTE PARA SU UTILIZACION
            //    foreach (DataRow R in dtTabla.Rows)
            //    {
                    
            //        objEntidad.CodEmpresa = 3;
            //        objEntidad.CodTipoCtacte = 1; //Cliente
            //        objEntidad.CodTipoCliente = 2; //Juridica
            //        objEntidad.CodClaseCliente = 2;
            //        objEntidad.RazonSocial = R["RazonSocial"].ToString();
            //        objEntidad.NroRuc = R["Ruc"].ToString();
            //        objEntidad.CodigoUbigeo = R["CodigoUbigeo"].ToString();
            //        objEntidad.Direccion = R["Direccion"].ToString();
            //        objEntidad.CodUsuario = 1;
            //        objEntidad.Telefono = "";
            //        objEntidad.Correo = "";

            //        objOperacion.F_TCCuentaCorriente_Insert_Padron(objEntidad);

            //    }
            //    //Primero hago una busqueda en el propio sistema, no vaya a ser que ya
            //    //los datos existan y se haga una consulta en balde
            //    dtTabla = objOperacion.F_TCCuentaCorriente_ListarClientes(objEntidad);
            //    foreach (DataRow R in dtTabla.Rows)
            //        Lista.Add(string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12}", R["CodCtaCte"], R["RazonSocial"], R["Direccion"],
            //            R["DireccionEnvio"], R["Distrito"], R["CodDepartamento"], R["CodProvincia"], R["CodDistrito"],
            //            R["NroRuc"], "", "", "", 0));
            //}




            return Lista.ToArray();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_TCCuentaCorriente_PadronSunat_Milagros(string NroRuc)
        {
            TCCuentaCorrienteCE objEntidad = new TCCuentaCorrienteCE();
            TCCuentaCorrienteCN objOperacion = new TCCuentaCorrienteCN();
            List<string> Lista = new List<string>();
            DataTable dtTabla = null;
            objEntidad.RazonSocial = NroRuc;
            objEntidad.NroRuc = NroRuc;

            //Primero hago una busqueda en el propio sistema, no vaya a ser que ya
            //los datos existan y se haga una consulta en balde
            dtTabla = objOperacion.F_TCCuentaCorriente_ListarClientes(objEntidad);
            foreach (DataRow R in dtTabla.Rows)
                Lista.Add(string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16}", R["CodCtaCte"], R["RazonSocial"], R["Direccion"],
                    R["DireccionEnvio"], R["Distrito"], R["CodDepartamento"], R["CodProvincia"], R["CodDistrito"],
                    R["NroRuc"], R["ApePaterno"], R["ApeMaterno"], R["Nombres"], R["SaldoCreditoFavor"], R["FlagIncluyeIgv"], R["OBSERVACION"], R["Correo"], R["Celular"]));
            

            ////Si no encuentra nada en la tabla TCCuentaCorriente, prosigue a buscarlo en el padron sunat
            //if (dtTabla.Rows.Count == 0)
            //{
            //    dtTabla = objOperacion.F_TCCuentaCorriente_PadronSunat(objEntidad);

            //    //SI ENCUENTRA EN EL PADRON SUNAT PROCEDE A CREAR EL CLIENTE PARA SU UTILIZACION
            //    foreach (DataRow R in dtTabla.Rows)
            //    {

            //        objEntidad.CodEmpresa = 1;
            //        objEntidad.CodTipoCtacte = 1; //Cliente
            //        objEntidad.CodTipoCliente = 2; //Juridica
            //        objEntidad.CodClaseCliente = 2;
            //        objEntidad.RazonSocial = R["RazonSocial"].ToString();
            //        objEntidad.NroRuc = R["Ruc"].ToString();
            //        objEntidad.CodigoUbigeo = R["CodigoUbigeo"].ToString();
            //        objEntidad.Direccion = R["Direccion"].ToString();
            //        objEntidad.CodUsuario = 1;
            //        objEntidad.Telefono = "";
            //        objEntidad.Correo = "";

            //        objOperacion.F_TCCuentaCorriente_Insert_Padron(objEntidad);

            //    }

            //    //Primero hago una busqueda en el propio sistema, no vaya a ser que ya
            //    //los datos existan y se haga una consulta en balde
            //    dtTabla = objOperacion.F_TCCuentaCorriente_ListarClientes(objEntidad);
            //    foreach (DataRow R in dtTabla.Rows)
            //        Lista.Add(string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13}", R["CodCtaCte"], R["RazonSocial"], R["Direccion"],
            //            R["DireccionEnvio"], R["Distrito"], R["CodDepartamento"], R["CodProvincia"], R["CodDistrito"],
            //            R["NroRuc"], "", "", "", 0, R["FlagIncluyeIgv"]));
            //}




            return Lista.ToArray();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_TCCuentaCorriente_PadronSunat_Milagros_Transportista(string NroRuc, int FlagTransportista)
        {
            TCCuentaCorrienteCE objEntidad = new TCCuentaCorrienteCE();
            TCCuentaCorrienteCN objOperacion = new TCCuentaCorrienteCN();
            List<string> Lista = new List<string>();
            DataTable dtTabla = null;
            objEntidad.RazonSocial = NroRuc;
            objEntidad.NroRuc = NroRuc;
            objEntidad.FlagTransportista = FlagTransportista;

            //Primero hago una busqueda en el propio sistema, no vaya a ser que ya
            //los datos existan y se haga una consulta en balde
            dtTabla = objOperacion.F_TCCuentaCorriente_ListarClientes(objEntidad);
            foreach (DataRow R in dtTabla.Rows)
                Lista.Add(string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13}", R["CodCtaCte"], R["RazonSocial"], R["Direccion"],
                    R["DireccionEnvio"], R["Distrito"], R["CodDepartamento"], R["CodProvincia"], R["CodDistrito"],
                    R["NroRuc"], R["ApePaterno"], R["ApeMaterno"], R["Nombres"], R["SaldoCreditoFavor"], R["FlagIncluyeIgv"]));


            ////Si no encuentra nada en la tabla TCCuentaCorriente, prosigue a buscarlo en el padron sunat
            //if (dtTabla.Rows.Count == 0)
            //{
            //    dtTabla = objOperacion.F_TCCuentaCorriente_PadronSunat(objEntidad);

            //    //SI ENCUENTRA EN EL PADRON SUNAT PROCEDE A CREAR EL CLIENTE PARA SU UTILIZACION
            //    foreach (DataRow R in dtTabla.Rows)
            //    {

            //        objEntidad.CodEmpresa = 1;
            //        objEntidad.CodTipoCtacte = 1; //Cliente
            //        objEntidad.CodTipoCliente = 2; //Juridica
            //        objEntidad.CodClaseCliente = 2;
            //        objEntidad.RazonSocial = R["RazonSocial"].ToString();
            //        objEntidad.NroRuc = R["Ruc"].ToString();
            //        objEntidad.CodigoUbigeo = R["CodigoUbigeo"].ToString();
            //        objEntidad.Direccion = R["Direccion"].ToString();
            //        objEntidad.CodUsuario = 1;
            //        objEntidad.Telefono = "";
            //        objEntidad.Correo = "";

            //        objOperacion.F_TCCuentaCorriente_Insert_Padron(objEntidad);

            //    }

            //    //Primero hago una busqueda en el propio sistema, no vaya a ser que ya
            //    //los datos existan y se haga una consulta en balde
            //    dtTabla = objOperacion.F_TCCuentaCorriente_ListarClientes(objEntidad);
            //    foreach (DataRow R in dtTabla.Rows)
            //        Lista.Add(string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13}", R["CodCtaCte"], R["RazonSocial"], R["Direccion"],
            //            R["DireccionEnvio"], R["Distrito"], R["CodDepartamento"], R["CodProvincia"], R["CodDistrito"],
            //            R["NroRuc"], "", "", "", 0, R["FlagIncluyeIgv"]));
            //}




            return Lista.ToArray();
        }



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_BuscarDatosPorRucDni(string NroRuc)
        {
            TCCuentaCorrienteCE objEntidad = new TCCuentaCorrienteCE();
            TCCuentaCorrienteCN objOperacion = new TCCuentaCorrienteCN();
            List<string> Lista = new List<string>();
            DataTable dtTabla = null;
            objEntidad.RazonSocial = NroRuc;
            objEntidad.NroRuc = NroRuc;

            //Primero hago una busqueda en el propio sistema, no vaya a ser que ya
            //los datos existan y se haga una consulta en balde
            dtTabla = objOperacion.pa_TCCuentaCorriente_BuscarClienteXRucDni(objEntidad);
            foreach (DataRow R in dtTabla.Rows)
                Lista.Add(string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12}", R["CodCtaCte"], R["RazonSocial"], R["Direccion"],
                    R["DireccionEnvio"], R["Distrito"], R["CodDepartamento"], R["CodProvincia"], R["CodDistrito"],
                    R["NroRuc"], R["ApePaterno"], R["ApeMaterno"], R["Nombres"], R["SaldoCreditoFavor"]));

            return Lista.ToArray();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_BuscarDatosPorRucDni_Milagros(string NroRuc)
        {
            TCCuentaCorrienteCE objEntidad = new TCCuentaCorrienteCE();
            TCCuentaCorrienteCN objOperacion = new TCCuentaCorrienteCN();
            List<string> Lista = new List<string>();
            DataTable dtTabla = null;
            objEntidad.RazonSocial = NroRuc;
            objEntidad.NroRuc = NroRuc;

            //Primero hago una busqueda en el propio sistema, no vaya a ser que ya
            //los datos existan y se haga una consulta en balde
            dtTabla = objOperacion.pa_TCCuentaCorriente_BuscarClienteXRucDni(objEntidad);
            foreach (DataRow R in dtTabla.Rows)
                Lista.Add(string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16}", R["CodCtaCte"], R["RazonSocial"], R["Direccion"],
                    R["DireccionEnvio"], R["Distrito"], R["CodDepartamento"], R["CodProvincia"], R["CodDistrito"],
                    R["NroRuc"], R["ApePaterno"], R["ApeMaterno"], R["Nombres"], R["SaldoCreditoFavor"], R["FlagIncluyeIgv"], R["Comentario"]
                    , R["CORREO"], R["CELULAR"]));

            return Lista.ToArray();
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_LGProductos_Select(string Descripcion, int CodAlmacen)
        {
            LGProductosCE objEntidad = new LGProductosCE();

            objEntidad.DscProducto = Descripcion;
            objEntidad.CodAlmacen = CodAlmacen;

            DataTable dtTabla = null;
            LGProductosCN objOperacion = new LGProductosCN();
            dtTabla = objOperacion.F_LGProductos_Select(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1},{2},{3},{4},{5}", dtTabla.Rows[i]["CodAlterno"], dtTabla.Rows[i]["DscProducto"], dtTabla.Rows[i]["StockActual"], dtTabla.Rows[i]["Costo"], dtTabla.Rows[i]["Moneda"], dtTabla.Rows[i]["CodProducto"]));

            return Lista.ToArray();

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_ListarDepartamento_AutoComplete(string Descripcion)
        {
            TCDepartamentoCE objEntidad = new TCDepartamentoCE();

            objEntidad.DscDepartamento = Descripcion;

            DataTable dtTabla = null;
            TCDepartamentoCN objOperacion = new TCDepartamentoCN();
            dtTabla = objOperacion.F_Departamento_Autocomplete(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1}", dtTabla.Rows[i]["Codigo"], dtTabla.Rows[i]["Descripcion"]));

            return Lista.ToArray();

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_ListarProvincia_AutoComplete(string Descripcion, int Codigo)
        {
            TCProvinciaCE objEntidad = new TCProvinciaCE();

            objEntidad.CodDepartamento = Codigo;
            objEntidad.DscProvincia = Descripcion;
            DataTable dtTabla = null;
            TCProvinciaCN objOperacion = new TCProvinciaCN();
            dtTabla = objOperacion.F_Provincia_Autocomplete(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1}", dtTabla.Rows[i]["Codigo"], dtTabla.Rows[i]["Descripcion"]));

            return Lista.ToArray();

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_ListarDistrito_AutoComplete(string Descripcion, int Codigo)
        {
            TCDistritoCE objEntidad = new TCDistritoCE();

            objEntidad.CodProvincia = Codigo;
            objEntidad.DscDistrito = Descripcion;
            DataTable dtTabla = null;
            TCDistritoCN objOperacion = new TCDistritoCN();
            dtTabla = objOperacion.F_Distrito_Autocomplete(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1}", dtTabla.Rows[i]["Codigo"], dtTabla.Rows[i]["Descripcion"]));

            return Lista.ToArray();

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_TCDireccion_Listar(string Descripcion, int Codigo)
        {
            TCDistritoCE objEntidad = new TCDistritoCE();

            objEntidad.Codigo = Codigo;
            objEntidad.Descripcion = Descripcion;
            DataTable dtTabla = null;
            TCDistritoCN objOperacion = new TCDistritoCN();
            dtTabla = objOperacion.F_TCDireccion_Listar(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1}", dtTabla.Rows[i]["CodDepartamento"], dtTabla.Rows[i]["Direccion"]));

            return Lista.ToArray();

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_TCDistrito_Listar(string Descripcion)
        {
            TCDistritoCE objEntidad = new TCDistritoCE();

            objEntidad.Descripcion = Descripcion;
            DataTable dtTabla = null;
            TCDistritoCN objOperacion = new TCDistritoCN();
            dtTabla = objOperacion.F_TCDistrito_Listar(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1},{2},{3}", dtTabla.Rows[i]["CodDepartamento"], dtTabla.Rows[i]["CodProvincia"], dtTabla.Rows[i]["CodDistrito"], dtTabla.Rows[i]["DscDistrito"]));

            return Lista.ToArray();

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_TCDireccion_ListarXCodDistrito(string Descripcion)
        {
            TCDistritoCE objEntidad = new TCDistritoCE();

            objEntidad.Descripcion = Descripcion;
            DataTable dtTabla = null;
            TCDistritoCN objOperacion = new TCDistritoCN();
            dtTabla = objOperacion.F_TCDireccion_ListarXCodDistrito(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0}", dtTabla.Rows[i]["Direccion"]));

            return Lista.ToArray();

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_TCDireccion_ListarXCodDistrito_AutoComplete(string Direccion, int CodDepartamento, int CodProvincia, int CodDistrito, int CodCtaCte)
        {
            TCDistritoCE objEntidad = new TCDistritoCE();

            objEntidad.CodDepartamento = CodDepartamento;
            objEntidad.CodProvincia = CodProvincia;
            objEntidad.CodDistrito = CodDistrito;
            objEntidad.CodCtaCte = CodCtaCte;
            objEntidad.Direccion = Direccion;
            DataTable dtTabla = null;

            TCDistritoCN objOperacion = new TCDistritoCN();
            dtTabla = objOperacion.F_TCDireccion_ListarXCodDistrito_AutoComplete(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1}", dtTabla.Rows[i]["CodDireccion"], dtTabla.Rows[i]["Direccion"]));

            return Lista.ToArray();
        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_TCDireccion_ListarXCodTransportista_AutoComplete(string Direccion, int CodCtaCte)
        {
            TCDistritoCE objEntidad = new TCDistritoCE();

            objEntidad.CodCtaCte = CodCtaCte;
            objEntidad.Direccion = Direccion;
            DataTable dtTabla = null;

            TCDistritoCN objOperacion = new TCDistritoCN();
            dtTabla = objOperacion.F_TCDireccion_ListarXCodCtaCte_AutoComplete(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1}", dtTabla.Rows[i]["CodDireccion"], dtTabla.Rows[i]["Direccion"]));

            return Lista.ToArray();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_ListarFamilias_AutoComplete(string DscFamilia)
        {
            LGFamiliasCE objEntidad = new LGFamiliasCE();

            objEntidad.DscFamilia = DscFamilia;
            

            DataTable dtTabla = null;
            LGFamiliasCN objOperacion = new LGFamiliasCN();
            dtTabla = objOperacion.F_ListarFamilias_AutoComplete(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1},{2},{3},{4},{5}",
                    dtTabla.Rows[i]["IDFamilia"], dtTabla.Rows[i]["CodFamilia"], dtTabla.Rows[i]["DscFamilia"],
                    dtTabla.Rows[i]["CodEmpresa"], dtTabla.Rows[i]["Estado"], dtTabla.Rows[i]["CodUsuario"]));
            return Lista.ToArray();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_ListarMarca_AutoComplete(string DescripcionMarcaProducto)
        {
            LGProductosCE objEntidad = new LGProductosCE();

            objEntidad.DescripcionMarcaProducto = DescripcionMarcaProducto;


            DataTable dtTabla = null;
            LGProductosCN objOperacion = new LGProductosCN();
            dtTabla = objOperacion.F_ListarMarca_AutoComplete(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1},{2},{3}",
                    dtTabla.Rows[i]["CodMarcaProducto"], dtTabla.Rows[i]["CodigoMarcaProducto"], dtTabla.Rows[i]["Descripcion"],
                    dtTabla.Rows[i]["CodEstado"]));
            return Lista.ToArray();
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public bool F_SUNAT_MarcaDocumento(int CodMovimiento, int CodRespuesta)
        {
            bool hecho = false;

            NotaIngresoSalidaCabCE objEntidad = new NotaIngresoSalidaCabCE();
            objEntidad.CodMovimiento = CodMovimiento;
            objEntidad.CodEstadoSunat = CodRespuesta;

            hecho = (new NotaIngresoSalidaCabCN()).F_SUNAT_MarcaDocumento(objEntidad);

            return hecho;
        }

        //Joel Buscar el distrito del Api
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_Direccion_Buscar(string Ubigeo)
        {
            TCDistritoCE objEntidad = new TCDistritoCE();

            objEntidad.Ubigeo = Ubigeo;

            DataTable dtTabla = null;

            TCDistritoCN objOperacion = new TCDistritoCN();
            dtTabla = objOperacion.F_Direccion_Buscar(objEntidad);
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1},{2}", dtTabla.Rows[i]["CodDepartamento"], dtTabla.Rows[i]["CodProvincia"]
                                , dtTabla.Rows[i]["CodDistrito"]
                                ));

            return Lista.ToArray();

        }

        //Joel Buscar el url y el token
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string[] F_API_RUC_Buscar()
        {
            TCDistritoCE objEntidad = new TCDistritoCE();

            

            DataTable dtTabla = null;

            TCDistritoCN objOperacion = new TCDistritoCN();
            dtTabla = objOperacion.F_API_RUC_Buscar();
            List<string> Lista = new List<string>();
            for (int i = 0; i < dtTabla.Rows.Count; i++)
                Lista.Add(string.Format("{0},{1}", dtTabla.Rows[i]["urlapisunat"], dtTabla.Rows[i]["tokenapisunat"]
                                ));

            return Lista.ToArray();

        }


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public csDescarga DescargarDocumentosSunat(int CodDocumentoVenta, string TipoDocumento)
        {
            csDescarga datos = new csDescarga();
            datos.Mensaje = "";

            long RucEmisor = 0;
            long RucReceptor = 0;
            string Tipo = "";
            string Serie = "";
            string Numero = "";
            string Fecha = "";
            int CodEmpresa = 0;

            DataTable dtDatos = (new TCEmpresaCN()).F_DatosDocumento_Descarga(CodDocumentoVenta);

            if (dtDatos.Rows.Count > 0)
            {
                RucEmisor = Convert.ToInt64(dtDatos.Rows[0]["RucEmisor"].ToString());
                RucReceptor = Convert.ToInt64(dtDatos.Rows[0]["RucReceptor"].ToString());
                Tipo = dtDatos.Rows[0]["Tipo"].ToString();
                Serie = dtDatos.Rows[0]["Serie"].ToString();
                Numero = dtDatos.Rows[0]["Numero"].ToString();
                Fecha = dtDatos.Rows[0]["Fecha"].ToString();
                CodEmpresa = Convert.ToInt32(dtDatos.Rows[0]["CodEmpresa"].ToString());

                F_RutaEmpresa_Respuesta rpta = new F_RutaEmpresa_Respuesta(CodEmpresa);
                datos.Mensaje = rpta.MsgError;
                if (rpta.MsgError == null & rpta.Ruta != null)
                {

                    datos.ArchivoPdfNombre = RucEmisor.ToString() + "-" + Tipo + "-" + Serie + "-" + Numero + "-" + Convert.ToDateTime(Fecha).ToString("yyyyMMdd") + "-" + RucReceptor.ToString() + ".pdf";
                    datos.ArchivoXmlNombre = RucEmisor.ToString() + "-" + Tipo + "-" + Serie + "-" + Numero + ".xml";
                    datos.ArchivoCdrNombre = "R-" + RucEmisor.ToString() + "-" + Tipo + "-" + Serie + "-" + Numero + ".xml";
                    datos.NombreDocumento = Serie + "-" + Numero;
                    datos.Mensaje = "";
                    datos.MensajePdf = "";
                    datos.MensajeXml = "";
                    datos.MensajeCdr = "";
                    datos.Anulada = 0;
                    string rutaArchivo;

                    //------------------------
                    //Pregunto si esta anulada
                    //------------------------
                    rutaArchivo = rpta.Ruta + "PDF\\" + datos.ArchivoPdfNombre;

                    try
                    {
                        if (System.IO.File.Exists(rutaArchivo.Replace(".pdf", "_ANULADA.pdf")))
                        {
                            datos.Mensaje = "DOCUMENTO ANULADO";
                            datos.Anulada = 1;
                        }
                    }
                    catch (Exception ex)
                    {
                        datos.MensajePdf = "Error en Verificacion Anulada: " + (char)13 + ex.Message;
                    }

                    if (datos.Anulada == 0)
                    {

                        if (TipoDocumento == "PDF")
                        {
                            //Archivo pdf
                            try
                            {
                                System.IO.FileStream fs1 = null;
                                fs1 = System.IO.File.Open(rutaArchivo, System.IO.FileMode.Open, System.IO.FileAccess.Read);
                                datos.ArchivoPdf = new byte[fs1.Length];
                                fs1.Read(datos.ArchivoPdf, 0, (int)fs1.Length);
                                fs1.Close();
                            }
                            catch (Exception ex)
                            {
                                datos.MensajePdf = "Error en PDF: " + "No se pudo encontrar el documento: " + datos.NombreDocumento;
                            }
                        }





                        if (TipoDocumento == "ENVIO")
                        {
                            //Archivo xml
                            try
                            {

                                rutaArchivo = rpta.Ruta + "ENVIO\\" + datos.ArchivoXmlNombre;
                                if (!System.IO.File.Exists(rutaArchivo))
                                {
                                    rutaArchivo = rutaArchivo.Replace("xml", "zip");
                                    datos.ArchivoXmlNombre = datos.ArchivoXmlNombre.Replace("xml", "zip");
                                }

                                System.IO.FileStream fs1 = null;
                                fs1 = System.IO.File.Open(rutaArchivo, System.IO.FileMode.Open, System.IO.FileAccess.Read);
                                datos.ArchivoXml = new byte[fs1.Length];
                                fs1.Read(datos.ArchivoXml, 0, (int)fs1.Length);
                                fs1.Close();
                            }
                            catch (Exception ex)
                            {
                                datos.MensajeXml = "Error en XML: " + "No se pudo encontrar el XML del documento" + datos.NombreDocumento;
                            }

                        }







                        if (TipoDocumento == "RPTA")
                        {

                            //Archivo CDR
                            try
                            {

                                rutaArchivo = rpta.Ruta + "RPTA\\" + datos.ArchivoCdrNombre;
                                if (!System.IO.File.Exists(rutaArchivo))
                                {
                                    rutaArchivo = rutaArchivo.Replace("xml", "zip").Replace("R-", "R");
                                    datos.ArchivoCdrNombre = datos.ArchivoCdrNombre.Replace("xml", "zip").Replace("R-", "R");
                                }

                                System.IO.FileStream fs1 = null;
                                fs1 = System.IO.File.Open(rutaArchivo, System.IO.FileMode.Open, System.IO.FileAccess.Read);
                                datos.ArchivoCdr = new byte[fs1.Length];
                                fs1.Read(datos.ArchivoCdr, 0, (int)fs1.Length);
                                fs1.Close();
                            }
                            catch (Exception ex)
                            {
                                datos.MensajeCdr = "Error en CDR: " + "No se pudo encontrar el CDR del documento" + datos.NombreDocumento;
                            }

                        }








                    }
                }
                else
                {
                    datos.Mensaje = "Ruc Emisor No Encontrado";
                }
            }



            return datos;
        }



        public class csDescarga
        {
            public int Anulada { get; set; }

            public byte[] ArchivoPdf { get; set; }
            public string ArchivoPdfNombre { get; set; }
            public string MensajePdf { get; set; }

            public byte[] ArchivoXml { get; set; }
            public string ArchivoXmlNombre { get; set; }
            public string MensajeXml { get; set; }

            public byte[] ArchivoCdr { get; set; }
            public string ArchivoCdrNombre { get; set; }
            public string MensajeCdr { get; set; }


            public string Mensaje { get; set; }
            public string NombreDocumento { get; set; }
        }

        public class F_RutaEmpresa_Respuesta
        {
            public string Ruta { get; set; }
            public string MsgError { get; set; }

            public F_RutaEmpresa_Respuesta()
            {

            }

            public F_RutaEmpresa_Respuesta(int CodEmprea)
            {
                try
                {
                    this.Ruta = (new TCEmpresaCN()).RutaFacturadorPorCodEmpresa(CodEmprea);
                }
                catch (Exception ex)
                {
                    this.MsgError = "Error al buscar ruta: " + (char)13 + ex.Message;
                }
            }

        }

    }
}
