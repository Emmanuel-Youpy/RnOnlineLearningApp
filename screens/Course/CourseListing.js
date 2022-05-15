import React from "react";
import { StyleSheet, Text, View, Image, BackHandler } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  IconButton,
  HorizontalCourseCard,
  LineDivider,
} from "../../components";
import { COLORS, FONTS, SIZES, image, icons, dummyData } from "../../constants";
import { SharedElement } from "react-navigation-shared-element";

const CourseListing = ({ navigation, route }) => {
  const { category, sharedElementPrefix } = route.params;

  // Handler
  function backHandler() {
    navigation.goBack();
  }
  // Render
  function renderHeader() {
    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 250,
          overflow: "hidden",
        }}
      >
        {/* Bg image */}
        <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}
        >
          <Image
            source={category?.thumbnail}
            reseizeMode="cover"
            style={{
              height: "100%",
              width: "100%",
              borderBottomLeftRadius: 60,
            }}
          />
        </SharedElement>
        {/* Title */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: 70,
            left: 30,
          }}
        >
          <SharedElement
            id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
            style={[StyleSheet.absoluteFillObject]}
          >
            <Text
              style={{
                position: "absolute",
                color: COLORS.white,
                fontSize: 30,
              }}
            >
              {category?.title}
            </Text>
          </SharedElement>
        </Animated.View>
        {/* Back Button */}
        <Animated.View>
          <IconButton
            icon={icons.back}
            iconStyle={{
              tintColor: COLORS.black,
              width: 30,
            }}
            containerStyle={{
              position: "absolute",
              top: 40,
              left: 20,
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
              backgroundColor: COLORS.white,
            }}
            onPress={() => {
              backHandler();
            }}
          />
        </Animated.View>
      </Animated.View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {/* Header */}
      {renderHeader()}
    </View>
  );

  CourseListing.sharedElements = (route, otherRoute, showing) => {
    const { category, SharedElementPrefix } = route.params;
    return [
      {
        id: `${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`,
      },
      {
        id: `${sharedElementPrefix}-CategoryCard-Title-${category?.id}`,
      },
    ];
  };
};

export default CourseListing;

const styles = StyleSheet.create({});
