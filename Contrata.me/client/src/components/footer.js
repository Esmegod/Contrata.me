import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css"; //  CSS
import { links_footer, social } from "./data"; //  Recursos

function footer() {
    return (
        <footer className="foo-center">
            <div className="foo-links-container">
                <ul className="foo-links">
                    {links_footer.map((link) => {
                        const { id, url, text } = link;
                        return (
                            <li key={id}>
                                <Link className="foo-link" to={url}>
                                    {text}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="links-container">
                <ul className="social-icons">
                    {social.map((socialIcon) => {
                        const { id, url, icon } = socialIcon;
                        return (
                            <li key={id}>
                                <a href={url}>{icon}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </footer>
    );
}

export default footer;
