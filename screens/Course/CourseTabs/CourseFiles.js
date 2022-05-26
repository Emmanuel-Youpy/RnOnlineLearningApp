import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { IconButton } from "../../../components";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  dummyData,
  TextButton,
} from "../../../constants";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";

const CourseFiles = ({ appTheme }) => {
  function renderStudents() {
    let students = [];
    if (dummyData?.course_details?.students.length > 3) {
      students = dummyData?.course_details?.students.slice(0, 3);
    } else {
      students = dummyData?.course_details?.students;
    }
    return (
      <View>
        {/* Title */}
        <Text style={{ ...FONTS.h2, fontSize: 25, color: appTheme.textColor }}>
          {" "}
          Students
        </Text>
        {/* Students */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            alignItems: "center",
          }}
        >
          {students.map((item, index) => {
            return (
              <View
                key={`Students-${index}`}
                style={{
                  marginLeft: index > 0 ? SIZES.radius : 0,
                }}
              >
                <Image
                  source={item?.thumbnail}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
              </View>
            );
          })}

          {/* {dummyData?.course_details?.students.length > 3 && (
            <TextButton
              label="View All"
              labelStyle={{
                color: COLORS.primary,
                ...FONTS.h3,
              }}
              contentContainerStyle={{
                marginLeft: SIZES.base,
                backgroundColor: null,
              }}
            />
          )} */}
        </View>
      </View>
    );
  }

  function renderFiles() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        {/* Section Title */}
        <Text style={{ ...FONTS.h2, fontSize: 25, color: appTheme.textColor }}>
          Files
        </Text>
        {/* Files */}
        {dummyData?.course_details?.files.map((item, index) => {
          return (
            <View
              key={`Files-&{index}`}
              style={{
                flexDirection: "row",
                marginTop: SIZES.radius,
              }}
            >
              {/* Thumbnail */}
              <Image
                source={item?.thumbnail}
                style={{ width: 80, height: 80 }}
              />
              {/* Name, author, date */}
              <View
                style={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                }}
              >
                <Text style={{ ...FONTS.h2, color: appTheme.textColor }}>
                  {item.name}
                </Text>
                <Text style={{ color: COLORS.gray30, ...FONTS.body3 }}>
                  {item?.author}
                </Text>
                <Text style={{ ...FONTS.body4, color: appTheme.textColor }}>
                  {item?.upload_date}
                </Text>
              </View>

              {/* Menu */}

              <Entypo name="dots-three-horizontal" size={24} color="gray" />

              {/* <IconButton
                icon={icons.menu}
                iconStyle={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.black,
                }}
                containerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                }}
              /> */}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 12, color: appTheme.textColor }}>Files</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          padding: SIZES.padding,
        }}
      >
        {/* Students */}
        {renderStudents()}

        {/* Files */}
        {renderFiles()}
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseFiles);
