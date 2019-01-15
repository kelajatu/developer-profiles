import React, { Component } from "react";
import {
  Pagewrap,
  Contentbox,
  Btn,
  Moreinfo,
  Learnmore,
  Aboutus
} from "./landingpage_styles";

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
            <a href= {`#${Aboutus}`}>
              <Btn className="stripe">Recruiters</Btn>
            </a>
            <a href="#learnmore">
              <Btn className="stripe">Job Seekers</Btn>
            </a>
          </Contentbox>
        </Pagewrap>
        <Moreinfo>
          <Aboutus>
            <h2 className="aboutus">Asymmetrical master</h2> cleanse raclette kitsch, tofu next
            level kogi poutine knausgaard art party kickstarter bushwick. Qui
            sartorial cupidatat retro. Taxidermy hot chicken cliche et, ut fanny
            pack vice vegan cardigan squid consectetur chartreuse PBR&B.
            Waistcoat brunch readymade, listicle labore ugh selfies kitsch
            polaroid PBR&B occupy yr. Vice slow-carb health goth do mustache
            sartorial subway tile. Incididunt man braid deep v ugh gastropub.
            Fugiat seitan pour-over, actually nostrud knausgaard brooklyn
            jianbing listicle you probably haven't heard of them food truck pok
            pok roof party incididunt godard. Cronut tumblr deep v whatever
            keffiyeh fugiat fanny pack kogi umami raclette in qui.
          </Aboutus>
          <Learnmore>
          <h2 className="learnmore">Street art crucifix</h2>dolor amet plaid YOLO unicorn ramps tousled.
             scenester, unicorn food truck shoreditch
            helvetica taiyaki master cleanse DIY hell of put a bird on it
            truffaut. Helvetica cloud bread pickled roof party. Man braid quinoa
            etsy af officia. Occaecat scenester pok pok minim, +1 cold-pressed
            vaporware sint fanny pack forage. Vegan aliqua helvetica hashtag
            XOXO art party. Truffaut shaman messenger bag man braid heirloom
            snackwave nostrud VHS twee ethical.Vice raw denim enamel pin
            reprehenderit typewriter, poutine voluptate lumbersexual
            williamsburg.
          </Learnmore>
        </Moreinfo>
      </div>
    );
  }
}

export default LandingPage;
