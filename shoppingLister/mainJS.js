//Global Variables (keeping to a minimum)
//Varieties of tea and coffee, not currently in the data , "Green Tea", "Herbal Teas", "Earl Grey Tea", "Lady Grey Tea", "English Breakfast Tea", "Assam Tea"

var teaRounderData = {
	"Categories": {
		"Fridge": {
			"listingTemplate": "[0]", 
			"mainSelects": [ 
				["Milk", "Cheese", "Ham", "Mayo", "Pizza", "Tortellini", "Yoghurt", "Smoothies"],
			]
		},
		"Bread tin": { 
			"listingTemplate": "[0] [1]", 
			"mainSelects": [ 
				["Loaf of Bread", "Waffles", "Wraps", "Crepes", "Bread Rolls", "Bread roll fingers"],
				["(Regular)", "(Wholemeal)", "(Any)"]
			]
		},
		"Food Staples": { 
			"listingTemplate": "Default", 
			"mainSelects": [ 
				["Pasta", "Rice", "Potatoes", "Cereal", "Chocolatey cereal"]
			]
		},
		"Tinned": { 
			"listingTemplate": "Default", 
			"mainSelects": [ 
				["Macaroni Cheese", "Tin of Tuna", "Tin of Sweetcorn", "Tin of Veg", "Tomato Soup", "Chicken Soup", "Beans"]
			]
		},
		"Sauces": { 
			"listingTemplate": "Default", 
			"mainSelects": [ 
				["Chicken and Mushroom sauce", "Bolognese", "Pasata"]
			]
		},		
		"Drinks": { 
			"listingTemplate": "Default", 
			"mainSelects": [ 
				["Coffee", "Teabags", "Fruit tea", "Milkshake", "Smoothies", "Squash", "Cola", "Ginger beer", "Beer", "Craft beer", "Cider"]
			]
		},
		"Washing / Laundry": { 
			"listingTemplate": "Default", 
			"mainSelects": [ 
				["Dishwasher tablets","Washing up liquid", "Dishwasher salt", "Washing powder", "Stain remover", "Fabric Softener", "Washing machine water softener tablets"]
			]
		}

	}
}; //End of big load of data

function startUp(){
    //MODAL - (Quick paste in from w3schools example with some minor adaptation to the project)

	// Get the modal
	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	var infoButton = document.getElementById("infoButton");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	
	// Get the iFrame that I'm using as an easy way to have a reusable modal
	var modalIFrame = document.getElementById("myModalIFrame");

	// When the user clicks the button, open the modal 
	infoButton.onclick = function() {
		//modal.innerHTML = "<div>content from info.html</div>"; //This would be my preference rather than using a iFrame but I can't figure it out at time of writing
		modalIFrame.src = "info.html";
		modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
		modal.style.display = "none";
	  }
	}

	//START OF SETTING THE CATEGORY AREA
	var categories = getCategories();

	var buttonSuffix = "Category";
	//Add all the category buttons
	//function addButtons(clickEventName, buttonClass, buttonTextArray, idSuffix, containerDiv)
    addButtons("categoryChange", "tablinks", categories, buttonSuffix, document.getElementById("categoriesContainer"));
	//"Change" the category that is currently selected, to whatever is the first category in the dataset
	categoryChange(escape(categories[0]) + buttonSuffix);
}



//I keep thinking there must be a simpler way to do this, but haven't found anything
function getCategories(){
	var categoryArray = [];
	for (var category in teaRounderData.Categories){	
		categoryArray.push(category);
	}
	return categoryArray;
}

