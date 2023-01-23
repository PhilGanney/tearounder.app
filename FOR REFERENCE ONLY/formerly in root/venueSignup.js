var signupStartTime = "undefined";
//var requiredRemaining = ["VenueName", "howHear", "bestEmail", "contactName"]; //when array is empty submit button can be enabled. Venue Name, How did you hear about TeaRounder?, Best email for us to contact you, Contact Name

function venueSignUpPageLoad(){
	console.groupCollapsed("page load: venueSignup");
	signupStartTime = new Date().toLocaleString('en-GB');
	console.log("Loaded at: " + signupStartTime);
	console.groupEnd();
}

function businessCardChange(){
	var businessCardEl = document.getElementById("businessCard");
	if (businessCardEl.value == "yes"){
		//unfortunately using my showViaClass function applies a class for showing that messes up the centred css.
		document.getElementById("discountCodeLbl").classList.remove("hidden");
		document.getElementById("discountCode").classList.remove("hidden");
	} else {
		hideViaClass("discountCodeLbl");
		hideViaClass("discountCode");
	}
}

function emailPrefsSelect(){
	if (document.getElementById("emailPrefs").value == "No"){
		hideViaClass("emailPrefsDetail");
	} else {
		document.getElementById("emailPrefsDetail").classList.remove("hidden");
	}
}

function showPackageInfo(){
	document.getElementById("showPackageInfo").classList.add("hidden");
	document.getElementById("hidePackageInfo").classList.remove("hidden");
	document.getElementById("packageInfo").classList.remove("hidden");
}
function hidePackageInfo(){
	document.getElementById("showPackageInfo").classList.remove("hidden");
	document.getElementById("hidePackageInfo").classList.add("hidden");
	document.getElementById("packageInfo").classList.add("hidden");
}
/*TODO: client side validation to give better UX for clients who make mistakes hitting submit too early - not critical, since all of this will be editable later and will need to be checked server side anyway. Approach I was taking before realizing I needed to move on from this was: global array tracks the required fields that haven not been filled in, altered by function triggered on change events, once global array is empty, submit button can be enabled.
function removeItemOnce(array, value) {
  var index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
  return arr;
}

function requiredSectionFill(section){
	removeItemOnce(requiredRemaining, section); 
	if (requiredRemaining == []){
		enableSubmit();
	}
}

function enableSubmit(){
	
}
*/