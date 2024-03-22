import styles from "./myapps.module.css"

export default function Myapps() {
    return (
        <body className={styles.body}>
            <div className={styles.parent}>
                <header>
                    <div className={styles.header_left}>
                        <div className={styles.text}>WORK-IT!</div>
                        <div className={styles.title}>
                            <a href="#"><span>JOBS</span></a>
                            <a href="#"> <span>INTERNSHIPS</span></a>
                            <a href="#"><span>SCHOLARSIHPS</span></a>
                        </div>
                    </div>
                </header>

                <div className={styles.box}>
                    <div className={styles.search}>
                        <input type="text" placeholder="Search By Name"></input>
                        <div>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                    <div className={styles.location}>
                        <span>Location</span>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                    <div className={styles.category}>
                        <span>Category</span>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                    <div className={styles.category}>
                        <span>Status</span>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                </div>


                <ol >
                    <li >
                        <h3>Senior Web Developer</h3>
                        <div className={styles.content}>

                            <span className={styles.content_body}>Scarab Agency</span>
                            <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                            <span className={styles.content_body}>Applicant review time is typically 4 days</span>
                            <span className={styles.content_body}><div class={styles.statuspending}>
                                Pending
                                </div>
                            </span>
                        </div>
                    </li>
                    <li >
                        <h3>Senior Web Developer</h3>
                        <div className={styles.content}>

                            <span className={styles.content_body}>Scarab Agency</span>
                            <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                            <span className={styles.content_body}>Applicant review time is typically 4 days</span>
                            <span className={styles.content_body}><div class={styles.statusaccepted}>
                                Accepted
                                </div>div
                            </span>
                        </div>
                    </li>
                    <li >
                        <h3>Senior Web Developer</h3>
                        <div className={styles.content}>

                            <span className={styles.content_body}>Scarab Agency</span>
                            <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                            <span className={styles.content_body}>Applicant review time is typically 4 days</span>
                            <span className={styles.content_body}>
                                <div className={styles.statusaccepted}>
                                Accepted</div>
                            </span>
                        </div>
                    </li>
                    <li >
                        <h3>Senior Web Developer</h3>
                        <div className={styles.content}>

                            <span className={styles.content_body}>Scarab Agency</span>
                            <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                            <span className={styles.content_body}>Applicant review time is typically 4 days</span>
                            <span className={styles.content_body}><div class={styles.statusnotaccepted}>
                                Not Accepted</div>
                            </span>
                        </div>
                    </li>
                    <li >
                        <h3>Senior Web Developer</h3>
                        <div className={styles.content}>

                            <span className={styles.content_body}>Scarab Agency</span>
                            <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                            <span className={styles.content_body}>Applicant review time is typically 4 days</span>
                            <span className={styles.content_body}><div class={styles.statusnotaccepted}>
                                Not Accepted</div>
                            </span>
                        </div>
                    </li>
                </ol>



            </div>
        </body>
    )
}