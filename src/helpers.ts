export const constructURL = () => {
  let url =
    "https://api.nasa.gov/planetary/apod?api_key=nGyb4L9GhjsBPfcA5Z4q5LzxUzs5ryYDMWIQA4kE";
  // const date = randomDate(new Date("1996-1-1"), new Date());
  return (`${url}&hd=false&thumbs=true&count=6`);
};
