import React from 'react'
import Footer from './Footer'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import {BrowserRouter as Router,Route,Link,Navlink} from 'react-router-dom'
import axios  from 'axios'

class Box extends React.Component{
    constructor(props){
        super(props)
        this.state={
         
         modal:false,
         added:false,
         id:"",
         
         cartItem:{
             
             customer:"",
             product:"",
             bought:"false"
         }
        }
        this.handleClick=this.handleClick.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
        
        this.getCookie=this.getCookie.bind(this)
        this.handleCart=this.handleCart.bind(this)
        this.changeCart=this.changeCart.bind(this)
    }
    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    componentWillMount(){
        fetch("http://127.0.0.1:8000/task/CartList/").
        then(response=>response.json()).
        then(data=>{
            this.setState({
                ...this.state,
                id:data.id})
        })
    }
    handleDelete(a){
        console.log(a)
        var csrftoken = this.getCookie('csrftoken')
       var url = 'http://127.0.0.1:8000/task/CartDelete/'
       url=url+a
       console.log(url)
       
       

       
    fetch(url, {
        method:'DELETE',
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrftoken,
        },
      }).then((response) =>{
  
        console.log("ok")
      })
    }
    
    
    
    
    handleClick(e){
   this.setState({
       ...this.state,
        modal:!this.state.modal,
        })
    }

    
    handleCart(a){
       var csrftoken = this.getCookie('csrftoken')
       var url = 'http://127.0.0.1:8000/task/CartCreate/'
       
       axios.post(url,a).
        then(response=>{
            console.log(response)
        }).catch(error=>{
          console.log(error)
        });
    
       }
    componentDidUpdate(pp,prevstate,ss){
        
        if(this.state.cartItem !== prevstate.cartItem  ){
            if(this.state.added===true){
            this.handleCart(this.state.cartItem)
            }
        }else if(this.state.id===false){
            this.handleDelete(this.state.id)
        }


    }

      changeCart(){
          this.setState({
              ...this.state,
            added:!this.state.added,
              cartItem:{
               ...this.state.cartItem,
               customer:localStorage.getItem('pk'),
              product:this.props.list.id,
                }
          })
         }
    render(){
        var image=this.props.list.img
        const add=this.state.added ==true? "Added":"Add to Cart"
        
    return(
        <div className="col-md-4" >
        <div className="card" style={{width: '16rem'}}>
            <img  className="card-img-top" style={{height:"150px",border:"1px solid whitesmoke"}} src={require('.'+image)} alt="No Image"></img>
            <div className="card-body" style={{borderColor:"blue"}}>
                <h5 className="card-title">{this.props.list.product}</h5><hr></hr>
             
                <button onClick={this.handleClick}  type="button" style={{backgroundColor:"white",color:"blue"}}class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">View</button>
                <span className="card-text " style={{marginLeft:"80px" ,fontWeight:"bold"}}>&#x20b9;{this.props.list.prize}</span>
            </div>
        </div>
        <Modal isOpen={this.state.modal}>
        <ModalHeader >{this.props.list.product}
        <button onClick={this.handleClick} style={{backgroundColor:"white",border:"none",width:"max-content"}}><i className="fa fa-close" style={{float:"right",marginLeft:"300px",fontSize:"30px"}}></i></button></ModalHeader>
    
           <ModalBody>
               
               <img src={require('.'+image) } style={{height:"150px",marginLeft:"100px"}}></img><br></br>
               <h2 style={{textAlign:"center"}}>Prize:{this.props.list.prize}</h2>
               <p style={{fontFamily: "Times New Roman"}}>Description:Xiaomi Redmi 8 Android smartphone. Announced Oct 2019. Features 6.22″ IPS LCD display, Snapdragon 439 chipset, 5000 mAh battery, 64 GB storage, 4 GB RAM, Corning Gorilla Glass 5.</p>
                <button className="btn btn-secondary" onClick={this.changeCart} style={{width:"400px",marginLeft:"30px",marginTop:"10px"}}>ADD</button>

           </ModalBody>
            <ModalFooter>
                
            
            </ModalFooter>
        </Modal>
        </div>
       
      

        
        
        
    )
}
}
export default Box