import { createContext, useState, useEffect } from "react";
import last_login_check from "../functions/last-login-check";
import axios from "axios";
import urls from "../urls/urls";

const user_data = JSON.parse(localStorage.getItem("kad-user")) || false;
const kelasses_data = JSON.parse(localStorage.getItem("kelasses")) || false;
const jalasat_data = JSON.parse(localStorage.getItem("jalasat")) || false;
const teachers_data = JSON.parse(localStorage.getItem("teachers")) || false;
const doreha_data = JSON.parse(localStorage.getItem("doreha")) || false;
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
  const [ref_doreha, setDoreha] = useState(doreha_data);
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
  // const doreha = [
  //   {
  //     dore_id: 5,
  //     dore_title: "سالانه",
  //     slug_name: "سالانه",
  //   },
  //   {
  //     dore_id: 6,
  //     dore_title: "آفلاین",
  //     slug_name: "آفلاین",
  //   },
  // ];
  const doreha = ref_doreha
    ? ref_doreha
    : [
        {
          dore_id: 5,
          dore_title: "سالانه",
          dore_start_date: "2023-07-29",
          descriptions:
            "توی کلاس های سالیانه 0 تا 100 کلیه مباحث از کلیه پایه ها رو تدریس میکنیم و کلی آزمون آزمایشی هفتگی برات داریم .\r\nعلاوه بر این بهت هر جلسه تکلیف میدیم که بعد از کلاس به امون خدا رها نشی .\r\nتازه هر جلسه هم آنلاین و هم آفلاین هر تعداد سوالی که داشته باشی رفع اشکال میشه .",
          aparat_link: "",
          kelases: [9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 46, 66],
          image_link:
            "https://kadschool.com/media/Doreha/dore_id_5_WP7uyIu.webp",
          reasons_full: [
            {
              title: "تدریس کامل و حرفه ای ",
              text: "توی دوره سالانه ۰ تا ۱۰۰ مباحث به ساده ترین شکل برای شما توضیح داده میشه. توی این دوره شما همیشه تکلیف و تمرین و آزمون دارید تا درس براتون جا بیوفته.",
            },
            {
              title: "خیال راحت تا شب امتحان",
              text: "این دوره از شروع سال تا آخرین روز قبل امتحان برگذار میشه و همیشه همراه شما و با خیال راحت میتونید برای کنکور یا امتحاناتتون آماده بشید.",
            },
            {
              title: "مشاهده آفلاین",
              text: "اگه از دوره سالانه جا موندی نگران نباش! تمامی جلسات برگذار شده این کلاس ها برات توی اسپات پلیر هست که بتونی راحت همشون رو ببینی و از چیزی جا نمون.",
            },
          ],
          seo_keywords:
            "دوره سالانه, سالانه کاد,  دوره سالانه کاد, دوره جامع,  دوره آفلاین کاد, کلاس آفلاین",
          seo_description:
            "دوره سالانه یکی از جامع ترین دوره های کاد هست که از ابتدای سال تحصیلی تا روز آخر همراه شماست. صفر تا صد مطالب درسی رو با بهترین اساتید ایران تجربه کنید و بهترین نتایج رو بدست بیارید. دوره سالانه علاوه بر اینکه هر هفته کلاس آنلاین داره میتونی اگه از جلسات جا موندی به راحتی از اسپات تمامی جلسات قبلی رو مشاهده کنی.",
          slug_name: "سالانه",
        },
        {
          dore_id: 7,
          dore_title: "امتحان نهایی",
          dore_start_date: "2023-12-05",
          descriptions:
            "دوره امتحان نهایی برای آمادگی هرچه بیشتر شما دانش آموزان عزیز تهیه و تنظیم شده. تو کلاس های این دوره تمامی مباحثی که نیاز دارید رو میتونید به راحتی یادبگیرید و با خیال راحت برای امتحان نهایی آماده بشید. ۲۰ گرفتن تو نهایی دیگه کار سختی نیست.",
          aparat_link: "",
          kelases: [
            22, 23, 24, 26, 34, 37, 38, 39, 40, 41, 42, 43, 44, 61, 62, 63, 64,
            65, 68,
          ],
          image_link:
            "https://kadschool.com/media/Doreha/dore_id_7_oBvNLtE.webp",
          reasons_full: [
            {
              title: "پوشش تمامی مباحث امتحان نهایی",
              text: "تو دوره امتحان نهایی چیزی از قلم نمیوفته که آموزش داده نشه و شما با خیال راحت و آسوده برای امتحان آماده میشد.",
            },
            {
              title: "استاید برتر",
              text: "ما برای دوره امتحان نهایی بهترین اساتید خودمون با سابقه درخشان آوردیم. شما از بهترین استاتید کاد و ایران توی این دوره میتونید استفاده کنید.",
            },
            {
              title: "قیمت مناسب",
              text: "کاد برای دوره امتحان نهایی قیمت های به صرفه و مناسبی رو در نظر گرفته که همه دانش‌ آموزان به راحتی بتونن استفاده کنن.",
            },
          ],
          seo_keywords:
            "امتحان نهایی دهم, امتحان نهایی یازدهم, امتحان دوازدهم, امتحان نهایی, نهایی سبطی, نهایی حسینی, نهایی جمشیدی, نهایی ترکمان, نهایی ریاضی دهم, نهایی شیمی, نهایی دین و زندگی, نهایی عربی, نهایی زیست, ویژه امتحان نهایی",
          seo_description:
            "دوره امتحان نهایی هر آنچه که شما نیاز دارید برای آمادگی امتحان نهایی در اختیار شماست. این دوره با اساتیدی مثل سبطی - حسینی - جمشیدی و چندین استاد به نام دیگر کاد در حال برگذاری است. این دوره برای تمامی دانش آموزانی است که قصد ۲۰ گرفتن در نهایی را دارند.",
          slug_name: "امتحان-نهایی",
        },
        {
          dore_id: 8,
          dore_title: "نکته و تست",
          dore_start_date: "2024-02-04",
          descriptions:
            "دوره‌ی نکته و تست کاد، دوره‌ای است برای مرور، جمع‌بندی و تست‌زنی سریع کل مباحث پایه دهم، یازدهم و دوازدهم که از منایع کنکور 1403 هستند. کلاس ‌ها از 10 تا 12 جلسه و هر جلسه 3 ساعت می‌باشد که دو جلسه اول رایگان است.",
          aparat_link: "",
          kelases: [51, 52, 53, 54, 55, 56, 57, 58, 59],
          image_link:
            "https://kadschool.com/media/Doreha/dore_id_8_zzqvxTE.webp",
          reasons_full: [
            {
              title: "خیال راحت برای جمع بندی",
              text: "دوره نکته و تست برای جمع بندی و تست زنی سریع برای تمامی پایه های دهم - یازدهم و دوازدهم است. این دوره تنها نیاز شما برای جمع بندی است.",
            },
            {
              title: "جلسات رایگان !",
              text: "دو جلسه اول این دوره کاملا رایگانه و هروقتی که بخوای میتونی این جلسات رو مشاهده کنی فقط کافیه که یک تماس با ما بگیری.",
            },
            {
              title: "جلسات کافی ",
              text: "این دوره از ۱۰ تا ۱۲ تا جلسه داره که هر جلسه ۳ ساعته پس شما خیلی راحت میتونید کل مبحث رو یاد بگیرید و از طرفی وقت زیادی سر کلاس برای رفع اشکال دارید",
            },
          ],
          seo_keywords:
            "دوره نکته و تست , دوره نکته و تست تجربی, دوره نکته و تست ریاضی, نکته و تست کاد, مرور و جمع بندی, نکته و تست پایه, نکته و تست دهم , نکته و تست جواهری, نکته و تست سبطی, نکته و تست سودیان, نکته و تست ترکمان, نکته و تست حسینی, نکته و تست جمشیدی, نکته و تست آهنی, نکته و تست غزالی نیا",
          seo_description:
            "دوره نکته و تست کاد برای مرور و جمع بندی و تست زنی سریع تمامی پایه های دهم - یازدهم - دوازدهم و کنکور از منابع کنکور ۱۴۰۳ است. در این دوره می توانید با جلسات رایگان برای بهترین نتایج آماده شوید.",
          slug_name: "نکته-و-تست",
        },
        {
          dore_id: 9,
          dore_title: "مبحثی",
          dore_start_date: "2023-12-07",
          descriptions:
            "دوره مبحثی نیاز خیلی از دانش آموزان است و کاد دوره مبحثی رو برای تمامی گروه‌های دانش آموزان آماده کرده است. به کمک دوره مبحثی میتونید بدون هزینه اضافی فقط قسمتی که مشکل دارید رو به راحتی یاد بگیرید و خیالتون برای همیشه از اون مبحث راحت باشه.",
          aparat_link: "",
          kelases: [27, 28, 29, 47, 48, 49, 50, 67],
          image_link:
            "https://kadschool.com/media/Doreha/dore_id_9_eoQhjm4.webp",
          reasons_full: [
            {
              title: "خبری از هزینه اضافی نیست",
              text: "شما با دوره مبحثی فقط قسمتی که مشکل دارید رو خریداری میکنید و یاد میگیرید و بدون کوچکترین مشکلی این مبحث رو یاد میگیریدو",
            },
            {
              title: "یادگیری قسمت های مهم ",
              text: "شما هم فقط یک سری قسمت های درس رو مشکل دارید یا میخواید بخونید ؟ دوره مبحثی دقیقا مناسب شماست که به راحتی میتونید هر مبحثی رو که میخواید یاد بگیرید.",
            },
            {
              title: "برطرف کردن نقطه ضعف",
              text: "اگه فقط یه قسمتی رو بلد نیستید با دوره مبحثی اون قسمت رو به بهترین شکل ممکن یادبگیرید و نگرانش نباشید دیگه. اساتید کاد مباحث مهم رو برای شما آمده کردن.",
            },
          ],
          seo_keywords:
            "دوره مبحثی, مبحثی, مبحثی کاد, مبحثی کنکور, مبحثی منطق دهم, مبحثی آرایه های ادبی, مبحثی فسلسفه یازدهم, مبحثی منطق دهم, مبحثی زیست شناسی, مبحثی فیزیک, نیما جواهری, هامون سبطی, حمید سودیان, میلاد آهنی, روح الله امرایی, فرشاده قربانی",
          seo_description:
            "دوره مبحثی یکی دیگر از دوره های کاد با هدف برطرف کردن مشکلات دانش آموزان در مباحث پرچالش وسخت درس های کنکور است. در دوره مبحثی کاد با استفاده از استادان برتر مثل : هامون سبطی - نیما جواهری - حمید سودیان - میلاد آهنی - روح الله امرایی و فرشاد قربانی همراه شما دانش آموزان خوب کاد هستیم.",
          slug_name: "مبحثی",
        },
        {
          dore_id: 10,
          dore_title: "نکته و تست انسانی",
          dore_start_date: "2024-02-04",
          descriptions:
            "دوره‌ی نکته و تست کاد، دوره‌ای است برای مرور، جمع‌بندی و تست‌زنی سریع کل مباحث پایه دهم، یازدهم و دوازدهم که از منایع کنکور 1403 هستند. کلاس ‌ها از 10 تا 12 جلسه و هر جلسه 3 ساعت می‌باشد که دو جلسه اول رایگان است.",
          aparat_link: "",
          kelases: [],
          image_link: "https://kadschool.com/media/Doreha/dore_id_10.webp",
          reasons_full: [],
          seo_keywords: "",
          seo_description: "",
          slug_name: "نکته-و-تست-انسانی",
        },
        {
          dore_id: 11,
          dore_title: "نکته و تست تجربی",
          dore_start_date: "2024-02-04",
          descriptions:
            "دوره‌ی نکته و تست کاد، دوره‌ای است برای مرور، جمع‌بندی و تست‌زنی سریع کل مباحث پایه دهم، یازدهم و دوازدهم که از منایع کنکور 1403 هستند. کلاس ‌ها از 10 تا 12 جلسه و هر جلسه 3 ساعت می‌باشد که دو جلسه اول رایگان است.",
          aparat_link: "",
          kelases: [],
          image_link:
            "https://kadschool.com/media/Doreha/dore_id_11_NxbdPNw.webp",
          reasons_full: [
            { title: "تایتل ۱", text: "توضیح " },
            { title: "تایتل ۲", text: "توضیح " },
            { title: "تایتل ۳", text: "توضیح " },
          ],
          seo_keywords: "",
          seo_description: "",
          slug_name: "نکته-و-تست-تجربی",
        },
      ];
  useEffect(() => {
    const is_time = last_login_check(last_login, this_time_login);
    // get_user(7228);
    get_doreha();
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
        // console.log(user);
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
  const get_doreha = () => {
    axios
      .get(urls.doreha)
      .then((res) => {
        const ref_doreha = res.data;
        ref_doreha.forEach((dore) => {
          const slug_name = dore.dore_title.replaceAll(" ", "-");
          dore.slug_name = slug_name;
        });
        setDoreha(ref_doreha);
        localStorage.setItem("doreha", JSON.stringify(ref_doreha));
      })
      .catch((e) => {
        console.log(e);
      });
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
        get_user,
        kelasses,
        get_kelasses,
        setKelasses,
        subjects,
        years,
        jalasat,
        teachers,
        sample_files,
        pay_info,
        setPay_info,
        get_info,
        doreha,
        setDoreha,
        get_doreha,
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
