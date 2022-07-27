import useApi, { ApiResponseType } from "../hooks/useApiHook";
import { constructURL } from "../helpers";

import Carousel from "../components/Carousel";

const MainView = () => {
  const response: ApiResponseType = useApi(constructURL());
  console.log(response);
  if (response?.loading) return <h1>Loading</h1>;

  return (
    <div className="App">
      <Carousel images={response?.data || []} />
    </div>
  );
};

export default MainView;
