import {
  ADD_VEHICLE,
  GET_VEHICLE,
  GET_FAV_VEHICLE,
  REMOVE_VEHICLE_FROM_FAV,
  ADD_VEHICLE_TO_FAV,
  GET_SORT_VEHICLE,
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
        sortByYear:'',
        sortByColor:'',
      };
    case GET_SORT_VEHICLE:
      if (action.payload.year) {
        console.log('in reduce year', action.payload);
        return {
          ...state,
          vehicles: [...action.payload.vehicles],
          sortByYear: action.payload.year,
        };
      }

      if (action.payload.color) {
        console.log('in reduce color', action.payload);
        return {
          ...state,
          vehicles: [...action.payload.vehicles],
          sortByColor: action.payload.color,
        };
      }
    case GET_FAV_VEHICLE:
      return {
        ...state,
        favVehicles: [...action.payload],
      };
    case REMOVE_VEHICLE_FROM_FAV:
      const newRemoveState = {
        ...state,
        favVehicles: state.favVehicles.filter(
          (vehicle) => vehicle._id != action.payload._id
        ),
      };
      return newRemoveState;
    case ADD_VEHICLE_TO_FAV:
      state.favVehicles.push(action.payload);

      return {
        ...state,
      };
    default:
      return state;
  }
};

export default vehicleReducer;
