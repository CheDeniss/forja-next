import React from 'react';
import Image from "next/image";
import frItemStyles from "./FriendItem.module.scss";
import withBorder from "../../../../../../hoc/withBorder.js";

const Avatar = (props) => {
    return (
        <Image
            className={frItemStyles.avatar}
            src={props.src}
            alt="pic"
            width={50}
            height={50}
        />
    );
};
const BorderedAvatar = withBorder(Avatar);

export default BorderedAvatar;

