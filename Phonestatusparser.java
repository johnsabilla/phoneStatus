import java.io.*;

//Project Stark File Parser
public class Phonestatusparser 
{

	public Phonestatusparser() 
	{
		// TODO Auto-generated constructor stub
	}

	public static int ParseGSM(String line)
	{
		int band;
		int comma = -1;
		int length = -1;
		
		int GSM850 = 1;
		int	GSM900 = 2;
		int GSM1800 = 4;
		int GSM1900 = 8;
		
		int GSMSupport = 0;
		
		line = line.replaceAll("\\s", "");
		length = line.length();
		comma = line.indexOf(",");
		
		while(line.length() > 0 )
		{
			if(comma != -1)
			{
				band = Integer.parseInt(line.substring(0, comma));
			}
			else
			{
				band = Integer.parseInt(line.substring(0, line.length()));
				line = ""; //last line break
			}
			line = line.substring(comma + 1, line.length());
			comma = line.indexOf(",");
			
			switch(band)
			{
				case 850:
					GSMSupport = GSMSupport | GSM850;
					break;
				
				case 900:
					GSMSupport = GSMSupport | GSM900;
					break;
				
				case 1800:
					GSMSupport = GSMSupport | GSM1800;
					break;
				
				case 1900:
					GSMSupport = GSMSupport | GSM1900;
					break;
					
				default:
					break;
			}
		}
		
		return GSMSupport;
	}
	
	public static int ParseNonGSM(String line, String bandflag)
	{
		int support = 0;
		int comma = -1;
		int band = 0;
		
		line = line.replaceAll("\\s", "");
		comma = line.indexOf(",");
		String temp;
		
		while(line.length() > 0 )
		{
			if(comma != -1)
			{
				temp = line.substring(0, comma);
				temp = temp.replace(bandflag, "");
				band = Integer.parseInt(temp);
				support = support | (1 << band);
			}
			else
			{
				temp = line;
				temp = temp.replace(bandflag, "");
				band = Integer.parseInt(temp);
				support = support | (1 << band);
				line = ""; //last line break
			}
			line = line.substring(comma + 1, line.length());
			comma = line.indexOf(",");
		}
		
		return support;
	}
	
	public static int ParseTDSCDMA(String line, String string)
	{
		int band;
		int comma = -1;
		int length = -1;
		
		int TDSCDMA1900 = 1;
		int	TDSCDMA2000 = 2;
		int TDSCDMA2600 = 4;
		int TDSCDMA1901 = 8;	//Actually for TDSCDMA1900+
		int TDSCDMA2300 = 16;
		
		int TDSCDMASupport = 0;
		
		line = line.replaceAll("\\s", "");
		length = line.length();
		comma = line.indexOf(",");
		
		while(line.length() > 0 )
		{
			if(comma != -1)
			{
				band = Integer.parseInt(line.substring(7, comma));
			}
			else
			{
				band = Integer.parseInt(line.substring(7, line.length()));
				line = ""; //last line break
			}
			line = line.substring(comma + 1, line.length());
			comma = line.indexOf(",");
			
			switch(band)
			{
				case 1900:
					TDSCDMASupport = TDSCDMASupport | TDSCDMA1900;
					break;
				
				case 2000:
					TDSCDMASupport = TDSCDMASupport | TDSCDMA2000;
					break;
				
				case 2600:
					TDSCDMASupport = TDSCDMASupport | TDSCDMA2600;
					break;

				case 1901:
					TDSCDMASupport = TDSCDMASupport | TDSCDMA1901;
					break;
					
				case 2300:
					TDSCDMASupport = TDSCDMASupport | TDSCDMA2300;
					break;
					
				default:
					break;
			}
		}
		
		return TDSCDMASupport;
	}
	
	public static int ParseCDMA(String line, String bandflag)
	{
		int support = 0;
		int comma = -1;
		int band = 0;
		
		line = line.replaceAll("\\s", "");
		comma = line.indexOf(",");
		String temp;
		
		while(line.length() > 0 )
		{
			if(comma != -1)
			{
				temp = line.substring(0, comma);
				temp = temp.replace(bandflag, "");
				band = Integer.parseInt(temp);
				support = support | (1 << band);
			}
			else
			{
				temp = line;
				temp = temp.replace(bandflag, "");
				band = Integer.parseInt(temp);
				support = support | (1 << band);
				line = ""; //last line break
			}
			line = line.substring(comma + 1, line.length());
			comma = line.indexOf(",");
		}
		
		return support;
	}
	
