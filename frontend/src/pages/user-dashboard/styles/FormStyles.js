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
  h1 {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
    text-align: center;
  }
  .container {
    padding-left: 50px;
    padding-right: 50px;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
    section {
      width: 45%;
    }
  }
`;

export const FormSection = styled.section`
  .text-input-container,
  .select-input-container {
    margin-bottom: 30px;
  }
  .text-input-container {
    .skills-btn {
      width: 100px;
      color: black;
      padding: 8px;
      font-size: 1.4rem;
      letter-spacing: 1.5px;
      background: white;
      border: solid 1px black;
      border-radius: 20px;
      &:hover {
        cursor: pointer;
        background: black;
        color: white;
      }
    }
  }
  .text-input,
  #userAreaOfWork,
  #usercurrentLocation,
  #userPlacesInterested {
    width: 85%;
  }
`;

export const Validator = styled.div`
  width: 85%;
  border: solid;
  border-color: ${props => (props.validated ? "rgba(0,0,0,.33)" : "red")};
  border-width: ${props => (props.validated ? "1px" : "2px")};
  border-radius: 4px;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: baseline;
  .success {
    color: green;
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
    .img-input-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      ${centerFlex()};
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

  div {
    width: 30%;
    text-align: center;
  }

  .success {
    color: green;
  }

  button {
    width: 100%;
    color: black;
    padding: 20px;
    font-size: 1.7rem;
    letter-spacing: 1.5px;
    background: white;
    border: solid 1px black;
    border-radius: 20px;
    &:hover {
      cursor: pointer;
      background: black;
      color: white;
    }
  }

  a {
    width: 70%;
    display: block;
    margin: auto;
    text-decoration: none;
    color: black;
    padding: 20px;
    font-size: 1.7rem;
    letter-spacing: 1.5px;
    background: white;
    border: solid 1px black;
    border-radius: 20px;
    &:hover {
      cursor: pointer;
      background: black;
      color: white;
    }
  }
`;
