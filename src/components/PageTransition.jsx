import { useEffect, useState } from "react";

function PageTransition({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger the enter animation on next frame
    const frame = requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`page-transition ${visible ? "page-transition-enter" : ""}`}>
      {children}
    </div>
  );
}

export default PageTransition;
