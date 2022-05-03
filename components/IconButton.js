import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../constants";

const IconButton = ({ containerStyle, icon, iconStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        reseizeMode="contain"
        style={{
          width: 30,
          height: 30,
          tintColor: COLORS.white,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
