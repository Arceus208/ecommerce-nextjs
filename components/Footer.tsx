import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="footer-container">
      <p>2022 Graphic Cards All rights reserved</p>
      <p className="icons">
        <AiFillInstagram></AiFillInstagram>
        <AiOutlineTwitter></AiOutlineTwitter>
      </p>
    </div>
  );
};

export default Footer;
