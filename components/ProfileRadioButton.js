import React from "react";
import { View, Text, Animated, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import { connect } from "react-redux";

const ProfileRadioButton = ({ appTheme, icon, label, isSelected, onPress }) => {
  const radioAnimated = React.useRef(new Animated.Value(0)).current;
  const circleColorAnimated = radioAnimated.interpolate({
    inputRange: [0, 17],
    outputRange: [COLORS.gray40, COLORS.primary],
  });
  const lineColorAnimated = radioAnimated.interpolate({
    inputRange: [0, 17],
    outputRange: [COLORS.additionalColor4, COLORS.additionalColor13],
  });
  React.useEffect(() => {
    if (isSelected) {
      Animated.timing(radioAnimated, {
        toValue: 17,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(radioAnimated, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isSelected]);
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
          backgroundColor: appTheme?.backgroundColor3,
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
      {/* Label */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}
      >
        <Text
          style={{
            color: appTheme?.textColor,
            ...FONTS.h3,
          }}
        >
          {label}
        </Text>
      </View>
      {/* Radio Button */}
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Animated.View
          style={{
            height: 2,
            width: "100%",
            backgroundColor: lineColorAnimated,
          }}
        />
        <Animated.View
          style={{
            position: "absolute",
            left: radioAnimated,
            width: 25,
            height: 25,
            borderRadius: 15,
            borderWidth: 5,
            borderColor: circleColorAnimated,
            backgroundColor: appTheme?.backgroungColor1,
          }}
        />
      </TouchableOpacity>
    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileRadioButton);
