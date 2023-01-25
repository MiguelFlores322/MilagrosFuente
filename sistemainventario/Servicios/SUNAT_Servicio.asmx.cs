using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using CapaNegocios;
using System.Net;
using System.IO;
using Newtonsoft.Json;
using System.Data;

namespace SistemaInventario.Servicios
{
    /// <summary>
    /// Summary description for AutoComplete
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]

    public class SUNAT_Servicio : System.Web.Services.WebService
    {


        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public bool F_SUNAT_MarcaDocumento(int CodMovimiento, int CodRespuesta)
        {
            bool hecho = false;

            NotaIngresoSalidaCabCE objEntidad = new NotaIngresoSalidaCabCE(); 
            objEntidad.CodMovimiento = CodMovimiento;
            objEntidad.CodEstadoSunat = CodRespuesta;

            hecho = (new NotaIngresoSalidaCabCN()).F_SUNAT_MarcaDocumento(objEntidad); //Se marca el documento con el stored 'pa_SUNAT_MarcaDocumento'

            return hecho; //si es exitoso retorna verdadero, sino falso
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public SunatResponse F_Consulta_Sunat_EstadoDocumento(
            string Token_Empresa,
            string RucEmpresa,
            string UrlServerPeticionLocal,
            string link,
            string token,
            string numRuc,
            string codComp,
            string numeroSerie,
            string numero,
            string fechaEmision,
            decimal monto
            )
        {
            //Se instancia una variable de tipo Peticion y se le asignan a sus atributos los datos de los parametros de la funcion excepto UrlServerPeticionLocal
            Peticion peticion = new Peticion();
            peticion.Token_Empresa = Token_Empresa;
            peticion.RucEmpresa = RucEmpresa;
            peticion.Link = link;
            peticion.Token = token;
            peticion.requestData = new requestData();
            peticion.requestData.numRuc = numRuc;
            peticion.requestData.codComp = codComp;
            peticion.requestData.numeroSerie = numeroSerie;
            peticion.requestData.numero = numero;
            peticion.requestData.fechaEmision = fechaEmision;
            peticion.requestData.monto = monto;


            string jsonData = JsonConvert.SerializeObject(peticion); //Se serializa el objeto en un json

            SunatResponse sunatResponse = new SunatResponse();  //Se instancia una variable del tipo SunatResponse (Desconozco su uso)
            //System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            var httpWebRequest = (HttpWebRequest)WebRequest.Create(UrlServerPeticionLocal); //Se realiza una peticion al api local
            httpWebRequest.ContentType = "application/json"; //de tipo json
            httpWebRequest.Method = "POST"; //metodo post

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream())) //Se crea una variable para mandar el objeto peticion serializado, ya que es un Request
            {
                streamWriter.Write(jsonData); //Se manda el obejto peticion serializado
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse(); //Se obtiene una respuesta del api
            string result; //Se crea una variable para recibir larespuesta
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream())) //Se crea una variable a la cual se le asignara la respuesta del api
            { 
                result = streamReader.ReadToEnd(); //La variable 'result' obtiene todos los datos de la respuesta
            }

            return JsonConvert.DeserializeObject<SunatResponse>(result); //Se deserializa el json en un objeto SunatResponse con el resultado
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public Token generacionNuevoToken()
        {
            //PROCEDIMIENTO PARA OBTENER UN NUEVO TOKEN
            string access_token = "";
            string Token_Empresa = "";
            string RucEmpresa = "";
            string UrlServerPeticionLocal = "";
            string link = "";

            //parametros para la obtención de token
            int MinUltimaGeneracionToken = 0;
            string DiasAnuFacturas = "";
            string UrlServerPeticionLocal_TOKEN = "";

            PeticionTokenNuevo Token_PETICION = new PeticionTokenNuevo();
            Token TokenFinal = new Token();


            //1.- obtengo loa parametros de envio y todo eso
            //----------------------------------------------
            NotaIngresoSalidaCabCE objEntidad = new NotaIngresoSalidaCabCE();
            objEntidad.CodEmpresa = Convert.ToInt32(Session["CodEmpresa"]);

            DataTable dta_consulta = (new NotaIngresoSalidaCabCN()).F_SUNAT_ListarParametros(objEntidad); //Lista la unica fila de la tabla Sunat_EmpresaParametros
            if (dta_consulta.Rows.Count > 0)
            {
                //Setea las variables con los datos de la fila
                access_token = dta_consulta.Rows[0]["Token_ConsultaEstadoDocumentos"].ToString(); 
                link = dta_consulta.Rows[0]["Link_ConsultaEstadoDocumentos"].ToString();
                UrlServerPeticionLocal = dta_consulta.Rows[0]["UrlServerPeticionLocal"].ToString();
                RucEmpresa = dta_consulta.Rows[0]["NroRucEmpresa"].ToString();
                Token_Empresa = dta_consulta.Rows[0]["Token_Empresa"].ToString();

                MinUltimaGeneracionToken = Convert.ToInt32(dta_consulta.Rows[0]["MinUltimaGeneracionToken"].ToString());
                DiasAnuFacturas = dta_consulta.Rows[0]["DiasAnuFacturas"].ToString();

            }

            if (MinUltimaGeneracionToken > 30) //Si ha pasado mas de 30 minutos desde la ultima generacion del token, genera otro nuevo
            {
                //Obtiene los datos de la fila con la informacion necesaria para hacer una renovacion del token
                Token_PETICION.token_renov_link = dta_consulta.Rows[0]["token_renov_link"].ToString();
                Token_PETICION.token_renov_grant_type = dta_consulta.Rows[0]["token_renov_grant_type"].ToString();
                Token_PETICION.token_renov_scope = dta_consulta.Rows[0]["token_renov_scope"].ToString();
                Token_PETICION.token_renov_client_id = dta_consulta.Rows[0]["token_renov_client_id"].ToString();
                Token_PETICION.token_renov_client_secret = dta_consulta.Rows[0]["token_renov_client_secret"].ToString();
                UrlServerPeticionLocal_TOKEN = dta_consulta.Rows[0]["urlServerPeticionLocal_TOKEN"].ToString();

                //Serializa la variable en un JSON
                string jsonData = JsonConvert.SerializeObject(Token_PETICION);

                SunatResponse sunatResponse = new SunatResponse();
                //System.Net.ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                //Realiza la peticion de tipo POST al api ObtenerTokenEmpresa
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(UrlServerPeticionLocal_TOKEN); 
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    streamWriter.Write(jsonData); //Manda el JSON serializado al api
                }

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                string result;
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd(); //Obtiene una respuesta de tipo JSON del api
                }

                Token tokenResult = JsonConvert.DeserializeObject<Token>(result); //Deserializa el JSON y lo almacena en una variable TOKEN

                //Settea el token resultante de la operacion, al token final
                TokenFinal.access_token = tokenResult.access_token; 

                objEntidad.RazonSocial = tokenResult.access_token; 
                bool hecho = (new NotaIngresoSalidaCabCN()).F_SUNAT_ActualizarToken(objEntidad); //Actualiza el token en la base de datos

            }
            else //Si no ha pasado mas de 30 minutos utiliza el mismo token ya generado con anterioridad
            {
                TokenFinal.access_token = dta_consulta.Rows[0]["Token_ConsultaEstadoDocumentos"].ToString();
            }

            //Settea los atributos del Token Final para su utilizacion en el JS
            TokenFinal.link = dta_consulta.Rows[0]["Link_ConsultaEstadoDocumentos"].ToString();
            TokenFinal.UrlServerPeticionLocal = dta_consulta.Rows[0]["UrlServerPeticionLocal"].ToString();
            TokenFinal.RucEmpresa = dta_consulta.Rows[0]["NroRucEmpresa"].ToString();
            TokenFinal.Token_Empresa = dta_consulta.Rows[0]["Token_Empresa"].ToString();

            return TokenFinal;
        }


    }

    public class PeticionTokenNuevo
    {
        public string token_renov_link { get; set; }
        public string token_renov_grant_type { get; set; }
        public string token_renov_scope { get; set; }
        public string token_renov_client_id { get; set; }
        public string token_renov_client_secret { get; set; }
    }

    public class Token
    {
        //los originales
        public string access_token { get; set; }
        public string token_type { get; set; }
        public int expires_in { get; set; }

        //los adicionales
        public string link { get; set; }
        public string UrlServerPeticionLocal { get; set; }
        public string RucEmpresa { get; set; }
        public string Token_Empresa { get; set; }
    }

    public class Peticion
    {
        public string Token_Empresa { get; set; }
        public string RucEmpresa { get; set; }
        public string Link { get; set; }
        public string Token { get; set; }
        public requestData requestData { get; set; }
    }

    public partial class SunatResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public Data Data { get; set; }
    }

    public partial class Data
    {
        public long EstadoCp { get; set; }
        public string EstadoRuc { get; set; }
        public string CondDomiRuc { get; set; }
    }

    public partial class requestData
    {

        public string numRuc { get; set; }
        public string codComp { get; set; }
        public string numeroSerie { get; set; }
        public string numero { get; set; }
        public string fechaEmision { get; set; }
        public decimal monto { get; set; }
    }
}
