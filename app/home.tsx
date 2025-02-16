import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import Header from "./components/Header";
import Menu from "./components/Menu";
import EventCard from "./components/EventCard";
import { useRouter } from "expo-router";
import { useTheme } from "./context/ThemeContext";
import SearchBar from "./components/SearchBar";
import EmptyState from "./components/EmptyState";

const TABS = ["Today", "Week", "Month", "All List"] as const;
type TabType = (typeof TABS)[number];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("Today");
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [events] = useState([
    {
      id: 1,
      title: "Meteor Shower",
      date: "April 22, 2024",
      image: require("@/assets/images/ico.png"),
    },
    {
      id: 2,
      title: "Solar Eclipse",
      date: "May 15, 2024",
      image: require("@/assets/images/ico.png"),
    },
    {
      id: 3,
      title: "Solar Eclipse",
      date: "May 15, 2024",
      image: require("@/assets/images/ico.png"),
    },
    {
      id: 4,
      title: "Solar Eclipse",
      date: "May 15, 2024",
      image: require("@/assets/images/ico.png"),
    },
  ]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 15,
    },
    title: {
      fontSize: 28,
      fontFamily: "libre",
      marginTop: 20,
      color: theme.text,
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
    eventList: {
      marginTop: 20,
    },
  });

  const filteredEvents = events.filter((event) => {
    if (
      searchQuery &&
      !event.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (activeTab === "Today") return true;
    if (activeTab === "Week") return true;
    if (activeTab === "Month") return true;
    return true;
  });

  const onRefresh = () => {
    setRefreshing(true);
    // Fetch events or refresh data
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
      <Menu isVisible={menuVisible} onClose={() => setMenuVisible(false)} />
      <Header profileImage={require("@/assets/images/ico.png")} />
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

      <SearchBar onSearch={setSearchQuery} />

      <ScrollView
        style={styles.eventList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
          />
        }
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              image={event.image}
              onPress={() =>
                router.push({
                  pathname: "/event-details",
                  params: { id: event.id },
                } as any)
              }
            />
          ))
        ) : (
          <EmptyState message="No events found matching your search" />
        )}
      </ScrollView>
    </View>
  );
}
