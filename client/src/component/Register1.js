
import React, { Component } from 'react';
import './MyCss.css';
const axios = require('axios');

class Register extends Component {
  constructor(props){
    super();
    this.state={fields:{} ,errors: {}}
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  handleValidation(){
     let fields = this.state.fields;
     let errors = {};
     let formIsValid = true;
  
     if(!fields["fname"]){ formIsValid = false;
        errors["fname"] = "Cannot be empty";
      }
    
      if(typeof fields["fname"] !== "undefined"){
        if(!fields["fname"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            errors["fname"] = "Only letters";
        }        
      }
  
      if(!fields["lname"]){ formIsValid = false;
        errors["lname"] = "Cannot be empty";
      }
    
      if(typeof fields["lname"] !== "undefined"){
        if(!fields["lname"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            errors["lname"] = "Only letters";
        }        
      }
  
      if(!fields["email"]){
        formIsValid = false;
        errors["email"] = "Cannot be empty";
      }

      if(typeof fields["email"] !== "undefined"){
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');

          if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
      }  

      this.setState({errors: errors});
      return formIsValid;
    }
  handleChange(e) {
    let fields = this.state.fields;
       //console.log(fields[e.target.name]);
        fields[e.target.name] = e.target.value;
        this.setState({fields});
  }
  submitLogin=(e)=>{
    e.preventDefault();
    if(this.handleValidation()){
      const userData = this.state.fields;
      userData.role="1";
      userData.FullName=userData.fname+" "+userData.lname;
     // console.log(this.state.fields);
      axios.post(`http://localhost:5000/register`,userData)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if(res.data.hasOwnProperty("_id")){
          alert("Registered successfully")
        }
        else{
          alert("Form has errors.")
      }
      })
      .catch((err)=> {console.log(err); })
  
   }else{
      alert("Form has errors.")
   }
      }
  render() {
    return (
      <div className="signup">       
        <form className="px-4 py-3" encType="multipart/form-data" onSubmit= {this.submitLogin} >
          <div className="form-row">
            <div className="form-group col-md-6" >
            <label htmlFor="name">FirstName</label>
            <input type="text" className="form-control" name="fname" placeholder="Enter FirstName" value={this.state.fields.fname || ''} onChange={this.handleChange} />
            <span style={{color: "red"}}>{this.state.errors["fname"]}</span>
          </div> 
          <div className="form-group col-md-6" >
            <label htmlFor="name">LastName</label>
            <input type="text" className="form-control" name="lname" placeholder="Enter LastName" value={this.state.fields.lname || ''} onChange={this.handleChange} />
            <span style={{color: "red"}}>{this.state.errors["lname"]}</span>
          </div>
          </div>          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" name="email" placeholder="email@example.com" value={this.state.fields.email || ''} onChange={this.handleChange}/>
            <span style={{color: "red"}}>{this.state.errors["email"]}</span>

          </div>
          <div className="form-group" >
            <label htmlFor="tele">MobileNumber</label>
            <input type="tel" className="form-control" name="tele" placeholder="Enter Number" value={this.state.fields.tele || ''} onChange={this.handleChange} />
          </div>
          
          <div className="form-row">
           <div className="form-group col-md-6" >
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Enter Password" value={this.state.fields.password || ''} onChange={this.handleChange} autoComplete="off"/>
          </div> 
          <div className="form-group col-md-6">
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" className="form-control" name="password2" placeholder="ReEnter Password" value={this.state.fields.password2 || ''} onChange={this.handleChange} autoComplete="off"/>
          </div>          
          </div>
          <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="profile">ID-Card</label>
            <input type="file" className="form-control" name="file" value={this.state.fields.file || ''} onChange={this.handleChange}/>
          </div>
           <div className="form-group col-md-3" >
          <label for="sel1">Industry</label>
          <select class="form-control" name="industry" value={this.state.fields.industry || ''} onChange={this.handleChange} >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
          </div>
          <div class="form-group col-md-3">
          <label for="sel1">categary</label>
          <select class="form-control" id="catagary" name="catagary" value={this.state.fields.catagary || ''} onChange={this.handleChange}>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>
          </div>
          </div>
          <button type="submit" className="btn btn-outline-info btn-rounded btn-block z-depth-0 my-4 waves-effect">Sign in</button>
          <p>Already a member?<a href="/login">LogIn</a></p>
        </form>
        </div>
    );
  }
}

export default Register;
