import React from 'react'
import './css/index.css'
import Icon from './images/icon.jpg'
import Cart from './Cart'
import {BrowserRouter as Router,Route, Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import history from './History'



class  Header extends React.Component{

    constructor(props){
        super(props)
        this.state={
            isLoggedin:localStorage.getItem('token')? true:false
        }
        
        this.OnChange=this.OnChange.bind(this)
        this.OnChange1=this.OnChange1.bind(this)
        this.OnChange2=this.OnChange2.bind(this)
        this.OnChange3=this.OnChange3.bind(this)
        this.OnChange4=this.OnChange4.bind(this)
        this.OnChange5=this.OnChange5.bind(this)
        this.OnChange6=this.OnChange6.bind(this)
    }

    OnChange(){
        this.props.history.push('/login')

    }
    OnChange1(){
        if(this.state.isLoggedin){
        this.props.history.push('/profile')
        }
        else{
            this.props.history.push('/register')

        }

    }
    OnChange2(){
        this.props.history.push('/')

    }
    OnChange3(){
        var a=localStorage.getItem('token')
        console.log(a)
        
    
            if(!localStorage.getItem('token')) {
              // go to login route
              this.props.history.push('/login')
            }else{

            // stay on this route since the user is authenticated
            this.props.history.push(`/${localStorage.getItem('Name')}`)
          }
    }
    OnChange4(){
        if(this.state.isLoggedin){
        localStorage.removeItem('token');
        localStorage.removeItem('pk')
        localStorage.removeItem('Name')
        this.props.history.push('/login')
        }
        else{
            this.props.history.push('/login')
        }
    }
    OnChange5(){
        if(this.state.isLoggedin){
            this.props.history.push(`/cart/${localStorage.getItem('Name')}`)
        }
        else{
            this.props.history.push('/login')
        }
    }
    OnChange6(){
        if(this.state.isLoggedin){
            this.props.history.push('/profile')
        }
        else{
            this.props.history.push('/login')
        }
    }
    render(){
        const status=this.state.isLoggedin? "Logout":"Login"
        const register=this.state.isLoggedin? "Cart":""
        const pro=this.state.isLoggedin?"Profile":"Register"
    return (
            
                <span>
            
            <div className="container-fluid header">
    
    
                <div className="container sub">
                    <div className="row">
                    
                    <div className="col-sm-8">
                    <h2 style={{fontFamily:"Times New Roman"}}>E-<span style={{fontFamily:"Courier New",fontSize:"40px"}}>Commere Website</span></h2>
                    
                    </div>
                    <div className="col-sm-4">
                    <i class="fa fa-shopping-cart"  onClick={this.OnChange5}style={{fontSize:"28px",position:"absolute",top:"0",right:"0"}}></i>
                    </div>
                    
                    

                
                    

                    </div>
                </div>
            </div>
            <nav className="navbar-expand-md navbar-dark bg-dark sticky-top" >
                <button className="navbar-toggler" data-toggle="collapse" data-target="#a">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="a">
                <ul className="navbar-nav ml-auto" >
                    <li className="nav-item" ><a className="nav-link active" href="#" data-toggle="tab" onClick={this.OnChange2} >Home</a></li>
                    <li className="nav-item" ><a className="nav-link" href="#" onClick={this.OnChange1} data-toggle="tab">{pro}</a></li>
                    
                    <li className="nav-item" ><a className="nav-link "  data-toggle="tab" onClick={this.OnChange3} >Shop</a></li>
                    
                 <li className="nav-item" ><a className="nav-link "  data-toggle="tab" onClick={this.OnChange4} >{status}</a></li>
                </ul>
                </div>

            </nav>
            </span>
            
        

    )
    }
}
export default withRouter(Header)