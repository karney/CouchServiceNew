var newassetModel = "{\"__metadata\": {\"uri\": \"https://app.mindyourservice.com/ds/MYSODataService.svc/ASTs\",\"type\": \"MYS2012.Models.companyModel.AST\"},\"Aid\": null,\"ocrf\": null,\"cccref\": null, \"bcref\": null, \"pn\": null, \"a1\": null,\"a2\": null, \"a3\": null, \"a4\": null,\"cty\": null,\"st\": null,\"pc\": null,\"ctr\": null,\"i1\": null,\"i2\": null,\"i3\": null, \"i4\": null,\"i5\": null, \"i6\": null, \"uri\": null,\"ip\": null,\"prt\": null, \"bc1\": null,\"bc2\": null,\"rf1\": null, \"rf2\": null, \"snm\": null,\"slc\": null,\"tid\": null,\"stid\": null,\"ASTNm\": null,\"ATNm\": null,\"ht\": null,\"wi\": null,\"dp\": null,\"W1s\": null,\"W1e\": null,\"ADt\": null,\"s1\": null,\"s2\": null,\"s3\": null,\"s4\": null,\"oRp\": null,\"oSt\": null,\"tp\": null,\"pr\": null,\"wt\": null, \"Nm\": null, \"cp\": null,\"ina\": null,\"ac\": null,\"OrCNm\": null,\"BlCNm\": null,\"CClNm\": null,\"tJid\": null,\"tJdts\": null,\"dm\": null,\"si1\": null,\"si2\": null,\"si3\": null}";

var newjobModel = "{\"__metadata\": {\"uri\": \"https://app.mindyourservice.com/ds/MYSODataService.svc/CJD2s\", \"type\": \"MYS2012.Models.companyModel.CJD2\"},\"JID\": null, \"JPid\": null, \"JPD\": null, \"JPrD\": null, \"JAcD\": null, \"JSD\": null, \"usId\": null, \"uNm\": null, \"JSid\": null, \"JTid\": null, \"JNm\": null, \"IsComp\": null, \"JDts\": null, \"SLA\": null, \"Ctm\": null, \"Sg1\": null, \"Sg2\": null, \"IsCan\": null, \"S1\": null, \"S2\": null, \"S3\": null, \"S4\": null, \"S5\": null, \"InAct\": null, \"NNSD\": null, \"JSN\": null, \"JTN\": null, \"CuRef\": null, \"BPN\": null, \"BA1\": null, \"BA2\": null, \"BA3\": null, \"BA4\": null, \"BCt\": null, \"BSt\": null, \"BCr\": null, \"BP\": null, \"ClRef\": null, \"APN\": null, \"AA1\": null, \"AA2\": null, \"AA3\": null, \"AA4\": null, \"ACt\": null, \"ASt\": null, \"ACr\": null, \"AP\": null, \"CC\": null, \"CCT\": null, \"CCE\": null, \"AC\": null, \"ATe\": null, \"ACE\": null, \"ChC\": null, \"PCuN\": null, \"PClN\": null, \"P1\": \"\", \"QI\": \"\", \"CFS\": \"[]\", \"ttme\": null, \"btme\": null, \"IsQ\": null,\"Pn1\": null,\"Pn2\": null,\"ArT\": null,\"OvT\": null,\"Fws\": null,\"Db\": null,\"CoT\": null,\"DbT\": null}";

var newAssetNoteModel = "{\"__metadata\": {\"uri\": \"https://app.mindyourservice.com/ds/MYSODataService.svc/AHs\", \"type\": \"MYS2012.Models.companyModel.AH\"}, \"D\": null, \"A\": null, \"Dt\": null, \"I\": null}";

var newAssetHistoryModel = "{\"__metadata\": {\"uri\": \"https://app.mindyourservice.com/ds/MYSODataService.svc/ANs\", \"type\": \"MYS2012.Models.companyModel.AN\"}, \"I\": null, \"AI\": null, \"Dt\": null, \D\": null, \"A\": null, \"L\": null, \"Tid\": 1}";

var newExpenseModel = "{\"__metadata\": {\"uri\": \"https://app.mindyourservice.com/ds/MYSODataService.svc/Expenses\",\"type\": \"MYS2012.Models.companyModel.Expens\"},\"ExpenseID\": null,\"ActivityItemID\": null,\"Description\": null, \"ProfileDataID\": null, \"DateAdded\": null, \"AddedBy\": null,\"Cost\": null, \"Quantity\": null, \"Reference\": null,\"DatePaid\": null,\"InActive\": null,\"Username\": null,\"Paid\": null,\"PaidBy\": null}";

function generateGuid()
{
	var result, i, j;
	result = '';
	try{
	for(j=0; j<32; j++)
	{
		if( j == 8 || j == 12|| j == 16|| j == 20)
		result = result + '-';
		i = Math.floor(Math.random()*16).toString(16).toUpperCase();
		result = result + i;
	}
	}catch(e)
	{
		alert(e);	
	}
	return result;
}
	
	
function SaveCustomFormChanges(cJob)
{
	if(cJob)
	{
		var newJobJS = ko.mapping.toJS(cJob);  //Convert back to JS Object

		if(changedJobs)
		{
			var foundJob = jlinq.from(changedJobs).equals("JID", parseInt(currJob)).first();
			
			if(foundJob)
			{
				var i = changedJobs.indexOf(foundJob);
				
				changedJobs.splice(i,1);
				changedJobs.push(newJobJS);
			}
			else
			{
				changedJobs.push(newJobJS);
				
				var oldJob1 = jlinq.from(unchangedJobs).equals("JID", parseInt(currJob)).first();  //Remove From Old Jobs
				
				if(oldJob1)
				{
					var i = unchangedJobs.indexOf(oldJob1);

					unchangedJobs.splice(i,1);
					saveJSToIsoStorage("jobs",unchangedJobs);
				}
			}
		}
		else
		{
			changedJobs = new Array();
			changedJobs.push(newJobJS);  //Add Change
			
			var oldJob = jlinq.from(unchangedJobs).equals("JID", parseInt(currJob)).first();
				
			if(oldJob)
			{
				var i = unchangedJobs.indexOf(oldJob);

				unchangedJobs.splice(i,1);
				saveJSToIsoStorage("jobs",unchangedJobs);
			}
		}
		
		saveJSToIsoStorage("changedjobs",changedJobs);
		
		UpdateJobsList();
	}
}	
	