	public static int ParseLTE(String line)
	{
		int LTESupport = 0;
		int comma = -1;
		
		int band = 0;
		
		line = line.replaceAll("\\s", "");
		comma = line.indexOf(",");
		String temp;
		
		while(line.length() > 0 )
		{
			if(comma != -1)
			{
				temp = line.substring(0, comma);
				temp = temp.replace("LTEB", "");
				band = Integer.parseInt(temp);
				LTESupport = LTESupport | (1 << band);
			}
			else
			{
				temp = line;
				temp = temp.replace("LTEB", "");
				band = Integer.parseInt(temp);
				LTESupport = LTESupport | (1 << band);
				line = ""; //last line break
			}
			line = line.substring(comma + 1, line.length());
			comma = line.indexOf(",");
		}
		
		return LTESupport;
	}
	
	public static void main(String[] args) throws IOException 
	{
		int equals = 0;
		int support = 0;
		
		File read_file = new File(args[0]);
		File write_file = new File("script");
		
		BufferedReader reader = null;
		BufferedWriter writer = null;
		
		reader = new BufferedReader(new FileReader(read_file));
		writer = new BufferedWriter(new FileWriter(write_file));
		String text = null;
		String insertcmd = null;
		
		device phone = new device();
		
		while( (text = reader.readLine()) != null)
		{		
			if(text.contains("Make="))
			{
				equals = text.indexOf("=");
				phone.make = "Name:" + "\'" + text.substring(equals + 1, text.length() - 1) + "\',";
				//System.out.println(phone.make);
			}
			if(text.contains("Model="))
			{
				equals = text.indexOf("=");
				phone.model = "ModelNumber:" + "\'" + text.substring(equals + 1, text.length()) + "\',";
				//System.out.println(phone.model);
			}
			else if(text.contains("GSMBands="))
			{
				support = 0;
				equals = text.indexOf("=");
				support = ParseGSM(text.substring(equals + 1));
				phone.GSMBands = "GSMBands:"  +   support + ",";
				//System.out.println(phone.GSMBands);
			}
			else if(text.contains("UMTS="))
			{
				support = 0;
				equals = text.indexOf("=");
				support = ParseNonGSM(text.substring(equals + 1), "UMTSB");
				phone.UMTSBands = "UMTSBands:"  + support + ",";
				//System.out.println(phone.UMTSBands);
			}
			else if(text.contains("LTE="))
			{
				support = 0;
				equals = text.indexOf("=");
				support = ParseNonGSM(text.substring(equals + 1), "LTEB");
				phone.LTEBands = "LTEBands:" + support +  ",";
				//System.out.println(phone.LTEBands);
			}
			else if(text.contains("TDSCDMA="))
			{
				support = 0;
				equals = text.indexOf("=");
				support = ParseTDSCDMA(text.substring(equals + 1), "TDSCDMA");
				phone.TDSCDMABands = "TDSCDMABands:" + support + ",";
				//System.out.println(phone.CDMABands);
			}
			else if(text.contains("CDMA="))
			{
				support = 0;
				equals = text.indexOf("=");
				support = ParseNonGSM(text.substring(equals + 1), "CDMABC");
				phone.CDMABands = "CDMABands:" + support + ",";
				//System.out.println(phone.CDMABands);
			}
			else if(text.contains("END"))
			{
				if(phone.GSMBands == null)
				{
					phone.GSMBands = "";
				}
				insertcmd = "db.phones.insert({" + 
								( (phone.GSMBands == null) ? "" : phone.GSMBands ) + 
								( (phone.LTEBands == null) ? "" : phone.LTEBands ) + 
								phone.model +
								phone.make +
								( (phone.UMTSBands == null) ? "" : phone.UMTSBands ) +
								( (phone.CDMABands == null) ? "" : phone.CDMABands ) +
								( (phone.TDSCDMABands == null) ? "" : phone.TDSCDMABands ) +
								"Support:'no'" +
								"});" +"\n";
				
				System.out.println(insertcmd);
				writer.write(insertcmd);
			}
		}
		writer.close();
	}
}
