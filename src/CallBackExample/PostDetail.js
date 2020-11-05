import React, { Component, useState } from 'react'

class PostDetail extends Component {


constructor(props){
     super(props)
     this.titleWasClicked = this.titleWasClicked.bind(this)
 }

 titleWasClicked = event => {

    this.props.onComplete({
        element: "Elemento"
    })
    //event.preventDefault()
    const {dataCallback} = this.props

   
    let newPostItem = this.props.post
    newPostItem = 'This is my awesome new title'

    if (dataCallback !== undefined) {
      this.props.dataCallback({
          uno : "Valor uno"})
      
    }
    else{
        this.props.dataCallback({
            uno : "Valor dos"}) 
        
    }
    //
  }
 
 render (){
     const {post} = this.props

     return(
         <div>
            <h1 onClick = {this.titleWasClicked}>Clic aqui</h1>
           
         </div>
     )
 }
}

export default PostDetail