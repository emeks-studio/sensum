import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import { Animated } from "react-native";
import { Toast } from "./Toast";

const ToastContext = createContext();

const useToastState = (height = 50, speed = 300) => {
  const [toast, setToast] = useState(null);

  const heightValue = useRef(new Animated.Value(height)).current;
  const animateToast = (expectedHeight) =>
    Animated.timing(heightValue, {
      toValue: expectedHeight,
      duration: speed,
    });
  const toastUp = () => animateToast(0).start();
  const toastDown = () => animateToast(height).start(() => setToast(null));

  useEffect(() => {
    if (!toast) return;
    toastUp();
    const timeout = setTimeout(() => toastDown(), toast.duration);
    return () => clearTimeout(timeout);
  }, [toast]);

  const showToast = useCallback(
    (message = "", duration = 2000) => { setToast({ message, duration }); },
    [setToast]
  )

  return {message: toast?.message, anim: heightValue, showToast}
};

export const ToastProvider = ({ children, height, speed }) => {
  const {message, anim, showToast} = useToastState(height, speed);
  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast message={message} animValue={anim} />
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export {
  useToast
};