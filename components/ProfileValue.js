import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const ProfileValue = ({ icon, label, value, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        height: 80,
        alignItems: "center",
        // justifyContent: "space-between",
      }}
      onPress={onPress}
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
      {/* Label & Value */}
      <View
        syle={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}
      >
        {label && (
          <Text
            style={{
              color: COLORS.gray30,
              ...FONTS.body3,
              paddingLeft: 10,
            }}
          >
            {label}
          </Text>
        )}
        <Text
          style={{
            ...FONTS.h3,
            paddingLeft: 10,
          }}
        >
          {value}
        </Text>
      </View>
      {/* icon */}
      {/* A positioning Bug */}
      {/* <Image
        source={icons.right_arrow}
        style={{
          width: 15,
          height: 15,
          left: 150,
        }}
      /> */}
    </TouchableOpacity>
  );
};

export default ProfileValue;
