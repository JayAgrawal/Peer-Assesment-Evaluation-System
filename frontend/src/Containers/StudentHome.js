import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

// HomePage
import HomePage from '../Components/DashboardStudent/StudentHome'


// Nav
import Nav from '../Components/NavBar'

let firstName = ''
let totalAssesment=0
let toDoAssesment=0
let missAssesment=0
let visAssesment=0
let overall=0
let completeAssesment=0

class StudentHome extends Component{

    state={
        logout:false,

        evaluations:[],
        students:[],
    }

    async componentDidMount() {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/Evaluation');
            const evaluations = await res.json();
            this.setState({
                evaluations
            });

            let studentLoggedIn = [];
            if(localStorage && localStorage.getItem("studentLoggedIn")){
                studentLoggedIn = JSON.parse(localStorage.getItem("studentLoggedIn"));
            }

            firstName = studentLoggedIn.firstName;

            totalAssesment=0
            toDoAssesment=0
            missAssesment=0
            visAssesment=0
            overall=0
            completeAssesment=0

            for (let i = 0; i < Object.keys(this.state.evaluations).length; i++){
                if(studentLoggedIn.id == this.state.evaluations[i].student){
                    overall += this.state.evaluations[i].rating;
                    if(this.state.evaluations[i].completed == true){
                        completeAssesment++;
                    }
                    else{
                        var today = new Date();
                        var todayDate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate(); //MUST REMOVE 0's AFTER MAY 10th

                        if (this.state.evaluations[i].dueDate >= todayDate){
                            toDoAssesment++;
                        }
                        else{
                            missAssesment++;
                        }
                    }
                    visAssesment=toDoAssesment+missAssesment;
                }

            }
            totalAssesment=completeAssesment+toDoAssesment+missAssesment;
            overall = (overall/(completeAssesment+missAssesment)).toFixed(2);
            
        } catch (e) {
          console.log(e);
        }
      }

    onLogout=()=>{
        this.setState({
            logout:true
        })
    }

    render(){

      
        return(
            <Nav
                user="Student"
                onLogout={this.onLogout}
            >

                <HomePage 
                    name={firstName}
                    complete={completeAssesment}
                    total={totalAssesment}
                    todo={toDoAssesment}
                    missed={missAssesment}
                    visible={visAssesment}
                    overall={overall}
                />

            {this.state.logout===true?<Redirect to='/login' />:null}

            </Nav>
        )
    }
}

export default StudentHome