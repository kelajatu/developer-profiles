import styled from 'styled-components';
import { centerFlex } from '../../../global-styles/Mixins';


export const MainFormContainer = styled.main`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  @media (max-width: 650px) {
    width: 100%;
    margin-left: 0px;
  }
  h1 {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 1100px) {
      text-align: left;
      padding-left: 25px;
      font-size: 4rem;
    }
  }
  .container {
    padding-left: 25px;
    padding-right: 25px;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
    @media (max-width: 1200px) {
      justify-content: flex-start;
    }
    section {
      width: 45%;
      @media (max-width: 1100px) {
        width: 80%;
      }
      @media (max-width: 1000px) {
        width: 90%;
      }
      @media (max-width: 850px) {
        width: 100%;
      }
    }
  }
`;

export const FormSection = styled.section`
  .text-input-container,
  .select-input-container {
    margin-bottom: 30px;
  }

  .text-input-container {


    /****SKILLS BUTTONS****/
    .skills-btn {
      width: 100px;
      color: black;
      padding: 8px;
      font-size: 1.4rem;
      letter-spacing: 1.5px;
      background: white;
      border: solid 1px black;
      border-radius: 20px;
      margin-top: 10px;
      &:hover {
        cursor: pointer;
        background: black;
        color: white;
      }
    }


  }
  .skillbank {
    display: flex;
    flex-wrap: wrap;
  }
  .skill {
    cursor: pointer;
    margin: 5px 5px 5px 0;
    padding: 0 5px;
    border: solid grey 1px;
    border-radius: 5px;
  }
  .text-input,
  #userAreaOfWork,
  #usercurrentLocation,
  #userPlacesInterested {
    width: 85%;
    @media (max-width: 750px) {
      width: 95%;
    }
    @media (max-width: 650px) {
      width: 100%;
    }
  }
  .showing-places {
    width: 80%;
    margin: 10px;
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    /* border-right: solid .5px rgba(0,0,0,.33);
    border-left: solid .5px rgba(0,0,0,.33); */
    border-bottom: solid .5px rgba(0,0,0,.33);
    max-height: 250px;
    overflow-y: scroll;
    @media (max-width: 750px) {
      width: 90%;
    }
    .places {
      margin: 11px;
      font-size: 1.4rem;
      font-weight: bold;
    }
  }
`;

export const CardPreviewSection = styled.section`
  @media (max-width: 1100px) {
    display: none;
  }
`;


export const MobileCardPreviewSection = styled.section`
  display: none;
  @media (max-width: 1100px) {
    display: block;
    padding: 20px;
    width: 100%;
    ${centerFlex('column')};
  }
`;

export const Validator = styled.div`
  width: 85%;
  border: solid;
  border-color: ${props => (props.validated ? "rgba(0,0,0,.33)" : "red")};
  border-width: ${props => (props.validated ? "1px" : "2px")};
  border-radius: 4px;
  @media (max-width: 750px) {
    width: 95%;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: baseline;
  .success {
    color: var(--accent-color);
  }
  label {
    color: rgba(42,42,42,.8);
    font-size: 1.7rem;
    margin-bottom: 8px;
    font-weight: bold;
    line-height: 23px;
    letter-spacing: 1px;
    margin-right: 5px;
  }
`;

export const ImageContainer = styled.div`
  margin-bottom: 30px;
  .img-input-sub-container {
    width: 85%;
    border: solid 1px rgba(0,0,0,.33);
    border-radius: 4px;
    @media (max-width: 750px) {
      width: 95%;
    }
    @media (max-width: 650px) {
      width: 100%;
    }
    .img-input-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      ${centerFlex()};
    }
    .success {
      color: var(--accent-color);
    }
    .upload {
      color: var(--lp_btn_color);
    }
    input[type=file] {
      padding: 11px 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .validate {
    width: 100%;
    border: none;
  }
`;


export const ButtonContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 50px;

  .success {
    color: var(--lp_btn_color);
  }

  /****ALL OTHER BUTTONS****/
  button {
    width: 330px;
    height: 80px;
    color: white;
    padding: 20px 30px;
    font-size: 2rem;
    letter-spacing: 1.5px;
    background-color: var(--accent-color);
    border: none;
    border-radius: 100px;
    ${centerFlex()};
    margin-left: 25px;
    margin-right: 25px;
    &:hover {
      color: var(--lp_btn_color);
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      cursor: pointer;
    }
    &:active {
      transform: scale(1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
  }

  a {
    width: 230px;
    height: 55px;
    display: block;
    margin: auto;
    text-decoration: none;
    color: white;
    padding: 20px 30px;
    font-size: 2rem;
    letter-spacing: 1.5px;
    background-color: var(--lp_btn_color);
    border: none;
    border-radius: 100px;
    ${centerFlex()};
    &:hover {
      color:var(--accent-color);
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      cursor: pointer;
    }
    &:active {
      transform: scale(1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    }
  }
`;
