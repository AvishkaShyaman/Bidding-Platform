import React, { useReducer } from 'react';

import VehicleContext from './vehicle-context';
import vehicleReducer from './vehicle-reducer';
import {
  ADD_VEHICLE,
  GET_VEHICLE,
  GET_FAV_VEHICLE,
  REMOVE_VEHICLE_FROM_FAV,
  ADD_VEHICLE_TO_FAV,
  GET_SORT_VEHICLE,
  FILTER_VEHICLE,
  CLEAR_FILTER,
} from './vehicle-actions';
import axios from 'axios';

const VehicleState = (props) => {
  const intialState = {
    vehicles: [],
    favVehicles: [],
    sortByYear: '',
    sortByColor: '',
    filtered: null,
  };

  const [state, dispatch] = useReducer(vehicleReducer, intialState);

  const AddVehicleToFav = async (data) => {
    try {
      const res = await axios.put(
        'http://localhost:5000/api/v1/user/watchList',
        { vehicleId: data.vehicle._id, userID: data.userID }
      );

      dispatch({
        type: ADD_VEHICLE_TO_FAV,
        payload: data.vehicle,
      });
    } catch (error) {
      return {
        success: false,
      };
    }
  };

  const RemoveVehicleFromFav = async (data) => {
    try {
      const res = await axios.delete(
        'http://localhost:5000/api/v1/user/watchList',
        { data: { vehicleId: data.vehicle._id, userID: data.userID } }
      );

      dispatch({
        type: REMOVE_VEHICLE_FROM_FAV,
        payload: data.vehicle,
      });
    } catch (error) {
      return {
        success: false,
      };
    }
  };

  const addVehicle = async (vehicle) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/vehicle/',
        vehicle
      );

      dispatch({
        type: ADD_VEHICLE,
        payload: res,
      });
    } catch (error) {
      return {
        success: false,
      };
    }
  };

  const getVehicle = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/vehicle');

      console.log('after fetch', res.data.data.vehicles);

      dispatch({
        type: GET_VEHICLE,
        payload: res.data.data.vehicles,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const vehicleSortBy = async (fields) => {
    try {
      console.log('in sortby', fields);

      if (fields.year) {
        let URL = `http://localhost:5000/api/v1/vehicle/sortBy?year=${fields.year}`;
        if (state.sortByColor) {
          URL = URL + `&color=${state.sortByColor}`;
        }
        console.log('in sortby year', URL);
        const res = await axios.get(URL);

        console.log('after sortby year fetch', res.data.data.vehicles);

        dispatch({
          type: GET_SORT_VEHICLE,
          payload: { vehicles: res.data.data.vehicles, year: fields.year },
        });
      } else if (fields.color) {
        let URL = `http://localhost:5000/api/v1/vehicle/sortBy?color=${fields.color}`;
        if (state.sortByYear) {
          URL = URL + `&year=${state.sortByYear}`;
        }

        console.log('in sortby color', URL);

        const res = await axios.get(URL);

        console.log('after sortby color fetch', res.data.data.vehicles);

        dispatch({
          type: GET_SORT_VEHICLE,
          payload: { vehicles: res.data.data.vehicles, color: fields.color },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFavVehicle = async (id) => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/v1/user/watchList?userID=60f168102bb59e4c9890f656'
      );

      dispatch({
        type: GET_FAV_VEHICLE,
        payload: res.data.data.watchList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filterVehicles = (text) => {
    dispatch({ type: FILTER_VEHICLE, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles: state.vehicles,
        favVehicles: state.favVehicles,
        filtered: state.filtered,
        AddVehicleToFav,
        RemoveVehicleFromFav,
        addVehicle,
        getVehicle,
        getFavVehicle,
        vehicleSortBy,
        filterVehicles,
        clearFilter,
      }}
    >
      {props.children}
    </VehicleContext.Provider>
  );
};

export default VehicleState;
