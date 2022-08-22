const trURL = "https://tearounder.thinkablecloud.co.uk/"; //Used as a coding shorthand, to save us having to find or type the URL each time

//for generating the products.json file
var products = {
	"Categories": {}
}

var emptyCategory = {
	"listingTemplate": "Default", 
	"mainSelects": [ 
		[]
	]
}

var productDetail = {
	
}

class Product {
	name;
	escapedName;
	id;
	price;
	constructor(name, wordpressId, priceDecimal) {
		this.name = name; //natural name as in what a human would write it as
		this.escapedName = escape(name); //spaces escaped as %20 etc
		this.id = wordpressId; //the product id within WordPress - needed for placing into the WooCommerce cart via CoCart
		this.price = parseInt(priceDecimal*100); //prices entered in x.yy format where x is pounds and y is pence, but needs to be stored in pence
	}
}

var exampleProduct = {
	"id": 300,
	"name": "Example Product",
	"escapedName": "Example%20Product",
	"price": 300
}

function configPageLoad(){
	console.groupCollapsed("configPageLoad()");
	let orderDateTime = new Date().toLocaleString('en-GB');
	console.log(orderDateTime);
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

function menuFromWooStart(){
	//start of the process of getting mennu from woo, at point where user clicks menu from WooCommerce
	hideViaClass("importMenuOptions");
	showViaClass("WooComImport");
}

function menuFromGivenWoo(){
	//follow on part of the process of getting menu from woo: the user has given their woo com URL (or at least is clicking the button to continue from the giving URL screen)
	pullMenuFromWooCom();
	showViaClass("repullMenuFromWooCom");
}

function menuFromScratchStart(){
	addNewMenuSectionToConfig();
	showViaClass("addMenuSection");
	hideViaClass("pullMenuFromWooCom");
	hideViaClass("manualMenu");
}

function addNewMenuSectionToConfig(sectionName=""){
	console.groupCollapsed("addNewMenuSectionToConfig()"); 
	var container = document.getElementById("menu_container");
	var template
	if(sectionName == ""){//using presence of a sectionName as a proxy for WooCommerce added
		template = document.getElementById("sectionTemplate");
	} else {
		template = document.getElementById("sectionTemplateWoo");
	}
	var freshSection = template.content.firstElementChild.cloneNode(true);
	
	container.appendChild(freshSection);
	var sectionDivs = container.getElementsByClassName("section");
	var sectionNameInputs = container.getElementsByClassName("sectionName");
	
	var num = sectionNameInputs.length - 1;
	sectionNameInputs[num].id = "sectionName" + num + "";
	sectionNameInputs[num].value = sectionName;
	if(sectionName != ""){
		sectionDivs[num].id = "sectionDiv" + removeWhitespace(sectionName);
		var wooSectionNameInputs = container.getElementsByClassName("sectionNameWoo");
		wooSectionNameInputs[num].innerText = sectionName;
	}//If we need ids for manually made sectionDivs: I'm pretty sure its safe to use the same num var on the end of the id, since sectionNameInputs should always corespond to sectionDivs 
	console.groupEnd();
}

function addRowBtnClicked(elem){
	var template = document.getElementById("tableRowTemplate");
	var freshRow = template.content.firstElementChild.cloneNode(true); //true in cloneNode(deep) copies all decendants as well as the node
	console.log(elem.parentNode);
	elem.parentNode.querySelector("table tbody").appendChild(freshRow);
}


function pullMenuFromWooCom(){
	console.log("pullMenuFromWooCom");
	//window.open("https://tearounder.app/importMenuFromWoo.php", "_blank")
	getWooCategories();

}

function getWooCategories(){
	document.getElementById("pullMenuFromWooComResponseArea").innerHTML = "Downloading Categories from WooCommerce<br/>(may take a minute or two if you have lots of categories or slow connection)<br/>If you've been waiting for 5 minutes or more: something is up, check you have internet, click 'Refresh Categories' and contact support while you wait";
	$.ajax({
	  url: trURL + "wp-json/cocart/v1/products/categories",
	  method: "GET",
	  dataType: "json",
	  contentType: "application/json; charset=utf-8",
	  complete: function (response) {
		//console.log(response.responseJSON);
		let categoryNames = [];
		let categoryNamesIDs = []; //outer array of 2d array for click event params
		response.responseJSON.forEach(
			element => {
				console.log(element);
				categoryNames.push(element.name);
				let newCategory = []; //inner array of 2d array for click event params
				newCategory.push("'" + element.name + "'"); //need single quote marks round it so that it will end up in the click event as a string and also not breaking JS when clicked
				newCategory.push(element.id);
				categoryNamesIDs.push(newCategory);
			}
		);
		console.log(categoryNames);
		console.log(categoryNamesIDs);
		document.getElementById("pullMenuFromWooComResponseArea").innerHTML = "Downloaded your categories, click buttons below to toggle them in or out"; //, or \"add all categories\" to put them all in
		document.getElementById("pullMenuFromWooComResponseArea2").innerHTML = "";
		//From ui.js addDivsAsButtons(clickEventName, buttonClass, buttonTextArray, idSuffix, containerDiv, clickEventParam = "match_button_id")
		addDivsAsButtons("wooCategoryClicked", "wooCategoryDivBtns", categoryNames,  "WooCatBtn", document.getElementById("pullMenuFromWooComResponseArea2"), categoryNamesIDs);
		showViaClass("createTrMenu");
		showViaClass("getDetailsFile");
		//showViaClass("addAllCategories");
	  }
	});
}

function wooCategoryClicked(name, id){
	console.log("wooCategoryClicked:");
	console.log(id);
	
	var categoryBtn = document.getElementById(escape(name) + "WooCatBtn");
	console.log(categoryBtn);
	if(categoryBtn.classList.contains("in")){
		categoryBtn.classList.remove("in");
		var sectionDivID = "sectionDiv" + removeWhitespace(name);
		document.getElementById(sectionDivID).remove();
		removeCategoryFromProductsJSON(name);
	} else{
		categoryBtn.classList.add("in");
		addNewMenuSectionToConfig(name);
		addCategoryToProductsJSON(name);
		console.log(trURL + "wp-json/cocart/v1/products?category=" + id + "&return_variations=true");
		$.ajax({
		  url: trURL + "wp-json/cocart/v1/products?category=" + id + "&return_variations=true",
		  method: "GET",
		  dataType: "json",
		  contentType: "application/json; charset=utf-8",
		  complete: function (response) {
			console.log(response);
			var freshRow;
			var sectionDivID = "sectionDiv" + removeWhitespace(name);
			console.log(response.responseJSON.length);
			let products = response.responseJSON;
			products.forEach(
				(item/*, index, arr*/)=> {  //Explanation of the commented vars and extra console.logs: in the commits when I was writing this (around and including 13/06/2022) I was new to this form of foreach, so needed some experimentation to get my head round it, and left reminders since it felt like I understood it but probably hadn't memorised the available keywords
					console.log(item);
					//console.log(index);
					//console.log(arr);
					if(item.has_options){ //a "variable product" within woocommerce
						console.log(item.variations);
						/* item.variations is an object not an array, so we cannot do item.variations.length directly, but we can create an array of the keys
							console.log(item.variations.length); //gives undefined
							console.log(Object.keys(item.variations).length); //gives an int that is the length we want
						*/
						let vKeys = Object.keys(item.variations);
						console.log(vKeys);
						let variation = "";
						for(let v = 0; v < vKeys.length; v++){
							freshRow = document.getElementById("tableRowTemplateWoo").content.firstElementChild.cloneNode(true);
							variation = item.variations[vKeys[v]]; //to get each specific variation object by its key, we have to first get each key from the array of keys made earlier
							freshRow.querySelector("td.DrinkName").innerText = variation.name;
							freshRow.querySelector("td.CostEach").innerText = variation.price;
							freshRow.querySelector("td.Show input").checked = true;
							freshRow.querySelector("td.Show input").addEventListener('change', showItemChkBxChanged);
							
							document.querySelector("#" + sectionDivID  + " table tbody").appendChild(freshRow);
							
							addProductToProductsJSON(variation.name, name);
							addProductToProductsDetailJSON(variation.id, variation.name, variation.price);
						}
					} else {
						freshRow = document.getElementById("tableRowTemplateWoo").content.firstElementChild.cloneNode(true);
						freshRow.querySelector("td.DrinkName").innerText = item.name;
						freshRow.querySelector("td.CostEach").innerText = item.price;
						freshRow.querySelector("td.Show input").checked = true;
						freshRow.querySelector("td.Show input").addEventListener('change', showItemChkBxChanged);
						document.querySelector("#" + sectionDivID  + " table tbody").appendChild(freshRow);
						addProductToProductsJSON(item.name, name);
						addProductToProductsDetailJSON(item.id, item.name, item.price);
					}
				}
			);
		  }
		});
	}
}

/*
function addAllCategories(){
	var wooSectionNameInputs = document.getElementById("pullMenuFromWooComResponseArea2").getElementsByClassName("wooCategoryDivBtns");
	console.log(wooSectionNameInputs);
	wooSectionNameInputs.forEach(
		item => {
			item.click();
		}
	);
}*/



function addCategoryToProductsJSON(name){
	console.log("addCategoryToProductsJSON: " + name);
	let oldJsonString = JSON.stringify(products.Categories);
	console.log(oldJsonString);
	console.log(oldJsonString.length);
	let newJsonString = "";
	let combinedJsonString = "";
	if (oldJsonString.length > 2){
		console.log("oldJsonString.length > start length");
		newJsonString = ',"' + name + '": ' + JSON.stringify(emptyCategory);
		oldJsonString = oldJsonString.slice(0, - 1); //remove the } off the end, so that we can just append newJsonString and then re-close
		console.log(oldJsonString);
		combinedJsonString = oldJsonString + newJsonString + "}";
		console.log(combinedJsonString);
	} else {
		console.log("oldJsonString.length not > start length");
		newJsonString = '{"' + name + '": ' + JSON.stringify(emptyCategory) + '}';
		console.log(newJsonString);
		console.log(JSON.parse(newJsonString));
		combinedJsonString = newJsonString;
	}
	
	products.Categories = JSON.parse(combinedJsonString);
	console.log(products);
}
function removeCategoryFromProductsJSON(name){
	console.log("removeCategoryFromProductsJSON: " + name);
	delete products.Categories[name];
	console.log(products);
}

function addProductToProductsJSON(product, category){
	console.log("addProductToProductsJSON: product= " + product + ", category= " + category);
	products.Categories[category].mainSelects[0].push(product);
	console.log(products);
}
function removeProductFromProductsJSON(product, category){
	console.log("removeProductFromProductsJSON: product= " + product + ", category= " + category);
	products.Categories[category].mainSelects[0].push(product);
	console.log(products);
}


function addProductToProductsDetailJSON(id, name, priceDecimal){
	let oldJsonString = JSON.stringify(productDetail);
	console.log(oldJsonString.length);
	console.log("priceDecimal: " + priceDecimal);
	//Product class:  constructor(name, wordpressId, price)
	const product = new Product(name, id, priceDecimal.substring(1));

	if (oldJsonString.length > 2){
		console.log("oldJsonString.length > start length");
		/*
			exampleProduct = {
				"id": 300,
				"name": "Example Product",
				"escapedName": "Example%20Product",
				"price": 300
			}
			"coffee": {
				"id": 24,
				"name": "Coffee",
				"escapedName": "Coffee",
				"price": 300
			},
			
			
		*/
		newJsonString = ',"' + product.escapedName.toLowerCase() + '": ' + JSON.stringify(product);
		oldJsonString = oldJsonString.slice(0, - 1); //remove the } off the end, so that we can just append newJsonString and then re-close
		console.log(oldJsonString);
		combinedJsonString = oldJsonString + newJsonString + "}";
		
	} else {
		console.log("oldJsonString.length not > start length");
		newJsonString = '{"' + product.escapedName.toLowerCase() + '": ' + JSON.stringify(product) + '}';
		console.log(newJsonString);
		console.log(JSON.parse(newJsonString));
		combinedJsonString = newJsonString;
	}
	console.log(combinedJsonString);
	productDetail = JSON.parse(combinedJsonString);
	console.log(productDetail);
}

function addJSON(){
	
}

function removeWhitespace(string){
	return string.replace(/\s/g, ''); //replace all whitespace characters and replace with nothing
}

function showItemChkBxChanged(event){
	console.log(event.currentTarget);
	if (event.currentTarget.checked) {
		console.log('checked');
		console.log(event.currentTarget.parentElement.parentElement.querySelector(".DrinkName"));
		event.currentTarget.parentElement.parentElement.querySelector(".DrinkName").classList.remove("notInTR")
	} else {
		console.log('not checked');
		console.log(event.currentTarget.parentElement.parentElement.querySelector(".DrinkName"));
		event.currentTarget.parentElement.parentElement.querySelector(".DrinkName").classList.add("notInTR")
	}
}

function activatePhpTest(){
	//this $.ajax call was written when I thought that pulling menu from woocom would all happen in PHP
	$.ajax({
	  url: "https://tearounder.app/importMenuFromWoo.php",
	  method: "POST",
	  data: {
		"q" : "Pineapple"
	  },
	  /*dataType: "json",
	  contentType: "application/json; charset=utf-8",*/
	  complete: function (response) {
		console.log(response);
		document.getElementById("pullMenuFromWooComResponseArea").innerHTML = response.responseText;
	  }
	});
	
}

function createTrMenu(){
	console.log(JSON.stringify(products));
}

function getDetailsFile(){
	console.log(JSON.stringify(productDetail));
}


/*
products ={
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
				["White wine - 125ml", "White wine - 175ml", "White wine - 250ml"]
			]
		}
	}
}*/