<?php
	if (isset( $_SERVER['REQUEST_URI'])) {
		if (pathinfo($_SERVER['REQUEST_URI'], PATHINFO_FILENAME ) == "info"){
			header('location:https://tearounder.app/TheLoremIpsum/info.html');
			return;
		}
		switch (strtolower(pathinfo($_SERVER['REQUEST_URI'], PATHINFO_DIRNAME))){
			case "/threecups":
				header('location:https://tearounder.app/ThreeCups/menu.html');
				break;
			case "/theloremipsum":
				header('location:https://tearounder.app/TheLoremIpsum/menu.html');
				break;
			default:
				header('location:https://tearounder.app/index.html');
		}
	} else {
		header('location:https://tearounder.app/index.html');
	}
?>