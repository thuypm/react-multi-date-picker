module.exports = {
  siteMetadata: {
    siteUrl: "https://shahabyazdi.github.io/",
    googleVerification: "eN9hWwtvlYdXL_37ZU2ML8AUY8685Fw3O98T5vidr-4",
    en: {
      title: "React Multi Date Picker",
      description:
        "a simple React datepicker component for working with gregorian, persian, arabic and indian calendars with the ability to select the date in single, multiple and range modes.",
      keywords: [
        "react",
        "datepicker",
        "rangepicker",
        "timepicker",
        "calendar",
        "multi",
        "date",
        "picker",
        "date picker",
        "range picker",
        "time picker",
        "multiple",
        "datetime picker",
        "date time picker",
        "time",
        "gregorian",
        "persian",
        "jalali",
        "hijri",
        "arabic",
        "indian",
        "farsi",
        "hindi",
        "analog",
        "analog time picker",
        "component",
      ],
      type: "website",
    },
    fa: {
      title: "دیت پیکر چند منظوره ری اکت",
      description:
        "دیت پیکر ری اکت  برای کار با تقویم های میلادی ، فارسی ، عربی و هندی با قابلیت انتخاب تاریخ در حالت های تکی ، چندگانه و دامنه.",
      keywords: [
        "ری اکت",
        "دیت",
        "پیکر",
        "دیت پیکر",
        "تایم پیکر",
        "چند منظوره",
        "رنج پیکر",
        "انتخابگر تاریخ",
        "انتخابگر زمان",
        "انتخابگر ساعت",
        "انتخابگر چندگانه",
        "انتخابگر دامنه",
        "هجری شمسی",
        "تاریخ",
        "میلادی",
        "هجری",
        "شمسی",
        "جلالی",
        "قمری",
        "هندی",
        "فارسی",
        "تقویم",
        "کامپوننت",
      ],
      type: "وب سایت",
    },
  },
  pathPrefix: "/react-multi-date-picker",
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
    },
  ],
};
