import React from 'react';
import Content from '../Content/Content';
import './Settings.css';
import Button from '../buttons';

function Settings(props) {

    const handleSubmit = function(event) {
      event.preventDefault();
      let tyyppi = event.target.elements.saatila.value;
      props.onFormSubmit(tyyppi);
      event.target.elements.saatila.value = "";
    }

    return (
      <Content> 
        <div className="settings">
        <h2>Settings</h2>
        <h3>Weather options</h3>
        <div className="setting__items">
          { props.selectList.map(item => <div key={item}>{item}</div>) }
          <form onSubmit={handleSubmit}>
            <div className="SettingsForm">
              <input type="text" name="saatila" />
              <Button type="submit" primary>ADD</Button>
            </div>
          </form>
      </div>
      </div>
      </Content>
    )
  }

export default Settings;