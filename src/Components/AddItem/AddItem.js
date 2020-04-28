import React from 'react';
import Content from '../Content/Content';
import './AddItem.css';
import ItemForm from '../ItemForm/ItemForm';

function AddItem(props) {
    return (
      <Content>

        <div className="additem">

        <h2>Add new temperature</h2>

        <ItemForm onFormSubmit={props.onFormSubmit} 
                  selectList={props.selectList}/>

        </div>

      </Content>
    )
  }

export default AddItem;