import { useEffect } from "react";
import { useNavigation } from "react-router-dom";
import { useLoader } from "@/../src/context/LoaderContext";

export default function NavigationLoader() {
  const navigation = useNavigation();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (navigation.state === "loading" || navigation.state === "submitting") {
      showLoader();
    } else {
      hideLoader();
    }
  }, [navigation.state]);

  return null;
}
