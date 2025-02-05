import { useEffect, useState } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // checks if the user has scrolled down the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setIsVisible(scrollTop > windowHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // scrolls to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button className={`button fixed bottom-10 right-10 rounded-full !p-4 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="size-6 fill-white"
        onClick={scrollToTop}
      >
        <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
      </svg>
    </button>
  );
};

export default BackToTop;
