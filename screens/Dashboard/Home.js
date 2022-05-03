import React from "react";
import { View, Text, ImageBackground, Image, ScrollView } from "react-native";
import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
  dummyData,
} from "../../constants";
import { FlatList } from "react-native-gesture-handler";
import { IconButton } from "../../components";

const Home = () => {
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          marginBottom: 10,
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
      >
        {/* Greetings */}
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ ...FONTS.h2 }}>Hello, Youpil!</Text>
          <Text
            style={{
              color: COLORS.gray50,
              ...FONTS.body3,
            }}
          >
            Wednesday, 4th April 2022
          </Text>
        </View>
        {/* Notification */}
        <IconButton
          icon={icons.notification}
          iconStyle={{
            tintColor: COLORS.black,
          }}
        />
      </View>
    );
  }

  function renderStartLearning() {
    return (
      <ImageBackground
        source={images.featured_bg_image}
        style={{
          alignItems: "flex-end",
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 15,
        }}
        imageStyle={{
          borderRadius: SIZES.radius,
        }}
      ></ImageBackground>
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

      {/* Content */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Start Learning */}
        {renderStartLearning()}
      </ScrollView>
    </View>
  );
};

export default Home;
