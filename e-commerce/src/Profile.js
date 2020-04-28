import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Form, FormGroup, Label, Input 
  } from 'reactstrap';
import Header from './Header';
import Footer from './Footer';
class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            detail:[],
            Name :"",
            email:"",
            readOnly:"true"

        }
        this.onEdit=this.onEdit.bind(this)
        this.onChange=this.onChange.bind(this)
    }
    componentDidMount(){
        fetch(`http://127.0.0.1:8000/task/CustomerDetail/${localStorage.getItem('pk')}/`).
        then(response=>response.json()).
        then(data=>{
            console.log(data)
            this.setState(
                {
                   detail:data
                }
            ,console.log(this.state.detail))
        })
    }
    onEdit(e){
        e.preventDefault()
     this.setState({
         readOnly:"false"
     },console.log(this.state.readOnly)) 

    }
    onChange(e){
        const {name ,value}=e.target
        this.setState({
            [name]:value
        })

    }

    render(){
        return(
            <div>
                <Header></Header>
            <div className="card prof" style={{width:"300px",height:"100px"}}>
            
            <div className="card-body">
            <Form onSubmit={this.onEdit} >
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleusername" className="mr-sm-2">Username</Label>
                    <Input type="name" name="Name" onChange={this.onChange} value={this.state.detail.Name} autoFocus required  />
                </FormGroup>
                
                
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                    <Input type="email" name="email" onChange={this.onChange} value={this.state.detail.email} id="exampleEmail"  required />
                </FormGroup>
                
              
              <Button style={{width:"60px",marginTop:"20px",marginLeft:"90px"}}>Edit</Button>
              
        
            </Form>
            </div>
            </div>
            <Footer></Footer>
            </div>
        )
    }
}
export default Profile
