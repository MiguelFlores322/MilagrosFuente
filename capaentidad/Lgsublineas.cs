using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class Lgsublineas
{

	public int CodEmpresa
	{
		get { return CodEmpresa; }
		set { CodEmpresa = value; }
	}
	public int CodFamilia
	{
		get { return CodFamilia; }
		set { CodFamilia = value; }
	}
    public int CodLinea
	{
		get { return CodLinea; }
		set { CodLinea = value; }
	}
	public string CodSubLinea
	{
		get { return CodSubLinea; }
		set { CodSubLinea = value; }
	}
	public string DscSubLinea
	{
		get { return DscSubLinea; }
		set { DscSubLinea = value; }
	}
	public string Estado
	{
		get { return Estado; }
		set { Estado = value; }
	}
	public int CodUsuario
	{
		get { return CodUsuario; }
		set { CodUsuario = value; }
	}
	public DateTime FechaRegistro
	{
		get { return FechaRegistro; }
		set { FechaRegistro = value; }
	}
	public int CodUsuarioMod
	{
		get { return CodUsuarioMod; }
		set { CodUsuarioMod = value; }
	}
	public DateTime FechaModificacion
	{
		get { return FechaModificacion; }
		set { FechaModificacion = value; }
	}
	public int CodUsuarioAnul
	{
		get { return CodUsuarioAnul; }
		set { CodUsuarioAnul = value; }
	}
	public DateTime FechaAnulacion
	{
		get { return FechaAnulacion; }
		set { FechaAnulacion = value; }
	}


}
