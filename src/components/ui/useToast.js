import React, { useRef, useState, useEffect } from "react";
import { Animated, Text } from "react-native";
import { Toast } from "./Toast";

const useToast = ({height = 50, speed = 300} = {}) => {
  const [toast, setToast] = useState (null);
  const heightValue = useRef(new Animated.Value(height)).current;

  const animateToast = (expectedHeight) => ( 
    Animated.timing(heightValue, {
      toValue: expectedHeight,
      duration: speed
    })
  );
  const toastUp = () => animateToast(0).start();
  const toastDown = () => animateToast(height).start(() => setToast(null));

  useEffect(() => {
    if (!toast) return;
    toastUp();
    const timeout = setTimeout(() => toastDown(), toast.duration);
    return () => clearTimeout(timeout);
  }, [toast])

  const showToast = (message = "", duration = 3000) => {
    setToast({message, duration});
  }

  const renderToast = () => (
    toast && <Toast message={toast.message} animValue={heightValue}/>
  );

  return [ showToast, renderToast ];
}

export { useToast };
