<?php
         
require '../vendor/autoload.php' ;        
require_once("rest.php");
require_once("mongo.php");
     
class API extends REST {
     
    public $data = "";
     
    public function __construct(){
        parent::__construct(); 
              $this->db = new db() ;             
    }
             
    public function processApi(){
 
        $func = "_".$this->_endpoint ; 
        if((int)method_exists($this,$func) > 0) {
            $this->$func();
              }  else {
            $this->response('Page not found',404); }         
    }
         
    
    private function json($data){
        if(is_array($data)){
            return json_encode($data);
        }
    }

    private function _save() {
        if($this->get_request_method() != "POST") {
            $this->response('',406);
        }
        if(!empty($this->_request) ){
            try {
                   $json_array = json_decode($this->_request,true);
                   $res = $this->db->insert($json_array);
                   if ( $res ) {
                        $result = array('status'=>'OK', "msg" => "Answers added");
                        $this->response($this->json($result), 200);
                    } else {
                        $result = array('status'=>'Failed', "msg" => "Answers not added");
                        $this->response($this->json($result), 200);
                    }
            } catch (Exception $e) {
                $this->response('', 400) ;
            }
        } else {
            $error = array('status' => "Failed", "msg" => "Invalid send data");
            $this->response($this->json($error), 400);
        }
    }

    private function _list() {   
        if($this->get_request_method() != "GET"){
            $this->response('',406);
        }
        try{
            $result = $this->db->select();            
            $this->response($this->json($result), 200); 
        } 
        catch (Exception $e) {
            $this->response('', 400);
        }
    }



	private function _login(){
        if($this->get_request_method() != "POST")
            $this->response('',406);
        if(!empty($this->_request) ){
            try {
                $json_array = json_decode($this->_request,true);                    
                $res = $this->db->login($json_array);
                if ($res) {
                    $result = array('status'=>'OK', 'sessionID'=>$res);
                    $this->response($this->json($result), 200);
                } 
                else {
                    $result = array('status'=>'Failed', "msg" => "Invalid send data");
                    $this->response($this->json($result), 401);
                } 
            } 
            catch (Exception $e) {
                $this->response('', 400);
            }
        } 
        else {
            $error = array('status' => "Failed", "msg" => "Empty data");
            $this->response($this->json($error), 400);
        }   
    }
	
	private function _session(){
        if($this->get_request_method() != "POST")
            $this->response('',406);
        if(!empty($this->_request) ){
            try {
                $json_array = json_decode($this->_request,true);              
                $res = $this->db->session($json_array);
                if ( $res ) {
                    $result = array('status'=>'OK', "msg" => "Timeout session");
                    $this->response($this->json($result), 200);
                } 
                else{
                    $result = array('status'=>'Failed');
                    $this->response($this->json($result), 200);
                } 
            } 
            catch (Exception $e){
                $this->response('', 400);
            }
        } 
        else {
            $error = array('status' => "Failed", "msg" => "Empty data");
            $this->response($this->json($error), 400);
        } 
    }

    private function _register(){
        if($this->get_request_method() != "POST")
            $this->response('',406);
        if(!empty($this->_request) ){
            try {
                $json_array = json_decode($this->_request,true);                    
                $res = $this->db->register($json_array);
                if ($res) {
                    $result = array('status'=>'OK', "msg" => "User added");
                    $this->response($this->json($result), 200);
                } 
                else {
                    $result = array('status'=>'Failed', "msg" => "User not added");
                    $this->response($this->json($result), 200);
                } 
            } 
            catch (Exception $e) {
                $this->response('', 400);
            }
        } 
        else {
            $error = array('status' => "Failed", "msg" => "Empty data");
            $this->response($this->json($error), 400);
        }   
    }


	private function _logout(){
        if($this->get_request_method() != "POST")
            $this->response('',406);
        if(!empty($this->_request) ){
            try {
                $json_array = json_decode($this->_request,true);                    
                $res = $this->db->logout($json_array);
                if ($res) {
                    $result = array('status'=>'OK', 'sessionID'=>$res);
                    $this->response($this->json($result), 200);
                } 
                else {
                    $result = array('status'=>'Failed', "msg" => "Wrong session ID");
                    $this->response($this->json($result), 200);
                } 
            } 
            catch (Exception $e) {
                $this->response('', 400);
            }
        } 
        else {
            $error = array('status' => "Failed", "msg" => "Session failed");
            $this->response($this->json($error), 400);
        }   
    }

}
         
    $api = new API;
    $api->processApi();
 
?>