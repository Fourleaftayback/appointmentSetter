import React from "react";

export default () => {
  return (
    <footer
      className="bg-transparent text-center cus-text-light py-2 mt-1"
      data-test="footerComponent"
    >
      Copyright &copy; {new Date().getFullYear()} Appointment Setter
    </footer>
  );
};