//chosenCategory will be a string
function getCategory(chosenCategory){ 
//Get the array in the "mainSelects" property of the given category
	var outerArray = [];
	var newInnerArray = [];
	
	var unEscapedCategory = unescape(chosenCategory);
	
	for (var subset in teaRounderData.Categories[unEscapedCategory].mainSelects){
	    newInnerArray = [];
	    for(var item in teaRounderData.Categories[unEscapedCategory].mainSelects[subset]){//Not the best var naming but hey ho
	        newInnerArray.push(teaRounderData.Categories[unEscapedCategory].mainSelects[subset][item]);
	    }
	    outerArray.push(newInnerArray);
	}
	return outerArray;
}


function accordionSetup(){
	//ACCORDION (pasted in from w3schools, I've tested it and read through, I understand it and can't see any improvements I could make - I'd have probably written this using a named function, that I'd state in the html in onclick attributes but this seems easier to reuse, since it's more componentised.)
	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
	  acc[i].addEventListener("click", function() {
		/* Toggle between adding and removing the "active" class,
		to highlight the button that controls the panel */
		this.classList.toggle("active");

		/* Toggle between hiding and showing the active panel */
		var panel = this.nextElementSibling;
		if (panel.style.display === "block") {
		  panel.style.display = "none";
		} else {
		  panel.style.display = "block";
		}
	  });
	}
}

function createSelect(items, selectId, containerId, selectClass){
	//items should = [] if it's to be an empty select
	var containerElement = document.getElementById(containerId);
	containerElement.innerHTML += "<select id=\"" + selectId + "\" class=\"" + selectClass + "\">  </select>";
	
	if(items != []){
		addToSelect(items, selectId);
	}
}

function addToSelect(items, selectId){
//<option value="item">item</option>
    var selectElement = document.getElementById(selectId);
    var indexes;
    for (indexes in items){
        selectElement.innerHTML += "<option value=\"" + items[indexes] + "\">" + items[indexes] + "</option>" ;
    }
}

function emptySelect(selectId){
	//alert(selectId);
	document.getElementById(selectId).innerHTML = "";
}

function addButtons(clickEventName, buttonClass, buttonTextArray, idSuffix, containerDiv){
    /* To make:
		<button onclick="presetAddDrink('Hot Chocolate')">Hot Chocolate</button>
		inside an element called "categoriesContainer"
	   Pass in:
		("presetAddDrink", ["Hot Chocolate"],document.getElementById("categoriesContainer"))  
	*/  
    /*
	Creating id's based on similar concept to the one used in adding drinks to the list
	var attemptDrinkID = escape(attemptDrink);
	*/
	
	
    var indexes;
    for (indexes in buttonTextArray){
        containerDiv.innerHTML += "<button id=\"" + escape(buttonTextArray[indexes]) + idSuffix +"\" class=\"" + buttonClass + "\" onclick=\"" + clickEventName+ "('" + escape(buttonTextArray[indexes]) + idSuffix + "')\">" + buttonTextArray[indexes] + "</button>"
    }

}

//increase the value in innerHTML of a given element by id by the value in change
//lower limit of 1 hardcoded here intentionally by only setting the change if the attemptAmount is above 0 (for a while, during coding the MVP, this was hardcoded to 0 - there may be code that could be simplified here, now that I've changed my mind on where to have the limit
//I've not set any upper limit, so presumably max is javascripts limits -I've tested manual tapping at least up to 350 and by changing start value to 999999 and tapping to 1000000. Thoroughly beyond requirements.
function changeAmount(id,change) {
  var attemptVal = (parseInt(document.getElementById(id).innerHTML)) + change;
  if (attemptVal > 0) {
    document.getElementById(id).innerHTML = attemptVal.toString();
    //also change the total amount of drinks
    var newTotal = (parseInt(document.getElementById("totalQuantity").innerHTML)) + change;
    document.getElementById("totalQuantity").innerHTML  = newTotal.toString();
  }
  if (attemptVal == 0){ 
		//Remove Item function needs the div ID for the item. div ID is currently the name of the drink as displayed in the text, which is the same as the ID we pass in to this function but without the word "Amount" at the end
		var drink = id.slice(0, (id.length - 6));//find length of string, then take the part of the string from 0 to (length of string - the word we're ignoring)
		//https://www.w3schools.com/js/js_string_methods.asp
		removeItem(drink);
  }
	  
}

