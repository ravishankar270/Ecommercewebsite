import React from 'react'
import axios from 'axios'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Form, FormGroup, Label, Input ,Modal,ModalHeader,ModalBody,ModalFooter
  } from 'reactstrap';
import history from './History'
import Footer from './Footer';
import Header from './Header'
var a
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:{
            email:"",
            Name:"",
            password:"",
            password1:"",},
            same:true,
            n:[],
            a:[],
            modal:false,
            
        }
        this.getCookie=this.getCookie.bind(this)
        this.onRegister=this.onRegister.bind(this)
        this.onChange=this.onChange.bind(this)
        this.onChange1=this.onChange1.bind(this)
        this.handleClick=this.handleClick.bind(this)
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
componentDidUpdate(pp,ps,ss){
    if(this.state.user.password1!=ps.user.password1){
        this.onChange1()
    }
    
}
handleClick(){
    this.props.history.push('/login')
}
componentWillMount(){
    fetch("http://127.0.0.1:8000/task/CustomerList/").
    then(response=>response.json).
    then(response=>{
        this.setState({
            a:response.data
        })
    })
}
    onChange(e){
        var {name,value}=e.target

         this.setState({
             ...this.state,
            user:{  
                ...this.state.user,        
                [name]:value
            }

        })
        
    
    }
    onChange1(){
        
        
          
        if(this.state.user.password==this.state.user.password1){
            this.setState({
                ...this.state,
                same:true
              })
        }
        else{
            this.setState({
                ...this.state,
                
                same:false
              })
        }
        console.log(this.state.user.password1)
        
           
    }

    onRegister(e){
        e.preventDefault()
        
        var csrftoken = this.getCookie('csrftoken')
        var url="http://127.0.0.1:8000/task/CustomerRegister/"
      
        axios.post(url,this.state.user).
        then(response=>{
            
            this.setState({

            n:response.data
        
        },()=> console.log(this.state.n)
       )
            
        }).catch(error=>{
          console.log(error)
        });
        
           if (this.state.n.Name==this.state.user.Name){
               this.handleClick()
           }
        console.log(this.state.modal)
    }
    render(){
        
         a=(this.state.n.Name==this.state.user.Name)? true:false
        return(
            <div>
                <Header></Header>
            <Card style={{width:"600px",marginTop:"100px",backgroundColor:"whitesmoke"}}>
          
          <CardBody>
            <CardTitle style={{textAlign:"center",fontFamily:"trans new roman",fontSize:"30px"}}>Register</CardTitle>
            <Form onSubmit={this.onRegister} >
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleusername" className="mr-sm-2">Username</Label>
                    <Input type="Username" name="Name" onChange={this.onChange} value={this.state.user.Name} autoFocus required />
                </FormGroup>
                <div>
                    
                    {this.state.n.response=="Username is taken"?<i>Username is taken</i>:<i></i>}
                </div>
                
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                    <Input type="email" name="email" onChange={this.onChange} value={this.state.user.email} id="exampleEmail"  required />
                </FormGroup>
                {this.state.n.response=="email already exists"?<i>Email already exists</i>:<i></i>}
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Password</Label>
                    <Input type="password" name="password" onChange={this.onChange} value={this.state.user.password}   placeholder="don't tell!" required/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Confirm Password</Label>
                    <Input type="password" name="password1" onChange={this.onChange} value={this.state.user.password1}  placeholder="don't tell!" required/>
                </FormGroup>
                <div>
                    {this.state.same==false?<i>Password must match</i>:<i></i>}
                </div>
                
              
                <Button type="submit" style={{margin:"30px auto"}} >Login</Button>
            </Form>
            
          </CardBody>
        </Card>
        <Modal isOpen={a}>
        
           <ModalBody>
               
               <h1>Login success</h1>

           </ModalBody>
            <ModalFooter>
                
                <button className="primary" onClick={this.handleClick}>Close</button>
            </ModalFooter>
        </Modal>
        <Footer></Footer>
        </div>

        )
    }
}
export default Register