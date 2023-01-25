using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CapaEntidad
{
    public class FormatoImpresionCE
    {
        public int CodTerritorio { get; set; }

        public int CodUsuario { get; set; }

        public string Descripcion { get; set; }

        public int CodEstado { get; set; }

        public string HostName { get; set; }

        public string IPAdress { get; set; }

        public string MsgError { get; set; }

        public int CodFormatoImpresion { get; set; }

        public int codTipoFormato { get; set; }

        public int codTipoDocumento { get; set; }

        public int CodDoc { get; set; }

        public string Formato { get; set; }

        public string AbvDdsc { get; set; }

        public string Estado { get; set; }

       

        public int CodConcepto { get; set; }

        public string AbvConcepto { get; set; }

        public string Documento { get; set; }

        public int FlagDefecto { get; set; }

        public int NroItem { get; set; }

        public string Datatable { get; set; }

        public string Impresora { get; set; }

        public string NombreArchivo { get; set; }

        public string SerieDoc { get; set; }



        public DateTime Desde { get; set; }

        public DateTime Hasta { get; set; }
    }
}
