import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'; 
import initial_data from './utils/initial-data';
import Column from './Column';
import './App.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;


class App extends Component {

  state = initial_data;

  /**
   * When the dragging starts, 
   * we want to customize the appearance of the text
   */
  onDragStart = () => {
    document.body.style.color = 'orange';
    document.body.style.transition = 'background-color 200ms ease-in';
  }

  /**
   * When the dragging happens,
   * we want to alter the opacity by dividing it's position over the total number of items
   */
  onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(this.state.tasks).length
      : 0;
    
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
  }

  onDragEnd = result => {

    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

    // get the destination, the source, and the item's draggableID
    const { destination, source, draggableId } = result;

    // If there's no destination, or if the item was dragged to invalid area,
    // Do nothing
    if(!destination){
      return;
    }
    
    // If the item was dropped in the same area and was placed in the same position,
    // Do nothing
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return ;
    }

    // Get the column;
    const starting_column =  this.state.columns[source.droppableId];
    const destination_column = this.state.columns[destination.droppableId];

    if(starting_column === destination_column){
      // Get the column's task IDs
      const newTaskIds = Array.from(starting_column.taskIds);
      
      // Remove the item from its current position
      newTaskIds.splice(source.index, 1);

      // Add it to the desired position index
      newTaskIds.splice(destination.index, 0, draggableId)

      // Compose the new column
      const newColumn = {
        ...starting_column,
        taskIds: newTaskIds
      };
      
      // Compose the updated state
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }

      // Assign it back to the state;
      this.setState(newState)
    }

    //Moving one item to another;
    const starting_column_task_ids = Array.from(starting_column.taskIds);
    starting_column_task_ids.splice(source.index, 1);
    const new_starting_column = {
      ...starting_column,
      taskIds: starting_column_task_ids
    }

    const destination_column_task_ids = Array.from(destination_column.taskIds);
    destination_column_task_ids.splice(destination.index, 0, draggableId);
    const new_destination_column = {
      ...destination_column,
      taskIds: destination_column_task_ids
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [new_starting_column.id]: new_starting_column,
        [new_destination_column.id]: new_destination_column
      }
    }

    this.setState(newState)

  }

  render() {
    return (
      <DragDropContext
        // onDragStart={this.onDragStart}
        // onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}>
        <Container>
          {
            this.state.columnOrder.map((columnId)=>{
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
        
              return <Column key={column.id} column={column} tasks={tasks} />
            })
          }
        </Container>
      </DragDropContext>
    )
  }
}

export default App;