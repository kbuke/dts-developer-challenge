


export default function Header(){

    //create variable for buttons
    const homeButton = (buttonLink, buttonName) => {
        return(
            <a className="btn btn__white" href={buttonLink}>
                {buttonName}
            </a>
        )
    }

    return(
        <div className="header">
            <div className="header__text--box">
                <h1 className="heading--primary">
                    <span className="heading--primary--main">
                        ToDo-Loo
                    </span>

                    <span className="heading--primary--sub">
                        Time's Ticking
                    </span>
                </h1>
            </div>

            <div className="btn--box">
                {homeButton("#", "See To Do List")}
            </div>
        </div>
    )
}