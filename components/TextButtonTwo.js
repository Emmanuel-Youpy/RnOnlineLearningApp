import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FONTS, COLORS } from "../constants";
import { connect } from "react-redux";

const TextButtonTwo = ({
  contentContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
  appTheme,
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        ...contentContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h3,
          ...labelStyle,
          color: appTheme.textColor,
        }}
      >
        {label}
      </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(TextButtonTwo);
