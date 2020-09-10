import "./style.css";
import fireb from "./fireb";
import React, { Component } from "react";

class App extends Component {
  state = {
    name: "",
    data: [],
    update: false,
  };
  componentDidMount() {
    let fireRef = fireb.database().ref("Todos");
    fireRef.on("value", (snapshot) => {
      let todo = snapshot.val();
      let todoList = [];
      for (let key in todo) {
        todoList.push({ key, ...todo[key] });
      }
      this.setState({
        data: todoList,
      });
    });
  }

  render() {
    const handleChange = (e) => {
      const i = e.target.value;
      this.setState({
        name: i,
      });
    };
    const handleSubmit = (e) => {
      let fireRef = fireb.database().ref("Todos");
      e.preventDefault();
      if (!this.state.name) {
        return null;
      } else {
        const todos = {
          name: this.state.name,
        };
        fireRef.push(todos);
        this.setState({
          name: "",
        });
      }
    };
    const handleUpdate = (e, key) => {
      let fireRef = fireb.database().ref("Todos").child(key);
      fireRef.update({
        name: e.target.value,
      });
    };
    const updateItem = (key) => {
      this.setState({
        update: !this.state.update,
      });
    };
    const deleteItem = (key) => {
      let fireRef = fireb.database().ref("Todos").child(key);
      fireRef.remove();
    };

    return (
      <div className="main">
        <div className="main-box">
          <h1 className="heading">Firebase - React CRUD</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              value={this.state.name}
              className="input-main shadow border rounded-lg"
              onChange={handleChange}
            />
            <button className="btn">Add</button>
          </form>
        </div>
        <div className="box">
          {this.state.data.map((item) => (
            <div className="todo-box">
              <h4>{item.name}</h4>
              <div className="opt-btn">
                {this.state.update ? (
                  <div>
                    <input
                      className="update-input"
                      onChange={(e) => handleUpdate(e, item.key)}
                    />
                  </div>
                ) : null}
                <button onClick={() => deleteItem(item.key)} className="delete">
                  Delete
                </button>
                <button onClick={() => updateItem(item.key)} className="delete">
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
