
//========= to get data (get request) from backend and display over here ==========

import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatIcon from "@material-ui/icons/Chat";
import axios from "../helper/axioshelper";
import Avatar from "@material-ui/core/Avatar";
import "../StyleSheet/QuestionList.css";

import { Link } from 'react-router-dom';

const QuestionList = (props) => {
  const [answers, setAnswer] = useState([]);

  const questionID = props.questionID; // question id from url
  const profileImage = props.profileImage;
  const authStatus = props.authStatus;

  useEffect(() => {
    axios
      .get(`/api/all-answer/${questionID}/`, { withCredentials:true })
      .then((response) => {
        console.log(response.data);
        setAnswer(response.data);
      })
      .catch((error) => {
        console.error(error);
      }); 

  },[]);
  
  
  const Like = (ID) => {
    const server1 = process.env.NODE_ENV === "production"
    ? "https://pecquora-backend.herokuapp.com/api/all-answers/likes" : "http://localhost:5000/api/all-answers/likes";
    
    const url = server1;

    const data = new FormData();
    data.append("id", ID);

    axios
      .post(`/api/answers/likes/${questionID}/`, data, { withCredentials: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* flow 
     1. get the id of element by "_id".
     2. when clicked on comments send the id as argument.
     3. post the id over to backend. 
     4. check if id is present in answers db or send the id back
     5. make get request and display the id!
    */

     return (
        <div className="QuestionList">
          {answers && (
            <div className="Questions">
            { answers.map((answer) => {
                return (
                <div className="question" key={answer._id}>
                    <div className="question__profile">
                      <Avatar src={answer.owner_image} alt="User Profile" />
                      <h4>{answer.owner}</h4>
                    </div>
                     <div className="question__info">
                      <div className="question__question">
                            <h4 >{answer.text}</h4>       
                      </div>
                      <div className="question__stats">
                        <div className="likes" style={{ cursor: "pointer" }}>
                          <ThumbUpIcon onClick={() => Like(answer._id)} />
                          <h4>{answer.upvotes}</h4>
                        </div>
                        <Link style ={{textDecoration: "none", color: "white"}}> 
                        <div className="comments" style={{ cursor: "pointer", textDecoration: "none" }}>
                          <ChatIcon />
                        </div> 
                        </Link>
                      </div>
                    </div>
                  </div>
                  );
                })}
            </div>
          )}
        </div>
      );
    };


export default QuestionList;


/* 

    return (
    <div className="QuestionList">
      {answers && (
        <div className="Questions">
          {answers.map((answers) => {
            return (
              <div className="question" key={answers._id}>
                <div className="question__profile">
                  <Avatar src={answers.owner_image} alt="User Profile" />
                  <h4>{answers.owner}</h4>
                </div>
                 <div className="question__info">
                  <div className="question__question">
                    <h4>{answers.comments.text}</h4>
                  </div>
                  <div className="question__stats">
                    <div className="likes" style={{ cursor: "pointer" }}>
                      <ThumbUpIcon onClick={() => Like(answers._id)} />
                      <h4>{answers.upvotes}</h4>
                    </div>
                    <Link > 
                    <div className="comments" style={{ cursor: "pointer" }}>
                      <ChatIcon />
                    </div> 
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

*/


/*

      return (
    <div className="QuestionList">
      {answers && (
        <div className="Questions">
            <div className="question" key={answers._id}>
                <div className="question__profile">
                  <Avatar src={answers.owner_image} alt="User Profile" />
                  <h4>{answers.owner}</h4>
                </div>
                 <div className="question__info">
                  <div className="question__question">
                    { answers.map((answer) => {
                        return (
                        <h4 key={answer._id}>{answer.comments.text}</h4>
                        );
                    })}
                    
                  </div>
                  <div className="question__stats">
                    <div className="likes" style={{ cursor: "pointer" }}>
                      <ThumbUpIcon onClick={() => Like(answers._id)} />
                      <h4>{answers.upvotes}</h4>
                    </div>
                    <Link > 
                    <div className="comments" style={{ cursor: "pointer" }}>
                      <ChatIcon />
                    </div> 
                    </Link>
                  </div>
                </div>
              </div>
        </div>
      )}
    </div>
  );
};

*/