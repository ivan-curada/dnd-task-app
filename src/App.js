import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'; 
import initial_data from './utils/initial-data';
import Column from './Column';
import './App.css';

class App extends Component {

  state = initial_data;

  onDragEnd = result => {
    console.log(result)
  }

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}>
        {
          this.state.columnOrder.map((columnId)=>{
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
      
            return <Column key={column.id} column={column} tasks={tasks} />
          })
        }
      </DragDropContext>
    )
  }
}

export default App;