function CreateJobAsset(cJob)
{
	try{
		var newAssetJS = $.parseJSON(newassetModel);
		
		if(newAssetJS)
		{
			var guig = generateGuid();
	
			newAssetJS.Aid = guig;
	
			newAssetJS.Nm = "New Job Asset";
			
			//newAssetJS.cccref = customerID;
			//newAssetJS.ocrf = customerID
			//newAssetJS.bcref = customerID;
			

			if(cJob)  
			{
				if(cJob.P1())
				{
					var currAssetsList = cJob.P1();
					cJob.P1(currAssetsList+guig+",");
				}
				else
				{
					cJob.P1(currAssetsList+guig+",");
				}
			}
			
			var needsSave = cJob.dirtyFlag.isDirty();

			if(needsSave)
			{
				var newJobJS = ko.mapping.toJS(cJob);  //Convert back to JS Object

				if(changedJobs)
				{
					var foundJob = jlinq.from(changedJobs).equals("JID", parseInt(currJob)).first();
					
					if(foundJob)
					{
						var i = changedJobs.indexOf(foundJob);
						
						changedJobs.splice(i,1);
						changedJobs.push(newJobJS);
					}
					else
					{
						changedJobs.push(newJobJS);
						
						var oldJob1 = jlinq.from(unchangedJobs).equals("JID", parseInt(currJob)).first();  //Remove From Old Jobs
						
						if(oldJob1)
						{
							var i = unchangedJobs.indexOf(oldJob1);
	
							unchangedJobs.splice(i,1);
							saveJSToIsoStorage("jobs",unchangedJobs);
						}
					}
				}
				else
				{
					changedJobs = new Array();
					changedJobs.push(newJobJS);  //Add Change
					
					var oldJob = jlinq.from(unchangedJobs).equals("JID", parseInt(currJob)).first();
						
					if(oldJob)
					{
						var i = unchangedJobs.indexOf(oldJob);

						unchangedJobs.splice(i,1);
						saveJSToIsoStorage("jobs",unchangedJobs);
					}
				}
				
				saveJSToIsoStorage("changedjobs",changedJobs);
				
				UpdateJobsList();
				
			}
			
			currJobAsset = newAssetJS.Aid;
			currJobAsset = newAssetJS.Aid;
			
			if(changedAssets)  //Already has changed assets
			{
				changedAssets.push(newAssetJS);  //Add Change to existing array
				
				saveJSToIsoStorage("changedassets",changedAssets);
			}
			else  //Create a new Asset List
			{
				changedAssets = new Array();
				changedAssets.push(newAssetJS);  //Add Change
				
				saveJSToIsoStorage("changedassets",changedAssets);
			}
			
			UpdateAssetList();
			
			return newAssetJS;
		}
		else
		{
			return undefined;	
		}
	}
	catch(e)
	{
		
	}
}

function GenerateUserJobID()
{
	var id = "";
	
	if(currUser)
	{
		if(currUser.fn)
		{
			if(currUser.fn.length > 0)
			{
				id += currUser.fn.charAt(0);	
			}	
		}
		
		if(currUser.sn)
		{
			if(currUser.sn.length > 0)
			{
				id += currUser.sn.charAt(0);
			}	
		}
		
	}
	
	var d = new Date();
	var dt = d.getTime().toString();
	id += dt;	
	
	return id;
}
	
