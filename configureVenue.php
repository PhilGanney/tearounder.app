<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Contact Form</title>
</head>
<body>
    <h1>Thank You</h1>
    <p>Here is the information you have submitted:</p>
    <ol>
        <li><em>Name:</em> <?php echo $_POST["venueName"]?></li>
        <li><em>Email:</em> <?php echo $_POST["venueShortName"]?></li>
        <li><em>Subject:</em> <?php echo $_POST["welcomeMessage"]?></li>
    </ol>
</body>
</html>