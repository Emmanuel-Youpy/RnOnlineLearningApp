import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import { IconLabel } from "./index";
import { connect } from "react-redux";

const HorizontalCourseCard = ({
  containerStyle,
  course,
  onPress,
  appTheme,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <ImageBackground
        source={course.thumbnail}
        reseizeMode="cover"
        style={{
          width: 130,
          height: 130,
          marginBottom: SIZES.radius,
        }}
        imageStyle={{
          borderRadius: SIZES.radius,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            backgroundColor: COLORS.white,
          }}
        >
          <Image
            source={icons.favourite}
            reseizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: course.is_favorite
                ? COLORS.secondary
                : COLORS.additionalColor4,
            }}
          />
        </View>
      </ImageBackground>
      {/* Details */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.base,
        }}
      >
        {/* Title */}
        <Text
          style={{
            ...FONTS.h3,
            fontSize: 18,
            color: appTheme.textColor,
          }}
        >
          {course.title}
        </Text>
        {/* Instruction And Duration */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.base,
          }}
        >
          <Text
            style={{
              ...FONTS.body4,
              color: "grey",
            }}
          >
            By {course.instructor}
          </Text>
          <IconLabel
            icon={icons.time}
            label={course.duration}
            containerStyle={{
              marginLeft: SIZES.base,
            }}
            iconStyle={{
              width: 15,
              height: 15,
            }}
          />
        </View>
        {/* Price & Rating */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.base,
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.primary,
            }}
          >
            ${course.price.toFixed(2)}
          </Text>
          <IconLabel
            icon={icons.star}
            label={course.ratings}
            containerStyle={{
              marginLeft: SIZES.base,
            }}
            iconStyle={{ width: 15, height: 15, tintColor: COLORS.primary2 }}
            labelStyle={{
              marginLeft: 5,
              color: appTheme.textColor,
              ...FONTS.h3,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state) {
  return {
    appTheme: state.appTheme,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HorizontalCourseCard);
