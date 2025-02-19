<?php 


require_once("Controller.php");
require_once("Repository/UserRepository.php");


    class UserController extends Controller {
        public UserRepository $UserRepository;

        public function __construct(){
            $this->UserRepository = new UserRepository();
        }

        protected function processGetRequest(HttpRequest $request): ?array {
            
            $name = $request->getParam("name");
           
            if ($name){
                return $this->UserRepository->finduser($name);
            }
            else {
                return $this->UserRepository->findAll();
            }
        }

        protected function processPostRequest(HttpRequest $request): ?array {
            return null;
        }

        protected function processDeleteRequest(HttpRequest $request): ?array {
            return null;
        }

        protected function processPatchRequest(HttpRequest $request){
            return null;
        }
    }

?>