<?php
	if (isset( $_SERVER['REQUEST_URI'])) {
		switch (pathinfo($_SERVER['REQUEST_URI'], PATHINFO_DIRNAME)){
			case "ThreeCups":
				header('location:https://tearounder.app/ThreeCups/menu.html');
				break;
			case "TheLoremIpsum":
				header('location:https://tearounder.app/TheLoremIpsum/menu.html');
				break;
			default:
				echo $_SERVER['REQUEST_URI'];
				echo pathinfo($_SERVER['REQUEST_URI'], PATHINFO_DIRNAME);
		}
	} else {
		header('location:https://tearounder.app/index.html');
	}
?>