import React, { Component } from "react";
import "./_landingpage.scss";
import styled from 'styled-components';
import { Pagewrap, Contentbox, Btn } from "./landingpage_styles";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Pagewrap>
          <Contentbox>
            <h1>Welcome to DevProfiles </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quibusdam veniam, veritatis est blanditiis autem perferendis,
              asperiores odit explicabo ipsa eligendi. Veritatis tempora quos
              fuga fugiat impedit, cum blanditiis reiciendis unde.
            </p>
            <a href="#aboutus">
            <Btn className="stripe">

                See what we have to offer

            </Btn>
            </a>
          </Contentbox>
        </Pagewrap>
        <div className="moreinfo">
          <p>
            Asymmetrical master cleanse raclette kitsch, tofu next level kogi
            poutine knausgaard art party kickstarter bushwick. Qui sartorial
            cupidatat retro. Fugiat seitan pour-over, actually nostrud
            knausgaard brooklyn jianbing listicle you probably haven't heard of
            them food truck pok pok roof party incididunt godard. Cronut tumblr
            deep v whatever keffiyeh fugiat fanny pack kogi umami raclette in
            qui. Copper mug glossier labore seitan sunt marfa man braid iceland
            lyft gastropub distillery occupy lomo roof party. Jianbing vinyl
            wayfarers slow-carb four dollar toast, chartreuse ullamco sint tbh.
            Ethical ramps food truck, put a bird on it thundercats vexillologist
            nulla 8-bit velit incididunt post-ironic selvage tempor taiyaki
            retro. Do duis scenester vegan, jianbing kogi fashion axe unicorn
            excepteur. Non street art tattooed, coloring book pitchfork lyft
            squid. Green juice exercitation shoreditch slow-carb cray, cronut
            tattooed four loko ut 90's hell of pickled brooklyn. Vinyl sint
            taxidermy bicycle rights asymmetrical readymade coloring book lomo
            XOXO. Nostrud pug normcore, mollit minim proident fashion axe cillum
            vice tumblr activated charcoal artisan nisi godard.
          </p>
          <p id="aboutus">
          Lorem ipsum dolor amet plaid YOLO unicorn ramps tousled. Street art
            crucifix scenester, unicorn food truck shoreditch helvetica taiyaki
            master cleanse DIY hell of put a bird on it truffaut. Vice raw denim
            enamel pin reprehenderit typewriter, poutine voluptate lumbersexual
            williamsburg. Umami next level slow-carb adipisicing, sed man bun
            laboris food truck voluptate raw denim. Fam artisan pabst enamel pin
            trust fund, slow-carb raclette ut coloring book heirloom mollit
            succulents. Heirloom put a bird on it portland twee, activated
            charcoal labore laborum.
          </p>


        </div>
      </div>
    );
  }
}

export default LandingPage;
