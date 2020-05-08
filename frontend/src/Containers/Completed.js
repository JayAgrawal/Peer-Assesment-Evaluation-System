import React, {Component} from 'react'
import Moment from 'moment'

// HomePage
import Assesments from '../Components/DashboardStudent/Completed'



// Nav
import Nav from '../Components/NavBar'

import {Redirect} from 'react-router-dom'



const assesmentsCompleted=[
    /*{
        name:'Delivery 1 Assesments',
        dueDate:  Moment(new Date()).subtract(30, 'days').calendar(),
        overAll: 3,
        teachersComment:'Do you even code brah?'
    },
    {
        name:'Delivery 2 Assesments',
        dueDate:  Moment(new Date()).subtract(20, 'days').calendar(),
        overAll: 3,
        teachersComment:'When are you dropping?'
    },
    {
        name:'Delivery 3 Assesments',
        dueDate:  Moment(new Date()).subtract(15, 'days').calendar(),
        overAll: 3,
        teachersComment:'Thoughts on millitary school?'
    },*/
    {
        evaluation_name:'Delivery 4 Assesments',
        dueDate:  Moment(new Date()).subtract(25, 'days').calendar(),
        rating: 2,
        comment:'You gucci?'
    }
]

let studentLoggedIn = [];

class StudentHome extends Component{

    state={
        evaluations:[],
    }

    async componentDidMount() {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/Evaluation');
            const evaluations = await res.json();
            this.setState({
                evaluations
            });

            
            if(localStorage && localStorage.getItem("studentLoggedIn")){
                studentLoggedIn = JSON.parse(localStorage.getItem("studentLoggedIn"));
            }

            for (let i = 0; i < Object.keys(this.state.evaluations).length; i++){
                if(studentLoggedIn.id == this.state.evaluations[i].student){
                    if (this.state.evaluations[i].completed == true){
                        if(assesmentsCompleted.some(temp => temp.id === this.state.evaluations[i].id)){}  
                            else{assesmentsCompleted.push(this.state.evaluations[i]);}
                    }
                }
            }
            assesmentsCompleted.shift();
            assesmentsCompleted.sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1);
        } catch (e) {
          console.log(e);
        }
      }

    editModalHandler = e => {
        if(assesmentsCompleted[e].student == studentLoggedIn.id){
            fetch("http://127.0.0.1:8000/api/Evaluation/", {
            method: "post",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            },
                body: JSON.stringify({
                evaluation_name: assesmentsCompleted[e].evaluation_name,
                rating: 0,
                comment: assesmentsCompleted[e].comment,
                dueDate: assesmentsCompleted[e].dueDate,
                completed: false,
                student: assesmentsCompleted[e].student,
                teamMembers: assesmentsCompleted[e].teamMembers,
                })
            });
            fetch("http://127.0.0.1:8000/api/Evaluation/" + assesmentsCompleted[e].id, {
                method: 'DELETE',
            });
            console.log('deleted');
        }
    };

    onLogout=()=>{
        console.log('here')
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
                <Assesments
                completedArr={assesmentsCompleted}
                editModal={this.editModalHandler}
                />

            {this.state.logout===true?<Redirect to='/login' />:null}
            

            </Nav>
        )
    }
}

export default StudentHome