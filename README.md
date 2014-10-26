------------------------------
Carriers
------------------------------
Country					String
CarrierName				String
Bands					Number

------------------------------
Bands
------------------------------
Frequency				Number
Protocol				String
Carrier					ObjID
Phone					ObjID

------------------------------
Phones
------------------------------
GSMBands				Number
LTEFDDBands				Number
ModelNumber				String
Name					String
UMTSBands				Number
TDSCDMABands			Number
~Users					ObjID

------------------------------
Users
------------------------------
firstName				String
lastName				String
displayName				String
email					String
username				String
password				String
salt					String
provider				String
providerdata	
additionalproviderdata
roles					String
updated					Date
created					Date
resetPasswordToken		String
resetPasswordExpires 	Date