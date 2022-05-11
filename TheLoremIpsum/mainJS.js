//Global Variables and Constants (try to keep to a minimum)
const trURL = "https://tearounder.thinkablecloud.co.uk/"; //Used as a coding shorthand, to save us having to find or type the URL each time
const localStorageKeyNameForCartKey = "DEMO_cart_key";  //This constant depends on which environment we are in (test, demo, live etc). Effectively a key to finding the cart_key for CoCart within localStorage. We store the current CoCart cart_key in localStorage. localStorage uses key value pairs, so the cart_key for CoCart is stored as a value (that can change) paired with a key that stays the same per environment (tests, demo, live etc)
var trOrderNumber = 0;// 0 is a good default value, because we wouldn't actually use it
const venue = "TheLoremIpsum";

var teaRounderData = {
	"Categories": {
		"Hot Drinks": { 
			"listingTemplate": "Default", 
			"mainSelects": [ 
				["Coffee", "Decaf Coffee", "Decaf Tea", "Horlicks", "Hot Chocolate", "Ovaltine", "Tea"]
			]
		},
		"Juices": { 
			"listingTemplate": "Default",
			"mainSelects": [ 
				["Apple Juice", "Cloudy Apple Juice", "Orange Juice", "Pineapple Juice", "Tropical Juice"]
			]
		},
		"Fizzy Drinks": { 
			"listingTemplate": "Default",
			"mainSelects": [ 
				["Cloudy Lemonade", "Coke", "Cola", "Lemonade", "Orangeade", "Pepsi"]
			]
		},	
		"Wines": { 
			"listingTemplate": "Default", 
			"mainSelects": [ 
				["White Wine 125ml", "White Wine 175ml", "White Wine 250ml"]
			]
		}
	}
}; //End of big load of data

/*CoCart function (stand in)
	//TODO: replace this quick and dirty hardcoded info lookup 
	(We agreed that hardcoded products would be okay for the demo 
	HOWEVER, it may actually turn out quicker to properly code this than hardcode all the different products item data
*/
function getItemData(id){
	if (id == 39){
		return {
			"id": 39,
			"name": "Cloudy Lemonade",
			"price": 190
		};
	} else if(id == 37){
		return {
			"id": 37,
			"name": "Coke",
			"price": 220
		};
	} else if(id == 35){
		return {
			"id": 35,
			"name": "Cola",
			"price": 220
		};
	} else if(id == 38){
		return {
			"id": 38,
			"name": "Lemonade",
			"price": 170
		};
	} else if(id == 40){
		return {
			"id": 40,
			"name": "Orangeade",
			"price": 170
		};
	} else if(id == 39){
		return {
			"id": 36,
			"name": "Pepsi",
			"price": 200
		};
	}
}

/* In TR's dropdown based layout, we have all the product names to hand, but not id's
in fact item id wasn't a concept until we started using CoCart. Caring about individual prices happened during using CoCart, since the backend had all these different prices
TODO: replace this quick hack
*/
function getItemDataByName(name){
	if (name == "Coffee"){
		return {
			"id": 24,
			"name": "Coffee",
			"escapedName": "Coffee",
			"price": 300
		};
	} else if (name == "Decaf Coffee" || name == "Decaf%20Coffee"){ 
		return {
			"id": 26,
			"name": "Decaf Coffee",
			"escapedName": "Decaf%20Coffee",
			"price": 270
		};
	} else if (name == "Decaf Tea" || name == "Decaf%20Tea"){ 
		return {
			"id": 25,
			"name": "Decaf Tea",
			"escapedName": "Decaf%20Tea",
			"price": 270
		};
	} else if (name == "Horlicks"){ 
		return {
			"id": 29,
			"name": "Horlicks",
			"escapedName": "Horlicks",
			"price": 250
		};
	} else if (name == "Hot Chocolate" || name == "Hot%20Chocolate"){ 
		return {
			"id": 27,
			"name": "Hot Chocolate",
			"escapedName": "Hot%20Chocolate",
			"price": 250
		};
	} else if (name == "Ovaltine"){ 
		return {
			"id": 28,
			"name": "Ovaltine",
			"escapedName": "Ovaltine",
			"price": 250
		};
	} else if (name == "Tea"){ 
		return {
			"id": 23,
			"name": "Tea",
			"escapedName": "Tea",
			"price": 270
		};
	} else if (name == "Apple Juice" || name == "Apple%20Juice"){
		return {
			"id": 31,
			"name": "Apple Juice",
			"escapedName": "Apple%20Juice",
			"price": 250
		};
	} else if (name == "Cloudy Apple Juice" || name == "Cloudy%20Apple%20Juice"){ 
		return {
			"id": 32,
			"name": "Cloudy Apple Juice",
			"escapedName": "Cloudy%20Apple%20Juice",
			"price": 250
		};
	} else if (name == "Orange Juice" || name == "Orange%20Juice"){ 
		return {
			"id": 30,
			"name": "Orange Juice",
			"escapedName": "Orange%20Juice",
			"price": 250
		};
	} else if (name == "Pineapple Juice" || name == "Pineapple%20Juice"){ 
		return {
			"id": 33,
			"name": "Pineapple Juice",
			"escapedName": "Pineapple%20Juice",
			"price": 250
		};
	} else if (name == "Tropical Juice" || name == "Tropical%20Juice"){ 
		return {
			"id": 34,
			"name": "Tropical Juice",
			"escapedName": "Tropical%20Juice",
			"price": 250
		};
	} else if (name == "Cloudy Lemonade" || name == "Cloudy%20Lemonade"){
		return {
			"id": 39,
			"name": "Cloudy Lemonade",
			"escapedName": "Cloudy%20Lemonade",
			"price": 190
		};
	} else if(name == "Coke"){
		return {
			"id": 37,
			"name": "Coke",
			"escapedName": "Coke",
			"price": 220
		};
	} else if(name == "Cola"){
		return {
			"id": 35,
			"name": "Cola",
			"escapedName": "Cola",
			"price": 220
		};
	} else if(name == "Lemonade"){
		return {
			"id": 38,
			"name": "Lemonade",
			"escapedName": "Lemonade",
			"price": 170
		};
	} else if(name == "Orangeade"){
		return {
			"id": 40,
			"name": "Orangeade",
			"escapedName": "Orangeade",
			"price": 170
		};
	} else if(name == "Pepsi"){
		return {
			"id": 36,
			"name": "Pepsi",
			"escapedName": "Pepsi",
			"price": 200
		};
	} else if (name == "White wine - 125ml" || name == "White Wine 125ml" || name == "White%20Wine%20125ml"){
		return {
			"id": 77 ,
			"name": "White Wine 125ml",
			"escapedName": "White%20Wine%20125ml",
			"price": 425
		};
	} else if (name == "White wine - 175ml" || name == "White Wine 175ml" || name == "White%20Wine%20175ml"){ 
		return {
			"id": 78,
			"name": "White Wine 175ml",
			"escapedName": "White%20Wine%20175ml",
			"price": 550
		};
	} else if (name == "White wine - 250ml" || name == "White Wine 250ml" || name == "White%20Wine%20250ml"){ 
		return {
			"id": 79,
			"name": "White Wine 250ml",
			"escapedName": "White%20Wine%20250ml",
			"price": 700
		};
	}  else {
		console.log("product not found");
		console.log(JSON.parse(JSON.stringify(name))); //stringifying and parsing to make sure the log doesn't change as name changes value, as per mdn recommendation: https://developer.mozilla.org/en-US/docs/Web/API/console/log
		return {
			"id": 0,
			"name": "Error: Product not found",
			"escapedName": "Error%20Product%20not%20found",
			"price": 0
		};
	}
}

