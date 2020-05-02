import React, {Component} from 'react'
import Moment from 'moment'

// HomePage
import Assesments from '../Components/DashboardStudent/Assesments'
import ToDOModal from '../Components/DashboardStudent/SubmitModal'


// Nav
import Nav from '../Components/NavBar'

// redirect
import {Redirect} from 'react-router-dom'


const assesmentsToDo=[
    {
        name:'Delivery 6 Assesments',
        teamMates:['Pedro', 'John', 'Adam'],
        dueDate: new Date(),
        id:12312
    }
]

const assesmentsClosed=[
    {
        name:'Delivery 5 Assesments',
        teamMates:['Pedro', 'John', 'Adam'],
        dueDate: Moment(new Date()).subtract(10, 'days').calendar(),
        id:12312
    }
]



class StudentHome extends Component{

    state={
        openToDoModal:false,
        todoSelected:null,
        todoResponses:null,
        logout:false,

        evaluations:[]
    }

    async componentDidMount() {
        try {
          const res = await fetch('http://127.0.0.1:8000/api/Evaluation');
          const evaluations = await res.json();
          this.setState({
            evaluations
            });
            
            for (let i = 0; i < Object.keys(this.state.evaluations).length; i++){
                var today = new Date();
                var todayDate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate(); //MUST REMOVE 0's AFTER MAY 10th

                if (this.state.evaluations[i].dueDate >= todayDate){
                    assesmentsToDo.push(this.state.evaluations[i]);
                }
                else{
                    assesmentsClosed.push(this.state.evaluations[i]);
                }
            }
            console.log(assesmentsToDo);
            console.log(assesmentsClosed);
        } catch (e) {
          console.log(e);
        }
      }

    // *----------HANDLE MODAL METHODS------------------*
     openModalHandler = (e) => {
         console.log(assesmentsToDo[e])
        this.setState({
            openToDoModal:true,
            todoSelected:assesmentsToDo[e]

        });
      };
    
    handleClose = () => {
        this.setState({
            openToDoModal:false
        })
      };

    // LOGOUT
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
                toDoArr={assesmentsToDo}
                closedArr={assesmentsClosed}
                openModal={this.openModalHandler}
                />

            <ToDOModal 
                close={this.handleClose}
                open={this.state.openToDoModal}
                info={this.state.todoSelected}
            />

            {this.state.logout===true?<Redirect to='/login' />:null}

            </Nav>
        )
    }
}

export default StudentHome