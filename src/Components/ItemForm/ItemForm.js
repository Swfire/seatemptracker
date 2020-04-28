import React from 'react';
import './ItemForm.css';
import Button from '../buttons';
import { withRouter } from "react-router";
import { v4 as uuidv4 } from 'uuid';

class ItemForm extends React.Component {

    constructor(props) {
        super(props);
        const data = props.data ? props.data : {
          kaupunki: "none",
          viikko: "",
          arvo: "",
          testauspaiva: "",
          kuukausi: "",
          saatila: ""
        }
        this.state = {
            data: data
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'onChange' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          data: {
              ...this.state.data,
              [name]: value
          }
        });
      }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.goBack();
    }
    
    handleSubmit(event) {
        event.preventDefault();
        let data = Object.assign({}, this.state.data);
        data.arvo=parseFloat(data.arvo);
        data.id = data.id ? data.id : uuidv4();
        this.props.onFormSubmit(data);
        this.props.history.push("/");
    }

    handleDeleteItem(event) {
      event.preventDefault();
      this.props.onDeleteItem(this.state.data.id);
      this.props.history.push("/");
    }

    render() {
        return(
        <form onSubmit={this.handleSubmit}>

        <div className="itemform">

          <div className="itemform__row">
            <div>
              <label htmlFor="kaupunki">City</label>
              <select name="kaupunki" value={this.state.data.kaupunki} onChange={this.handleInputChange}>
                <option value="none"></option>
                <option value="Larnaka">Larnaka</option>
                <option value="Ayia Napa">Ayia Napa</option>
                <option value="Paphos">Paphos</option>
              </select> 
            </div>
            <div>
              <label htmlFor="saatila">Weather</label>
              <select name="saatila" value={this.state.data.saatila} onChange={this.handleInputChange}>

        {this.props.selectList.map(item => <option value={item}key={item}>{item}</option> )}

              </select> 
            </div>
          </div>

          <div className="itemform__row">
            <div>
              <label htmlFor="viikko">Week number</label>
              <input type="number" name="viikko" min="1" max="52" value={this.state.data.viikko} onChange={this.handleInputChange}/>
            </div>
            <div>
              <label htmlFor="arvo">Temperature</label>
              <input type="text" name="arvo" maxLength="4" value={this.state.data.arvo} onChange={this.handleInputChange}/>
            </div>
          </div>

          <div className="itemform__row">
            <div>
              <label htmlFor="testauspaiva" >Measuring day</label>
              <input type="date" name="testauspaiva" value={this.state.data.testauspaiva} onChange={this.handleInputChange}/>
            </div>
            <div>
              <label htmlFor="kuukausi">Month</label>
              <select name="kuukausi" value={this.state.data.kuukausi} onChange={this.handleInputChange}>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select> 
            </div>
            </div>
          <div className="itemform__row">
            <div>
              <Button type="submit" primary>{this.state.data.id ? "SAVE" : "ADD"}</Button>
            </div>
            <div>
              <Button onClick={this.handleCancel}>CANCEL</Button>
            </div>
          </div>

          { this.props.onDeleteItem ?
            <div className="itemform__row">
              <div>
              <Button onClick={this.handleDeleteItem}>DELETE</Button>
              </div>
              <div></div>
          </div>  : "" }

          </div>

        </form>
        )
    }

}

export default withRouter(ItemForm);