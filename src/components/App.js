import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const[data,setData] = useState([]);

  // setting effect
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then((data) => setData(data))
  },[])
  
  function addQuestion (question){
    setData([
      ...data,question
    ])
  }
  function removeQuestion(id){
    const filteredQuestions=data.filter((question)=>{
      return question.id!==id;
    })
    setData(filteredQuestions)
   
  }
  function updateQuestion(newQuestion,id){

   setData(data.map((question)=>{
    if(question.id===id){
      return newQuestion
    }else{
      return question
    }
  }))
  
  }
 
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion}/> : <QuestionList updateQuestion={updateQuestion} removeQuestion={removeQuestion} data={data} />}
    </main>
  );
}

export default App;
