import React, { useContext } from 'react'
import Question from './Question'
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import PostService from "../services/PostService";

const QuestionList = () => {
  const { postStore } = useContext(Context);

  // if(postStore.isLoading) {
  //   return <div>Loading...</div>
  // }

  return (
    <>
      {
        postStore.posts.length ?
        postStore.posts.map((question) =>(
          <Question question = {question} key={question.id}/>
        ))
        :
        <span>Bebra</span>
      }
    </>
  )
}

export default observer(QuestionList)