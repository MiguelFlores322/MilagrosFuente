using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace SistemaInventario.Clases
{
    
    public class JsonSerializer
    {

        public static JavaScriptSerializer gjssSerializer = new JavaScriptSerializer();

        public static T FromJson<T>(String pstrData)
        {

            T obj ;

            obj = gjssSerializer.Deserialize<T>(pstrData);

            return obj;
        }

        public static String ToJson<T>(T obj)
        {
            String str_resultado = "";

            gjssSerializer.MaxJsonLength = 900000000;

            str_resultado = gjssSerializer.Serialize(obj);

            return str_resultado;

        }

    }

}