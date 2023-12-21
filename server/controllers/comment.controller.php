<?php
            include "./models/comment.model.php";

            class CommentController {
                public $model;
        
                function __construct(){
                    $this->model = new Comment();
                }

                public function viewAll($db) {
                    $query = "SELECT * FROM comment";
                    return $this->model->viewAll($db, $query);
                }

                public function filterComment($db, $data) {
                    $query = "SELECT 
                    (SELECT FirstName 
                     FROM client 
                     WHERE client.ID = comment.ClientID) AS FirstName,
                    (SELECT Avatar 
                     FROM client 
                     WHERE client.ID = comment.ClientID) AS Avatar,
                    comment.Content,
                    comment.Time
                FROM comment
                WHERE comment.ProductID = ". $data . "";
                    //  $query = "SELECT client.FirstName, client.Avatar, comment.Content, comment.Time
                    //  FROM comment
                    //  INNER JOIN client ON comment.ClientID = client.ID
                    //  WHERE comment.ProductID = ". $data . "";
                    return $this->model->filterComment($db, $query);
                }

                public function viewComment($db) {
                    $query = "SELECT * FROM comment";
                        return $this->model->viewComment($db, $query);
                    }
                    
                public function deleteComment($db, $data) {
                        $query = "DELETE FROM comment WHERE id=" .$data. ";";
                        return $this->model->deleteComment($db, $query);
                    }
                    
                public function searchComment($db, $data) {
                    $query = "SELECT *
                    FROM comment
                    WHERE Content LIKE '%". $data . "%' OR ClientID LIKE '%". $data . "%' OR ProductID LIKE '%". $data . "%'";
                    return $this->model->searchComment($db, $query);
                    }
                
                public function addComment($db, $data) {
                    $ClientID = $data["clientID"];
                    $ProductID = $data["productID"];
                    $Content = $data["content"];
                    
                    $query = "INSERT INTO comment (ClientID, ProductID, Content, Time)
                    VALUES('$ClientID','$ProductID','$Content',current_timestamp())";
                    return $this->model->addComment($db, $query);
                        
                }
            }
            

?>