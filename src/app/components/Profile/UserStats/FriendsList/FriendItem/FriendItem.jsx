import React from 'react';
import frItemStyles from './FriendItem.module.scss';
import Image from "next/image";
import pic from '../../../../../../../public/assets/images/profile/sova.jpg';
import CustomButtonFollow from "../../../../../components/ui/CustomButtonFollow/CustomButtonFollow.jsx";

const FriendItem = () => {
    return (
        <div className={frItemStyles.friendItemContainer}>
            <div className={frItemStyles.friendDataContainer}>
                <div className={frItemStyles.avatar}>
                    <Image src={pic} alt={"gghf"} width={50} height={50} />
                </div>
                <div className={frItemStyles.textDataContainer}>
                    <span className={frItemStyles.friendName}>Kamaz</span>
                    <span className={frItemStyles.friendTag}>@kamaz_rarg6</span>
                </div>
            </div>
            <CustomButtonFollow name={"follow"}>Follow</CustomButtonFollow>
        </div>

    );
};

export default FriendItem;
