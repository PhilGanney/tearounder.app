function configPageLoad(){
	console.groupCollapsed("configPageLoad()");
	let orderDateTime = new Date().toLocaleString('en-GB');
	console.log(orderDateTime);
	console.groupEnd();
}

function addNewMenuSectionToConfig(){
	console.groupCollapsed("addNewMenuSectionToConfig()"); 
	var container = document.getElementById("menu_container");
	var template = document.getElementById("sectionTemplate");
	var freshSection = template.content.firstElementChild.cloneNode(true);

	
	container.appendChild(freshSection);
	var sectionNameInputs = container.getElementsByClassName("sectionName");
	var num = sectionNameInputs.length - 1;
	sectionNameInputs[num].id = "sectionName" + num + "";
	console.groupEnd();
}

function addRow(cheese){
	var template = document.getElementById("tableRowTemplate");
	var freshRow = template.content.firstElementChild.cloneNode(true);
	console.log(cheese.parentNode);
	cheese.parentNode.querySelector("table tbody").appendChild(freshRow);
}

function pullMenuFromWooCom(){
	console.log("pullMenuFromWooCom");
	//window.open("https://tearounder.app/importMenuFromWoo.php", "_blank")
	/*let str = "Mango";
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { //todo: explain this non-obvious if statement        document.getElementById("txtHint").innerHTML = this.responseText;
		document.getElementById("pullMenuFromWooComResponseArea").innerHTML = this.responseText;
	  }
    };
	//open(method, url, async)
    xmlhttp.open("POST", "https://tearounder.app/importMenuFromWoo.php", true);
    xmlhttp.send();*/
	
	$.ajax({
	  url: "https://tearounder.app/importMenuFromWoo.php",
	  method: "POST",
	  data: JSON.stringify({
		"q" : "Pineapple"
	  }),
	  dataType: "json",
	  contentType: "application/json; charset=utf-8",
	  complete: function (response) {
		console.log(response);
		document.getElementById("pullMenuFromWooComResponseArea").innerHTML = this.responseText;
	  }
	});
}