function removeItem(itemID){
	if(confirm("Remove this item?")){
		//get the amount of items being removed, so that we can subtract this from the total
		var amountRemoved = parseInt(document.getElementById(itemID+"Amount").innerHTML);
		//Calculate the new total
		var newTotal = (parseInt(document.getElementById("totalQuantity").innerHTML)) - amountRemoved;
		//update the new total
		document.getElementById("totalQuantity").innerHTML  = newTotal.toString();
		//Remove the entire div for the list item - div ID is passed in
		//Div will be the only div of that ID within the div "drinks" 
		document.getElementById("drinks").removeChild(document.getElementById(itemID));
		
	}
}

function addDrink(){ 
	//NOT TO BE CONFUSED WITH newDrink
    //This function previously called addTea, renamed in the build up to Beta 3 as part of making all drinks have customisations
	
	//Get all the selects, and then form a listing. I made the drinkSelects html class mostly for this purpose, as well as being helpful for styling.
	var drinkSelects = [];
	drinkSelects = document.getElementsByClassName("drinkSelects");	
	
	//Get the category that we are working with, so that we can look up info in the dataset, this would have been stored in the buttons value attribute during the function that loads the tab content.
	var categoryName = unescape(document.getElementById("addDrink").value);	
		/*
		listing templates are in the data like this:
		teaRounderData = {
			"Categories": {
				"Teas & Coffees": {
					"listingTemplate": "[0] with [1] and [2]. - [3]", 
	    */
	var drinkCombo = "";
	var template = "";
	//Can't use getCategory at the moment - that actually just returns the select arrays
	template = teaRounderData.Categories[categoryName].listingTemplate;

	if (template == "Default" || template == ""){
		drinkCombo = defaultSentence(drinkSelects);
	}else {
		for(i = 0; i < drinkSelects.length; i++){
			//can use a regex in the find part to allow for all items that fit it, or to specify if you want it to be case sensitive or not. I can't imagine a template in this use case, that would make use of that
			template = template.replace("[" + i + "]", drinkSelects[i].value);
		};
		drinkCombo = template;
	}
    //bung the string into our function for adding new drinks to the list
    newDrink(drinkCombo, 1)
}

function defaultSentence(array){
	//Used by addDrink() when theres no template given - sometimes we don't need a different template, plus it's also better quality to have this as a stand in in case theres an error. For four items in the array it will return the equivalent of: "[0] with [1], [2] & [3]". For 1 item it just does [0]. It handles all amounts of items in the array fairly neatly (although it doesn't do anything special for large amounts). The output won't make sense for all inputs though. 
	var sentence = "";
	sentence += array[0].value;
	if (array.length > 1){
		sentence += " with ";
		var i = 1
		for (i = 1; i < (array.length - 1); i++) {//NOTE THAT WE DELIBERATELY UNUSUALLY start from 1 and end 1 less than array.length (because of grammar!)
			sentence += array[i].value;
			//For grammar reasons don't add the comma before the & would be placeds
			if (i == (array.length - 2)) { continue; }
			sentence += ", ";
		//	alert(array[i].value)
		}
		if (array.length > 2){
			sentence += " & ";
		}
		sentence += array[i].value;

	}
	
	return sentence;
}

	
function categoryChange(categoryID){
	//UI function - user taps a category button, this handles the top level perspective of what happens then
	//Find all the tablinks (the buttons that have the category names on them)
	tablinks = document.getElementsByClassName("tablinks");
	//Remove the style class that gives an appearance of being selected, from all of the tablinks since we don't know which one it was on before
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" Selected", "");
	}
	//Empty the tab content area
	emptyTab();
	//Apply the style class that gives appearance of being selected to the one the user selected
	document.getElementById(categoryID).classList.add('Selected');
	
	/* The code for loading the tab content needs the category, not the categoryID, so we derive the category from the categoryID first - Need to take off the word "category" (last eight characters) of the categoryID to get the category
	Code snippet from where I've used slice before: var drink = id.slice(0, (id.length - 6));//find length of string, then take the part of the string from 0 to (length of string - the word we're ignoring)
		//https://www.w3schools.com/js/js_string_methods.asp*/
	
	var category = categoryID.slice(0,(categoryID.length - 8));//Take from character 0 to the one before the suffix "category" would start
	//Load the tab content for the category
	loadTab(category);
}

