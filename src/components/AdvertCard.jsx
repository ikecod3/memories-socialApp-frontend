/**
 * AdvertCard Component
 *
 * A reusable React component for displaying sponsored advertisements.
 *
 * This component features a styled card layout with a 'Sponsored' label,
 * an 'Ads' link, and an image for the advertisement content.
 *
 * Usage:
 * ```jsx
 * <AdvertCard />
 * ```
 */

const AdvertCard = () => {
  return (
    <>
      {/* Container for the advertisement card */}
      <div className="w-full bg-primary shadow-sm rounded-lg px-3 py-5">
        {/* Header section with 'Sponsored' label and 'Ads' link */}
        <div className="flex items-center justify-between text-ascent-2 pb-2 border-b border-[#66666645]">
          <span className="font-bold">Sponsored</span>
          <span className="text-blue cursor-pointer">Ads</span>
        </div>
        {/* Image section displaying the advertisement content */}
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
