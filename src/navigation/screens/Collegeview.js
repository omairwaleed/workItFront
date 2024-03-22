import styles from "./collegeview.module.css"

export default function Collegeview() {
return (
    <body className={styles.body}>
        <div className={styles.parent}>
                <header>
                    <div className={styles.header_left}>
                        <div className={styles.text}>WORK-IT!</div>
                        <div className={styles.title}>
                            <a href="#"><span>View My Profile</span></a>
                        </div>
                    </div>
                </header>
                <div className={styles.collegebar}>
                    <div className={styles.leftbar}>
                        <div className={styles.box}>
                            <div className={styles.search}>
                                <input type="text" placeholder="Search By Name"></input>
                                <div>
                                <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </div>
                            <div className={styles.location}>
                                <span>Location</span>
                                <i className="fa-solid fa-caret-down"></i>
                            </div>
                            <div className={styles.category}>
                                <span>Category</span>
                                <i className="fa-solid fa-caret-down"></i>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightbar}>
                        <button className="button-68" role="button">Add IS</button>
                        <button className="button-68" role="button">Add Job</button>
                    </div>
                </div>

            <div className={styles.collegeviewcb}>
                <div className={styles.checkbox}>
                    <label className={styles.checkbox_wrapper}>
                        <input type="checkbox" class={styles.checkbox_input} checked />
                        <span className={styles.checkbox_tile}>
                            <span className={styles.checkbox_label}>Internships</span>
                        </span>
                    </label>
                </div>
                <div className={styles.checkbox}>
                    <label className={styles.checkbox_wrapper}>
                        <input type="checkbox" className={styles.checkbox_input} checked />
                        <span className={styles.checkbox_tile}>
                            <span className={styles.checkbox_label}>Jobs</span>
                        </span>
                    </label>
                </div>
            </div>

            <ol>
                <li>
                    <h3>Senior Web Developer</h3>
                    <div className={styles.content}>

                        <span className={styles.content_body}>Scarab Agency</span>
                        <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                        <span className={styles.content_body}>4 years experience required</span>


                    </div>
                </li>
                <li>
                    <h3>Senior Web Developer</h3>
                    <div className={styles.content}>

                        <span className={styles.content_body}>Scarab Agency</span>
                        <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                        <span className={styles.content_body}>4 years experience required</span>


                    </div>
                </li>
                <li>
                    <h3>Senior Web Developer</h3>
                    <div className={styles.content}>

                        <span className={styles.content_body}>Scarab Agency</span>
                        <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                        <span className={styles.content_body}>4 years experience required</span>


                    </div>
                </li>
                <li>
                    <h3>Senior Web Developer</h3>
                    <div className={styles.content}>

                        <span className={styles.content_body}>Scarab Agency</span>
                        <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                        <span className={styles.content_body}>4 years experience required</span>


                    </div>
                </li>
                <li>
                    <h3>Senior Web Developer</h3>
                    <div className={styles.content}>

                        <span className={styles.content_body}>Scarab Agency</span>
                        <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                        <span className={styles.content_body}>4 years experience required</span>


                    </div>
                </li>
                <li>
                    <h3>Senior Web Developer</h3>
                    <div className={styles.content}>

                        <span className={styles.content_body}>Scarab Agency</span>
                        <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                        <span className={styles.content_body}>4 years experience required</span>


                    </div>
                </li>
                <li>
                    <h3>Senior Web Developer</h3>
                    <div className={styles.content}>

                        <span className={styles.content_body}>Scarab Agency</span>
                        <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                        <span className={styles.content_body}>4 years experience required</span>


                    </div>
                </li>
                <li>
                    <h3>Senior Web Developer</h3>
                    <div className={styles.content}>

                        <span className={styles.content_body}>Scarab Agency</span>
                        <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                        <span className={styles.content_body}>4 years experience required</span>


                    </div>
                </li>
                <li>
                    <h3>Senior Web Developer</h3>
                    <div className={styles.content}>

                        <span className={styles.content_body}>Scarab Agency</span>
                        <span className={styles.content_body}>Alexandria, Egypt (Remotely)</span>
                        <span className={styles.content_body}>4 years experience required</span>


                    </div>
                </li>
            </ol>

        </div>

    </body>
)
}