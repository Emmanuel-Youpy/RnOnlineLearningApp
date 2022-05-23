import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Keyboard,
  Button,
} from "react-native";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
} from "../../constants";
import { IconButton, LineDivider } from "../../components";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// import Video from "react-native-video";
import { Video, AVPlaybackStatus } from "expo-av";
import CourseChapters from "./CourseTabs/CourseChapters";
import CourseFiles from "./CourseTabs/CourseFiles";
import CourseDiscussions from "./CourseTabs/CourseDiscussions";

const course_details_tabs = constants.course_details_tabs.map(
  (course_details_tab) => ({
    ...course_details_tab,
    ref: React.createRef(),
  })
);

const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = course_details_tabs.map((_, i) => i * SIZES.width);

  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={{
        // Position: "absolute",
        bottom: -58,
        height: 4,

        width: tabIndicatorWidth,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({ scrollX, onTabPress }) => {
  const [measureLayout, setMeasureLayout] = React.useState([]);
  const containerRef = React.useRef();

  useEffect(() => {
    let nl = [];

    course_details_tabs.forEach((course_details_tab) => {
      course_details_tab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          nl.push({
            x,
            y,
            width,
            height,
          });
          if (nl.length === course_details_tabs.length) {
            setMeasureLayout(nl);
          }
        }
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flex: 1,

        flexDirection: "row",
        // left: -80,
      }}
    >
      {/* Tab Indicator */}
      {/* {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )} */}

      {/* Tabs */}
      {course_details_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`Tab-${index}`}
            ref={item.ref}
            style={{
              flex: 1,
              paddingHorizontal: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              Keyboard.dismiss();
              onTabPress(index);
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                fontSize: SIZES.height > 800 ? 18 : 17,
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const CourseDetail = ({ navigation, route }) => {
  const { selectedCourse } = route.params;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const [playVideo, setPlayVideo] = useState(false);

  const flatListRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  function renderHeaderComponent() {
    return (
      <>
        {/* Back Button */}
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              width: 45,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              //   backgroundColor: COLORS.white,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>
                <AntDesign name="leftcircle" size={45} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Share & Favorite */}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="checkbox-intermediate"
              size={40}
              color="white"
            />
          </View>
          <View
            style={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="favorite-border" size={40} color="white" />
          </View>
        </View>
      </>
    );
  }

  const onTabPress = React.useCallback((tabIndex) =>
    flatListRef?.current?.scrollToOffset({
      offset: tabIndex * SIZES.width,
    })
  );

  function renderHeader() {
    return (
      <View
        style={{
          position: "absolute",
          top: SIZES.height > 800 ? 40 : 20,
          left: 0,
          right: 0,
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
          zIndex: 1,
        }}
      >
        {renderHeaderComponent()}
      </View>
    );
  }

  function renderVideoSection() {
    return (
      <View
        style={{
          height: SIZES.height > 800 ? 220 : 200,
          alignItems: "center",
          backgroundColor: COLORS.gray90,
        }}
      >
        {/* Thumbnail */}
        <ImageBackground
          source={selectedCourse?.thumbnail}
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Play button */}
          <IconButton
            icon={icons.play}
            iconStyle={{
              width: 25,
              height: 25,
              tintColor: COLORS.white,
            }}
            containerStyle={{
              width: 55,
              height: 55,
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.padding,
              borderRadius: 30,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => setPlayVideo(true)}
          />
        </ImageBackground>
        {/* Video Rendering */}

        <Video
          ref={video}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          style={{
            postion: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: COLORS.black,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    );
  }

  function renderContent() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        {/* Tabs */}
        <View
          style={{
            height: 60,
          }}
        >
          <Tabs scrollX={scrollX} onTabPress={onTabPress} />
        </View>
        {/* Line Divider */}
        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.gray20,
          }}
        />
        {/* Content */}
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          keyboardDismissMode="on-drag"
          showsHorizontalScrollIndicator={false}
          data={constants.course_details_tabs}
          keyExtractor={(item) => `CourseDetailTabs-${item.id}`}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { x: scrollX } },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: SIZES.width,
                }}
              >
                {index == 0 && <CourseChapters />}
                {index == 1 && <CourseFiles />}
                {index == 2 && <CourseDiscussions />}
              </View>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {/* Header BAr */}
      {renderHeader()}
      {/* Video */}
      {renderVideoSection()}

      {/* Render Content */}
      {renderContent()}
    </View>
  );
};

export default CourseDetail;
