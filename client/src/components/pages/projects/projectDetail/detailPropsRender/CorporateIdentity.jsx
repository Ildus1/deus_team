import React from 'react';
import {BannerComponent, ProjectResults, useMobile} from "../ProjectDetail";

const CorporateIdentity = ({detail}) => {
    const isMobile = useMobile();
    return (
        <>

            {detail.taskDescr && detail.taskDescr !== 'undefined' && detail.taskDescr !== '' ?

                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary">Цели и задачи</h2>
                        <div>
                            {detail.taskDescr &&
                                <div className="project-target__content l-textReg">
                                    <div dangerouslySetInnerHTML={{__html: detail.taskDescr}}/>
                                </div>
                            }
                            <div className="project-target__item m-text">
                                <div dangerouslySetInnerHTML={{__html: detail.tasksItem}}/>
                            </div>
                        </div>

                    </div>
                </section> : null}

            {detail.bannerSeconds ?
                <div className="banner-list">
                    {detail.bannerSeconds.filter(val => !!val).map((banner, index) =>
                        <div className="project-banner borderBlock">
                            <BannerComponent banner={banner} detail={detail}/>
                        </div>
                    )}
                </div>
                : null
            }

            {detail.workIntroText && detail.workIntroText !== 'undefined' && detail.workIntroText !== '' ?

                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.heading}}/>
                        <div>
                            {detail.workIntroText &&
                                <div className="project-target__item m-text">
                                    <div dangerouslySetInnerHTML={{__html: detail.workIntroText}}/>
                                </div>
                            }
                        </div>
                    </div>
                </section> : null}

            {detail.bannerFourths ?
                <div className="banner-list">
                    {detail.bannerFourths.filter(val => !!val).map((banner, index) =>
                        <div className="project-banner borderBlock">
                            <BannerComponent banner={banner} detail={detail}/>
                        </div>
                    )}
                </div>
                : null
            }

            {detail.taskDo && detail.taskDo !== 'undefined' && detail.taskDo !== '' ?
                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.task}}/>
                        <div>
                            {detail.taskDo &&
                                <div className="project-target__item m-text">
                                    <div dangerouslySetInnerHTML={{__html: detail.taskDo}}/>
                                </div>
                            }
                        </div>
                    </div>
                </section>
                : null}

            {detail.bannerFifths ? (
                    <div className={detail.bannerFifths.length > 2 ? "banner-grid" : ""}>
                        {detail.bannerFifths.filter(val => !!val).map((banner, index) => (
                            <span  className="project-banner borderBlock">
                                 <BannerComponent banner={banner} detail={detail} key={index}/>
                            </span>

                        ))}
                    </div>

            ) : null}

            {detail.approach && detail.approach !== 'undefined' && detail.approach !== '' ?

                <section style={{backgroundColor: "white"}} className="project-target padding borderBlock">
                    <div className="project-target__wrap">
                        <h2 className="heading-secondary" dangerouslySetInnerHTML={{__html: detail.stageName}}/>
                        <div>
                            {detail.approach &&
                                <div className="project-target__item m-text">
                                    <div dangerouslySetInnerHTML={{__html: detail.approach}}/>
                                </div>
                            }
                        </div>
                    </div>
                </section> : null}

            {detail.bannerSixths ?
                <div className="banner-list">
                    {detail.bannerSixths.filter(val => !!val).map((banner, index) =>
                        <div className="project-banner borderBlock">
                            <BannerComponent banner={banner} detail={detail}/>
                        </div>
                    )}
                </div>
                : null
            }

            {!!detail.result &&
                <ProjectResults
                    result={detail.result}
                    awardsURL={detail.awardsURL}
                    isMobile={isMobile}
                />
            }


        </>
    );
};

export default CorporateIdentity;