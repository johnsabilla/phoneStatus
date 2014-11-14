import java.io.*;


public class Phonestatusparser 
{

	public Phonestatusparser() {
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args) throws IOException 
	{
		int equals = 0;
		
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
				phone.make = "\"" + "Name" + "\": " + "\"" + text.substring(equals + 1, text.length() - 1) + "\",";
				//System.out.println(phone.make);
			}
			if(text.contains("Model="))
			{
				equals = text.indexOf("=");
				phone.model = "\"" + "ModelNumber" + "\": " + "\"" + text.substring(equals + 1, text.length() - 1) + "\",";
				//System.out.println(phone.model);
			}
			else if(text.contains("GSMBands="))
			{
				equals = text.indexOf("=");
				phone.GSMBands = "\"" + "GSMBands" + "\":"  + "["  + text.substring(equals + 1) +  "],";
				//System.out.println(phone.GSMBands);
			}
			else if(text.contains("UMTS="))
			{
				equals = text.indexOf("=");
				phone.UMTSBands = "\"" + "UMTSBands" + "\": " + "["  + text.substring(equals + 1) +  "]";
				//System.out.println(phone.UMTSBands);
			}
			else if(text.contains("LTE="))
			{
				equals = text.indexOf("=");
				phone.LTEBands = "\"" + "LTEBands" + "\": " + "["  + text.substring(equals + 1) +  "],";
				//System.out.println(phone.LTEBands);
			}
			else if(text.contains("END"))
			{
				insertcmd = "db.phones.insert({" + 
								phone.GSMBands + 
								phone.LTEBands + 
								phone.model +
								phone.make +
								phone.UMTSBands +
								"});" +"\n";
				
				System.out.println(insertcmd);
				writer.write(insertcmd);
			}
		}
		writer.close();
	}

}
