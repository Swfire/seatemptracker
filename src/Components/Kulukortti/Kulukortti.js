import React from 'react';
import '../../App.css';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';


function Kulukortti(props) {
    let testauspaiva = moment(props.data.testauspaiva)

    return (
    <div className="kulukortti">
      <div className="kulukortti__ryhma">
          <div className="kulukortti__rivi">
            <div className="kulukortti__kaupunki">{props.data.kaupunki}</div>
            <div className="kulukortti__arvo">{props.data.arvo}°C</div>
          </div>
          <div>
          <div className="kulukortti__rivi">
            <div className="kulukortti__kuukausi">{props.data.kuukausi}</div>
            <div className="kulukortti__viikko">Week: {props.data.viikko}</div>
          </div>
          <div className="kulukortti__rivi">
            <div className="kulukortti__testauspaiva">{testauspaiva.format("ll")}</div>
            <div className="kulukortti__saatila">Weather: {props.data.saatila}</div>
          </div>
          </div>
        </div>
    <div className="kulukortti__linkki">   
      <Link to={"/edit/" + props.data.id}><EditIcon /></Link>
    </div>
    </div>
    );
  }

export default Kulukortti;