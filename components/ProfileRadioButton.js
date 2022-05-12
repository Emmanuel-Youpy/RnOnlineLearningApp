import React from "react";
import { View, Text, Animated, Image } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";

const ProfileRadioButton = ({ icon, label, isSelected, onPress }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 80,
        alignItems: "center",
      }}
    >
      {/* Icon */}
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          backgroundColor: COLORS.additionalColor11,
        }}
      >
        <Image
          source={icon}
          reseizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.primary,
          }}
        />
      </View>
    </View>
  );
};

export default ProfileRadioButton;
