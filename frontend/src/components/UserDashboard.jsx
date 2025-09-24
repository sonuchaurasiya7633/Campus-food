import React, { useEffect, useRef, useState } from "react";
import { categories } from "../category";
import CategoryCard from "./categoryCard";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import FoodCart from "./FoodCart";
import { IoMdLocate } from "react-icons/io";
const UserDashboard = () => {
  const { currentCity, shopsInMyCity, itemsInMyCity } = useSelector(
    (state) => state.user
  );
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();

  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);

  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);

  const updateCateButton = (ref) => {
    const element = ref.current;
    if (element) {
      const { scrollLeft, clientWidth, scrollWidth } = element;
      setShowLeftCateButton(scrollLeft > 0);
      setShowRightCateButton(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const updateShopButton = (ref) => {
    const element = ref.current;
    if (element) {
      const { scrollLeft, clientWidth, scrollWidth } = element;
      setShowLeftShopButton(scrollLeft > 0);
      setShowRightShopButton(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    if (cateScrollRef.current) {
      updateCateButton(cateScrollRef);

      const handleCateScroll = () => updateCateButton(cateScrollRef);
      cateScrollRef.current.addEventListener("scroll", handleCateScroll);

      return () => {
        cateScrollRef.current?.removeEventListener("scroll", handleCateScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (shopScrollRef.current) {
      updateShopButton(shopScrollRef);

      const handleShopScroll = () => updateShopButton(shopScrollRef);
      shopScrollRef.current.addEventListener("scroll", handleShopScroll);

      return () => {
        shopScrollRef.current?.removeEventListener("scroll", handleShopScroll);
      };
    }
  }, []);

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col gap-6 items-center bg-gradient-to-br from-[#fff9f6] via-[#fffefe] to-[#fef4f2] overflow-auto">
      <div className="w-full max-w-6xl flex flex-col gap-6 items-start px-4 sm:px-6 lg:px-8 py-6">
        {/* Heading */}
        <h1 className="text-gray-900 text-2xl sm:text-3xl font-extrabold tracking-tight">
          Inspiration for Your First Order
        </h1>

        <div className="w-full relative">
          {/* Left Button */}
          {showLeftCateButton && (
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-[#ff4d2d] p-3 rounded-full shadow-lg hover:shadow-xl border border-[#ff4d2d]/20 hover:bg-[#ff4d2d] hover:text-white transition-all duration-300 cursor-pointer z-10"
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaCircleChevronLeft size={28} />
            </button>
          )}

          {/* Categories Scroll Section */}
          <div
            className="w-full flex overflow-x-auto gap-5 pb-4 scroll-smooth scrollbar-hide"
            ref={cateScrollRef}
          >
            {categories.map((cate, index) => (
              <CategoryCard
                name={cate.category}
                image={cate.image}
                key={index}
              />
            ))}
          </div>

          {/* Right Button */}
          {showRightCateButton && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-[#ff4d2d] p-3 rounded-full shadow-lg hover:shadow-xl border border-[#ff4d2d]/20 hover:bg-[#ff4d2d] hover:text-white transition-all duration-300 cursor-pointer z-10"
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaCircleChevronRight size={28} />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-6 items-start px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-gray-900 text-2xl sm:text-3xl font-extrabold tracking-tight flex flex-wrap items-center gap-2">
          Best Shop in
          <span
            className="flex items-center gap-2 
             bg-white
             px-4 py-2 rounded-2xl 
             text-[#ff4d2d] font-bold text-2xl 
             shadow-md hover:shadow-xl 
             transform hover:-translate-y-1 transition-all duration-300"
          >
            <IoMdLocate size={20} className="text-[#ff4d2d]" />
            {currentCity}
          </span>
        </h1>

        <div className="w-full relative">
          {/* Left Button */}
          {showLeftShopButton && (
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-[#ff4d2d] p-3 rounded-full shadow-lg hover:shadow-xl border border-[#ff4d2d]/20 hover:bg-[#ff4d2d] hover:text-white transition-all duration-300 cursor-pointer z-10"
              onClick={() => scrollHandler(shopScrollRef, "left")}
            >
              <FaCircleChevronLeft size={28} />
            </button>
          )}

          {/* Shops Scroll Section */}
          <div
            className="w-full flex overflow-x-auto gap-5 pb-4 scroll-smooth scrollbar-hide"
            ref={shopScrollRef}
          >
            {shopsInMyCity?.map((shop, index) => (
              <div
                key={index}
                className="min-w-[220px] sm:min-w-[260px] lg:min-w-[280px] h-[320px] flex-shrink-0 
          bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 
          overflow-hidden group cursor-pointer border border-gray-100 hover:border-[#ff4d2d]/40"
              >
                {/* Image Section */}
                <div className="w-full h-2/3 relative overflow-hidden">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                </div>

                {/* Text Section */}
                <div className="h-1/3 flex flex-col justify-center items-center p-4 text-center">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-[#ff4d2d] transition-colors duration-300">
                    {shop.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Discover amazing items ✨
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          {showRightShopButton && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-[#ff4d2d] p-3 rounded-full shadow-lg hover:shadow-xl border border-[#ff4d2d]/20 hover:bg-[#ff4d2d] hover:text-white transition-all duration-300 cursor-pointer z-10"
              onClick={() => scrollHandler(shopScrollRef, "right")}
            >
              <FaCircleChevronRight size={28} />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-6 items-start px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-gray-900 text-2xl sm:text-3xl font-extrabold tracking-tight">
          Suggested Food Items
        </h1>
        <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center  ">
          {itemsInMyCity?.map((item, index) => (
            <FoodCart key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