function CreateCustomerAsset(customerID)
{
	try{
		var newAssetJS = $.parseJSON(newassetModel);
		
		if(newAssetJS)
		{
			var guig = generateGuid();
	
			newAssetJS.Aid = guig;
	
			newAssetJS.Nm = "New Mobile Asset";
			
			newAssetJS.cccref = customerID;
			newAssetJS.ocrf = customerID
			newAssetJS.bcref = customerID;
			
			currCustAsset = newAssetJS.Aid;
			currCustAsset = newAssetJS.Aid;
			
			if(changedAssets)  //Already has changed assets
			{
				changedAssets.push(newAssetJS);  //Add Change to existing array
				
				saveJSToIsoStorage("changedassets",changedAssets);
			}
			else  //Create a new Asset List
			{
				changedAssets = new Array();
				changedAssets.push(newAssetJS);  //Add Change
				
				saveJSToIsoStorage("changedassets",changedAssets);
			}
			
			UpdateAssetList();
			
			return newAssetJS;
		}
		else
		{
			return undefined;	
		}
	}
	catch(e)
	{ 
		alert("Error Creating new Asset for Customer: "+e);
		return undefined;
	}
}
	
	function getNextID(changedJobsList)  //Workaround for new id generator
	{
		if(changedJobsList)
		{
			for(var j=-1;j>-100000;j--)
			{
				var exists = jlinq.from(changedJobsList).equals("JID", j).count();
				
				if(exists == 0)
				{
					return j.toString();
				}
				else if(!exists)
				{
					return j.toString();
				}
			}
		}
		else
		{
			return "-1";	
		}
	}

	
	function GenerateCustomFormsForJob(jobTypeID)
	{
        
		if(gCustomFormsList)
		{

			var assocCustomForms = jlinq.from(gCustomFormsList)
			.starts("ass", jobTypeID+',').or()
			.ends("ass", ','+jobTypeID).or()
			.contains("ass", ','+jobTypeID+',').or()
			.equals("ass", jobTypeID).select();
            
            
            
			if(assocCustomForms.length > 0)
			{
				var completeString = "[";
				
				$.each(assocCustomForms, function(ind,val)
				{
					var ss = "{";
					
					ss += "\"i\": \""+generateGuid();
					ss += "\", \"s\": "+ (val.s === true ? "1" : "0");
					ss += ", \"x\": "+val.x;
					ss += ", \"y\": "+val.y;
					ss += ", \"h\": "+val.h;
					ss += ", \"w\": "+val.w;
					ss += ", \"c\": \""+val.c;
					ss += "\", \"ts\": "+val.ts;
					ss += ", \"sl\": "+(val.sl === true ? "1" : "0");
					ss += ", \"lx\": "+val.lx;
					ss += ", \"ly\": "+val.ly;
					ss += ", \"lh\": "+val.lh;
					ss += ", \"lw\": "+val.lw;
					ss += ", \"t\": \""+val.t;
					ss += "\", \"cp\": "+(val.cp === true ? "1" : "0");
					ss += ", \"r\": "+(val.r === true ? "1" : "0");
					ss += ", \"s1\": "+(val.s1 === true ? "1" : "0");
					ss += ", \"s2\": "+(val.s2 === true ? "1" : "0");
					ss += ", \"s3\": "+(val.s3 === true ? "1" : "0");
					ss += ", \"inv\": "+(val.inv === true ? "1" : "0");
					ss += ", \"s4\": "+(val.s4 === true ? "1" : "0");
					ss += ", \"pin\": "+val.pin;
                    ss += ", \"ln\": "+(val.ln === true ? "1" : "0");
					ss += ", \"mf\": "+(val.mf === true ? "1" : "0");
				    ss += ", \"vf\": "+(val.vf === true ? "1" : "0");
					ss += ", \"fds\": \"[";
					var jsData = $.parseJSON(val.fds);
					
					if(jsData && jsData.length > 0)
					{
						$.each(jsData, function(indx,vlu)
						{
							var fs = "{";
						
							fs += "\\\"fi\\\": \\\""+generateGuid();
							fs += "\\\", \\\"x\\\": "+vlu.x;
							fs += ", \\\"y\\\": "+vlu.y;
							fs += ", \\\"h\\\": "+vlu.h;
							fs += ", \\\"w\\\": "+vlu.w;
							fs += ", \\\"s\\\": "+vlu.s;
							fs += ", \\\"d\\\": \\\""+vlu.d;
							fs += "\\\", \\\"c\\\": \\\""+vlu.c;
							fs += "\\\", \\\"ch\\\": "+vlu.ch;
							fs += ", \\\"t\\\": "+vlu.t;
							fs += ", \\\"r\\\": "+vlu.r;
							fs += ", \\\"o\\\": ";
							if(vlu.o == undefined)
							{
								fs += "null";
							}
							else
							{
								fs += vlu.o;
							}

							fs += ", \\\"ci\\\": ";
							if (vlu.ci == undefined || vlu.ci == null) {
							    fs += "null";
							}
							else {
							    fs += "\\\"" + vlu.ci + "\\\"";
							}

							fs += ", \\\"ri\\\": ";
							if (vlu.ri == undefined || vlu.ri == null) {
							    fs += "null";
							}
							else {
							    fs += "\\\""+vlu.ri+"\\\"";
							}
							
						
							if(indx == jsData.length-1)
							{
								fs = fs + "}";
							}
							else
							{
								fs = fs + "},";
							}
							
							ss += fs;
						});
						ss += "]\"";
					}
					else
					{
						ss += "]\"";
					}
					//alert(jsData.length);
					//alert(jsData[0].fi);
					//alert(val);
					//var stringy = JSON.stringify(val);
					//if(ind == 0){
					//	alert(stringy);}
					
					
					if(ind == assocCustomForms.length-1)
					{
						ss = ss + "}";
					}
					else
					{
						ss = ss + "},";
					}
					
					completeString += ss;

				}
				);
				
				completeString = completeString+"]";
				
				return completeString;
			}
			else
			{
				return "[]";
			}
			
		}
		else
		{
			return "[]";
		}	
	}
	
	function CreateNewJobForAsset(chosenAsset)
	{
		
		try
		{
			var newJobJS = $.parseJSON(newjobModel);
			
			if(newJobJS)
			{
				//var changedJobs = getJSFromIsoStorage("changedjobs");
				
				var id = getNextID(changedJobs);

				newJobJS.JID = id;
				newJobJS.JNm = "New Mobile Job";
				newJobJS.JPrD = new Date(2010,1,1,1,0,0,0);  //Proposed Duration
				newJobJS.JSD = new Date();
				newJobJS.JAcD = new Date(2010,1,1,1,0,0,0);  //Actual Duration
				
				newJobJS.JPD = new Date();
				newJobJS.IsComp = false;
				newJobJS.NNSD = false;
				newJobJS.ChC = true;
				
				newJobJS.usId = currUser.uid;
				newJobJS.uNm = currUser.fn+" "+currUser.sn;
				newJobJS.P1 = chosenAsset.Aid;
				newJobJS.S5 = GenerateUserJobID();
			    
				if(gJobTypesList)
				{
					var tempType = jlinq.from(gJobTypesList).first();
					
					if(tempType)
					{
						newJobJS.JTid = tempType.ActivityItemTypeID;
						newJobJS.JTN = tempType.Name;
						
						newJobJS.CFS = GenerateCustomFormsForJob(newJobJS.JTid);
					}
				}
				
				
				if(gJobStatusList)
				{
					var tempStat = jlinq.from(gJobStatusList).first();
					
					if(tempStat)
					{
						newJobJS.JSid = tempStat.ActivityItemStatusID;
						newJobJS.JSN = tempStat.Name;
					}
				}
				
				
				if(chosenAsset.cccref)
				{
					newJobJS.PCuN = chosenAsset.CClNm;
					newJobJS.PClN = chosenAsset.CClNm;
					newJobJS.ClRef = chosenAsset.cccref;
					newJobJS.CuRef = chosenAsset.cccref;
					
					if(gCustomerList)
					{
						var chosenCustJS = jlinq.from(gCustomerList).equals("Cid",chosenAsset.cccref).first();
						
						if(chosenCustJS)
						{
							newJobJS.BA1 = chosenCustJS.BA1;
							newJobJS.BA2 = chosenCustJS.BA2;
							newJobJS.BA3 = chosenCustJS.BA3;
							newJobJS.BA4 = chosenCustJS.BA4;
							newJobJS.BCr = chosenCustJS.BCr;
							newJobJS.BCt = chosenCustJS.BC;
							newJobJS.BSt = chosenCustJS.BS;
							newJobJS.BP = chosenCustJS.BZ;
							newJobJS.BPN = chosenCustJS.BPn;
							
							newJobJS.AA1 = chosenCustJS.BA1;
							newJobJS.AA2 = chosenCustJS.BA2;
							newJobJS.AA3 = chosenCustJS.BA3;
							newJobJS.AA4 = chosenCustJS.BA4;
							newJobJS.ACr = chosenCustJS.BCr;
							newJobJS.ACt = chosenCustJS.BC;
							newJobJS.ASt = chosenCustJS.BS;
							newJobJS.AP = chosenCustJS.BZ;
							newJobJS.APN = chosenCustJS.BPn;
						}
					}

					
				}
				else if(chosenAsset.bcref)
				{
					newJobJS.PCuN = chosenAsset.BlCNm;
					newJobJS.PClN = chosenAsset.BlCNm;
					newJobJS.ClRef = chosenAsset.bcref;
					newJobJS.CuRef = chosenAsset.bcref;
					
					if(gCustomerList)
					{
						var chosenCustJS = jlinq.from(gCustomerList).equals("Cid",chosenAsset.bcref).first();
						
						if(chosenCustJS)
						{
							newJobJS.BA1 = chosenCustJS.BA1;
							newJobJS.BA2 = chosenCustJS.BA2;
							newJobJS.BA3 = chosenCustJS.BA3;
							newJobJS.BA4 = chosenCustJS.BA4;
							newJobJS.BCr = chosenCustJS.BCr;
							newJobJS.BCt = chosenCustJS.BC;
							newJobJS.BSt = chosenCustJS.BS;
							newJobJS.BP = chosenCustJS.BZ;
							newJobJS.BPN = chosenCustJS.BPn;
							
							newJobJS.AA1 = chosenCustJS.BA1;
							newJobJS.AA2 = chosenCustJS.BA2;
							newJobJS.AA3 = chosenCustJS.BA3;
							newJobJS.AA4 = chosenCustJS.BA4;
							newJobJS.ACr = chosenCustJS.BCr;
							newJobJS.ACt = chosenCustJS.BC;
							newJobJS.ASt = chosenCustJS.BS;
							newJobJS.AP = chosenCustJS.BZ;
							newJobJS.APN = chosenCustJS.BPn;
						}
					}
				}
				else if(chosenAsset.ocrf)
				{
					newJobJS.PCuN = chosenAsset.OrCNm;
					newJobJS.PClN = chosenAsset.OrCNm;
					newJobJS.ClRef = chosenAsset.ocrf;
					newJobJS.CuRef = chosenAsset.ocrf;
					
					if(gCustomerList)
					{
						var chosenCustJS = jlinq.from(gCustomerList).equals("Cid",chosenAsset.ocrf).first();
						
						if(chosenCustJS)
						{
							newJobJS.BA1 = chosenCustJS.BA1;
							newJobJS.BA2 = chosenCustJS.BA2;
							newJobJS.BA3 = chosenCustJS.BA3;
							newJobJS.BA4 = chosenCustJS.BA4;
							newJobJS.BCr = chosenCustJS.BCr;
							newJobJS.BCt = chosenCustJS.BC;
							newJobJS.BSt = chosenCustJS.BS;
							newJobJS.BP = chosenCustJS.BZ;
							newJobJS.BPN = chosenCustJS.BPn;
							
							newJobJS.AA1 = chosenCustJS.BA1;
							newJobJS.AA2 = chosenCustJS.BA2;
							newJobJS.AA3 = chosenCustJS.BA3;
							newJobJS.AA4 = chosenCustJS.BA4;
							newJobJS.ACr = chosenCustJS.BCr;
							newJobJS.ACt = chosenCustJS.BC;
							newJobJS.ASt = chosenCustJS.BS;
							newJobJS.AP = chosenCustJS.BZ;
							newJobJS.APN = chosenCustJS.BPn;
						}
					}
				}
				
				currJob = newJobJS.JID;
				
				if(changedJobs)  //Already has changed assets
				{
					changedJobs.push(newJobJS);  //Add Change to existing array
					
					saveJSToIsoStorage("changedjobs",changedJobs);
				}
				else  //Create a new Asset List
				{
					changedJobs = new Array();
					changedJobs.push(newJobJS);  //Add Change
					
					saveJSToIsoStorage("changedjobs",changedJobs);
				}
				
				UpdateJobsList();
				
				return true;
			}
			else
			{
				return false;	
			}
		}catch(e)
		{
			alert("Error Creating new Job: "+e);
			return false;
		}
	}
	
	function CreateNewJobForCustomer(chosenCustJS)
	{
		
		try
		{
			var newJobJS = $.parseJSON(newjobModel);
			
			if(newJobJS)
			{
				var id = getNextID(changedJobs);


				newJobJS.JID = id;
				newJobJS.JNm = "New Mobile Job";
				newJobJS.JPrD = new Date(2010,1,1,1,0,0,0);  //Proposed Duration
				newJobJS.JSD = new Date();
				newJobJS.JAcD = new Date(2010,1,1,1,0,0,0);  //Actual Duration
				
				newJobJS.JPD = new Date();
				newJobJS.IsComp = false;
				newJobJS.NNSD = false;
				newJobJS.ChC = true;
				newJobJS.S5 = GenerateUserJobID();
				
				if(gJobTypesList)
				{
					var tempType = jlinq.from(gJobTypesList).first();
					
					if(tempType)
					{
						newJobJS.JTid = tempType.ActivityItemTypeID;
						newJobJS.JTN = tempType.Name;
						newJobJS.CFS = GenerateCustomFormsForJob(newJobJS.JTid);
					}
				}
				
				
				if(gJobStatusList)
				{
					var tempStat = jlinq.from(gJobStatusList).first();
					
					if(tempStat)
					{
						newJobJS.JSid = tempStat.ActivityItemStatusID;
						newJobJS.JSN = tempStat.Name;
					}
				}
				
				newJobJS.usId = currUser.uid;
				newJobJS.uNm = currUser.fn+" "+currUser.sn;
				
				newJobJS.PCuN = chosenCustJS.Cn;
				newJobJS.PClN = chosenCustJS.Cn;
				newJobJS.ClRef = chosenCustJS.Cid;
				newJobJS.CuRef = chosenCustJS.Cid;
				
				newJobJS.BA1 = chosenCustJS.BA1;
				newJobJS.BA2 = chosenCustJS.BA2;
				newJobJS.BA3 = chosenCustJS.BA3;
				newJobJS.BA4 = chosenCustJS.BA4;
				newJobJS.BCr = chosenCustJS.BCr;
				newJobJS.BCt = chosenCustJS.BC;
				newJobJS.BSt = chosenCustJS.BS;
				newJobJS.BP = chosenCustJS.BZ;
				newJobJS.BPN = chosenCustJS.BPn;
				
				newJobJS.AA1 = chosenCustJS.BA1;
				newJobJS.AA2 = chosenCustJS.BA2;
				newJobJS.AA3 = chosenCustJS.BA3;
				newJobJS.AA4 = chosenCustJS.BA4;
				newJobJS.ACr = chosenCustJS.BCr;
				newJobJS.ACt = chosenCustJS.BC;
				newJobJS.ASt = chosenCustJS.BS;
				newJobJS.AP = chosenCustJS.BZ;
				newJobJS.APN = chosenCustJS.BPn;
				
				currJob = newJobJS.JID;
				
				if(changedJobs)  //Already has changed assets
				{
					changedJobs.push(newJobJS);  //Add Change to existing array
					
					saveJSToIsoStorage("changedjobs",changedJobs);
				}
				else  //Create a new Asset List
				{
					changedJobs = new Array();
					changedJobs.push(newJobJS);  //Add Change
					
					saveJSToIsoStorage("changedjobs",changedJobs);
				}
				
				UpdateJobsList();
				
				return true;
			}
			else
			{
				return false;	
			}
		}catch(e)
		{
			alert("Error Creating new Job: "+e);
			return false;
		}
	}
		
	function CreateNewJob()
	{
		try
		{
			var newJobJS = $.parseJSON(newjobModel);
			
			if(newJobJS)
			{
				var id = getNextID(changedJobs);

				newJobJS.JID = id;
				newJobJS.JNm = "New Mobile Job";
				newJobJS.JPrD = new Date();  //Proposed Duration
				newJobJS.JSD = new Date();
				newJobJS.JAcD = new Date(2010,1,1,1,0,0,0);  //Actual Duration
				
				newJobJS.JPD = new Date();
				newJobJS.IsComp = false;
				newJobJS.NNSD = false;
				newJobJS.ChC = true;
				
				newJobJS.usId = currUser.uid;
				newJobJS.uNm = currUser.fn+" "+currUser.sn;
				newJobJS.S5 = GenerateUserJobID();
				if(gJobTypesList)
				{
					var tempType = jlinq.from(gJobTypesList).first();
					if(tempType)
					{
						newJobJS.JTid = tempType.ActivityItemTypeID;
						newJobJS.JTN = tempType.Name;
						newJobJS.CFS = GenerateCustomFormsForJob(newJobJS.JTid);
                     
					}
				}
				
				
				if(gJobStatusList)
				{
					var tempStat = jlinq.from(gJobStatusList).first();
					
					if(tempStat)
					{
						newJobJS.JSid = tempStat.ActivityItemStatusID;
						newJobJS.JSN = tempStat.Name;
					}
				}
				
				
				
				currJob = newJobJS.JID;
				
				if(changedJobs)  //Already has changed assets
				{
					changedJobs.push(newJobJS);  //Add Change to existing array
					
					saveJSToIsoStorage("changedjobs",changedJobs);
				}
				else  //Create a new Asset List
				{
					changedJobs = new Array();
					changedJobs.push(newJobJS);  //Add Change
					
					saveJSToIsoStorage("changedjobs",changedJobs);
				}
				
				UpdateJobsList();
				
				return true;
			}
			else
			{
				return false;	
			}
		}catch(e)
		{
			alert("Error Creating new Job: "+e);
			return false;
		}
	}
		
	function CreateNewExpense()
	{
		try{
		var newExpenseJS = $.parseJSON(newExpenseModel);
		
		if(newExpenseJS)
		{
			newExpenseJS.ExpenseID = getNextID(changedExpenses);
            newExpenseJS.Description = "New Mobile Expense";
			
            
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear() + "-" + (month) + "-" + (day);
            newExpenseJS.DateAdded = today;
            newExpenseJS.AddedBy=currUser.fn+" "+currUser.sn;
            newExpenseJS.Username=currUser.fn+" "+currUser.sn;
            newExpenseJS.Cost='0';
            if(changedExpenses)  //Already has changed assets
			{
				changedExpenses.push(newExpenseJS);  //Add Change to existing array
				
				saveJSToIsoStorage("chExpenses",changedExpenses);
			}
			else  //Create a new Asset List
			{
				changedExpenses = new Array();
				changedExpenses.push(newExpenseJS);  //Add Change
				
				saveJSToIsoStorage("chExpenses",changedExpenses);
			}
			UpdateExpensesList();
			LoadExpense();
            currExpens=newExpenseJS.ExpenseID;
            refreshExpenseCount(); //reload Customer Bubble
            setStorageSize();
            setSaveButtonVisibility();
            window.location.replace('#page-expensedetails');
			return true;
		}
		else
		{
			return false;	
		}
		}catch(e){ alert("Error Creating new Expense: "+e);return false;}
	}
	



    function CreateNewAsset()
	{
		try{
		var newAssetJS = $.parseJSON(newassetModel);
		
		if(newAssetJS)
		{
			var guig = generateGuid();

			newAssetJS.Aid = guig;

			newAssetJS.Nm = "New Mobile Asset";
			
			currCustAsset = newAssetJS.Aid;
			currAsset = newAssetJS.Aid;
			
			if(changedAssets)  //Already has changed assets
			{
				changedAssets.push(newAssetJS);  //Add Change to existing array
				
				saveJSToIsoStorage("changedassets",changedAssets);
			}
			else  //Create a new Asset List
			{
				changedAssets = new Array();
				changedAssets.push(newAssetJS);  //Add Change
				
				saveJSToIsoStorage("changedassets",changedAssets);
			}
			
			UpdateAssetList();
			
			return true;
		}
		else
		{
			return false;	
		}
		}catch(e){ alert("Error Creating new Asset: "+e);return false;}
	}
	



	
	ko.dirtyFlag = function(root, isInitiallyDirty) 
		{
			var result = function() {}
			
			
			
			var _initialState = ko.observable(ko.toJSON(root));
			var _isInitiallyDirty = ko.observable(isInitiallyDirty);
		
			result.isDirty = ko.dependentObservable(function() 
			{
				return _isInitiallyDirty() || _initialState() !== ko.toJSON(root);
			});
			
			result.showInitState = function()
			{
				return _initialState();
			}
			
			result.showCurrState = function()
			{
				return ko.toJSON(root);
			}
			
			result.showinitiallyDirty = function()
			{
				return _isInitiallyDirty();
			}
		
			result.reset = function() {
				_initialState(ko.toJSON(root));
				_isInitiallyDirty(false);
			};
		
			return result;
		};
	
	
	
		var childModel = function(data) 
		{
			ko.mapping.fromJS(data, {}, this);
			this.dirtyFlag = new ko.dirtyFlag(this);
		}
		
		
		var childFieldModel = function(data) 
		{
			ko.mapping.fromJS(data, {}, this);
			this.dirtyFlag = new ko.dirtyFlag(this);
			
			this.selectFOptions = ko.dependentObservable(
			{
				read: function()
				{
					if(this.c())
					{
						var stArr = this.c().split('^');
						
						if(stArr)
						{
							if(stArr.length > 1)
							{
								var parts = stArr[1].split('|');
								
								if(parts)
								{
									return parts;	
								}
							}
							else
							{
								var parts = stArr[0].split('|');
								
								if(parts)
								{
									return parts;	
								}
							}	
							
						}
						return new Array();
					}
					else
					{
						return new Array();	
					}
				},
				write: function()
				{
					//do nothing, cannot add to the list!!!
				},
				owner: this})
		
		
		
		
		this.selectedFOption = ko.dependentObservable(
			{
				read: function()
				{
					if(this.c())
					{
						var stArr = this.c().split('^');
						
						if(stArr)
						{
							if(stArr.length > 0)
							{
								var parts = stArr[0];
								
								if(parts)
								{
									return parts;	
								}
							}	
							
						}
						return "";
					}
					else
					{
						return "";	
					}
				},
				write: function(newValue)
				{
					//do nothing, cannot add to the list!!!
					if(newValue)
					{
						var cc = this.c();
						
						if(cc)
						{
							var parts = cc.split('^');
							
							if(parts)
							{
								if(parts.length == 1)
								{
									this.c(newValue+"^"+parts[0]);
								}
								else if(parts.length == 2)
								{
									this.c(newValue+"^"+parts[1]);
								}
							}
						}
					}
				},
				owner: this})
		
		
		
			
			this.isChecked = ko.dependentObservable(
			{

			read: function()
			{
				if(this.ch() == 1)
				{
					return true;
				}
				else
				{
					return false;
				}
				//return this.c().toString();
			},
		
			write: function(newValue)
			{
				if(newValue == true)
				{
					this.ch(1);
				}
				else
				{
					this.ch(0);
				}
			},
			owner: this
			})
		}
		
		
		var jobModel = function(data) 
		{
			ko.mapping.fromJS(data, {}, this);
			this.dirtyFlag = new ko.dirtyFlag(this);
			
			this.formattedJobID = ko.computed(function(data)
			{
				var currJobID = this.JID();
				
				if(currJobID)
				{
					if(currJobID < 0)
					{
						return "New";	
					}
					else
					{
						return currJobID.toString();	
					}
				}
				return "";	
			}, this);
			
			
			this.chargeCust = ko.dependentObservable(
			{

			read: function()
			{
				var returnVar = "";
				if(this.ChC().toString() == 'true')
				{
					returnVar = "Charge Customer";
				}
				else
				{
					returnVar = "Charge Client";
				}
				
				return returnVar;
				//return (this.ChC().toString());
				//alert(retVal);
				//return retVal;
			},
		
			write: function(newValue)
			{
				
				var newVal = (newValue == 'Charge Customer');
				this.ChC(newVal);
			},
			owner: this
			}),
			
			
			this.chargeOptions = ko.observableArray(["Charge Customer", "Charge Client"]),
			
			this.JobDuration = ko.dependentObservable(
			{

			read: function()
			{
				if(this.JAcD())
				{
					//alert("read duration" + this.JAcD().toString());
					var dt = formatJSONDTAC(this.JAcD());
					

					//alert(dt+" "+this.JAcD());
					
					return dt;
				}
				return null;
			},
		
			write: function(newValue)
			{
				if(this.JAcD())
				{

					//alert(newValue);
					
					newValue = newValue.replace(/\s/g,''); 
					var initsplits = newValue.split(',');
					
					var splits = initsplits[1].split(':');
					
					var newDate = new Date(2010,0,1);
					newDate.setUTCHours(parseInt(splits[0],10),splits[1],0,0);
					this.JAcD(newDate);
				
				}
				else
				{
					newValue = newValue.replace(/\s/g,''); 
				
					var initsplits = newValue.split(',');
					
					var splits = initsplits[1].split(':');
					
					var newDate = new Date(2010,0,1);
					newDate.setUTCHours(parseInt(splits[0],10),splits[1],0,0);
					this.JAcD(newDate);
				}
			},
				owner: this
			}),
			
			
			this.BreakDuration = ko.dependentObservable(
			{

			read: function()
			{
				if(this.btme())
				{
					var dt = formatJSONDTAC(this.btme());
					//alert(dt+" "+this.JAcD());
					
					return dt;
				}
				return null;
			},
		
			write: function(newValue)
			{
				if(this.btme())
				{
					newValue = newValue.replace(/\s/g,''); 
					var initsplits = newValue.split(',');
					
					var splits = initsplits[1].split(':');
					
					var newDate = new Date(2010,0,1);
					newDate.setUTCHours(parseInt(splits[0],10),splits[1],0,0);
					this.btme(newDate);
					//alert(this.JAcD());
				}
				else
				{
					newValue = newValue.replace(/\s/g,''); 
				
					var initsplits = newValue.split(',');
					
					var splits = initsplits[1].split(':');
					
					var newDate = new Date(2010,0,1);
					newDate.setUTCHours(parseInt(splits[0], 10), splits[1], 0, 0);
					this.btme(newDate);
					//alert(this.JAcD());
				}
			},
				owner: this
			}),
			
			
			
			
			
			this.TravelDuration = ko.dependentObservable(
			{

			read: function()
			{
				if(this.ttme())
				{
					var dt = formatJSONDTAC(this.ttme());
					//alert(dt+" "+this.JAcD());
					
					return dt;
				}
				return null;
			},
		
			write: function(newValue)
			{
				if(this.ttme())
				{
					newValue = newValue.replace(/\s/g,''); 
					var initsplits = newValue.split(',');
					
					var splits = initsplits[1].split(':');
					
					var newDate = new Date(2010,0,1);
					newDate.setUTCHours(parseInt(splits[0], 10), splits[1], 0, 0);
					this.ttme(newDate);
					//alert(this.JAcD());
				}
				else
				{
					newValue = newValue.replace(/\s/g,''); 
				
					var initsplits = newValue.split(',');
					
					var splits = initsplits[1].split(':');
					
					var newDate = new Date(2010,0,1);
					newDate.setUTCHours(parseInt(splits[0], 10), splits[1], 0, 0);
					this.ttme(newDate);
					//alert(this.JAcD());
				}
			},
				owner: this
			}),
			


			this.DoubleTimeDuration = ko.dependentObservable(
			{

			read: function()
			{
				if(this.DbT())
				{
					var dt = formatJSONDTAC(this.DbT());
					
					
					return dt;
				}
				return null;
			},
		
			write: function(newValue)
			{
				if(this.DbT())
				{
					newValue = newValue.replace(/\s/g,''); 
					var initsplits = newValue.split(',');
					
					var splits = initsplits[1].split(':');
					
					var newDate = new Date(2010,0,1);
					newDate.setUTCHours(parseInt(splits[0], 10), splits[1], 0, 0);
					this.DbT(newDate);
				}
				else
				{
					newValue = newValue.replace(/\s/g,''); 
				
					var initsplits = newValue.split(',');
					
					var splits = initsplits[1].split(':');
					
					var newDate = new Date(2010,0,1);
					newDate.setUTCHours(parseInt(splits[0], 10), splits[1], 0, 0);
					this.DbT(newDate);
				}
			},
				owner: this
			}),



			this.OvertimeDuration = ko.dependentObservable(
			{

			read: function()
			{
				if(this.OvT())
				{
					var dt = formatJSONDTAC(this.OvT());
					
					
					return dt;
				}
				return null;
			},
		
			write: function(newValue)
			{
				if(this.OvT())
				{
					newValue = newValue.replace(/\s/g,''); 
					var initsplits = newValue.split(',');
					
					var splits = initsplits[1].split(':');
					
					var newDate = new Date(2010,0,1);
					newDate.setUTCHours(parseInt(splits[0], 10), splits[1], 0, 0);
					this.OvT(newDate);
				}
				else
				{
					newValue = newValue.replace(/\s/g,''); 
				
					var initsplits = newValue.split(',');
					
					var splits = initsplits[1].split(':');
					
					var newDate = new Date(2010,0,1);
					newDate.setUTCHours(parseInt(splits[0], 10), splits[1], 0, 0);
					this.OvT(newDate);
				}
			},
				owner: this
			}),

			
			
			this.StartTime = ko.dependentObservable(
			{

			read: function()
			{
				if(this.JSD())
				{
					//alert("ST"+formatJSONDT(this.JSD()).toString());
					return formatJSONDT(this.JSD());
				}
				else
				{
					return null;	
				}
			},
		
			write: function(newValue)
			{
				if(this.JSD())
				{
					//alert("st2" + newValue.toString());
					var splits = newValue.split(':');
					var nowDate = new Date(this.JSD());
					
					//alert("st22" + parseInt(splits[0]).toString() + ":" + parseInt(splits[1]));
					
					var newDate = new Date(Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), parseInt(splits[0], 10), parseInt(splits[1], 10), 0, 0));
				
					//alert("st0" + newDate.toString());
					
					this.JSD(newDate);
						
					//alert("STT1" + this.JSD().toString());
				}
				else
				{
					var splits = newValue.split(':');
					var nowDate = new Date();
					
					
					var newDate = new Date(Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), parseInt(splits[0], 10), parseInt(splits[1], 10), 0, 0));
					
					this.JSD(newDate);
					
					//alert("STT2" + this.JSD().toString());
				}
			},
				owner: this
			}),




			this.ArrivalTime = ko.dependentObservable(
			{

			read: function()
			{
				if(this.ArT())
				{
					return formatJSONDT(this.ArT());
				}
				else
				{
					return null;	
				}
			},
		
			write: function(newValue)
			{
				if(this.ArT())
				{
					var splits = newValue.split(':');
					var nowDate = new Date(this.ArT());
					
					
					var newDate = new Date(Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), parseInt(splits[0], 10), parseInt(splits[1], 10), 0, 0));
				
					this.ArT(newDate);
				}
				else
				{
					var splits = newValue.split(':');
					var nowDate = new Date();
					
					
					var newDate = new Date(Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), parseInt(splits[0], 10), parseInt(splits[1], 10), 0, 0));
					
					this.ArT(newDate);
				}
			},
				owner: this
			}),


			this.CalloutTime = ko.dependentObservable(
			{

			read: function()
			{
				if(this.CoT())
				{
					return formatJSONDT(this.CoT());
				}
				else
				{
					return null;	
				}
			},
		
			write: function(newValue)
			{
				if(this.CoT())
				{
					var splits = newValue.split(':');
					var nowDate = new Date(this.CoT());
					
				    var newDate = new Date(Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), parseInt(splits[0], 10), parseInt(splits[1], 10), 0, 0));
				    this.CoT(newDate);
				}
				else
				{
					var splits = newValue.split(':');
					var nowDate = new Date();
					
					var newDate = new Date(Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), parseInt(splits[0], 10), parseInt(splits[1], 10), 0, 0));
                    this.CoT(newDate);
				}
			},
				owner: this
			}),



			this.DuebyTime = ko.dependentObservable(
			{

			read: function()
			{
				if(this.Db())
				{
					return formatJSONDT(this.Db());
				}
				else
				{
					return null;	
				}
			},
		
			write: function(newValue)
			{
				if(this.Db())
				{
					var splits = newValue.split(':');
					var nowDate = new Date(this.Db());
					
					
					var newDate = new Date(Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), parseInt(splits[0], 10), parseInt(splits[1], 10), 0, 0));
				
					this.Db(newDate);
				}
				else
				{
					var splits = newValue.split(':');
					var nowDate = new Date();
					
					
					var newDate = new Date(Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), parseInt(splits[0], 10), parseInt(splits[1], 10), 0, 0));
					
					this.Db(newDate);
				}
			},
				owner: this
			}),

			
			
			
			this.StartDate = ko.dependentObservable(
			{

			read: function()
			{
				if(this.JSD())
				{
					//alert("SD"+formatJSONDate(this.JSD()));
					return formatJSONDate(this.JSD());
				}
				else
				{
					return null;	
				}
			},
		
			write: function(newValue)
			{
				if(this.JSD())
				{
					var currJSD = new Date(this.JSD());
					
					var dateParts = newValue.split("/");
					
					try
					{
					    this.JSD(new Date(Date.UTC(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], currJSD.getUTCHours(), currJSD.getUTCMinutes(), 0, 0)));
					}
					catch(err)
					{
						//alert(err.message.toString());
					}
					//alert("here1" + this.JSD().toString());
				}
				else
				{
					var dateParts = newValue.split("/");
					var nowDate = new Date();
			
					
					this.JSD(new Date(Date.UTC(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], nowDate.getUTCHours(), nowDate.getUTCMinutes(), 0, 0)));
					
					//alert("here2" + this.JSD().toString());
				}
			},
				owner: this
			}),
			
			
			
			
			
			this.formattedDate = ko.computed(function(data)
			{
				//alert("here");
				var jsDate = new Date(this.JSD());
				return jsDate.toDateString();	
			}, this);
			
			
			this.SiteName = ko.computed(function(data)
			{
				if(this.PClN())
				{
					return this.PClN();
				}
				else
				{
					return "Choose Site...";	
				}
			}, this);
			
			
			this.CustomerName = ko.computed(function(data)
			{
				if(this.PCuN())
				{
					return this.PCuN();
				}
				else
				{
					return "Choose Customer...";	
				}
			}, this);
		}