function loadTab(category){ 
	//a view changing function
	/* To load a Tab (from empty except a button for adding the chosen drink):
		get the data for that category - comes as a nested array
		then for each array in the top level array: 
			create a new select filled with that inner array
		Issue: how will the button know how many dropdowns? (solve later)
	*/
	var categoryData = getCategory(category);
	for (var index in categoryData){
		createSelect(categoryData[index], ("select" + index.toString()), "tabSelects", "drinkSelects");
		/*var teaVarieties = teaOptions[0]; //equivalent to ["Tea", "Coffee", "Decaf Tea", "Decaf Coffee"];
    //teaVariety
	createSelect(teaVarieties, "teaVariety", "tabSelects");*/
		
	}
	//Place the category name into the add button value attribute
	document.getElementById("addDrink").value = category;
}

function emptyTab(){
	//Basically just empty the div tabSelects. In future we might have to do more.
	document.getElementById("tabSelects").innerHTML = "";
}

function userAddDrink(){ 
//The click event for the add custom drink button
    newDrink(document.getElementById("inputDrinkName").value, 1)
}

function newDrink(attemptDrink, startAmount) { 
//The main internal function for adding drinks to the list.
  /* This function is called whenever we try to add a drink to the list,
	 It handles a few scenarios:
	1) HTML tags given as part of the drink name - we just strip the < and > symbols used in tags out, this prevents weird behaviour, like drink names in bold
	2) No name given - can happen if the add button for custom names is tapped with no input for the custom name (or if the name was comprised entirely of symbols stripped),
			- we just return so that nothing happens 
	  (only other reason I can think of at this moment, for this to happen would be a silly mistake in my code elsewhere, this way of handling it, works well in that scenario)
	3) Exact matches already in the list - we call the changeAmount function and then immediatly use return, so that the quantity increases by 1 on the existing list item and no new item is added
	4) " or ' symbols used in drink name - versions before I noticed this issue, took the attemptDrinkId directly from attemptDrink without escaping, meaning problematic Id's would be set if a drink name included " or '.
       We now escape the text from 	attemptDrink for the id's, attemptDrink is still used unescaped for the displayed text as that was never an issue.
	does validation, and if ok adds a drink line with the attempt drink with an int of the startAmount - in v1.4 and for some versions before we're only ever passing 1, though originally we used 0 - changed due to UX decision and done as a param since I can see potential for times when we'd want it to start out as other values (eg if we made it so that users could save a usual drinks round for their social groups, or if I made it so that users have a setting for when they add stuff to the list to put it with zero)
  */
  
  //remove < and > symbols needed for html tags via a regex
  //I tried various other regexs to remove entire tags but they would take out too much or not always take out multiple tags - at this point in time it more acceptable to keep the i from <i> showing, than to spend hours being a perfectionist over this rather inconsequential issue 
  //Regex key: / = pattern starts or ends, [] = any symbol inside, g = every case of this pattern 
  attemptDrink = attemptDrink.replace(/[<>]/g,"");
  

  //prevent adding lines with no drink name
  if (attemptDrink == ""){
      return;
  }



  //attemptDrinkID is used for element Id's on the HTML we're about to generate for other functions to use, attemptDrink stays as what will be displayed to the user
  var attemptDrinkID = escape(attemptDrink);

  //I initially thought this line might mean that drinks with spaces in them wouldn't work but they do
  //will still need some sanitizing
  var attemptDrinkAmountID = attemptDrinkID + "Amount";

  //avoid exact duplicates (to prevent odd looking behaviour that might occur after a user causes that to happen), if the drinks div has an element with the attemptDrinkID inside, then add 1 to the amount rather than carry on with the rest of this function
  if(document.getElementById("drinks").contains(document.getElementById(attemptDrinkID))){
      changeAmount(attemptDrinkAmountID,1);
      return;
  }

  /* For reference - HTML example

 <div id="Coffee" class="DrinkLine">
     <div class="DrinkName">Coffee</div>
     <button class="BtnLess" onclick="changeAmount('coffeeAmount',-1)">-1</button>
     <span id="coffeeAmount" class="Amount">1</span>
     <button class="BtnMore" onclick="changeAmount('coffeeAmount',1)">+1</button>
 </div>
*/

  /* with variables marked with []

 <div id="[attemptDrinkID]" class="DrinkLine">
     <div class="DrinkName">[attemptDrink]</div>
     <button class="BtnLess" onclick="changeAmount('[attemptDrinkAmountID]',-1)">-1</button>
     <span id="[attemptDrinkAmountID]" class="Amount">1</span>
     <button class="BtnMore" onclick="changeAmount('[attemptDrinkAmountID]',1)">+1</button>
 </div>
*/



  //newHTML exists to allow us to write the entire div to the innerHTML in one go, whilst allowing this code to be in the easiest to read form I can think of. It's important that this code is easy to read for me making changes and to make it easy to check there are no bugs orlocate them if needed
  var newHTML = "";
  newHTML += ("<div id=\"" + attemptDrinkID + "\" class=\"DrinkLine\">");
	newHTML += ("<div class=\"DrinkName\">" + attemptDrink + "</div>");
	newHTML += ("<div class=\"DrinkLineControls\">");
		newHTML += ("<div class=\"BtnLess\"> <button onclick=\"changeAmount('" + attemptDrinkAmountID + "',-1)\">-</button></div>");
		newHTML += ("<span id=\"" + attemptDrinkAmountID + "\" class=\"Amount\">" + startAmount + "</span>");
		newHTML += ("<button class=\"BtnMore\" onclick=\"changeAmount('" + attemptDrinkAmountID + "',1)\">+</button>");
	newHTML += ("</div>");
  newHTML += ("</div>");

  //Have to add to the total as well
  var newTotal = (parseInt(document.getElementById("totalQuantity").innerHTML)) + startAmount;
  document.getElementById("totalQuantity").innerHTML  = newTotal.toString();

  document.getElementById("drinks").innerHTML += newHTML;
  document.getElementById("resetDrinks").disabled = "";

  
}

