import React, { useState } from "react";
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

const CourseDetail = ({ navigation, route }) => {
  const { selectedCourse } = route.params;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const [playVideo, setPlayVideo] = useState(false);
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
            backgroundColor: "red",
          }}
        ></View>
        {/* Line Divider */}
        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.gray20,
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
      <Text>Course Detail</Text>
    </View>
  );
};

export default CourseDetail;