function startUp(){
    console.groupCollapsed("startUp()");
	console.log("startup started");
	/*coCartCheckCart() makes sure that there is a cart_key
	Todo: actually make the order grid match up with CoCart from wihtin that call
	*/
	coCartCheckCart();
	//MODAL - (Quick paste in from w3schools example with some minor adaptation to the project)
	// Get the modal
	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	var infoButton = document.getElementById("infoButton");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	
	// When the user clicks the button, open the modal 
	infoButton.onclick = function() {
		openIframe("info.html");
		document.getElementById("orderModalContainer").classList = "hidden";
		//modal.innerHTML = "<div>content from info.html</div>"; //This would be my preference rather than using a iFrame but I can't figure it out at time of writing
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
	
	roundsFromLsToGrids();
	console.log("startup finished (some async functions might still be going)");
	//Leave the alert below in for the demo!!
	alert("This is a demo that is a work in progress");
	console.groupEnd();
}

function openIframe(src){
	var modalIFrame = document.getElementById("myModalIFrame");
	var modal = document.getElementById("myModal");
	modalIFrame.src = src;
	modal.style.display = "block";
	modalIFrame.style.display = "block";
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

function addButtons(clickEventName, buttonClass, buttonTextArray, idSuffix, containerDiv, clickEventParam = "match_button_id"){
    console.log("calling addButtons(clickEventName: " +  clickEventName + ", buttonClass: " +  buttonClass + ", buttonTextArray: " +  buttonTextArray + ", idSuffix: " +  idSuffix + ", containerDiv: " +  containerDiv + ", clickEventParam: " +  clickEventParam + ")");
	/* I used to have an example here, but was out of date and misleading when I came back to this
		easiest way to understand it is to look at the console log for a set of buttons that are allready in TeaRounder somewhere: the category buttons at the top are a good example that have stayed in tearounder a while
	Creates id's based on similar concept to the one used in adding drinks to the list
	var attemptDrinkID = escape(attemptDrink);
	*/
	
	var clickEventParamActual = clickEventParam;
	
    var indexes;
    for (indexes in buttonTextArray){
		//This if (and the optional param this uses) added for easy backwards compatibility when I expanded this function. Todo: go through and do this properly
		if (clickEventParam == "match_button_id"){
			clickEventParamActual = "'" + escape(buttonTextArray[indexes]) + idSuffix + "'";
		}
        containerDiv.innerHTML += "<button id=\"" + escape(buttonTextArray[indexes]) + idSuffix +"\" class=\"" + buttonClass + "\" onclick=\"" + clickEventName+ "(" + clickEventParamActual + ")\">" + buttonTextArray[indexes] + "</button>"
    }

}

function changeTotals(addToQuantity, addToBill){
	//Quantities
	var newTotalQuantity = (parseInt(document.getElementById("totalQuantity").innerHTML)) + addToQuantity;
    document.getElementById("totalQuantity").innerHTML  = newTotalQuantity.toString();
	//Order bill
	var newTotalBill = ((parseFloat(document.getElementById("totalCostValue").innerHTML)) +  parseFloat(addToBill)).toFixed(2);
    document.getElementById("totalCostValue").innerHTML  = newTotalBill.toString();
	
	//check if there's now no items (as we'll want to prevent users from attempting to order with no items
	if (newTotalQuantity == 0){
		//de-activate the order button
	  document.getElementById("orderDrinks").disabled = "disabled";
	}
}

//increase the value in innerHTML of a given element by id by the value in change
//lower limit of 1 hardcoded here intentionally by only setting the change if the attemptAmount is above 0 (for a while, during coding the MVP, this was hardcoded to 0 - there may be code that could be simplified here, now that I've changed my mind on where to have the limit
//I've not set any upper limit, so presumably max is javascripts limits -I've tested manual tapping at least up to 350 and by changing start value to 999999 and tapping to 1000000. Thoroughly beyond requirements.
function changeAmount(elemId,change, item_key = null) {
	console.groupCollapsed("changeAmount");
	console.log("changeAmount(elemId: " + elemId + ", change" + change);
  let oldAmount = (parseInt(document.getElementById(elemId).innerHTML));
  var attemptVal = oldAmount + change;
  let drink = elemId.slice(0, (elemId.length - 6));//find length of string, then take the part of the string from 0 to (length of string - the word we're ignoring)
  let itemData = getItemDataByName(drink);
  let priceDecimal = (itemData.price / 100).toFixed(2);
  //alert("change " + change + " attemptVal " + attemptVal ); //debug code
  if (attemptVal > 0) {
    document.getElementById(elemId).innerHTML = attemptVal.toString();
    //also change the total amount of drinks via changeTotals(addToQuantity, addToBill)
    changeTotals(change, (priceDecimal * change) );//when removing items, change will equal a negative amount
  } else if (attemptVal == 0){
		//Remove Item function needs the div ID for the item. div ID is currently the name of the drink as displayed in the text, which is the same as the ID we pass in to this function but without the word "Amount" at the end

		//TODO: Line beneath currently commented out as it sometimes has errors that stop changeAmount, but if we rely just on CoCart to update the grid, that all works great
		//removeItem(drink);
  } 
  
  if (change > 0){
	  coCartAddItem(itemData.id.toString());
  } else if (change < 0){
	  //coCartSubtractItem(item_key, oldAmount)
	  coCartSubtractItem(item_key, oldAmount);
  }
  console.groupEnd();
}

function removeItem(itemID){
	rowElem = document.getElementById(itemID);
	
	if (rowElem == null){
		console.log("rowElem is null!!");
	}
	console.log("rowElem is ...");
	console.log(rowElem);
	console.log("itemID is: " + itemID);
	
	if(confirm("Remove this item?")){
		//get the amount of items being removed
		var amountRemoved = parseInt(document.getElementById(itemID+"Amount").innerHTML);
		//get the cost of the items being removed
		var itemCostEach = (getItemDataByName(itemID).price / 100).toFixed(2);
		//update the new totals via changeTotals(addToQuantity, addToBill) - we're removing, whereas the params are expressed in the amount you are adding, so pass negative values
		changeTotals((0 - amountRemoved), (0 - (amountRemoved * itemCostEach)));
		//Remove the entire div for the list item - div ID is passed in
		//Div will be the only div of that ID within the div "drinks" 
		console.log("Deleting table row element with id: " + rowElem);
		document.getElementById("drinks").removeChild(rowElem);
	}
}

function appendToLocalStorageArray(key,value){ 
	let data = JSON.parse(loadFromLocalStorage(key, "[]"));
	console.log(data);
	data.push(value);
	console.log(data);
	data = JSON.stringify(data);
	saveToLocalStorage(key, data);
}

function saveToLocalStorage(key,value){ 
/*Returns true if successful, alerts if not*/
	//Before using web storage, check browser support for Storage (covers both localStorage and sessionStorage)
	if (typeof(Storage) !== "undefined") {
	//Storage is there, so we'll save it
		localStorage.setItem(key, value);
		return true; //lets us display a relevant success message or carry on doing things
	} else {
	  //No Web Storage support - TODO: is this a good experience??
	  alert("couldn't save, browser doesn't support local storage");
	  return false;
	}
}

//renamed from function loadCartKey to coCartLoadCartKey when porting over from test area 1 to demo
// then renamed to loadFromLocalStorage when I was looking for a generic function and couldn't see one, and realised this is generic except in name
function loadFromLocalStorage(localStorageKey, defaultValue = null){
	let value = localStorage.getItem(localStorageKey);
	if (value == null){ //Everything that needs to happen if it wasn't found in local storage goes in here
		console.log(localStorageKey + " not found as a key in localStorage");
		if (defaultValue != null){
			saveToLocalStorage(localStorageKey,defaultValue);
			value = defaultValue;
		}
	} else {
		console.log(localStorageKey + " found as a key in localStorage");
	}
	return value;
}

//renamed from function removeCartKey() when porting from test area 1 to demo
function coCartRemoveCartKey(){
	localStorage.removeItem(localStorageKeyNameForCartKey);
}

//renamed from checkCart() when porting from test 1 to demo
function coCartCheckCart(){
	console.log("coCartCheckCart() running");
	//let cartKey = document.getElementById("cartKeyInput").value;
	//attempt to get a cart_key from localStorage, and create a query string from it if there, if one isn't there, don't use a cart_key - so leave the query string empty including the ? symbol
	let cartKey = loadFromLocalStorage(localStorageKeyNameForCartKey);
	let cartKeyQuery = "";
	if (cartKey != null){ //we only want to append a cart_key querystring if loadCartKey returned a value
		cartKeyQuery = "?cart_key=" + cartKey;
	}

	$.ajax({
	  url: trURL + "wp-json/cocart/v2/cart" + cartKeyQuery,
	  method: "GET",
	  dataType: "json",
	  contentType: "application/json; charset=utf-8",
	  complete: function (response) {
		console.log(response);
		console.log("cart_key in response: " + response.responseJSON.cart_key)
		coCartUpdateTable(response);
		if (cartKey == null){
			saveToLocalStorage(localStorageKeyNameForCartKey,response.responseJSON.cart_key);
		}
	  }
	});
	console.log("coCartCheckCart() finished");
}

//renamed from function updateTable when porting from test 1 to demo
function coCartUpdateTable(response){
	console.groupCollapsed("coCartUpdateTable")
	console.log("updating table");
	let items = response.responseJSON.items;
	var newHTML = "";
	let itemData = "";
	document.getElementById("drinks").innerHTML  = "";
	
	var trCurrentOrderList = JSON.parse(loadFromLocalStorage("trCurrentOrderList")); //Todo: we may need to wrap parse in a try catch or other handling of the data coming back as non JSON. Depends on the risk of that value being non-JSON, and wether errors in those scenarios are an issue
	console.log(trCurrentOrderList);
	for(i = 0; i < items.length; i++){
		console.log("adding row for id " + items[i].id + " name: " + items[i].name + " qty: " + items[i].quantity.value + " price: " + items[i].price);
		itemData = getItemDataByName(items[i].name);
		console.log(itemData.escapedName);
		//add the HTML for this table row (the <tr> element)
		addHTMLTrToDrinks(itemData.escapedName, items[i].name, itemData.escapedName + "Amount", items[i].quantity.value, (items[i].price / 100).toFixed(2));
		/*check if we need to add any name inputs 
			<input> elements for users to add a name of who's having the item
			if itemData.escapedName is in our localStorage trCurrentOrderList 
				then for every string in the names array
					names array is index 2 of the drink line array
				
			Todo: if the whole app runs off localStorage as a go between, we could improve this code
				as all the items would be in there not just ones with name inputs
		*/
		if(trCurrentOrderList != null){
			for(j = 0; j < trCurrentOrderList.length; j++){
				if(trCurrentOrderList[j][0] == itemData.escapedName){
					for(k = 0; k < trCurrentOrderList[j][2].length; k++){
						console.log("create an input");
						//Then call a function that just adds the <tr>'s HERE
						addNameInput(itemData.escapedName, k, trCurrentOrderList[j][2][k]);
					}
					break;
				}
			}
		}
	}
	
	//update total
	document.getElementById("totalCostValue").innerHTML = (response.responseJSON.totals.total / 100).toFixed(2); 
	//update quantity 
	document.getElementById("totalQuantity").innerHTML = response.responseJSON.item_count; 	
	//also set the order button to clickable
	document.getElementById("orderDrinks").disabled = "";
	console.groupEnd();
}

function coCartGoToCheckout(){
	let cartKey = loadFromLocalStorage(localStorageKeyNameForCartKey);
	if (cartKey != null){ //validate that there is actually a cart to take to the checkout
		let checkoutURL = "";
		checkoutURL = trURL + "checkout/?cocart-load-cart=" + cartKey;
		//openIframe(checkoutURL);  //sadly some security thing means we can't load the checkout screen into an iFrame
		window.open(checkoutURL, '_blank').focus();
		//TODO: Improve the UX - with people trying to add to cart that are already at the checkout
		coCartRemoveCartKey();
	} else {
		alert("Error: Is there a cart with items to take to the checkout?");
	}
}

function coCartAddItem(id){
	//attempt to get a cart_key from localStorage, and create a query string from it if there, if one isn't there, don't use a cart_key - so leave the query string empty including the ? symbol
	let cartKey = loadFromLocalStorage(localStorageKeyNameForCartKey);
	let cartKeyQuery = "";
	if (cartKey != null){ //we only want to append a cart_key querystring if loadCartKey returned a value
		cartKeyQuery = "?cart_key=" + cartKey;
	}

	//now do the actual AJAX call (via jQuery)
	$.ajax({
	  //The number after v in the URL below may look wrong, but having v3 instead gets a 404 error because CoCart 3 uses API version v2
	  url: trURL + "wp-json/cocart/v2/cart/add-item" + cartKeyQuery,
	  method: "POST",
	  data: JSON.stringify({
		"id" : id,
		"quantity" : "1"
	  }),
	  dataType: "json",
	  contentType: "application/json; charset=utf-8",
	  complete: function (response) {
		console.log(response);
		coCartUpdateTable(response);
		if (cartKey == null){
			saveToLocalStorage(localStorageKeyNameForCartKey,response.responseJSON.cart_key);
			
		}
	  }
	});
}

function coCartSubtractItem(item_key, oldAmount){ 
//item__key needed for CoCart
	console.log("coCartSubtractItem(" + item_key + ")");
	let qty = oldAmount -1;
	
	//attempt to get a cart_key from localStorage, and create a query string from it if there, if one isn't there, don't use a cart_key - so leave the query string empty including the ? symbol
	let cartKey = loadFromLocalStorage(localStorageKeyNameForCartKey);
	let cartKeyQuery = "";
	if (cartKey != null){ //we only want to append a cart_key querystring if loadCartKey returned a value
		cartKeyQuery = "?cart_key=" + cartKey;
	}
	if (qty > 0){
		$.ajax({
		  url: trURL + "wp-json/cocart/v2/cart/item/" + item_key + cartKeyQuery,
		  method: "POST",
		  data: JSON.stringify({
			"quantity" : qty
		  }),
		  dataType: "json",
		  contentType: "application/json; charset=utf-8",
		  complete: function (response) {
			console.log(response);
			coCartUpdateTable(response);
		  }
		});
	} else if (qty == 0){
		$.ajax({
		  url: trURL + "wp-json/cocart/v2/cart/item/" + item_key + cartKeyQuery,
		  method: "DELETE",
		  dataType: "json",
		  contentType: "application/json; charset=utf-8",
		  complete: function (response) {
			console.log(response);
			coCartUpdateTable(response);
		  }
		});
	} else {
		console.log("quantity too low error")
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
		NB: I SET THEM ALL TO "default" FOR THE DEMO SINCE WE NOW JUST USE ONE SELECT
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
	console.log("addDrink about to call newDrink with drinkCombo == (next line)");
	console.log(drinkCombo);
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
		NB: for demo, we're only having one dropdown - but this is achieved via the JSON as that was easier
		To fill the price will be more complex:
			We'll have to find the item name from categoryData[0][0]
			We'll have to get the price for the first item shown from getItemDataByName(name)
	*/
	var categoryData = getCategory(category);
	for (var index in categoryData){
		createSelect(categoryData[index], ("select" + index.toString()), "tabSelects", "drinkSelects");
		
	}
	
	//When the user changes the item, the price needs to change as well
	document.getElementById("select0").onchange = function(){ 
		document.getElementById("itemCostValue").innerHTML = (getItemDataByName(this.value).price/ 100).toFixed(2);
	};
	
	//Place the category name into the add button value attribute
	document.getElementById("addDrink").value = category;
	
	
	//itemCostValue
	document.getElementById("itemCostValue").innerHTML = (getItemDataByName(categoryData[0][0]).price/ 100).toFixed(2);
	//Todo: Create buttons OR DIVS! instead (started doing, bit more of a faff than I have time for right now - I've resolved some of the issues, but I need to be moving on)
  //addButtons(clickEventName, buttonClass, buttonTextArray, idSuffix, containerDiv,                      ,   );
	//addButtons("addDrink",  "addDrink",     categoryData[0], "Add", document.getElementById("tabContents"), "");
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
	console.groupCollapsed("newDrink");
	console.log("newDrink called, attemptDrink == " + attemptDrink);
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

	let itemData = getItemDataByName(attemptDrink);
	console.log(itemData);
	let priceDecimal = (itemData.price / 100).toFixed(2);

	//I initially thought this line might mean that drinks with spaces in them wouldn't work but they do
	//will still need some sanitizing
	var attemptDrinkAmountID = attemptDrinkID + "Amount";

	//avoid exact duplicates (to prevent odd looking behaviour that might occur after a user causes that to happen), if the drinks div has an element with the attemptDrinkID inside, then add 1 to the amount rather than carry on with the rest of this function
	if(document.getElementById("drinks").contains(document.getElementById(attemptDrinkID))){
		changeAmount(attemptDrinkAmountID,1);
		return;
	} else {//HERE
		addHTMLTrToDrinks(attemptDrinkID, attemptDrink, attemptDrinkAmountID, startAmount, priceDecimal);
		//Have to add to the totals as well via changeTotals(addToQuantity, addToBill)
		changeTotals(1,priceDecimal);
		//make sure the order button is activated (since it's disabled at start)
		document.getElementById("orderDrinks").disabled = "";
		coCartAddItem(itemData.id.toString());
	}
  /*
  //totalCostValue
  var oldTotalCost = parseFloat(document.getElementById("totalCostValue").innerHTML);
  //alert(oldTotalCost);
  //Doesn't use correct number of decimal points!
  var newTotalCost = (oldTotalCost + 2.00).toString();
  //alert(newTotalCost);
  document.getElementById("totalCostValue").innerHTML = newTotalCost; */
  console.groupEnd();
}

function addHTMLTrToDrinks(attemptDrinkID, attemptDrink, attemptDrinkAmountID, amount, priceDecimal){
	/*newHTML exists to allow us to write the entire div to the innerHTML in one go, 
		whilst allowing this code to be in the easiest to read form I can think of, with indentation for the HTML.
		Todo: code cleanup / make less brittle by using appendChild instead of innerHTML - see addNameInput for example
	*/
	
	let itemData = getItemDataByName(attemptDrink);
	var newHTML = "";
	newHTML += ("<tr id=\"" + attemptDrinkID + "\">"); //class=\"DrinkLine\"
		newHTML += ("<td class=\"DrinkName\">" + attemptDrink + "</td>");	
		newHTML += ("<td><button class=\"BtnNote\" onclick=\"btnAddName('" + itemData.escapedName + "')\">✏️</button></td>");
		newHTML += ("<td id=\"" + attemptDrinkAmountID + "\" class=\"Amount\">" + amount + "</td>");
		newHTML += ("<td class=\"DrinkLineControls\">");	
			newHTML += ("<button class=\"BtnMore\" onclick=\"changeAmount('" + attemptDrinkAmountID + "',1)\">+</button>");
			newHTML += ("<button class=\"BtnLess\" onclick=\"changeAmount('" + attemptDrinkAmountID + "',-1)\">-</button>");
		newHTML += ("</td>");
		newHTML += ("<td class=\"CostEach\">");
			newHTML += (priceDecimal);
		newHTML += ("</td>");
	newHTML += ("</tr>");
	//write newHTML to the drinks table
	document.getElementById("drinks").innerHTML += newHTML; 
}

function showViaClass(id){
  document.getElementById(id).classList.remove("hidden");
  document.getElementById(id).classList.add("showing");
}

function hideViaClass(id){
  document.getElementById(id).classList.remove("showing");
  document.getElementById(id).classList.add("hidden");
}

function switchTbody(id, classToSwitch) {
  var x = document.getElementsByClassName(classToSwitch);
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].classList.remove("showing");
    x[i].classList.add("hidden");
  }
  document.getElementById(id).classList.remove("hidden");
  document.getElementById(id).classList.add("showing");
}

function showOrderItems(orderId){
	//alert("show order items called, orderId is " + orderId);
	
	document.getElementById("myModalIFrame").src = "";//We don't show anything in the iFrame for this - that's only needed where theres a whole load of handwritten HTML and text for the user
	document.getElementById("myModalIFrame").style.display = "none";
	document.getElementById("myModal").style.display = "block";
	//show orderModalContainer WARNING replacing classlist is fragile - will remove any other classes
	document.getElementById("orderModalContainer").classList = "showing";
	//get all the tbody elements so we can loop through, and hide all the other ones and show just the one we want
	//Todo: it's probably possible to make this faster by only hiding orders that aren't the one you're about to show
	var el = document.querySelectorAll('#previousOrderItems tbody');
	for (let i = 0; i < el.length; i++) { //start by initiatig variable i at 0, each loop check it's less than the length of the el array, and at end of each loop add one to i.
		//alert(el[i].classList.toString());
		el[i].classList = "hidden";
	}
	
	//orderNum.toString() + "detailsTbody"
	document.getElementById(orderId.toString() + "detailsTbody").classList = "default";
	/*
	document.getElementById("reAddToList").onclick = function() {
		//comment for quick ctrl f purposes: function reAddToList
		console.log(orderId);
		let trPastOrders = JSON.parse(loadFromLocalStorage("trPastOrders"));
		console.log(trPastOrders[orderId - 1]);
		coCartCheckCart();
		for(let i = 0; i < trPastOrders[orderId - 1].orderList.length; i++){
			console.log(trPastOrders[orderId - 1].orderList[i]);
			for(let j = 0; j < trPastOrders[orderId - 1].orderList[i][1]; j++){
				setTimeout(
					function() 
					{
						itemData = getItemDataByName(trPastOrders[orderId - 1].orderList[i][0]);
						console.log("itemData.id: " + itemData.id);
						coCartAddItem(itemData.id.toString());
						console.log("***************" + itemData.name + "***************");
					}, (i * j * 100)
				);
			}
		}
		console.log("**************FINISHED CALLS TO COCARTADDITEM***************");
	}*/
}

function addOrderToGrids(orderNum, roundList, orderTotal){
	//console.log("addOrderToList called");
	//code based on the code in newDrink for adding items to the list
	//newHTML exists to allow us to write the entire div to the innerHTML in one go, whilst allowing this code to be in the easiest to read form I can think of. It's important that this code is easy to read for me making changes and to make it easy to check there are no bugs or locate them if needed                 
	/*		Matching header collumn						Whats going in these rows
			<th class="OrderNum">Order #</th>   		Int converted to str
			<th class="OrderItemButtonCells">Items</th> Button
			<th class="OrderTotal">£ Total</th> 		£
			<th class="OrderStatus">Status</th> 		"Status"	
	*/
	console.log(orderTotal);
	var newHTML = "";
	  newHTML += ("<tr>");  				//row tag open
	  newHTML += "<td>"  + orderNum.toString();	//table cell tag open	Order #
	  newHTML += "</td>"; 						//table cell tag close
	  newHTML += "<td>";  						//table cell tag open	Items
	  newHTML += ("<button class=\"BtnOrderItems\" onclick=\"showOrderItems('" + orderNum + "')\">Show Items</button>");  				//button for showing the orders item list
	  newHTML += "</td>"; 						//table cell tag close
	  newHTML += "<td>£";  						//table cell tag open	£ Total
	  newHTML += orderTotal.toString();				//place the order total into cell inner
	  newHTML += "</td>"; 						//table cell tag close
	  newHTML += "<td>Status";  				//table cell tag open	Status
	  newHTML += "</td>"; 						//table cell tag close	  
	  newHTML += "</tr>";					//row tag close

	  //console.log("row contents made");
	  
	  //write newHTML to the orders tbody
	document.getElementById("ordersTbody").innerHTML += newHTML; 
	  /*(TODO: Make this code less flimsy - I was struggling to solve this, and my solution feels like a bit of a flimsy hack)
	  take the drinks list - entire contents of the tbody, 
			and replaces all instances of 'Amount" class="Amount' (which should only be in the id's for the amount cells, and should be in all of them) 
			and replace them with the ordernum followed by '" class="Amount'
				- we don't want to get rid of the bit with the class but we do need that text to make sure we don't replace other times the word "Amount" comes up
			That replacement should ensure that everything is unique*/
	  //('Amount" class="Amount"', orderNum.toString() + '" class="Amount"');
	newHTML = "";
	let itemData = ""; 
	let priceDecimal = "";
	console.log("roundList is: ");
	console.log(roundList);
	
	let tbodyEl = document.createElement("tbody"); // <tbody> element
	tbodyEl.id = orderNum.toString() + "detailsTbody";
	tbodyEl.setAttribute("class", "hidden");
	
	let drinkTrEl; //drink <tr> element (a row in the table)
	let drinkNameTdEl; //drink name <td> element (table cell for the drink name)
	let drinkAmountTdEl; //drink amount <td> element (table cell for the drink amount)
	let costEachTdEl; //cost each <td> element (table cell for the cost per item)
	let controlsTdEl; //controls <td> element (table cell that is a container for reorder button)
	let reorderBtnEl; // reorder <button> element (marked "Add to list")
	for (var i=0; i < roundList.length; i++) { 
		itemData = getItemDataByName(roundList[i][0]);
		console.log(itemData);
		priceDecimal = (itemData.price / 100).toFixed(2);
		drinkTrEl = document.createElement("tr");
		drinkTrEl.id = itemData.escapedName;
		//newHTML += ("<tr id=\"" + itemData.escapedName + "\">"); //done
		drinkNameTdEl = document.createElement("td");
		drinkNameTdEl.setAttribute('class', "DrinkName");
		drinkNameTdEl.innerText = itemData.name;
		drinkTrEl.appendChild(drinkNameTdEl);
		//newHTML += ("<td class=\"DrinkName\">" + itemData.name + "</td>");	//done
		drinkAmountTdEl = document.createElement("td");
		drinkAmountTdEl.id = (itemData.escapedName + orderNum);
		drinkAmountTdEl.setAttribute('class', "Amount");
		drinkAmountTdEl.innerText = roundList[i][1];
		drinkTrEl.appendChild(drinkAmountTdEl);
		//newHTML += ("<td id=\"" + itemData.escapedName + orderNum + "\" class=\"Amount\">" + roundList[i][1] + "</td>"); //done
		costEachTdEl = document.createElement("td");
		costEachTdEl.setAttribute('class', "CostEach");
		costEachTdEl.innerText = priceDecimal;
		drinkTrEl.appendChild(costEachTdEl);
		//newHTML += ("<td class=\"CostEach\">"); //done
		//newHTML += (priceDecimal); //done
		//newHTML += ("</td>"); //done
		controlsTdEl = document.createElement("td");
		controlsTdEl.setAttribute('class', "Controls");
		//need to make the button and put that inside controlsTdEl before putting controlsTdEl into drinkTrEl
		//newHTML += ("<td class=\"Controls\">"); //done
				   //<button onclick="newDrink('NAME', 1)">Add to list</button>
		reorderBtnEl = document.createElement("button");
		reorderBtnEl.setAttribute('onclick', "newDrink('"+ itemData.escapedName + "', 1)");
		reorderBtnEl.innerText = "Add to list";
		controlsTdEl.appendChild(reorderBtnEl);
		drinkTrEl.appendChild(controlsTdEl);
		//newHTML += ("<button onclick=\"newDrink('" + itemData.escapedName + "', 1)\">Add to list</button"); //done
		//newHTML += ("</td>");
		//newHTML += ("</tr>"); //done
		tbodyEl.appendChild(drinkTrEl); //put the entire row into the tbody
	}
	 

	  /*(Todo: this comment will be out of date since 04/05/2022 
			when I moved from writing the tbody in one big string to using appendChild
		)
	  put the entire drinks list inside a new tbody with class .hidden set, inside table with id "previousOrderItems"
		For example, with an order number 302
		<table id="previousOrderItems" ...>
		<table/>
		becomes
		<table id="previousOrderItems" ...>
			<tbody id="302detailsTbody" class="hidden">
				[DRINKS LIST HERE]
				
			<tbody/>
		<table/>
	    */
	//put tbodyEl into previousOrderItems
	document.getElementById("previousOrderItems").appendChild(tbodyEl);
	  //document.getElementById("previousOrderItems").innerHTML += ("<tbody id=\"" + orderNum.toString() + "detailsTbody\" class=\"hidden\">" + newHTML + "</tbody>");
}

function getListItemAmounts(listID){
	console.log("function getListItemAmounts");
	let uniqueItems = document.getElementById(listID).getElementsByClassName("Amount");
	let result = [];
	let inner = [];
	//trCurrentOrderList needed from localStorage
	var trCurrentOrderList = JSON.parse(loadFromLocalStorage("trCurrentOrderList")); //Todo: we may need to wrap parse in a try catch or other handling of the data coming back as non JSON. Depends on the risk of that value being non-JSON, and wether errors in those scenarios are an issue
	for (var i=0; i < uniqueItems.length; i++) {
		inner = [];
		//item name
		inner[0] = uniqueItems[i].id.slice(0, (uniqueItems[i].id.length - 6)); //chop off the word "Amount"
		//amount 
		inner[1] = uniqueItems[i].innerHTML;
		//names array - fill by looking in trCurrentOrderList for the item name
		inner[2] = [];
		for (var j=0; j < trCurrentOrderList.length; j++) {
			if(trCurrentOrderList[j][0] == inner[0]){
				console.log(inner[0] + " found in trCurrentOrderList");
				//remove all "❌ Remove box" values, to prevent them being copied
				let trCurrentOrderList2 = trCurrentOrderList[j][2].filter(function(x) {
					return x !== '❌ Remove box';
				});
				console.log(trCurrentOrderList2);
				inner[2] = [...trCurrentOrderList2]; //... clones - see https://www.samanthaming.com/tidbits/35-es6-way-to-clone-an-array/
			}
		}
		result.push(inner);
	}
	console.log(result);
	return result;
}

function getHighestTrOrderNum(){
	//look in LS for key: "trPastOrders"
	let trPastOrders = JSON.parse(loadFromLocalStorage("trPastOrders"));
	if (trPastOrders == null){
		return 0;
	}
	return trPastOrders.length;
}

function roundsFromLsToGrids(){
	console.log("roundsFromLsToGrids() start");
	//look in LS for key: "trPastOrders"
	
	let trPastOrders = JSON.parse(loadFromLocalStorage("trPastOrders"));
	console.log(trPastOrders);
	if (trPastOrders == [] || trPastOrders == null){
		console.log("roundsFromLsToGrids(), early exit condition met: trPastOrders == [] or null");
		return;
	}
	console.log("Attempting to loop through trPastOrders");
	for(let i = 0; i < trPastOrders.length; i++){
		if(trPastOrders[i].venue == venue){
			addOrderToGrids(trPastOrders[i].trOrderNumber, trPastOrders[i].orderList, trPastOrders[i].orderTotal);
		}
	}
	console.log("roundsFromLsToGrids() finished");
}

function placeOrder(){
	/*For early demo, process after user taps "Place Order" button on main screen:
		1)Display confirm
		2) Message saying thanks for placing order
		3) Make a new tr in the orders table, with randomly incremented order number
		That new tr will need to have a clickable/tappable bit, where a modal pops up showing the full list for that order - pretty much everything from "your list" except the buttons
			
		TODO: get a confirmation of the order going through
		
		TODO: Doing next: saving the names into orders
	*/
	console.groupCollapsed("placeOrder");
	if(confirm("Ready to order? (DEMO)")){
		console.log("User confirmed: ready to order");
		trOrderNumber = getHighestTrOrderNum() + 1;
		coCartGoToCheckout();
		var orderList = getListItemAmounts("drinks");
		var orderTotal = (parseFloat(document.getElementById("totalCostValue").innerHTML)).toFixed(2);
		let orderData = {
			"venue": venue,
			"trOrderNumber": trOrderNumber,
			"orderList": orderList,
			"orderTotal": orderTotal
		};
		console.log(orderData);
		appendToLocalStorageArray("trPastOrders", orderData);
		
		
		addOrderToGrids(trOrderNumber, orderList, orderTotal);
		resetDrinks();
    }
	console.groupEnd();
}

function resetDrinks(){
/*Unlike the version of this in TR-Anywhere we don't want this all contained in a confirm - as this is done as part of placing an order*/
	document.getElementById("drinks").innerHTML = "";
	document.getElementById("orderDrinks").disabled = "disabled";
	document.getElementById("totalQuantity").innerHTML  = 0;
	document.getElementById("totalCostValue").innerHTML  = 0;
	saveToLocalStorage("trCurrentOrderList", "[]");
}

/**Names feature: Locally storing names of people against items rows**/
//var trCurrentOrderList = JSON.parse(loadFromLocalStorage("trCurrentOrderList")); //use this within funcs

function btnAddName(drink){
//adding an <input> element for users to put a name into, in the table row for a given drink
	console.groupCollapsed("addName");
	var trCurrentOrderList = JSON.parse(loadFromLocalStorage("trCurrentOrderList")); //Todo: we may need to wrap parse in a try catch or other handling of the data coming back as non JSON. Depends on the risk of that value being non-JSON, and wether errors in those scenarios are an issue
	console.log(trCurrentOrderList);
	
	//Our input element will need a unique ID
	  //Inputs Id format idea 1: start with itemName then "Name" then an int representing what index it would have if it where in an array of these input boxes
	let inputId = "";
	let nextInt = 0;
	
	
	if(trCurrentOrderList == null){
	//there's no localStorage key for data of the current order at all
		//nextInt will stay as 0, but we need to write trCurrentOrderList
		//format at start is  [["drinknNameHere", "", [""]]]  eg [["Coffee", "", [""]]]
		trCurrentOrderList = "[[\"" + drink + "\", \"\", [\"\"]]]";
		//localStorage requires a string
		saveToLocalStorage("trCurrentOrderList", trCurrentOrderList); //trCurrentOrderList already in string form, so JSON.stringify not needed and would require us to JSON.parse the string first to avoid extra backslashes
	} else {
	//there is a localStorage key for trCurrentOrderList
		//loop through looking for the drink name
		console.log("Looking through trCurrentOrderList");
		let found = false;
		for(i = 0; i < trCurrentOrderList.length; i++){
			console.log(trCurrentOrderList[i][0]);
			if(trCurrentOrderList[i][0] == drink){
				console.log("Found the item, adding empty string to LS to represent an empty input");
				found = true;
				trCurrentOrderList[i][2].push(""); //add an empty string to our array of name input values
				nextInt = trCurrentOrderList[i][2].length - 1;
				break;
			}
		}
		if(found == false){
			console.log("Didn't find the item, adding new item line");
			trCurrentOrderList.push(JSON.parse("[\"" + drink + "\", \"\", [\"\"]]"));
		}
		saveToLocalStorage("trCurrentOrderList", JSON.stringify(trCurrentOrderList));
		
	}
	
	addNameInput(drink, nextInt);
	console.groupEnd();
}

function addNameInput(drink, elemInt, value = ""){
	if(value == "❌ Remove box"){ 
	/*	This if(){ return} is a workaround for bugs elsewhere, caused by deleting <input>'s when other code uses the id's for array indexes.
			addNameInput is used everytime we add an <input> for the name of someone having a drink,
				including when updating the table, or reloading the page
			"❌ Remove box" in localStorage represents where there was an <input> but the user deleted it
			html id's of name <input>'s have to match up with array indexs in our localStorage
			So we don't create <input>'s if the value is "❌ Remove box", but other code will increment the elemInt
	*/
		return;
	}
	//drink gets us the items name
	inputId = drink + "Name" + elemInt;
	let drink2 = drink.replace(/%/g, "\\%"); //escaping all the % symbols that are there to escape spaces, so that the querySelector will work!
	console.log("querySelector for the drink row: #drinks #" + drink2 + " .DrinkName");
	//Todo (harder than it looks, only makes code better, might be easier now that we're using appendChild not innerHTML+= ) I couldn't get proper event listener working here (could in standalone page though)
		//used: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event for reference
	//using createElement, setAttribute and appendChild rather than appending to innerHTML means that any user text in other inputs in that drink row are not erased
	let inputEl = document.createElement("input");
	inputEl.id = inputId;
	inputEl.setAttribute('list', "peopleNames");
	inputEl.setAttribute('type', "search");
	inputEl.setAttribute('class', "peopleNameBox");
	inputEl.setAttribute('value', value);
	inputEl.setAttribute('oninput', 'updateName(this)');
	document.querySelector("#drinks #" + drink2 + " .DrinkName").appendChild(inputEl);
}

function removeNameInput(querySelector){
	let querySelector2 = querySelector.replace(/%/g, "\\%");//escaping all the % symbols that are there to escape spaces, so that the querySelector will work!
	let element = document.querySelector(querySelector2);
	element.remove();
}

function updateName(e){
	console.groupCollapsed("updateName");
	//e is the input element that called this, e.value will be the full current value that has been typed into it
	console.log(e);
	console.log(e.value);
	//we need to save e.value to correct array index in trCurrentOrderList
	//first get the trCurrentOrderList as a var here
	var trCurrentOrderList = JSON.parse(loadFromLocalStorage("trCurrentOrderList")); //Todo: we may need to wrap parse in a try catch or other handling of the data coming back as non JSON. Depends on the risk of that value being non-JSON, and wether errors in those scenarios are an issue
	console.log(e.id);
	var drink = e.parentNode.parentNode.id; //todo: this code is very dependant on the UI nesting!
	var inputNum = e.id.replace(e.parentNode.parentNode.id + "Name", '');
	console.log("searching for: " + drink);
	console.log("inputNum: " + inputNum);
	if(e.value == "❌ Remove box"){
		console.log("removing box: " + e.id);
		removeNameInput("#" + e.id);
	}
	for(i = 0; i < trCurrentOrderList.length; i++){
		console.log(trCurrentOrderList[i][0]);
		if(trCurrentOrderList[i][0] == drink){
			console.log("Found the item");
			
			trCurrentOrderList[i][2][inputNum] = e.value;
			break;
		}
	}
	saveToLocalStorage("trCurrentOrderList", JSON.stringify(trCurrentOrderList));
	console.groupEnd();
}