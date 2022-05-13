<?php
	if (isset( $_SERVER['REQUEST_URI'])) {
		if (pathinfo($_SERVER['REQUEST_URI'], PATHINFO_FILENAME ) == "info"){
			header('location:https://tearounder.app/TheLoremIpsum/info.html');
			return;
		}
		switch (pathinfo($_SERVER['REQUEST_URI'], PATHINFO_DIRNAME)){
			case "/ThreeCups":
				header('location:https://tearounder.app/ThreeCups/menu.html');
				break;
			case "/TheLoremIpsum":
				header('location:https://tearounder.app/TheLoremIpsum/menu.html');
				break;
			default:
				header('location:https://tearounder.app/index.html');
		}
	} else {
		header('location:https://tearounder.app/index.html');
	}
?>