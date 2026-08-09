 import { useEffect, useRef, useState } from "react";

/**
 * कुठल्याही content भोवती लपेटलं की तो content स्क्रोल करून दिसायला
 * लागल्यावर हळूच खालून वर सरकत fade-in होतो.
 *
 * Safety: जर IntersectionObserver काही कारणाने trigger झाला नाही
 * (उदा. काही browser/devtools emulation मध्ये), तरी content कायमचं
 * अदृश्य राहू नये म्हणून एक fallback timer आहे — तो थोड्या वेळाने
 * (900ms) आपोआप content दाखवतो.
 */
function FadeInSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let done = false;

    const show = () => {
      if (done) return;
      done = true;
      setIsVisible(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.unobserve(node);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);

    // Fallback: observer काही कारणाने trigger नाही झाला तरी content दाखव
    const fallbackTimer = setTimeout(show, 900);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

export default FadeInSection;