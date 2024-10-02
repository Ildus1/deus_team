import {useEffect, useRef, useState} from 'react'
import Popup from 'reactjs-popup';

import './showreel.scss';
import {usePrevious} from "react-admin";
import {current} from "@reduxjs/toolkit";
import showPng from "./showreel.png"
import temp from "../../img/videoPlayCursor.svg"

const apiUrl = ''

const Showreel = (props) => {
    const {data, isMain} = props;
    const [open, setOpen] = useState(false);
    const [isInViewport, setIsInViewport] = useState(false);
    const prevIsInViewport = usePrevious({isInViewport, setIsInViewport});
    const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
    const [isFirstClickVideo, setisFirstClickVideo] = useState(true);
    // const [currentTime, setCurrentTime] = useState(4);
    const [isPaused, setIsPaused] = useState(true);

    const videoRef = useRef(null);
    const showReelRef = useRef(null)

    const closeModal = () => setOpen(false);
    const openModal = () => {
        setOpen(true);
        videoRef.current.pause();
    };



    const handlePlay = () => {
        const header = document.querySelector('.header')
        const footer = document.querySelector('.footer')
        const isTrue = videoRef.current.paused
        // videoRef.current.currentTime = currentTime

        // videoRef.current.style.transition = 'all 0.3s ease-in-out';
        // videoRef.current.style.transform = isTrue ? 'translateY(-30.4vw)' : 'translateY(0)';
        // videoRef.current.style.position = isTrue ? 'fixed' : 'relative';
        // videoRef.current.style.height = isTrue ? '110vh' : '';
        // header.style.opacity = isTrue ? '0' : '1';
        // footer.style.opacity = isTrue ? '0' : '1';
        // videoRef.current.style.zIndex = isTrue ? 8001 : 'auto';

        if (isTrue) {
            videoRef.current.play();
            setIsPaused(false);
        } else {
            videoRef.current.pause();
            setIsPaused(true);
        }
    };

    return (
        <div className="showreel">
            {
                isMain ? (
                    <div 
                        ref={showReelRef}  
                        className={`showreel__s ${isPaused ? 'pausing' : 'playing'}`} 
                        onClick={handlePlay} 
                    >
                        {
                            data.video && data.video !== 'undefined' && data.video !== 'null' &&
                            <video ref={videoRef}  poster={showPng} loop playsInline preload={'auto'}>
                                <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null}
                                        type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                            </video>
                        }
                        <img src={temp} alt="showreel" />
                    </div>
                ) : (
                    <>
                        <div className="showreel__title">
                            {data.name}
                            {data.year && data.year.length > 0 && <span> — {data.year}</span>}
                        </div>
                        <div className="showreel__s playIcon" onClick={openModal}>

                            {
                                data.video && data.video !== 'undefined' && data.video !== 'null' ?
                                    <video ref={videoRef} muted loop playsInline>
                                        <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null}
                                                type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                                    </video> :
                                    data.videoUrl && data.videoUrl !== 'undefined' && data.videoUrl !== 'null' ?
                                        <div dangerouslySetInnerHTML={{__html: data.videoUrl}}></div> :
                                        <video muted loop playsInline>
                                            <source
                                                src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null}
                                                type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                                        </video>
                            }
                        </div>
                    </>
                )
            }

            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div>
                    <div className="popup__close" onClick={closeModal}>
                        &times;
                    </div>
                    {
                        data.videoUrl && data.videoUrl !== 'undefined' && data.videoUrl !== 'null' ?
                            <div dangerouslySetInnerHTML={{__html: data.videoUrl}}></div> :
                            <video muted controls playsInline loop autoPlay className="popup__video">
                                <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null}/>
                            </video>
                    }
                </div>
            </Popup>
        </div>
    )

}

export default Showreel;
