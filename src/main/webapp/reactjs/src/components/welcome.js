import React, {Component} from "react";
import './stylesheet.css'

class welcome extends Component {
    render(){
        return(
            <div>
                <header id="header" className="masthead text-center">
                    <div className="container">
                        <div className="intro-text">
                            <div className="intro-lead-in">Welcome To PeopleGram!</div>
                            <div className="intro-heading text-uppercase mt-5">It's Nice To Meet You</div>
                            <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger mt-4" href="/">Let's get started</a>
                        </div>
                    </div>
                </header>

                <hr id="hr" className="bg-dark"/>
                <section className="page-section" id="services">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading text-white mb-5">Services van PeopleGram</h2>
                                <h3 className="section-subheading text-muted mt-4 mb-5">Hieronder kun je kennis opdoen over onze webapp, so lets go!</h3>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
          </span>
                                <h4 className="service-heading text-white mt-5">Wat is PeopleGram</h4>
                                <p className="text-muted">PeopleGram is een online webapplicatie waarin gebruikers elkaars post kunnen bekijken. Ieder gebruiker kan dus een post doen en iedereen kan dit bekijken. Een heel algemene applicatie dus, vandaar PeopleGram</p>
                            </div>
                            <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
          </span>
                                <h4 className="service-heading text-white">Hoe werkt het?</h4>
                                <p className="text-muted">PeopleGram is een simpel webapplicatie waarin je bij de Add Post tab een post doen en dit kun jij en elk ander user op PeopleGram zien! Ook kun je bepaalde gebruikers opzoeken en heeft elke user en profiel!</p>
                            </div>
                            <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-lock fa-stack-1x fa-inverse"></i>
          </span>
                                <h4 className="service-heading text-white">Hoe is de security?</h4>
                                <p className="text-muted">PeopleGram is goed beveiligd, users hebben alleen toegang tot jou username en naam en kunnen niet in je profiel. Ook je wachtwoord staat encrypted opgeslagen in onze database ;)</p>
                            </div>
                            <div className="col-lg-12 text-center">
                                <hr/>
                                <h3 className="section-subheading text-muted mt-5">Waar wacht je nog op? Begin met het uploaden van je eerste post!</h3>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    )
    }
}

export default welcome;