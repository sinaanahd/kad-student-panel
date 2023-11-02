import { createContext, useState, useEffect } from "react";
import Header from "../header/header";
import SideBar from "../side-bar/side-bar";
import WelcomeName from "../welcome-name/welcome-name";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const user_data = JSON.parse(localStorage.getItem("kad-user")) || false;
const kelasses_data = JSON.parse(localStorage.getItem("kelasses")) || false;

const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [user, setUser] = useState(user_data);
  const [kelasses, setKelasses] = useState(kelasses_data);
  const subjects = [
    { id: 0, name: "ریاضی" },

    { id: 1, name: "تجربی" },

    { id: 2, name: "انسانی" },

    { id: 3, name: "هنر" },
  ];
  const years = [
    {
      id: 10,
      name: "دهم",
    },
    {
      id: 11,
      name: "یازدهم",
    },
    {
      id: 12,
      name: "دوازدهم",
    },
    {
      id: 18,
      name: "کنکور",
    },
    {
      id: 0,
      name: "فارغ التحصیل",
    },
  ];
  useEffect(() => {
    get_user(9166);
    get_kelasses();
  }, []);

  const get_user = (id) => {
    axios
      .get(`https://kadschool.com/backend/kad_api/user/${id}`)
      .then((res) => {
        const user = res.data;
        setUser(user);
        // console.log(user);
        localStorage.setItem("kad-user", JSON.stringify(user));
      })
      .catch((e) => console.log(e.message));
  };
  const get_kelasses = () => {
    axios
      .get("https://kadschool.com/backend/kad_api/kelases")
      .then((res) => {
        const kelasses = res.data;
        setKelasses(kelasses);
        localStorage.setItem("kelasses", JSON.stringify(kelasses));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <DataContext.Provider value={{ user, setUser, kelasses, subjects, years }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
