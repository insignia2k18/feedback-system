import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
class ScheduleTest extends Component {
  constructor() {
    super();
    this.state = {
      name: '' ,
      sub: '', 
      subss : [] , 
      testName: ''
    };
  }

   subjects = [];

delfromarr = (id) => {
  var temparr = [] , k = 0;
  for(var i = 0 ; i < this.subjects.length ; i++)
  {
    if(id != this.subjects[i].id)
    {
      temparr.push({  id : k++  ,name : this.subjects[i].name , sub : this.subjects[i].sub   });
    }
  }
  this.subjects = temparr;
  this.setState({subss : temparr});
}


addsub = () => {
  if(this.state.name == "" || this.state.sub == "") 
  {
    return;
  }
  this.subjects.push({id : this.subjects.length , name : this.state.name , sub : this.state.sub });
  this.setState({subss : this.subjects , name : "" , sub : ""});

}


createTest = async() => {
  var finalobj = { };
  finalobj.name = this.state.testName;
  var temp = this.state.subss;
  temp.forEach(function(v){ delete v.id });
  finalobj.subarray = temp;
  let res = await axios.post("https://feedback-system-rxncq.run.goorm.io/createtest" , finalobj);
  console.log(res);
  if(res.status == 200) 
  {
    swal("Done!", "Your Test has Been Created!", "success");
  }else 
  {
    swal("Oops!", "Something went wrong!", "error");
  }

}
  render() {

   var sublist =  this.state.subss.map((sub , index) => {
    
      return (<div key = {index}> {sub.name} - {sub.sub} <button onClick = {(e) => this.delete(index)}>Delete </button> </div>)

    } );


    return (
      <div>
       
<div className = "d-flex justify-content-center align-items-center fullh1" >

       <div class="ui input mx-3">
           <input type = "text"  placeholder="Test Name" value = {this.state.testName} onChange = {(e) => this.setState({testName : e.target.value})}/>
            
</div>


       <div class="ui input mx-3">
           <input type = "text"  placeholder="Teacher Name" value = {this.state.name} onChange = {(e) => this.setState({name : e.target.value})}/>
</div>

     <div class="ui input">
  
            <input type = "text"  placeholder="Subject Name" value = {this.state.sub} onChange = {(e) => this.setState({sub : e.target.value})}/>
</div>

 <button onClick = {(e) => this.addsub() } className = "ml-4 ui primary button"  >Add Subject </button>
  <button onClick = {(e) => this.createTest()}  className = "ml-4 ui green button" > Create Test </button>

</div>

           

       
       <div className = "d-flex justify-content-center align-items-center"> 
        
         <table class="table w-50  table-dark">
  <thead>
    <tr>
      <th scope="col">Staff </th>
      <th scope="col">Subject </th>
      <th scope="col">Delete </th>
    </tr>
  </thead>
  <tbody>
             {this.subjects.map(item => (
                    <tr  key={item.id}> <td> {item.name}  </td> <td> {item.sub} </td> <td>  <button className = "ui red button" onClick={ (e) => this.delfromarr(item.id)  } >Delete</button> </td>  </tr>
                ))}
  </tbody>
</table>
       </div>




        
       
      </div>
    );
  }
}

export default ScheduleTest;