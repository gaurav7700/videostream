import React, { useEffect, useState } from "react";
import axios from "axios";
import thumbnail from "./thumbnail.png";
import spman1 from "./spman1.jpg";
import sunflower from "./sunflower.mp4"
const Singlevideo = () => {
  const [allposts, setAllposts] = useState([]);
  const [singlevideo, setSinglevideo] = useState('');
  const [play, setPlay] = useState(false);

  useEffect(() => {
    axios
      .get("/getvideo", { withCredentials: true })
      .then((res) => {
        setAllposts(res.data);
        console.log(res);
      });
  }, []);

  const getmainvideo = (e) => {
    setSinglevideo(sunflower);
    setPlay(true);
  };

  const getsinglevideo = (e) => {
    setSinglevideo(e);
    setPlay(true);
  };

  const closevideo = () => {
    setPlay(false);
  };
  return (
    <>
      {play ? (
        <div className="videoplayer">
          <div
            style={{ color: "white", cursor: "pointer" }}
            onClick={closevideo}
          >
            Close Video
          </div>
          <video controls autoPlay>
            <source src={singlevideo} type="video/mp4" />
          </video>
        </div>
      ) : (
        <>
          <div className="container1">
            <div className="poster2box">
              <img className="poster2" src={spman1} alt=""></img>
              <div class="centered">
                <div className="mainposter1div1" style={{ width: "" }}>
                  <div
                    onClick={() => {
                      getmainvideo();
                    }}
                  >
                    Play Video
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container4">
            { allposts &&  allposts.map((ele) => {
              return (
                <div className="container3mono">
                  {ele.videothumbnail ? (
                    <img
                      className="c3poster1"
                      src={ele.videothumbnail}
                      alt="image"
                    />
                  ) : (
                    <img className="c3poster1" src={thumbnail} alt="image" />
                  )}

                  <div className="c3poster2">
                    <h3>{ele.videotitle}</h3>
                    <div>Date: {ele.publishdate} </div>
                    <div>Publisher: {ele.publishername} </div>
                    <div className="poster1div1">
                      <div>Rating: 8 </div>
                      <div
                        onClick={() => {
                          getsinglevideo(ele.videoname);
                        }}
                      >
                        Play Video
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Singlevideo;
