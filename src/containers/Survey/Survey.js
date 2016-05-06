import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {SurveyForm} from 'components';
import request from 'superagent';
//import { asyncConnect } from 'redux-async-connect';

/*@asyncConnect({
  buttonColors: (params, helpers) => {
    if (!window.initColor) {
      request.get('http://planout.tribemedia.io/parameters?user_guid=anonymous').end(function(err, res) {
        window.initColor = res.body.init_color.value;
        window.saveColor = res.body.save_color.value;
        Promise.resolve({initColor: window.initColor, saveColor: window.saveColor});
      });
    } else {
      Promise.resolve({initColor: window.initColor, saveColor: window.saveColor});
    }
  }
})*/
@connect(
  () => ({}),
  {initialize})
export default class Survey extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    /*window.optimizely.push(['trackEvent', 'saveSurvey']);*/
    request.get('https://5662157414.log.optimizely.com/event?a=5662157414&d=5662157414&y=false&src=js&x5750250113=5759140016&s5692111775=gc&s5697131616=false&s5688002034=direct&tsent=1462369819.279&n=saveSurvey&u=oeu1462367115866r0.9819769772170281&wxhr=true&time=1462369819.279&f=5750250113&g=5826340299&cx2=255f22b5')
      .end(function(err, res) {
        window.alert('Data submitted! ' + JSON.stringify(data));
        this.props.initialize('survey', {});
      });

    request.get('http://abtesting.tribemedia.io:5000/participate?experiment=button_color_out&alternatives=red&alternatives=blue&client_id=12345678-1234-5678-1234-567812345678&kpi=saveSurvey')
      .end(function(err, res) {
        request.get('http://abtesting.tribemedia.io:5000/convert?experiment=button_color&client_id=12345678-1234-5678-1234-567812345678&kpi=saveSurvey')
          .end(function(err, res) {

          });
      });
  }

  handleInitialize = () => {
    this.props.initialize('survey', {
      name: window.myvar,
      email: window.myemail,
      occupation: 'Redux Wizard',
      currentlyEmployed: true,
      sex: 'male'
    });

    //window.optimizely.push(['trackEvent', 'initSurvey']);
    request.get('https://5662157414.log.optimizely.com/event?a=5662157414&d=5662157414&y=false&src=js&s5692111775=gc&s5697131616=false&s5688002034=direct&tsent=1462367147.538&n=initSurvey&u=oeu1462367115866r0.9819769772170281&wxhr=true&time=1462367147.538&f=5750250113&g=5824140674&cx2=3632d2e0')
      .end(function(err, res) {

      });

    request.get('http://abtesting.tribemedia.io:5000/participate?experiment=button_color_out&alternatives=red&alternatives=blue&client_id=12345678-1234-5678-1234-567812345678&kpi=initSurvey')
      .end(function(err, res) {
        request.get('http://abtesting.tribemedia.io:5000/convert?experiment=button_color&client_id=12345678-1234-5678-1234-567812345678&kpi=initSurvey')
          .end(function(err, res) {

          });
      });
  }

  render() {
    const buttonColors = { initColor: window.initColor, saveColor: window.saveColor };

    return (
      <div className="container">
        <h1>Survey</h1>
        <Helmet title="Survey"/>

        <p>
          This is an example of a form in redux in which all the state is kept within the redux store.
          All the components are pure "dumb" components.
        </p>

        <p>
          Things to notice:
        </p>

        <ul>
          <li>No validation errors are shown initially.</li>
          <li>Validation errors are only shown onBlur</li>
          <li>Validation errors are hidden onChange when the error is rectified</li>
          <li><code>valid</code>, <code>invalid</code>, <code>pristine</code> and <code>dirty</code> flags
            are passed with each change
          </li>
          <li><em>Except</em> when you submit the form, in which case they are shown for all invalid fields.</li>
          <li>If you click the Initialize Form button, the form will be prepopupated with some values and
            the <code>pristine</code> and <code>dirty</code> flags will be based on those values.
          </li>
        </ul>

        <p>
          Pardon the use of <code>window.alert()</code>, but I wanted to keep this component stateless.
        </p>

        <div style={{textAlign: 'center', margin: 15}}>
          <button className="btn btn-primary" color={buttonColors.initColor} onClick={this.handleInitialize}>
            <i className="fa fa-pencil"/> Initialize Form
          </button>
        </div>

        <p>The circles to the left of the inputs correspond to flags provided by <code>redux-form</code>:
          Touched, Visited, Active, and Dirty.</p>

        <SurveyForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
