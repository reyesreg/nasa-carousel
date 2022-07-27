import useApi, { ApiResponseType, NasaImageType } from "../hooks/useApiHook";
import { constructURL } from "../helpers";

import { Carousel } from "../components/Carousel";

const MainView = () => {
  const response: ApiResponseType = useApi(constructURL());
  if (response?.loading) return <h1>Loading</h1>;

  const carouselImages =
    response.data &&
    response.data.map((x, index) => {
      return <Slide image={x} key={index} />;
    });

  return (
    <div className="App">
      <header>NASA photo of the day!</header>
      <Carousel slides={carouselImages || []} autoplay />
    </div>
  );
};

const Slide = ({ image }: { image: NasaImageType }) => {
  return (
    <div>
      <img
        src={image?.url || image?.thumbnail_url || ""}
        alt="nasaimage"
        width={500}
      />
    </div>
  );
};

export default MainView;
