import React from 'react'
import './css/index.css'
import Box from './Box'

class Content extends React.Component{
    constructor() {
        super()
        this.state={
            productList:[]

        }
        
    }
    componentWillMount(){
        
        
        fetch("http://127.0.0.1:8000/task/ProductList/",{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token')
            },
        
            
          }).
        then(response =>response.json()).
        then(data =>{
            this.setState({
                productList:data
            
            },console.log(this.state.productList))
        })
       
            
    }
    render(){
        

       const List=this.state.productList.map((product,index)=><Box key={index} list={product}/>)
        return(
            
         <div className="Container">
             <div className="container-fluid sub-container">
                 <div className="row">
                  
                    {List}
                 </div>
            </div>
         </div>

        )
    }
    
}
export default Content

