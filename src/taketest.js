import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import axios  from 'axios';
import swal from 'sweetalert';
class TakeTest extends Component {
   constructor() {
    super();
    this.state = {
      value : [],
      currentQuestion : "Who Are You?" ,
      prevClass : "d-none" ,
      nextClass : "" ,
      animation: "bounceInLeft",
      subcnt : 0,
      pageno: 0 ,
      isSubmit: 'd-none', 
      subjects: [],
      isNameFilled: false,
      testCode : '' ,
      studentName: ''
    };





  }
  currcnt = 0;
   questions = ["Who Are You?" , "Can You see This?" , "Vanga machaan vaanga" , "where is chandrayan?" , "Prithvi evlo peria aalu?" , "Who Are You?" , "Can You see This?" , "Vanga machaan vaanga" , "where is chandrayan?" , "Prithvi evlo peria aalu?" , "Who Are You?" , "Can You see This?" , "Vanga machaan vaanga" , "where is chandrayan?" , "Prithvi evlo peria aalu?"];
  //  subjects = [{name: "Maths" , teacher: "Raju" } , {name: "English" , teacher: "Gokul" } , {name: "Science" , teacher: "SomuRaj" } , {name: "Social" , teacher: "Geetha" } ,  {name: "Computer Science" , teacher: "Meera" }  ];

//next question button   
  goToNext = (e) =>{
       this.setState({pageno : this.state.pageno + 1});
      this.setState({ prevClass : " " , animation: "bounceOutRight"});
      setTimeout(()=> {
this.setState({animation : "bounceInLeft"});
      } , 600 );
      // 
      if(this.state.pageno == this.questions.length - 2) 
      {
        this.setState({nextClass: " d-none" , isSubmit: 'd'})
      }
     
  }

//previous button logic
    goToPrev = (e) =>{
       this.setState({pageno : this.state.pageno - 1});
      this.setState({ nextClass : "" , animation: "bounceOutLeft" , isSubmit: 'd-none'});

      setTimeout(()=> {
this.setState({animation : "bounceInRight"});
      } , 600 );
      if(this.state.pageno == 1) 
      {
        this.setState({prevClass: "d-none"})
      }

  }


  componentDidMount =  () => {
   

  }

    handleChange = value => {
    this.setState({
      value: value
    })
  };

 


  onSubmit = async (e) => {
    //write logic to post to the database!
    var markarr = [];
    // for(var i = 0 ; i < this.questions.length * this.state.subjects.length ; i++)
    // {
    //   var valueName = 'value' + (i+1);
    //   console.log( `${valueName} : ${this.state[valueName]}`);

    //   // markarr.push({name: this.state.sub , sub: , mark: , qno:});
    // }
let temp = 1;
  for(var i = 0 ; i < this.questions.length ; i++) 
  {
    for(var j = 0 ; j < this.state.subjects.length ; j++)
    {
      var valueName = 'value' + temp;
      temp++;
      markarr.push({name: this.state.subjects[j].name , sub: this.state.subjects[j].sub , mark: Number(this.state[valueName]) , qno: i+1});
    }
  }
  console.log(markarr);
  var finalobj = {};
  finalobj.code = this.state.testCode;
  finalobj.student = this.state.studentName;
  finalobj.markarr = markarr;
  let result = await axios.post("https://feedback-system-rxncq.run.goorm.io/addresult" , finalobj ); 
  console.log(result);
  swal("Feedback Submitted" , "Your Feedback has been submitted. Please Close the browser window." , "success");
  }

  goToPage = (pgno) => {
    this.setState({pageno : pgno , animation: " bounceIn faster"});
       setTimeout(()=> {
this.setState({animation : ""});
      } , 700 );
    if(pgno == 0) 
    {
      // alert('hi');
       this.setState({prevClass: " d-none"});
       this.setState({ nextClass : " "  , isSubmit: 'd-none'});
       return;
        // this.setState({ prevClass : "mx-4 fas fa-chevron-left fa-4x float-left" });
        
    }else {
       this.setState({ nextClass : " "  , isSubmit: 'd-none'});
      

    }

    if(pgno == this.questions.length  - 1)
    {
       this.setState({nextClass: " d-none" , isSubmit: 'd'});
       this.setState({ prevClass : "" });
       return;
     
    }else {
      this.setState({ prevClass : "" });
      
    }
  }

  getCode = () => {
 axios.get("https://feedback-system-rxncq.run.goorm.io/test/" + this.state.testCode).then((test) => {
    console.log(test.data);
   this.setState({subjects: test.data.subarray , subcnt : test.data.subarray.length , isNameFilled: true});
 } );
  }

  render() {

     if(this.state.isNameFilled == true) 
     {
      var myList = [];
      var temp = 0;
      for(var k = 0 ; k <  this.questions.length ; k++ )
      {
         myList[k] = this.state.subjects.map((subject ,index)=> {
           temp++;
     var valueName = "value" + temp;
  

     return (<div className='slider w-50' key = {subject.name}>  

     <div>
     {subject.name} - {subject.sub} 
     </div>
    <div className = "">
     <div className = ""> 

             <Slider
          min={0}
          max={100}
          value= {this.state[valueName]}
        
          onChange={(e) => this.setState( { [valueName] : e } )}
            />

  
    </div>
</div> 
     </div>);
   }

)
      }

  

    return (



      <div>
       <div className = "numcont"> 
       {this.questions.map((question , index) => {
         return (<button className =  "numbtn" id = {  index==this.state.pageno ? "btnselected" : "bbbbbbbb"  } onClick = {(e) => this.goToPage(index)}>  {index+1}  </button> ) 
       } )}
  </div>
          
          <div class={`shadow-lg p-5 m-5 bg-white rounded lead animated faster ${this.state.animation}`}>{this.questions[this.state.pageno]}</div>
    <div className='d-flex flex-column justify-content-center align-items-center'>
          {myList[this.state.pageno]}
    
      </div>
   
          <i onClick = {(e) => this.goToPrev(e)} class={"mx-4 fas fa-chevron-left fa-4x float-left " + this.state.prevClass}></i>
        <i onClick = {(e) => this.goToNext(e)} class={"mx-4 fas fa-chevron-right fa-4x float-right " + this.state.nextClass}></i>
       

       <button className = {"ui primary button float-right " + this.state.isSubmit} onClick = {(e) => this.onSubmit(e)}> Submit </button>
      </div>
    );
  } else {
    return (
     <div className = "d-flex justify-content-center flex-column align-items-center fullh">
           <div class="ui input mx-3 my-3">
           <input type = "text"  placeholder="Student Name" value = {this.state.studentName} onChange = {(e) => this.setState({studentName : e.target.value})}/>
</div>


       <div class="ui input mx-3 my-3">
           <input type = "text"  placeholder="Test Code" value = {this.state.testCode} onChange = {(e) => this.setState({testCode : e.target.value})}/>
        </div>

<button onClick = {(e) => this.getCode() } className = "ml-4 ui primary button"  >Submit</button>


     </div>

 
    );
  } 

  }
}



export default TakeTest;