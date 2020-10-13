import React, { useRef, useState, useEffect } from "react";
import { Animated, Text } from "react-native";

const useToast = () => {
  const [toast, setToast] = useState (null);
  const heightValue = useRef(new Animated.Value(80)).current;
  const animateToast = (close = false) => {
    Animated.timing(heightValue, {
      toValue: close ? 80 : 0,
      duration: 300
    }).start(() => close && setToast(null)) ;
  }

  useEffect(() => {
    if (!toast) return;
    animateToast();
    const timeout = setTimeout(() => animateToast(true), toast.duration);
    return () => clearTimeout(timeout);
  }, [toast])

  const showToast = ({message = "", duration = 3000}) => {
    setToast({message, duration});
  }
  const renderToast = (props) => {
    return toast && (
      <Animated.View style={{
        transform: [{translateY: heightValue}],
        height: 60,
        backgroundColor: "#CBAAFF",
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        elevation: 10,
        justifyContent: 'center',
        ...props
      }}>
        <Text>{toast.message}</Text>
      </Animated.View>
  )};

  return [ showToast, renderToast ];
}

export { useToast };
