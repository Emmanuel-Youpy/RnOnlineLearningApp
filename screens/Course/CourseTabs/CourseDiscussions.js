import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Keyboard, FlatList, Image } from "react-native";
import { IconButton, IconLabelButton } from "../../../components";
import { connect } from "react-redux";

import { COLORS, FONTS, SIZES, icons, dummyData } from "../../../constants";

const CourseDiscussions = ({ appTheme }) => {
  const CommentSection = ({ commentItem, commentOption, replies }) => {
    return (
      <View style={{ flexDirection: "row", marginTop: SIZES.padding }}>
        {/* Profile Photo */}
        <Image
          source={commentItem?.profile}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        />
        {/* Name & Comment Section */}
        <View
          style={{
            flex: 1,
            marginTop: 3,
            marginLeft: SIZES.radius,
          }}
        >
          {/* Name */}
          <Text style={{ ...FONTS.h3, color: appTheme.textColor }}>
            {commentItem?.name}
          </Text>
          {/* Comment */}
          <Text style={{ ...FONTS.body4, color: appTheme.textColor }}>
            {commentItem?.comment}
          </Text>

          {/* Comment Options */}
          {commentOption}
          {/* Replies */}
          {replies}
        </View>
      </View>
    );
  };
  const [footerPosition, setFooterPosition] = useState(0);
  const [footerHeight, setfooterHeight] = useState(60);
  useEffect(() => {
    // Listen To Keyboard
    const showSubscription = Keyboard.addListener("keyboardWillShow", (e) => {
      setFooterPosition(e.endCoordinates.height);
    });

    const hideSubscription = Keyboard.addListener("keyboardWillHide", (e) => {
      setFooterPosition(0);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  function renderDiscussions() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={dummyData?.course_details?.discussions}
          keyExtractor={(item) => `Discussions-main-${item.id}`}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: 70,
          }}
          renderItem={({ item, index }) => (
            <CommentSection
              commentItem={item}
              commentOption={
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: SIZES.radius,
                    paddingVertical: SIZES.base,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: COLORS.gray20,
                    backgroundColor: appTheme.backgroundColor3,
                  }}
                >
                  {/* Comment */}
                  <IconLabelButton
                    icon={icons.comment}
                    label={item?.no_of_comments}
                    iconStyle={{
                      tintColor: appTheme.tintColor,
                    }}
                    labelStyle={{
                      marginLeft: 3,
                      color: appTheme.textColor,
                      ...FONTS.h4,
                    }}
                  />
                  {/* Likes */}
                  <IconLabelButton
                    icon={icons.heart}
                    label={item?.no_of_likes}
                    containerStyle={{
                      marginLeft: SIZES.radius,
                      paddingLeft: 15,
                    }}
                    labelStyle={{
                      marginLeft: 3,
                      color: appTheme.textColor,
                      ...FONTS.h4,
                    }}
                  />
                  {/* Date */}
                  <Text
                    style={{
                      flex: 1,
                      textAlign: "right",
                      ...FONTS.h4,
                      color: appTheme.textColor,
                    }}
                  >
                    {item?.posted_on}
                  </Text>
                </View>
              }
              // Replies
              replies={
                <FlatList
                  data={item?.replies}
                  scrollEnabled={false}
                  keyExtractor={(item) => `Discussion-replies-${item.id}`}
                  renderItem={({ item, index }) => (
                    <CommentSection
                      commentItem={item}
                      commentOption={
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: SIZES.radius,
                            paddingVertical: SIZES.base,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: COLORS.gray20,
                          }}
                        >
                          {/* Reply */}
                          <IconLabelButton
                            icon={icons.reply}
                            label="Reply"
                            labelStyle={{
                              marginLeft: 5,
                              color: appTheme.textColor,
                              ...FONTS.h4,
                            }}
                          />
                          {/* Like */}
                          <IconLabelButton
                            icon={icons.heart_off}
                            label="like"
                            containerStyle={{
                              marginLeft: SIZES.radius,
                              paddingLeft: 25,
                            }}
                            labelStyle={{
                              marginTop: 3,
                              color: COLORS.black,
                              ...FONTS.h4,
                              color: appTheme.textColor,
                            }}
                          />
                          {/* Date */}
                          <Text
                            style={{
                              flex: 1,
                              textAlign: "right",
                              color: appTheme.textColor,
                              ...FONTS.h4,
                            }}
                          >
                            {item?.posted_on}
                          </Text>
                        </View>
                      }
                    />
                  )}
                />
              }
            />
          )}
        />
      </View>
    );
  }

  function renderFooterTextInput() {
    return (
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: footerPosition,
          left: 0,
          right: 0,
          height: footerHeight,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          backgroundColor: appTheme.backgroundColor3,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            marginRight: SIZES.base,
            ...FONTS.body3,
          }}
          multiline
          placeholder="Type Something"
          placeholderTextColor={COLORS.gray80}
          onContentSizeChange={(event) => {
            const height = event.nativeEvent.contentSize.height;

            if (height <= 60) {
              setfooterHeight(60);
            } else if (height > 60 && height <= 100) {
              setfooterHeight(height);
            } else if (height > 100) {
              setfooterHeight(100);
            }
          }}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            icon={icons.send}
            iconStyle={{
              height: 25,
              width: 25,
              tintColor: COLORS.primary,
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: appTheme.backgroundColor3 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 12, color: appTheme.textColor }}>
          Discussions
        </Text>
      </View>

      {/* Discussions */}
      {renderDiscussions()}

      {/* Footer */}
      {renderFooterTextInput()}
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseDiscussions);
