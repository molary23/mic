<?php

$data = json_decode(file_get_contents("php://input"), TRUE);
//$requestType = $data['send'] ;

echo json_encode($data);
/*
if ($requestType === 'Message') {
$to = 'contact@micearnbusiness.org';
$noreply = 'no-reply@micearnbusiness.org';
$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$subject = $data['subject'];
$message = $data['message'];
$header  = "MIME-Version: 1.0" . PHP_EOL;
$header .= "Content-type:text/html;charset=UTF-8" . PHP_EOL;
$header .= "From:" . $email . PHP_EOL .	"CC: officegmail@gmail.com" .PHP_EOL. 'X-Mailer: PHP/' . phpversion();
$mail = mail($to, $subject, $message, $header);

if ($mail) {
  $subject = 'Thank you for Contacting Us';
  $message = '';
  $header .= "From:" . $noreply . PHP_EOL . 'X-Mailer: PHP/' . phpversion();
  $reply = mail($email, $subject, $message, $header);
  if($reply){
$response = 1;
  }
    
} 
echo json_encode($response);
}*/





?>