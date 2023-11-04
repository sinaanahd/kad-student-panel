import { createContext, useState, useEffect } from "react";
import axios from "axios";

const user_data = JSON.parse(localStorage.getItem("kad-user")) || false;
const kelasses_data = JSON.parse(localStorage.getItem("kelasses")) || false;
const jalasat_data = JSON.parse(localStorage.getItem("jalasat")) || false;
const teachers_data = JSON.parse(localStorage.getItem("teachers")) || false;
const sample_files_data =
  JSON.parse(localStorage.getItem("sample_files")) || false;

const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [user, setUser] = useState(user_data);
  const [kelasses, setKelasses] = useState(kelasses_data);
  const [jalasat, set_jalasat] = useState(jalasat_data);
  const [teachers, setTeachers] = useState(teachers_data);
  const [sample_files, set_sample_files] = useState(sample_files_data);
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
    // get_user(8220);
    if (user) {
      // get_user(user.user_id);
    }
    get_kelasses();
    get_jalasat();
  }, []);
  const get_teachers = () => {
    axios
      .get("https://kadschool.com/backend/kad_api/teachers")
      .then((res) => {
        const teachers = res.data;
        setTeachers(teachers);
        localStorage.setItem("teachers", JSON.stringify(teachers));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_jalasat = () => {
    axios
      .get("https://kadschool.com/backend/kad_api/admin_jalasat")
      .then((res) => {
        const jalasat = res.data;
        set_jalasat(jalasat);
        localStorage.setItem("jalasat", JSON.stringify(jalasat));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
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
  const get_sample_files = (e) => {
    axios
      .get("https://kadschool.com/backend/kad_api/sample_files")
      .then((res) => {
        const sample_files = res.data;
        set_sample_files(sample_files);
        localStorage.setItem("sample_files", JSON.stringify(sample_files));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        kelasses,
        subjects,
        years,
        jalasat,
        teachers,
        sample_files,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
