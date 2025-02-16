import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Header from "./components/Header";
import Menu from "./components/Menu";

const TABS = ["Today", "Week", "Month", "All List"] as const;
type TabType = (typeof TABS)[number];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("Today");
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Menu isVisible={menuVisible} onClose={() => setMenuVisible(false)} />
      <Header
        onMenuPress={() => setMenuVisible(true)}
        profileImage={require("@/assets/images/ico.png")}
      />
      {/* Page Title */}
      <Text style={styles.title}>Book your{"\n"}Event</Text>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE5F1",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 28,
    fontFamily: "libre",
    marginTop: 20,
    color: "black",
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
  },
  tab: {
    fontSize: 16,
    marginRight: 20,
    color: "gray",
    paddingBottom: 4,
  },
  activeTab: {
    color: "black",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#A30D2D",
  },
});
