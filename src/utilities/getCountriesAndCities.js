const getAllCountries = async () => {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/positions"
    );
    if (response.ok) {
      const data = await response.json();
      const newData = data.data.map((el, index) => {
        return {
          key: index,
          value: el.name,
        };
      });
      // console.log(newData);
      return newData;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
const getAllCitiesInCountry = async (coutnry) => {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: coutnry,
          // country: "egypt",
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      const newData = data.data.map((el, index) => {
        return {
          key: index,
          value: el,
        };
      });
      // console.log(newData);
      return newData;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAllCategories = async () => {
  try {
    const res = await fetch(
      "https://work-it-back.vercel.app/api/company/getCategories/"
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export { getAllCountries, getAllCitiesInCountry, getAllCategories };
