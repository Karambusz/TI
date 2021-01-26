<?php
 
 //require 'vendor/autoload.php' ;
 ini_set('display_errors', 1);

session_start();
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
                $_SESSION['user'] = md5($email);
                return $_SESSION['user'];
            }          
        }
        return false;
    }
	

    public function session($arr) {
      $id = isset($_SESSION['user']);
      $time = $_SERVER['REQUEST_TIME'];
      $timeout_duration = 1800;
      if (isset($_SESSION['LAST_ACTIVITY']) && $id == true && ($time - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
        session_unset();
        session_destroy();
        session_start();
        return true;
      }
      $_SESSION['LAST_ACTIVITY'] = $time;
      return false;  
    }

    public function logout($user){
      unset($_SESSION);
	  session_destroy(); 
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
        //return $ret;
        return true;
    }
 }


