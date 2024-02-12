<?php 
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){

!empty($_POST['LASTNAME']) ? $lastname=strip_tags($_POST['LASTNAME']):$result['status']='Обнаружена ошибка. Повторите отправку еще раз';
!empty($_POST['NAME']) ? $name=strip_tags($_POST['NAME']):$result['status']='Обнаружена ошибка. Повторите отправку еще раз';
!empty($_POST['FATHERSNAME']) ? $fathersname=strip_tags($_POST['FATHERSNAME']):$result['status']='Обнаружена ошибка. Повторите отправку еще раз';
!empty($_POST['PHONE']) ? $phone=strip_tags($_POST['PHONE']):$result['status']='Обнаружена ошибка. Повторите отправку еще раз';
!empty($_POST['EMAIL']) ? $email=strip_tags($_POST['EMAIL']):$result['status']='Обнаружена ошибка. Повторите отправку еще раз';
!empty($_POST['CITY']) ? $city=strip_tags($_POST['CITY']):$result['status']='Обнаружена ошибка. Повторите отправку еще раз';
!empty($_POST['TYPE']) ? $type=strip_tags($_POST['TYPE']):$result['status']='Обнаружена ошибка. Повторите отправку еще раз';
!empty($_POST['ENTITY']) ? $entity=strip_tags($_POST['ENTITY']):$result['status']='Обнаружена ошибка. Повторите отправку еще раз';

// $mail=strip_tags($_POST['EMAIL']);
// $mes=strip_tags($_POST['MESSAGE']);


if(empty($result['status'])){
    $to  = "t.chebun@gmail.com";
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    $subject = "Сообщение с сайта shop.abacuskids.ru";
    $headers .= "From: название сайта shop.abacuskids.ru\r\n";
    $message = "ФИО: $lastname $name $fathersname <br> E-mail: $email <br> Телефон: $phone <br> Город: $city <br> Тип нозологии: $type <br> Тип заказчика: $entity";
    mail($to, $subject, $message, $headers);
    
    $result['status']='success';
}
else{
    $result['status']='Не заполнены обязательные поля.';
}

echo json_encode($result);
}
else{
//  header('Location: http://localhost/redirec2t.php ');
}
?>