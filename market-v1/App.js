import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";

export default class MyWeb extends Component {
  constructor(props) {
    super(props);
    this.webViewRef = React.createRef();
    this.state = {
      isLoading: false,
      refreshing: false,
    };
  }

  handleBackButtonPress = () => {
    try {
      this.webViewRef.current.goBack();
    } catch (err) {
      console.log("[handleBackButtonPress] Error:", err.message);
    }
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.webViewRef.current.reload();
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  };

  async componentDidMount() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.DEFAULT
    ); // Allow both portrait and landscape orientation
    this.backHandler = ScreenOrientation.addBackListener(
      this.handleBackButtonPress
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const { isLoading, refreshing } = this.state;

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
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <WebView
            originWhitelist={["*"]}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: "https://dorm.com.ng/market" }}
            style={styles.container}
            ref={this.webViewRef}
            onLoadStart={() => this.setState({ isLoading: true })}
            onShouldStartLoadWithRequest={(event) => {
              if (event.navigationType === "click") {
                return true;
              }
              return true;
            }}
            onLoadEnd={() => this.setState({ isLoading: false })}
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
