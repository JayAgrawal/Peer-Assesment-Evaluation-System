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

            for (let i = 0; i < Object.keys(this.state.evaluations).length; i++){
                if (this.state.evaluations[i].completed == true){
                    if(assesmentsCompleted.some(temp => temp.id === this.state.evaluations[i].id)){}  
                        else{assesmentsCompleted.push(this.state.evaluations[i]);}
                }
            }
            assesmentsCompleted.shift();
            assesmentsCompleted.sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1);
            console.log(assesmentsCompleted);
            
        } catch (e) {
          console.log(e);
        }
      }


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
                />

            {this.state.logout===true?<Redirect to='/login' />:null}
            

            </Nav>
        )
    }
}

export default StudentHome