import React, { Component } from 'react'
import PostData from './Posts.json'

import PostDetail from './PostDetail'

class PostList extends Component {

    state = { message: "" }

    callbackFunction = (childData) => {
        this.setState({message: childData})
  }

 render (){
     return(
         <div>
             <h1>Hello there</h1>
             {PostData.map((item, index) => {
                 return <PostDetail 
                 post = {item} 
                 key = {`post-list-key ${index}`} 
                 parentCallback  = {this.handleDataCallback}/>
             })}
         </div>
     )
 }
}

export default PostList