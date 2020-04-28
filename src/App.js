import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './Components/Header/Header';
import Menu from './Components/Menu/Menu';
import Items from './Components/Items/Items';
import Stats from './Components/Stats/Stats';
import Settings from './Components/Settings/Settings';
import AddItem from './Components/AddItem/AddItem';
import EditItem from './Components/EditItem/EditItem';
import firebase from './Firebase';

class App extends Component {

  constructor(props) {
    super (props);
    this.state = {
      data: [],
      selectList: ["Sunny","Rainy","Cloudy"]
    }
    this.dbRef = firebase.firestore();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSelectListForm = this.handleSelectListForm.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  componentDidMount() {
    this.refData = this.dbRef.collection('data');
    this.refData.orderBy("testauspaiva").onSnapshot((docs) => {
      let data = [];
      docs.forEach((doc) => {
        let docdata = doc.data();
        data.push(docdata);
      });
      this.setState({
        data: data
      });
    });
  }

  handleFormSubmit(newdata) {
    this.refData.doc(newdata.id).set(newdata);
  }

  handleSelectListForm(newitem) {
    let selectList = this.state.selectList.slice();
    selectList.push(newitem);
    selectList.sort();
    this.setState({
      selectList: selectList
    })
  }

  handleDeleteItem(id) {
    this.refData.doc(id).delete().then().catch(error => {console.error("Error while deleting: ", error)});
  }

  render() {
    return(
    <Router>
      <div className="App">
      <Header />
      <Route path="/" exact render={() => <Items data={this.state.data} />} />
      <Route path="/stats" render={() => <Stats data={this.state.data} />} />
      <Route path="/settings" render={() => <Settings 
                                              selectList={this.state.selectList} 
                                              onFormSubmit={this.handleSelectListForm} /> } />
      <Route path="/add" render={() => <AddItem 
                                        onFormSubmit={this.handleFormSubmit} 
                                        selectList={this.state.selectList} />} />
      <Route path="/edit/:id" render={(props) => <EditItem 
                                                  data = {this.state.data}
                                                  selectList={this.state.selectList} 
                                                  onFormSubmit={this.handleFormSubmit}
                                                  onDeleteItem={this.handleDeleteItem}
                                                  {...props} />} />
      <Menu />
      </div>
    </Router>
  );
}
}

export default App;