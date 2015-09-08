<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<META HTTP-EQUIV="refresh" content="0;URL=thankyou.html">
<title>Email Form</title>
</head>

<body>
<?php
  $name=addslashes($_POST['name']);
  $email=addslashes($_POST['email']);
  $comments=addslashes($_POST['message']);

 // you can specify which email you want your contact form to be emailed to here

  $toemail = "Evan_95@hotmail.com;
  $subject = "From
  ZpeedX";

  $headers = "MIME-Version: 1.0\n"
            ."From: \"".$name."\" <".$email.">\n"
            ."Content-type: text/html; charset=iso-8859-1\n";

  $body = "Name: ".$name."<br>\n"
            ."Email: ".$email."<br>\n"
            ."Comments:<br>\n"
            .$comments;

  if (!ereg("^[a-zA-Z0-9_]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$", $email))
  {
    echo "That is not a valid email address.  Please return to the"
           ." previous page and try again.";
    exit;
  }

    mail($toemail, $subject, $body, $headers);
    echo "Thanks for submitting your comments";
?>
</body>
</html>