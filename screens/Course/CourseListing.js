import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
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
  FilterModel,
} from "../../components";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  dummyData,
  images,
} from "../../constants";
import { SharedElement } from "react-navigation-shared-element";
import { AntDesign } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HEADER_HEIGHT = 250;

const CourseListing = ({ navigation, route, appTheme }) => {
  const { category, sharedElementPrefix } = route.params;

  const flatListRef = React.useRef();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerSharedValue = useSharedValue(80);
  const filterModalSharedValue1 = useSharedValue(SIZES.height);
  const filterModalSharedValue2 = useSharedValue(SIZES.height);

  // Handler
  backHandler = () => {
    navigation.goBack();
  };
  // Render
  function renderHeader() {
    const inputRange = [0, HEADER_HEIGHT - 50];
    headerSharedValue.value = withDelay(
      500,
      withTiming(0, {
        duration: 500,
      })
    );

    const headerFadeAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1]),
      };
    });

    const headerTranslateAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: headerSharedValue.value,
          },
        ],
      };
    });

    const headerHeightAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          scrollY.value,
          inputRange,
          [HEADER_HEIGHT, 120],
          Extrapolate.CLAMP
        ),
      };
    });

    const headerHideOnScrollAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              inputRange,
              [0, 200],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    });

    const headerShowOnScrollAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              inputRange,
              [50, 130],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    });

    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 250,
            overflow: "hidden",
          },
          headerHeightAnimatedStyle,
        ]}
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
          style={[
            {
              position: "absolute",
              top: -80,
              left: 0,
              right: 0,
            },
            headerShowOnScrollAnimatedStyle,
          ]}
        >
          <Text
            style={{
              textAlign: "center",
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            {category?.title}
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 70,
              left: 30,
            },
            headerHideOnScrollAnimatedStyle,
          ]}
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
        <Animated.View style={headerFadeAnimatedStyle}>
          <View
            style={{
              position: "absolute",
              top: 40,
              left: 20,
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
              // backgroundColor: COLORS.white,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>
                <AntDesign name="leftcircle" size={45} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        {/* Category Image */}
        <Animated.Image
          source={images.mobile_image}
          reseizeMode="contain"
          style={[
            {
              position: "absolute",
              right: 40,
              bottom: -40,
              width: 100,
              height: 200,
            },
            headerFadeAnimatedStyle,
            headerTranslateAnimatedStyle,
            headerHideOnScrollAnimatedStyle,
          ]}
        />
      </Animated.View>
    );
  }

  function renderResults() {
    return (
      <AnimatedFlatList
        ref={flatListRef}
        data={dummyData.courses_list_2}
        keyExtractor={(item) => `Results-${item.id}`}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 270,
              marginBottom: SIZES.base,
            }}
          >
            {/* Results */}
            <Text
              style={{
                flex: 1,
                ...FONTS.body3,
                color: appTheme?.textColor,
              }}
            >
              2,789 Results
            </Text>
            {/* Filter */}
            <View
              style={{
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                backgroundColor: COLORS.primary,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  filterModalSharedValue1.value = withTiming(0, {
                    duration: 100,
                  });
                  filterModalSharedValue2.value = withDelay(
                    100,
                    withTiming(0, { duration: 500 })
                  );
                }}
              >
                <Text>
                  <MaterialIcons name="filter-list" size={24} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <HorizontalCourseCard
            course={item}
            containerStyle={{
              marginVertical: SIZES.padding,
              marginTop: index == 0 ? SIZES.radius : SIZES.padding,
            }}
            onPress={() =>
              navigation.navigate("CourseDetail", { selectedCourse: item })
            }
          />
        )}
        ItemSeparatorComponent={() => (
          <LineDivider
            lineStyle={{
              backgroundColor: COLORS.gray20,
            }}
          />
        )}
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme?.backgroundColor3,
      }}
    >
      {/* Result */}

      {renderResults()}
      {/* Header */}
      {renderHeader()}

      {/* Filter Model */}

      <FilterModel
        filterModalSharedValue1={filterModalSharedValue1}
        filterModalSharedValue2={filterModalSharedValue2}
      />
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

function mapStateToProps(state) {
  return {
    appTheme: state.appTheme,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseListing);

const styles = StyleSheet.create({});