function resetDrinks(){
    if(confirm("are you sure? This empties the entire list")){
        document.getElementById("drinks").innerHTML = "";
        document.getElementById("resetDrinks").disabled = "disabled";
		document.getElementById("totalQuantity").innerHTML  = 0;
    }
}

/*********Everything below here is depreciated or unused code kept as it may be useful at some point down the line*********

 - xyzOld prefixed functions are not in use, but I think I'll probably want to salvage some of the code from them at some point
 - yyyUINotInUse prefixed functions are not in use becuase I'm not using the UI that the code is based on at the moment, and I'm keeping the code here becuase it's likely that I will use that UI on a later update at some point
 - zzzUnused prefixed functions are ones that I keep for basic sanity checking. At 08/01/2020 I can't remember when I last used them though - update this comment when they get used, so that I can assess if I've not used them in a long time and can get rid of them
*******/


function xyzOldLoadSpecialitySugarAmount(){
	document.getElementById("specialitySugarAmount" ).disabled = "";
	emptySelect("specialitySugarAmount");
	addToSelect(["No sugar or sweetener", "1 sugar", "2 sugars", "3 sugars", "1 sweetener", "2 sweeteners"], "specialitySugarAmount");
}

//called from: Onchange of "drinkCategory"
function xyzOldDrinkCategoryChosen(){
	//alert("drinkCategoryChosen");
	var drinkCategory = document.getElementById("drinkCategory" ).value;
	/* The markup for the set of drop downs
			<select id="drinkCategory" onselect="drinkCategoryChosen()"></select>
			<select id="drinkCustom1" disabled="disabled"></select>
			<select id="drinkCustom2" disabled="disabled">  </select>
	*/
	var customDrinkSelect = document.getElementById("drinkCustom1" );
	var fill = [];
	//Empty the other selects - This function is users first action in making a new drink line
	emptySelect("drinkCustom1");
	emptySelect("drinkCustom2");
	document.getElementById("drinkCustom2" ).disabled = "disabled";
	emptySelect("specialitySugarAmount");
	document.getElementById("specialitySugarAmount" ).disabled = "disabled";
	
	switch(drinkCategory){
		case "Coffees":
			//set the next dropdown with coffees and enable it
			customDrinkSelect.disabled = "";
			fill = ["Choose", "Flat White Coffee", "Espresso", "Latte", "Cappuccino"];
			addToSelect(fill, "drinkCustom1");
			
			break;		
		case "Teas":
			//set the next dropdown with teas and enable it
			customDrinkSelect.disabled = "";			
			fill = ["Choose", "Green Tea", "Herbal Teas", "Earl Grey Tea", "Lady Grey Tea", "English Breakfast Tea", "Assam Tea"];
			addToSelect(fill, "drinkCustom1");
			break;
		case "Choose":
			//disable the other dropdowns
			customDrinkSelect.disabled = "disabled";
			
			break;
		default:
		customDrinkSelect.disabled = "";
	}
	
}


