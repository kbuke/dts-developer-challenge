
import backgroundVid from "../resources/video/backgroundVid.mp4"

export default function Header(){
    return(
        <div className="header">
            <div className="bg-video">
                <video autoPlay muted loop className="bg-video__content">
                    <source src={backgroundVid} type="video/mp4"/>
                    Your browser is not supported
                </video>
            </div>

            <div className="header__text-box">
                <h1 className="heading-primary">
                    <span className="heading-primary--main">
                        To-do-loo
                    </span>

                    <span className="heading-primary--sub">
                        Manage Your Life
                    </span>
                </h1>
            </div>
        </div>
    )
}