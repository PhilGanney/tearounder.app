<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Preview</title>
</head>
<body>
    <h1>Thank You for your interest in TeaRounder</h1>
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
        <li><em>Venue Name:</em> <?php echo $venueName?></li>
        <li><em>Venue Short Name:</em> <?php echo $venueShortName?></li>
        <li><em>Welcome Message:</em> <?php echo $welcomeMessage?></li>
    </ol>
	<h2>Next Steps</h2>
	<p>We'll check that this is publishable, and if everything is good, we'll let you know your menu</p>
</body>
</html>