using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public class Accesos
{
	private int iCodAcceso;
	private int iCodUsuario;
	private int iCodMenuPrincipal;
	private int iCodSubMenu;

	public int ICodAcceso
	{
		get { return iCodAcceso; }
		set { iCodAcceso = value; }
	}
	public int CodUsuario
	{
		get { return iCodUsuario; }
		set { iCodUsuario = value; }
	}
	public int ICodMenuPrincipal
	{
		get { return iCodMenuPrincipal; }
		set { iCodMenuPrincipal = value; }
	}
	public int ICodSubMenu
	{
		get { return iCodSubMenu; }
		set { iCodSubMenu = value; }
	}

	public Accesos(){ }

}
