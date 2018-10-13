import React, { Component } from 'react';
import axios from 'axios';

class Contact extends Component {

  constructor(props){
    super(props);
    this.state = {
      contactEmail:"",
      contactName:"",
      contactMessage:"",
      contactSubject:"",
      buttonDisabled:true,
      emailStatus:0 //0 nothing -1: error 1:sent 2: sending
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  handleChange(e){
    switch (e.target.id){
      case "contactName":
        this.setState({contactName: e.target.value});
      break;
      case "contactEmail":
        this.setState({contactEmail: e.target.value});      
      break;
      case "contactSubject":
        this.setState({contactSubject: e.target.value});      
      break;
      case "contactMessage":
        this.setState({contactMessage: e.target.value});      
      break;
      default:
        console.log("Unknown textfield");
    }
    const { contactEmail, contactName, contactMessage, contactSubject } = this.state;
    if(contactEmail && contactName && contactMessage && contactSubject){
      this.setState({buttonDisabled:false});
    }else{
      this.setState({buttonDisabled:true});
    }
  }

  async sendEmail(){
    this.setState({buttonDisabled: true});
    try{
      await axios.post('https://contacttusharchutani.herokuapp.com',{
        from: this.state.contactEmail,
        subject: this.state.contactSubject,
        name: this.state.contactName,
        body: this.state.contactMessage
      });
      this.setState({emailStatus: 1});
    }catch(e){
      this.setState({emailStatus: -1});
    }

      
     
  }


  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{message}</p>

            </div>

         </div>

         <div className="row">
            <div className="eight columns">
{this.state.emailStatus == 0    &&      <div>
              <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input type="text" defaultValue="" size="35" id="contactName" name="contactName" onChange={this.handleChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={this.handleChange}/>
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Subject <span className="required">*</span></label>
						   <input type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={this.handleChange}/>
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea cols="50" rows="15" id="contactMessage" name="contactMessage" onChange={this.handleChange}></textarea>
                  </div>

                  
                     <button className="submit" disabled={this.state.buttonDisabled} onClick={this.sendEmail}>Submit</button>

                  </div>}
           {this.state.emailStatus == -1 && <div id="message-warning"> Error - unable to send email. Contact me on <a href="mailto:tushar_chutani@yahoo.com">tushar_chutani@yahoo.com</a> </div>}
				   {(this.state.emailStatus == 1) && <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
				   </div>}
           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Address and Phone</h4>
					   <p className="address">
						   {name}<br />
						   {street} <br />
						   {city}, {state} {zip}<br />
						   <span>{phone}</span>
					   </p>
				   </div>
          </aside>

      </div>
   </section>
    );
  }
}

export default Contact;
