import React from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { Home, Profile, Search } from "../../screens";
import { COLORS, SIZES, FONTS, constants } from "../../constants";

const MainLayout = () => {
  const flatListRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  function renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={(item) => `Main-${item.id}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: SIZES.height,
                  width: SIZES.width,
                }}
              >
                {item.label == constants.screens.home && <Home />}
                {item.label == constants.screens.search && <Search />}
                {item.label == constants.screens.profile && <Profile />}
              </View>
            );
          }}
        />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Text>Mainlayout</Text>
      {/* Content */}
      {renderContent()}

      {/* {BottomTab} */}
    </View>
  );
};

export default MainLayout;
