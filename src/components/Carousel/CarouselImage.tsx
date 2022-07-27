const CarouselImage = ({imageURL}: {imageURL: string}) => {
  return (
    <div className="carousel__photo">
      <img src={imageURL} alt="nasaimage" width={500} />
    </div>
  );
};

export default CarouselImage;
