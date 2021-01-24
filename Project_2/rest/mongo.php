<?php
 
 //require 'vendor/autoload.php' ;
 ini_set('display_errors', 1);

 class db {
    private $user = "8semkovych" ;
    private $pass = "pass8semkovych";
    private $host = "172.20.44.25";
    private $base = "8semkovych";
    private $usercoll = "users";
    private $questionnairecoll = "questionnaire";
    private $conn;
    private $dbase;
    private $usercollection;
    private $questionnairecollection;
  
  
  
    function __construct() {
       $this->conn = new MongoDB\Client("mongodb://{$this->user}:{$this->pass}@{$this->host}/{$this->base}");    
       $this->usercollection = $this->conn->{$this->base}->{$this->usercoll};
       $this->questionnairecollection = $this->conn->{$this->base}->{$this->questionnairecoll};
     }

     public function register($user){
      $email = $user['email'];
      $pass = $user['pass'];
      $cursor = $this->usercollection->find();
      foreach ($cursor as $doc) {
          if($doc['email'] == $email) { 
              return false; 
          }          
      }
      $this->usercollection->insertOne($user); 
      return true;
  }

    public function login($user){
        $email = $user['mail'];
        $pass = $user['password'];
        $cursor = $this->usercollection->find();
        foreach ($cursor as $doc) {
            if($doc['email'] == $email && $doc['pass'] == $pass) {
                $_SESSION['user'] = $email;
                return $_SESSION['user'];
            }          
        }
        return false;
    }

    public function logout($user){
      unset($_SESSION);
      return true;
  }
  
    function select() {
       $cursor = $this->questionnairecollection->find();
       $table = iterator_to_array($cursor);
       return $table ;
    }
  
    function insert($answer) {
        $id = $answer['email'];
        $cursor = $this->questionnairecollection->find();
        foreach ($cursor as $doc) {
          if($doc['email'] == $id) {
            return false;
          }          
        }
       $this->questionnairecollection->insertOne($answer) ;
        return true;
    }
 }


