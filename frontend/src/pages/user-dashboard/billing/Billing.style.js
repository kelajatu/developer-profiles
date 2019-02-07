import styled from "styled-components";
import { centerFlex } from "../../../global-styles/Mixins";

export const BillingDiv = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  padding-left: 50px;
  padding-right: 50px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  @media (max-width: 1150px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media (max-width: 450px) {
    padding-left: 10px;
    padding-right: 10px;
  }
  @media (max-width: 400px) {
    padding-left: 5px;
    padding-right: 5px;
  }
  @media (max-width: 650px) {
    width: 100%;
    margin-left: 0px;
  }
  .billing-main-heading {
    font-size: 5rem;
    color: rgb(42, 42, 42);
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 1100px) {
      font-size: 4rem;
    }
    @media (max-width: 950px) {
      text-align: left;
    }
  }
  .billing-main-success-heading {
    font-size: 5rem;
    color: rgb(42, 42, 42);
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 1100px) {
      font-size: 4rem;
    }
  }
  .sub-heading {
    font-size: 3rem;
    margin-bottom: 50px;
  }
  .sub-active-heading {
    font-size: 4rem;
    margin-bottom: 50px;
    color: var(--accent-color);
    @media (max-width: 1100px) {
      font-size: 3.5rem;
    }
  }
  .sub-sub-heading {
    font-size: 2.5rem;
    margin-bottom: 20px;
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    padding: 12px 8px;
  }
  .sub-price-heading {
    font-size: 3.2rem;
  }
  .text {
    color: rgba(42, 42, 42, 0.8);
    font-size: 1.7rem;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 25px;
    line-height: 23px;
  }
  .success {
    color: var(--lp_btn_color);
  }
  .loading {
    color: var(--lp_btn_color);
  }

  .billing-success-container {
    ${centerFlex()}
    @media (max-width: 950px) {
      margin-bottom: 75px;
    }
    .billing-success {
      padding: 20px;
      border: 1px solid lightgrey;
      border-radius: 5px;
      height: 550px;
      width: 700px;
    }
  }

  .options {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    @media (max-width: 1100px) {
      justify-content: space-between;
    }
    @media (max-width: 950px) {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    .option {
      width: 45%;
      max-width: 550px;
      height: 650px;
      padding: 50px;
      text-align: center;
      border: 1px solid lightgrey;
      border-radius: 5px;
      @media (max-width: 1600px) {
        height: 700px;
      }
      @media (max-width: 1450px) {
        width: 49%;
      }
      @media (max-width: 1100px) {
        height: 720px;
      }
      @media (max-width: 950px) {
        height: 650px;
        width: 100%;
        margin-bottom: 75px;
      }
      @media (max-width: 600px) {
        height: 700px;
      }
      @media (max-width: 500px) {
        padding: 40px 20px 0;
      }
      @media (max-width: 450px) {
        height: 720px;
      }
      label {
        color: rgba(42, 42, 42, 0.8);
        font-size: 1.7rem;
        margin-bottom: 8px;
        font-weight: bold;
        line-height: 23px;
        letter-spacing: 1px;
        margin-right: 5px;
      }
      .price-section {
        margin-bottom: 40px;
      }
      .btn-section {
        position: absolute;
        bottom: 7%;
        left: 50%;
        transform: translateX(-50%);
        button {
          width: 260px;
          height: 70px;
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
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
              0 3px 6px rgba(0, 0, 0, 0.23);
            cursor: pointer;
          }
          &:active {
            transform: scale(1);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
              0 1px 2px rgba(0, 0, 0, 0.24);
          }
        }
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
  margin-bottom: 50px;
  @media (max-width: 950px) {
    margin-top: 0;
  }
  a {
    width: 230px;
    height: 55px;
    display: block;
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
      color: var(--accent-color);
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      cursor: pointer;
    }
    &:active {
      transform: scale(1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
    &:first-child {
      margin-right: 50px;
    }
  }
`;
