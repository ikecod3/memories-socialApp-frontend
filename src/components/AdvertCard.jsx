const AdvertCard = () => {
  return (
    <>
      <div className="w-full bg-primary shadow-sm rounded-lg px-3 py-5">
        <div className="flex items-center justify-between text-ascent-2 pb-2 border-b border-[#66666645]">
          <span className="font-bold">Advertise with us</span>
          <span className="text-blue cursor-pointer">click here</span>
        </div>
        <img
          className="object-cover rounded-xl mt-2"
          src="https://img.freepik.com/premium-psd/sport-shoes-sale-social-media-instagram-post-square-banner-template-design_70055-1226.jpg?w=740"
          alt="advert image"
        />
      </div>
    </>
  );
};

export default AdvertCard;
