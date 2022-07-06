import React from "react";
import "./Team.css";
import DrKume from "../img/DrKume.png";
import item2 from "../TeamImages/member2.jpg";

function Team() {
  return (
    <>
      <section className="doctors-section">
        <div className="team-heading">
          <h2> Our Doctors </h2>
          <p>
            Meet Our Subspecialists and Specialists who are waiting for you.{" "}
          </p>
        </div>

        <div className="doctor-cont">
          <div className="Doctors-Field">
            <div className="EachDoctors">
              <div className="person">
                <img
                  className="img-responsive"
                  src={DrKume}
                  alt="Dr Kumele Tolosa"
                  style={{ width: 200, height: 200, borderRadius: "40px" }}
                />
              </div>
              <div className="person-detail">
                <div className="arrow-bottom"></div>
                <h3> Dr. Kumele Tolosa </h3>
                <div className="Doctors-Detail">
                  <h4>
                    Medical Doctor (MD, FCOECSA) Associate Professor of
                    Ophthalmology Pediatric Ophthalmology and Syrabismus fellow.
                  </h4>
                </div>
              </div>
            </div>
            <div className="EachDoctors">
              <div className="person-detail">
                <div className="arrow-bottom"></div>
                <h3>Dr. Guteta G/Michael</h3>
                <div className="Doctors-Detail">
                  <h4>
                    Medical Doctor (MD, FCOECSA, FICO) Assistant Professor of
                    Ophthalmology Glaucoma and cataract specialist.
                  </h4>
                </div>
              </div>

              <div className="person">
                <img
                  class="img-responsive"
                  src={item2}
                  alt="member-2"
                  style={{ width: 200, height: 200, borderRadius: "40px" }}
                />
              </div>
            </div>
            <div className="EachDoctors">
              <div className="person">
                <img
                  className="img-responsive"
                  src={item2}
                  alt="member-1"
                  style={{ width: 200, height: 200, borderRadius: "40px" }}
                />
              </div>
              <div className="person-detail">
                <div className="arrow-bottom"></div>
                <h3> Dr. Kumele Tolosa </h3>
                <div className="Doctors-Detail">
                  <h4>
                    Medical Doctor (MD, FCOECSA, FICO) Assistant Professor of
                    Ophthalmology Glaucoma and cataract specialist.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Team;