//called from: Onchange of "drinkCustom1"
function xyzOldDrinkCustom1Chosen(){
/*
At this point in the user experience, the user has chosen a category, and then has just chosen a more specific type - or perhaps a specific drink. 
We are filling the next drop down, depending on what they have just chosen, to allow the user to be more specific about the drink.
For many of the choices that they may have chosen, it will be a 
*/
	/*
			<select id="drinkCategory" onselect="drinkCategoryChosen()"></select>
			<select id="drinkCustom1"></select>
			<select id="drinkCustom2" disabled="disabled">  </select>
	*/
	
	var drinkCustom1Choice = document.getElementById("drinkCustom1" ).value;
	//alert("drinkCustom1Chosen " + drinkCustom1Choice);
	var fill = [];
	emptySelect("drinkCustom2");
	var customDrinkSelect2 = document.getElementById("drinkCustom2");
	//["Flat White Coffee", "Espresso", "Latte", "Cappuccino"];
	//["Green Tea", "Herbal Teas", "Earl Grey Tea", "Lady Grey Tea", "English Breakfast Tea", "Assam Tea"]
	
	switch(drinkCustom1Choice){
		//NB: The same switch currently runs no matter what the previously selected options where
		//Several of the options available do not need cases specifically, since they do not need more precision
		
		//Coffee options:
		case "Espresso":
			//set the next dropdown and enable it
			customDrinkSelect2.disabled = "";
			fill = ["Single", "Double"];
			addToSelect(fill, "drinkCustom2");
			break;		
		case "Latte":
			//set the next dropdown with lattes and enable it
			customDrinkSelect2.disabled = "";			
			fill = ["Unflavoured", "Vanilla", "Gingerbread", "Peppermint", "Caramel", "Cinnamon", "Hazelnut"];
			addToSelect(fill, "drinkCustom2");
			break;
			
		//Teas (Many of them just have the amount of milk to specify - sugar is done in a fourth drop down)	
		case "Herbal Teas":
			customDrinkSelect2.disabled = "";
			fill = ["Camomile", "Peppermint"];
			addToSelect(fill, "drinkCustom2");
			break;
			
		//All the teas that use the final relative select for milk amounts, using fallthrough (multiple cases that run the same code due to only one break)
		case "Earl Grey Tea": // Fallthrough
		case "Lady Grey Tea": // Fallthrough
		case "English Breakfast Tea": // Fallthrough
		case "Assam Tea":
			customDrinkSelect2.disabled = "";
			// TODO: probable slight UX annoyance could be resolved with some extra code here: if you've already got one of these options selected maybe not refill? (Though the select is emptied before the switch, so that would have to be moved into individual cases)
			fill = ["No milk", "With milk", "Drop of milk", "Lots of milk"];
			addToSelect(fill, "drinkCustom2");
			break;
			
		//If the user has set the drop down back to Choose	
		case "Choose":
			//TODO: empty and disable the dropdowns
			customDrinkSelect2.disabled = "disabled";
			break;
		default:
			customDrinkSelect2.disabled = "";
			fill = ["Standard size", "Large", "Small"];
			addToSelect(fill, "drinkCustom2");
	}
	loadSpecialitySugarAmount();
}


