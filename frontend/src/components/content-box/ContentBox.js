import { ContentBoxSection } from './ContentBox.styles'
import React, { Component } from 'react'

class ContentBox extends Component {
    render() { 
        return (
            <ContentBoxSection>
                <h1>Welcome to DevProfiles </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quibusdam veniam, veritatis est blanditiis autem perferendis,asperiores odit explicabo ipsa eligendi. Veritatis tempora quos
                fuga fugiat impedit, cum blanditiis reiciendisunde.
                </p>
                <a href= {`#aboutus`}>
                    {/* <Btn className="stripe">Recruiters</Btn> */}
                </a>
                <a href="#learnmore">
                    {/* <Btn className="stripe">Job Seekers</Btn> */}
                </a>
            </ContentBoxSection>
        );
    }
}
 
export default ContentBox;
