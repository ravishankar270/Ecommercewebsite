import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Form, FormGroup, Label, Input 
  } from 'reactstrap';
import './css/Login.css'
import history from './History'
import axios from 'axios'
import Footer from './Footer';
import Header from './Header'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
            email:"",
            password:"",
            success:"",
            logged_in: localStorage.getItem('token') ? true : false,
        }
        this.onLogin=this.onLogin.bind(this)
        this.onChecking=this.onChecking.bind(this)
        this.Navigate=this.Navigate.bind(this)
    
    }
    
    onLogin(e){
        const {name,value}=e.target
    
        this.setState({
            
     [name]:value
        })


    }
    
    
    
    onChecking(e){
        
        
        e.preventDefault()
        var url="http://127.0.0.1:8000/task/login"

        var dat={
            "username":this.state.email,
            "password"  :this.state.password
        }
        console.log("a")
        axios.post(url,dat).
        then(response=>{
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('pk',response.data.pk)
            localStorage.setItem('Name',response.data.Name)
            this.setState({
            success:response.data

        },function(){
            console.log(this.state.success)
            this.Navigate(this.state.success.Name)  
        })
        }).catch(error=>{
          console.log(error)
        });
        
        
        
        
        
        

    }
    Navigate(a)  {
        
        
        
        var url="/"+a
        this.props.history.push(url);}
        

    

    
    render(){
    
    return(
        <div >
            <Header></Header>
        <Card style={{width:"600px",marginTop:"100px"}}>
          
          <CardBody>
            <CardTitle style={{textAlign:"center",fontFamily:"trans new roman",fontSize:"30px"}}>Login</CardTitle>
            <Form onSubmit={this.onChecking}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" value={this.state.email} onChange={this.onLogin} placeholder="something@idk.cool" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Password</Label>
                    <Input type="password" name="password" id="examplePassword" value={this.state.password} onChange={this.onLogin} placeholder="don't tell!" />
                </FormGroup>
    <CardText>{this.state.email}{this.state.password}</CardText>
            <Button type="submit" >Login</Button>
            </Form>
            
          </CardBody>
        </Card>
        <Footer></Footer>
      </div> 
    )
    }
}

export default Login