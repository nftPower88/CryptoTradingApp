import {useState} from 'react';
import axios from "axios";
import { useStore } from "../../lib/store";
import shallow from "zustand/shallow";
import styles from "./index.module.css";

const API_URL = "http://localhost:8080/api/";

const Login = () => {
  const [open, setOpen] = useState(false);  
  const { setToken } = useStore(
    (store) => ({
      setToken: store.setToken
    }),
    shallow
  );

  const signin = (email: string, password: string) => {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {  
        setToken(response?.data?.accessToken);
        return response?.data?.accessToken;
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    signin(e.target.email.value, e.target.password.value).then(
      () => {
        //window.location.reload();
      },
      (error: any) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
      }
    );
  }

  return (
    <>
      <button onClick={()=>setOpen(true)} className={styles.buttonmodal}>
          Login
      </button>
      {open && <div className={styles.modal}>
        <div className={styles.modalContent}>
          <header className={styles.container}> 
            <span onClick={()=>setOpen(false)} 
            className={styles.close}>&times;</span>
            <h2>Login</h2>
          </header>
          <form onSubmit={handleSubmit}>
            <div className={styles.container}>
              <div className={styles.line}>
                <label><b>Email</b></label>
                <input id="email" type="text" placeholder="Enter Email" className={styles.inputbox} required/>   
              </div>
              <div className={styles.line}>
                <label><b>Password</b></label>
                <input id="password" type="password" placeholder="Enter Password" className={styles.inputbox} required/>   
              </div>            
            </div>
            <footer className={styles.containerfooter}>
              <button className={styles.login} type="submit">Login</button>
            </footer>
          </form>
        </div>
      </div>}
    </>
  )
}

export default Login