//this replaces addCoffee() from previous revisions
//It is now the function used on the button marked "Add" in the specialty drinks section
function xyzOldAddSpeciality(){
	//Check if the all required options have been chosen
/*
			<select id="drinkCategory" onselect="drinkCategoryChosen()"></select>
			<select id="drinkCustom1" disabled="disabled"></select>
			<select id="drinkCustom2" disabled="disabled">  </select>
			<select id="specialitySugarAmount" disabled="disabled">  </select>
*/
	console.log("function addSpeciality() called");
	var drinkCategory = document.getElementById("drinkCategory" ).value;
	//validate if they've actually chosen something
	if (drinkCategory == "Choose"){ //not a robust way of doing this - if I change the default value I'll need to update this
		return;
	}
	
	var drinkCustom1 = document.getElementById("drinkCustom1" ).value;
	if (drinkCustom1 == "Choose"){ //not a robust way of doing this - if I change the default value I'll need to update this
		return;
	}
	//With current options there is no need to validate drinkCustom2 or specialitySugarAmount I have no idea if that will change in the future, (probably depends on UX decisions I'll face in the the next few updates) so I'm not coding for that now.
	var drinkCustom2 = document.getElementById("drinkCustom2" ).value;
	var specialitySugarAmount = document.getElementById("specialitySugarAmount" ).value;
	var coffeeCombo = drinkCustom1 + ", " + drinkCustom2 + ", " + specialitySugarAmount;
	newDrink(coffeeCombo, 1)
}

function yyyUINotInUseTopMenuTapped(){ 
	//not in use, but probably not for too much longer
	if (document.getElementById("mainMenuContent").getAttribute("class") == "dropdown-content showing"){
		document.getElementById("mainMenuContent").className = "dropdown-content hidden";
	} else {
		document.getElementById("mainMenuContent").className = "dropdown-content showing";
	}
}

function yyyUINotInUseMenu(choice){//Not in use
	
	switch(choice){
		//Should be one case per menu entry
		case 'Help and tricks':
			alert(choice + `

TeaRounder is designed to be fast to find drinks`);
			break;
		case 'Coming soon':
					
			break;
		case 'How it\'s made':
					
			break;
		case 'About the developer':
					
			break;
		default:
		
	}
	
}


/* Tester function - useful for sanity checking during dev
function zzzUnusedTestSimpleChange() {
  document.getElementById("demo").innerHTML = "Paragraph changed!";
}
*/

/*
function zzzUnusedLessC() {//deprecated
  document.getElementById("cAmount").innerHTML = (parseInt(document.getElementById("cAmount").innerHTML) - 1).toString();
}
*/