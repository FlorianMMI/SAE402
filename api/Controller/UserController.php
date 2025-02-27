<?php 


require_once("Controller.php");
require_once("Repository/UserRepository.php");
require_once("class/User.php");




    class UserController extends Controller {
        public UserRepository $UserRepository;

        public function __construct(){
            $this->UserRepository = new UserRepository();
        }

        protected function processGetRequest(HttpRequest $request): ?array {
            
            $name = $request->getParam("name");
            
           
            if (isset ($name)){
                if ($request->getParam("items")){
                    return $this->UserRepository->findItems($name);
                }
                
                    return $this->UserRepository->finduser($name);
                
                
                
            }
            else {
                return $this->UserRepository->findAll();
            }
        }

        protected function processPostRequest(HttpRequest $request)  {
            $json = $request->getJson();
            $obj = json_decode($json);
            $p = new Client(0); // 0 is a symbolic and temporary value since the product does not have a real id yet.
            $p->setName($obj->name);
            $p->setMoney($obj->money);
            $p->setRound($obj->round);
            $p->setIdQuestions($obj->id_questions);


            $ok = $this->UserRepository->save($p); 
            return $ok ? $p : false;
        }

        protected function processDeleteRequest(HttpRequest $request): ?array {
            return null;
        }

        protected function processPatchRequest(HttpRequest $request){
            $json = $request->getJson();
            $obj = json_decode($json);
            $name = $request->getParam("name");

            if (isset($name)) {
                $money = $obj->money;
                $round = $obj->round;
                $ok = $this->UserRepository->update($name, $money, $round);

                if ($ok) {
                    return ["status" => "success"];
                } else {
                    error_log("Failed to update user: $name with money: $money and round: $round");
                    return ["status" => "error", "message" => "Failed to update user"];
                }
            } else {
                error_log("Name parameter is missing in patch request");
                return ["status" => "error", "message" => "Name parameter is missing"];
            }
        }
    }

?>