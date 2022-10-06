//Check if we have permission to write to clipboard (put here not for actual functionality here, Phil just needed to run this code on some environment with https and it does not impact site enough to matter. Todo: remove this if you are checking after 2022 and this is still not being used
navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
	console.log(result);
	console.log(result.state);
});

/*by class we mean css class 
used in hardcodedHTMLDivTabs
*/
function showViaClass(id){
  document.getElementById(id).classList.remove("hidden");
  document.getElementById(id).classList.add("showing");
}

/*by class we mean css class 
used in hideAllXClass
*/
function hideViaClass(id){
  document.getElementById(id).classList.remove("showing");
  document.getElementById(id).classList.add("hidden");
}

/*by class we mean css class - this makes sure the css class for selected is applied
used in hardcodedHTMLDivTabs
*/
function selectViaClass(id){
	document.getElementById(id).classList.add("Selected");
	//document.getElementById(id).disabled = true;  //not disabling - I don't like hw it effects visuals, and isn't worth coding a fix to have that
}

/*Pass in the name of a class, and this will search through all elements with that class and remove the "Selected" CSS class that is used for showing that a tab or something is selected
used in hardcodedHTMLDivTabs
*/
function deselectXClassViaClass(x){
	var xElements = document.getElementsByClassName(x);
	
	var i;
	for (i = 0; i < xElements.length; i++) {
		//document.getElementById(xElements[i].id).disabled = false;
		document.getElementById(xElements[i].id).classList.remove("Selected");
	}
}

function hideXShowY(x,y){
	//General purpose function, multiple potential uses
	//y must be previously only hidden via our class "hidden" rather than some other way, for this function to work
	//for content area expansion buttons that dissappear once clicked - button would be x, a previously hidden element would be y
	//for a carousel y is the content coming into view on the carousel, x is the content going out
	showViaClass(y);
	hideViaClass(x);
}

/*
used in hardcodedHTMLDivTabs
*/
function hideAllXClass(x){
	//as it says on the tin - Hides all elements with the class given in x
	var xElements = document.getElementsByClassName(x);
	
	var i;
	for (i = 0; i < xElements.length; i++) {
		hideViaClass(xElements[i].id);
	}
}

function showAllXClass(x){
	//as it says on the tin - shows all elements with the class given in x
	var xElements = document.getElementsByClassName(x);
	
	var i;
	for (i = 0; i < xElements.length; i++) {
		showViaClass(xElements[i].id);
	}
}

function hardcodedHTMLDivTabs(tabDivClass, tabButtonClass, showDivId, selectedButtonId){
	/*I've changed the design of the behaviour here based on feedback
	
	Now if a tab button is clicked while it's already selected it hides and deselects the tab
	*/
	//both paths will need to initially hide all tabs
	hideAllXClass(tabDivClass);
	
	//if tab button is selected (we can know this, by checking if it has the class "Selected") do code for hiding the tabs div and removing  
	if (document.getElementById(selectedButtonId).classList.contains("Selected")){
		//this is done in both paths, but if it's done before the decision, it will make the else always run
		deselectXClassViaClass(tabButtonClass);
	}else {
		//we deselect all the buttons, and then select the one that was clicked afterwards
		//(saves this function having to know what was just clicked and what was previously selected)
		
		//this bit is done in both paths, but if it's done before the decision, it will make the else always run
		deselectXClassViaClass(tabButtonClass);
		selectViaClass(selectedButtonId);
		showViaClass(showDivId);
	}
}