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
import {
  IconButton,
  TextButton,
  VerticalCourseCard,
  LineDivider,
} from "../../components";

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
          {/* font issue */}
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
          alignItems: "flex-start",
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 15,
        }}
        imageStyle={{
          borderRadius: SIZES.radius,
        }}
      >
        {/* info */}
        <View>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body2,
            }}
          >
            How To
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            Make your brand more visible with our checklist
          </Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              color: COLORS.white,
              ...FONTS.body4,
              paddingBottom: 30,
            }}
          >
            By Youpil
          </Text>
        </View>
        {/* image */}
        {/* <Image
          source={require("../../assets/images/start_learning.png")}
          style={{
            width: "100",
            height: 110,
            marginTop: SIZES.padding,
          }}
        /> */}

        {/* Button */}
        <TextButton
          label="Start Learning"
          contentContainerStyle={{
            height: 40,
            paddingHorizontal: SIZES.padding,
            borderRadius: 20,
            backgroundColor: COLORS.white,
          }}
          labelStyle={{ color: COLORS.black }}
        />
      </ImageBackground>
    );
  }
  function vid() {
    <View>
      <Text>heol</Text>
    </View>;
  }
  function renderCourses() {
    return (
      <FlatList
        horizontal
        data={dummyData.courses_list_1}
        listKey="Courses"
        keyExtractor={(item) => `Courses-${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        renderItem={({ item, index }) => (
          <VerticalCourseCard
            containerStyle={{
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index == dummyData.courses_list_1.length - 1
                  ? SIZES.padding
                  : 0,
            }}
            course={item}
          />
        )}
      />
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

        {/* renderCourses */}
        {renderCourses()}
        <LineDivider
          lineStyle={{
            marginVertical: SIZES.padding,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Home;
