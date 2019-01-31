import styled from "styled-components";

export const UserCardContainer = styled.div`
  border-radius: 5px;
  border: lightgrey solid 1px;
  background: white;
  height: ${props => (props.expanded ? null : 320)}px;
  min-height: ${props => (props.expanded ? 700 : null)}px;
  width: 520px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  margin-right: 30px;
  a {
    color: black;
  }
  .userCardDiv {
    box-sizing: border-box;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    .left-side {
      width: 90%;
      overflow: hidden;
      height: 100%;
      margin-left: 28px;
      h2 {
        font-size: 30px;
      }
      h3 {
        font-size: 22px;
        padding: 5px 5px;
        border-top: 1px solid lightgrey;
        border-bottom: 1px solid lightgrey;
      }
      .bio {
        display: flex;
        flex-direction: row;
        margin: 0;
        p {
          font-size: 13px;
          margin: 3px;
        }
        .user-intro {
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 10px 0 10px 10px;
          width: 70%;
        }
        .location {
          color: limegreen;
          padding: 5px 0;
        }
        .photo {
          display: flex;
          border-radius: 100px;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100px;
          background-image: cover;
          margin: 10px;
          margin-left: 0;
        }
      }
      .keywords {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 10px, 0;
        margin-top: 20px;
        margin-bottom: 20px;
        .keyword {
          padding: 1px;
          margin: 2px;
        }
      }
    }

    .links {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 15%;
      height: 300px;
      margin-left: 10px;
      margin-right: 10px;
      .fab,
      .fas {
        font-size: 40px;
        &:hover {
          color: gray;
        }
        cursor: pointer;
      }
      .fas {
        font-size: 35px;
        margin-bottom: 40px;
      }
      .badge {
        width: 50px;
        margin-top: 25px;
        cursor: pointer;
      }
    }
  }
  .projects-etc {
    margin-left: 28px;
    h2 {
      font-size: 22px;
      padding: 5px 5px;
      margin-bottom: 15px;
      border-top: 1px solid lightgrey;
      border-bottom: 1px solid lightgrey;
      width: 465px;
    }
    a {
      margin-left: 5px;
    }
  }
  .proj-image-container {
    img {
      border-radius: 3px;
    }
    margin-left: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  .proj-etc-container {
    margin-bottom: 20px;
    margin-right: 28px;
  }
  .extratitle {
    font-size: 20px;
    font-weight: bold;
    padding-left: 5px;
    margin-bottom: 5px;
  }
  .dates {
    font-size: 15px;
    margin: 5px 0 0 10px;
    color: grey;
  }
  .description {
    width: 250px;
    padding-left: 10px;
  }
  .indent {
    margin-left: 5px;
  }
  @media (max-width: 1440px) {
       margin-right: 0;
   }
   @media (max-width: 480px) {
        transform: scale(.7);
    }
`;

export default UserCardContainer;