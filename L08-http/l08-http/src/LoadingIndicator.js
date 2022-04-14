import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import axios from "axios";

function LoadingIndicator() {
  let [visible, setVisible] = useState(false);

  axios.interceptors.response.use((response) => {
    setVisible(false)
    return response;
  }, (error) => {
    setVisible(false)
    return Promise.reject(error);
  })

  if (!visible) return null;
  return <Spinner animation="grow" size="sm" variant="light" />;
}

export default LoadingIndicator;

// create a workshop where you get data from a json-server