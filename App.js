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


function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
export default function App() {
  const webViewRef = useRef();
  const [isLoadong, setLoading] = useState(false);

  const handleBackButtonPress = () => {
    try {
      webViewRef.current?.goBack();
    } catch (err) {
      console.log("[handleBackButtonPress] Error : ", err.message);
    }
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

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    webViewRef.current.reload();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        animated={true}
        backgroundColor="#1597E2"
        barStyle={"light-content"}
        showHideTransition={"fade"}
        hidden={false}
      />

      <ScrollView
        style={styles.ScrollStyle}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
          />
        }
      >
        <WebView
          originWhiteList={["*"]}
          source={{ uri: "https://www.dorm.com.ng/v2.5/app" }}
          style={styles.container}
          ref={webViewRef}
          onLoadStart={(syntheticEvent) => {
            setLoading(true);
          }}
          onShouldStartLoadWithRequest={(event) => {
            if (event.navigationType === "click") {
              return true;
            } else {
              return true;
            }
          }}
          onLoadEnd={(syntheticEvent) => {
            setLoading(false);
          }}
        />
      </ScrollView>
      {isLoadong && (
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
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
