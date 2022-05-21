<?php
    if ( isset($_POST['email']) && $_POST['email'] != '' ) {
        if ( filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ) {

            $username = $_POST['name'];
            $useremail = $_POST['email'];
            $subject = $_POST['subject'];
            $message = $_POST['message'];

            $body = 'From: '.$username. '\r\n' . 'Email: '.$useremail . '\r\n' . 'Message: '.$message;

            mail('abaochrisjay@gmail.com', $subject, $body);
        }
    }