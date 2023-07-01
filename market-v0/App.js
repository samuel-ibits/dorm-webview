import React, { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  BackHandler,
  RefreshControl,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview";
import * as StoreReview from "expo-store-review";

export default function App() {
  const webViewRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleBackButtonPress = () => {
    try {
      webViewRef.current?.goBack();
    } catch (err) {
      console.log("[handleBackButtonPress] Error: ", err.message);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    webViewRef.current.reload();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonPress
      );
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        animated={true}
        backgroundColor="#1597E2"
        barStyle="light-content"
        showHideTransition="fade"
        hidden={false}
      />

      <ScrollView
        style={styles.scrollStyle}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <WebView
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: "https://www.dorm.com.ng/market" }}
          style={styles.container}
          ref={webViewRef}
          onLoadStart={() => setLoading(true)}
          onShouldStartLoadWithRequest={(event) => {
            if (event.navigationType === "click") {
              return true;
            }
            return true;
          }}
          onLoadEnd={() => setLoading(false)}
        />
      </ScrollView>

      {isLoading && (
        <ActivityIndicator
          color="#1597E2"
          size="small"
          style={styles.loading}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#234356",
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollStyle: {
    flex: 1,
  },
});
