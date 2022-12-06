import React, { useContext } from 'react'
import Comment from './Comment';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import PostService from "../services/PostService";

const CommentList = () => {
  const { commentStore } = useContext(Context);

  // if(postStore.isLoading) {
  //   return <div>Loading...</div>
  // }
    console.log(commentStore.comments);
  return (
    <>
      {
        commentStore.comments.length ?
        
        commentStore.comments.map((comment) =>(
          
          <Comment comment = {comment} key={comment.id}/>
        // <span key={comment.id}>{comment.content} id {comment.id}</span>
        ))
        :
        <span>No comments found...</span>
      }
    </>
  )
}

export default observer(CommentList)