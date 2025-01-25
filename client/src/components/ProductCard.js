import {
  ChevronLeft as LeftArrow,
  Minus as MinusIcon,
  Plus as PlusIcon,
  ChevronRight as RightArrow,
} from "lucide-react";
import React, { useState } from "react";
import { shortText } from "../utils/common";
import Button from "./Button";

function ProductCard({
  name,
  price,
  currentPrice,
  shortDescription,
  longDescription,
  images,
  tags,
  category,
}) {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  const leftArrowClick = () => {
    const currentIndex = images.indexOf(currentImage);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentImage(images[newIndex]);
  };

  const rightArrowClick = () => {
    const currentIndex = images.indexOf(currentImage);
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentImage(images[newIndex]);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-5 px-10 py-5 max-w-[400px] relative">
      <span className="absolute top-0 right-0 bg-gray-500 text-white px-2 py-1 rounded-bl-lg">
        {category}
      </span>
      <div className="relative h-40">
        <LeftArrow
          size={64}
          className="absolute top-1/3 left-0 cursor-pointer"
          onClick={leftArrowClick}
        />
        <img
          src={currentImage}
          alt={name}
          className="w-full h-40 object-contain object-center"
        />
        <RightArrow
          size={64}
          className="absolute top-1/3 right-0 cursor-pointer"
          onClick={rightArrowClick}
        />
      </div>
      <p>
        {tags.map((tag) => {
          return (
            <span className="bg-gray-200 text-gray-500 px-3 py-1 text-xs rounded-full mr-2">
              {tag}
            </span>
          );
        })}
      </p>
      <h1 className="font-bold text-xl">{shortText(name, 30)}</h1>
      <p className="text-sm">{shortText(shortDescription, 70)}</p>

      <p className="text-2xl my-2">
        ₹ <del>{price}</del> <span className="font-bold">{currentPrice}</span>/-
      </p>

      <div className="flex justify-center items-center">
        <MinusIcon
          className="cursor-pointer"
          onClick={() => setQuantity(quantity - 1)}
        />
        <span className="mx-2 text-xl">{quantity}</span>
        <PlusIcon
          className="cursor-pointer"
          onClick={() => setQuantity(quantity + 1)}
        />
      </div>

      <div className="flex justify-center mt-5">
        <Button label="Add To Cart" variant="primary" />
      </div>
    </div>
  );
}

export default ProductCard;
