<?php
if(!isset($_POST['submit']))
{
  //Need to submit the form
  echo "Thank you. You have submit the form.";
}

//Collect the fullname, email and message from the user
$name = $_POST['name'];
$user_email = $_POST['yourEmail'];
$sender_email = $_POST['senderEmail'];
$message = $_POST['message'];

//Validation
if(empty($name)||empty($user_email)||empty($sender_email)||empty($message))
{
  echo " Name, your email, housemate's email and message are mandatory. Please fill in all the fields on the form.";
  exit;
}

//housemate's email address
$email_from = $user_email;

//email content
$email_subject = 'Message from Scout System';
$email_body = "You have received a new message from the user $name.\n".
              "email address: $user_email\n".
              "Here is the message: \n $message\n".

$to = $sender_email; // to my email address
$headers = "From: $email_from \r\n";

//Send the email
mail($to, $email_subject, $email_body, $headers);

?>
