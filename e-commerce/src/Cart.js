import React from 'react'
import { BrowserRouter as Router,Route,Link } from 'react-router-dom'
import CartItem from './CartItem'
import './css/index.css'
import Footer from './Footer'
import Header from './Header'

class Cart extends React.Component{
    constructor(){
        super()
        this.state={
            cart:[],
            cartId:[]
            
        }
        this.handleDelete=this.handleDelete.bind(this)
        this.fetch=this.fetch.bind(this)
        this.getCookie=this.getCookie.bind(this)
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
       this.fetch()
    }
    fetch(){
        var name=this.props.a.match.params.username
        var csrftoken = this.getCookie('csrftoken')
        console.log(name)
        fetch(`http://127.0.0.1:8000/task/CartListName/${name}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken':csrftoken,
            'Authorization': localStorage.getItem('token')}

        }).
        then(response=>response.json()).
        then(data=>{
           this.setState({
               cart:data[0],
               cartId:data[1]
           },()=> console.log(this.state.cart))
        })
    
    }

    handleDelete(b){
        
        console.log(b)
        var csrftoken = this.getCookie('csrftoken')
       var url = 'http://127.0.0.1:8000/task/CartDelete/'
       url=url+b
       console.log(url)
       
       

       
    fetch(url, {
        method:'DELETE',
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrftoken,
          
        },
      }).then((response) =>{
  
        this.fetch()
      })
    }
    
    
    
    render(){
        const cartItem=this.state.cart
        var a=this.state.cart
        return(
            <span>
                <Header ></Header>
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-sm-8">
            <div className="main">
              {cartItem.map((c,index)=>{
                  return(
                      
                    <div className="card" key={index}>
                    <div className="card-body">
                  <img style={{width:"150px",height:"150px"}}src={require('.'+c.img)}></img>
                  <span className="card-text" style={{marginLeft:"30px",fontFamily:"times new roman"}}>{c.product}</span>
                  <p style={{marginLeft:"20px",display:"inline",fontWeight:"bold"}}>&#x20b9;{c.prize}</p>
                
                 <button style={{float:"right",display:"inline",marginTop:"50px",backgroundColor:"white",color:"black"}}className="btn btn-primary" onClick={()=>this.handleDelete(this.state.cartId[index].id)}>-</button>
                    </div>
                </div>
                  )
              })}
            </div>
            </div>
            <div className="col-2"></div>
            </div>
            </div>
            <Footer></Footer>
            </span>
               
        )
    }
}
export default Cart