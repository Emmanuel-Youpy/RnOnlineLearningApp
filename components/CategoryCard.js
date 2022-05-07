import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";

const CategoryCard = ({ category, containerStyle }) => {
  return (
    <TouchableOpacity>
      <ImageBackground
        source={category?.thumbnail}
        reseizeMode="cover"
        style={{
          height: 150,
          width: 200,
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          justifyContent: "flex-end",
          ...containerStyle,
        }}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
          {category?.title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CategoryCard;