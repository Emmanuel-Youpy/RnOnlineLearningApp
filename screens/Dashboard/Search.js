import React from "react";
import { View, Text } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { FlatList } from "react-native-gesture-handler";
import { TextButton, CategoryCard } from "../../components";
import { COLORS, SIZES, FONTS, icons, dummyData } from "../../constants";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const Search = () => {
  const scrollViewRef = React.useRef();
  function renderTopSearches() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <Text
          style={{
            marginHorizontal: SIZES.padding,
            ...FONTS.h2,
          }}
        >
          Top Searches
        </Text>
        <FlatList
          horizontal
          data={dummyData.top_searches}
          listKey="TopSearches"
          keyExtractor={(item) => `TopSearches-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({ item, index }) => (
            <TextButton
              label={item.label}
              contentContainerStyle={{
                paddingVertical: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                marginRight:
                  index == dummyData.top_searches.length - 1
                    ? SIZES.padding
                    : 0,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.gray10,
              }}
              labelStyle={{
                color: COLORS.gray50,
                ...FONTS.h3,
              }}
            />
          )}
        />
      </View>
    );
  }

  function renderBrowseCategories() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <Text
          style={{
            marginHorizontal: SIZES.padding,
            ...FONTS.h2,
          }}
        >
          Browse Category
        </Text>
        <FlatList
          data={dummyData.categories}
          numColumns={2}
          scrollEnabled={false}
          listKey="BrowseCategories"
          keyExtractor={(item) => `BrowseCategories-${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({ item, index }) => (
            <CategoryCard
              category={item}
              containerStyle={{
                height: 130,
                width: (SIZES.width - SIZES.padding * 2 - SIZES.radius) / 2,
                marginTop: SIZES.radius,
                marginLeft: (index + 1) % 2 == 0 ? SIZES.radius : SIZES.padding,
              }}
            />
          )}
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
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          marginTop: 100,
          paddingBottom: 300,
        }}
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        // onScroll
        // onScrollEndDrag
      >
        {/* Top Searches */}
        {renderTopSearches()}
        {/* Browse Category */}
        {renderBrowseCategories()}
      </Animated.ScrollView>
    </View>
  );
};

export default Search;
