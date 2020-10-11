import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')}
`
;


class Task extends Component {
  render() {
    return (
      /**
       * A Dragggable props has 2 required props.
       * - draggableId - a unique identifier
       * - index - an index for the item
       */
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}>
        {
          (provided, snapshot)=>{ // Snapshot contains props that you can use to style your draggable components while on drag.
            return (
              <Container 
                {...provided.draggableProps} // These props need to be applied to the components that we want to move around 
                {...provided.dragHandleProps} // These are the props that needs to be applied to the part of the component that we want to use to control the entire component
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}>
                {this.props.task.content}
              </Container>
            )
          }
        }
      </Draggable>
    )
  }
}

export default Task;