<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Contact Form</title>
</head>
<body>
    <h1>Thank You</h1>
    <p>Here is the information you have submitted:</p>
	<?php

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
	  $venueName = test_input($_POST["venueName"]);
	  $venueShortName = test_input($_POST["venueShortName"]);
	  $welcomeMessage = test_input($_POST["welcomeMessage"]);
	}

	function test_input($data) {
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data);
	  return $data;
	}
	?>
	
    <ol>
        <li><em>Name:</em> <?php echo $venueName?></li>
        <li><em>Email:</em> <?php echo $venueShortName?></li>
        <li><em>Subject:</em> <?php echo $welcomeMessage?></li>
    </ol>
</body>
</html>