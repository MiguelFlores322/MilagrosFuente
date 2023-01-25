using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

    public class TCAlmacenFisicoCE
    {
        public int CodAlmacenFisico { get; set; }
        public string Descripcion { get; set; }
        public string Direccion { get; set; }
        public int CodDepartamento { get; set; }
        public int CodProvincia { get; set; }
        public int CodDistrito { get; set; }
        public int CodTipo { get; set; }
        public int CodEstado { get; set; }
        public int CodUsuario { get; set; }
        public DateTime FechaRegistro { get; set; }
        public int CodUsuarioMod { get; set; }
        public DateTime FechaModificacion { get; set; }
        public string MsgError { get; set; }
    }