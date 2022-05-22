import React from "react";
import { View, Text, TextInput, Keyboard, FlatList, Image } from "react-native";
import { IconButton } from "../../../components";
import { COLORS, FONTS, SIZES, icons, dummyData } from "../../../constants";

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
        <Text style={{ ...FONTS.h3 }}>{commentItem?.name}</Text>
        {/* Comment */}
      </View>
    </View>
  );
};

const CourseDiscussions = () => {
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
            <CommentSection commentItem={item} />
          )}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 12 }}>Discussions</Text>

        {/* Discussions */}
        {renderDiscussions()}
      </View>
    </View>
  );
};

export default CourseDiscussions;
