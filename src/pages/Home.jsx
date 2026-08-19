import { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import library1 from "../assets/images/library1.jpg";
import library2 from "../assets/images/library2.jpg";
import library3 from "../assets/images/library3.jpg";

function Home() {
  const images = [library1, library2, library3];
  
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
 // const [currentImage, setCurrentImage] = useState(0);
const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        className="hero"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
      >
        <div className="overlay">
          <h1>BookFlow</h1>

          <p>
            Discover Thousands of Books, Manage Students,
            and Explore Knowledge — Your Digital Library Hub.
          </p>

          <div className="buttons">
           <button
           className="btn btn-warning btn-lg"
           onClick={() => navigate("/login")}
              >
            Explore Books
            </button>

            
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section">
  <div className="about-content">

    <img
      src={library1}
      alt="Library"
      className="about-image"
    />

    <div className="about-text">
      <h2>About Our Library</h2>

      <p>
        Our Library Management System provides an easy way to manage books,
        students, issue and return records, and digital resources.
      </p>

      {showMore && (
        <div className="extra-content">
          <p>
            Our system allows librarians to manage thousands of books,
            maintain student records, track issued and returned books,
            calculate overdue books, and generate useful reports.
          </p>

          <p>
            Students can search books, check availability,
            and access digital resources through a simple interface.
          </p>

          <ul>
            <li>📚 Book Management</li>
            <li>👨‍🎓 Student Management</li>
            <li>📖 Book Issue & Return</li>
            <li>📊 Dashboard & Reports</li>
          </ul>
        </div>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show Less" : "Read More"}
      </button>

    </div>
  </div>
</section>
    </>
  );
}

export default Home;