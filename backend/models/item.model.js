import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Types.ObjectId,
      ref: "shop",
    },
    category: {
      type: String,
      enum: [
        "Snacks",
        "Main course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Fast Food",
        "Others",
      ],
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["veg", "non veg"],
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
