type ModalOption = {
  type?:
    | "style"
    | "login"
    | "signup"
    | "save"
    | "globalOption"
    | "copyCalendar";
  modalArg?: any;
};

export default ModalOption;
