import React from "react";
import { Card } from "react-bootstrap";

const Featues = () => {
  const cardInfo = [
    {
      image: "images/Organize.png",
      title: "Organize Tournaments",
      text:
        "Organize and wait untill admin approve your request you will be notified through Email",
    },
    {
      image: "images/reg.png",
      title: "Tournament Registeration",
      text: "Register in any Tournament and view this tournament in My Matches",
    },
    {
      image: "images/manage.png",
      title: "Manage Your Tournament",
      text:
        "You can Update and Delete the Tournament and also Unregister from Tournament.",
    },
    {
      image: "images/feedback.png",
      title: "Feedback ",
      text: "You can also give a feedback regarding to tournament.",
    },
    {
      image: "images/Shop.png",
      title: "Shop",
      text:
        "Feel free to use our website to sell and buy gaming and sports items",
    },
    {
      image: "images/contact.png",
      title: "Contact us",
      text: "You can also Contact us for any query and wait for our response",
    },
  ];
  const style = {
    img: {
      height: "200px",
      width: "200px",
    },
  };

  const renderCard = (card) => {
    return (
      <div className="col-sm-12 col-md-4 ">
        <Card
          style={{
            width: "100%",
            display: "inline-block",
            alignItems: "center",
            color: "black",
            backgroundColor: "white",
          }}
          className="mx-3 my-3 text-center "
        >
          <Card.Img
            variant="top"
            alt="image"
            src={card.image}
            height="200px"
            width="200px"
            style={style}
          />
          <Card.Body>
            <div>
              <Card.Title>
                <b>{card.title}</b>
              </Card.Title>
            </div>
            <div>
              <Card.Text>{card.text}</Card.Text>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <div className="container display:inline-block">
      <div className="row center m-7">
        <div className="col-sm-12">
          <h2>Features</h2>
        </div>
        <div className="col-sm-12">
          <h5>
            Organize, manage and share your competitions with Tournament Engine.
          </h5>
        </div>
      </div>
      <div className="container">
        <div className="row">{cardInfo.map(renderCard)}</div>
      </div>
    </div>
  );
};

export default Featues;

// import React from "react";
// import { Card } from "react-bootstrap";

// function Services(props) {
//   const cardInfo = [
//     {
//       image:
//         "https://previews.123rf.com/images/enterline/enterline1503/enterline150300054/37057328-the-word-organize-written-in-vintage-metal-letterpress-type-in-a-wooden-drawer-with-dividers-.jpg",
//       title: "Organize Tournaments",
//       text: "You can organize  Games and sports by clicking On Let's oragnize",
//     },
//     {
//       image:
//         "https://st2.depositphotos.com/1029756/6496/i/950/depositphotos_64964951-stock-photo-register-now-text-write-on.jpg",
//       title: "Tournament Registeration",
//       text: "User can register to a specific tournament if user are logged in",
//     },
//     {
//       image:
//         "https://thumbs.dreamstime.com/z/update-green-chalkboard-hand-write-d-illustration-121824643.jpg",
//       title: "Manage Your Tournament",
//       text: "You can  create updating and delete a tournament",
//     },
//     {
//       image:
//         "https://thumbs.dreamstime.com/z/feedback-concept-sketched-white-86207697.jpg",
//       title: "Feedback ",
//       text: "You can a provide a feedback to us to improve our quality ",
//     },
//     {
//       image: "https://cdn.onlinewebfonts.com/svg/img_448448.png",
//       title: "Fast and secure",
//       text: "Feel free to use our website because it is fast and secure",
//     },
//     {
//       image: "https://cdn.onlinewebfonts.com/svg/img_229214.png",
//       title: "Contact us",
//       text: "By clicking on the contact us you can contact us ",
//     },
//   ];
//   const style = {
//     img: {
//       height: "100px",
//       width: "100px",
//     },
//   };

//   const renderCard = (card) => {
//     return (
//       <div className="col-sm-12 col-md-4 ">
//         <Card
//           style={{
//             width: "100%",
//             display: "inline-block",
//             alignItems: "center",
//             color: "black",
//             backgroundColor: "white",
//           }}
//           className="mx-3 my-3 text-center "
//         >
//           <Card.Img
//             variant="top"
//             alt="image"
//             src={card.image}
//             height="200px"
//             width="200px"
//             style={style}
//           />
//           <Card.Body>
//             <div>
//               <Card.Title>{card.title}</Card.Title>
//             </div>
//             <div>
//               <Card.Text>{card.text}</Card.Text>
//             </div>
//           </Card.Body>
//         </Card>
//       </div>
//     );
//   };
//   return (
//     <div className="container display:inline-block">
//       <div className="row center m-7">
//         <div className="col-sm-12">
//           <h2>Features</h2>
//         </div>
//         <div className="col-sm-12">
//           <h5>Organize, manage and share your competitions with Toornament.</h5>
//         </div>
//       </div>
//       <div className="container">
//         <div className="row">{cardInfo.map(renderCard)}</div>
//       </div>
//     </div>
//   );
// }

// export default Services;
