import * as ActionTypes from "../actions/tournamentActions";
import axios from "axios";
// import { getJwt } from "../../auth/AuthServices";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../auth/authentication";

const apiEndPoint = process.env.REACT_APP_API_URL + "/tournaments/";

//axios.defaults.headers.common["x-auth-token"] = getJwt();

// organize tournament
export const addTournament = async (dispatch, tournament) => {
  try {
    const response = await axios.post(apiEndPoint, tournament);
    dispatch({
      type: ActionTypes.ADD_TOURNAMENT,
      payload: response.data,
    });

    toast.dark(
      getCurrentUser().isAdmin
        ? "Your tournament has been organized"
        : "Your tournament organize request will be Approved as Admin Review it."
    );
  } catch (error) {
    toast.dark(error.response.data);
  }
};

//req for update tournament like status change to approve

export const updateTournament = async (dispatch, tournament) => {
  try {
    const response = await axios.put(
      apiEndPoint + "/" + tournament._id,
      tournament
    );
    // console.log(response.data)
    toast.dark("Your tournament has been updated");
    dispatch({
      type: ActionTypes.UPDATE_TOURNAMENT,
      payload: response.data,
    });
  } catch (error) {
    toast.dark(error.response.data);
  }
};

//for send emails as status changed
export const approve_dissapprove = async (tournament) => {
  try {
    const response = await axios.put(
      apiEndPoint + "/status/" + tournament._id,
      tournament
    );
    console.log(response.data);
  } catch (error) {
    toast.dark(error.response.data);
  }
};

export const registerTournament = async (dispatch, tournament) => {
  try {
    const response = await axios.put(
      apiEndPoint + "register/" + tournament._id,
      tournament
    );

    dispatch({
      type: ActionTypes.UPDATE_TOURNAMENT,
      payload: response.data,
    });
    console.log(response);
    toast.dark("Registration successfull");
  } catch (error) {
    console.log(error);
    toast.dark(error.response);
  }
};

// fetch tournaments for browse
export const fetchTournamentList = async (dispatch) => {
  const { data: tournaments } = await axios.get(apiEndPoint);

  dispatch({
    type: ActionTypes.FETCH_TOURNAMENT_LIST,
    payload: tournaments,
  });
};
//request for getting mytournaments having status approved
export const fetchMyTournaments = async (dispatch) => {
  const { data: tournaments } = await axios.get(
    apiEndPoint + "mytournaments/" + getCurrentUser()._id
  );

  dispatch({
    type: ActionTypes.FETCH_TOURNAMENT_LIST,
    payload: tournaments,
  });
};

// organizer dlt tour in myTour
export const deleteMyTournament = async (dispatch, tournament) => {
  const { data: tournaments } = await axios.delete(
    apiEndPoint + "mytournaments/" + tournament._id
  );

  dispatch({
    type: ActionTypes.DELETE_TOURNAMENT,
    payload: tournaments,
  });
};

// export const deleteTournament = async (dispatch, tournament) => {
//   try {
//     const { data } = await axios.delete(apiEndPoint + "/" + tournament._id);
//     console.log(data);
//     dispatch({
//       type: ActionTypes.DELETE_TOURNAMENT,
//       payload: data.tournament,
//     });

//     toast.dark("Tournament Deleted");
//   } catch (error) {
//     toast.dark(error.response.data);
//   }
// };

export const fetchMyMatches = async (dispatch) => {
  console.log(apiEndPoint + "mymatches/" + getCurrentUser()._id);
  const { data: tournaments } = await axios.get(
    apiEndPoint + "mymatches/" + getCurrentUser()._id
  );

  dispatch({
    type: ActionTypes.FETCH_TOURNAMENT_LIST,
    payload: tournaments,
  });
};
// unreg
export const deleteMyMatch = async (dispatch, tournament) => {
  //console.log(getCurrentUser()._id);
  try {
    const { data: tournaments } = await axios.delete(
      apiEndPoint + "mymatches/" + tournament._id + "/" + getCurrentUser()._id
    );
    toast.dark("You are successfully unregistered");

    dispatch({
      type: ActionTypes.DELETE_TOURNAMENT,
      payload: tournaments,
    });
  } catch (error) {
    toast.dark(error.response.data);
  }
};
// request for getting tournaments having status pending
export const fetchPendingTournaments = async (dispatch) => {
  const { data: tournaments } = await axios.get(
    apiEndPoint + "pendingTournaments/"
  );

  dispatch({
    type: ActionTypes.FETCH_TOURNAMENT_LIST,
    payload: tournaments,
  });
};

export const sendFeedback = async (dispatch, tournament) => {
  try {
    const path = apiEndPoint + "feedback/" + tournament._id;
    console.log(tournament.feedback[tournament.feedback.length - 1]);
    const response = await axios.put(path, {
      feedback: tournament.feedback[tournament.feedback.length - 1],
    });
    //  push jb b use ho last index pa jye gi vo value
    console.log(response.data);
    dispatch({
      type: ActionTypes.UPDATE_TOURNAMENT,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    toast.dark(error.response);
  }
};

export const uploadResult = async (dispatch, tournament) => {
  try {
    const path = apiEndPoint + "uploadResult/" + tournament._id;

    const response = await axios.put(path, { result: tournament.result });
    console.log(response.data);
    dispatch({
      type: ActionTypes.UPDATE_TOURNAMENT,
      payload: response.data,
    });
  } catch (error) {
    console.log(error.response);
    toast.dark(error.response.statusText);
    throw error;
  }
};
