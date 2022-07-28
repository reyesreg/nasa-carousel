import useApi, { ApiResponseType, NasaImageType } from "../hooks/useApiHook";
import { constructURL } from "../helpers";

import Loader from "../components/Loader";
import Carousel from "../components/Carousel";

const MainView = () => {
  const response: ApiResponseType = useApi(constructURL());
  if (response?.loading)
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );

  const carouselImages =
    response.data &&
    response.data.map((imgDetails, index) => {
      return <Slide imgDetails={imgDetails} key={index} />;
    });

  return (
    <div className="App">
      <header>NASA photo of the day</header>
      <br />
      <Carousel rawSlides={carouselImages || []} interval={1500} />
    </div>
  );
};

const Slide = ({ imgDetails }: { imgDetails: NasaImageType }) => {
  return (
    <div className="slide-wrapper">
      <img
        src={imgDetails?.url || imgDetails?.thumbnail_url || ""}
        alt={imgDetails?.title}
        width={500}
      />
      <br />
      <div className="desc-wrapper">
        <h1>{imgDetails?.title}</h1>
        <p>{imgDetails?.date}</p>
      </div>
    </div>
  );
};

export default MainView;
