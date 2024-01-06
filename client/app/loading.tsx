"use client";
export default function Temp() {
    return (
        <>
            <div className="box">
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
            </div>
        <div className="justify-center bg-white mt-20  flex text-2xl md:text-4xl">Loading...</div>
            <style jsx>
                {`
                    .cube {
                        position: absolute;
                        width: 1em;
                        height: 1em;
                        background: #fed74c;
                        -webkit-animation: move 3s ease-in-out infinite;
                        animation: move 3s ease-in-out infinite;
                        transform-style: preserve-3d;
                        box-shadow: 5em 5em 0.3em 0.1em #dbdbdb;
                    }
                    .cube::before,
                    .cube::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                    }
                    .cube::before {
                        background-color: #c97431;
                        transform-origin: 100% 100%;
                        transform: rotateY(-90deg);
                    }
                    .cube::after {
                        background-color: #e7a22b;
                        transform-origin: 0% 100%;
                        transform: rotateX(90deg);
                    }
                    .cube:nth-of-type(1) {
                        -webkit-animation-delay: -11.25s;
                        animation-delay: -11.25s;
                    }
                    .cube:nth-of-type(2) {
                        -webkit-animation-delay: -10.5s;
                        animation-delay: -10.5s;
                    }
                    .cube:nth-of-type(3) {
                        -webkit-animation-delay: -9.75s;
                        animation-delay: -9.75s;
                    }
                    .cube:nth-of-type(4) {
                        -webkit-animation-delay: -9s;
                        animation-delay: -9s;
                    }
                    @-webkit-keyframes move {
                        0%,
                        87.5%,
                        100% {
                            transform: translate(1em, 0em);
                        }
                        12.5% {
                            transform: translate(2em, 0em);
                        }
                        25% {
                            transform: translate(2em, 1em);
                        }
                        37.5%,
                        50% {
                            transform: translate(1em, 1em);
                        }
                        62.5% {
                            transform: translate(0em, 1em);
                        }
                        75% {
                            transform: translate(0em, 0em);
                        }
                    }
                    @keyframes move {
                        0%,
                        87.5%,
                        100% {
                            transform: translate(1em, 0em);
                        }
                        12.5% {
                            transform: translate(2em, 0em);
                        }
                        25% {
                            transform: translate(2em, 1em);
                        }
                        37.5%,
                        50% {
                            transform: translate(1em, 1em);
                        }
                        62.5% {
                            transform: translate(0em, 1em);
                        }
                        75% {
                            transform: translate(0em, 0em);
                        }
                    }

                    .box {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 3em;
                        height: 2em;
                        margin: 30vmin auto;
                        font-size: 50px;
                        transform-style: preserve-3d;
                        transform: rotateX(60deg) rotateZ(45deg);
                    }
                    .box:hover * {
                        -webkit-animation-play-state: paused;
                        animation-play-state: paused;
                    }
                    .box:active * {
                        -webkit-animation-play-state: running;
                        animation-play-state: running;
                    }

                    *,
                    *::before,
                    *::after {
                        box-sizing: border-box;
                    }

                    html {
                        height: 100%;
                    }

                    body {
                        display: flex;
                        flex-direction: column;
                        min-height: 100%;
                        margin: 0;
                        line-height: 1.4;
                    }
                `}
            </style>
        </>
    );
}
