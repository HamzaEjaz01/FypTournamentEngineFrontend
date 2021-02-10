import * as ActionTypes from "../actions/tournamentActions";

export const tournamentReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_TOURNAMENT:
      let tournament = action.payload; //action property =>  1) type 2)Payload(data)

      let tournaments = [...state];
      tournaments.push(tournament);
      return tournaments;

    case ActionTypes.UPDATE_TOURNAMENT:
      let tournament2 = action.payload;

      let tournaments2 = [...state]; //overall tournaments ki copy
      //jo tour update karna tournament2 ma para ab redux store ma update krna store ma kis index pa para find and update
      let index = tournaments2.findIndex((t) => t._id === tournament2._id);
      tournaments2[index] = tournament2;
      return tournaments2;

    case ActionTypes.DELETE_TOURNAMENT:
      let tournament3 = action.payload;

      let tournaments3 = [...state];
      // filter sb return krta jin ki condition true ho false wala nai deta to wo dlt
      return tournaments3.filter((t) => t._id !== tournament3._id);

    case ActionTypes.FETCH_TOURNAMENT_LIST:
      return action.payload;

    default:
      return state;
  }
};
