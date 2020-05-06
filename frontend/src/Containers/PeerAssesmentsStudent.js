import React, { Component } from "react";
import Moment from "moment";

// HomePage
import Assesments from "../Components/DashboardStudent/Assesments";
import ToDOModal from "../Components/DashboardStudent/SubmitModal";

// Nav
import Nav from "../Components/NavBar";

// redirect
import { Redirect } from "react-router-dom";

const assesmentsToDo = [
  /*{
        name:'Delivery 6 Assesments',
        teamMates:['Pedro', 'John', 'Adam'],
        dueDate: new Date(),
        id:12312
    }*/
];

const assesmentsClosed = [
  /*{
        name:'Delivery 5 Assesments',
        teamMates:['Pedro', 'John', 'Adam'],
        dueDate: Moment(new Date()).subtract(10, 'days').calendar(),
        id:12312
    }*/
];

class StudentHome extends Component {
  state = {
    openToDoModal: false,
    todoSelected: null,
    todoResponses: null,
    logout: false,

    evaluations: [],
    team: [],
    teamDup: [],
    sliderRating: [0, 0, 0, 0]
  };

  async componentDidMount() {
    try {
      const resEval = await fetch("http://127.0.0.1:8000/api/Evaluation");
      const evaluations = await resEval.json();
      this.setState({ evaluations });

      const resTeam = await fetch("http://127.0.0.1:8000/api/Team");
      const team = await resTeam.json();
      this.setState({ team });

      const resTeamDup = await fetch("http://127.0.0.1:8000/api/Team");
      const teamDup = await resTeamDup.json();
      this.setState({ teamDup });

      for (let i = 0; i < Object.keys(this.state.evaluations).length; i++) {
        for (let j = 0; j < Object.keys(this.state.team).length; j++) {
          if (this.state.evaluations[i].teamMembers == this.state.team[j].id) {
            this.state.evaluations[i].teamMembers = [
              this.state.team[j].member1,
              this.state.team[j].member2,
              this.state.team[j].member3,
              this.state.team[j].member4,
              this.state.team[j].id
            ];
          }
        }

        if (this.state.evaluations[i].completed == false) {
          var today = new Date();
          var todayDate =
            today.getFullYear() +
            "-0" +
            (today.getMonth() + 1) +
            "-0" +
            today.getDate(); //MUST REMOVE 0's AFTER MAY 10th

          if (this.state.evaluations[i].dueDate >= todayDate) {
            if (
              assesmentsToDo.some(
                temp => temp.id === this.state.evaluations[i].id
              )
            ) {
            } else {
              assesmentsToDo.push(this.state.evaluations[i]);
            }
          } else {
            if (
              assesmentsClosed.some(
                temp => temp.id === this.state.evaluations[i].id
              )
            ) {
            } else {
              assesmentsClosed.push(this.state.evaluations[i]);
            }
          }
        }
      }

      assesmentsToDo.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
      assesmentsClosed.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
    } catch (e) {
      console.log(e);
    }
  }

  // *----------HANDLE MODAL METHODS------------------*
  openModalHandler = e => {
    console.log(assesmentsToDo[e]);
    this.setState({
      openToDoModal: true,
      todoSelected: assesmentsToDo[e]
    });
  };

  handleClose = () => {
    this.setState({
      openToDoModal: false
    });
  };

  submitEval = () => {
    console.log(this.state.todoSelected.rating);
    console.log(this.state.sliderRating);
    fetch("http://127.0.0.1:8000/api/Evaluation/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        evaluation_name: this.state.todoSelected.evaluation_name,
        rating: this.state.todoSelected.rating,
        comment: "Testing",
        dueDate: this.state.todoSelected.dueDate,
        completed: true,
        student: this.state.todoSelected.student,
        teamMembers: this.state.todoSelected.teamMembers.slice(-1)[0]
      })
    });
  };

  // LOGOUT
  onLogout = () => {
    console.log("here");
    this.setState({
      logout: true
    });
  };

  render() {
    return (
      <Nav user="Student" onLogout={this.onLogout}>
        <Assesments
          toDoArr={assesmentsToDo}
          closedArr={assesmentsClosed}
          openModal={this.openModalHandler}
        />

        <ToDOModal
          close={this.handleClose}
          open={this.state.openToDoModal}
          info={this.state.todoSelected}
          arrayRating={this.state.sliderRating}
          submit={this.submitEval}
        />

        {this.state.logout === true ? <Redirect to="/login" /> : null}
      </Nav>
    );
  }
}

export default StudentHome;
