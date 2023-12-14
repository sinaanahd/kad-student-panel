import { createContext, useState, useEffect } from "react";
import last_login_check from "../functions/last-login-check";
import axios from "axios";
import urls from "../urls/urls";

const user_data = JSON.parse(localStorage.getItem("kad-user")) || false;
const kelasses_data = JSON.parse(localStorage.getItem("kelasses")) || false;
const jalasat_data = JSON.parse(localStorage.getItem("jalasat")) || false;
const teachers_data = JSON.parse(localStorage.getItem("teachers")) || false;
const pay_info_data = JSON.parse(localStorage.getItem("pay_info")) || false;
const sample_files_data =
  JSON.parse(localStorage.getItem("sample_files")) || false;
const this_time_login = new Date().getTime();
const last_login = JSON.parse(localStorage.getItem("LL"))
  ? JSON.parse(localStorage.getItem("LL"))
  : this_time_login;
const course_data = JSON.parse(localStorage.getItem("courses")) || false;
const banner_data = JSON.parse(localStorage.getItem("banners")) || false;
const cart_data = JSON.parse(localStorage.getItem("cart")) || {
  ids: [],
  items: [],
  pure_price: 0,
  discounts: 0,
  final_price: 0,
};
const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [user, setUser] = useState(user_data);
  const [kelasses, setKelasses] = useState(kelasses_data);
  const [jalasat, set_jalasat] = useState(jalasat_data);
  const [teachers, setTeachers] = useState(teachers_data);
  const [sample_files, set_sample_files] = useState(sample_files_data);
  const [pay_info, setPay_info] = useState(pay_info_data);
  const [courses, setCourses] = useState(course_data);
  const [cart, set_cart] = useState(cart_data);
  const [banners, set_banners] = useState(banner_data);
  const subjects = [
    { id: 0, name: "ریاضی" },

    { id: 1, name: "تجربی" },

    { id: 2, name: "انسانی" },

    { id: 3, name: "هنر" },
  ];
  const ref_subjects = [
    { id: 0, name: "ریاضی" },

    { id: 1, name: "تجربی" },

    { id: 2, name: "انسانی" },

    { id: 3, name: "هنر" },
    { id: 1111, name: "ثبت نشده" },
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
  const ref_years = [
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
    { id: 1111, name: "ثبت نشده" },
  ];
  const doreha = [
    {
      dore_id: 5,
      dore_title: "سالانه",
      slug_name: "سالانه",
    },
    {
      dore_id: 6,
      dore_title: "آفلاین",
      slug_name: "آفلاین",
    },
  ];
  useEffect(() => {
    const is_time = last_login_check(last_login, this_time_login);
    // get_user(7228);
    get_banners();
    if (is_time) {
      // console.log("is time");
      if (user) {
        get_info(user.user_id);
      }
      get_kelasses();
      get_jalasat();
      get_sample_files();
      get_courses();
    } else {
      if (!kelasses_data) {
        get_kelasses();
      }
      if (!jalasat_data) {
        get_jalasat();
      }
      if (!sample_files_data) {
        get_sample_files();
      }
      if (!course_data) {
        get_courses();
      }
      if (user) {
        if (!pay_info_data) {
          get_info(user.user_id);
        }
      }
    }
    if (user) {
      get_user(user.user_id);
    }
  }, []);
  const get_teachers = () => {
    axios
      .get(`${urls.teachers}`)
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
      .get(`${urls.jalasat}`)
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
      .get(`${urls.user}${id}`)
      .then((res) => {
        const user = res.data;
        setUser(user);
        if (user.kelases) {
        }
        localStorage.setItem("kad-user", JSON.stringify(user));
      })
      .catch((e) => console.log(e.message));
  };
  const get_kelasses = () => {
    axios
      .get(`${urls.kelasses}`)
      .then((res) => {
        const kelasses = res.data;
        setKelasses(kelasses);
        localStorage.setItem("kelasses", JSON.stringify(kelasses));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_sample_files = () => {
    axios
      .get(`${urls.sample_files}`)
      .then((res) => {
        const sample_files = res.data;
        set_sample_files(sample_files);
        localStorage.setItem("sample_files", JSON.stringify(sample_files));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const get_info = (id) => {
    axios
      .get(`${urls.finance_records}${id}`)
      .then((res) => {
        const pay_info = res.data;
        // console.log(pay_info);
        const { result, response, error } = res.data;
        if (result) {
          setPay_info(response.reverse());
          localStorage.setItem("pay_info", JSON.stringify(response));
        } else {
          alert("مشکلی پیش آمده");
          console.log(error);
        }
      })
      .catch((e) => console.log(e.message));
  };
  const get_courses = () => {
    axios
      .get(`${urls.all_courses}`)
      .then((res) => {
        const courses = res.data;
        setCourses(courses);
        // console.log(courses);
        localStorage.setItem("courses", JSON.stringify(courses));
      })
      .catch((e) => console.log(e.message));
  };
  const handle_cart = (obj) => {
    const cart_sample_obj = {
      ids: [],
      items: [],
      pure_price: 0,
      discounts: 0,
      final_price: 0,
    };
    const new_cart = cart ? { ...cart } : cart_sample_obj;
    if (!user.kelases.includes(obj.kelas_id)) {
      const searched_obj = new_cart.items.find(
        (item) => item.kelas_id === obj.kelas_id
      );
      if (!searched_obj) {
        new_cart.items.push(obj);
        new_cart.ids = get_ids(new_cart.items);
        new_cart.pure_price = calculate_pure_price(new_cart.items);
        new_cart.discounts = calculate_discounts(new_cart.items);
        new_cart.final_price = new_cart.pure_price - new_cart.discounts;
      } else {
        const deleted_cart = delete_from_cart(new_cart, searched_obj.kelas_id);
        new_cart.ids = get_ids(deleted_cart.items);
        new_cart.pure_price = calculate_pure_price(new_cart.items);
        new_cart.discounts = calculate_discounts(new_cart.items);
        new_cart.final_price = new_cart.pure_price - new_cart.discounts;
      }
      finilize_cart(new_cart);
    } else {
      alert("شما قبلا این محصول رو خریداری کردید");
    }
  };
  const delete_from_cart = (cart, id) => {
    const index = cart.items.findIndex((item) => item.kelas_id === id);
    const splice_need = { ...cart };
    splice_need.items.splice(index, 1);
    return splice_need;
  };
  const finilize_cart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    set_cart(cart);
    // console.log(cart);
  };
  const get_ids = (arr) => {
    return arr.map((i) => i.kelas_id);
  };
  const calculate_pure_price = (arr) => {
    let sum = 0;
    arr.forEach((item) => {
      sum += item.price;
    });
    return sum;
  };
  const calculate_discounts = (arr) => {
    let sum = 0;
    arr.forEach((item) => {
      let discount_amount = 0;
      if (item.discounted_price) {
        discount_amount = item.price - item.discounted_price;
      }
      sum += discount_amount;
    });
    return sum;
  };
  const get_banners = () => {
    axios
      .get(urls.banners)
      .then((res) => {
        // console.log(res.data);
        set_banners(res.data);
        localStorage.setItem("banners", JSON.stringify(res.data));
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
        pay_info,
        get_info,
        doreha,
        courses,
        cart,
        handle_cart,
        ref_subjects,
        ref_years,
        banners,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
