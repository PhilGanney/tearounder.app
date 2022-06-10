<?php
$q = sanitize_input($_REQUEST["q"]);
echo "PHP script triggered, q = " + $q;

function sanitize_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>
