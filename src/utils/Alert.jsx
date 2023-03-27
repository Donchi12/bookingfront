
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alert = withReactContent(Swal);

const error = Alert.mixin({
  toast: true,
  position: "top",
  icon: "error",
  iconColor: "white",
  showCloseButton: true,
  customClass: {
    closeButton: "closeBtn",
  },
  timer: 9000,
  showCancelButton: false,
  showConfirmButton: false,
  timerProgressBar: true,
  background: "#f75616",
  color: "white",
});
const success = Alert.mixin({
  toast: true,
  position: "top",
  icon: "success",
  iconColor: "white",
  showCloseButton: true,
  customClass: {
    closeButton: "closeBtn",
  },
  timer: 8000,
  showCancelButton: false,
  showConfirmButton: false,
  timerProgressBar: true,
  background: "green",
  color: "white",
});

const modal = (title, html) =>
  Alert.fire({
    title,
    html,
    showCancelButton: false,
    showConfirmButton: false,
    
    // didOpen: () => {
    //   Alert.showLoading(Alert.getDenyButton());
    // },
    color: "white",
  });

const Toast = { error, success, modal, Alert };

export default Toast;
