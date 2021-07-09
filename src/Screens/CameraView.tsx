//--------------------------------------------------------------------------------
// Helper function to show the Camera View.
//
// NOTE: Please note we are using TensorCamera component which is constructed
// on line: 37 of this function component. This is just a decorated expo.Camera
// component with extra functionality to stream Tensors, define texture dimensions
// and other goods. For further research:
// https://js.tensorflow.org/api_react_native/0.2.1/#cameraWithTensors
//--------------------------------------------------------------------------------
import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
} from "react-native";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import { getTranslation } from "../utilites";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Permissions from "expo-permissions";

const { width: MYWIDTH, height: MYHEIGHT } = Dimensions.get("window");
//TF Camera Decorator
const TensorCamera = cameraWithTensors(Camera);
//RAF ID
let requestAnimationFrameId = 0;
const PROBABILITY = 0.7;

const CameraView = () => {
  const [mobilenetModel, setMobilenetModel] = useState(null);
  const [frameworkReady, setFrameworkReady] = useState(false);
  const [predictionFound, setPredictionFound] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const [translation, setTranslation] = useState({});

  const getPrediction = async (tensor) => {
    if (tensor === null) {
      return;
    }

    //topk set to 1
    let prediction;
    try {
      prediction = await mobilenetModel.classify(tensor, 1);
    } catch (error) {
      console.log("Error line 61: ", error);
    }
    // console.log(`prediction: ${JSON.stringify(prediction)}`);

    if (prediction[0].probability > PROBABILITY) {
      //stop looping!
      cancelAnimationFrame(requestAnimationFrameId);
      setPredictionFound(true);

      //get translation!
      setTranslation(
        await getTranslation(prediction[0].className, route.params.language)
      );
    }
  };

  // get permissions on mount, load tf and models
  useEffect(() => {
    let isMounted = true;
    Camera.requestPermissionsAsync().then(({ status }) =>
      console.log(`permissions status: ${status}`)
    );

    tf.ready().then(() => {
      if (isMounted) {
        setFrameworkReady(true);
      }
    });

    setMobilenetModel(null);
    mobilenet.load().then((model) => {
      setMobilenetModel(model);
    });
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, [requestAnimationFrameId]);

  // Loop that handles each frame
  const handleCameraStream = (imageAsTensors) => {
    const loop = async () => {
      const nextImageTensor = await imageAsTensors.next().value;
      if (nextImageTensor) {
        try {
          await getPrediction(nextImageTensor);
        } catch (err) {
          console.log("error line 129", err);
        }
        requestAnimationFrameId = requestAnimationFrame(loop);
      }
    };
    if (!predictionFound) loop();
  };

  //performance hacks (Platform dependent)
  const textureDims =
    Platform.OS === "ios"
      ? { width: 1080, height: 1920 }
      : { width: 1600, height: 1200 };
  const tensorDims = { width: 152, height: 200 };

  if (!mobilenetModel || !frameworkReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "bottom"]}>
      <View style={styles.squareOverlay}></View>
      <TensorCamera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        zoom={0}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={tensorDims.height}
        resizeWidth={tensorDims.width}
        resizeDepth={3}
        onReady={(imageAsTensors) => handleCameraStream(imageAsTensors)}
        autorender={true}
      />
      <View style={styles.overlay}>
        <View>
          <Text style={styles.text}>Translation: </Text>
          <Text style={styles.importantWords}>{translation.translation}</Text>
        </View>
        <View>
          <Text style={styles.text}>English: </Text>
          <Text style={styles.importantWords}>{translation.word}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  camera: {
    position: "absolute",
    top: 0,
    left: 0,
    width: MYWIDTH,
    height: MYHEIGHT,
    zIndex: 0,
  },
  overlay: {
    position: "absolute",
    bottom: 25 - MYHEIGHT,
    alignSelf: "center",
    width: MYWIDTH,
    height: 200,
    zIndex: 100,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  squareOverlay: {
    position: "absolute",
    bottom: 250 - MYHEIGHT,
    alignSelf: "center",
    width: MYWIDTH - 50,
    height: MYHEIGHT - 250,
    zIndex: 100,
    borderWidth: 2,
    borderColor: "white",
    borderStyle: "dashed",
  },
  text: { fontSize: 20, color: "black" },
  importantWords: { fontSize: 20, paddingLeft: 10 },
});

export default CameraView;
