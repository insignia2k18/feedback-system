import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class Alltests extends Component {
          constructor() {
    super();
    this.state = {
      tests: [] , 
      done: false
    };
  }

 async componentDidMount() {
   let result = await axios.get("https://feedback-system-rxncq.run.goorm.io/tests" );
    this.setState({tests: result.data , done: true});
    console.log(this.state.tests);
  }

  render() {






if(this.state.done == false) 
{
  return (

<div className = "bg-dark">
  <div class="ui active dimmer">
    <div class="ui text loader">
    Loading
    </div>
  </div>
</div>



  );
}else 
  {

  


    var list = this.state.tests.map((test) => {
      return ( <div key = {test.id} class="ui segment p-4 m-5" > 
       <div className = "d-flex justify-content-around"> <div class = "h5 bg-info text-white p-2 rounded shadow">   {test.name} </div>  <div class = "h5 bg-success text-white p-2 rounded shadow">   {test.code} </div> 

       <div class = "h5 bg-warning text-white p-2 rounded shadow">     <Link to={'/result/' + test.code} className="nav-link">Result</Link> </div> 
               
        </div> 

                 

        <div>  <table class="mt-3 table table-striped"> 
        
          <thead class = "thead-dark">
    <tr>
     
      <th scope="col">Subject</th>
      <th scope="col">Teacher</th>

    </tr>
  </thead>

<tbody>
    
    {test.subarray.map(sub => {
      return ( <tr> 
        <td> {sub.sub} </td>
        <td> {sub.name} </td>
      </tr>)
    } )  }
   
  </tbody>

          </table> 
            </div>
       </div>);
    })
    return  <div className = "container"> {list} </div>;
  }
  }

}

export default Alltests;