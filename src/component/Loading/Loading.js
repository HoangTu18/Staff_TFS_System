import { useSelector } from "react-redux";
import "./Loading.style.css";
const Loading = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  // const isLoading = false;
  if (isLoading) {
    return (
      <div className="bgLoading">
        <span className="loader"></span>
      </div>
    );
  }
};

export default Loading;
