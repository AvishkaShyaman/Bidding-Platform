import {
  ADD_VEHICLE,
  GET_VEHICLE,
  GET_FAV_VEHICLE,
  REMOVE_VEHICLE_FROM_FAV,
  ADD_VEHICLE_TO_FAV,
} from './vehicle-actions';

const vehicleReducer = (state, action) => {
  switch (action.type) {
    case ADD_VEHICLE:
      const newState = {
        ...state,
        vehicles: [...state.vehicles, action.payload],
      };

      return newState;
    case GET_VEHICLE:
      console.log('in red', action.payload);
      return {
        ...state,
        vehicles: [...action.payload],
      };
    case GET_FAV_VEHICLE:
      return {
        ...state,
        favVehicles: [...action.payload],
      };
    case REMOVE_VEHICLE_FROM_FAV:
      const newRemoveState = {
        ...state,
        favVehicles: state.favVehicles.filter(
          (vehicle) => !(vehicle._id === action.payload._id)
        ),
      };
      return newRemoveState;
    case ADD_VEHICLE_TO_FAV:
      state.favVehicles.push(action.payload);

      return {
        ...state
      };
    default:
      return state;
  }
};

export default vehicleReducer;
