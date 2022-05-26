import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import {
  IconButton,
  HorizontalCourseCard,
  LineDivider,
  TwoPointSlider,
} from "../components";
import { COLORS, FONTS, SIZES, icons, constants } from "../constants";
import TextButton from "./TextButton";
import TextButtonTwo from "./TextButtonTwo";
import { connect } from "react-redux";

const ClassTypeOption = ({
  containerStyle,
  classType,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SIZES.radius,
        backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor9,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={classType.icon}
        resizeMode="contain"
        style={{
          width: 40,
          height: 40,
          tintColor: isSelected ? COLORS.white : COLORS.gray80,
        }}
      />
      <Text
        style={{
          marginTop: SIZES.base,
          color: isSelected ? COLORS.white : COLORS.gray80,
          ...FONTS.h3,
        }}
      >
        {classType.label}
      </Text>
    </TouchableOpacity>
  );
};

const FilterModel = ({
  filterModalSharedValue1,
  filterModalSharedValue2,
  appTheme,
}) => {
  const ClassLevelOption = ({
    containerStyle,
    classLevel,
    isLastItem,
    isSelected,
    onPress,
  }) => {
    return (
      <>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            height: 50,
            alignItems: "center",
            ...containerStyle,
          }}
          onPress={onPress}
        >
          <Text
            style={{
              flex: 1,
              ...FONTS.body3,
              color: appTheme.textColor,
            }}
          >
            {classLevel.label}
          </Text>
          <Image
            source={isSelected ? icons.checkbox_on : icons.checkbox_off}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
        {!isLastItem && (
          <LineDivider
            lineStyle={{
              height: 1,
            }}
          />
        )}
      </>
    );
  };

  const [selectedClassType, setSelectedClassType] = useState("");
  const [selectedClassLevel, setSelectedClassLevel] = useState("");
  const [selectedCreateWithin, setSelectedCreateWithin] = useState("");

  const filterModalContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue1.value,
        [SIZES.height, 0],
        [0, 1]
      ),
      transform: [
        {
          translateY: filterModalSharedValue2.value,
        },
      ],
    };
  });

  const filterModalBgAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue2.value,
        [SIZES.height, 0],
        [0, 1]
      ),
    };
  });

  const filterModalContentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue2.value,
        [SIZES.height, 0],
        [0, 1]
      ),
      transform: [
        {
          translateY: filterModalSharedValue2.value,
        },
      ],
    };
  });

  function renderFooter() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          marginBottom: 30,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Reset */}
        <TextButton
          label="Reset"
          contentContainerStyle={{
            flex: 1,
            boderRadius: SIZES.radius,
            borderWidth: 1,
            backgroundColor: appTheme.tintColor,
          }}
          labelStyle={{
            color: COLORS.black,
            ...FONTS.h3,
          }}
        />
        {/* Apply */}
        <TextButton
          label="Apply"
          contentContainerStyle={{
            flex: 1,
            marginLeft: SIZES.radius,
            boderRadius: SIZES.radius,
            boderWidth: 2,
            boderColor: COLORS.primary,
          }}
          labelStyle={{
            color: COLORS.white,
            ...FONTS.h3,
          }}
        />
      </View>
    );
  }

  return (
    // Main container
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: 0,
          height: SIZES.height,
          width: SIZES.width,
        },
        filterModalContainerAnimatedStyle,
      ]}
    >
      {/* Bg Container */}
      <Animated.View
        style={[
          {
            flex: 1,
            height: SIZES.height,
            width: SIZES.width,
            backgroundColor: COLORS.transparentBlack7,
          },
          filterModalBgAnimatedStyle,
        ]}
      >
        {/* Content Container */}
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 0,
              height: SIZES.height * 0.9,
              width: SIZES.width,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: appTheme?.backgroundColor3,
            },
            filterModalContainerAnimatedStyle,
          ]}
        >
          {/* Header */}
          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: "row",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <View style={{ width: 60 }} />
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                color: appTheme?.textColor,
              }}
            >
              Filter
            </Text>
            <TextButtonTwo
              label="Cancel"
              contentContainerStyle={{
                width: 60,
                backgroundColor: null,
              }}
              labelStyle={{
                color: appTheme.textColor,
                ...FONTS.body3,
              }}
              onPress={() => {
                filterModalSharedValue2.value = withTiming(SIZES.height, {
                  duration: 500,
                });
                filterModalSharedValue1.value = withDelay(
                  500,
                  withTiming(SIZES.height),
                  {
                    duration: 100,
                  }
                );
              }}
            />
          </View>

          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding,
              paddingBottom: 50,
            }}
          >
            {/* Class Type */}
            <View
              style={{
                marginTop: SIZES.radius,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: appTheme.textColor,
                }}
              >
                Class Type
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.radius,
                }}
              >
                {constants.class_types.map((item, index) => {
                  return (
                    <ClassTypeOption
                      key={`ClassType-${index}`}
                      classType={item}
                      isSelected={selectedClassType == item?.id}
                      containerStyle={{
                        marginLeft: index == 0 ? 0 : SIZES.base,
                      }}
                      onPress={() => {
                        setSelectedClassType(item.id);
                      }}
                    />
                  );
                })}
              </View>
            </View>
            {/* Class Level */}
            <View
              style={{
                marginTop: SIZES.padding,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  fontWeight: "bold",
                  color: appTheme.textColor,
                }}
              >
                Class Level
              </Text>
              <View>
                {constants.class_levels.map((item, index) => {
                  return (
                    <ClassLevelOption
                      key={`ClassType-${index}`}
                      classLevel={item}
                      isLastItem={index == constants.class_levels.length - 1}
                      isSelected={selectedClassLevel == item?.id}
                      onPress={() => {
                        setSelectedClassLevel(item.id);
                      }}
                    />
                  );
                })}
              </View>
            </View>
            {/* Created Within */}
            <View
              style={{
                marginTop: SIZES.radius,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  fontWeight: "bold",
                  color: appTheme.textColor,
                }}
              >
                Created Within
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {constants.created_within.map((item, index) => {
                  return (
                    <TextButtonTwo
                      key={`CreatedWithin-${index}`}
                      label={item?.label}
                      contentContainerStyle={{
                        height: 45,
                        paddingHorizontal: SIZES.radius,
                        marginLeft: index % 3 == 0 ? 0 : SIZES.radius,
                        marginTop: SIZES.radius,
                        boderWidth: 1,
                        boderRadius: SIZES.radius,
                        boderColor: COLORS.gray20,
                        backgroundColor:
                          item?.id == selectedCreateWithin
                            ? COLORS.primary3
                            : null,
                      }}
                      labelStyle={{
                        color:
                          item?.id == selectedCreateWithin
                            ? COLORS.white
                            : COLORS.black,
                        ...FONTS.h3,
                      }}
                      onPress={() => {
                        setSelectedCreateWithin(item.id);
                      }}
                    />
                  );
                })}
              </View>
            </View>
            {/* Class Length */}
            <View
              style={{
                marginTop: SIZES.padding,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  fontWeight: "bold",
                  color: appTheme.textColor,
                }}
              >
                Created Within
              </Text>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <TwoPointSlider
                  values={[120, 50]}
                  min={15}
                  max={60}
                  postfix="min"
                  onValuesChange={(values) => console.log(values)}
                />
              </View>
            </View>
          </ScrollView>
          {/* Footer */}
          {renderFooter()}
        </Animated.View>
      </Animated.View>
    </Animated.View>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterModel);
