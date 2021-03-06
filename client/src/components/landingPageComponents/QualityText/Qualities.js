import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import StarsIcon from "@mui/icons-material/Stars";
import AppShortcutOutlinedIcon from "@mui/icons-material/AppShortcutOutlined";
import CoronavirusOutlinedIcon from "@mui/icons-material/CoronavirusOutlined";
import "./quality.css";
const Quality = () => {
  return (
    <>
      <section className="quality_section">
        <h2>Why Us?</h2>
        <div className="quality_container">
          <div className="quality">
            <div>
              <FavoriteIcon />
            </div>
            <div className="quality-text">
              <h3>Advanced Technology</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, placeat.
              </p>
            </div>
          </div>
          <div className="quality">
            <div>
              <FavoriteBorderIcon />
            </div>
            <div className="quality-text">
              <h3>Affordable Service</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, placeat.
              </p>
            </div>
          </div>
          <div className="quality">
            <div>
              <VolunteerActivismIcon />
            </div>
            <div className="quality-text">
              <h3>Customer Support</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, placeat.
              </p>
            </div>
          </div>
          <div className="quality">
            <div>
              <StarsIcon />
            </div>
            <div className="quality-text">
              <h3>Experianced Phisicians</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, placeat.
              </p>
            </div>
          </div>
          <div className="quality">
            <div>
              <AppShortcutOutlinedIcon />
            </div>
            <div className="quality-text">
              <h3>Online Booking</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, placeat.
              </p>
            </div>
          </div>
          <div className="quality">
            <div>
              <CoronavirusOutlinedIcon />
            </div>
            <div className="quality-text">
              <h3>Corona Virus Protection</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, placeat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Quality;
