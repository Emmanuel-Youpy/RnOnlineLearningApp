import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SIZES, FONTS, COLORS, icons } from "../constants";
import { IconLabel } from "../components";

const VerticalCourseCard = ({ containerStyle, course }) => {
  return (
    <TouchableOpacity
      style={{
        width: 270,
        ...containerStyle,
      }}
    >
      {/* Thumbnail */}
      <Image
        source={course.thumbnail}
        reseizeMode="cover"
        style={{
          width: "100%",
          height: 150,
          marginBottom: SIZES.radius,
          borderRadius: SIZES.radius,
        }}
      />
      {/* Details */}
      <View style={{ flexDirection: "row" }}>
        {/* Play */}
        <View
          style={{
            width: 45,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 25,
            backgroundColor: COLORS.primary,
          }}
        >
          <Image
            source={icons.play}
            reseizeMode="contain"
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>
        {/* Info */}
        <View
          style={{
            flex: 1,
            ...FONTS.h3,
            fontSize: 18,
          }}
        >
          <Text
            style={{
              flex: 1,
              ...FONTS.h3,
              fontSize: 15,
              paddingLeft: 5,
            }}
          >
            {course.title}
          </Text>
          <IconLabel
            icon={icons.time}
            label={course.duration}
            containerStyle={{}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalCourseCard;
